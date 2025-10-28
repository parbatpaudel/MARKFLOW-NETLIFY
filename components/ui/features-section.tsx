'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, useTransform, useScroll } from 'framer-motion'
import { Sparkles } from 'lucide-react'

// Enhanced Illustration components with better animations
const AIIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* AI Interface */}
    <div className="relative w-48 h-48 rounded-3xl bg-gradient-to-br from-[#6A00FF]/20 to-[#7B1FFF]/20 border border-[#6A00FF]/30 backdrop-blur-sm flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#6A00FF]/10 to-[#7B1FFF]/10 animate-pulse"></div>
      
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle, #6A00FF 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        ></div>
      </div>
      
      {/* Data points with enhanced animation */}
      <div className="grid grid-cols-3 gap-3">
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            className="w-4 h-4 rounded-full bg-[#6A00FF] shadow-lg"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7],
              boxShadow: [
                '0 0 0 0 rgba(106, 0, 255, 0.4)',
                '0 0 0 8px rgba(106, 0, 255, 0)',
                '0 0 0 0 rgba(106, 0, 255, 0)'
              ]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.15
            }}
          />
        ))}
      </div>
      
      {/* Connecting lines with glow effect */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M20,20 Q50,10 80,20 T80,80"
          fill="none"
          stroke="url(#aiGradient)"
          strokeWidth="0.8"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.path
          d="M30,30 Q60,20 90,30 T90,90"
          fill="none"
          stroke="url(#aiGradient2)"
          strokeWidth="0.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
        />
        <defs>
          <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6A00FF" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#7B1FFF" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="aiGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7B1FFF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#6A00FF" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Central AI core */}
      <motion.div
        className="absolute w-12 h-12 rounded-full bg-gradient-to-r from-[#6A00FF] to-[#7B1FFF] flex items-center justify-center"
        animate={{
          scale: [1, 1.1, 1],
          boxShadow: [
            '0 0 0 0 rgba(106, 0, 255, 0.7)',
            '0 0 0 15px rgba(106, 0, 255, 0.3)',
            '0 0 0 0 rgba(106, 0, 255, 0.7)'
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity
        }}
      >
        <div className="w-6 h-6 rounded-full bg-white/30"></div>
      </motion.div>
    </div>
  </div>
)

const GrowthIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Growth chart with enhanced visuals */}
    <div className="relative w-48 h-48 rounded-3xl bg-gradient-to-br from-[#0066FF]/20 to-[#3399FF]/20 border border-[#0066FF]/30 backdrop-blur-sm flex items-end justify-center p-5 overflow-hidden">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#0066FF]/10 to-[#3399FF]/10"></div>
      
      {/* Animated background waves */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            backgroundImage: 'radial-gradient(circle at center, #0066FF 0%, transparent 70%)',
            backgroundSize: '100% 100%'
          }}
        ></motion.div>
      </div>
      
      {/* Chart bars with gradient and animation */}
      <div className="flex items-end gap-2 h-36">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-5 rounded-t-lg relative"
            style={{ 
              background: `linear-gradient(to top, #0066FF, #3399FF)`,
              height: `${20 + i * 15}%`
            }}
            initial={{ height: 0 }}
            animate={{ height: `${20 + i * 15}%` }}
            transition={{ 
              duration: 1.2, 
              delay: i * 0.15,
              type: "spring",
              stiffness: 100
            }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-t-lg bg-[#3399FF]/30 blur-sm"></div>
          </motion.div>
        ))}
      </div>
      
      {/* Rising arrow with trail effect */}
      <motion.div
        className="absolute top-6 right-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 1,
          delay: 0.8,
          type: "spring",
          stiffness: 200
        }}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
          <motion.path
            d="M7 17L17 7M17 7H7M17 7V17"
            stroke="url(#arrowGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
          />
          <defs>
            <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0066FF" />
              <stop offset="100%" stopColor="#3399FF" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
      
      {/* Floating particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-[#0066FF]"
          style={{
            top: `${30 + i * 20}%`,
            left: `${20 + i * 15}%`
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5
          }}
        />
      ))}
    </div>
  </div>
)

const ImplementationIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Implementation gears with enhanced design */}
    <div className="relative w-48 h-48 rounded-3xl bg-gradient-to-br from-[#00CC99]/20 to-[#00FFCC]/20 border border-[#00CC99]/30 backdrop-blur-sm flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#00CC99]/10 to-[#00FFCC]/10"></div>
      
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: 'linear-gradient(45deg, #00CC99 25%, transparent 25%, transparent 75%, #00CC99 75%)',
            backgroundSize: '20px 20px'
          }}
        ></div>
      </div>
      
      {/* Main Gear with enhanced animation */}
      <motion.div
        className="absolute w-20 h-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          <defs>
            <linearGradient id="gearGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00CC99" />
              <stop offset="100%" stopColor="#00FFCC" />
            </linearGradient>
            <filter id="gearGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <circle cx="50" cy="50" r="40" fill="none" stroke="url(#gearGradient)" strokeWidth="8" filter="url(#gearGlow)" />
          <circle cx="50" cy="50" r="12" fill="url(#gearGradient)" />
          {[...Array(8)].map((_, i) => (
            <rect
              key={i}
              x="45"
              y="10"
              width="10"
              height="25"
              fill="url(#gearGradient)"
              transform={`rotate(${i * 45} 50 50)`}
              rx="3"
            />
          ))}
        </svg>
      </motion.div>
      
      {/* Secondary Gear */}
      <motion.div
        className="absolute w-12 h-12 top-10 right-10"
        animate={{ rotate: -360 }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="30" fill="none" stroke="url(#gearGradient2)" strokeWidth="6" />
          <circle cx="50" cy="50" r="10" fill="url(#gearGradient2)" />
          {[...Array(6)].map((_, i) => (
            <rect
              key={i}
              x="45"
              y="15"
              width="10"
              height="20"
              fill="url(#gearGradient2)"
              transform={`rotate(${i * 60} 50 50)`}
              rx="2"
            />
          ))}
          <defs>
            <linearGradient id="gearGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00FFCC" />
              <stop offset="100%" stopColor="#00CC99" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
      
      {/* Tertiary Gear */}
      <motion.div
        className="absolute w-8 h-8 bottom-12 left-12"
        animate={{ rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="25" fill="none" stroke="url(#gearGradient3)" strokeWidth="5" />
          <circle cx="50" cy="50" r="8" fill="url(#gearGradient3)" />
          {[...Array(5)].map((_, i) => (
            <rect
              key={i}
              x="45"
              y="15"
              width="10"
              height="15"
              fill="url(#gearGradient3)"
              transform={`rotate(${i * 72} 50 50)`}
              rx="1.5"
            />
          ))}
          <defs>
            <linearGradient id="gearGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00CC99" />
              <stop offset="100%" stopColor="#00FFCC" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
      
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1="50" y1="50" x2="75" y2="25" stroke="url(#lineGradient)" strokeWidth="0.5" />
        <line x1="50" y1="50" x2="25" y2="75" stroke="url(#lineGradient)" strokeWidth="0.5" />
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00CC99" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#00FFCC" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  </div>
)

const ShieldIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Security shield with enhanced protection visuals */}
    <div className="relative w-48 h-48 rounded-3xl bg-gradient-to-br from-[#FF6600]/20 to-[#FF9933]/20 border border-[#FF6600]/30 backdrop-blur-sm flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#FF6600]/10 to-[#FF9933]/10"></div>
      
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle, #FF6600 1px, transparent 1px)',
            backgroundSize: '15px 15px'
          }}
        ></div>
      </div>
      
      {/* Shield with enhanced animation and glow */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.8,
          type: "spring",
          stiffness: 200
        }}
      >
        <svg width="90" height="90" viewBox="0 0 24 24" fill="none">
          <motion.path
            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
            stroke="url(#shieldGradient)"
            strokeWidth="1.8"
            fill="url(#shieldFill)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ 
              duration: 1.8,
              type: "spring",
              stiffness: 100
            }}
          />
          <motion.path
            d="M9 12l2 2 4-4"
            stroke="#FF6600"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ 
              duration: 1,
              delay: 0.6,
              type: "spring",
              stiffness: 200
            }}
          />
          <defs>
            <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6600" />
              <stop offset="100%" stopColor="#FF9933" />
            </linearGradient>
            <linearGradient id="shieldFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6600" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FF9933" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
      
      {/* Protective particles with enhanced animation */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2.5 h-2.5 rounded-full bg-[#FF6600]"
          style={{
            top: `${15 + Math.sin(i * 60) * 30}%`,
            left: `${15 + Math.cos(i * 60) * 30}%`
          }}
          animate={{
            scale: [0, 1, 1, 0],
            opacity: [0, 1, 1, 0],
            y: [0, -10, -20]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 0.3
          }}
        />
      ))}
      
      {/* Energy field effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl border-2 border-[#FF6600]/30"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity
        }}
      ></motion.div>
    </div>
  </div>
)

const AnalyticsIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Analytics dashboard with enhanced data visualization */}
    <div className="relative w-48 h-48 rounded-3xl bg-gradient-to-br from-[#9900CC]/20 to-[#CC33FF]/20 border border-[#9900CC]/30 backdrop-blur-sm p-5 overflow-hidden">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#9900CC]/10 to-[#CC33FF]/10"></div>
      
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            backgroundImage: 'linear-gradient(45deg, #9900CC 25%, transparent 25%, transparent 75%, #9900CC 75%)',
            backgroundSize: '30px 30px'
          }}
        ></motion.div>
      </div>
      
      {/* Dashboard grid with enhanced cards */}
      <div className="grid grid-cols-3 gap-2 h-full">
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            className="rounded-xl bg-white/30 border border-white/40 flex items-center justify-center backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: i * 0.08,
              type: "spring",
              stiffness: 200
            }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(204, 51, 255, 0.4)"
            }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-[#9900CC]"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1
              }}
            ></motion.div>
          </motion.div>
        ))}
      </div>
      
      {/* Data line with enhanced animation */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M10,50 Q25,30 40,60 T70,40 T90,50"
          fill="none"
          stroke="url(#analyticsGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity, 
            repeatType: "reverse",
            type: "spring",
            stiffness: 100
          }}
        />
        <defs>
          <linearGradient id="analyticsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9900CC" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#CC33FF" stopOpacity="0.9" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Floating data points */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full bg-[#CC33FF]"
          style={{
            top: `${20 + i * 15}%`,
            left: `${30 + i * 10}%`
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 0.4
          }}
        />
      ))}
    </div>
  </div>
)

