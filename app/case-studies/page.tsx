'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Building2, TrendingUp, DollarSign, Users } from 'lucide-react'

// Case Study Data
const caseStudies = [
  {
    id: 1,
    title: "Scaling Revenue With AI-Driven Lifecycle Marketing",
    client: "D2C Retail Brand",
    description: "We mapped customer journeys, integrated CRM with AI automations, and launched performance creatives to lift conversion and LTV.",
    videoUrl: "https://youtu.be/5lO5fEDzxKc",
    date: "2025/09/06",
    metrics: [
      { value: "+24%", label: "CVR", color: "emerald" },
      { value: "-12%", label: "CAC", color: "blue" },
      { value: "+18%", label: "LTV", color: "amber" }
    ],
    industry: "E-commerce",
    challenge: "The client was struggling with low customer retention and inefficient marketing spend across multiple channels.",
    solution: "We implemented a comprehensive AI-driven lifecycle marketing strategy that included customer segmentation, personalized email campaigns, and predictive analytics to identify high-value customers.",
    results: "The client saw a 24% increase in conversion rate, 12% reduction in customer acquisition cost, and 18% improvement in customer lifetime value within 6 months."
  },
  {
    id: 2,
    title: "AI-Powered Lead Generation Revolution",
    client: "SaaS Technology Company",
    description: "Implemented AI-driven prospecting and automated qualification system that dramatically increased qualified lead flow and sales efficiency.",
    videoUrl: "https://youtu.be/5lO5fEDzxKc",
    date: "2025/08/15",
    metrics: [
      { value: "+58%", label: "Leads", color: "emerald" },
      { value: "+38%", label: "Qualified", color: "blue" },
      { value: "-22%", label: "Cost/Lead", color: "amber" }
    ],
    industry: "SaaS",
    challenge: "The sales team was overwhelmed with low-quality leads and spent too much time on manual prospecting.",
    solution: "We deployed an AI-powered lead generation system that automatically identified and scored prospects based on multiple data points.",
    results: "The client experienced a 58% increase in total leads, 38% more qualified leads, and a 22% reduction in cost per lead within 90 days."
  },
  {
    id: 3,
    title: "Smart Ads Campaign Optimization",
    client: "E-commerce Fashion Brand",
    description: "Deployed AI-optimized ad campaigns across multiple channels with intelligent targeting and real-time budget allocation.",
    videoUrl: "https://youtu.be/5lO5fEDzxKc",
    date: "2025/07/22",
    metrics: [
      { value: "+82%", label: "ROAS", color: "emerald" },
      { value: "+29%", label: "CTR", color: "blue" },
      { value: "-18%", label: "CPC", color: "purple" }
    ],
    industry: "Fashion",
    challenge: "The client's advertising campaigns were underperforming with high costs and low engagement rates.",
    solution: "We implemented AI-driven campaign optimization that automatically adjusted bids, targeting, and creative elements based on real-time performance data.",
    results: "The client achieved an 82% increase in return on ad spend, 29% higher click-through rates, and an 18% reduction in cost per click."
  },
  {
    id: 4,
    title: "Sales Forecasting & Pipeline Management",
    client: "Financial Services Firm",
    description: "Implemented AI-powered sales forecasting that improved accuracy and enabled proactive pipeline management.",
    videoUrl: "https://youtu.be/5lO5fEDzxKc",
    date: "2025/06/30",
    metrics: [
      { value: "+42%", label: "Forecast Accuracy", color: "emerald" },
      { value: "+25%", label: "Deal Velocity", color: "blue" },
      { value: "-30%", label: "Missed Quotas", color: "amber" }
    ],
    industry: "Financial Services",
    challenge: "The sales team consistently missed their quotas due to inaccurate forecasting and poor pipeline visibility.",
    solution: "We deployed an AI forecasting system that analyzed historical data, deal progression patterns, and market trends to provide accurate predictions.",
    results: "The client improved forecast accuracy by 42%, increased deal velocity by 25%, and reduced missed quotas by 30%."
  },
  {
    id: 5,
    title: "Conversational AI for Lead Qualification",
    client: "B2B Software Company",
    description: "Deployed AI chatbots and voice agents to qualify leads 24/7 and reduce missed opportunities.",
    videoUrl: "https://youtu.be/5lO5fEDzxKc",
    date: "2025/05/18",
    metrics: [
      { value: "+72%", label: "Lead Capture", color: "emerald" },
      { value: "+45%", label: "Qualified Leads", color: "blue" },
      { value: "-35%", label: "Response Time", color: "purple" }
    ],
    industry: "Software",
    challenge: "The client was missing leads outside business hours and had long response times that led to lost opportunities.",
    solution: "We implemented conversational AI agents that engaged website visitors 24/7, qualified leads, and scheduled meetings with sales reps.",
    results: "The client captured 72% more leads, increased qualified leads by 45%, and reduced average response time by 35%."
  },
  {
    id: 6,
    title: "Dynamic Sales Pitch Personalization",
    client: "Enterprise Technology Provider",
    description: "Created AI-powered personalized sales presentations that increased deal closure rates by 35%.",
    videoUrl: "https://youtu.be/5lO5fEDzxKc",
    date: "2025/04/12",
    metrics: [
      { value: "+35%", label: "Close Rate", color: "emerald" },
      { value: "+28%", label: "Deal Size", color: "blue" },
      { value: "-20%", label: "Sales Cycle", color: "amber" }
    ],
    industry: "Enterprise Technology",
    challenge: "Sales reps were spending excessive time creating customized presentations, leading to inconsistent quality and longer sales cycles.",
    solution: "We developed an AI system that automatically generated personalized sales decks based on prospect data and historical successful presentations.",
    results: "The client increased close rates by 35%, achieved 28% larger deal sizes, and shortened the sales cycle by 20%."
  }
]

