'use client'

import { useState, useEffect } from 'react'
import CalendlyModal from '@/components/ui/calendly-modal'

export default function TestCalendlyIntegration() {
  const [showCalendly, setShowCalendly] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  // Set up Calendly event listener
  useEffect(() => {
    const handleCalendlyEvent = (e: MessageEvent) => {
      if (e.data && e.data.event === 'calendly.event_scheduled') {
        console.log('Calendly event scheduled - general listener')
        handleCalendlyEventScheduled()
      }
    }
    
    // Add general event listener
    window.addEventListener('message', handleCalendlyEvent)
    
    return () => {
      window.removeEventListener('message', handleCalendlyEvent)
    }
  }, [])

  // Set up specific iframe event listener when Calendly modal is open
  useEffect(() => {
    if (showCalendly) {
      const handleIframeMessage = (e: MessageEvent) => {
        if (e.origin === 'https://calendly.com') {
          if (e.data && e.data.event === 'calendly.event_scheduled') {
            console.log('Calendly event scheduled - iframe listener')
            handleCalendlyEventScheduled()
          }
        }
      }
      
      window.addEventListener('message', handleIframeMessage)
      
      return () => {
        window.removeEventListener('message', handleIframeMessage)
      }
    }
  }, [showCalendly])

  const handleCalendlyEventScheduled = () => {
    console.log('Calendly event scheduled in test')
    // Close the Calendly modal
    setShowCalendly(false)
    // Show a success message
    setStatus('Meeting scheduled successfully!')
    
    // Clear the status message after a few seconds
    setTimeout(() => {
      setStatus(null)
    }, 3000)
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Calendly Integration</h1>
      
      {status && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded">
          {status}
        </div>
      )}
      
      <button
        onClick={() => setShowCalendly(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Open Calendly Modal
      </button>
      
      <CalendlyModal 
        isOpen={showCalendly} 
        onClose={() => setShowCalendly(false)} 
      />
    </div>
  )
}