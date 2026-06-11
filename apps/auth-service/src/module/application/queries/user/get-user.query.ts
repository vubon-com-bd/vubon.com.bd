/**
 * Get User Query - Pure Query Data Structure (Enterprise Enhanced v2.0)
 * 
 * @module application/queries/user/get-user.query
 * 
 * @description
 * Query for retrieving user details by ID with enterprise-grade features:
 * - Permission-based field exposure (sensitive data only for self/admin)
 * - Role-based access control with shared-constants
 * - Distributed tracing support with correlation ID
 * - Multi-language error message ready
 * - Factory functions for common use cases
 * - Type guards for runtime checking
 * - Query summary for logging
 * - Cache key generation utility
 * - Bangladesh-specific fields support
 * - Response type definition with privacy controls
 * 
 * Enterprise Rules:
 * ✅ Immutable query data
 * ✅ Self-contained query data
 * ✅ No business logic
 * ✅ Permission-based field exposure
 * ✅ Framework-free
 * ✅ Single Source of Truth with shared-constants
 * ✅ Type-safe with shared-types
 * ✅ Bangladesh specific fields ready
 */

import { randomUUID } from 'crypto';

// ✅ ENTERPRISE: Import from shared packages (Single Source of Truth)
import { USER_ROLES } from '@vubon/shared-constants';
import type { UserRole, RequestContext } from '@vubon/shared-types';

// ============================================================
// Query Response Type (Enterprise Enhanced)
// ============================================================

/**
 * User response with Bangladesh-specific fields and privacy controls
 */
export interface UserResponseDto {
  /** User unique identifier */
  id: string;

  /** User email address (masked for non-authorized) */
  email: string;

  /** User phone number (E.164 format, masked for non-authorized) */
  phoneNumber?: string;

  /** User full name */
  fullName: string;

  /** Display name (derived from full name or custom) */
  displayName?: string;

  /** Profile picture URL */
  avatar?: string;

  /** User role (from shared-constants) */
  role: UserRole;

  /** User tier for loyalty program (BRONZE, SILVER, GOLD, PLATINUM, DIAMOND) */
  tier: string;

  /** Whether email is verified */
  isEmailVerified: boolean;

  /** Whether phone number is verified */
  isPhoneVerified: boolean;

  /** Whether MFA is enabled */
  mfaEnabled: boolean;

  /** Account creation timestamp */
  createdAt: Date;

  /** Last update timestamp */
  updatedAt?: Date;

  /** Last login timestamp */
  lastLoginAt?: Date;

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

  // ✅ ENTERPRISE: Privacy and debug fields
  /** Whether response includes sensitive data */
  _includesSensitive?: boolean;

  /** Cache hit status (for debugging) */
  _cacheHit?: boolean;
}

// ============================================================
// Get User Query Options
// ============================================================

/**
 * Query options for additional data inclusion
 */
export interface GetUserQueryOptions {
  /** Include user permissions in response */
  includePermissions?: boolean;

  /** Include user preferences in response */
  includePreferences?: boolean;

  /** Include user activity summary in response */
  includeActivitySummary?: boolean;

  /** Include sensitive fields (email, phone) - overrides permission check */
  forceIncludeSensitive?: boolean;

  /** Bypass cache and fetch fresh data */
  bypassCache?: boolean;

  /** Custom cache TTL in seconds */
  cacheTtlSeconds?: number;
}

// ============================================================
// Get User Query (Enterprise Enhanced)
// ============================================================

/**
 * Get User Query
 * 
 * @example
 * // User viewing their own profile
 * const query = GetUserQuery.createSelfQuery(
 *   'usr_123',
 *   'corr_abc123'
 * );
 * 
 * @example
 * // Admin viewing another user
 * const query = GetUserQuery.createAdminQuery(
 *   'usr_456',           // targetUserId
 *   'admin_789',         // adminId
 *   'corr_abc123'
 * );
 * 
 * @example
 * // With additional options
 * const query = GetUserQuery.createSelfQuery(
 *   'usr_123',
 *   'corr_abc123',
 *   {
 *     includePermissions: true,
 *     includeActivitySummary: true,
 *     bypassCache: false
 *   }
 * );
 */
export class GetUserQuery {
  public readonly queryId: string;
  public readonly timestamp: Date;

