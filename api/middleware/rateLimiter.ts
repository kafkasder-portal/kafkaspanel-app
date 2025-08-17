import { Request, Response, NextFunction } from 'express'
import { RateLimitError } from './errorHandler'
import { logger } from '../utils/logger'

// Rate limit store interface
interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

// Rate limit options
interface RateLimitOptions {
  windowMs: number // Time window in milliseconds
  max: number // Maximum number of requests per window
  message?: string // Custom error message
  skipSuccessfulRequests?: boolean // Don't count successful requests
  skipFailedRequests?: boolean // Don't count failed requests
  keyGenerator?: (req: Request) => string // Custom key generator
  skip?: (req: Request) => boolean // Skip rate limiting for certain requests
  onLimitReached?: (req: Request, res: Response) => void // Callback when limit is reached
}

// In-memory store (for development - use Redis in production)
class MemoryStore {
  private store: RateLimitStore = {}
  private interval: NodeJS.Timeout

  constructor() {
    // Clean up expired entries every minute
    this.interval = setInterval(() => {
      this.cleanup()
    }, 60000)
  }

  get(key: string): { count: number; resetTime: number } | undefined {
    return this.store[key]
  }

  set(key: string, value: { count: number; resetTime: number }): void {
    this.store[key] = value
  }

  increment(key: string, windowMs: number): { count: number; resetTime: number } {
    const now = Date.now()
    const resetTime = now + windowMs
    
    if (!this.store[key] || this.store[key].resetTime <= now) {
      this.store[key] = { count: 1, resetTime }
    } else {
      this.store[key].count++
    }
    
    return this.store[key]
  }

  reset(key: string): void {
    delete this.store[key]
  }

  cleanup(): void {
    const now = Date.now()
    Object.keys(this.store).forEach(key => {
      if (this.store[key].resetTime <= now) {
        delete this.store[key]
      }
    })
  }

  destroy(): void {
    clearInterval(this.interval)
    this.store = {}
  }
}

// Default store instance
const defaultStore = new MemoryStore()

// Default key generator (IP + User ID if available)
const defaultKeyGenerator = (req: Request): string => {
  const ip = req.ip || req.connection.remoteAddress || 'unknown'
  const userId = req.user?.id || 'anonymous'
  return `${ip}:${userId}`
}

// Create rate limiter middleware
export const createRateLimiter = (options: RateLimitOptions) => {
  const {
    windowMs,
    max,
    message = 'Too many requests, please try again later.',
    skipSuccessfulRequests = false,
    skipFailedRequests = false,
    keyGenerator = defaultKeyGenerator,
    skip,
    onLimitReached
  } = options

  return (req: Request, res: Response, next: NextFunction): void => {
    // Skip if condition is met
    if (skip && skip(req)) {
      return next()
    }

    const key = keyGenerator(req)
    const store = defaultStore
    
    // Get current count
    const current = store.increment(key, windowMs)
    
    // Set rate limit headers
    res.setHeader('X-RateLimit-Limit', max)
    res.setHeader('X-RateLimit-Remaining', Math.max(0, max - current.count))
    res.setHeader('X-RateLimit-Reset', new Date(current.resetTime).toISOString())
    
    // Check if limit exceeded
    if (current.count > max) {
      // Log rate limit violation
      logger.security('Rate limit exceeded', {
        key,
        count: current.count,
        limit: max,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        path: req.originalUrl,
        method: req.method
      })
      
      // Call onLimitReached callback if provided
      if (onLimitReached) {
        onLimitReached(req, res)
      }
      
      // Return rate limit error
      const error = new RateLimitError(message)
      return next(error)
    }
    
    // Handle response to potentially skip counting
    const originalSend = res.send
    res.send = function(body) {
      const statusCode = res.statusCode
      
      // Decrement count if we should skip this request
      if (
        (skipSuccessfulRequests && statusCode < 400) ||
        (skipFailedRequests && statusCode >= 400)
      ) {
        const current = store.get(key)
        if (current && current.count > 0) {
          store.set(key, { ...current, count: current.count - 1 })
        }
      }
      
      return originalSend.call(this, body)
    }
    
    next()
  }
}

// Predefined rate limiters

// General API rate limiter (100 requests per 15 minutes)
export const generalLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes.'
})

// Strict rate limiter for sensitive endpoints (5 requests per 15 minutes)
export const strictLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: 'Too many requests for this sensitive operation, please try again after 15 minutes.',
  skipSuccessfulRequests: true
})

// Auth rate limiter (5 login attempts per 15 minutes)
export const authLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: 'Too many authentication attempts, please try again after 15 minutes.',
  skipSuccessfulRequests: true,
  keyGenerator: (req: Request) => {
    // Use email from request body for auth attempts
    const email = req.body?.email || 'unknown'
    const ip = req.ip || req.connection.remoteAddress || 'unknown'
    return `auth:${email}:${ip}`
  }
})

// Password reset rate limiter (3 attempts per hour)
export const passwordResetLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: 'Too many password reset attempts, please try again after 1 hour.',
  keyGenerator: (req: Request) => {
    const email = req.body?.email || 'unknown'
    return `password-reset:${email}`
  }
})

// File upload rate limiter (10 uploads per hour)
export const uploadLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: 'Too many file uploads, please try again after 1 hour.',
  keyGenerator: (req: Request) => {
    const userId = req.user?.id || 'anonymous'
    const ip = req.ip || req.connection.remoteAddress || 'unknown'
    return `upload:${userId}:${ip}`
  }
})

// API key rate limiter (1000 requests per hour)
export const apiKeyLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 1000,
  message: 'API rate limit exceeded, please try again after 1 hour.',
  keyGenerator: (req: Request) => {
    const apiKey = req.headers['x-api-key'] as string || 'unknown'
    return `api-key:${apiKey}`
  }
})

// Cleanup function for graceful shutdown
export const cleanup = (): void => {
  defaultStore.destroy()
}

// Graceful shutdown
process.on('SIGINT', cleanup)
process.on('SIGTERM', cleanup)