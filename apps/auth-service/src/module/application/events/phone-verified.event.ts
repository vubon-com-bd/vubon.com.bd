/**
 * Phone Verified Event - Enterprise Grade (v3.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce

 * @module application/events/phone-verified.event

 * @description
 * Event emitted when a user successfully verifies their phone number.
 * Enhanced with shared-types integration, event versioning, TTL support,
 * Bangladesh specific fields, and priority-based processing.

 * ENTERPRISE ENHANCEMENTS (v3.0):
 * ✅ Shared-types integration (@vubon/shared-types)
 * ✅ Event versioning with aggregateVersion tracking
 * ✅ TTL support with expiresAt for event expiry
 * ✅ Priority-based event processing (low/normal/high/critical)
 * ✅ Partition key for event streaming optimization
 * ✅ Bangladesh specific fields (district, upazila, mobileOperator, networkType)
 * ✅ OTP delivery method tracking
 * ✅ Time to verify tracking (security metric)
 * ✅ Verification attempts tracking
 * ✅ First-time verification detection
 * ✅ Phone change tracking with previous phone
 * ✅ Zod schema for runtime validation
 * ✅ Serialization support (toJSON, fromJSON)
 * ✅ Helper methods for event analysis
 * ✅ Bengali language support
 */

import { randomUUID } from 'crypto';
import { z } from 'zod';

// ✅ Enterprise: Import from shared-types and shared-constants
import type { 
  EventMetadata, 
  EventPayload, 
  DomainEvent as SharedDomainEvent,
  EventPriority
} from '@vubon/shared-types';

import {
  EVENT_VERSIONS,
  EVENT_NAMES,
  MOBILE_OPERATORS,
  NETWORK_TYPES
} from '@vubon/shared-constants';

// ============================================================
// Domain Event Interface (Extends shared-types)
// ============================================================

export interface DomainEvent extends SharedDomainEvent {
  readonly eventId: string;
  readonly eventName: string;
  readonly occurredAt: Date;
  readonly eventVersion: number;      // Schema version (not aggregate version)
  readonly aggregateVersion: number;   // Aggregate root version (for event sourcing)
  readonly correlationId?: string;
  readonly causationId?: string;
  readonly ttlSeconds?: number;        // Time to live for event (seconds)
  readonly expiresAt?: Date;           // When event expires
  readonly priority?: EventPriority;   // Priority for processing queue
  readonly partitionKey?: string;      // For event streaming partitioning
}

// ============================================================
// Phone Verification Method Enum (Extended - Bangladesh specific)
// ============================================================

export enum PhoneVerificationMethod {
  SMS = 'SMS',
  CALL = 'CALL',
  WHATSAPP = 'WHATSAPP',      // Bangladesh specific
  IMO = 'IMO',                // Bangladesh specific
  TELEGRAM = 'TELEGRAM',      // Bangladesh specific
  VIBER = 'VIBER',            // Bangladesh specific
  VOICE = 'VOICE',            // Voice call (feature phones)
  OTP_APP = 'OTP_APP',        // Authenticator app OTP
  ADMIN_VERIFIED = 'ADMIN_VERIFIED', // Admin manually verified
  SOCIAL_PROVIDER = 'SOCIAL_PROVIDER', // Phone came pre-verified from social provider
  BULK_ADMIN = 'BULK_ADMIN',  // Bulk verification by admin
  SYSTEM_VERIFIED = 'SYSTEM_VERIFIED', // System-verified
}

// ============================================================
// Phone Verification Source Enum (Extended)
// ============================================================

