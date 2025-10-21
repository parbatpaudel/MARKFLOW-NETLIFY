'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Send, CheckCircle2, AlertCircle, Calendar } from 'lucide-react'

export default function BookConsultationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    phone: '',
    message: '',
  })
  const [enableCalendly, setEnableCalendly] = useState(false)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.name || !formData.email || !formData.businessName || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill in all required fields' })
      return
    }

    setLoading(true)
    setStatus(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          subject: 'Consultation Booking Request',
          calendlyEnabled: enableCalendly,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus({ type: 'success', message: "Thank you! We'll contact you within 24 hours to schedule your consultation." })
        setFormData({
          name: '',
          email: '',
          businessName: '',
          phone: '',
          message: '',
        })
      } else {
        setStatus({ type: 'error', message: data.error || 'Something went wrong. Please try again.' })
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Network error. Please check your connection.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#003459] via-[#007ea7] to-[#00a8e8]">
            Book Your Free Consultation
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Let's discuss how we can transform your business with AI-powered sales and marketing strategies.
          </p>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="h-12 px-4 text-base border-gray-300 focus:border-[#007ea7] focus:ring-[#007ea7]"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
                className="h-12 px-4 text-base border-gray-300 focus:border-[#007ea7] focus:ring-[#007ea7]"
              />
            </div>

            {/* Business Name */}
            <div className="space-y-2">
              <label htmlFor="businessName" className="block text-sm font-semibold text-gray-700">
                Business Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="businessName"
                name="businessName"
                type="text"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Your Company Name"
                required
                className="h-12 px-4 text-base border-gray-300 focus:border-[#007ea7] focus:ring-[#007ea7]"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                Phone Number
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (234) 567-890 (optional)"
                className="h-12 px-4 text-base border-gray-300 focus:border-[#007ea7] focus:ring-[#007ea7]"
              />
            </div>
          </div>

          {/* Message */}
          <div className="mt-6 space-y-2">
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
              Tell us about your business goals <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Share your challenges, goals, and what you're looking to achieve..."
              required
              rows={6}
              className="px-4 py-3 text-base border-gray-300 focus:border-[#007ea7] focus:ring-[#007ea7] resize-none"
            />
          </div>

          {/* Calendly Toggle */}
          <div className="mt-6 p-6 bg-blue-50/50 border border-blue-200/50 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="flex items-center h-6">
                <input
                  type="checkbox"
                  id="enableCalendly"
                  checked={enableCalendly}
                  onChange={(e) => setEnableCalendly(e.target.checked)}
                  className="w-5 h-5 text-[#007ea7] border-gray-300 rounded focus:ring-[#007ea7]"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="enableCalendly" className="text-sm font-semibold text-gray-900 cursor-pointer flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Schedule immediately with Calendly
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  Check this box to schedule your consultation instantly using our calendar. Otherwise, we'll email you within 24 hours to arrange a time.
                </p>
                {enableCalendly && (
                  <div className="mt-4">
                    <a
                      href="https://calendly.com/proboscisparasite/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white bg-[#007ea7] hover:bg-[#006a8f] transition-all font-semibold shadow-md hover:shadow-lg"
                    >
                      <Calendar className="w-5 h-5" />
                      Book Your 30-Minute Session
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Status Message */}
          {status && (
            <div
              className={`mt-6 p-4 rounded-xl flex items-start gap-3 ${
                status.type === 'success'
                  ? 'bg-green-50 border border-green-200 text-green-800'
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}
            >
              {status.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              )}
              <p className="text-sm font-medium">{status.message}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-8">
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 text-base font-bold bg-gradient-to-r from-[#003459] via-[#007ea7] to-[#00a8e8] hover:from-[#002742] hover:via-[#006a8f] hover:to-[#0095ce] text-white shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  Book Free Consultation
                </span>
              )}
            </Button>
          </div>

          <p className="mt-4 text-sm text-gray-500 text-center">
            Our team will review your request and get back to you within 24 business hours.
          </p>
        </form>

        {/* Contact Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Prefer to reach us directly? Email us at{' '}
            <a href="mailto:marketingflow-details@outlook.com" className="font-semibold text-[#007ea7] hover:underline">
              marketingflow-details@outlook.com
            </a>
            {' '}or WhatsApp{' '}
            <a href="https://wa.me/9779763200956" target="_blank" rel="noopener noreferrer" className="font-semibold text-green-600 hover:underline">
              +977 9763200956
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
