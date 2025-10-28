'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  avatar: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechFlow Inc.",
    content: "The AI-driven approach helped us increase our conversion rate by 32% in just 6 weeks!",
    avatar: "SJ",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CEO",
    company: "GrowthLabs",
    content: "Our sales team's productivity improved dramatically after implementing their solution.",
    avatar: "MC",
    rating: 5
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Sales Manager",
    company: "Enterprise Solutions",
    content: "The personalized outreach system saved us countless hours while improving response rates.",
    avatar: "PS",
    rating: 4
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Founder",
    company: "StartupBoost",
    content: "Best investment we've made in sales technology. Revenue increased steadily month over month.",
    avatar: "DW",
    rating: 5
  },
  {
    id: 5,
    name: "Yuki Tanaka",
    role: "CMO",
    company: "Global Retail Corp",
    content: "Transformed our entire sales process. The team now focuses on high-value conversations.",
    avatar: "YT",
    rating: 5
  },
  {
    id: 6,
    name: "Rajesh Kumar",
    role: "VP Sales",
    company: "D2C Brand Co.",
    content: "The AI insights helped us identify opportunities we never would have found otherwise.",
    avatar: "RK",
    rating: 4
  },
  {
    id: 7,
    name: "Emma Rodriguez",
    role: "Sales Director",
    company: "SaaS Solutions",
    content: "Implementation was seamless and the results were immediate. Highly recommended!",
    avatar: "ER",
    rating: 5
  }
]

export default function TestimonialsSection() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Duplicate testimonials for seamless looping
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials]

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition(prev => {
        // Reset scroll position when it reaches the end for seamless looping
        if (prev > testimonials.length * 130) {
          return 0
        }
        return prev + 1.5
      })
    }, 30)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-[#6A00FF]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-[#7B1FFF]/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#6A00FF]/10 rounded-full text-[#6A00FF] text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            <span>Client Testimonials</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6A00FF] via-[#7B1FFF] to-[#6A00FF] mb-6">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what our clients say about their experience with our AI-powered sales solutions
          </p>
        </motion.div>

        {/* Enhanced Vertical Scrolling Testimonials - Improved mobile responsiveness */}
        <div className="relative max-w-2xl mx-auto h-96 md:h-[500px] overflow-hidden rounded-3xl border border-gray-200/50 bg-white/70 backdrop-blur-sm shadow-2xl">
          {/* Enhanced gradient overlays for fade effect */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white via-white/90 to-transparent z-10 rounded-t-3xl"></div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white/90 to-transparent z-10 rounded-b-3xl"></div>
          
          {/* Enhanced scrolling container */}
          <div 
            ref={containerRef}
            className="py-10 px-2"
            style={{ 
              transform: `translateY(-${scrollPosition}px)`,
              transition: 'none'
            }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${Math.floor(index / testimonials.length)}`}
                className="mb-8 last:mb-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mx-4 md:mx-6 p-5 md:p-6 rounded-2xl border border-gray-200/50 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start gap-3 md:gap-4">
                    {/* Enhanced avatar with gradient border and shadow */}
                    <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-[#6A00FF] to-[#7B1FFF] p-0.5 shadow-lg">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[#6A00FF] font-bold text-base md:text-lg shadow-inner">
                        {testimonial.avatar}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      {/* Quote icon */}
                      <Quote className="w-4 h-4 md:w-5 md:h-5 text-[#6A00FF] mb-2" />
                      
                      {/* Enhanced testimonial text */}
                      <p className="text-gray-800 font-semibold mb-3 md:mb-4 leading-relaxed text-sm md:text-base">"{testimonial.content}"</p>
                      
                      {/* Client info */}
                      <div className="mb-2 md:mb-3">
                        <p className="font-bold text-gray-900 text-sm md:text-base">{testimonial.name}</p>
                        <p className="text-xs md:text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                      </div>
                      
                      {/* Enhanced rating display */}
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 md:w-4 md:h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
