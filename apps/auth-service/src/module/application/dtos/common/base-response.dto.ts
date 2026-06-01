/**
 * Base Response DTOs - Pure Data Transport Objects
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/dtos/common/base-response.dto
 * 
 * @description
 * Base data transfer objects for consistent API responses.
 * Includes success/error responses, pagination, and validation errors.
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
 * // Error response
 * return BaseResponseDto.error('Invalid credentials', 401);
 * 
 * // Paginated response
 * return new PaginatedResponseDto(items, page, limit, total).toBaseResponse();
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ✅ Phase-1 (shared-types) থেকে ইম্পোর্ট - Single source of truth
import type { ErrorCode as SharedErrorCode } from '@vubon/shared-types';

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
  rejectedValue?: any;

  constructor(
    field: string, 
    message: string, 
    rejectedValue?: any, 
    messageBn?: string, 
    code?: string
  ) {
    this.field = field;
    this.message = message;
    this.messageBn = messageBn;
    this.code = code;
    this.rejectedValue = rejectedValue;
  }
}

// ============================================================
// Response Metadata DTO
// ============================================================

/**
 * Metadata for API responses
 * Includes request tracing, timing, and environment information
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
    description: 'API version', 
    example: 'v1' 
  })
  version?: string;

  @ApiPropertyOptional({ 
    description: 'Environment (development/staging/production)', 
    example: 'production' 
  })
  environment?: string;

  constructor(
    path?: string,
    method?: string,
    durationMs?: number,
    requestId?: string,
    version?: string,
    environment?: string
  ) {
    this.timestamp = new Date().toISOString();
    this.path = path;
    this.method = method;
    this.durationMs = durationMs;
    this.requestId = requestId;
    this.version = version;
    this.environment = environment;
  }
}

// ============================================================
// Base Response DTO
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
 * // Error response
 * const errorResponse = BaseResponseDto.error('Not found', 404);
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
      'CONFLICT', 'VALIDATION_ERROR', 'INTERNAL_ERROR', 
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
    this.messageBn = messageBn;
    this.errorCode = errorCode;
    this.data = data;
    this.errors = errors;
    this.errorMessages = errorMessages;
    this.errorMessagesBn = errorMessagesBn;
    this.metadata = metadata;
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
   * 
   * @param message - Error message in English
   * @param metadata - Optional response metadata
   * @param messageBn - Bengali error message
   * @param retryAfterSeconds - Seconds to wait before retrying
   */
  static tooManyRequests(
    message: string = 'Too many requests',
    metadata?: ResponseMetadata,
    messageBn?: string,
    retryAfterSeconds?: number
  ): BaseResponseDto<{ retryAfterSeconds?: number }> {
    return new BaseResponseDto<{ retryAfterSeconds?: number }>(
      false, 429, message, retryAfterSeconds ? { retryAfterSeconds } : null, 
      undefined, undefined, metadata, messageBn, 'TOO_MANY_REQUESTS'
    );
  }

  /**
   * Create a 500 Internal Server Error response
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
      false, 500, message, null, undefined, undefined, metadata, messageBn, 'INTERNAL_ERROR'
    );
  }

  // ============================================================
  // Business Logic Error Factory Methods
  // ============================================================

  /**
   * Create a 423 Account Locked response
   * 
   * @param message - Error message in English
   * @param remainingLockTime - Lock duration in minutes or seconds
   * @param metadata - Optional response metadata
   * @param messageBn - Bengali error message
   */
  static accountLocked(
    message: string = 'Account is locked',
    remainingLockTime?: number,
    metadata?: ResponseMetadata,
    messageBn?: string
  ): BaseResponseDto<{ remainingLockTime?: number }> {
    return new BaseResponseDto<{ remainingLockTime?: number }>(
      false, 423, message, remainingLockTime ? { remainingLockTime } : null, 
      undefined, undefined, metadata, messageBn, 'ACCOUNT_LOCKED'
    );
  }

  /**
   * Create an MFA Required response (status code may vary)
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
    return new BaseResponseDto<{ mfaMethods: string[]; mfaSessionId?: string }>(
      false, 401, message, { mfaMethods, mfaSessionId }, 
      undefined, undefined, metadata, messageBn, 'MFA_REQUIRED'
    );
  }

  /**
   * Create a 429 Rate Limited response (alias for tooManyRequests)
   */
  static rateLimited(
    retryAfterSeconds: number,
    message: string = 'Rate limit exceeded',
    metadata?: ResponseMetadata,
    messageBn?: string
  ): BaseResponseDto<{ retryAfterSeconds: number }> {
    return BaseResponseDto.tooManyRequests(message, metadata, messageBn, retryAfterSeconds);
  }
}

// ============================================================
// Pagination Metadata DTO
// ============================================================

/**
 * Pagination metadata for paginated responses
 * Supports both offset-based and cursor-based pagination
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

  constructor(
    page: number, 
    limit: number, 
    total: number, 
    nextCursor?: string, 
    prevCursor?: string
  ) {
    this.page = page;
    this.limit = limit;
    this.total = total;
    this.totalPages = Math.ceil(total / limit);
    this.hasNextPage = page < this.totalPages;
    this.hasPreviousPage = page > 1;
    this.nextCursor = nextCursor;
    this.prevCursor = prevCursor;
  }
}

// ============================================================
// Paginated Response DTO
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
    prevCursor?: string
  ) {
    this.items = items;
    this.pagination = new PaginationMetadata(page, limit, total, nextCursor, prevCursor);
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
    this.messageBn = messageBn;
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { ErrorCode };
