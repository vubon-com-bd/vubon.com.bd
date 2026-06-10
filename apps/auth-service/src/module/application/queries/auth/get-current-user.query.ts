/**
 * Get Current User Query - Pure Query Data Structure (Enterprise Enhanced)
 * 
 * @module application/queries/auth/get-current-user.query
 * 
 * @description
 * Query for retrieving current authenticated user information.
 * Note: userId is NOT accepted from client - comes from JWT.
 * 
 * ENTERPRISE ENHANCEMENTS:
 * ✅ Shared-types integration for RequestContext
 * ✅ Factory functions for common use cases
 * ✅ Type guards for runtime checking
 * ✅ Query summary for logging
 * ✅ JSON serialization support
 * ✅ Bangladesh-specific fields support
 * ✅ Distributed tracing with correlation ID
 * ✅ Cache key generation utility
 * ✅ Response type definition with Bangladesh fields
 * 
 * Enterprise Rules:
 * ✅ Immutable query data
 * ✅ Self-contained use case data
 * ✅ No business logic
 * ✅ Security: userId from JWT, not from client
 * ✅ Framework-free
 */

import { randomUUID } from 'crypto';

// ✅ ENTERPRISE: Import from shared packages (Single Source of Truth)
import type { RequestContext } from '@vubon/shared-types';

// ============================================================
// Query Response Type (Enterprise Enhanced)
// ============================================================

/**
 * Current user response with Bangladesh-specific fields
 */
export interface CurrentUserResponse {
  /** User unique identifier */
  id: string;
  
  /** User email address */
  email: string;
  
  /** User phone number (E.164 format) */
  phoneNumber?: string;
  
  /** User full name */
  fullName: string;
  
  /** Display name (derived from full name or custom) */
  displayName?: string;
  
  /** Profile picture URL */
  avatar?: string;
  
  /** User role (e.g., ADMIN, USER, SELLER, VENDOR) */
  role: string;
  
  /** User tier for loyalty program (BRONZE, SILVER, GOLD, PLATINUM, DIAMOND) */
  tier: string;
  
  /** Whether email is verified */
  isEmailVerified: boolean;
  
  /** Whether phone number is verified */
  isPhoneVerified: boolean;
  
  /** Whether MFA is enabled for this user */
  mfaEnabled: boolean;
  
  /** User permissions (from role) */
  permissions: string[];
  
  /** Last login timestamp */
  lastLoginAt?: Date;
  
  /** Account creation timestamp */
  createdAt: Date;
  
  /** Last update timestamp */
  updatedAt?: Date;
  
  // ✅ ENTERPRISE: Bangladesh-specific fields
  /** Preferred district (Bangladesh) */
  preferredDistrict?: string;
  
  /** Preferred upazila/sub-district (Bangladesh) */
  preferredUpazila?: string;
  
  /** Preferred language (en/bn) */
  preferredLanguage?: 'en' | 'bn';
  
  /** Current district (from last login) */
  district?: string;
  
  /** Current division (from last login) */
  division?: string;
  
  /** Mobile operator detection (GP, Robi, Banglalink, Teletalk) */
  mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
  
  /** Network type at last login (2G/3G/4G/5G/WiFi) */
  networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
  
  /** Whether user is a vendor (has shop) */
  isVendor?: boolean;
  
  /** Whether user has completed KYC verification */
  isKycVerified?: boolean;
  
  /** Total amount spent (for tier calculation) */
  totalSpent?: number;
}

// ============================================================
// Get Current User Query (Enterprise Enhanced)
// ============================================================

/**
 * Get Current User Query
 * 
 * @example
 * // Basic query
 * const query = new GetCurrentUserQuery('usr_123');
 * 
 * @example
 * // With includeSensitive flag (includes email/phone)
 * const query = new GetCurrentUserQuery('usr_123', true);
 * 
 * @example
 * // With request context for tracing
 * const query = new GetCurrentUserQuery(
 *   'usr_123',
 *   true,
 *   { correlationId: 'corr_abc123', tenantId: 'tenant_1' }
 * );
 * 
 * @example
 * // Using factory function
 * const query = createGetCurrentUserQuery('usr_123', true, 'corr_abc123');
 */
export class GetCurrentUserQuery {
  public readonly queryId: string;
  public readonly timestamp: Date;

  constructor(
    /** User ID from JWT (required) */
    public readonly userId: string,
    
    /** Include sensitive data (email, phone) - default: false */
    public readonly includeSensitive: boolean = false,
    
    /** Request context for distributed tracing and tenant isolation */
    public readonly context?: RequestContext,
    
    /** Additional options */
    public readonly options?: {
      /** Include permissions in response */
      includePermissions?: boolean;
      /** Include user preferences */
      includePreferences?: boolean;
      /** Include activity summary */
      includeActivitySummary?: boolean;
      /** Bypass cache and fetch fresh data */
      bypassCache?: boolean;
      /** Custom cache TTL in seconds */
      cacheTtlSeconds?: number;
    }
  ) {
    this.queryId = randomUUID();
    this.timestamp = new Date();
  }

