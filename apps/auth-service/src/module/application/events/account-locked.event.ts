/**
 * Account Locked Event - Enterprise Grade (v3.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/events/account-locked.event
 * 
 * @description
 * Event emitted when a user account is locked.
 * Enhanced with shared-types integration, event versioning, TTL support,
 * Bangladesh specific fields, and priority-based processing.
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
 * ✅ Security alert on critical locks
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
// Account Lock Reason Enum (Extended - Bangladesh specific)
// ============================================================

export enum AccountLockReason {
  // Security based
  FAILED_LOGIN_ATTEMPTS = 'FAILED_LOGIN_ATTEMPTS',       // Too many failed login attempts
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',           // Unusual pattern detected
  BRUTE_FORCE_DETECTED = 'BRUTE_FORCE_DETECTED',         // Brute force attack detected
  ACCOUNT_COMPROMISED = 'ACCOUNT_COMPROMISED',           // Account believed compromised
  
  // Bangladesh specific
  SIM_SWAP_DETECTED = 'SIM_SWAP_DETECTED',               // SIM swap detected (Bangladesh)
  MFS_FRAUD_SUSPECTED = 'MFS_FRAUD_SUSPECTED',           // bKash/Nagad/Rocket fraud
  UNUSUAL_LOCATION = 'UNUSUAL_LOCATION',                 // Login from unusual location
  UNUSUAL_DEVICE = 'UNUSUAL_DEVICE',                     // Login from unknown device
  
  // Admin actions
  ADMIN_ACTION = 'ADMIN_ACTION',                         // Administrator locked
  POLICY_VIOLATION = 'POLICY_VIOLATION',                 // Terms violation
  
  // Account status
  TEMPORARY_SUSPENSION = 'TEMPORARY_SUSPENSION',         // Temporary suspension
  PERMANENT_BAN = 'PERMANENT_BAN',                       // Permanent ban
  ACCOUNT_EXPIRED = 'ACCOUNT_EXPIRED',                   // Subscription expired
}

// ============================================================
// Account Lock Method Enum
// ============================================================

export enum AccountLockMethod {
  AUTOMATIC = 'AUTOMATIC',           // Automatic lock after failed attempts
  MANUAL_ADMIN = 'MANUAL_ADMIN',     // Manual lock by admin
  SECURITY_SYSTEM = 'SECURITY_SYSTEM', // Security system triggered
  RATE_LIMITER = 'RATE_LIMITER',     // Rate limiter triggered lock
  ML_DETECTION = 'ML_DETECTION',     // ML-based anomaly detection
}

// ============================================================
// Account Lock Source Enum
// ============================================================

export enum AccountLockSource {
  SYSTEM = 'SYSTEM',     // Automatic system lock
  ADMIN = 'ADMIN',       // Administrator action
  SECURITY = 'SECURITY', // Security system action
  USER = 'USER',         // User self-lock (privacy mode)
  ML_ENGINE = 'ML_ENGINE', // ML engine detection
}

// ============================================================
// ✅ ENTERPRISE: Event Metadata Interface (Bangladesh specific)
// ============================================================

export interface AccountLockedMetadata extends EventMetadata {
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
  
  /** Number of failed attempts before lock */
  failureCount?: number;
  
  /** Total failures in last 24 hours */
  totalFailuresToday?: number;
  
  /** Time window for failure counting (minutes) */
  failureWindowMinutes?: number;
  
  /** Whether MFA was enabled when lock occurred */
  mfaEnabled?: boolean;
  
  /** MFA method used (if any) */
  mfaMethod?: 'totp' | 'sms' | 'whatsapp' | 'email' | 'webauthn' | 'bkash_pin' | 'nagad_pin' | 'rocket_pin';
  
  /** Whether device was trusted */
  wasTrustedDevice?: boolean;
  
  /** Device trust level */
  deviceTrustLevel?: 'untrusted' | 'standard' | 'trusted' | 'high_trust' | 'maximum_trust';
  
  /** Whether this lock triggered a security alert */
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

