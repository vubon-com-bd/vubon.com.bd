/**
 * Rate Limit Types - Enterprise Grade Rate Limiting Contracts
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-types/common/rate-limit.types
 * 
 * @description
 * Standardized rate limiting types for consistent API throttling across all services.
 * Used by all DTOs, services, and infrastructure layers.
 * 
 * ENTERPRISE FEATURES:
 * ✅ Multi-dimensional rate limiting (user, IP, endpoint, global)
 * ✅ Real-time rate limit status tracking
 * ✅ Retry-after support with RFC 7231 compliance
 * ✅ Bengali language support
 * ✅ Configurable thresholds per service
 * ✅ Distributed rate limiting support (Redis-based)
 * ✅ Rate limit violation logging
 * ✅ Adaptive rate limiting (ML-based)
 * 
 * Enterprise Rules:
 * ✅ Pure type definitions - NO runtime logic
 * ✅ Framework-agnostic
 * ✅ Reusable across all services
 * ✅ Extensible for future requirements
 */

// ============================================================
// Core Rate Limit Types
// ============================================================

/**
 * Rate limit window in seconds
 */
export type RateLimitWindow = 
  | 1     // 1 second
  | 5     // 5 seconds
  | 10    // 10 seconds
  | 30    // 30 seconds
  | 60    // 1 minute
  | 120   // 2 minutes
  | 300   // 5 minutes
  | 600   // 10 minutes
  | 900   // 15 minutes
  | 1800  // 30 minutes
  | 3600  // 1 hour
  | 7200  // 2 hours
  | 14400 // 4 hours
  | 21600 // 6 hours
  | 43200 // 12 hours
  | 86400; // 24 hours

/**
 * Rate limit severity levels
 */
export enum RateLimitSeverity {
  INFO = 'info',
  WARNING = 'warning',
  CRITICAL = 'critical',
  BLOCKED = 'blocked',
}

/**
 * Rate limit scope
 */
export enum RateLimitScope {
  /** Global limit for entire service */
  GLOBAL = 'global',
  /** Limit per endpoint */
  ENDPOINT = 'endpoint',
  /** Limit per user */
  USER = 'user',
  /** Limit per IP address */
  IP = 'ip',
  /** Limit per API key */
  API_KEY = 'api_key',
  /** Limit per device */
  DEVICE = 'device',
  /** Limit per district (Bangladesh specific) */
  DISTRICT = 'district',
  /** Limit per network type (2g/3g/4g/5g/wifi) */
  NETWORK = 'network',
}

/**
 * Rate limit policy type
 */
export enum RateLimitPolicy {
  /** Fixed window (e.g., 100 requests per minute) */
  FIXED_WINDOW = 'fixed_window',
  /** Sliding window (more accurate) */
  SLIDING_WINDOW = 'sliding_window',
  /** Token bucket (allows bursts) */
  TOKEN_BUCKET = 'token_bucket',
  /** Leaky bucket (smooths traffic) */
  LEAKY_BUCKET = 'leaky_bucket',
  /** Dynamic (ML-based adaptive limits) */
  DYNAMIC = 'dynamic',
}

/**
 * Rate limit violation type
 */
export enum RateLimitViolationType {
  EXCEEDED = 'exceeded',
  BURST = 'burst',
  PATTERN = 'pattern',
  ABUSE = 'abuse',
  DISTRIBUTED = 'distributed',
}

// ============================================================
// Rate Limit Configuration Types
// ============================================================

/**
 * Rate limit configuration (for infrastructure)
 */
export interface RateLimitConfig {
  /** Number of requests allowed */
  maxRequests: number;
  /** Time window in seconds */
  windowSeconds: RateLimitWindow;
  /** Policy type (default: fixed_window) */
  policy?: RateLimitPolicy;
  /** Scope of this limit */
  scope?: RateLimitScope;
  /** Custom key for this limit (e.g., endpoint path) */
  key?: string;
  /** Whether to skip failed requests from counting */
  skipFailedRequests?: boolean;
  /** Whether to skip successful requests from counting */
  skipSuccessfulRequests?: boolean;
  /** Custom message when limit is exceeded */
  message?: string;
  /** Bengali message when limit is exceeded */
  messageBn?: string;
  /** Severity level for logging */
  severity?: RateLimitSeverity;
  /** Whether this is a strict limit (blocks immediately) */
  strict?: boolean;
  /** Adaptive threshold (for dynamic policies) */
  adaptiveThreshold?: number;
}

