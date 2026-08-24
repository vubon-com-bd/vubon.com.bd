/**
 * API Types
 * Type definitions for API requests and responses
 * Based on shared-constants HTTP_STATUS
 * @module APITypes
 */

import {
  ResponseMetadata,
  PaginationParams,
  FilterCondition,
  SortField,
  Metadata,
  HTTP_STATUS,
} from './core-primitives.types';

/**
 * API error interface
 */
export interface ApiError {
  code: string;
  message: string;
  field?: string;
  details?: unknown;
  /** Error stack trace (development only) */
  stack?: string;
  /** Error timestamp */
  timestamp: Date;
}

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: ApiError[];
  metadata?: ResponseMetadata;
}

/**
 * API request interface with common fields
 */
export interface ApiRequest {
  /** Request ID for tracking */
  requestId: string;
  /** Timestamp of request */
  timestamp: Date;
  /** Client IP address */
  ipAddress?: string;
  /** User agent */
  userAgent?: string;
  /** Request metadata */
  metadata?: Metadata;
}

/**
 * Authenticated API request
 */
export interface AuthenticatedApiRequest extends ApiRequest {
  /** User ID (authenticated user) */
  userId: string;
  /** Session token */
  sessionId: string;
  /** Authentication token */
  accessToken: string;
}

/**
 * API response for successful operations
 */
export interface SuccessApiResponse<T> extends ApiResponse<T> {
  success: true;
  data: T;
  /** HTTP status code from shared-constants */
  statusCode?: typeof HTTP_STATUS.OK | typeof HTTP_STATUS.CREATED;
}

/**
 * API response for failed operations
 */
export interface ErrorApiResponse extends ApiResponse<null> {
  success: false;
  data: null;
  errors: ApiError[];
  /** HTTP status code from shared-constants */
  statusCode?: Exclude<
    (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS],
    typeof HTTP_STATUS.OK | typeof HTTP_STATUS.CREATED
  >;
}

/**
 * API version
 */
export type ApiVersion = 'v1' | 'v2' | 'v3';

/**
 * API endpoint configuration
 */
export interface ApiEndpoint {
  path: string;
  method: ApiMethod;
  version: ApiVersion;
  authRequired: boolean;
  rateLimit?: RateLimit;
}

/**
 * API method
 */
export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

/**
 * Rate limit configuration for API
 */
export interface RateLimit {
  windowMs: number;
  max: number;
  message?: string;
}

/**
 * API query parameters
 */
export interface ApiQueryParams {
  /** Filter conditions */
  filter?: FilterCondition[];
  /** Sort fields */
  sort?: SortField[];
  /** Pagination */
  pagination?: PaginationParams;
  /** Search query */
  search?: string;
  /** Fields to include */
  fields?: string[];
  /** Fields to exclude */
  exclude?: string[];
  /** Additional parameters */
  [key: string]: unknown;
}

/**
 * API response pagination metadata
 */
export interface ApiPaginationMetadata {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * API response metadata with pagination
 */
export interface ApiResponseMetadata extends ResponseMetadata {
  pagination?: ApiPaginationMetadata;
}

/**
 * API bulk operation request
 */
export interface BulkOperationRequest {
  ids: string[];
  operation: string;
  data?: Record<string, unknown>;
}

/**
 * API bulk operation response
 */
export interface BulkOperationResponse {
  totalProcessed: number;
  successCount: number;
  failedCount: number;
  errors?: BulkOperationError[];
  results?: Record<string, unknown>[];
}

/**
 * Bulk operation error
 */
export interface BulkOperationError {
  id: string;
  code: string;
  message: string;
}

/**
 * API health check response
 */
export interface HealthCheckResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: Date;
  uptime: number;
  services: Record<string, ServiceHealth>;
  version: string;
}

/**
 * Service health status
 */
export interface ServiceHealth {
  status: 'healthy' | 'degraded' | 'unhealthy';
  message?: string;
  latency?: number;
  lastCheck: Date;
}

/**
 * API error codes based on HTTP_STATUS from shared-constants
 */
export type ApiErrorCode =
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'METHOD_NOT_ALLOWED'
  | 'CONFLICT'
  | 'UNPROCESSABLE_ENTITY'
  | 'TOO_MANY_REQUESTS'
  | 'INTERNAL_SERVER_ERROR'
  | 'SERVICE_UNAVAILABLE'
  | 'VALIDATION_ERROR'
  | 'AUTHENTICATION_ERROR'
  | 'AUTHORIZATION_ERROR'
  | 'RESOURCE_NOT_FOUND'
  | 'DUPLICATE_RESOURCE'
  | 'RATE_LIMIT_EXCEEDED'
  | 'INVALID_INPUT'
  | 'DEPENDENCY_ERROR'
  | 'TIMEOUT_ERROR';

/**
 * API validation error details
 */
export interface ValidationError {
  field: string;
  value: unknown;
  message: string;
  rule: string;
}

/**
 * API request validator
 */
export interface ApiValidator {
  validate<T>(data: unknown, schema: ApiValidationSchema<T>): T;
  validateAsync<T>(data: unknown, schema: ApiValidationSchema<T>): Promise<T>;
}

/**
 * API validation schema
 */
export type ApiValidationSchema<T> = {
  [K in keyof T]?: ApiValidationRule;
};

/**
 * API validation rule
 */
export interface ApiValidationRule {
  required?: boolean;
  type?: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'date' | 'email' | 'url';
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  enum?: unknown[];
  custom?: (value: unknown) => boolean | string;
}

/**
 * API middleware type
 */
export type ApiMiddleware = (req: ApiRequest, res: unknown, next: () => void) => void;

/**
 * API route handler
 */
export type ApiHandler<TReq = unknown, TRes = unknown> = (
  req: ApiRequest & { body?: TReq },
  res: ApiResponse<TRes>
) => Promise<void> | void;

/**
 * API WebSocket message
 */
export interface WebSocketMessage<T = unknown> {
  type: string;
  payload: T;
  timestamp: Date;
  id: string;
}

/**
 * API WebSocket response
 */
export interface WebSocketResponse<T = unknown> extends WebSocketMessage<T> {
  status: 'success' | 'error';
  error?: ApiError;
}

/**
 * API SSE (Server-Sent Events) event
 */
export interface SSEEvent<T = unknown> {
  event: string;
  data: T;
  id?: string;
  retry?: number;
}
