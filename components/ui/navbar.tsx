"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import Link from "next/link"
import { Menu, X, Play, LogOut, User, ChevronDown } from "lucide-react"
import { Button } from "./button"
import { cn } from "@/lib/utils"
import LoginModal from "./login-modal"
import { useSupabase, useUser } from "@/lib/supabase-context"
import { motion, AnimatePresence } from "framer-motion"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const supabase = useSupabase()
  const user = useUser()

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesOpen(false)
      }
      if (contactRef.current && !contactRef.current.contains(event.target as Node)) {
        setContactOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

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
    { name: "Services", href: "/services" },
  ]

  return (
    <nav className="bg-black backdrop-blur-lg border-b border-gray-800 sticky top-0 z-[100] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */
          }
          <Link href="/" className="flex items-center group">
            <span className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white group-hover:text-white transition-all">
              marketflow
            </span>
          </Link>

          {/* Desktop Navigation - Modern Design */}
          <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 space-x-1 lg:space-x-2">
            <Link
              href="/"
              className="relative text-white hover:text-white font-semibold text-sm lg:text-base py-2 px-4 lg:px-5 rounded-lg hover:bg-white/10 transition-all group"
            >
              Home
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-3/4 transition-all duration-300" />
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative" ref={servicesRef}>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
                className="relative flex items-center gap-1 text-white hover:text-white font-semibold text-sm lg:text-base py-2 px-4 lg:px-5 rounded-lg hover:bg-white/10 transition-all group"
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-3/4 transition-all duration-300" />
              </button>
              
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-64 bg-black rounded-xl shadow-2xl border border-gray-800 z-[70] overflow-hidden"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <Link
                      href="/services"
                      className="block px-6 py-4 text-white hover:bg-white/10 transition-all border-b border-gray-800"
                      onClick={() => setServicesOpen(false)}
                    >
                      <div className="font-semibold">Our Services</div>
                      <div className="text-sm text-gray-400 mt-1">Explore our AI-powered sales solutions</div>
                    </Link>
                    <Link
                      href="/services#working-process"
                      className="block px-6 py-4 text-white hover:bg-white/10 transition-all border-b border-gray-800"
                      onClick={() => setServicesOpen(false)}
                    >
                      <div className="font-semibold">Working Process</div>
                      <div className="text-sm text-gray-400 mt-1">See how we transform your business</div>
                    </Link>
                    <Link
                      href="/case-studies"
                      className="block px-6 py-4 text-white hover:bg-white/10 transition-all border-b border-gray-800"
                      onClick={() => setServicesOpen(false)}
                    >
                      <div className="font-semibold">Case Studies</div>
                      <div className="text-sm text-gray-400 mt-1">Real results from our clients</div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Contact Dropdown */}
            <div className="relative" ref={contactRef}>
              <button
                onClick={() => setContactOpen(!contactOpen)}
                onMouseEnter={() => setContactOpen(true)}
                onMouseLeave={() => setContactOpen(false)}
                className="relative flex items-center gap-1 text-white hover:text-white font-semibold text-sm lg:text-base py-2 px-4 lg:px-5 rounded-lg hover:bg-white/10 transition-all group"
              >
                Contact
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${contactOpen ? 'rotate-180' : ''}`} />
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-3/4 transition-all duration-300" />
              </button>
              
              <AnimatePresence>
                {contactOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-56 bg-black rounded-xl shadow-2xl border border-gray-800 z-[70] overflow-hidden"
                    onMouseEnter={() => setContactOpen(true)}
                    onMouseLeave={() => setContactOpen(false)}
                  >
                    <Link
                      href="/contact"
                      className="block px-6 py-4 text-white hover:bg-white/10 transition-all"
                      onClick={() => setContactOpen(false)}
                    >
                      <div className="font-semibold">Contact Us</div>
                      <div className="text-sm text-gray-400 mt-1">Get in touch with our team</div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* CTA (desktop only) */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            <a
              href="https://www.youtube.com/@marketflow-d4m"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg px-3 lg:px-4 py-2 lg:py-2.5 text-sm font-semibold border-2 border-gray-700 text-white hover:border-white hover:bg-white/10 transition-all"
            >
              <Play className="w-4 h-4" />
              <span className="hidden lg:inline">YouTube</span>
            </a>
            
            {user ? (
              <div className="relative flex items-center gap-2">
                {/* Profile Icon Button */}
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
                >
                  <User className="w-4 h-4 text-white" />
                  <span className="text-sm font-semibold text-white max-w-[150px] truncate">
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
                    <div className="absolute top-full right-0 mt-2 w-72 bg-black rounded-xl shadow-2xl border border-gray-800 z-[70] overflow-hidden">
                      {/* User Info Header */}
                      <div className="px-4 py-4 bg-gradient-to-r from-purple-600 to-indigo-600">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate">
                              {user.user_metadata?.full_name || user.email?.split('@')[0]}
                            </p>
                            <p className="text-xs text-white/80 truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        {/* User ID */}
                        <div className="px-4 py-2 border-b border-gray-800">
                          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">User ID</p>
                          <p className="text-sm font-mono text-white truncate">{user.id}</p>
                        </div>

                        {/* Email */}
                        <div className="px-4 py-2 border-b border-gray-800">
                          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Email</p>
                          <p className="text-sm text-white truncate">{user.email}</p>
                        </div>

                        {/* Name */}
                        {user.user_metadata?.full_name && (
                          <div className="px-4 py-2 border-b border-gray-800">
                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Full Name</p>
                            <p className="text-sm text-white">{user.user_metadata.full_name}</p>
                          </div>
                        )}

                        {/* Provider */}
                        {user.app_metadata?.provider && (
                          <div className="px-4 py-2 border-b border-gray-800">
                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Sign-in Method</p>
                            <p className="text-sm text-white capitalize">{user.app_metadata.provider}</p>
                          </div>
                        )}

                        {/* Created At */}
                        <div className="px-4 py-2 border-b border-gray-800">
                          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Member Since</p>
                          <p className="text-sm text-white">
                            {new Date(user.created_at).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                        
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-500/10 transition-all text-left mt-2"
                        >
                          <LogOut className="w-5 h-5 text-red-400" />
                          <span className="text-sm font-medium text-red-400">Logout</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg px-4 lg:px-6 py-2 lg:py-2.5 text-sm lg:text-base font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-lg transition-all"
              >
                Get Started
              </button>
            )}
          </div>

          {/* Mobile menu button - No login on mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2.5 rounded-xl text-white hover:text-white hover:bg-white/10 transition-all touch-manipulation"
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
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[90] md:hidden"
            onClick={toggleMenu}
            style={{ touchAction: 'none' }}
          />
          
          {/* Desktop-Style Mobile Menu - Solid Background */}
          <div 
            className="fixed top-16 left-0 right-0 bg-black border-b border-gray-800 shadow-lg z-[95] md:hidden"
            style={{ 
              transform: 'translateZ(0)',
              animation: 'slideDown 0.3s ease-out'
            }}
          >
            <div className="max-w-7xl mx-auto px-4 py-4">
              {/* Navigation Links - Horizontal like Desktop */}
              <div className="flex flex-col space-y-2">
                <Link
                  href="/"
                  onClick={toggleMenu}
                  className="relative text-white hover:text-white active:text-white font-semibold text-base py-3 px-4 rounded-lg hover:bg-white/10 active:bg-white/20 transition-all touch-manipulation text-center"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  Home
                </Link>
                {/* Services Dropdown for Mobile */}
                <div className="relative">
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className="w-full relative text-white hover:text-white active:text-white font-semibold text-base py-3 px-4 rounded-lg hover:bg-white/10 active:bg-white/20 transition-all touch-manipulation text-center flex items-center justify-between"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    Services
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2 bg-gray-900 rounded-lg overflow-hidden"
                      >
                        <Link
                          href="/services"
                          onClick={() => {
                            toggleMenu();
                            setServicesOpen(false);
                          }}
                          className="block px-4 py-3 text-white hover:bg-white/10 transition-all border-b border-gray-800"
                        >
                          <div className="font-semibold">Our Services</div>
                          <div className="text-sm text-gray-400 mt-1">Explore our AI-powered sales solutions</div>
                        </Link>
                        <Link
                          href="/services#working-process"
                          onClick={() => {
                            toggleMenu();
                            setServicesOpen(false);
                          }}
                          className="block px-4 py-3 text-white hover:bg-white/10 transition-all border-b border-gray-800"
                        >
                          <div className="font-semibold">Working Process</div>
                          <div className="text-sm text-gray-400 mt-1">See how we transform your business</div>
                        </Link>
                        <Link
                          href="/case-studies"
                          onClick={() => {
                            toggleMenu();
                            setServicesOpen(false);
                          }}
                          className="block px-4 py-3 text-white hover:bg-white/10 transition-all border-b border-gray-800"
                        >
                          <div className="font-semibold">Case Studies</div>
                          <div className="text-sm text-gray-400 mt-1">Real results from our clients</div>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Contact Dropdown for Mobile */}
                <div className="relative">
                  <button
                    onClick={() => setContactOpen(!contactOpen)}
                    className="w-full relative text-white hover:text-white active:text-white font-semibold text-base py-3 px-4 rounded-lg hover:bg-white/10 active:bg-white/20 transition-all touch-manipulation text-center flex items-center justify-between"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    Contact
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${contactOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {contactOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2 bg-gray-900 rounded-lg overflow-hidden"
                      >
                        <Link
                          href="/contact"
                          onClick={() => {
                            toggleMenu();
                            setContactOpen(false);
                          }}
                          className="block px-4 py-3 text-white hover:bg-white/10 transition-all"
                        >
                          <div className="font-semibold">Contact Us</div>
                          <div className="text-sm text-gray-400 mt-1">Get in touch with our team</div>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              {/* CTA Buttons - No login on mobile */}
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-800">
                <a
                  href="https://www.youtube.com/@marketflow-d4m"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold border-2 border-gray-700 text-white hover:border-white hover:bg-white/10 active:bg-white/20 transition-all touch-manipulation"
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