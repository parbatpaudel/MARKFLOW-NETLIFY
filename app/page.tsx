'use client';
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser } from '@/lib/supabase-context'
import { useRouter } from 'next/navigation'
import OnboardingModal from '@/components/ui/onboarding-modal'
import FeaturesSection from '@/components/ui/features-section'
import { Play, X, Building2 } from 'lucide-react'

export default function HomePage() {
  const user = useUser()
  const router = useRouter()
  const isAuthed = !!user
  const [loading, setLoading] = useState(true)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showCaseStudy, setShowCaseStudy] = useState(false)
  const [caseStudyVideoId, setCaseStudyVideoId] = useState('dQw4w9WgXcQ')

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false)
      try {
        const saved = localStorage.getItem('marketflow_onboarding')
        const parsed = saved ? JSON.parse(saved) : null
        // Only show onboarding if not done AND no previous session exists
        if (!parsed?.done && !localStorage.getItem('marketflow_visited')) {
          setShowOnboarding(true)
        }
        // Mark as visited for future sessions
        if (!localStorage.getItem('marketflow_visited')) {
          localStorage.setItem('marketflow_visited', 'true')
        }
      } catch {
        // First time visitor - show onboarding
        if (!localStorage.getItem('marketflow_visited')) {
          setShowOnboarding(true)
          localStorage.setItem('marketflow_visited', 'true')
        }
      }
    }, 900)
    return () => clearTimeout(t)
  }, [])

  const handleOnboardingClose = () => {
    setShowOnboarding(false)
    // Show latest case study popup after onboarding
    setTimeout(() => {
      const viewedStudies = localStorage.getItem('marketflow_viewed_studies')
      const viewed = viewedStudies ? JSON.parse(viewedStudies) : []
      
      // Determine which case study to show (id-1, id-2, id-3 in sequence)
      if (!viewed.includes('id-1')) {
        setCaseStudyVideoId('dQw4w9WgXcQ') // ID-1 video
        setShowCaseStudy(true)
        localStorage.setItem('marketflow_viewed_studies', JSON.stringify([...viewed, 'id-1']))
      } else if (!viewed.includes('id-2')) {
        setCaseStudyVideoId('dQw4w9WgXcQ') // ID-2 video
        setShowCaseStudy(true)
        localStorage.setItem('marketflow_viewed_studies', JSON.stringify([...viewed, 'id-2']))
      } else if (!viewed.includes('id-3')) {
        setCaseStudyVideoId('dQw4w9WgXcQ') // ID-3 video
        setShowCaseStudy(true)
        localStorage.setItem('marketflow_viewed_studies', JSON.stringify([...viewed, 'id-3']))
      }
    }, 1000)
  }
  return (
    <main className="relative">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f0f9ff] to-[#e0f2fe]" />
          <div className="absolute inset-0 opacity-[0.05]" style={{
            backgroundImage: 'linear-gradient(rgba(0, 52, 89, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 52, 89, 0.1) 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }} />
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-2xl border-4 border-[#00a8e8]/30 border-t-[#007ea7] animate-spin" />
            <div className="text-sm font-medium text-[#003459]">Preparing your experience…</div>
          </div>
        </div>
      )}
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-2 h-32 bg-gradient-to-b from-[#003459]/20 to-transparent rounded-full"></div>
        <div className="absolute top-1/3 right-10 w-2 h-24 bg-gradient-to-b from-[#007ea7]/20 to-transparent rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/4 w-16 h-16 border-2 border-[#003459]/10 rounded-lg rotate-12"></div>
        <div className="absolute top-1/2 right-1/4 w-12 h-12 border-2 border-[#00a8e8]/10 rounded-full"></div>
        
        {/* Floating accent dots */}
        <div className="absolute top-20 left-1/3 w-3 h-3 bg-[#007ea7]/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-1/3 w-2 h-2 bg-[#00a8e8]/30 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#003459]/10 border border-[#003459]/20 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00a8e8] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#003459]"></span>
              </span>
              <span className="text-sm font-semibold text-[#003459]">Powering 500+ sales teams worldwide</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-tight tracking-tight">
              <span className="block text-slate-800 mb-4">
                Transform Your Business With{" "}
              </span>
              <span className="block mb-4">
                <span className="relative inline-block group">
                  <span className="relative z-10 text-[#003459] font-extrabold">AI-Powered</span>
                  <span className="absolute -inset-3 bg-[#003459]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></span>
                  <svg className="absolute -bottom-4 left-0 w-full opacity-80" viewBox="0 0 200 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 10 Q50 4, 100 10 T200 10" stroke="#003459" strokeWidth="5" fill="none" strokeLinecap="round"/>
                  </svg>
                </span>
              </span>
              <span className="block">
                <span className="text-slate-800">Sales & Marketing{" "}</span>
                <span className="relative inline-block group">
                  <span className="relative z-10 bg-gradient-to-r from-[#007ea7] to-[#00a8e8] bg-clip-text text-transparent font-extrabold">Solutions</span>
                  <span className="absolute -inset-3 bg-gradient-to-r from-[#007ea7]/10 via-[#00a8e8]/10 to-[#007ea7]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></span>
                  <svg className="absolute -bottom-4 left-0 w-full opacity-80" viewBox="0 0 200 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 10 Q50 4, 100 10 T200 10" stroke="#00a8e8" strokeWidth="5" fill="none" strokeLinecap="round"/>
                  </svg>
                </span>
              </span>
            </h1>

            {/* Slogan/Subtitle */}
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
              Close more deals, automate your pipeline, and scale revenue with
              <span className="font-semibold text-slate-800"> AI-powered sales intelligence </span>
              that works 24/7.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              {/* Primary Button */}
              <button
                onClick={() => router.push(isAuthed ? '/services' : '/services')}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-[#003459] to-[#007ea7] hover:from-[#00171f] hover:to-[#003459] shadow-lg shadow-[#003459]/25 hover:shadow-xl hover:shadow-[#003459]/40 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden touch-manipulation animate-pulse-glow"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,168,232,0.2),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Explore Our Services</span>
                <svg className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              {/* Secondary Button -> Book Consultation */}
              <button
                onClick={() => router.push('/book-consultation')}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-semibold rounded-xl text-[#003459] bg-white border-2 border-[#003459]/20 hover:border-[#003459] hover:bg-[#003459] hover:text-white hover:-translate-y-0.5 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                <span className="relative z-10">Book Free Consultation</span>
                <svg className="relative z-10 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
            </div>

            {/* Stats */}
            <div className="pt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5 }}
                className="group text-center p-6 rounded-xl hover:bg-[#003459]/5 transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl font-bold text-[#003459] mb-1 group-hover:scale-110 transition-transform duration-300">500+</div>
                <div className="text-sm text-slate-600 font-medium">Sales Teams</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group text-center p-6 rounded-xl border-x border-slate-200 hover:bg-[#007ea7]/5 transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl font-bold text-[#007ea7] mb-1 group-hover:scale-110 transition-transform duration-300">3x</div>
                <div className="text-sm text-slate-600 font-medium">Revenue Growth</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="group text-center p-6 rounded-xl hover:bg-[#00a8e8]/5 transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl font-bold text-[#00a8e8] mb-1 group-hover:scale-110 transition-transform duration-300">70%</div>
                <div className="text-sm text-slate-600 font-medium">Time Saved</div>
              </motion.div>
            </div>


          </div>
        </div>
        
        {/* Floating skill icons in background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* AI Icon - Top Left */}
          <div className="absolute top-28 left-3 md:top-32 md:left-16 animate-float" style={{animationDelay: '0s'}}>
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600/20 blur-2xl rounded-full"></div>
              <div className="relative bg-white/40 backdrop-blur-sm rounded-2xl p-2 sm:p-4 border border-blue-600/20 shadow-lg">
                <svg className="w-6 h-6 sm:w-10 sm:h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Creativity Icon - Top Right */}
          <div className="absolute top-24 right-3 md:top-24 md:right-20 animate-float" style={{animationDelay: '1s'}}>
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full"></div>
              <div className="relative bg-white/40 backdrop-blur-sm rounded-2xl p-2 sm:p-4 border border-blue-500/20 shadow-lg">
                <svg className="w-5 h-5 sm:w-9 sm:h-9 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Integration Icon - Middle Left */}
          <div className="absolute top-1/2 left-3 md:left-12 animate-float" style={{animationDelay: '2s'}}>
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600/20 blur-2xl rounded-full"></div>
              <div className="relative bg-white/40 backdrop-blur-sm rounded-2xl p-2 sm:p-3 border border-blue-600/20 shadow-lg">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Analysis Icon - Middle Right */}
          <div className="absolute top-1/2 right-3 md:right-16 animate-float" style={{animationDelay: '0.5s'}}>
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full"></div>
              <div className="relative bg-white/40 backdrop-blur-sm rounded-2xl p-2 sm:p-4 border border-blue-500/20 shadow-lg">
                <svg className="w-5 h-5 sm:w-9 sm:h-9 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Expert Badge Icon - Bottom Right */}
          <div className="absolute bottom-20 right-3 md:bottom-40 md:right-24 animate-float" style={{animationDelay: '1.5s'}}>
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600/20 blur-2xl rounded-full"></div>
              <div className="relative bg-white/40 backdrop-blur-sm rounded-2xl p-2 sm:p-4 border border-blue-600/20 shadow-lg">
                <svg className="w-6 h-6 sm:w-10 sm:h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Single Case Study - Ad Creation */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#003459] via-[#007ea7] to-[#00a8e8] mb-4">
              AI Sales in Action
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              See how AI-powered sales automation transformed business pipelines
            </p>
          </div>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
          >
            <div className="grid md:grid-cols-5">
              {/* Video Side */}
              <div className="relative md:col-span-2 p-4">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-200 bg-black">
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="AI-Powered Ad Creation Case Study"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <p className="mt-2 text-xs text-slate-500">2024/09/06</p>
              </div>
              {/* Content Side */}
              <div className="md:col-span-3 p-6">
                <div className="flex items-center gap-2 text-[#007ea7] mb-2">
                  <Building2 className="h-4 w-4" />
                  <span className="text-xs font-medium tracking-wide uppercase">SaaS B2B Company</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Driven Sales Automation Success</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Implemented AI-powered prospecting, automated qualification, and intelligent outreach—resulting in record-breaking pipeline growth and faster deal cycles.
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-center">
                    <div className="text-xl font-bold text-emerald-700">+185%</div>
                    <div className="text-xs text-emerald-800">Qualified Leads</div>
                  </div>
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-center">
                    <div className="text-xl font-bold text-blue-700">+92%</div>
                    <div className="text-xs text-blue-800">Close Rate</div>
                  </div>
                  <div className="rounded-lg border border-purple-200 bg-purple-50 p-3 text-center">
                    <div className="text-xl font-bold text-purple-700">-65%</div>
                    <div className="text-xs text-purple-800">Sales Cycle</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>

          <div className="text-center mt-8">
            <a
              href="/services#case-studies"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[#007ea7] border-2 border-[#007ea7] hover:bg-[#007ea7] hover:text-white transition-all font-semibold"
            >
              View All Case Studies
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Case Study Popup Modal (shown after onboarding) */}
      <AnimatePresence>
        {showCaseStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowCaseStudy(false)}
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
                onClick={() => setShowCaseStudy(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur hover:bg-white/20 flex items-center justify-center transition-all group"
              >
                <X className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </button>

              {/* YouTube Iframe */}
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${caseStudyVideoId}?autoplay=1`}
                title="Latest Case Study"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Onboarding Modal */}
      <OnboardingModal isOpen={showOnboarding && !loading} onClose={handleOnboardingClose} />
    </main>
  )
}