const FeaturesSection = () => {
  const features = [
    {
      title: "Intelligent Lead Targeting",
      description: "AI-powered prospecting identifies your ideal buyers and scores them by conversion probability—eliminating guesswork from your pipeline.",
      gradient: "from-[#6A00FF] to-[#7B1FFF]",
      stat: "92% Accuracy",
      color: "text-[#6A00FF]",
      details: "Our proprietary algorithm analyzes over 50 data points to identify high-intent prospects that match your ideal customer profile.",
      illustration: <AIIllustration />
    },
    {
      title: "Revenue Acceleration",
      description: "Data-driven sales strategies proven to shorten cycles, increase deal sizes, and compound monthly recurring revenue.",
      gradient: "from-[#0066FF] to-[#3399FF]",
      stat: "2.5x Growth",
      color: "text-[#0066FF]",
      details: "Accelerate your revenue with our proven methodology that combines AI insights with sales best practices.",
      illustration: <GrowthIllustration />
    },
    {
      title: "Instant Implementation",
      description: "See qualified leads flowing within 30 days with our streamlined AI deployment and automation-first methodology.",
      gradient: "from-[#00CC99] to-[#00FFCC]",
      stat: "30 Days Live",
      color: "text-[#00CC99]",
      details: "Our rapid deployment process gets you up and running quickly with minimal disruption to your existing workflow.",
      illustration: <ImplementationIllustration />
    },
    {
      title: "Risk-Free Revenue Audit",
      description: "Free pipeline analysis with no obligation. We only win when you close more deals.",
      gradient: "from-[#FF6600] to-[#FF9933]",
      stat: "No Upfront Cost",
      color: "text-[#FF6600]",
      details: "Experience our services risk-free with our performance-based pricing model that aligns our success with yours.",
      illustration: <ShieldIllustration />
    },
    {
      title: "Real-Time Sales Analytics",
      description: "Track conversion rates, deal velocity, and revenue metrics with AI-powered dashboards and predictive insights.",
      gradient: "from-[#9900CC] to-[#CC33FF]",
      stat: "Live Insights",
      color: "text-[#9900CC]",
      details: "Make data-driven decisions with real-time analytics that provide actionable insights into your sales performance.",
      illustration: <AnalyticsIllustration />
    }
  ]

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle dot pattern with enhanced opacity */}
        <div 
          className="absolute inset-0 opacity-8"
          style={{
            backgroundImage: 'radial-gradient(circle, #6A00FF 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        ></div>
        
        {/* Multiple purple glow effects for depth */}
        <div className="absolute top-1/4 -left-60 w-96 h-96 bg-[#6A00FF]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-60 w-96 h-96 bg-[#7B1FFF]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#9900CC]/3 rounded-full blur-2xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6A00FF]/10 rounded-full text-[#6A00FF] text-sm font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4" />
            <span>Trusted by 500+ Sales Teams</span>
          </motion.div>
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0D0D0D] mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Why Top Sales Teams <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6A00FF] to-[#7B1FFF]">Choose Us</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            We combine cutting-edge <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6A00FF] to-[#7B1FFF] font-semibold">AI sales technology</span> with proven revenue strategies to deliver 
            exceptional pipeline <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6A00FF] to-[#7B1FFF] font-semibold">growth</span> and predictable deal flow.
          </motion.p>
        </motion.div>

        {/* Interactive Story Layout */}
        <div className="space-y-40">
          {features.map((feature, index) => (
            <FeatureStoryBlock 
              key={index}
              feature={feature}
              index={index}
              isEven={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

const FeatureStoryBlock = ({ feature, index, isEven }: { feature: any, index: number, isEven: boolean }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const yTransform = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16`}>
        {/* Illustration */}
        <motion.div
          className="w-full lg:w-1/2"
          style={{
            y: yTransform,
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ y: -10 }}
            className="relative p-10 rounded-3xl bg-white/60 border border-gray-200/50 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500"
          >
            <div className="h-72 flex items-center justify-center">
              {feature.illustration}
            </div>
          </motion.div>
        </motion.div>
        
        {/* Content */}
        <motion.div
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 50 : -50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="max-w-lg">
            <motion.div 
              className={`text-sm font-bold ${feature.color} mb-6 flex items-center gap-3`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <span className="px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm">{feature.stat}</span>
              <div className={`h-0.5 flex-grow bg-gradient-to-r ${feature.gradient}`}></div>
            </motion.div>
            
            <motion.h3 
              className="text-3xl md:text-4xl font-bold text-[#0D0D0D] mb-8 relative inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {feature.title}
              <span className={`absolute -bottom-2 left-0 h-1 bg-gradient-to-r ${feature.gradient} w-0 group-hover:w-full transition-all duration-700`}></span>
            </motion.h3>
            
            <motion.p 
              className="text-lg text-gray-700 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {feature.description}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="group"
            >
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50/70 border border-gray-200/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-300">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${feature.gradient} mt-2 flex-shrink-0`}></div>
                <p className="text-gray-800 text-base">{feature.details}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default FeaturesSection