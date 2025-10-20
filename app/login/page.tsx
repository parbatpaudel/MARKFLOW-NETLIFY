'use client'

import { useSupabaseClient } from '@supabase/auth-helpers-react'

export default function LoginPage() {
  const supabase = useSupabaseClient()
  const onGoogle = () => {
    const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/` : undefined
    supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo } })
  }
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Solid black overlay to hide global gradients */}
      <div className="fixed inset-0 bg-black" />

      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl shadow-xl bg-white">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Login</h1>
        <button
          onClick={onGoogle}
          className="w-full inline-flex items-center justify-center gap-3 px-5 py-3 rounded-lg bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.153,7.961,3.039l5.657-5.657C33.602,6.053,29.083,4,24,4C12.955,4,4,12.955,4,24 s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.369,15.108,18.839,12,24,12c3.059,0,5.842,1.153,7.961,3.039l5.657-5.657 C33.602,6.053,29.083,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.197l-6.197-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.281-7.946l-6.542,5.04C9.5,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.197,5.238C36.271,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
          Sign in with Google
        </button>
      </div>
    </div>
  )
}
