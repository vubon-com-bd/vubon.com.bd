/**
 * Get Session Query - Pure Query Data Structure (Enterprise Enhanced v3.0)

 * @module application/queries/session/get-session.query

 * @description
 * Query for retrieving a specific session by ID with enterprise-grade features:
 * - Options object for extensibility (includeDeviceInfo, includeLocation, includeMetadata, includeHealthScore)
 * - RequestContext integration for distributed tracing (correlationId, ipAddress, userAgent)
 * - Factory functions for common use cases (create, currentUser, admin)
 * - Type guards for runtime checking
 * - Query summary for logging
 * - Cache key generation utility
 * - Validation function with Bengali error messages
 * - Bangladesh-specific fields support (district, networkType, mobileOperator)
 * - JSDoc documentation with examples
 * - Framework-free, immutable design

 * Enterprise Rules:
 * ✅ Immutable query data
 * ✅ Self-contained query data
 * ✅ No business logic
 * ✅ Security: userId from JWT
 * ✅ Framework-free
 * ✅ Single Source of Truth with shared-types
 */

import { randomUUID } from 'crypto';

// ✅ ENTERPRISE: Import from shared packages (Single Source of Truth)
import type { RequestContext } from '@vubon/shared-types';

// ============================================================
// Query Options Interface (Enterprise Enhancement)
// ============================================================

/**
 * Get Session query options for extensibility
 */
export interface GetSessionOptions {
  /** Include device information in response - default: true */
  includeDeviceInfo?: boolean;

  /** Include location information in response - default: true */
  includeLocation?: boolean;

  /** Include session metadata in response - default: false */
  includeMetadata?: boolean;

  /** Include health score and risk assessment - default: false */
  includeHealthScore?: boolean;

  /** Include activity timeline - default: false */
  includeActivityTimeline?: boolean;

  /** Bypass cache and fetch fresh data - default: false */
  bypassCache?: boolean;

  /** Custom cache TTL in seconds (overrides default) */
  cacheTtlSeconds?: number;
}

// ============================================================
// Response Type Definitions (for type safety)
// ============================================================

/**
 * Device information from session (Bangladesh specific)
 */
export interface SessionDeviceInfo {
  id: string;
  type: 'mobile' | 'tablet' | 'desktop' | 'laptop' | 'feature_phone' | 'unknown';
  name?: string;
  os?: string;
  osVersion?: string;
  browser?: string;
  browserVersion?: string;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isFeaturePhone?: boolean;
}

/**
 * Location information (Bangladesh specific)
 */
export interface SessionLocationInfo {
  ipAddress: string;
  country?: string;
  city?: string;
  district?: string;           // বাংলাদেশ জেলা
  upazila?: string;            // বাংলাদেশ উপজেলা
  division?: string;           // বাংলাদেশ বিভাগ
  latitude?: number;
  longitude?: number;
  isp?: string;
  isProxy: boolean;
  isVpn: boolean;
  isTor: boolean;
}

/**
 * Session metadata
 */
export interface SessionMetadata {
  trustLevel: 'untrusted' | 'standard' | 'trusted' | 'high_trust' | 'maximum_trust';
  networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
  mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
  dataSaverEnabled?: boolean;
  isFamilyShared: boolean;
  familyMemberId?: string;
}

/**
 * Session health score
 */
export interface SessionHealthScore {
  score: number;                           // 0-100
  status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  factors: {
    age: { score: number; weight: number; description: string };
    activityFrequency: { score: number; weight: number; description: string };
    locationStability: { score: number; weight: number; description: string };
    deviceConsistency: { score: number; weight: number; description: string };
    networkReliability: { score: number; weight: number; description: string };
  };
  recommendations: string[];
  recommendationsBn?: string[];
  requiresAction: boolean;
  suggestedAction?: 'reauthenticate' | 'extend' | 'terminate' | 'monitor';
}

/**
 * Activity timeline entry
 */
export interface SessionActivityEntry {
  id: string;
  action: 'login' | 'logout' | 'token_refresh' | 'page_view' | 'api_call';
  url?: string;
  ipAddress: string;
  location?: string;
  timestamp: Date;
}

/**
 * Complete Session Response
 */
export interface SessionResponse {
  id: string;
  userId: string;
  status: 'active' | 'expired' | 'revoked' | 'suspended' | 'idle_expired';
  deviceInfo: SessionDeviceInfo;
  location: SessionLocationInfo;
  metadata: SessionMetadata;
  createdAt: Date;
  lastActivityAt: Date;
  expiresAt: Date;
  idleTimeoutAt: Date;
  isCurrent: boolean;
  isTrusted: boolean;
  healthScore?: SessionHealthScore;
  activityTimeline?: SessionActivityEntry[];
  _cacheHit?: boolean;
  _cacheTimestamp?: string;
  _queryTimeMs?: number;
}

