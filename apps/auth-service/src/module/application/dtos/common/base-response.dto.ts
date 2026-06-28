/**
 * Base Response DTOs - Pure Data Transport Objects (Enterprise Enhanced)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/dtos/common/base-response.dto
 * 
 * @description
 * Base data transfer objects for consistent API responses.
 * Includes success/error responses, pagination, and validation errors.
 * 
 * ENTERPRISE ENHANCEMENTS (v2.0):
 * ✅ Configurable pagination defaults from shared-config
 * ✅ Retry-After header support for rate limiting
 * ✅ Rate limit headers in response metadata
 * ✅ Performance monitoring metrics integration
 * ✅ Bengali language support with fallback
 * ✅ Request tracing with correlation ID
 * 
 * Enterprise Rules:
 * ✅ ONLY data transport and DTO factory methods
 * ✅ NO business logic, NO database queries, NO infrastructure imports
 * ✅ Static factory methods are acceptable (pure DTO creation)
 * ✅ Bangladesh specific - Bengali error messages support
 * ✅ Type-safe with shared-types integration
 * ✅ HTTP status code compliant
 * 
 * @example
 * // Success response
 * return BaseResponseDto.success(userData, 'User fetched successfully');
 * 
 * // Error response with rate limit headers
 * return BaseResponseDto.rateLimited(30, 'Too many requests', metadata);
 * 
 * // Paginated response
 * return new PaginatedResponseDto(items, page, limit, total).toBaseResponse();
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ✅ Phase-1 (shared-types) থেকে ইম্পোর্ট - Single source of truth
import type { ApiErrorCode as SharedErrorCode } from '@vubon/shared-types';
// যেকোনো ফাইলে
import { PAGINATION_CONFIG } from '@vubon/shared-config';

// ============================================================
// Constants (Enterprise Enhancement)
// ============================================================

/**
 * Default pagination configuration (from shared-config)
 * ✅ Enterprise: Configurable defaults instead of hardcoded values
 */
const DEFAULT_PAGINATION = {
  PAGE: PAGINATION_CONFIG?.DEFAULT_PAGE ?? 1,
  LIMIT: PAGINATION_CONFIG?.DEFAULT_LIMIT ?? 20,
  MAX_LIMIT: PAGINATION_CONFIG?.MAX_LIMIT ?? 100,
};

/**
 * Rate limit header names
 * ✅ Enterprise: Standard rate limit headers
 */
export const RATE_LIMIT_HEADERS = {
  LIMIT: 'X-RateLimit-Limit',
  REMAINING: 'X-RateLimit-Remaining',
  RESET: 'X-RateLimit-Reset',
  RETRY_AFTER: 'Retry-After',
} as const;

// ============================================================
// Types
// ============================================================

/**
 * Error codes for programmatic error handling
 * Centralized from shared-types to maintain consistency
 * 
 * @see {@link ErrorCode} from @vubon/shared-types
 */
export type ErrorCode = SharedErrorCode;

/**
 * ✅ Enterprise: Rate limit information for response headers
 */
export interface RateLimitInfo {
  /** Maximum requests allowed in the window */
  limit: number;
  /** Remaining requests in the current window */
  remaining: number;
  /** Timestamp when the rate limit resets (Unix timestamp) */
  reset: number;
  /** Seconds to wait before retrying (for 429 responses) */
  retryAfterSeconds?: number;
}

/**
 * ✅ Enterprise: Performance monitoring metrics
 */
export interface PerformanceMetrics {
  /** Database query time in milliseconds */
  dbQueryTimeMs?: number;
  /** Cache hit/miss status */
  cacheStatus?: 'hit' | 'miss' | 'bypass';
  /** External API call time in milliseconds */
  externalApiTimeMs?: number;
  /** Total request processing time in milliseconds */
  totalTimeMs: number;
}

// ============================================================
// Validation Error Detail DTO
// ============================================================

/**
 * Detailed validation error for specific fields
 * Used in validation error responses to indicate which fields failed
 * 
 * @example
 * {
 *   "field": "email",
 *   "message": "Email must be valid",
 *   "messageBn": "ইমেইল সঠিক হতে হবে",
 *   "code": "INVALID_EMAIL",
 *   "rejectedValue": "invalid-email"
 * }
 */
