/**
 * Get MFA Status Query - Pure Query Data Structure (Enterprise Enhanced v3.0)

 * @module application/queries/mfa/get-mfa-status.query

 * @description
 * Query for retrieving MFA status for the authenticated user.
 * Note: userId is NOT accepted from client - comes from JWT.

 * ENTERPRISE ENHANCEMENTS:
 * ✅ Options object for extensibility (includeSensitive, bypassCache, cacheTtl, includeMethodDetails, includeHealthScore)
 * ✅ RequestContext integration for distributed tracing (correlationId, ipAddress, userAgent)
 * ✅ Factory functions for common use cases (create, self, admin)
 * ✅ Type guards for runtime checking
 * ✅ Query summary for logging
 * ✅ Cache key generation utility
 * ✅ Validation function with Bengali error message
 * ✅ JSDoc documentation with examples
 * ✅ Framework-free, immutable design

 * Enterprise Rules:
 * ✅ Immutable query data
 * ✅ Self-contained query data
 * ✅ No business logic
 * ✅ Security: userId from JWT
 * ✅ Framework-free
 */

import { randomUUID } from 'crypto';

// ✅ ENTERPRISE: Import from shared packages (Single Source of Truth)
import type { RequestContext } from '@vubon/shared-types';

// ============================================================
// Query Options Interface (Enterprise Enhancement)
// ============================================================

/**
 * Get MFA Status query options for extensibility
 */
export interface GetMfaStatusOptions {
  /** Include sensitive data (masked phone/email) - default: false */
  includeSensitive?: boolean;

  /** Bypass cache and fetch fresh data - default: false */
  bypassCache?: boolean;

  /** Custom cache TTL in seconds (overrides default) */
  cacheTtlSeconds?: number;

  /** Include method details (type, priority, etc.) - default: true */
  includeMethodDetails?: boolean;

  /** Include health score and recommendations - default: true */
  includeHealthScore?: boolean;
}

// ============================================================
// Response Type Definition (for type safety)
// ============================================================

/**
 * Individual MFA method status (used in handler response)
 */
export interface MfaMethodStatus {
  id: string;
  type: string;
  displayName: string;
  displayNameBn?: string;
  isPrimary: boolean;
  isVerified: boolean;
  isLocked: boolean;
  maskedIdentifier?: string;
  remainingAttempts: number;
  remainingLockTimeMinutes?: number;
  createdAt: string;
  lastUsedAt?: string;
  priority: number;
  iconName: string;
  iconColor: string;
}

/**
 * Enhanced MFA Status Response
 */
export interface MfaStatusResponse {
  enabled: boolean;
  totalMethods: number;
  methods: MfaMethodStatus[];
  primaryMethodId?: string;
  recommendedMethod?: {
    type: string;
    reason: string;
    reasonBn?: string;
  };
  status: 'healthy' | 'warning' | 'critical';
  hasBackupCodes: boolean;
  remainingBackupCodes: number;
  areBackupCodesLow: boolean;
  healthScore: number;
  healthStatus: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  healthRecommendations: string[];
  hasLockedMethod: boolean;
  whatsappAvailable?: boolean;
  bkashAvailable?: boolean;
  nagadAvailable?: boolean;
  rocketAvailable?: boolean;
  _cacheHit?: boolean;
  _cacheTimestamp?: string;
  _queryTimeMs?: number;
}

// ============================================================
// Get MFA Status Query (Enterprise Enhanced)
// ============================================================

/**
 * Get MFA Status Query

 * @example
 * // Basic query
 * const query = new GetMfaStatusQuery('usr_123');

 * @example
 * // With options
 * const query = new GetMfaStatusQuery(
 *   'usr_123',
 *   undefined,
 *   { includeSensitive: true, bypassCache: false }
 * );

 * @example
 * // With request context for tracing
 * const query = new GetMfaStatusQuery(
 *   'usr_123',
 *   { correlationId: 'corr_abc123', ipAddress: '192.168.1.100' },
 *   { includeHealthScore: true }
 * );

 * @example
 * // Using factory function
 * const query = createGetMfaStatusQuery('usr_123', { includeSensitive: true }, 'corr_abc123');
 */
