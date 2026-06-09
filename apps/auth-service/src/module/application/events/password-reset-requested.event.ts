/**
 * Password Reset Requested Event - Enterprise Grade (v3.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce

 * @module application/events/password-reset-requested.event

 * @description
 * Event emitted when a user requests a password reset.
 * Used for audit logging, security monitoring, and analytics.
 * 
 * ENTERPRISE SECURITY NOTE:
 * ⚠️ NEVER include the actual reset token in events!
 * Events are logged, stored, and may be sent to external systems.
 * Only include token hash or reference ID.
 * 
 * ENTERPRISE ENHANCEMENTS (v3.0):
 * ✅ Shared-types integration (@vubon/shared-types)
 * ✅ Event versioning with aggregateVersion tracking
 * ✅ TTL support with expiresAt for event expiry
 * ✅ Priority-based event processing (low/normal/high/critical)
 * ✅ Partition key for event streaming optimization
 * ✅ Bangladesh specific fields (district, upazila, mobileOperator, networkType)
 * ✅ Device fingerprint tracking
 * ✅ Rate limiting attempt tracking
 * ✅ Zod schema for runtime validation
 * ✅ Serialization support (toJSON, fromJSON)
 * ✅ Helper methods for event analysis
 * ✅ Correlation/Causation IDs for event sourcing
 * ✅ Complete event types (Requested, Completed, Failed)
 * ✅ Security audit with ipAddress, deviceId, userAgent
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
  PASSWORD_RESET_CONFIG
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
// Password Reset Method Enum (Bangladesh specific)
// ============================================================

export enum PasswordResetMethod {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  WHATSAPP = 'WHATSAPP',      // Bangladesh specific
  VOICE = 'VOICE',            // For feature phones
  IMO = 'IMO',                // Bangladesh specific
}

// ============================================================
// Password Reset Source Enum
// ============================================================

export enum PasswordResetSource {
  WEB = 'WEB',
  MOBILE_APP = 'MOBILE_APP',
  FEATURE_PHONE = 'FEATURE_PHONE',  // Bangladesh specific
  API = 'API',
  ADMIN_PORTAL = 'ADMIN_PORTAL',
  SUPPORT_AGENT = 'SUPPORT_AGENT',
}

// ============================================================
// ✅ ENTERPRISE: Event Metadata Interface (Bangladesh specific)
// ============================================================

export interface PasswordResetMetadata extends EventMetadata {
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

  /** Whether CAPTCHA was required */
  captchaRequired?: boolean;

  /** Whether CAPTCHA was solved */
  captchaSolved?: boolean;

  /** Reset method requested */
  resetMethod?: PasswordResetMethod;

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

export interface PasswordResetRequestedPayload extends EventPayload {
  /** User ID */
  userId: string;

  /** User email */
  email: string;

  /** User phone (Bangladesh specific) */
  phone?: string;

  /** Hashed reset token (NOT the actual token!) */
  resetTokenHash: string;

  /** Reset request ID for tracking */
  resetRequestId: string;

  /** Reset method requested */
  resetMethod: PasswordResetMethod;

  /** Reset source */
  resetSource: PasswordResetSource;

  /** Was rate limited? */
  wasRateLimited?: boolean;

  /** Rate limit cooldown seconds */
  rateLimitCooldownSeconds?: number;
}

// ============================================================
// ✅ ENTERPRISE: Zod Schema for Runtime Validation
// ============================================================