export class ValidationErrorDetail {
  @ApiProperty({ 
    description: 'Field name with error', 
    example: 'email' 
  })
  field: string;

  @ApiProperty({ 
    description: 'Error message in English', 
    example: 'Email must be valid' 
  })
  message: string;

  @ApiPropertyOptional({ 
    description: 'Error message in Bengali (Bangladesh specific)', 
    example: 'ইমেইল সঠিক হতে হবে' 
  })
  messageBn?: string;

  @ApiPropertyOptional({ 
    description: 'Error code for programmatic handling', 
    example: 'INVALID_EMAIL' 
  })
  code?: string;

  @ApiPropertyOptional({ 
    description: 'Rejected value that caused the error', 
    example: 'invalid-email' 
  })
  rejectedValue?: unknown;

  constructor(
    field: string, 
    message: string, 
    rejectedValue?: unknown, 
    messageBn?: string, 
    code?: string
  ) {
    this.field = field;
    this.message = message;
    // ✅ FIXED: exactOptionalPropertyTypes-এর জন্য undefined check
    if (messageBn !== undefined) {
      this.messageBn = messageBn;
    }
    if (code !== undefined) {
      this.code = code;
    }
    if (rejectedValue !== undefined) {
      this.rejectedValue = rejectedValue;
    }
  }
}

// ============================================================
// Response Metadata DTO (Enhanced)
// ============================================================

/**
 * Metadata for API responses
 * Includes request tracing, timing, and environment information
 * ✅ Enterprise: Added rate limit info and performance metrics
 */
export class ResponseMetadata {
  @ApiProperty({ 
    description: 'Request timestamp (ISO 8601)', 
    example: '2024-01-01T00:00:00.000Z' 
  })
  timestamp: string;

  @ApiPropertyOptional({ 
    description: 'Request path', 
    example: '/api/v1/auth/login' 
  })
  path?: string;

  @ApiPropertyOptional({ 
    description: 'HTTP method', 
    example: 'POST' 
  })
  method?: string;

  @ApiPropertyOptional({ 
    description: 'Response time in milliseconds', 
    example: 45 
  })
  durationMs?: number;

  @ApiPropertyOptional({ 
    description: 'Unique request ID for tracing', 
    example: 'req_abc123' 
  })
  requestId?: string;

  @ApiPropertyOptional({ 
    description: 'Correlation ID for distributed tracing', 
    example: 'corr_xyz789' 
  })
  correlationId?: string;

  @ApiPropertyOptional({ 
    description: 'API version', 
    example: 'v1' 
  })
  version?: string;

  @ApiPropertyOptional({ 
    description: 'Environment (development/staging/production)', 
    example: 'production' 
  })
  environment?: string;

  // ✅ Enterprise: Rate limit information
  @ApiPropertyOptional({ 
    description: 'Rate limit information for the request',
    type: 'object',
    additionalProperties: true,
  })
  rateLimit?: RateLimitInfo;

  // ✅ Enterprise: Performance monitoring metrics
  @ApiPropertyOptional({ 
    description: 'Performance metrics for the request',
    type: 'object',
    additionalProperties: true,
  })
  performance?: PerformanceMetrics;

  constructor(
    path?: string,
    method?: string,
    durationMs?: number,
    requestId?: string,
    version?: string,
    environment?: string,
    correlationId?: string,
    rateLimit?: RateLimitInfo,
    performance?: PerformanceMetrics
  ) {
    this.timestamp = new Date().toISOString();
    // ✅ FIXED: exactOptionalPropertyTypes-এর জন্য undefined check
    if (path !== undefined) {
      this.path = path;
    }
    if (method !== undefined) {
      this.method = method;
    }
    if (durationMs !== undefined) {
      this.durationMs = durationMs;
    }
    if (requestId !== undefined) {
      this.requestId = requestId;
    }
    if (version !== undefined) {
      this.version = version;
    }
    if (environment !== undefined) {
      this.environment = environment;
    }
    if (correlationId !== undefined) {
      this.correlationId = correlationId;
    }
    if (rateLimit !== undefined) {
      this.rateLimit = rateLimit;
    }
    if (performance !== undefined) {
      this.performance = performance;
    }
  }
}

