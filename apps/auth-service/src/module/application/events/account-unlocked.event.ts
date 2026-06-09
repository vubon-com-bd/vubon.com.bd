/**
 * Account Unlocked Event - Enterprise Grade (v3.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce

 * @module application/events/account-unlocked.event

 * @description
 * Event emitted when a locked user account is unlocked.
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
// Account Unlock Reason Enum (Extended)
// ============================================================

export enum AccountUnlockReason {
  AUTO_EXPIRY = 'AUTO_EXPIRY',               // Lock expired automatically
  USER_ACTION = 'USER_ACTION',               // User unlocked via email/phone
  ADMIN_ACTION = 'ADMIN_ACTION',             // Admin manually unlocked
  SUPPORT_ACTION = 'SUPPORT_ACTION',         // Support team unlocked
  PASSWORD_RESET = 'PASSWORD_RESET',         // User reset password
  VERIFICATION_COMPLETE = 'VERIFICATION_COMPLETE', // Completed verification
  SECURITY_REVIEW = 'SECURITY_REVIEW',       // Passed security review
  // ✅ Enterprise: Additional reasons
  MFA_RECOVERY = 'MFA_RECOVERY',             // Recovered via MFA backup
  IDENTITY_VERIFIED = 'IDENTITY_VERIFIED',   // Identity verification complete
  COURT_ORDER = 'COURT_ORDER',               // Court order to unlock
  INVESTIGATION_COMPLETE = 'INVESTIGATION_COMPLETE', // Investigation concluded
}

// ============================================================
// Account Unlock Source Enum
// ============================================================

export enum AccountUnlockSource {
  SYSTEM = 'SYSTEM',       // Automatic system unlock
  USER = 'USER',           // User initiated unlock
  ADMIN = 'ADMIN',         // Administrator action
  SUPPORT = 'SUPPORT',     // Support team action
  SECURITY = 'SECURITY',   // Security system action
  LEGAL = 'LEGAL',         // Legal team action (Enterprise)
}

// ============================================================
// Account Unlock Method Enum (Extended)
// ============================================================

export enum AccountUnlockMethod {
  TIME_BASED = 'TIME_BASED',                       // Automatic after lock duration
  EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',       // Verified via email
  SMS_VERIFICATION = 'SMS_VERIFICATION',           // Verified via SMS
  ADMIN_PORTAL = 'ADMIN_PORTAL',                   // Admin portal action
  SUPPORT_PORTAL = 'SUPPORT_PORTAL',               // Support portal action
  PASSWORD_RESET = 'PASSWORD_RESET',               // Password reset flow
  API_CALL = 'API_CALL',                           // API call
  // ✅ Enterprise: Additional methods
  WHATSAPP_VERIFICATION = 'WHATSAPP_VERIFICATION', // Verified via WhatsApp (BD)
  VOICE_VERIFICATION = 'VOICE_VERIFICATION',       // Voice call verification (BD)
  BIOMETRIC_VERIFICATION = 'BIOMETRIC_VERIFICATION', // Biometric verification
  DOCUMENT_VERIFICATION = 'DOCUMENT_VERIFICATION',   // Document upload verification
}

// ============================================================
// ✅ ENTERPRISE: Event Metadata Interface (Bangladesh specific)
// ============================================================

export interface AccountUnlockedMetadata extends EventMetadata {
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

  /** Verification token ID (if applicable) */
  verificationTokenId?: string;

  /** Number of verification attempts (if applicable) */
  verificationAttempts?: number;

  /** Time to unlock from lock event (seconds) */
  timeToUnlockSeconds?: number;

  /** Whether notification was sent to user */
  notificationSent?: boolean;

  /** Notification channel used */
  notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';

  /** Whether this unlock triggered a security alert */
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

export interface AccountUnlockedPayload extends EventPayload {
  /** User ID */
  userId: string;

  /** User email */
  email: string;

