'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowRight, Play, Building2, TrendingUp, DollarSign, Users, Target, Zap, Brain, MessageCircle, BarChart3, Workflow, Search, Lightbulb, Megaphone } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Custom Illustration Components with enhanced animations
const ProspectingIllustration = () => (
  <div className="relative w-full h-32 flex items-center justify-center">
    <div className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-indigo-700 opacity-15 animate-pulse"></div>
    <div className="absolute w-20 h-20 rounded-full border-2 border-purple-400 animate-ping" style={{ animationDuration: '3s' }}></div>
    <div className="absolute w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-600 to-indigo-800"></div>
      </div>
    </div>
    <div className="absolute -top-4 -right-4 w-6 h-6 rounded-full bg-indigo-500 animate-bounce"></div>
    <div className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
  </div>
)

const ConversationalIllustration = () => (
  <div className="relative w-full h-32 flex items-center justify-center">
    <div className="absolute w-28 h-16 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-700 opacity-15"></div>
    <div className="absolute w-24 h-12 rounded-xl border-2 border-purple-400 flex items-center justify-center">
      <div className="flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse"></div>
        <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
    <div className="absolute -top-5 left-8 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-800 flex items-center justify-center">
      <div className="w-4 h-4 rounded-full bg-white"></div>
    </div>
    <div className="absolute -bottom-5 right-8 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-800 flex items-center justify-center">
      <div className="w-4 h-4 rounded-full bg-white"></div>
    </div>
  </div>
)

const OutreachIllustration = () => (
  <div className="relative w-full h-32 flex items-center justify-center">
    <div className="absolute w-28 h-28 rounded-full border-4 border-purple-400 border-dashed animate-spin" style={{ animationDuration: '12s' }}></div>
    <div className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-indigo-700 opacity-15"></div>
    <div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center">
      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 to-indigo-800"></div>
      </div>
    </div>
    <div className="absolute -top-4 -right-4 w-6 h-6 rounded-full bg-indigo-500 animate-ping"></div>
  </div>
)

const AnalyticsIllustration = () => (
  <div className="relative w-full h-32 flex items-center justify-center">
    <div className="absolute w-28 h-20 bg-gradient-to-br from-purple-500 to-indigo-700 opacity-15 rounded-xl"></div>
    <div className="absolute w-24 h-16 border-2 border-purple-400 rounded-xl flex flex-col justify-between p-4">
      <div className="flex justify-between">
        <div className="w-4 h-4 rounded-full bg-purple-500"></div>
        <div className="w-4 h-4 rounded-full bg-indigo-600"></div>
      </div>
      <div className="h-2 w-full bg-purple-500 rounded-full"></div>
      <div className="h-2 w-3/4 bg-indigo-600 rounded-full"></div>
    </div>
    <div className="absolute -top-4 left-8 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-800 flex items-center justify-center">
      <div className="w-5 h-5 rounded-full bg-white animate-pulse"></div>
    </div>
  </div>
)

const WorkflowIllustration = () => (
  <div className="relative w-full h-32 flex items-center justify-center">
    <div className="absolute w-28 h-20 bg-gradient-to-br from-purple-500 to-indigo-700 opacity-15 rounded-xl"></div>
    <div className="absolute w-24 h-16 border-2 border-purple-400 rounded-xl flex items-center justify-center">
      <div className="flex space-x-3">
        <div className="w-3 h-6 bg-purple-500 rounded-full animate-bounce"></div>
        <div className="w-3 h-8 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-3 h-6 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-3 h-8 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
      </div>
    </div>
    <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-800 animate-ping"></div>
    <div className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-800 animate-ping" style={{ animationDelay: '0.5s' }}></div>
  </div>
)

const PitchIllustration = () => (
  <div className="relative w-full h-32 flex items-center justify-center">
    <div className="absolute w-28 h-20 bg-gradient-to-br from-purple-500 to-indigo-700 opacity-15 rounded-xl"></div>
    <div className="absolute w-24 h-16 border-2 border-purple-400 rounded-xl flex items-center justify-center">
      <div className="w-12 h-12 rounded-md bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center">
        <div className="w-6 h-6 rounded-sm bg-white"></div>
      </div>
    </div>
    <div className="absolute -top-4 left-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-800 flex items-center justify-center">
      <div className="w-5 h-5 rounded-full bg-white animate-pulse"></div>
    </div>
    <div className="absolute -bottom-4 right-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center">
      <div className="w-5 h-5 rounded-full bg-white animate-pulse" style={{ animationDelay: '0.5s' }}></div>
    </div>
  </div>
)

