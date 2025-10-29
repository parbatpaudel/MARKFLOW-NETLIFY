import { NextResponse } from 'next/server'

// Try to import sql and handle any errors
let sql;
let importError = null;

try {
  const neonModule = require('../../../lib/neon');
  sql = neonModule.sql;
} catch (err) {
  importError = err;
  console.error('Failed to import neon module:', err);
}

export async function GET() {
  if (importError) {
    return NextResponse.json({ 
      success: false,
      message: 'Failed to import neon module',
      error: importError.message
    }, { status: 500 });
  }
  
  if (!sql) {
    return NextResponse.json({ 
      success: true, 
      message: 'Database not configured (placeholder values detected)',
      hasSql: false
    });
  }
  
  try {
    // Test database connection
    const result = await sql`SELECT NOW() as current_time`;
    return NextResponse.json({ 
      success: true, 
      message: 'Database connection successful',
      hasSql: true,
      time: result[0].current_time
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Database connection failed',
      hasSql: true,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST() {
  if (importError) {
    return NextResponse.json({ 
      success: false,
      message: 'Failed to import neon module',
      error: importError.message
    }, { status: 500 });
  }
  
  if (!sql) {
    return NextResponse.json({ 
      success: true, 
      message: 'Database not configured (placeholder values detected)',
      hasSql: false
    });
  }
  
  try {
    // Test database connection
    const result = await sql`SELECT NOW() as current_time`;
    return NextResponse.json({ 
      success: true, 
      message: 'Database connection successful',
      hasSql: true,
      time: result[0].current_time
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Database connection failed',
      hasSql: true,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}