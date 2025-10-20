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
      {/* Large Decorative Shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" style={{animationDuration: '3s'}}></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
      
      {/* Geometric Shapes - Squares */}
      <div className="absolute top-1/2 left-1/4 w-24 h-24 border-4 border-white/20 rounded-lg rotate-45 animate-float"></div>
      <div className="absolute top-16 right-16 w-16 h-16 border-3 border-white/15 rounded-lg rotate-12" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-1/3 left-1/2 w-20 h-20 bg-white/5 rounded-2xl rotate-12"></div>
      <div className="absolute bottom-20 left-16 w-12 h-12 border-2 border-white/25 rounded-md -rotate-45"></div>
      
      {/* Geometric Shapes - Circles */}
      <div className="absolute top-1/4 right-1/3 w-16 h-16 border-4 border-white/20 rounded-full"></div>
      <div className="absolute bottom-1/4 right-1/4 w-20 h-20 border-3 border-white/15 rounded-full"></div>
      <div className="absolute top-1/3 left-16 w-14 h-14 border-2 border-white/25 rounded-full"></div>
      
      {/* Geometric Shapes - Triangles (using border trick) */}
      <div className="absolute top-24 left-1/3 w-0 h-0 border-l-[20px] border-r-[20px] border-b-[35px] border-l-transparent border-r-transparent border-b-white/10 rotate-12"></div>
      <div className="absolute bottom-32 right-1/3 w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-white/15 -rotate-45"></div>
      
      {/* Small decorative lines */}
      <div className="absolute top-1/3 right-20 w-16 h-1 bg-white/20 rotate-45"></div>
      <div className="absolute bottom-1/3 left-24 w-12 h-1 bg-white/20 -rotate-45"></div>
      <div className="absolute top-1/2 left-1/3 w-20 h-1 bg-white/15 rotate-90"></div>
      
      {/* Animated dots */}
      <div className="absolute top-20 right-1/4 w-3 h-3 bg-white/40 rounded-full animate-pulse"></div>
      <div className="absolute bottom-24 left-1/3 w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
      <div className="absolute top-1/3 right-1/2 w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-16 right-1/2 w-2.5 h-2.5 bg-white/40 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
      <div className="absolute top-40 left-1/2 w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      
      {/* Hexagon shapes (using clip-path) */}
      <div className="absolute top-1/4 left-1/2 w-12 h-12 bg-white/10" style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', transform: 'rotate(15deg)'}}></div>
      <div className="absolute bottom-1/4 left-1/3 w-10 h-10 bg-white/15" style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', transform: 'rotate(-20deg)'}}></div>
      
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