export enum PhoneVerificationSource {
  REGISTRATION = 'REGISTRATION',     // Initial registration verification
  PHONE_CHANGE = 'PHONE_CHANGE',     // Phone number change verification
  ADMIN_REQUEST = 'ADMIN_REQUEST',   // Admin requested re-verification
  SECURITY_CHECK = 'SECURITY_CHECK', // Security prompted re-verification
  MFA_SETUP = 'MFA_SETUP',           // MFA setup verification
  LOGIN_ATTEMPT = 'LOGIN_ATTEMPT',   // Verification during login (unusual activity)
  PASSWORD_RESET = 'PASSWORD_RESET', // Verification during password reset
  PAYMENT_VERIFICATION = 'PAYMENT_VERIFICATION', // High-value payment verification
  ACCOUNT_RECOVERY = 'ACCOUNT_RECOVERY', // Account recovery process
  COMPLIANCE_AUDIT = 'COMPLIANCE_AUDIT', // Compliance/regulatory requirement
  KYC_REQUIREMENT = 'KYC_REQUIREMENT', // KYC verification requirement
}

// ============================================================
// OTP Delivery Method Enum (Bangladesh specific)
// ============================================================

export enum OTPDeliveryMethod {
  SMS = 'SMS',
  WHATSAPP = 'WHATSAPP',
  VOICE = 'VOICE',
  IMO = 'IMO',
  TELEGRAM = 'TELEGRAM',
}

// ============================================================
// Phone Change Failure Reason Enum
// ============================================================

export enum PhoneChangeFailureReason {
  INVALID_OTP = 'INVALID_OTP',
  OTP_EXPIRED = 'OTP_EXPIRED',
  MAX_ATTEMPTS_EXCEEDED = 'MAX_ATTEMPTS_EXCEEDED',
  PHONE_ALREADY_EXISTS = 'PHONE_ALREADY_EXISTS',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',
  RATE_LIMITED = 'RATE_LIMITED',
  INVALID_PASSWORD = 'INVALID_PASSWORD',
  INVALID_VERIFICATION_TOKEN = 'INVALID_VERIFICATION_TOKEN',
  VERIFICATION_TOKEN_EXPIRED = 'VERIFICATION_TOKEN_EXPIRED',
  SMS_FAILED = 'SMS_FAILED',
  WHATSAPP_FAILED = 'WHATSAPP_FAILED',
  VOICE_CALL_FAILED = 'VOICE_CALL_FAILED',
}

// ============================================================
// ✅ ENTERPRISE: Event Metadata Interface (Bangladesh specific)
// ============================================================

export interface PhoneVerifiedMetadata extends EventMetadata {
  /** User's IP address for geolocation */
  ipAddress?: string;

  /** Device ID for device fingerprinting */
  deviceId?: string;

  /** Device fingerprint hash (for security) */
  deviceFingerprint?: string;

  /** User agent for browser/OS detection */
  userAgent?: string;

  /** Session ID (if available) */
  sessionId?: string;

  /** OTP delivery method used */
  otpDeliveryMethod?: OTPDeliveryMethod;

  /** Number of verification attempts */
  verificationAttempts?: number;

  /** Time between verification request and completion (seconds) */
  timeToVerifySeconds?: number;

  /** Whether CAPTCHA was required during verification */
  captchaRequired?: boolean;

  /** Whether CAPTCHA was solved correctly */
  captchaSolved?: boolean;

  /** Whether this verification triggered a security alert */
  triggeredSecurityAlert?: boolean;

  /** Security alert reason (if triggered) */
  securityAlertReason?: string;

  /** ✅ Enterprise: Bangladesh specific fields */
  /** User's district (Bangladesh) */
  district?: string;

  /** User's upazila/sub-district */
  upazila?: string;

  /** Division (Bangladesh) */
  division?: string;

  /** Mobile operator for carrier-specific logic */
  mobileOperator?: typeof MOBILE_OPERATORS[number];

  /** Network type for connectivity optimization */
  networkType?: typeof NETWORK_TYPES[number];

  /** Whether data saver mode is enabled */
  dataSaverEnabled?: boolean;

  /** Device type */
  deviceType?: 'desktop' | 'mobile' | 'tablet' | 'feature_phone' | 'smart_tv' | 'console';

  /** Browser name */
  browserName?: string;

  /** Browser version */
  browserVersion?: string;

  /** OS name */
  osName?: string;

  /** OS version */
  osVersion?: string;

  /** Timezone offset in minutes */
  timezoneOffset?: number;

