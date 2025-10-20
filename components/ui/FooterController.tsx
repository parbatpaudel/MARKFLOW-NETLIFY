"use client"

import { usePathname } from "next/navigation"
import { ReactNode } from "react"

export default function FooterController({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  if (
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/contact" ||
    pathname === "/login" ||
    pathname === "/services" ||
    pathname === "/book-consultation"
  ) return null
  return <>{children}</>
}