  constructor(
    /** Target user ID to retrieve */
    public readonly targetUserId: string,

    /** Requester user ID (from JWT) */
    public readonly requesterId: string,

    /** Requester role (from JWT) */
    public readonly requesterRole: UserRole,

    /** Correlation ID for distributed tracing */
    public readonly correlationId?: string,

    /** Request context for additional metadata */
    public readonly context?: RequestContext,

    /** Additional query options */
    public readonly options?: GetUserQueryOptions
  ) {
    this.queryId = randomUUID();
    this.timestamp = new Date();
  }

  // ============================================================
  // Permission Check Methods
  // ============================================================

  /**
   * Check if requester is viewing their own profile
   */
  public isSelf(): boolean {
    return this.requesterId === this.targetUserId;
  }

  /**
   * Check if requester is admin (using shared-constants)
   */
  public isAdmin(): boolean {
    return (
      this.requesterRole === USER_ROLES.ADMIN ||
      this.requesterRole === USER_ROLES.SUPER_ADMIN
    );
  }

  /**
   * Check if requester is moderator
   */
  public isModerator(): boolean {
    return this.requesterRole === USER_ROLES.MODERATOR;
  }

  /**
   * Check if requester can view sensitive fields (email, phone)
   */
  public canViewSensitiveFields(): boolean {
    // Force include if explicitly requested
    if (this.options?.forceIncludeSensitive) return true;
    
    // Self or admin can view sensitive fields
    return this.isSelf() || this.isAdmin();
  }

  /**
   * Check if requester has permission to view this user
   */
  public hasPermission(): boolean {
    // Self can always view
    if (this.isSelf()) return true;
    
    // Admin can view any user
    if (this.isAdmin()) return true;
    
    // Moderator can view regular users but not admins
    if (this.isModerator()) {
      return this.requesterRole !== USER_ROLES.ADMIN && 
             this.requesterRole !== USER_ROLES.SUPER_ADMIN;
    }
    
    return false;
  }

  // ============================================================
  // Options Helper Methods
  // ============================================================

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
  // Getter Methods for Context
  // ============================================================

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
   * Get span ID for distributed tracing
   */
  public getSpanId(): string | undefined {
    return this.context?.spanId;
  }

  /**
   * Get district from context (Bangladesh)
   */
  public getDistrict(): string | undefined {
    return this.context?.district;
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
    const baseKey = `user:${this.targetUserId}`;
    const parts = [baseKey];

    if (this.shouldIncludePermissions()) parts.push('perms');
    if (this.shouldIncludePreferences()) parts.push('prefs');
    if (this.shouldIncludeActivitySummary()) parts.push('activity');
    if (this.canViewSensitiveFields()) parts.push('sensitive');

    return parts.join(':');
  }

  /**
   * Get query summary for logging
   */
  public getSummary(): Record<string, unknown> {
    return {
      queryId: this.queryId,
      targetUserId: this.targetUserId,
      requesterId: this.requesterId,
      requesterRole: this.requesterRole,
      isSelf: this.isSelf(),
      isAdmin: this.isAdmin(),
      canViewSensitive: this.canViewSensitiveFields(),
      hasPermission: this.hasPermission(),
      includePermissions: this.shouldIncludePermissions(),
      includePreferences: this.shouldIncludePreferences(),
      includeActivitySummary: this.shouldIncludeActivitySummary(),
      bypassCache: this.shouldBypassCache(),
      correlationId: this.correlationId,
      district: this.getDistrict(),
      networkType: this.getNetworkType(),
      timestamp: this.timestamp.toISOString(),
    };
  }

  /**
   * Convert to plain object for serialization
   */
  public toJSON(): Record<string, unknown> {
    return {
      queryId: this.queryId,
      targetUserId: this.targetUserId,
      requesterId: this.requesterId,
      requesterRole: this.requesterRole,
      correlationId: this.correlationId,
      context: this.context,
      options: this.options,
      timestamp: this.timestamp.toISOString(),
    };
  }

  /**
   * String representation for debugging
   */
  public toString(): string {
    return `GetUserQuery(id=${this.queryId}, target=${this.targetUserId}, requester=${this.requesterId}, role=${this.requesterRole})`;
  }
}

