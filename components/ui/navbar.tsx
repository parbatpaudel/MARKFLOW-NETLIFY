"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { Menu, X, Play } from "lucide-react"
import { Button } from "./button"
import { cn } from "@/lib/utils"
import LoginModal from "./login-modal"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)

  // Prevent background scroll when overlays are open
  useEffect(() => {
    const anyOverlay = isOpen || loginOpen
    if (anyOverlay) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [isOpen, loginOpen])
  
  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <nav className="bg-white/98 backdrop-blur-lg border-b border-gray-200/80 sticky top-0 z-[100] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 group-hover:from-blue-700 group-hover:via-cyan-600 group-hover:to-blue-700 transition-all">
              marketflow
            </span>
          </Link>

          {/* Desktop Navigation - Modern Design */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-gray-700 hover:text-blue-600 font-semibold text-sm lg:text-base py-2 px-4 lg:px-5 rounded-lg hover:bg-blue-50/80 transition-all group"
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:w-3/4 transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* CTA (desktop) */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            <a
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg px-3 lg:px-4 py-2 lg:py-2.5 text-sm font-semibold border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all"
            >
              <Play className="w-4 h-4" />
              <span className="hidden lg:inline">YouTube</span>
            </a>
            <button
              onClick={() => setLoginOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg px-4 lg:px-6 py-2 lg:py-2.5 text-sm lg:text-base font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-md hover:shadow-lg transition-all"
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu button - Modern */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2.5 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all touch-manipulation"
            aria-label="Toggle menu"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            {isOpen ? <X className="w-6 h-6" strokeWidth={2.5} /> : <Menu className="w-6 h-6" strokeWidth={2.5} />}
          </button>
        </div>
      </div>

      {/* Modern Mobile Navigation - Slide from LEFT */}
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[90] md:hidden"
            onClick={toggleMenu}
            style={{ touchAction: 'none' }}
          />
          
          {/* Modern Slide-in Menu from LEFT */}
          <div 
            className="fixed top-0 left-0 h-full w-[min(85vw,340px)] bg-white shadow-2xl z-[95] md:hidden flex flex-col"
            style={{ 
              transform: 'translateZ(0)', 
              WebkitOverflowScrolling: 'touch',
              animation: 'slideInLeft 0.3s ease-out'
            }}
          >
            {/* Modern Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg">
                  <span className="text-white font-black text-lg">M</span>
                </div>
                <span className="text-lg font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">Menu</span>
              </div>
              <button 
                onClick={toggleMenu}
                className="p-2 rounded-xl hover:bg-gray-100 active:bg-gray-200 touch-manipulation transition-all"
                aria-label="Close menu"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <X className="w-6 h-6 text-gray-600" strokeWidth={2.5} />
              </button>
            </div>
            
            {/* Navigation Links - Modern Cards */}
            <div className="flex-1 overflow-y-auto px-4 py-6" style={{ WebkitOverflowScrolling: 'touch' }}>
              <div className="space-y-2">
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={toggleMenu}
                    className="group flex items-center justify-between px-5 py-4 text-base font-bold text-gray-800 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 active:from-blue-100 active:to-cyan-100 transition-all touch-manipulation"
                    style={{ 
                      WebkitTapHighlightColor: 'transparent',
                      animation: `slideInItem 0.3s ease-out ${index * 0.05}s both`
                    }}
                  >
                    <span className="group-hover:text-blue-600 transition-colors">{item.name}</span>
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600/10 to-cyan-500/10 group-hover:from-blue-600/20 group-hover:to-cyan-500/20 flex items-center justify-center transition-all">
                      <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
              
              {/* Quick Actions */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <a
                  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all touch-manipulation"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <Play className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-semibold text-gray-700">Watch on YouTube</span>
                </a>
              </div>
            </div>
              
            {/* Modern Bottom CTA */}
            <div className="px-4 py-5 border-t border-gray-100 shrink-0 bg-gradient-to-br from-gray-50 to-blue-50/30">
              <button 
                onClick={() => { setIsOpen(false); setLoginOpen(true) }} 
                className="w-full px-6 py-4 text-base font-black text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl hover:from-blue-700 hover:to-cyan-600 active:scale-[0.98] shadow-lg hover:shadow-xl touch-manipulation transition-all"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                🚀 Get Started
              </button>
              <p className="text-center text-xs text-gray-500 mt-3">Join thousands of businesses</p>
            </div>
          </div>
          
          <style jsx>{`
            @keyframes slideInLeft {
              from {
                opacity: 0;
                transform: translateX(-100%);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
            @keyframes slideInItem {
              from {
                opacity: 0;
                transform: translateX(-20px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
          `}</style>
        </>
      )}
      {/* Login Modal */}
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </nav>
  )
}

export default Navbar