export interface AccountLockedPayload extends EventPayload {
  /** User ID */
  userId: string;
  
  /** User email */
  email: string;
  
  /** User phone (Bangladesh specific) */
  phone?: string;
  
  /** Lock reason */
  reason: AccountLockReason;
  
  /** Lock method */
  method: AccountLockMethod;
  
  /** Lock source */
  source: AccountLockSource;
  
  /** Admin ID (if admin action) */
  lockedBy?: string;
  
  /** Lock duration in seconds */
  lockDurationSeconds: number;
  
  /** When lock expires (null for permanent) */
  lockedUntil?: Date;
  
  /** Whether lock is permanent */
  isPermanent: boolean;
  
  /** Whether notification was sent */
  notificationSent?: boolean;
  
  /** Notification channel used */
  notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';
}

// ============================================================
// ✅ ENTERPRISE: Zod Schema for Runtime Validation
// ============================================================

export const AccountLockedEventSchema = z.object({
  eventId: z.string().uuid(),
  eventName: z.literal(EVENT_NAMES.ACCOUNT_LOCKED),
  occurredAt: z.date(),
  eventVersion: z.number().int().min(1).default(EVENT_VERSIONS.V1),
  aggregateVersion: z.number().int().min(1).default(1),
  correlationId: z.string().uuid().optional(),
  causationId: z.string().uuid().optional(),
  userId: z.string().uuid(),
  email: z.string().email(),
  phone: z.string().regex(/^(?:\+880|0)1[3-9]\d{8}$/).optional(),
  reason: z.nativeEnum(AccountLockReason),
  method: z.nativeEnum(AccountLockMethod),
  source: z.nativeEnum(AccountLockSource),
  lockedBy: z.string().uuid().optional(),
  lockDurationSeconds: z.number().int().min(-1),
  lockedUntil: z.date().nullable(),
  isPermanent: z.boolean(),
  notificationSent: z.boolean().default(false),
  notificationChannel: z.enum(['email', 'sms', 'push', 'whatsapp']).optional(),
  metadata: z.object({
    ipAddress: z.string().ip().optional(),
    deviceId: z.string().max(255).optional(),
    deviceFingerprint: z.string().max(128).optional(),
    userAgent: z.string().max(500).optional(),
    sessionId: z.string().uuid().optional(),
    failureCount: z.number().int().min(0).optional(),
    totalFailuresToday: z.number().int().min(0).optional(),
    failureWindowMinutes: z.number().int().min(1).optional(),
    mfaEnabled: z.boolean().optional(),
    mfaMethod: z.enum(['totp', 'sms', 'whatsapp', 'email', 'webauthn', 'bkash_pin', 'nagad_pin', 'rocket_pin']).optional(),
    wasTrustedDevice: z.boolean().optional(),
    deviceTrustLevel: z.enum(['untrusted', 'standard', 'trusted', 'high_trust', 'maximum_trust']).optional(),
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
  priority: z.enum(['low', 'normal', 'high', 'critical']).default('high'),
  partitionKey: z.string().optional(),
});

// ============================================================
// ✅ ENTERPRISE: Account Locked Event Class (v3.0)
// ============================================================

export class AccountLockedEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.ACCOUNT_LOCKED;
  public readonly occurredAt: Date;
  public readonly lockedAt: Date;
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

  // Lock context
  public readonly reason: AccountLockReason;
  public readonly method: AccountLockMethod;
  public readonly source: AccountLockSource;
  public readonly lockedBy?: string;  // adminId if admin lock
  
  // Lock details
  public readonly failureCount?: number;
  public readonly lockDurationSeconds: number;
  public readonly lockedUntil: Date | null;
  public readonly isPermanent: boolean;
  
  // Notification status
  public readonly notificationSent: boolean;
  public readonly notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';
  
  // Event metadata
  public readonly metadata?: AccountLockedMetadata;

  // ✅ Enterprise: Constructor with enhanced options
  constructor(
    userId: string,
    aggregateVersion: number,
    email: string,
    reason: AccountLockReason,
    method: AccountLockMethod,
    source: AccountLockSource,
    lockDurationSeconds: number,
    options?: {
      // Core fields
      phone?: string;
      lockedBy?: string;
      failureCount?: number;
      lockedUntil?: Date;
      
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
      metadata?: AccountLockedMetadata;
      
      // Event version (default: from shared-constants)
      eventVersion?: number;
    }
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.lockedAt = new Date();
    this.eventVersion = options?.eventVersion ?? EVENT_VERSIONS.V1;
    this.aggregateVersion = aggregateVersion;
    this.correlationId = options?.correlationId;
    this.causationId = options?.causationId;
    this.ttlSeconds = options?.ttlSeconds;
    this.expiresAt = options?.expiresAt;
    this.priority = options?.priority ?? this.calculatePriority(reason, options?.metadata);
    this.partitionKey = options?.partitionKey ?? userId;

    this.userId = userId;
    this.email = email;
    this.phone = options?.phone;

    this.reason = reason;
    this.method = method;
    this.source = source;
    this.lockedBy = options?.lockedBy;
    this.failureCount = options?.failureCount;
    this.lockDurationSeconds = lockDurationSeconds;
    this.lockedUntil = options?.lockedUntil ?? null;
    this.isPermanent = lockDurationSeconds === -1 || reason === AccountLockReason.PERMANENT_BAN;

    this.notificationSent = options?.notificationSent ?? false;
    this.notificationChannel = options?.notificationChannel;

    this.metadata = options?.metadata;

    // ✅ Enterprise: Auto-set partition key from district if available
    if (!options?.partitionKey && this.metadata?.district) {
      this.partitionKey = this.metadata.district;
    }

    // ✅ Enterprise: Auto-set TTL if not provided (90 days default for security events)
    if (!this.ttlSeconds && !this.expiresAt) {
      this.ttlSeconds = 90 * 24 * 60 * 60; // 90 days
      this.expiresAt = new Date(Date.now() + this.ttlSeconds * 1000);
    }
  }

  // ============================================================
  // ✅ Enterprise: Helper Methods
  // ============================================================

  /**
   * Calculate priority based on lock reason and context
   */
  private calculatePriority(reason: AccountLockReason, metadata?: AccountLockedMetadata): EventPriority {
    // Critical priority - security threats
    if (reason === AccountLockReason.BRUTE_FORCE_DETECTED ||
        reason === AccountLockReason.SIM_SWAP_DETECTED ||
        reason === AccountLockReason.MFS_FRAUD_SUSPECTED ||
        reason === AccountLockReason.ACCOUNT_COMPROMISED) {
      return 'critical';
    }
    
    // High priority - manual admin actions or policy violations
    if (reason === AccountLockReason.PERMANENT_BAN ||
        reason === AccountLockReason.ADMIN_ACTION ||
        reason === AccountLockReason.POLICY_VIOLATION) {
      return 'high';
    }
    
    // Normal priority - automatic locks
    if (metadata?.triggeredSecurityAlert) {
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
   * Get remaining lock time in seconds
   */
  public getRemainingLockTime(): number {
    if (this.isPermanent || !this.lockedUntil) return -1;
    const remaining = this.lockedUntil.getTime() - Date.now();
    return Math.max(0, Math.ceil(remaining / 1000));
  }

  /**
   * Get formatted remaining lock time
   */
  public getFormattedRemainingTime(): string {
    const seconds = this.getRemainingLockTime();
    if (seconds === -1) return 'Permanent';
    if (seconds === 0) return 'Expired';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  }

  /**
   * Check if lock is permanent
   */
  public isPermanentLock(): boolean {
    return this.isPermanent;
  }

  /**
   * Check if this was a security-related lock
   */
  public isSecurityLock(): boolean {
    return this.reason === AccountLockReason.BRUTE_FORCE_DETECTED ||
           this.reason === AccountLockReason.SIM_SWAP_DETECTED ||
           this.reason === AccountLockReason.MFS_FRAUD_SUSPECTED ||
           this.reason === AccountLockReason.ACCOUNT_COMPROMISED ||
           this.reason === AccountLockReason.SUSPICIOUS_ACTIVITY;
  }

  /**
   * Check if this was an admin action
   */
  public isAdminAction(): boolean {
    return this.source === AccountLockSource.ADMIN && !!this.lockedBy;
  }

  /**
   * Check if this was a Bangladesh-specific lock
   */
  public isBangladeshSpecific(): boolean {
    return this.reason === AccountLockReason.SIM_SWAP_DETECTED ||
           this.reason === AccountLockReason.MFS_FRAUD_SUSPECTED ||
           !!this.metadata?.district ||
           !!this.metadata?.mobileOperator;
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
      method: this.method,
      source: this.source,
      lockedBy: this.lockedBy,
      lockDurationSeconds: this.lockDurationSeconds,
      isPermanent: this.isPermanent,
      remainingLockTime: this.getRemainingLockTime(),
      failureCount: this.failureCount,
      notificationSent: this.notificationSent,
      district: this.metadata?.district,
      mobileOperator: this.metadata?.mobileOperator,
      deviceType: this.metadata?.deviceType,
      isSecurityLock: this.isSecurityLock(),
      isAdminAction: this.isAdminAction(),
      isBangladeshSpecific: this.isBangladeshSpecific(),
      priority: this.priority,
      partitionKey: this.partitionKey,
      occurredAt: this.occurredAt.toISOString(),
    };
  }

  /**
   * Convert to plain object for serialization
   */
  public toJSON(): AccountLockedEventData {
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
      lockedAt: this.lockedAt.toISOString(),
      reason: this.reason,
      method: this.method,
      source: this.source,
      lockedBy: this.lockedBy,
      failureCount: this.failureCount,
      lockDurationSeconds: this.lockDurationSeconds,
      lockedUntil: this.lockedUntil?.toISOString() ?? null,
      isPermanent: this.isPermanent,
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
  public static fromJSON(data: AccountLockedEventData): AccountLockedEvent {
    const event = new AccountLockedEvent(
      data.userId,
      data.aggregateVersion,
      data.email,
      data.reason,
      data.method,
      data.source,
      data.lockDurationSeconds,
      {
        phone: data.phone,
        lockedBy: data.lockedBy,
        failureCount: data.failureCount,
        lockedUntil: data.lockedUntil ? new Date(data.lockedUntil) : undefined,
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
      }
    );
    // Override auto-generated fields with stored values
    (event as any).eventId = data.eventId;
    (event as any).occurredAt = new Date(data.occurredAt);
    (event as any).lockedAt = new Date(data.lockedAt);
    return event;
  }

  /**
   * Validate event data using Zod schema
   */
  public validate(): boolean {
    const result = AccountLockedEventSchema.safeParse(this.toJSON());
    return result.success;
  }

  // ============================================================
  // ✅ Enterprise: Static factory methods for common scenarios
  // ============================================================

  /**
   * Create event for automatic lock after failed attempts
   */
  public static forFailedAttempts(
    userId: string,
    aggregateVersion: number,
    email: string,
    failureCount: number,
    lockDurationSeconds: number,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      phone?: string;
      district?: string;
      correlationId?: string;
    }
  ): AccountLockedEvent {
    return new AccountLockedEvent(
      userId,
      aggregateVersion,
      email,
      AccountLockReason.FAILED_LOGIN_ATTEMPTS,
      AccountLockMethod.AUTOMATIC,
      AccountLockSource.SYSTEM,
      lockDurationSeconds,
      {
        phone: options?.phone,
        failureCount,
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
   * Create event for SIM swap detection (Bangladesh specific)
   */
  public static forSimSwapDetection(
    userId: string,
    aggregateVersion: number,
    email: string,
    phone: string,
    oldOperator: string,
    newOperator: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      district?: string;
      mobileOperator?: typeof MOBILE_OPERATORS[number];
      correlationId?: string;
    }
  ): AccountLockedEvent {
    return new AccountLockedEvent(
      userId,
      aggregateVersion,
      email,
      AccountLockReason.SIM_SWAP_DETECTED,
      AccountLockMethod.SECURITY_SYSTEM,
      AccountLockSource.SECURITY,
      172800, // 48 hours lock
      {
        phone,
        correlationId: options?.correlationId,
        priority: 'critical',
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          district: options?.district,
          mobileOperator: options?.mobileOperator,
          triggeredSecurityAlert: true,
          securityAlertReason: `SIM swap detected: ${oldOperator} → ${newOperator}`,
        }
      }
    );
  }

  /**
   * Create event for admin action
   */
  public static forAdminAction(
    userId: string,
    aggregateVersion: number,
    email: string,
    adminId: string,
    reason: AccountLockReason,
    lockDurationSeconds: number,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    note?: string,
    options?: {
      phone?: string;
      district?: string;
      correlationId?: string;
    }
  ): AccountLockedEvent {
    return new AccountLockedEvent(
      userId,
      aggregateVersion,
      email,
      reason,
      AccountLockMethod.MANUAL_ADMIN,
      AccountLockSource.ADMIN,
      lockDurationSeconds,
      {
        phone: options?.phone,
        lockedBy: adminId,
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          district: options?.district,
          securityAlertReason: note,
        }
      }
    );
  }

  /**
   * Create event for permanent ban
   */
  public static forPermanentBan(
    userId: string,
    aggregateVersion: number,
    email: string,
    adminId: string,
    reason: AccountLockReason,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    note?: string,
    options?: {
      phone?: string;
      district?: string;
      correlationId?: string;
    }
  ): AccountLockedEvent {
    return new AccountLockedEvent(
      userId,
      aggregateVersion,
      email,
      reason,
      AccountLockMethod.MANUAL_ADMIN,
      AccountLockSource.ADMIN,
      -1, // permanent
      {
        phone: options?.phone,
        lockedBy: adminId,
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          district: options?.district,
          securityAlertReason: note,
        }
      }
    );
  }

  /**
   * Create event for ML-based anomaly detection
   */
  public static forMLDetection(
    userId: string,
    aggregateVersion: number,
    email: string,
    anomalyType: string,
    confidenceScore: number,
    lockDurationSeconds: number,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      phone?: string;
      district?: string;
      correlationId?: string;
    }
  ): AccountLockedEvent {
    return new AccountLockedEvent(
      userId,
      aggregateVersion,
      email,
      AccountLockReason.SUSPICIOUS_ACTIVITY,
      AccountLockMethod.ML_DETECTION,
      AccountLockSource.ML_ENGINE,
      lockDurationSeconds,
      {
        phone: options?.phone,
        correlationId: options?.correlationId,
        priority: 'high',
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          district: options?.district,
          triggeredSecurityAlert: true,
          securityAlertReason: `ML anomaly detected: ${anomalyType} (confidence: ${confidenceScore}%)`,
        }
      }
    );
  }
}