// ============================================================
// Factory Functions (Enterprise Enhancement)
// ============================================================

/**
 * Create a query for user viewing their own profile

 * @param userId - User ID (both target and requester)
 * @param correlationId - Correlation ID for tracing
 * @param options - Additional query options
 * @param context - Request context
 * @returns GetUserQuery instance

 * @example
 * const query = GetUserQuery.createSelfQuery('usr_123', 'corr_abc123');
 */
export function createSelfUserQuery(
  userId: string,
  correlationId?: string,
  options?: GetUserQueryOptions,
  context?: RequestContext
): GetUserQuery {
  return new GetUserQuery(
    userId,
    userId,
    USER_ROLES.CUSTOMER,
    correlationId,
    context,
    options
  );
}

/**
 * Create a query for admin viewing any user

 * @param targetUserId - Target user ID to view
 * @param adminId - Admin user ID
 * @param correlationId - Correlation ID for tracing
 * @param options - Additional query options
 * @param context - Request context
 * @returns GetUserQuery instance

 * @example
 * const query = GetUserQuery.createAdminQuery('usr_456', 'admin_789', 'corr_abc123');
 */
export function createAdminUserQuery(
  targetUserId: string,
  adminId: string,
  correlationId?: string,
  options?: GetUserQueryOptions,
  context?: RequestContext
): GetUserQuery {
  return new GetUserQuery(
    targetUserId,
    adminId,
    USER_ROLES.ADMIN,
    correlationId,
    context,
    {
      ...options,
      includePermissions: options?.includePermissions ?? true,
      includePreferences: options?.includePreferences ?? true,
      includeActivitySummary: options?.includeActivitySummary ?? true,
    }
  );
}

/**
 * Create a query for user viewing another user (requires permission check)

 * @param targetUserId - Target user ID to view
 * @param requesterId - Requester user ID
 * @param requesterRole - Requester role
 * @param correlationId - Correlation ID for tracing
 * @param options - Additional query options
 * @param context - Request context
 * @returns GetUserQuery instance

 * @example
 * const query = GetUserQuery.createUserQuery('usr_456', 'usr_123', 'CUSTOMER', 'corr_abc123');
 */
export function createUserQuery(
  targetUserId: string,
  requesterId: string,
  requesterRole: UserRole,
  correlationId?: string,
  options?: GetUserQueryOptions,
  context?: RequestContext
): GetUserQuery {
  return new GetUserQuery(
    targetUserId,
    requesterId,
    requesterRole,
    correlationId,
    context,
    options
  );
}

/**
 * Create a query for moderator viewing a user

 * @param targetUserId - Target user ID to view
 * @param moderatorId - Moderator user ID
 * @param correlationId - Correlation ID for tracing
 * @param options - Additional query options
 * @param context - Request context
 * @returns GetUserQuery instance
 */
export function createModeratorUserQuery(
  targetUserId: string,
  moderatorId: string,
  correlationId?: string,
  options?: GetUserQueryOptions,
  context?: RequestContext
): GetUserQuery {
  return new GetUserQuery(
    targetUserId,
    moderatorId,
    USER_ROLES.MODERATOR,
    correlationId,
    context,
    {
      ...options,
      includePermissions: false, // Moderators cannot see permissions
      forceIncludeSensitive: false, // Moderators cannot see sensitive data
    }
  );
}

/**
 * Create a query for super admin viewing any user (full access)

 * @param targetUserId - Target user ID to view
 * @param superAdminId - Super admin user ID
 * @param correlationId - Correlation ID for tracing
 * @param options - Additional query options
 * @param context - Request context
 * @returns GetUserQuery instance
 */
export function createSuperAdminUserQuery(
  targetUserId: string,
  superAdminId: string,
  correlationId?: string,
  options?: GetUserQueryOptions,
  context?: RequestContext
): GetUserQuery {
  return new GetUserQuery(
    targetUserId,
    superAdminId,
    USER_ROLES.SUPER_ADMIN,
    correlationId,
    context,
    {
      ...options,
      includePermissions: true,
      includePreferences: true,
      includeActivitySummary: true,
      forceIncludeSensitive: true,
      bypassCache: options?.bypassCache ?? false,
    }
  );
}

// ============================================================
// Type Guards (Runtime Checking)
// ============================================================