// Color mapping for metrics
const colorMap = {
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', textSecondary: 'text-emerald-800' },
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', textSecondary: 'text-blue-800' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', textSecondary: 'text-amber-800' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', textSecondary: 'text-purple-800' }
}

export default function CaseStudiesPage() {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<typeof caseStudies[0] | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const toggleVideo = (id: string) => {
    setPlayingVideo(playingVideo === id ? null : id)
  }

  // Extract video ID from YouTube URL
  const getVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  const openCaseStudyModal = (caseStudy: typeof caseStudies[0]) => {
    setSelectedCaseStudy(caseStudy)
  }

  const closeCaseStudyModal = () => {
    setSelectedCaseStudy(null)
  }

  return (
    <main className="min-h-screen bg-[#0D1117]">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 px-4 md:px-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-0 left-0 w-full h-full opacity-15"
            style={{
              background: 'radial-gradient(circle at top left, #6E00FF 0%, transparent 40%), radial-gradient(circle at bottom right, #4A0080 0%, transparent 40%)'
            }}
          ></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our Case Studies
            </h1>
            <p className="text-xl text-[#B3B3B3] max-w-3xl mx-auto mb-6">
              Real-world examples of how we've helped businesses transform their sales with AI-powered automation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-8 px-4 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study) => {
              const videoId = getVideoId(study.videoUrl);
              const isPlaying = playingVideo === `card-${study.id}`;
              
              return (
                <motion.div
                  key={study.id}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1A1F25] to-[#0D1117] border border-[#2A2F36] shadow-xl hover:shadow-2xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -10 }}
                >
                  {/* Video Container */}
                  <div className="relative h-48 bg-gradient-to-br from-purple-600 to-indigo-800 overflow-hidden">
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
                          onClick={() => toggleVideo(`card-${study.id}`)}
                          className="absolute inset-0 flex items-center justify-center group/play"
                        >
                          <div className="relative">
                            <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full scale-150"></div>
                            <div className="relative w-16 h-16 rounded-full bg-white/90 backdrop-blur flex items-center justify-center group-hover/play:bg-white group-hover/play:scale-110 transition-all shadow-2xl">
                              <Play className="w-6 h-6 text-purple-800 ml-1" fill="currentColor" />
                            </div>
                          </div>
                        </button>
                      </>
                    )}

                    {/* Date Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-bold text-gray-700 shadow-lg">
                      {study.date}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-purple-400 mb-3">
                      <Building2 className="w-5 h-5" />
                      <span className="text-sm font-bold tracking-wide uppercase">{study.client}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{study.title}</h3>
                    <p className="text-[#B3B3B3] mb-5 line-clamp-3">{study.description}</p>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {study.metrics.map((metric, idx) => {
                        const colors = colorMap[metric.color as keyof typeof colorMap]
                        return (
                          <div key={idx} className={`rounded-xl border ${colors.border} ${colors.bg} p-3 text-center transition-all duration-300 hover:shadow-md`}>
                            <div className={`text-lg font-extrabold ${colors.text}`}>{metric.value}</div>
                            <div className={`text-xs font-semibold ${colors.textSecondary} mt-1`}>{metric.label}</div>
                          </div>
                        )
                      })}
                    </div>

                    {/* CTA Button */}
                    <button 
                      onClick={() => openCaseStudyModal(study)}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-4 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-800 transition-all duration-300"
                    >
                      View Full Case Study
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      {selectedCaseStudy && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center p-4">
          <motion.div
            ref={modalRef}
            className="relative bg-[#1A1F25] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#2A2F36]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            {/* Close Button */}
            <button
              onClick={closeCaseStudyModal}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#2A2F36] flex items-center justify-center text-white hover:bg-[#3A3F46] transition-colors z-10"
            >
              ✕
            </button>

            {/* Modal Content */}
            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                  <div className="flex items-center gap-2 text-purple-400 mb-4">
                    <Building2 className="w-5 h-5" />
                    <span className="text-sm font-bold tracking-wide uppercase">{selectedCaseStudy.client}</span>
                    <span className="text-xs bg-purple-900/50 text-purple-300 px-2 py-1 rounded-full">
                      {selectedCaseStudy.industry}
                    </span>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-white mb-4">{selectedCaseStudy.title}</h2>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">The Challenge</h3>
                    <p className="text-[#B3B3B3] mb-6">{selectedCaseStudy.challenge}</p>
                    
                    <h3 className="text-xl font-bold text-white mb-2">Our Solution</h3>
                    <p className="text-[#B3B3B3] mb-6">{selectedCaseStudy.solution}</p>
                    
                    <h3 className="text-xl font-bold text-white mb-2">The Results</h3>
                    <p className="text-[#B3B3B3] mb-6">{selectedCaseStudy.results}</p>
                  </div>
                </div>
                
                <div className="md:w-1/2">
                  {/* Video */}
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-purple-600 to-indigo-800">
                    <img
                      src={`https://img.youtube.com/vi/${getVideoId(selectedCaseStudy.videoUrl) || 'iAmUF1mEmOE'}/maxresdefault.jpg`}
                      alt={selectedCaseStudy.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <button
                      onClick={() => toggleVideo(`modal-${selectedCaseStudy.id}`)}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full scale-150"></div>
                        <div className="relative w-20 h-20 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-all shadow-2xl">
                          <Play className="w-8 h-8 text-purple-800 ml-1" fill="currentColor" />
                        </div>
                      </div>
                    </button>
                  </div>
                  
                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4">
                    {selectedCaseStudy.metrics.map((metric, idx) => {
                      const colors = colorMap[metric.color as keyof typeof colorMap]
                      return (
                        <div key={idx} className={`rounded-xl border ${colors.border} ${colors.bg} p-4 text-center`}>
                          <div className={`text-2xl font-extrabold ${colors.text}`}>{metric.value}</div>
                          <div className={`text-sm font-semibold ${colors.textSecondary} mt-1`}>{metric.label}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-[#2A2F36]">
                <button 
                  onClick={closeCaseStudyModal}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-800 transition-all duration-300"
                >
                  Close Case Study
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  )
}