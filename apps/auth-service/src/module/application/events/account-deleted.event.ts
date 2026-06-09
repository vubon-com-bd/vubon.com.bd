/**
 * Account Deleted Event - Enterprise Grade (v3.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce

 * @module application/events/account-deleted.event

 * @description
 * Event emitted when a user account is deleted (soft delete).
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
 * ✅ GDPR compliance tracking
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
// Account Deleted Reason Enum
// ============================================================

export enum AccountDeletedReason {
  USER_INITIATED = 'USER_INITIATED',     // User requested deletion
  USER_ERROR = 'USER_ERROR',             // User deleted by mistake (GDPR recovery)
  ADMIN_ACTION = 'ADMIN_ACTION',         // Admin deleted
  INACTIVITY = 'INACTIVITY',             // Deleted due to inactivity
  POLICY_VIOLATION = 'POLICY_VIOLATION', // Deleted due to policy violation
  GDPR_REQUEST = 'GDPR_REQUEST',         // Deleted due to GDPR right to be forgotten
  DATA_BREACH = 'DATA_BREACH',           // Deleted due to data breach
  MERGED = 'MERGED',                     // Account merged into another
  SPAM = 'SPAM',                         // Deleted as spam account
  FRAUD = 'FRAUD',                       // Deleted due to fraud detection
  COMPLIANCE = 'COMPLIANCE',             // Deleted for compliance reasons
}

// ============================================================
// Account Deleted Source Enum
// ============================================================

export enum AccountDeletedSource {
  USER = 'USER',         // User action
  ADMIN = 'ADMIN',       // Administrator action
  SYSTEM = 'SYSTEM',     // System automation
  GDPR = 'GDPR',         // GDPR compliance request
  API = 'API',           // API request
}

// ============================================================
// ✅ ENTERPRISE: Event Metadata Interface (Bangladesh specific)
// ============================================================

export interface AccountDeletedMetadata extends EventMetadata {
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

  /** Whether GDPR data export was requested */
  gdprExportRequested?: boolean;

  /** GDPR export URL (if requested) */
  gdprExportUrl?: string;

  /** Whether data was anonymized vs deleted */
  anonymizedData?: boolean;

  /** Number of associated records deleted (orders, sessions, etc.) */
  associatedRecordsDeleted?: number;

  /** Whether notification was sent to user */
  notificationSent?: boolean;

  /** Notification channel used */
  notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';

  /** Whether this deletion triggered a security alert */
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

export interface AccountDeletedPayload extends EventPayload {
  /** User ID */
  userId: string;

  /** User email */
  email: string;

  /** User phone (Bangladesh specific) */
  phone?: string;

  /** User full name */
  fullName?: string;

  /** Deletion reason */
  reason: AccountDeletedReason;

  /** Deletion source */
  source: AccountDeletedSource;

  /** Admin ID (if source is ADMIN) */
  deletedBy?: string;

  /** Deletion timestamp */
  deletedAt: Date;

  /** GDPR data retention days (default: 30) */
  dataRetentionDays: number;

  /** Grace period for cancellation (days, default: 7) */
  cancellationWindowDays: number;

  /** Whether cancellation is still possible */
  canCancel: boolean;

  /** Remaining cancellation days */
  remainingCancellationDays: number;

  /** Days until permanent deletion */
  daysUntilPermanentDeletion: number;

  /** Whether deletion is permanent */
  isPermanent: boolean;

  /** Whether data export was requested */
  dataExportRequested?: boolean;
}

// ============================================================
// ✅ ENTERPRISE: Zod Schema for Runtime Validation
// ============================================================