/**
 * Type guard to check if a value is a GetUserQuery

 * @param query - Value to check
 * @returns True if value is a GetUserQuery instance
 */
export function isGetUserQuery(query: unknown): query is GetUserQuery {
  return query instanceof GetUserQuery;
}

/**
 * Type guard for user response

 * @param response - Value to check
 * @returns True if value is a valid UserResponseDto
 */
export function isUserResponse(response: unknown): response is UserResponseDto {
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
 * Mask email for privacy (when not authorized to view sensitive data)

 * @param email - Email address to mask
 * @returns Masked email (e.g., u***r@example.com)
 */
export function maskEmail(email: string): string {
  if (!email) return email;
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
 * Mask phone number for privacy

 * @param phone - Phone number to mask
 * @returns Masked phone number
 */
export function maskPhone(phone: string): string {
  if (!phone || phone.length <= 8) return '****';
  const prefix = phone.substring(0, phone.length - 6);
  const suffix = phone.substring(phone.length - 2);
  return `${prefix}******${suffix}`;
}

/**
 * Create a user response with privacy controls

 * @param user - User data
 * @param includeSensitive - Whether to include sensitive data
 * @param options - Additional options
 * @returns Formatted user response
 */
export function createUserResponse(
  user: {
    id: string;
    email: string;
    phoneNumber?: string;
    fullName: string;
    displayName?: string;
    avatar?: string;
    role: UserRole;
    tier: string;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    mfaEnabled: boolean;
    createdAt: Date;
    updatedAt?: Date;
    lastLoginAt?: Date;
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
  includeSensitive: boolean = false,
  cacheHit: boolean = false
): UserResponseDto {
  const response: UserResponseDto = {
    id: user.id,
    email: includeSensitive ? user.email : maskEmail(user.email),
    fullName: user.fullName,
    role: user.role,
    tier: user.tier,
    isEmailVerified: user.isEmailVerified,
    isPhoneVerified: user.isPhoneVerified,
    mfaEnabled: user.mfaEnabled,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    lastLoginAt: user.lastLoginAt,
    preferredDistrict: user.preferredDistrict,
    preferredUpazila: user.preferredUpazila,
    preferredLanguage: user.preferredLanguage || 'en',
    district: user.district,
    division: user.division,
    mobileOperator: user.mobileOperator,
    networkType: user.networkType,
    isVendor: user.isVendor,
    isKycVerified: user.isKycVerified,
    totalSpent: user.totalSpent,
    _includesSensitive: includeSensitive,
    _cacheHit: cacheHit,
  };

  // Optional fields
  if (user.displayName) response.displayName = user.displayName;
  if (user.avatar) response.avatar = user.avatar;
  if (includeSensitive && user.phoneNumber) response.phoneNumber = user.phoneNumber;

  return response;
}

/**
 * Remove sensitive data from response (for non-authorized requests)

 * @param response - Full response with sensitive data
 * @returns Response without sensitive data
 */
export function sanitizeUserResponse(response: UserResponseDto): UserResponseDto {
  const { email, phoneNumber, ...rest } = response;
  return {
    ...rest,
    email: maskEmail(response.email),
    _includesSensitive: false,
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

 * @param query - Query to validate
 * @returns Validation result
 */
export function validateQuery(query: GetUserQuery): QueryValidationResult {
  if (!query.targetUserId || query.targetUserId.trim().length === 0) {
    return {
      isValid: false,
      error: 'Target user ID is required',
      errorBn: 'টার্গেট ইউজার আইডি প্রয়োজন',
    };
  }

  if (!query.requesterId || query.requesterId.trim().length === 0) {
    return {
      isValid: false,
      error: 'Requester ID is required',
      errorBn: 'রিকোয়েস্টকারী আইডি প্রয়োজন',
    };
  }

  if (!query.requesterRole) {
    return {
      isValid: false,
      error: 'Requester role is required',
      errorBn: 'রিকোয়েস্টকারীর রোল প্রয়োজন',
    };
  }

  return { isValid: true };
}

// ============================================================
// Permission Constants (Re-export for convenience)
// ============================================================

export { USER_ROLES };
export type { UserRole, RequestContext, GetUserQueryOptions };

// ============================================================
// Default Export
// ============================================================

export default GetUserQuery;
