/**
 * Phone Verified Event - Pure Domain/Application Event
 * 
 * @module application/events/phone-verified.event
 * 
 * @description
 * Event emitted when a user successfully verifies their phone number.
 * Used for security monitoring, audit logging, and enabling phone-based features.
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
 * Phone Verification Method Enum
 */
export enum PhoneVerificationMethod {
  SMS = 'SMS',
  CALL = 'CALL',
  WHATSAPP = 'WHATSAPP',
  IMO = 'IMO',           // Bangladesh specific
  TELEGRAM = 'TELEGRAM', // Bangladesh specific
  VIBER = 'VIBER',       // Bangladesh specific
}

/**
 * Phone Verification Source Enum
 */
export enum PhoneVerificationSource {
  REGISTRATION = 'REGISTRATION',     // Initial registration verification
  PHONE_CHANGE = 'PHONE_CHANGE',     // Phone number change verification
  ADMIN_REQUEST = 'ADMIN_REQUEST',   // Admin requested re-verification
  SECURITY_CHECK = 'SECURITY_CHECK', // Security prompted re-verification
  MFA_SETUP = 'MFA_SETUP',           // MFA setup verification
}

/**
 * Phone Verified Event
 * 
 * Emitted when a user successfully verifies their phone number
 * 
 * @example
 * // User verifies phone via SMS during registration
 * const event = new PhoneVerifiedEvent(
 *   'usr_123',
 *   'user@example.com',
 *   '+8801712345678',
 *   'BD',
 *   PhoneVerificationMethod.SMS,
 *   PhoneVerificationSource.REGISTRATION,
 *   'corr_abc123',
 *   'device_456',
 *   '192.168.1.100',
 *   'Mozilla/5.0...'
 * );
 * 
 * @example
 * // User verifies phone via WhatsApp for MFA setup
 * const event = new PhoneVerifiedEvent(
 *   'usr_123',
 *   'user@example.com',
 *   '+8801712345678',
 *   'BD',
 *   PhoneVerificationMethod.WHATSAPP,
 *   PhoneVerificationSource.MFA_SETUP,
 *   'corr_abc123',
 *   'device_456',
 *   '192.168.1.100',
 *   'Mozilla/5.0...',
 *   { previousPhone: '+8801987654321', attempts: 1 }
 * );
 */
export class PhoneVerifiedEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = 'user.phone_verified';
  public readonly occurredAt: Date;
  public readonly verifiedAt: Date;
  public readonly version: number = 1;

  // Core event data
  public readonly userId: string;
  public readonly email?: string;
  public readonly phoneNumber: string;
  public readonly countryCode: string;
  public readonly verificationMethod: PhoneVerificationMethod;
  public readonly verificationSource: PhoneVerificationSource;
  public readonly isFirstTimeVerification: boolean;
  
  // Security context
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly deviceId?: string;
  public readonly ipAddress?: string;
  public readonly userAgent?: string;
  
  // Additional context
  public readonly previousPhoneNumber?: string;
  public readonly attemptCount?: number;
  public readonly metadata?: Record<string, unknown>;

  constructor(
    userId: string,
    email: string | undefined,
    phoneNumber: string,
    countryCode: string,
    verificationMethod: PhoneVerificationMethod,
    verificationSource: PhoneVerificationSource,
    correlationId?: string,
    causationId?: string,
    deviceId?: string,
    ipAddress?: string,
    userAgent?: string,
    isFirstTimeVerification: boolean = true,
    previousPhoneNumber?: string,
    attemptCount?: number,
    metadata?: Record<string, unknown>
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.verifiedAt = new Date();
    this.userId = userId;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.countryCode = countryCode;
    this.verificationMethod = verificationMethod;
    this.verificationSource = verificationSource;
    this.correlationId = correlationId;
    this.causationId = causationId;
    this.deviceId = deviceId;
    this.ipAddress = ipAddress;
    this.userAgent = userAgent;
    this.isFirstTimeVerification = isFirstTimeVerification;
    this.previousPhoneNumber = previousPhoneNumber;
    this.attemptCount = attemptCount;
    this.metadata = metadata;
  }
}

/**
 * Phone Verified Event Data Interface
 * For event serialization/deserialization
 */
export interface PhoneVerifiedEventData {
  eventId: string;
  eventName: string;
  occurredAt: string;
  verifiedAt: string;
  version: number;
  userId: string;
  email?: string;
  phoneNumber: string;
  countryCode: string;
  verificationMethod: PhoneVerificationMethod;
  verificationSource: PhoneVerificationSource;
  correlationId?: string;
  causationId?: string;
  deviceId?: string;
  ipAddress?: string;
  userAgent?: string;
  isFirstTimeVerification: boolean;
  previousPhoneNumber?: string;
  attemptCount?: number;
  metadata?: Record<string, unknown>;
}

/**
 * Phone Change Requested Event
 * Emitted when user requests to change phone number
 */
export class PhoneChangeRequestedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = 'user.phone_change_requested';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  public readonly userId: string;
  public readonly oldPhoneNumber: string;
  public readonly newPhoneNumber: string;
  public readonly countryCode: string;
  public readonly correlationId?: string;
  public readonly ipAddress?: string;
  public readonly deviceId?: string;

  constructor(
    userId: string,
    oldPhoneNumber: string,
    newPhoneNumber: string,
    countryCode: string,
    correlationId?: string,
    ipAddress?: string,
    deviceId?: string
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.userId = userId;
    this.oldPhoneNumber = oldPhoneNumber;
    this.newPhoneNumber = newPhoneNumber;
    this.countryCode = countryCode;
    this.correlationId = correlationId;
    this.ipAddress = ipAddress;
    this.deviceId = deviceId;
  }
}

/**
 * Phone Verification Failed Event
 */
export class PhoneVerificationFailedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = 'user.phone_verification_failed';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  public readonly userId: string;
  public readonly phoneNumber: string;
  public readonly countryCode: string;
  public readonly verificationMethod: PhoneVerificationMethod;
  public readonly failureReason: 'INVALID_CODE' | 'EXPIRED_CODE' | 'MAX_ATTEMPTS_EXCEEDED';
  public readonly remainingAttempts?: number;
  public readonly correlationId?: string;
  public readonly ipAddress?: string;
  public readonly deviceId?: string;

  constructor(
    userId: string,
    phoneNumber: string,
    countryCode: string,
    verificationMethod: PhoneVerificationMethod,
    failureReason: 'INVALID_CODE' | 'EXPIRED_CODE' | 'MAX_ATTEMPTS_EXCEEDED',
    correlationId?: string,
    ipAddress?: string,
    deviceId?: string,
    remainingAttempts?: number
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.userId = userId;
    this.phoneNumber = phoneNumber;
    this.countryCode = countryCode;
    this.verificationMethod = verificationMethod;
    this.failureReason = failureReason;
    this.correlationId = correlationId;
    this.ipAddress = ipAddress;
    this.deviceId = deviceId;
    this.remainingAttempts = remainingAttempts;
  }
}
