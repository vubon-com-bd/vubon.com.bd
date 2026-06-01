/**
 * MFA Setup Initiated Event - Pure Domain/Application Event
 * 
 * @module application/events/mfa-setup-initiated.event
 * 
 * @description
 * Event emitted when a user initiates MFA setup (before verification).
 * Used for analytics, security monitoring, and audit tracking.
 * 
 * Enterprise Rules:
 * ✅ Immutable event data
 * ✅ No business logic
 * ✅ No side effects
 * ✅ Event ID for tracing
 * ✅ Correlation ID for distributed tracing
 * ✅ Tracks setup method and device context
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
export enum MfaSetupType {
  TOTP = 'TOTP',           // Time-based One-Time Password (Google Authenticator)
  SMS = 'SMS',             // SMS OTP
  EMAIL = 'EMAIL',         // Email OTP
  WEBAUTHN = 'WEBAUTHN',   // Biometric/Passkey
}

/**
 * MFA Setup Initiated Event
 * 
 * Emitted when a user starts the MFA setup process
 * 
 * @example
 * // User initiates TOTP MFA setup
 * const event = new MfaSetupInitiatedEvent(
 *   'usr_123',
 *   MfaSetupType.TOTP,
 *   '192.168.1.100',
 *   'device_456',
 *   'Mozilla/5.0...',
 *   'corr_abc123',
 *   { deviceName: 'My iPhone' }
 * );
 * 
 * @example
 * // User initiates SMS MFA setup
 * const event = new MfaSetupInitiatedEvent(
 *   'usr_123',
 *   MfaSetupType.SMS,
 *   '192.168.1.100',
 *   'device_456',
 *   'Mozilla/5.0...',
 *   'corr_abc123',
 *   { phone: '+88017******78' }
 * );
 */
export class MfaSetupInitiatedEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = 'mfa.setup_initiated';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  // Event-specific properties
  public readonly userId: string;
  public readonly mfaType: MfaSetupType;
  public readonly ipAddress?: string;
  public readonly deviceId?: string;
  public readonly userAgent?: string;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly metadata?: Record<string, unknown>;

  constructor(
    userId: string,
    mfaType: MfaSetupType,
    ipAddress?: string,
    deviceId?: string,
    userAgent?: string,
    correlationId?: string,
    causationId?: string,
    metadata?: Record<string, unknown>
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.userId = userId;
    this.mfaType = mfaType;
    this.ipAddress = ipAddress;
    this.deviceId = deviceId;
    this.userAgent = userAgent;
    this.correlationId = correlationId;
    this.causationId = causationId;
    this.metadata = metadata;
  }
}

/**
 * MFA Setup Initiated Event Data Interface
 * For event serialization/deserialization
 */
export interface MfaSetupInitiatedEventData {
  userId: string;
  mfaType: MfaSetupType;
  ipAddress?: string;
  deviceId?: string;
  userAgent?: string;
  correlationId?: string;
  causationId?: string;
  metadata?: Record<string, unknown>;
}

/**
 * MFA Setup Completed Event
 * Emitted when user successfully verifies and completes MFA setup
 */
export class MfaSetupCompletedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = 'mfa.setup_completed';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  public readonly userId: string;
  public readonly mfaType: MfaSetupType;
  public readonly verificationTimeMs: number;
  public readonly remainingBackupCodes: number;
  public readonly ipAddress?: string;
  public readonly deviceId?: string;
  public readonly userAgent?: string;
  public readonly correlationId?: string;

  constructor(
    userId: string,
    mfaType: MfaSetupType,
    verificationTimeMs: number,
    remainingBackupCodes: number,
    correlationId?: string,
    ipAddress?: string,
    deviceId?: string,
    userAgent?: string
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.userId = userId;
    this.mfaType = mfaType;
    this.verificationTimeMs = verificationTimeMs;
    this.remainingBackupCodes = remainingBackupCodes;
    this.correlationId = correlationId;
    this.ipAddress = ipAddress;
    this.deviceId = deviceId;
    this.userAgent = userAgent;
  }
}

/**
 * MFA Setup Failed Event
 * Emitted when user fails to verify MFA setup
 */
export class MfaSetupFailedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = 'mfa.setup_failed';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  public readonly userId: string;
  public readonly mfaType: MfaSetupType;
  public readonly reason: string;
  public readonly attemptCount: number;
  public readonly ipAddress?: string;
  public readonly deviceId?: string;
  public readonly userAgent?: string;
  public readonly correlationId?: string;

  constructor(
    userId: string,
    mfaType: MfaSetupType,
    reason: string,
    attemptCount: number,
    correlationId?: string,
    ipAddress?: string,
    deviceId?: string,
    userAgent?: string
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.userId = userId;
    this.mfaType = mfaType;
    this.reason = reason;
    this.attemptCount = attemptCount;
    this.correlationId = correlationId;
    this.ipAddress = ipAddress;
    this.deviceId = deviceId;
    this.userAgent = userAgent;
  }
}
