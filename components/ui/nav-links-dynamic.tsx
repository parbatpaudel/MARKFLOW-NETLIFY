'use client'

import Link from 'next/link'
import { useUser } from '@/lib/supabase-context'

export default function NavLinksDynamic() {
  const user = useUser()
  const authed = !!user
  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/book-consultation', label: 'Book Consultation' },
  ]
  return (
    <>
      {links.map((item) => (
        <Link key={item.href} href={item.href} className="relative group text-gray-700 font-medium">
          <span className="transition-colors group-hover:text-blue-700">{item.label}</span>
          <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-blue-600 to-sky-400 transition-all duration-300 group-hover:w-full"></span>
        </Link>
      ))}
    </>
  )
}