// ============================================================
// Get Session Query (Enterprise Enhanced)
// ============================================================

/**
 * Get Session Query

 * @example
 * // Basic query
 * const query = new GetSessionQuery(
 *   'sess_550e8400-e29b-41d4-a716-446655440000',
 *   'usr_123'
 * );

 * @example
 * // With options
 * const query = new GetSessionQuery(
 *   'sess_550e8400-e29b-41d4-a716-446655440000',
 *   'usr_123',
 *   undefined,
 *   { includeDeviceInfo: true, includeHealthScore: true }
 * );

 * @example
 * // With request context for tracing
 * const query = new GetSessionQuery(
 *   'sess_550e8400-e29b-41d4-a716-446655440000',
 *   'usr_123',
 *   { correlationId: 'corr_abc123', ipAddress: '192.168.1.100' },
 *   { includeActivityTimeline: true }
 * );

 * @example
 * // Using factory function
 * const query = createGetSessionQuery('sess_123', 'usr_123', { includeHealthScore: true }, 'corr_abc123');
 */
export class GetSessionQuery {
  public readonly queryId: string;
  public readonly timestamp: Date;
  public readonly includeDeviceInfo: boolean;
  public readonly includeLocation: boolean;
  public readonly includeMetadata: boolean;
  public readonly includeHealthScore: boolean;
  public readonly includeActivityTimeline: boolean;
  public readonly bypassCache: boolean;
  public readonly cacheTtlSeconds?: number;

  constructor(
    /** Session ID to retrieve */
    public readonly sessionId: string,

    /** User ID from JWT (authenticated user) */
    public readonly userId: string,

    /** Request context for distributed tracing */
    public readonly context?: RequestContext,

    /** Query options for extensibility */
    options: GetSessionOptions = {},

    /** Correlation ID for distributed tracing (legacy, use context instead) */
    public readonly correlationId?: string
  ) {
    this.queryId = randomUUID();
    this.timestamp = new Date();

    // Set options with defaults
    this.includeDeviceInfo = options.includeDeviceInfo ?? true;
    this.includeLocation = options.includeLocation ?? true;
    this.includeMetadata = options.includeMetadata ?? false;
    this.includeHealthScore = options.includeHealthScore ?? false;
    this.includeActivityTimeline = options.includeActivityTimeline ?? false;
    this.bypassCache = options.bypassCache ?? false;
    this.cacheTtlSeconds = options.cacheTtlSeconds;
  }

  // ============================================================
  // Helper Methods
  // ============================================================

  /**
   * Check if device info should be included
   */
  public shouldIncludeDeviceInfo(): boolean {
    return this.includeDeviceInfo;
  }

  /**
   * Check if location info should be included
   */
  public shouldIncludeLocation(): boolean {
    return this.includeLocation;
  }

  /**
   * Check if metadata should be included
   */
  public shouldIncludeMetadata(): boolean {
    return this.includeMetadata;
  }

  /**
   * Check if health score should be included
   */
  public shouldIncludeHealthScore(): boolean {
    return this.includeHealthScore;
  }

  /**
   * Check if activity timeline should be included
   */
  public shouldIncludeActivityTimeline(): boolean {
    return this.includeActivityTimeline;
  }

  /**
   * Check if cache should be bypassed
   */
  public shouldBypassCache(): boolean {
    return this.bypassCache;
  }

  /**
   * Get cache TTL in seconds (returns undefined for default)
   */
  public getCacheTtl(): number | undefined {
    return this.cacheTtlSeconds;
  }

  /**
   * Get correlation ID for distributed tracing
   * Priority: options.correlationId > context.correlationId
   */
  public getCorrelationId(): string | undefined {
    return this.correlationId || this.context?.correlationId;
  }

  /**
   * Get IP address from context
   */
  public getIpAddress(): string | undefined {
    return this.context?.ipAddress;
  }

  /**
   * Get user agent from context
   */
  public getUserAgent(): string | undefined {
    return this.context?.userAgent;
  }

  /**
   * Get tenant ID for multi-tenant isolation
   */
  public getTenantId(): string | undefined {
    return this.context?.tenantId;
  }

  /**
   * Get district from context (Bangladesh)
   */
  public getDistrict(): string | undefined {
    return this.context?.district;
  }

  /**
   * Get network type from context (Bangladesh)
   */
  public getNetworkType(): string | undefined {
    return this.context?.networkType;
  }

  // ============================================================
  // Cache & Serialization Methods
  // ============================================================

