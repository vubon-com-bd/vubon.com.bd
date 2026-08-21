/**
 * Common API Types Module
 * Core API-related types for the e-commerce platform
 * Handles HTTP requests, responses, status codes, and API utilities
 */

// Correct import path for HTTP status constants from shared-constants
import { common } from '@vubon/shared-constants';
import { Timestamp } from '../auth/core-primitives.types';

// Destructure the correct constants from the 'common' namespace
const { AuthHttpStatus, AuthHttpStatusMessages, AuthHttpStatusCategories, AuthHttpStatusHelpers } =
  common;

/**
 * HTTP Status Code
 * HTTP status codes (re-exported from shared-constants)
 */
export type HttpStatusCode = (typeof AuthHttpStatus)[keyof typeof AuthHttpStatus];

/**
 * HTTP Status Category
 * Category of HTTP status codes (re-exported from shared-constants)
 */
export type HttpStatusCategory =
  (typeof AuthHttpStatusCategories)[keyof typeof AuthHttpStatusCategories];

/**
 * API Method
 * HTTP methods
 */
export type APIMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

/**
 * API Request
 * Base API request structure
 */
export interface APIRequest<T = unknown> {
  method: APIMethod;
  path: string;
  headers?: Record<string, string>;
  query?: Record<string, string | string[]>;
  body?: T;
  timeout?: number;
  metadata?: Record<string, unknown>;
}

/**
 * API Response
 * Base API response structure
 */
export interface APIResponse<T = unknown> {
  success: boolean;
  statusCode: HttpStatusCode;
  data?: T;
  error?: APIError;
  message?: string;
  timestamp: Timestamp;
  requestId?: string;
  pagination?: PaginationMeta;
  metadata?: Record<string, unknown>;
}

/**
 * API Error
 * API error structure
 */
export interface APIError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  validationErrors?: ValidationError[];
  timestamp: Timestamp;
  path?: string;
}

/**
 * Validation Error
 * Field-specific validation error
 */
export interface ValidationError {
  field: string;
  message: string;
  code: string;
  value?: unknown;
  constraints?: Record<string, string>;
}

/**
 * Pagination Meta
 * Pagination metadata for API responses
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  nextPage?: number;
  prevPage?: number;
}

/**
 * API Headers
 * Common API headers
 */
export interface APIHeaders {
  'Content-Type'?: string;
  Accept?: string;
  Authorization?: string;
  'X-Request-ID'?: string;
  'X-Device-ID'?: string;
  'X-Session-ID'?: string;
  'X-API-Key'?: string;
  'X-Forwarded-For'?: string;
  'User-Agent'?: string;
  'Accept-Language'?: string;
  'Accept-Encoding'?: string;
  'Cache-Control'?: string;
  [key: string]: string | undefined;
}

/**
 * API Query Parameters
 * Common API query parameters
 */
export interface APIQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, unknown>;
  fields?: string[];
  include?: string[];
  exclude?: string[];
  [key: string]: unknown;
}

/**
 * API Response Builder
 * Helper for building API responses
 */
export interface APIResponseBuilder {
  success<T>(data: T, message?: string, metadata?: Record<string, unknown>): APIResponse<T>;
  error(code: string, message: string, details?: Record<string, unknown>): APIResponse<never>;
  validationError(errors: ValidationError[]): APIResponse<never>;
  paginated<T>(data: T[], pagination: PaginationMeta): APIResponse<T[]>;
  created<T>(data: T, message?: string): APIResponse<T>;
  accepted<T>(data?: T, message?: string): APIResponse<T>;
  noContent(): APIResponse<never>;
}

/**
 * API Constants
 * API-related constants (re-exported from shared-constants)
 */
export const HTTP_STATUS = AuthHttpStatus;
export const HTTP_STATUS_MESSAGES = AuthHttpStatusMessages;
export const HTTP_STATUS_CATEGORIES = AuthHttpStatusCategories;
export const HTTP_STATUS_HELPERS = AuthHttpStatusHelpers;

/**
 * API Status Codes
 * Common HTTP status codes
 */
export const API_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

/**
 * Default API Configuration
 */
export const DEFAULT_API_CONFIG = {
  timeout: 30000, // 30 seconds
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
  enableLogging: true,
  enableMetrics: true,
  enableCaching: false,
  cacheTTL: 300, // 5 minutes
  maxPayloadSize: 10485760, // 10 MB
} as const;

/**
 * API Rate Limit
 * Rate limit information
 */
export interface APIRateLimit {
  limit: number;
  remaining: number;
  reset: Timestamp;
  retryAfter?: number;
}

/**
 * API Health Check
 * Health check response
 */
export interface APIHealthCheck {
  status: 'healthy' | 'degraded' | 'unhealthy';
  services: ServiceHealth[];
  timestamp: Timestamp;
  version: string;
}

/**
 * Service Health
 * Individual service health status
 */
export interface ServiceHealth {
  name: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  message?: string;
  latency?: number;
  timestamp: Timestamp;
}

/**
 * API Webhook
 * Webhook payload
 */
export interface APIWebhook<T = unknown> {
  event: string;
  timestamp: Timestamp;
  data: T;
  source: string;
  metadata?: Record<string, unknown>;
}
