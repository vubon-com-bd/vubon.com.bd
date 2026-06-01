/**
 * List Users Query - Pure Query Data Structure
 * 
 * @module application/queries/user/list-users.query
 * 
 * @description
 * Query for retrieving paginated list of users.
 * Note: Only accessible to users with ADMIN or SUPER_ADMIN role.
 * 
 * Enterprise Rules:
 * ✅ Immutable query data
 * ✅ Self-contained query data
 * ✅ No business logic
 * ✅ Security: Admin-only access
 * ✅ Framework-free
 */

import { randomUUID } from 'crypto';

/**
 * Sort field options (whitelist to prevent SQL injection)
 */
export type UserSortField = 'createdAt' | 'email' | 'fullName' | 'lastLoginAt' | 'role' | 'status';

/**
 * Sort order options
 */
export type SortOrder = 'asc' | 'desc';

/**
 * User status filter options
 */
export type UserStatusFilter = 'ACTIVE' | 'INACTIVE' | 'LOCKED' | 'SUSPENDED' | 'DELETED';

/**
 * User role filter options
 */
export type UserRoleFilter = 'USER' | 'ADMIN' | 'MODERATOR' | 'SUPER_ADMIN';

/**
 * List Users Query
 * 
 * @example
 * // Basic pagination
 * const query = new ListUsersQuery(
 *   'admin_123',        // requesterId
 *   'ADMIN',            // requesterRole
 *   1,                  // page
 *   20,                 // limit
 *   'corr_abc123'       // correlationId
 * );
 * 
 * @example
 * // With filters and sorting
 * const query = new ListUsersQuery(
 *   'admin_123',
 *   'ADMIN',
 *   1,
 *   20,
 *   'corr_abc123',
 *   'createdAt',
 *   'desc',
 *   'john',             // search
 *   'USER',             // role
 *   'ACTIVE'            // status
 * );
 */
export class ListUsersQuery {
  public readonly queryId: string;
  public readonly timestamp: Date;
  
  constructor(
    /** Requester user ID (from JWT) */
    public readonly requesterId: string,
    /** Requester role (from JWT) - must be ADMIN or SUPER_ADMIN */
    public readonly requesterRole: string,
    /** Page number (1-indexed) */
    public readonly page: number = 1,
    /** Items per page (max 100) */
    public readonly limit: number = 20,
    /** Correlation ID for distributed tracing */
    public readonly correlationId ? : string,
    /** Sort field (whitelisted) */
    public readonly sortBy: UserSortField = 'createdAt',
    /** Sort order */
    public readonly sortOrder: SortOrder = 'desc',
    /** Search term for email, name, or phone */
    public readonly search ? : string,
    /** Filter by user role */
    public readonly role ? : UserRoleFilter,
    /** Filter by user status */
    public readonly status ? : UserStatusFilter
  ) {
    this.queryId = randomUUID();
    this.timestamp = new Date();
    
    // Enforce max limit (prevent DoS)
    if (this.limit > 100) {
      this.limit = 100;
    }
    if (this.limit < 1) {
      this.limit = 1;
    }
    if (this.page < 1) {
      this.page = 1;
    }
  }
  
  /**
   * Check if requester is admin (has permission to list users)
   */
  public isAdmin(): boolean {
    return this.requesterRole === 'ADMIN' || this.requesterRole === 'SUPER_ADMIN';
  }
  
  /**
   * Check if requester has permission to execute this query
   */
  public hasPermission(): boolean {
    return this.isAdmin();
  }
  
  /**
   * Get calculated skip value for database query
   */
  public getSkip(): number {
    return (this.page - 1) * this.limit;
  }
  
  /**
   * Check if search filter is applied
   */
  public hasSearch(): boolean {
    return !!this.search && this.search.trim().length > 0;
  }
  
  /**
   * Get trimmed search term
   */
  public getSearchTerm(): string | undefined {
    return this.hasSearch() ? this.search!.trim() : undefined;
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
   * Get allowed sort fields (for validation)
   */
  public static getAllowedSortFields(): UserSortField[] {
    return ['createdAt', 'email', 'fullName', 'lastLoginAt', 'role', 'status'];
  }
}