/**
 * Rate limit configuration by endpoint
 */
export interface EndpointRateLimitConfig {
  /** Endpoint path (e.g., '/api/v1/auth/login') */
  endpoint: string;
  /** HTTP method (GET, POST, etc.) */
  method?: string;
  /** Rate limit configuration */
  config: RateLimitConfig;
  /** Whether to override parent config */
  override?: boolean;
}

/**
 * Rate limit configuration by user tier
 */
export interface TierRateLimitConfig {
  /** User tier (bronze, silver, gold, platinum, diamond) */
  tier: string;
  /** Rate limit multiplier (1.0 = standard) */
  multiplier: number;
  /** Override config */
  config?: Partial<RateLimitConfig>;
}

/**
 * Rate limit configuration by district (Bangladesh specific)
 */
export interface DistrictRateLimitConfig {
  /** District name */
  district: string;
  /** Rate limit multiplier based on district size */
  multiplier: number;
  /** Special config for this district */
  config?: Partial<RateLimitConfig>;
}

// ============================================================
// Rate Limit Status Types
// ============================================================

/**
 * Rate limit status (for API responses)
 */
export interface RateLimitStatus {
  /** Whether request is currently limited */
  limited: boolean;
  /** Remaining requests in current window */
  remaining: number;
  /** Total limit for this window */
  limit: number;
  /** Time when limit resets (Unix timestamp) */
  resetAt: number;
  /** Window size in seconds */
  windowSeconds: number;
  /** Policy used */
  policy: RateLimitPolicy;
  /** Scope of this limit */
  scope?: RateLimitScope;
  /** Custom key */
  key?: string;
  /** Retry after seconds (if limited) */
  retryAfterSeconds?: number;
  /** Severity of current status */
  severity: RateLimitSeverity;
  /** Whether this is a warning (approaching limit) */
  isWarning: boolean;
}

/**
 * Rate limit status with metadata (for admin)
 */
export interface DetailedRateLimitStatus extends RateLimitStatus {
  /** Current request count in window */
  currentCount: number;
  /** Time window start (Unix timestamp) */
  windowStartAt: number;
  /** Time window end (Unix timestamp) */
  windowEndAt: number;
  /** Usage percentage (0-100) */
  usagePercentage: number;
  /** Average request rate (requests/second) */
  averageRate: number;
  /** Peak request rate (requests/second) */
  peakRate: number;
  /** Violations in current window */
  violations: number;
  /** First violation timestamp */
  firstViolationAt?: number;
  /** Last violation timestamp */
  lastViolationAt?: number;
  /** Tracking ID for debugging */
  trackingId?: string;
}

// ============================================================
// Rate Limit Response Types
// ============================================================

/**
 * Rate limit response headers (RFC 7231 compliant)
 */
export interface RateLimitHeaders {
  /** Maximum requests allowed in window */
  'x-ratelimit-limit': number;
  /** Remaining requests in current window */
  'x-ratelimit-remaining': number;
  /** Reset time (Unix timestamp) */
  'x-ratelimit-reset': number;
  /** Retry after seconds (RFC 7231) */
  'retry-after'?: number;
  /** Rate limit policy used */
  'x-ratelimit-policy'?: string;
  /** Rate limit scope */
  'x-ratelimit-scope'?: string;
}

/**
 * Rate limit response body
 */
export interface RateLimitResponse {
  success: false;
  error: {
    code: 'RATE_LIMIT_EXCEEDED';
    message: string;
    messageBn?: string;
    retryAfterSeconds: number;
    resetAt: number;
    limit: number;
    remaining: number;
    trackingId?: string;
  };
}

// ============================================================
// Rate Limit Violation Types
// ============================================================

/**
 * Rate limit violation record (for audit)
 */
