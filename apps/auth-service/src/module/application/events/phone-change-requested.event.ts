/**
 * Phone Change Requested Event
 * 
 * @module application/events/phone-change-requested.event
 * 
 * @description
 * Event emitted when a user requests to change their phone number.
 * Used for audit logging, security monitoring, and notification triggers.
 * 
 * Enterprise Rules:
 * ✅ Immutable event data
 * ✅ No business logic
 * ✅ No side effects
 * ✅ Event ID for tracing
 * ✅ Correlation ID for distributed tracing
 * ✅ Device tracking for security audit
 */

import { randomUUID } from 'crypto';

// ============================================================
// Base Domain Event Interface
// ============================================================

export interface DomainEvent {
  readonly eventId: string;
  readonly eventName: string;
  readonly occurredAt: Date;
  readonly version: number;
  readonly correlationId?: string;
  readonly causationId?: string;
}

// ============================================================
// Phone Change Status Enum
// ============================================================

export enum PhoneChangeStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
}

// ============================================================
// Phone Change Requested Event
// ============================================================

/**
 * Phone Change Requested Event
 * 
 * Emitted when a user requests to change their phone number
 * 
 * @example
 * const event = new PhoneChangeRequestedEvent(
 *   'usr_123',
 *   '+8801712345678',
 *   '+8801987654321',
 *   'corr_abc123',
 *   '192.168.1.100',
 *   'device_456'
 * );
 */
export class PhoneChangeRequestedEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = 'user.phone_change_requested';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  // Event-specific properties
  public readonly userId: string;
  public readonly oldPhone: string | null;
  public readonly newPhone: string;
  public readonly status: PhoneChangeStatus;
  public readonly expiresAt: Date;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly ipAddress?: string;
  public readonly deviceId?: string;
  public readonly userAgent?: string;
  public readonly metadata?: Record<string, unknown>;

  constructor(
    userId: string,
    oldPhone: string | null,
    newPhone: string,
    correlationId?: string,
    causationId?: string,
    ipAddress?: string,
    deviceId?: string,
    userAgent?: string,
    expiresInMinutes: number = 5,
    metadata?: Record<string, unknown>,
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.userId = userId;
    this.oldPhone = oldPhone;
    this.newPhone = newPhone;
    this.status = PhoneChangeStatus.PENDING;
    this.expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);
    this.correlationId = correlationId;
    this.causationId = causationId;
    this.ipAddress = ipAddress;
    this.deviceId = deviceId;
    this.userAgent = userAgent;
    this.metadata = metadata;
  }

  /**
   * Check if the request has expired
   */
  public isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  /**
   * Get remaining time in seconds
   */
  public getRemainingSeconds(): number {
    if (this.isExpired()) return 0;
    const remaining = (this.expiresAt.getTime() - new Date().getTime()) / 1000;
    return Math.max(0, Math.ceil(remaining));
  }

  /**
   * Get masked new phone for logging
   */
  public getMaskedNewPhone(): string {
    return this.maskPhone(this.newPhone);
  }

  /**
   * Get masked old phone for logging
   */
  public getMaskedOldPhone(): string | null {
    return this.oldPhone ? this.maskPhone(this.oldPhone) : null;
  }

  private maskPhone(phone: string): string {
    if (phone.length <= 6) return '***';
    return phone.substring(0, phone.length - 4) + '****';
  }
}

// ============================================================
// Phone Change Verified Event
// ============================================================

/**
 * Phone Change Verified Event
 * 
 * Emitted when a user successfully verifies their new phone number
 * 
 * @example
 * const event = new PhoneChangeVerifiedEvent(
 *   'usr_123',
 *   '+8801712345678',
 *   '+8801987654321',
 *   2,
 *   'corr_abc123',
 *   '192.168.1.100',
 *   'device_456'
 * );
 */
