import { NextResponse } from 'next/server'
import { sql, testConnection } from '@/lib/neon'

export async function GET() {
  try {
    // Log environment variables (without exposing secrets)
    console.log('DATABASE_URL present:', !!process.env.DATABASE_URL)
    
    // Test database connection
    const isConnected = await testConnection()
    
    if (!isConnected) {
      return NextResponse.json({ 
        success: false, 
        error: 'Database connection failed',
        message: 'Could not connect to Neon database. Please check your DATABASE_URL environment variable.'
      }, { status: 500 })
    }
    
    // Test inserting a record
    try {
      await sql`
        INSERT INTO contacts (name, email, business_name, industry, message)
        VALUES ('Test User', 'test@example.com', 'Test Company', 'Testing', 'This is a test message')
      `
      
      // Get the inserted record
      const result = await sql`
        SELECT * FROM contacts WHERE email = 'test@example.com' ORDER BY created_at DESC LIMIT 1
      `
      
      return NextResponse.json({ 
        success: true, 
        message: 'Database connection and insertion successful',
        testRecord: result[0]
      })
    } catch (insertError: any) {
      console.error('Insert error:', insertError)
      return NextResponse.json({ 
        success: false, 
        error: 'Database insertion failed',
        message: insertError.message,
        details: process.env.NODE_ENV === 'development' ? insertError : 'Check server logs for details'
      }, { status: 500 })
    }
  } catch (err) {
    console.error('Test DB error:', err)
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error',
      message: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 })
  }
}

// Also export a POST method for testing form submission directly
export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Received test data:', body)
    
    // Test database connection
    const isConnected = await testConnection()
    
    if (!isConnected) {
      return NextResponse.json({ 
        success: false, 
        error: 'Database connection failed',
        message: 'Could not connect to Neon database. Please check your DATABASE_URL environment variable.'
      }, { status: 500 })
    }
    
    // Try to insert the data
    try {
      await sql`
        INSERT INTO contacts (
          name, 
          email, 
          phone, 
          business_name, 
          industry, 
          company, 
          business_description, 
          subject, 
          message,
          country,
          other_country,
          country_code,
          business_size,
          annual_revenue,
          ebitda,
          currency,
          how_heard,
          other_how_heard,
          schedule_meeting
        )
        VALUES (
          ${body.name || 'Test User'}, 
          ${body.email || 'test@example.com'}, 
          ${body.phone || null}, 
          ${body.businessName || body.name || 'Test Company'}, 
          ${body.industry || 'Testing'}, 
          ${body.company || null}, 
          ${body.businessDescription || null}, 
          ${body.subject || null}, 
          ${body.message || 'Test message'},
          ${body.country || null},
          ${body.otherCountry || null},
          ${body.countryCode || null},
          ${body.businessSize || null},
          ${body.annualRevenue || null},
          ${body.ebitda || null},
          ${body.currency || null},
          ${body.howHeard || null},
          ${body.otherHowHeard || null},
          ${body.scheduleMeeting || null}
        )
      `
      
      console.log('✅ Test data inserted successfully')
      
      return NextResponse.json({ 
        success: true, 
        message: 'Test data inserted successfully'
      })
    } catch (insertError: any) {
      console.error('❌ Insert error:', insertError)
      return NextResponse.json({ 
        success: false, 
        error: 'Database insertion failed',
        message: insertError.message,
        details: process.env.NODE_ENV === 'development' ? insertError : 'Check server logs for details'
      }, { status: 500 })
    }
  } catch (err) {
    console.error('Test DB POST error:', err)
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error',
      message: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 })
  }
}