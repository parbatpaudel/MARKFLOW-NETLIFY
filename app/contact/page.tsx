"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react"
import Script from "next/script"

declare global {
  interface Window {
    Calendly?: {
      initBadgeWidget: (options: {
        url: string
        text: string
        color: string
        textColor: string
        branding: boolean
      }) => void
    }
  }
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
    industry: "",
    company: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const industries = [
    "Technology",
    "E-commerce",
    "Healthcare",
    "Finance",
    "Education",
    "Retail",
    "Manufacturing",
    "Real Estate",
    "Food & Beverage",
    "Consulting",
    "Other",
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name || !formData.email || !formData.businessName || !formData.industry || !formData.message) {
      setStatus({ type: "error", message: "Please fill in all required fields" })
      return
    }

    setLoading(true)
    setStatus(null)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          recaptchaToken: "dev_bypass",
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus({ type: "success", message: "Thank you! We'll get back to you soon." })
        setFormData({
          name: "",
          email: "",
          businessName: "",
          industry: "",
          company: "",
          subject: "",
          message: "",
        })
      } else {
        setStatus({ type: "error", message: data.error || "Something went wrong. Please try again." })
      }
    } catch (error) {
      setStatus({ type: "error", message: "Network error. Please check your connection." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Calendly Widget Scripts */}
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.Calendly) {
            window.Calendly.initBadgeWidget({
              url: 'https://calendly.com/proboscisparasite/30min',
              text: 'Schedule time with me',
              color: '#0069ff',
              textColor: '#ffffff',
              branding: true
            })
          }
        }}
      />

      <div className="min-h-screen py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#003459] via-[#007ea7] to-[#00a8e8]">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to transform your business? Let's discuss how we can help you achieve your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Contact Information</h2>
                
                <div className="space-y-5">
                  <div className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-[#003459] to-[#007ea7] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 mb-1">Email</p>
                      <a href="mailto:contact@marketflow.com" className="text-gray-900 hover:text-[#007ea7] font-medium transition-colors">
                        contact@marketflow.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-[#007ea7] to-[#00a8e8] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 mb-1">Phone</p>
                      <a href="tel:+1234567890" className="text-gray-900 hover:text-[#007ea7] font-medium transition-colors">
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-[#00a8e8] to-[#003459] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 mb-1">Location</p>
                      <p className="text-gray-900 font-medium">
                        123 Business Street<br />
                        New York, NY 10001
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-gradient-to-br from-[#003459] to-[#007ea7] rounded-2xl shadow-xl p-6 md:p-8 text-white">
                <h3 className="text-xl font-bold mb-4">Business Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-900">Send us a Message</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
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
                      className="h-12 px-4 text-base border-gray-300 focus:border-[#007ea7] focus:ring-[#007ea7] touch-manipulation"
                      style={{ WebkitTapHighlightColor: 'transparent' }}
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
                      className="h-12 px-4 text-base border-gray-300 focus:border-[#007ea7] focus:ring-[#007ea7] touch-manipulation"
                      style={{ WebkitTapHighlightColor: 'transparent' }}
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
                      className="h-12 px-4 text-base border-gray-300 focus:border-[#007ea7] focus:ring-[#007ea7] touch-manipulation"
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    />
                  </div>

                  {/* Industry */}
                  <div className="space-y-2">
                    <label htmlFor="industry" className="block text-sm font-semibold text-gray-700">
                      Industry <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      required
                      className="w-full h-12 px-4 text-base border border-gray-300 rounded-md focus:border-[#007ea7] focus:ring-2 focus:ring-[#007ea7] focus:outline-none bg-white touch-manipulation"
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      <option value="">Select your industry</option>
                      {industries.map((industry) => (
                        <option key={industry} value={industry}>
                          {industry}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Company (Optional) */}
                  <div className="space-y-2">
                    <label htmlFor="company" className="block text-sm font-semibold text-gray-700">
                      Company Website
                    </label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="www.example.com (optional)"
                      className="h-12 px-4 text-base border-gray-300 focus:border-[#007ea7] focus:ring-[#007ea7] touch-manipulation"
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help? (optional)"
                      className="h-12 px-4 text-base border-gray-300 focus:border-[#007ea7] focus:ring-[#007ea7] touch-manipulation"
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="mt-5 md:mt-6 space-y-2">
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your business needs..."
                    required
                    rows={6}
                    className="px-4 py-3 text-base border-gray-300 focus:border-[#007ea7] focus:ring-[#007ea7] resize-none touch-manipulation"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  />
                </div>

                {/* Status Message */}
                {status && (
                  <div
                    className={`mt-6 p-4 rounded-xl flex items-start gap-3 ${
                      status.type === "success"
                        ? "bg-green-50 border border-green-200 text-green-800"
                        : "bg-red-50 border border-red-200 text-red-800"
                    }`}
                  >
                    {status.type === "success" ? (
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
                    className="w-full h-14 text-base font-bold bg-gradient-to-r from-[#003459] via-[#007ea7] to-[#00a8e8] hover:from-[#002742] hover:via-[#006a8f] hover:to-[#0095ce] text-white shadow-lg hover:shadow-xl transition-all touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="w-5 h-5" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </div>

                <p className="mt-4 text-sm text-gray-500 text-center">
                  We typically respond within 24 hours during business days.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
