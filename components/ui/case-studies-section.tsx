'use client'

import { useState } from 'react'
import { Play, X, Building2, TrendingUp, DollarSign, Users } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface CaseStudy {
  id: string
  title: string
  client: string
  description: string
  videoId: string
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
    videoId: 'dQw4w9WgXcQ',
    date: '2024/09/06',
    metrics: [
      { value: '+48%', label: 'CVR', color: 'emerald' },
      { value: '-27%', label: 'CAC', color: 'blue' },
      { value: '+36%', label: 'LTV', color: 'amber' }
    ]
  },
  {
    id: 'id-2',
    title: 'AI-Powered Lead Generation Revolution',
    client: 'SaaS Technology Company',
    description: 'Implemented AI-driven prospecting and automated qualification system that dramatically increased qualified lead flow and sales efficiency.',
    videoId: 'dQw4w9WgXcQ',
    date: '2024/08/15',
    metrics: [
      { value: '+125%', label: 'Leads', color: 'emerald' },
      { value: '+85%', label: 'Qualified', color: 'blue' },
      { value: '-42%', label: 'Cost/Lead', color: 'amber' }
    ]
  },
  {
    id: 'id-3',
    title: 'Smart Ads Campaign Optimization',
    client: 'E-commerce Fashion Brand',
    description: 'Deployed AI-optimized ad campaigns across multiple channels with intelligent targeting and real-time budget allocation.',
    videoId: 'dQw4w9WgXcQ',
    date: '2024/07/22',
    metrics: [
      { value: '+210%', label: 'ROAS', color: 'emerald' },
      { value: '+67%', label: 'CTR', color: 'blue' },
      { value: '-38%', label: 'CPC', color: 'purple' }
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
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  return (
    <>
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#003459] via-[#007ea7] to-[#00a8e8] mb-4">
              Recent Success Stories
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              See how we've helped businesses achieve remarkable growth with AI-powered strategies
            </p>
          </div>

          {/* Case Studies Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {caseStudies.map((study) => (
              <motion.article
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all"
              >
                {/* Video Thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-[#003459] to-[#007ea7] overflow-hidden">
                  <img
                    src={`https://img.youtube.com/vi/${study.videoId}/maxresdefault.jpg`}
                    alt={study.title}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Play Button */}
                  <button
                    onClick={() => setSelectedVideo(study.videoId)}
                    className="absolute inset-0 flex items-center justify-center group/play"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full scale-150"></div>
                      <div className="relative w-16 h-16 rounded-full bg-white/90 backdrop-blur flex items-center justify-center group-hover/play:bg-white group-hover/play:scale-110 transition-all shadow-xl">
                        <Play className="w-7 h-7 text-[#003459] ml-1" fill="currentColor" />
                      </div>
                    </div>
                  </button>

                  {/* Date Badge */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-medium text-gray-700">
                    {study.date}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-[#007ea7] mb-2">
                    <Building2 className="w-4 h-4" />
                    <span className="text-xs font-semibold tracking-wide uppercase">{study.client}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{study.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{study.description}</p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2">
                    {study.metrics.map((metric, idx) => {
                      const colors = colorMap[metric.color]
                      return (
                        <div key={idx} className={`rounded-lg border ${colors.border} ${colors.bg} p-2 text-center`}>
                          <div className={`text-base font-bold ${colors.text}`}>{metric.value}</div>
                          <div className={`text-xs ${colors.textSecondary}`}>{metric.label}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* View More Button */}
          <div className="text-center">
            <a
              href="/services#case-studies"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white bg-gradient-to-r from-[#003459] via-[#007ea7] to-[#00a8e8] hover:from-[#002742] hover:via-[#006a8f] hover:to-[#0095ce] shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all font-semibold"
            >
              View More Case Studies
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur hover:bg-white/20 flex items-center justify-center transition-all group"
              >
                <X className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </button>

              {/* YouTube Iframe */}
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="Case Study Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