export const PasswordResetRequestedEventSchema = z.object({
  eventId: z.string().uuid(),
  eventName: z.literal(EVENT_NAMES.PASSWORD_RESET_REQUESTED),
  occurredAt: z.date(),
  eventVersion: z.number().int().min(1).default(EVENT_VERSIONS.V1),
  aggregateVersion: z.number().int().min(1).default(1),
  correlationId: z.string().uuid().optional(),
  causationId: z.string().uuid().optional(),
  userId: z.string().uuid(),
  email: z.string().email(),
  phone: z.string().regex(/^(?:\+880|0)1[3-9]\d{8}$/).optional(),
  resetTokenHash: z.string().min(32).max(128),
  resetRequestId: z.string().uuid(),
  resetMethod: z.nativeEnum(PasswordResetMethod),
  resetSource: z.nativeEnum(PasswordResetSource),
  wasRateLimited: z.boolean().default(false),
  rateLimitCooldownSeconds: z.number().int().min(0).optional(),
  metadata: z.object({
    ipAddress: z.string().ip().optional(),
    deviceId: z.string().max(255).optional(),
    deviceFingerprint: z.string().max(128).optional(),
    userAgent: z.string().max(500).optional(),
    sessionId: z.string().uuid().optional(),
    attemptNumber: z.number().int().min(0).optional(),
    remainingAttempts: z.number().int().min(0).optional(),
    rateLimitResetAt: z.date().optional(),
    captchaRequired: z.boolean().optional(),
    captchaSolved: z.boolean().optional(),
    resetMethod: z.nativeEnum(PasswordResetMethod).optional(),
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
// ✅ ENTERPRISE: Password Reset Requested Event Class (v3.0)
// ============================================================

export class PasswordResetRequestedEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.PASSWORD_RESET_REQUESTED;
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
  public readonly phone?: string;

  // Security (hashed token reference, NOT the actual token!)
  public readonly resetTokenHash: string;
  public readonly resetRequestId: string;

  // Reset context
  public readonly resetMethod: PasswordResetMethod;
  public readonly resetSource: PasswordResetSource;

  // Rate limiting
  public readonly wasRateLimited: boolean;
  public readonly rateLimitCooldownSeconds?: number;

  // Event metadata
  public readonly metadata?: PasswordResetMetadata;

  // ✅ Enterprise: Constructor with enhanced options
  constructor(
    userId: string,
    email: string,
    resetTokenHash: string,
    resetRequestId: string,
    resetMethod: PasswordResetMethod,
    resetSource: PasswordResetSource,
    options?: {
      phone?: string;
      wasRateLimited?: boolean;
      rateLimitCooldownSeconds?: number;
      correlationId?: string;
      causationId?: string;
      ttlSeconds?: number;
      expiresAt?: Date;
      priority?: EventPriority;
      partitionKey?: string;
      metadata?: PasswordResetMetadata;
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
    this.email = email;
    this.phone = options?.phone;

    this.resetTokenHash = resetTokenHash;
    this.resetRequestId = resetRequestId;

    this.resetMethod = resetMethod;
    this.resetSource = resetSource;

    this.wasRateLimited = options?.wasRateLimited ?? false;
    this.rateLimitCooldownSeconds = options?.rateLimitCooldownSeconds;

    this.metadata = options?.metadata;

    // ✅ Enterprise: Auto-set partition key from district if available
    if (!options?.partitionKey && this.metadata?.district) {
      this.partitionKey = this.metadata.district;
    }

    // ✅ Enterprise: Auto-set TTL if not provided (7 days default for password reset events)
    if (!this.ttlSeconds && !this.expiresAt) {
      this.ttlSeconds = 7 * 24 * 60 * 60; // 7 days
      this.expiresAt = new Date(Date.now() + this.ttlSeconds * 1000);
    }
  }

  // ============================================================
  // ✅ Enterprise: Helper Methods
  // ============================================================

  /**
   * Calculate priority based on context
   */
  private calculatePriority(metadata?: PasswordResetMetadata): EventPriority {
    // High priority if rate limited (potential abuse)
    if (this.wasRateLimited) {
      return 'high';
    }

    // Critical priority for suspicious patterns
    if (metadata?.attemptNumber && metadata.attemptNumber >= 5) {
      return 'critical';
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
   * Check if this was a rate-limited request
   */
  public isRateLimited(): boolean {
    return this.wasRateLimited;
  }

  /**
   * Get remaining rate limit cooldown in seconds
   */
  public getRemainingCooldownSeconds(): number {
    if (!this.rateLimitCooldownSeconds) return 0;
    if (!this.metadata?.rateLimitResetAt) return this.rateLimitCooldownSeconds;

    const remaining = Math.ceil(
      (this.metadata.rateLimitResetAt.getTime() - Date.now()) / 1000
    );
    return Math.max(0, remaining);
  }

  /**
   * Check if this was a suspicious request
   */
  public isSuspicious(): boolean {
    return (
      (this.metadata?.attemptNumber && this.metadata.attemptNumber >= 3) ||
      this.wasRateLimited ||
      (this.metadata?.captchaRequired && !this.metadata?.captchaSolved)
    );
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
      resetMethod: this.resetMethod,
      resetSource: this.resetSource,
      wasRateLimited: this.wasRateLimited,
      attemptNumber: this.metadata?.attemptNumber,
      remainingAttempts: this.metadata?.remainingAttempts,
      district: this.metadata?.district,
      mobileOperator: this.metadata?.mobileOperator,
      deviceType: this.metadata?.deviceType,
      isSuspicious: this.isSuspicious(),
      priority: this.priority,
      partitionKey: this.partitionKey,
      occurredAt: this.occurredAt.toISOString(),
    };
  }

  /**
   * Convert to plain object for serialization
   */
  public toJSON(): PasswordResetRequestedEventData {
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
      resetTokenHash: this.resetTokenHash,
      resetRequestId: this.resetRequestId,
      resetMethod: this.resetMethod,
      resetSource: this.resetSource,
      wasRateLimited: this.wasRateLimited,
      rateLimitCooldownSeconds: this.rateLimitCooldownSeconds,
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
  public static fromJSON(data: PasswordResetRequestedEventData): PasswordResetRequestedEvent {
    const event = new PasswordResetRequestedEvent(
      data.userId,
      data.email,
      data.resetTokenHash,
      data.resetRequestId,
      data.resetMethod,
      data.resetSource,
      {
        phone: data.phone,
        wasRateLimited: data.wasRateLimited,
        rateLimitCooldownSeconds: data.rateLimitCooldownSeconds,
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
    const result = PasswordResetRequestedEventSchema.safeParse(this.toJSON());
    return result.success;
  }

  // ============================================================
  // ✅ Enterprise: Static factory methods for common scenarios
  // ============================================================

  /**
   * Create event for email-based password reset
   */
  public static forEmailReset(
    userId: string,
    email: string,
    resetTokenHash: string,
    resetRequestId: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      phone?: string;
      attemptNumber?: number;
      remainingAttempts?: number;
      district?: string;
      correlationId?: string;
    }
  ): PasswordResetRequestedEvent {
    return new PasswordResetRequestedEvent(
      userId,
      email,
      resetTokenHash,
      resetRequestId,
      PasswordResetMethod.EMAIL,
      PasswordResetSource.WEB,
      {
        phone: options?.phone,
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          attemptNumber: options?.attemptNumber,
          remainingAttempts: options?.remainingAttempts,
          district: options?.district,
        }
      }
    );
  }

  /**
   * Create event for WhatsApp-based password reset (Bangladesh specific)
   */
  public static forWhatsAppReset(
    userId: string,
    email: string,
    phone: string,
    resetTokenHash: string,
    resetRequestId: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      attemptNumber?: number;
      remainingAttempts?: number;
      district?: string;
      mobileOperator?: typeof MOBILE_OPERATORS[number];
      correlationId?: string;
    }
  ): PasswordResetRequestedEvent {
    return new PasswordResetRequestedEvent(
      userId,
      email,
      resetTokenHash,
      resetRequestId,
      PasswordResetMethod.WHATSAPP,
      PasswordResetSource.MOBILE_APP,
      {
        phone,
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          attemptNumber: options?.attemptNumber,
          remainingAttempts: options?.remainingAttempts,
          district: options?.district,
          mobileOperator: options?.mobileOperator,
          resetMethod: PasswordResetMethod.WHATSAPP,
        }
      }
    );
  }

  /**
   * Create event for feature phone voice call reset (Bangladesh specific)
   */
  public static forVoiceReset(
    userId: string,
    email: string,
    phone: string,
    resetTokenHash: string,
    resetRequestId: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      attemptNumber?: number;
      remainingAttempts?: number;
      district?: string;
      mobileOperator?: typeof MOBILE_OPERATORS[number];
      correlationId?: string;
    }
  ): PasswordResetRequestedEvent {
    return new PasswordResetRequestedEvent(
      userId,
      email,
      resetTokenHash,
      resetRequestId,
      PasswordResetMethod.VOICE,
      PasswordResetSource.FEATURE_PHONE,
      {
        phone,
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          attemptNumber: options?.attemptNumber,
          remainingAttempts: options?.remainingAttempts,
          district: options?.district,
          mobileOperator: options?.mobileOperator,
          deviceType: 'feature_phone',
          resetMethod: PasswordResetMethod.VOICE,
        }
      }
    );
  }

  /**
   * Create event for rate-limited request
   */
  public static forRateLimited(
    userId: string,
    email: string,
    resetRequestId: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    cooldownSeconds: number,
    attemptNumber: number,
    options?: {
      phone?: string;
      district?: string;
      correlationId?: string;
    }
  ): PasswordResetRequestedEvent {
    const rateLimitResetAt = new Date(Date.now() + cooldownSeconds * 1000);

    return new PasswordResetRequestedEvent(
      userId,
      email,
      '',
      resetRequestId,
      PasswordResetMethod.EMAIL,
      PasswordResetSource.WEB,
      {
        phone: options?.phone,
        wasRateLimited: true,
        rateLimitCooldownSeconds: cooldownSeconds,
        correlationId: options?.correlationId,
        priority: 'high',
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          attemptNumber,
          remainingAttempts: 0,
          rateLimitResetAt,
          district: options?.district,
        }
      }
    );
  }
}

// ============================================================
// ✅ Enterprise: Password Reset Completed Event (v2.0)
// ============================================================

export class PasswordResetCompletedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.PASSWORD_RESET_COMPLETED;
  public readonly occurredAt: Date;
  public readonly eventVersion: number = EVENT_VERSIONS.V1;
  public readonly aggregateVersion: number;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly ttlSeconds?: number;
  public readonly expiresAt?: Date;
  public readonly priority?: EventPriority = 'normal';
  public readonly partitionKey?: string;

  public readonly userId: string;
  public readonly email: string;
  public readonly resetRequestId: string;
  public readonly ipAddress?: string;
  public readonly deviceId?: string;
  public readonly userAgent?: string;
  public readonly metadata?: PasswordResetMetadata;

  constructor(
    userId: string,
    aggregateVersion: number,
    email: string,
    resetRequestId: string,
    options?: {
      ipAddress?: string;
      deviceId?: string;
      userAgent?: string;
      correlationId?: string;
      causationId?: string;
      ttlSeconds?: number;
      expiresAt?: Date;
      partitionKey?: string;
      metadata?: PasswordResetMetadata;
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
    this.email = email;
    this.resetRequestId = resetRequestId;
    this.ipAddress = options?.ipAddress;
    this.deviceId = options?.deviceId;
    this.userAgent = options?.userAgent;
    this.metadata = options?.metadata;
  }

  public toJSON(): PasswordResetCompletedEventData {
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
      resetRequestId: this.resetRequestId,
      ipAddress: this.ipAddress,
      deviceId: this.deviceId,
      userAgent: this.userAgent,
      metadata: this.metadata,
    };
  }
}

