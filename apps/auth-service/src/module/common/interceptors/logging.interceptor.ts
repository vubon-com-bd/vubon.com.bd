/**
 * Logging Interceptor - Enterprise Grade (Enhanced)
 *
 * @module common/interceptors/logging.interceptor
 *
 * @description
 * Global interceptor for request/response logging with structured logging support.
 * Uses Winston for JSON-formatted logs in production.
 *
 * Enterprise Features:
 * ✅ Structured logging (JSON format in production)
 * ✅ Request/Response logging with environment-aware verbosity
 * ✅ Execution time tracking with slow request warnings
 * ✅ Request ID propagation for distributed tracing
 * ✅ Sensitive data masking
 * ✅ Performance monitoring
 * ✅ Configurable via options
 *
 * @example
 * // In main.ts
 * app.useGlobalInterceptors(new LoggingInterceptor({
 *   logResponseBody: env.NODE_ENV === 'development',
 * }));
 */

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Request, Response } from 'express';
import { env } from '@vubon/shared-config';
import * as winston from 'winston';
import * as path from 'path';

// ============================================================
// Types
// ============================================================

export interface LoggingOptions {
  /** Log request body (default: false in production) */
  logRequestBody?: boolean;
  /** Log response body (default: false in production) */
  logResponseBody?: boolean;
  /** Mask sensitive fields */
  maskSensitiveFields?: string[];
  /** Exclude paths from logging */
  excludePaths?: string[];
  /** Enable structured logging (JSON format) */
  structuredLogging?: boolean;
}

// ============================================================
// Constants
// ============================================================

const DEFAULT_MASK_FIELDS = [
  'password',
  'token',
  'accessToken',
  'refreshToken',
  'secret',
  'key',
  'authorization',
  'cookie',
  'creditCard',
  'cvv',
  'pin',
];

const DEFAULT_EXCLUDE_PATHS = [
  '/health',
  '/health/readiness',
  '/health/liveness',
  '/metrics',
  '/favicon.ico',
];

// ============================================================
// Winston Logger Configuration
// ============================================================

/**
 * Create a Winston logger instance with structured logging support
 */
const createWinstonLogger = () => {
  const isProd = env.NODE_ENV === 'production';
  const logDir = path.join(process.cwd(), 'logs');

  // Define log format
  const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    winston.format.errors({ stack: true }),
    winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'stack'] })
  );

  // JSON format for production (structured logging)
  const jsonFormat = winston.format.combine(
    logFormat,
    winston.format.json()
  );

  // Pretty format for development
  const prettyFormat = winston.format.combine(
    logFormat,
    winston.format.colorize(),
    winston.format.printf(({ timestamp, level, message, metadata, stack }) => {
      let log = `${timestamp} [${level}] ${message}`;
      if (metadata && Object.keys(metadata).length > 0) {
        log += ` ${JSON.stringify(metadata)}`;
      }
      if (stack) {
        log += `\n${stack}`;
      }
      return log;
    })
  );

  // Create transports
  const transports: winston.transport[] = [
    new winston.transports.Console({
      format: isProd ? jsonFormat : prettyFormat,
      level: isProd ? 'info' : 'debug',
    }),
  ];

  // File transport for production (optional)
  if (isProd) {
    transports.push(
      new winston.transports.File({
        filename: path.join(logDir, 'error.log'),
        level: 'error',
        format: jsonFormat,
        maxsize: 10485760, // 10MB
        maxFiles: 5,
      }),
      new winston.transports.File({
        filename: path.join(logDir, 'combined.log'),
        format: jsonFormat,
        maxsize: 10485760,
        maxFiles: 5,
      })
    );
  }

  return winston.createLogger({
    level: isProd ? 'info' : 'debug',
    format: isProd ? jsonFormat : prettyFormat,
    transports,
    exitOnError: false,
  });
};

// Create and export the logger instance
const winstonLogger = createWinstonLogger();

