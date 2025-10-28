'use client'

import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-[#0A0A0A]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-[#0066FF]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-[#0066FF]/10 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      {/* Loading Animation */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative w-20 h-20 mb-8">
          <div className="w-20 h-20 border-4 border-[#0066FF]/20 rounded-full"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-t-[#0066FF] border-r-[#0066FF] border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold text-white"
        >
          Loading...
        </motion.h1>
      </div>
    </div>
  )
}