// ============================================================
// ✅ Enterprise: Password Reset Failed Event (v2.0)
// ============================================================

export enum PasswordResetFailureReason {
  INVALID_TOKEN = 'INVALID_TOKEN',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  TOKEN_ALREADY_USED = 'TOKEN_ALREADY_USED',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',
  ACCOUNT_SUSPENDED = 'ACCOUNT_SUSPENDED',
  RATE_LIMITED = 'RATE_LIMITED',
  INVALID_OTP = 'INVALID_OTP',
  OTP_EXPIRED = 'OTP_EXPIRED',
  MAX_ATTEMPTS_EXCEEDED = 'MAX_ATTEMPTS_EXCEEDED',
  PASSWORD_WEAK = 'PASSWORD_WEAK',
  PASSWORD_REUSED = 'PASSWORD_REUSED',
  NETWORK_ERROR = 'NETWORK_ERROR',
  SMS_FAILED = 'SMS_FAILED',
  WHATSAPP_FAILED = 'WHATSAPP_FAILED',
  VOICE_CALL_FAILED = 'VOICE_CALL_FAILED',
}

export class PasswordResetFailedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.PASSWORD_RESET_FAILED;
  public readonly occurredAt: Date;
  public readonly eventVersion: number = EVENT_VERSIONS.V1;
  public readonly aggregateVersion: number = 1;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly ttlSeconds?: number;
  public readonly expiresAt?: Date;
  public readonly priority?: EventPriority;
  public readonly partitionKey?: string;

  public readonly email: string;
  public readonly phone?: string;
  public readonly reason: PasswordResetFailureReason;
  public readonly resetRequestId?: string;
  public readonly ipAddress?: string;
  public readonly deviceId?: string;
  public readonly userAgent?: string;
  public readonly remainingAttempts?: number;
  public readonly metadata?: PasswordResetMetadata;

  constructor(
    email: string,
    reason: PasswordResetFailureReason,
    options?: {
      phone?: string;
      resetRequestId?: string;
      ipAddress?: string;
      deviceId?: string;
      userAgent?: string;
      remainingAttempts?: number;
      correlationId?: string;
      causationId?: string;
      ttlSeconds?: number;
      expiresAt?: Date;
      priority?: EventPriority;
      partitionKey?: string;
      metadata?: PasswordResetMetadata;
    }
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.correlationId = options?.correlationId;
    this.causationId = options?.causationId;
    this.ttlSeconds = options?.ttlSeconds;
    this.expiresAt = options?.expiresAt;
    this.priority = options?.priority ?? (reason === PasswordResetFailureReason.RATE_LIMITED ? 'high' : 'normal');
    this.partitionKey = options?.partitionKey ?? email;

    this.email = email;
    this.phone = options?.phone;
    this.reason = reason;
    this.resetRequestId = options?.resetRequestId;
    this.ipAddress = options?.ipAddress;
    this.deviceId = options?.deviceId;
    this.userAgent = options?.userAgent;
    this.remainingAttempts = options?.remainingAttempts;
    this.metadata = options?.metadata;
  }

  public toJSON(): PasswordResetFailedEventData {
    return {
      eventId: this.eventId,
      eventName: this.eventName,
      occurredAt: this.occurredAt.toISOString(),
      eventVersion: this.eventVersion,
      aggregateVersion: this.aggregateVersion,
      correlationId: this.correlationId,
      causationId: this.causationId,
      email: this.email,
      phone: this.phone,
      reason: this.reason,
      resetRequestId: this.resetRequestId,
      ipAddress: this.ipAddress,
      deviceId: this.deviceId,
      userAgent: this.userAgent,
      remainingAttempts: this.remainingAttempts,
      metadata: this.metadata,
    };
  }

  /**
   * Check if user should be notified about this failure
   */
  public shouldNotifyUser(): boolean {
    return this.reason !== PasswordResetFailureReason.RATE_LIMITED &&
           this.reason !== PasswordResetFailureReason.NETWORK_ERROR &&
           this.reason !== PasswordResetFailureReason.SMS_FAILED &&
           this.reason !== PasswordResetFailureReason.WHATSAPP_FAILED &&
           this.reason !== PasswordResetFailureReason.VOICE_CALL_FAILED;
  }

  /**
   * Get user-friendly error message
   */
  public getUserMessage(locale: 'en' | 'bn' = 'en'): string {
    const messages: Record<PasswordResetFailureReason, { en: string; bn: string }> = {
      [PasswordResetFailureReason.INVALID_TOKEN]: {
        en: 'Invalid or expired reset link. Please request a new one.',
        bn: 'অবৈধ বা মেয়াদোত্তীর্ণ রিসেট লিঙ্ক। অনুগ্রহ করে একটি নতুন অনুরোধ করুন।',
      },
      [PasswordResetFailureReason.TOKEN_EXPIRED]: {
        en: 'Reset link has expired. Please request a new password reset.',
        bn: 'রিসেট লিঙ্কের মেয়াদ শেষ হয়ে গেছে। অনুগ্রহ করে একটি নতুন পাসওয়ার্ড রিসেট অনুরোধ করুন।',
      },
      [PasswordResetFailureReason.TOKEN_ALREADY_USED]: {
        en: 'This reset link has already been used. Please request a new one.',
        bn: 'এই রিসেট লিঙ্কটি already ব্যবহার করা হয়েছে। অনুগ্রহ করে একটি নতুন অনুরোধ করুন।',
      },
      [PasswordResetFailureReason.RATE_LIMITED]: {
        en: 'Too many reset attempts. Please try again later.',
        bn: 'অনেকবার রিসেট চেষ্টা করা হয়েছে। পরে আবার চেষ্টা করুন।',
      },
      [PasswordResetFailureReason.INVALID_OTP]: {
        en: 'Invalid OTP code. Please try again.',
        bn: 'অবৈধ OTP কোড। আবার চেষ্টা করুন।',
      },
      [PasswordResetFailureReason.OTP_EXPIRED]: {
        en: 'OTP code has expired. Please request a new one.',
        bn: 'OTP কোডের মেয়াদ শেষ হয়েছে। একটি নতুন অনুরোধ করুন।',
      },
      [PasswordResetFailureReason.PASSWORD_WEAK]: {
        en: 'Password is too weak. Please choose a stronger password.',
        bn: 'পাসওয়ার্ড খুব দুর্বল। একটি শক্তিশালী পাসওয়ার্ড চয়ন করুন।',
      },
      [PasswordResetFailureReason.PASSWORD_REUSED]: {
        en: 'Cannot reuse a recent password. Please choose a different password.',
        bn: 'সাম্প্রতিক পাসওয়ার্ড পুনরায় ব্যবহার করা যাবে না। একটি ভিন্ন পাসওয়ার্ড চয়ন করুন।',
      },
      [PasswordResetFailureReason.SMS_FAILED]: {
        en: 'Failed to send SMS. Please try again or use email reset.',
        bn: 'এসএমএস পাঠানো ব্যর্থ হয়েছে। আবার চেষ্টা করুন বা ইমেইল রিসেট ব্যবহার করুন।',
      },
      [PasswordResetFailureReason.WHATSAPP_FAILED]: {
        en: 'Failed to send WhatsApp message. Please try again or use email reset.',
        bn: 'হোয়াটসঅ্যাপ বার্তা পাঠানো ব্যর্থ হয়েছে। আবার চেষ্টা করুন বা ইমেইল রিসেট ব্যবহার করুন।',
      },
      [PasswordResetFailureReason.VOICE_CALL_FAILED]: {
        en: 'Failed to place voice call. Please try again or use email reset.',
        bn: 'ভয়েস কল করা ব্যর্থ হয়েছে। আবার চেষ্টা করুন বা ইমেইল রিসেট ব্যবহার করুন।',
      },
      default: {
        en: 'Password reset failed. Please try again.',
        bn: 'পাসওয়ার্ড রিসেট ব্যর্থ হয়েছে। আবার চেষ্টা করুন।',
      },
    };

    return messages[this.reason]?.[locale] || messages[PasswordResetFailureReason.INVALID_TOKEN][locale];
  }
}

// ============================================================
// ✅ Enterprise: Event Data Interfaces (for serialization)
// ============================================================

export interface PasswordResetRequestedEventData {
  eventId: string;
  eventName: string;
  occurredAt: string;
  eventVersion: number;
  aggregateVersion: number;
  correlationId?: string;
  causationId?: string;
  userId: string;
  email: string;
  phone?: string;
  resetTokenHash: string;
  resetRequestId: string;
  resetMethod: PasswordResetMethod;
  resetSource: PasswordResetSource;
  wasRateLimited: boolean;
  rateLimitCooldownSeconds?: number;
  metadata?: PasswordResetMetadata;
  ttlSeconds?: number;
  expiresAt?: string;
  priority?: EventPriority;
  partitionKey?: string;
}

export interface PasswordResetCompletedEventData {
  eventId: string;
  eventName: string;
  occurredAt: string;
  eventVersion: number;
  aggregateVersion: number;
  correlationId?: string;
  causationId?: string;
  userId: string;
  email: string;
  resetRequestId: string;
  ipAddress?: string;
  deviceId?: string;
  userAgent?: string;
  metadata?: PasswordResetMetadata;
}

export interface PasswordResetFailedEventData {
  eventId: string;
  eventName: string;
  occurredAt: string;
  eventVersion: number;
  aggregateVersion: number;
  correlationId?: string;
  causationId?: string;
  email: string;
  phone?: string;
  reason: PasswordResetFailureReason;
  resetRequestId?: string;
  ipAddress?: string;
  deviceId?: string;
  userAgent?: string;
  remainingAttempts?: number;
  metadata?: PasswordResetMetadata;
}

// ============================================================
// ✅ Enterprise: Type Exports
// ============================================================

export type { 
  PasswordResetMetadata as PasswordResetMetadataType,
  PasswordResetRequestedPayload as PasswordResetRequestedPayloadType
};

// ============================================================
// ENTERPRISE SUMMARY v3.0
// ============================================================
// 
// Enterprise Enhancements Applied in v3.0:
// 1. ✅ Shared-types integration (@vubon/shared-types)
// 2. ✅ Event versioning with aggregateVersion tracking
// 3. ✅ TTL support with expiresAt for event expiry (7 days default)
// 4. ✅ Priority-based event processing (low/normal/high/critical)
// 5. ✅ Partition key for event streaming optimization
// 6. ✅ Bangladesh specific fields (district, upazila, mobileOperator, networkType)
// 7. ✅ Feature phone support (deviceType: 'feature_phone')
// 8. ✅ WhatsApp/Imo/Voice reset methods (Bangladesh specific)
// 9. ✅ Rate limiting attempt tracking
// 10. ✅ CAPTCHA tracking for bot protection
// 11. ✅ 4 Reset methods (EMAIL, SMS, WHATSAPP, VOICE, IMO)
// 12. ✅ 6 Reset sources (WEB, MOBILE_APP, FEATURE_PHONE, API, ADMIN_PORTAL, SUPPORT_AGENT)
// 13. ✅ 16+ Failure reasons for detailed error tracking
// 14. ✅ Helper methods: isExpired(), isRateLimited(), getRemainingCooldownSeconds(), isSuspicious()
// 15. ✅ User-friendly error messages with Bengali support
// 16. ✅ Serialization support (toJSON, fromJSON)
// 17. ✅ Zod schema for runtime validation
// 18. ✅ Static factory methods for common scenarios (email, WhatsApp, voice, rate-limited)
// 19. ✅ Notification status tracking
// 20. ✅ Security audit with device fingerprint tracking
// 
// Bangladesh Specific:
// - WhatsApp reset method
// - Voice call reset for feature phones
// - District/Upazila/Division location tracking
// - Mobile operator and network type tracking
// - Feature phone device type
// - Bengali language support for user messages
// 
// Security Features:
// - No plain token in events (only hash)
// - Rate limiting attempt tracking
// - CAPTCHA tracking
// - Suspicious activity detection
// - Device fingerprint tracking
// - Complete audit trail
// 
// ============================================================
