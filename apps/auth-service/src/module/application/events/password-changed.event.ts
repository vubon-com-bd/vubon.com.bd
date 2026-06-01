/**
 * Password Changed Event - Pure Domain/Application Event
 * 
 * @module application/events/password-changed.event
 * 
 * @description
 * Event emitted when a user changes or resets their password.
 * Used for security monitoring, audit logging, and notification triggers.
 * 
 * Enterprise Rules:
 * ✅ Immutable event data
 * ✅ No business logic
 * ✅ No side effects
 * ✅ Event ID for tracing
 * ✅ Correlation ID for distributed tracing
 * ✅ Tracks password change reason and type
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
 * Password Change Type Enum
 */
export enum PasswordChangeType {
  USER_CHANGE = 'USER_CHANGE',       // User changed password (logged in)
  USER_RESET = 'USER_RESET',         // User reset via forgot password flow
  ADMIN_FORCE = 'ADMIN_FORCE',       // Admin forced password change
  SYSTEM_FORCE = 'SYSTEM_FORCE',     // System forced (expired, security policy)
  MIGRATION = 'MIGRATION',           // Password migrated from legacy system
}

/**
 * Password Change Reason Enum
 */
export enum PasswordChangeReason {
  USER_INITIATED = 'USER_INITIATED',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  SECURITY_BREACH = 'SECURITY_BREACH',
  POLICY_EXPIRY = 'POLICY_EXPIRY',
  ADMIN_REQUEST = 'ADMIN_REQUEST',
  FIRST_LOGIN = 'FIRST_LOGIN',
  COMPROMISED_ACCOUNT = 'COMPROMISED_ACCOUNT',
}

/**
 * Password Changed Event
 * 
 * Emitted when a user successfully changes or resets their password
 * 
 * @example
 * // User changes password while logged in
 * const event = new PasswordChangedEvent(
 *   'usr_123',
 *   PasswordChangeType.USER_CHANGE,
 *   PasswordChangeReason.USER_INITIATED,
 *   'req_abc123',
 *   'session_456',
 *   'device_789',
 *   '192.168.1.100'
 * );
 * 
 * @example
 * // User resets password via forgot password flow
 * const event = new PasswordChangedEvent(
 *   'usr_123',
 *   PasswordChangeType.USER_RESET,
 *   PasswordChangeReason.FORGOT_PASSWORD,
 *   'req_abc123',
 *   undefined,
 *   'device_789',
 *   '192.168.1.100'
 * );
 * 
 * @example
 * // Admin forces password change
 * const event = new PasswordChangedEvent(
 *   'usr_123',
 *   PasswordChangeType.ADMIN_FORCE,
 *   PasswordChangeReason.ADMIN_REQUEST,
 *   'req_abc123',
 *   undefined,
 *   'device_789',
 *   '192.168.1.100',
 *   'admin_456',
 *   'Security policy requires password change'
 * );
 */
export class PasswordChangedEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = 'user.password_changed';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  // Event-specific properties
  public readonly userId: string;
  public readonly changeType: PasswordChangeType;
  public readonly reason: PasswordChangeReason;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly deviceId?: string;
  public readonly sessionId?: string;
  public readonly ipAddress?: string;
  public readonly userAgent?: string;
  public readonly initiatedBy?: string;  // adminId if admin forced
  public readonly note?: string;
  public readonly metadata?: Record<string, unknown>;

  constructor(
    userId: string,
    changeType: PasswordChangeType,
    reason: PasswordChangeReason,
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
    this.changeType = changeType;
    this.reason = reason;
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
 * Password Changed Event Data Interface
 * For event serialization/deserialization
 */
export interface PasswordChangedEventData {
  userId: string;
  changeType: PasswordChangeType;
  reason: PasswordChangeReason;
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
 * Password Expiring Soon Event
 * Emitted when password is about to expire
 */
export class PasswordExpiringSoonEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = 'user.password_expiring_soon';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  public readonly userId: string;
  public readonly daysUntilExpiry: number;
  public readonly expiresAt: Date;
  public readonly correlationId?: string;

  constructor(
    userId: string,
    daysUntilExpiry: number,
    expiresAt: Date,
    correlationId?: string
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.userId = userId;
    this.daysUntilExpiry = daysUntilExpiry;
    this.expiresAt = expiresAt;
    this.correlationId = correlationId;
  }
}

/**
 * Password Expired Event
 * Emitted when password has expired
 */
export class PasswordExpiredEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = 'user.password_expired';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  public readonly userId: string;
  public readonly expiredAt: Date;
  public readonly correlationId?: string;

  constructor(
    userId: string,
    expiredAt: Date,
    correlationId?: string
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.userId = userId;
    this.expiredAt = expiredAt;
    this.correlationId = correlationId;
  }
}