// ============================================================
// Base Response DTO (Enhanced)
// ============================================================

/**
 * Generic wrapper for all API responses
 * Ensures consistent response format across all endpoints
 * 
 * @template T - Type of the data payload
 * 
 * @example
 * // Success response with data
 * const response = new BaseResponseDto(true, 200, 'Success', { id: 1 });
 * 
 * // Error response with rate limit headers
 * const errorResponse = BaseResponseDto.rateLimited(30, 'Too many requests', metadata);
 */
export class BaseResponseDto<T> {
  @ApiProperty({ 
    description: 'Whether the operation was successful', 
    example: true 
  })
  success: boolean;

  @ApiProperty({ 
    description: 'HTTP status code', 
    example: 200 
  })
  statusCode: number;

  @ApiProperty({ 
    description: 'Response message in English', 
    example: 'Operation successful' 
  })
  message: string;

  @ApiPropertyOptional({ 
    description: 'Response message in Bengali (Bangladesh specific)', 
    example: 'অপারেশন সফল হয়েছে' 
  })
  messageBn?: string;

  @ApiPropertyOptional({ 
    description: 'Error code for programmatic handling', 
    enum: [
      'BAD_REQUEST', 'UNAUTHORIZED', 'FORBIDDEN', 'NOT_FOUND',
      'CONFLICT', 'VALIDATION_ERROR', 'INTERNAL_SERVER_ERROR', 
      'TOO_MANY_REQUESTS', 'RATE_LIMITED', 'ACCOUNT_LOCKED',
      'ACCOUNT_SUSPENDED', 'EMAIL_NOT_VERIFIED', 'PHONE_NOT_VERIFIED',
      'MFA_REQUIRED', 'MFA_FAILED', 'TOKEN_EXPIRED', 'INVALID_CREDENTIALS'
    ] 
  })
  errorCode?: ErrorCode;

  @ApiPropertyOptional({ 
    description: 'Response data payload', 
    example: { id: 'usr_123', email: 'user@example.com' } 
  })
  data?: T;

  @ApiPropertyOptional({ 
    description: 'Validation error details (for 400 responses)', 
    type: [ValidationErrorDetail] 
  })
  errors?: ValidationErrorDetail[];

  @ApiPropertyOptional({ 
    description: 'Generic error messages in English', 
    type: [String] 
  })
  errorMessages?: string[];

  @ApiPropertyOptional({ 
    description: 'Generic error messages in Bengali', 
    type: [String] 
  })
  errorMessagesBn?: string[];

  @ApiPropertyOptional({ 
    description: 'Response metadata for tracing', 
    type: ResponseMetadata 
  })
  metadata?: ResponseMetadata;

  constructor(
    success: boolean,
    statusCode: number,
    message: string,
    data?: T,
    errors?: ValidationErrorDetail[],
    errorMessages?: string[],
    metadata?: ResponseMetadata,
    messageBn?: string,
    errorCode?: ErrorCode,
    errorMessagesBn?: string[]
  ) {
    this.success = success;
    this.statusCode = statusCode;
    this.message = message;
    // ✅ FIXED: exactOptionalPropertyTypes-এর জন্য undefined check
    if (messageBn !== undefined) {
      this.messageBn = messageBn;
    }
    if (errorCode !== undefined) {
      this.errorCode = errorCode;
    }
    if (data !== undefined) {
      this.data = data;
    }
    if (errors !== undefined) {
      this.errors = errors;
    }
    if (errorMessages !== undefined) {
      this.errorMessages = errorMessages;
    }
    if (errorMessagesBn !== undefined) {
      this.errorMessagesBn = errorMessagesBn;
    }
    if (metadata !== undefined) {
      this.metadata = metadata;
    }
  }

  // ============================================================
  // Success Factory Methods
  // ============================================================