  /** Language preference */
  language?: 'en' | 'bn';
}

// ============================================================
// ✅ ENTERPRISE: Event Payload Interface
// ============================================================

export interface PhoneVerifiedPayload extends EventPayload {
  /** User ID */
  userId: string;

  /** User email */
  email?: string;

  /** User phone number (verified) */
  phoneNumber: string;

  /** Country code */
  countryCode: string;

  /** Verification method used */
  verificationMethod: PhoneVerificationMethod;

  /** Verification source */
  verificationSource: PhoneVerificationSource;

  /** Is this the first verification for this phone? */
  isFirstTimeVerification: boolean;

  /** Previous phone number (if this was a phone change) */
  previousPhoneNumber?: string;

  /** Admin ID who performed verification (if applicable) */
  verifiedBy?: string;

  /** Was notification sent to user? */
  notificationSent?: boolean;

  /** Notification channel used */
  notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';
}

// ============================================================
// ✅ ENTERPRISE: Zod Schema for Runtime Validation
// ============================================================

export const PhoneVerifiedEventSchema = z.object({
  eventId: z.string().uuid(),
  eventName: z.literal(EVENT_NAMES.USER_PHONE_VERIFIED),
  occurredAt: z.date(),
  eventVersion: z.number().int().min(1).default(EVENT_VERSIONS.V1),
  aggregateVersion: z.number().int().min(1),
  correlationId: z.string().uuid().optional(),
  causationId: z.string().uuid().optional(),
  userId: z.string().uuid(),
  email: z.string().email().optional(),
  phoneNumber: z.string().regex(/^(?:\+880|0)1[3-9]\d{8}$/),
  countryCode: z.string().length(2).default('BD'),
  verificationMethod: z.nativeEnum(PhoneVerificationMethod),
  verificationSource: z.nativeEnum(PhoneVerificationSource),
  isFirstTimeVerification: z.boolean().default(true),
  previousPhoneNumber: z.string().regex(/^(?:\+880|0)1[3-9]\d{8}$/).optional(),
  verifiedBy: z.string().uuid().optional(),
  notificationSent: z.boolean().default(false),
  notificationChannel: z.enum(['email', 'sms', 'push', 'whatsapp']).optional(),
  metadata: z.object({
    ipAddress: z.string().ip().optional(),
    deviceId: z.string().max(255).optional(),
    deviceFingerprint: z.string().max(128).optional(),
    userAgent: z.string().max(500).optional(),
    sessionId: z.string().uuid().optional(),
    otpDeliveryMethod: z.nativeEnum(OTPDeliveryMethod).optional(),
    verificationAttempts: z.number().int().min(0).optional(),
    timeToVerifySeconds: z.number().int().min(0).optional(),
    captchaRequired: z.boolean().optional(),
    captchaSolved: z.boolean().optional(),
    triggeredSecurityAlert: z.boolean().optional(),
    securityAlertReason: z.string().max(500).optional(),
    district: z.string().max(100).optional(),
    upazila: z.string().max(100).optional(),
    division: z.string().max(100).optional(),
    mobileOperator: z.enum(MOBILE_OPERATORS).optional(),
    networkType: z.enum(NETWORK_TYPES).optional(),
    dataSaverEnabled: z.boolean().optional(),
    deviceType: z.enum(['desktop', 'mobile', 'tablet', 'feature_phone', 'smart_tv', 'console']).optional(),
    browserName: z.string().max(50).optional(),
    browserVersion: z.string().max(20).optional(),
    osName: z.string().max(50).optional(),
    osVersion: z.string().max(20).optional(),
    timezoneOffset: z.number().int().min(-720).max(840).optional(),
    language: z.enum(['en', 'bn']).optional(),
  }).optional(),
  ttlSeconds: z.number().int().positive().optional(),
  expiresAt: z.date().optional(),
  priority: z.enum(['low', 'normal', 'high', 'critical']).default('normal'),
  partitionKey: z.string().optional(),
});

// ============================================================
// ✅ ENTERPRISE: Phone Verified Event Class (v3.0)
// ============================================================

