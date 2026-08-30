/**
 * API Types
 * Standard API request and response structures
 */

import { HTTP_STATUS } from '@vubon/shared-constants';
import type { HttpStatusCode } from '@vubon/shared-constants';

/**
 * API Response
 * Standard wrapper for all API responses
 */
export interface ApiResponse<T> {
  /** HTTP status code */
  status: HttpStatusCode;
  /** Response data */
  data: T;
  /** Human-readable message */
  message: string;
  /** ISO timestamp of the response */
  timestamp: string;
  /** Request path (optional) */
  path?: string;
  /** Validation or business errors (optional) */
  errors?: ApiError[];
}

/**
 * API Error
 * Structured error object
 */
export interface ApiError {
  /** Error code (e.g., 'VALIDATION_ERROR', 'NOT_FOUND') */
  code: string;
  /** Human-readable error message */
  message: string;
  /** Field name (for validation errors) */
  field?: string;
  /** Additional error details */
  details?: unknown;
}

/**
 * API Error Response
 * Standard error response
 */
export interface ApiErrorResponse {
  /** HTTP status code */
  status: HttpStatusCode;
  /** Null data for error responses */
  data: null;
  /** Human-readable message */
  message: string;
  /** ISO timestamp of the response */
  timestamp: string;
  /** Request path (optional) */
  path?: string;
  /** Error details */
  errors: ApiError[];
}

/**
 * API Request Headers
 * Standard request headers
 */
export interface ApiRequestHeaders {
  /** Authorization token (Bearer) */
  authorization?: string;
  /** API Key for service-to-service */
  'x-api-key'?: string;
  /** Session ID */
  'x-session-id'?: string;
  /** Device ID */
  'x-device-id'?: string;
  /** Request ID for tracing */
  'x-request-id'?: string;
  /** Client version */
  'x-client-version'?: string;
  /** Platform type */
  'x-platform'?: 'web' | 'mobile' | 'admin' | 'vendor' | 'api';
}

/**
 * API Success Status Codes
 * List of successful status codes
 */
export type ApiSuccessStatusCode =
  | typeof HTTP_STATUS.OK
  | typeof HTTP_STATUS.CREATED
  | typeof HTTP_STATUS.ACCEPTED
  | typeof HTTP_STATUS.NO_CONTENT;

/**
 * API Error Status Codes
 * List of error status codes
 */
export type ApiErrorStatusCode =
  | typeof HTTP_STATUS.BAD_REQUEST
  | typeof HTTP_STATUS.UNAUTHORIZED
  | typeof HTTP_STATUS.FORBIDDEN
  | typeof HTTP_STATUS.NOT_FOUND
  | typeof HTTP_STATUS.CONFLICT
  | typeof HTTP_STATUS.UNPROCESSABLE_ENTITY
  | typeof HTTP_STATUS.TOO_MANY_REQUESTS
  | typeof HTTP_STATUS.INTERNAL_SERVER_ERROR;

/**
 * Type guard to check if response is successful
 */
export function isApiResponseSuccess<T>(
  response: ApiResponse<T>
): response is ApiResponse<T> & { status: ApiSuccessStatusCode } {
  return response.status >= 200 && response.status < 300;
}

/**
 * Type guard to check if response is error
 * Uses type assertion to handle the data type difference
 */
export function isApiResponseError<T>(
  response: ApiResponse<T>
): response is ApiResponse<T> & { data: null; errors: ApiError[] } {
  return response.status >= 400 && response.status < 600;
}

/**
 * Create success response helper
 */
export function createSuccessResponse<T>(
  data: T,
  message: string = 'Success',
  status: HttpStatusCode = HTTP_STATUS.OK
): ApiResponse<T> {
  return {
    status,
    data,
    message,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Create error response helper
 */
export function createErrorResponse(
  message: string,
  errors: ApiError[],
  status: HttpStatusCode = HTTP_STATUS.BAD_REQUEST
): ApiErrorResponse {
  return {
    status,
    data: null,
    message,
    timestamp: new Date().toISOString(),
    errors,
  };
}

/**
 * Create validation error response helper
 */
export function createValidationErrorResponse(
  errors: ApiError[],
  message: string = 'Validation failed'
): ApiErrorResponse {
  return createErrorResponse(message, errors, HTTP_STATUS.UNPROCESSABLE_ENTITY);
}

/**
 * Create not found error response helper
 */
export function createNotFoundResponse(
  resource: string,
  message: string = 'Resource not found'
): ApiErrorResponse {
  return createErrorResponse(
    message,
    [{ code: 'NOT_FOUND', message: `${resource} not found` }],
    HTTP_STATUS.NOT_FOUND
  );
}

/**
 * Create unauthorized error response helper
 */
export function createUnauthorizedResponse(message: string = 'Unauthorized'): ApiErrorResponse {
  return createErrorResponse(
    message,
    [{ code: 'UNAUTHORIZED', message }],
    HTTP_STATUS.UNAUTHORIZED
  );
}

/**
 * Create forbidden error response helper
 */
export function createForbiddenResponse(message: string = 'Forbidden'): ApiErrorResponse {
  return createErrorResponse(message, [{ code: 'FORBIDDEN', message }], HTTP_STATUS.FORBIDDEN);
}
