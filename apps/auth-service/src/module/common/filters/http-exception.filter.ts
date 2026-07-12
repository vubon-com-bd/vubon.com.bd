/**
 * HTTP Exception Filter - Enterprise Grade (Enhanced)
 * 
 * @module common/filters/http-exception.filter
 * 
 * @description
 * Global exception filter for consistent error responses.
 * Handles all uncaught exceptions and transforms them into standardized API responses.
 * 
 * Enterprise Features:
 * ✅ Consistent error response format
 * ✅ Environment-aware error details (stack only in development)
 * ✅ Request ID tracking for debugging
 * ✅ Validation error formatting
 * ✅ Custom error mapping
 * ✅ Security-aware (hides sensitive info in production)
 * ✅ Multi-language error messages (English/Bengali)
 * ✅ Custom LoggerService injection for centralized logging
 * ✅ Extended HTTP status codes (LOCKED, TOO_MANY_REQUESTS)
 * 
 * @example
 * // In main.ts
 * app.useGlobalFilters(new HttpExceptionFilter(app.get(LoggerService)));
 */

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
  Inject,
  Optional,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { env } from '@vubon/shared-config';

// ============================================================
// Types & Interfaces
// ============================================================

/**
 * Extended Request interface with request ID
 */
interface RequestWithId extends Request {
  id?: string;
}

/**
 * Standardized error response interface
 */
export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    messageBn?: string;
    details?: unknown;
    stack?: string;
    requestId: string;
    timestamp: string;
    path: string;
    method: string;
    statusCode: number;
  };
}

/**
 * Error code mapping
 */
export interface ErrorCodeMapping {
  code: string;
  message: string;
  messageBn?: string;
  statusCode: number;
}

// ============================================================
// Logger Service Interface (for Dependency Injection)
// ============================================================

/**
 * Abstract logger service interface for dependency injection
 * Implementation will be provided by infrastructure layer
 */
export interface ILoggerService {
  error(message: string, context?: string, trace?: string): void;
  warn(message: string, context?: string): void;
  info(message: string, context?: string): void;
  debug(message: string, context?: string): void;
}

/**
 * Default logger service (fallback if no injection)
 */
export class DefaultLoggerService implements ILoggerService {
  private readonly console = console;

  error(message: string, context?: string, trace?: string): void {
    this.console.error(`[${context || 'App'}] ERROR: ${message}`, trace || '');
  }

  warn(message: string, context?: string): void {
    this.console.warn(`[${context || 'App'}] WARN: ${message}`);
  }

  info(message: string, context?: string): void {
    this.console.info(`[${context || 'App'}] INFO: ${message}`);
  }

  debug(message: string, context?: string): void {
    this.console.debug(`[${context || 'App'}] DEBUG: ${message}`);
  }
}

// ============================================================
// Custom HTTP Status Codes
// ============================================================

/**
 * Extended HTTP status codes not available in NestJS
 */
export const HTTP_STATUS = {
  ...HttpStatus,
  LOCKED: 423, // 423 Locked (WebDAV) - Can be used for account lockout
  TOO_MANY_REQUESTS: 429, // 429 Too Many Requests - Rate limiting
} as const;

// ============================================================
// Error Code Definitions
// ============================================================

/**
 * Predefined error codes for consistency
 */
export const ERROR_CODES = {
  // Client errors (4xx)
  BAD_REQUEST: 'BAD_REQUEST',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  UNPROCESSABLE_ENTITY: 'UNPROCESSABLE_ENTITY',
  TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
  VALIDATION_ERROR: 'VALIDATION_ERROR',

  // Server errors (5xx)
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  NOT_IMPLEMENTED: 'NOT_IMPLEMENTED',
  BAD_GATEWAY: 'BAD_GATEWAY',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  GATEWAY_TIMEOUT: 'GATEWAY_TIMEOUT',

  // Business logic errors (custom)
  INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',
  ACCOUNT_LOCKED: 'ACCOUNT_LOCKED',
  ACCOUNT_SUSPENDED: 'ACCOUNT_SUSPENDED',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  TOKEN_INVALID: 'TOKEN_INVALID',
  SESSION_EXPIRED: 'SESSION_EXPIRED',
  MFA_REQUIRED: 'MFA_REQUIRED',
  MFA_FAILED: 'MFA_FAILED',
  EMAIL_NOT_VERIFIED: 'EMAIL_NOT_VERIFIED',
  PHONE_NOT_VERIFIED: 'PHONE_NOT_VERIFIED',
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  RESOURCE_ALREADY_EXISTS: 'RESOURCE_ALREADY_EXISTS',
  BUSINESS_RULE_VIOLATION: 'BUSINESS_RULE_VIOLATION',
} as const;

