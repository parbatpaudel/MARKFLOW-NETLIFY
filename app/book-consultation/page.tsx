'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { X, CheckCircle } from 'lucide-react'

export default function BookConsultationPage() {
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [eventScheduled, setEventScheduled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    script.onload = () => setScriptLoaded(true)
    document.body.appendChild(script)

    // Prevent body scroll when page loads
    document.body.style.overflow = 'hidden'

    // Set up Calendly event listener for when an event is scheduled
    const handleCalendlyEventScheduled = (e: any) => {
      console.log('Calendly event scheduled:', e);
      setEventScheduled(true);
      // After a short delay, redirect back to the contact page (onboarding) with a parameter
      setTimeout(() => {
        router.push('/contact?fromCalendly=true');
      }, 3000);
    };

    // Add multiple event listeners to ensure we catch the event
    window.addEventListener('calendly.event_scheduled', handleCalendlyEventScheduled);
    
    // Also listen for custom events that Calendly might dispatch
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.event === 'calendly.event_scheduled') {
        console.log('Calendly event scheduled (message):', event.data);
        handleCalendlyEventScheduled(event);
      }
    };
    
    window.addEventListener('message', handleMessage);

    return () => {
      document.body.style.overflow = 'unset'
      // Clean up script if needed
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
      // Remove event listeners
      window.removeEventListener('calendly.event_scheduled', handleCalendlyEventScheduled);
      window.removeEventListener('message', handleMessage);
    }
  }, [router])

  const handleReturnToOnboarding = () => {
    // Redirect back to the contact page which will show the onboarding
    router.push('/contact')
  }

  // Handle auto-progress after scheduling
  useEffect(() => {
    if (eventScheduled) {
      const timer = setTimeout(() => {
        router.push('/contact?fromCalendly=true');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [eventScheduled, router]);

  if (eventScheduled) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center shadow-lg animate-bounce">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Meeting Scheduled Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your consultation has been scheduled. You will receive a confirmation email with the details.
            Redirecting to the next step...
          </p>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div 
              className="bg-gradient-to-r from-[#6A00FF] to-[#7B1FFF] h-2.5 rounded-full transition-all duration-300"
              style={{ width: '100%' }}
            ></div>
          </div>
          
          <button
            onClick={() => router.push('/contact?fromCalendly=true')}
            className="w-full px-6 py-3 bg-gradient-to-r from-[#6A00FF] to-[#7B1FFF] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header with brand colors */}
      <div className="bg-gradient-to-r from-[#6A00FF] to-[#003459] py-4 px-4 sm:px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold text-white">Schedule Your Free Consultation</h1>
          <button 
            onClick={handleReturnToOnboarding}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Subheader with additional information */}
      <div className="bg-white py-3 px-4 sm:px-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-600 text-center sm:text-left">
            Select a time that works best for you. Our team will contact you to discuss how we can help transform your business.
          </p>
        </div>
      </div>

      {/* Calendly Embed */}
      <div className="w-full h-[calc(100vh-12rem)]">
        {scriptLoaded ? (
          <div
            className="calendly-inline-widget w-full h-full"
            data-url="https://calendly.com/markflow123"
            style={{ minWidth: '320px', height: '100%' }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-xl border border-gray-200 max-w-md">
              <div className="w-16 h-16 bg-gradient-to-br from-[#6A00FF] to-[#7B1FFF] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Loading Scheduling System</h3>
              <p className="text-gray-600 mb-6">Please wait while we prepare your consultation scheduling options...</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-[#6A00FF] to-[#7B1FFF] h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer with return button and contact information */}
      <div className="bg-gradient-to-r from-[#003459] to-[#6A00FF] py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <button
            onClick={handleReturnToOnboarding}
            className="mb-4 px-6 py-2 bg-white text-[#6A00FF] font-bold rounded-lg shadow-lg hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            ← Return to Onboarding
          </button>
          <p className="text-white/90 mb-2">
            Need assistance? Contact us at{' '}
            <a href="mailto:marketingflow-details@outlook.com" className="text-white font-medium underline hover:text-white/80">
              marketingflow-details@outlook.com
            </a>
          </p>
          <p className="text-white/80 text-sm">
            We typically respond within 24 hours during business days.
          </p>
        </div>
      </div>
    </div>
  )
}