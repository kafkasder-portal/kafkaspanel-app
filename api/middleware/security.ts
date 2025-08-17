import { Request, Response, NextFunction } from 'express'
import crypto from 'crypto'
import { AuthenticationError, AuthorizationError, RateLimitError } from './errorHandler'
import { logger } from '../utils/logger'

// Security configuration
interface SecurityConfig {
  maxRequestSize: number
  allowedOrigins: string[]
  trustedProxies: string[]
  sessionTimeout: number
  maxLoginAttempts: number
  lockoutDuration: number
}

const securityConfig: SecurityConfig = {
  maxRequestSize: 10 * 1024 * 1024, // 10MB
  allowedOrigins: (process.env.CORS_ORIGIN || 'http://localhost:3000').split(','),
  trustedProxies: (process.env.TRUSTED_PROXIES || '').split(',').filter(Boolean),
  sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours
  maxLoginAttempts: 5,
  lockoutDuration: 15 * 60 * 1000 // 15 minutes
}

// In-memory store for login attempts (use Redis in production)
const loginAttempts = new Map<string, { count: number; lastAttempt: number; lockedUntil?: number }>()

/**
 * CSRF Protection Middleware
 */
export const csrfProtection = (req: Request, res: Response, next: NextFunction) => {
  // Skip CSRF for GET, HEAD, OPTIONS requests
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }
  
  // Skip CSRF for health check endpoints
  if (req.path === '/api/health' || req.path === '/api/health/') {
    return next();
  }
  
  const token = req.headers['x-csrf-token'] as string;
  const sessionToken = req.headers['x-session-token'] as string;
  
  if (!token || !sessionToken) {
    return res.status(403).json({
      success: false,
      error: 'CSRF token required'
    });
  }
  
  // Simple CSRF validation (in production, use more sophisticated method)
  const expectedToken = crypto
    .createHmac('sha256', process.env.CSRF_SECRET || 'default-csrf-secret')
    .update(sessionToken)
    .digest('hex');
  
  if (token !== expectedToken) {
    return res.status(403).json({
      success: false,
      error: 'Invalid CSRF token'
    });
  }
  
  next();
};

/**
 * Generate CSRF token
 */
export const generateCSRFToken = (sessionToken: string): string => {
  return crypto
    .createHmac('sha256', process.env.CSRF_SECRET || 'default-csrf-secret')
    .update(sessionToken)
    .digest('hex');
};

/**
 * SQL Injection Protection Middleware
 */
