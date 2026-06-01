/**
 * Get Current User Query - Pure Query Data Structure
 * 
 * @module application/queries/auth/get-current-user.query
 * 
 * @description
 * Query for retrieving current authenticated user's profile.
 * 
 * Enterprise Rules:
 * ✅ Immutable query data
 * ✅ Self-contained query data
 * ✅ No business logic
 * ✅ No validation (handled by handler)
 * ✅ Framework-free
 */

import { randomUUID } from 'crypto';

/**
 * Get Current User Query
 * 
 * @example
 * const query = new GetCurrentUserQuery(
 *   'usr_550e8400-e29b-41d4-a716-446655440000',
 *   'sess_abc123',
 *   'corr_abc123'
 * );
 */
export class GetCurrentUserQuery {
  public readonly queryId: string;
  public readonly timestamp: Date;
  
  constructor(
    /** User ID from JWT */
    public readonly userId: string,
    /** Current session ID (optional) */
    public readonly sessionId ? : string,
    /** Correlation ID for distributed tracing */
    public readonly correlationId ? : string
  ) {
    this.queryId = randomUUID();
    this.timestamp = new Date();
  }
}
