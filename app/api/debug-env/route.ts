import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Only allow this endpoint in development environment for security
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json({ 
        error: 'Endpoint not available', 
        message: 'Environment debugging is only available in development mode' 
      }, { status: 403 })
    }

    // Server-side environment variables (more detailed)
    const envInfo = {
      serverSide: true,
      nodeEnv: process.env.NODE_ENV,
      databaseUrlPresent: !!process.env.DATABASE_URL,
      databaseUrlLength: process.env.DATABASE_URL ? process.env.DATABASE_URL.length : 0,
      supabaseUrlPresent: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasRecaptchaSiteKey: !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
      hasRecaptchaSecretKey: !!process.env.RECAPTCHA_SECRET_KEY,
      nextAuthUrlPresent: !!process.env.NEXTAUTH_URL,
      publicAppUrlPresent: !!process.env.NEXT_PUBLIC_APP_URL,
      // Don't expose actual values for security
      databaseUrl: process.env.DATABASE_URL ? '[REDACTED - DATABASE_URL IS CONFIGURED]' : null,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? '[REDACTED - SUPABASE_URL IS CONFIGURED]' : null,
      recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY ? '[REDACTED - RECAPTCHA_SECRET_KEY IS CONFIGURED]' : null,
      nextAuthSecretPresent: !!process.env.NEXTAUTH_SECRET
    }
    
    // Log that environment check was performed (without exposing values)
    console.log('Environment variables check completed (values redacted for security)')
    
    return NextResponse.json(envInfo)
  } catch (error) {
    console.error('Error getting environment info (generic message)')
    return NextResponse.json({ error: 'Failed to get environment info', message: 'An error occurred while checking environment variables' }, { status: 500 })
  }
}