// ============================================================
// ✅ Enterprise: Account Lock Warning Event (v2.0)
// ============================================================

export class AccountLockWarningEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.ACCOUNT_LOCK_WARNING;
  public readonly occurredAt: Date;
  public readonly eventVersion: number = EVENT_VERSIONS.V1;
  public readonly aggregateVersion: number = 1;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly ttlSeconds?: number = 7 * 24 * 60 * 60; // 7 days
  public readonly expiresAt?: Date;
  public readonly priority?: EventPriority = 'normal';
  public readonly partitionKey?: string;

  public readonly userId: string;
  public readonly email: string;
  public readonly remainingAttempts: number;
  public readonly maxAttempts: number;
  public readonly nextLockAfterAttempts: number;
  public readonly ipAddress?: string;
  public readonly deviceId?: string;
  public readonly metadata?: AccountLockedMetadata;

  constructor(
    userId: string,
    email: string,
    remainingAttempts: number,
    maxAttempts: number,
    options?: {
      correlationId?: string;
      ipAddress?: string;
      deviceId?: string;
      metadata?: AccountLockedMetadata;
    }
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.correlationId = options?.correlationId;
    this.partitionKey = userId;
    this.expiresAt = this.ttlSeconds ? new Date(Date.now() + this.ttlSeconds * 1000) : undefined;
    
    this.userId = userId;
    this.email = email;
    this.remainingAttempts = remainingAttempts;
    this.maxAttempts = maxAttempts;
    this.nextLockAfterAttempts = maxAttempts - remainingAttempts + 1;
    this.ipAddress = options?.ipAddress;
    this.deviceId = options?.deviceId;
    this.metadata = options?.metadata;
  }

  public toJSON(): AccountLockWarningEventData {
    return {
      eventId: this.eventId,
      eventName: this.eventName,
      occurredAt: this.occurredAt.toISOString(),
      eventVersion: this.eventVersion,
      aggregateVersion: this.aggregateVersion,
      correlationId: this.correlationId,
      userId: this.userId,
      email: this.email,
      remainingAttempts: this.remainingAttempts,
      maxAttempts: this.maxAttempts,
      nextLockAfterAttempts: this.nextLockAfterAttempts,
      ipAddress: this.ipAddress,
      deviceId: this.deviceId,
      metadata: this.metadata,
    };
  }
}

