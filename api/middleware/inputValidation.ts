import { Request, Response, NextFunction } from 'express'
import { ValidationError } from './errorHandler'
import { logger } from '../utils/logger'

// File interface for uploads
interface UploadedFile {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  size: number
  buffer: Buffer
  destination?: string
  filename?: string
  path?: string
}

// Extend Request interface for file uploads
interface MulterRequest extends Request {
  file?: UploadedFile
  files?: UploadedFile[] | { [fieldname: string]: UploadedFile[] }
}

// Validation rule types
type ValidationRule = {
  required?: boolean
  type?: 'string' | 'number' | 'boolean' | 'email' | 'url' | 'date' | 'array' | 'object'
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  pattern?: RegExp
  enum?: any[]
  custom?: (value: any) => boolean | string
  sanitize?: boolean
  trim?: boolean
}

type ValidationSchema = {
  [key: string]: ValidationRule
}

// Validation result
interface ValidationResult {
  isValid: boolean
  errors: string[]
  sanitizedData?: any
}

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// URL validation regex
const URL_REGEX = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/

// Sanitization functions
const sanitizeString = (value: string): string => {
  return value
    .replace(/[<>"'&]/g, (match) => {
      const entities: { [key: string]: string } = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;'
      }
      return entities[match] || match
    })
    .trim()
}

const sanitizeEmail = (value: string): string => {
  return value.toLowerCase().trim()
}

