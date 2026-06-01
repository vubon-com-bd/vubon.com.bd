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
 * ✅ NO business logic
 * ✅ NO database queries
 * ✅ NO infrastructure imports
 * ✅ Static factory methods are acceptable (pure DTO creation)
 * ✅ Bangladesh specific - Bengali error messages support
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ============================================================
// Types
// ============================================================

export type ErrorCode = 
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'VALIDATION_ERROR'
  | 'INTERNAL_ERROR'
  | 'TOO_MANY_REQUESTS'
  | 'RATE_LIMITED'
  | 'ACCOUNT_LOCKED'
  | 'ACCOUNT_SUSPENDED'
  | 'EMAIL_NOT_VERIFIED'
  | 'PHONE_NOT_VERIFIED'
  | 'MFA_REQUIRED'
  | 'MFA_FAILED'
  | 'TOKEN_EXPIRED'
  | 'INVALID_CREDENTIALS';

// ============================================================
// Validation Error Detail DTO
// ============================================================

/**
 * Validation error detail
 */
export class ValidationErrorDetail {
  @ApiProperty({ description: 'Field name with error', example: 'email' })
  field: string;

  @ApiProperty({ description: 'Error message', example: 'Email must be valid' })
  message: string;

  @ApiPropertyOptional({ description: 'Bengali error message for Bangladesh users', example: 'ইমেইল সঠিক হতে হবে' })
  messageBn?: string;

  @ApiPropertyOptional({ description: 'Error code', example: 'INVALID_EMAIL' })
  code?: string;

  @ApiPropertyOptional({ description: 'Rejected value', example: 'invalid-email' })
  rejectedValue?: any;