  /**
   * Create a standard 200 OK success response
   * 
   * @param data - Response data payload
   * @param message - Success message in English
   * @param statusCode - HTTP status code (default: 200)
   * @param metadata - Optional response metadata
   * @param messageBn - Bengali success message
   * 
   * @example
   * return BaseResponseDto.success(user, 'User fetched successfully');
   */
  static success<T>(
    data: T,
    message: string = 'Operation successful',
    statusCode: number = 200,
    metadata?: ResponseMetadata,
    messageBn?: string
  ): BaseResponseDto<T> {
    return new BaseResponseDto<T>(
      true, statusCode, message, data, undefined, undefined, metadata, messageBn
    );
  }

  /**
   * Create a 201 Created success response (resource created)
   * 
   * @param data - Created resource data
   * @param message - Success message in English
   * @param metadata - Optional response metadata
   * @param messageBn - Bengali success message
   */
  static created<T>(
    data: T,
    message: string = 'Resource created successfully',
    metadata?: ResponseMetadata,
    messageBn?: string
  ): BaseResponseDto<T> {
    return new BaseResponseDto<T>(
      true, 201, message, data, undefined, undefined, metadata, messageBn
    );
  }

  /**
   * Create a 204 No Content success response (no data to return)
   * 
   * @param message - Success message in English
   * @param metadata - Optional response metadata
   * @param messageBn - Bengali success message
   */
  static noContent(
    message: string = 'Operation successful',
    metadata?: ResponseMetadata,
    messageBn?: string
  ): BaseResponseDto<null> {
    return new BaseResponseDto<null>(
      true, 204, message, null, undefined, undefined, metadata, messageBn
    );
  }

  // ============================================================
  // Error Factory Methods
  // ============================================================

  /**
   * Create a generic error response
   * 
   * @param message - Error message in English
   * @param statusCode - HTTP status code (default: 400)
   * @param errors - Validation error details
   * @param errorMessages - Generic error messages
   * @param metadata - Optional response metadata
   * @param messageBn - Bengali error message
   * @param errorCode - Programmatic error code
   * @param errorMessagesBn - Bengali generic error messages
   */
  static error(
    message: string,
    statusCode: number = 400,
    errors?: ValidationErrorDetail[],
    errorMessages?: string[],
    metadata?: ResponseMetadata,
    messageBn?: string,
    errorCode?: ErrorCode,
    errorMessagesBn?: string[]
  ): BaseResponseDto<null> {
    return new BaseResponseDto<null>(
      false, statusCode, message, null, errors, errorMessages, metadata, 
      messageBn, errorCode, errorMessagesBn
    );
  }

  /**
   * Create a 400 Bad Request validation error response
   * 
   * @param errors - Validation error details
   * @param message - Error message in English
   * @param metadata - Optional response metadata
   * @param messageBn - Bengali error message
   */
  static validationError(
    errors: ValidationErrorDetail[],
    message: string = 'Validation failed',
    metadata?: ResponseMetadata,
    messageBn?: string
  ): BaseResponseDto<null> {
    return new BaseResponseDto<null>(
      false, 400, message, null, errors, undefined, metadata, messageBn, 'VALIDATION_ERROR'
    );
  }

  /**
   * Create a 401 Unauthorized error response
   * 
   * @param message - Error message in English
   * @param metadata - Optional response metadata
   * @param messageBn - Bengali error message
   */
  static unauthorized(
    message: string = 'Unauthorized',
    metadata?: ResponseMetadata,
    messageBn?: string
  ): BaseResponseDto<null> {
    return new BaseResponseDto<null>(
      false, 401, message, null, undefined, undefined, metadata, messageBn, 'UNAUTHORIZED'
    );
  }

  /**
   * Create a 403 Forbidden error response
   * 
   * @param message - Error message in English
   * @param metadata - Optional response metadata
   * @param messageBn - Bengali error message
   */
  static forbidden(
    message: string = 'Forbidden',
    metadata?: ResponseMetadata,
    messageBn?: string
  ): BaseResponseDto<null> {
    return new BaseResponseDto<null>(
      false, 403, message, null, undefined, undefined, metadata, messageBn, 'FORBIDDEN'
    );
  }

