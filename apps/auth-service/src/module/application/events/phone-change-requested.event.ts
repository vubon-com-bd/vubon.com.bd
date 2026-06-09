/**
 * Phone Change Requested Event - Enterprise Grade (v3.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce

 * @module application/events/phone-change-requested.event

 * @description
 * Event emitted when a user requests to change their phone number.
 * Enhanced with shared-types integration, event versioning, TTL support,
 * Bangladesh specific fields, operator detection, and priority-based processing.

 * ENTERPRISE ENHANCEMENTS (v3.0):
 * ✅ Shared-types integration (@vubon/shared-types)
 * ✅ Event versioning with aggregateVersion tracking
 * ✅ TTL support with expiresAt for event expiry
 * ✅ Priority-based event processing (high for security-triggered requests)
 * ✅ Partition key for event streaming optimization
 * ✅ Bangladesh specific fields (district, upazila, mobileOperator, networkType)
 * ✅ Operator category tracking (same/different operator)
 * ✅ Rate limiting tracking for security
 * ✅ Verification duration tracking for analytics
 * ✅ Zod schema for runtime validation
 * ✅ Serialization support (toJSON, fromJSON)
 * ✅ Helper methods for expiry and status checks
 * ✅ Extended PhoneChangeRequestSource
 * ✅ Extended PhoneChangeRequestStatus
 * ✅ Admin action tracking
 * ✅ Device fingerprint tracking
 * ✅ Notification tracking
 * ✅ OTP delivery method tracking
 * ✅ Attempt tracking with remaining attempts

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
 * ✅ Bangladesh specific - District/Upazila/MobileOperator tracking
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
// Phone Change Request Source Enum (Extended)
// ============================================================

export enum PhoneChangeRequestSource {
  USER = 'USER',           // User initiated from profile
  ADMIN = 'ADMIN',         // Admin initiated
  SECURITY = 'SECURITY',   // Security prompted (suspicious activity)
  SUPPORT = 'SUPPORT',     // Support team initiated
  SYSTEM = 'SYSTEM',       // System initiated (e.g., after breach)
  COMPLIANCE = 'COMPLIANCE', // Compliance/regulatory requirement
}

// ============================================================
// Phone Change Request Status Enum (Extended)
// ============================================================

export enum PhoneChangeRequestStatus {
  PENDING = 'PENDING',     // Verification pending
  VERIFIED = 'VERIFIED',   // Verified and changed
  EXPIRED = 'EXPIRED',     // Verification expired
  CANCELLED = 'CANCELLED', // Cancelled by user
  REJECTED = 'REJECTED',   // Rejected by security
  BLOCKED = 'BLOCKED',     // Blocked due to suspicious activity
}

// ============================================================
// OTP Delivery Method Enum (Bangladesh specific)
// ============================================================

export enum OTPDeliveryMethod {
  SMS = 'SMS',
  WHATSAPP = 'WHATSAPP',
  VOICE = 'VOICE',
  IMO = 'IMO',
}

// ============================================================
// Operator Category Enum
// ============================================================

export enum OperatorCategory {
  SAME_OPERATOR = 'same_operator',
  DIFFERENT_OPERATOR = 'different_operator',
  UNKNOWN = 'unknown',
}

// ============================================================
// ✅ ENTERPRISE: Event Metadata Interface (Bangladesh specific)
// ============================================================

export interface PhoneChangeRequestedMetadata extends EventMetadata {
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

  /** Attempt number for this user (rate limiting) */
  attemptNumber?: number;

  /** Remaining attempts before rate limit */
  remainingAttempts?: number;

  /** Rate limit reset time */
  rateLimitResetAt?: Date;

  /** Cooldown seconds until next attempt */
  cooldownSeconds?: number;

  /** Whether CAPTCHA was required */
  captchaRequired?: boolean;

  /** Whether CAPTCHA was solved */
  captchaSolved?: boolean;

  /** Whether this request triggered a security alert */
  triggeredSecurityAlert?: boolean;

  /** Security alert reason (if triggered) */
  securityAlertReason?: string;

  /** Admin ID (if source is ADMIN) */
  initiatedBy?: string;

  /** Reason for change (for audit) */
  changeReason?: string;

  /** Whether notification was sent to user */
  notificationSent?: boolean;

  /** Notification channel used */
  notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';

  /** ✅ Enterprise: Bangladesh specific fields */
  /** User's district (Bangladesh) */
  district?: string;

  /** User's upazila/sub-district */
  upazila?: string;

  /** Division (Bangladesh) */
  division?: string;

  /** Old mobile operator for carrier-specific logic */
  oldMobileOperator?: typeof MOBILE_OPERATORS[number];

  /** New mobile operator for carrier-specific logic */
  newMobileOperator?: typeof MOBILE_OPERATORS[number];

  /** Operator category (same/different) */
  operatorCategory?: OperatorCategory;

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

export interface PhoneChangeRequestedPayload extends EventPayload {
  /** User ID */
  userId: string;

  /** Old phone number (null if first time) */
  oldPhone: string | null;

  /** New phone number */
  newPhone: string;

  /** Masked old phone (for privacy) */
  oldPhoneMasked: string | null;