export class PhoneChangeVerifiedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = 'user.phone_change_verified';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  public readonly userId: string;
  public readonly oldPhone: string | null;
  public readonly newPhone: string;
  public readonly verifiedAt: Date;
  public readonly attemptsUsed: number;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly ipAddress?: string;
  public readonly deviceId?: string;
  public readonly userAgent?: string;
  public readonly metadata?: Record<string, unknown>;

  constructor(
    userId: string,
    oldPhone: string | null,
    newPhone: string,
    attemptsUsed: number,
    correlationId?: string,
    causationId?: string,
    ipAddress?: string,
    deviceId?: string,
    userAgent?: string,
    metadata?: Record<string, unknown>,
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.verifiedAt = new Date();
    this.userId = userId;
    this.oldPhone = oldPhone;
    this.newPhone = newPhone;
    this.attemptsUsed = attemptsUsed;
    this.correlationId = correlationId;
    this.causationId = causationId;
    this.ipAddress = ipAddress;
    this.deviceId = deviceId;
    this.userAgent = userAgent;
    this.metadata = metadata;
  }

  public getMaskedNewPhone(): string {
    return this.maskPhone(this.newPhone);
  }

  public getMaskedOldPhone(): string | null {
    return this.oldPhone ? this.maskPhone(this.oldPhone) : null;
  }

  private maskPhone(phone: string): string {
    if (phone.length <= 6) return '***';
    return phone.substring(0, phone.length - 4) + '****';
  }
}

// ============================================================
// Phone Change Failed Event
// ============================================================

/**
 * Phone Change Failed Event
 * 
 * Emitted when OTP verification fails
 * 
 * @example
 * const event = new PhoneChangeFailedEvent(
 *   'usr_123',
 *   '+8801712345678',
 *   'Invalid OTP',
 *   2,
 *   'corr_abc123',
 *   '192.168.1.100'
 * );
 */
export class PhoneChangeFailedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = 'user.phone_change_failed';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  public readonly userId: string;
  public readonly newPhone: string;
  public readonly reason: string;
  public readonly attemptCount: number;
  public readonly remainingAttempts: number;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly ipAddress?: string;
  public readonly deviceId?: string;

  constructor(
    userId: string,
    newPhone: string,
    reason: string,
    attemptCount: number,
    remainingAttempts: number,
    correlationId?: string,
    causationId?: string,
    ipAddress?: string,
    deviceId?: string,
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.userId = userId;
    this.newPhone = newPhone;
    this.reason = reason;
    this.attemptCount = attemptCount;
    this.remainingAttempts = remainingAttempts;
    this.correlationId = correlationId;
    this.causationId = causationId;
    this.ipAddress = ipAddress;
    this.deviceId = deviceId;
  }

  public getMaskedNewPhone(): string {
    return this.maskPhone(this.newPhone);
  }

  private maskPhone(phone: string): string {
    if (phone.length <= 6) return '***';
    return phone.substring(0, phone.length - 4) + '****';
  }
}

// ============================================================
// Phone Change Expired Event
// ============================================================

/**
 * Phone Change Expired Event
 * 
 * Emitted when a pending phone change request expires
 * 
 * @example
 * const event = new PhoneChangeExpiredEvent(
 *   'usr_123',
 *   '+8801712345678',
 *   'corr_abc123'
 * );
 */
export class PhoneChangeExpiredEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = 'user.phone_change_expired';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  public readonly userId: string;
  public readonly newPhone: string;
  public readonly requestedAt: Date;
  public readonly expiredAt: Date;
  public readonly correlationId?: string;
  public readonly causationId?: string;

  constructor(
    userId: string,
    newPhone: string,
    requestedAt: Date,
    expiredAt: Date,
    correlationId?: string,
    causationId?: string,
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.userId = userId;
    this.newPhone = newPhone;
    this.requestedAt = requestedAt;
    this.expiredAt = expiredAt;
    this.correlationId = correlationId;
    this.causationId = causationId;
  }

  public getMaskedNewPhone(): string {
    return this.maskPhone(this.newPhone);
  }

  private maskPhone(phone: string): string {
    if (phone.length <= 6) return '***';
    return phone.substring(0, phone.length - 4) + '****';
  }
}
