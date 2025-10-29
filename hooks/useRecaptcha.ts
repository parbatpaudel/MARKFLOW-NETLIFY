import { useState, useEffect, useCallback } from 'react'
import { executeRecaptcha, verifyRecaptcha } from '@/lib/recaptcha'

interface UseRecaptchaOptions {
  scoreThreshold?: number
  autoLoad?: boolean
}

interface RecaptchaState {
  isLoaded: boolean
  isLoading: boolean
  error: string | null
}

export const useRecaptcha = (options: UseRecaptchaOptions = {}) => {
  const { scoreThreshold = 0.5, autoLoad = true } = options
  
  const [state, setState] = useState<RecaptchaState>({
    isLoaded: false,
    isLoading: false,
    error: null
  })

  // Load reCAPTCHA on mount if autoLoad is true
  useEffect(() => {
    if (autoLoad && typeof window !== 'undefined') {
      loadRecaptcha()
    }
  }, [autoLoad])

  const loadRecaptcha = useCallback(async () => {
    if (state.isLoaded || state.isLoading) return

    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const { loadRecaptcha: loadScript } = await import('@/lib/recaptcha')
      await loadScript()
      setState(prev => ({ ...prev, isLoaded: true, isLoading: false }))
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load reCAPTCHA'
      setState(prev => ({ ...prev, isLoading: false, error: errorMessage }))
    }
  }, [state.isLoaded, state.isLoading])

  const executeAndVerify = useCallback(async (action: string): Promise<{
    success: boolean
    score: number
    isHuman: boolean
    error?: string
  }> => {
    try {
      // Ensure reCAPTCHA is loaded
      if (!state.isLoaded) {
        await loadRecaptcha()
      }

      // Execute reCAPTCHA
      const token = await executeRecaptcha(action)
      
      // Verify token
      const result = await verifyRecaptcha(token, action)
      
      return {
        success: result.success,
        score: result.score,
        isHuman: result.score >= scoreThreshold,
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'reCAPTCHA verification failed'
      return {
        success: false,
        score: 0,
        isHuman: false,
        error: errorMessage
      }
    }
  }, [state.isLoaded, scoreThreshold, loadRecaptcha])

  const executeRecaptchaOnly = useCallback(async (action: string): Promise<string> => {
    // Ensure reCAPTCHA is loaded
    if (!state.isLoaded) {
      await loadRecaptcha()
    }

    return executeRecaptcha(action)
  }, [state.isLoaded, loadRecaptcha])

  return {
    ...state,
    loadRecaptcha,
    executeAndVerify,
    executeRecaptcha: executeRecaptchaOnly,
  }
}