import { TrendingUp, Users, Megaphone, MessagesSquare, Sparkles, Workflow, Bot, FileText, BarChart3, Newspaper, LayoutGrid, UserPlus, Briefcase, ShoppingBag, Database, Plus, Play, Building2 } from 'lucide-react'

export default function ServicesPage() {
  const services = [
    { title: 'Sales Management', desc: 'Build predictable pipelines and accelerate closed‑won with data‑driven rigor.', Icon: TrendingUp },
    { title: 'Customer Relationship (CRM)', desc: 'Design CRM workflows that drive adoption, retention, and revenue.', Icon: Users },
    { title: 'Marketing & Advertising', desc: 'Full‑funnel campaigns across paid, owned, and earned channels.', Icon: Megaphone },
    { title: 'Social Media Management', desc: 'Always‑on content, community, and performance across platforms.', Icon: MessagesSquare },
    { title: 'Brand Strategy & Development', desc: 'Clarify positioning, narrative, and identity that converts.', Icon: Sparkles },
    { title: 'Automation & AI Systems', desc: 'Automate ops and decisions with AI agents and smart workflows.', Icon: Bot },
    { title: 'Content & Creative Strategy', desc: 'Insight‑led content that educates, ranks, and sells.', Icon: FileText },
    { title: 'Market Research & Analytics', desc: 'Customer, competitor, and category insights for sharper bets.', Icon: BarChart3 },
    { title: 'Performance Marketing', desc: 'Acquisition with ruthless CAC and ROAS discipline.', Icon: Workflow },
    { title: 'Public Relations & Communication', desc: 'Earned media and thought leadership that builds trust.', Icon: Newspaper },
    { title: 'Customer Experience (CX) Design', desc: 'Map journeys and remove friction to lift LTV.', Icon: LayoutGrid },
    { title: 'Lead Generation & Nurturing', desc: 'Capture, score, and nurture leads to sales readiness.', Icon: UserPlus },
    { title: 'Business Growth Consulting', desc: 'Tailored growth roadmaps aligned to business goals.', Icon: Briefcase },
    { title: 'E‑Commerce & Funnel Optimization', desc: 'Boost AOV and conversion with CRO across the funnel.', Icon: ShoppingBag },
    { title: 'Data Intelligence & Reporting', desc: 'Unified dashboards and attribution for real‑time clarity.', Icon: Database },
  ]

  return (
    <div className="min-h-screen pt-24 px-4">
      <section className="max-w-6xl mx-auto pb-16">
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">Next‑Generation Marketing Services</h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            We integrate AI into marketing, sales, and growth strategies. We don’t offer fixed packages — every engagement is custom‑built to your goals. We also provide free consulting to identify the most effective growth strategies for your brand.
          </p>
          <div className="mt-5 flex items-center justify-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              No fixed packages
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              Tailored solutions
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Free consulting
            </span>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {services.map(({ title, desc, Icon }) => (
            <article key={title} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 hover:ring-2 hover:ring-cyan-200">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-green-200/40 blur-xl group-hover:bg-green-300/40 transition-colors"></div>
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 border border-green-200 text-green-700 group-hover:scale-105 transition-transform">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            </article>
          ))}
          {/* Connected Add Service Card */}
          <a href="/contact" className="group relative overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-white/60 backdrop-blur-sm shadow-sm transition-all hover:border-slate-400 hover:-translate-y-0.5 flex items-center justify-center p-6">
            <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-[#00a86b]/20 via-[#00b8d9]/20 to-[#007ea7]/20 blur"></div>
            </div>
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-3 relative">
                <div className="absolute inset-0 rounded-full bg-cyan-200/40 blur-xl group-hover:bg-cyan-300/40 transition-colors"></div>
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-700 group-hover:scale-105 transition-transform">
                  <Plus className="h-6 w-6" />
                </div>
              </div>
              <div className="text-base font-semibold text-gray-900">Add Another Service</div>
              <div className="text-sm text-gray-600">Tell us exactly what you need — we tailor everything. No fixed packages.</div>
            </div>
          </a>
        </div>

        {/* Case Study Section */}
        <div className="mt-12">
          <div className="mb-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Case Study</h2>
            <p className="text-gray-600 mt-2">A quick look at how tailored, AI‑enabled strategy unlocked measurable growth.</p>
          </div>
          <article className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm shadow-sm">
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
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Scaling Revenue With AI‑Driven Lifecycle Marketing</h3>
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
        </div>
      </section>
    </div>
  )
}
