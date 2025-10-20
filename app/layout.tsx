import './globals.css'
import dynamic from 'next/dynamic'
import FooterController from '@/components/ui/FooterController'
import SupabaseProvider from '@/components/providers/supabase-provider'
import PostLoginPrompt from '@/components/ui/post-login-prompt'
import Navbar from '@/components/ui/navbar'

const ChatWidget = dynamic(() => import('@/components/ui/chat-widget').then(m => m.default), { ssr: false })

export const metadata = {
  title: {
    default: 'marketflow - Solve Your Business Flaw | Business Consulting Solutions',
    template: '%s | marketflow - Business Consulting Experts'
  },
  description: 'We analyze your business, spot gaps, and provide actionable AI-powered solutions through simple, guided steps. Let us help your business flow with expert consulting services.',
  keywords: 'business consulting, AI business solutions, business analysis, business optimization, marketflow, business consulting services, business strategy',
  openGraph: {
    title: 'marketflow - Solve Your Business Flaw | AI-Powered Business Solutions',
    description: 'Transform your business with our AI-powered analysis and actionable solutions. Expert consulting for businesses of all sizes.',
    url: 'https://marketflow.com',
    siteName: 'marketflow',
    images: [
      {
        url: '/marketflow-symbol.png',
        width: 800,
        height: 600,
        alt: 'marketflow logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'marketflow - AI-Powered Business Solutions',
    description: 'Transform your business with our AI-powered analysis and actionable solutions.',
    images: ['/marketflow-symbol.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://marketflow.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
  authModal?: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <title>marketflow - Solve Your Business Flaw</title>
        <meta name="description" content="We analyze your business, spot gaps, and provide actionable solutions through simple, guided steps." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
      </head>
      <body className="antialiased font-sans relative overflow-x-hidden">
        <SupabaseProvider>
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
          {/* Base gradient - White to subtle blue */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f0f9ff] to-[#e0f2fe]"></div>
          
          {/* Geometric grid - Prussian blue */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: 'linear-gradient(rgba(0, 52, 89, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 52, 89, 0.1) 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }}></div>
          
          {/* Diagonal accent - Cerulean */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(0, 126, 167, 0.08) 60px, rgba(0, 126, 167, 0.08) 61px)'
          }}></div>
          
          {/* Prussian blue glow - Deep intelligence */}
          <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-gradient-to-br from-[#003459]/15 via-[#003459]/5 to-transparent rounded-full blur-3xl"></div>
          
          {/* Cerulean glow - Innovation */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#007ea7]/12 via-[#007ea7]/5 to-transparent rounded-full blur-3xl"></div>
          
          {/* Picton blue accent - Energy */}
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-t from-[#00a8e8]/10 via-[#00a8e8]/4 to-transparent rounded-full blur-3xl"></div>
          
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#007ea7]/5"></div>
        </div>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          {/* Floating chat widget */}
          <ChatWidget />
          <FooterController>
          <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <span className="text-xl font-bold">marketflow</span>
                </div>
                <p className="text-gray-300 mb-6 max-w-md mx-auto">
                  Building modern, scalable marketing solutions with cutting-edge technology.
                </p>
                <p className="text-gray-400 text-sm">
                  © 2025 marketflow. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
          </FooterController>
          <PostLoginPrompt />
        </div>
        </SupabaseProvider>
      </body>
    </html>
  )
}
