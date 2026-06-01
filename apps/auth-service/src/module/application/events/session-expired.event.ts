/**
 * Session Expired Event - Pure Domain/Application Event
 * 
 * @module application/events/session-expired.event
 * 
 * @description
 * Event emitted when a user session expires or is terminated.
 * Used for security monitoring, audit logging, and session cleanup.
 * 
 * Enterprise Rules:
 * ✅ Immutable event data
 * ✅ No business logic
 * ✅ No side effects
 * ✅ Event ID for tracing
 * ✅ Correlation ID for distributed tracing
 * ✅ Tracks session duration and expiry reason
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
 * Session Expiry Reason Enum
 */
export enum SessionExpiryReason {
  TIMEOUT = 'TIMEOUT',                 // Natural timeout (idle or absolute)
  REVOKED = 'REVOKED',                 // User revoked session
  REVOKED_BY_ADMIN = 'REVOKED_BY_ADMIN', // Admin revoked session
  FORCED_LOGOUT = 'FORCED_LOGOUT',     // Forced logout (password change)
  ACCOUNT_DELETED = 'ACCOUNT_DELETED', // Account deleted
  ACCOUNT_SUSPENDED = 'ACCOUNT_SUSPENDED', // Account suspended
  SECURITY_BREACH = 'SECURITY_BREACH', // Security incident
  DEVICE_CHANGED = 'DEVICE_CHANGED',   // Device fingerprint changed
  IP_CHANGED = 'IP_CHANGED',           // Suspicious IP change
  IDLE_TIMEOUT = 'IDLE_TIMEOUT',       // Idle timeout reached
  ABSOLUTE_TIMEOUT = 'ABSOLUTE_TIMEOUT', // Absolute session timeout
}

/**
 * Session Expiry Source Enum
 */
export enum SessionExpirySource {
  SYSTEM = 'SYSTEM',   // System initiated (timeout)
  USER = 'USER',       // User initiated (logout)
  ADMIN = 'ADMIN',     // Admin initiated
  SECURITY = 'SECURITY', // Security system initiated
}

/**
 * Session Expired Event
 * 
 * Emitted when a session expires or is terminated
 * 
 * @example
 * // Session expired due to idle timeout
 * const event = new SessionExpiredEvent(
 *   'sess_123',
 *   'usr_456',
 *   'device_789',
 *   '192.168.1.100',
 *   'Mozilla/5.0...',
 *   SessionExpiryReason.IDLE_TIMEOUT,
 *   SessionExpirySource.SYSTEM,
 *   new Date(),
 *   true,
 *   new Date(Date.now() - 3600000),
 *   3600
 * );
 * 
 * @example
 * // Admin revokes user session
 * const event = new SessionExpiredEvent(
 *   'sess_123',
 *   'usr_456',
 *   'device_789',
 *   '192.168.1.100',
 *   'Mozilla/5.0...',
 *   SessionExpiryReason.REVOKED_BY_ADMIN,
 *   SessionExpirySource.ADMIN,
 *   new Date(),
 *   true,
 *   new Date(Date.now() - 7200000),
 *   7200,
 *   'admin_789',
 *   'Security policy violation'
 * );
 */
export class SessionExpiredEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = 'session.expired';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  // Core event data
  public readonly sessionId: string;
  public readonly userId: string;
  public readonly deviceId: string;
  public readonly ipAddress: string;
  public readonly userAgent: string;
  public readonly reason: SessionExpiryReason;
  public readonly source: SessionExpirySource;
  public readonly expiredAt: Date;
  
  // Session context
  public readonly wasActive: boolean;
  public readonly lastActivityAt?: Date;
  public readonly sessionDurationSeconds: number;
  
  // Admin/Security context
  public readonly expiredBy?: string; // adminId or userId
  public readonly note?: string;
  
  // Tracking
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly metadata?: Record<string, unknown>;

  constructor(
    sessionId: string,
    userId: string,
    deviceId: string,
    ipAddress: string,
    userAgent: string,
    reason: SessionExpiryReason,
    source: SessionExpirySource,
    expiredAt: Date,
    wasActive: boolean = false,
    lastActivityAt?: Date,
    sessionDurationSeconds?: number,
    expiredBy?: string,
    note?: string,
    correlationId?: string,
    causationId?: string,
    metadata?: Record<string, unknown>
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.sessionId = sessionId;
    this.userId = userId;
    this.deviceId = deviceId;
    this.ipAddress = ipAddress;
    this.userAgent = userAgent;
    this.reason = reason;
    this.source = source;
    this.expiredAt = expiredAt;
    this.wasActive = wasActive;
    this.lastActivityAt = lastActivityAt;
    this.sessionDurationSeconds = sessionDurationSeconds || 
      Math.floor((expiredAt.getTime() - (lastActivityAt?.getTime() || expiredAt.getTime())) / 1000);
    this.expiredBy = expiredBy;
    this.note = note;
    this.correlationId = correlationId;
    this.causationId = causationId;
    this.metadata = metadata;
  }
}

/**
 * Session Expired Event Data Interface
 * For event serialization/deserialization
 */
export interface SessionExpiredEventData {
  eventId: string;
  eventName: string;
  occurredAt: string;
  version: number;
  sessionId: string;
  userId: string;
  deviceId: string;
  ipAddress: string;
  userAgent: string;
  reason: SessionExpiryReason;
  source: SessionExpirySource;
  expiredAt: string;
  wasActive: boolean;
  lastActivityAt?: string;
  sessionDurationSeconds: number;
  expiredBy?: string;
  note?: string;
  correlationId?: string;
  causationId?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Session Extend Event (for completeness)
 * Emitted when session is extended
 */
export class SessionExtendedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = 'session.extended';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  public readonly sessionId: string;
  public readonly userId: string;
  public readonly deviceId: string;
  public readonly oldExpiry: Date;
  public readonly newExpiry: Date;
  public readonly extendedByMinutes: number;
  public readonly correlationId?: string;

  constructor(
    sessionId: string,
    userId: string,
    deviceId: string,
    oldExpiry: Date,
    newExpiry: Date,
    correlationId?: string
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.sessionId = sessionId;
    this.userId = userId;
    this.deviceId = deviceId;
    this.oldExpiry = oldExpiry;
    this.newExpiry = newExpiry;
    this.extendedByMinutes = Math.round((newExpiry.getTime() - oldExpiry.getTime()) / (60 * 1000));
    this.correlationId = correlationId;
  }
}

/**
 * Session Activity Recorded Event
 * Emitted when session activity is recorded
 */
export class SessionActivityRecordedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = 'session.activity_recorded';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  public readonly sessionId: string;
  public readonly userId: string;
  public readonly activityAt: Date;
  public readonly ipAddress?: string;
  public readonly userAgent?: string;
  public readonly correlationId?: string;

  constructor(
    sessionId: string,
    userId: string,
    activityAt: Date,
    ipAddress?: string,
    userAgent?: string,
    correlationId?: string
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.sessionId = sessionId;
    this.userId = userId;
    this.activityAt = activityAt;
    this.ipAddress = ipAddress;
    this.userAgent = userAgent;
    this.correlationId = correlationId;
  }
}
