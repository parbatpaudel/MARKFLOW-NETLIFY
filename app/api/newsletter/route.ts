import { NextResponse } from 'next/server'
import { sql } from '@/lib/neon'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // Validation
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    console.log('Newsletter signup', { email, ts: new Date().toISOString() })

    // Store to Neon Database
    try {
      await sql`
        INSERT INTO newsletter_subscribers (email)
        VALUES (${email})
      `
      console.log('✅ Newsletter subscriber saved to Neon database')
    } catch (dbError: any) {
      // Check if it's a duplicate entry error
      if (dbError.message && dbError.message.includes('duplicate')) {
        return NextResponse.json({ 
          success: true, 
          message: 'You are already subscribed to our newsletter!' 
        })
      }
      
      console.error('❌ Neon database error:', dbError)
      // Even if database fails, we still want to show success to the user
      // This prevents information leakage about database issues to the user
      // But we log the error for debugging
    }

    // Send email notification (non-blocking)
    fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/send-notification`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        source: 'newsletter_signup'
      })
    }).catch(err => console.error('Notification error:', err))

    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for subscribing to our newsletter!' 
    })
  } catch (err) {
    console.error('Internal server error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}