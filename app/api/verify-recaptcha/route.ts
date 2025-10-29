import { NextRequest, NextResponse } from 'next/server'

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY || '6LebtPorAAAAADY8r2IzWeS_qdkk4REebMUsTXrT'
const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify'

export async function POST(request: NextRequest) {
  try {
    const { token, expectedAction } = await request.json()

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'reCAPTCHA token is required' },
        { status: 400 }
      )
    }

    // Verify token with Google
    const verifyResponse = await fetch(RECAPTCHA_VERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: RECAPTCHA_SECRET_KEY,
        response: token,
      }),
    })

    const verifyData = await verifyResponse.json()

    if (!verifyData.success) {
      console.error('reCAPTCHA verification failed:', verifyData['error-codes'])
      return NextResponse.json(
        { 
          success: false, 
          error: 'reCAPTCHA verification failed',
          errorCodes: verifyData['error-codes']
        },
        { status: 400 }
      )
    }

    // Check score (v3 specific)
    const score = verifyData.score || 0
    const action = verifyData.action || ''

    // Validate action if provided
    if (expectedAction && action !== expectedAction) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Action mismatch',
          expected: expectedAction,
          received: action
        },
        { status: 400 }
      )
    }

    // Score threshold (0.5 is recommended, adjust as needed)
    const scoreThreshold = 0.5
    const isHuman = score >= scoreThreshold

    return NextResponse.json({
      success: true,
      score,
      action,
      isHuman,
      threshold: scoreThreshold,
      hostname: verifyData.hostname,
      timestamp: verifyData.challenge_ts
    })

  } catch (error) {
    console.error('reCAPTCHA verification error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}