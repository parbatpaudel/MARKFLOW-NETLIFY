'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'

interface CalendlyModalProps {
  isOpen: boolean
  onClose: () => void
  url?: string
}

export default function CalendlyModal({ isOpen, onClose, url = 'https://calendly.com/proboscisparasite/30min' }: CalendlyModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Load Calendly widget script
      const script = document.createElement('script')
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      document.body.appendChild(script)

      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'

      return () => {
        document.body.style.overflow = 'unset'
        // Clean up script if needed
        const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')
        if (existingScript) {
          existingScript.remove()
        }
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-[95vw] sm:max-w-4xl h-[90vh] sm:h-[85vh] mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-[#003459] via-[#007ea7] to-[#00a8e8]">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Schedule Your Consultation</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all touch-manipulation"
            aria-label="Close modal"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <X className="w-6 h-6 text-white" strokeWidth={2.5} />
          </button>
        </div>

        {/* Calendly Embed */}
        <div className="w-full h-[calc(100%-4rem)] sm:h-[calc(100%-5rem)] overflow-auto">
          <div
            className="calendly-inline-widget w-full h-full"
            data-url={url}
            style={{ minWidth: '320px', height: '100%' }}
          />
        </div>
      </div>
    </div>
  )
}
