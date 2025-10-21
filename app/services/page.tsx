import { TrendingUp, Target, BarChart3, Send, Calendar, Megaphone, FileText, Lightbulb, Share2, SearchCheck, Plus, Play, Building2 } from 'lucide-react'

export default function ServicesPage() {
  const salesServices = [
    { title: 'Prospect Pro', desc: 'AI finds the best leads so your team can focus on closing deals.', Icon: Target },
    { title: 'Qualify Assist', desc: 'Automatically filter and qualify leads to connect only with serious prospects.', Icon: SearchCheck },
    { title: 'Revenue Reports', desc: 'Track sales performance with AI insights to see what drives revenue growth.', Icon: BarChart3 },
    { title: 'Campaign Flow', desc: 'Send personalized, automated messages and emails that convert.', Icon: Send },
    { title: 'Admin Automate', desc: 'Let AI manage scheduling and routine tasks, freeing your team for high-value work.', Icon: Calendar },
  ]

  const marketingServices = [
    { title: 'Smart Ads', desc: 'AI optimizes ad campaigns to reach the right audience and maximize ROI.', Icon: Megaphone },
    { title: 'Content Creator', desc: 'Generate blogs, social posts, and ideas that engage your audience effortlessly.', Icon: FileText },
    { title: 'Market Edge', desc: 'AI analyzes data to create smarter marketing strategies tailored to your goals.', Icon: Lightbulb },
    { title: 'Social Spark', desc: 'Plan, post, and manage social content that grabs attention and builds your brand.', Icon: Share2 },
    { title: 'Marketing Audit', desc: 'AI evaluates your marketing efforts and highlights areas to improve performance.', Icon: TrendingUp },
  ]

  return (
    <div className="min-h-screen pt-24 px-4">
      <section className="max-w-6xl mx-auto pb-16">
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#003459] via-[#007ea7] to-[#00a8e8] mb-4">
            AI-Powered Sales & Marketing Solutions
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            We deliver tailored, AI-driven strategies that accelerate growth, optimize performance, and drive measurable results for your business.
          </p>
        </div>

        {/* Sales Services Section */}
        <div className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#003459] mb-3 flex items-center gap-3">
              <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#003459] to-[#007ea7] flex items-center justify-center text-white">
                <TrendingUp className="w-6 h-6" />
              </span>
              Sales Services
            </h2>
            <p className="text-gray-600 ml-15">Accelerate your sales pipeline with intelligent automation and data-driven insights.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {salesServices.map(({ title, desc, Icon }) => (
              <article key={title} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 hover:border-[#007ea7]/50">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-blue-200/40 blur-xl group-hover:bg-blue-300/60 transition-colors"></div>
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 border border-blue-200 text-blue-700 group-hover:scale-110 transition-transform">
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Marketing Services Section */}
        <div className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#007ea7] mb-3 flex items-center gap-3">
              <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#007ea7] to-[#00a8e8] flex items-center justify-center text-white">
                <Megaphone className="w-6 h-6" />
              </span>
              Marketing Services
            </h2>
            <p className="text-gray-600 ml-15">Build brand authority and reach your ideal audience with smart, AI-optimized campaigns.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketingServices.map(({ title, desc, Icon }) => (
              <article key={title} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 hover:border-[#00a8e8]/50">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-cyan-200/40 blur-xl group-hover:bg-cyan-300/60 transition-colors"></div>
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-700 group-hover:scale-110 transition-transform">
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Custom Service Card */}
        <div className="mb-16">
          <a href="/book-consultation" className="group relative overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-white/60 backdrop-blur-sm shadow-sm transition-all hover:border-[#007ea7] hover:-translate-y-1 hover:shadow-md flex items-center justify-center p-8">
            <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-[#003459]/20 via-[#007ea7]/20 to-[#00a8e8]/20 blur"></div>
            </div>
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-4 relative">
                <div className="absolute inset-0 rounded-full bg-cyan-200/40 blur-xl group-hover:bg-cyan-300/60 transition-colors"></div>
                <div className="relative flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[#007ea7] to-[#00a8e8] text-white group-hover:scale-110 transition-transform shadow-lg">
                  <Plus className="h-8 w-8" />
                </div>
              </div>
              <div className="text-xl font-bold text-gray-900 mb-2">Need Something Custom?</div>
              <div className="text-base text-gray-600 max-w-md">Every business is unique. Tell us your specific needs and we'll create a tailored solution just for you.</div>
              <div className="mt-4 inline-flex items-center gap-2 text-[#007ea7] font-semibold group-hover:gap-3 transition-all">
                Book Free Consultation
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </a>
        </div>

        {/* Case Study Section */}
        <div className="mt-12" id="case-studies">
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#003459] via-[#007ea7] to-[#00a8e8] mb-3">
              Client Success Stories
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Real results from businesses that partnered with us to transform their sales and marketing
            </p>
          </div>
          
          {/* Featured Case Study */}
          <article className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm shadow-sm mb-8">
            <div className="grid md:grid-cols-5">
              {/* Video/Thumbnail side */}
              <div className="relative md:col-span-2 p-4">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-200 bg-black">
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Case Study Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                  <div className="absolute bottom-3 left-3">
                    <a
                      href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-slate-200 shadow-sm hover:bg-white transition"
                    >
                      <Play className="h-4 w-4 text-slate-700" />
                      <span className="text-xs font-medium text-slate-700">Watch on YouTube</span>
                    </a>
                  </div>
                </div>
                <p className="mt-2 text-xs text-slate-500">2024/09/06</p>
              </div>
              {/* Content side */}
              <div className="md:col-span-3 p-6">
                <div className="flex items-center gap-2 text-slate-700 mb-2">
                  <Building2 className="h-4 w-4" />
                  <span className="text-xs font-medium tracking-wide uppercase">D2C Retail Brand</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Scaling Revenue With AI-Driven Lifecycle Marketing</h3>
                <p className="text-sm text-gray-600 mb-4">We mapped customer journeys, integrated CRM with AI automations, and launched performance creatives to lift conversion and LTV.</p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-center">
                    <div className="text-xl font-bold text-emerald-700">+48%</div>
                    <div className="text-xs text-emerald-800">CVR</div>
                  </div>
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-center">
                    <div className="text-xl font-bold text-blue-700">-27%</div>
                    <div className="text-xs text-blue-800">CAC</div>
                  </div>
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-center">
                    <div className="text-xl font-bold text-amber-700">+36%</div>
                    <div className="text-xs text-amber-800">LTV</div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Additional Case Studies Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all">
              <div className="p-6">
                <div className="flex items-center gap-2 text-[#007ea7] mb-3">
                  <Building2 className="w-4 h-4" />
                  <span className="text-xs font-semibold tracking-wide uppercase">SaaS Technology Company</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">AI-Powered Lead Generation Revolution</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Implemented AI-driven prospecting and automated qualification system that dramatically increased qualified lead flow and sales efficiency.
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-2 text-center">
                    <div className="text-base font-bold text-emerald-700">+125%</div>
                    <div className="text-xs text-emerald-800">Leads</div>
                  </div>
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-2 text-center">
                    <div className="text-base font-bold text-blue-700">+85%</div>
                    <div className="text-xs text-blue-800">Qualified</div>
                  </div>
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-2 text-center">
                    <div className="text-base font-bold text-amber-700">-42%</div>
                    <div className="text-xs text-amber-800">Cost/Lead</div>
                  </div>
                </div>
              </div>
            </article>

            <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all">
              <div className="p-6">
                <div className="flex items-center gap-2 text-[#007ea7] mb-3">
                  <Building2 className="w-4 h-4" />
                  <span className="text-xs font-semibold tracking-wide uppercase">E-commerce Fashion Brand</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Smart Ads Campaign Optimization</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Deployed AI-optimized ad campaigns across multiple channels with intelligent targeting and real-time budget allocation.
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-2 text-center">
                    <div className="text-base font-bold text-emerald-700">+210%</div>
                    <div className="text-xs text-emerald-800">ROAS</div>
                  </div>
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-2 text-center">
                    <div className="text-base font-bold text-blue-700">+67%</div>
                    <div className="text-xs text-blue-800">CTR</div>
                  </div>
                  <div className="rounded-lg border border-purple-200 bg-purple-50 p-2 text-center">
                    <div className="text-base font-bold text-purple-700">-38%</div>
                    <div className="text-xs text-purple-800">CPC</div>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href="/book-consultation"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white bg-gradient-to-r from-[#003459] via-[#007ea7] to-[#00a8e8] hover:from-[#002742] hover:via-[#006a8f] hover:to-[#0095ce] shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all font-semibold"
            >
              Get Your Free Strategy Session
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
