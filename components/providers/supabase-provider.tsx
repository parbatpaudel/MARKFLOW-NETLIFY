'use client'

import { ReactNode, useMemo } from 'react'
import { createSupabaseBrowser } from '@/lib/supabaseClient'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

export default function SupabaseProvider({ children }: { children: ReactNode }) {
  const supabase = useMemo(() => createSupabaseBrowser(), [])
  return (
    <SessionContextProvider supabaseClient={supabase}>
      {children}
    </SessionContextProvider>
  )
}
