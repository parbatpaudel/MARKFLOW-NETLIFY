import { NextResponse } from 'next/server'
import { sql } from '@/lib/neon'

export async function POST(request: Request) {
  try {
    const { 
      name, 
      email, 
      businessName, 
      industry, 
      company, 
      subject, 
      message, 
      phone, 
      businessDescription,
      // Additional fields from onboarding questionnaire
      country,
      otherCountry,
      countryCode,
      businessSize,
      annualRevenue,
      ebitda,
      currency,
      howHeard,
      otherHowHeard,
      scheduleMeeting
    } = await request.json()

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
      businessName: businessName ? sanitizeInput(businessName).substring(0, 100) : null,
      industry: industry ? sanitizeInput(industry).substring(0, 50) : null,
      company: company ? sanitizeInput(company).substring(0, 100) : null,
      subject: subject ? sanitizeInput(subject).substring(0, 255) : 'Contact Form Submission',
      message: sanitizeInput(message).substring(0, 2000),
      phone: phone ? sanitizeInput(phone).substring(0, 20) : null,
      businessDescription: businessDescription ? sanitizeInput(businessDescription).substring(0, 1000) : null,
      country: country ? sanitizeInput(country).substring(0, 50) : null,
      otherCountry: otherCountry ? sanitizeInput(otherCountry).substring(0, 50) : null,
      countryCode: countryCode ? sanitizeInput(countryCode).substring(0, 10) : null,
      businessSize: businessSize ? sanitizeInput(businessSize).substring(0, 50) : null,
      annualRevenue: annualRevenue ? sanitizeInput(annualRevenue).substring(0, 50) : null,
      ebitda: ebitda ? sanitizeInput(ebitda).substring(0, 50) : null,
      currency: currency ? sanitizeInput(currency).substring(0, 10) : null,
      howHeard: howHeard ? sanitizeInput(howHeard).substring(0, 100) : null,
      otherHowHeard: otherHowHeard ? sanitizeInput(otherHowHeard).substring(0, 255) : null,
      scheduleMeeting: scheduleMeeting ? sanitizeInput(scheduleMeeting).substring(0, 10) : null
    }

    // Save to Neon database
    const result = await sql`
      INSERT INTO contacts (
        name, email, business_name, industry, company, subject, message, 
        phone, business_description, country, other_country, country_code,
        business_size, annual_revenue, ebitda, currency, how_heard, 
        other_how_heard, schedule_meeting
      ) VALUES (
        ${sanitizedData.name}, ${sanitizedData.email}, ${sanitizedData.businessName}, 
        ${sanitizedData.industry}, ${sanitizedData.company}, ${sanitizedData.subject}, 
        ${sanitizedData.message}, ${sanitizedData.phone}, ${sanitizedData.businessDescription},
        ${sanitizedData.country}, ${sanitizedData.otherCountry}, ${sanitizedData.countryCode},
        ${sanitizedData.businessSize}, ${sanitizedData.annualRevenue}, ${sanitizedData.ebitda},
        ${sanitizedData.currency}, ${sanitizedData.howHeard}, ${sanitizedData.otherHowHeard},
        ${sanitizedData.scheduleMeeting}
      )
      RETURNING id
    `

    console.log('✅ Contact saved to Neon database')
    
    // Update contact stats
    try {
      await sql`
        INSERT INTO contact_stats (date, count) 
        VALUES (CURRENT_DATE, 1)
        ON CONFLICT (date) 
        DO UPDATE SET count = contact_stats.count + 1
      `
    } catch (statsError) {
      console.error('Failed to update contact stats:', statsError)
      // Don't fail the main request if stats update fails
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your message! We will get back to you soon.',
      id: result[0].id 
    })
  } catch (error: any) {
    console.error('Contact form error:', error)
    
    // Handle database-specific errors
    if (error.message && error.message.includes('duplicate key')) {
      return NextResponse.json({ 
        success: false, 
        error: 'This email has already been submitted. Please use a different email or contact us directly.' 
      }, { status: 409 })
    }
    
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to send message. Please try again later.' 
    }, { status: 500 })
  }
}