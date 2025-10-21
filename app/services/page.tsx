'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Target, BarChart3, MessageSquare, Zap, FileText, Shield, Users2, Megaphone, Sparkles, Play, Building2, Plus } from 'lucide-react'

export default function ServicesPage() {
  const services = [
    {
      id: 1,
      title: 'Intelligent Prospecting',
      icon: Target,
      gradient: 'from-blue-600 to-cyan-500',
      howItWorks: 'We use advanced AI tools to find and score your ideal prospects. The AI looks at data like company size, technology used, hiring trends, and online behavior (website visits, downloads, etc.) to find people most likely to buy. Then, our human sales team uses these lists to start real conversations.',
      value: 'Cuts research time by up to 70% and helps your sales team focus only on high-quality leads.'
    },
    {
      id: 2,
      title: 'Conversational AI for Lead Qualification',
      icon: MessageSquare,
      gradient: 'from-emerald-600 to-green-500',
      howItWorks: 'AI chatbots and voice agents engage visitors on your website, social media, or phone 24/7. They answer questions, qualify leads, and collect key details before passing them to your team.',
      value: 'Captures leads anytime, reduces missed opportunities, and frees your reps from repetitive tasks.'
    },
    {
      id: 3,
      title: 'Hyper-Personalized Outreach',
      icon: Sparkles,
      gradient: 'from-purple-600 to-pink-500',
      howItWorks: 'AI creates personalized messages (emails, LinkedIn texts, call scripts) based on each prospect\'s data. It also finds the best time to contact them. Your team can then launch personalized campaigns across channels at scale.',
      value: 'Boosts response rates and builds authentic relationships while saving time.'
    },
    {
      id: 4,
      title: 'Revenue Intelligence & Conversation Analysis',
      icon: BarChart3,
      gradient: 'from-amber-600 to-orange-500',
      howItWorks: 'AI records and analyzes sales calls or meetings, creating summaries, action items, and insights. It tracks competitor mentions, detects emotions, and identifies winning sales behaviors.',
      value: 'Gives your team data-driven insights to improve sales performance and coaching.'
    },
    {
      id: 5,
      title: 'Automated Sales Workflows',
      icon: Zap,
      gradient: 'from-cyan-600 to-blue-500',
      howItWorks: 'AI handles routine tasks like CRM updates, email follow-ups, and scheduling. Everything stays accurate and updated in real-time.',
      value: 'Automates up to 30% of repetitive work, giving your team more time to sell and connect with customers.'
    },
    {
      id: 6,
      title: 'Dynamic Sales Pitch Personalization',
      icon: FileText,
      gradient: 'from-indigo-600 to-purple-500',
      howItWorks: 'AI uses CRM data to auto-create custom sales decks and presentations for each prospect. Your reps can review and adjust the final version quickly.',
      value: 'Delivers personalized, ready-to-use pitches in minutes — increasing deal speed and conversions.'
    },
    {
      id: 7,
      title: 'Competitor Analysis & Market Sensing',
      icon: Shield,
      gradient: 'from-rose-600 to-red-500',
      howItWorks: 'AI continuously tracks competitors\' websites, pricing, and marketing activities. Our analysts turn that data into clear, actionable reports.',
      value: 'Keeps you ahead with real-time insights your competitors are missing.'
    },
    {
      id: 8,
      title: 'Strategic Account Planning & Expansion',
      icon: Users2,
      gradient: 'from-teal-600 to-cyan-500',
      howItWorks: 'Your strategist works with AI tools to find top customer accounts with the biggest growth potential. AI predicts upsell and cross-sell chances using data and communication trends.',
      value: 'Helps grow revenue from your best clients and uncover hidden opportunities.'
    },
    {
      id: 9,
      title: 'AI-Powered Ad Optimization',
      icon: Megaphone,
      gradient: 'from-violet-600 to-purple-500',
      howItWorks: 'AI manages your ad campaigns across Google, Facebook, and LinkedIn. It shifts budgets automatically toward the best-performing ads and audiences, ensuring no money is wasted.',
      value: 'Increases ROI through smart, real-time budget control without manual effort.'
    },
    {
      id: 10,
      title: 'Automated Content & Social Media Engine',
      icon: TrendingUp,
      gradient: 'from-pink-600 to-rose-500',
      howItWorks: 'AI creates blogs, social posts, and email content based on trends, keywords, and audience interests. Your team then fine-tunes and schedules them for maximum engagement.',
      value: 'Keeps your brand active online with consistent, high-quality content — saving hours of manual work.'
    }
  ]

  return (
    <div className="min-h-screen pt-24 px-4">
      <section className="max-w-7xl mx-auto pb-16">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#003459] via-[#007ea7] to-[#00a8e8] mb-6"
          >
            AI-Powered Sales Solutions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-700 text-xl leading-relaxed"
          >
            Transform your sales process with intelligent automation that finds better leads, qualifies faster, and closes more deals—while your team focuses on what humans do best: building relationships.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="p-8 md:p-10">
                  {/* Header */}
                  <div className="flex items-start gap-6 mb-6">
                    {/* Icon */}
                    <div className="relative flex-shrink-0">
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${service.gradient} opacity-20 blur-2xl group-hover:opacity-30 transition-opacity`}></div>
                      <div className={`relative flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-2xl bg-gradient-to-r ${service.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-8 w-8 md:h-10 md:w-10" strokeWidth={2} />
                      </div>
                    </div>
                    
                    {/* Title */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 text-sm font-bold">
                          {service.id}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-[#007ea7] transition-colors">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-6 ml-0 md:ml-26">
                    {/* How It Works */}
                    <div>
                      <h4 className="text-lg font-bold text-[#003459] mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#003459]"></span>
                        How it works:
                      </h4>
                      <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                        {service.howItWorks}
                      </p>
                    </div>

                    {/* Value */}
                    <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-50 to-cyan-50 border border-emerald-200/50">
                      <h4 className="text-lg font-bold text-emerald-800 mb-2 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Value:
                      </h4>
                      <p className="text-emerald-900 font-medium leading-relaxed">
                        {service.value}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* Custom Service CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <a href="/book-consultation" className="group relative overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-gradient-to-br from-white to-blue-50/30 backdrop-blur-sm shadow-sm hover:shadow-xl hover:border-[#007ea7] hover:-translate-y-1 transition-all flex items-center justify-center p-10">
            <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-[#003459]/20 via-[#007ea7]/20 to-[#00a8e8]/20 blur-xl"></div>
            </div>
            <div className="relative flex flex-col items-center text-center max-w-2xl">
              <div className="mb-6 relative">
                <div className="absolute inset-0 rounded-full bg-cyan-200/40 blur-2xl group-hover:bg-cyan-300/60 transition-colors"></div>
                <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#007ea7] to-[#00a8e8] text-white group-hover:scale-110 transition-transform shadow-xl">
                  <Plus className="h-10 w-10" strokeWidth={2.5} />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-3">Need a Custom AI Sales Solution?</div>
              <div className="text-lg text-gray-600 max-w-lg mb-6">
                Every sales team is unique. Tell us your specific challenges and revenue goals—we'll design a tailored AI system just for you.
              </div>
              <div className="inline-flex items-center gap-3 text-[#007ea7] font-bold text-lg group-hover:gap-4 transition-all">
                Book Free Revenue Audit
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </a>
        </motion.div>

        {/* Case Studies Section */}
        <div className="mt-20" id="case-studies">
          <div className="mb-12 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#003459] via-[#007ea7] to-[#00a8e8] mb-4"
            >
              AI Sales Success Stories
            </motion.h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Real revenue growth from businesses that deployed AI-powered sales systems
            </p>
          </div>
          
          {/* Featured Case Study */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-xl mb-10"
          >
            <div className="grid md:grid-cols-5">
              {/* Video side */}
              <div className="relative md:col-span-2 p-6">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-200 bg-black shadow-lg">
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="AI Sales Success Case Study"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                  <div className="absolute bottom-3 left-3">
                    <a
                      href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/95 border border-slate-200 shadow-md hover:bg-white transition"
                    >
                      <Play className="h-4 w-4 text-slate-700" />
                      <span className="text-sm font-semibold text-slate-700">Watch on YouTube</span>
                    </a>
                  </div>
                </div>
                <p className="mt-3 text-xs text-slate-500 font-medium">Published: 2024/09/06</p>
              </div>
              
              {/* Content side */}
              <div className="md:col-span-3 p-8">
                <div className="flex items-center gap-2 text-[#007ea7] mb-3">
                  <Building2 className="h-5 w-5" />
                  <span className="text-sm font-bold tracking-wide uppercase">B2B SaaS Company</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  AI-Driven Pipeline Transformation
                </h3>
                <p className="text-base text-gray-600 leading-relaxed mb-6">
                  Deployed intelligent prospecting, conversational AI qualification, and automated personalized outreach—resulting in 3x pipeline growth and 40% faster deal cycles within 90 days.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-4 text-center">
                    <div className="text-2xl md:text-3xl font-bold text-emerald-700">+285%</div>
                    <div className="text-xs md:text-sm text-emerald-900 font-semibold mt-1">Qualified Leads</div>
                  </div>
                  <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-4 text-center">
                    <div className="text-2xl md:text-3xl font-bold text-blue-700">-40%</div>
                    <div className="text-xs md:text-sm text-blue-900 font-semibold mt-1">Sales Cycle</div>
                  </div>
                  <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-4 text-center">
                    <div className="text-2xl md:text-3xl font-bold text-amber-700">+165%</div>
                    <div className="text-xs md:text-sm text-amber-900 font-semibold mt-1">Revenue</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Additional Case Studies Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              <div className="p-7">
                <div className="flex items-center gap-2 text-[#007ea7] mb-3">
                  <Building2 className="w-5 h-5" />
                  <span className="text-sm font-bold tracking-wide uppercase">Enterprise Software</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Conversational AI Lead Qualification</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  Implemented 24/7 AI chatbots and voice agents that qualify prospects instantly, booking meetings only with decision-makers—freeing the sales team to focus on closing.
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-center">
                    <div className="text-lg font-bold text-emerald-700">+340%</div>
                    <div className="text-xs text-emerald-800 font-medium">Meetings Booked</div>
                  </div>
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-center">
                    <div className="text-lg font-bold text-blue-700">95%</div>
                    <div className="text-xs text-blue-800 font-medium">Quality Score</div>
                  </div>
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-center">
                    <div className="text-lg font-bold text-amber-700">-60%</div>
                    <div className="text-xs text-amber-800 font-medium">Time to Qualify</div>
                  </div>
                </div>
              </div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              <div className="p-7">
                <div className="flex items-center gap-2 text-[#007ea7] mb-3">
                  <Building2 className="w-5 h-5" />
                  <span className="text-sm font-bold tracking-wide uppercase">Professional Services</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Hyper-Personalized Outreach at Scale</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  AI-generated personalized emails and LinkedIn messages for 10,000+ prospects monthly, with perfect timing and customization—dramatically increasing response and conversion rates.
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-center">
                    <div className="text-lg font-bold text-emerald-700">+580%</div>
                    <div className="text-xs text-emerald-800 font-medium">Response Rate</div>
                  </div>
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-center">
                    <div className="text-lg font-bold text-blue-700">+215%</div>
                    <div className="text-xs text-blue-800 font-medium">Conversions</div>
                  </div>
                  <div className="rounded-lg border border-purple-200 bg-purple-50 p-3 text-center">
                    <div className="text-lg font-bold text-purple-700">-75%</div>
                    <div className="text-xs text-purple-800 font-medium">Manual Work</div>
                  </div>
                </div>
              </div>
            </motion.article>
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href="/book-consultation"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-xl text-white text-lg font-bold bg-gradient-to-r from-[#003459] via-[#007ea7] to-[#00a8e8] hover:from-[#002742] hover:via-[#006a8f] hover:to-[#0095ce] shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300"
            >
              Get Your Free Revenue Audit
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
