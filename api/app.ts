/**
 * This is a API server
 */

import express, { type Request, type Response, type NextFunction }  from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import morgan from 'morgan';
// import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import meetingsRoutes from './routes/meetings.js';
import tasksRoutes from './routes/tasks.js';
import messagesRoutes from './routes/messages.js';
import errorsRoutes from './routes/errors.js';
import healthRoutes from './routes/health.js';
import beneficiariesRoutes from './routes/beneficiaries.js';
import websocketRoutes from './routes/websocket.js';
import applicationsRoutes from './routes/applications.js';
import aidRecordsRoutes from './routes/aid_records.js';
import paymentsRoutes from './routes/payments.js';
import documentsRoutes from './routes/documents.js';
import usersRoutes from './routes/users.js';

// Import custom middleware
import { sanitizeInput } from './middleware/validation.js';
import { 
  csrfProtection, 
  sqlInjectionProtection, 
  requestSizeLimiter, 
  requestId, 
  additionalSecurityHeaders 
} from './middleware/security.js';
import { 
  globalErrorHandler, 
  notFoundHandler, 
  performanceMonitor,
  handleUnhandledRejection,
  handleUncaughtException
} from './middleware/errorHandler.js';

// for esm mode
// const _filename = fileURLToPath(import.meta.url);

// load env
dotenv.config();

// Setup global error handlers
handleUnhandledRejection();
handleUncaughtException();

const app: express.Application = express();

// Trust proxy for accurate IP addresses
app.set('trust proxy', 1);

// Request tracking and performance monitoring
app.use(requestId);
app.use(performanceMonitor);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.supabase.co", "wss://realtime.supabase.co"]
    }
  },
  crossOriginEmbedderPolicy: false
}));

// Additional security headers
app.use(additionalSecurityHeaders);

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api/', limiter);

// Compression middleware
app.use(compression());

// Logging middleware
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Request size limiting
app.use(requestSizeLimiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Input sanitization and security
app.use(sanitizeInput);
app.use(sqlInjectionProtection);

// CSRF protection (applied to all routes except GET, HEAD, OPTIONS)
app.use(csrfProtection);

// Custom request logging (additional to morgan)
app.use((req: Request, _res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  }
  next();
});

/**
 * API Routes
 */
app.use('/api/auth', authRoutes);
app.use('/api/meetings', meetingsRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/errors', errorsRoutes);
app.use('/api/beneficiaries', beneficiariesRoutes);
app.use('/api/websocket', websocketRoutes);
app.use('/api/applications', applicationsRoutes);
app.use('/api/aid_records', aidRecordsRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/documents', documentsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api', healthRoutes);

/**
 * 404 handler
 */
app.use(notFoundHandler);

/**
 * Global error handler middleware
 */
app.use(globalErrorHandler);

export default app;
