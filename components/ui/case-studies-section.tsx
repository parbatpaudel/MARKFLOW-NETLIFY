'use client'

import { useState } from 'react'
import { Play, Building2, TrendingUp, DollarSign, Users } from 'lucide-react'
import { motion } from 'framer-motion'

interface CaseStudy {
  id: string
  title: string
  client: string
  description: string
  videoUrl: string
  date: string
  metrics: Array<{
    value: string
    label: string
    color: 'emerald' | 'blue' | 'amber' | 'purple'
  }>
}

const caseStudies: CaseStudy[] = [
  {
    id: 'id-1',
    title: 'Scaling Revenue With AI-Driven Lifecycle Marketing',
    client: 'D2C Retail Brand',
    description: 'We mapped customer journeys, integrated CRM with AI automations, and launched performance creatives to lift conversion and LTV.',
    videoUrl: 'https://youtu.be/iAmUF1mEmOE',
    date: '2024/09/06',
    metrics: [
      { value: '+24%', label: 'CVR', color: 'emerald' },
      { value: '-12%', label: 'CAC', color: 'blue' },
      { value: '+18%', label: 'LTV', color: 'amber' }
    ]
  },
  {
    id: 'id-2',
    title: 'AI-Powered Lead Generation Revolution',
    client: 'SaaS Technology Company',
    description: 'Implemented AI-driven prospecting and automated qualification system that dramatically increased qualified lead flow and sales efficiency.',
    videoUrl: 'https://youtu.be/iAmUF1mEmOE',
    date: '2024/08/15',
    metrics: [
      { value: '+58%', label: 'Leads', color: 'emerald' },
      { value: '+38%', label: 'Qualified', color: 'blue' },
      { value: '-22%', label: 'Cost/Lead', color: 'amber' }
    ]
  },
  {
    id: 'id-3',
    title: 'Smart Ads Campaign Optimization',
    client: 'E-commerce Fashion Brand',
    description: 'Deployed AI-optimized ad campaigns across multiple channels with intelligent targeting and real-time budget allocation.',
    videoUrl: 'https://youtu.be/iAmUF1mEmOE',
    date: '2024/07/22',
    metrics: [
      { value: '+82%', label: 'ROAS', color: 'emerald' },
      { value: '+29%', label: 'CTR', color: 'blue' },
      { value: '-18%', label: 'CPC', color: 'purple' }
    ]
  }
]

const colorMap = {
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', textSecondary: 'text-emerald-800' },
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', textSecondary: 'text-blue-800' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', textSecondary: 'text-amber-800' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', textSecondary: 'text-purple-800' }
}

export default function CaseStudiesSection() {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)

  const toggleVideo = (id: string) => {
    setPlayingVideo(playingVideo === id ? null : id)
  }

  // Extract video ID from YouTube URL
  const getVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-white to-gray-50 overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-[#6A00FF]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-[#7B1FFF]/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#6A00FF]/10 rounded-full text-[#6A00FF] text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            <span>Proven Results</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6A00FF] via-[#7B1FFF] to-[#6A00FF] mb-6">
            Recent Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how we've helped businesses achieve remarkable growth with AI-powered strategies
          </p>
        </motion.div>

        {/* Case Studies Grid - Improved mobile responsiveness */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {caseStudies.map((study) => {
            const videoId = getVideoId(study.videoUrl);
            const isPlaying = playingVideo === study.id;
            
            return (
              <motion.article
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                {/* Video Container */}
                <div className="relative aspect-video bg-gradient-to-br from-[#6A00FF] to-[#7B1FFF] overflow-hidden">
                  {isPlaying && videoId ? (
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`}
                      title={study.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      <img
                        src={`https://img.youtube.com/vi/${videoId || 'iAmUF1mEmOE'}/maxresdefault.jpg`}
                        alt={study.title}
                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      
                      {/* Play Button */}
                      <button
                        onClick={() => toggleVideo(study.id)}
                        className="absolute inset-0 flex items-center justify-center group/play"
                      >
                        <div className="relative">
                          <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full scale-150"></div>
                          <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 backdrop-blur flex items-center justify-center group-hover/play:bg-white group-hover/play:scale-110 transition-all shadow-2xl">
                            <Play className="w-6 h-6 md:w-8 md:h-8 text-[#6A00FF] ml-1" fill="currentColor" />
                          </div>
                        </div>
                      </button>
                    </>
                  )}

                  {/* Date Badge */}
                  <div className="absolute top-3 md:top-4 right-3 md:right-4 px-2 py-1 md:px-3 md:py-1.5 rounded-full bg-white/90 backdrop-blur text-xs font-bold text-gray-700 shadow-lg">
                    {study.date}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 md:p-6">
                  <div className="flex items-center gap-2 text-[#6A00FF] mb-2 md:mb-3">
                    <Building2 className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="text-xs md:text-sm font-bold tracking-wide uppercase">{study.client}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 line-clamp-2">{study.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 line-clamp-3">{study.description}</p>

                  {/* Enhanced Metrics */}
                  <div className="grid grid-cols-3 gap-2 md:gap-3">
                    {study.metrics.map((metric, idx) => {
                      const colors = colorMap[metric.color]
                      return (
                        <div key={idx} className={`rounded-xl border ${colors.border} ${colors.bg} p-2 md:p-3 text-center transition-all duration-300 hover:shadow-md`}>
                          <div className={`text-lg md:text-xl font-extrabold ${colors.text}`}>{metric.value}</div>
                          <div className={`text-xs font-semibold ${colors.textSecondary} mt-1`}>{metric.label}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* Enhanced View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <a
            href="/services#case-studies"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-white font-bold bg-gradient-to-r from-[#6A00FF] via-[#7B1FFF] to-[#6A00FF] hover:from-[#7B1FFF] hover:via-[#6A00FF] hover:to-[#7B1FFF] shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
          >
            View More Case Studies
            <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}