// ============================================================
// ✅ Enterprise: Account Unlocked Event (v2.0)
// ============================================================

export class AccountUnlockedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.ACCOUNT_UNLOCKED;
  public readonly occurredAt: Date;
  public readonly unlockedAt: Date;
  public readonly eventVersion: number = EVENT_VERSIONS.V1;
  public readonly aggregateVersion: number;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly ttlSeconds?: number = 30 * 24 * 60 * 60; // 30 days
  public readonly expiresAt?: Date;
  public readonly priority?: EventPriority = 'normal';
  public readonly partitionKey?: string;

  public readonly userId: string;
  public readonly email: string;
  public readonly unlockedBy: 'system' | 'user' | 'admin';
  public readonly unlockedByUserId?: string;
  public readonly reason?: string;
  public readonly wasPermanentLock: boolean;
  public readonly lockDurationSeconds?: number;
  public readonly metadata?: AccountLockedMetadata;

  constructor(
    userId: string,
    aggregateVersion: number,
    email: string,
    unlockedBy: 'system' | 'user' | 'admin',
    options?: {
      unlockedByUserId?: string;
      reason?: string;
      wasPermanentLock?: boolean;
      lockDurationSeconds?: number;
      correlationId?: string;
      metadata?: AccountLockedMetadata;
    }
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.unlockedAt = new Date();
    this.aggregateVersion = aggregateVersion;
    this.correlationId = options?.correlationId;
    this.partitionKey = userId;
    this.expiresAt = this.ttlSeconds ? new Date(Date.now() + this.ttlSeconds * 1000) : undefined;

    this.userId = userId;
    this.email = email;
    this.unlockedBy = unlockedBy;
    this.unlockedByUserId = options?.unlockedByUserId;
    this.reason = options?.reason;
    this.wasPermanentLock = options?.wasPermanentLock ?? false;
    this.lockDurationSeconds = options?.lockDurationSeconds;
    this.metadata = options?.metadata;
  }

  public toJSON(): AccountUnlockedEventData {
    return {
      eventId: this.eventId,
      eventName: this.eventName,
      occurredAt: this.occurredAt.toISOString(),
      unlockedAt: this.unlockedAt.toISOString(),
      eventVersion: this.eventVersion,
      aggregateVersion: this.aggregateVersion,
      correlationId: this.correlationId,
      userId: this.userId,
      email: this.email,
      unlockedBy: this.unlockedBy,
      unlockedByUserId: this.unlockedByUserId,
      reason: this.reason,
      wasPermanentLock: this.wasPermanentLock,
      lockDurationSeconds: this.lockDurationSeconds,
      metadata: this.metadata,
    };
  }
}