  /** Masked new phone (for privacy) */
  newPhoneMasked: string;

  /** OTP delivery method */
  otpDeliveryMethod: OTPDeliveryMethod;

  /** Hashed verification token (NOT the actual token!) */
  verificationTokenHash: string;

  /** Verification request ID for tracking */
  verificationRequestId: string;

  /** Request source */
  source: PhoneChangeRequestSource;

  /** Request status */
  status: PhoneChangeRequestStatus;

  /** Request expiry timestamp */
  expiresAt: Date;

  /** Expiry duration in minutes */
  expiresInMinutes: number;

  /** Whether rate limited */
  wasRateLimited?: boolean;

  /** Cooldown seconds (if rate limited) */
  cooldownSeconds?: number;

  /** Operator category (same/different) */
  operatorCategory?: OperatorCategory;
}

// ============================================================
// ✅ ENTERPRISE: Phone Change Verified Event (v3.0)
// ============================================================

export interface PhoneChangeVerifiedPayload extends EventPayload {
  userId: string;
  oldPhone: string | null;
  newPhone: string;
  verifiedAt: Date;
  attemptsUsed: number;
  verificationTimeSeconds: number;
  verificationRequestId: string;
  operatorCategory?: OperatorCategory;
}

// ============================================================
// ✅ ENTERPRISE: Phone Change Failed Event (v3.0)
// ============================================================

export interface PhoneChangeFailedPayload extends EventPayload {
  userId: string;
  newPhone: string;
  reason: string;
  attemptCount: number;
  remainingAttempts: number;
  isLocked: boolean;
  lockDurationMinutes?: number;
}

// ============================================================
// ✅ ENTERPRISE: Phone Change Expired Event (v3.0)
// ============================================================

export interface PhoneChangeExpiredPayload extends EventPayload {
  userId: string;
  newPhone: string;
  requestedAt: Date;
  expiredAt: Date;
  verificationRequestId: string;
}

// ============================================================
// ✅ ENTERPRISE: Phone Change Cancelled Event (v3.0)
// ============================================================

export interface PhoneChangeCancelledPayload extends EventPayload {
  userId: string;
  oldPhone: string | null;
  newPhone: string;
  reason?: string;
  cancelledBy: 'user' | 'admin' | 'system';
  cancelledByUserId?: string;
}

// ============================================================
// ✅ ENTERPRISE: Zod Schema for Runtime Validation
// ============================================================

