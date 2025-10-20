'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@supabase/auth-helpers-react'
import Link from 'next/link'

export default function PostLoginPrompt() {
  const user = useUser()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!user) return
    try {
      const key = 'mf_post_login_prompt_shown'
      const shown = localStorage.getItem(key)
      if (!shown) {
        setOpen(true)
        localStorage.setItem(key, '1')
      }
    } catch {}
  }, [user])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Welcome!</h3>
        <p className="text-gray-600 mb-6">Book a consultation to get tailored guidance for your business.</p>
        <div className="flex items-center justify-end gap-3">
          <button onClick={() => setOpen(false)} className="px-4 py-2 rounded-md text-gray-800 ring-1 ring-gray-300 hover:bg-gray-50">Later</button>
          <Link href="/book-consultation" className="px-4 py-2 rounded-md text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">Book Consultation</Link>
        </div>
      </div>
    </div>
  )
}
