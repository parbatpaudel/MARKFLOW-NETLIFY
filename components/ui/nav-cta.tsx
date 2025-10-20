'use client'

import Link from 'next/link'
import { useUser } from '@supabase/auth-helpers-react'

export default function NavCTA() {
  const user = useUser()
  const authed = !!user
  const href = authed ? '/services' : '/login'
  const label = authed ? 'Our Services' : 'Get Started'
  return (
    <Link href={href} className="relative inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-sm hover:shadow-md hover:from-blue-700 hover:to-cyan-600 transition-all">
      {label}
    </Link>
  )
}