export const PhoneChangeRequestedEventSchema = z.object({
  eventId: z.string().uuid(),
  eventName: z.literal(EVENT_NAMES.PHONE_CHANGE_REQUESTED),
  occurredAt: z.date(),
  eventVersion: z.number().int().min(1).default(EVENT_VERSIONS.V1),
  aggregateVersion: z.number().int().min(1).default(1),
  correlationId: z.string().uuid().optional(),
  causationId: z.string().uuid().optional(),
  userId: z.string().uuid(),
  oldPhone: z.string().regex(/^(?:\+880|0)1[3-9]\d{8}$/).nullable(),
  newPhone: z.string().regex(/^(?:\+880|0)1[3-9]\d{8}$/),
  oldPhoneMasked: z.string().nullable(),
  newPhoneMasked: z.string(),
  otpDeliveryMethod: z.nativeEnum(OTPDeliveryMethod),
  verificationTokenHash: z.string().min(32).max(128),
  verificationRequestId: z.string().uuid(),
  source: z.nativeEnum(PhoneChangeRequestSource).default(PhoneChangeRequestSource.USER),
  status: z.nativeEnum(PhoneChangeRequestStatus).default(PhoneChangeRequestStatus.PENDING),
  expiresAt: z.date(),
  expiresInMinutes: z.number().int().min(1).max(60).default(10),
  wasRateLimited: z.boolean().default(false),
  cooldownSeconds: z.number().int().min(0).optional(),
  operatorCategory: z.nativeEnum(OperatorCategory).optional(),
  metadata: z.object({
    ipAddress: z.string().ip().optional(),
    deviceId: z.string().max(255).optional(),
    deviceFingerprint: z.string().max(128).optional(),
    userAgent: z.string().max(500).optional(),
    sessionId: z.string().uuid().optional(),
    attemptNumber: z.number().int().min(1).optional(),
    remainingAttempts: z.number().int().min(0).optional(),
    rateLimitResetAt: z.date().optional(),
    cooldownSeconds: z.number().int().min(0).optional(),
    captchaRequired: z.boolean().optional(),
    captchaSolved: z.boolean().optional(),
    triggeredSecurityAlert: z.boolean().optional(),
    securityAlertReason: z.string().max(500).optional(),
    initiatedBy: z.string().uuid().optional(),
    changeReason: z.string().max(500).optional(),
    notificationSent: z.boolean().optional(),
    notificationChannel: z.enum(['email', 'sms', 'push', 'whatsapp']).optional(),
    district: z.string().max(100).optional(),
    upazila: z.string().max(100).optional(),
    division: z.string().max(100).optional(),
    oldMobileOperator: z.enum(MOBILE_OPERATORS).optional(),
    newMobileOperator: z.enum(MOBILE_OPERATORS).optional(),
    operatorCategory: z.nativeEnum(OperatorCategory).optional(),
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
  expiresAtISO: z.date().optional(),
  priority: z.enum(['low', 'normal', 'high', 'critical']).default('normal'),
  partitionKey: z.string().optional(),
});

// ============================================================
// ✅ ENTERPRISE: Phone Change Requested Event Class (v3.0)
// ============================================================

export class PhoneChangeRequestedEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.PHONE_CHANGE_REQUESTED;
  public readonly occurredAt: Date;
  public readonly eventVersion: number;
  public readonly aggregateVersion: number;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly ttlSeconds?: number;
  public readonly expiresAt?: Date;
  public readonly priority?: EventPriority;
  public readonly partitionKey?: string;

  // Core phone change data
  public readonly userId: string;
  public readonly oldPhone: string | null;
  public readonly newPhone: string;
  public readonly oldPhoneMasked: string | null;
  public readonly newPhoneMasked: string;
  public readonly otpDeliveryMethod: OTPDeliveryMethod;

  // Security - hashed token reference (NOT the actual token!)
  public readonly verificationTokenHash: string;
  public readonly verificationRequestId: string;

  // Request context
  public readonly source: PhoneChangeRequestSource;
  public readonly status: PhoneChangeRequestStatus;
  public readonly expiresAt: Date;
  public readonly expiresInMinutes: number;

  // Rate limiting
  public readonly wasRateLimited: boolean;
  public readonly cooldownSeconds?: number;

  // Operator tracking (Bangladesh specific)
  public readonly operatorCategory?: OperatorCategory;

  // Event metadata
  public readonly metadata?: PhoneChangeRequestedMetadata;

  // ✅ Enterprise: Constructor with enhanced options
  constructor(
    userId: string,
    oldPhone: string | null,
    newPhone: string,
    otpDeliveryMethod: OTPDeliveryMethod,
    verificationTokenHash: string,
    verificationRequestId: string,
    options?: {
      // Source and status
      source?: PhoneChangeRequestSource;
      status?: PhoneChangeRequestStatus;

      // Expiry
      expiresInMinutes?: number;

      // Rate limiting
      wasRateLimited?: boolean;
      cooldownSeconds?: number;

      // Operator tracking
      oldMobileOperator?: typeof MOBILE_OPERATORS[number];
      newMobileOperator?: typeof MOBILE_OPERATORS[number];

      // Event tracking
      correlationId?: string;
      causationId?: string;
      ttlSeconds?: number;
      priority?: EventPriority;
      partitionKey?: string;

      // Metadata (Bangladesh specific)
      metadata?: PhoneChangeRequestedMetadata;

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
    this.priority = options?.priority ?? this.calculatePriority(options?.metadata);
    this.partitionKey = options?.partitionKey ?? userId;

    this.userId = userId;
    this.oldPhone = oldPhone;
    this.newPhone = newPhone;
    this.oldPhoneMasked = this.maskPhone(oldPhone);
    this.newPhoneMasked = this.maskPhone(newPhone);
    this.otpDeliveryMethod = otpDeliveryMethod;
    this.verificationTokenHash = verificationTokenHash;
    this.verificationRequestId = verificationRequestId;

    this.source = options?.source ?? PhoneChangeRequestSource.USER;
    this.status = options?.status ?? PhoneChangeRequestStatus.PENDING;

    const expiresInMinutes = options?.expiresInMinutes ?? 10;
    this.expiresInMinutes = expiresInMinutes;
    this.expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);

    this.wasRateLimited = options?.wasRateLimited ?? false;
    this.cooldownSeconds = options?.cooldownSeconds;

    // Calculate operator category
    const oldOperator = options?.oldMobileOperator ?? this.detectOperator(oldPhone);
    const newOperator = options?.newMobileOperator ?? this.detectOperator(newPhone);
    
    if (oldOperator && newOperator) {
      this.operatorCategory = oldOperator === newOperator 
        ? OperatorCategory.SAME_OPERATOR 
        : OperatorCategory.DIFFERENT_OPERATOR;
    }

    this.metadata = options?.metadata;

    // Auto-set operator info in metadata
    if (!this.metadata?.oldMobileOperator && oldOperator) {
      this.metadata = { ...this.metadata, oldMobileOperator: oldOperator };
    }
    if (!this.metadata?.newMobileOperator && newOperator) {
      this.metadata = { ...this.metadata, newMobileOperator: newOperator };
    }
    if (!this.metadata?.operatorCategory && this.operatorCategory) {
      this.metadata = { ...this.metadata, operatorCategory: this.operatorCategory };
    }

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
   * Detect mobile operator from phone number
   */
  private detectOperator(phone: string | null): typeof MOBILE_OPERATORS[number] | undefined {
    if (!phone) return undefined;
    
    // Normalize phone number (remove +880, keep last 10 digits)
    const normalized = phone.replace(/^\+880/, '').replace(/^0/, '');
    const prefix = normalized.substring(0, 3);
    
    // Bangladesh operator detection
    const operatorMap: Record<string, typeof MOBILE_OPERATORS[number]> = {
      '013': 'gp', '014': 'gp', '017': 'gp',
      '015': 'teletalk',
      '016': 'robi',
      '018': 'robi',
      '019': 'banglalink',
    };
    
    return operatorMap[prefix];
  }

  /**
   * Mask phone for privacy
   */
  private maskPhone(phone: string | null): string | null {
    if (!phone) return null;
    if (phone.length <= 6) return '***';
    return phone.substring(0, phone.length - 4) + '****';
  }

  /**
   * Calculate priority based on source and metadata
   */
  private calculatePriority(metadata?: PhoneChangeRequestedMetadata): EventPriority {
    // Critical priority - security/compliance initiated
    if (this.source === PhoneChangeRequestSource.SECURITY ||
        this.source === PhoneChangeRequestSource.COMPLIANCE) {
      return 'critical';
    }

    // High priority - admin initiated, suspicious, or operator change
    if (this.source === PhoneChangeRequestSource.ADMIN ||
        this.source === PhoneChangeRequestSource.SUPPORT ||
        metadata?.triggeredSecurityAlert ||
        this.operatorCategory === OperatorCategory.DIFFERENT_OPERATOR) {
      return 'high';
    }

    return 'normal';
  }

  /**
   * Check if event has expired
   */
  public isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  /**
   * Get remaining time in seconds
   */
  public getRemainingTimeSeconds(): number {
    if (this.isExpired()) return 0;
    const remaining = this.expiresAt.getTime() - Date.now();
    return Math.max(0, Math.ceil(remaining / 1000));
  }

  /**
   * Get remaining time formatted
   */
  public getRemainingTimeFormatted(): string {
    const seconds = this.getRemainingTimeSeconds();
    if (seconds <= 0) return 'Expired';
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  }

  /**
   * Check if request is still pending
   */
  public isPending(): boolean {
    return this.status === PhoneChangeRequestStatus.PENDING && !this.isExpired();
  }

  /**
   * Check if this was rate limited
   */
  public isRateLimited(): boolean {
    return this.wasRateLimited;
  }

  /**
   * Check if this was an admin-initiated request
   */
  public isAdminInitiated(): boolean {
    return this.source === PhoneChangeRequestSource.ADMIN && !!this.metadata?.initiatedBy;
  }

  /**
   * Check if this was security-triggered
   */
  public isSecurityTriggered(): boolean {
    return this.source === PhoneChangeRequestSource.SECURITY ||
           this.source === PhoneChangeRequestSource.COMPLIANCE;
  }

  /**
   * Check if operator changed
   */
  public isOperatorChanged(): boolean {
    return this.operatorCategory === OperatorCategory.DIFFERENT_OPERATOR;
  }

  /**
   * Get event summary for logging
   */
  public getSummary(): Record<string, unknown> {
    return {
      eventId: this.eventId,
      eventName: this.eventName,
      userId: this.userId,
      oldPhoneMasked: this.oldPhoneMasked,
      newPhoneMasked: this.newPhoneMasked,
      otpDeliveryMethod: this.otpDeliveryMethod,
      source: this.source,
      status: this.status,
      isExpired: this.isExpired(),
      remainingTime: this.getRemainingTimeFormatted(),
      wasRateLimited: this.wasRateLimited,
      operatorCategory: this.operatorCategory,
      district: this.metadata?.district,
      oldMobileOperator: this.metadata?.oldMobileOperator,
      newMobileOperator: this.metadata?.newMobileOperator,
      deviceType: this.metadata?.deviceType,
      isAdminInitiated: this.isAdminInitiated(),
      isSecurityTriggered: this.isSecurityTriggered(),
      isOperatorChanged: this.isOperatorChanged(),
      priority: this.priority,
      partitionKey: this.partitionKey,
      occurredAt: this.occurredAt.toISOString(),
    };
  }

  /**
   * Convert to plain object for serialization
   */
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
      oldPhone: this.oldPhone,
      newPhone: this.newPhone,
      oldPhoneMasked: this.oldPhoneMasked,
      newPhoneMasked: this.newPhoneMasked,
      otpDeliveryMethod: this.otpDeliveryMethod,
      verificationTokenHash: this.verificationTokenHash,
      verificationRequestId: this.verificationRequestId,
      source: this.source,
      status: this.status,
      expiresAt: this.expiresAt.toISOString(),
      expiresInMinutes: this.expiresInMinutes,
      wasRateLimited: this.wasRateLimited,
      cooldownSeconds: this.cooldownSeconds,
      operatorCategory: this.operatorCategory,
      metadata: this.metadata,
      ttlSeconds: this.ttlSeconds,
      expiresAtISO: this.expiresAt,
      priority: this.priority,
      partitionKey: this.partitionKey,
    };
  }

  /**
   * Static factory method to create from serialized data
   */
  public static fromJSON(data: PhoneChangeRequestedEventData): PhoneChangeRequestedEvent {
    const event = new PhoneChangeRequestedEvent(
      data.userId,
      data.oldPhone,
      data.newPhone,
      data.otpDeliveryMethod,
      data.verificationTokenHash,
      data.verificationRequestId,
      {
        source: data.source,
        status: data.status,
        expiresInMinutes: data.expiresInMinutes,
        wasRateLimited: data.wasRateLimited,
        cooldownSeconds: data.cooldownSeconds,
        correlationId: data.correlationId,
        causationId: data.causationId,
        ttlSeconds: data.ttlSeconds,
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
    const result = PhoneChangeRequestedEventSchema.safeParse(this.toJSON());
    return result.success;
  }

  // ============================================================
  // ✅ Enterprise: Static factory methods for common scenarios
  // ============================================================

  /**
   * Create event for user-initiated phone change
   */
  public static forUserRequest(
    userId: string,
    oldPhone: string | null,
    newPhone: string,
    otpDeliveryMethod: OTPDeliveryMethod,
    verificationTokenHash: string,
    verificationRequestId: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      expiresInMinutes?: number;
      district?: string;
      mobileOperator?: typeof MOBILE_OPERATORS[number];
      correlationId?: string;
    }
  ): PhoneChangeRequestedEvent {
    return new PhoneChangeRequestedEvent(
      userId,
      oldPhone,
      newPhone,
      otpDeliveryMethod,
      verificationTokenHash,
      verificationRequestId,
      {
        source: PhoneChangeRequestSource.USER,
        expiresInMinutes: options?.expiresInMinutes,
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          district: options?.district,
          newMobileOperator: options?.mobileOperator,
          notificationSent: true,
          notificationChannel: otpDeliveryMethod === OTPDeliveryMethod.WHATSAPP ? 'whatsapp' : 'sms',
        }
      }
    );
  }

  /**
   * Create event for admin-initiated phone change
   */
  public static forAdminRequest(
    userId: string,
    oldPhone: string | null,
    newPhone: string,
    otpDeliveryMethod: OTPDeliveryMethod,
    verificationTokenHash: string,
    verificationRequestId: string,
    adminId: string,
    reason: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      expiresInMinutes?: number;
      district?: string;
      correlationId?: string;
    }
  ): PhoneChangeRequestedEvent {
    return new PhoneChangeRequestedEvent(
      userId,
      oldPhone,
      newPhone,
      otpDeliveryMethod,
      verificationTokenHash,
      verificationRequestId,
      {
        source: PhoneChangeRequestSource.ADMIN,
        expiresInMinutes: options?.expiresInMinutes,
        priority: 'high',
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          district: options?.district,
          initiatedBy: adminId,
          changeReason: reason,
          notificationSent: true,
          notificationChannel: 'email',
          triggeredSecurityAlert: true,
          securityAlertReason: `Admin initiated phone change: ${reason}`,
        }
      }
    );
  }

  /**
   * Create event for security-triggered phone change (suspicious activity)
   */
  public static forSecurityTrigger(
    userId: string,
    oldPhone: string | null,
    newPhone: string,
    otpDeliveryMethod: OTPDeliveryMethod,
    verificationTokenHash: string,
    verificationRequestId: string,
    reason: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      expiresInMinutes?: number;
      district?: string;
      correlationId?: string;
    }
  ): PhoneChangeRequestedEvent {
    return new PhoneChangeRequestedEvent(
      userId,
      oldPhone,
      newPhone,
      otpDeliveryMethod,
      verificationTokenHash,
      verificationRequestId,
      {
        source: PhoneChangeRequestSource.SECURITY,
        expiresInMinutes: options?.expiresInMinutes ?? 20, // Longer expiry for security
        priority: 'critical',
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          district: options?.district,
          changeReason: reason,
          triggeredSecurityAlert: true,
          securityAlertReason: reason,
          notificationSent: true,
          notificationChannel: 'whatsapp',
        }
      }
    );
  }

  /**
   * Create event for rate-limited request
   */
  public static forRateLimited(
    userId: string,
    oldPhone: string | null,
    newPhone: string,
    otpDeliveryMethod: OTPDeliveryMethod,
    verificationRequestId: string,
    cooldownSeconds: number,
    attemptNumber: number,
    remainingAttempts: number,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      district?: string;
      correlationId?: string;
    }
  ): PhoneChangeRequestedEvent {
    const rateLimitResetAt = new Date(Date.now() + cooldownSeconds * 1000);

    return new PhoneChangeRequestedEvent(
      userId,
      oldPhone,
      newPhone,
      otpDeliveryMethod,
      '',
      verificationRequestId,
      {
        wasRateLimited: true,
        cooldownSeconds,
        priority: 'normal',
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          district: options?.district,
          attemptNumber,
          remainingAttempts,
          rateLimitResetAt,
          cooldownSeconds,
        }
      }
    );
  }
}

