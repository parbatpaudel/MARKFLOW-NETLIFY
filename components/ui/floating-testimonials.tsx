'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  rating: number
  stat: string
  statLabel: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Marketing Director",
    company: "TechFlow Inc. (India)",
    content: "The AI-driven approach helped us increase our conversion rate significantly.",
    rating: 5,
    stat: "+24%",
    statLabel: "Conversion Rate"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "CEO",
    company: "GrowthLabs (Europe)",
    content: "Our sales team's productivity improved after implementing their solution.",
    rating: 5,
    stat: "+35%",
    statLabel: "Productivity"
  },
  {
    id: 3,
    name: "Bikash Thapa",
    role: "Sales Manager",
    company: "Enterprise Solutions (Nepal)",
    content: "The personalized outreach system saved us time while improving response rates.",
    rating: 4,
    stat: "+18%",
    statLabel: "Response Rate"
  },
  {
    id: 4,
    name: "Yuki Tanaka",
    role: "Founder",
    company: "StartupBoost (Asia)",
    content: "Best investment we've made in sales technology. Revenue increased steadily.",
    rating: 5,
    stat: "+42%",
    statLabel: "Revenue Growth"
  },
  {
    id: 5,
    name: "Priya Sharma",
    role: "CMO",
    company: "Global Retail Corp (India)",
    content: "Transformed our entire sales process. The team now focuses on high-value conversations.",
    rating: 5,
    stat: "+28%",
    statLabel: "Lead Quality"
  }
]

export default function FloatingTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const lastVisibilityState = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section')
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom
        const windowHeight = window.innerHeight
        
        // Show notification when scrolled past the hero section, hide when in hero section
        const shouldShow = heroBottom < windowHeight * 0.5
        
        // Only update state if visibility state has changed
        if (shouldShow !== lastVisibilityState.current) {
          setIsVisible(shouldShow)
          lastVisibilityState.current = shouldShow
          
          // Reset testimonial index when hiding to show first testimonial next time
          if (!shouldShow) {
            setCurrentIndex(0)
          }
        }
      }
    }

    // Set up scroll listener
    window.addEventListener('scroll', handleScroll)
    
    // Initial check in case user is already scrolled
    handleScroll()

    // Rotate testimonials every 4 seconds when visible (slower for better reading)
    const interval = setInterval(() => {
      if (isVisible) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
      }
    }, 4000)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(interval)
    }
  }, [isVisible])

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-20 pointer-events-none">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={currentIndex} // Add key to trigger animation on change
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              boxShadow: [
                '0 10px 25px rgba(106, 0, 255, 0.2)',
                '0 15px 35px rgba(106, 0, 255, 0.3)',
                '0 10px 25px rgba(106, 0, 255, 0.2)'
              ]
            }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ 
              type: "spring", 
              stiffness: 300,
              damping: 25,
              mass: 1
            }}
            whileHover={{ 
              y: -8,
              boxShadow: '0 25px 50px rgba(106, 0, 255, 0.4)'
            }}
            className="pointer-events-auto max-w-xs bg-white border-2 border-[#6A00FF] rounded-2xl shadow-2xl p-5 relative overflow-hidden"
          >
            {/* Enhanced background pattern with stronger gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#6A00FF]/10 to-[#7B1FFF]/5 z-0"></div>
            
            {/* Enhanced dot pattern overlay */}
            <div 
              className="absolute inset-0 opacity-10 z-0"
              style={{
                backgroundImage: 'radial-gradient(circle, #6A00FF 1.5px, transparent 1.5px)',
                backgroundSize: '15px 15px'
              }}
            ></div>
            
            {/* Alert Badge - More prominent design */}
            <div className="absolute -top-2.5 -left-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-xl">
              NEW
            </div>
            
            {/* Testimonial Content - Bolder and more attractive design */}
            <div className="relative z-10">
              <div className="flex items-start gap-4">
                {/* Enhanced avatar with gradient border and shadow */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-[#6A00FF] to-[#7B1FFF] p-1 shadow-lg">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[#6A00FF] text-base font-bold shadow-md">
                    {currentTestimonial.name.charAt(0)}
                  </div>
                </div>
                
                <div className="flex-1">
                  {/* Enhanced testimonial text with bolder typography */}
                  <p className="text-base text-gray-900 font-bold leading-relaxed mb-3 italic">"{currentTestimonial.content}"</p>
                  
                  {/* Enhanced name and role information with better spacing */}
                  <div className="mb-3">
                    <p className="text-sm font-extrabold text-gray-900">{currentTestimonial.name}</p>
                    <p className="text-xs text-gray-700 font-semibold">{currentTestimonial.role}, {currentTestimonial.company}</p>
                  </div>
                  
                  {/* Enhanced rating display with larger stars */}
                  <div className="flex items-center gap-1.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-4 h-4 ${i < currentTestimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Enhanced Statistic with better design and stronger gradient */}
              <div className="pt-4 border-t-2 border-gray-200/70">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700 font-bold">{currentTestimonial.statLabel}</span>
                  <span className="text-xl font-extrabold bg-gradient-to-r from-[#6A00FF] to-[#7B1FFF] bg-clip-text text-transparent">
                    {currentTestimonial.stat}
                  </span>
                </div>
                
                {/* Enhanced progress bar with gradient and animation */}
                <div className="w-full bg-gray-300 rounded-full h-2.5">
                  <motion.div 
                    className="bg-gradient-to-r from-[#6A00FF] to-[#7B1FFF] h-2.5 rounded-full" 
                    style={{ width: `${Math.min(100, parseInt(currentTestimonial.stat.replace('%', '').replace('+', '')) / 2)}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, parseInt(currentTestimonial.stat.replace('%', '').replace('+', '')) / 2)}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  ></motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}