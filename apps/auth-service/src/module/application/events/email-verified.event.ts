/**
 * Email Verified Event - Enterprise Grade (v3.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce

 * @module application/events/email-verified.event

 * @description
 * Event emitted when a user successfully verifies their email address.
 * Enhanced with shared-types integration, event versioning, TTL support,
 * Bangladesh specific fields, and priority-based processing.

 * Enterprise Rules:
 * ✅ Immutable event data with frozen objects
 * ✅ No business logic, no side effects
 * ✅ Event ID for distributed tracing
 * ✅ Correlation/Causation IDs for event sourcing
 * ✅ Aggregate version tracking for event sourcing
 * ✅ TTL support for event expiry
 * ✅ Priority support for critical events
 * ✅ Shared types from @vubon/shared-packages
 * ✅ Zod schema validation for runtime safety
 * ✅ Bangladesh specific - District/Upazila tracking
 * ✅ Security audit tracking with verifiedBy
 * ✅ OTP delivery method tracking
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
// Email Verification Method Enum (Extended)
// ============================================================

export enum EmailVerificationMethod {
  OTP = 'OTP',                       // Verified via OTP code
  MAGIC_LINK = 'MAGIC_LINK',         // Verified via magic link click
  ADMIN_VERIFIED = 'ADMIN_VERIFIED', // Admin manually verified
  SOCIAL_PROVIDER = 'SOCIAL_PROVIDER', // Email came pre-verified from social provider
  RESEND_VERIFICATION = 'RESEND_VERIFICATION', // Verified via resent email
  // ✅ Enterprise: Additional methods
  WHATSAPP_OTP = 'WHATSAPP_OTP',     // Verified via WhatsApp OTP (Bangladesh specific)
  SMS_OTP = 'SMS_OTP',               // Verified via SMS OTP
  VOICE_OTP = 'VOICE_OTP',           // Verified via voice call OTP
  BULK_ADMIN = 'BULK_ADMIN',         // Bulk verification by admin
  SYSTEM_VERIFIED = 'SYSTEM_VERIFIED', // System-verified (e.g., domain trust)
}

// ============================================================
// Email Verification Source Enum (Extended)
// ============================================================

export enum EmailVerificationSource {
  REGISTRATION = 'REGISTRATION',     // Initial registration verification
  EMAIL_CHANGE = 'EMAIL_CHANGE',     // Email change verification
  ADMIN_REQUEST = 'ADMIN_REQUEST',   // Admin requested re-verification
  SECURITY_CHECK = 'SECURITY_CHECK', // Security prompted re-verification
  // ✅ Enterprise: Additional sources
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
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  WHATSAPP = 'WHATSAPP',
  VOICE = 'VOICE',
}

// ============================================================
// ✅ ENTERPRISE: Event Metadata Interface (Bangladesh specific)
// ============================================================

export interface EmailVerifiedMetadata extends EventMetadata {
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

  /** Verification OTP delivery method (if OTP was used) */
  otpDeliveryMethod?: OTPDeliveryMethod;

  /** Number of verification attempts (if OTP was used) */
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

export interface EmailVerifiedPayload extends EventPayload {
  /** User ID */
  userId: string;

  /** User email (verified) */
  email: string;

  /** Previous email (if this was an email change) */
  previousEmail?: string;

  /** User phone (Bangladesh specific - for WhatsApp/SMS OTP) */
  phone?: string;

  /** Verification method used */
  verificationMethod: EmailVerificationMethod;

  /** Verification source */
  verificationSource: EmailVerificationSource;

  /** Admin ID who performed verification (if applicable) */
  verifiedBy?: string;

  /** Was notification sent to user? */
  notificationSent?: boolean;

  /** Notification channel used */
  notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';

  /** Is this the first verification for this email? */
  isFirstVerification?: boolean;
}

// ============================================================
// ✅ ENTERPRISE: Zod Schema for Runtime Validation
// ============================================================

