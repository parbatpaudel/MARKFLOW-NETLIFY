import { createBrowserClient, createServerClient } from '@supabase/ssr'
import type { cookies as CookiesFn } from 'next/headers'

const FALLBACK_URL = 'https://ldsppreromxfqqfzsvjl.supabase.co'
const FALLBACK_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxkc3BwcmVyb214ZnFxZnpzdmpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4MzcwMTQsImV4cCI6MjA3NjQxMzAxNH0.1opft879DOoFGx11fhlj0tH3ZnRgmEbBfj-v4upk168'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_URL
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || FALLBACK_ANON

export const createSupabaseBrowser = () =>
  createBrowserClient(url, anon)

// Minimal server client for API routes (no cookie auth used here)
export const createSupabaseServer = () =>
  createServerClient(url, anon, {
    cookies: {
      get() { return '' },
      set() {},
      remove() {},
    } as unknown as ReturnType<typeof CookiesFn>,
  })