// Validation functions
const validateField = (fieldName: string, value: any, rule: ValidationRule): { isValid: boolean; errors: string[]; sanitizedValue?: any } => {
  const errors: string[] = []
  let sanitizedValue = value

  // Check if field is required
  if (rule.required && (value === undefined || value === null || value === '')) {
    errors.push(`${fieldName} is required`)
    return { isValid: false, errors }
  }

  // Skip validation if field is not required and empty
  if (!rule.required && (value === undefined || value === null || value === '')) {
    return { isValid: true, errors: [], sanitizedValue: value }
  }

  // Trim strings if specified
  if (rule.trim && typeof value === 'string') {
    sanitizedValue = value.trim()
  }

  // Type validation
  if (rule.type) {
    switch (rule.type) {
      case 'string':
        if (typeof sanitizedValue !== 'string') {
          errors.push(`${fieldName} must be a string`)
        } else if (rule.sanitize) {
          sanitizedValue = sanitizeString(sanitizedValue)
        }
        break
      
      case 'number':
        const numValue = Number(sanitizedValue)
        if (isNaN(numValue)) {
          errors.push(`${fieldName} must be a valid number`)
        } else {
          sanitizedValue = numValue
        }
        break
      
      case 'boolean':
        if (typeof sanitizedValue === 'string') {
          if (sanitizedValue.toLowerCase() === 'true') {
            sanitizedValue = true
          } else if (sanitizedValue.toLowerCase() === 'false') {
            sanitizedValue = false
          } else {
            errors.push(`${fieldName} must be a boolean`)
          }
        } else if (typeof sanitizedValue !== 'boolean') {
          errors.push(`${fieldName} must be a boolean`)
        }
        break
      
      case 'email':
        if (typeof sanitizedValue !== 'string' || !EMAIL_REGEX.test(sanitizedValue)) {
          errors.push(`${fieldName} must be a valid email address`)
        } else {
          sanitizedValue = sanitizeEmail(sanitizedValue)
        }
        break
      
      case 'url':
        if (typeof sanitizedValue !== 'string' || !URL_REGEX.test(sanitizedValue)) {
          errors.push(`${fieldName} must be a valid URL`)
        }
        break
      
      case 'date':
        const dateValue = new Date(sanitizedValue)
        if (isNaN(dateValue.getTime())) {
          errors.push(`${fieldName} must be a valid date`)
        } else {
          sanitizedValue = dateValue.toISOString()
        }
        break
      
      case 'array':
        if (!Array.isArray(sanitizedValue)) {
          errors.push(`${fieldName} must be an array`)
        }
        break
      
      case 'object':
        if (typeof sanitizedValue !== 'object' || Array.isArray(sanitizedValue) || sanitizedValue === null) {
          errors.push(`${fieldName} must be an object`)
        }
        break
    }
  }

  // Length validation for strings and arrays
  if (rule.minLength !== undefined) {
    if (typeof sanitizedValue === 'string' || Array.isArray(sanitizedValue)) {
      if (sanitizedValue.length < rule.minLength) {
        errors.push(`${fieldName} must be at least ${rule.minLength} characters/items long`)
      }
    }
  }

  if (rule.maxLength !== undefined) {
    if (typeof sanitizedValue === 'string' || Array.isArray(sanitizedValue)) {
      if (sanitizedValue.length > rule.maxLength) {
        errors.push(`${fieldName} must be at most ${rule.maxLength} characters/items long`)
      }
    }
  }

  // Numeric range validation
  if (rule.min !== undefined && typeof sanitizedValue === 'number') {
    if (sanitizedValue < rule.min) {
      errors.push(`${fieldName} must be at least ${rule.min}`)
    }
  }

  if (rule.max !== undefined && typeof sanitizedValue === 'number') {
    if (sanitizedValue > rule.max) {
      errors.push(`${fieldName} must be at most ${rule.max}`)
    }
  }

  // Pattern validation
  if (rule.pattern && typeof sanitizedValue === 'string') {
    if (!rule.pattern.test(sanitizedValue)) {
      errors.push(`${fieldName} format is invalid`)
    }
  }

  // Enum validation
  if (rule.enum && !rule.enum.includes(sanitizedValue)) {
    errors.push(`${fieldName} must be one of: ${rule.enum.join(', ')}`)
  }

  // Custom validation
  if (rule.custom) {
    const customResult = rule.custom(sanitizedValue)
    if (typeof customResult === 'string') {
      errors.push(customResult)
    } else if (!customResult) {
      errors.push(`${fieldName} failed custom validation`)
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedValue
  }
}

// Main validation function
export const validateData = (data: any, schema: ValidationSchema): ValidationResult => {
  const errors: string[] = []
  const sanitizedData: any = {}

  // Validate each field in schema
  for (const [fieldName, rule] of Object.entries(schema)) {
    const fieldValue = data[fieldName]
    const result = validateField(fieldName, fieldValue, rule)
    
    if (!result.isValid) {
      errors.push(...result.errors)
    } else {
      sanitizedData[fieldName] = result.sanitizedValue
    }
  }

  // Check for unexpected fields
  const allowedFields = Object.keys(schema)
  const providedFields = Object.keys(data || {})
  const unexpectedFields = providedFields.filter(field => !allowedFields.includes(field))
  
  if (unexpectedFields.length > 0) {
    errors.push(`Unexpected fields: ${unexpectedFields.join(', ')}`)
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedData: errors.length === 0 ? sanitizedData : undefined
  }
}

// Validation middleware factory
export const validateBody = (schema: ValidationSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = validateData(req.body, schema)
    
    if (!result.isValid) {
      logger.warn('Validation failed', {
        path: req.originalUrl,
        method: req.method,
        errors: result.errors,
        requestId: req.headers['x-request-id']
      })
      
      const error = new ValidationError('Validation failed', result.errors)
      return next(error)
    }
    
    // Replace request body with sanitized data
    req.body = result.sanitizedData
    next()
  }
}

// Query parameter validation
export const validateQuery = (schema: ValidationSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = validateData(req.query, schema)
    
    if (!result.isValid) {
      logger.warn('Query validation failed', {
        path: req.originalUrl,
        method: req.method,
        errors: result.errors,
        requestId: req.headers['x-request-id']
      })
      
      const error = new ValidationError('Query validation failed', result.errors)
      return next(error)
    }
    
    // Replace request query with sanitized data
    req.query = result.sanitizedData
    next()
  }
}

