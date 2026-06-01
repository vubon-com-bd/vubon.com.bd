/**
 * Get Session Query - Pure Query Data Structure
 * 
 * @module application/queries/session/get-session.query
 * 
 * @description
 * Query for retrieving a specific session by ID.
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
 * Get Session Query
 * 
 * @example
 * const query = new GetSessionQuery(
 *   'sess_550e8400-e29b-41d4-a716-446655440000',
 *   'usr_123',
 *   'corr_abc123'
 * );
 */
export class GetSessionQuery {
  public readonly queryId: string;
  public readonly timestamp: Date;
  
  constructor(
    /** Session ID to retrieve */
    public readonly sessionId: string,
    /** User ID from JWT (authenticated user) */
    public readonly userId: string,
    /** Correlation ID for distributed tracing */
    public readonly correlationId ? : string
  ) {
    this.queryId = randomUUID();
    this.timestamp = new Date();
  }
}
