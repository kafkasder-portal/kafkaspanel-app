import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { supabase } from '../config/supabase'
import { AuthenticationError, AuthorizationError } from './errorHandler'
import { logger } from '../utils/logger'
import { getClientIP } from './security'

// Import AuthUser type from Express declaration
type AuthUser = {
  id: string
  email: string
  role: string
  permissions: string[]
  organizationId?: string
  profile: any
}

// Extend Request interface to include user (AuthUser is defined in types/express.d.ts)
interface AuthenticatedRequest extends Request {
  user?: AuthUser
}

// JWT payload interface
interface JWTPayload {
  userId: string
  email: string
  role: string
  organizationId?: string
  iat: number
  exp: number
}

/**
 * Authentication Middleware
 */
export const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const error = new AuthenticationError('Access token required')
      return next(error)
    }
    
    const token = authHeader.substring(7) // Remove 'Bearer ' prefix
    
    if (!token) {
      const error = new AuthenticationError('Access token required')
      return next(error)
    }
    
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload
    
    // Get user from database
    const { data: user, error: dbError } = await supabase
      .from('users')
      .select(`
        id,
        email,
        role,
        organization_id,
        is_active,
        user_roles!inner (
          role_id,
          roles!inner (
            name,
            permissions
          )
        )
      `)
      .eq('id', decoded.userId)
      .eq('is_active', true)
      .single()
    
    if (dbError || !user) {
      logger.warn('Authentication failed - user not found', {
        userId: decoded.userId,
        clientIP: getClientIP(req as any),
        path: req.originalUrl,
        error: dbError?.message
      })
      
      const error = new AuthenticationError('Invalid token')
      return next(error)
    }
    
    // Extract permissions from roles
    const permissions: string[] = []
    if (user.user_roles && Array.isArray(user.user_roles)) {
      user.user_roles.forEach((userRole: any) => {
        if (userRole.roles && userRole.roles.permissions) {
          permissions.push(...userRole.roles.permissions)
        }
      })
    }
    
    // Attach user to request
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      permissions: [...new Set(permissions)], // Remove duplicates
      organizationId: user.organization_id,
      profile: user
    }
    
    logger.info('User authenticated successfully', {
      userId: user.id,
      email: user.email,
      role: user.role,
      clientIP: getClientIP(req as any),
      path: req.originalUrl
    })
    
    next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      logger.warn('JWT verification failed', {
        error: error.message,
        clientIP: getClientIP(req),
        path: req.originalUrl
      })
      
      const authError = new AuthenticationError('Invalid token')
      return next(authError)
    }
    
    if (error instanceof jwt.TokenExpiredError) {
      logger.warn('JWT token expired', {
        clientIP: getClientIP(req),
        path: req.originalUrl
      })
      
      const authError = new AuthenticationError('Token expired')
      return next(authError)
    }
    
    logger.error('Authentication error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      clientIP: getClientIP(req),
      path: req.originalUrl
    })
    
    const authError = new AuthenticationError('Authentication failed')
    next(authError)
  }
}

/**
 * Optional Authentication Middleware
 */
export const optionalAuthenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next() // Continue without authentication
  }
  
  // If token is provided, validate it
  return authenticate(req, res, next)
}

/**
 * Role-based Authorization Middleware
 */
export const authorize = (...allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      const error = new AuthenticationError('Authentication required')
      return next(error)
    }
    
    if (!allowedRoles.includes(req.user.role)) {
      logger.warn('Authorization failed - insufficient role', {
        userId: req.user.id,
        userRole: req.user.role,
        requiredRoles: allowedRoles,
        clientIP: getClientIP(req),
        path: req.originalUrl
      })
      
      const error = new AuthorizationError('Insufficient permissions')
      return next(error)
    }
    
    next()
  }
}

/**
 * Permission-based Authorization Middleware
 */
export const requirePermission = (...requiredPermissions: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      const error = new AuthenticationError('Authentication required')
      return next(error)
    }
    
    const hasPermission = requiredPermissions.every(permission => 
      req.user!.permissions.includes(permission)
    )
    
    if (!hasPermission) {
      logger.warn('Authorization failed - insufficient permissions', {
        userId: req.user.id,
        userPermissions: req.user.permissions,
        requiredPermissions,
        clientIP: getClientIP(req),
        path: req.originalUrl
      })
      
      const error = new AuthorizationError('Insufficient permissions')
      return next(error)
    }
    
    next()
  }
}

/**
 * Organization-based Authorization Middleware
 */
