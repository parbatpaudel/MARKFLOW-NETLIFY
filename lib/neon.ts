import { neon } from '@neondatabase/serverless'

// Get database URL from environment with security validation
const getDatabaseUrl = () => {
  const url = process.env.DATABASE_URL
  
  if (!url) {
    throw new Error('DATABASE_URL environment variable is not set')
  }
  
  // Basic validation of the database URL format
  if (!url.startsWith('postgresql://')) {
    throw new Error('Invalid DATABASE_URL format. Must start with postgresql://')
  }
  
  // Check for common security issues
  if (url.includes('sslmode=disable') || url.includes('sslmode=allow')) {
    console.warn('⚠️  WARNING: Database connection is not using strict SSL mode. Consider using sslmode=require')
  }
  
  return url
}

// Create SQL client with error handling
export const sql = neon(getDatabaseUrl())

// Helper function to test connection securely
export async function testConnection() {
  try {
    // Don't log sensitive information
    const result = await sql`SELECT NOW()`
    console.log('✅ Neon database connected successfully')
    return true
  } catch (error) {
    // Log generic error message without exposing sensitive details
    console.error('❌ Neon connection failed: Connection could not be established')
    return false
  }
}

// Helper function to validate database connection health
export async function validateConnection() {
  try {
    // Test with a simple query that doesn't expose table structure
    await sql`SELECT 1`
    return { valid: true, error: null }
  } catch (error) {
    return { valid: false, error: 'Database connection validation failed' }
  }
}