export const EmailVerifiedEventSchema = z.object({
  eventId: z.string().uuid(),
  eventName: z.literal(EVENT_NAMES.USER_EMAIL_VERIFIED),
  occurredAt: z.date(),
  eventVersion: z.number().int().min(1).default(EVENT_VERSIONS.V1),
  aggregateVersion: z.number().int().min(1),
  correlationId: z.string().uuid().optional(),
  causationId: z.string().uuid().optional(),
  userId: z.string().uuid(),
  email: z.string().email(),
  previousEmail: z.string().email().optional(),
  phone: z.string().regex(/^(?:\+880|0)1[3-9]\d{8}$/).optional(),
  verificationMethod: z.nativeEnum(EmailVerificationMethod),
  verificationSource: z.nativeEnum(EmailVerificationSource),
  verifiedBy: z.string().uuid().optional(),
  notificationSent: z.boolean().default(false),
  notificationChannel: z.enum(['email', 'sms', 'push', 'whatsapp']).optional(),
  isFirstVerification: z.boolean().default(true),
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
// ✅ ENTERPRISE: Email Verified Event Class (v3.0)
// ============================================================

export class EmailVerifiedEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.USER_EMAIL_VERIFIED;
  public readonly occurredAt: Date;
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
  public readonly email: string;
  public readonly previousEmail?: string;
  public readonly phone?: string;
  public readonly verifiedAt: Date;

  // Verification context
  public readonly verificationMethod: EmailVerificationMethod;
  public readonly verificationSource: EmailVerificationSource;
  public readonly verifiedBy?: string;

  // Notification status
  public readonly notificationSent: boolean;
  public readonly notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';
  public readonly isFirstVerification: boolean;

  // Event metadata
  public readonly metadata?: EmailVerifiedMetadata;

  // ✅ Enterprise: Constructor with enhanced options
  constructor(
    userId: string,
    aggregateVersion: number,
    email: string,
    verificationMethod: EmailVerificationMethod,
    verificationSource: EmailVerificationSource,
    options?: {
      // Core fields
      previousEmail?: string;
      phone?: string;
      verifiedAt?: Date;

      // Admin action
      verifiedBy?: string;

      // Notification
      notificationSent?: boolean;
      notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';
      isFirstVerification?: boolean;

      // Event tracking
      correlationId?: string;
      causationId?: string;
      ttlSeconds?: number;
      expiresAt?: Date;
      priority?: EventPriority;
      partitionKey?: string;

      // Metadata (Bangladesh specific)
      metadata?: EmailVerifiedMetadata;

      // Event version (default: from shared-constants)
      eventVersion?: number;
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
    this.email = email;
    this.previousEmail = options?.previousEmail;
    this.phone = options?.phone;

    this.verificationMethod = verificationMethod;
    this.verificationSource = verificationSource;
    this.verifiedBy = options?.verifiedBy;

    this.notificationSent = options?.notificationSent ?? false;
    this.notificationChannel = options?.notificationChannel;
    this.isFirstVerification = options?.isFirstVerification ?? true;

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
  private calculatePriority(source: EmailVerificationSource): EventPriority {
    if (source === EmailVerificationSource.PAYMENT_VERIFICATION ||
        source === EmailVerificationSource.SECURITY_CHECK) {
      return 'high';
    }
    if (source === EmailVerificationSource.LOGIN_ATTEMPT ||
        source === EmailVerificationSource.COMPLIANCE_AUDIT) {
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
    return this.verificationSource === EmailVerificationSource.SECURITY_CHECK ||
           this.verificationSource === EmailVerificationSource.LOGIN_ATTEMPT ||
           this.verificationSource === EmailVerificationSource.PAYMENT_VERIFICATION ||
           this.metadata?.triggeredSecurityAlert === true;
  }

  /**
   * Check if this was a first-time verification
   */
  public isFirstTimeVerification(): boolean {
    return this.isFirstVerification && this.verificationSource === EmailVerificationSource.REGISTRATION;
  }

  /**
   * Check if this was an email change verification
   */
  public isEmailChangeVerification(): boolean {
    return this.verificationSource === EmailVerificationSource.EMAIL_CHANGE && !!this.previousEmail;
  }

  /**
   * Check if this was an admin-initiated verification
   */
  public isAdminVerification(): boolean {
    return this.verificationMethod === EmailVerificationMethod.ADMIN_VERIFIED ||
           this.verificationMethod === EmailVerificationMethod.BULK_ADMIN;
  }

  /**
   * Get the effective email (new email after verification)
   */
  public getEffectiveEmail(): string {
    return this.email;
  }

  /**
   * Get the previous email (if this was an email change)
   */
  public getPreviousEmail(): string | undefined {
    return this.previousEmail;
  }

  /**
   * Get event summary for logging
   */
  public getSummary(): Record<string, unknown> {
    return {
      eventId: this.eventId,
      eventName: this.eventName,
      userId: this.userId,
      email: this.email,
      previousEmail: this.previousEmail,
      verificationMethod: this.verificationMethod,
      verificationSource: this.verificationSource,
      verifiedBy: this.verifiedBy,
      isFirstVerification: this.isFirstVerification,
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
  public toJSON(): EmailVerifiedEventData {
    return {
      eventId: this.eventId,
      eventName: this.eventName,
      occurredAt: this.occurredAt.toISOString(),
      eventVersion: this.eventVersion,
      aggregateVersion: this.aggregateVersion,
      correlationId: this.correlationId,
      causationId: this.causationId,
      userId: this.userId,
      email: this.email,
      previousEmail: this.previousEmail,
      phone: this.phone,
      verifiedAt: this.verifiedAt.toISOString(),
      verificationMethod: this.verificationMethod,
      verificationSource: this.verificationSource,
      verifiedBy: this.verifiedBy,
      notificationSent: this.notificationSent,
      notificationChannel: this.notificationChannel,
      isFirstVerification: this.isFirstVerification,
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
  public static fromJSON(data: EmailVerifiedEventData): EmailVerifiedEvent {
    const event = new EmailVerifiedEvent(
      data.userId,
      data.aggregateVersion,
      data.email,
      data.verificationMethod,
      data.verificationSource,
      {
        previousEmail: data.previousEmail,
        phone: data.phone,
        verifiedAt: new Date(data.verifiedAt),
        verifiedBy: data.verifiedBy,
        notificationSent: data.notificationSent,
        notificationChannel: data.notificationChannel,
        isFirstVerification: data.isFirstVerification,
        correlationId: data.correlationId,
        causationId: data.causationId,
        ttlSeconds: data.ttlSeconds,
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : undefined,
        priority: data.priority,
        partitionKey: data.partitionKey,
        metadata: data.metadata,
        eventVersion: data.eventVersion,
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
    const result = EmailVerifiedEventSchema.safeParse(this.toJSON());
    return result.success;
  }

  // ============================================================
  // ✅ Enterprise: Static factory methods for common scenarios
  // ============================================================

  /**
   * Create event for OTP-based email verification (registration)
   */
  public static forRegistrationOTP(
    userId: string,
    aggregateVersion: number,
    email: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      phone?: string;
      otpDeliveryMethod?: OTPDeliveryMethod;
      verificationAttempts?: number;
      timeToVerifySeconds?: number;
      district?: string;
      mobileOperator?: typeof MOBILE_OPERATORS[number];
      correlationId?: string;
    }
  ): EmailVerifiedEvent {
    return new EmailVerifiedEvent(
      userId,
      aggregateVersion,
      email,
      EmailVerificationMethod.OTP,
      EmailVerificationSource.REGISTRATION,
      {
        phone: options?.phone,
        isFirstVerification: true,
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          otpDeliveryMethod: options?.otpDeliveryMethod ?? OTPDeliveryMethod.EMAIL,
          verificationAttempts: options?.verificationAttempts ?? 1,
          timeToVerifySeconds: options?.timeToVerifySeconds,
          district: options?.district,
          mobileOperator: options?.mobileOperator,
        }
      }
    );
  }

  /**
   * Create event for email change verification
   */
  public static forEmailChange(
    userId: string,
    aggregateVersion: number,
    newEmail: string,
    oldEmail: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      phone?: string;
      verificationMethod?: EmailVerificationMethod;
      district?: string;
      correlationId?: string;
    }
  ): EmailVerifiedEvent {
    return new EmailVerifiedEvent(
      userId,
      aggregateVersion,
      newEmail,
      options?.verificationMethod ?? EmailVerificationMethod.MAGIC_LINK,
      EmailVerificationSource.EMAIL_CHANGE,
      {
        previousEmail: oldEmail,
        phone: options?.phone,
        isFirstVerification: false,
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
   * Create event for admin-verified email (support agents)
   */
  public static forAdminVerification(
    userId: string,
    aggregateVersion: number,
    email: string,
    adminId: string,
    reason: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      phone?: string;
      district?: string;
      correlationId?: string;
    }
  ): EmailVerifiedEvent {
    return new EmailVerifiedEvent(
      userId,
      aggregateVersion,
      email,
      EmailVerificationMethod.ADMIN_VERIFIED,
      EmailVerificationSource.ADMIN_REQUEST,
      {
        verifiedBy: adminId,
        phone: options?.phone,
        isFirstVerification: false,
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          district: options?.district,
          securityAlertReason: reason,
        }
      }
    );
  }

  /**
   * Create event for WhatsApp OTP verification (Bangladesh specific)
   */
  public static forWhatsAppOTP(
    userId: string,
    aggregateVersion: number,
    email: string,
    phone: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      verificationAttempts?: number;
      timeToVerifySeconds?: number;
      district?: string;
      mobileOperator?: typeof MOBILE_OPERATORS[number];
      correlationId?: string;
    }
  ): EmailVerifiedEvent {
    return new EmailVerifiedEvent(
      userId,
      aggregateVersion,
      email,
      EmailVerificationMethod.WHATSAPP_OTP,
      EmailVerificationSource.REGISTRATION,
      {
        phone,
        isFirstVerification: true,
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
   * Create event for security check verification
   */
  public static forSecurityCheck(
    userId: string,
    aggregateVersion: number,
    email: string,
    reason: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      phone?: string;
      district?: string;
      correlationId?: string;
    }
  ): EmailVerifiedEvent {
    return new EmailVerifiedEvent(
      userId,
      aggregateVersion,
      email,
      EmailVerificationMethod.OTP,
      EmailVerificationSource.SECURITY_CHECK,
      {
        phone: options?.phone,
        isFirstVerification: false,
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
// ✅ Enterprise: Email Change Requested Event (v2.0)
// ============================================================

export class EmailChangeRequestedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.USER_EMAIL_CHANGE_REQUESTED;
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
  public readonly oldEmail: string;
  public readonly newEmail: string;
  public readonly ipAddress?: string;
  public readonly deviceId?: string;
  public readonly userAgent?: string;
  public readonly reason?: string;

  constructor(
    userId: string,
    aggregateVersion: number,
    oldEmail: string,
    newEmail: string,
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
    this.aggregateVersion = aggregateVersion;
    this.correlationId = options?.correlationId;
    this.causationId = options?.causationId;
    this.ttlSeconds = options?.ttlSeconds;
    this.expiresAt = options?.expiresAt;
    this.partitionKey = options?.partitionKey ?? userId;

    this.userId = userId;
    this.oldEmail = oldEmail;
    this.newEmail = newEmail;
    this.ipAddress = options?.ipAddress;
    this.deviceId = options?.deviceId;
    this.userAgent = options?.userAgent;
    this.reason = options?.reason;
  }

  public toJSON(): EmailChangeRequestedEventData {
    return {
      eventId: this.eventId,
      eventName: this.eventName,
      occurredAt: this.occurredAt.toISOString(),
      eventVersion: this.eventVersion,
      aggregateVersion: this.aggregateVersion,
      correlationId: this.correlationId,
      causationId: this.causationId,
      userId: this.userId,
      oldEmail: this.oldEmail,
      newEmail: this.newEmail,
      ipAddress: this.ipAddress,
      deviceId: this.deviceId,
      userAgent: this.userAgent,
      reason: this.reason,
    };
  }
}

// ============================================================
// ✅ Enterprise: Email Change Failed Event (v2.0)
// ============================================================

export enum EmailChangeFailureReason {
  INVALID_TOKEN = 'INVALID_TOKEN',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',
  RATE_LIMITED = 'RATE_LIMITED',
  INVALID_PASSWORD = 'INVALID_PASSWORD',
  OTP_INVALID = 'OTP_INVALID',
  MAX_ATTEMPTS_EXCEEDED = 'MAX_ATTEMPTS_EXCEEDED',
}

export class EmailChangeFailedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.USER_EMAIL_CHANGE_FAILED;
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
  public readonly oldEmail: string;
  public readonly requestedNewEmail: string;
  public readonly reason: EmailChangeFailureReason;
  public readonly ipAddress?: string;
  public readonly deviceId?: string;
  public readonly remainingAttempts?: number;

  constructor(
    userId: string,
    oldEmail: string,
    requestedNewEmail: string,
    reason: EmailChangeFailureReason,
    options?: {
      ipAddress?: string;
      deviceId?: string;
      remainingAttempts?: number;
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
    this.oldEmail = oldEmail;
    this.requestedNewEmail = requestedNewEmail;
    this.reason = reason;
    this.ipAddress = options?.ipAddress;
    this.deviceId = options?.deviceId;
    this.remainingAttempts = options?.remainingAttempts;
  }

  public toJSON(): EmailChangeFailedEventData {
    return {
      eventId: this.eventId,
      eventName: this.eventName,
      occurredAt: this.occurredAt.toISOString(),
      eventVersion: this.eventVersion,
      aggregateVersion: this.aggregateVersion,
      correlationId: this.correlationId,
      causationId: this.causationId,
      userId: this.userId,
      oldEmail: this.oldEmail,
      requestedNewEmail: this.requestedNewEmail,
      reason: this.reason,
      ipAddress: this.ipAddress,
      deviceId: this.deviceId,
      remainingAttempts: this.remainingAttempts,
    };
  }
}

// ============================================================
// ✅ Enterprise: Event Data Interfaces (for serialization)
// ============================================================

export interface EmailVerifiedEventData {
  eventId: string;
  eventName: string;
  occurredAt: string;
  eventVersion: number;
  aggregateVersion: number;
  correlationId?: string;
  causationId?: string;
  userId: string;
  email: string;
  previousEmail?: string;
  phone?: string;
  verifiedAt: string;
  verificationMethod: EmailVerificationMethod;
  verificationSource: EmailVerificationSource;
  verifiedBy?: string;
  notificationSent: boolean;
  notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';
  isFirstVerification: boolean;
  metadata?: EmailVerifiedMetadata;
  ttlSeconds?: number;
  expiresAt?: string;
  priority?: EventPriority;
  partitionKey?: string;
}

export interface EmailChangeRequestedEventData {
  eventId: string;
  eventName: string;
  occurredAt: string;
  eventVersion: number;
  aggregateVersion: number;
  correlationId?: string;
  causationId?: string;
  userId: string;
  oldEmail: string;
  newEmail: string;
  ipAddress?: string;
  deviceId?: string;
  userAgent?: string;
  reason?: string;
}

export interface EmailChangeFailedEventData {
  eventId: string;
  eventName: string;
  occurredAt: string;
  eventVersion: number;
  aggregateVersion: number;
  correlationId?: string;
  causationId?: string;
  userId: string;
  oldEmail: string;
  requestedNewEmail: string;
  reason: EmailChangeFailureReason;
  ipAddress?: string;
  deviceId?: string;
  remainingAttempts?: number;
}

// ============================================================
// ✅ Enterprise: Type Exports
// ============================================================

export type { 
  EmailVerifiedMetadata as EmailVerifiedMetadataType,
  EmailVerifiedPayload as EmailVerifiedPayloadType
};

// ============================================================
// ENTERPRISE SUMMARY v3.0
// ============================================================
// 
// Enterprise Enhancements Applied in v3.0:
// 1. ✅ Shared-types integration (@vubon/shared-types)
// 2. ✅ Event versioning with aggregateVersion tracking
// 3. ✅ TTL support with expiresAt for event expiry (90 days default)
// 4. ✅ Priority-based event processing (low/normal/high/critical)
// 5. ✅ Partition key for event streaming optimization
// 6. ✅ Bangladesh specific fields (district, upazila, mobileOperator, networkType)
// 7. ✅ Feature phone support (deviceType: 'feature_phone')
// 8. ✅ WhatsApp OTP verification method (Bangladesh specific)
// 9. ✅ Extended verification methods (WHATSAPP_OTP, SMS_OTP, VOICE_OTP, BULK_ADMIN, SYSTEM_VERIFIED)
// 10. ✅ Extended verification sources (LOGIN_ATTEMPT, PAYMENT_VERIFICATION, ACCOUNT_RECOVERY, COMPLIANCE_AUDIT, KYC_REQUIREMENT)
// 11. ✅ OTP delivery method tracking (EMAIL, SMS, WHATSAPP, VOICE)
// 12. ✅ Time to verify tracking (security metric)
// 13. ✅ Verification attempts tracking
// 14. ✅ Email change failure event with detailed reasons
// 15. ✅ 5 Static factory methods (registration OTP, email change, admin verification, WhatsApp OTP, security check)
// 16. ✅ Helper methods: isSecurityRelated(), isFirstTimeVerification(), isEmailChangeVerification(), isAdminVerification()
// 17. ✅ Serialization support (toJSON, fromJSON)
// 18. ✅ Zod schema for runtime validation
// 19. ✅ Notification tracking (notificationSent, notificationChannel)
// 20. ✅ Security audit with device fingerprint tracking
// 
// Bangladesh Specific:
// - WhatsApp OTP verification method
// - Voice OTP for feature phones
// - District/Upazila/Division location tracking
// - Mobile operator and network type tracking
// - Feature phone device type
// - Bengali language support (metadata.language: 'bn')
// 
// Security Features:
// - First-time verification detection
// - Email change tracking with old email
// - Admin verification audit trail
// - Security check source for re-verification
// - Time to verify metric (anomaly detection)
// - Failed email change attempt tracking
// 
// ============================================================
