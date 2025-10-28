'use client'

import { motion } from 'framer-motion'
import { Brain, Zap, TrendingUp, Shield } from 'lucide-react'

const ConnectionVisualization = () => {
  // Business value points that connect to the central logo (limited to 4)
  const connections = [
    { 
      title: "Lead Generation", 
      description: "AI-powered prospecting identifies your ideal buyers", 
      icon: Brain,
      angle: 0 // Top
    },
    { 
      title: "Sales Automation", 
      description: "Automate repetitive tasks and focus on closing deals", 
      icon: Zap,
      angle: 90 // Right
    },
    { 
      title: "Revenue Growth", 
      description: "Data-driven insights to boost your bottom line", 
      icon: TrendingUp,
      angle: 180 // Bottom
    },
    { 
      title: "Secure Platform", 
      description: "Enterprise-grade security for your data", 
      icon: Shield,
      angle: 270 // Left
    }
  ]

  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Neural Network Connection Visualization */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-white mb-6"
          >
            Why Businesses Choose Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[#c8c8c8] max-w-3xl mx-auto"
          >
            Our AI-powered neural network connects your business to success
          </motion.p>
        </div>

        <div className="relative min-h-[600px] flex items-center justify-center">
          {/* Neural Network Connections */}
          <svg className="absolute inset-0 w-full h-full">
            {/* Connection lines from central logo to business values */}
            {connections.map((connection, index) => {
              const angle = connection.angle * (Math.PI / 180);
              const x1 = 50; // Center x
              const y1 = 50; // Center y
              const x2 = 50 + 35 * Math.cos(angle); // Outer point x
              const y2 = 50 + 35 * Math.sin(angle); // Outer point y
              
              return (
                <line 
                  key={`connection-${index}`}
                  x1={`${x1}%`} 
                  y1={`${y1}%`} 
                  x2={`${x2}%`} 
                  y2={`${y2}%`} 
                  stroke="url(#connectionGradient)" 
                  strokeWidth="2" 
                  strokeDasharray="5,5"
                >
                  <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite" />
                </line>
              );
            })}
            
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1877F2" stopOpacity="1" />
                <stop offset="50%" stopColor="#1877F2" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#1877F2" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Central Hub - Black squared rounded corner logo with gradient touch */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-black border-2 border-[#1877F2] rounded-xl flex items-center justify-center shadow-2xl neon-glow z-10"
            style={{
              boxShadow: '0 0 20px rgba(70, 130, 180, 0.5), inset 0 0 20px rgba(70, 130, 180, 0.2)'
            }}
          >
            <div className="relative w-full h-full rounded-xl flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1877F2]/30 to-transparent"></div>
              <div className="text-[#1877F2] font-black text-3xl relative z-10">M</div>
            </div>
          </motion.div>
          
          {/* Business Values - Outer Ring with Icons */}
          {connections.map((connection, index) => {
            const angle = connection.angle * (Math.PI / 180);
            const radius = 35;
            const x = 50 + radius * Math.cos(angle);
            const y = 50 + radius * Math.sin(angle);
            const Icon = connection.icon;
            
            return (
              <motion.div
                key={`connection-${index}`}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="absolute w-48 text-center"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="glass-card rounded-xl p-5 border border-[#1877F2]/30 mb-3 hover:border-[#1877F2]/50 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[#1877F2]/10 flex items-center justify-center mb-3 mx-auto border border-[#1877F2]/20">
                    <Icon className="w-6 h-6 text-[#1877F2]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{connection.title}</h3>
                  <p className="text-sm text-[#c8c8c8]">{connection.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Business Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
          className="glass-card rounded-3xl p-8 border border-[#1877F2]/30 mt-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-black text-[#1877F2] mb-2">15%</div>
              <div className="text-lg text-[#c8c8c8] font-medium">Increase in Leads</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-[#1877F2] mb-2">12%</div>
              <div className="text-lg text-[#c8c8c8] font-medium">Higher Conversion</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-[#1877F2] mb-2">18%</div>
              <div className="text-lg text-[#c8c8c8] font-medium">Revenue Growth</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ConnectionVisualization