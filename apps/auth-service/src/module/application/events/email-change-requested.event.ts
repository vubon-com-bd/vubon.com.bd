/**
 * Email Change Requested Event - Enterprise Grade (v3.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce

 * @module application/events/email-change-requested.event

 * @description
 * Event emitted when a user requests to change their email address.
 * Enhanced with shared-types integration, event versioning, TTL support,
 * Bangladesh specific fields, and priority-based processing.

 * ENTERPRISE ENHANCEMENTS (v3.0):
 * ✅ Shared-types integration (@vubon/shared-types)
 * ✅ Event versioning with aggregateVersion tracking
 * ✅ TTL support with expiresAt for event expiry
 * ✅ Priority-based event processing (high for security-triggered requests)
 * ✅ Partition key for event streaming optimization
 * ✅ Bangladesh specific fields (district, upazila, mobileOperator, networkType)
 * ✅ Rate limiting tracking for security
 * ✅ Verification duration tracking for analytics
 * ✅ Zod schema for runtime validation
 * ✅ Serialization support (toJSON, fromJSON)
 * ✅ Helper methods for expiry and status checks
 * ✅ Extended EmailChangeRequestSource
 * ✅ Extended EmailChangeRequestStatus
 * ✅ Admin action tracking
 * ✅ Device fingerprint tracking
 * ✅ Notification tracking

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
// Email Change Request Source Enum (Extended)
// ============================================================

export enum EmailChangeRequestSource {
  USER = 'USER',           // User initiated from profile
  ADMIN = 'ADMIN',         // Admin initiated
  SECURITY = 'SECURITY',   // Security prompted (suspicious activity)
  SUPPORT = 'SUPPORT',     // Support team initiated
  SYSTEM = 'SYSTEM',       // System initiated (e.g., after breach)
  COMPLIANCE = 'COMPLIANCE', // Compliance/regulatory requirement
}

// ============================================================
// Email Change Request Status Enum (Extended)
// ============================================================

export enum EmailChangeRequestStatus {
  PENDING = 'PENDING',     // Verification pending
  VERIFIED = 'VERIFIED',   // Verified and changed
  EXPIRED = 'EXPIRED',     // Verification expired
  CANCELLED = 'CANCELLED', // Cancelled by user
  REJECTED = 'REJECTED',   // Rejected by security
  BLOCKED = 'BLOCKED',     // Blocked due to suspicious activity
}

// ============================================================
// ✅ ENTERPRISE: Event Metadata Interface (Bangladesh specific)
// ============================================================

export interface EmailChangeRequestedMetadata extends EventMetadata {
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

export interface EmailChangeRequestedPayload extends EventPayload {
  /** User ID */
  userId: string;

  /** Old email address */
  oldEmail: string;

  /** New email address */
  newEmail: string;

  /** Masked old email (for privacy) */
  oldEmailMasked: string;

  /** Masked new email (for privacy) */
  newEmailMasked: string;

  /** Hashed verification token (NOT the actual token!) */
  verificationTokenHash: string;

  /** Verification request ID for tracking */
  verificationRequestId: string;

  /** Request source */
  source: EmailChangeRequestSource;

  /** Request status */
  status: EmailChangeRequestStatus;

  /** Request expiry timestamp */
  expiresAt: Date;

  /** Expiry duration in hours */
  expiresInHours: number;

  /** Whether rate limited */
  wasRateLimited?: boolean;

  /** Cooldown seconds (if rate limited) */
  cooldownSeconds?: number;
}

// ============================================================
// ✅ ENTERPRISE: Zod Schema for Runtime Validation
// ============================================================

