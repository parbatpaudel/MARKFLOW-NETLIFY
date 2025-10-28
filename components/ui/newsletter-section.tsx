'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | '' }>({ text: '', type: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage({ text: '', type: '' })

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ text: data.message || 'Thank you for subscribing!', type: 'success' })
        setEmail('')
      } else {
        setMessage({ text: data.error || 'Failed to subscribe. Please try again.', type: 'error' })
      }
    } catch (error) {
      console.error('Error:', error)
      setMessage({ text: 'An error occurred. Please try again.', type: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-[#6A00FF]/20 bg-white backdrop-blur-sm shadow-lg"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 -left-40 w-80 h-80 bg-[#6A00FF]/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-[#7B1FFF]/10 rounded-full blur-3xl animate-pulse"></div>
          </div>
          
          <div className="relative z-10 p-6 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Content */}
              <div>
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0D0D0D] mb-4"
                >
                  Stay Ahead with AI Sales Insights
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-[#0D0D0D]/70 text-base md:text-lg mb-6"
                >
                  Get exclusive strategies, case studies, and industry trends delivered to your inbox weekly.
                </motion.p>
                <motion.ul 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2"
                >
                  <li className="flex items-center gap-2 md:gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#6A00FF]"></div>
                    <span className="text-[#0D0D0D] text-sm md:text-base">Weekly AI sales strategy breakdowns</span>
                  </li>
                  <li className="flex items-center gap-2 md:gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#6A00FF]"></div>
                    <span className="text-[#0D0D0D] text-sm md:text-base">Exclusive case studies and success stories</span>
                  </li>
                  <li className="flex items-center gap-2 md:gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#6A00FF]"></div>
                    <span className="text-[#0D0D0D] text-sm md:text-base">Industry trend analysis and predictions</span>
                  </li>
                </motion.ul>
              </div>
              
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-5 md:p-6 border border-[#6A00FF]/20"
              >
                <h3 className="text-lg md:text-xl font-bold text-[#0D0D0D] mb-4">Subscribe to Newsletter</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full border-[#6A00FF]/30 focus:border-[#6A00FF] focus:ring-[#6A00FF] text-sm md:text-base"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-[#6A00FF] to-[#7B1FFF] hover:from-[#7B1FFF] hover:to-[#6A00FF] text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-xl text-sm md:text-base"
                  >
                    {isLoading ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </form>
                {message.text && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-4 p-3 rounded-lg text-center text-sm font-medium ${
                      message.type === 'success' 
                        ? 'bg-emerald-500/20 text-emerald-700 border border-emerald-500/30' 
                        : 'bg-red-500/20 text-red-700 border border-red-500/30'
                    }`}
                  >
                    {message.text}
                  </motion.div>
                )}
                <p className="text-xs text-[#0D0D0D]/60 mt-4 text-center">
                  By subscribing, you agree to our Privacy Policy and consent to receive updates.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}