'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSupabase } from '@/lib/supabase-context'
import { X, Mail, Lock, Play, Shield } from 'lucide-react'
import { Button } from './button'
import { useRecaptcha } from '@/hooks/useRecaptcha'

interface LoginModalProps {
  open: boolean
  onClose: () => void
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const supabase = useSupabase()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { isLoaded, isLoading, executeAndVerify } = useRecaptcha()

  const onGoogle = async () => {
    try {
      setLoading(true)
      setError(null)

      // Execute reCAPTCHA
      const recaptchaResult = await executeAndVerify('google_login')
      
      if (!recaptchaResult.success || !recaptchaResult.isHuman) {
        throw new Error('Security verification failed. Please try again.')
      }

      const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/` : undefined
      const { error } = await supabase.auth.signInWithOAuth({ 
        provider: 'google', 
        options: { redirectTo } 
      })
      if (error) throw error
      // Modal will close when user is redirected back
    } catch (e: any) {
      setError(e?.message || 'Google sign-in failed')
    } finally {
      setLoading(false)
    }
  }

  const onEmail = async () => {
    setError(null)
    setLoading(true)
    try {
      if (!email || !password) {
        setError('Email and password are required')
        return
      }

      // Execute reCAPTCHA
      const recaptchaResult = await executeAndVerify('email_login')
      
      if (!recaptchaResult.success || !recaptchaResult.isHuman) {
        throw new Error('Security verification failed. Please try again.')
      }

      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      
      // Show success message
      console.log('Login successful!')
      
      // Close modal after successful login
      setTimeout(() => {
        onClose()
      }, 500)
    } catch (e: any) {
      setError(e?.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70]"
          aria-modal
          role="dialog"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />

          {/* Panel - Centered, No Glass Effect on Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 top-1/2 w-[min(92vw,440px)] max-h-[90vh] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header - Hidden on Mobile */}
            <div className="hidden sm:flex items-center justify-between px-6 py-4 border-b border-slate-200 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-md">
                  <span className="text-white font-black text-base">M</span>
                </div>
                <span className="text-lg font-bold text-slate-900">Get Started</span>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 rounded-lg hover:bg-slate-100 active:bg-slate-200 transition-all touch-manipulation"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {/* Close button for mobile - top right corner */}
            <button 
              onClick={onClose} 
              className="sm:hidden absolute top-4 right-4 z-10 p-2.5 rounded-xl bg-white shadow-lg hover:bg-slate-50 active:bg-slate-100 transition-all touch-manipulation"
              aria-label="Close"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <X className="w-6 h-6 text-slate-600" strokeWidth={2.5} />
            </button>

            {/* Body - Perfectly Centered on Mobile */}
            <div className="flex-1 flex items-center justify-center overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
              <div className="w-full max-w-sm px-4 sm:px-8 py-6">
              <div className="space-y-5">
              {/* Google */}
              <Button 
                onClick={onGoogle} 
                disabled={loading} 
                className="w-full h-12 bg-white text-slate-800 border-2 border-slate-300 hover:bg-slate-50 hover:border-slate-400 inline-flex items-center justify-center gap-3 text-sm sm:text-base font-semibold transition-all touch-manipulation"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5 sm:w-6 sm:h-6"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.153,7.961,3.039l5.657-5.657C33.602,6.053,29.083,4,24,4C12.955,4,4,12.955,4,24 s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.369,15.108,18.839,12,24,12c3.059,0,5.842,1.153,7.961,3.039l5.657-5.657 C33.602,6.053,29.083,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.197l-6.197-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.281-7.946l-6.542,5.04C9.5,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.197,5.238C36.271,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
                Continue with Google
              </Button>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400">or</span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* Email/password */}
              <div className="space-y-3">
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full h-12 pl-10 sm:pl-11 pr-4 text-sm sm:text-base rounded-xl border-2 border-slate-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all touch-manipulation"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  />
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-12 pl-10 sm:pl-11 pr-4 text-sm sm:text-base rounded-xl border-2 border-slate-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all touch-manipulation"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  />
                </div>
                
                {/* reCAPTCHA Status */}
                <div className="flex items-center justify-center gap-2 py-2">
                  <Shield className={`w-4 h-4 ${isLoaded ? 'text-green-500' : isLoading ? 'text-yellow-500' : 'text-gray-400'}`} />
                  <span className="text-xs text-slate-500">
                    {isLoading ? 'Loading security...' : isLoaded ? 'Protected by reCAPTCHA' : 'Security loading...'}
                  </span>
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                    <p className="text-xs sm:text-sm text-red-600 font-medium">{error}</p>
                  </div>
                )}
                <Button 
                  onClick={onEmail} 
                  disabled={loading || !isLoaded} 
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all touch-manipulation disabled:opacity-50"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </div>
              </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