  constructor(field: string, message: string, rejectedValue?: any, messageBn?: string, code?: string) {
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
 * Base Response Metadata
 */
export class ResponseMetadata {
  @ApiProperty({ description: 'Request timestamp', example: '2024-01-01T00:00:00.000Z' })
  timestamp: string;

  @ApiPropertyOptional({ description: 'Request path', example: '/api/v1/auth/login' })
  path?: string;

  @ApiPropertyOptional({ description: 'HTTP method', example: 'POST' })
  method?: string;

  @ApiPropertyOptional({ description: 'Response time in milliseconds', example: 45 })
  durationMs?: number;

  @ApiPropertyOptional({ description: 'Request ID for tracing', example: 'req_abc123' })
  requestId?: string;

  @ApiPropertyOptional({ description: 'API version', example: 'v1' })
  version?: string;

  @ApiPropertyOptional({ description: 'Environment', example: 'production' })
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
 * Base Response DTO
 * Generic wrapper for all API responses
 */
export class BaseResponseDto<T> {
  @ApiProperty({ description: 'Whether the operation was successful', example: true })
  success: boolean;

  @ApiProperty({ description: 'Status code (HTTP compatible)', example: 200 })
  statusCode: number;

  @ApiProperty({ description: 'Response message', example: 'Operation successful' })
  message: string;

  @ApiPropertyOptional({ description: 'Bengali response message for Bangladesh users', example: 'অপারেশন সফল হয়েছে' })
  messageBn?: string;

  @ApiPropertyOptional({ description: 'Error code for programmatic handling', enum: ['BAD_REQUEST', 'UNAUTHORIZED', 'FORBIDDEN', 'NOT_FOUND', 'CONFLICT', 'VALIDATION_ERROR', 'INTERNAL_ERROR', 'TOO_MANY_REQUESTS'] })
  errorCode?: ErrorCode;

  @ApiPropertyOptional({ description: 'Response data payload' })
  data?: T;

  @ApiPropertyOptional({ description: 'Validation errors (if any)', type: [ValidationErrorDetail] })
  errors?: ValidationErrorDetail[];

  @ApiPropertyOptional({ description: 'Generic error messages', type: [String] })
  errorMessages?: string[];

  @ApiPropertyOptional({ description: 'Bengali error messages', type: [String] })
  errorMessagesBn?: string[];

  @ApiPropertyOptional({ description: 'Response metadata', type: ResponseMetadata })
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
  // Factory Methods
  // ============================================================

  /**
   * Create a success response
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
   * Create a success response for creation (201)
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
   * Create a success response for no content (204)
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

  /**
   * Create an error response
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
      false, statusCode, message, null, errors, errorMessages, metadata, messageBn, errorCode, errorMessagesBn
    );
  }

  /**
   * Create a validation error response (400)
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
   * Create an unauthorized response (401)
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
   * Create a forbidden response (403)
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
   * Create a not found response (404)
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
   * Create a conflict response (409)
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
   * Create a too many requests response (429)
   */
  static tooManyRequests(
    message: string = 'Too many requests',
    metadata?: ResponseMetadata,
    messageBn?: string
  ): BaseResponseDto<null> {
    return new BaseResponseDto<null>(
      false, 429, message, null, undefined, undefined, metadata, messageBn, 'TOO_MANY_REQUESTS'
    );
  }

  /**
   * Create an internal server error response (500)
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

  /**
   * Create an account locked response (423)
   */
  static accountLocked(
    message: string = 'Account is locked',
    metadata?: ResponseMetadata,
    messageBn?: string,
    remainingLockTime?: number
  ): BaseResponseDto<{ remainingLockTime: number }> {
    return new BaseResponseDto<{ remainingLockTime: number }>(
      false, 423, message, { remainingLockTime: remainingLockTime || 0 }, undefined, undefined, metadata, messageBn, 'ACCOUNT_LOCKED'
    );
  }

  /**
   * Create an MFA required response
   */
  static mfaRequired(
    message: string = 'MFA verification required',
    metadata?: ResponseMetadata,
    messageBn?: string,
    mfaMethods?: string[]
  ): BaseResponseDto<{ mfaMethods: string[] }> {
    return new BaseResponseDto<{ mfaMethods: string[] }>(
      false, 401, message, { mfaMethods: mfaMethods || [] }, undefined, undefined, metadata, messageBn, 'MFA_REQUIRED'
    );
  }
}

// ============================================================
// Paginated Response DTO
// ============================================================

/**
 * Pagination metadata
 */
export class PaginationMetadata {
  @ApiProperty({ description: 'Current page number', example: 1, minimum: 1 })
  page: number;

  @ApiProperty({ description: 'Items per page', example: 20, minimum: 1, maximum: 100 })
  limit: number;

  @ApiProperty({ description: 'Total number of items', example: 100, minimum: 0 })
  total: number;

  @ApiProperty({ description: 'Total number of pages', example: 5, minimum: 1 })
  totalPages: number;

  @ApiProperty({ description: 'Whether there is a next page', example: true })
  hasNextPage: boolean;

  @ApiProperty({ description: 'Whether there is a previous page', example: false })
  hasPreviousPage: boolean;

  @ApiPropertyOptional({ description: 'Next cursor for cursor-based pagination', example: 'cursor_abc123' })
  nextCursor?: string;

  @ApiPropertyOptional({ description: 'Previous cursor for cursor-based pagination', example: 'cursor_xyz789' })
  prevCursor?: string;

  constructor(page: number, limit: number, total: number, nextCursor?: string, prevCursor?: string) {
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

/**
 * Paginated Response DTO
 * Wrapper for paginated list responses
 */
export class PaginatedResponseDto<T> {
  @ApiProperty({ description: 'List of items', isArray: true })
  items: T[];

  @ApiProperty({ description: 'Pagination metadata', type: PaginationMetadata })
  pagination: PaginationMetadata;

  constructor(items: T[], page: number, limit: number, total: number, nextCursor?: string, prevCursor?: string) {
    this.items = items;
    this.pagination = new PaginationMetadata(page, limit, total, nextCursor, prevCursor);
  }

  /**
   * Convert to BaseResponseDto
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
 * Empty response (for no content)
 */
export class EmptyResponseDto {
  @ApiProperty({ description: 'Success message', example: 'Operation completed successfully' })
  message: string;

  @ApiPropertyOptional({ description: 'Bengali success message', example: 'অপারেশন সফলভাবে সম্পন্ন হয়েছে' })
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