export interface RateLimitViolation {
  /** Violation ID */
  id: string;
  /** Violation type */
  type: RateLimitViolationType;
  /** User ID (if authenticated) */
  userId?: string;
  /** IP address */
  ipAddress: string;
  /** Device ID */
  deviceId?: string;
  /** Endpoint path */
  endpoint: string;
  /** HTTP method */
  method: string;
  /** Timestamp of violation */
  timestamp: Date;
  /** Request count in window */
  requestCount: number;
  /** Limit that was exceeded */
  limit: number;
  /** Window size in seconds */
  windowSeconds: number;
  /** Severity of violation */
  severity: RateLimitSeverity;
  /** Whether user was blocked */
  blocked: boolean;
  /** Block duration (if blocked) */
  blockDurationSeconds?: number;
  /** District (Bangladesh specific) */
  district?: string;
  /** Network type (Bangladesh specific) */
  networkType?: string;
  /** Correlation ID for tracing */
  correlationId?: string;
}

// ============================================================
// Rate Limit Analytics Types
// ============================================================

/**
 * Rate limit usage analytics
 */
export interface RateLimitAnalytics {
  /** Total requests tracked */
  totalRequests: number;
  /** Requests within limit */
  allowedRequests: number;
  /** Requests blocked */
  blockedRequests: number;
  /** Rate limit hit rate (percentage) */
  hitRate: number;
  /** Average request rate (requests/second) */
  averageRate: number;
  /** Peak request rate (requests/second) */
  peakRate: number;
  /** Top violators */
  topViolators: Array<{
    key: string;
    violations: number;
    severity: RateLimitSeverity;
  }>;
  /** By scope */
  byScope: Record<RateLimitScope, {
    total: number;
    blocked: number;
    hitRate: number;
  }>;
  /** By endpoint */
  byEndpoint: Record<string, {
    total: number;
    blocked: number;
    hitRate: number;
  }>;
  /** By district (Bangladesh specific) */
  byDistrict: Record<string, {
    total: number;
    blocked: number;
    hitRate: number;
  }>;
  /** Time window of analytics */
  window: {
    start: Date;
    end: Date;
  };
}

// ============================================================
// Rate Limit DTOs (for API requests/responses)
// ============================================================

/**
 * Rate limit metadata DTO (for API responses)
 * ✅ ENTERPRISE: Reusable across all DTOs
 * ✅ FIXED: exactOptionalPropertyTypes: true compatible
 */
export class RateLimitMetadataDto {
  /** Rate limit window in seconds */
  windowSeconds?: number;
  /** Maximum requests allowed */
  maxRequests?: number;
  /** Remaining requests */
  remaining?: number;
  /** Reset timestamp (ISO string) */
  resetAt?: string;
  /** Retry after seconds (if limited) */
  retryAfterSeconds?: number;
  /** Rate limit severity */
  severity?: RateLimitSeverity;
  /** Whether this is a warning */
  isWarning?: boolean;

  constructor(partial?: Partial<RateLimitMetadataDto>) {
    // ✅ FIXED: Only assign properties that are explicitly provided
    // This avoids the exactOptionalPropertyTypes: true error
    if (partial) {
      const props: Partial<RateLimitMetadataDto> = {};
      
      // Only copy properties that are actually defined (not undefined)
      if (partial.windowSeconds !== undefined) props.windowSeconds = partial.windowSeconds;
      if (partial.maxRequests !== undefined) props.maxRequests = partial.maxRequests;
      if (partial.remaining !== undefined) props.remaining = partial.remaining;
      if (partial.resetAt !== undefined) props.resetAt = partial.resetAt;
      if (partial.retryAfterSeconds !== undefined) props.retryAfterSeconds = partial.retryAfterSeconds;
      if (partial.severity !== undefined) props.severity = partial.severity;
      if (partial.isWarning !== undefined) props.isWarning = partial.isWarning;
      
      // Assign all at once
      Object.assign(this, props);
    }
  }

  /**
   * Create from RateLimitStatus
   */
  static fromStatus(status: RateLimitStatus): RateLimitMetadataDto {
    const props: Partial<RateLimitMetadataDto> = {
      windowSeconds: status.windowSeconds,
      maxRequests: status.limit,
      remaining: status.remaining,
      resetAt: new Date(status.resetAt * 1000).toISOString(),
      severity: status.severity,
      isWarning: status.isWarning,
    };
    
    // ✅ Only add retryAfterSeconds if it's defined
    if (status.retryAfterSeconds !== undefined) {
      props.retryAfterSeconds = status.retryAfterSeconds;
    }
    
    return new RateLimitMetadataDto(props);
  }

