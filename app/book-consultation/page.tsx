'use client'

import Link from 'next/link'

export default function BookConsultationPage() {
  return (
    <div className="min-h-screen px-4 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book a Consultation</h1>
          <p className="text-gray-600 text-sm">Tell us about your business and goals. We’ll schedule a personalized session.</p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white bg-gradient-to-r from-[#003459] to-[#007ea7] hover:from-[#00171f] hover:to-[#003459] shadow-md">
            Go to Contact Form
          </Link>
          <p className="text-sm text-gray-600">Prefer email? <span className="font-semibold text-gray-800">hello@modernsite.com</span></p>
        </div>
      </div>
    </div>
  )
}
