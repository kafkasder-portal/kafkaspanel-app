import { createWriteStream, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

// Log levels
export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3
}

// Log entry interface
interface LogEntry {
  timestamp: string
  level: string
  message: string
  meta?: any
  requestId?: string
  userId?: string
}

// Logger class
class Logger {
  private logLevel: LogLevel
  private logDir: string
  private errorStream?: NodeJS.WritableStream
  private infoStream?: NodeJS.WritableStream

  constructor() {
    this.logLevel = this.getLogLevel()
    this.logDir = join(process.cwd(), 'logs')
    this.initializeStreams()
  }

  private getLogLevel(): LogLevel {
    const level = process.env.LOG_LEVEL?.toUpperCase() || 'INFO'
    return LogLevel[level as keyof typeof LogLevel] ?? LogLevel.INFO
  }

  private initializeStreams(): void {
    if (process.env.NODE_ENV !== 'test') {
      try {
        // Create logs directory if it doesn't exist
        if (!existsSync(this.logDir)) {
          mkdirSync(this.logDir, { recursive: true })
        }

        // Create log streams
        this.errorStream = createWriteStream(
          join(this.logDir, 'error.log'),
          { flags: 'a' }
        )
        this.infoStream = createWriteStream(
          join(this.logDir, 'combined.log'),
          { flags: 'a' }
        )
      } catch (error) {
        console.error('Failed to initialize log streams:', error)
      }
    }
  }

  private formatMessage(level: string, message: string, meta?: any): string {
    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...(meta && { meta })
    }
    return JSON.stringify(logEntry) + '\n'
  }

  private writeToFile(stream: NodeJS.WritableStream | undefined, content: string): void {
    if (stream && stream.writable) {
      stream.write(content)
    }
  }

  private shouldLog(level: LogLevel): boolean {
    return level <= this.logLevel
  }

  error(message: string, meta?: any): void {
    if (!this.shouldLog(LogLevel.ERROR)) return

    const formattedMessage = this.formatMessage('ERROR', message, meta)
    
    // Console output
    console.error(`🔴 ${message}`, meta ? meta : '')
    
    // File output
    this.writeToFile(this.errorStream, formattedMessage)
    this.writeToFile(this.infoStream, formattedMessage)
  }

  warn(message: string, meta?: any): void {
    if (!this.shouldLog(LogLevel.WARN)) return

    const formattedMessage = this.formatMessage('WARN', message, meta)
    
    // Console output
    console.warn(`🟡 ${message}`, meta ? meta : '')
    
    // File output
    this.writeToFile(this.infoStream, formattedMessage)
  }

  info(message: string, meta?: any): void {
    if (!this.shouldLog(LogLevel.INFO)) return

    const formattedMessage = this.formatMessage('INFO', message, meta)
    
    // Console output
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔵 ${message}`, meta ? meta : '')
    }
    
    // File output
    this.writeToFile(this.infoStream, formattedMessage)
  }

  debug(message: string, meta?: any): void {
    if (!this.shouldLog(LogLevel.DEBUG)) return

    const formattedMessage = this.formatMessage('DEBUG', message, meta)
    
    // Console output (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.debug(`🟣 ${message}`, meta ? meta : '')
    }
    
    // File output
    this.writeToFile(this.infoStream, formattedMessage)
  }

  // HTTP request logging
  http(req: any, res: any, responseTime?: number): void {
    const meta = {
      method: req.method,
      url: req.originalUrl || req.url,
      statusCode: res.statusCode,
      responseTime: responseTime ? `${responseTime}ms` : undefined,
      userAgent: req.get('User-Agent'),
      ip: req.ip || req.connection.remoteAddress,
      requestId: req.headers['x-request-id'],
      userId: req.user?.id
    }

    const message = `${req.method} ${req.originalUrl || req.url} ${res.statusCode}`
    
    if (res.statusCode >= 400) {
      this.error(message, meta)
    } else if (res.statusCode >= 300) {
      this.warn(message, meta)
    } else {
      this.info(message, meta)
    }
  }

  // Performance logging
  performance(operation: string, duration: number, meta?: any): void {
    const message = `Performance: ${operation} took ${duration}ms`
    const logMeta = { ...meta, duration, operation }

    if (duration > 5000) {
      this.error(message, logMeta)
    } else if (duration > 1000) {
      this.warn(message, logMeta)
    } else {
      this.debug(message, logMeta)
    }
  }

  // Security logging
  security(event: string, meta?: any): void {
    const message = `Security Event: ${event}`
    this.warn(message, { ...meta, securityEvent: true })
  }

  // Database logging
  database(query: string, duration?: number, meta?: any): void {
    const message = `Database Query: ${query}`
    const logMeta = { ...meta, query, duration }

    if (duration && duration > 1000) {
      this.warn(message, logMeta)
    } else {
      this.debug(message, logMeta)
    }
  }

  // Cleanup method
  close(): void {
    if (this.errorStream) {
      this.errorStream.end()
    }
    if (this.infoStream) {
      this.infoStream.end()
    }
  }
}

// Create and export logger instance
export const logger = new Logger()

// Export logger class for testing
export { Logger }

// Graceful shutdown
process.on('SIGINT', () => {
  logger.close()
  process.exit(0)
})

process.on('SIGTERM', () => {
  logger.close()
  process.exit(0)
})