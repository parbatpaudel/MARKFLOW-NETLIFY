'use client'

import { useEffect } from 'react'
import { X, XCircle } from 'lucide-react'

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

      // Add escape key listener
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
      }
      document.addEventListener('keydown', handleEsc)

      return () => {
        document.body.style.overflow = 'unset'
        document.removeEventListener('keydown', handleEsc)
        // Clean up script if needed
        const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')
        if (existingScript) {
          existingScript.remove()
        }
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2">
      {/* Backdrop with close functionality */ }
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
        aria-label="Close modal"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onClose()
        }}
      />
      
      {/* Modal Container - Smaller size */}
      <div className="relative w-full max-w-[90vw] sm:max-w-2xl md:max-w-3xl h-[80vh] sm:h-[75vh] mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header with close button */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 bg-gradient-to-r from-[#003459] via-[#007ea7] to-[#00a8e8]">
          <h2 className="text-base sm:text-lg font-bold text-white">Schedule Your Consultation</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all touch-manipulation flex items-center justify-center"
            aria-label="Close modal"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <X className="w-5 h-5 text-white" strokeWidth={2.5} />
          </button>
        </div>

        {/* Calendly Embed */}
        <div className="w-full h-[calc(100%-3rem)] sm:h-[calc(100%-4rem)] overflow-auto">
          <div
            className="calendly-inline-widget w-full h-full"
            data-url={url}
            style={{ minWidth: '300px', height: '100%' }}
          />
        </div>
        
        {/* Additional close hint for mobile users */}
        <div className="absolute top-1.5 right-1.5 sm:top-2.5 sm:right-2.5 md:hidden">
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-black/20 hover:bg-black/30 transition-all touch-manipulation flex items-center justify-center"
            aria-label="Close modal"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <XCircle className="w-6 h-6 text-white" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  )
}