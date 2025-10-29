import { createBrowserClient, createServerClient } from '@supabase/ssr'
import type { cookies as CookiesFn } from 'next/headers'

const FALLBACK_URL = 'https://ldsppreromxfqqfzsvjl.supabase.co'
const FALLBACK_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxkc3BwcmVyb214ZnFxZnpzdmpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4MzcwMTQsImV4cCI6MjA3NjQxMzAxNH0.1opft879DOoFGx11fhlj0tH3ZnRgmEbBfj-v4upk168'

// Check if environment variables are valid or contain placeholder values
const isValidUrl = (url: string) => {
  return url && url !== 'your_supabase_project_url' && url.startsWith('http')
}

const isValidKey = (key: string) => {
  return key && key !== 'your_supabase_anon_key' && key.length > 10
}

const url = isValidUrl(process.env.NEXT_PUBLIC_SUPABASE_URL) 
  ? process.env.NEXT_PUBLIC_SUPABASE_URL 
  : FALLBACK_URL
  
const anon = isValidKey(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) 
  ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY 
  : FALLBACK_ANON

// Validate that we have a proper URL
if (!url || !url.startsWith('http')) {
  console.warn('Invalid Supabase URL, using fallback')
}

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