export const requireOrganization = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  if (!req.user) {
    const error = new AuthenticationError('Authentication required')
    return next(error)
  }
  
  if (!req.user.organizationId) {
    logger.warn('Authorization failed - no organization', {
      userId: req.user.id,
      clientIP: getClientIP(req),
      path: req.originalUrl
    })
    
    const error = new AuthorizationError('Organization membership required')
    return next(error)
  }
  
  next()
}

/**
 * Resource Owner Authorization Middleware
 */
export const requireResourceOwner = (resourceIdParam: string = 'id') => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    if (!req.user) {
      const error = new AuthenticationError('Authentication required')
      return next(error)
    }
    
    const resourceId = req.params[resourceIdParam]
    
    if (!resourceId) {
      const error = new AuthorizationError('Resource ID required')
      return next(error)
    }
    
    // Admin users can access any resource
    if (req.user.role === 'admin' || req.user.role === 'super_admin') {
      return next()
    }
    
    try {
      // Check if user owns the resource (assuming most resources have a user_id field)
      const { data: resource, error: dbError } = await supabase
        .from('applications') // This should be dynamic based on the resource type
        .select('user_id, organization_id')
        .eq('id', resourceId)
        .single()
      
      if (dbError || !resource) {
        const error = new AuthorizationError('Resource not found')
        return next(error)
      }
      
      // Check if user owns the resource or belongs to the same organization
      const isOwner = resource.user_id === req.user.id
      const sameOrganization = resource.organization_id === req.user.organizationId
      
      if (!isOwner && !sameOrganization) {
        logger.warn('Authorization failed - not resource owner', {
          userId: req.user.id,
          resourceId,
          resourceUserId: resource.user_id,
          userOrganizationId: req.user.organizationId,
          resourceOrganizationId: resource.organization_id,
          clientIP: getClientIP(req),
          path: req.originalUrl
        })
        
        const error = new AuthorizationError('Access denied')
        return next(error)
      }
      
      next()
    } catch (error) {
      logger.error('Resource ownership check failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
        userId: req.user.id,
        resourceId,
        clientIP: getClientIP(req),
        path: req.originalUrl
      })
      
      const authError = new AuthorizationError('Authorization check failed')
      next(authError)
    }
  }
}

/**
 * API Key Authentication Middleware
 */
export const authenticateAPIKey = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const apiKey = req.headers['x-api-key'] as string
    
    if (!apiKey) {
      const error = new AuthenticationError('API key required')
      return next(error)
    }
    
    // Get API key from database
    const { data: keyData, error: dbError } = await supabase
      .from('api_keys')
      .select(`
        id,
        name,
        permissions,
        is_active,
        expires_at,
        user_id,
        organization_id,
        users (
          id,
          email,
          role,
          is_active
        )
      `)
      .eq('key_hash', apiKey) // In production, store hashed API keys
      .eq('is_active', true)
      .single()
    
    if (dbError || !keyData) {
      logger.warn('API key authentication failed', {
        apiKey: apiKey.substring(0, 8) + '...',
        clientIP: getClientIP(req),
        path: req.originalUrl,
        error: dbError?.message
      })
      
      const error = new AuthenticationError('Invalid API key')
      return next(error)
    }
    
    // Check if API key is expired
    if (keyData.expires_at && new Date(keyData.expires_at) < new Date()) {
      logger.warn('Expired API key used', {
        apiKeyId: keyData.id,
        expiresAt: keyData.expires_at,
        clientIP: getClientIP(req),
        path: req.originalUrl
      })
      
      const error = new AuthenticationError('API key expired')
      return next(error)
    }
    
    // Extract user data (Supabase joins return arrays)
    const userData = Array.isArray(keyData.users) ? keyData.users[0] : keyData.users
    
    // Check if associated user is active
    if (!userData?.is_active) {
      logger.warn('API key for inactive user used', {
        apiKeyId: keyData.id,
        userId: keyData.user_id,
        clientIP: getClientIP(req),
        path: req.originalUrl
      })
      
      const error = new AuthenticationError('User account inactive')
      return next(error)
    }
    
    // Attach user to request
    req.user = {
      id: userData.id,
      email: userData.email,
      role: userData.role,
      permissions: keyData.permissions || [],
      organizationId: keyData.organization_id,
      profile: userData
    }
    
    logger.info('API key authentication successful', {
      apiKeyId: keyData.id,
      userId: userData.id,
      clientIP: getClientIP(req),
      path: req.originalUrl
    })
    
    next()
  } catch (error) {
    logger.error('API key authentication error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      clientIP: getClientIP(req),
      path: req.originalUrl
    })
    
    const authError = new AuthenticationError('API key authentication failed')
    next(authError)
  }
}

export type { AuthenticatedRequest }