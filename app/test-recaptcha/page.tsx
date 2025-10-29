'use client'

import { useState } from 'react'
import { useRecaptcha } from '@/hooks/useRecaptcha'
import { Button } from '@/components/ui/button'
import { Shield, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

export default function TestRecaptchaPage() {
  const { isLoaded, isLoading, executeAndVerify } = useRecaptcha()
  const [testResult, setTestResult] = useState<any>(null)
  const [testing, setTesting] = useState(false)

  const testRecaptcha = async (action: string) => {
    setTesting(true)
    setTestResult(null)
    
    try {
      const result = await executeAndVerify(action)
      setTestResult(result)
    } catch (error) {
      setTestResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        score: 0,
        isHuman: false
      })
    } finally {
      setTesting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 mx-auto mb-4 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">reCAPTCHA v3 Test</h1>
            <p className="text-gray-600">Test the reCAPTCHA v3 integration and scoring</p>
          </div>

          {/* Status */}
          <div className="mb-8 p-4 rounded-lg bg-gray-50">
            <div className="flex items-center gap-3 mb-2">
              <Shield className={`w-5 h-5 ${isLoaded ? 'text-green-500' : isLoading ? 'text-yellow-500' : 'text-gray-400'}`} />
              <span className="font-semibold">
                reCAPTCHA Status: {isLoading ? 'Loading...' : isLoaded ? 'Ready' : 'Not Loaded'}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {isLoading && 'Loading reCAPTCHA script...'}
              {isLoaded && 'reCAPTCHA is ready for testing'}
              {!isLoading && !isLoaded && 'reCAPTCHA failed to load'}
            </p>
          </div>

          {/* Test Buttons */}
          <div className="space-y-4 mb-8">
            <Button
              onClick={() => testRecaptcha('login')}
              disabled={!isLoaded || testing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
            >
              {testing ? 'Testing...' : 'Test Login Action'}
            </Button>
            
            <Button
              onClick={() => testRecaptcha('contact_form')}
              disabled={!isLoaded || testing}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
            >
              {testing ? 'Testing...' : 'Test Contact Form Action'}
            </Button>
            
            <Button
              onClick={() => testRecaptcha('test_action')}
              disabled={!isLoaded || testing}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3"
            >
              {testing ? 'Testing...' : 'Test Generic Action'}
            </Button>
          </div>

          {/* Results */}
          {testResult && (
            <div className="p-6 rounded-lg border-2 border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                {testResult.success ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500" />
                )}
                <h3 className="text-lg font-semibold">
                  Test {testResult.success ? 'Passed' : 'Failed'}
                </h3>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Success:</span>
                  <span className={testResult.success ? 'text-green-600' : 'text-red-600'}>
                    {testResult.success ? 'Yes' : 'No'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-medium">Score:</span>
                  <span className={`font-mono ${testResult.score >= 0.5 ? 'text-green-600' : 'text-red-600'}`}>
                    {testResult.score?.toFixed(2) || 'N/A'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-medium">Is Human:</span>
                  <span className={testResult.isHuman ? 'text-green-600' : 'text-red-600'}>
                    {testResult.isHuman ? 'Yes' : 'No'}
                  </span>
                </div>

                {testResult.error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="font-medium text-red-700">Error:</span>
                    </div>
                    <p className="text-red-600 text-sm mt-1">{testResult.error}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Info */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">How it works:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• reCAPTCHA v3 runs in the background without user interaction</li>
              <li>• It returns a score from 0.0 (bot) to 1.0 (human)</li>
              <li>• Scores ≥ 0.5 are typically considered human</li>
              <li>• Different actions can have different score thresholds</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}