export class PhoneVerifiedEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.USER_PHONE_VERIFIED;
  public readonly occurredAt: Date;
  public readonly verifiedAt: Date;
  public readonly eventVersion: number;
  public readonly aggregateVersion: number;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly ttlSeconds?: number;
  public readonly expiresAt?: Date;
  public readonly priority?: EventPriority;
  public readonly partitionKey?: string;

  // Core event data
  public readonly userId: string;
  public readonly email?: string;
  public readonly phoneNumber: string;
  public readonly countryCode: string;
  public readonly verificationMethod: PhoneVerificationMethod;
  public readonly verificationSource: PhoneVerificationSource;
  public readonly isFirstTimeVerification: boolean;
  public readonly previousPhoneNumber?: string;
  public readonly verifiedBy?: string;
  public readonly notificationSent: boolean;
  public readonly notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';

  // Event metadata
  public readonly metadata?: PhoneVerifiedMetadata;

  // ✅ Enterprise: Constructor with enhanced options
  constructor(
    userId: string,
    aggregateVersion: number,
    phoneNumber: string,
    verificationMethod: PhoneVerificationMethod,
    verificationSource: PhoneVerificationSource,
    options?: {
      // Core fields
      email?: string;
      countryCode?: string;

      // Context
      isFirstTimeVerification?: boolean;
      previousPhoneNumber?: string;
      verifiedBy?: string;

      // Notification
      notificationSent?: boolean;
      notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';

      // Event tracking
      correlationId?: string;
      causationId?: string;
      ttlSeconds?: number;
      expiresAt?: Date;
      priority?: EventPriority;
      partitionKey?: string;

      // Metadata (Bangladesh specific)
      metadata?: PhoneVerifiedMetadata;

      // Event version (default: from shared-constants)
      eventVersion?: number;
      verifiedAt?: Date;
    }
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.verifiedAt = options?.verifiedAt ?? new Date();
    this.eventVersion = options?.eventVersion ?? EVENT_VERSIONS.V1;
    this.aggregateVersion = aggregateVersion;
    this.correlationId = options?.correlationId;
    this.causationId = options?.causationId;
    this.ttlSeconds = options?.ttlSeconds;
    this.expiresAt = options?.expiresAt;
    this.priority = options?.priority ?? this.calculatePriority(verificationSource);
    this.partitionKey = options?.partitionKey ?? userId;

    this.userId = userId;
    this.email = options?.email;
    this.phoneNumber = phoneNumber;
    this.countryCode = options?.countryCode ?? 'BD';
    this.verificationMethod = verificationMethod;
    this.verificationSource = verificationSource;
    this.isFirstTimeVerification = options?.isFirstTimeVerification ?? true;
    this.previousPhoneNumber = options?.previousPhoneNumber;
    this.verifiedBy = options?.verifiedBy;
    this.notificationSent = options?.notificationSent ?? false;
    this.notificationChannel = options?.notificationChannel;
    this.metadata = options?.metadata;

    // ✅ Enterprise: Auto-set partition key from district if available
    if (!options?.partitionKey && this.metadata?.district) {
      this.partitionKey = this.metadata.district;
    }

    // ✅ Enterprise: Auto-set TTL if not provided (90 days default for verification events)
    if (!this.ttlSeconds && !this.expiresAt) {
      this.ttlSeconds = 90 * 24 * 60 * 60; // 90 days
      this.expiresAt = new Date(Date.now() + this.ttlSeconds * 1000);
    }
  }

  // ============================================================
  // ✅ Enterprise: Helper Methods
  // ============================================================

  /**
   * Calculate priority based on verification source
   */
  private calculatePriority(source: PhoneVerificationSource): EventPriority {
    if (source === PhoneVerificationSource.PAYMENT_VERIFICATION ||
        source === PhoneVerificationSource.SECURITY_CHECK) {
      return 'high';
    }
    if (source === PhoneVerificationSource.LOGIN_ATTEMPT ||
        source === PhoneVerificationSource.COMPLIANCE_AUDIT) {
      return 'normal';
    }
    return 'normal';
  }

  /**
   * Check if event has expired
   */
  public isExpired(): boolean {
    if (!this.expiresAt) return false;
    return new Date() > this.expiresAt;
  }

  /**
   * Check if event is critical priority
   */
  public isCritical(): boolean {
    return this.priority === 'critical';
  }

  /**
   * Check if this was a security-related verification
   */
  public isSecurityRelated(): boolean {
    return this.verificationSource === PhoneVerificationSource.SECURITY_CHECK ||
           this.verificationSource === PhoneVerificationSource.LOGIN_ATTEMPT ||
           this.verificationSource === PhoneVerificationSource.PAYMENT_VERIFICATION ||
           this.metadata?.triggeredSecurityAlert === true;
  }

  /**
   * Check if this was a first-time verification
   */
  public isFirstTimeVerification(): boolean {
    return this.isFirstTimeVerification && this.verificationSource === PhoneVerificationSource.REGISTRATION;
  }

  /**
   * Check if this was a phone change verification
   */
  public isPhoneChangeVerification(): boolean {
    return this.verificationSource === PhoneVerificationSource.PHONE_CHANGE && !!this.previousPhoneNumber;
  }

  /**
   * Check if this was an admin-initiated verification
   */
  public isAdminVerification(): boolean {
    return this.verificationMethod === PhoneVerificationMethod.ADMIN_VERIFIED ||
           this.verificationMethod === PhoneVerificationMethod.BULK_ADMIN;
  }

  /**
   * Get the effective phone number (new phone after verification)
   */
  public getEffectivePhoneNumber(): string {
    return this.phoneNumber;
  }

  /**
   * Get the previous phone number (if this was a phone change)
   */
  public getPreviousPhoneNumber(): string | undefined {
    return this.previousPhoneNumber;
  }

  /**
   * Get masked phone number for privacy
   */
  public getMaskedPhoneNumber(): string {
    if (this.phoneNumber.length <= 8) return '****';
    const prefix = this.phoneNumber.substring(0, this.phoneNumber.length - 6);
    const suffix = this.phoneNumber.substring(this.phoneNumber.length - 2);
    return `${prefix}******${suffix}`;
  }

  /**
   * Get event summary for logging
   */
  public getSummary(): Record<string, unknown> {
    return {
      eventId: this.eventId,
      eventName: this.eventName,
      userId: this.userId,
      phoneNumber: this.getMaskedPhoneNumber(),
      verificationMethod: this.verificationMethod,
      verificationSource: this.verificationSource,
      isFirstTimeVerification: this.isFirstTimeVerification,
      timeToVerifySeconds: this.metadata?.timeToVerifySeconds,
      district: this.metadata?.district,
      mobileOperator: this.metadata?.mobileOperator,
      deviceType: this.metadata?.deviceType,
      priority: this.priority,
      partitionKey: this.partitionKey,
      occurredAt: this.occurredAt.toISOString(),
    };
  }

  /**
   * Convert to plain object for serialization
   */
  public toJSON(): PhoneVerifiedEventData {
    return {
      eventId: this.eventId,
      eventName: this.eventName,
      occurredAt: this.occurredAt.toISOString(),
      verifiedAt: this.verifiedAt.toISOString(),
      eventVersion: this.eventVersion,
      aggregateVersion: this.aggregateVersion,
      correlationId: this.correlationId,
      causationId: this.causationId,
      userId: this.userId,
      email: this.email,
      phoneNumber: this.phoneNumber,
      countryCode: this.countryCode,
      verificationMethod: this.verificationMethod,
      verificationSource: this.verificationSource,
      isFirstTimeVerification: this.isFirstTimeVerification,
      previousPhoneNumber: this.previousPhoneNumber,
      verifiedBy: this.verifiedBy,
      notificationSent: this.notificationSent,
      notificationChannel: this.notificationChannel,
      metadata: this.metadata,
      ttlSeconds: this.ttlSeconds,
      expiresAt: this.expiresAt?.toISOString(),
      priority: this.priority,
      partitionKey: this.partitionKey,
    };
  }

  /**
   * Static factory method to create from serialized data
   */
  public static fromJSON(data: PhoneVerifiedEventData): PhoneVerifiedEvent {
    const event = new PhoneVerifiedEvent(
      data.userId,
      data.aggregateVersion,
      data.phoneNumber,
      data.verificationMethod,
      data.verificationSource,
      {
        email: data.email,
        countryCode: data.countryCode,
        isFirstTimeVerification: data.isFirstTimeVerification,
        previousPhoneNumber: data.previousPhoneNumber,
        verifiedBy: data.verifiedBy,
        notificationSent: data.notificationSent,
        notificationChannel: data.notificationChannel,
        correlationId: data.correlationId,
        causationId: data.causationId,
        ttlSeconds: data.ttlSeconds,
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : undefined,
        priority: data.priority,
        partitionKey: data.partitionKey,
        metadata: data.metadata,
        eventVersion: data.eventVersion,
        verifiedAt: new Date(data.verifiedAt),
      }
    );
    // Override auto-generated fields with stored values
    (event as any).eventId = data.eventId;
    (event as any).occurredAt = new Date(data.occurredAt);
    return event;
  }

  /**
   * Validate event data using Zod schema
   */
  public validate(): boolean {
    const result = PhoneVerifiedEventSchema.safeParse(this.toJSON());
    return result.success;
  }

  // ============================================================
  // ✅ Enterprise: Static factory methods for common scenarios
  // ============================================================

  /**
   * Create event for SMS OTP verification
   */
  public static forSMSVerification(
    userId: string,
    aggregateVersion: number,
    phoneNumber: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      email?: string;
      isFirstTimeVerification?: boolean;
      verificationAttempts?: number;
      timeToVerifySeconds?: number;
      district?: string;
      mobileOperator?: typeof MOBILE_OPERATORS[number];
      correlationId?: string;
    }
  ): PhoneVerifiedEvent {
    return new PhoneVerifiedEvent(
      userId,
      aggregateVersion,
      phoneNumber,
      PhoneVerificationMethod.SMS,
      PhoneVerificationSource.REGISTRATION,
      {
        email: options?.email,
        isFirstTimeVerification: options?.isFirstTimeVerification ?? true,
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          otpDeliveryMethod: OTPDeliveryMethod.SMS,
          verificationAttempts: options?.verificationAttempts ?? 1,
          timeToVerifySeconds: options?.timeToVerifySeconds,
          district: options?.district,
          mobileOperator: options?.mobileOperator,
        }
      }
    );
  }

  /**
   * Create event for WhatsApp OTP verification (Bangladesh specific)
   */
  public static forWhatsAppVerification(
    userId: string,
    aggregateVersion: number,
    phoneNumber: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      email?: string;
      isFirstTimeVerification?: boolean;
      verificationAttempts?: number;
      timeToVerifySeconds?: number;
      district?: string;
      mobileOperator?: typeof MOBILE_OPERATORS[number];
      correlationId?: string;
    }
  ): PhoneVerifiedEvent {
    return new PhoneVerifiedEvent(
      userId,
      aggregateVersion,
      phoneNumber,
      PhoneVerificationMethod.WHATSAPP,
      PhoneVerificationSource.REGISTRATION,
      {
        email: options?.email,
        isFirstTimeVerification: options?.isFirstTimeVerification ?? true,
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          otpDeliveryMethod: OTPDeliveryMethod.WHATSAPP,
          verificationAttempts: options?.verificationAttempts ?? 1,
          timeToVerifySeconds: options?.timeToVerifySeconds,
          district: options?.district,
          mobileOperator: options?.mobileOperator,
        }
      }
    );
  }

  /**
   * Create event for voice call OTP verification (feature phones - Bangladesh)
   */
  public static forVoiceVerification(
    userId: string,
    aggregateVersion: number,
    phoneNumber: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      email?: string;
      isFirstTimeVerification?: boolean;
      verificationAttempts?: number;
      timeToVerifySeconds?: number;
      district?: string;
      mobileOperator?: typeof MOBILE_OPERATORS[number];
      correlationId?: string;
    }
  ): PhoneVerifiedEvent {
    return new PhoneVerifiedEvent(
      userId,
      aggregateVersion,
      phoneNumber,
      PhoneVerificationMethod.VOICE,
      PhoneVerificationSource.REGISTRATION,
      {
        email: options?.email,
        isFirstTimeVerification: options?.isFirstTimeVerification ?? true,
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          otpDeliveryMethod: OTPDeliveryMethod.VOICE,
          verificationAttempts: options?.verificationAttempts ?? 1,
          timeToVerifySeconds: options?.timeToVerifySeconds,
          district: options?.district,
          mobileOperator: options?.mobileOperator,
          deviceType: 'feature_phone',
        }
      }
    );
  }

  /**
   * Create event for admin verification
   */
  public static forAdminVerification(
    userId: string,
    aggregateVersion: number,
    phoneNumber: string,
    adminId: string,
    reason: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      email?: string;
      district?: string;
      correlationId?: string;
    }
  ): PhoneVerifiedEvent {
    return new PhoneVerifiedEvent(
      userId,
      aggregateVersion,
      phoneNumber,
      PhoneVerificationMethod.ADMIN_VERIFIED,
      PhoneVerificationSource.ADMIN_REQUEST,
      {
        email: options?.email,
        verifiedBy: adminId,
        isFirstTimeVerification: false,
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          district: options?.district,
          triggeredSecurityAlert: true,
          securityAlertReason: reason,
        }
      }
    );
  }

  /**
   * Create event for phone change verification
   */
  public static forPhoneChange(
    userId: string,
    aggregateVersion: number,
    newPhoneNumber: string,
    oldPhoneNumber: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      email?: string;
      verificationMethod?: PhoneVerificationMethod;
      district?: string;
      correlationId?: string;
    }
  ): PhoneVerifiedEvent {
    return new PhoneVerifiedEvent(
      userId,
      aggregateVersion,
      newPhoneNumber,
      options?.verificationMethod ?? PhoneVerificationMethod.SMS,
      PhoneVerificationSource.PHONE_CHANGE,
      {
        email: options?.email,
        previousPhoneNumber: oldPhoneNumber,
        isFirstTimeVerification: false,
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          district: options?.district,
        }
      }
    );
  }

  /**
   * Create event for security check verification
   */
  public static forSecurityCheck(
    userId: string,
    aggregateVersion: number,
    phoneNumber: string,
    reason: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      email?: string;
      district?: string;
      correlationId?: string;
    }
  ): PhoneVerifiedEvent {
    return new PhoneVerifiedEvent(
      userId,
      aggregateVersion,
      phoneNumber,
      PhoneVerificationMethod.SMS,
      PhoneVerificationSource.SECURITY_CHECK,
      {
        email: options?.email,
        isFirstTimeVerification: false,
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          district: options?.district,
          triggeredSecurityAlert: true,
          securityAlertReason: reason,
        }
      }
    );
  }
}

