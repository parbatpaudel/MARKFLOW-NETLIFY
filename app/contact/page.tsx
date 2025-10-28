'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Sparkles,
  Building,
  Phone,
  Mail,
  Globe,
  Users,
  MapPin,
  Calendar,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Star,
  Award,
  Zap,
  User,
  Link as LinkIcon,
  Briefcase,
  Hash,
  Navigation,
  Clock,
  MessageSquare,
  Send
} from 'lucide-react'

// Country codes data
const countryCodes = [
  { code: '+1', country: 'United States', flag: '🇺🇸' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+977', country: 'Nepal', flag: '🇳🇵' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+1', country: 'Canada', flag: '🇨🇦' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
]

// Industries data
const industries = [
  'Technology',
  'E-commerce',
  'Healthcare',
  'Finance',
  'Education',
  'Retail',
  'Manufacturing',
  'Real Estate',
  'Food & Beverage',
  'Consulting',
  'Other'
]

// Business sizes
const businessSizes = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-400 employees',
  '400+ employees'
]

export default function ContactPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    companyName: '',
    phoneNumber: '',
    countryCode: '+977',
    businessIndustry: '',
    numberOfEmployees: '',
    country: '',
    email: '',
    website: '',
    scheduleMeeting: 'yes'
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showCalendly, setShowCalendly] = useState(false)

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Validate current step
  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {}
    
    if (step === 1) {
      if (!formData.companyName) newErrors.companyName = 'Company name is required'
      if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required'
      if (!formData.email) newErrors.email = 'Email is required'
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    }
    
    if (step === 2) {
      if (!formData.businessIndustry) newErrors.businessIndustry = 'Business industry is required'
      if (!formData.numberOfEmployees) newErrors.numberOfEmployees = 'Number of employees is required'
      if (!formData.country) newErrors.country = 'Country is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle next step
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
    }
  }

  // Handle previous step
  const handlePrev = () => {
    setCurrentStep(prev => prev - 1)
  }

  // Save form data to database
  const saveFormDataToDB = async () => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.companyName,
          email: formData.email,
          phone: `${formData.countryCode}${formData.phoneNumber}`,
          businessName: formData.companyName,
          industry: formData.businessIndustry,
          company: formData.companyName,
          businessDescription: `Employees: ${formData.numberOfEmployees}, Country: ${formData.country}`,
          subject: 'Business Onboarding Form',
          message: `Website: ${formData.website || 'Not provided'}`
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save form data');
      }

      return true;
    } catch (error) {
      console.error('Error saving form data:', error);
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Save form data to database first
    const saved = await saveFormDataToDB()
    
    if (!saved) {
      setIsSubmitting(false)
      // Show error message
      alert('There was an error submitting your information. Please try again.')
      return
    }
    
    // If user wants to schedule a meeting, show Calendly
    if (formData.scheduleMeeting === 'yes') {
      setShowCalendly(true)
    } else {
      // Show success message
      setIsSubmitted(true)
      // Reset form after submission
      setFormData({
        companyName: '',
        phoneNumber: '',
        countryCode: '+977',
        businessIndustry: '',
        numberOfEmployees: '',
        country: '',
        email: '',
        website: '',
        scheduleMeeting: 'yes'
      })
      // Reset to first step
      setCurrentStep(1)
    }
    setIsSubmitting(false)
  }

  // Handle Calendly close
  const handleCloseCalendly = () => {
    setShowCalendly(false)
    // After scheduling, show success message
    setIsSubmitted(true)
    // Reset form after submission
    setFormData({
      companyName: '',
      phoneNumber: '',
      countryCode: '+977',
      businessIndustry: '',
      numberOfEmployees: '',
      country: '',
      email: '',
      website: '',
      scheduleMeeting: 'yes'
    })
    // Reset to first step
    setCurrentStep(1)
  }

  // Function to handle successful scheduling
  const handleSchedulingComplete = () => {
    setShowCalendly(false)
    // Show success message
    setIsSubmitted(true)
    // Reset form after submission
    setFormData({
      companyName: '',
      phoneNumber: '',
      countryCode: '+977',
      businessIndustry: '',
      numberOfEmployees: '',
      country: '',
      email: '',
      website: '',
      scheduleMeeting: 'yes'
    })
    // Reset to first step
    setCurrentStep(1)
  }

  // Load Calendly script when component mounts
  useEffect(() => {
    // Check if script already exists
    if (!document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')) {
      const script = document.createElement('script')
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      script.onload = () => {
        console.log('Calendly script loaded successfully')
      }
      script.onerror = () => {
        console.error('Failed to load Calendly script')
      }
      document.body.appendChild(script)
    }
    
    // Add event listener for Calendly events
    const handleCalendlyEvent = (e: MessageEvent) => {
      if (e.data.event && e.data.event === 'calendly.event_scheduled') {
        console.log('Calendly event scheduled')
        // Small delay to ensure user sees confirmation
        setTimeout(() => {
          handleSchedulingComplete()
        }, 2000)
      }
    }
    
    window.addEventListener('message', handleCalendlyEvent)
    
    return () => {
      window.removeEventListener('message', handleCalendlyEvent)
    }
  }, [])

  // Initialize Calendly widget when showCalendly changes
  useEffect(() => {
    if (showCalendly) {
      // Add event listener specifically for iframe messages
      const handleMessage = (e: MessageEvent) => {
        if (e.origin === 'https://calendly.com') {
          if (e.data && e.data.event === 'calendly.event_scheduled') {
            console.log('Calendly event scheduled through iframe')
            // Small delay to ensure user sees confirmation
            setTimeout(() => {
              handleSchedulingComplete()
            }, 2000)
          }
        }
      }
      
      window.addEventListener('message', handleMessage)
      
      // Cleanup function
      return () => {
        window.removeEventListener('message', handleMessage)
      }
    }
  }, [showCalendly]);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Elements - Light version */}
      <div className="absolute inset-0">
        <div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[1200px] h-[1200px] rounded-full opacity-10 blur-[150px]"
          style={{
            background: 'radial-gradient(circle, #6E00FF 0%, #4A0080 70%)'
          }}
        ></div>
        <div 
          className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full opacity-5 blur-[100px]"
          style={{
            background: 'radial-gradient(circle, #8A2BE2 0%, #4A0080 70%)'
          }}
        ></div>
        <div 
          className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full opacity-10 blur-[80px]"
          style={{
            background: 'radial-gradient(circle, #4A0080 0%, #6E00FF 70%)'
          }}
        ></div>
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10 py-8 px-4 sm:px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <div className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-5 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
            <Sparkles className="w-5 h-5" />
            <span>Business Onboarding</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-800 mb-6">
            Transform Your Business
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of forward-thinking companies that trust us to drive growth and innovation
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            {[1, 2, 3].map((step) => (
              <motion.div 
                key={step} 
                className="flex flex-col items-center relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: step * 0.1 }}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${
                  currentStep === step 
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-700 text-white ring-4 ring-purple-500/30' 
                    : step < currentStep 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white' 
                      : 'bg-white border-2 border-gray-200 text-gray-600'
                }`}>
                  {step < currentStep ? <CheckCircle className="w-6 h-6 text-white" /> : (
                    <span className="font-bold text-lg">{step}</span>
                  )}
                </div>
                <span className="text-sm mt-3 text-center font-medium text-gray-600">
                  {step === 1 ? 'Business Info' : step === 2 ? 'Company Details' : 'Meeting'}
                </span>
                
                {/* Connector line */}
                {step < 3 && (
                  <div className="absolute top-7 left-14 w-full h-0.5 bg-gray-200 z-[-1]">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-purple-600 to-indigo-700"
                      initial={{ width: '0%' }}
                      animate={{ width: currentStep > step ? '100%' : `${Math.max(0, (currentStep - step) * 100)}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Onboarding Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="shadow-2xl border-gray-200 overflow-hidden rounded-3xl bg-white">
            <div className="lg:flex">
              {/* Left Side - Visual Banner */}
              <div className="lg:w-2/5 bg-gradient-to-br from-purple-700 via-indigo-800 to-purple-900 p-10 text-white flex flex-col justify-center relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-white/5 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/5 rounded-full"></div>
                
                <div className="relative z-10">
                  <motion.div 
                    className="mx-auto bg-white/20 p-5 rounded-2xl w-20 h-20 flex items-center justify-center mb-8"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  >
                    {currentStep === 1 && <Building className="h-10 w-10 text-white" />}
                    {currentStep === 2 && <Briefcase className="h-10 w-10 text-white" />}
                    {currentStep === 3 && <Calendar className="h-10 w-10 text-white" />}
                  </motion.div>
                  
                  <motion.h2 
                    className="text-3xl font-bold mb-5"
                    key={`title-${currentStep}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {currentStep === 1 && 'Business Information'}
                    {currentStep === 2 && 'Company Details'}
                    {currentStep === 3 && 'Schedule Meeting'}
                  </motion.h2>
                  
                  <motion.p 
                    className="opacity-90 mb-8 text-lg leading-relaxed"
                    key={`desc-${currentStep}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    {currentStep === 1 && 'Tell us about your company to get started'}
                    {currentStep === 2 && 'Share more details about your business'}
                    {currentStep === 3 && 'Schedule a consultation with our experts'}
                  </motion.p>
                  
                  {/* Benefits */}
                  <div className="space-y-5">
                    <motion.div 
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="bg-white/20 p-3 rounded-xl">
                        <Zap className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">Quick Setup</p>
                        <p className="text-sm opacity-80 text-white/90">Takes less than 2 minutes</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="bg-white/20 p-3 rounded-xl">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">Personalized Solutions</p>
                        <p className="text-sm opacity-80 text-white/90">Tailored to your needs</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
              
              {/* Right Side - Form Content */}
              <div className="lg:w-3/5 p-10">
                <AnimatePresence mode="wait">
                  {/* Step 1: Business Information */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.4 }}
                    >
                      <CardHeader className="px-0 pt-0 pb-8">
                        <CardTitle className="text-3xl flex items-center gap-3 text-gray-900">
                          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-2 rounded-xl">
                            <Building className="h-8 w-8 text-white" />
                          </div>
                          Business Information
                        </CardTitle>
                        <CardDescription className="text-xl mt-3 text-gray-600">
                          Basic information about your company
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="px-0 pb-0">
                        <div className="space-y-7">
                          <div>
                            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                              <Building className="w-4 h-4 text-gray-500" />
                              Company Name *
                            </label>
                            <div className="relative">
                              <Input
                                id="companyName"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleInputChange}
                                placeholder="Enter your company name"
                                className={`pl-12 py-6 bg-white border border-gray-300 text-gray-900 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                                  errors.companyName ? 'border-red-500' : ''
                                }`}
                              />
                              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                                <Building className="w-5 h-5" />
                              </div>
                            </div>
                            {errors.companyName && <p className="mt-2 text-sm text-red-500">{errors.companyName}</p>}
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                              <Phone className="w-4 h-4 text-gray-500" />
                              Phone Number *
                            </label>
                            <div className="flex gap-3">
                              <select
                                name="countryCode"
                                value={formData.countryCode}
                                onChange={handleInputChange}
                                className="w-28 px-4 py-6 bg-white border border-gray-300 text-gray-900 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none"
                              >
                                {countryCodes.map((country, index) => (
                                  <option key={index} value={country.code} className="bg-white">
                                    {country.flag} {country.code}
                                  </option>
                                ))}
                              </select>
                              <div className="relative flex-1">
                                <Input
                                  type="tel"
                                  name="phoneNumber"
                                  value={formData.phoneNumber}
                                  onChange={handleInputChange}
                                  placeholder="Enter phone number"
                                  className={`pl-12 py-6 bg-white border border-gray-300 text-gray-900 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                                    errors.phoneNumber ? 'border-red-500' : ''
                                  }`}
                                />
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                                  <Phone className="w-5 h-5" />
                                </div>
                              </div>
                            </div>
                            {errors.phoneNumber && <p className="mt-2 text-sm text-red-500">{errors.phoneNumber}</p>}
                          </div>
                          
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                              <Mail className="w-4 h-4 text-gray-500" />
                              Email Address *
                            </label>
                            <div className="relative">
                              <Input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email"
                                className={`pl-12 py-6 bg-white border border-gray-300 text-gray-900 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                                  errors.email ? 'border-red-500' : ''
                                }`}
                              />
                              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                                <Mail className="w-5 h-5" />
                              </div>
                            </div>
                            {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
                          </div>
                          
                          <div>
                            <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                              <LinkIcon className="w-4 h-4 text-gray-500" />
                              Website (Optional)
                            </label>
                            <div className="relative">
                              <Input
                                type="url"
                                id="website"
                                name="website"
                                value={formData.website}
                                onChange={handleInputChange}
                                placeholder="https://yourwebsite.com"
                                className="pl-12 py-6 bg-white border border-gray-300 text-gray-900 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                              />
                              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                                <Globe className="w-5 h-5" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                  
                  {/* Step 2: Company Details */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.4 }}
                    >
                      <CardHeader className="px-0 pt-0 pb-8">
                        <CardTitle className="text-3xl flex items-center gap-3 text-gray-900">
                          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-2 rounded-xl">
                            <Briefcase className="h-8 w-8 text-white" />
                          </div>
                          Company Details
                        </CardTitle>
                        <CardDescription className="text-xl mt-3 text-gray-600">
                          More information about your business
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="px-0 pb-0">
                        <div className="space-y-7">
                          <div>
                            <label htmlFor="businessIndustry" className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                              <Briefcase className="w-4 h-4 text-gray-500" />
                              Business Industry *
                            </label>
                            <div className="relative">
                              <select
                                id="businessIndustry"
                                name="businessIndustry"
                                value={formData.businessIndustry}
                                onChange={handleInputChange}
                                className={`w-full pl-12 pr-4 py-6 bg-white border border-gray-300 text-gray-900 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none ${
                                  errors.businessIndustry ? 'border-red-500' : ''
                                }`}
                              >
                                <option value="" className="bg-white">Select your industry</option>
                                {industries.map((industry, index) => (
                                  <option key={index} value={industry} className="bg-white">{industry}</option>
                                ))}
                              </select>
                              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                                <Briefcase className="w-5 h-5" />
                              </div>
                            </div>
                            {errors.businessIndustry && <p className="mt-2 text-sm text-red-500">{errors.businessIndustry}</p>}
                          </div>
                          
                          <div>
                            <label htmlFor="numberOfEmployees" className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                              <Users className="w-4 h-4 text-gray-500" />
                              Number of Employees *
                            </label>
                            <div className="relative">
                              <select
                                id="numberOfEmployees"
                                name="numberOfEmployees"
                                value={formData.numberOfEmployees}
                                onChange={handleInputChange}
                                className={`w-full pl-12 pr-4 py-6 bg-white border border-gray-300 text-gray-900 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none ${
                                  errors.numberOfEmployees ? 'border-red-500' : ''
                                }`}
                              >
                                <option value="" className="bg-white">Select employee range</option>
                                {businessSizes.map((size, index) => (
                                  <option key={index} value={size} className="bg-white">{size}</option>
                                ))}
                              </select>
                              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                                <Users className="w-5 h-5" />
                              </div>
                            </div>
                            {errors.numberOfEmployees && <p className="mt-2 text-sm text-red-500">{errors.numberOfEmployees}</p>}
                          </div>
                          
                          <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                              <Navigation className="w-4 h-4 text-gray-500" />
                              Country *
                            </label>
                            <div className="relative">
                              <select
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                className={`w-full pl-12 pr-4 py-6 bg-white border border-gray-300 text-gray-900 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none ${
                                  errors.country ? 'border-red-500' : ''
                                }`}
                              >
                                <option value="" className="bg-white">Select your country</option>
                                {countryCodes.map((country, index) => (
                                  <option key={index} value={country.country} className="bg-white">
                                    {country.flag} {country.country}
                                  </option>
                                ))}
                              </select>
                              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                                <MapPin className="w-5 h-5" />
                              </div>
                            </div>
                            {errors.country && <p className="mt-2 text-sm text-red-500">{errors.country}</p>}
                          </div>
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                  
                  {/* Step 3: Schedule Meeting */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.4 }}
                    >
                      <CardHeader className="px-0 pt-0 pb-8">
                        <CardTitle className="text-3xl flex items-center gap-3 text-gray-900">
                          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-2 rounded-xl">
                            <Calendar className="h-8 w-8 text-white" />
                          </div>
                          Schedule Meeting
                        </CardTitle>
                        <CardDescription className="text-xl mt-3 text-gray-600">
                          Would you like to schedule a consultation with our experts?
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="px-0 pb-0">
                        <div className="space-y-8">
                          <div className="flex items-center justify-between p-6 border border-gray-200 rounded-2xl bg-gray-50 hover:border-purple-500/50 transition-all">
                            <div>
                              <h3 className="font-bold text-xl text-gray-900 mb-2">Schedule a Meeting</h3>
                              <p className="text-gray-600">
                                30-minute consultation with our business experts
                              </p>
                            </div>
                            <div className="flex items-center">
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="scheduleMeeting"
                                  checked={formData.scheduleMeeting === 'yes'}
                                  onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    scheduleMeeting: e.target.checked ? 'yes' : 'no'
                                  }))}
                                  className="sr-only peer"
                                />
                                <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-500/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-indigo-700"></div>
                              </label>
                            </div>
                          </div>
                          
                          {formData.scheduleMeeting === 'yes' ? (
                            <motion.div 
                              className="p-8 bg-gradient-to-br from-purple-500/10 to-indigo-600/10 rounded-2xl border border-purple-500/30"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5 }}
                            >
                              <div className="flex items-start gap-5">
                                <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-4 rounded-xl">
                                  <Calendar className="h-8 w-8 text-white" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-bold text-2xl text-gray-900 mb-3">Schedule Your Consultation</h3>
                                  <p className="text-gray-600 mb-6">
                                    Click below to select a time that works best for you. Our team will contact you to confirm the details.
                                  </p>
                                  <Button 
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white py-6 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
                                  >
                                    {isSubmitting ? (
                                      <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                        <span className="text-white">Saving...</span>
                                      </div>
                                    ) : (
                                      <>
                                        <Calendar className="w-5 h-5 mr-3 text-white" />
                                        <span className="text-white">Schedule Meeting</span>
                                      </>
                                    )}
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          ) : (
                            <motion.div 
                              className="p-8 bg-gray-50 rounded-2xl border border-gray-200"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5 }}
                            >
                              <div className="flex items-start gap-5">
                                <div className="bg-gray-200 p-4 rounded-xl">
                                  <MessageSquare className="h-8 w-8 text-gray-600" />
                                </div>
                                <div>
                                  <h3 className="font-bold text-2xl text-gray-900 mb-3">We'll Contact You</h3>
                                  <p className="text-gray-600 mb-6">
                                    No problem! We'll review your information and reach out to you within 24 hours to discuss how we can help your business.
                                  </p>
                                  <Button 
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white py-6 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
                                  >
                                    {isSubmitting ? (
                                      <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                        <span className="text-white">Saving...</span>
                                      </div>
                                    ) : (
                                      <>
                                        <Send className="w-5 h-5 mr-3 text-white" />
                                        <span className="text-white">Submit Information</span>
                                      </>
                                    )}
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                          
                          <div className="pt-4">
                            <AnimatePresence>
                              {isSubmitted && (
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  className="mt-6 p-5 bg-gradient-to-r from-emerald-500/20 to-teal-600/20 border border-emerald-500/30 rounded-xl flex items-center gap-3"
                                >
                                  <CheckCircle className="h-6 w-6 text-emerald-600" />
                                  <span className="text-emerald-700">
                                    {formData.scheduleMeeting === 'yes' 
                                      ? 'Information submitted successfully! Please check your email for meeting confirmation.' 
                                      : 'Information submitted successfully! We will contact you soon.'}
                                  </span>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Navigation Buttons */}
                <div className="flex justify-between mt-10">
                  {currentStep > 1 && (
                    <Button 
                      onClick={handlePrev}
                      variant="outline"
                      className="flex items-center gap-2 bg-white border border-gray-300 text-gray-900 hover:bg-gray-50 py-5 px-6 rounded-xl"
                    >
                      <ArrowLeft className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">Previous</span>
                    </Button>
                  )}
                  
                  {currentStep < 3 && (
                    <Button 
                      onClick={handleNext}
                      className="ml-auto flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white py-5 px-6 rounded-xl shadow-lg"
                    >
                      <span className="text-white">Next</span>
                      <ArrowRight className="w-5 h-5 text-white" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
        
        {/* Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 mt-16">
          {[
            { value: '500+', label: 'Happy Clients', icon: <Users className="w-6 h-6 text-white" /> },
            { value: '98%', label: 'Satisfaction Rate', icon: <Star className="w-6 h-6 text-white" /> },
            { value: '24/7', label: 'Support Available', icon: <Clock className="w-6 h-6 text-white" /> },
            { value: '150+', label: 'Countries Served', icon: <Navigation className="w-6 h-6 text-white" /> }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xl text-center hover:border-purple-500/30 transition-all"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Calendly Inline Widget */}
      {showCalendly && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Schedule Your Consultation</h2>
              <button
                onClick={handleCloseCalendly}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="w-full h-[calc(100%-4rem)]">
              {/* Direct iframe approach for more reliable loading */}
              <iframe
                src="https://calendly.com/markflow123"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Schedule a consultation"
                className="calendly-widget"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}