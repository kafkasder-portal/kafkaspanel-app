import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

/**
 * Validation middleware factory
 */
export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors
      });
    }
    
    next();
  };
};

/**
 * Common validation schemas
 */
export const schemas = {
  // Auth schemas
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  }),
  
  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required(),
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    phone: Joi.string().pattern(/^[+]?[1-9]\d{1,14}$/).optional()
  }),
  
  // Meeting schemas
  createMeeting: Joi.object({
    title: Joi.string().min(3).max(200).required(),
    description: Joi.string().max(1000).optional(),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().greater(Joi.ref('startDate')).required(),
    location: Joi.string().max(200).optional(),
    attendees: Joi.array().items(Joi.string().uuid()).optional()
  }),
  
  // Task schemas
  createTask: Joi.object({
    title: Joi.string().min(3).max(200).required(),
    description: Joi.string().max(1000).optional(),
    priority: Joi.string().valid('low', 'medium', 'high', 'urgent').required(),
    dueDate: Joi.date().iso().optional(),
    assignedTo: Joi.string().uuid().optional(),
    category: Joi.string().max(50).optional()
  }),
  
  // Message schemas
  createMessage: Joi.object({
    content: Joi.string().min(1).max(5000).required(),
    recipientId: Joi.string().uuid().required(),
    subject: Joi.string().max(200).optional(),
    priority: Joi.string().valid('low', 'normal', 'high').default('normal')
  }),
  
  // Beneficiary schemas
  createBeneficiary: Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().optional(),
    phone: Joi.string().pattern(/^[+]?[1-9]\d{1,14}$/).optional(),
    address: Joi.string().max(500).optional(),
    nationalId: Joi.string().min(10).max(20).optional(),
    birthDate: Joi.date().max('now').optional(),
    needCategory: Joi.string().valid('education', 'health', 'housing', 'food', 'clothing', 'other').required(),
    urgencyLevel: Joi.string().valid('low', 'medium', 'high', 'critical').required()
  })
};

/**
 * Sanitize input to prevent XSS
 */
export const sanitizeInput = (req: Request, _res: Response, next: NextFunction) => {
  const sanitizeString = (str: string): string => {
    return str
      .replace(/[<>"'&]/g, (match) => {
        const entities: { [key: string]: string } = {
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#x27;',
          '&': '&amp;'
        };
        return entities[match];
      })
      .trim();
  };
  
  const sanitizeObject = (obj: any): any => {
    if (typeof obj === 'string') {
      return sanitizeString(obj);
    }
    
    if (Array.isArray(obj)) {
      return obj.map(sanitizeObject);
    }
    
    if (obj && typeof obj === 'object') {
      const sanitized: any = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          sanitized[key] = sanitizeObject(obj[key]);
        }
      }
      return sanitized;
    }
    
    return obj;
  };
  
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }
  
  if (req.query) {
    req.query = sanitizeObject(req.query);
  }
  
  next();
};