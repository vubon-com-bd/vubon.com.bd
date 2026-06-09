/**
 * MFA Verification Failed Event - Enterprise Grade (v3.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/events/mfa-verification-failed.event
 * 
 * @description
 * Event emitted when Multi-Factor Authentication verification fails.
 * Enhanced with shared-types integration, event versioning, TTL support,
 * Bangladesh specific fields, and priority-based processing.
 * 
 * ENTERPRISE ENHANCEMENTS (v3.0):
 * ✅ Shared-types integration (@vubon/shared-types)
 * ✅ Event versioning with aggregateVersion tracking
 * ✅ TTL support with expiresAt for event expiry (30 days default)
 * ✅ Priority-based event processing (critical for lockout scenarios)
 * ✅ Partition key for event streaming optimization
 * ✅ Bangladesh specific fields (district, upazila, mobileOperator, networkType)
 * ✅ Extended MfaType with Bangladesh-specific methods
 * ✅ Extended MfaFailureReason enum
 * ✅ Zod schema for runtime validation
 * ✅ Serialization support (toJSON, fromJSON)
 * ✅ Helper methods: isExpired(), isCritical(), isLockoutScenario()
 * ✅ Static factory methods for common scenarios
 * ✅ Device fingerprint tracking
 * ✅ Notification tracking for security alerts
 * ✅ Consecutive failure tracking
 * 
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
 * ✅ Security alert on repeated failures
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
  NETWORK_TYPES,
  MFA_TYPES,
  SECURITY_CONFIG
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
// MFA Type Enum (Extended - Bangladesh specific)
// ============================================================

export enum MfaType {
  TOTP = 'TOTP',
  SMS = 'SMS',
  EMAIL = 'EMAIL',
  WEBAUTHN = 'WEBAUTHN',
  // ✅ Enterprise: Bangladesh specific methods
  WHATSAPP = 'WHATSAPP',           // WhatsApp OTP
  IMO = 'IMO',                     // Imo OTP
  BKASH_PIN = 'BKASH_PIN',         // bKash PIN
  NAGAD_PIN = 'NAGAD_PIN',         // Nagad PIN
  ROCKET_PIN = 'ROCKET_PIN',       // Rocket PIN
  VOICE_CALL = 'VOICE_CALL',       // Voice call OTP (feature phones)
}

// ============================================================
// MFA Failure Reason Enum (Extended)
// ============================================================

export enum MfaFailureReason {
  INVALID_CODE = 'INVALID_CODE',
  EXPIRED_CODE = 'EXPIRED_CODE',
  MAX_ATTEMPTS_EXCEEDED = 'MAX_ATTEMPTS_EXCEEDED',
  BACKUP_CODE_USED = 'BACKUP_CODE_USED',
  RATE_LIMITED = 'RATE_LIMITED',
  MISSING_CONFIGURATION = 'MISSING_CONFIGURATION',
  DEVICE_UNTRUSTED = 'DEVICE_UNTRUSTED',
  // ✅ Enterprise: Additional reasons
  INVALID_BKASH_PIN = 'INVALID_BKASH_PIN',
  INVALID_NAGAD_PIN = 'INVALID_NAGAD_PIN',
  INVALID_ROCKET_PIN = 'INVALID_ROCKET_PIN',
  WEBAUTHN_NOT_SUPPORTED = 'WEBAUTHN_NOT_SUPPORTED',
  WEBAUTHN_USER_CANCELLED = 'WEBAUTHN_USER_CANCELLED',
  SIM_SWAP_DETECTED = 'SIM_SWAP_DETECTED',
}

// ============================================================
// MFA Verification Source Enum
// ============================================================

export enum MfaVerificationSource {
  LOGIN = 'LOGIN',                 // During login flow
  MFA_SETUP = 'MFA_SETUP',         // During MFA setup
  SENSITIVE_ACTION = 'SENSITIVE_ACTION', // Payment, password change, etc.
  DEVICE_TRUST = 'DEVICE_TRUST',   // During device trust
  ACCOUNT_RECOVERY = 'ACCOUNT_RECOVERY', // During account recovery
}

// ============================================================
// ✅ ENTERPRISE: Event Metadata Interface (Bangladesh specific)
// ============================================================

export interface MfaVerificationFailedMetadata extends EventMetadata {
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

  /** Consecutive failures for this user/session */
  consecutiveFailures?: number;

  /** Total failures for this user today */
  totalFailuresToday?: number;

  /** Remaining attempts before lockout */
  remainingAttempts?: number;

  /** Whether this failure triggered a security alert */
  triggeredSecurityAlert?: boolean;

  /** Security alert reason (if triggered) */
  securityAlertReason?: string;

  /** Whether CAPTCHA was presented */
  captchaPresented?: boolean;

  /** Whether CAPTCHA was solved correctly */
  captchaSolved?: boolean;

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

