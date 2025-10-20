'use client'

import { ReactNode } from 'react'
import { SupabaseProvider as Provider } from '@/lib/supabase-context'

export default function SupabaseProvider({ children }: { children: ReactNode }) {
  return <Provider>{children}</Provider>
}
