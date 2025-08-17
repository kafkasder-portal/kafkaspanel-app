import { useEffect, useRef, useState } from 'react'

// Debounce hook for search optimization
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Performance observer for tracking component metrics
export function usePerformanceObserver() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            console.log('Navigation timing:', entry)
          }
        }
      })

      observer.observe({ entryTypes: ['navigation'] })

      return () => observer.disconnect()
    }
  }, [])
}

// Memoized version of expensive calculations
export function useMemoizedCalculation<T>(
  fn: () => T,
  deps: React.DependencyList
): T {
  const memoizedValue = useRef<T>()
  const lastDeps = useRef<React.DependencyList>()

  if (
    !lastDeps.current ||
    deps.some((dep, i) => dep !== lastDeps.current![i])
  ) {
    memoizedValue.current = fn()
    lastDeps.current = deps
  }

  return memoizedValue.current!
}

// Local storage with error handling
export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key)
    } catch {
      return null
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value)
    } catch {
      // Silent fail for quota exceeded or other errors
    }
  },
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key)
    } catch {
      // Silent fail
    }
  }
}