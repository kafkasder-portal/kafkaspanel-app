import { Request, Response, NextFunction } from 'express';
import { createClient } from '@supabase/supabase-js';
import { logger } from '../utils/logger';

/**
 * Custom Error class
 */
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public code?: string;
  public details?: any;

  constructor(
    message: string, 
    statusCode: number = 500, 
    isOperational: boolean = true,
    code?: string,
    details?: any
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.code = code;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Validation error class
export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 400, true, 'VALIDATION_ERROR', details);
  }
}

// Authentication error class
export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 401, true, 'AUTHENTICATION_ERROR');
  }
}

// Authorization error class
export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 403, true, 'AUTHORIZATION_ERROR');
  }
}

// Not found error class
export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 404, true, 'NOT_FOUND_ERROR');
  }
}

// Conflict error class
export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, true, 'CONFLICT_ERROR');
  }
}

// Rate limit error class
export class RateLimitError extends AppError {
  constructor(message: string = 'Too many requests') {
    super(message, 429, true, 'RATE_LIMIT_ERROR');
  }
}

// Database error class
export class DatabaseError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 500, true, 'DATABASE_ERROR', details);
  }
}

// External service error class
export class ExternalServiceError extends AppError {
  constructor(service: string, message?: string) {
    super(message || `External service ${service} is unavailable`, 503, true, 'EXTERNAL_SERVICE_ERROR');
  }
}

/**
 * Async error handler wrapper
 */
export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => unknown | Promise<unknown>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Handle different types of errors
const handleCastErrorDB = (err: any): AppError => {
  const message = `Invalid ${err.path}: ${err.value}`
  return new ValidationError(message)
}

const handleDuplicateFieldsDB = (err: any): AppError => {
  const value = err.errmsg?.match(/(["'])(\\?.)*?\1/)?.[0]
  const message = `Duplicate field value: ${value}. Please use another value!`
  return new ConflictError(message)
}

const handleValidationErrorDB = (err: any): AppError => {
  const errors = Object.values(err.errors).map((el: any) => el.message)
  const message = `Invalid input data. ${errors.join('. ')}`
  return new ValidationError(message, errors)
}

const handleJWTError = (): AppError => {
  return new AuthenticationError('Invalid token. Please log in again!')
}

const handleJWTExpiredError = (): AppError => {
  return new AuthenticationError('Your token has expired! Please log in again.')
}

const handleSupabaseError = (err: any): AppError => {
  if (err.code === 'PGRST116') {
    return new NotFoundError('Resource')
  }
  if (err.code === '23505') {
    return new ConflictError('Resource already exists')
  }
  if (err.code === '23503') {
    return new ValidationError('Foreign key constraint violation')
  }
  if (err.code === '42501') {
    return new AuthorizationError('Insufficient database permissions')
  }
  
  return new DatabaseError(err.message || 'Database operation failed', {
    code: err.code,
    details: err.details,
    hint: err.hint
  })
}

/**
 * Global error handler middleware
 */
export const globalErrorHandler = async (err: any, req: Request, res: Response, _next: NextFunction) => {
  let error = { ...err }
  error.message = err.message

  // Log error with enhanced logger
  logger.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    requestId: req.headers['x-request-id'],
    userId: req.user?.id,
    timestamp: new Date().toISOString()
  })

  // Handle specific error types
  if (err.name === 'CastError') error = handleCastErrorDB(err)
  if (err.code === 11000) error = handleDuplicateFieldsDB(err)
  if (err.name === 'ValidationError') error = handleValidationErrorDB(err)
  if (err.name === 'JsonWebTokenError') error = handleJWTError()
  if (err.name === 'TokenExpiredError') error = handleJWTExpiredError()
  if (err.name === 'PostgrestError' || err.code?.startsWith('PG')) {
    error = handleSupabaseError(err)
  }

  // Convert to AppError if not already
  if (!(error instanceof AppError)) {
    error = new AppError(
      error.message || 'Something went wrong!',
      error.statusCode || 500,
      false
    )
  }

  let statusCode = error.statusCode || 500
  let message = error.message || 'Internal Server Error'
  let code = error.code || 'INTERNAL_ERROR'

  // Log to Supabase errors table if configured
  try {
    if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );

      await supabase.from('errors').insert({
        message: error.message,
        stack: error.stack,
        status_code: statusCode,
        error_code: code,
        request_method: req.method,
        request_url: req.url,
        request_ip: req.ip,
        user_agent: req.headers['user-agent'],
        request_id: req.headers['x-request-id'],
        created_at: new Date().toISOString()
      });
    }
  } catch (logError) {
    console.error('Failed to log error to database:', logError);
  }

  // Handle specific error types
  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
    code = 'VALIDATION_ERROR';
  } else if (error.name === 'UnauthorizedError') {
    statusCode = 401;
    message = 'Unauthorized';
    code = 'UNAUTHORIZED';
  } else if (error.name === 'ForbiddenError') {
    statusCode = 403;
    message = 'Forbidden';
    code = 'FORBIDDEN';
  } else if (error.name === 'NotFoundError') {
    statusCode = 404;
    message = 'Resource not found';
    code = 'NOT_FOUND';
  } else if (error.name === 'ConflictError') {
    statusCode = 409;
    message = 'Resource conflict';
    code = 'CONFLICT';
  } else if (error.name === 'TooManyRequestsError') {
    statusCode = 429;
    message = 'Too many requests';
    code = 'TOO_MANY_REQUESTS';
  }

  // Don't expose internal errors in production
  if (process.env.NODE_ENV === 'production' && statusCode === 500) {
    message = 'Something went wrong';
  }

  // Error response interface
  interface ErrorResponse {
    success: false
    error: {
      message: string
      code?: string
      statusCode: number
      details?: any
      timestamp: string
      path: string
      requestId?: string
    }
  }

  // Send error response
  const errorResponse: ErrorResponse = {
    success: false,
    error: {
      message: error.isOperational ? error.message : 'Something went wrong!',
      code: error.code,
      statusCode: error.statusCode,
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      requestId: req.headers['x-request-id'] as string,
    }
  }

  // Include details only for operational errors
  if (error.isOperational && error.details) {
    errorResponse.error.details = error.details
  }

  // Include stack trace in development
  if (process.env.NODE_ENV === 'development') {
    (errorResponse.error as any).stack = error.stack
  }

  res.status(statusCode).json(errorResponse)
};

/**
 * 404 handler
 */
export const notFoundHandler = (req: Request, _res: Response, next: NextFunction) => {
  const error = new NotFoundError(`Route ${req.originalUrl}`);
  next(error);
};

/**
 * Unhandled promise rejection handler
 */
export const handleUnhandledRejection = () => {
  process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Close server gracefully
    process.exit(1);
  });
};

/**
 * Uncaught exception handler
 */
export const handleUncaughtException = () => {
  process.on('uncaughtException', (error: Error) => {
    console.error('Uncaught Exception:', error);
    // Close server gracefully
    process.exit(1);
  });
};

/**
 * Performance monitoring middleware
 */
export const performanceMonitor = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    
    // Log slow requests (> 1 second)
    if (duration > 1000) {
      console.warn('Slow request detected:', {
        method: req.method,
        url: req.url,
        duration: `${duration}ms`,
        requestId: req.headers['x-request-id']
      });
    }
    
    // Log request metrics
    if (process.env.NODE_ENV === 'development') {
      console.log('Request completed:', {
        method: req.method,
        url: req.url,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
        requestId: req.headers['x-request-id']
      });
    }
  });
  
  next();
};