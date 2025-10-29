import { NextResponse } from 'next/server'
import { sql } from '../../../lib/neon'

export async function POST(request: Request) {
  try {
    let data;
    try {
      data = await request.json()
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      return NextResponse.json({ error: 'Invalid JSON format' }, { status: 400 })
    }

    const { 
      name, 
      email, 
      businessName, 
      businessDescription,
      company, 
      subject, 
      message, 
      phone,
      country,
      businessSize,
      howHeard,
      scheduleMeeting,
      industry
    } = data

    // Validation - require at least name, email, and message
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Sanitize input data to prevent injection attacks
    const sanitizeInput = (input: string): string => {
      if (typeof input !== 'string') return ''
      return input
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
        .replace(/<!--.*?-->/g, '') // Remove HTML comments
        .trim()
    }

    // Sanitize all string inputs
    const sanitizedData = {
      name: sanitizeInput(name).substring(0, 100),
      email: sanitizeInput(email).toLowerCase().substring(0, 255),
      businessName: businessName ? sanitizeInput(businessName).substring(0, 255) : null,
      businessDescription: businessDescription ? sanitizeInput(businessDescription).substring(0, 5000) : null,
      company: company ? sanitizeInput(company).substring(0, 255) : null,
      subject: subject ? sanitizeInput(subject).substring(0, 255) : null,
      message: sanitizeInput(message).substring(0, 5000),
      phone: phone ? sanitizeInput(phone).substring(0, 20) : null,
      country: country ? sanitizeInput(country).substring(0, 100) : null,
      businessSize: businessSize ? sanitizeInput(businessSize).substring(0, 50) : null,
      howHeard: howHeard ? sanitizeInput(howHeard).substring(0, 100) : null,
      scheduleMeeting: scheduleMeeting ? sanitizeInput(scheduleMeeting).substring(0, 10) : null,
      industry: industry ? sanitizeInput(industry).substring(0, 100) : null
    }

    // Log the incoming data for debugging
    console.log('Contact submission received (sanitized data)', { 
      name: sanitizedData.name, 
      email: sanitizedData.email, 
      hasBusinessName: !!sanitizedData.businessName,
      hasBusinessDescription: !!sanitizedData.businessDescription,
      hasCompany: !!sanitizedData.company,
      hasSubject: !!sanitizedData.subject,
      hasMessage: !!sanitizedData.message,
      hasPhone: !!sanitizedData.phone,
      hasCountry: !!sanitizedData.country,
      hasBusinessSize: !!sanitizedData.businessSize,
      hasHowHeard: !!sanitizedData.howHeard,
      hasScheduleMeeting: !!sanitizedData.scheduleMeeting,
      hasIndustry: !!sanitizedData.industry,
      timestamp: new Date().toISOString() 
    })

    // Store to Neon Database (if available)
    if (sql) {
      try {
        // Provide default values for NOT NULL columns
        const businessNameValue = sanitizedData.businessName || sanitizedData.name || 'Not provided'
        const industryValue = sanitizedData.industry || 'Not specified' // Use industry if provided, otherwise default
        
        await sql`
          INSERT INTO contacts (name, email, business_name, industry, business_description, company, subject, message, phone, country, business_size, how_heard, schedule_meeting)
          VALUES (${sanitizedData.name}, ${sanitizedData.email}, ${businessNameValue}, ${industryValue}, ${sanitizedData.businessDescription}, ${sanitizedData.company}, ${sanitizedData.subject}, ${sanitizedData.message}, ${sanitizedData.phone}, ${sanitizedData.country}, ${sanitizedData.businessSize}, ${sanitizedData.howHeard}, ${sanitizedData.scheduleMeeting})
        `
        console.log('✅ Contact saved to Neon database')
      } catch (dbError: any) {
        console.error('❌ Neon database error:', dbError.message)
        // Even if database fails, we still want to show success to the user
        // This prevents information leakage about database issues to the user
        // But we log the error for debugging
        return NextResponse.json({ 
          success: false, 
          error: 'Database error', 
          message: 'Failed to save to database. Please check server logs.' 
        }, { status: 500 })
      }
    } else {
      console.log('⚠️  Database not configured, skipping database save')
    }

    // Send email notification (non-blocking)
    fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/send-notification`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: sanitizedData.name,
        email: sanitizedData.email,
        businessName: sanitizedData.businessName,
        businessDescription: sanitizedData.businessDescription,
        message: sanitizedData.message,
        phone: sanitizedData.phone,
        source: 'contact_form'
      })
    }).catch(err => console.error('Notification error:', err))

    return NextResponse.json({ success: true, message: 'Message received successfully' })
  } catch (err) {
    console.error('Internal server error:', err)
    return NextResponse.json({ error: 'Internal server error', message: 'An unexpected error occurred' }, { status: 500 })
  }
}