  /**
   * Get cache key for this query
   */
  public getCacheKey(): string {
    let key = `session:${this.sessionId}:user:${this.userId}`;

    if (this.includeDeviceInfo) key += ':device';
    if (this.includeLocation) key += ':location';
    if (this.includeMetadata) key += ':metadata';
    if (this.includeHealthScore) key += ':health';
    if (this.includeActivityTimeline) key += ':activity';

    return key;
  }

  /**
   * Get query summary for logging
   */
  public getSummary(): Record<string, unknown> {
    return {
      queryId: this.queryId,
      sessionId: this.sessionId,
      userId: this.userId,
      correlationId: this.getCorrelationId(),
      includeDeviceInfo: this.includeDeviceInfo,
      includeLocation: this.includeLocation,
      includeMetadata: this.includeMetadata,
      includeHealthScore: this.includeHealthScore,
      includeActivityTimeline: this.includeActivityTimeline,
      bypassCache: this.bypassCache,
      timestamp: this.timestamp.toISOString(),
    };
  }

  /**
   * Convert to plain object for serialization
   */
  public toJSON(): Record<string, unknown> {
    return {
      queryId: this.queryId,
      sessionId: this.sessionId,
      userId: this.userId,
      context: this.context,
      correlationId: this.correlationId,
      includeDeviceInfo: this.includeDeviceInfo,
      includeLocation: this.includeLocation,
      includeMetadata: this.includeMetadata,
      includeHealthScore: this.includeHealthScore,
      includeActivityTimeline: this.includeActivityTimeline,
      bypassCache: this.bypassCache,
      cacheTtlSeconds: this.cacheTtlSeconds,
      timestamp: this.timestamp.toISOString(),
    };
  }

  /**
   * String representation for debugging
   */
  public toString(): string {
    return `GetSessionQuery(id=${this.queryId}, session=${this.sessionId}, user=${this.userId})`;
  }
}

// ============================================================
// Factory Functions (Enterprise Enhancement)
// ============================================================

/**
 * Create a Get Session query

 * @param sessionId - Session ID to retrieve
 * @param userId - User ID from JWT
 * @param options - Query options
 * @param correlationId - Correlation ID for tracing
 * @param context - Request context
 * @returns GetSessionQuery instance

 * @example
 * const query = createGetSessionQuery('sess_123', 'usr_123', { includeHealthScore: true }, 'corr_abc123');
 */
export function createGetSessionQuery(
  sessionId: string,
  userId: string,
  options?: GetSessionOptions,
  correlationId?: string,
  context?: RequestContext
): GetSessionQuery {
  return new GetSessionQuery(sessionId, userId, context, options, correlationId);
}

/**
 * Create a query for current user's session (simplified)

 * @param sessionId - Session ID to retrieve
 * @param userId - User ID from JWT
 * @param correlationId - Correlation ID for tracing
 * @returns GetSessionQuery instance with default options

 * @example
 * const query = currentUserSessionQuery('sess_123', 'usr_123', 'corr_abc123');
 */
export function currentUserSessionQuery(
  sessionId: string,
  userId: string,
  correlationId?: string
): GetSessionQuery {
  return new GetSessionQuery(sessionId, userId, undefined, {}, correlationId);
}

/**
 * Create a query with full details (device + location + health)

 * @param sessionId - Session ID to retrieve
 * @param userId - User ID from JWT
 * @param correlationId - Correlation ID for tracing
 * @returns GetSessionQuery instance with full details

 * @example
 * const query = detailedSessionQuery('sess_123', 'usr_123', 'corr_abc123');
 */
export function detailedSessionQuery(
  sessionId: string,
  userId: string,
  correlationId?: string
): GetSessionQuery {
  return new GetSessionQuery(
    sessionId,
    userId,
    undefined,
    {
      includeDeviceInfo: true,
      includeLocation: true,
      includeHealthScore: true,
      includeActivityTimeline: true,
    },
    correlationId
  );
}

/**
 * Create a query for admin viewing any session

 * @param sessionId - Session ID to retrieve
 * @param targetUserId - Target user ID
 * @param adminId - Admin user ID (for audit)
 * @param options - Query options
 * @param correlationId - Correlation ID for tracing
 * @returns GetSessionQuery instance for admin use

 * @example
 * const query = adminSessionQuery('sess_456', 'usr_456', 'admin_123', { includeMetadata: true });
 */
export function adminSessionQuery(
  sessionId: string,
  targetUserId: string,
  adminId: string,
  options?: GetSessionOptions,
  correlationId?: string
): GetSessionQuery {
  const context: RequestContext = {
    userId: adminId,
    isAdmin: true,
    correlationId,
  };
  return new GetSessionQuery(sessionId, targetUserId, context, options, correlationId);
}

