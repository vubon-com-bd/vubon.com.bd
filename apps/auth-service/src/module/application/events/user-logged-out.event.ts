/**
 * User Logged Out Event - Pure Domain/Application Event
 * 
 * @module application/events/user-logged-out.event
 * 
 * @description
 * Event emitted when a user logs out or session is terminated.
 * Used for security monitoring, audit logging, and session management.
 * 
 * Enterprise Rules:
 * ✅ Immutable event data
 * ✅ No business logic
 * ✅ No side effects
 * ✅ Event ID for tracing
 * ✅ Correlation ID for distributed tracing
 * ✅ Tracks logout reason and source
 */

import { randomUUID } from 'crypto';

/**
 * Base Domain Event Interface
 */
export interface DomainEvent {
  readonly eventId: string;
  readonly eventName: string;
  readonly occurredAt: Date;
  readonly version: number;
  readonly correlationId?: string;
  readonly causationId?: string;
}

/**
 * Logout Reason Enum
 */
export enum LogoutReason {
  USER_INITIATED = 'USER_INITIATED',       // User clicked logout
  SESSION_EXPIRED = 'SESSION_EXPIRED',     // Session naturally expired
  IDLE_TIMEOUT = 'IDLE_TIMEOUT',           // Idle timeout reached
  REVOKED_BY_USER = 'REVOKED_BY_USER',     // User revoked session from device list
  REVOKED_BY_ADMIN = 'REVOKED_BY_ADMIN',   // Admin revoked session
  FORCED_LOGOUT = 'FORCED_LOGOUT',         // Forced logout (password change)
  ACCOUNT_DELETED = 'ACCOUNT_DELETED',     // Account deleted
  ACCOUNT_SUSPENDED = 'ACCOUNT_SUSPENDED', // Account suspended
  SECURITY_BREACH = 'SECURITY_BREACH',     // Security incident
  TOKEN_REVOKED = 'TOKEN_REVOKED',         // Refresh token revoked
  DEVICE_CHANGED = 'DEVICE_CHANGED',       // Device fingerprint changed
  IP_CHANGED = 'IP_CHANGED',               // Suspicious IP change
}

/**
 * Logout Source Enum
 */
export enum LogoutSource {
  USER = 'USER',           // User initiated logout
  ADMIN = 'ADMIN',         // Admin action
  SYSTEM = 'SYSTEM',       // System initiated (expiry, timeout)
  SECURITY = 'SECURITY',   // Security system (breach detection)
}

/**
 * User Logged Out Event
 * 
 * Emitted when a user session is terminated
 * 
 * @example
 * // User voluntarily logs out
 * const event = new UserLoggedOutEvent(
 *   'usr_123',
 *   'sess_456',
 *   LogoutReason.USER_INITIATED,
 *   LogoutSource.USER,
 *   'req_abc123',
 *   'device_789',
 *   '192.168.1.100',
 *   'Mozilla/5.0...'
 * );
 * 
 * @example
 * // Admin revokes user session
 * const event = new UserLoggedOutEvent(
 *   'usr_123',
 *   'sess_456',
 *   LogoutReason.REVOKED_BY_ADMIN,
 *   LogoutSource.ADMIN,
 *   'req_abc123',
 *   'device_789',
 *   '192.168.1.100',
 *   undefined,
 *   'admin_456',
 *   'Policy violation'
 * );
 * 
 * @example
 * // Session expired due to inactivity
 * const event = new UserLoggedOutEvent(
 *   'usr_123',
 *   'sess_456',
 *   LogoutReason.IDLE_TIMEOUT,
 *   LogoutSource.SYSTEM,
 *   undefined,
 *   'device_789',
 *   '192.168.1.100',
 *   undefined,
 *   undefined,
 *   '30 minutes inactive'
 * );
 */
export class UserLoggedOutEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = 'user.logged_out';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  // Event-specific properties
  public readonly userId: string;
  public readonly sessionId?: string;
  public readonly reason: LogoutReason;
  public readonly source: LogoutSource;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly deviceId?: string;
  public readonly ipAddress?: string;
  public readonly userAgent?: string;
  public readonly initiatedBy?: string;  // adminId if admin action
  public readonly note?: string;
  public readonly metadata?: Record<string, unknown>;

  constructor(
    userId: string,
    sessionId: string | undefined,
    reason: LogoutReason,
    source: LogoutSource,
    correlationId?: string,
    causationId?: string,
    deviceId?: string,
    ipAddress?: string,
    userAgent?: string,
    initiatedBy?: string,
    note?: string,
    metadata?: Record<string, unknown>
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.userId = userId;
    this.sessionId = sessionId;
    this.reason = reason;
    this.source = source;
    this.correlationId = correlationId;
    this.causationId = causationId;
    this.deviceId = deviceId;
    this.ipAddress = ipAddress;
    this.userAgent = userAgent;
    this.initiatedBy = initiatedBy;
    this.note = note;
    this.metadata = metadata;
  }
}

/**
 * User Logged Out Event Data Interface
 * For event serialization/deserialization
 */
export interface UserLoggedOutEventData {
  userId: string;
  sessionId?: string;
  reason: LogoutReason;
  source: LogoutSource;
  correlationId?: string;
  causationId?: string;
  deviceId?: string;
  ipAddress?: string;
  userAgent?: string;
  initiatedBy?: string;
  note?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Session Expired Event
 * Convenience event for session expiry (extends UserLoggedOutEvent)
 */
export class SessionExpiredEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = 'session.expired';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  public readonly sessionId: string;
  public readonly userId: string;
  public readonly expiryReason: 'timeout' | 'absolute' | 'revoked';
  public readonly expiredAt: Date;

  constructor(
    sessionId: string,
    userId: string,
    expiryReason: 'timeout' | 'absolute' | 'revoked',
    expiredAt: Date
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.sessionId = sessionId;
    this.userId = userId;
    this.expiryReason = expiryReason;
    this.expiredAt = expiredAt;
  }
}
