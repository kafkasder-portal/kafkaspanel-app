import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Error handling utilities
export function handleError(error: unknown, context?: string): string {
  if (error instanceof Error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`Error in ${context || 'unknown context'}:`, error.message)
    }
    return error.message
  }
  
  if (typeof error === 'string') {
    if (process.env.NODE_ENV === 'development') {
      console.error(`Error in ${context || 'unknown context'}:`, error)
    }
    return error
  }
  
  if (process.env.NODE_ENV === 'development') {
    console.error(`Unknown error in ${context || 'unknown context'}:`, error)
  }
  return 'Bilinmeyen bir hata oluştu'
}

// Performance utilities
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Type safety utilities
export function isNonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined
}

export function assertNonNullable<T>(value: T, message?: string): asserts value is NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error(message || 'Value is null or undefined')
  }
}