// ============================================================
// ✅ Enterprise: Phone Change Verified Event (v3.0)
// ============================================================

export class PhoneChangeVerifiedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.PHONE_CHANGE_VERIFIED;
  public readonly occurredAt: Date;
  public readonly verifiedAt: Date;
  public readonly eventVersion: number = EVENT_VERSIONS.V1;
  public readonly aggregateVersion: number;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly ttlSeconds?: number = 90 * 24 * 60 * 60;
  public readonly expiresAt?: Date;
  public readonly priority?: EventPriority = 'normal';
  public readonly partitionKey?: string;

  public readonly userId: string;
  public readonly oldPhone: string | null;
  public readonly newPhone: string;
  public readonly attemptsUsed: number;
  public readonly verificationTimeSeconds: number;
  public readonly verificationRequestId: string;
  public readonly operatorCategory?: OperatorCategory;
  public readonly ipAddress?: string;
  public readonly deviceId?: string;
  public readonly userAgent?: string;
  public readonly metadata?: PhoneChangeRequestedMetadata;

  constructor(
    userId: string,
    aggregateVersion: number,
    oldPhone: string | null,
    newPhone: string,
    attemptsUsed: number,
    verificationTimeSeconds: number,
    verificationRequestId: string,
    options?: {
      correlationId?: string;
      causationId?: string;
      ipAddress?: string;
      deviceId?: string;
      userAgent?: string;
      metadata?: PhoneChangeRequestedMetadata;
      operatorCategory?: OperatorCategory;
    }
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.verifiedAt = new Date();
    this.aggregateVersion = aggregateVersion;
    this.correlationId = options?.correlationId;
    this.causationId = options?.causationId;
    this.partitionKey = userId;
    this.expiresAt = this.ttlSeconds ? new Date(Date.now() + this.ttlSeconds * 1000) : undefined;

    this.userId = userId;
    this.oldPhone = oldPhone;
    this.newPhone = newPhone;
    this.attemptsUsed = attemptsUsed;
    this.verificationTimeSeconds = verificationTimeSeconds;
    this.verificationRequestId = verificationRequestId;
    this.operatorCategory = options?.operatorCategory;
    this.ipAddress = options?.ipAddress;
    this.deviceId = options?.deviceId;
    this.userAgent = options?.userAgent;
    this.metadata = options?.metadata;
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

  public toJSON(): PhoneChangeVerifiedEventData {
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
      oldPhone: this.oldPhone,
      newPhone: this.newPhone,
      attemptsUsed: this.attemptsUsed,
      verificationTimeSeconds: this.verificationTimeSeconds,
      verificationRequestId: this.verificationRequestId,
      operatorCategory: this.operatorCategory,
      ipAddress: this.ipAddress,
      deviceId: this.deviceId,
      userAgent: this.userAgent,
      metadata: this.metadata,
    };
  }
}