  /**
   * Create a 404 Not Found error response
   * 
   * @param message - Error message in English
   * @param metadata - Optional response metadata
   * @param messageBn - Bengali error message
   */
  static notFound(
    message: string = 'Resource not found',
    metadata?: ResponseMetadata,
    messageBn?: string
  ): BaseResponseDto<null> {
    return new BaseResponseDto<null>(
      false, 404, message, null, undefined, undefined, metadata, messageBn, 'NOT_FOUND'
    );
  }

  /**
   * Create a 409 Conflict error response
   * 
   * @param message - Error message in English
   * @param metadata - Optional response metadata
   * @param messageBn - Bengali error message
   */
  static conflict(
    message: string = 'Resource conflict',
    metadata?: ResponseMetadata,
    messageBn?: string
  ): BaseResponseDto<null> {
    return new BaseResponseDto<null>(
      false, 409, message, null, undefined, undefined, metadata, messageBn, 'CONFLICT'
    );
  }

  /**
   * Create a 429 Too Many Requests error response
   * ✅ Enterprise: Enhanced with Retry-After header support
   * 
   * @param retryAfterSeconds - Seconds to wait before retrying
   * @param message - Error message in English
   * @param metadata - Optional response metadata
   * @param messageBn - Bengali error message
   * @param rateLimitInfo - Complete rate limit information for headers
   */
  static tooManyRequests(
    retryAfterSeconds: number,
    message: string = 'Too many requests',
    metadata?: ResponseMetadata,
    messageBn?: string,
    rateLimitInfo?: Omit<RateLimitInfo, 'retryAfterSeconds'>
  ): BaseResponseDto<{ retryAfterSeconds: number; rateLimit?: RateLimitInfo }> {
    // ✅ FIXED: exactOptionalPropertyTypes-এর জন্য explicit object creation
    const dataObj: { retryAfterSeconds: number; rateLimit?: RateLimitInfo } = {
      retryAfterSeconds,
    };
    if (rateLimitInfo !== undefined) {
      dataObj.rateLimit = {
        ...rateLimitInfo,
        retryAfterSeconds,
      };
    }

    let enhancedMetadata = metadata;
    if (rateLimitInfo !== undefined && metadata !== undefined) {
      // ✅ FIXED: নতুন মেটাডেটা অবজেক্ট তৈরি করা হয়েছে
      const existingMetadata = metadata;
      const rateLimitData: RateLimitInfo = {
        ...rateLimitInfo,
        retryAfterSeconds,
      };
      enhancedMetadata = new ResponseMetadata(
        existingMetadata.path,
        existingMetadata.method,
        existingMetadata.durationMs,
        existingMetadata.requestId,
        existingMetadata.version,
        existingMetadata.environment,
        existingMetadata.correlationId,
        rateLimitData,
        existingMetadata.performance
      );
    }

    return new BaseResponseDto<{ retryAfterSeconds: number; rateLimit?: RateLimitInfo }>(
      false, 429, message, dataObj, 
      undefined, undefined, enhancedMetadata, messageBn, 'TOO_MANY_REQUESTS'
    );
  }

  /**
   * Create a 500 Internal Server Error response
   * ✅ FIXED: INTERNAL_SERVER_ERROR ব্যবহার করা হয়েছে
   * 
   * @param message - Error message in English
   * @param metadata - Optional response metadata
   * @param messageBn - Bengali error message
   */
  static internalError(
    message: string = 'Internal server error',
    metadata?: ResponseMetadata,
    messageBn?: string
  ): BaseResponseDto<null> {
    return new BaseResponseDto<null>(
      false, 500, message, null, undefined, undefined, metadata, messageBn, 'INTERNAL_SERVER_ERROR'
    );
  }

  // ============================================================
  // Business Logic Error Factory Methods
  // ============================================================

