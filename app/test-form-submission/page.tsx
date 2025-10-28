'use client'

import { useState } from 'react'

export default function TestFormSubmissionPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const testFormSubmission = async () => {
    setIsSubmitting(true)
    setResult(null)
    setError(null)
    
    try {
      // Test data similar to what the onboarding form would send
      const testData = {
        name: 'Test User',
        email: 'test@example.com',
        businessName: 'Test Company',
        industry: 'Technology',
        company: 'Test Corp',
        businessDescription: 'This is a test business description for testing form submission.',
        message: 'This is a test message to verify form submission is working.',
        phone: '+1234567890',
        country: 'United States',
        countryCode: '+1',
        businessSize: '1-10 employees',
        annualRevenue: '$100,000',
        ebitda: '$20,000',
        currency: 'USD',
        howHeard: 'Google Search',
        scheduleMeeting: 'Yes',
        subject: 'Test Form Submission'
      }
      
      console.log('Sending test data:', testData)
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      })
      
      const data = await response.json()
      console.log('Response:', data)
      
      if (response.ok) {
        setResult(data)
      } else {
        setError(data.error || 'Failed to submit form')
      }
    } catch (err) {
      console.error('Submission error:', err)
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const testDbConnection = async () => {
    setIsSubmitting(true)
    setResult(null)
    setError(null)
    
    try {
      const response = await fetch('/api/test-db')
      const data = await response.json()
      
      if (response.ok) {
        setResult(data)
      } else {
        setError(data.error || 'Failed to test database connection')
      }
    } catch (err) {
      console.error('Test error:', err)
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Form Submission Test</h1>
        
        <div className="space-y-6">
          <p className="text-gray-600 text-center">
            This page tests form submission to the Neon database.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">How to use:</h2>
            <ul className="list-disc pl-5 space-y-1 text-blue-700">
              <li>Click "Test Form Submission" to send test data to the contact API</li>
              <li>Click "Test DB Connection" to verify database connectivity</li>
              <li>Check the browser console for detailed logs</li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={testFormSubmission}
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              {isSubmitting ? 'Testing...' : 'Test Form Submission'}
            </button>
            
            <button
              onClick={testDbConnection}
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              {isSubmitting ? 'Testing...' : 'Test DB Connection'}
            </button>
          </div>
          
          {error && (
            <div className="p-4 rounded-lg bg-red-100 border border-red-200">
              <h3 className="font-semibold text-red-800 mb-2">Error:</h3>
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          {result && (
            <div className="p-4 rounded-lg bg-green-100 border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">Result:</h3>
              <pre className="text-green-700 whitespace-pre-wrap text-sm">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Troubleshooting Tips:</h3>
            <ul className="list-disc pl-5 space-y-1 text-yellow-700">
              <li>Ensure DATABASE_URL environment variable is set in your .env.local file</li>
              <li>Verify the contacts table exists in your Neon database with the correct schema</li>
              <li>Check the terminal/console for server-side error logs</li>
              <li>Make sure you've run the neon-setup-updated.sql script in your Neon database</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}