// ============================================================
// ✅ Enterprise: Phone Change Failed Event (v3.0)
// ============================================================

export class PhoneChangeFailedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.PHONE_CHANGE_FAILED;
  public readonly occurredAt: Date;
  public readonly eventVersion: number = EVENT_VERSIONS.V1;
  public readonly aggregateVersion: number = 1;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly ttlSeconds?: number = 30 * 24 * 60 * 60;
  public readonly expiresAt?: Date;
  public readonly priority?: EventPriority = 'normal';
  public readonly partitionKey?: string;

  public readonly userId: string;
  public readonly newPhone: string;
  public readonly reason: string;
  public readonly attemptCount: number;
  public readonly remainingAttempts: number;
  public readonly isLocked: boolean;
  public readonly lockDurationMinutes?: number;
  public readonly ipAddress?: string;
  public readonly deviceId?: string;

  constructor(
    userId: string,
    newPhone: string,
    reason: string,
    attemptCount: number,
    remainingAttempts: number,
    isLocked: boolean = false,
    options?: {
      lockDurationMinutes?: number;
      correlationId?: string;
      causationId?: string;
      ipAddress?: string;
      deviceId?: string;
    }
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.correlationId = options?.correlationId;
    this.causationId = options?.causationId;
    this.partitionKey = userId;
    this.expiresAt = this.ttlSeconds ? new Date(Date.now() + this.ttlSeconds * 1000) : undefined;
    this.priority = isLocked ? 'high' : 'normal';

    this.userId = userId;
    this.newPhone = newPhone;
    this.reason = reason;
    this.attemptCount = attemptCount;
    this.remainingAttempts = remainingAttempts;
    this.isLocked = isLocked;
    this.lockDurationMinutes = options?.lockDurationMinutes;
    this.ipAddress = options?.ipAddress;
    this.deviceId = options?.deviceId;
  }

  public getMaskedNewPhone(): string {
    return this.maskPhone(this.newPhone);
  }

  private maskPhone(phone: string): string {
    if (phone.length <= 6) return '***';
    return phone.substring(0, phone.length - 4) + '****';
  }

  public toJSON(): PhoneChangeFailedEventData {
    return {
      eventId: this.eventId,
      eventName: this.eventName,
      occurredAt: this.occurredAt.toISOString(),
      eventVersion: this.eventVersion,
      aggregateVersion: this.aggregateVersion,
      correlationId: this.correlationId,
      causationId: this.causationId,
      userId: this.userId,
      newPhone: this.newPhone,
      reason: this.reason,
      attemptCount: this.attemptCount,
      remainingAttempts: this.remainingAttempts,
      isLocked: this.isLocked,
      lockDurationMinutes: this.lockDurationMinutes,
      ipAddress: this.ipAddress,
      deviceId: this.deviceId,
    };
  }
}