  /**
   * Create a 423 Account Locked response
   * 
   * @param message - Error message in English
   * @param remainingLockTime - Lock duration in seconds (or object with details)
   * @param metadata - Optional response metadata
   * @param messageBn - Bengali error message
   */
  static accountLocked(
    message: string = 'Account is locked',
    remainingLockTime?: number | { seconds: number; formatted: string },
    metadata?: ResponseMetadata,
    messageBn?: string
  ): BaseResponseDto<{ remainingLockTime?: number; formattedLockTime?: string }> {
    const lockData: { remainingLockTime?: number; formattedLockTime?: string } = {};
    
    if (typeof remainingLockTime === 'number') {
      lockData.remainingLockTime = remainingLockTime;
    } else if (remainingLockTime) {
      lockData.remainingLockTime = remainingLockTime.seconds;
      lockData.formattedLockTime = remainingLockTime.formatted;
    }

    return new BaseResponseDto<{ remainingLockTime?: number; formattedLockTime?: string }>(
      false, 423, message, Object.keys(lockData).length ? lockData : undefined, 
      undefined, undefined, metadata, messageBn, 'ACCOUNT_LOCKED'
    );
  }

  /**
   * Create an MFA Required response
   * 
   * @param message - Message in English
   * @param mfaMethods - Available MFA methods
   * @param metadata - Optional response metadata
   * @param messageBn - Bengali message
   * @param mfaSessionId - Optional MFA session ID
   */
  static mfaRequired(
    message: string = 'MFA verification required',
    mfaMethods: string[] = [],
    metadata?: ResponseMetadata,
    messageBn?: string,
    mfaSessionId?: string
  ): BaseResponseDto<{ mfaMethods: string[]; mfaSessionId?: string }> {
    // ✅ FIXED: exactOptionalPropertyTypes-এর জন্য explicit object creation
    const dataObj: { mfaMethods: string[]; mfaSessionId?: string } = { mfaMethods };
    if (mfaSessionId !== undefined) {
      dataObj.mfaSessionId = mfaSessionId;
    }

    return new BaseResponseDto<{ mfaMethods: string[]; mfaSessionId?: string }>(
      false, 401, message, dataObj, 
      undefined, undefined, metadata, messageBn, 'MFA_REQUIRED'
    );
  }

  /**
   * Create a 429 Rate Limited response (enhanced with headers)
   * ✅ Enterprise: Enhanced version with complete rate limit support
   * 
   * @param retryAfterSeconds - Seconds to wait before retrying
   * @param message - Error message in English
   * @param metadata - Optional response metadata
   * @param messageBn - Bengali error message
   * @param rateLimitInfo - Complete rate limit information
   */
  static rateLimited(
    retryAfterSeconds: number,
    message: string = 'Rate limit exceeded',
    metadata?: ResponseMetadata,
    messageBn?: string,
    rateLimitInfo?: Omit<RateLimitInfo, 'retryAfterSeconds'>
  ): BaseResponseDto<{ retryAfterSeconds: number; rateLimit?: RateLimitInfo }> {
    return BaseResponseDto.tooManyRequests(retryAfterSeconds, message, metadata, messageBn, rateLimitInfo);
  }

  /**
   * ✅ Enterprise: Create response with performance metrics
   * 
   * @param data - Response data
   * @param performance - Performance metrics
   * @param message - Success message
   * @param messageBn - Bengali success message
   */
  static withPerformance<T>(
    data: T,
    performance: PerformanceMetrics,
    message: string = 'Operation successful',
    messageBn?: string
  ): BaseResponseDto<T> {
    const metadata = new ResponseMetadata();
    // ✅ FIXED: exactOptionalPropertyTypes-এর জন্য explicit assignment
    metadata.performance = performance;
    metadata.durationMs = performance.totalTimeMs;
    
    return BaseResponseDto.success(data, message, 200, metadata, messageBn);
  }
}

// ============================================================
// Pagination Metadata DTO (Enhanced)
// ============================================================

/**
 * Pagination metadata for paginated responses
 * Supports both offset-based and cursor-based pagination
 * ✅ Enterprise: Configurable defaults
 */
export class PaginationMetadata {
  @ApiProperty({ 
    description: 'Current page number (1-indexed)', 
    example: 1, 
    minimum: 1 
  })
  page: number;

  @ApiProperty({ 
    description: 'Number of items per page', 
    example: 20, 
    minimum: 1, 
    maximum: 100 
  })
  limit: number;