  // ============================================================
  // Type Guards
  // ============================================================

  /**
   * Check if sensitive data should be included
   */
  public shouldIncludeSensitive(): boolean {
    return this.includeSensitive === true;
  }

  /**
   * Check if permissions should be included
   */
  public shouldIncludePermissions(): boolean {
    return this.options?.includePermissions === true;
  }

  /**
   * Check if preferences should be included
   */
  public shouldIncludePreferences(): boolean {
    return this.options?.includePreferences === true;
  }

  /**
   * Check if activity summary should be included
   */
  public shouldIncludeActivitySummary(): boolean {
    return this.options?.includeActivitySummary === true;
  }

  /**
   * Check if cache should be bypassed
   */
  public shouldBypassCache(): boolean {
    return this.options?.bypassCache === true;
  }

  /**
   * Get custom cache TTL
   */
  public getCacheTtlSeconds(): number | undefined {
    return this.options?.cacheTtlSeconds;
  }

  // ============================================================
  // Getter Methods
  // ============================================================

  /**
   * Get correlation ID for distributed tracing
   */
  public getCorrelationId(): string | undefined {
    return this.context?.correlationId;
  }

  /**
   * Get tenant ID for multi-tenant isolation
   */
  public getTenantId(): string | undefined {
    return this.context?.tenantId;
  }

  /**
   * Get span ID for distributed tracing
   */
  public getSpanId(): string | undefined {
    return this.context?.spanId;
  }

  /**
   * Get user agent from context
   */
  public getUserAgent(): string | undefined {
    return this.context?.userAgent;
  }

  /**
   * Get IP address from context
   */
  public getIpAddress(): string | undefined {
    return this.context?.ipAddress;
  }

  /**
   * Get district from context (Bangladesh)
   */
  public getDistrict(): string | undefined {
    return this.context?.district;
  }

  /**
   * Get division from context (Bangladesh)
   */
  public getDivision(): string | undefined {
    return this.context?.division;
  }

  /**
   * Get network type from context
   */
  public getNetworkType(): string | undefined {
    return this.context?.networkType;
  }

  // ============================================================
  // Utility Methods
  // ============================================================

  /**
   * Get cache key for this query
   */
  public getCacheKey(): string {
    const baseKey = `user:${this.userId}`;
    const parts = [baseKey];
    
    if (this.shouldIncludePermissions()) parts.push('perms');
    if (this.shouldIncludePreferences()) parts.push('prefs');
    if (this.shouldIncludeActivitySummary()) parts.push('activity');
    
    return parts.join(':');
  }

  /**
   * Get query summary for logging
   */
  public getSummary(): Record<string, unknown> {
    return {
      queryId: this.queryId,
      userId: this.userId,
      includeSensitive: this.includeSensitive,
      includePermissions: this.shouldIncludePermissions(),
      includePreferences: this.shouldIncludePreferences(),
      includeActivitySummary: this.shouldIncludeActivitySummary(),
      bypassCache: this.shouldBypassCache(),
      correlationId: this.getCorrelationId(),
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
      includeSensitive: this.includeSensitive,
      options: this.options,
      context: this.context,
      timestamp: this.timestamp.toISOString(),
    };
  }

  /**
   * String representation for debugging
   */
  public toString(): string {
    return `GetCurrentUserQuery(id=${this.queryId}, userId=${this.userId}, includeSensitive=${this.includeSensitive})`;
  }
}

// ============================================================
// Factory Functions (Enterprise Enhancement)
// ============================================================

/**
 * Create a basic current user query
 * 
 * @param userId - User ID from JWT
 * @param includeSensitive - Include sensitive data (email, phone)
 * @param correlationId - Correlation ID for tracing
 * @returns GetCurrentUserQuery instance
 */
export function createGetCurrentUserQuery(
  userId: string,
  includeSensitive: boolean = false,
  correlationId?: string
): GetCurrentUserQuery {
  const context: RequestContext = correlationId ? { correlationId } : {};
  return new GetCurrentUserQuery(userId, includeSensitive, context);
}

/**
 * Create a full-featured current user query with all options
 * 
 * @param userId - User ID from JWT
 * @param options - Query options
 * @param context - Request context
 * @returns GetCurrentUserQuery instance
 */
export function createFullCurrentUserQuery(
  userId: string,
  options?: {
    includeSensitive?: boolean;
    includePermissions?: boolean;
    includePreferences?: boolean;
    includeActivitySummary?: boolean;
    bypassCache?: boolean;
    cacheTtlSeconds?: number;
  },
  context?: RequestContext
): GetCurrentUserQuery {
  return new GetCurrentUserQuery(
    userId,
    options?.includeSensitive ?? false,
    context,
    {
      includePermissions: options?.includePermissions,
      includePreferences: options?.includePreferences,
      includeActivitySummary: options?.includeActivitySummary,
      bypassCache: options?.bypassCache,
      cacheTtlSeconds: options?.cacheTtlSeconds,
    }
  );
}

