/**
 * Logging Interceptor - Enterprise Grade (Enhanced)
 * 
 * @module common/interceptors/logging.interceptor
 * 
 * @description
 * Global interceptor for request/response logging with enterprise features:
 * - Environment-aware configuration (per environment)
 * - Module-specific overrides
 * - Performance monitoring with thresholds
 * - Sensitive data masking
 * - Request ID propagation
 * - Structured logging with context
 * 
 * @example
 * // Default (global)
 * app.useGlobalInterceptors(new LoggingInterceptor());
 * 
 * // With custom options
 * app.useGlobalInterceptors(new LoggingInterceptor({
 *   logLevel: 'verbose',
 *   slowRequestThreshold: 500,
 *   maskFields: ['password', 'token'],
 *   excludePaths: ['/health', '/metrics'],
 * }));
 */

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  Inject,
  Optional,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Request, Response } from 'express';
import { env } from '@vubon/shared-config';
import { v4 as uuidv4 } from 'uuid';

// ============================================================
// Types & Configuration
// ============================================================

export type LogLevel = 'silent' | 'error' | 'warn' | 'info' | 'debug' | 'verbose';

export interface LoggingOptions {
  /** Log level (default: based on environment) */
  logLevel?: LogLevel;
  /** Log request body (default: false in production) */
  logRequestBody?: boolean;
  /** Log response body (default: false in production) */
  logResponseBody?: boolean;
  /** Mask sensitive fields (default: defaultMaskFields) */
  maskFields?: string[];
  /** Exclude paths from logging (default: defaultExcludePaths) */
  excludePaths?: string[];
  /** Slow request threshold in ms (default: 1000) */
  slowRequestThreshold?: number;
  /** Max body size to log in bytes (default: 10240) */
  maxBodySize?: number;
  /** Enable performance metrics (default: true) */
  enablePerformanceMetrics?: boolean;
  /** Log headers (default: false) */
  logHeaders?: boolean;
  /** Additional context fields */
  contextFields?: Record<string, unknown>;
  /** Module name for context (auto-set when used with @Module) */
  moduleName?: string;
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
  'otp',
  'verificationCode',
  'resetToken',
  'apiKey',
];

const DEFAULT_EXCLUDE_PATHS = [
  '/health',
  '/health/readiness',
  '/health/liveness',
  '/metrics',
  '/favicon.ico',
  '/.well-known',
];

// ============================================================
// Interceptor Implementation
// ============================================================

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger: Logger;
  private readonly options: Required<LoggingOptions>;
  private readonly isProd: boolean;
  private readonly isDev: boolean;

  constructor(@Optional() options?: LoggingOptions) {
    this.isProd = env.NODE_ENV === 'production';
    this.isDev = env.NODE_ENV === 'development';

    // Build default options based on environment
    const defaultOptions: LoggingOptions = {
      logLevel: this.isProd ? 'info' : 'debug',
      logRequestBody: false,
      logResponseBody: false,
      maskFields: DEFAULT_MASK_FIELDS,
      excludePaths: DEFAULT_EXCLUDE_PATHS,
      slowRequestThreshold: this.isProd ? 500 : 1000,
      maxBodySize: 10240, // 10KB
      enablePerformanceMetrics: true,
      logHeaders: false,
      contextFields: {},
      moduleName: 'Global',
    };

    // Merge provided options with defaults (environment-aware)
    this.options = {
      ...defaultOptions,
      ...this.environmentAwareOptions(options || {}),
    } as Required<LoggingOptions>;

    // Initialize logger with module context
    this.logger = new Logger(
      this.options.moduleName || 'LoggingInterceptor'
    );
  }

  /**
   * Apply environment-aware overrides to options
   */
  private environmentAwareOptions(options: LoggingOptions): LoggingOptions {
    const result = { ...options };

    // In production, enforce safe defaults
    if (this.isProd) {
      if (options.logRequestBody === undefined) result.logRequestBody = false;
      if (options.logResponseBody === undefined) result.logResponseBody = false;
      if (options.logLevel === undefined) result.logLevel = 'info';
      if (options.slowRequestThreshold === undefined) result.slowRequestThreshold = 500;
    }

    // In development, enable more verbose logging if not specified
    if (this.isDev) {
      if (options.logLevel === undefined) result.logLevel = 'debug';
      if (options.slowRequestThreshold === undefined) result.slowRequestThreshold = 1000;
    }

    return result;
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

    // Check log level
    if (this.options.logLevel === 'silent') {
      return next.handle();
    }

    // Build and log request
    const requestLog = this.buildRequestLog(request, requestId);
    const shouldLogRequest = this.shouldLogRequest(method, url);

    if (shouldLogRequest) {
      this.logWithLevel(
        'debug',
        `[${requestId}] ➤ ${method} ${url}`,
        requestLog
      );
    }

    return next.handle().pipe(
      tap({
        next: (data) => {
          const duration = Date.now() - startTime;
          const statusCode = response.statusCode;

          const responseLog = this.buildResponseLog(data, statusCode, duration, requestId);

          // Log response
          this.logResponse(method, url, statusCode, duration, requestId, responseLog);

          // Log slow requests
          if (duration > this.options.slowRequestThreshold) {
            this.logger.warn(
              `[${requestId}] ⚠ Slow request: ${method} ${url} - ${duration}ms (threshold: ${this.options.slowRequestThreshold}ms)`,
              { duration, threshold: this.options.slowRequestThreshold, url, method }
            );
          }

          // Log performance metrics
          if (this.options.enablePerformanceMetrics && this.options.logLevel === 'verbose') {
            this.logger.debug(
              `[${requestId}] 📊 Performance: ${method} ${url} - ${duration}ms, Status: ${statusCode}`,
              { duration, statusCode, method, url }
            );
          }
        },
        error: (error) => {
          const duration = Date.now() - startTime;
          const statusCode = error.status || 500;

          // Log error
          this.logger.error(
            `[${requestId}] ✗ Error: ${method} ${url} - ${statusCode} (${duration}ms)`,
            {
              error: error.message,
              stack: this.isDev ? error.stack : undefined,
              duration,
              statusCode,
              requestId,
              method,
              url,
            }
          );
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
   * Generate a unique request ID (UUID v4 with prefix)
   */
  private generateRequestId(): string {
    const uuid = uuidv4().substring(0, 8);
    return `req_${Date.now().toString(36)}_${uuid}`;
  }

  /**
   * Check if path should be excluded from logging
   */
  private shouldExclude(url: string): boolean {
    return this.options.excludePaths.some((path) => url.startsWith(path));
  }

  /**
   * Determine if request should be logged
   */
  private shouldLogRequest(method: string, url: string): boolean {
    // GET requests to static assets or common endpoints might be noisy
    const skipPatterns = ['/assets/', '/static/', '/images/'];
    if (method === 'GET' && skipPatterns.some((pattern) => url.includes(pattern))) {
      return this.options.logLevel === 'verbose';
    }
    return true;
  }

  /**
   * Build request log object
   */
  private buildRequestLog(request: Request, requestId: string): Record<string, unknown> {
    const { method, url, headers, query, params, body } = request;
    const userAgent = headers['user-agent'] || 'unknown';
    const ip = this.getClientIp(request);

    const log: Record<string, unknown> = {
      requestId,
      method,
      url,
      ip,
      userAgent,
      timestamp: new Date().toISOString(),
    };

    // Add query and params (masked)
    if (Object.keys(query).length > 0) {
      log.query = this.maskSensitiveData(query);
    }

    if (Object.keys(params).length > 0) {
      log.params = this.maskSensitiveData(params);
    }

    // Log request body (if enabled and not a GET request)
    if (this.options.logRequestBody && body && method !== 'GET') {
      const maskedBody = this.maskSensitiveData(body);
      // Limit body size
      const bodyStr = JSON.stringify(maskedBody);
      if (bodyStr && bodyStr.length <= this.options.maxBodySize) {
        log.body = maskedBody;
      } else if (bodyStr) {
        log.body = {
          _truncated: true,
          _originalSize: bodyStr.length,
          _maxSize: this.options.maxBodySize,
        };
      }
    }

    // Log headers (if enabled)
    if (this.options.logHeaders) {
      log.headers = this.maskSensitiveData({
        'user-agent': headers['user-agent'],
        'x-forwarded-for': headers['x-forwarded-for'],
        'accept-language': headers['accept-language'],
      });
    }

    // Add context fields
    if (this.options.contextFields && Object.keys(this.options.contextFields).length > 0) {
      log.context = this.options.contextFields;
    }

    return log;
  }

  /**
   * Build response log object
   */
  private buildResponseLog(
    data: unknown,
    statusCode: number,
    duration: number,
    requestId: string
  ): Record<string, unknown> {
    const log: Record<string, unknown> = {
      requestId,
      statusCode,
      duration,
      timestamp: new Date().toISOString(),
    };

    // Log response body (if enabled and within size limit)
    if (this.options.logResponseBody && data) {
      const maskedData = this.maskSensitiveData(data);
      const dataStr = JSON.stringify(maskedData);

      if (dataStr && dataStr.length <= this.options.maxBodySize) {
        log.body = maskedData;
      } else if (dataStr) {
        log.body = {
          _truncated: true,
          _originalSize: dataStr.length,
          _maxSize: this.options.maxBodySize,
        };
      }
    }

    // Add performance metrics
    if (this.options.enablePerformanceMetrics) {
      log.performance = {
        duration,
        timestamp: new Date().toISOString(),
        // These could be extended with memory/CPU metrics if needed
      };
    }

    return log;
  }

  /**
   * Log response with appropriate level
   */
  private logResponse(
    method: string,
    url: string,
    statusCode: number,
    duration: number,
    requestId: string,
    responseLog: Record<string, unknown>
  ): void {
    const logLevel = this.getResponseLogLevel(statusCode);
    const message = `[${requestId}] ← ${method} ${url} - ${statusCode} (${duration}ms)`;

    // Determine if we should log the full response details
    const shouldLogDetails = this.options.logLevel === 'verbose' ||
      (this.options.logLevel === 'debug' && statusCode >= 400);

    if (shouldLogDetails) {
      this.logWithLevel(logLevel, message, responseLog);
    } else {
      this.logWithLevel(logLevel, message);
    }
  }

  /**
   * Get log level based on status code
   */
  private getResponseLogLevel(statusCode: number): LogLevel {
    if (statusCode >= 500) return 'error';
    if (statusCode >= 400) return 'warn';
    if (statusCode >= 300) return 'info';
    return 'debug';
  }

  /**
   * Log with appropriate level
   */
  private logWithLevel(level: LogLevel, message: string, data?: Record<string, unknown>): void {
    const logFn = data
      ? (msg: string) => this.logger[level](msg, data)
      : (msg: string) => this.logger[level](msg);

    // Skip if level is below configured level
    const levels: LogLevel[] = ['silent', 'error', 'warn', 'info', 'debug', 'verbose'];
    const currentIndex = levels.indexOf(this.options.logLevel);
    const targetIndex = levels.indexOf(level);

    if (targetIndex <= currentIndex) {
      logFn(message);
    }
  }

  /**
   * Get client IP from request (handles proxies)
   */
  private getClientIp(request: Request): string {
    const forwarded = request.headers['x-forwarded-for'];
    if (forwarded) {
      const ips = Array.isArray(forwarded) ? forwarded[0] : forwarded.split(',')[0];
      return ips?.trim() || request.ip || 'unknown';
    }
    return request.ip || request.socket?.remoteAddress || 'unknown';
  }

  /**
   * Mask sensitive fields in data
   */
  private maskSensitiveData(data: unknown): unknown {
    if (!data) return data;

    const maskFields = this.options.maskFields;

    // Handle arrays
    if (Array.isArray(data)) {
      return data.map((item) => this.maskSensitiveData(item));
    }

    // Handle objects
    if (typeof data === 'object' && data !== null) {
      const masked = { ...(data as Record<string, unknown>) };

      for (const field of maskFields) {
        const lowerField = field.toLowerCase();
        for (const key of Object.keys(masked)) {
          const lowerKey = key.toLowerCase();
          // Check if the key contains any sensitive field name (case-insensitive)
          if (lowerKey.includes(lowerField) || lowerField.includes(lowerKey)) {
            masked[key] = '[REDACTED]';
          }
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
}

// ============================================================
// Module Factory (for module-specific configuration)
// ============================================================

export function createLoggingInterceptor(options?: LoggingOptions): LoggingInterceptor {
  return new LoggingInterceptor(options);
}

// ============================================================
// Module Configuration (for @Module decorator)
// ============================================================

export const LOGGING_OPTIONS = 'LOGGING_OPTIONS';

export const LoggingModuleConfig = {
  provide: LOGGING_OPTIONS,
  useValue: {},
};

export type { LoggingInterceptor as LoggingInterceptorType };
