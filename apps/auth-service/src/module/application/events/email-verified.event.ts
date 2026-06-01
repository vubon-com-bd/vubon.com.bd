/**
 * Email Verified Event - Pure Domain/Application Event
 * 
 * @module application/events/email-verified.event
 * 
 * @description
 * Event emitted when a user successfully verifies their email address.
 * Used for audit logging, security monitoring, and triggering welcome flows.
 * 
 * Enterprise Rules:
 * ✅ Immutable event data
 * ✅ No business logic
 * ✅ No side effects
 * ✅ Event ID for tracing
 * ✅ Correlation ID for distributed tracing
 * ✅ Tracks verification method and security context
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
 * Email Verification Method Enum
 */
export enum EmailVerificationMethod {
  OTP = 'OTP',                   // Verified via OTP code
  MAGIC_LINK = 'MAGIC_LINK',     // Verified via magic link click
  ADMIN_VERIFIED = 'ADMIN_VERIFIED', // Admin manually verified
  SOCIAL_PROVIDER = 'SOCIAL_PROVIDER', // Email came pre-verified from social provider
  RESEND_VERIFICATION = 'RESEND_VERIFICATION', // Verified via resent email
}

/**
 * Email Verification Source Enum
 */
export enum EmailVerificationSource {
  REGISTRATION = 'REGISTRATION',     // Initial registration verification
  EMAIL_CHANGE = 'EMAIL_CHANGE',     // Email change verification
  ADMIN_REQUEST = 'ADMIN_REQUEST',   // Admin requested re-verification
  SECURITY_CHECK = 'SECURITY_CHECK', // Security prompted re-verification
}

/**
 * Email Verified Event
 * 
 * Emitted when a user successfully verifies their email address
 * 
 * @example
 * // User verifies via OTP during registration
 * const event = new EmailVerifiedEvent(
 *   'usr_123',
 *   'user@example.com',
 *   EmailVerificationMethod.OTP,
 *   EmailVerificationSource.REGISTRATION,
 *   'req_abc123',
 *   '192.168.1.100',
 *   'device_456',
 *   'Mozilla/5.0...',
 *   { otpDeliveryMethod: 'email', attempts: 1 }
 * );
 * 
 * @example
 * // Admin manually verifies user email
 * const event = new EmailVerifiedEvent(
 *   'usr_123',
 *   'user@example.com',
 *   EmailVerificationMethod.ADMIN_VERIFIED,
 *   EmailVerificationSource.ADMIN_REQUEST,
 *   'req_abc123',
 *   '10.0.0.1',
 *   'admin_device',
 *   'Admin Portal',
 *   { adminId: 'admin_456', reason: 'User called support' }
 * );
 * 
 * @example
 * // Email change verification
 * const event = new EmailVerifiedEvent(
 *   'usr_123',
 *   'newemail@example.com',
 *   EmailVerificationMethod.MAGIC_LINK,
 *   EmailVerificationSource.EMAIL_CHANGE,
 *   'req_abc123',
 *   '192.168.1.100',
 *   'device_456',
 *   'Mozilla/5.0...',
 *   { oldEmail: 'old@example.com' }
 * );
 */
export class EmailVerifiedEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = 'user.email_verified';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  // Core event data
  public readonly userId: string;
  public readonly email: string;
  public readonly verifiedAt: Date;
  
  // Verification context
  public readonly verificationMethod: EmailVerificationMethod;
  public readonly verificationSource: EmailVerificationSource;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  
  // Security context
  public readonly ipAddress?: string;
  public readonly deviceId?: string;
  public readonly userAgent?: string;
  
  // Additional metadata
  public readonly previousEmail?: string;
  public readonly verifiedBy?: string;  // adminId if admin verified
  public readonly metadata?: Record<string, unknown>;

  constructor(
    userId: string,
    email: string,
    verificationMethod: EmailVerificationMethod,
    verificationSource: EmailVerificationSource,
    correlationId?: string,
    causationId?: string,
    ipAddress?: string,
    deviceId?: string,
    userAgent?: string,
    previousEmail?: string,
    verifiedBy?: string,
    metadata?: Record<string, unknown>
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.verifiedAt = new Date();
    this.userId = userId;
    this.email = email;
    this.verificationMethod = verificationMethod;
    this.verificationSource = verificationSource;
    this.correlationId = correlationId;
    this.causationId = causationId;
    this.ipAddress = ipAddress;
    this.deviceId = deviceId;
    this.userAgent = userAgent;
    this.previousEmail = previousEmail;
    this.verifiedBy = verifiedBy;
    this.metadata = metadata;
  }
}

/**
 * Email Verified Event Data Interface
 * For event serialization/deserialization
 */
export interface EmailVerifiedEventData {
  userId: string;
  email: string;
  verifiedAt: string;
  verificationMethod: EmailVerificationMethod;
  verificationSource: EmailVerificationSource;
  correlationId?: string;
  causationId?: string;
  ipAddress?: string;
  deviceId?: string;
  userAgent?: string;
  previousEmail?: string;
  verifiedBy?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Email Change Requested Event
 * Emitted when user requests to change their email address
 */
export class EmailChangeRequestedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = 'user.email_change_requested';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  public readonly userId: string;
  public readonly oldEmail: string;
  public readonly newEmail: string;
  public readonly correlationId?: string;
  public readonly ipAddress?: string;
  public readonly deviceId?: string;

  constructor(
    userId: string,
    oldEmail: string,
    newEmail: string,
    correlationId?: string,
    ipAddress?: string,
    deviceId?: string
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.userId = userId;
    this.oldEmail = oldEmail;
    this.newEmail = newEmail;
    this.correlationId = correlationId;
    this.ipAddress = ipAddress;
    this.deviceId = deviceId;
  }
}
