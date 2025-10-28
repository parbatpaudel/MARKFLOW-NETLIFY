'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Play, Building2, TrendingUp, DollarSign, Users, Mail, Phone, MapPin } from 'lucide-react'

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

interface ConsultingPageProps {
  onRestartOnboarding?: () => void
}

export default function ConsultingPage({ onRestartOnboarding }: ConsultingPageProps) {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)

  const toggleVideo = (id: string) => {
    setPlayingVideo(playingVideo === id ? null : id)
  }

  // Extract video ID from YouTube URL
  const getVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  const processSteps = [
    {
      id: 1,
      title: 'Discovery & Assessment',
      description: 'We analyze your current sales process, identify pain points, and define success metrics.',
    },
    {
      id: 2,
      title: 'Strategy & Planning',
      description: 'Our team designs a customized AI implementation plan aligned with your business goals.',
    },
    {
      id: 3,
      title: 'Implementation',
      description: 'We deploy AI tools, integrate with your existing systems, and train your team.',
    },
    {
      id: 4,
      title: 'Optimization',
      description: 'We continuously monitor performance and refine the system for maximum results.',
    }
  ]

  return (
    <div className="space-y-12">
      {/* Contact Information Section */}
      <section className="bg-gradient-to-br from-[#6A00FF] via-[#7B1FFF] to-[#003459] rounded-2xl p-6 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Consulting Contact</h2>
          <p className="text-lg text-white/90 mb-6">
            Transform your business with AI-powered sales solutions
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base mb-1">Email</h3>
                <a href="mailto:marketingflow-details@outlook.com" className="text-white/90 hover:text-white hover:underline text-sm">
                  marketingflow-details@outlook.com
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base mb-1">Phone</h3>
                <a href="https://wa.me/9779763200956" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white hover:underline text-sm">
                  +977 9763200956
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base mb-1">Location</h3>
                <p className="text-white/90 text-sm">Global - Serving clients worldwide</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => window.location.href = 'https://calendly.com/markflow123'}
              className="h-12 px-6 bg-white text-[#6A00FF] font-bold rounded-lg shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all text-sm"
            >
              Schedule a Consultation
            </Button>
            
            {onRestartOnboarding && (
              <Button
                onClick={onRestartOnboarding}
                variant="outline"
                className="h-12 px-6 bg-transparent border-2 border-white text-white font-bold rounded-lg shadow-lg hover:bg-white/10 hover:shadow-xl transition-all text-sm"
              >
                Back to Onboarding
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Consulting Process Section */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Consulting Process</h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            We follow a proven 4-step approach to transform your sales process with AI-powered solutions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {processSteps.map((step) => (
            <div key={step.id} className="bg-white rounded-xl border border-gray-200/50 p-5 shadow-md hover:shadow-lg transition-all">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#6A00FF] to-[#7B1FFF] flex items-center justify-center text-white font-bold text-base mb-3">
                {step.id}
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Case Studies Section */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Relevant Case Studies</h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            See how we've helped businesses achieve remarkable growth with AI-powered strategies
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study) => {
            const videoId = getVideoId(study.videoUrl)
            const isPlaying = playingVideo === study.id
            
            return (
              <article
                key={study.id}
                className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white shadow-lg hover:shadow-xl transition-all duration-300"
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
                          <div className="relative w-12 h-12 rounded-full bg-white/90 backdrop-blur flex items-center justify-center group-hover/play:bg-white group-hover/play:scale-110 transition-all shadow-xl">
                            <Play className="w-5 h-5 text-[#6A00FF] ml-1" fill="currentColor" />
                          </div>
                        </div>
                      </button>
                    </>
                  )}
                  
                  {/* Date Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-bold text-gray-700 shadow-md">
                    {study.date}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-[#6A00FF] mb-2">
                    <Building2 className="w-4 h-4" />
                    <span className="text-xs font-bold tracking-wide uppercase">{study.client}</span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">{study.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm">{study.description}</p>
                  
                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2">
                    {study.metrics.map((metric, idx) => {
                      const colors = colorMap[metric.color]
                      return (
                        <div key={idx} className={`rounded-lg border ${colors.border} ${colors.bg} p-2 text-center transition-all duration-300 hover:shadow-sm`}>
                          <div className={`text-base font-extrabold ${colors.text}`}>{metric.value}</div>
                          <div className={`text-[10px] font-semibold ${colors.textSecondary} mt-1`}>{metric.label}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}