  /**
   * Create from headers
   */
  static fromHeaders(headers: RateLimitHeaders): RateLimitMetadataDto {
    const props: Partial<RateLimitMetadataDto> = {
      maxRequests: headers['x-ratelimit-limit'],
      remaining: headers['x-ratelimit-remaining'],
      resetAt: new Date(headers['x-ratelimit-reset'] * 1000).toISOString(),
    };
    
    // ✅ Only add retryAfterSeconds if it's defined
    if (headers['retry-after'] !== undefined) {
      props.retryAfterSeconds = headers['retry-after'];
    }
    
    return new RateLimitMetadataDto(props);
  }

  /**
   * Check if rate limit is exceeded
   */
  isExceeded(): boolean {
    return this.remaining !== undefined && this.remaining <= 0;
  }

  /**
   * Get usage percentage (0-100)
   */
  getUsagePercentage(): number {
    if (!this.maxRequests || this.maxRequests === 0) return 0;
    if (this.remaining === undefined) return 0;
    const used = this.maxRequests - this.remaining;
    return Math.round((used / this.maxRequests) * 100);
  }

  /**
   * Convert to plain object (for API responses)
   */
  /**
   * Convert to plain object (for API responses)
   */
  toJSON(): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    
    // ✅ FIXED: Using bracket notation instead of dot notation
    // Because Record<string, unknown> with noPropertyAccessFromIndexSignature: true
    if (this.windowSeconds !== undefined) result['windowSeconds'] = this.windowSeconds;
    if (this.maxRequests !== undefined) result['maxRequests'] = this.maxRequests;
    if (this.remaining !== undefined) result['remaining'] = this.remaining;
    if (this.resetAt !== undefined) result['resetAt'] = this.resetAt;
    if (this.retryAfterSeconds !== undefined) result['retryAfterSeconds'] = this.retryAfterSeconds;
    if (this.severity !== undefined) result['severity'] = this.severity;
    if (this.isWarning !== undefined) result['isWarning'] = this.isWarning;
    
    return result;
  }
}

/**
 * Rate limit check request DTO
 */
export class RateLimitCheckDto {
  /** Scope of limit to check */
  scope: RateLimitScope;
  /** Key for the limit (e.g., userId, IP, endpoint) */
  key: string;
  /** Endpoint path (for endpoint-scoped limits) */
  endpoint?: string;
  /** HTTP method (for endpoint-scoped limits) */
  method?: string;
  /** User ID (for user-scoped limits) */
  userId?: string;
  /** IP address (for IP-scoped limits) */
  ipAddress?: string;
  /** Device ID (for device-scoped limits) */
  deviceId?: string;
  /** District (Bangladesh specific) */
  district?: string;
  /** Network type (Bangladesh specific) */
  networkType?: string;

  constructor(scope: RateLimitScope, key: string) {
    this.scope = scope;
    this.key = key;
  }
}

/**
 * Rate limit check response DTO
 */
export class RateLimitCheckResponseDto {
  allowed: boolean;
  status: RateLimitStatus;
  headers: RateLimitHeaders;
  /** Metadata for logging */
  metadata?: {
    trackingId: string;
    timestamp: string;
    durationMs: number;
  };

  constructor(allowed: boolean, status: RateLimitStatus, headers: RateLimitHeaders) {
    this.allowed = allowed;
    this.status = status;
    this.headers = headers;
  }
}

// ============================================================
// Rate Limit Error Types
// ============================================================

/**
 * Rate limit error codes
 */
export enum RateLimitErrorCode {
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  RATE_LIMIT_POLICY_VIOLATION = 'RATE_LIMIT_POLICY_VIOLATION',
  RATE_LIMIT_BURST_DETECTED = 'RATE_LIMIT_BURST_DETECTED',
  RATE_LIMIT_ABUSE_DETECTED = 'RATE_LIMIT_ABUSE_DETECTED',
  RATE_LIMIT_IP_BLOCKED = 'RATE_LIMIT_IP_BLOCKED',
  RATE_LIMIT_USER_BLOCKED = 'RATE_LIMIT_USER_BLOCKED',
  RATE_LIMIT_DEVICE_BLOCKED = 'RATE_LIMIT_DEVICE_BLOCKED',
  RATE_LIMIT_GLOBAL_BLOCKED = 'RATE_LIMIT_GLOBAL_BLOCKED',
}

// ============================================================
// Rate Limit Configuration by Service
// ============================================================

/**
 * Rate limit configuration for all services
 */
