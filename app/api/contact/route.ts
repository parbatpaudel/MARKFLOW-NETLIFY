import { NextResponse } from 'next/server'
import { sql } from '@/lib/neon'

export async function POST(request: Request) {
  try {
    const { name, email, businessName, industry, company, subject, message, recaptchaToken } = await request.json()

    const isProd = process.env.NODE_ENV === 'production'
    if (!recaptchaToken && isProd) {
      return NextResponse.json({ error: 'reCAPTCHA token is required' }, { status: 400 })
    }

    const secret = process.env.RECAPTCHA_SECRET_KEY
    if (!secret && isProd) {
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
    }

    if (isProd) {
      const verifyRes = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${recaptchaToken}`,
        { method: 'POST' }
      )
      const verifyData = await verifyRes.json()
      if (!verifyData.success) {
        return NextResponse.json({ error: 'reCAPTCHA verification failed' }, { status: 400 })
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