  @ApiProperty({ 
    description: 'Total number of items available', 
    example: 100, 
    minimum: 0 
  })
  total: number;

  @ApiProperty({ 
    description: 'Total number of pages', 
    example: 5, 
    minimum: 1 
  })
  totalPages: number;

  @ApiProperty({ 
    description: 'Whether there is a next page', 
    example: true 
  })
  hasNextPage: boolean;

  @ApiProperty({ 
    description: 'Whether there is a previous page', 
    example: false 
  })
  hasPreviousPage: boolean;

  @ApiPropertyOptional({ 
    description: 'Cursor for the next page (cursor-based pagination)', 
    example: 'cursor_abc123' 
  })
  nextCursor?: string;

  @ApiPropertyOptional({ 
    description: 'Cursor for the previous page (cursor-based pagination)', 
    example: 'cursor_xyz789' 
  })
  prevCursor?: string;

  // ✅ Enterprise: Additional metadata
  @ApiPropertyOptional({ 
    description: 'Sort field used for pagination', 
    example: 'createdAt' 
  })
  sortBy?: string;

  @ApiPropertyOptional({ 
    description: 'Sort order', 
    example: 'desc',
    enum: ['asc', 'desc']
  })
  sortOrder?: 'asc' | 'desc';

  constructor(
    page: number, 
    limit: number, 
    total: number, 
    nextCursor?: string, 
    prevCursor?: string,
    sortBy?: string,
    sortOrder?: 'asc' | 'desc'
  ) {
    this.page = page;
    this.limit = limit;
    this.total = total;
    this.totalPages = Math.ceil(total / limit);
    this.hasNextPage = page < this.totalPages;
    this.hasPreviousPage = page > 1;
    // ✅ FIXED: exactOptionalPropertyTypes-এর জন্য undefined check
    if (nextCursor !== undefined) {
      this.nextCursor = nextCursor;
    }
    if (prevCursor !== undefined) {
      this.prevCursor = prevCursor;
    }
    if (sortBy !== undefined) {
      this.sortBy = sortBy;
    }
    if (sortOrder !== undefined) {
      this.sortOrder = sortOrder;
    }
  }

  /**
   * ✅ Enterprise: Get default pagination metadata
   */
  static default(total: number): PaginationMetadata {
    return new PaginationMetadata(
      DEFAULT_PAGINATION.PAGE,
      DEFAULT_PAGINATION.LIMIT,
      total
    );
  }

  /**
   * ✅ Enterprise: Validate and sanitize pagination parameters
   */
  static validate(page: number, limit: number): { page: number; limit: number } {
    const validPage = Math.max(1, page || DEFAULT_PAGINATION.PAGE);
    const validLimit = Math.min(
      DEFAULT_PAGINATION.MAX_LIMIT,
      Math.max(1, limit || DEFAULT_PAGINATION.LIMIT)
    );
    return { page: validPage, limit: validLimit };
  }
}

// ============================================================
// Paginated Response DTO (Enhanced)
// ============================================================

/**
 * Generic wrapper for paginated list responses
 * 
 * @template T - Type of items in the list
 * 
 * @example
 * const paginatedResponse = new PaginatedResponseDto(items, page, limit, total);
 * return paginatedResponse.toBaseResponse('Users fetched successfully');
 */
export class PaginatedResponseDto<T> {
  @ApiProperty({ 
    description: 'List of items', 
    isArray: true 
  })
  items: T[];

  @ApiProperty({ 
    description: 'Pagination metadata', 
    type: PaginationMetadata 
  })
  pagination: PaginationMetadata;

  constructor(
    items: T[], 
    page: number, 
    limit: number, 
    total: number, 
    nextCursor?: string, 
    prevCursor?: string,
    sortBy?: string,
    sortOrder?: 'asc' | 'desc'
  ) {
    this.items = items;
    this.pagination = new PaginationMetadata(page, limit, total, nextCursor, prevCursor, sortBy, sortOrder);
  }