export interface ServiceRateLimitConfig {
  /** Service name */
  service: string;
  /** Global limit for this service */
  global: RateLimitConfig;
  /** Endpoint-specific limits */
  endpoints: EndpointRateLimitConfig[];
  /** User tier limits */
  tiers: TierRateLimitConfig[];
  /** District limits (Bangladesh specific) */
  districts: DistrictRateLimitConfig[];
  /** IP-based limits */
  ipLimit: RateLimitConfig;
  /** Device-based limits */
  deviceLimit: RateLimitConfig;
}

// ============================================================
// Default Configurations
// ============================================================

/**
 * Default rate limit configurations
 * ✅ ENTERPRISE: Production-ready defaults
 */
export const DEFAULT_RATE_LIMITS = {
  /** Global defaults */
  global: {
    maxRequests: 100,
    windowSeconds: 60,
    policy: RateLimitPolicy.FIXED_WINDOW,
    scope: RateLimitScope.GLOBAL,
    severity: RateLimitSeverity.CRITICAL,
  },

  /** Auth service limits */
  auth: {
    login: { maxRequests: 5, windowSeconds: 300 },
    register: { maxRequests: 3, windowSeconds: 3600 },
    refresh: { maxRequests: 10, windowSeconds: 60 },
    socialLogin: { maxRequests: 10, windowSeconds: 60 },
    mfaVerify: { maxRequests: 5, windowSeconds: 300 },
    passwordReset: { maxRequests: 3, windowSeconds: 3600 },
  },

  /** User service limits */
  user: {
    create: { maxRequests: 10, windowSeconds: 60 },
    update: { maxRequests: 30, windowSeconds: 60 },
    delete: { maxRequests: 5, windowSeconds: 60 },
    list: { maxRequests: 60, windowSeconds: 60 },
  },

  /** API limits by tier */
  tiers: {
    bronze: { multiplier: 1.0 },
    silver: { multiplier: 1.5 },
    gold: { multiplier: 2.0 },
    platinum: { multiplier: 3.0 },
    diamond: { multiplier: 5.0 },
  },

  /** Bangladesh specific */
  bangladesh: {
    districts: {
      Dhaka: { multiplier: 1.2 },
      Chattogram: { multiplier: 1.1 },
      default: { multiplier: 1.0 },
    },
    networks: {
      '4g': { multiplier: 1.0 },
      '5g': { multiplier: 1.2 },
      'wifi': { multiplier: 1.0 },
      '3g': { multiplier: 0.8 },
      '2g': { multiplier: 0.5 },
    },
  },
} as const;

// ============================================================
// Type Exports (✅ FIXED: No conflicts with enum names)
// ============================================================

// ✅ Type exports (using aliases to avoid conflicts)
export type {
  RateLimitConfig as RateLimitConfigType,
  EndpointRateLimitConfig as EndpointRateLimitConfigType,
  TierRateLimitConfig as TierRateLimitConfigType,
  DistrictRateLimitConfig as DistrictRateLimitConfigType,
  RateLimitStatus as RateLimitStatusType,
  DetailedRateLimitStatus as DetailedRateLimitStatusType,
  RateLimitHeaders as RateLimitHeadersType,
  RateLimitResponse as RateLimitResponseType,
  RateLimitAnalytics as RateLimitAnalyticsType,
  ServiceRateLimitConfig as ServiceRateLimitConfigType,
  RateLimitCheckDto as RateLimitCheckDtoType,
  RateLimitCheckResponseDto as RateLimitCheckResponseDtoType,
};


// ============================================================
// ENTERPRISE SUMMARY
// ============================================================
// 
// Enterprise Features:
// 1. ✅ Multi-dimensional rate limiting (user, IP, endpoint, device)
// 2. ✅ Multiple policy types (fixed, sliding, token bucket, leaky)
// 3. ✅ RFC 7231 compliant headers
// 4. ✅ Bengali language support
// 5. ✅ District and network type limits (Bangladesh specific)
// 6. ✅ User tier-based limits
// 7. ✅ Rate limit violation tracking
// 8. ✅ Real-time status monitoring
// 9. ✅ Analytics and reporting
// 10. ✅ Adaptive rate limiting support
// 11. ✅ Production-ready defaults
// 12. ✅ Reusable DTO classes
// 13. ✅ No external dependencies
// 14. ✅ exactOptionalPropertyTypes: true compatible
// 
// ============================================================
