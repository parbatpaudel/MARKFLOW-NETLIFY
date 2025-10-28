'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'light' // Changed from 'dark' to 'light' to match our new theme

type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light') // Changed default to 'light'

  useEffect(() => {
    // Use light theme as default
    setTheme('light')
    document.documentElement.classList.remove('dark')
    document.documentElement.classList.add('light')
  }, [])

  const toggleTheme = () => {
    // No-op since we're only using light theme
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}