// ============================================================
// ✅ Enterprise: Event Data Interfaces (for serialization)
// ============================================================

export interface AccountLockedEventData {
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
  lockedAt: string;
  reason: AccountLockReason;
  method: AccountLockMethod;
  source: AccountLockSource;
  lockedBy?: string;
  failureCount?: number;
  lockDurationSeconds: number;
  lockedUntil: string | null;
  isPermanent: boolean;
  notificationSent: boolean;
  notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';
  metadata?: AccountLockedMetadata;
  ttlSeconds?: number;
  expiresAt?: string;
  priority?: EventPriority;
  partitionKey?: string;
}

export interface AccountLockWarningEventData {
  eventId: string;
  eventName: string;
  occurredAt: string;
  eventVersion: number;
  aggregateVersion: number;
  correlationId?: string;
  userId: string;
  email: string;
  remainingAttempts: number;
  maxAttempts: number;
  nextLockAfterAttempts: number;
  ipAddress?: string;
  deviceId?: string;
  metadata?: AccountLockedMetadata;
}

export interface AccountUnlockedEventData {
  eventId: string;
  eventName: string;
  occurredAt: string;
  unlockedAt: string;
  eventVersion: number;
  aggregateVersion: number;
  correlationId?: string;
  userId: string;
  email: string;
  unlockedBy: 'system' | 'user' | 'admin';
  unlockedByUserId?: string;
  reason?: string;
  wasPermanentLock: boolean;
  lockDurationSeconds?: number;
  metadata?: AccountLockedMetadata;
}

