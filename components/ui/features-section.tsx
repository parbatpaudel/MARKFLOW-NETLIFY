'use client'

import { motion } from 'framer-motion'
import { Target, TrendingUp, Zap, Shield, BarChart3, Sparkles } from 'lucide-react'
import { Card, CardContent } from "./card"

const FeaturesSection = () => {
  const features = [
    {
      icon: Target,
      title: "Intelligent Lead Targeting",
      description: "AI-powered prospecting identifies your ideal buyers and scores them by conversion probability—eliminating guesswork from your pipeline.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: TrendingUp,
      title: "Revenue Acceleration",
      description: "Data-driven sales strategies proven to shorten cycles, increase deal sizes, and compound monthly recurring revenue.",
      gradient: "from-emerald-500 to-green-500"
    },
    {
      icon: Zap,
      title: "Instant Implementation",
      description: "See qualified leads flowing within 30 days with our streamlined AI deployment and automation-first methodology.",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      icon: Shield,
      title: "Risk-Free Revenue Audit",
      description: "Free pipeline analysis with no obligation. We only win when you close more deals.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: BarChart3,
      title: "Real-Time Sales Analytics",
      description: "Track conversion rates, deal velocity, and revenue metrics with AI-powered dashboards and predictive insights.",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: Sparkles,
      title: "AI Sales Intelligence",
      description: "Stay ahead with cutting-edge AI tools for prospecting, qualification, outreach, and deal intelligence.",
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
            Why Top Sales Teams Choose Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine cutting-edge AI sales technology with proven revenue strategies to deliver 
            exceptional pipeline growth and predictable deal flow.
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
      </div>
    </section>
  )
}

export default FeaturesSection
