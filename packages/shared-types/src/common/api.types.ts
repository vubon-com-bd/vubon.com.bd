/**
 * API Types - Pure TypeScript type contracts for API communication
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-types/src/common/api.types
 * 
 * RULES:
 * ✅ ONLY type declarations, interfaces, unions
 * ✅ NO axios, fetch, runtime request logic
 * ✅ NO functions, classes, enums
 * ✅ NO validation schemas (Zod)
 * ✅ NO framework imports
 */

import type { HTTP_STATUS } from '@vubon/shared-constants';

// ============================================================
// Generic API Response Wrapper
// ============================================================
export interface ApiResponse<T = unknown> {
  readonly success: boolean;
  readonly data: T;
  readonly message?: string;
  readonly messageBn?: string;                    // Bangladesh specific (Bengali)
  readonly timestamp: string;                    // ISO 8601
  readonly requestId: string;
  readonly serverTime: number;                   // Unix timestamp in milliseconds
  readonly version?: string;                     // API version
}

// ============================================================
// Error Response
// ============================================================
export interface ApiErrorResponse {
  readonly success: false;
  readonly error: {
    readonly code: ApiErrorCode;
    readonly message: string;
    readonly messageBn?: string;                  // Bangladesh specific
    readonly details?: unknown;
    readonly stack?: string;                     // Only in development
    readonly correlationId?: string;
    readonly helpUrl?: string;                   // Link to documentation
  };
  readonly timestamp: string;                    // ISO 8601
  readonly requestId: string;
  readonly statusCode: number;                   // HTTP status code
}

// ============================================================
// Paginated API Response
// ============================================================
export interface PaginatedApiResponse<T> extends ApiResponse<T[]> {
  readonly pagination: PaginationMetadata;
}

// ============================================================
// Pagination Metadata
// ============================================================
export interface PaginationMetadata {
  readonly page: number;
  readonly limit: number;
  readonly total: number;
  readonly totalPages: number;
  readonly hasNext: boolean;
  readonly hasPrevious: boolean;
  readonly nextCursor?: string;                  // For cursor-based pagination
  readonly prevCursor?: string;                  // For cursor-based pagination
}

// ============================================================
// API Error Codes (Extended for Bangladesh e-commerce)
// ============================================================
export type ApiErrorCode = 
  // ========== Client Errors (4xx) ==========
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'METHOD_NOT_ALLOWED'
  | 'NOT_ACCEPTABLE'
  | 'CONFLICT'
  | 'GONE'
  | 'UNPROCESSABLE_ENTITY'
  | 'TOO_MANY_REQUESTS'
  
  // ========== Server Errors (5xx) ==========
  | 'INTERNAL_SERVER_ERROR'
  | 'NOT_IMPLEMENTED'
  | 'BAD_GATEWAY'
  | 'SERVICE_UNAVAILABLE'
  | 'GATEWAY_TIMEOUT'
  
  // ========== Validation Errors ==========
  | 'VALIDATION_ERROR'
  | 'DUPLICATE_ENTRY'
  | 'INVALID_INPUT'
  | 'MISSING_REQUIRED_FIELD'
  | 'INVALID_FORMAT'
  
  // ========== Permission/Auth Errors ==========
  | 'INSUFFICIENT_PERMISSIONS'
  | 'RESOURCE_LOCKED'
  | 'INVALID_CREDENTIALS'
  | 'ACCOUNT_LOCKED'
  | 'ACCOUNT_SUSPENDED'
  | 'ACCOUNT_BANNED'
  | 'ACCOUNT_DELETED'
  | 'EMAIL_NOT_VERIFIED'
  | 'PHONE_NOT_VERIFIED'
  | 'MFA_REQUIRED'
  | 'MFA_FAILED'
  | 'MFA_BACKUP_CODE_REQUIRED'
  | 'TOKEN_EXPIRED'
  | 'TOKEN_INVALID'
  | 'TOKEN_REVOKED'
  | 'SESSION_EXPIRED'
  | 'SESSION_REVOKED'
  
  // ========== Resource Errors ==========
  | 'RESOURCE_NOT_FOUND'
  | 'RESOURCE_ALREADY_EXISTS'
  | 'RESOURCE_CONFLICT'
  
  // ========== Business Logic Errors (E-commerce specific) ==========
  | 'BUSINESS_RULE_VIOLATION'
  | 'INSUFFICIENT_STOCK'
  | 'INVALID_COUPON'
  | 'COUPON_EXPIRED'
  | 'COUPON_USAGE_LIMIT'
  | 'PAYMENT_FAILED'
  | 'PAYMENT_REFUND_FAILED'
  | 'ORDER_CANNOT_CANCEL'
  | 'SHIPPING_NOT_AVAILABLE'
  | 'PRODUCT_NOT_AVAILABLE'
  | 'PRICE_CHANGED'
  
  // ========== Rate Limit Errors ==========
  | 'RATE_LIMIT_EXCEEDED'
  | 'IP_BLOCKED'
  | 'DEVICE_BLOCKED'
  
  // ========== Bangladesh Specific Errors ==========
  | 'MFS_PAYMENT_FAILED'          // bKash/Nagad/Rocket payment failed
  | 'MFS_ACCOUNT_INVALID'         // Invalid MFS account
  | 'MFS_INSUFFICIENT_BALANCE'    // Insufficient balance in MFS
  | 'SMS_SEND_FAILED'             // SMS delivery failed
  | 'WHATSAPP_SEND_FAILED'        // WhatsApp message failed
  | 'VOICE_CALL_FAILED';          // Voice OTP call failed