// ============================================================
// ✅ Enterprise: Phone Change Requested Event (v2.0)
// ============================================================

export class PhoneChangeRequestedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.USER_PHONE_CHANGE_REQUESTED;
  public readonly occurredAt: Date;
  public readonly eventVersion: number = EVENT_VERSIONS.V1;
  public readonly aggregateVersion: number = 1;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly ttlSeconds?: number;
  public readonly expiresAt?: Date;
  public readonly priority?: EventPriority = 'normal';
  public readonly partitionKey?: string;

  public readonly userId: string;
  public readonly oldPhoneNumber: string;
  public readonly newPhoneNumber: string;
  public readonly countryCode: string;
  public readonly ipAddress?: string;
  public readonly deviceId?: string;
  public readonly userAgent?: string;
  public readonly reason?: string;

  constructor(
    userId: string,
    oldPhoneNumber: string,
    newPhoneNumber: string,
    countryCode: string,
    options?: {
      ipAddress?: string;
      deviceId?: string;
      userAgent?: string;
      reason?: string;
      correlationId?: string;
      causationId?: string;
      ttlSeconds?: number;
      expiresAt?: Date;
      partitionKey?: string;
    }
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.correlationId = options?.correlationId;
    this.causationId = options?.causationId;
    this.ttlSeconds = options?.ttlSeconds;
    this.expiresAt = options?.expiresAt;
    this.partitionKey = options?.partitionKey ?? userId;

    this.userId = userId;
    this.oldPhoneNumber = oldPhoneNumber;
    this.newPhoneNumber = newPhoneNumber;
    this.countryCode = countryCode;
    this.ipAddress = options?.ipAddress;
    this.deviceId = options?.deviceId;
    this.userAgent = options?.userAgent;
    this.reason = options?.reason;
  }

  public toJSON(): PhoneChangeRequestedEventData {
    return {
      eventId: this.eventId,
      eventName: this.eventName,
      occurredAt: this.occurredAt.toISOString(),
      eventVersion: this.eventVersion,
      aggregateVersion: this.aggregateVersion,
      correlationId: this.correlationId,
      causationId: this.causationId,
      userId: this.userId,
      oldPhoneNumber: this.oldPhoneNumber,
      newPhoneNumber: this.newPhoneNumber,
      countryCode: this.countryCode,
      ipAddress: this.ipAddress,
      deviceId: this.deviceId,
      userAgent: this.userAgent,
      reason: this.reason,
    };
  }
}