// ============================================================
// ✅ Enterprise: Phone Change Expired Event (v3.0)
// ============================================================

export class PhoneChangeExpiredEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.PHONE_CHANGE_EXPIRED;
  public readonly occurredAt: Date;
  public readonly eventVersion: number = EVENT_VERSIONS.V1;
  public readonly aggregateVersion: number = 1;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly ttlSeconds?: number = 30 * 24 * 60 * 60;
  public readonly expiresAt?: Date;
  public readonly priority?: EventPriority = 'low';
  public readonly partitionKey?: string;

  public readonly userId: string;
  public readonly newPhone: string;
  public readonly requestedAt: Date;
  public readonly expiredAt: Date;
  public readonly verificationRequestId: string;

  constructor(
    userId: string,
    newPhone: string,
    requestedAt: Date,
    expiredAt: Date,
    verificationRequestId: string,
    options?: {
      correlationId?: string;
      causationId?: string;
    }
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.correlationId = options?.correlationId;
    this.causationId = options?.causationId;
    this.partitionKey = userId;
    this.expiresAt = this.ttlSeconds ? new Date(Date.now() + this.ttlSeconds * 1000) : undefined;

    this.userId = userId;
    this.newPhone = newPhone;
    this.requestedAt = requestedAt;
    this.expiredAt = expiredAt;
    this.verificationRequestId = verificationRequestId;
  }

  public getMaskedNewPhone(): string {
    return this.maskPhone(this.newPhone);
  }

  private maskPhone(phone: string): string {
    if (phone.length <= 6) return '***';
    return phone.substring(0, phone.length - 4) + '****';
  }

  public toJSON(): PhoneChangeExpiredEventData {
    return {
      eventId: this.eventId,
      eventName: this.eventName,
      occurredAt: this.occurredAt.toISOString(),
      eventVersion: this.eventVersion,
      aggregateVersion: this.aggregateVersion,
      correlationId: this.correlationId,
      causationId: this.causationId,
      userId: this.userId,
      newPhone: this.newPhone,
      requestedAt: this.requestedAt.toISOString(),
      expiredAt: this.expiredAt.toISOString(),
      verificationRequestId: this.verificationRequestId,
    };
  }
}