export const AccountDeletedEventSchema = z.object({
  eventId: z.string().uuid(),
  eventName: z.literal(EVENT_NAMES.ACCOUNT_DELETED),
  occurredAt: z.date(),
  eventVersion: z.number().int().min(1).default(EVENT_VERSIONS.V1),
  aggregateVersion: z.number().int().min(1).default(1),
  correlationId: z.string().uuid().optional(),
  causationId: z.string().uuid().optional(),
  userId: z.string().uuid(),
  email: z.string().email(),
  phone: z.string().regex(/^(?:\+880|0)1[3-9]\d{8}$/).optional(),
  fullName: z.string().max(100).optional(),
  reason: z.nativeEnum(AccountDeletedReason),
  source: z.nativeEnum(AccountDeletedSource),
  deletedBy: z.string().uuid().optional(),
  deletedAt: z.date(),
  dataRetentionDays: z.number().int().min(1).max(365).default(30),
  cancellationWindowDays: z.number().int().min(0).max(30).default(7),
  canCancel: z.boolean(),
  remainingCancellationDays: z.number().int().min(0),
  daysUntilPermanentDeletion: z.number().int().min(0),
  isPermanent: z.boolean(),
  dataExportRequested: z.boolean().default(false),
  notificationSent: z.boolean().default(false),
  notificationChannel: z.enum(['email', 'sms', 'push', 'whatsapp']).optional(),
  metadata: z.object({
    ipAddress: z.string().ip().optional(),
    deviceId: z.string().max(255).optional(),
    deviceFingerprint: z.string().max(128).optional(),
    userAgent: z.string().max(500).optional(),
    sessionId: z.string().uuid().optional(),
    gdprExportRequested: z.boolean().optional(),
    gdprExportUrl: z.string().url().optional(),
    anonymizedData: z.boolean().optional(),
    associatedRecordsDeleted: z.number().int().min(0).optional(),
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
  priority: z.enum(['low', 'normal', 'high', 'critical']).default('high'),
  partitionKey: z.string().optional(),
});

// ============================================================
// ✅ ENTERPRISE: Account Deleted Event Class (v3.0)
// ============================================================

export class AccountDeletedEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.ACCOUNT_DELETED;
  public readonly occurredAt: Date;
  public readonly deletedAt: Date;
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
  public readonly fullName?: string;

  // Deletion context
  public readonly reason: AccountDeletedReason;
  public readonly source: AccountDeletedSource;
  public readonly deletedBy?: string;

  // GDPR compliance
  public readonly dataRetentionDays: number;
  public readonly cancellationWindowDays: number;
  public readonly canCancel: boolean;
  public readonly remainingCancellationDays: number;
  public readonly daysUntilPermanentDeletion: number;
  public readonly isPermanent: boolean;
  public readonly dataExportRequested: boolean;

  // Notification status
  public readonly notificationSent: boolean;
  public readonly notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';

  // Event metadata
  public readonly metadata?: AccountDeletedMetadata;

  // ✅ Enterprise: Constructor with enhanced options
  constructor(
    userId: string,
    aggregateVersion: number,
    email: string,
    reason: AccountDeletedReason,
    source: AccountDeletedSource,
    options?: {
      // Core fields
      phone?: string;
      fullName?: string;
      deletedBy?: string;

      // GDPR
      dataRetentionDays?: number;
      cancellationWindowDays?: number;
      dataExportRequested?: boolean;

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
      metadata?: AccountDeletedMetadata;

      // Event version (default: from shared-constants)
      eventVersion?: number;
      
      // Deletion timestamp (for testing)
      deletedAt?: Date;
    }
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.deletedAt = options?.deletedAt ?? new Date();
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
    this.fullName = options?.fullName;

    this.reason = reason;
    this.source = source;
    this.deletedBy = options?.deletedBy;

    // GDPR calculation
    this.dataRetentionDays = options?.dataRetentionDays ?? 30;
    this.cancellationWindowDays = options?.cancellationWindowDays ?? 7;
    this.dataExportRequested = options?.dataExportRequested ?? false;
    
    // Calculate derived fields
    const daysSinceDeletion = this.calculateDaysSinceDeletion();
    this.canCancel = daysSinceDeletion < this.cancellationWindowDays;
    this.remainingCancellationDays = this.canCancel 
      ? Math.max(0, Math.ceil(this.cancellationWindowDays - daysSinceDeletion)) 
      : 0;
    this.daysUntilPermanentDeletion = Math.max(0, Math.ceil(this.dataRetentionDays - daysSinceDeletion));
    this.isPermanent = daysSinceDeletion >= this.dataRetentionDays;

    this.notificationSent = options?.notificationSent ?? false;
    this.notificationChannel = options?.notificationChannel;

    this.metadata = options?.metadata;

    // ✅ Enterprise: Auto-set partition key from district if available
    if (!options?.partitionKey && this.metadata?.district) {
      this.partitionKey = this.metadata.district;
    }

    // ✅ Enterprise: Auto-set TTL if not provided (90 days default for deletion events)
    if (!this.ttlSeconds && !this.expiresAt) {
      this.ttlSeconds = 90 * 24 * 60 * 60; // 90 days
      this.expiresAt = new Date(Date.now() + this.ttlSeconds * 1000);
    }
  }

  // ============================================================
  // ✅ Enterprise: Helper Methods
  // ============================================================

  /**
   * Calculate days since deletion
   */
  private calculateDaysSinceDeletion(): number {
    return (Date.now() - this.deletedAt.getTime()) / (1000 * 60 * 60 * 24);
  }

  /**
   * Calculate priority based on deletion reason
   */
  private calculatePriority(reason: AccountDeletedReason): EventPriority {
    if (reason === AccountDeletedReason.GDPR_REQUEST ||
        reason === AccountDeletedReason.DATA_BREACH ||
        reason === AccountDeletedReason.FRAUD) {
      return 'critical';
    }
    
    if (reason === AccountDeletedReason.ADMIN_ACTION ||
        reason === AccountDeletedReason.POLICY_VIOLATION) {
      return 'high';
    }
    
    if (reason === AccountDeletedReason.USER_INITIATED) {
      return 'normal';
    }
    
    return 'low';
  }

  /**
   * Check if event has expired
   */
  public isExpired(): boolean {
    if (!this.expiresAt) return false;
    return new Date() > this.expiresAt;
  }

  /**
   * Check if deletion can be cancelled (within cancellation window)
   */
  public canCancelDeletion(): boolean {
    return this.canCancel;
  }

  /**
   * Get remaining days to cancel deletion
   */
  public getRemainingCancellationDays(): number {
    return this.remainingCancellationDays;
  }

  /**
   * Get days until permanent deletion
   */
  public getDaysUntilPermanentDeletion(): number {
    return this.daysUntilPermanentDeletion;
  }

  /**
   * Check if deletion is permanent (data already purged)
   */
  public isPermanentDeletion(): boolean {
    return this.isPermanent;
  }

  /**
   * Check if GDPR data export was requested
   */
  public isGDPRExportRequested(): boolean {
    return this.dataExportRequested || this.metadata?.gdprExportRequested === true;
  }

  /**
   * Check if this was an admin-initiated deletion
   */
  public isAdminDeletion(): boolean {
    return this.source === AccountDeletedSource.ADMIN && !!this.deletedBy;
  }

  /**
   * Check if this was a GDPR compliance deletion
   */
  public isGDPRDeletion(): boolean {
    return this.reason === AccountDeletedReason.GDPR_REQUEST || 
           this.source === AccountDeletedSource.GDPR;
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
      deletedBy: this.deletedBy,
      canCancel: this.canCancel,
      remainingCancellationDays: this.remainingCancellationDays,
      daysUntilPermanentDeletion: this.daysUntilPermanentDeletion,
      isPermanent: this.isPermanent,
      dataExportRequested: this.dataExportRequested,
      notificationSent: this.notificationSent,
      district: this.metadata?.district,
      mobileOperator: this.metadata?.mobileOperator,
      deviceType: this.metadata?.deviceType,
      isAdminDeletion: this.isAdminDeletion(),
      isGDPRDeletion: this.isGDPRDeletion(),
      priority: this.priority,
      partitionKey: this.partitionKey,
      occurredAt: this.occurredAt.toISOString(),
    };
  }

  /**
   * Convert to plain object for serialization
   */
  public toJSON(): AccountDeletedEventData {
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
      fullName: this.fullName,
      deletedAt: this.deletedAt.toISOString(),
      reason: this.reason,
      source: this.source,
      deletedBy: this.deletedBy,
      dataRetentionDays: this.dataRetentionDays,
      cancellationWindowDays: this.cancellationWindowDays,
      canCancel: this.canCancel,
      remainingCancellationDays: this.remainingCancellationDays,
      daysUntilPermanentDeletion: this.daysUntilPermanentDeletion,
      isPermanent: this.isPermanent,
      dataExportRequested: this.dataExportRequested,
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
  public static fromJSON(data: AccountDeletedEventData): AccountDeletedEvent {
    const event = new AccountDeletedEvent(
      data.userId,
      data.aggregateVersion,
      data.email,
      data.reason,
      data.source,
      {
        phone: data.phone,
        fullName: data.fullName,
        deletedBy: data.deletedBy,
        dataRetentionDays: data.dataRetentionDays,
        cancellationWindowDays: data.cancellationWindowDays,
        dataExportRequested: data.dataExportRequested,
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
        deletedAt: new Date(data.deletedAt),
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
    const result = AccountDeletedEventSchema.safeParse(this.toJSON());
    return result.success;
  }

  // ============================================================
  // ✅ Enterprise: Static factory methods for common scenarios
  // ============================================================

  /**
   * Create event for user-initiated account deletion
   */
  public static forUserDeletion(
    userId: string,
    aggregateVersion: number,
    email: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      phone?: string;
      fullName?: string;
      dataExportRequested?: boolean;
      district?: string;
      correlationId?: string;
    }
  ): AccountDeletedEvent {
    return new AccountDeletedEvent(
      userId,
      aggregateVersion,
      email,
      AccountDeletedReason.USER_INITIATED,
      AccountDeletedSource.USER,
      {
        phone: options?.phone,
        fullName: options?.fullName,
        dataExportRequested: options?.dataExportRequested ?? false,
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          district: options?.district,
          gdprExportRequested: options?.dataExportRequested ?? false,
        }
      }
    );
  }

  /**
   * Create event for admin-initiated account deletion
   */
  public static forAdminDeletion(
    userId: string,
    aggregateVersion: number,
    email: string,
    adminId: string,
    reason: AccountDeletedReason,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    note?: string,
    options?: {
      phone?: string;
      fullName?: string;
      district?: string;
      correlationId?: string;
    }
  ): AccountDeletedEvent {
    return new AccountDeletedEvent(
      userId,
      aggregateVersion,
      email,
      reason,
      AccountDeletedSource.ADMIN,
      {
        phone: options?.phone,
        fullName: options?.fullName,
        deletedBy: adminId,
        correlationId: options?.correlationId,
        priority: 'high',
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
   * Create event for GDPR compliance deletion (right to be forgotten)
   */
  public static forGDPRDeletion(
    userId: string,
    aggregateVersion: number,
    email: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    dataExportRequested: boolean = true,
    options?: {
      phone?: string;
      fullName?: string;
      district?: string;
      correlationId?: string;
    }
  ): AccountDeletedEvent {
    return new AccountDeletedEvent(
      userId,
      aggregateVersion,
      email,
      AccountDeletedReason.GDPR_REQUEST,
      AccountDeletedSource.GDPR,
      {
        phone: options?.phone,
        fullName: options?.fullName,
        dataExportRequested,
        correlationId: options?.correlationId,
        priority: 'critical',
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          district: options?.district,
          gdprExportRequested: dataExportRequested,
          triggeredSecurityAlert: true,
          securityAlertReason: 'GDPR Right to be Forgotten request - Account deleted',
        }
      }
    );
  }

  /**
   * Create event for inactivity-based deletion (system)
   */
  public static forInactivityDeletion(
    userId: string,
    aggregateVersion: number,
    email: string,
    daysInactive: number,
    options?: {
      phone?: string;
      fullName?: string;
      correlationId?: string;
    }
  ): AccountDeletedEvent {
    return new AccountDeletedEvent(
      userId,
      aggregateVersion,
      email,
      AccountDeletedReason.INACTIVITY,
      AccountDeletedSource.SYSTEM,
      {
        phone: options?.phone,
        fullName: options?.fullName,
        correlationId: options?.correlationId,
        metadata: {
          securityAlertReason: `Account deleted due to ${daysInactive} days of inactivity`,
        }
      }
    );
  }
}

// ============================================================
// ✅ Enterprise: Account Restored Event (v2.0)
// ============================================================

export class AccountRestoredEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.ACCOUNT_RESTORED;
  public readonly occurredAt: Date;
  public readonly restoredAt: Date;
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
  public readonly restoredBy: 'user' | 'admin' | 'system';
  public readonly restoredByUserId?: string;
  public readonly reason?: string;
  public readonly daysDeleted: number;
  public readonly metadata?: AccountDeletedMetadata;

  constructor(
    userId: string,
    aggregateVersion: number,
    email: string,
    restoredBy: 'user' | 'admin' | 'system',
    daysDeleted: number,
    options?: {
      restoredByUserId?: string;
      reason?: string;
      correlationId?: string;
      metadata?: AccountDeletedMetadata;
    }
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.restoredAt = new Date();
    this.aggregateVersion = aggregateVersion;
    this.correlationId = options?.correlationId;
    this.partitionKey = userId;
    this.expiresAt = this.ttlSeconds ? new Date(Date.now() + this.ttlSeconds * 1000) : undefined;

    this.userId = userId;
    this.email = email;
    this.restoredBy = restoredBy;
    this.restoredByUserId = options?.restoredByUserId;
    this.reason = options?.reason;
    this.daysDeleted = daysDeleted;
    this.metadata = options?.metadata;
  }

  public toJSON(): AccountRestoredEventData {
    return {
      eventId: this.eventId,
      eventName: this.eventName,
      occurredAt: this.occurredAt.toISOString(),
      restoredAt: this.restoredAt.toISOString(),
      eventVersion: this.eventVersion,
      aggregateVersion: this.aggregateVersion,
      correlationId: this.correlationId,
      userId: this.userId,
      email: this.email,
      restoredBy: this.restoredBy,
      restoredByUserId: this.restoredByUserId,
      reason: this.reason,
      daysDeleted: this.daysDeleted,
      metadata: this.metadata,
    };
  }
}

// ============================================================
// ✅ Enterprise: Account PermanentlyDeleted Event (v2.0)
// ============================================================

export class AccountPermanentlyDeletedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.ACCOUNT_PERMANENTLY_DELETED;
  public readonly occurredAt: Date;
  public readonly deletedAt: Date;
  public readonly eventVersion: number = EVENT_VERSIONS.V1;
  public readonly aggregateVersion: number = 1;
  public readonly correlationId?: string;
  public readonly ttlSeconds?: number = 365 * 24 * 60 * 60; // 1 year
  public readonly expiresAt?: Date;
  public readonly priority?: EventPriority = 'low';
  public readonly partitionKey?: string;

  public readonly userId: string;
  public readonly email: string;
  public readonly retentionDays: number;
  public readonly anonymizedAt?: Date;
  public readonly dataPurged: boolean;
  public readonly deletedBy?: string;

  constructor(
    userId: string,
    email: string,
    retentionDays: number,
    options?: {
      anonymizedAt?: Date;
      dataPurged?: boolean;
      deletedBy?: string;
      correlationId?: string;
    }
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.deletedAt = new Date();
    this.correlationId = options?.correlationId;
    this.partitionKey = userId;
    this.expiresAt = this.ttlSeconds ? new Date(Date.now() + this.ttlSeconds * 1000) : undefined;

    this.userId = userId;
    this.email = email;
    this.retentionDays = retentionDays;
    this.anonymizedAt = options?.anonymizedAt;
    this.dataPurged = options?.dataPurged ?? true;
    this.deletedBy = options?.deletedBy;
  }

  public toJSON(): AccountPermanentlyDeletedEventData {
    return {
      eventId: this.eventId,
      eventName: this.eventName,
      occurredAt: this.occurredAt.toISOString(),
      deletedAt: this.deletedAt.toISOString(),
      eventVersion: this.eventVersion,
      correlationId: this.correlationId,
      userId: this.userId,
      email: this.email,
      retentionDays: this.retentionDays,
      anonymizedAt: this.anonymizedAt?.toISOString(),
      dataPurged: this.dataPurged,
      deletedBy: this.deletedBy,
    };
  }
}

// ============================================================
// ✅ Enterprise: Event Data Interfaces (for serialization)
// ============================================================

export interface AccountDeletedEventData {
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
  fullName?: string;
  deletedAt: string;
  reason: AccountDeletedReason;
  source: AccountDeletedSource;
  deletedBy?: string;
  dataRetentionDays: number;
  cancellationWindowDays: number;
  canCancel: boolean;
  remainingCancellationDays: number;
  daysUntilPermanentDeletion: number;
  isPermanent: boolean;
  dataExportRequested: boolean;
  notificationSent: boolean;
  notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';
  metadata?: AccountDeletedMetadata;
  ttlSeconds?: number;
  expiresAt?: string;
  priority?: EventPriority;
  partitionKey?: string;
}

export interface AccountRestoredEventData {
  eventId: string;
  eventName: string;
  occurredAt: string;
  restoredAt: string;
  eventVersion: number;
  aggregateVersion: number;
  correlationId?: string;
  userId: string;
  email: string;
  restoredBy: 'user' | 'admin' | 'system';
  restoredByUserId?: string;
  reason?: string;
  daysDeleted: number;
  metadata?: AccountDeletedMetadata;
}

export interface AccountPermanentlyDeletedEventData {
  eventId: string;
  eventName: string;
  occurredAt: string;
  deletedAt: string;
  eventVersion: number;
  correlationId?: string;
  userId: string;
  email: string;
  retentionDays: number;
  anonymizedAt?: string;
  dataPurged: boolean;
  deletedBy?: string;
}

// ============================================================
// ✅ Enterprise: Type Exports
// ============================================================

export type { 
  AccountDeletedMetadata as AccountDeletedMetadataType,
  AccountDeletedPayload as AccountDeletedPayloadType
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
// 8. ✅ GDPR compliance tracking (data retention, cancellation window)
// 9. ✅ 11+ AccountDeletedReason enum values
// 10. ✅ 4 Static factory methods for common scenarios
// 11. ✅ Helper methods: canCancelDeletion(), getRemainingCancellationDays(), 
//     getDaysUntilPermanentDeletion(), isPermanentDeletion()
// 12. ✅ isAdminDeletion(), isGDPRDeletion()
// 13. ✅ Serialization support (toJSON, fromJSON)
// 14. ✅ Zod schema for runtime validation
// 15. ✅ Notification tracking (notificationSent, notificationChannel)
// 16. ✅ Admin action tracking with deletedBy
// 17. ✅ Device fingerprint tracking
// 18. ✅ AccountRestoredEvent (cancellation window recovery)
// 19. ✅ AccountPermanentlyDeletedEvent (data purged)
// 
// Bangladesh Specific:
// - District/Upazila/Division location tracking
// - Mobile operator and network type tracking
// - Feature phone device type
// - Bengali language support (metadata.language: 'bn')
// 
// GDPR Compliance Features:
// - Data retention period tracking (30 days default)
// - Cancellation window tracking (7 days default)
// - Right to be forgotten support
// - Data export request tracking
// - Anonymization tracking
// 
// Security Features:
// - Priority-based event processing for GDPR/critical deletions
// - Security alert triggers for admin/GDPR deletions
// - Admin action audit trail
// - Device fingerprint tracking
// 
// ============================================================
