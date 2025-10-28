'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowRight, Play, Building2, TrendingUp, DollarSign, Users, Target, Zap, Brain, MessageCircle, BarChart3, Workflow, Search, Lightbulb, Megaphone } from 'lucide-react'

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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const isInView = useInView(leftColumnRef, { once: false, margin: "-20%" })

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

  // Scene 1 transforms with constant opacity to prevent fading away
  const scene1Opacity = useTransform(scrollYProgress, [0, 1], [1, 1])
  const scene1Scale = useTransform(scrollYProgress, [0, 1], [1, 1])
  const scene1Y = useTransform(scrollYProgress, [0, 1], [0, 0])

  return (
    <main className="relative bg-[#0D1117]" ref={containerRef}>
      {/* Interactive Hero Section - Markflow with enhanced background */}
      <section className="relative h-screen w-full overflow-hidden bg-[#0D1117]" id="hero-section">
        {/* Enhanced Background Elements - Radial glow with multiple layers */}
        <div className="absolute inset-0">
          <div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[1200px] h-[1200px] rounded-full opacity-30 blur-[150px]"
            style={{
              background: 'radial-gradient(circle, #6E00FF 0%, #4A0080 70%)'
            }}
          ></div>
          <div 
            className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-[100px]"
            style={{
              background: 'radial-gradient(circle, #0047FF 0%, #002B80 70%)'
            }}
          ></div>
          <div 
            className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full opacity-25 blur-[80px]"
            style={{
              background: 'radial-gradient(circle, #4A0080 0%, #6E00FF 70%)'
            }}
          ></div>
        </div>
        
        {/* Floating Shapes with enhanced animations */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-40 h-40 opacity-15"
            animate={{ 
              rotate: 360,
              y: [0, -30, 0]
            }}
            transition={{ 
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{
              background: 'linear-gradient(45deg, #6E00FF, #4A0080)',
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
            }}
          />
          
          <motion.div 
            className="absolute top-1/3 right-1/4 w-32 h-32 opacity-15"
            animate={{ 
              rotate: -360,
              x: [0, 30, 0]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              x: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{
              background: 'linear-gradient(45deg, #0047FF, #6E00FF)',
              borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%'
            }}
          />
          
          <motion.div 
            className="absolute bottom-1/3 left-1/3 w-28 h-28 opacity-15"
            animate={{ 
              rotate: 360,
              y: [0, 30, 0]
            }}
            transition={{ 
              rotate: { duration: 30, repeat: Infinity, ease: "linear" },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{
              background: 'linear-gradient(45deg, #4A0080, #0047FF)',
              clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
            }}
          />
        </div>
        
        {/* Navbar - Empty header structure */}
        <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4">
          {/* Empty div to maintain header structure */}
          <div></div>
          {/* Empty div to maintain header structure */}
          <div></div>
        </nav>
        
        {/* Scene 1 - Problem Setup ONLY (Chat Messages) with scroll-triggered animations */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10"
          style={{ 
            opacity: scene1Opacity.get() || 1,
            scale: scene1Scale.get() || 1,
            y: scene1Y.get() || 0
          }}
        >
          {/* Animated Headline - Responsive for small screens */}
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl"
            style={{ 
              textShadow: '0 0 15px rgba(110, 0, 255, 0.7)',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Your sales team...
          </motion.h1>
          
          <motion.div
            className="mt-8 space-y-4 w-full max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* AI Message with entrance animation - Responsive for small screens */}
            <motion.div 
              className="self-start bg-[#2A2F36] text-white rounded-2xl rounded-tl-none py-3 px-5 max-w-md ml-0 mr-auto shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              style={{
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3), 0 0 15px rgba(110, 0, 255, 0.2)'
              }}
            >
              <p className="text-sm sm:text-base">Hey, did you follow up with the lead from yesterday?</p>
            </motion.div>
            
            {/* Human Message with entrance animation - Responsive for small screens */}
            <motion.div 
              className="self-end bg-[#007AFF] text-white rounded-2xl rounded-tr-none py-3 px-5 max-w-md mr-0 ml-auto shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              style={{
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3), 0 0 15px rgba(0, 122, 255, 0.3)'
              }}
            >
              <p className="text-sm sm:text-base">Wait… which one?</p>
            </motion.div>
            
            {/* AI Message with entrance animation - Responsive for small screens */}
            <motion.div 
              className="self-start bg-[#2A2F36] text-white rounded-2xl rounded-tl-none py-3 px-5 max-w-md ml-0 mr-auto shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              style={{
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3), 0 0 15px rgba(110, 0, 255, 0.2)'
              }}
            >
              <p className="text-sm sm:text-base">The one ready to close 😡</p>
            </motion.div>
          </motion.div>
          
          {/* Scroll Indicator with pulsing animation - Responsive for small screens */}
          <motion.div 
            className="absolute bottom-10 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <motion.div 
              className="text-white text-sm mb-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              KEEP SCROLLING
            </motion.div>
            <motion.div 
              className="w-8 h-12 rounded-full border-2 border-white flex justify-center"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="w-1.5 h-3.5 bg-white rounded-full mt-2.5"></div>
            </motion.div>
          </motion.div>
        </motion.div>
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
              
              <button className="flex items-center gap-2 border border-[#111111] text-[#111111] px-6 py-3 rounded-full font-medium hover:bg-[#111111] hover:text-white transition-colors duration-300 shadow-lg hover:shadow-xl">
                See our work
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
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
                    
                    {/* Enhanced CTA Button */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <a 
                        href="/case-studies"
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-gray-900 to-black text-white px-6 py-3.5 rounded-xl font-bold hover:from-purple-900 hover:to-indigo-900 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                      >
                        Read case study
                        <ArrowRight className="w-5 h-5" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Working Process Section - Amazing design with illustration */}
      <section id="working-process" className="py-20 md:py-32 px-4 md:px-20 bg-gradient-to-br from-[#0D1117] to-[#1A1F25] relative overflow-hidden">
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
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Our Working Process
            </h2>
            <p className="text-xl text-[#B3B3B3] max-w-3xl mx-auto">
              A proven 4-step approach to transform your sales with AI-powered automation
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <WorkingProcessIllustration />
            </div>
            
            <div className="lg:w-1/2">
              <div className="space-y-10">
                {workingProcessSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    className="relative pl-8 border-l-2 border-purple-500"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{step.id}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-[#B3B3B3] text-lg">{step.description}</p>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-12">
                <a 
                  href="/case-studies"
                  className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-purple-700 hover:to-indigo-800 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  View Our Case Studies
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}