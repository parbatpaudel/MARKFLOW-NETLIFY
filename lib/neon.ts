import { neon } from '@neondatabase/serverless'

// Get database URL from environment
const getDatabaseUrl = () => {
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error('DATABASE_URL environment variable is not set')
  }
  return url
}

// Create SQL client
export const sql = neon(getDatabaseUrl())

// Helper function to test connection
export async function testConnection() {
  try {
    const result = await sql`SELECT NOW()`
    console.log('✅ Neon database connected:', result[0].now)
    return true
  } catch (error) {
    console.error('❌ Neon connection failed:', error)
    return false
  }
}