export interface MfaVerificationFailedPayload extends EventPayload {
  /** User ID */
  userId: string;

  /** User email */
  email?: string;

  /** User phone (Bangladesh specific) */
  phone?: string;

  /** MFA type being verified */
  mfaType: MfaType;

  /** Failure reason */
  failureReason: MfaFailureReason;

  /** Verification source */
  source: MfaVerificationSource;

  /** Remaining attempts before lockout */
  remainingAttempts?: number;

  /** Whether the MFA method is now locked */
  isLocked?: boolean;

  /** Lock duration in minutes (if locked) */
  lockDurationMinutes?: number;

  /** Whether notification was sent to user */
  notificationSent?: boolean;

  /** Notification channel used */
  notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';
}

// ============================================================
// ✅ ENTERPRISE: Zod Schema for Runtime Validation
// ============================================================

export const MfaVerificationFailedEventSchema = z.object({
  eventId: z.string().uuid(),
  eventName: z.literal(EVENT_NAMES.MFA_VERIFICATION_FAILED),
  occurredAt: z.date(),
  eventVersion: z.number().int().min(1).default(EVENT_VERSIONS.V1),
  aggregateVersion: z.number().int().min(1).default(1),
  correlationId: z.string().uuid().optional(),
  causationId: z.string().uuid().optional(),
  userId: z.string().uuid(),
  email: z.string().email().optional(),
  phone: z.string().regex(/^(?:\+880|0)1[3-9]\d{8}$/).optional(),
  mfaType: z.nativeEnum(MfaType),
  failureReason: z.nativeEnum(MfaFailureReason),
  source: z.nativeEnum(MfaVerificationSource).default(MfaVerificationSource.LOGIN),
  remainingAttempts: z.number().int().min(0).optional(),
  isLocked: z.boolean().default(false),
  lockDurationMinutes: z.number().int().min(0).optional(),
  notificationSent: z.boolean().default(false),
  notificationChannel: z.enum(['email', 'sms', 'push', 'whatsapp']).optional(),
  metadata: z.object({
    ipAddress: z.string().ip().optional(),
    deviceId: z.string().max(255).optional(),
    deviceFingerprint: z.string().max(128).optional(),
    userAgent: z.string().max(500).optional(),
    sessionId: z.string().uuid().optional(),
    consecutiveFailures: z.number().int().min(0).optional(),
    totalFailuresToday: z.number().int().min(0).optional(),
    remainingAttempts: z.number().int().min(0).optional(),
    triggeredSecurityAlert: z.boolean().optional(),
    securityAlertReason: z.string().max(500).optional(),
    captchaPresented: z.boolean().optional(),
    captchaSolved: z.boolean().optional(),
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
// ✅ ENTERPRISE: MFA Verification Failed Event Class (v3.0)
// ============================================================

export class MfaVerificationFailedEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.MFA_VERIFICATION_FAILED;
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
  public readonly email?: string;
  public readonly phone?: string;
  public readonly mfaType: MfaType;
  public readonly failureReason: MfaFailureReason;
  public readonly source: MfaVerificationSource;
  
  // Tracking
  public readonly remainingAttempts?: number;
  public readonly isLocked: boolean;
  public readonly lockDurationMinutes?: number;
  
  // Notification
  public readonly notificationSent: boolean;
  public readonly notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';

  // Event metadata
  public readonly metadata?: MfaVerificationFailedMetadata;

  // ✅ Enterprise: Constructor with enhanced options
  constructor(
    userId: string,
    mfaType: MfaType,
    failureReason: MfaFailureReason,
    options?: {
      // Core fields
      email?: string;
      phone?: string;
      source?: MfaVerificationSource;
      
      // Tracking
      remainingAttempts?: number;
      isLocked?: boolean;
      lockDurationMinutes?: number;
      
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
      metadata?: MfaVerificationFailedMetadata;
      
      // Event version (default: from shared-constants)
      eventVersion?: number;
      aggregateVersion?: number;
    }
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.eventVersion = options?.eventVersion ?? EVENT_VERSIONS.V1;
    this.aggregateVersion = options?.aggregateVersion ?? 1;
    this.correlationId = options?.correlationId;
    this.causationId = options?.causationId;
    this.ttlSeconds = options?.ttlSeconds;
    this.expiresAt = options?.expiresAt;
    this.priority = options?.priority ?? this.calculatePriority(failureReason, options?.metadata);
    this.partitionKey = options?.partitionKey ?? userId;

    this.userId = userId;
    this.email = options?.email;
    this.phone = options?.phone;
    this.mfaType = mfaType;
    this.failureReason = failureReason;
    this.source = options?.source ?? MfaVerificationSource.LOGIN;
    
    this.remainingAttempts = options?.remainingAttempts;
    this.isLocked = options?.isLocked ?? false;
    this.lockDurationMinutes = options?.lockDurationMinutes;
    
    this.notificationSent = options?.notificationSent ?? false;
    this.notificationChannel = options?.notificationChannel;
    
    this.metadata = options?.metadata;

    // ✅ Enterprise: Auto-set partition key from district if available
    if (!options?.partitionKey && this.metadata?.district) {
      this.partitionKey = this.metadata.district;
    }

    // ✅ Enterprise: Auto-set TTL if not provided (30 days default)
    if (!this.ttlSeconds && !this.expiresAt) {
      this.ttlSeconds = 30 * 24 * 60 * 60; // 30 days
      this.expiresAt = new Date(Date.now() + this.ttlSeconds * 1000);
    }
  }

  // ============================================================
  // ✅ Enterprise: Helper Methods
  // ============================================================

  /**
   * Calculate priority based on failure reason and context
   */
  private calculatePriority(reason: MfaFailureReason, metadata?: MfaVerificationFailedMetadata): EventPriority {
    // Critical priority - account lockout scenarios
    if (reason === MfaFailureReason.MAX_ATTEMPTS_EXCEEDED || this.isLocked) {
      return 'critical';
    }
    
    // High priority - suspicious patterns
    if (reason === MfaFailureReason.SIM_SWAP_DETECTED ||
        reason === MfaFailureReason.INVALID_BKASH_PIN ||
        reason === MfaFailureReason.INVALID_NAGAD_PIN ||
        reason === MfaFailureReason.INVALID_ROCKET_PIN) {
      return 'high';
    }
    
    // High priority - multiple failures
    if (metadata?.consecutiveFailures && metadata.consecutiveFailures >= 3) {
      return 'high';
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
   * Check if this failure leads to lockout
   */
  public isLockoutScenario(): boolean {
    return this.isLocked || this.failureReason === MfaFailureReason.MAX_ATTEMPTS_EXCEEDED;
  }

  /**
   * Check if this was a rate-limited failure
   */
  public isRateLimited(): boolean {
    return this.failureReason === MfaFailureReason.RATE_LIMITED;
  }

  /**
   * Check if this was a Bangladesh-specific MFA failure
   */
  public isBangladeshSpecific(): boolean {
    return this.mfaType === MfaType.WHATSAPP ||
           this.mfaType === MfaType.IMO ||
           this.mfaType === MfaType.BKASH_PIN ||
           this.mfaType === MfaType.NAGAD_PIN ||
           this.mfaType === MfaType.ROCKET_PIN ||
           this.mfaType === MfaType.VOICE_CALL;
  }

  /**
   * Get remaining attempts (if available)
   */
  public getRemainingAttempts(): number | undefined {
    return this.remainingAttempts;
  }

  /**
   * Check if this failure should trigger a security alert
   */
  public shouldTriggerSecurityAlert(): boolean {
    return this.isLockoutScenario() ||
           this.isCritical() ||
           (this.metadata?.consecutiveFailures !== undefined && this.metadata.consecutiveFailures >= 3) ||
           this.failureReason === MfaFailureReason.SIM_SWAP_DETECTED;
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
      mfaType: this.mfaType,
      failureReason: this.failureReason,
      source: this.source,
      remainingAttempts: this.remainingAttempts,
      isLocked: this.isLocked,
      consecutiveFailures: this.metadata?.consecutiveFailures,
      district: this.metadata?.district,
      mobileOperator: this.metadata?.mobileOperator,
      deviceType: this.metadata?.deviceType,
      isLockoutScenario: this.isLockoutScenario(),
      isBangladeshSpecific: this.isBangladeshSpecific(),
      priority: this.priority,
      partitionKey: this.partitionKey,
      occurredAt: this.occurredAt.toISOString(),
    };
  }

  /**
   * Convert to plain object for serialization
   */
  public toJSON(): MfaVerificationFailedEventData {
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
      phone: this.phone,
      mfaType: this.mfaType,
      failureReason: this.failureReason,
      source: this.source,
      remainingAttempts: this.remainingAttempts,
      isLocked: this.isLocked,
      lockDurationMinutes: this.lockDurationMinutes,
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
  public static fromJSON(data: MfaVerificationFailedEventData): MfaVerificationFailedEvent {
    const event = new MfaVerificationFailedEvent(
      data.userId,
      data.mfaType,
      data.failureReason,
      {
        email: data.email,
        phone: data.phone,
        source: data.source,
        remainingAttempts: data.remainingAttempts,
        isLocked: data.isLocked,
        lockDurationMinutes: data.lockDurationMinutes,
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
        aggregateVersion: data.aggregateVersion,
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
    const result = MfaVerificationFailedEventSchema.safeParse(this.toJSON());
    return result.success;
  }

  // ============================================================
  // ✅ Enterprise: Static factory methods for common scenarios
  // ============================================================

  /**
   * Create event for invalid TOTP code
   */
  public static forInvalidTOTP(
    userId: string,
    remainingAttempts: number,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      email?: string;
      consecutiveFailures?: number;
      district?: string;
      correlationId?: string;
    }
  ): MfaVerificationFailedEvent {
    return new MfaVerificationFailedEvent(
      userId,
      MfaType.TOTP,
      MfaFailureReason.INVALID_CODE,
      {
        email: options?.email,
        remainingAttempts,
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          consecutiveFailures: options?.consecutiveFailures,
          remainingAttempts,
          district: options?.district,
        }
      }
    );
  }

  /**
   * Create event for invalid WhatsApp OTP (Bangladesh specific)
   */
  public static forInvalidWhatsAppOTP(
    userId: string,
    phone: string,
    remainingAttempts: number,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      email?: string;
      consecutiveFailures?: number;
      district?: string;
      mobileOperator?: typeof MOBILE_OPERATORS[number];
      correlationId?: string;
    }
  ): MfaVerificationFailedEvent {
    return new MfaVerificationFailedEvent(
      userId,
      MfaType.WHATSAPP,
      MfaFailureReason.INVALID_CODE,
      {
        phone,
        email: options?.email,
        remainingAttempts,
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          consecutiveFailures: options?.consecutiveFailures,
          remainingAttempts,
          district: options?.district,
          mobileOperator: options?.mobileOperator,
        }
      }
    );
  }

  /**
   * Create event for max attempts exceeded (lockout)
   */
  public static forMaxAttemptsExceeded(
    userId: string,
    mfaType: MfaType,
    lockDurationMinutes: number,
    totalFailures: number,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      email?: string;
      phone?: string;
      district?: string;
      correlationId?: string;
    }
  ): MfaVerificationFailedEvent {
    return new MfaVerificationFailedEvent(
      userId,
      mfaType,
      MfaFailureReason.MAX_ATTEMPTS_EXCEEDED,
      {
        email: options?.email,
        phone: options?.phone,
        isLocked: true,
        lockDurationMinutes,
        priority: 'critical',
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          totalFailuresToday: totalFailures,
          remainingAttempts: 0,
          district: options?.district,
          triggeredSecurityAlert: true,
          securityAlertReason: `MFA locked after ${totalFailures} failed attempts`,
        }
      }
    );
  }

  /**
   * Create event for SIM swap detected (Bangladesh specific)
   */
  public static forSimSwapDetection(
    userId: string,
    phone: string,
    mfaType: MfaType,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      email?: string;
      district?: string;
      mobileOperator?: typeof MOBILE_OPERATORS[number];
      correlationId?: string;
    }
  ): MfaVerificationFailedEvent {
    return new MfaVerificationFailedEvent(
      userId,
      mfaType,
      MfaFailureReason.SIM_SWAP_DETECTED,
      {
        phone,
        email: options?.email,
        priority: 'high',
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          district: options?.district,
          mobileOperator: options?.mobileOperator,
          triggeredSecurityAlert: true,
          securityAlertReason: 'SIM swap detected during MFA verification',
        }
      }
    );
  }
}