/**
 * Create a query for admin use (includes all data)
 * 
 * @param userId - User ID from JWT (admin user)
 * @param targetUserId - Target user ID to query
 * @param adminContext - Admin context with permissions
 * @returns GetCurrentUserQuery instance
 */
export function createAdminUserQuery(
  targetUserId: string,
  adminContext?: RequestContext
): GetCurrentUserQuery {
  return new GetCurrentUserQuery(
    targetUserId,
    true, // include sensitive data
    {
      ...adminContext,
      isAdmin: true,
    },
    {
      includePermissions: true,
      includePreferences: true,
      includeActivitySummary: true,
      bypassCache: false,
    }
  );
}

// ============================================================
// Type Guards (Runtime Checking)
// ============================================================

/**
 * Type guard to check if a value is a GetCurrentUserQuery
 * 
 * @param query - Value to check
 * @returns True if value is a GetCurrentUserQuery instance
 */
export function isGetCurrentUserQuery(query: unknown): query is GetCurrentUserQuery {
  return query instanceof GetCurrentUserQuery;
}

/**
 * Type guard for current user response
 * 
 * @param response - Value to check
 * @returns True if value is a valid CurrentUserResponse
 */
export function isCurrentUserResponse(response: unknown): response is CurrentUserResponse {
  return (
    response !== null &&
    typeof response === 'object' &&
    'id' in response &&
    'email' in response &&
    'fullName' in response &&
    'role' in response &&
    'tier' in response
  );
}

// ============================================================
// Response Helper Functions
// ============================================================

/**
 * Create a successful current user response
 * 
 * @param user - User data
 * @param includeSensitive - Whether to include sensitive data
 * @returns Formatted current user response
 */
export function createCurrentUserResponse(
  user: {
    id: string;
    email: string;
    phoneNumber?: string;
    fullName: string;
    displayName?: string;
    avatar?: string;
    role: string;
    tier: string;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    mfaEnabled: boolean;
    permissions: string[];
    lastLoginAt?: Date;
    createdAt: Date;
    updatedAt?: Date;
    preferredDistrict?: string;
    preferredUpazila?: string;
    preferredLanguage?: 'en' | 'bn';
    district?: string;
    division?: string;
    mobileOperator?: string;
    networkType?: string;
    isVendor?: boolean;
    isKycVerified?: boolean;
    totalSpent?: number;
  },
  includeSensitive: boolean = false
): CurrentUserResponse {
  const response: CurrentUserResponse = {
    id: user.id,
    email: includeSensitive ? user.email : maskEmail(user.email),
    fullName: user.fullName,
    role: user.role,
    tier: user.tier,
    isEmailVerified: user.isEmailVerified,
    isPhoneVerified: user.isPhoneVerified,
    mfaEnabled: user.mfaEnabled,
    permissions: user.permissions,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    preferredDistrict: user.preferredDistrict,
    preferredUpazila: user.preferredUpazila,
    preferredLanguage: user.preferredLanguage,
    district: user.district,
    division: user.division,
    mobileOperator: user.mobileOperator,
    networkType: user.networkType,
    isVendor: user.isVendor,
    isKycVerified: user.isKycVerified,
    totalSpent: user.totalSpent,
  };

  // Optional fields
  if (user.displayName) response.displayName = user.displayName;
  if (user.avatar) response.avatar = user.avatar;
  if (includeSensitive && user.phoneNumber) response.phoneNumber = user.phoneNumber;
  if (user.lastLoginAt) response.lastLoginAt = user.lastLoginAt;

  return response;
}

/**
 * Mask email for privacy (when includeSensitive is false)
 * 
 * @param email - Email address to mask
 * @returns Masked email (e.g., u***r@example.com)
 */
function maskEmail(email: string): string {
  const [localPart, domain] = email.split('@');
  if (!localPart || !domain) return email;
  if (localPart.length <= 2) {
    return `${localPart[0]}***@${domain}`;
  }
  const firstChar = localPart[0];
  const lastChar = localPart[localPart.length - 1];
  return `${firstChar}***${lastChar}@${domain}`;
}

/**
 * Remove sensitive data from response
 * 
 * @param response - Full response with sensitive data
 * @returns Response without sensitive data
 */
export function removeSensitiveData(response: CurrentUserResponse): CurrentUserResponse {
  const { email, phoneNumber, ...rest } = response;
  return {
    ...rest,
    email: maskEmail(response.email),
  };
}

// ============================================================
// Query Validation Result
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
 * 
 * @param query - Query to validate
 * @returns Validation result
 */
export function validateQuery(query: GetCurrentUserQuery): QueryValidationResult {
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
// Default Export
// ============================================================

export default GetCurrentUserQuery;
