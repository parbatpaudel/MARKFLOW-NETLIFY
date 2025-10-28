'use client'

import { useState, useEffect } from 'react'

export default function DebugEnvPage() {
  const [envInfo, setEnvInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      // Client-side check - limited information for security
      setEnvInfo({
        clientSide: true,
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        nodeEnv: process.env.NODE_ENV,
        publicUrl: process.env.NEXT_PUBLIC_APP_URL
      })
      setLoading(false)
    }
  }, [])

  const testServerEnv = async () => {
    try {
      const response = await fetch('/api/debug-env')
      const data = await response.json()
      setEnvInfo(data)
    } catch (error) {
      console.error('Error fetching server env:', error)
      setEnvInfo({ error: 'Failed to fetch server environment info' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Environment Debug</h1>
        
        <div className="space-y-6">
          <p className="text-gray-600 text-center">
            This page helps debug environment variable issues.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">Environment Information:</h2>
            
            {loading ? (
              <p className="text-blue-700">Loading...</p>
            ) : envInfo ? (
              <pre className="text-blue-700 whitespace-pre-wrap text-sm bg-gray-50 p-3 rounded">
                {JSON.stringify(envInfo, null, 2)}
              </pre>
            ) : (
              <p className="text-blue-700">No environment info available</p>
            )}
          </div>
          
          <div className="flex justify-center pt-4">
            <button
              onClick={testServerEnv}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Fetch Server Environment Info
            </button>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Troubleshooting Tips:</h3>
            <ul className="list-disc pl-5 space-y-1 text-yellow-700">
              <li>Create a .env.local file in your project root with your DATABASE_URL</li>
              <li>Ensure your Neon database is set up with the correct schema</li>
              <li>Check that your DATABASE_URL follows the format: postgresql://user:password@host:port/database</li>
              <li>Verify that your Neon database allows connections from your application</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}