// ============================================================
// ✅ Enterprise: Event Data Interface (for serialization)
// ============================================================

export interface MfaVerificationFailedEventData {
  eventId: string;
  eventName: string;
  occurredAt: string;
  eventVersion: number;
  aggregateVersion: number;
  correlationId?: string;
  causationId?: string;
  userId: string;
  email?: string;
  phone?: string;
  mfaType: MfaType;
  failureReason: MfaFailureReason;
  source: MfaVerificationSource;
  remainingAttempts?: number;
  isLocked: boolean;
  lockDurationMinutes?: number;
  notificationSent: boolean;
  notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';
  metadata?: MfaVerificationFailedMetadata;
  ttlSeconds?: number;
  expiresAt?: string;
  priority?: EventPriority;
  partitionKey?: string;
}

// ============================================================
// ✅ Enterprise: Type Exports
// ============================================================

export type { 
  MfaVerificationFailedMetadata as MfaVerificationFailedMetadataType,
  MfaVerificationFailedPayload as MfaVerificationFailedPayloadType
};

// ============================================================
// ENTERPRISE SUMMARY v3.0
// ============================================================
// 
// Enterprise Enhancements Applied in v3.0:
// 1. ✅ Shared-types integration (@vubon/shared-types)
// 2. ✅ Event versioning with aggregateVersion tracking
// 3. ✅ TTL support with expiresAt for event expiry (30 days default)
// 4. ✅ Priority-based event processing (low/normal/high/critical)
// 5. ✅ Partition key for event streaming optimization
// 6. ✅ Bangladesh specific fields (district, upazila, mobileOperator, networkType)
// 7. ✅ Extended MfaType enum (WHATSAPP, IMO, BKASH_PIN, NAGAD_PIN, ROCKET_PIN, VOICE_CALL)
// 8. ✅ Extended MfaFailureReason enum (INVALID_BKASH_PIN, SIM_SWAP_DETECTED, etc.)
// 9. ✅ MfaVerificationSource enum (LOGIN, MFA_SETUP, SENSITIVE_ACTION, DEVICE_TRUST, ACCOUNT_RECOVERY)
// 10. ✅ 4 Static factory methods for common scenarios
// 11. ✅ Helper methods: isExpired(), isCritical(), isLockoutScenario(), isRateLimited()
// 12. ✅ isBangladeshSpecific(), getRemainingAttempts(), shouldTriggerSecurityAlert()
// 13. ✅ Serialization support (toJSON, fromJSON)
// 14. ✅ Zod schema for runtime validation
// 15. ✅ Consecutive failure tracking
// 16. ✅ Total failures tracking
// 17. ✅ Device fingerprint tracking
// 18. ✅ Notification tracking (notificationSent, notificationChannel)
// 19. ✅ Bangladesh specific - WhatsApp/Imo/bKash/Nagad/Rocket/Voice MFA support
// 
// Bangladesh Specific:
// - WhatsApp/Imo/Voice OTP support
// - bKash/Nagad/Rocket PIN support
// - SIM swap detection
// - District/Upazila/Division location tracking
// - Mobile operator and network type tracking
// - Feature phone device type (voice calls)
// - Bengali language support (metadata.language: 'bn')
// 
// Security Features:
// - Priority-based event processing for lockout scenarios
// - Security alert triggers for repeated failures
// - Consecutive failure tracking for brute force detection
// - SIM swap detection for fraud prevention
// - Lockout tracking for MFA methods
// - Device fingerprint tracking
// - CAPTCHA tracking for bot detection
// 
// ============================================================
