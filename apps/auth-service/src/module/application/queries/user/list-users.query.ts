/**
 * List Users Query - Pure Query Data Structure (Enterprise Enhanced v3.0)

 * @module application/queries/user/list-users.query

 * @description
 * Query for retrieving paginated list of users with enterprise-grade features:
 * - Multi-criteria filtering (role, status, district, date range)
 * - Pagination with max limit protection (DoS prevention)
 * - Whitelisted sort fields (SQL injection prevention)
 * - Distributed tracing support with correlation ID
 * - Multi-language error message ready
 * - Factory functions for common use cases
 * - Type guards for runtime checking
 * - Query summary for logging
 * - Cache key generation utility
 * - Bangladesh-specific filters (district, upazila, mobileOperator)
 * - Role-based access control (admin only)

 * Enterprise Rules:
 * ✅ Immutable query data
 * ✅ Self-contained query data
 * ✅ No business logic
 * ✅ Security: Admin-only access
 * ✅ Framework-free
 * ✅ Single Source of Truth with shared-constants
 * ✅ Type-safe with shared-types
 * ✅ Bangladesh specific fields ready
 */

import { randomUUID } from 'crypto';

// ✅ ENTERPRISE: Import from shared packages (Single Source of Truth)
import { USER_ROLES, USER_STATUS, PAGINATION_DEFAULTS } from '@vubon/shared-constants';
import type { SortOrder, PaginationParams, RequestContext } from '@vubon/shared-types';

// ============================================================
// Type Definitions (using shared-types and shared-constants)
// ============================================================

/**
 * Sort field options (whitelist to prevent SQL injection)
 * Values from shared-constants for consistency
 */
export type UserSortField = 
  | 'createdAt' 
  | 'email' 
  | 'fullName' 
  | 'lastLoginAt' 
  | 'role' 
  | 'status'
  | 'tier'
  | 'totalSpent';

/**
 * Export sort order from shared-types
 */
export type { SortOrder };

/**
 * User status filter options (from shared-constants)
 */
export type UserStatusFilter = keyof typeof USER_STATUS;

/**
 * User role filter options (from shared-constants)
 */
export type UserRoleFilter = keyof typeof USER_ROLES;

/**
 * User tier filter options
 */
export type UserTierFilter = 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'DIAMOND';

// ============================================================
// Query Options Interface (Enterprise Enhancement)
// ============================================================

/**
 * List users query options with Bangladesh-specific filters
 */
export interface ListUsersQueryOptions {
  /** Page number (1-indexed) */
  page?: number;
  
  /** Items per page (max 100) */
  limit?: number;
  
  /** Sort field (whitelisted) */
  sortBy?: UserSortField;
  
  /** Sort order */
  sortOrder?: SortOrder;
  
  /** Search term for email, name, or phone */
  search?: string;
  
  /** Filter by user role */
  role?: UserRoleFilter;
  
  /** Filter by user status */
  status?: UserStatusFilter;
  
  /** Filter by user tier */
  tier?: UserTierFilter;
  
  /** Filter by email verification status */
  emailVerified?: boolean;
  
  /** Filter by phone verification status */
  phoneVerified?: boolean;
  
  /** Filter by MFA enabled status */
  mfaEnabled?: boolean;
  
  /** Filter by KYC verification status */
  kycVerified?: boolean;
  
  /** Filter by vendor status */
  isVendor?: boolean;
  
  /** Minimum total spent filter */
  minTotalSpent?: number;
  
  /** Maximum total spent filter */
  maxTotalSpent?: number;
  
  /** Start date for registration filter */
  fromDate?: Date;
  
  /** End date for registration filter */
  toDate?: Date;
  
  /** Start date for last login filter */
  lastLoginFrom?: Date;
  
  /** End date for last login filter */
  lastLoginTo?: Date;
  
  // ✅ ENTERPRISE: Bangladesh-specific filters
  /** Filter by district (Bangladesh) */
  district?: string;
  
  /** Filter by upazila/sub-district (Bangladesh) */
  upazila?: string;
  
  /** Filter by mobile operator (GP, Robi, Banglalink, Teletalk) */
  mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
  
  /** Filter by network type */
  networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
  
  /** Include soft-deleted users (admin only) */
  includeDeleted?: boolean;
  
  /** Bypass cache and fetch fresh data */
  bypassCache?: boolean;
  
  /** Custom cache TTL in seconds */
  cacheTtlSeconds?: number;
}

// ============================================================
// Response Type (Enterprise Enhanced)
// ============================================================

/**
 * User brief response for list view with Bangladesh fields
 */
export interface UserBriefResponseDto {
  /** User unique identifier */
  id: string;
  
  /** User email address (masked) */
  email: string;
  
  /** User phone number (masked, optional) */
  phoneNumber?: string;
  
  /** User full name */
  fullName: string;
  
  /** Display name */
  displayName?: string;
  
  /** Profile picture URL */
  avatar?: string;
  
  /** User role */
  role: string;
  
  /** User tier */
  tier: string;
  
  /** User status */
  status: string;
  
  /** Email verification status */
  isEmailVerified: boolean;
  
  /** Phone verification status */
  isPhoneVerified: boolean;
  
  /** MFA enabled status */
  mfaEnabled: boolean;
  
  /** Last login timestamp */
  lastLoginAt?: Date;
  
  /** Account creation timestamp */
  createdAt: Date;
  
  // ✅ ENTERPRISE: Bangladesh-specific fields
  /** Preferred district (Bangladesh) */
  preferredDistrict?: string;
  
  /** Preferred upazila (Bangladesh) */
  preferredUpazila?: string;
  
  /** District from last login */
  district?: string;
  
  /** Mobile operator */
  mobileOperator?: string;
  
  /** Whether user is a vendor */
  isVendor?: boolean;
  
  /** Total amount spent */
  totalSpent?: number;
  
  /** Cache hit status (for debugging) */
  _cacheHit?: boolean;
}

/**
 * Paginated list response
 */
export interface PaginatedListResponse<T> {
  /** List of items */
  items: T[];
  
  /** Total number of items */
  total: number;
  
  /** Current page number */
  page: number;
  
  /** Items per page */
  limit: number;
  
  /** Total number of pages */
  totalPages: number;
  
  /** Whether there is a next page */
  hasNextPage: boolean;
  
  /** Whether there is a previous page */
  hasPreviousPage: boolean;
}

// ============================================================
// List Users Query (Enterprise Enhanced)
// ============================================================

/**
 * List Users Query

 * @example
 * // Basic pagination
 * const query = ListUsersQuery.createAdminQuery(
 *   'admin_123',
 *   { page: 1, limit: 20 },
 *   'corr_abc123'
 * );

 * @example
 * // With filters and sorting
 * const query = ListUsersQuery.createAdminQuery(
 *   'admin_123',
 *   {
 *     page: 1,
 *     limit: 20,
 *     sortBy: 'createdAt',
 *     sortOrder: 'desc',
 *     search: 'john',
 *     role: 'CUSTOMER',
 *     status: 'ACTIVE',
 *     district: 'Dhaka',
 *     minTotalSpent: 1000
 *   },
 *   'corr_abc123'
 * );

 * @example
 * // Super admin with includeDeleted flag
 * const query = ListUsersQuery.createSuperAdminQuery(
 *   'super_admin_123',
 *   {
 *     page: 1,
 *     limit: 50,
 *     includeDeleted: true,
 *     status: 'DELETED'
 *   },
 *   'corr_abc123'
 * );
 */
export class ListUsersQuery {
  public readonly queryId: string;
  public readonly timestamp: Date;
  
  // Public readonly properties
  public readonly page: number;
  public readonly limit: number;
  public readonly sortBy: UserSortField;
  public readonly sortOrder: SortOrder;
  public readonly search?: string;
  public readonly role?: UserRoleFilter;
  public readonly status?: UserStatusFilter;
  public readonly tier?: UserTierFilter;
  public readonly emailVerified?: boolean;
  public readonly phoneVerified?: boolean;
  public readonly mfaEnabled?: boolean;
  public readonly kycVerified?: boolean;
  public readonly isVendor?: boolean;
  public readonly minTotalSpent?: number;
  public readonly maxTotalSpent?: number;
  public readonly fromDate?: Date;
  public readonly toDate?: Date;
  public readonly lastLoginFrom?: Date;
  public readonly lastLoginTo?: Date;
  public readonly district?: string;
  public readonly upazila?: string;
  public readonly mobileOperator?: string;
  public readonly networkType?: string;
  public readonly includeDeleted?: boolean;
  public readonly bypassCache?: boolean;
  public readonly cacheTtlSeconds?: number;

  constructor(
    /** Requester user ID (from JWT) */
    public readonly requesterId: string,
    
    /** Requester role (from JWT) - must be ADMIN or SUPER_ADMIN */
    public readonly requesterRole: string,
    
    /** Query options */
    options: ListUsersQueryOptions = {},
    
    /** Request context for additional metadata */
    public readonly context?: RequestContext,
    
    /** Correlation ID for distributed tracing */
    public readonly correlationId?: string
  ) {
    // Validate and set page
    this.page = Math.max(1, options.page ?? PAGINATION_DEFAULTS.DEFAULT_PAGE);
    
    // Validate and set limit (max 100 to prevent DoS)
    const rawLimit = options.limit ?? PAGINATION_DEFAULTS.DEFAULT_LIMIT;
    this.limit = Math.min(
      PAGINATION_DEFAULTS.MAX_LIMIT,
      Math.max(PAGINATION_DEFAULTS.MIN_LIMIT, rawLimit)
    );
    
    // Set sort field with whitelist validation
    const allowedSortFields = ListUsersQuery.getAllowedSortFields();
    this.sortBy = (options.sortBy && allowedSortFields.includes(options.sortBy as UserSortField))
      ? options.sortBy as UserSortField
      : 'createdAt';
    
    // Set sort order
    this.sortOrder = options.sortOrder ?? 'desc';
    
    // Set optional filters
    this.search = options.search?.trim();
    this.role = options.role;
    this.status = options.status;
    this.tier = options.tier;
    this.emailVerified = options.emailVerified;
    this.phoneVerified = options.phoneVerified;
    this.mfaEnabled = options.mfaEnabled;
    this.kycVerified = options.kycVerified;
    this.isVendor = options.isVendor;
    this.minTotalSpent = options.minTotalSpent;
    this.maxTotalSpent = options.maxTotalSpent;
    this.fromDate = options.fromDate;
    this.toDate = options.toDate;
    this.lastLoginFrom = options.lastLoginFrom;
    this.lastLoginTo = options.lastLoginTo;
    this.district = options.district;
    this.upazila = options.upazila;
    this.mobileOperator = options.mobileOperator;
    this.networkType = options.networkType;
    this.includeDeleted = options.includeDeleted ?? false;
    this.bypassCache = options.bypassCache ?? false;
    this.cacheTtlSeconds = options.cacheTtlSeconds;
    
    this.queryId = randomUUID();
    this.timestamp = new Date();
  }

  // ============================================================
  // Permission Check Methods
  // ============================================================

  /**
   * Check if requester is admin (has permission to list users)
   */
  public isAdmin(): boolean {
    return this.requesterRole === USER_ROLES.ADMIN || 
           this.requesterRole === USER_ROLES.SUPER_ADMIN;
  }

  /**
   * Check if requester is super admin
   */
  public isSuperAdmin(): boolean {
    return this.requesterRole === USER_ROLES.SUPER_ADMIN;
  }

  /**
   * Check if requester has permission to execute this query
   */
  public hasPermission(): boolean {
    return this.isAdmin();
  }

  // ============================================================
  // Pagination Helper Methods
  // ============================================================

  /**
   * Get calculated skip value for database query
   */
  public getSkip(): number {
    return (this.page - 1) * this.limit;
  }

  /**
   * Get take value for database query
   */
  public getTake(): number {
    return this.limit;
  }

  /**
   * Get pagination parameters for repository
   */
  public getPaginationParams(): PaginationParams {
    return {
      page: this.page,
      limit: this.limit,
      skip: this.getSkip(),
      take: this.getTake(),
    };
  }

  // ============================================================
  // Filter Helper Methods
  // ============================================================

  /**
   * Check if search filter is applied
   */
  public hasSearch(): boolean {
    return !!this.search && this.search.length > 0;
  }

  /**
   * Get trimmed search term
   */
  public getSearchTerm(): string | undefined {
    return this.hasSearch() ? this.search : undefined;
  }

  /**
   * Check if role filter is applied
   */
  public hasRoleFilter(): boolean {
    return !!this.role;
  }

  /**
   * Check if status filter is applied
   */
  public hasStatusFilter(): boolean {
    return !!this.status;
  }

  /**
   * Check if tier filter is applied
   */
  public hasTierFilter(): boolean {
    return !!this.tier;
  }

  /**
   * Check if date range filter is applied
   */
  public hasDateRangeFilter(): boolean {
    return !!(this.fromDate || this.toDate);
  }

  /**
   * Check if last login date range filter is applied
   */
  public hasLastLoginDateFilter(): boolean {
    return !!(this.lastLoginFrom || this.lastLoginTo);
  }

  /**
   * Check if total spent range filter is applied
   */
  public hasTotalSpentFilter(): boolean {
    return !!(this.minTotalSpent !== undefined || this.maxTotalSpent !== undefined);
  }

  /**
   * Check if district filter is applied (Bangladesh)
   */
  public hasDistrictFilter(): boolean {
    return !!this.district;
  }

  /**
   * Check if mobile operator filter is applied (Bangladesh)
   */
  public hasMobileOperatorFilter(): boolean {
    return !!this.mobileOperator;
  }

  /**
   * Check if any filter is applied
   */
  public hasAnyFilter(): boolean {
    return this.hasSearch() ||
           this.hasRoleFilter() ||
           this.hasStatusFilter() ||
           this.hasTierFilter() ||
           this.emailVerified !== undefined ||
           this.phoneVerified !== undefined ||
           this.mfaEnabled !== undefined ||
           this.kycVerified !== undefined ||
           this.isVendor !== undefined ||
           this.hasTotalSpentFilter() ||
           this.hasDateRangeFilter() ||
           this.hasLastLoginDateFilter() ||
           this.hasDistrictFilter() ||
           this.hasMobileOperatorFilter();
  }

  // ============================================================
  // Getter Methods for Context
  // ============================================================

  /**
   * Get correlation ID for distributed tracing
   */
  public getCorrelationId(): string | undefined {
    return this.correlationId || this.context?.correlationId;
  }

  /**
   * Get tenant ID for multi-tenant isolation
   */
  public getTenantId(): string | undefined {
    return this.context?.tenantId;
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

  // ============================================================
  // Cache Methods (Enterprise Enhancement)
  // ============================================================

  /**
   * Get cache key for this query
   */
  public getCacheKey(): string {
    const parts: string[] = [`users:list`];
    
    // Pagination
    parts.push(`p=${this.page}:l=${this.limit}`);
    
    // Sorting
    parts.push(`s=${this.sortBy}:${this.sortOrder}`);
    
    // Filters
    if (this.search) parts.push(`q=${this.search}`);
    if (this.role) parts.push(`r=${this.role}`);
    if (this.status) parts.push(`st=${this.status}`);
    if (this.tier) parts.push(`t=${this.tier}`);
    if (this.emailVerified !== undefined) parts.push(`ev=${this.emailVerified}`);
    if (this.phoneVerified !== undefined) parts.push(`pv=${this.phoneVerified}`);
    if (this.mfaEnabled !== undefined) parts.push(`mfa=${this.mfaEnabled}`);
    if (this.kycVerified !== undefined) parts.push(`kyc=${this.kycVerified}`);
    if (this.isVendor !== undefined) parts.push(`vendor=${this.isVendor}`);
    if (this.minTotalSpent !== undefined) parts.push(`minSpent=${this.minTotalSpent}`);
    if (this.maxTotalSpent !== undefined) parts.push(`maxSpent=${this.maxTotalSpent}`);
    if (this.fromDate) parts.push(`fd=${this.fromDate.toISOString()}`);
    if (this.toDate) parts.push(`td=${this.toDate.toISOString()}`);
    if (this.lastLoginFrom) parts.push(`llf=${this.lastLoginFrom.toISOString()}`);
    if (this.lastLoginTo) parts.push(`llt=${this.lastLoginTo.toISOString()}`);
    if (this.district) parts.push(`d=${this.district}`);
    if (this.upazila) parts.push(`u=${this.upazila}`);
    if (this.mobileOperator) parts.push(`mo=${this.mobileOperator}`);
    if (this.networkType) parts.push(`nt=${this.networkType}`);
    if (this.includeDeleted) parts.push(`del=true`);
    
    return parts.join(':');
  }

  /**
   * Check if cache should be bypassed
   */
  public shouldBypassCache(): boolean {
    return this.bypassCache === true;
  }

  /**
   * Get cache TTL in seconds
   */
  public getCacheTtl(): number {
    return this.cacheTtlSeconds ?? PAGINATION_DEFAULTS.CACHE_TTL_SECONDS ?? 60;
  }

  // ============================================================
  // Utility Methods
  // ============================================================

  /**
   * Get query summary for logging
   */
  public getSummary(): Record<string, unknown> {
    return {
      queryId: this.queryId,
      requesterId: this.requesterId,
      requesterRole: this.requesterRole,
      isAdmin: this.isAdmin(),
      isSuperAdmin: this.isSuperAdmin(),
      hasPermission: this.hasPermission(),
      page: this.page,
      limit: this.limit,
      sortBy: this.sortBy,
      sortOrder: this.sortOrder,
      hasSearch: this.hasSearch(),
      hasRoleFilter: this.hasRoleFilter(),
      hasStatusFilter: this.hasStatusFilter(),
      hasTierFilter: this.hasTierFilter(),
      hasDateRangeFilter: this.hasDateRangeFilter(),
      hasDistrictFilter: this.hasDistrictFilter(),
      hasMobileOperatorFilter: this.hasMobileOperatorFilter(),
      includeDeleted: this.includeDeleted,
      bypassCache: this.bypassCache,
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
      requesterId: this.requesterId,
      requesterRole: this.requesterRole,
      page: this.page,
      limit: this.limit,
      sortBy: this.sortBy,
      sortOrder: this.sortOrder,
      search: this.search,
      role: this.role,
      status: this.status,
      tier: this.tier,
      emailVerified: this.emailVerified,
      phoneVerified: this.phoneVerified,
      mfaEnabled: this.mfaEnabled,
      kycVerified: this.kycVerified,
      isVendor: this.isVendor,
      minTotalSpent: this.minTotalSpent,
      maxTotalSpent: this.maxTotalSpent,
      fromDate: this.fromDate?.toISOString(),
      toDate: this.toDate?.toISOString(),
      lastLoginFrom: this.lastLoginFrom?.toISOString(),
      lastLoginTo: this.lastLoginTo?.toISOString(),
      district: this.district,
      upazila: this.upazila,
      mobileOperator: this.mobileOperator,
      networkType: this.networkType,
      includeDeleted: this.includeDeleted,
      bypassCache: this.bypassCache,
      context: this.context,
      correlationId: this.correlationId,
      timestamp: this.timestamp.toISOString(),
    };
  }

  /**
   * String representation for debugging
   */
  public toString(): string {
    return `ListUsersQuery(id=${this.queryId}, page=${this.page}, limit=${this.limit}, sort=${this.sortBy}:${this.sortOrder}, hasFilters=${this.hasAnyFilter()})`;
  }

  // ============================================================
  // Static Methods
  // ============================================================

  /**
   * Get allowed sort fields (for validation)
   */
  public static getAllowedSortFields(): UserSortField[] {
    return ['createdAt', 'email', 'fullName', 'lastLoginAt', 'role', 'status', 'tier', 'totalSpent'];
  }

  /**
   * Get default pagination values
   */
  public static getDefaultPagination(): { page: number; limit: number } {
    return {
      page: PAGINATION_DEFAULTS.DEFAULT_PAGE,
      limit: PAGINATION_DEFAULTS.DEFAULT_LIMIT,
    };
  }

  /**
   * Get maximum allowed limit
   */
  public static getMaxLimit(): number {
    return PAGINATION_DEFAULTS.MAX_LIMIT;
  }
}

// ============================================================
// Factory Functions (Enterprise Enhancement)
// ============================================================

/**
 * Create a query for admin user list

 * @param adminId - Admin user ID
 * @param options - Query options
 * @param correlationId - Correlation ID for tracing
 * @param context - Request context
 * @returns ListUsersQuery instance

 * @example
 * const query = ListUsersQuery.createAdminQuery(
 *   'admin_123',
 *   { page: 1, limit: 20, role: 'CUSTOMER', district: 'Dhaka' },
 *   'corr_abc123'
 * );
 */
export function createAdminListUsersQuery(
  adminId: string,
  options?: ListUsersQueryOptions,
  correlationId?: string,
  context?: RequestContext
): ListUsersQuery {
  return new ListUsersQuery(adminId, USER_ROLES.ADMIN, options, context, correlationId);
}

/**
 * Create a query for super admin user list (includes deleted users)

 * @param superAdminId - Super admin user ID
 * @param options - Query options
 * @param correlationId - Correlation ID for tracing
 * @param context - Request context
 * @returns ListUsersQuery instance

 * @example
 * const query = ListUsersQuery.createSuperAdminQuery(
 *   'super_admin_123',
 *   { page: 1, limit: 50, includeDeleted: true },
 *   'corr_abc123'
 * );
 */
export function createSuperAdminListUsersQuery(
  superAdminId: string,
  options?: ListUsersQueryOptions,
  correlationId?: string,
  context?: RequestContext
): ListUsersQuery {
  return new ListUsersQuery(
    superAdminId,
    USER_ROLES.SUPER_ADMIN,
    { ...options, includeDeleted: options?.includeDeleted ?? true },
    context,
    correlationId
  );
}

/**
 * Create a query for vendor list (admin only)

 * @param adminId - Admin user ID
 * @param options - Query options
 * @param correlationId - Correlation ID for tracing
 * @param context - Request context
 * @returns ListUsersQuery instance

 * @example
 * const query = ListUsersQuery.createVendorListQuery(
 *   'admin_123',
 *   { page: 1, limit: 20, isVendor: true, kycVerified: true },
 *   'corr_abc123'
 * );
 */
export function createVendorListQuery(
  adminId: string,
  options?: ListUsersQueryOptions,
  correlationId?: string,
  context?: RequestContext
): ListUsersQuery {
  return new ListUsersQuery(
    adminId,
    USER_ROLES.ADMIN,
    { ...options, isVendor: true },
    context,
    correlationId
  );
}

/**
 * Create a query for users by district (Bangladesh specific)

 * @param adminId - Admin user ID
 * @param district - District name
 * @param options - Additional query options
 * @param correlationId - Correlation ID for tracing
 * @param context - Request context
 * @returns ListUsersQuery instance

 * @example
 * const query = ListUsersQuery.createByDistrictQuery(
 *   'admin_123',
 *   'Dhaka',
 *   { page: 1, limit: 20 },
 *   'corr_abc123'
 * );
 */
export function createUsersByDistrictQuery(
  adminId: string,
  district: string,
  options?: ListUsersQueryOptions,
  correlationId?: string,
  context?: RequestContext
): ListUsersQuery {
  return new ListUsersQuery(
    adminId,
    USER_ROLES.ADMIN,
    { ...options, district },
    context,
    correlationId
  );
}

/**
 * Create a query for new users (registered in last N days)

 * @param adminId - Admin user ID
 * @param days - Number of days
 * @param options - Additional query options
 * @param correlationId - Correlation ID for tracing
 * @param context - Request context
 * @returns ListUsersQuery instance

 * @example
 * const query = ListUsersQuery.createNewUsersQuery(
 *   'admin_123',
 *   7,
 *   { page: 1, limit: 20 },
 *   'corr_abc123'
 * );
 */
export function createNewUsersQuery(
  adminId: string,
  days: number,
  options?: ListUsersQueryOptions,
  correlationId?: string,
  context?: RequestContext
): ListUsersQuery {
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - days);
  
  return new ListUsersQuery(
    adminId,
    USER_ROLES.ADMIN,
    { ...options, fromDate },
    context,
    correlationId
  );
}

/**
 * Create a query for inactive users (not logged in for N days)

 * @param adminId - Admin user ID
 * @param days - Days of inactivity
 * @param options - Additional query options
 * @param correlationId - Correlation ID for tracing
 * @param context - Request context
 * @returns ListUsersQuery instance

 * @example
 * const query = ListUsersQuery.createInactiveUsersQuery(
 *   'admin_123',
 *   30,
 *   { page: 1, limit: 20 },
 *   'corr_abc123'
 * );
 */
export function createInactiveUsersQuery(
  adminId: string,
  days: number,
  options?: ListUsersQueryOptions,
  correlationId?: string,
  context?: RequestContext
): ListUsersQuery {
  const lastLoginTo = new Date();
  lastLoginTo.setDate(lastLoginTo.getDate() - days);
  
  return new ListUsersQuery(
    adminId,
    USER_ROLES.ADMIN,
    { ...options, lastLoginTo },
    context,
    correlationId
  );
}

// ============================================================
// Type Guards (Runtime Checking)
// ============================================================

/**
 * Type guard to check if a value is a ListUsersQuery

 * @param query - Value to check
 * @returns True if value is a ListUsersQuery instance
 */
export function isListUsersQuery(query: unknown): query is ListUsersQuery {
  return query instanceof ListUsersQuery;
}

/**
 * Type guard to check if a field is a valid sort field

 * @param field - Field to check
 * @returns True if field is a valid sort field
 */
export function isValidSortField(field: string): field is UserSortField {
  return ListUsersQuery.getAllowedSortFields().includes(field as UserSortField);
}

/**
 * Type guard for paginated response

 * @param response - Value to check
 * @returns True if response is a valid PaginatedListResponse
 */
export function isPaginatedListResponse<T>(response: unknown): response is PaginatedListResponse<T> {
  return (
    response !== null &&
    typeof response === 'object' &&
    'items' in response &&
    Array.isArray((response as PaginatedListResponse<T>).items) &&
    'total' in response &&
    'page' in response &&
    'limit' in response
  );
}

// ============================================================
// Response Helper Functions
// ============================================================

/**
 * Create a paginated list response

 * @param items - List of items
 * @param total - Total number of items
 * @param page - Current page number
 * @param limit - Items per page
 * @returns Paginated list response
 */
export function createPaginatedResponse<T>(
  items: T[],
  total: number,
  page: number,
  limit: number
): PaginatedListResponse<T> {
  const totalPages = Math.ceil(total / limit);
  
  return {
    items,
    total,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}

/**
 * Create an empty paginated response

 * @param page - Current page number
 * @param limit - Items per page
 * @returns Empty paginated response
 */
export function createEmptyPaginatedResponse<T>(
  page: number = 1,
  limit: number = 20
): PaginatedListResponse<T> {
  return {
    items: [],
    total: 0,
    page,
    limit,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  };
}

/**
 * Mask email for privacy in list view

 * @param email - Email address to mask
 * @returns Masked email (e.g., u***r@example.com)
 */
export function maskEmailForList(email: string): string {
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
 * Mask phone number for privacy in list view

 * @param phone - Phone number to mask
 * @returns Masked phone number
 */
export function maskPhoneForList(phone: string): string {
  if (!phone || phone.length <= 8) return '****';
  const prefix = phone.substring(0, phone.length - 6);
  const suffix = phone.substring(phone.length - 2);
  return `${prefix}******${suffix}`;
}

/**
 * Create user brief response from user entity

 * @param user - User entity
 * @param includeSensitive - Whether to include sensitive data
 * @param cacheHit - Whether response came from cache
 * @returns User brief response DTO
 */
export function createUserBriefResponse(
  user: {
    id: string;
    email: string;
    phoneNumber?: string;
    fullName: string;
    displayName?: string;
    avatar?: string;
    role: string;
    tier: string;
    status: string;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    mfaEnabled: boolean;
    lastLoginAt?: Date;
    createdAt: Date;
    preferredDistrict?: string;
    preferredUpazila?: string;
    district?: string;
    mobileOperator?: string;
    isVendor?: boolean;
    totalSpent?: number;
  },
  includeSensitive: boolean = false,
  cacheHit: boolean = false
): UserBriefResponseDto {
  const response: UserBriefResponseDto = {
    id: user.id,
    email: includeSensitive ? user.email : maskEmailForList(user.email),
    fullName: user.fullName,
    role: user.role,
    tier: user.tier,
    status: user.status,
    isEmailVerified: user.isEmailVerified,
    isPhoneVerified: user.isPhoneVerified,
    mfaEnabled: user.mfaEnabled,
    createdAt: user.createdAt,
    preferredDistrict: user.preferredDistrict,
    preferredUpazila: user.preferredUpazila,
    district: user.district,
    mobileOperator: user.mobileOperator,
    isVendor: user.isVendor,
    totalSpent: user.totalSpent,
    _cacheHit: cacheHit,
  };

  // Optional fields
  if (user.displayName) response.displayName = user.displayName;
  if (user.avatar) response.avatar = user.avatar;
  if (user.lastLoginAt) response.lastLoginAt = user.lastLoginAt;
  if (includeSensitive && user.phoneNumber) response.phoneNumber = maskPhoneForList(user.phoneNumber);

  return response;
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
export function validateQuery(query: ListUsersQuery): QueryValidationResult {
  // Check requester ID
  if (!query.requesterId || query.requesterId.trim().length === 0) {
    return {
      isValid: false,
      error: 'Requester ID is required',
      errorBn: 'রিকোয়েস্টকারী আইডি প্রয়োজন',
    };
  }

  // Check requester role
  if (!query.requesterRole) {
    return {
      isValid: false,
      error: 'Requester role is required',
      errorBn: 'রিকোয়েস্টকারীর রোল প্রয়োজন',
    };
  }

  // Check permission
  if (!query.hasPermission()) {
    return {
      isValid: false,
      error: 'Only administrators can list users',
      errorBn: 'শুধুমাত্র অ্যাডমিনিস্ট্রেটররা ব্যবহারকারীদের তালিকা দেখতে পারেন',
    };
  }

  // Validate date range
  if (query.fromDate && query.toDate && query.fromDate > query.toDate) {
    return {
      isValid: false,
      error: 'From date must be before to date',
      errorBn: 'শুরুর তারিখ শেষের তারিখের আগে হতে হবে',
    };
  }

  // Validate total spent range
  if (query.minTotalSpent !== undefined && query.maxTotalSpent !== undefined) {
    if (query.minTotalSpent > query.maxTotalSpent) {
      return {
        isValid: false,
        error: 'Min total spent must be less than max total spent',
        errorBn: 'ন্যূনতম খরচ সর্বোচ্চ খরচের চেয়ে কম হতে হবে',
      };
    }
  }

  return { isValid: true };
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  ListUsersQueryOptions as ListUsersQueryOptionsType,
  UserBriefResponseDto as UserBriefResponseDtoType,
  PaginatedListResponse as PaginatedListResponseType,
  QueryValidationResult as QueryValidationResultType
};

// ============================================================
// Re-export for convenience
// ============================================================

export { USER_ROLES, USER_STATUS, PAGINATION_DEFAULTS };

// ============================================================
// Default Export
// ============================================================

export default ListUsersQuery;