const CompetitorIllustration = () => (
  <div className="relative w-full h-32 flex items-center justify-center">
    <div className="absolute w-28 h-28 rounded-full border-4 border-purple-400 opacity-15"></div>
    <div className="absolute w-24 h-24 rounded-full border-2 border-indigo-600 flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border-2 border-dashed border-purple-500 animate-spin" style={{ animationDuration: '10s' }}></div>
    </div>
    <div className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center">
      <div className="w-6 h-6 rounded-full bg-white"></div>
    </div>
    <div className="absolute -top-4 -right-4 w-6 h-6 rounded-full bg-indigo-500 animate-ping"></div>
  </div>
)

const AccountIllustration = () => (
  <div className="relative w-full h-32 flex items-center justify-center">
    <div className="absolute w-28 h-20 bg-gradient-to-br from-purple-500 to-indigo-700 opacity-15 rounded-xl"></div>
    <div className="absolute w-24 h-16 border-2 border-purple-400 rounded-xl flex items-center justify-center">
      <div className="flex space-x-4">
        <div className="w-5 h-8 bg-purple-500 rounded-sm"></div>
        <div className="w-5 h-10 bg-indigo-600 rounded-sm"></div>
        <div className="w-5 h-8 bg-purple-500 rounded-sm"></div>
      </div>
    </div>
    <div className="absolute -top-4 left-8 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-800 flex items-center justify-center">
      <div className="w-5 h-5 rounded-full bg-white animate-pulse"></div>
    </div>
  </div>
)

const AdIllustration = () => (
  <div className="relative w-full h-32 flex items-center justify-center">
    <div className="absolute w-28 h-20 bg-gradient-to-br from-purple-500 to-indigo-700 opacity-15 rounded-xl"></div>
    <div className="absolute w-24 h-16 border-2 border-purple-400 rounded-xl flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-12 h-2 bg-purple-500 rounded-full mb-2"></div>
        <div className="w-10 h-2 bg-indigo-600 rounded-full mb-2"></div>
        <div className="w-14 h-2 bg-purple-500 rounded-full"></div>
      </div>
    </div>
    <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-800 animate-ping"></div>
    <div className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-800 animate-ping" style={{ animationDelay: '0.5s' }}></div>
  </div>
)

const ForecastIllustration = () => (
  <div className="relative w-full h-32 flex items-center justify-center">
    <div className="absolute w-28 h-20 bg-gradient-to-br from-purple-500 to-indigo-700 opacity-15 rounded-xl"></div>
    <div className="absolute w-24 h-16 border-2 border-purple-400 rounded-xl flex items-center justify-center">
      <div className="relative w-16 h-12">
        <div className="absolute bottom-0 left-0 w-full h-2 bg-purple-500 rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-3/4 h-6 bg-gradient-to-t from-purple-500 to-indigo-700 rounded-t-full"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-8 bg-gradient-to-t from-indigo-700 to-purple-500 rounded-t-full"></div>
      </div>
    </div>
    <div className="absolute -top-4 left-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-800 flex items-center justify-center">
      <div className="w-5 h-5 rounded-full bg-white animate-pulse"></div>
    </div>
  </div>
)

// Working Process Illustration
const WorkingProcessIllustration = () => (
  <div className="relative w-56 h-56 flex items-center justify-center mx-auto">
    {/* Main circle - 140px x 140px */}
    <div className="absolute w-36 h-36 rounded-full bg-gradient-to-br from-purple-500 to-indigo-700 opacity-10"></div>
    {/* Animated border circle - 128px x 128px */}
    <div className="absolute w-32 h-32 rounded-full border-2 border-purple-400 animate-ping" style={{ animationDuration: '4s' }}></div>
    
    {/* Step 1 - Top position (0 degrees) - Positioned at top center */}
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center shadow-lg">
      <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
        <span className="text-xs font-bold text-purple-800">1</span>
      </div>
    </div>
    
    {/* Step 2 - Right position (90 degrees) - Positioned at right edge */}
    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-purple-800 flex items-center justify-center shadow-lg">
      <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
        <span className="text-xs font-bold text-indigo-800">2</span>
      </div>
    </div>
    
    {/* Step 3 - Bottom position (180 degrees) - Positioned at bottom center */}
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-purple-700 to-indigo-900 flex items-center justify-center shadow-lg">
      <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
        <span className="text-xs font-bold text-purple-900">3</span>
      </div>
    </div>
    
    {/* Step 4 - Left position (270 degrees) - Positioned at left edge */}
    <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-indigo-700 to-purple-900 flex items-center justify-center shadow-lg">
      <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
        <span className="text-xs font-bold text-indigo-900">4</span>
      </div>
    </div>
    
    {/* Connecting lines */}
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <circle cx="50" cy="50" r="32" fill="none" stroke="url(#processGradient)" strokeWidth="0.5" strokeDasharray="2,2" />
      <defs>
        <linearGradient id="processGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6E00FF" />
          <stop offset="100%" stopColor="#4A0080" />
        </linearGradient>
      </defs>
    </svg>
  </div>
)

