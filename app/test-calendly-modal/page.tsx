'use client'

import { useState } from 'react'
import CalendlyModal from '@/components/ui/calendly-modal'

export default function TestCalendlyModalPage() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Calendly Modal Test</h1>
        
        <div className="space-y-6">
          <p className="text-gray-600 text-center">
            Click the button below to open the Calendly modal. You can close it by:
          </p>
          
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Clicking the X button in the top-right corner</li>
            <li>Clicking anywhere outside the modal (on the backdrop)</li>
            <li>Pressing the Escape key on your keyboard</li>
            <li className="md:hidden">Clicking the larger X button in the top-right corner on mobile</li>
          </ul>
          
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Open Calendly Modal
            </button>
          </div>
        </div>
      </div>
      
      <CalendlyModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </div>
  )
}