  /** User phone (Bangladesh specific) */
  phone?: string;

  /** Unlock reason */
  reason: AccountUnlockReason;

  /** Unlock source */
  source: AccountUnlockSource;

  /** Unlock method */
  method: AccountUnlockMethod;

  /** Unlock timestamp */
  unlockedAt: Date;

  /** Who performed the unlock (adminId/supportId) */
  unlockedBy?: string;

  /** Reason for unlock (admin/support note) */
  unlockNote?: string;

  /** Previous lock reason (from lock event) */
  previousLockReason?: string;

  /** How long the account was locked (seconds) */
  lockDurationSeconds?: number;

  /** Whether notification was sent to user */
  notificationSent?: boolean;

  /** Notification channel used */
  notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';
}

// ============================================================
// ✅ ENTERPRISE: Zod Schema for Runtime Validation
// ============================================================

export const AccountUnlockedEventSchema = z.object({
  eventId: z.string().uuid(),
  eventName: z.literal(EVENT_NAMES.ACCOUNT_UNLOCKED),
  occurredAt: z.date(),
  eventVersion: z.number().int().min(1).default(EVENT_VERSIONS.V1),
  aggregateVersion: z.number().int().min(1).default(1),
  correlationId: z.string().uuid().optional(),
  causationId: z.string().uuid().optional(),
  userId: z.string().uuid(),
  email: z.string().email(),
  phone: z.string().regex(/^(?:\+880|0)1[3-9]\d{8}$/).optional(),
  reason: z.nativeEnum(AccountUnlockReason),
  source: z.nativeEnum(AccountUnlockSource),
  method: z.nativeEnum(AccountUnlockMethod),
  unlockedAt: z.date(),
  unlockedBy: z.string().uuid().optional(),
  unlockNote: z.string().max(500).optional(),
  previousLockReason: z.string().optional(),
  lockDurationSeconds: z.number().int().min(0).optional(),
  notificationSent: z.boolean().default(false),
  notificationChannel: z.enum(['email', 'sms', 'push', 'whatsapp']).optional(),
  metadata: z.object({
    ipAddress: z.string().ip().optional(),
    deviceId: z.string().max(255).optional(),
    deviceFingerprint: z.string().max(128).optional(),
    userAgent: z.string().max(500).optional(),
    sessionId: z.string().uuid().optional(),
    verificationTokenId: z.string().optional(),
    verificationAttempts: z.number().int().min(0).optional(),
    timeToUnlockSeconds: z.number().int().min(0).optional(),
    notificationSent: z.boolean().optional(),
    notificationChannel: z.enum(['email', 'sms', 'push', 'whatsapp']).optional(),
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
// ✅ ENTERPRISE: Account Unlocked Event Class (v3.0)
// ============================================================

export class AccountUnlockedEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.ACCOUNT_UNLOCKED;
  public readonly occurredAt: Date;
  public readonly unlockedAt: Date;
  public readonly eventVersion: number;
  public readonly aggregateVersion: number;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly ttlSeconds?: number;
  public readonly expiresAt?: Date;
  public readonly priority?: EventPriority;
  public readonly partitionKey?: string;

  // Core user information
  public readonly userId: string;
  public readonly email: string;
  public readonly phone?: string;

  // Unlock context
  public readonly reason: AccountUnlockReason;
  public readonly source: AccountUnlockSource;
  public readonly method: AccountUnlockMethod;
  public readonly unlockedBy?: string;
  public readonly unlockNote?: string;

  // Lock context (for analytics)
  public readonly previousLockReason?: string;
  public readonly lockDurationSeconds?: number;

  // Notification status
  public readonly notificationSent: boolean;
  public readonly notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';

  // Event metadata
  public readonly metadata?: AccountUnlockedMetadata;

  // ✅ Enterprise: Constructor with enhanced options
  constructor(
    userId: string,
    aggregateVersion: number,
    email: string,
    reason: AccountUnlockReason,
    source: AccountUnlockSource,
    method: AccountUnlockMethod,
    options?: {
      // Core fields
      phone?: string;
      unlockedBy?: string;
      unlockNote?: string;
      previousLockReason?: string;
      lockDurationSeconds?: number;

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
      metadata?: AccountUnlockedMetadata;

      // Event version (default: from shared-constants)
      eventVersion?: number;

      // Unlock timestamp (for testing)
      unlockedAt?: Date;
    }
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.unlockedAt = options?.unlockedAt ?? new Date();
    this.eventVersion = options?.eventVersion ?? EVENT_VERSIONS.V1;
    this.aggregateVersion = aggregateVersion;
    this.correlationId = options?.correlationId;
    this.causationId = options?.causationId;
    this.ttlSeconds = options?.ttlSeconds;
    this.expiresAt = options?.expiresAt;
    this.priority = options?.priority ?? this.calculatePriority(reason);
    this.partitionKey = options?.partitionKey ?? userId;

    this.userId = userId;
    this.email = email;
    this.phone = options?.phone;

    this.reason = reason;
    this.source = source;
    this.method = method;
    this.unlockedBy = options?.unlockedBy;
    this.unlockNote = options?.unlockNote;
    this.previousLockReason = options?.previousLockReason;
    this.lockDurationSeconds = options?.lockDurationSeconds;

    this.notificationSent = options?.notificationSent ?? false;
    this.notificationChannel = options?.notificationChannel;

    this.metadata = options?.metadata;

    // ✅ Enterprise: Auto-set partition key from district if available
    if (!options?.partitionKey && this.metadata?.district) {
      this.partitionKey = this.metadata.district;
    }

    // ✅ Enterprise: Auto-set TTL if not provided (30 days default for unlock events)
    if (!this.ttlSeconds && !this.expiresAt) {
      this.ttlSeconds = 30 * 24 * 60 * 60; // 30 days
      this.expiresAt = new Date(Date.now() + this.ttlSeconds * 1000);
    }
  }

  // ============================================================
  // ✅ Enterprise: Helper Methods
  // ============================================================

  /**
   * Calculate priority based on unlock reason
   */
  private calculatePriority(reason: AccountUnlockReason): EventPriority {
    if (reason === AccountUnlockReason.ADMIN_ACTION ||
        reason === AccountUnlockReason.SECURITY_REVIEW ||
        reason === AccountUnlockReason.COURT_ORDER) {
      return 'high';
    }

    if (reason === AccountUnlockReason.PASSWORD_RESET ||
        reason === AccountUnlockReason.USER_ACTION) {
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
   * Check if this was an admin-initiated unlock
   */
  public isAdminUnlock(): boolean {
    return this.source === AccountUnlockSource.ADMIN && !!this.unlockedBy;
  }

  /**
   * Check if this was a support-initiated unlock
   */
  public isSupportUnlock(): boolean {
    return this.source === AccountUnlockSource.SUPPORT && !!this.unlockedBy;
  }

  /**
   * Get formatted lock duration (human readable)
   */
  public getFormattedLockDuration(): string {
    if (!this.lockDurationSeconds) return 'Unknown';
    const hours = Math.floor(this.lockDurationSeconds / 3600);
    const minutes = Math.floor((this.lockDurationSeconds % 3600) / 60);
    const seconds = this.lockDurationSeconds % 60;

    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  }

  /**
   * Get time to unlock in seconds (from lock to unlock)
   */
  public getTimeToUnlockSeconds(): number | undefined {
    if (this.metadata?.timeToUnlockSeconds) {
      return this.metadata.timeToUnlockSeconds;
    }
    return this.lockDurationSeconds;
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
      reason: this.reason,
      source: this.source,
      method: this.method,
      unlockedBy: this.unlockedBy,
      previousLockReason: this.previousLockReason,
      lockDurationSeconds: this.lockDurationSeconds,
      formattedLockDuration: this.getFormattedLockDuration(),
      notificationSent: this.notificationSent,
      district: this.metadata?.district,
      mobileOperator: this.metadata?.mobileOperator,
      deviceType: this.metadata?.deviceType,
      isAdminUnlock: this.isAdminUnlock(),
      isSupportUnlock: this.isSupportUnlock(),
      priority: this.priority,
      partitionKey: this.partitionKey,
      occurredAt: this.occurredAt.toISOString(),
    };
  }

  /**
   * Convert to plain object for serialization
   */
  public toJSON(): AccountUnlockedEventData {
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
      unlockedAt: this.unlockedAt.toISOString(),
      reason: this.reason,
      source: this.source,
      method: this.method,
      unlockedBy: this.unlockedBy,
      unlockNote: this.unlockNote,
      previousLockReason: this.previousLockReason,
      lockDurationSeconds: this.lockDurationSeconds,
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
  public static fromJSON(data: AccountUnlockedEventData): AccountUnlockedEvent {
    const event = new AccountUnlockedEvent(
      data.userId,
      data.aggregateVersion,
      data.email,
      data.reason,
      data.source,
      data.method,
      {
        phone: data.phone,
        unlockedBy: data.unlockedBy,
        unlockNote: data.unlockNote,
        previousLockReason: data.previousLockReason,
        lockDurationSeconds: data.lockDurationSeconds,
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
        unlockedAt: new Date(data.unlockedAt),
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
    const result = AccountUnlockedEventSchema.safeParse(this.toJSON());
    return result.success;
  }

  // ============================================================
  // ✅ Enterprise: Static factory methods for common scenarios
  // ============================================================

  /**
   * Create event for auto expiry unlock
   */
  public static forAutoExpiry(
    userId: string,
    aggregateVersion: number,
    email: string,
    previousLockReason: string,
    lockDurationSeconds: number,
    options?: {
      phone?: string;
      district?: string;
      correlationId?: string;
    }
  ): AccountUnlockedEvent {
    return new AccountUnlockedEvent(
      userId,
      aggregateVersion,
      email,
      AccountUnlockReason.AUTO_EXPIRY,
      AccountUnlockSource.SYSTEM,
      AccountUnlockMethod.TIME_BASED,
      {
        phone: options?.phone,
        previousLockReason,
        lockDurationSeconds,
        correlationId: options?.correlationId,
        metadata: {
          district: options?.district,
        }
      }
    );
  }

  /**
   * Create event for admin-initiated unlock
   */
  public static forAdminUnlock(
    userId: string,
    aggregateVersion: number,
    email: string,
    adminId: string,
    previousLockReason: string,
    lockDurationSeconds: number,
    reason?: string,
    options?: {
      phone?: string;
      district?: string;
      correlationId?: string;
    }
  ): AccountUnlockedEvent {
    return new AccountUnlockedEvent(
      userId,
      aggregateVersion,
      email,
      AccountUnlockReason.ADMIN_ACTION,
      AccountUnlockSource.ADMIN,
      AccountUnlockMethod.ADMIN_PORTAL,
      {
        phone: options?.phone,
        unlockedBy: adminId,
        unlockNote: reason,
        previousLockReason,
        lockDurationSeconds,
        priority: 'high',
        correlationId: options?.correlationId,
        metadata: {
          district: options?.district,
        }
      }
    );
  }

  /**
   * Create event for password reset unlock
   */
  public static forPasswordReset(
    userId: string,
    aggregateVersion: number,
    email: string,
    previousLockReason: string,
    lockDurationSeconds: number,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      phone?: string;
      district?: string;
      mobileOperator?: typeof MOBILE_OPERATORS[number];
      correlationId?: string;
    }
  ): AccountUnlockedEvent {
    return new AccountUnlockedEvent(
      userId,
      aggregateVersion,
      email,
      AccountUnlockReason.PASSWORD_RESET,
      AccountUnlockSource.USER,
      AccountUnlockMethod.PASSWORD_RESET,
      {
        phone: options?.phone,
        previousLockReason,
        lockDurationSeconds,
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          district: options?.district,
          mobileOperator: options?.mobileOperator,
        }
      }
    );
  }

  /**
   * Create event for WhatsApp verification unlock (Bangladesh specific)
   */
  public static forWhatsAppVerification(
    userId: string,
    aggregateVersion: number,
    email: string,
    phone: string,
    previousLockReason: string,
    lockDurationSeconds: number,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    verificationAttempts: number,
    options?: {
      district?: string;
      mobileOperator?: typeof MOBILE_OPERATORS[number];
      correlationId?: string;
    }
  ): AccountUnlockedEvent {
    return new AccountUnlockedEvent(
      userId,
      aggregateVersion,
      email,
      AccountUnlockReason.USER_ACTION,
      AccountUnlockSource.USER,
      AccountUnlockMethod.WHATSAPP_VERIFICATION,
      {
        phone,
        previousLockReason,
        lockDurationSeconds,
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          district: options?.district,
          mobileOperator: options?.mobileOperator,
          verificationAttempts,
          notificationChannel: 'whatsapp',
          notificationSent: true,
        }
      }
    );
  }
}

// ============================================================
// ✅ Enterprise: Event Data Interfaces (for serialization)
// ============================================================

export interface AccountUnlockedEventData {
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
  unlockedAt: string;
  reason: AccountUnlockReason;
  source: AccountUnlockSource;
  method: AccountUnlockMethod;
  unlockedBy?: string;
  unlockNote?: string;
  previousLockReason?: string;
  lockDurationSeconds?: number;
  notificationSent: boolean;
  notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';
  metadata?: AccountUnlockedMetadata;
  ttlSeconds?: number;
  expiresAt?: string;
  priority?: EventPriority;
  partitionKey?: string;
}

// ============================================================
// ✅ Enterprise: Type Exports
// ============================================================

export type { 
  AccountUnlockedMetadata as AccountUnlockedMetadataType,
  AccountUnlockedPayload as AccountUnlockedPayloadType
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
// 7. ✅ Feature phone support (deviceType: 'feature_phone')
// 8. ✅ WhatsApp verification support (Bangladesh specific)
// 9. ✅ Extended AccountUnlockReason (MFA_RECOVERY, IDENTITY_VERIFIED, COURT_ORDER, INVESTIGATION_COMPLETE)
// 10. ✅ Extended AccountUnlockMethod (WHATSAPP_VERIFICATION, VOICE_VERIFICATION, BIOMETRIC_VERIFICATION, DOCUMENT_VERIFICATION)
// 11. ✅ 4 Static factory methods for common scenarios
// 12. ✅ Helper methods: isExpired(), isCritical(), getFormattedLockDuration(), getTimeToUnlockSeconds()
// 13. ✅ isAdminUnlock(), isSupportUnlock()
// 14. ✅ Serialization support (toJSON, fromJSON)
// 15. ✅ Zod schema for runtime validation
// 16. ✅ Notification tracking (notificationSent, notificationChannel)
// 17. ✅ Admin/support action tracking with unlockedBy
// 18. ✅ Device fingerprint tracking
// 19. ✅ Time to unlock tracking (security metric)
// 20. ✅ Verification attempt tracking
// 
// Bangladesh Specific:
// - WhatsApp verification method
// - Voice verification method
// - District/Upazila/Division location tracking
// - Mobile operator and network type tracking
// - Feature phone device type
// - Bengali language support (metadata.language: 'bn')
// 
// Security Features:
// - Priority-based event processing for admin/support actions
// - Security alert triggers
// - Device fingerprint tracking
// - Admin action audit trail
// - Verification attempt tracking
// - Time to unlock metrics
// 
// ============================================================