export default function ServicesPage() {
  const containerRef = useRef(null)
  const leftColumnRef = useRef(null)
  const rightColumnRef = useRef(null)
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const bubble1Ref = useRef(null)
  const bubble2Ref = useRef(null)
  const bubble3Ref = useRef(null)

  const isInView = useInView(leftColumnRef, { once: false, margin: "-20%" })

  // Initialize GSAP animations
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!titleRef.current || !bubble1Ref.current || !bubble2Ref.current || !bubble3Ref.current) return

    // Set initial state to visible
    gsap.set([titleRef.current, bubble1Ref.current, bubble2Ref.current, bubble3Ref.current], {
      opacity: 1,
      y: 0
    })

    // Hero title animation - plays immediately on load
    const titleAnimation = gsap.from(titleRef.current, {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.3
    })

    // Chat bubbles animation sequence - plays immediately on load
    const tl = gsap.timeline({ delay: 0.8 })

    tl.from(bubble1Ref.current, {
      opacity: 0,
      y: 40,
      duration: 0.6,
      ease: "power2.out"
    })
    .from(bubble2Ref.current, {
      opacity: 0,
      y: 40,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3")
    .from(bubble3Ref.current, {
      opacity: 0,
      y: 40,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3")

    // Floating animation for bubbles
    gsap.to([bubble1Ref.current, bubble2Ref.current, bubble3Ref.current], {
      y: -5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 2
    })

    // Handle resize
    const handleResize = () => {
      ScrollTrigger.refresh()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      titleAnimation?.kill()
      tl?.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Services data with illustrations instead of icons - updated with shorter, more engaging value text
  const services = [
    {
      id: 1,
      illustration: <ProspectingIllustration />,
      title: "Intelligent Prospecting",
      description: "We use advanced AI tools to find and score your ideal prospects. The AI looks at data like company size, technology used, hiring trends, and online behavior to find people most likely to buy.",
      value: "70% less research time, zero in on high-quality leads"
    },
    {
      id: 2,
      illustration: <ConversationalIllustration />,
      title: "Conversational AI for Lead Qualification",
      description: "AI chatbots and voice agents engage visitors on your website, social media, or phone 24/7. They answer questions, qualify leads, and collect key details before passing them to your team.",
      value: "Capture leads anytime, never miss an opportunity again"
    },
    {
      id: 3,
      illustration: <OutreachIllustration />,
      title: "Hyper-Personalized Outreach",
      description: "AI creates personalized messages based on each prospect's data. It also finds the best time to contact them. Your team can then launch personalized campaigns across channels at scale.",
      value: "Higher response rates with authentic relationship building"
    },
    {
      id: 4,
      illustration: <AnalyticsIllustration />,
      title: "Revenue Intelligence & Conversation Analysis",
      description: "AI records and analyzes sales calls or meetings, creating summaries, action items, and insights. It tracks competitor mentions, detects emotions, and identifies winning sales behaviors.",
      value: "Data-driven insights to coach and improve performance"
    },
    {
      id: 5,
      illustration: <WorkflowIllustration />,
      title: "Automated Sales Workflows",
      description: "AI handles routine tasks like CRM updates, email follow-ups, and scheduling. Everything stays accurate and updated in real-time.",
      value: "Automate 30% of repetitive work, sell more effectively"
    },
    {
      id: 6,
      illustration: <PitchIllustration />,
      title: "Dynamic Sales Pitch Personalization",
      description: "AI uses CRM data to auto-create custom sales decks and presentations for each prospect. Your reps can review and adjust the final version quickly.",
      value: "Personalized pitches in minutes, close deals faster"
    },
    {
      id: 7,
      illustration: <CompetitorIllustration />,
      title: "Competitor Analysis & Market Sensing",
      description: "AI continuously tracks competitors' websites, pricing, and marketing activities. Our analysts turn that data into clear, actionable reports.",
      value: "Stay ahead with real-time competitive intelligence"
    },
    {
      id: 8,
      illustration: <AccountIllustration />,
      title: "Strategic Account Planning & Expansion",
      description: "Your strategist works with AI tools to find top customer accounts with the biggest growth potential. AI predicts upsell and cross-sell chances using data and communication trends.",
      value: "Grow revenue from your best clients, uncover hidden opportunities"
    },
    {
      id: 9,
      illustration: <AdIllustration />,
      title: "AI-Powered Ad Optimization",
      description: "AI manages your ad campaigns across Google, Facebook, and LinkedIn. It shifts budgets automatically toward the best-performing ads and audiences, ensuring no money is wasted.",
      value: "Maximize ROI with smart, real-time budget control"
    },
    {
      id: 10,
      illustration: <ForecastIllustration />,
      title: "Sales Forecasting & Pipeline Management",
      description: "AI predicts deal outcomes and revenue based on historical data and current pipeline trends. It provides early warnings for at-risk deals and identifies acceleration opportunities.",
      value: "40% more accurate forecasts, prioritize high-impact activities"
    }
  ]

  // Working Process Steps
  const workingProcessSteps = [
    {
      id: 1,
      title: "Discovery & Analysis",
      description: "We analyze your current sales process, identify pain points, and define success metrics."
    },
    {
      id: 2,
      title: "Strategy Development",
      description: "Our team creates a customized AI-powered sales strategy aligned with your business goals."
    },
    {
      id: 3,
      title: "Implementation",
      description: "We deploy our AI tools and integrate them with your existing systems for seamless operation."
    },
    {
      id: 4,
      title: "Optimization & Growth",
      description: "We continuously monitor performance and refine the system to maximize your ROI."
    }
  ]

  return (
    <main className="relative bg-[#000814]" ref={containerRef}>
      {/* Interactive Hero Section - Supermemory.ai style */}
      <section 
        ref={heroRef}
        className="relative w-full overflow-hidden bg-gradient-to-b from-[#000814] to-[#001d3d] min-h-[80vh] md:min-h-[85vh] flex items-center justify-center py-12 md:py-16 lg:py-20"
        id="hero-section"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          {/* Deep radial gradient background */}
          <div 
            className="absolute inset-0 z-0"
            style={{
              background: 'radial-gradient(circle at center bottom, rgba(100,100,255,0.25) 0%, transparent 70%)'
            }}
          ></div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-white opacity-5 rotate-45 z-0"></div>
          <div className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-white opacity-5 z-0"></div>
          <div className="absolute bottom-1/3 left-1/3 w-20 h-20 rounded-full bg-white opacity-5 rotate-12 z-0"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-20 max-w-6xl mx-auto px-4 md:px-8 text-center">
          {/* Animated Headline */}
          <h1 
            ref={titleRef}
            className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-8 md:mb-12 lg:mb-14 max-w-4xl mx-auto leading-tight relative z-30"
            style={{
              background: 'linear-gradient(180deg, #ffffff 0%, #9a5cff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 4px 15px rgba(154, 92, 255, 0.3))',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
            }}
          >
            Your sales team...
          </h1>
          
          {/* Chat Bubbles - Supermemory.ai style */}
          <div className="chat-scene flex flex-col items-center space-y-5 md:space-y-7 lg:space-y-8 w-full max-w-3xl mx-auto px-4">
            {/* First Message - Gray, Left side */}
            <div 
              ref={bubble1Ref}
              className="bubble-1 chat-bubble flex justify-start w-full pl-4 md:pl-8 lg:pl-12"
            >
              <div 
                className="bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.15)] text-[#e2e2e2] rounded-[18px] backdrop-blur-[12px] py-3 px-5 md:py-4 md:px-6 shadow-2xl max-w-[280px] md:max-w-[320px]"
                style={{
                  boxShadow: '0 0 25px rgba(127, 90, 255, 0.4)'
                }}
              >
                <p className="text-sm md:text-base lg:text-lg leading-relaxed font-normal">Hey, did you follow up with the lead from yesterday?</p>
              </div>
            </div>
            
            {/* Second Message - Blue, Right side */}
            <div 
              ref={bubble2Ref}
              className="bubble-2 chat-bubble flex justify-end w-full pr-4 md:pr-8 lg:pr-12"
            >
              <div 
                className="bg-gradient-to-r from-[#4f7bff] to-[#7c4dff] text-white rounded-[18px] py-3 px-5 md:py-4 md:px-6 shadow-2xl max-w-[240px] md:max-w-[280px]"
                style={{
                  boxShadow: '0 0 25px rgba(127, 90, 255, 0.4)'
                }}
              >
                <p className="text-sm md:text-base lg:text-lg leading-relaxed font-normal">Wait… which one?</p>
              </div>
            </div>
            
            {/* Third Message - Gray, Left side */}
            <div 
              ref={bubble3Ref}
              className="bubble-3 chat-bubble flex justify-start w-full pl-4 md:pl-8 lg:pl-12"
            >
              <div 
                className="bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.15)] text-[#e2e2e2] rounded-[18px] backdrop-blur-[12px] py-3 px-5 md:py-4 md:px-6 shadow-2xl max-w-[260px] md:max-w-[300px]"
                style={{
                  boxShadow: '0 0 25px rgba(127, 90, 255, 0.4)'
                }}
              >
                <p className="text-[15px] md:text-base leading-snug font-normal">The one ready to close 😡</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Two-column layout with enhanced design and unified background */}
      <section className="py-20 md:py-30 px-4 md:px-20 relative">
        {/* Unified Background Gradient for the entire section */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-0 left-0 w-full h-full opacity-15"
            style={{
              background: 'radial-gradient(circle at top left, #6E00FF 0%, transparent 40%), radial-gradient(circle at bottom right, #4A0080 0%, transparent 40%)'
            }}
          ></div>
          <div 
            className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full opacity-20 blur-[100px]"
            style={{
              background: 'radial-gradient(circle, #6E00FF 0%, #4A0080 70%)'
            }}
          ></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Left Column (Fixed Anchor Section) */}
            <motion.div 
              ref={leftColumnRef}
              className="lg:w-2/5 lg:sticky lg:top-20 lg:self-start"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight" style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.1' }}>
                We help businesses scale with AI + Human precision
              </h1>
              
              <p className="text-base sm:text-lg text-[#B3B3B3] mb-6 sm:mb-8">
                Trusted by growing teams who blend automation with expertise.
              </p>
              
              <div className="inline-block bg-[#F3F3F3] text-[#333333] rounded-full px-4 py-2 text-sm font-medium mb-8">
                Powered by Markflow
              </div>
            </motion.div>
            
            {/* Right Column (Scrollable Cards) - Enhanced card design */}
            <div 
              ref={rightColumnRef}
              className="lg:w-3/5"
            >
              <div className="space-y-10">
                {services.map((service, index) => (
                  <motion.div
                    key={service.id}
                    className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-8 border border-gray-200 overflow-hidden relative hover:shadow-2xl transition-all duration-500 transform-gpu"
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ 
                      duration: 0.7, 
                      delay: index * 0.15,
                      ease: "easeOut"
                    }}
                    whileHover={{ 
                      y: -12,
                      boxShadow: '0 30px 60px rgba(0, 0, 0, 0.15), 0 0 60px rgba(110, 0, 255, 0.25)',
                      transition: { duration: 0.3 }
                    }}
                  >
                    {/* Decorative accent element */}
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-purple-50 to-indigo-50 transform translate-x-16 -translate-y-16"></div>
                    
                    <div className="relative z-10">
                      {/* Custom Illustration with enhanced styling */}
                      <div className="mb-6 p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-100">
                        {service.illustration}
                      </div>
                      
                      <h3 className="text-2xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed text-base">
                        {service.description}
                      </p>
                      <div className="inline-flex items-center gap-3 text-gray-800 font-semibold bg-gradient-to-r from-purple-50 to-indigo-50 px-5 py-3 rounded-xl border border-purple-100">
                        <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-700">Value:</span>
                        <span className="font-medium">{service.value}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Working Process Section - Amazing design with illustration */}
      <section id="working-process" className="py-12 md:py-20 lg:py-32 px-4 md:px-8 lg:px-20 bg-gradient-to-br from-[#0D1117] to-[#1A1F25] relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-0 right-0 w-1/2 h-full opacity-10"
            style={{
              background: 'radial-gradient(circle at top right, #6E00FF 0%, transparent 60%)'
            }}
          ></div>
          <div 
            className="absolute bottom-0 left-0 w-1/2 h-full opacity-10"
            style={{
              background: 'radial-gradient(circle at bottom left, #4A0080 0%, transparent 60%)'
            }}
          ></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 px-4">
              Our Working Process
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-[#B3B3B3] max-w-3xl mx-auto px-4">
              A proven 4-step approach to transform your sales with AI-powered automation
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center">
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="scale-75 sm:scale-90 md:scale-100">
                <WorkingProcessIllustration />
              </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <div className="space-y-6 md:space-y-10">
                {workingProcessSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    className="relative pl-6 md:pl-8 border-l-2 border-purple-500"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <div className="absolute -left-3 md:-left-4 top-0 w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center">
                      <span className="text-white font-bold text-xs md:text-sm">{step.id}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">{step.title}</h3>
                    <p className="text-[#B3B3B3] text-sm sm:text-base md:text-lg">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}