export class GetMfaStatusQuery {
  public readonly queryId: string;
  public readonly timestamp: Date;
  public readonly includeSensitive: boolean;
  public readonly bypassCache: boolean;
  public readonly cacheTtlSeconds?: number;
  public readonly includeMethodDetails: boolean;
  public readonly includeHealthScore: boolean;

  constructor(
    /** User ID from JWT (authenticated user) */
    public readonly userId: string,

    /** Request context for distributed tracing */
    public readonly context?: RequestContext,

    /** Query options for extensibility */
    options: GetMfaStatusOptions = {},

    /** Correlation ID for distributed tracing (legacy, use context instead) */
    public readonly correlationId?: string
  ) {
    this.queryId = randomUUID();
    this.timestamp = new Date();

    // Set options with defaults
    this.includeSensitive = options.includeSensitive ?? false;
    this.bypassCache = options.bypassCache ?? false;
    this.cacheTtlSeconds = options.cacheTtlSeconds;
    this.includeMethodDetails = options.includeMethodDetails ?? true;
    this.includeHealthScore = options.includeHealthScore ?? true;
  }

  // ============================================================
  // Helper Methods
  // ============================================================

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

  // ============================================================
  // Cache & Serialization Methods
  // ============================================================

  /**
   * Get cache key for this query
   */
  public getCacheKey(): string {
    let key = `mfa:status:${this.userId}`;
    if (this.includeMethodDetails) key += ':details';
    if (this.includeHealthScore) key += ':health';
    if (this.includeSensitive) key += ':sensitive';
    return key;
  }

  /**
   * Get query summary for logging
   */
  public getSummary(): Record<string, unknown> {
    return {
      queryId: this.queryId,
      userId: this.userId,
      correlationId: this.getCorrelationId(),
      includeSensitive: this.includeSensitive,
      includeMethodDetails: this.includeMethodDetails,
      includeHealthScore: this.includeHealthScore,
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
      userId: this.userId,
      context: this.context,
      correlationId: this.correlationId,
      includeSensitive: this.includeSensitive,
      includeMethodDetails: this.includeMethodDetails,
      includeHealthScore: this.includeHealthScore,
      bypassCache: this.bypassCache,
      cacheTtlSeconds: this.cacheTtlSeconds,
      timestamp: this.timestamp.toISOString(),
    };
  }

  /**
   * String representation for debugging
   */
  public toString(): string {
    return `GetMfaStatusQuery(id=${this.queryId}, userId=${this.userId})`;
  }
}

// ============================================================
// Factory Functions (Enterprise Enhancement)
// ============================================================

/**
 * Create a Get MFA Status query for the authenticated user

 * @param userId - User ID from JWT
 * @param options - Query options
 * @param correlationId - Correlation ID for tracing
 * @param context - Request context
 * @returns GetMfaStatusQuery instance

 * @example
 * const query = createGetMfaStatusQuery('usr_123', { includeSensitive: true }, 'corr_abc123');
 */
export function createGetMfaStatusQuery(
  userId: string,
  options?: GetMfaStatusOptions,
  correlationId?: string,
  context?: RequestContext
): GetMfaStatusQuery {
  return new GetMfaStatusQuery(userId, context, options, correlationId);
}

/**
 * Create a query for the current user (simplified)

 * @param userId - User ID from JWT
 * @param correlationId - Correlation ID for tracing
 * @returns GetMfaStatusQuery instance with default options

 * @example
 * const query = selfMfaStatusQuery('usr_123', 'corr_abc123');
 */
export function selfMfaStatusQuery(
  userId: string,
  correlationId?: string
): GetMfaStatusQuery {
  return new GetMfaStatusQuery(userId, undefined, undefined, correlationId);
}

