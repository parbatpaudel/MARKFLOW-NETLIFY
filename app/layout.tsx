import './globals.css'
import dynamic from 'next/dynamic'
import FooterController from '@/components/ui/FooterController'
import SupabaseProvider from '@/components/providers/supabase-provider'
import PostLoginPrompt from '@/components/ui/post-login-prompt'
import Navbar from '@/components/ui/navbar'
import { organizationStructuredData, websiteStructuredData } from './structured-data'

const ChatWidget = dynamic(() => import('@/components/ui/chat-widget').then(m => m.default), { ssr: false })

export const metadata = {
  title: {
    default: 'MarketFlow - AI-Powered Business Solutions in Nepal | Digital Transformation',
    template: '%s | MarketFlow Nepal - Business Consulting & AI Solutions'
  },
  description: 'Leading AI-powered business consulting firm in Nepal. We help Nepali businesses transform with cutting-edge AI solutions, sales automation, and digital strategies. Serving Kathmandu, Pokhara, and across Nepal.',
  keywords: 'AI business solutions Nepal, business consulting Nepal, sales automation Nepal, digital transformation Nepal, AI consulting Kathmandu, business strategy Nepal, marketflow Nepal, AI solutions Pokhara, business automation Nepal, digital marketing Nepal',
  openGraph: {
    title: 'MarketFlow Nepal - AI-Powered Business Solutions & Digital Transformation',
    description: 'Transform your Nepal-based business with our AI-powered solutions. Expert consulting services for companies in Kathmandu, Pokhara, and across Nepal.',
    url: 'https://marketflow.com',
    siteName: 'MarketFlow Nepal',
    images: [
      {
        url: '/marketflow-symbol.png',
        width: 800,
        height: 600,
        alt: 'MarketFlow Nepal - AI Business Solutions',
      },
    ],
    locale: 'en_NP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MarketFlow Nepal - AI-Powered Business Solutions',
    description: 'Leading AI business consulting firm serving businesses across Nepal with digital transformation and sales automation.',
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="geo.region" content="NP" />
        <meta name="geo.placename" content="Kathmandu, Nepal" />
        <meta name="geo.position" content="27.7172;85.324" />
        <meta name="ICBM" content="27.7172, 85.324" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />
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
          <PostLoginPrompt />
        </div>
        </SupabaseProvider>
      </body>
    </html>
  )
}