/**
 * Get MFA Status Query - Pure Query Data Structure
 * 
 * @module application/queries/mfa/get-mfa-status.query
 * 
 * @description
 * Query for retrieving MFA status for the authenticated user.
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
 * Get MFA Status Query
 * 
 * @example
 * const query = new GetMfaStatusQuery(
 *   'usr_550e8400-e29b-41d4-a716-446655440000',
 *   'corr_abc123'
 * );
 */
export class GetMfaStatusQuery {
  public readonly queryId: string;
  public readonly timestamp: Date;
  
  constructor(
    /** User ID from JWT (authenticated user) */
    public readonly userId: string,
    /** Correlation ID for distributed tracing */
    public readonly correlationId ? : string
  ) {
    this.queryId = randomUUID();
    this.timestamp = new Date();
  }
}
