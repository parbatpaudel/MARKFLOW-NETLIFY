'use client'

import { useSupabase } from '@/lib/supabase-context'

export default function LoginPage() {
  const supabase = useSupabase()
  const onGoogle = () => {
    const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/` : undefined
    supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo } })
  }
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0b1220]" />
      <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" style={{ animationDelay: '0.8s' }} />
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)', backgroundSize: '24px 24px' }} />

      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white/95 backdrop-blur-md border border-slate-200">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-blue-600 text-white shadow-sm mb-3">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0-3.866 3.582-7 8-7-3.866 0-7 3.134-7 7s3.134 7 7 7c-4.418 0-8-3.134-8-7z"/></svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-600 text-sm">Sign in to continue to marketflow</p>
        </div>

        <button
          onClick={onGoogle}
          className="w-full inline-flex items-center justify-center gap-3 px-5 py-3 rounded-lg bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:shadow-md transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.153,7.961,3.039l5.657-5.657C33.602,6.053,29.083,4,24,4C12.955,4,4,12.955,4,24 s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.369,15.108,18.839,12,24,12c3.059,0,5.842,1.153,7.961,3.039l5.657-5.657 C33.602,6.053,29.083,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.197l-6.197-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.281-7.946l-6.542,5.04C9.5,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.197,5.238C36.271,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
          <span className="font-medium">Continue with Google</span>
        </button>

        <p className="mt-4 text-[12px] text-gray-500 text-center">By continuing, you agree to our Terms and Privacy Policy.</p>
      </div>
    </div>
  )
}
