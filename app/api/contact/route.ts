import { NextResponse } from 'next/server'
import { sql } from '@/lib/neon'

export async function POST(request: Request) {
  try {
    const { name, email, businessName, industry, company, subject, message, recaptchaToken } = await request.json()

    // Validation
    if (!name || !email || !businessName || !industry || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // reCAPTCHA v3 verification (score-based)
    const isProd = process.env.NODE_ENV === 'production'
    if (recaptchaToken) {
      const secret = process.env.RECAPTCHA_SECRET_KEY
      if (!secret) {
        console.warn('reCAPTCHA secret key not configured')
      } else {
        try {
          const verifyRes = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${recaptchaToken}`,
            { method: 'POST' }
          )
          const verifyData = await verifyRes.json()
          
          // reCAPTCHA v3 uses score (0.0 - 1.0). Higher is more likely human.
          // Lower threshold to 0.3 for better acceptance rate
          if (!verifyData.success || (verifyData.score && verifyData.score < 0.3)) {
            console.log('reCAPTCHA score:', verifyData.score)
            return NextResponse.json({ 
              error: 'Suspicious activity detected. Please try again.' 
            }, { status: 400 })
          }
          console.log('✅ reCAPTCHA passed with score:', verifyData.score)
        } catch (error) {
          console.error('reCAPTCHA verification error:', error)
          // Continue even if reCAPTCHA fails (graceful degradation)
        }
      }
    }

    console.log('Contact submission', { name, email, company, subject, message, ts: new Date().toISOString() })

    // Store to Neon Database
    try {
      await sql`
        INSERT INTO contacts (name, email, business_name, industry, company, subject, message)
        VALUES (${name}, ${email}, ${businessName}, ${industry}, ${company || null}, ${subject || null}, ${message})
      `
      console.log('✅ Contact saved to Neon database')
    } catch (dbError: any) {
      console.error('❌ Neon database error:', dbError)
      return NextResponse.json({ error: 'Database error: ' + dbError.message }, { status: 500 })
    }

    // Send email notification (non-blocking)
    fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/send-notification`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        businessName,
        industry,
        message,
        source: 'contact_form'
      })
    }).catch(err => console.error('Notification error:', err))

    return NextResponse.json({ success: true, message: 'Message received successfully' })
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