export const sqlInjectionProtection = (req: Request, res: Response, next: NextFunction) => {
  const suspiciousPatterns = [
    /('|--|;|\||\*|\*\*)/i,
    /(union|select|insert|delete|update|drop|create|alter|exec|execute)/i,
    /(script|javascript|vbscript|onload|onerror|onclick)/i
  ];
  
  const checkForSQLInjection = (obj: any): boolean => {
    if (typeof obj === 'string') {
      return suspiciousPatterns.some(pattern => pattern.test(obj));
    }
    
    if (Array.isArray(obj)) {
      return obj.some(checkForSQLInjection);
    }
    
    if (obj && typeof obj === 'object') {
      return Object.values(obj).some(checkForSQLInjection);
    }
    
    return false;
  };
  
  if (req.body && checkForSQLInjection(req.body)) {
    return res.status(400).json({
      success: false,
      error: 'Suspicious input detected'
    });
  }
  
  if (req.query && checkForSQLInjection(req.query)) {
    return res.status(400).json({
      success: false,
      error: 'Suspicious query parameters detected'
    });
  }
  
  next();
};

/**
 * Request size limiter
 */
export const requestSizeLimiter = (req: Request, res: Response, next: NextFunction) => {
  const maxSize = parseInt(process.env.MAX_REQUEST_SIZE || '10485760'); // 10MB default
  
  if (req.headers['content-length']) {
    const contentLength = parseInt(req.headers['content-length']);
    if (contentLength > maxSize) {
      return res.status(413).json({
        success: false,
        error: 'Request entity too large'
      });
    }
  }
  
  next();
};

/**
 * IP Whitelist Middleware (optional)
 */
export const ipWhitelist = (req: Request, res: Response, next: NextFunction) => {
  const allowedIPs = process.env.ALLOWED_IPS?.split(',') || [];
  
  if (allowedIPs.length === 0) {
    return next(); // No IP restriction if not configured
  }
  
  const clientIP = req.ip || (req.connection as any).remoteAddress || req.headers['x-forwarded-for'];
  
  if (!clientIP || !allowedIPs.includes(clientIP as string)) {
    return res.status(403).json({
      success: false,
      error: 'Access denied from this IP address'
    });
  }
  
  next();
};

/**
 * Request ID middleware for tracking
 */
export const requestId = (req: Request, res: Response, next: NextFunction) => {
  const id = crypto.randomUUID();
  req.headers['x-request-id'] = id;
  res.setHeader('X-Request-ID', id);
  next();
};

/**
 * Security headers middleware (additional to helmet)
 */
export const additionalSecurityHeaders = (_req: Request, res: Response, next: NextFunction) => {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY')
  
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff')
  
  // Enable XSS protection
  res.setHeader('X-XSS-Protection', '1; mode=block')
  
  // Referrer policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Permissions policy
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')
  
  // HSTS
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  
  // CSP
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self' https:; frame-ancestors 'none';")
  
  next()
}

/**
 * Brute Force Protection
 */
export const bruteForceProtection = (req: Request, res: Response, next: NextFunction) => {
  const clientIP = getClientIP(req)
  const now = Date.now()
  
  const attempts = loginAttempts.get(clientIP)
  
  if (attempts) {
    // Check if account is locked
    if (attempts.lockedUntil && now < attempts.lockedUntil) {
      const remainingTime = Math.ceil((attempts.lockedUntil - now) / 1000 / 60)
      
      logger.warn('Brute force attempt on locked account', {
        clientIP,
        remainingTime,
        path: req.originalUrl,
        userAgent: req.headers['user-agent']
      })
      
      const error = new RateLimitError(`Account locked. Try again in ${remainingTime} minutes.`)
      return next(error)
    }
    
    // Reset if lockout period has expired
    if (attempts.lockedUntil && now >= attempts.lockedUntil) {
      loginAttempts.delete(clientIP)
    }
  }
  
  next()
}

/**
 * Record Failed Login Attempt
 */
export const recordFailedLogin = (clientIP: string): void => {
  const now = Date.now()
  const attempts = loginAttempts.get(clientIP) || { count: 0, lastAttempt: now }
  
  attempts.count += 1
  attempts.lastAttempt = now
  
  if (attempts.count >= securityConfig.maxLoginAttempts) {
    attempts.lockedUntil = now + securityConfig.lockoutDuration
    
    logger.warn('Account locked due to too many failed login attempts', {
      clientIP,
      attempts: attempts.count,
      lockoutDuration: securityConfig.lockoutDuration / 1000 / 60
    })
  }
  
  loginAttempts.set(clientIP, attempts)
}

/**
 * Record Successful Login
 */
export const recordSuccessfulLogin = (clientIP: string): void => {
  loginAttempts.delete(clientIP)
}

/**
 * Get Client IP Address
 */
export const getClientIP = (req: Request): string => {
  const forwarded = req.headers['x-forwarded-for'] as string
  const realIP = req.headers['x-real-ip'] as string
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  return req.connection.remoteAddress || req.socket.remoteAddress || 'unknown'
}

/**
 * Input Sanitization
 */
export const sanitizeInput = (req: Request, res: Response, next: NextFunction) => {
  const sanitizeString = (str: string): string => {
    return str
      .replace(/<script[^>]*>.*?<\/script>/gi, '') // Remove script tags
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+\s*=/gi, '') // Remove event handlers
      .trim()
  }
  
  const sanitizeObject = (obj: any): any => {
    if (typeof obj === 'string') {
      return sanitizeString(obj)
    }
    
    if (Array.isArray(obj)) {
      return obj.map(sanitizeObject)
    }
    
    if (obj && typeof obj === 'object') {
      const sanitized: any = {}
      for (const [key, value] of Object.entries(obj)) {
        sanitized[key] = sanitizeObject(value)
      }
      return sanitized
    }
    
    return obj
  }
  
  if (req.body) {
    req.body = sanitizeObject(req.body)
  }
  
  if (req.query) {
    req.query = sanitizeObject(req.query)
  }
  
  if (req.params) {
    req.params = sanitizeObject(req.params)
  }
  
  next()
}

/**
 * API Key Validation
 */
export const validateAPIKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'] as string
  
  if (!apiKey) {
    const error = new AuthenticationError('API key required')
    return next(error)
  }
  
  // In production, validate against database
  const validAPIKeys = (process.env.VALID_API_KEYS || '').split(',').filter(Boolean)
  
  if (!validAPIKeys.includes(apiKey)) {
    logger.warn('Invalid API key attempt', {
      apiKey: apiKey.substring(0, 8) + '...',
      clientIP: getClientIP(req),
      path: req.originalUrl,
      userAgent: req.headers['user-agent']
    })
    
    const error = new AuthenticationError('Invalid API key')
    return next(error)
  }
  
  next()
}

/**
 * Cleanup expired login attempts
 */
export const cleanupLoginAttempts = (): void => {
  const now = Date.now()
  
  for (const [ip, attempts] of loginAttempts.entries()) {
    if (attempts.lockedUntil && now >= attempts.lockedUntil) {
      loginAttempts.delete(ip)
    } else if (now - attempts.lastAttempt > securityConfig.lockoutDuration) {
      loginAttempts.delete(ip)
    }
  }
}

// Cleanup every 5 minutes
setInterval(cleanupLoginAttempts, 5 * 60 * 1000)

export { securityConfig }