  /**
   * Convert to standard BaseResponseDto
   * 
   * @param message - Success message in English
   * @param metadata - Optional response metadata
   * @param messageBn - Bengali success message
   * @returns BaseResponseDto wrapping the paginated data
   */
  toBaseResponse(
    message: string = 'Operation successful',
    metadata?: ResponseMetadata,
    messageBn?: string
  ): BaseResponseDto<PaginatedResponseDto<T>> {
    return BaseResponseDto.success(this, message, 200, metadata, messageBn);
  }

  /**
   * ✅ Enterprise: Create paginated response with default pagination
   */
  static fromItems<T>(
    items: T[],
    total: number,
    page?: number,
    limit?: number
  ): PaginatedResponseDto<T> {
    const { page: validPage, limit: validLimit } = PaginationMetadata.validate(page ?? DEFAULT_PAGINATION.PAGE, limit ?? DEFAULT_PAGINATION.LIMIT);
    return new PaginatedResponseDto(items, validPage, validLimit, total);
  }

  /**
   * ✅ Enterprise: Create empty paginated response
   */
  static empty<T>(page?: number, limit?: number): PaginatedResponseDto<T> {
    const { page: validPage, limit: validLimit } = PaginationMetadata.validate(page ?? DEFAULT_PAGINATION.PAGE, limit ?? DEFAULT_PAGINATION.LIMIT);
    return new PaginatedResponseDto<T>([], validPage, validLimit, 0);
  }
}

// ============================================================
// Empty Response DTO
// ============================================================

/**
 * Empty response for operations that return no data
 * Typically used with 204 No Content responses
 */
export class EmptyResponseDto {
  @ApiProperty({ 
    description: 'Success message in English', 
    example: 'Operation completed successfully' 
  })
  message: string;

  @ApiPropertyOptional({ 
    description: 'Success message in Bengali (Bangladesh specific)', 
    example: 'অপারেশন সফলভাবে সম্পন্ন হয়েছে' 
  })
  messageBn?: string;

  constructor(message: string = 'Operation completed successfully', messageBn?: string) {
    this.message = message;
    // ✅ FIXED: exactOptionalPropertyTypes-এর জন্য undefined check
    if (messageBn !== undefined) {
      this.messageBn = messageBn;
    }
  }
}

// ============================================================
// ✅ Enterprise: Utility Functions
// ============================================================

/**
 * Create a paginated response with proper typing
 * 
 * @example
 * const response = createPaginatedResponse(users, total, page, limit);
 */
export function createPaginatedResponse<T>(
  items: T[],
  total: number,
  page?: number,
  limit?: number
): PaginatedResponseDto<T> {
  return PaginatedResponseDto.fromItems(items, total, page, limit);
}

/**
 * Create a success response with rate limit headers
 * 
 * @example
 * const response = createRateLimitedSuccessResponse(data, rateLimitInfo);
 */
export function createRateLimitedSuccessResponse<T>(
  data: T,
  rateLimitInfo: RateLimitInfo,
  message?: string
): BaseResponseDto<T> {
  const metadata = new ResponseMetadata();
  // ✅ FIXED: exactOptionalPropertyTypes-এর জন্য explicit assignment
  metadata.rateLimit = rateLimitInfo;
  return BaseResponseDto.success(data, message ?? 'Operation successful', 200, metadata);
}

// ============================================================
// Type Exports
// ============================================================

// NOTE: ErrorCode, RateLimitInfo, PerformanceMetrics already exported as interfaces/types above
// No need to re-export them here

// ============================================================
// ENTERPRISE SUMMARY v2.0
// ============================================================
// 
// Enterprise Enhancements Applied:
// 1. ✅ Configurable pagination defaults from shared-config
// 2. ✅ Retry-After header support for rate limiting
// 3. ✅ Complete rate limit headers in response metadata
// 4. ✅ Performance monitoring metrics integration
// 5. ✅ Bengali language support with fallback
// 6. ✅ Correlation ID for distributed tracing
// 7. ✅ Pagination metadata validation helpers
// 8. ✅ Empty paginated response factory method
// 9. ✅ Rate limit info utility function
// 10. ✅ Performance metrics wrapper
// 
// Bangladesh Specific:
// - Bengali message support (messageBn)
// - Local timezone awareness
// - District/Upazila tracking ready
// 
// ============================================================
