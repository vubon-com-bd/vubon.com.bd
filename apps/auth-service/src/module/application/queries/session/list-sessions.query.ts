/**
 * List Sessions Query - Pure Query Data Structure
 * 
 * @module application/queries/session/list-sessions.query
 * 
 * @description
 * Query for retrieving paginated list of user sessions.
 * Note: userId is NOT accepted from client - comes from JWT.
 * 
 * Enterprise Rules:
 * ✅ Immutable query data
 * ✅ Self-contained query data
 * ✅ No business logic
 * ✅ Security: userId from JWT
 * ✅ Framework-free
 */

import { randomUUID } from 'crypto';

/**
 * Session Status for filtering
 */
export type SessionStatusFilter = 'ACTIVE' | 'EXPIRED' | 'REVOKED' | 'IDLE_EXPIRED';

/**
 * Sort field options
 */
export type SessionSortField = 'createdAt' | 'lastActivityAt' | 'expiresAt';

/**
 * Sort order options
 */
export type SortOrder = 'asc' | 'desc';

/**
 * List Sessions Query
 * 
 * @example
 * // Basic pagination
 * const query = new ListSessionsQuery(
 *   'usr_123',
 *   1,
 *   20,
 *   'corr_abc123'
 * );
 * 
 * @example
 * // With sorting and filtering
 * const query = new ListSessionsQuery(
 *   'usr_123',
 *   1,
 *   20,
 *   'corr_abc123',
 *   'lastActivityAt',
 *   'desc',
 *   'ACTIVE',
 *   true
 * );
 */
export class ListSessionsQuery {
  public readonly queryId: string;
  public readonly timestamp: Date;
  
  constructor(
    /** User ID from JWT (authenticated user) */
    public readonly userId: string,
    /** Page number (1-indexed) */
    public readonly page: number = 1,
    /** Items per page (max 100) */
    public readonly limit: number = 20,
    /** Correlation ID for distributed tracing */
    public readonly correlationId ? : string,
    /** Sort field */
    public readonly sortBy: SessionSortField = 'lastActivityAt',
    /** Sort order */
    public readonly sortOrder: SortOrder = 'desc',
    /** Filter by session status */
    public readonly status ? : SessionStatusFilter,
    /** Get only active sessions */
    public readonly activeOnly: boolean = false
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
   * Get calculated skip value for database query
   */
  public getSkip(): number {
    return (this.page - 1) * this.limit;
  }
  
  /**
   * Check if status filter is applied
   */
  public hasStatusFilter(): boolean {
    return !!this.status;
  }
  
  /**
   * Validate that activeOnly and status are not both specified
   */
  public isValid(): boolean {
    if (this.activeOnly && this.status) {
      return false;
    }
    return true;
  }
}