// ============================================================
// ✅ Enterprise: Phone Verification Failed Event (v2.0)
// ============================================================

export class PhoneVerificationFailedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.USER_PHONE_VERIFICATION_FAILED;
  public readonly occurredAt: Date;
  public readonly eventVersion: number = EVENT_VERSIONS.V1;
  public readonly aggregateVersion: number = 1;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly ttlSeconds?: number;
  public readonly expiresAt?: Date;
  public readonly priority?: EventPriority;
  public readonly partitionKey?: string;

  public readonly userId: string;
  public readonly phoneNumber: string;
  public readonly countryCode: string;
  public readonly verificationMethod: PhoneVerificationMethod;
  public readonly failureReason: 'INVALID_CODE' | 'EXPIRED_CODE' | 'MAX_ATTEMPTS_EXCEEDED' | 'SMS_FAILED' | 'WHATSAPP_FAILED' | 'VOICE_CALL_FAILED';
  public readonly remainingAttempts?: number;
  public readonly ipAddress?: string;
  public readonly deviceId?: string;
  public readonly userAgent?: string;
  public readonly metadata?: PhoneVerifiedMetadata;

  constructor(
    userId: string,
    phoneNumber: string,
    countryCode: string,
    verificationMethod: PhoneVerificationMethod,
    failureReason: 'INVALID_CODE' | 'EXPIRED_CODE' | 'MAX_ATTEMPTS_EXCEEDED' | 'SMS_FAILED' | 'WHATSAPP_FAILED' | 'VOICE_CALL_FAILED',
    options?: {
      remainingAttempts?: number;
      ipAddress?: string;
      deviceId?: string;
      userAgent?: string;
      correlationId?: string;
      causationId?: string;
      ttlSeconds?: number;
      expiresAt?: Date;
      priority?: EventPriority;
      partitionKey?: string;
      metadata?: PhoneVerifiedMetadata;
    }
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.correlationId = options?.correlationId;
    this.causationId = options?.causationId;
    this.ttlSeconds = options?.ttlSeconds;
    this.expiresAt = options?.expiresAt;
    this.priority = options?.priority ?? (failureReason === 'MAX_ATTEMPTS_EXCEEDED' ? 'high' : 'normal');
    this.partitionKey = options?.partitionKey ?? userId;

    this.userId = userId;
    this.phoneNumber = phoneNumber;
    this.countryCode = countryCode;
    this.verificationMethod = verificationMethod;
    this.failureReason = failureReason;
    this.remainingAttempts = options?.remaining