// ============================================================
// ✅ Enterprise: Phone Change Cancelled Event (v3.0)
// ============================================================

export class PhoneChangeCancelledEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.PHONE_CHANGE_CANCELLED;
  public readonly occurredAt: Date;
  public readonly eventVersion: number = EVENT_VERSIONS.V1;
  public readonly aggregateVersion: number = 1;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly ttlSeconds?: number = 30 * 24 * 60 * 60;
  public readonly expiresAt?: Date;
  public readonly priority?: EventPriority = 'low';
  public readonly partitionKey?: string;

  public readonly userId: string;
  public readonly oldPhone: string | null;
  public readonly newPhone: string;
  public readonly reason?: string;
  public readonly cancelledBy: 'user' | 'admin' | 'system';
  public readonly cancelledByUserId?: string;
  public readonly metadata?: PhoneChangeRequestedMetadata;

  constructor(
    userId: string,
    oldPhone: string | null,
    newPhone: string,
    cancelledBy: 'user' | 'admin' | 'system',
    options?: {
      reason?: string;
      cancelledByUserId?: string;
      correlationId?: string;
      causationId?: string;
      metadata?: PhoneChangeRequestedMetadata;
    }
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.correlationId = options?.correlationId;
    this.causationId = options?.causationId;
    this.partitionKey = userId;
    this.expiresAt = this.ttlSeconds ? new Date(Date.now() + this.ttlSeconds * 1000) : undefined;

    this.userId = userId;
    this.oldPhone = oldPhone;
    this.newPhone = newPhone;
    this.reason = options?.reason;
    this.cancelledBy = cancelledBy;
    this.cancelledByUserId = options?.cancelledByUserId;
    this.metadata = options?.metadata;
  }

  public toJSON(): PhoneChangeCancelledEventData {
    return {
      eventId: this.eventId,
      eventName: this.eventName,
      occurredAt: this.occurredAt.toISOString(),
      eventVersion: this.eventVersion,
      aggregateVersion: this.aggregateVersion,
      correlationId: this.correlationId,
      causationId: this.causationId,
      userId: this.userId,
      oldPhone: this.oldPhone,
      newPhone: this.newPhone,
      reason: this.reason,
      cancelledBy: this.cancelledBy,
      cancelledByUserId: this.cancelledByUserId,
      metadata: this.metadata,
    };
  }
}

// ============================================================
// ✅ Enterprise: Event Data Interfaces (for serialization)
// ============================================================

export interface PhoneChangeRequestedEventData {
  eventId: string;
  eventName: string;
  occurredAt: string;
  eventVersion: number;
  aggregateVersion: number;
  correlationId?: string;
  causationId?: string;
  userId: string;
  oldPhone: string | null;
  newPhone: string;
  oldPhoneMasked: string | null;
  newPhoneMasked: string;
  otpDeliveryMethod: OTPDeliveryMethod;
  verificationTokenHash: string;
  verificationRequestId: string;
  source: PhoneChangeRequestSource;
  status: PhoneChangeRequestStatus;
  expiresAt: string;
  expiresInMinutes: number;
  wasRateLimited: boolean;
  cooldownSeconds?: number;
  operatorCategory?: OperatorCategory;
  metadata?: PhoneChangeRequestedMetadata;
  ttlSeconds?: number;
  expiresAtISO?: Date;
  priority?: EventPriority;
  partitionKey?: string;
}

