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

      {/* Mobile Navigation - Same as Desktop Style */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[90] md:hidden"
            onClick={toggleMenu}
            style={{ touchAction: 'none' }}
          />
          
          {/* Desktop-Style Mobile Menu */}
          <div 
            className="fixed top-16 left-0 right-0 bg-white/98 backdrop-blur-lg border-b border-gray-200/80 shadow-lg z-[95] md:hidden"
            style={{ 
              transform: 'translateZ(0)',
              animation: 'slideDown 0.3s ease-out'
            }}
          >
            <div className="max-w-7xl mx-auto px-4 py-4">
              {/* Navigation Links - Horizontal like Desktop */}
              <div className="flex flex-col space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={toggleMenu}
                    className="relative text-gray-700 hover:text-blue-600 active:text-blue-700 font-semibold text-base py-3 px-4 rounded-lg hover:bg-blue-50/80 active:bg-blue-100 transition-all touch-manipulation text-center"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-200">
                <a
                  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 active:bg-gray-100 transition-all touch-manipulation"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <Play className="w-4 h-4" />
                  <span>YouTube</span>
                </a>
                <button
                  onClick={() => { setIsOpen(false); setLoginOpen(true) }}
                  className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-base font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 active:from-blue-800 active:to-cyan-700 shadow-md hover:shadow-lg transition-all touch-manipulation"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
          
          <style jsx>{`
            @keyframes slideDown {
              from {
                opacity: 0;
                transform: translateY(-20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
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