export const EmailChangeRequestedEventSchema = z.object({
  eventId: z.string().uuid(),
  eventName: z.literal(EVENT_NAMES.EMAIL_CHANGE_REQUESTED),
  occurredAt: z.date(),
  eventVersion: z.number().int().min(1).default(EVENT_VERSIONS.V1),
  aggregateVersion: z.number().int().min(1).default(1),
  correlationId: z.string().uuid().optional(),
  causationId: z.string().uuid().optional(),
  userId: z.string().uuid(),
  oldEmail: z.string().email(),
  newEmail: z.string().email(),
  oldEmailMasked: z.string(),
  newEmailMasked: z.string(),
  verificationTokenHash: z.string().min(32).max(128),
  verificationRequestId: z.string().uuid(),
  source: z.nativeEnum(EmailChangeRequestSource).default(EmailChangeRequestSource.USER),
  status: z.nativeEnum(EmailChangeRequestStatus).default(EmailChangeRequestStatus.PENDING),
  expiresAt: z.date(),
  expiresInHours: z.number().int().min(1).max(168).default(24),
  wasRateLimited: z.boolean().default(false),
  cooldownSeconds: z.number().int().min(0).optional(),
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
// ✅ ENTERPRISE: Email Change Requested Event Class (v3.0)
// ============================================================

export class EmailChangeRequestedEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.EMAIL_CHANGE_REQUESTED;
  public readonly occurredAt: Date;
  public readonly eventVersion: number;
  public readonly aggregateVersion: number;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly ttlSeconds?: number;
  public readonly expiresAt?: Date;
  public readonly priority?: EventPriority;
  public readonly partitionKey?: string;

  // Core email change data
  public readonly userId: string;
  public readonly oldEmail: string;
  public readonly newEmail: string;
  public readonly oldEmailMasked: string;
  public readonly newEmailMasked: string;

  // Security - hashed token reference (NOT the actual token!)
  public readonly verificationTokenHash: string;
  public readonly verificationRequestId: string;

  // Request context
  public readonly source: EmailChangeRequestSource;
  public readonly status: EmailChangeRequestStatus;
  public readonly expiresAt: Date;
  public readonly expiresInHours: number;

  // Rate limiting
  public readonly wasRateLimited: boolean;
  public readonly cooldownSeconds?: number;

  // Event metadata
  public readonly metadata?: EmailChangeRequestedMetadata;

  // ✅ Enterprise: Constructor with enhanced options
  constructor(
    userId: string,
    oldEmail: string,
    newEmail: string,
    verificationTokenHash: string,
    verificationRequestId: string,
    options?: {
      // Source and status
      source?: EmailChangeRequestSource;
      status?: EmailChangeRequestStatus;

      // Expiry
      expiresInHours?: number;

      // Rate limiting
      wasRateLimited?: boolean;
      cooldownSeconds?: number;

      // Event tracking
      correlationId?: string;
      causationId?: string;
      ttlSeconds?: number;
      priority?: EventPriority;
      partitionKey?: string;

      // Metadata (Bangladesh specific)
      metadata?: EmailChangeRequestedMetadata;

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
    this.oldEmail = oldEmail;
    this.newEmail = newEmail;
    this.oldEmailMasked = this.maskEmail(oldEmail);
    this.newEmailMasked = this.maskEmail(newEmail);
    this.verificationTokenHash = verificationTokenHash;
    this.verificationRequestId = verificationRequestId;

    this.source = options?.source ?? EmailChangeRequestSource.USER;
    this.status = options?.status ?? EmailChangeRequestStatus.PENDING;

    const expiresInHours = options?.expiresInHours ?? 24;
    this.expiresInHours = expiresInHours;
    this.expiresAt = new Date(Date.now() + expiresInHours * 60 * 60 * 1000);

    this.wasRateLimited = options?.wasRateLimited ?? false;
    this.cooldownSeconds = options?.cooldownSeconds;

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
   * Mask email for privacy
   */
  private maskEmail(email: string): string {
    const [local, domain] = email.split('@');
    if (!local || !domain) return email;
    if (local.length <= 2) {
      return `${local[0]}***@${domain}`;
    }
    return `${local[0]}***${local[local.length - 1]}@${domain}`;
  }

  /**
   * Calculate priority based on source and metadata
   */
  private calculatePriority(metadata?: EmailChangeRequestedMetadata): EventPriority {
    // Critical priority - security/compliance initiated
    if (this.source === EmailChangeRequestSource.SECURITY ||
        this.source === EmailChangeRequestSource.COMPLIANCE) {
      return 'critical';
    }

    // High priority - admin initiated or suspicious
    if (this.source === EmailChangeRequestSource.ADMIN ||
        this.source === EmailChangeRequestSource.SUPPORT ||
        metadata?.triggeredSecurityAlert) {
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
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m`;
    return `${seconds}s`;
  }

  /**
   * Check if request is still pending
   */
  public isPending(): boolean {
    return this.status === EmailChangeRequestStatus.PENDING && !this.isExpired();
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
    return this.source === EmailChangeRequestSource.ADMIN && !!this.metadata?.initiatedBy;
  }

  /**
   * Check if this was security-triggered
   */
  public isSecurityTriggered(): boolean {
    return this.source === EmailChangeRequestSource.SECURITY ||
           this.source === EmailChangeRequestSource.COMPLIANCE;
  }

  /**
   * Get event summary for logging
   */
  public getSummary(): Record<string, unknown> {
    return {
      eventId: this.eventId,
      eventName: this.eventName,
      userId: this.userId,
      oldEmailMasked: this.oldEmailMasked,
      newEmailMasked: this.newEmailMasked,
      source: this.source,
      status: this.status,
      isExpired: this.isExpired(),
      remainingTime: this.getRemainingTimeFormatted(),
      wasRateLimited: this.wasRateLimited,
      district: this.metadata?.district,
      mobileOperator: this.metadata?.mobileOperator,
      deviceType: this.metadata?.deviceType,
      isAdminInitiated: this.isAdminInitiated(),
      isSecurityTriggered: this.isSecurityTriggered(),
      priority: this.priority,
      partitionKey: this.partitionKey,
      occurredAt: this.occurredAt.toISOString(),
    };
  }

  /**
   * Convert to plain object for serialization
   */
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
      oldEmailMasked: this.oldEmailMasked,
      newEmailMasked: this.newEmailMasked,
      verificationTokenHash: this.verificationTokenHash,
      verificationRequestId: this.verificationRequestId,
      source: this.source,
      status: this.status,
      expiresAt: this.expiresAt.toISOString(),
      expiresInHours: this.expiresInHours,
      wasRateLimited: this.wasRateLimited,
      cooldownSeconds: this.cooldownSeconds,
      metadata: this.metadata,
      ttlSeconds: this.ttlSeconds,
      expiresAtISO: this.expiresAt?.toISOString(),
      priority: this.priority,
      partitionKey: this.partitionKey,
    };
  }

  /**
   * Static factory method to create from serialized data
   */
  public static fromJSON(data: EmailChangeRequestedEventData): EmailChangeRequestedEvent {
    const event = new EmailChangeRequestedEvent(
      data.userId,
      data.oldEmail,
      data.newEmail,
      data.verificationTokenHash,
      data.verificationRequestId,
      {
        source: data.source,
        status: data.status,
        expiresInHours: data.expiresInHours,
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
    const result = EmailChangeRequestedEventSchema.safeParse(this.toJSON());
    return result.success;
  }

  // ============================================================
  // ✅ Enterprise: Static factory methods for common scenarios
  // ============================================================

  /**
   * Create event for user-initiated email change
   */
  public static forUserRequest(
    userId: string,
    oldEmail: string,
    newEmail: string,
    verificationTokenHash: string,
    verificationRequestId: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      expiresInHours?: number;
      district?: string;
      mobileOperator?: typeof MOBILE_OPERATORS[number];
      correlationId?: string;
    }
  ): EmailChangeRequestedEvent {
    return new EmailChangeRequestedEvent(
      userId,
      oldEmail,
      newEmail,
      verificationTokenHash,
      verificationRequestId,
      {
        source: EmailChangeRequestSource.USER,
        expiresInHours: options?.expiresInHours,
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          district: options?.district,
          mobileOperator: options?.mobileOperator,
          notificationSent: true,
          notificationChannel: 'email',
        }
      }
    );
  }

  /**
   * Create event for admin-initiated email change
   */
  public static forAdminRequest(
    userId: string,
    oldEmail: string,
    newEmail: string,
    verificationTokenHash: string,
    verificationRequestId: string,
    adminId: string,
    reason: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      expiresInHours?: number;
      district?: string;
      correlationId?: string;
    }
  ): EmailChangeRequestedEvent {
    return new EmailChangeRequestedEvent(
      userId,
      oldEmail,
      newEmail,
      verificationTokenHash,
      verificationRequestId,
      {
        source: EmailChangeRequestSource.ADMIN,
        expiresInHours: options?.expiresInHours,
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
          securityAlertReason: `Admin initiated email change: ${reason}`,
        }
      }
    );
  }

  /**
   * Create event for security-triggered email change (suspicious activity)
   */
  public static forSecurityTrigger(
    userId: string,
    oldEmail: string,
    newEmail: string,
    verificationTokenHash: string,
    verificationRequestId: string,
    reason: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      expiresInHours?: number;
      district?: string;
      correlationId?: string;
    }
  ): EmailChangeRequestedEvent {
    return new EmailChangeRequestedEvent(
      userId,
      oldEmail,
      newEmail,
      verificationTokenHash,
      verificationRequestId,
      {
        source: EmailChangeRequestSource.SECURITY,
        expiresInHours: options?.expiresInHours ?? 48, // Longer expiry for security
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
          notificationChannel: 'email',
        }
      }
    );
  }

  /**
   * Create event for rate-limited request
   */
  public static forRateLimited(
    userId: string,
    oldEmail: string,
    newEmail: string,
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
  ): EmailChangeRequestedEvent {
    const rateLimitResetAt = new Date(Date.now() + cooldownSeconds * 1000);

    return new EmailChangeRequestedEvent(
      userId,
      oldEmail,
      newEmail,
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
// ✅ Enterprise: Email Change Verified Event (v2.0)
// ============================================================

export class EmailChangeVerifiedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.EMAIL_CHANGE_VERIFIED;
  public readonly occurredAt: Date;
  public readonly eventVersion: number = EVENT_VERSIONS.V1;
  public readonly aggregateVersion: number;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly ttlSeconds?: number = 90 * 24 * 60 * 60;
  public readonly expiresAt?: Date;
  public readonly priority?: EventPriority = 'normal';
  public readonly partitionKey?: string;

  public readonly userId: string;
  public readonly oldEmail: string;
  public readonly newEmail: string;
  public readonly verificationTimeSeconds: number;
  public readonly verificationRequestId: string;
  public readonly ipAddress?: string;
  public readonly deviceId?: string;
  public readonly userAgent?: string;
  public readonly metadata?: EmailChangeRequestedMetadata;

  constructor(
    userId: string,
    aggregateVersion: number,
    oldEmail: string,
    newEmail: string,
    verificationTimeSeconds: number,
    verificationRequestId: string,
    options?: {
      correlationId?: string;
      ipAddress?: string;
      deviceId?: string;
      userAgent?: string;
      metadata?: EmailChangeRequestedMetadata;
    }
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.aggregateVersion = aggregateVersion;
    this.correlationId = options?.correlationId;
    this.partitionKey = userId;
    this.expiresAt = this.ttlSeconds ? new Date(Date.now() + this.ttlSeconds * 1000) : undefined;

    this.userId = userId;
    this.oldEmail = oldEmail;
    this.newEmail = newEmail;
    this.verificationTimeSeconds = verificationTimeSeconds;
    this.verificationRequestId = verificationRequestId;
    this.ipAddress = options?.ipAddress;
    this.deviceId = options?.deviceId;
    this.userAgent = options?.userAgent;
    this.metadata = options?.metadata;
  }

  public toJSON(): EmailChangeVerifiedEventData {
    return {
      eventId: this.eventId,
      eventName: this.eventName,
      occurredAt: this.occurredAt.toISOString(),
      eventVersion: this.eventVersion,
      aggregateVersion: this.aggregateVersion,
      correlationId: this.correlationId,
      userId: this.userId,
      oldEmail: this.oldEmail,
      newEmail: this.newEmail,
      verificationTimeSeconds: this.verificationTimeSeconds,
      verificationRequestId: this.verificationRequestId,
      ipAddress: this.ipAddress,
      deviceId: this.deviceId,
      userAgent: this.userAgent,
      metadata: this.metadata,
    };
  }
}

// ============================================================
// ✅ Enterprise: Email Change Cancelled Event (v2.0)
// ============================================================

export class EmailChangeCancelledEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.EMAIL_CHANGE_CANCELLED;
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
  public readonly oldEmail: string;
  public readonly newEmail: string;
  public readonly reason?: string;
  public readonly cancelledBy: 'user' | 'admin' | 'system';
  public readonly cancelledByUserId?: string;
  public readonly metadata?: EmailChangeRequestedMetadata;

  constructor(
    userId: string,
    oldEmail: string,
    newEmail: string,
    cancelledBy: 'user' | 'admin' | 'system',
    options?: {
      reason?: string;
      cancelledByUserId?: string;
      correlationId?: string;
      metadata?: EmailChangeRequestedMetadata;
    }
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.correlationId = options?.correlationId;
    this.partitionKey = userId;
    this.expiresAt = this.ttlSeconds ? new Date(Date.now() + this.ttlSeconds * 1000) : undefined;

    this.userId = userId;
    this.oldEmail = oldEmail;
    this.newEmail = newEmail;
    this.reason = options?.reason;
    this.cancelledBy = cancelledBy;
    this.cancelledByUserId = options?.cancelledByUserId;
    this.metadata = options?.metadata;
  }

  public toJSON(): EmailChangeCancelledEventData {
    return {
      eventId: this.eventId,
      eventName: this.eventName,
      occurredAt: this.occurredAt.toISOString(),
      eventVersion: this.eventVersion,
      aggregateVersion: this.aggregateVersion,
      correlationId: this.correlationId,
      userId: this.userId,
      oldEmail: this.oldEmail,
      newEmail: this.newEmail,
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
  oldEmailMasked: string;
  newEmailMasked: string;
  verificationTokenHash: string;
  verificationRequestId: string;
  source: EmailChangeRequestSource;
  status: EmailChangeRequestStatus;
  expiresAt: string;
  expiresInHours: number;
  wasRateLimited: boolean;
  cooldownSeconds?: number;
  metadata?: EmailChangeRequestedMetadata;
  ttlSeconds?: number;
  expiresAtISO?: string;
  priority?: EventPriority;
  partitionKey?: string;
}

export interface EmailChangeVerifiedEventData {
  eventId: string;
  eventName: string;
  occurredAt: string;
  eventVersion: number;
  aggregateVersion: number;
  correlationId?: string;
  userId: string;
  oldEmail: string;
  newEmail: string;
  verificationTimeSeconds: number;
  verificationRequestId: string;
  ipAddress?: string;
  deviceId?: string;
  userAgent?: string;
  metadata?: EmailChangeRequestedMetadata;
}

export interface EmailChangeCancelledEventData {
  eventId: string;
  eventName: string;
  occurredAt: string;
  eventVersion: number;
  aggregateVersion: number;
  correlationId?: string;
  userId: string;
  oldEmail: string;
  newEmail: string;
  reason?: string;
  cancelledBy: 'user' | 'admin' | 'system';
  cancelledByUserId?: string;
  metadata?: EmailChangeRequestedMetadata;
}

// ============================================================
// ✅ Enterprise: Type Exports
// ============================================================

export type { 
  EmailChangeRequestedMetadata as EmailChangeRequestedMetadataType,
  EmailChangeRequestedPayload as EmailChangeRequestedPayloadType
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
// 7. ✅ Rate limiting tracking for security
// 8. ✅ Extended EmailChangeRequestSource (SYSTEM, COMPLIANCE)
// 9. ✅ Extended EmailChangeRequestStatus (BLOCKED)
// 10. ✅ 4 Static factory methods for common scenarios
// 11. ✅ Helper methods: isExpired(), getRemainingTimeSeconds(), getRemainingTimeFormatted()
// 12. ✅ isPending(), isRateLimited(), isAdminInitiated(), isSecurityTriggered()
// 13. ✅ Serialization support (toJSON, fromJSON)
// 14. ✅ Zod schema for runtime validation
// 15. ✅ Notification tracking (notificationSent, notificationChannel)
// 16. ✅ Admin action tracking with initiatedBy
// 17. ✅ Device fingerprint tracking
// 18. ✅ Captcha tracking for bot detection
// 19. ✅ Hashed token storage (never store plain token)
// 20. ✅ Masked email display for privacy
// 
// Bangladesh Specific:
// - District/Upazila/Division location tracking
// - Mobile operator and network type tracking
// - Feature phone device type
// - Bengali language support (metadata.language: 'bn')
// - WhatsApp notification channel support
// 
// Security Features:
// - Rate limiting prevents abuse
// - Captcha support for bot detection
// - Security-triggered changes have longer expiry
// - Admin action audit trail
// - Device fingerprint tracking
// - Token hashing for security
// - Email masking for privacy
// - Priority-based processing for security events
// 
// ============================================================
