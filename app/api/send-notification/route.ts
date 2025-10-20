import { NextResponse } from 'next/server'

interface NotificationRequest {
  name: string
  email: string
  businessName: string
  industry: string
  message: string
  source: 'contact_form' | 'chat'
}

export async function POST(request: Request) {
  try {
    const { name, email, businessName, industry, message, source }: NotificationRequest = await request.json()

    // For now, we'll log to console. To enable email:
    // 1. Sign up for Resend (https://resend.com)
    // 2. Add RESEND_API_KEY to your .env.local
    // 3. Uncomment the Resend code below

    console.log('📧 New Contact Notification:', {
      name,
      email,
      businessName,
      industry,
      message,
      source,
      timestamp: new Date().toISOString()
    })

    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'contact@marketflow.com'

    if (RESEND_API_KEY) {
      try {
        // Resend integration
        const emailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #003459; border-bottom: 3px solid #007ea7; padding-bottom: 10px;">
              New ${source === 'chat' ? 'Chat' : 'Contact Form'} Submission
            </h2>
            
            <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #007ea7; margin-top: 0;">Contact Details</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Business Name:</strong> ${businessName}</p>
              <p><strong>Industry:</strong> ${industry}</p>
            </div>
            
            <div style="background-color: #fff; padding: 20px; border-left: 4px solid #00a8e8; margin: 20px 0;">
              <h3 style="color: #007ea7; margin-top: 0;">Message</h3>
              <p style="line-height: 1.6;">${message}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; font-size: 12px;">
              <p>This notification was generated from the marketflow ${source === 'chat' ? 'chatbot' : 'contact form'}.</p>
              <p>Submitted at: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        `

        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'marketflow <onboarding@resend.dev>', // Update with your verified domain
            to: [NOTIFICATION_EMAIL],
            subject: `New Lead: ${businessName} (${industry})`,
            html: emailHtml,
            reply_to: email,
          }),
        })

        if (!resendResponse.ok) {
          const errorData = await resendResponse.text()
          console.error('Resend API error:', errorData)
          // Don't fail the whole request if email fails
        } else {
          const emailData = await resendResponse.json()
          console.log('✅ Email notification sent:', emailData)
          return NextResponse.json({ 
            success: true, 
            message: 'Notification sent successfully',
            emailSent: true 
          })
        }
      } catch (emailError) {
        console.error('Email sending error:', emailError)
        // Continue even if email fails
      }
    }

    // Return success even if email is not configured
    return NextResponse.json({ 
      success: true, 
      message: 'Notification logged (email not configured)',
      emailSent: false 
    })

  } catch (error) {
    console.error('Notification API error:', error)
    return NextResponse.json({ 
      error: 'Failed to process notification' 
    }, { status: 500 })
  }
}
