'use client'

import { useState, useRef, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Image from 'next/image'

export default function UserMenu() {
  const user = useUser()
  const supabase = useSupabaseClient()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current) return
      if (!ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [])

  if (!user) return null
  const avatarUrl = user.user_metadata?.avatar_url as string | undefined
  const name = (user.user_metadata?.name as string | undefined) || (user.email ?? 'User')
  const provider = (user.app_metadata?.provider as string | undefined) || 'google'
  const userId = user.id

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-md ring-1 ring-gray-300 hover:ring-blue-500 hover:bg-gray-50 transition-all"
      >
        {avatarUrl ? (
          <Image src={avatarUrl} alt={name} width={24} height={24} className="rounded-full" />
        ) : (
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" />)
        }
        <span className="text-sm font-semibold text-gray-800 max-w-[140px] truncate">{name}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg ring-1 ring-black/5 p-2 z-50">
          <div className="px-3 py-2">
            <div className="text-xs text-gray-500">Signed in as</div>
            <div className="text-sm font-medium text-gray-900 truncate">{user.email}</div>
          </div>
          <div className="h-px bg-gray-200 my-2" />
          <div className="px-3 py-2 space-y-1">
            <div className="text-xs font-semibold text-gray-500">Basic Info</div>
            <div className="grid grid-cols-3 gap-x-2 text-sm py-1">
              <div className="col-span-1 text-gray-500">Name</div>
              <div className="col-span-2 text-gray-900 truncate" title={name}>{name}</div>
            </div>
            <div className="grid grid-cols-3 gap-x-2 text-sm py-1">
              <div className="col-span-1 text-gray-500">Email</div>
              <div className="col-span-2 text-gray-900 truncate" title={user.email || ''}>{user.email}</div>
            </div>
            <div className="grid grid-cols-3 gap-x-2 text-sm py-1">
              <div className="col-span-1 text-gray-500">Provider</div>
              <div className="col-span-2 text-gray-900 capitalize">{provider}</div>
            </div>
            <div className="grid grid-cols-3 gap-x-2 text-sm py-1">
              <div className="col-span-1 text-gray-500">User ID</div>
              <div className="col-span-2 text-gray-900 truncate" title={userId}>{userId}</div>
            </div>
          </div>
          <div className="h-px bg-gray-200 my-2" />
          <button
            onClick={() => supabase.auth.signOut()}
            className="w-full text-left px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}
