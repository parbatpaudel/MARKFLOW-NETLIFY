'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Play, 
  Building2, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target,
  Zap,
  Brain,
  MessageCircle,
  BarChart3,
  Workflow,
  Search,
  Lightbulb,
  Megaphone,
  CheckCircle,
  Calendar,
  Clock,
  Award,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'
import CalendlyModal from '@/components/ui/calendly-modal'

// Consulting Process Steps
const consultingProcessSteps = [
  {
    id: 1,
    title: "Initial Consultation",
    description: "We start with a comprehensive discovery session to understand your business goals, challenges, and opportunities.",
    icon: <Users className="w-8 h-8" />
  },
  {
    id: 2,
    title: "Strategy Development",
    description: "Our experts create a customized AI-powered sales strategy aligned with your specific business objectives.",
    icon: <Target className="w-8 h-8" />
  },
  {
    id: 3,
    title: "Implementation Planning",
    description: "We develop a detailed roadmap for deploying our AI solutions with minimal disruption to your operations.",
    icon: <TrendingUp className="w-8 h-8" />
  },
  {
    id: 4,
    title: "Solution Deployment",
    description: "Our team implements the AI tools and integrates them with your existing systems for seamless operation.",
    icon: <Clock className="w-8 h-8" />
  },
  {
    id: 5,
    title: "Training & Onboarding",
    description: "We provide comprehensive training to your team to ensure successful adoption of the new solutions.",
    icon: <Users className="w-8 h-8" />
  },
  {
    id: 6,
    title: "Ongoing Support & Optimization",
    description: "We continuously monitor performance and refine the system to maximize your ROI and business impact.",
    icon: <TrendingUp className="w-8 h-8" />
  }
]

// Service Areas
const serviceAreas = [
  "AI-Powered Sales Automation",
  "Lead Generation & Qualification",
  "Customer Lifecycle Management",
  "Predictive Analytics & Forecasting",
  "Conversational AI Solutions",
  "Marketing Automation",
  "CRM Integration & Optimization",
  "Sales Performance Analytics"
]

// Contact Information
const contactInfo = [
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email Us",
    value: "consulting@markflow.ai"
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Call Us",
    value: "+1 (555) 123-4567"
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Visit Us",
    value: "123 Innovation Drive, San Francisco, CA 94103"
  }
]

export default function ConsultingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSubmitSuccess(true)
      setFormData({ name: '', email: '', company: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    } catch (error) {
      setSubmitError('Failed to submit form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0D1117]">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 md:px-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-0 left-0 w-full h-full opacity-15"
            style={{
              background: 'radial-gradient(circle at top left, #6E00FF 0%, transparent 40%), radial-gradient(circle at bottom right, #4A0080 0%, transparent 40%)'
            }}
          ></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  AI-Powered Sales Consulting
                </h1>
                <p className="text-xl text-[#B3B3B3] mb-8">
                  Transform your sales process with our expert consulting services powered by cutting-edge AI technology.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-purple-700 hover:to-indigo-800 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                    Start Your Journey
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button className="flex items-center gap-2 border-2 border-purple-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-500/10 transition-all duration-300">
                    View Case Studies
                  </button>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:w-1/2">
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative w-full h-96 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-800 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/20 backdrop-blur mb-6">
                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                          <TrendingUp className="w-8 h-8 text-purple-800" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Transform Your Sales</h3>
                      <p className="text-purple-100">With AI-Powered Solutions</p>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-10 left-10 w-20 h-20 rounded-full border-2 border-white/30 animate-ping" style={{ animationDuration: '3s' }}></div>
                  <div className="absolute bottom-10 right-10 w-16 h-16 rounded-full bg-white/20"></div>
                  <div className="absolute top-1/3 right-20 w-12 h-12 rounded-full border-2 border-white/20"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Consulting Process Section */}
      <section className="py-20 px-4 md:px-20 bg-gradient-to-br from-[#1A1F25] to-[#0D1117]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Our Consulting Process
              </h2>
              <p className="text-xl text-[#B3B3B3] max-w-3xl mx-auto">
                A proven 6-step approach to transform your sales with AI-powered automation
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {consultingProcessSteps.map((step, index) => (
              <motion.div
                key={step.id}
                className="bg-[#0D1117] rounded-2xl p-8 border border-[#2A2F36] hover:border-purple-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Step {step.id}</h3>
                <h4 className="text-xl font-semibold text-white mb-3">{step.title}</h4>
                <p className="text-[#B3B3B3]">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="py-20 px-4 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Our Service Areas
                </h2>
                <p className="text-xl text-[#B3B3B3] mb-8">
                  Comprehensive AI-powered solutions tailored to your business needs
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {serviceAreas.map((service, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0" />
                      <span className="text-[#B3B3B3]">{service}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-800 transition-all duration-300">
                    Download Our Services Brochure
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:w-1/2">
              <motion.div
                className="relative h-full"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-gradient-to-br from-purple-600 to-indigo-800 rounded-2xl p-8 h-full">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4">Why Choose Our Consulting Services?</h3>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-1" />
                          <span className="text-purple-100">Proven track record with 500+ successful implementations</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-1" />
                          <span className="text-purple-100">Expert team with 10+ years of AI and sales experience</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-1" />
                          <span className="text-purple-100">Customized solutions tailored to your business needs</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-1" />
                          <span className="text-purple-100">Ongoing support and optimization for continuous improvement</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-purple-400/30">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-purple-800" />
                        </div>
                        <div>
                          <p className="text-white font-bold">Increase Your Sales Efficiency</p>
                          <p className="text-purple-200 text-sm">With our AI-powered solutions</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 md:px-20 bg-gradient-to-br from-[#1A1F25] to-[#0D1117]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Get Started Today
              </h2>
              <p className="text-xl text-[#B3B3B3] max-w-3xl mx-auto">
                Ready to transform your sales process? Contact us for a free consultation.
              </p>
            </motion.div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2">
              <motion.div
                className="bg-[#0D1117] rounded-2xl p-8 border border-[#2A2F36]"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-bold text-white mb-6">Send Us a Message</h3>
                
                {submitSuccess && (
                  <div className="mb-6 p-4 rounded-lg bg-green-900/30 border border-green-800 text-green-300">
                    Thank you for your message! We'll get back to you soon.
                  </div>
                )}
                
                {submitError && (
                  <div className="mb-6 p-4 rounded-lg bg-red-900/30 border border-red-800 text-red-300">
                    {submitError}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-[#B3B3B3] mb-2">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-[#1A1F25] border border-[#2A2F36] rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-[#B3B3B3] mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-[#1A1F25] border border-[#2A2F36] rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="Enter your email address"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-[#B3B3B3] mb-2">Company</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-[#1A1F25] border border-[#2A2F36] rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="Enter your company name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-[#B3B3B3] mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-[#1A1F25] border border-[#2A2F36] rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="Tell us about your project and goals"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-6 py-4 rounded-lg font-bold hover:from-purple-700 hover:to-indigo-800 transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>
            
            <div className="lg:w-1/2">
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-[#0D1117] rounded-2xl p-8 border border-[#2A2F36]">
                  <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                  
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center flex-shrink-0">
                          {info.icon}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white">{info.title}</h4>
                          <p className="text-[#B3B3B3]">{info.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-600 to-indigo-800 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Ready to Transform Your Sales?</h3>
                  <p className="text-purple-100 mb-6">
                    Schedule a free 30-minute consultation with our AI sales experts to discuss your specific needs and goals.
                  </p>
                  <button className="flex items-center gap-2 bg-white text-purple-800 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                    Schedule Consultation
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}