/**
 * MFA Verification Failed Event - Pure Domain/Application Event
 * 
 * @module application/events/mfa-verification-failed.event
 * 
 * @description
 * Event emitted when MFA verification fails.
 * Used for security monitoring, audit logging, and lockout mechanisms.
 * 
 * Enterprise Rules:
 * ✅ Immutable event data
 * ✅ No business logic
 * ✅ No side effects
 * ✅ Event ID for tracing
 * ✅ Correlation ID for distributed tracing
 * ✅ Tracks failure reason and remaining attempts
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
 * MFA Type Enum
 */
export enum MfaType {
  TOTP = 'TOTP',
  SMS = 'SMS',
  EMAIL = 'EMAIL',
  WEBAUTHN = 'WEBAUTHN',
}

/**
 * MFA Failure Reason Enum
 */
export enum MfaFailureReason {
  INVALID_CODE = 'INVALID_CODE',
  EXPIRED_CODE = 'EXPIRED_CODE',
  MAX_ATTEMPTS_EXCEEDED = 'MAX_ATTEMPTS_EXCEEDED',
  BACKUP_CODE_USED = 'BACKUP_CODE_USED',
  RATE_LIMITED = 'RATE_LIMITED',
  MISSING_CONFIGURATION = 'MISSING_CONFIGURATION',
  DEVICE_UNTRUSTED = 'DEVICE_UNTRUSTED',
}

/**
 * MFA Verification Failed Event
 * 
 * Emitted when MFA verification fails
 * 
 * @example
 * // Invalid TOTP code
 * const event = new MfaVerificationFailedEvent(
 *   'usr_123',
 *   MfaType.TOTP,
 *   MfaFailureReason.INVALID_CODE,
 *   'corr_abc123',
 *   '192.168.1.100',
 *   'device_456',
 *   'Mozilla/5.0...',
 *   2,
 *   false
 * );
 */
export class MfaVerificationFailedEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = 'mfa.verification_failed';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  // Core event data
  public readonly userId: string;
  public readonly email?: string;
  public readonly mfaType: MfaType;
  public readonly failureReason: MfaFailureReason;
  
  // Security context
  public readonly ipAddress?: string;
  public readonly deviceId?: string;
  public readonly userAgent?: string;
  
  // Tracking
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly remainingAttempts?: number;
  public readonly isLocked?: boolean;
  public readonly lockDurationMinutes?: number;
  public readonly metadata?: Record<string, unknown>;

  constructor(
    userId: string,
    mfaType: MfaType,
    failureReason: MfaFailureReason,
    correlationId?: string,
    causationId?: string,
    ipAddress?: string,
    deviceId?: string,
    userAgent?: string,
    remainingAttempts?: number,
    isLocked?: boolean,
    lockDurationMinutes?: number,
    email?: string,
    metadata?: Record<string, unknown>
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.userId = userId;
    this.email = email;
    this.mfaType = mfaType;
    this.failureReason = failureReason;
    this.correlationId = correlationId;
    this.causationId = causationId;
    this.ipAddress = ipAddress;
    this.deviceId = deviceId;
    this.userAgent = userAgent;
    this.remainingAttempts = remainingAttempts;
    this.isLocked = isLocked;
    this.lockDurationMinutes = lockDurationMinutes;
    this.metadata = metadata;
  }
}

/**
 * MFA Verification Failed Event Data Interface
 * For event serialization/deserialization
 */
export interface MfaVerificationFailedEventData {
  eventId: string;
  eventName: string;
  occurredAt: string;
  version: number;
  userId: string;
  email?: string;
  mfaType: MfaType;
  failureReason: MfaFailureReason;
  correlationId?: string;
  causationId?: string;
  ipAddress?: string;
  deviceId?: string;
  userAgent?: string;
  remainingAttempts?: number;
  isLocked?: boolean;
  lockDurationMinutes?: number;
  metadata?: Record<string, unknown>;
}