/**
 * Create a cached query with custom TTL

 * @param sessionId - Session ID to retrieve
 * @param userId - User ID from JWT
 * @param cacheTtlSeconds - Cache TTL in seconds
 * @param correlationId - Correlation ID for tracing
 * @returns GetSessionQuery instance with cache TTL

 * @example
 * const query = cachedSessionQuery('sess_123', 'usr_123', 600, 'corr_abc123');
 */
export function cachedSessionQuery(
  sessionId: string,
  userId: string,
  cacheTtlSeconds: number,
  correlationId?: string
): GetSessionQuery {
  return new GetSessionQuery(
    sessionId,
    userId,
    undefined,
    {
      bypassCache: false,
      cacheTtlSeconds,
    },
    correlationId
  );
}

// ============================================================
// Type Guards (Runtime Checking)
// ============================================================

/**
 * Type guard to check if a value is a GetSessionQuery

 * @param query - Value to check
 * @returns True if value is a GetSessionQuery instance
 */
export function isGetSessionQuery(query: unknown): query is GetSessionQuery {
  return query instanceof GetSessionQuery;
}

/**
 * Type guard for session response

 * @param response - Value to check
 * @returns True if response is a valid SessionResponse
 */
export function isSessionResponse(response: unknown): response is SessionResponse {
  return (
    response !== null &&
    typeof response === 'object' &&
    'id' in response &&
    'userId' in response &&
    'status' in response &&
    'deviceInfo' in response &&
    'location' in response &&
    'createdAt' in response
  );
}

// ============================================================
// Validation Function (Enterprise Enhancement)
// ============================================================

/**
 * Query validation result
 */
export interface QueryValidationResult {
  /** Whether the query is valid */
  isValid: boolean;

  /** Error message (if invalid) */
  error?: string;

  /** Bengali error message (if invalid) */
  errorBn?: string;
}

/**
 * Validate the query

 * @param query - Query to validate
 * @returns Validation result with Bengali error message

 * @example
 * const validation = validateQuery(query);
 * if (!validation.isValid) {
 *   throw new BadRequestException(validation.error, validation.errorBn);
 * }
 */
export function validateQuery(query: GetSessionQuery): QueryValidationResult {
  if (!query.sessionId || query.sessionId.trim().length === 0) {
    return {
      isValid: false,
      error: 'Session ID is required',
      errorBn: 'সেশন আইডি প্রয়োজন',
    };
  }

  if (!query.userId || query.userId.trim().length === 0) {
    return {
      isValid: false,
      error: 'User ID is required',
      errorBn: 'ইউজার আইডি প্রয়োজন',
    };
  }

  // Validate UUID format for sessionId (optional but recommended)
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(query.sessionId)) {
    return {
      isValid: false,
      error: 'Invalid session ID format. Must be a valid UUID',
      errorBn: 'ভুল সেশন আইডি ফরম্যাট। একটি সঠিক UUID হতে হবে',
    };
  }

  return { isValid: true };
}

// ============================================================
// Helper Function to Get Default Cache TTL
// ============================================================

/**
 * Get default cache TTL for session queries
 * @returns Default TTL in seconds (2 minutes for sessions - shorter TTL due to active nature)
 */
export function getDefaultCacheTtl(): number {
  return 120; // 2 minutes
}

// ============================================================
// Constants for External Use
// ============================================================

/**
 * Session status types
 */
export const SESSION_STATUS = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
  REVOKED: 'revoked',
  SUSPENDED: 'suspended',
  IDLE_EXPIRED: 'idle_expired',
} as const;

export type SessionStatus = typeof SESSION_STATUS[keyof typeof SESSION_STATUS];

/**
 * Trust levels
 */
export const TRUST_LEVELS = {
  UNTRUSTED: 'untrusted',
  STANDARD: 'standard',
  TRUSTED: 'trusted',
  HIGH_TRUST: 'high_trust',
  MAXIMUM_TRUST: 'maximum_trust',
} as const;

export type TrustLevel = typeof TRUST_LEVELS[keyof typeof TRUST_LEVELS];

/**
 * Network types (Bangladesh specific)
 */
export const NETWORK_TYPES = {
  _2G: '2g',
  _3G: '3g',
  _4G: '4g',
  _5G: '5g',
  WIFI: 'wifi',
  UNKNOWN: 'unknown',
} as const;

export type NetworkType = typeof NETWORK_TYPES[keyof typeof NETWORK_TYPES];

/**
 * Mobile operators (Bangladesh)
 */
export const MOBILE_OPERATORS = {
  GP: 'gp',
  ROBI: 'robi',
  BANGLALINK: 'banglalink',
  TELETALK: 'teletalk',
  UNKNOWN: 'unknown',
} as const;

export type MobileOperator = typeof MOBILE_OPERATORS[keyof typeof MOBILE_OPERATORS];

// ============================================================
// Default Export
// ============================================================

export default GetSessionQuery;