// ============================================================
// Error Code to HTTP Status Mapping
// ============================================================
export interface ErrorCodeMapping {
  readonly errorCode: ApiErrorCode;
  readonly httpStatus: number;
}

// ============================================================
// Validation Error Details
// ============================================================
export interface ValidationErrorDetail {
  readonly field: string;
  readonly message: string;
  readonly messageBn?: string;                    // Bangladesh specific
  readonly code: string;
  readonly value?: unknown;
  readonly expected?: unknown;
  readonly constraints?: readonly string[];
}

// ============================================================
// Validation Error Response
// ============================================================
export interface ValidationErrorResponse extends ApiErrorResponse {
  readonly error: {
    readonly code: 'VALIDATION_ERROR';
    readonly message: string;
    readonly messageBn?: string;
    readonly details: readonly ValidationErrorDetail[];
  };
}

// ============================================================
// API Request Options
// ============================================================
export interface ApiRequestOptions {
  readonly headers?: Record<string, string>;
  readonly params?: Record<string, unknown>;
  readonly timeout?: number;                      // milliseconds
  readonly retries?: number;
  readonly retryDelay?: number;                   // milliseconds
  readonly cache?: RequestCache;
  readonly signal?: AbortSignal;
  readonly priority?: 'high' | 'normal' | 'low';
}

export type RequestCache = 
  | 'default'
  | 'no-store'
  | 'reload'
  | 'no-cache'
  | 'force-cache'
  | 'only-if-cached';

// ============================================================
// HTTP Methods
// ============================================================
export type HttpMethod = 
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS'
  | 'TRACE';

// ============================================================
// API Endpoint Configuration
// ============================================================
export interface ApiEndpoint {
  readonly method: HttpMethod;
  readonly path: string;
  readonly version: string;
  readonly requiresAuth: boolean;
  readonly requiresMfa?: boolean;
  readonly rateLimit?: RateLimitConfig;
  readonly cacheTtlSeconds?: number;             // For GET requests
  readonly deprecated?: boolean;
  readonly deprecatedAt?: string;
  readonly deprecatedReason?: string;
  readonly alternative?: string;                 // Alternative endpoint
}

// ============================================================
// Rate Limit Configuration
// ============================================================
export interface RateLimitConfig {
  readonly windowMs: number;
  readonly max: number;
  readonly skipOnError?: boolean;
  readonly keyPrefix?: string;
  readonly statusCode?: number;                  // Custom status code when limited
  readonly headersEnabled?: boolean;              // Include rate limit headers
}

// ============================================================
// Rate Limit Headers (API Response headers)
// ============================================================
export interface RateLimitHeaders {
  readonly 'x-rate-limit-limit': number;
  readonly 'x-rate-limit-remaining': number;
  readonly 'x-rate-limit-reset': number;         // Unix timestamp
  readonly 'retry-after'?: number;               // Seconds
}

// ============================================================
// API Health Status
// ============================================================
export interface ApiHealthStatus {
  readonly status: 'healthy' | 'degraded' | 'unhealthy';
  readonly uptime: number;                       // seconds
  readonly version: string;
  readonly commitHash?: string;
  readonly buildTime?: string;
  readonly environment: 'development' | 'staging' | 'production';
  
  readonly services: ReadonlyArray<{
    readonly name: string;
    readonly status: 'healthy' | 'degraded' | 'unhealthy';
    readonly latency?: number;                   // milliseconds
    readonly lastCheckAt: string;                // ISO date
    readonly error?: string;
  }>;
  
  readonly dependencies: ReadonlyArray<{
    readonly name: string;
    readonly status: 'healthy' | 'unhealthy';
    readonly latency?: number;
    readonly version?: string;
  }>;
  
  readonly timestamp: string;                    // ISO date
}

// ============================================================
// API Metrics (For monitoring)
// ============================================================
export interface ApiMetrics {
  readonly totalRequests: number;
  readonly totalErrors: number;
  readonly errorRate: number;                    // percentage (0-100)
  readonly averageResponseTime: number;          // milliseconds
  readonly medianResponseTime: number;           // milliseconds
  readonly p95ResponseTime: number;              // milliseconds
  readonly p99ResponseTime: number;              // milliseconds
  readonly requestsPerSecond: number;
  readonly requestsPerMinute: number;
  
