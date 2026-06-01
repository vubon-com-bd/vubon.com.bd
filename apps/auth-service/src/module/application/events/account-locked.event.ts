/**
 * Account Locked Event - Pure Domain/Application Event
 * 
 * @module application/events/account-locked.event
 * 
 * @description
 * Event emitted when a user account is locked.
 * Used for security monitoring, audit logging, and notification triggers.
 * 
 * Enterprise Rules:
 * ✅ Immutable event data
 * ✅ No business logic
 * ✅ No side effects
 * ✅ Event ID for tracing
 * ✅ Correlation ID for distributed tracing
 * ✅ Tracks lock reason, method, and source
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
 * Account Lock Reason Enum
 */
export enum AccountLockReason {
  FAILED_LOGIN_ATTEMPTS = 'FAILED_LOGIN_ATTEMPTS',       // Too many failed login attempts
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',           // Unusual pattern detected
  ADMIN_ACTION = 'ADMIN_ACTION',                         // Administrator locked
  POLICY_VIOLATION = 'POLICY_VIOLATION',                 // Terms violation
  BRUTE_FORCE_DETECTED = 'BRUTE_FORCE_DETECTED',         // Brute force attack detected
  SIM_SWAP_DETECTED = 'SIM_SWAP_DETECTED',               // SIM swap detected (Bangladesh)
  ACCOUNT_COMPROMISED = 'ACCOUNT_COMPROMISED',           // Account believed compromised
  TEMPORARY_SUSPENSION = 'TEMPORARY_SUSPENSION',         // Temporary suspension
  PERMANENT_BAN = 'PERMANENT_BAN',                       // Permanent ban
}

/**
 * Account Lock Method Enum
 */
export enum AccountLockMethod {
  AUTOMATIC = 'AUTOMATIC',       // Automatic lock after failed attempts
  MANUAL_ADMIN = 'MANUAL_ADMIN', // Manual lock by admin
  SECURITY_SYSTEM = 'SECURITY_SYSTEM', // Security system triggered
  RATE_LIMITER = 'RATE_LIMITER', // Rate limiter triggered lock
}

/**
 * Account Lock Source Enum
 */
export enum AccountLockSource {
  SYSTEM = 'SYSTEM',     // Automatic system lock
  ADMIN = 'ADMIN',       // Administrator action
  SECURITY = 'SECURITY', // Security system action
  USER = 'USER',         // User self-lock (privacy mode)
}

/**
 * Account Locked Event
 * 
 * Emitted when a user account is locked
 * 
 * @example
 * // Automatic lock after 5 failed login attempts
 * const event = new AccountLockedEvent(
 *   'usr_123',
 *   AccountLockReason.FAILED_LOGIN_ATTEMPTS,
 *   AccountLockMethod.AUTOMATIC,
 *   AccountLockSource.SYSTEM,
 *   'req_abc123',
 *   '192.168.1.100',
 *   'device_456',
 *   undefined,
 *   5,  // 5 failed attempts
 *   900,  // 15 minutes lock duration
 *   new Date(Date.now() + 900000),
 *   { userAgent: 'Mozilla/5.0...' }
 * );
 * 
 * @example
 * // Admin manually locks account for policy violation
 * const event = new AccountLockedEvent(
 *   'usr_123',
 *   AccountLockReason.POLICY_VIOLATION,
 *   AccountLockMethod.MANUAL_ADMIN,
 *   AccountLockSource.ADMIN,
 *   'req_abc123',
 *   '10.0.0.1',
 *   'admin_device',
 *   'admin_456',
 *   undefined,
 *   86400,  // 24 hours lock duration
 *   new Date(Date.now() + 86400000),
 *   { adminName: 'John Admin', policy: 'Spam', evidence: 'Link' }
 * );
 * 
 * @example
 * // SIM swap detection lock (Bangladesh specific)
 * const event = new AccountLockedEvent(
 *   'usr_123',
 *   AccountLockReason.SIM_SWAP_DETECTED,
 *   AccountLockMethod.SECURITY_SYSTEM,
 *   AccountLockSource.SECURITY,
 *   'req_abc123',
 *   '192.168.1.100',
 *   'device_456',
 *   undefined,
 *   undefined,
 *   172800,  // 48 hours lock duration
 *   new Date(Date.now() + 172800000),
 *   { oldSim: 'GP', newSim: 'Robi', phone: '+88017******78' }
 * );
 */
export class AccountLockedEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = 'user.account_locked';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  // Core event data
  public readonly userId: string;
  public readonly lockedAt: Date;
  
  // Lock context
  public readonly reason: AccountLockReason;
  public readonly method: AccountLockMethod;
  public readonly source: AccountLockSource;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  
  // Security context
  public readonly ipAddress?: string;
  public readonly deviceId?: string;
  public readonly lockedBy?: string;  // adminId if admin lock
  
  // Lock details
  public readonly failureCount?: number;
  public readonly lockDurationSeconds: number;
  public readonly lockedUntil: Date;
  
  // Additional metadata
  public readonly metadata?: Record<string, unknown>;

  constructor(
    userId: string,
    reason: AccountLockReason,
    method: AccountLockMethod,
    source: AccountLockSource,
    correlationId?: string,
    causationId?: string,
    ipAddress?: string,
    deviceId?: string,
    lockedBy?: string,
    failureCount?: number,
    lockDurationSeconds: number = 900,  // default 15 minutes
    lockedUntil?: Date,
    metadata?: Record<string, unknown>
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.lockedAt = new Date();
    this.userId = userId;
    this.reason = reason;
    this.method = method;
    this.source = source;
    this.correlationId = correlationId;
    this.causationId = causationId;
    this.ipAddress = ipAddress;
    this.deviceId = deviceId;
    this.lockedBy = lockedBy;
    this.failureCount = failureCount;
    this.lockDurationSeconds = lockDurationSeconds;
    this.lockedUntil = lockedUntil || new Date(Date.now() + lockDurationSeconds * 1000);
    this.metadata = metadata;
  }

  /**
   * Get remaining lock time in seconds
   */
  getRemainingLockTime(): number {
    const remaining = this.lockedUntil.getTime() - Date.now();
    return Math.max(0, Math.ceil(remaining / 1000));
  }

  /**
   * Check if lock is permanent
   */
  isPermanentLock(): boolean {
    return this.lockDurationSeconds === -1 || this.reason === AccountLockReason.PERMANENT_BAN;
  }
}

/**
 * Account Locked Event Data Interface
 * For event serialization/deserialization
 */
export interface AccountLockedEventData {
  userId: string;
  lockedAt: string;
  lockedUntil: string;
  reason: AccountLockReason;
  method: AccountLockMethod;
  source: AccountLockSource;
  correlationId?: string;
  causationId?: string;
  ipAddress?: string;
  deviceId?: string;
  lockedBy?: string;
  failureCount?: number;
  lockDurationSeconds: number;
  metadata?: Record<string, unknown>;
}

/**
 * Account Lock Warning Event
 * Emitted before account lock (warning)
 */
export class AccountLockWarningEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = 'user.account_lock_warning';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  public readonly userId: string;
  public readonly remainingAttempts: number;
  public readonly nextLockAfterAttempts: number;
  public readonly correlationId?: string;
  public readonly ipAddress?: string;

  constructor(
    userId: string,
    remainingAttempts: number,
    nextLockAfterAttempts: number,
    correlationId?: string,
    ipAddress?: string
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.userId = userId;
    this.remainingAttempts = remainingAttempts;
    this.nextLockAfterAttempts = nextLockAfterAttempts;
    this.correlationId = correlationId;
    this.ipAddress = ipAddress;
  }
}
