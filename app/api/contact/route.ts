import { NextResponse } from 'next/server'
import { createSupabaseServer } from '@/lib/supabaseClient'

export async function POST(request: Request) {
  try {
    const { name, email, company, subject, message, recaptchaToken } = await request.json()

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

    // Store to Supabase
    const supabase = createSupabaseServer()
    const { error } = await supabase.from('contacts').insert({
      name,
      email,
      company,
      subject,
      message,
    })
    if (error) {
      console.error('Supabase insert error (contacts):', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Message received successfully' })
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
