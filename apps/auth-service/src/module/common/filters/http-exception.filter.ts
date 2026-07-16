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
 * ✅ Custom domain error mapping (DDD)
 * ✅ Security-aware (hides sensitive info in production)
 * ✅ Multi-language error messages (English/Bengali)
 * ✅ Extended HTTP status codes (423, 429, 451)
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
// Import Domain Errors
// ============================================================

import {
  EntityNotFoundError,
  EntityValidationError,
  EntityConflictError,
  EntityAlreadyDeletedError,
  InvalidIdFormatError,
} from '../../domain/entities/base.entity';
import {
  ValidationError as DomainValidationError,
  ConnectionAwareValidationError,
} from '../../domain/value-objects/base.vo';
import {
  OptimisticLockError,
  DuplicateEntityError,
} from '../../domain/repositories/base.repository.interface';

// ============================================================
// Types
// ============================================================

export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    messageBn: string | undefined;
    details: unknown;
    stack: string | undefined;
    requestId: string | undefined;
    timestamp: string;
    path: string | undefined;
    method: string | undefined;
    statusCode: number;
  };
}

export interface ErrorCodeMapping {
  code: string;
  message: string;
  messageBn?: string;
  statusCode: number;
}

// ============================================================
// Extended HTTP Status Codes
// ============================================================

export const HTTP_STATUS = {
  ...HttpStatus,
  LOCKED: 423,
  TOO_MANY_REQUESTS: 429,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
} as const;

// ============================================================
// Error Code Definitions
// ============================================================

export const ERROR_CODES = {
  BAD_REQUEST: 'BAD_REQUEST',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  UNPROCESSABLE_ENTITY: 'UNPROCESSABLE_ENTITY',
  TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  NOT_IMPLEMENTED: 'NOT_IMPLEMENTED',
  BAD_GATEWAY: 'BAD_GATEWAY',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  GATEWAY_TIMEOUT: 'GATEWAY_TIMEOUT',
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
  ENTITY_NOT_FOUND: 'ENTITY_NOT_FOUND',
  ENTITY_VALIDATION_FAILED: 'ENTITY_VALIDATION_FAILED',
  ENTITY_CONFLICT: 'ENTITY_CONFLICT',
  ENTITY_ALREADY_DELETED: 'ENTITY_ALREADY_DELETED',
  INVALID_ID_FORMAT: 'INVALID_ID_FORMAT',
  OPTIMISTIC_LOCK_ERROR: 'OPTIMISTIC_LOCK_ERROR',
  DUPLICATE_ENTITY: 'DUPLICATE_ENTITY',
  CONNECTION_AWARE_ERROR: 'CONNECTION_AWARE_ERROR',
} as const;

// ============================================================
// Domain Error Mappings
// ============================================================

const DOMAIN_ERROR_STATUS_MAP = new Map<Function, number>([
  [EntityNotFoundError, HttpStatus.NOT_FOUND],
  [EntityValidationError, HttpStatus.BAD_REQUEST],
  [EntityConflictError, HttpStatus.CONFLICT],
  [EntityAlreadyDeletedError, HttpStatus.CONFLICT],
  [InvalidIdFormatError, HttpStatus.BAD_REQUEST],
  [DomainValidationError, HttpStatus.BAD_REQUEST],
  [ConnectionAwareValidationError, HttpStatus.BAD_GATEWAY],
  [OptimisticLockError, HttpStatus.CONFLICT],
  [DuplicateEntityError, HttpStatus.CONFLICT],
]);