  readonly byEndpoint: Record<string, {
    readonly requests: number;
    readonly errors: number;
    readonly averageResponseTime: number;
  }>;
  
  readonly byStatus: Record<number, number>;     // HTTP status code distribution
  readonly byMethod: Record<HttpMethod, number>;
  
  readonly timestamp: string;                    // ISO date
  readonly timeWindowSeconds: number;
}

// ============================================================
// WebSocket Message
// ============================================================
export interface WebSocketMessage<T = unknown> {
  readonly type: string;
  readonly data: T;
  readonly timestamp: string;                    // ISO date
  readonly id: string;
  readonly userId?: string;
  readonly sessionId?: string;
  readonly version?: string;
}

export type WebSocketMessageType = 
  | 'ping'
  | 'pong'
  | 'auth'
  | 'auth_success'
  | 'auth_failed'
  | 'notification'
  | 'order_update'
  | 'payment_update'
  | 'shipping_update'
  | 'chat_message'
  | 'error'
  | 'subscribe'
  | 'unsubscribe';

export interface WebSocketAuthMessage {
  readonly type: 'auth';
  readonly token: string;
  readonly deviceId?: string;
}

export interface WebSocketSubscribeMessage {
  readonly type: 'subscribe';
  readonly channels: readonly string[];
}

// ============================================================
// Server-Sent Events (SSE) Message
// ============================================================
export interface SSEMessage<T = unknown> {
  readonly event: string;
  readonly data: T;
  readonly id?: string;
  readonly retry?: number;                       // milliseconds
}

export type SSEEventType = 
  | 'notification'
  | 'order_update'
  | 'payment_update'
  | 'shipping_update'
  | 'inventory_update'
  | 'price_update'
  | 'user_update'
  | 'keepalive'
  | 'error';

// ============================================================
// API Version Information
// ============================================================
export interface ApiVersionInfo {
  readonly current: string;
  readonly latest: string;
  readonly deprecated: ReadonlyArray<{
    readonly version: string;
    readonly deprecatedAt: string;
    readonly sunsetAt: string;
    readonly migrationGuide: string;
  }>;
  readonly supported: readonly string[];
}

// ============================================================
// CORS Configuration
// ============================================================
export interface ApiCorsConfig {
  readonly allowedOrigins: readonly string[];
  readonly allowedMethods: readonly HttpMethod[];
  readonly allowedHeaders: readonly string[];
  readonly exposedHeaders: readonly string[];
  readonly credentials: boolean;
  readonly maxAge: number;                       // seconds
}

// ============================================================
// Request ID Context
// ============================================================
export interface RequestContext {
  readonly requestId: string;
  readonly correlationId?: string;
  readonly traceId?: string;
  readonly spanId?: string;
  readonly userId?: string;
  readonly sessionId?: string;
  readonly ipAddress?: string;
  readonly userAgent?: string;
  readonly startTime: number;                   // milliseconds
}

// ============================================================
// API Response Cache Configuration
// ============================================================
export interface ApiCacheConfig {
  readonly enabled: boolean;
  readonly ttlSeconds: number;
  readonly keyPrefix?: string;
  readonly varyByHeaders?: readonly string[];
  readonly varyByQueryParams?: readonly string[];
  readonly cacheableStatuses?: readonly number[];
}

// ============================================================
// API Webhook Payload
// ============================================================
export interface ApiWebhookPayload<T = unknown> {
  readonly id: string;
  readonly event: string;
  readonly version: string;
  readonly timestamp: string;
  readonly data: T;
  readonly metadata: {
    readonly source: string;
    readonly environment: string;
    readonly attempt: number;
  };
}

export interface ApiWebhookDeliveryResult {
  readonly success: boolean;
  readonly statusCode: number;
  readonly responseBody?: string;
  readonly durationMs: number;
  readonly timestamp: string;
}

// ============================================================
// API Retry Configuration
// ============================================================
export interface ApiRetryConfig {
  readonly maxRetries: number;
  readonly initialDelayMs: number;
  readonly maxDelayMs: number;
  readonly backoffMultiplier: number;
  readonly retryableStatuses: readonly number[];
  readonly retryableErrors: readonly ApiErrorCode[];
}

// ============================================================
// API Circuit Breaker Configuration
// ============================================================
export interface ApiCircuitBreakerConfig {
  readonly enabled: boolean;
  readonly failureThreshold: number;             // Percentage (0-100)
  readonly timeoutMs: number;                    // Time window
  readonly resetTimeoutMs: number;               // Time to try again
  readonly halfOpenRequests: number;             // Requests to test recovery
}

export interface ApiCircuitBreakerState {
  readonly state: 'closed' | 'open' | 'half-open';
  readonly failureCount: number;
  readonly lastFailureAt: string | null;
  readonly opensAt: string | null;
  readonly closesAt: string | null;
}
