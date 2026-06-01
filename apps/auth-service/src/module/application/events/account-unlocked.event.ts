/**
 * Account Unlocked Event - Pure Domain/Application Event
 * 
 * @module application/events/account-unlocked.event
 * 
 * @description
 * Event emitted when a locked user account is unlocked.
 * Used for security monitoring, audit logging, and notification triggers.
 * 
 * Enterprise Rules:
 * ✅ Immutable event data
 * ✅ No business logic
 * ✅ No side effects
 * ✅ Event ID for tracing
 * ✅ Correlation ID for distributed tracing
 * ✅ Tracks unlock reason, method, and source
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
 * Account Unlock Reason Enum
 */
export enum AccountUnlockReason {
  AUTO_EXPIRY = 'AUTO_EXPIRY',           // Lock expired automatically
  USER_ACTION = 'USER_ACTION',           // User unlocked via email/phone
  ADMIN_ACTION = 'ADMIN_ACTION',         // Admin manually unlocked
  SUPPORT_ACTION = 'SUPPORT_ACTION',     // Support team unlocked
  PASSWORD_RESET = 'PASSWORD_RESET',     // User reset password
  VERIFICATION_COMPLETE = 'VERIFICATION_COMPLETE', // Completed verification
  SECURITY_REVIEW = 'SECURITY_REVIEW',   // Passed security review
}

/**
 * Account Unlock Source Enum
 */
export enum AccountUnlockSource {
  SYSTEM = 'SYSTEM',       // Automatic system unlock
  USER = 'USER',           // User initiated unlock
  ADMIN = 'ADMIN',         // Administrator action
  SUPPORT = 'SUPPORT',     // Support team action
  SECURITY = 'SECURITY',   // Security system action
}

/**
 * Account Unlock Method Enum
 */
export enum AccountUnlockMethod {
  TIME_BASED = 'TIME_BASED',           // Automatic after lock duration
  EMAIL_VERIFICATION = 'EMAIL_VERIFICATION', // Verified via email
  SMS_VERIFICATION = 'SMS_VERIFICATION',     // Verified via SMS
  ADMIN_PORTAL = 'ADMIN_PORTAL',       // Admin portal action
  SUPPORT_PORTAL = 'SUPPORT_PORTAL',   // Support portal action
  PASSWORD_RESET = 'PASSWORD_RESET',   // Password reset flow
  API_CALL = 'API_CALL',               // API call
}

/**
 * Account Unlocked Event
 * 
 * Emitted when a locked user account is unlocked
 * 
 * @example
 * // Account automatically unlocked after lock period expires
 * const event = new AccountUnlockedEvent(
 *   'usr_123',
 *   AccountUnlockReason.AUTO_EXPIRY,
 *   AccountUnlockSource.SYSTEM,
 *   AccountUnlockMethod.TIME_BASED,
 *   'req_abc123',
 *   '192.168.1.100',
 *   'device_456',
 *   undefined,
 *   'FAILED_LOGIN_ATTEMPTS',
 *   900,  // 15 minutes locked
 *   { lockDuration: '15 minutes', failureCount: 5 }
 * );
 * 
 * @example
 * // Admin manually unlocks account
 * const event = new AccountUnlockedEvent(
 *   'usr_123',
 *   AccountUnlockReason.ADMIN_ACTION,
 *   AccountUnlockSource.ADMIN,
 *   AccountUnlockMethod.ADMIN_PORTAL,
 *   'req_abc123',
 *   '10.0.0.1',
 *   'admin_device',
 *   'admin_456',
 *   'ADMIN_ACTION',
 *   3600,  // 1 hour locked
 *   { adminName: 'John Admin', reason: 'User verified identity' }
 * );
 * 
 * @example
 * // User unlocks account via password reset
 * const event = new AccountUnlockedEvent(
 *   'usr_123',
 *   AccountUnlockReason.PASSWORD_RESET,
 *   AccountUnlockSource.USER,
 *   AccountUnlockMethod.PASSWORD_RESET,
 *   'req_abc123',
 *   '192.168.1.100',
 *   'device_456',
 *   undefined,
 *   'FAILED_LOGIN_ATTEMPTS',
 *   1800,  // 30 minutes locked
 *   { resetTokenValidated: true }
 * );
 */
export class AccountUnlockedEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = 'user.account_unlocked';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  // Core event data
  public readonly userId: string;
  public readonly unlockedAt: Date;
  
  // Unlock context
  public readonly reason: AccountUnlockReason;
  public readonly source: AccountUnlockSource;
  public readonly method: AccountUnlockMethod;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  
  // Security context
  public readonly ipAddress?: string;
  public readonly deviceId?: string;
  public readonly unlockedBy?: string;  // adminId or supportId
  
  // Lock context (for analytics)
  public readonly previousLockReason?: string;
  public readonly lockDurationSeconds?: number;
  
  // Additional metadata
  public readonly metadata?: Record<string, unknown>;

  constructor(
    userId: string,
    reason: AccountUnlockReason,
    source: AccountUnlockSource,
    method: AccountUnlockMethod,
    correlationId?: string,
    causationId?: string,
    ipAddress?: string,
    deviceId?: string,
    unlockedBy?: string,
    previousLockReason?: string,
    lockDurationSeconds?: number,
    metadata?: Record<string, unknown>
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.unlockedAt = new Date();
    this.userId = userId;
    this.reason = reason;
    this.source = source;
    this.method = method;
    this.correlationId = correlationId;
    this.causationId = causationId;
    this.ipAddress = ipAddress;
    this.deviceId = deviceId;
    this.unlockedBy = unlockedBy;
    this.previousLockReason = previousLockReason;
    this.lockDurationSeconds = lockDurationSeconds;
    this.metadata = metadata;
  }
}

/**
 * Account Unlocked Event Data Interface
 * For event serialization/deserialization
 */
export interface AccountUnlockedEventData {
  userId: string;
  unlockedAt: string;
  reason: AccountUnlockReason;
  source: AccountUnlockSource;
  method: AccountUnlockMethod;
  correlationId?: string;
  causationId?: string;
  ipAddress?: string;
  deviceId?: string;
  unlockedBy?: string;
  previousLockReason?: string;
  lockDurationSeconds?: number;
  metadata?: Record<string, unknown>;
}

/**
 * Account Locked Event (for completeness)
 * Emitted when account is locked
 */
export class AccountLockedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = 'user.account_locked';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  public readonly userId: string;
  public readonly lockedAt: Date;
  public readonly reason: string;
  public readonly lockDurationSeconds?: number;
  public readonly failureCount?: number;
  public readonly ipAddress?: string;
  public readonly correlationId?: string;

  constructor(
    userId: string,
    reason: string,
    correlationId?: string,
    lockDurationSeconds?: number,
    failureCount?: number,
    ipAddress?: string
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.lockedAt = new Date();
    this.userId = userId;
    this.reason = reason;
    this.correlationId = correlationId;
    this.lockDurationSeconds = lockDurationSeconds;
    this.failureCount = failureCount;
    this.ipAddress = ipAddress;
  }
}
