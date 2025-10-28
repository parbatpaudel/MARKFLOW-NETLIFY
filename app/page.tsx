'use client'

import { useState, useEffect, useRef } from 'react'
import { useUser } from '@/lib/supabase-context'
import { useRouter } from 'next/navigation'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Building2, Star, ArrowRight } from 'lucide-react'
import FeaturesSection from '@/components/ui/features-section'
import NewsletterSection from '@/components/ui/newsletter-section'
import OnboardingModal from '@/components/ui/onboarding-modal'
import TestimonialsSection from '@/components/ui/testimonials-section'

export default function HomePage() {
  const user = useUser()
  const router = useRouter()
  const isAuthed = !!user
  const [loading, setLoading] = useState(true)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Scene 1 transforms
  const scene1Opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const scene1Blur = useTransform(scrollYProgress, [0, 0.1], [0, 10])
  
  // Scene 2 transforms
  const scene2Opacity = useTransform(scrollYProgress, [0.05, 0.15, 0.25], [0, 1, 0])
  const scene2Scale = useTransform(scrollYProgress, [0.05, 0.15, 0.25], [0.9, 1, 0.95])
  
  // Scene 3 transforms
  const scene3Opacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1])
  const scene3Scale = useTransform(scrollYProgress, [0.2, 0.3], [0.8, 1])
  
  // Service cards transforms
  const cardsY = useTransform(scrollYProgress, [0.3, 0.4], [50, 0])
  const cardsOpacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1])

  useEffect(() => {
    // Dismiss loading screen after 1 second
    console.log('Setting up loading screen timeout')
    const timer = setTimeout(() => {
      console.log('Dismissing loading screen after 1 second')
      setLoading(false)
    }, 1000)
    
    // Also add a failsafe to ensure loading is dismissed
    const failsafeTimer = setTimeout(() => {
      console.log('Failsafe: Forcing loading screen dismissal')
      setLoading(false)
    }, 3000)
    
    return () => {
      console.log('Clearing loading timers')
      clearTimeout(timer)
      clearTimeout(failsafeTimer)
    }
  }, [])

  // Add a manual way to dismiss the loading screen for debugging
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        console.log('Manually dismissing loading screen with Escape key')
        setLoading(false)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleOnboardingClose = () => {
    setShowOnboarding(false)
    // Case study popup functionality removed
  }
  
  return (
    <main className="relative" ref={containerRef}>
      {/* Loading Overlay - Simple and dismisses after 1 second */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <div className="text-white text-lg font-medium">Loading...</div>
          </div>
        </div>
      )}
      
      {/* Improved Agency Header with Announcement */}
      <section className="relative w-full bg-[#0D1117] overflow-hidden">
        {/* Background Elements - Purple Radial glow */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-64 opacity-40 blur-[120px]"
            style={{
              background: 'radial-gradient(circle, #6E00FF 0%, #4A0080 70%)'
            }}
          ></div>
        </div>
        
        {/* Minimal Navigation Bar - Completely empty */}
        <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          {/* Completely empty navbar */}
          <div></div>
          <div></div>
        </nav>
        
        {/* Free Consultation Announcement */}
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium text-gray-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-400"></span>
              </span>
              Free Consultation Available for Nepal Businesses
            </div>
          </div>
        </div>
        
        {/* Hero Content - Reduced spacing and smaller elements */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 md:py-12">
          <div className="flex flex-col items-center text-center">
            {/* Main Headline - All white, shorter, no symbols */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl leading-tight mb-4">
              Transform Your Nepal Business with AI and Human Precision
            </h1>
            
            {/* Subtext - Smaller */}
            <p className="text-base md:text-lg text-[#B3B3B3] max-w-xl mb-6">
              We blend AI automation with real human strategy for exceptional results for Nepal businesses.
            </p>
            
            {/* CTAs - Changed to Services and Case Studies with links */}
            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <a 
                href="/services" 
                className="bg-white text-black font-bold py-2.5 px-6 rounded-lg transition duration-300 hover:bg-gray-100 text-sm text-center"
              >
                View Our Services
              </a>
              <a 
                href="/case-studies" 
                className="border border-white text-white font-bold py-2.5 px-6 rounded-lg transition duration-300 hover:bg-white/10 text-sm text-center"
              >
                View Case Study
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <FeaturesSection />

      {/* Improved Case Studies Section - Only AI-Driven Sales Automation */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6A00FF] via-[#7B1FFF] to-[#6A00FF] mb-6">
              AI-Driven Sales Automation Success in Nepal
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how AI-powered sales automation transformed business pipelines for companies across Nepal
            </p>
          </motion.div>

          {/* Single Featured Case Study */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl border border-border bg-background shadow-2xl max-w-4xl mx-auto"
          >
            <div className="grid lg:grid-cols-2">
              {/* Video Side */}
              <div className="relative p-6 bg-gradient-to-br from-[#6A00FF] to-[#7B1FFF] flex items-center justify-center">
                <div className="relative w-full aspect-video max-w-md mx-auto rounded-2xl overflow-hidden shadow-xl">
                  {/* Simplified YouTube Video Player with Custom Controls */}
                  <div className="relative w-full h-full rounded-2xl overflow-hidden">
                    <iframe
                      className="w-full h-full custom-youtube-player"
                      src="https://www.youtube.com/embed/iAmUF1mEmOE?autoplay=0&mute=0&controls=1&modestbranding=1&rel=0&color=white&playsinline=1&enablejsapi=1"
                      title="AI-Driven Sales Automation Success in Nepal"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none"></div>
                </div>
              </div>
              
              {/* Content Side */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-primary mb-4">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="font-medium">Featured Case Study</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Transforming a Kathmandu Retail Business</h3>
                <p className="text-muted-foreground mb-6">
                  See how we helped a Kathmandu-based retail company increase their sales by 180% using AI-powered lead generation and automated sales workflows.
                </p>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-3 bg-primary/5 rounded-lg">
                    <div className="text-2xl font-bold text-primary">+180%</div>
                    <div className="text-sm text-muted-foreground">Sales Growth</div>
                  </div>
                  <div className="text-center p-3 bg-primary/5 rounded-lg">
                    <div className="text-2xl font-bold text-primary">-65%</div>
                    <div className="text-sm text-muted-foreground">Cost Reduction</div>
                  </div>
                  <div className="text-center p-3 bg-primary/5 rounded-lg">
                    <div className="text-2xl font-bold text-primary">42%</div>
                    <div className="text-sm text-muted-foreground">Time Saved</div>
                  </div>
                </div>
                <a 
                  href="/case-studies" 
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-medium py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  View Full Case Study
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Onboarding Modal */}
      <OnboardingModal isOpen={showOnboarding} onClose={handleOnboardingClose} />
    </main>
  )
}