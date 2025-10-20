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
        <div className="md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-[90]"
            onClick={toggleMenu}
          />
          {/* Sheet */}
          <div className="fixed top-0 right-0 bottom-0 w-[75%] max-w-xs bg-white shadow-2xl z-[95] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 bg-white">
              <span className="text-base font-semibold text-gray-900">Menu</span>
              <button 
                className="p-2 rounded-md hover:bg-gray-100 transition-colors" 
                onClick={toggleMenu}
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>
            
            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-lg px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 transition-colors"
                    onClick={toggleMenu}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              
              {/* CTA Button */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button 
                  onClick={() => { setIsOpen(false); setLoginOpen(true) }} 
                  className="w-full rounded-lg px-4 py-3 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
        )}
      {/* Login Modal */}
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </nav>
  )
}

export default Navbar
