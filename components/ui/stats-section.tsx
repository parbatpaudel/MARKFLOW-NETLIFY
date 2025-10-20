'use client'

import { motion } from 'framer-motion'

const StatsSection = () => {
  const stats = [
    { number: "1000+", label: "Projects Completed" },
    { number: "500+", label: "Happy Clients" },
    { number: "99%", label: "Client Satisfaction" },
    { number: "24/7", label: "Support Available" },
  ]

  return (
    <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-400 overflow-hidden">
      {/* Decorative Shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 border-4 border-white/20 rounded-lg rotate-45"></div>
      <div className="absolute top-1/4 right-1/3 w-16 h-16 border-4 border-white/20 rounded-full"></div>
      <div className="absolute bottom-1/3 left-1/2 w-20 h-20 bg-white/5 rounded-2xl rotate-12"></div>
      
      {/* Animated dots */}
      <div className="absolute top-20 right-1/4 w-3 h-3 bg-white/40 rounded-full animate-pulse"></div>
      <div className="absolute bottom-24 left-1/3 w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
      <div className="absolute top-1/3 right-1/2 w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut"
              }}
              className="text-center text-white group"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1 + 0.2,
                  ease: "backOut"
                }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300"
              >
                {stat.number}
              </motion.div>
              <p className="text-lg md:text-xl opacity-90">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection