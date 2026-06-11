/**
 * List Sessions Query - Pure Query Data Structure (Enterprise Enhanced v4.0)

 * @module application/queries/session/list-sessions.query

 * @description
 * Query for retrieving paginated list of user sessions with enterprise-grade features:
 * - Multi-criteria filtering (status, district, network type, mobile operator, date range)
 * - Pagination with max limit protection (DoS prevention)
 * - Whitelisted sort fields (SQL injection prevention)
 * - Options object for extensibility
 * - RequestContext integration for distributed tracing
 * - Factory functions for common use cases
 * - Type guards for runtime checking
 * - Cache key generation utility
 * - Query summary for logging
 * - Validation with Bengali error messages
 * - Bangladesh-specific filters (district, upazila, networkType, mobileOperator)
 * - JSDoc documentation with examples
 * - Framework-free, immutable design

 * Enterprise Rules:
 * ✅ Immutable query data
 * ✅ Self-contained query data
 * ✅ No business logic
 * ✅ Security: userId from JWT
 * ✅ Framework-free
 * ✅ Single Source of Truth with shared-constants
 * ✅ Type-safe with shared-types
 * ✅ Bangladesh specific fields ready
 */

import { randomUUID } from 'crypto';

// ✅ ENTERPRISE: Import from shared packages (Single Source of Truth)
import { SESSION_STATUS, PAGINATION_DEFAULTS, NETWORK_TYPES, MOBILE_OPERATORS } from '@vubon/shared-constants';
import type { RequestContext, SortOrder, PaginationParams } from '@vubon/shared-types';

// ============================================================
// Type Definitions (using shared-constants)
// ============================================================

/**
 * Session status filter options (from shared-constants)
 */
export type SessionStatusFilter = keyof typeof SESSION_STATUS;

/**
 * Sort field options (whitelist to prevent SQL injection)
 */
export type SessionSortField = 'createdAt' | 'lastActivityAt' | 'expiresAt';

/**
 * Export sort order from shared-types
 */
export type { SortOrder };

/**
 * Network type filter options (Bangladesh specific)
 */
export type NetworkTypeFilter = typeof NETWORK_TYPES[keyof typeof NETWORK_TYPES];

/**
 * Mobile operator filter options (Bangladesh specific)
 */
export type MobileOperatorFilter = typeof MOBILE_OPERATORS[keyof typeof MOBILE_OPERATORS];

// ============================================================
// Query Options Interface (Enterprise Enhancement)
// ============================================================

/**
 * List sessions query options with Bangladesh-specific filters
 */
export interface ListSessionsOptions {
  /** Page number (1-indexed) - default: 1 */
  page?: number;

  /** Items per page (max 100) - default: 20 */
  limit?: number;

  /** Sort field (whitelisted) - default: 'lastActivityAt' */
  sortBy?: SessionSortField;

  /** Sort order - default: 'desc' */
  sortOrder?: SortOrder;

  /** Filter by session status */
  status?: SessionStatusFilter;

  /** Get only active sessions (overrides status filter) - default: false */
  activeOnly?: boolean;

  // ✅ ENTERPRISE: Bangladesh-specific filters
  /** Filter by district (Bangladesh) */
  district?: string;

  /** Filter by upazila/sub-district (Bangladesh) */
  upazila?: string;

  /** Filter by network type (2G/3G/4G/5G/WiFi) */
  networkType?: NetworkTypeFilter;

  /** Filter by mobile operator (GP, Robi, Banglalink, Teletalk) */
  mobileOperator?: MobileOperatorFilter;

  /** Filter sessions created after this date */
  fromDate?: Date;

  /** Filter sessions created before this date */
  toDate?: Date;

  /** Filter sessions with last activity after this date */
  lastActivityFrom?: Date;

  /** Filter sessions with last activity before this date */
  lastActivityTo?: Date;

  /** Include device information in response - default: false */
  includeDeviceInfo?: boolean;

  /** Include location information in response - default: false */
  includeLocation?: boolean;

  /** Include session health score - default: false */
  includeHealthScore?: boolean;

  /** Bypass cache and fetch fresh data - default: false */
  bypassCache?: boolean;

  /** Custom cache TTL in seconds (overrides default) */
  cacheTtlSeconds?: number;
}

// ============================================================
// Response Type Definitions (for type safety)
// ============================================================

/**
 * Brief session response for list view
 */
export interface BriefSessionResponse {
  /** Session unique identifier */
  id: string;

  /** Session status */
  status: string;

  /** Device type (mobile, desktop, tablet, feature_phone) */
  deviceType: string;

  /** Device name (if provided) */
  deviceName?: string;

  /** IP address (masked for privacy) */
  ipAddress: string;

  /** Location (city/district) */
  location?: string;

  /** District (Bangladesh) */
  district?: string;

  /** Division (Bangladesh) */
  division?: string;

  /** Network type (2G/3G/4G/5G/WiFi) */
  networkType?: string;

  /** Mobile operator */
  mobileOperator?: string;

  /** Last activity timestamp */
  lastActivityAt: Date;

  /** Expiry timestamp */
  expiresAt: Date;

  /** Creation timestamp */
  createdAt: Date;

  /** Whether this is the current session */
  isCurrent: boolean;

  /** Trust level */
  trustLevel: 'untrusted' | 'standard' | 'trusted' | 'high_trust' | 'maximum_trust';

  /** Session health score (if requested) */
  healthScore?: number;
}

/**
 * Paginated list response
 */
export interface PaginatedSessionsResponse {
  /** List of sessions */
  items: BriefSessionResponse[];

  /** Total number of sessions */
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

  /** Cache hit status (for debugging) */
  _cacheHit?: boolean;

  /** Query execution time in milliseconds */
  _queryTimeMs?: number;
}

// ============================================================
// List Sessions Query (Enterprise Enhanced)
// ============================================================

/**
 * List Sessions Query

 * @example
 * // Basic pagination
 * const query = ListSessionsQuery.create(
 *   'usr_123',
 *   { page: 1, limit: 20 },
 *   'corr_abc123'
 * );

 * @example
 * // With filters and sorting
 * const query = ListSessionsQuery.create(
 *   'usr_123',
 *   {
 *     page: 1,
 *     limit: 20,
 *     sortBy: 'lastActivityAt',
 *     sortOrder: 'desc',
 *     status: 'ACTIVE',
 *     district: 'Dhaka',
 *     networkType: '4g'
 *   },
 *   'corr_abc123'
 * );

 * @example
 * // Get active sessions only
 * const query = ListSessionsQuery.active('usr_123', { page: 1, limit: 20 }, 'corr_abc123');

 * @example
 * // Get sessions by district (Bangladesh specific)
 * const query = ListSessionsQuery.byDistrict('usr_123', 'Dhaka', { page: 1, limit: 20 }, 'corr_abc123');
 */
export class ListSessionsQuery {
  public readonly queryId: string;
  public readonly timestamp: Date;

  // Public readonly properties
  public readonly page: number;
  public readonly limit: number;
  public readonly sortBy: SessionSortField;
  public readonly sortOrder: SortOrder;
  public readonly status?: SessionStatusFilter;
  public readonly activeOnly: boolean;
  public readonly district?: string;
  public readonly upazila?: string;
  public readonly networkType?: NetworkTypeFilter;
  public readonly mobileOperator?: MobileOperatorFilter;
  public readonly fromDate?: Date;
  public readonly toDate?: Date;
  public readonly lastActivityFrom?: Date;
  public readonly lastActivityTo?: Date;
  public readonly includeDeviceInfo: boolean;
  public readonly includeLocation: boolean;
  public readonly includeHealthScore: boolean;
  public readonly bypassCache: boolean;
  public readonly cacheTtlSeconds?: number;

  constructor(
    /** User ID from JWT (authenticated user) */
    public readonly userId: string,

    /** Query options */
    options: ListSessionsOptions = {},

    /** Request context for distributed tracing */
    public readonly context?: RequestContext,

    /** Correlation ID for distributed tracing (legacy, use context instead) */
    public readonly correlationId?: string
  ) {
    this.queryId = randomUUID();
    this.timestamp = new Date();

    // Validate and set page
    this.page = Math.max(PAGINATION_DEFAULTS.MIN_PAGE, options.page ?? PAGINATION_DEFAULTS.DEFAULT_PAGE);

    // Validate and set limit (max 100 to prevent DoS)
    const rawLimit = options.limit ?? PAGINATION_DEFAULTS.DEFAULT_LIMIT;
    this.limit = Math.min(
      PAGINATION_DEFAULTS.MAX_LIMIT,
      Math.max(PAGINATION_DEFAULTS.MIN_LIMIT, rawLimit)
    );

    // Set sort field with whitelist validation
    const allowedSortFields: SessionSortField[] = ['createdAt', 'lastActivityAt', 'expiresAt'];
    this.sortBy = (options.sortBy && allowedSortFields.includes(options.sortBy))
      ? options.sortBy
      : 'lastActivityAt';

    // Set sort order
    this.sortOrder = options.sortOrder ?? 'desc';

    // Set filters
    this.status = options.status;
    this.activeOnly = options.activeOnly ?? false;
    this.district = options.district;
    this.upazila = options.upazila;
    this.networkType = options.networkType;
    this.mobileOperator = options.mobileOperator;
    this.fromDate = options.fromDate;
    this.toDate = options.toDate;
    this.lastActivityFrom = options.lastActivityFrom;
    this.lastActivityTo = options.lastActivityTo;
    this.includeDeviceInfo = options.includeDeviceInfo ?? false;
    this.includeLocation = options.includeLocation ?? false;
    this.includeHealthScore = options.includeHealthScore ?? false;
    this.bypassCache = options.bypassCache ?? false;
    this.cacheTtlSeconds = options.cacheTtlSeconds;
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
   * Check if status filter is applied
   */
  public hasStatusFilter(): boolean {
    return !!this.status;
  }

  /**
   * Check if date range filter is applied
   */
  public hasDateRangeFilter(): boolean {
    return !!(this.fromDate || this.toDate);
  }

  /**
   * Check if last activity date range filter is applied
   */
  public hasLastActivityDateFilter(): boolean {
    return !!(this.lastActivityFrom || this.lastActivityTo);
  }

  /**
   * Check if district filter is applied (Bangladesh)
   */
  public hasDistrictFilter(): boolean {
    return !!this.district;
  }

  /**
   * Check if upazila filter is applied (Bangladesh)
   */
  public hasUpazilaFilter(): boolean {
    return !!this.upazila;
  }

  /**
   * Check if network type filter is applied
   */
  public hasNetworkTypeFilter(): boolean {
    return !!this.networkType;
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
    return this.hasStatusFilter() ||
           this.activeOnly ||
           this.hasDateRangeFilter() ||
           this.hasLastActivityDateFilter() ||
           this.hasDistrictFilter() ||
           this.hasUpazilaFilter() ||
           this.hasNetworkTypeFilter() ||
           this.hasMobileOperatorFilter();
  }

  /**
   * Validate that activeOnly and status are not both specified
   */
  public isValid(): boolean {
    return !(this.activeOnly && this.status);
  }

  // ============================================================
  // Option Helper Methods
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
   * Check if health score should be included
   */
  public shouldIncludeHealthScore(): boolean {
    return this.includeHealthScore;
  }

  /**
   * Check if cache should be bypassed
   */
  public shouldBypassCache(): boolean {
    return this.bypassCache;
  }

  /**
   * Get cache TTL in seconds
   */
  public getCacheTtl(): number | undefined {
    return this.cacheTtlSeconds;
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
  // Cache Methods (Enterprise Enhancement)
  // ============================================================

  /**
   * Get cache key for this query
   */
  public getCacheKey(): string {
    const parts: string[] = [`sessions:user:${this.userId}`];

    // Pagination
    parts.push(`p=${this.page}:l=${this.limit}`);

    // Sorting
    parts.push(`s=${this.sortBy}:${this.sortOrder}`);

    // Filters
    if (this.status) parts.push(`st=${this.status}`);
    if (this.activeOnly) parts.push('activeOnly');
    if (this.district) parts.push(`d=${this.district}`);
    if (this.upazila) parts.push(`u=${this.upazila}`);
    if (this.networkType) parts.push(`nt=${this.networkType}`);
    if (this.mobileOperator) parts.push(`mo=${this.mobileOperator}`);
    if (this.fromDate) parts.push(`fd=${this.fromDate.toISOString()}`);
    if (this.toDate) parts.push(`td=${this.toDate.toISOString()}`);
    if (this.lastActivityFrom) parts.push(`laf=${this.lastActivityFrom.toISOString()}`);
    if (this.lastActivityTo) parts.push(`lat=${this.lastActivityTo.toISOString()}`);

    // Include flags
    if (this.includeDeviceInfo) parts.push('device');
    if (this.includeLocation) parts.push('location');
    if (this.includeHealthScore) parts.push('health');

    return parts.join(':');
  }

  /**
   * Get default cache TTL for session list queries
   * @returns Default TTL in seconds (30 seconds for list - shorter due to frequent updates)
   */
  public getDefaultCacheTtl(): number {
    return 30; // 30 seconds
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
      userId: this.userId,
      page: this.page,
      limit: this.limit,
      sortBy: this.sortBy,
      sortOrder: this.sortOrder,
      status: this.status,
      activeOnly: this.activeOnly,
      hasDistrictFilter: this.hasDistrictFilter(),
      hasNetworkTypeFilter: this.hasNetworkTypeFilter(),
      hasMobileOperatorFilter: this.hasMobileOperatorFilter(),
      hasDateRangeFilter: this.hasDateRangeFilter(),
      includeDeviceInfo: this.includeDeviceInfo,
      includeLocation: this.includeLocation,
      includeHealthScore: this.includeHealthScore,
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
      userId: this.userId,
      page: this.page,
      limit: this.limit,
      sortBy: this.sortBy,
      sortOrder: this.sortOrder,
      status: this.status,
      activeOnly: this.activeOnly,
      district: this.district,
      upazila: this.upazila,
      networkType: this.networkType,
      mobileOperator: this.mobileOperator,
      fromDate: this.fromDate?.toISOString(),
      toDate: this.toDate?.toISOString(),
      lastActivityFrom: this.lastActivityFrom?.toISOString(),
      lastActivityTo: this.lastActivityTo?.toISOString(),
      includeDeviceInfo: this.includeDeviceInfo,
      includeLocation: this.includeLocation,
      includeHealthScore: this.includeHealthScore,
      bypassCache: this.bypassCache,
      cacheTtlSeconds: this.cacheTtlSeconds,
      context: this.context,
      correlationId: this.correlationId,
      timestamp: this.timestamp.toISOString(),
    };
  }

  /**
   * String representation for debugging
   */
  public toString(): string {
    return `ListSessionsQuery(id=${this.queryId}, user=${this.userId}, page=${this.page}, limit=${this.limit}, filters=${this.hasAnyFilter()})`;
  }

  // ============================================================
  // Static Methods
  // ============================================================

  /**
   * Get allowed sort fields (for validation)
   */
  public static getAllowedSortFields(): SessionSortField[] {
    return ['createdAt', 'lastActivityAt', 'expiresAt'];
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

  // ============================================================
  // Factory Methods (Enterprise Enhancement)
  // ============================================================

  /**
   * Create a list sessions query

   * @param userId - User ID from JWT
   * @param options - Query options
   * @param correlationId - Correlation ID for tracing
   * @param context - Request context
   * @returns ListSessionsQuery instance

   * @example
   * const query = ListSessionsQuery.create('usr_123', { page: 1, limit: 20 }, 'corr_abc123');
   */
  public static create(
    userId: string,
    options?: ListSessionsOptions,
    correlationId?: string,
    context?: RequestContext
  ): ListSessionsQuery {
    return new ListSessionsQuery(userId, options, context, correlationId);
  }

  /**
   * Create a query for active sessions only

   * @param userId - User ID from JWT
   * @param options - Additional query options
   * @param correlationId - Correlation ID for tracing
   * @param context - Request context
   * @returns ListSessionsQuery instance with activeOnly=true

   * @example
   * const query = ListSessionsQuery.active('usr_123', { page: 1, limit: 20 }, 'corr_abc123');
   */
  public static active(
    userId: string,
    options?: Omit<ListSessionsOptions, 'activeOnly' | 'status'>,
    correlationId?: string,
    context?: RequestContext
  ): ListSessionsQuery {
    return new ListSessionsQuery(
      userId,
      { ...options, activeOnly: true },
      context,
      correlationId
    );
  }

  /**
   * Create a query for sessions by status

   * @param userId - User ID from JWT
   * @param status - Session status filter
   * @param options - Additional query options
   * @param correlationId - Correlation ID for tracing
   * @param context - Request context
   * @returns ListSessionsQuery instance with status filter

   * @example
   * const query = ListSessionsQuery.byStatus('usr_123', 'ACTIVE', { page: 1, limit: 20 }, 'corr_abc123');
   */
  public static byStatus(
    userId: string,
    status: SessionStatusFilter,
    options?: Omit<ListSessionsOptions, 'status' | 'activeOnly'>,
    correlationId?: string,
    context?: RequestContext
  ): ListSessionsQuery {
    return new ListSessionsQuery(
      userId,
      { ...options, status },
      context,
      correlationId
    );
  }

  /**
   * Create a query for sessions by district (Bangladesh specific)

   * @param userId - User ID from JWT
   * @param district - District name
   * @param options - Additional query options
   * @param correlationId - Correlation ID for tracing
   * @param context - Request context
   * @returns ListSessionsQuery instance with district filter

   * @example
   * const query = ListSessionsQuery.byDistrict('usr_123', 'Dhaka', { page: 1, limit: 20 }, 'corr_abc123');
   */
  public static byDistrict(
    userId: string,
    district: string,
    options?: Omit<ListSessionsOptions, 'district'>,
    correlationId?: string,
    context?: RequestContext
  ): ListSessionsQuery {
    return new ListSessionsQuery(
      userId,
      { ...options, district },
      context,
      correlationId
    );
  }

  /**
   * Create a query for sessions by network type (Bangladesh specific)

   * @param userId - User ID from JWT
   * @param networkType - Network type filter
   * @param options - Additional query options
   * @param correlationId - Correlation ID for tracing
   * @param context - Request context
   * @returns ListSessionsQuery instance with network type filter

   * @example
   * const query = ListSessionsQuery.byNetworkType('usr_123', '4g', { page: 1, limit: 20 }, 'corr_abc123');
   */
  public static byNetworkType(
    userId: string,
    networkType: NetworkTypeFilter,
    options?: Omit<ListSessionsOptions, 'networkType'>,
    correlationId?: string,
    context?: RequestContext
  ): ListSessionsQuery {
    return new ListSessionsQuery(
      userId,
      { ...options, networkType },
      context,
      correlationId
    );
  }

  /**
   * Create a query for sessions by mobile operator (Bangladesh specific)

   * @param userId - User ID from JWT
   * @param mobileOperator - Mobile operator filter
   * @param options - Additional query options
   * @param correlationId - Correlation ID for tracing
   * @param context - Request context
   * @returns ListSessionsQuery instance with mobile operator filter

   * @example
   * const query = ListSessionsQuery.byMobileOperator('usr_123', 'gp', { page: 1, limit: 20 }, 'corr_abc123');
   */
  public static byMobileOperator(
    userId: string,
    mobileOperator: MobileOperatorFilter,
    options?: Omit<ListSessionsOptions, 'mobileOperator'>,
    correlationId?: string,
    context?: RequestContext
  ): ListSessionsQuery {
    return new ListSessionsQuery(
      userId,
      { ...options, mobileOperator },
      context,
      correlationId
    );
  }

  /**
   * Create a query for recent sessions (last N days)

   * @param userId - User ID from JWT
   * @param days - Number of days to look back
   * @param options - Additional query options
   * @param correlationId - Correlation ID for tracing
   * @param context - Request context
   * @returns ListSessionsQuery instance with date range filter

   * @example
   * const query = ListSessionsQuery.recent('usr_123', 7, { page: 1, limit: 20 }, 'corr_abc123');
   */
  public static recent(
    userId: string,
    days: number,
    options?: Omit<ListSessionsOptions, 'fromDate'>,
    correlationId?: string,
    context?: RequestContext
  ): ListSessionsQuery {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days);

    return new ListSessionsQuery(
      userId,
      { ...options, fromDate },
      context,
      correlationId
    );
  }
}

// ============================================================
// Type Guards (Runtime Checking)
// ============================================================

/**
 * Type guard to check if a value is a ListSessionsQuery

 * @param query - Value to check
 * @returns True if value is a ListSessionsQuery instance
 */
export function isListSessionsQuery(query: unknown): query is ListSessionsQuery {
  return query instanceof ListSessionsQuery;
}

/**
 * Type guard to check if a field is a valid sort field

 * @param field - Field to check
 * @returns True if field is a valid sort field
 */
export function isValidSessionSortField(field: string): field is SessionSortField {
  return ListSessionsQuery.getAllowedSortFields().includes(field as SessionSortField);
}

/**
 * Type guard for paginated sessions response

 * @param response - Value to check
 * @returns True if response is a valid PaginatedSessionsResponse
 */
export function isPaginatedSessionsResponse(response: unknown): response is PaginatedSessionsResponse {
  return (
    response !== null &&
    typeof response === 'object' &&
    'items' in response &&
    Array.isArray((response as PaginatedSessionsResponse).items) &&
    'total' in response &&
    'page' in response &&
    'limit' in response
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
export function validateQuery(query: ListSessionsQuery): QueryValidationResult {
  // Check user ID
  if (!query.userId || query.userId.trim().length === 0) {
    return {
      isValid: false,
      error: 'User ID is required',
      errorBn: 'ইউজার আইডি প্রয়োজন',
    };
  }

  // Check activeOnly and status conflict
  if (!query.isValid()) {
    return {
      isValid: false,
      error: 'Cannot specify both status and activeOnly filters',
      errorBn: 'স্ট্যাটাস এবং অ্যাক্টিভঅনলি ফিল্টার একসাথে নির্দিষ্ট করা যাবে না',
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

  // Validate last activity date range
  if (query.lastActivityFrom && query.lastActivityTo && query.lastActivityFrom > query.lastActivityTo) {
    return {
      isValid: false,
      error: 'Last activity from date must be before to date',
      errorBn: 'শেষ কার্যকলাপের শুরুর তারিখ শেষের তারিখের আগে হতে হবে',
    };
  }

  // Validate district (simple length check)
  if (query.district && query.district.length > 100) {
    return {
      isValid: false,
      error: 'District name cannot exceed 100 characters',
      errorBn: 'জেলার নাম ১০০ অক্ষরের বেশি হতে পারে না',
    };
  }

  return { isValid: true };
}

// ============================================================
// Response Helper Functions
// ============================================================

/**
 * Create a paginated sessions response

 * @param items - List of sessions
 * @param total - Total number of sessions
 * @param page - Current page number
 * @param limit - Items per page
 * @param cacheHit - Whether response came from cache
 * @param queryTimeMs - Query execution time in milliseconds
 * @returns Paginated sessions response
 */
export function createPaginatedSessionsResponse(
  items: BriefSessionResponse[],
  total: number,
  page: number,
  limit: number,
  cacheHit: boolean = false,
  queryTimeMs?: number
): PaginatedSessionsResponse {
  const totalPages = Math.ceil(total / limit);

  return {
    items,
    total,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
    _cacheHit: cacheHit,
    _queryTimeMs: queryTimeMs,
  };
}

/**
 * Create an empty paginated sessions response

 * @param page - Current page number
 * @param limit - Items per page
 * @returns Empty paginated response
 */
export function createEmptyPaginatedSessionsResponse(
  page: number = 1,
  limit: number = 20
): PaginatedSessionsResponse {
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
 * Mask IP address for privacy

 * @param ip - IP address to mask
 * @returns Masked IP address
 */
export function maskIpAddress(ip: string): string {
  if (!ip) return ip;
  if (ip.includes('.')) {
    // IPv4: 192.168.1.100 -> 192.168.*.*
    const parts = ip.split('.');
    if (parts.length >= 4) {
      return `${parts[0]}.${parts[1]}.*.*`;
    }
  } else if (ip.includes(':')) {
    // IPv6: show first 2 groups only
    const parts = ip.split(':');
    if (parts.length >= 2) {
      return `${parts[0]}:${parts[1]}:****:****:****:****:****:****`;
    }
  }
  return ip;
}

// ============================================================
// Constants for External Use
// ============================================================

/**
 * Session sort field options
 */
export const SESSION_SORT_FIELDS = {
  CREATED_AT: 'createdAt',
  LAST_ACTIVITY_AT: 'lastActivityAt',
  EXPIRES_AT: 'expiresAt',
} as const;

/**
 * Session status values (from shared-constants)
 */
export { SESSION_STATUS };

/**
 * Network types (from shared-constants)
 */
export { NETWORK_TYPES };

/**
 * Mobile operators (from shared-constants)
 */
export { MOBILE_OPERATORS };

// ============================================================
// Default Export
// ============================================================

export default ListSessionsQuery;
