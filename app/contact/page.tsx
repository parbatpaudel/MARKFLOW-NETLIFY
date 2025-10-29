'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRecaptcha } from '@/hooks/useRecaptcha'
import { 
  Sparkles,
  Building,
  Phone,
  Mail,
  Users,
  ArrowRight,
  ArrowLeft,
  Shield,
  CheckCircle,
  TrendingUp,
  Star
} from 'lucide-react'

// Question data
const questions = [
  {
    id: 1,
    title: "Where is your business based?",
    subtitle: "Select your primary location",
    type: "select",
    options: [
      { value: "usa", label: "USA", icon: "🇺🇸", description: "United States" },
      { value: "india", label: "India", icon: "🇮🇳", description: "India" },
      { value: "nepal", label: "Nepal", icon: "🇳🇵", description: "Nepal" },
      { value: "other", label: "Other", icon: "🌍", description: "Other Country" }
    ]
  },
  {
    id: 2,
    title: "What industry are you in?",
    subtitle: "Choose your business sector",
    type: "select",
    options: [
      { value: "tech", label: "Technology", icon: "💻", description: "Software & IT" },
      { value: "ecommerce", label: "E-commerce", icon: "🛒", description: "Online retail" },
      { value: "healthcare", label: "Healthcare", icon: "🏥", description: "Medical services" },
      { value: "finance", label: "Finance", icon: "💰", description: "Banking & fintech" }
    ]
  },
  {
    id: 3,
    title: "What's your company size?",
    subtitle: "Number of employees",
    type: "select",
    options: [
      { value: "1-10", label: "1-10", icon: "👤", description: "Small team" },
      { value: "11-50", label: "11-50", icon: "👥", description: "Growing company" },
      { value: "51-200", label: "51-200", icon: "🏢", description: "Mid-size business" },
      { value: "200+", label: "200+", icon: "🏭", description: "Large company" }
    ]
  }
]