const DOMAIN_ERROR_CODE_MAP = new Map<Function, string>([
  [EntityNotFoundError, ERROR_CODES.ENTITY_NOT_FOUND],
  [EntityValidationError, ERROR_CODES.ENTITY_VALIDATION_FAILED],
  [EntityConflictError, ERROR_CODES.ENTITY_CONFLICT],
  [EntityAlreadyDeletedError, ERROR_CODES.ENTITY_ALREADY_DELETED],
  [InvalidIdFormatError, ERROR_CODES.INVALID_ID_FORMAT],
  [DomainValidationError, ERROR_CODES.VALIDATION_ERROR],
  [ConnectionAwareValidationError, ERROR_CODES.CONNECTION_AWARE_ERROR],
  [OptimisticLockError, ERROR_CODES.OPTIMISTIC_LOCK_ERROR],
  [DuplicateEntityError, ERROR_CODES.DUPLICATE_ENTITY],
]);

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

    const { statusCode, errorCode, message, messageBn, details, stack } =
      this.parseException(exception);

    this.logError(exception, requestId, path, method, statusCode, errorCode);

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

    response.status(statusCode).json(errorResponse);
  }

  // ============================================================
  // Private Methods
  // ============================================================

  private parseException(exception: unknown): {
    statusCode: number;
    errorCode: string;
    message: string;
    messageBn: string | undefined;
    details: unknown;
    stack: string | undefined;
  } {
    const stack = exception instanceof Error ? exception.stack : undefined;

    if (exception instanceof Error) {
      const domainErrorResult = this.handleDomainError(exception);
      if (domainErrorResult) {
        return {
          ...domainErrorResult,
          stack: this.shouldShowStack() ? stack : undefined,
        };
      }
    }

    if (exception instanceof HttpException) {
      return this.handleHttpException(exception, stack);
    }

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

  private handleDomainError(error: Error): {
    statusCode: number;
    errorCode: string;
    message: string;
    messageBn: string | undefined;
    details: unknown;
  } | null {
    const errorConstructor = error.constructor;

    const statusCode = DOMAIN_ERROR_STATUS_MAP.get(errorConstructor);
    const errorCode = DOMAIN_ERROR_CODE_MAP.get(errorConstructor);

    if (!statusCode || !errorCode) {
      return null;
    }

    let details: unknown = undefined;
    let message = error.message;
    let messageBn: string | undefined = undefined;

    // EntityNotFoundError - এখন প্রপার্টি এক্সেস করা যাবে
    if (error instanceof EntityNotFoundError) {
      details = {
        entityType: error.entityName, // entityName প্রপার্টি ব্যবহার করুন
        entityId: error.entityId,
      };
      messageBn = `${error.entityName} খুঁজে পাওয়া যায়নি`;
    }

    // EntityValidationError
    if (error instanceof EntityValidationError) {
      details = {
        errors: error.errors,
        entityName: error.entityName,
      };
      messageBn = 'এন্টিটি ভ্যালিডেশন ব্যর্থ হয়েছে';
    }

    // EntityConflictError
    if (error instanceof EntityConflictError) {
      details = {
        entityName: error.entityName,
        entityId: error.entityId,
        expectedVersion: error.expectedVersion,
        actualVersion: error.actualVersion,
      };
      messageBn = 'এন্টিটি ভার্সন কনফ্লিক্ট';
    }

    // EntityAlreadyDeletedError
    if (error instanceof EntityAlreadyDeletedError) {
      details = {
        entityName: error.entityName,
        entityId: error.entityId,
      };
      messageBn = 'এন্টিটি ইতিমধ্যে ডিলিট করা হয়েছে';
    }

    // InvalidIdFormatError
    if (error instanceof InvalidIdFormatError) {
      details = {
        id: error.id,
        expectedFormat: error.expectedFormat,
      };
      messageBn = 'আইডি ফরম্যেট সঠিক নয়';
    }

    // OptimisticLockError
    if (error instanceof OptimisticLockError) {
      details = {
        entityId: error.entityId,
        expectedVersion: error.expectedVersion,
        actualVersion: error.actualVersion,
      };
      messageBn = 'অপটিমিস্টিক লক ব্যর্থ হয়েছে';
    }

    // DuplicateEntityError
    if (error instanceof DuplicateEntityError) {
      details = {
        entityType: error.entityType,
        field: error.field,
        value: error.value,
      };
      messageBn = `${error.entityType} ইতিমধ্যে বিদ্যমান`;
    }

    // ConnectionAwareValidationError
    if (error instanceof ConnectionAwareValidationError) {
      details = {
        originalError: error.originalError?.message,
      };
      messageBn = 'বাহ্যিক ভ্যালিডেশন ব্যর্থ হয়েছে';
    }

    return {
      statusCode,
      errorCode,
      message,
      messageBn,
      details,
    };
  }

  private handleHttpException(
    exception: HttpException,
    stack: string | undefined,
  ): {
    statusCode: number;
    errorCode: string;
    message: string;
    messageBn: string | undefined;
    details: unknown;
    stack: string | undefined;
  } {
    const statusCode = exception.getStatus();
    const response = exception.getResponse() as any;

    let errorCode = this.getErrorCodeFromStatus(statusCode);
    let message = response.message || exception.message || 'An error occurred';
    let messageBn: string | undefined = response.messageBn;

    if (exception instanceof BadRequestException) {
      errorCode = ERROR_CODES.VALIDATION_ERROR;
      if (Array.isArray(response.message)) {
        message = 'Validation failed';
        messageBn = 'ভ্যালিডেশন ব্যর্থ হয়েছে';
      }
    }

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
      // ডুপ্লিকেট কী সরানো হয়েছে - শুধুমাত্র একবার TOO_MANY_REQUESTS ব্যবহার করুন
      [HTTP_STATUS.LOCKED]: ERROR_CODES.ACCOUNT_LOCKED,
      [HTTP_STATUS.UNAVAILABLE_FOR_LEGAL_REASONS]: ERROR_CODES.FORBIDDEN,
    };

    return statusMap[status] || ERROR_CODES.INTERNAL_SERVER_ERROR;
  }

  private generateRequestId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `req_${timestamp}_${random}`;
  }

  private logError(
    exception: unknown,
    requestId: string,
    path: string,
    method: string,
    statusCode: number,
    errorCode: string,
  ): void {
    const isServerError = statusCode >= 500;

    const logData = {
      message: `[${requestId}] ${method} ${path} - ${statusCode} ${errorCode}`,
      requestId,
      path,
      method,
      statusCode,
      errorCode,
    };

    if (isServerError) {
      this.logger.error({ ...logData, error: exception });
    } else {
      this.logger.warn(logData);
    }
  }

  private shouldShowStack(): boolean {
    return env.NODE_ENV === 'development' || env.NODE_ENV === 'test';
  }

  private sanitizeDetails(details: unknown): unknown {
    if (!details) return undefined;

    if (env.NODE_ENV === 'production') {
      if (typeof details === 'object' && details !== null) {
        const sanitized = { ...(details as Record<string, unknown>) };
        const sensitiveFields = ['password', 'token', 'secret', 'key', 'authorization'];
        for (const field of sensitiveFields) {
          delete sanitized[field];
        }
        return sanitized;
      }
      if (Array.isArray(details)) {
        return details.map((item) => this.sanitizeDetails(item));
      }
    }

    return details;
  }
}

export { ERROR_CODES as HTTP_ERROR_CODES };
export type { ErrorResponse as HttpErrorResponse };
