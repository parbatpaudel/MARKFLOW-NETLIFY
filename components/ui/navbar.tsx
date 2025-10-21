"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { Menu, X, Play, LogOut, User } from "lucide-react"
import { Button } from "./button"
import { cn } from "@/lib/utils"
import LoginModal from "./login-modal"
import { useSupabase, useUser } from "@/lib/supabase-context"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const supabase = useSupabase()
  const user = useUser()

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

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setIsOpen(false)
    setProfileOpen(false)
  }

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Book Consultation", href: "/book-consultation" },
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

          {/* CTA (desktop only) */}
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
            
            {user ? (
              <div className="relative flex items-center gap-2">
                {/* Profile Icon Button */}
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-all"
                >
                  <User className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-900 max-w-[150px] truncate">
                    {user.email?.split('@')[0]}
                  </span>
                </button>

                {/* Profile Dropdown */}
                {profileOpen && (
                  <>
                    {/* Backdrop */}
                    <div 
                      className="fixed inset-0 z-[60]" 
                      onClick={() => setProfileOpen(false)}
                    />
                    
                    {/* Dropdown Menu */}
                    <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 z-[70] overflow-hidden">
                      {/* User Info Header */}
                      <div className="px-4 py-4 bg-gradient-to-r from-blue-600 to-cyan-500">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate">
                              {user.user_metadata?.full_name || user.email?.split('@')[0]}
                            </p>
                            <p className="text-xs text-blue-100 truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        {/* User ID */}
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">User ID</p>
                          <p className="text-sm font-mono text-gray-700 truncate">{user.id}</p>
                        </div>

                        {/* Email */}
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Email</p>
                          <p className="text-sm text-gray-700 truncate">{user.email}</p>
                        </div>

                        {/* Name */}
                        {user.user_metadata?.full_name && (
                          <div className="px-4 py-2 border-b border-gray-100">
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Full Name</p>
                            <p className="text-sm text-gray-700">{user.user_metadata.full_name}</p>
                          </div>
                        )}

                        {/* Provider */}
                        {user.app_metadata?.provider && (
                          <div className="px-4 py-2 border-b border-gray-100">
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Sign-in Method</p>
                            <p className="text-sm text-gray-700 capitalize">{user.app_metadata.provider}</p>
                          </div>
                        )}

                        {/* Created At */}
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Member Since</p>
                          <p className="text-sm text-gray-700">
                            {new Date(user.created_at).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                        
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-50 transition-all text-left mt-2"
                        >
                          <LogOut className="w-5 h-5 text-red-600" />
                          <span className="text-sm font-medium text-red-700">Logout</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg px-4 lg:px-6 py-2 lg:py-2.5 text-sm lg:text-base font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-md hover:shadow-lg transition-all"
              >
                Get Started
              </button>
            )}
          </div>

          {/* Mobile menu button - No login on mobile */}
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
          
          {/* Desktop-Style Mobile Menu - Solid Background */}
          <div 
            className="fixed top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-[95] md:hidden"
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
              
              {/* CTA Buttons - No login on mobile */}
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
