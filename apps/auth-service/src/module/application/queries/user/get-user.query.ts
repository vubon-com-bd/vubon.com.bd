/**
 * Get User Query - Pure Query Data Structure
 * 
 * @module application/queries/user/get-user.query
 * 
 * @description
 * Query for retrieving user details by ID.
 * Note: Permission validation happens in handler based on requester role.
 * Sensitive fields are included only for authorized requesters (self or admin).
 * 
 * Enterprise Rules:
 * ✅ Immutable query data
 * ✅ Self-contained query data
 * ✅ No business logic
 * ✅ Permission-based field exposure
 * ✅ Framework-free
 */

import { randomUUID } from 'crypto';

/**
 * Get User Query
 * 
 * @example
 * // User viewing their own profile
 * const query = new GetUserQuery(
 *   'usr_123',           // targetUserId
 *   'usr_123',           // requesterId (same as target)
 *   'USER',              // requesterRole
 *   'corr_abc123'
 * );
 * 
 * @example
 * // Admin viewing another user
 * const query = new GetUserQuery(
 *   'usr_456',           // targetUserId
 *   'admin_789',         // requesterId (admin)
 *   'ADMIN',             // requesterRole
 *   'corr_abc123'
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
    public readonly requesterRole: string,
    /** Correlation ID for distributed tracing */
    public readonly correlationId ? : string
  ) {
    this.queryId = randomUUID();
    this.timestamp = new Date();
  }
  
  /**
   * Check if requester is viewing their own profile
   */
  public isSelf(): boolean {
    return this.requesterId === this.targetUserId;
  }
  
  /**
   * Check if requester is admin
   */
  public isAdmin(): boolean {
    return this.requesterRole === 'ADMIN' || this.requesterRole === 'SUPER_ADMIN';
  }
  
  /**
   * Check if requester can view sensitive fields
   */
  public canViewSensitiveFields(): boolean {
    return this.isSelf() || this.isAdmin();
  }
  
  /**
   * Check if requester has permission to view this user
   */
  public hasPermission(): boolean {
    return this.isSelf() || this.isAdmin();
  }
}
