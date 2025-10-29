// reCAPTCHA v3 utility functions
export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LebtPorAAAAAK2_QUJdZdNwxB7OflRCmRH6Wb9i'

// Load reCAPTCHA script
export const loadRecaptcha = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('reCAPTCHA can only be loaded in browser environment'))
      return
    }

    // Check if already loaded
    if (window.grecaptcha && window.grecaptcha.ready) {
      resolve()
      return
    }

    // Check if script is already in DOM
    const existingScript = document.querySelector('script[src*="recaptcha"]')
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve())
      existingScript.addEventListener('error', () => reject(new Error('Failed to load reCAPTCHA')))
      return
    }

    // Create and load script
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`
    script.async = true
    script.defer = true
    
    script.onload = () => {
      if (window.grecaptcha && window.grecaptcha.ready) {
        resolve()
      } else {
        reject(new Error('reCAPTCHA failed to initialize'))
      }
    }
    
    script.onerror = () => {
      reject(new Error('Failed to load reCAPTCHA script'))
    }
    
    document.head.appendChild(script)
  })
}

// Execute reCAPTCHA and get token
export const executeRecaptcha = async (action: string): Promise<string> => {
  try {
    await loadRecaptcha()
    
    return new Promise((resolve, reject) => {
      // Add timeout to prevent hanging
      const timeout = setTimeout(() => {
        reject(new Error('reCAPTCHA execution timeout'))
      }, 10000)

      if (!window.grecaptcha || !window.grecaptcha.ready) {
        clearTimeout(timeout)
        reject(new Error('reCAPTCHA not available'))
        return
      }

      window.grecaptcha.ready(() => {
        try {
          if (!window.grecaptcha || typeof window.grecaptcha.execute !== 'function') {
            clearTimeout(timeout)
            reject(new Error('reCAPTCHA execute method not available'))
            return
          }

          const executePromise = window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action })
          
          if (!executePromise || typeof executePromise.then !== 'function') {
            clearTimeout(timeout)
            reject(new Error('reCAPTCHA execute did not return a promise'))
            return
          }

          executePromise
            .then((token: string) => {
              clearTimeout(timeout)
              if (token) {
                resolve(token)
              } else {
                reject(new Error('Failed to get reCAPTCHA token'))
              }
            })
            .catch((error: any) => {
              clearTimeout(timeout)
              reject(new Error(`reCAPTCHA execution failed: ${error?.message || 'Unknown error'}`))
            })
        } catch (error: any) {
          clearTimeout(timeout)
          reject(new Error(`reCAPTCHA ready callback error: ${error?.message || 'Unknown error'}`))
        }
      })
    })
  } catch (error) {
    throw new Error(`reCAPTCHA error: ${error}`)
  }
}

// Verify reCAPTCHA token on server side
export const verifyRecaptcha = async (token: string, expectedAction?: string): Promise<{ success: boolean; score: number; action: string }> => {
  try {
    const response = await fetch('/api/verify-recaptcha', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, expectedAction }),
    })

    if (!response.ok) {
      throw new Error('Failed to verify reCAPTCHA')
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error('reCAPTCHA verification error:', error)
    throw error
  }
}

// Type definitions for window.grecaptcha
declare global {
  interface Window {
    grecaptcha?: {
      ready?: (callback: () => void) => void
      execute?: (siteKey: string, options: { action: string }) => Promise<string>
      render?: (container: string | HTMLElement, parameters: any) => number
    }
  }
}