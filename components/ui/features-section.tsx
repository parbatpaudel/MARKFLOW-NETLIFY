'use client'

import { motion } from 'framer-motion'
import { Target, TrendingUp, Zap, Shield, BarChart3, Sparkles } from 'lucide-react'
import { Card, CardContent } from "./card"

const FeaturesSection = () => {
  const features = [
    {
      icon: Target,
      title: "Precision Targeting",
      description: "AI-powered targeting finds your ideal customers and maximizes every marketing dollar spent.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: TrendingUp,
      title: "Revenue Growth",
      description: "Data-driven strategies proven to accelerate sales cycles and increase average deal sizes.",
      gradient: "from-emerald-500 to-green-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast Implementation",
      description: "Get results quickly with our streamlined processes and automation-first approach.",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      icon: Shield,
      title: "Risk-Free Consulting",
      description: "Free strategy sessions with no obligation. We only succeed when you do.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description: "Track every metric that matters with comprehensive dashboards and actionable insights.",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: Sparkles,
      title: "AI-First Innovation",
      description: "Stay ahead of competition with cutting-edge AI tools and marketing automation.",
      gradient: "from-indigo-500 to-purple-500"
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#003459] via-[#007ea7] to-[#00a8e8] mb-6">
            Why Leading Brands Choose Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine cutting-edge AI technology with proven sales strategies to deliver 
            exceptional ROI and sustainable growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 shadow-lg group hover:-translate-y-2 bg-white/80 backdrop-blur">
                  <CardContent className="p-8 text-center">
                    <div className="relative inline-block mb-6">
                      <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-20 blur-2xl rounded-full`}></div>
                      <div className={`relative w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#007ea7] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-8 px-8 py-6 bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-gray-100">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#003459] mb-1">500+</div>
              <div className="text-sm text-gray-600">Active Clients</div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#007ea7] mb-1">98%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#00a8e8] mb-1">$50M+</div>
              <div className="text-sm text-gray-600">Revenue Generated</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturesSection
