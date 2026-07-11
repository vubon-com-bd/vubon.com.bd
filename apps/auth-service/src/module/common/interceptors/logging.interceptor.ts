/**
 * Logging Interceptor - Enterprise Grade
 * 
 * @module common/interceptors/logging.interceptor
 * 
 * @description
 * Global interceptor for request/response logging.
 * Logs incoming requests, outgoing responses, and execution time.
 * 
 * Enterprise Features:
 * ✅ Request/Response logging
 * ✅ Execution time tracking
 * ✅ Request ID propagation
 * ✅ Structured logging
 * ✅ Environment-aware verbosity
 * ✅ Sensitive data masking
 * ✅ Performance monitoring
 * 
 * @example
 * // In main.ts
 * app.useGlobalInterceptors(new LoggingInterceptor());
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
      logResponseBody: options?.logResponseBody ?? false,
      maskSensitiveFields: options?.maskSensitiveFields ?? DEFAULT_MASK_FIELDS,
      excludePaths: options?.excludePaths ?? DEFAULT_EXCLUDE_PATHS,
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

    // Log request
    const requestLog = this.buildRequestLog(request);
    this.logger.debug(`[${requestId}] Request: ${method} ${url}`, requestLog);

    return next.handle().pipe(
      tap({
        next: (data) => {
          const duration = Date.now() - startTime;
          const statusCode = response.statusCode;

          const responseLog = this.buildResponseLog(data, statusCode, duration);
          this.logger.debug(`[${requestId}] Response: ${method} ${url} - ${statusCode} (${duration}ms)`, responseLog);

          // Log slow requests
          if (duration > 1000) {
            this.logger.warn(`[${requestId}] Slow request: ${method} ${url} took ${duration}ms`);
          }
        },
        error: (error) => {
          const duration = Date.now() - startTime;
          const statusCode = error.status || 500;

          this.logger.error(
            `[${requestId}] Error: ${method} ${url} - ${statusCode} (${duration}ms)`,
            error.stack
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

    // Log request body (if enabled)
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

    // Log response body (if enabled)
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
}