// URL parameter validation
export const validateParams = (schema: ValidationSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = validateData(req.params, schema)
    
    if (!result.isValid) {
      logger.warn('Params validation failed', {
        path: req.originalUrl,
        method: req.method,
        errors: result.errors,
        requestId: req.headers['x-request-id']
      })
      
      const error = new ValidationError('URL parameter validation failed', result.errors)
      return next(error)
    }
    
    // Replace request params with sanitized data
    req.params = result.sanitizedData
    next()
  }
}

// Common validation schemas
export const commonSchemas = {
  // Pagination
  pagination: {
    page: { type: 'number' as const, min: 1 },
    limit: { type: 'number' as const, min: 1, max: 100 },
    sort: { type: 'string' as const, maxLength: 50 },
    order: { type: 'string' as const, enum: ['asc', 'desc'] }
  },
  
  // ID parameter
  id: {
    id: { required: true, type: 'string' as const, pattern: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/ }
  },
  
  // User authentication
  login: {
    email: { required: true, type: 'email' as const },
    password: { required: true, type: 'string' as const, minLength: 6 }
  },
  
  // User registration
  register: {
    email: { required: true, type: 'email' as const },
    password: { required: true, type: 'string' as const, minLength: 8, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/ },
    firstName: { required: true, type: 'string' as const, minLength: 2, maxLength: 50, sanitize: true, trim: true },
    lastName: { required: true, type: 'string' as const, minLength: 2, maxLength: 50, sanitize: true, trim: true }
  },
  
  // Password reset
  passwordReset: {
    email: { required: true, type: 'email' as const }
  },
  
  // Contact information
  contact: {
    phone: { type: 'string' as const, pattern: /^\+?[1-9]\d{1,14}$/ },
    address: { type: 'string' as const, maxLength: 200, sanitize: true, trim: true },
    city: { type: 'string' as const, maxLength: 50, sanitize: true, trim: true },
    country: { type: 'string' as const, maxLength: 50, sanitize: true, trim: true },
    postalCode: { type: 'string' as const, maxLength: 20, trim: true }
  }
}

// File upload validation
export const validateFileUpload = (allowedTypes: string[], maxSize: number = 5 * 1024 * 1024) => {
  return (req: MulterRequest, res: Response, next: NextFunction): void => {
    if (!req.file && !req.files) {
      return next()
    }
    
    const files: UploadedFile[] = []
    
    if (req.file) {
      files.push(req.file)
    }
    
    if (req.files) {
      if (Array.isArray(req.files)) {
        files.push(...req.files)
      } else {
        Object.values(req.files).forEach(fileArray => {
          files.push(...fileArray)
        })
      }
    }
    
    const errors: string[] = []
    
    files.forEach((file: UploadedFile, index: number) => {
      if (!file) return
      
      // Check file type
      if (!allowedTypes.includes(file.mimetype)) {
        errors.push(`File ${index + 1}: Invalid file type. Allowed types: ${allowedTypes.join(', ')}`)
      }
      
      // Check file size
      if (file.size > maxSize) {
        errors.push(`File ${index + 1}: File size exceeds limit of ${maxSize / (1024 * 1024)}MB`)
      }
      
      // Check filename
      if (file.originalname && !/^[a-zA-Z0-9._-]+$/.test(file.originalname)) {
        errors.push(`File ${index + 1}: Invalid filename. Only alphanumeric characters, dots, hyphens, and underscores are allowed`)
      }
    })
    
    if (errors.length > 0) {
      logger.warn('File upload validation failed', {
        path: req.originalUrl,
        method: req.method,
        errors,
        requestId: req.headers['x-request-id']
      })
      
      const error = new ValidationError('File upload validation failed', errors)
      return next(error)
    }
    
    next()
  }
}