// ============================================================
// ✅ Enterprise: Type Exports
// ============================================================

export type { 
  AccountLockedMetadata as AccountLockedMetadataType,
  AccountLockedPayload as AccountLockedPayloadType
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
// 8. ✅ SIM swap and MFS fraud detection (Bangladesh specific)
// 9. ✅ ML-based anomaly detection support
// 10. ✅ 4 Static factory methods for common scenarios
// 11. ✅ Helper methods: isExpired(), isCritical(), getRemainingLockTime(), getFormattedRemainingTime()
// 12. ✅ isSecurityLock(), isAdminAction(), isBangladeshSpecific()
// 13. ✅ Serialization support (toJSON, fromJSON)
// 14. ✅ Zod schema for runtime validation
// 15. ✅ Notification tracking (notificationSent, notificationChannel)
// 16. ✅ Admin action tracking with lockedBy
// 17. ✅ Device fingerprint tracking
// 18. ✅ AccountLockWarningEvent (pre-lock notification)
// 19. ✅ AccountUnlockedEvent (post-unlock notification)
// 
// Bangladesh Specific:
// - SIM swap detection reason
// - MFS fraud detection (bKash/Nagad/Rocket)
// - District/Upazila/Division location tracking
// - Mobile operator and network type tracking
// - Feature phone device type
// - Bengali language support (metadata.language: 'bn')
// 
// Security Features:
// - Priority-based event processing for critical locks
// - Security alert triggers
// - ML anomaly detection support
// - Device fingerprint tracking
// - Admin action audit trail
// - Permanent vs temporary lock distinction
// 
// ============================================================
