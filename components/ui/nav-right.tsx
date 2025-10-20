'use client'

import Link from 'next/link'
import { useUser } from '@/lib/supabase-context'
import UserMenu from '@/components/ui/user-menu'
import NavCTA from '@/components/ui/nav-cta'

export default function NavRightControls() {
  const user = useUser()
  const authed = !!user
  return (
    <>
      <Link
        href="https://www.youtube.com/@SIMPLE_ANALYSIS-K24"
        target="_blank"
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md text-gray-800 ring-1 ring-gray-300 hover:ring-blue-500 hover:bg-gray-50 transition-all"
      >
        YouTube
      </Link>
      {authed ? <UserMenu /> : <NavCTA />}
    </>
  )
}
