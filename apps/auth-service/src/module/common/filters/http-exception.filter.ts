/**
 * HTTP Exception Filter - Enterprise Grade
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
 * 
 * @example
 * // In main.ts
 * app.useGlobalFilters(new HttpExceptionFilter());
 */

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { env } from '@vubon/shared-config';

// ============================================================
// Types
// ============================================================

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
    requestId?: string;
    timestamp: string;
    path?: string;
    method?: string;
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
// Error Code to Status Mapping
// ============================================================

const ERROR_TO_STATUS: Record<string, number> = {
  [ERROR_CODES.BAD_REQUEST]: HttpStatus.BAD_REQUEST,
  [ERROR_CODES.UNAUTHORIZED]: HttpStatus.UNAUTHORIZED,
  [ERROR_CODES.FORBIDDEN]: HttpStatus.FORBIDDEN,
  [ERROR_CODES.NOT_FOUND]: HttpStatus.NOT_FOUND,
  [ERROR_CODES.CONFLICT]: HttpStatus.CONFLICT,
  [ERROR_CODES.UNPROCESSABLE_ENTITY]: HttpStatus.UNPROCESSABLE_ENTITY,
  [ERROR_CODES.TOO_MANY_REQUESTS]: HttpStatus.TOO_MANY_REQUESTS,
  [ERROR_CODES.VALIDATION_ERROR]: HttpStatus.BAD_REQUEST,
  [ERROR_CODES.INTERNAL_SERVER_ERROR]: HttpStatus.INTERNAL_SERVER_ERROR,
  [ERROR_CODES.NOT_IMPLEMENTED]: HttpStatus.NOT_IMPLEMENTED,
  [ERROR_CODES.BAD_GATEWAY]: HttpStatus.BAD_GATEWAY,
  [ERROR_CODES.SERVICE_UNAVAILABLE]: HttpStatus.SERVICE_UNAVAILABLE,
  [ERROR_CODES.GATEWAY_TIMEOUT]: HttpStatus.GATEWAY_TIMEOUT,
  [ERROR_CODES.INSUFFICIENT_PERMISSIONS]: HttpStatus.FORBIDDEN,
  [ERROR_CODES.ACCOUNT_LOCKED]: HttpStatus.LOCKED,
  [ERROR_CODES.ACCOUNT_SUSPENDED]: HttpStatus.FORBIDDEN,
  [ERROR_CODES.INVALID_CREDENTIALS]: HttpStatus.UNAUTHORIZED,
  [ERROR_CODES.TOKEN_EXPIRED]: HttpStatus.UNAUTHORIZED,
  [ERROR_CODES.TOKEN_INVALID]: HttpStatus.UNAUTHORIZED,
  [ERROR_CODES.SESSION_EXPIRED]: HttpStatus.UNAUTHORIZED,
  [ERROR_CODES.MFA_REQUIRED]: HttpStatus.UNAUTHORIZED,
  [ERROR_CODES.MFA_FAILED]: HttpStatus.UNAUTHORIZED,
  [ERROR_CODES.EMAIL_NOT_VERIFIED]: HttpStatus.FORBIDDEN,
  [ERROR_CODES.PHONE_NOT_VERIFIED]: HttpStatus.FORBIDDEN,
  [ERROR_CODES.RESOURCE_NOT_FOUND]: HttpStatus.NOT_FOUND,
  [ERROR_CODES.RESOURCE_ALREADY_EXISTS]: HttpStatus.CONFLICT,
  [ERROR_CODES.BUSINESS_RULE_VIOLATION]: HttpStatus.UNPROCESSABLE_ENTITY,
};

// ============================================================
// Filter Implementation
// ============================================================

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const requestId = (request as any).id || this.generateRequestId();
    const path = request.url;
    const method = request.method;

    // Determine error details
    const { statusCode, errorCode, message, messageBn, details, stack } =
      this.parseException(exception);

    // Log error (with stack in development)
    this.logError(exception, requestId, path, method, statusCode, errorCode);

    // Build error response
    const errorResponse: ErrorResponse = {
      success: false,
      error: {
        code: errorCode,
        message,
        messageBn,
        details: this.sanitizeDetails(details),
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
      let messageBn = response.messageBn;

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
        messageBn,
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
      stack: this.shouldShowStack() ? stack : undefined,
    };
  }

  /**
   * Get default error code from HTTP status
   */
  private getErrorCodeFromStatus(status: number): string {
    const statusMap: Record<number, string> = {
      [HttpStatus.BAD_REQUEST]: ERROR_CODES.BAD_REQUEST,
      [HttpStatus.UNAUTHORIZED]: ERROR_CODES.UNAUTHORIZED,
      [HttpStatus.FORBIDDEN]: ERROR_CODES.FORBIDDEN,
      [HttpStatus.NOT_FOUND]: ERROR_CODES.NOT_FOUND,
      [HttpStatus.CONFLICT]: ERROR_CODES.CONFLICT,
      [HttpStatus.UNPROCESSABLE_ENTITY]: ERROR_CODES.UNPROCESSABLE_ENTITY,
      [HttpStatus.TOO_MANY_REQUESTS]: ERROR_CODES.TOO_MANY_REQUESTS,
      [HttpStatus.INTERNAL_SERVER_ERROR]: ERROR_CODES.INTERNAL_SERVER_ERROR,
      [HttpStatus.NOT_IMPLEMENTED]: ERROR_CODES.NOT_IMPLEMENTED,
      [HttpStatus.BAD_GATEWAY]: ERROR_CODES.BAD_GATEWAY,
      [HttpStatus.SERVICE_UNAVAILABLE]: ERROR_CODES.SERVICE_UNAVAILABLE,
      [HttpStatus.GATEWAY_TIMEOUT]: ERROR_CODES.GATEWAY_TIMEOUT,
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
   * Log error with context
   */
  private logError(
    exception: unknown,
    requestId: string,
    path: string,
    method: string,
    statusCode: number,
    errorCode: string
  ): void {
    const isServerError = statusCode >= 500;

    if (isServerError) {
      this.logger.error({
        message: `[${requestId}] ${method} ${path} - ${statusCode} ${errorCode}`,
        error: exception,
        requestId,
        path,
        method,
        statusCode,
        errorCode,
      });
    } else {
      this.logger.warn({
        message: `[${requestId}] ${method} ${path} - ${statusCode} ${errorCode}`,
        requestId,
        path,
        method,
        statusCode,
        errorCode,
      });
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
        const sensitiveFields = ['password', 'token', 'secret', 'key', 'authorization'];
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