export default function ContactPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    location: '',
    industry: '',
    companySize: '',
    companyName: '',
    email: '',
    phoneNumber: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { isLoaded, isLoading, executeAndVerify } = useRecaptcha({ autoLoad: true })

  const currentQuestion = questions.find(q => q.id === currentStep)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleOptionSelect = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Auto-advance to next step after selection
    if (currentStep < 4) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1)
      }, 500)
    }
  }

  const validateCurrentStep = () => {
    const newErrors: Record<string, string> = {}
    
    if (currentStep === 4) {
      if (!formData.companyName) newErrors.companyName = 'Company name is required'
      if (!formData.email) newErrors.email = 'Email is required'
      if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1: return !!formData.location
      case 2: return !!formData.industry
      case 3: return !!formData.companySize
      case 4: return formData.companyName && formData.email && formData.phoneNumber
      default: return false
    }
  } 
 const handleNext = () => {
    if (canProceed() && currentStep < 4) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  // Submit form to database
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateCurrentStep()) return
    
    setIsSubmitting(true)
    try {
      // reCAPTCHA verification (with fallback)
      try {
        const recaptchaResult = await executeAndVerify('contact_form')
        if (!recaptchaResult.success || !recaptchaResult.isHuman) {
          console.warn('reCAPTCHA verification failed, proceeding without it')
        }
      } catch (recaptchaError) {
        console.warn('reCAPTCHA error, proceeding without verification:', recaptchaError)
      }

      // Submit to database
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.companyName,
          email: formData.email,
          phone: formData.phoneNumber,
          businessName: formData.companyName,
          industry: formData.industry,
          company: formData.companyName,
          businessDescription: `Location: ${formData.location}, Industry: ${formData.industry}, Size: ${formData.companySize}`,
          subject: 'Business Inquiry',
          message: `Business inquiry from ${formData.companyName}. Location: ${formData.location}, Industry: ${formData.industry}, Company Size: ${formData.companySize}`
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      setIsSubmitted(true)
      // Reset form
      setFormData({
        location: '',
        industry: '',
        companySize: '',
        companyName: '',
        email: '',
        phoneNumber: ''
      })
      setCurrentStep(1)
    } catch (error) {
      console.error('Form submission error:', error)
      alert(error instanceof Error ? error.message : 'Submission failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0D1117] relative overflow-hidden">
      {/* Dark Background Elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-20 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, #6A00FF 0%, #4A0080 40%, transparent 70%)'
          }}
        />
        <div 
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-15 blur-[100px]"
          style={{
            background: 'radial-gradient(circle, #8A2BE2 0%, #6A00FF 50%, transparent 70%)'
          }}
        />
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10 py-4 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.div 
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-xl"
            animate={{ 
              boxShadow: [
                "0 10px 25px rgba(139, 92, 246, 0.3)",
                "0 15px 35px rgba(139, 92, 246, 0.4)",
                "0 10px 25px rgba(139, 92, 246, 0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>STEP {currentStep} OF 4</span>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </motion.div>
          
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 leading-tight"
            animate={{ 
              textShadow: [
                "0 0 20px rgba(139, 92, 246, 0.5)",
                "0 0 30px rgba(139, 92, 246, 0.7)",
                "0 0 20px rgba(139, 92, 246, 0.5)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            WE <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent animate-pulse">SCALE</span> GREAT COMPANIES.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-base text-gray-300 mb-6 max-w-2xl mx-auto"
          >
            Join 500+ companies that have transformed their business with our proven strategies
          </motion.p>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>Start</span>
              <span>{Math.round((currentStep / 4) * 100)}% Complete</span>
              <span>Finish</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-3 shadow-inner">
              <motion.div 
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 h-3 rounded-full shadow-lg relative overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / 4) * 100}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Question Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            <Card className="shadow-2xl border border-white/10 rounded-2xl bg-white/95 backdrop-blur-sm overflow-hidden">
              <div className="p-6 md:p-8">
                {currentQuestion && currentStep <= 3 ? (
                  <>
                    {/* Question Header */}
                    <motion.div 
                      className="text-center mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.h2 
                        className="text-2xl md:text-3xl font-black text-gray-900 mb-2 leading-tight"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        {currentQuestion.title}
                        <span className="text-red-500 animate-pulse">*</span>
                      </motion.h2>
                      <motion.p 
                        className="text-base text-gray-600 max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {currentQuestion.subtitle}
                      </motion.p>
                    </motion.div>

                    {/* Options */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      {currentQuestion.options?.map((option, index) => {
                        const isSelected = formData[
                          currentStep === 1 ? 'location' :
                          currentStep === 2 ? 'industry' :
                          'companySize'
                        ] === option.value

                        return (
                          <motion.div
                            key={option.value}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            whileHover={{ 
                              scale: 1.05,
                              boxShadow: "0 20px 40px rgba(139, 92, 246, 0.15)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-300 group ${
                              isSelected 
                                ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-indigo-50 shadow-2xl transform scale-105' 
                                : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-xl hover:bg-gradient-to-br hover:from-purple-25 hover:to-indigo-25'
                            }`}
                            onClick={() => handleOptionSelect(
                              currentStep === 1 ? 'location' :
                              currentStep === 2 ? 'industry' :
                              'companySize',
                              option.value
                            )}
                          >
                            {isSelected && (
                              <motion.div 
                                className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              >
                                <CheckCircle className="w-5 h-5 text-white" />
                              </motion.div>
                            )}
                            
                            <div className="text-center">
                              <motion.div 
                                className="text-3xl mb-2 filter drop-shadow-lg"
                                whileHover={{ scale: 1.1, rotate: 3 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                {option.icon}
                              </motion.div>
                              <h3 className={`font-bold text-base mb-1 transition-colors ${
                                isSelected ? 'text-purple-700' : 'text-gray-900 group-hover:text-purple-600'
                              }`}>
                                {option.label}
                              </h3>
                              <p className={`text-xs transition-colors ${
                                isSelected ? 'text-purple-600' : 'text-gray-600 group-hover:text-gray-700'
                              }`}>
                                {option.description}
                              </p>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </>
                ) : (          
        // Contact Form (Step 4)
                  <>
                    <motion.div 
                      className="text-center mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
                        Tell us about your business
                        <span className="text-red-500 animate-pulse">*</span>
                      </h2>
                      <p className="text-base text-gray-600">Basic information to get started</p>
                    </motion.div>

                    <motion.form 
                      onSubmit={handleSubmit} 
                      className="space-y-6 mb-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="grid gap-6">
                        <motion.div 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <label htmlFor="companyName" className="block text-base font-bold text-gray-800 mb-2">
                            Company Name <span className="text-red-500 animate-pulse">*</span>
                          </label>
                          <div className="relative">
                            <Input
                              type="text"
                              id="companyName"
                              name="companyName"
                              value={formData.companyName}
                              onChange={handleInputChange}
                              placeholder="Enter your company name"
                              className={`h-12 bg-white border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 text-base px-4 shadow-sm hover:shadow-md ${
                                errors.companyName ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : ''
                              }`}
                            />
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                              <Building className="w-5 h-5" />
                            </div>
                          </div>
                          {errors.companyName && (
                            <motion.p 
                              className="mt-2 text-sm text-red-500 flex items-center gap-1"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                            >
                              <span className="w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">!</span>
                              {errors.companyName}
                            </motion.p>
                          )}
                        </motion.div>

                        <motion.div 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                        >
                          <label htmlFor="email" className="block text-base font-bold text-gray-800 mb-2">
                            Email Address <span className="text-red-500 animate-pulse">*</span>
                          </label>
                          <div className="relative">
                            <Input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="Enter your email address"
                              className={`h-12 bg-white border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 text-base px-4 shadow-sm hover:shadow-md ${
                                errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : ''
                              }`}
                            />
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                              <Mail className="w-5 h-5" />
                            </div>
                          </div>
                          {errors.email && (
                            <motion.p 
                              className="mt-2 text-sm text-red-500 flex items-center gap-1"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                            >
                              <span className="w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">!</span>
                              {errors.email}
                            </motion.p>
                          )}
                        </motion.div>

                        <motion.div 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                        >
                          <label htmlFor="phoneNumber" className="block text-base font-bold text-gray-800 mb-2">
                            Phone Number <span className="text-red-500 animate-pulse">*</span>
                          </label>
                          <div className="relative">
                            <Input
                              type="tel"
                              id="phoneNumber"
                              name="phoneNumber"
                              value={formData.phoneNumber}
                              onChange={handleInputChange}
                              placeholder="Enter your phone number"
                              className={`h-12 bg-white border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 text-base px-4 shadow-sm hover:shadow-md ${
                                errors.phoneNumber ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : ''
                              }`}
                            />
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                              <Phone className="w-5 h-5" />
                            </div>
                          </div>
                          {errors.phoneNumber && (
                            <motion.p 
                              className="mt-2 text-sm text-red-500 flex items-center gap-1"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                            >
                              <span className="w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">!</span>
                              {errors.phoneNumber}
                            </motion.p>
                          )}
                        </motion.div>
                      </div>

                      {/* reCAPTCHA Status */}
                      <motion.div 
                        className="flex items-center justify-center gap-3 py-4 px-6 bg-gray-50 rounded-xl border border-gray-200"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <motion.div
                          animate={{ rotate: isLoading ? 360 : 0 }}
                          transition={{ duration: 1, repeat: isLoading ? Infinity : 0 }}
                        >
                          <Shield className={`w-5 h-5 ${isLoaded ? 'text-green-500' : isLoading ? 'text-yellow-500' : 'text-gray-400'}`} />
                        </motion.div>
                        <span className="text-sm font-medium text-gray-600">
                          {isLoading ? 'Initializing security...' : isLoaded ? 'Secured by reCAPTCHA v3' : 'Loading security...'}
                        </span>
                        {isLoaded && (
                          <motion.div
                            className="w-2 h-2 bg-green-500 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                        )}
                      </motion.div>
                    </motion.form>
                  </>
                )}    
            {/* Navigation */}
                <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                  {currentStep > 1 ? (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={handlePrev}
                        variant="outline"
                        className="flex items-center gap-3 px-8 py-4 border-2 border-gray-300 text-gray-700 hover:border-purple-400 hover:text-purple-600 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        Back
                      </Button>
                    </motion.div>
                  ) : (
                    <div></div>
                  )}

                  {currentStep < 4 ? (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={handleNext}
                        disabled={!canProceed()}
                        className={`flex items-center gap-3 px-10 py-4 font-bold rounded-xl shadow-xl transition-all duration-300 ${
                          canProceed() 
                            ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:via-indigo-700 hover:to-purple-800 text-white hover:shadow-2xl hover:shadow-purple-500/25' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <span className="text-lg">NEXT</span>
                        <motion.div
                          animate={{ x: canProceed() ? [0, 5, 0] : 0 }}
                          transition={{ duration: 1, repeat: canProceed() ? Infinity : 0 }}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                    >
                      <Button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={!canProceed() || isSubmitting}
                        className={`flex items-center gap-3 px-12 py-4 font-bold rounded-xl shadow-xl transition-all duration-300 ${
                          canProceed() && !isSubmitting
                            ? 'bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 hover:from-green-600 hover:via-emerald-600 hover:to-green-700 text-white hover:shadow-2xl hover:shadow-green-500/25' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                            <span className="text-lg">SUBMITTING...</span>
                          </>
                        ) : (
                          <>
                            <span className="text-lg">SUBMIT</span>
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            >
                              <CheckCircle className="w-5 h-5" />
                            </motion.div>
                          </>
                        )}
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Success Message */}
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="bg-white rounded-2xl p-8 max-w-md mx-auto text-center shadow-2xl"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600 mb-6">Your information has been submitted successfully. We'll be in touch soon!</p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-6 py-2 rounded-xl"
                >
                  Close
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust Indicators */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <motion.div 
              className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Users className="w-8 h-8 text-purple-400" />
              </motion.div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">500+</div>
                <div className="text-sm text-gray-400">Companies Scaled</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <TrendingUp className="w-8 h-8 text-green-400" />
              </motion.div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">180%</div>
                <div className="text-sm text-gray-400">Average Growth</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-8 h-8 text-yellow-400" />
              </motion.div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">4.9/5</div>
                <div className="text-sm text-gray-400">Client Satisfaction</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}