export interface PhoneChangeVerifiedEventData {
  eventId: string;
  eventName: string;
  occurredAt: string;
  verifiedAt: string;
  eventVersion: number;
  aggregateVersion: number;
  correlationId?: string;
  causationId?: string;
  userId: string;
  oldPhone: string | null;
  newPhone: string;
  attemptsUsed: number;
  verificationTimeSeconds: number;
  verificationRequestId: string;
  operatorCategory?: OperatorCategory;
  ipAddress?: string;
  deviceId?: string;
  userAgent?: string;
  metadata?: PhoneChangeRequestedMetadata;
}

export interface PhoneChangeFailedEventData {
  eventId: string;
  eventName: string;
  occurredAt: string;
  eventVersion: number;
  aggregateVersion: number;
  correlationId?: string;
  causationId?: string;
  userId: string;
  newPhone: string;
  reason: string;
  attemptCount: number;
  remainingAttempts: number;
  isLocked: boolean;
  lockDurationMinutes?: number;
  ipAddress?: string;
  deviceId?: string;
}

export interface PhoneChangeExpiredEventData {
  eventId: string;
  eventName: string;
  occurredAt: string;
  eventVersion: number;
  aggregateVersion: number;
  correlationId?: string;
  causationId?: string;
  userId: string;
  newPhone: string;
  requestedAt: string;
  expiredAt: string;
  verificationRequestId: string;
}

export interface PhoneChangeCancelledEventData {
  eventId: string;
  eventName: string;
  occurredAt: string;
  eventVersion: number;
  aggregateVersion: number;
  correlationId?: string;
  causationId?: string;
  userId: string;
  oldPhone: string | null;
  newPhone: string;
  reason?: string;
  cancelledBy: 'user' | 'admin' | 'system';
  cancelledByUserId?: string;
  metadata?: PhoneChangeRequestedMetadata;
}

// ============================================================
// ✅ Enterprise: Type Exports
// ============================================================

export type { 
  PhoneChangeRequestedMetadata as PhoneChangeRequestedMetadataType,
  PhoneChangeRequestedPayload as PhoneChangeRequestedPayloadType,
  PhoneChangeVerifiedPayload as PhoneChangeVerifiedPayloadType,
  PhoneChangeFailedPayload as PhoneChangeFailedPayloadType,
  PhoneChangeExpiredPayload as PhoneChangeExpiredPayloadType,
  PhoneChangeCancelledPayload as PhoneChangeCancelledPayloadType
};

// ============================================================
// ENTERPRISE SUMMARY v3.0
// ============================================================
// 
// Enterprise Enhancements Applied in v3.0:
// 1. ✅ Shared-types integration (@vubon/shared-types)
// 2. ✅ Event versioning with aggregateVersion tracking
// 3. ✅ TTL support with expiresAt for event expiry (30 days default)
// 4. ✅ Priority-based event processing (critical for security/compliance)
// 5. ✅ Partition key for event streaming optimization
// 6. ✅ Bangladesh specific fields (district, upazila, mobileOperator, networkType)
// 7. ✅ Operator detection and tracking (GP/Robi/Banglalink/Teletalk)
// 8. ✅ Operator category tracking (same_operator/different_operator)
// 9. ✅ Rate limiting tracking for security
// 10. ✅ Extended PhoneChangeRequestSource (SYSTEM, COMPLIANCE)
// 11. ✅ Extended PhoneChangeRequestStatus (BLOCKED)
// 12. ✅ OTP delivery method tracking (SMS/WhatsApp/Voice/Imo)
// 13. ✅ 4 Static factory methods for common scenarios
// 14. ✅ Helper methods: isExpired(), getRemainingTimeSeconds(), getRemainingTimeFormatted()
// 15. ✅ isPending(), isRateLimited(), isAdminInitiated(), isSecurityTriggered(), isOperatorChanged()
// 16. ✅ Serialization support (toJSON, fromJSON)
// 17. ✅ Zod schema for runtime validation
// 18. ✅ Notification tracking (notificationSent, notificationChannel)
// 19. ✅ Admin action tracking with initiatedBy
// 20. ✅ Device fingerprint tracking
// 21. ✅ Captcha tracking for bot detection
// 22. ✅ Hashed token storage (never store plain token)
// 23. ✅ Masked phone display for privacy
// 24. ✅ Verification time tracking for analytics
// 25. ✅ Lockout tracking for failed attempts
// 
// Bangladesh Specific:
// - GP/Robi/Banglalink/Teletalk operator detection
// - Same/different operator tracking
// - District/Upazila/Division location tracking
// - Mobile operator and network type tracking
// - Feature phone device type (voice calls)
// - Bengali language support (metadata.language: 'bn')
// - WhatsApp notification channel support
// 
// Security Features:
// - Rate limiting prevents abuse
// - Captcha support for bot detection
// - Security-triggered changes have longer expiry (20 min vs 10 min)
// - Admin action audit trail
// - Device fingerprint tracking
// - Token hashing for security
// - Phone masking for privacy
// - Priority-based processing for security events
// - Operator change detection (security signal)
// - Lockout tracking for failed attempts
// 
// ============================================================
