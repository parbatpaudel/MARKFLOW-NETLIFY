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
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-[100]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo (text-based) */}
          <Link href="/" className="flex items-center">
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
              marketflow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium text-sm py-2 px-3 block"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA (desktop) */}
          <div className="hidden md:flex items-center gap-3 mt-2">
            <a
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Play className="w-4 h-4" />
              YouTube
            </a>
            <button
              onClick={() => setLoginOpen(true)}
              className="inline-flex items-center rounded-lg px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 z-[90] md:hidden"
            onClick={toggleMenu}
            style={{ touchAction: 'none' }}
          />
          {/* Mobile Menu Sheet */}
          <div 
            className="fixed top-0 right-0 h-full w-[300px] max-w-[85vw] bg-gradient-to-br from-white via-blue-50/30 to-white shadow-2xl z-[95] md:hidden flex flex-col border-l-4 border-blue-600"
            style={{ transform: 'translateZ(0)', WebkitOverflowScrolling: 'touch' }}
          >
            {/* Header with Gradient */}
            <div className="flex items-center justify-between px-5 py-5 border-b-2 border-blue-100 bg-gradient-to-r from-blue-600 to-cyan-500 shrink-0">
              <span className="text-xl font-extrabold text-white drop-shadow-sm">Menu</span>
              <button 
                onClick={toggleMenu}
                className="p-2.5 rounded-xl bg-white/20 hover:bg-white/30 active:bg-white/40 backdrop-blur-sm touch-manipulation transition-all"
                aria-label="Close menu"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <X className="w-6 h-6 text-white" strokeWidth={3} />
              </button>
            </div>
            
            {/* Navigation Links - Scrollable with Better Design */}
            <div className="flex-1 overflow-y-auto bg-gradient-to-b from-transparent to-blue-50/20" style={{ WebkitOverflowScrolling: 'touch' }}>
              <nav className="px-4 py-6">
                <div className="space-y-3">
                  {navigation.map((item, index) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={toggleMenu}
                      className="group block px-5 py-4 text-base font-bold text-gray-900 rounded-xl bg-white hover:bg-blue-50 active:bg-blue-100 border-2 border-gray-200 hover:border-blue-400 shadow-sm hover:shadow-md transition-all touch-manipulation"
                      style={{ 
                        WebkitTapHighlightColor: 'transparent',
                        animationDelay: `${index * 50}ms`
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span>{item.name}</span>
                        <svg className="w-5 h-5 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </nav>
            </div>
              
            {/* Bottom CTA with Gradient */}
            <div className="px-4 py-5 border-t-2 border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 shrink-0">
              <button 
                onClick={() => { setIsOpen(false); setLoginOpen(true) }} 
                className="w-full px-5 py-4 text-base font-extrabold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl hover:from-blue-700 hover:to-cyan-600 active:from-blue-800 active:to-cyan-700 shadow-lg hover:shadow-xl touch-manipulation transition-all"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                Get Started
              </button>
            </div>
          </div>
        </>
      )}
      {/* Login Modal */}
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </nav>
  )
}

export default Navbar