// ============================================================
// Filter Implementation
// ============================================================

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger: ILoggerService;
  private readonly contextName = HttpExceptionFilter.name;

  constructor(@Optional() loggerService?: ILoggerService) {
    // Use injected logger service or fallback to default
    this.logger = loggerService || new DefaultLoggerService();
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<RequestWithId>();
    const response = ctx.getResponse<Response>();

    const requestId = request.id || this.generateRequestId();
    const path = request.url;
    const method = request.method;

    // Determine error details
    const { statusCode, errorCode, message, messageBn, details, stack } =
      this.parseException(exception);

    // Log error (with stack in development)
    this.logError(exception, requestId, path, method, statusCode, errorCode, stack);

    // Build error response
    const errorResponse: ErrorResponse = {
      success: false,
      error: {
        code: errorCode,
        message,
        messageBn: messageBn || undefined,
        details: this.sanitizeDetails(details) || undefined,
        stack: this.shouldShowStack() ? stack : undefined,
        requestId,
        timestamp: new Date().toISOString(),
        path,
        method,
        statusCode,
      },
    };

    // Send response
    response.status(statusCode).json(errorResponse);
  }

  // ============================================================
  // Private Methods
  // ============================================================

  /**
   * Parse exception and extract error details
   */
  private parseException(exception: unknown): {
    statusCode: number;
    errorCode: string;
    message: string;
    messageBn?: string;
    details?: unknown;
    stack?: string;
  } {
    // Extract stack trace
    const stack = exception instanceof Error ? exception.stack : undefined;

    // Handle known NestJS exceptions
    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const response = exception.getResponse() as any;

      // Get error code and message
      let errorCode = this.getErrorCodeFromStatus(statusCode);
      let message = response.message || exception.message || 'An error occurred';
      let messageBn: string | undefined = response.messageBn;

      // Handle validation errors (BadRequestException with validation details)
      if (exception instanceof BadRequestException) {
        errorCode = ERROR_CODES.VALIDATION_ERROR;
        if (Array.isArray(response.message)) {
          message = 'Validation failed';
          messageBn = 'ভ্যালিডেশন ব্যর্থ হয়েছে';
        }
      }

      // Handle specific exceptions
      if (exception instanceof UnauthorizedException) {
        errorCode = ERROR_CODES.UNAUTHORIZED;
        message = message || 'Unauthorized access';
        messageBn = messageBn || 'অনুমোদিত অ্যাক্সেস নয়';
      }

      if (exception instanceof ForbiddenException) {
        errorCode = ERROR_CODES.FORBIDDEN;
        message = message || 'Forbidden access';
        messageBn = messageBn || 'নিষিদ্ধ অ্যাক্সেস';
      }

      if (exception instanceof NotFoundException) {
        errorCode = ERROR_CODES.NOT_FOUND;
        message = message || 'Resource not found';
        messageBn = messageBn || 'রিসোর্স পাওয়া যায়নি';
      }

      if (exception instanceof ConflictException) {
        errorCode = ERROR_CODES.CONFLICT;
        message = message || 'Resource conflict';
        messageBn = messageBn || 'রিসোর্স কনফ্লিক্ট';
      }

      if (exception instanceof InternalServerErrorException) {
        errorCode = ERROR_CODES.INTERNAL_SERVER_ERROR;
        message = message || 'Internal server error';
        messageBn = messageBn || 'সার্ভার ত্রুটি';
      }

      return {
        statusCode,
        errorCode,
        message,
        messageBn: messageBn || undefined,
        details: response.details || response.errors || undefined,
        stack: this.shouldShowStack() ? stack : undefined,
      };
    }

    // Handle unknown exceptions
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    const errorCode = ERROR_CODES.INTERNAL_SERVER_ERROR;
    const message = exception instanceof Error ? exception.message : 'Internal server error';

    return {
      statusCode,
      errorCode,
      message,
      messageBn: undefined,
      details: undefined,
      stack: this.shouldShowStack() ? stack : undefined,
    };
  }

  /**
   * Get default error code from HTTP status
   * Extended with LOCKED (423) and TOO_MANY_REQUESTS (429)
   */
  private getErrorCodeFromStatus(status: number): string {
    const statusMap: Record<number, string> = {
      [HttpStatus.BAD_REQUEST]: ERROR_CODES.BAD_REQUEST,
      [HttpStatus.UNAUTHORIZED]: ERROR_CODES.UNAUTHORIZED,
      [HttpStatus.FORBIDDEN]: ERROR_CODES.FORBIDDEN,
      [HttpStatus.NOT_FOUND]: ERROR_CODES.NOT_FOUND,
      [HttpStatus.CONFLICT]: ERROR_CODES.CONFLICT,
      [HttpStatus.UNPROCESSABLE_ENTITY]: ERROR_CODES.UNPROCESSABLE_ENTITY,
      [HTTP_STATUS.TOO_MANY_REQUESTS]: ERROR_CODES.TOO_MANY_REQUESTS,
      [HttpStatus.INTERNAL_SERVER_ERROR]: ERROR_CODES.INTERNAL_SERVER_ERROR,
      [HttpStatus.NOT_IMPLEMENTED]: ERROR_CODES.NOT_IMPLEMENTED,
      [HttpStatus.BAD_GATEWAY]: ERROR_CODES.BAD_GATEWAY,
      [HttpStatus.SERVICE_UNAVAILABLE]: ERROR_CODES.SERVICE_UNAVAILABLE,
      [HttpStatus.GATEWAY_TIMEOUT]: ERROR_CODES.GATEWAY_TIMEOUT,
      [HTTP_STATUS.LOCKED]: ERROR_CODES.ACCOUNT_LOCKED,
    };

    return statusMap[status] || ERROR_CODES.INTERNAL_SERVER_ERROR;
  }

  /**
   * Generate a unique request ID
   */
  private generateRequestId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `req_${timestamp}_${random}`;
  }

  /**
   * Log error with context using injected logger service
   */
  private logError(
    exception: unknown,
    requestId: string,
    path: string,
    method: string,
    statusCode: number,
    errorCode: string,
    stack?: string
  ): void {
    const isServerError = statusCode >= 500;
    const logMessage = `[${requestId}] ${method} ${path} - ${statusCode} ${errorCode}`;

    if (isServerError) {
      // Log as error with stack trace
      this.logger.error(
        logMessage,
        this.contextName,
        exception instanceof Error ? exception.stack : stack
      );
      
      // Additional debug details in development
      if (this.shouldShowStack() && exception instanceof Error) {
        this.logger.debug(`Exception details: ${exception.message}`, this.contextName);
      }
    } else {
      // Log as warning for client errors
      this.logger.warn(logMessage, this.contextName);
      
      // Log additional details for validation errors in development
      if (statusCode === HttpStatus.BAD_REQUEST && this.shouldShowStack()) {
        this.logger.debug(`Request validation failed: ${path}`, this.contextName);
      }
    }
  }

  /**
   * Check if stack trace should be shown
   */
  private shouldShowStack(): boolean {
    return env.NODE_ENV === 'development' || env.NODE_ENV === 'test';
  }

  /**
   * Sanitize error details for security
   */
  private sanitizeDetails(details: unknown): unknown {
    if (!details) return undefined;

    // In production, remove sensitive information
    if (env.NODE_ENV === 'production') {
      // If details is an object, remove sensitive fields
      if (typeof details === 'object' && details !== null) {
        const sanitized = { ...(details as Record<string, unknown>) };
        const sensitiveFields = ['password', 'token', 'secret', 'key', 'authorization', 'creditCard', 'cvv'];
        for (const field of sensitiveFields) {
          delete sanitized[field];
        }
        return sanitized;
      }
      // For arrays, sanitize each item
      if (Array.isArray(details)) {
        return details.map(item => this.sanitizeDetails(item));
      }
    }

    return details;
  }
}

// ============================================================
// Type Exports
// ============================================================

export { ERROR_CODES as HTTP_ERROR_CODES };
export type { ErrorResponse as HttpErrorResponse };
