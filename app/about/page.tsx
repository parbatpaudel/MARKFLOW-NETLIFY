'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Target, Award, Heart, Star, Quote, Twitter, Linkedin, Youtube, Facebook, Instagram } from 'lucide-react'

const AboutPage = () => {
  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "We're committed to delivering exceptional digital experiences that drive real business results and help our clients achieve their goals."
    },
    {
      icon: Users,
      title: "Client-Focused",
      description: "Our clients are at the heart of everything we do. We build lasting partnerships through transparency, communication, and exceptional service."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We maintain the highest standards in everything we create, from code quality to user experience, ensuring exceptional results every time."
    },
    {
      icon: Heart,
      title: "Innovation",
      description: "We stay at the forefront of technology, constantly exploring new tools and methodologies to deliver cutting-edge solutions."
    },
  ]

  const testimonials = [
    {
      quote: "marketflow helped us replace scattered tools with a focused, automated funnel. We closed more deals in 60 days than the previous 6 months.",
      name: "Priyanka S.",
      role: "Founder, CraftNest",
    },
    {
      quote: "They blend AI with brand strategy exactly how it should be done — clean, human, and effective.",
      name: "Rahul K.",
      role: "CMO, Finovate",
    },
    {
      quote: "Custom plan. Clear numbers. Real growth. That simple.",
      name: "Emily R.",
      role: "Operations Lead, Atlas Fitness",
    },
  ]

  const socials = [
    { name: 'X (Twitter)', href: 'https://twitter.com/', icon: Twitter },
    { name: 'Facebook', href: 'https://facebook.com/', icon: Facebook },
    { name: 'Instagram', href: 'https://instagram.com/', icon: Instagram },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/', icon: Linkedin },
    { name: 'YouTube', href: 'https://www.youtube.com/@SIMPLE_ANALYSIS-K24', icon: Youtube },
  ]

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      name: "Emily Rodriguez",
      role: "Lead Designer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      name: "David Kim",
      role: "Senior Developer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                marketflow
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 leading-relaxed"
            >
              We're a passionate team of marketers, technologists, and strategists 
              dedicated to creating exceptional digital experiences that drive 
              business growth and user satisfaction.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                <p className="text-xl font-medium text-gray-800">
                  We don't sell packages. We design strategies around your business.
                </p>
                <p>
                  Founded by Paras Paudel in 2023, marketflow was born from a simple belief: automation should support human strategy, not replace it. Every brand is different, so we start by understanding your business and crafting custom solutions.
                </p>
                <p>
                  We analyze your brand, marketing systems, and growth barriers. Then we build strategies using the right mix of AI tools and marketing methods — from sales automation to content strategy — based on what your business needs most.
                </p>
                <p className="font-medium text-gray-800">
                  Our edge? Custom solutions. AI + human expertise. Result-driven approach.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl blur-2xl"></div>
                <div className="relative aspect-square bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border border-blue-100 shadow-xl">
                  <div className="h-full flex flex-col justify-center space-y-8">
                    <div className="text-center">
                      <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">500+</div>
                      <div className="text-lg text-gray-700 font-medium">Businesses Served</div>
                    </div>
                    <div className="text-center">
                      <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">98%</div>
                      <div className="text-lg text-gray-700 font-medium">Success Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Values
            </h2>
<p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that drive every strategy we build and every partnership we form.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50/20 overflow-hidden">
                    <CardContent className="p-8 text-center relative">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                          {value.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Clients Say</h2>
            <p className="text-xl text-gray-600">Real results from brands we've worked with</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50/30">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <Quote className="w-10 h-10 text-blue-600/20 mb-4" />
                    <p className="text-gray-700 leading-relaxed mb-6 text-lg">{t.quote}</p>
                    <div className="border-t border-gray-100 pt-4">
                      <p className="font-semibold text-gray-900">{t.name}</p>
                      <p className="text-sm text-gray-500">{t.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social handles */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Connect With Us</h3>
            <p className="text-gray-600 mb-10 text-lg">Follow marketflow for insights, updates, and success stories</p>
            <div className="flex flex-wrap justify-center gap-4">
              {socials.map((s) => {
                const Icon = s.icon
                return (
                  <motion.a
                    key={s.name}
                    href={s.href}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border-2 border-blue-200 bg-white hover:bg-blue-50 hover:border-blue-400 shadow-md hover:shadow-xl transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-gray-800">{s.name}</span>
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