// ============================================================
// Interceptor Implementation
// ============================================================

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);
  private readonly options: LoggingOptions;

  constructor(options?: LoggingOptions) {
    const isProd = env.NODE_ENV === 'production';
    this.options = {
      logRequestBody: options?.logRequestBody ?? !isProd,
      // ✅ Response body logging: ডিফল্ট false, শুধুমাত্র ডেভেলপমেন্টে বা অনুরোধ করলে true
      logResponseBody: options?.logResponseBody ?? false,
      maskSensitiveFields: options?.maskSensitiveFields ?? DEFAULT_MASK_FIELDS,
      excludePaths: options?.excludePaths ?? DEFAULT_EXCLUDE_PATHS,
      structuredLogging: options?.structuredLogging ?? isProd,
    };
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const startTime = Date.now();
    const requestId = (request as any).id || this.generateRequestId();
    (request as any).id = requestId;
    response.setHeader('X-Request-ID', requestId);

    const { method, url } = request;

    // Check if path should be excluded
    if (this.shouldExclude(url)) {
      return next.handle();
    }

    // Build request log data
    const requestData = this.buildRequestLog(request);

    // ✅ Structured logging: request log
    this.logWithWinston('debug', `Incoming Request: ${method} ${url}`, {
      requestId,
      type: 'request',
      ...requestData,
    });

    return next.handle().pipe(
      tap({
        next: (data) => {
          const duration = Date.now() - startTime;
          const statusCode = response.statusCode;

          // Build response log data
          const responseData = this.buildResponseLog(data, statusCode, duration);

          // ✅ Structured logging: response log
          this.logWithWinston('debug', `Outgoing Response: ${method} ${url} - ${statusCode} (${duration}ms)`, {
            requestId,
            type: 'response',
            ...responseData,
          });

          // Log slow requests
          if (duration > 1000) {
            this.logWithWinston('warn', `Slow Request: ${method} ${url}`, {
              requestId,
              type: 'performance',
              duration,
              method,
              url,
              statusCode,
            });
          }
        },
        error: (error) => {
          const duration = Date.now() - startTime;
          const statusCode = error.status || 500;

          // ✅ Structured logging: error log
          this.logWithWinston('error', `Request Error: ${method} ${url}`, {
            requestId,
            type: 'error',
            statusCode,
            duration,
            error: {
              message: error.message,
              stack: error.stack,
              name: error.name,
            },
          });
        },
      }),
      catchError((error) => {
        // Re-throw the error after logging
        throw error;
      })
    );
  }

  // ============================================================
  // Private Methods
  // ============================================================

  /**
   * Generate a unique request ID
   */
  private generateRequestId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `req_${timestamp}_${random}`;
  }

  /**
   * Check if path should be excluded from logging
   */
  private shouldExclude(url: string): boolean {
    return this.options.excludePaths?.some((path) => url.startsWith(path)) || false;
  }

  /**
   * Build request log object
   */
  private buildRequestLog(request: Request): Record<string, unknown> {
    const { method, url, headers, query, params } = request;
    const userAgent = headers['user-agent'] || 'unknown';
    const ip = request.ip || request.socket?.remoteAddress || 'unknown';

    const log: Record<string, unknown> = {
      method,
      url,
      ip,
      userAgent,
      query: this.maskSensitiveData(query),
      params: this.maskSensitiveData(params),
    };

    // ✅ Log request body (if enabled)
    if (this.options.logRequestBody && request.body) {
      log.body = this.maskSensitiveData(request.body);
    }

    return log;
  }

  /**
   * Build response log object
   */
  private buildResponseLog(data: unknown, statusCode: number, duration: number): Record<string, unknown> {
    const log: Record<string, unknown> = {
      statusCode,
      duration,
    };

    // ✅ Log response body (if enabled, default: false)
    if (this.options.logResponseBody && data) {
      log.body = this.maskSensitiveData(data);
    }

    return log;
  }

  /**
   * Mask sensitive fields in data
   */
  private maskSensitiveData(data: unknown): unknown {
    if (!data) return data;

    const maskFields = this.options.maskSensitiveFields || [];

    // Handle arrays
    if (Array.isArray(data)) {
      return data.map((item) => this.maskSensitiveData(item));
    }

    // Handle objects
    if (typeof data === 'object' && data !== null) {
      const masked = { ...(data as Record<string, unknown>) };
      for (const field of maskFields) {
        if (field in masked) {
          masked[field] = '[REDACTED]';
        }
      }
      // Recursively mask nested objects
      for (const [key, value] of Object.entries(masked)) {
        if (value && typeof value === 'object') {
          masked[key] = this.maskSensitiveData(value);
        }
      }
      return masked;
    }

    return data;
  }

  /**
   * ✅ Structured logging with Winston
   * Falls back to NestJS Logger if Winston is not available
   */
  private logWithWinston(level: string, message: string, metadata: Record<string, unknown>): void {
    try {
      // Use Winston for structured logging
      winstonLogger.log(level, message, metadata);
    } catch (error) {
      // Fallback to NestJS Logger
      const loggerMethod = this.logger[level] || this.logger.log;
      loggerMethod.call(this.logger, message, metadata);
    }
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { LoggingOptions as InterceptorLoggingOptions };