/**
 * Create a query for admin viewing another user's MFA status

 * @param userId - Target user ID
 * @param adminId - Admin user ID (for audit)
 * @param options - Query options
 * @param correlationId - Correlation ID for tracing
 * @returns GetMfaStatusQuery instance for admin use

 * @example
 * const query = adminMfaStatusQuery('usr_456', 'admin_123', { includeSensitive: true });
 */
export function adminMfaStatusQuery(
  userId: string,
  adminId: string,
  options?: GetMfaStatusOptions,
  correlationId?: string
): GetMfaStatusQuery {
  const context: RequestContext = {
    userId: adminId,
    isAdmin: true,
    correlationId,
  };
  return new GetMfaStatusQuery(userId, context, options, correlationId);
}

/**
 * Create a query with full details (methods + health score)

 * @param userId - User ID
 * @param correlationId - Correlation ID for tracing
 * @returns GetMfaStatusQuery instance with full details

 * @example
 * const query = detailedMfaStatusQuery('usr_123', 'corr_abc123');
 */
export function detailedMfaStatusQuery(
  userId: string,
  correlationId?: string
): GetMfaStatusQuery {
  return new GetMfaStatusQuery(
    userId,
    undefined,
    {
      includeMethodDetails: true,
      includeHealthScore: true,
      includeSensitive: false,
    },
    correlationId
  );
}

/**
 * Create a cached query with custom TTL

 * @param userId - User ID
 * @param cacheTtlSeconds - Cache TTL in seconds
 * @param correlationId - Correlation ID for tracing
 * @returns GetMfaStatusQuery instance with cache TTL

 * @example
 * const query = cachedMfaStatusQuery('usr_123', 600, 'corr_abc123');
 */
export function cachedMfaStatusQuery(
  userId: string,
  cacheTtlSeconds: number,
  correlationId?: string
): GetMfaStatusQuery {
  return new GetMfaStatusQuery(
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
 * Type guard to check if a value is a GetMfaStatusQuery

 * @param query - Value to check
 * @returns True if value is a GetMfaStatusQuery instance
 */
export function isGetMfaStatusQuery(query: unknown): query is GetMfaStatusQuery {
  return query instanceof GetMfaStatusQuery;
}

/**
 * Type guard for MFA status response

 * @param response - Value to check
 * @returns True if response is a valid MfaStatusResponse
 */
export function isMfaStatusResponse(response: unknown): response is MfaStatusResponse {
  return (
    response !== null &&
    typeof response === 'object' &&
    'enabled' in response &&
    'totalMethods' in response &&
    'methods' in response &&
    Array.isArray((response as MfaStatusResponse).methods)
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
export function validateQuery(query: GetMfaStatusQuery): QueryValidationResult {
  if (!query.userId || query.userId.trim().length === 0) {
    return {
      isValid: false,
      error: 'User ID is required',
      errorBn: 'ইউজার আইডি প্রয়োজন',
    };
  }

  return { isValid: true };
}

// ============================================================
// Helper Function to Get Default Cache TTL
// ============================================================

/**
 * Get default cache TTL for MFA status queries
 * @returns Default TTL in seconds (5 minutes)
 */
export function getDefaultCacheTtl(): number {
  return 300; // 5 minutes
}

// ============================================================
// Constants for External Use
// ============================================================

/**
 * Available MFA status health levels
 */
export const MFA_HEALTH_LEVELS = {
  EXCELLENT: 'excellent',
  GOOD: 'good',
  FAIR: 'fair',
  POOR: 'poor',
  CRITICAL: 'critical',
} as const;

export type MFAHealthLevel = typeof MFA_HEALTH_LEVELS[keyof typeof MFA_HEALTH_LEVELS];

/**
 * Overall MFA status levels
 */
export const MFA_OVERALL_STATUS = {
  HEALTHY: 'healthy',
  WARNING: 'warning',
  CRITICAL: 'critical',
} as const;

export type MFAOverallStatus = typeof MFA_OVERALL_STATUS[keyof typeof MFA_OVERALL_STATUS];

// ============================================================
// Default Export
// ============================================================

export default GetMfaStatusQuery;
