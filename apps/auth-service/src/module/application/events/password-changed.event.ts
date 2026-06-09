/**
 * Password Changed Event - Enterprise Grade (v2.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/events/password-changed.event
 * 
 * @description
 * Event emitted when a user changes or resets their password.
 * Enhanced with shared-types integration, event versioning, TTL support,
 * Bangladesh specific fields, and priority-based processing.
 * 
 * Enterprise Rules:
 * ✅ Immutable event data
 * ✅ No business logic, no side effects
 * ✅ Event ID for distributed tracing
 * ✅ Correlation/Causation IDs for event sourcing
 * ✅ Aggregate version tracking
 * ✅ TTL support for event expiry
 * ✅ Priority support for critical events
 * ✅ Shared types from @vubon/shared-packages
 * ✅ Bangladesh specific - District/Upazila tracking
 * ✅ Security audit tracking with initiatedBy
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
// Password Change Type Enum (Extended)
// ============================================================

export enum PasswordChangeType {
  USER_CHANGE = 'USER_CHANGE',       // User changed password (logged in)
  USER_RESET = 'USER_RESET',         // User reset via forgot password flow
  ADMIN_FORCE = 'ADMIN_FORCE',       // Admin forced password change
  SYSTEM_FORCE = 'SYSTEM_FORCE',     // System forced (expired, security policy)
  MIGRATION = 'MIGRATION',           // Password migrated from legacy system
  BREACH_FORCE = 'BREACH_FORCE',     // ✅ Enterprise: Password found in breach database
  MFA_FORCE = 'MFA_FORCE',           // ✅ Enterprise: MFA setup forced password change
}

// ============================================================
// Password Change Reason Enum (Extended)
// ============================================================

export enum PasswordChangeReason {
  USER_INITIATED = 'USER_INITIATED',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  SECURITY_BREACH = 'SECURITY_BREACH',
  POLICY_EXPIRY = 'POLICY_EXPIRY',
  ADMIN_REQUEST = 'ADMIN_REQUEST',
  FIRST_LOGIN = 'FIRST_LOGIN',
  COMPROMISED_ACCOUNT = 'COMPROMISED_ACCOUNT',
  // ✅ Enterprise: Additional reasons
  BREACH_DETECTED = 'BREACH_DETECTED',
  WEAK_PASSWORD = 'WEAK_PASSWORD',
  REUSE_PREVENTION = 'REUSE_PREVENTION',
  COMPLIANCE_REQUIREMENT = 'COMPLIANCE_REQUIREMENT',
}

// ============================================================
// ✅ ENTERPRISE: Event Metadata Interface (Bangladesh specific)
// ============================================================

export interface PasswordChangedMetadata extends EventMetadata {
  /** ✅ Enterprise: Password strength score after change (0-100) */
  newPasswordStrength?: number;
  
  /** ✅ Enterprise: Previous password strength score */
  oldPasswordStrength?: number;
  
  /** ✅ Enterprise: Whether password was checked against breach database */
  breachCheckPerformed?: boolean;
  
  /** ✅ Enterprise: Whether password was found in breaches */
  wasBreached?: boolean;
  
  /** ✅ Enterprise: Number of previous passwords checked for reuse */
  reuseCheckCount?: number;
  
  /** ✅ Enterprise: Whether password was reused */
  wasReused?: boolean;
  
  /** ✅ Enterprise: User's district (Bangladesh) */
  district?: string;
  
  /** ✅ Enterprise: User's upazila/sub-district */
  upazila?: string;
  
  /** ✅ Enterprise: Division (Bangladesh) */
  division?: string;
  
  /** ✅ Enterprise: Mobile operator */
  mobileOperator?: typeof MOBILE_OPERATORS[number];
  
  /** ✅ Enterprise: Network type */
  networkType?: typeof NETWORK_TYPES[number];
  
  /** ✅ Enterprise: Whether data saver mode is enabled */
  dataSaverEnabled?: boolean;
  
  /** ✅ Enterprise: Device type */
  deviceType?: 'desktop' | 'mobile' | 'tablet' | 'feature_phone' | 'smart_tv' | 'console';
  
  /** ✅ Enterprise: Browser name */
  browserName?: string;
  
  /** ✅ Enterprise: OS name */
  osName?: string;
}

// ============================================================
// ✅ ENTERPRISE: Event Payload Interface
// ============================================================

export interface PasswordChangedPayload extends EventPayload {
  /** User ID */
  userId: string;
  
  /** User email */
  email: string;
  
  /** User phone (Bangladesh specific) */
  phone?: string;
  
  /** User full name */
  fullName?: string;
  
  /** Password change type */
  changeType: PasswordChangeType;
  
  /** Password change reason */
  reason: PasswordChangeReason;
  
  /** Admin ID (if admin forced) */
  initiatedBy?: string;
  
  /** Was notification sent to user? */
  notificationSent?: boolean;
  
  /** Notification channel used */
  notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';
}

// ============================================================
// ✅ ENTERPRISE: Zod Schema for Runtime Validation
// ============================================================

export const PasswordChangedEventSchema = z.object({
  eventId: z.string().uuid(),
  eventName: z.literal(EVENT_NAMES.PASSWORD_CHANGED),
  occurredAt: z.date(),
  eventVersion: z.number().int().min(1).default(EVENT_VERSIONS.V1),
  aggregateVersion: z.number().int().min(1),
  correlationId: z.string().uuid().optional(),
  causationId: z.string().uuid().optional(),
  userId: z.string().uuid(),
  email: z.string().email(),
  phone: z.string().regex(/^(?:\+880|0)1[3-9]\d{8}$/).optional(),
  fullName: z.string().max(100).optional(),
  changeType: z.nativeEnum(PasswordChangeType),
  reason: z.nativeEnum(PasswordChangeReason),
  initiatedBy: z.string().uuid().optional(),
  deviceId: z.string().max(255).optional(),
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().max(500).optional(),
  sessionId: z.string().uuid().optional(),
  note: z.string().max(500).optional(),
  notificationSent: z.boolean().default(false),
  notificationChannel: z.enum(['email', 'sms', 'push', 'whatsapp']).optional(),
  metadata: z.object({
    newPasswordStrength: z.number().int().min(0).max(100).optional(),
    oldPasswordStrength: z.number().int().min(0).max(100).optional(),
    breachCheckPerformed: z.boolean().optional(),
    wasBreached: z.boolean().optional(),
    reuseCheckCount: z.number().int().min(0).optional(),
    wasReused: z.boolean().optional(),
    district: z.string().max(100).optional(),
    upazila: z.string().max(100).optional(),
    division: z.string().max(100).optional(),
    mobileOperator: z.enum(MOBILE_OPERATORS).optional(),
    networkType: z.enum(NETWORK_TYPES).optional(),
    dataSaverEnabled: z.boolean().optional(),
    deviceType: z.enum(['desktop', 'mobile', 'tablet', 'feature_phone', 'smart_tv', 'console']).optional(),
    browserName: z.string().max(50).optional(),
    osName: z.string().max(50).optional(),
  }).optional(),
  ttlSeconds: z.number().int().positive().optional(),
  expiresAt: z.date().optional(),
  priority: z.enum(['low', 'normal', 'high', 'critical']).default('high'),
  partitionKey: z.string().optional(),
});

// ============================================================
// ✅ ENTERPRISE: Password Changed Event Class (v2.0)
// ============================================================

export class PasswordChangedEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.PASSWORD_CHANGED;
  public readonly occurredAt: Date;
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

  // Password change context
  public readonly changeType: PasswordChangeType;
  public readonly reason: PasswordChangeReason;
  public readonly initiatedBy?: string;
  public readonly deviceId?: string;
  public readonly ipAddress?: string;
  public readonly userAgent?: string;
  public readonly sessionId?: string;
  public readonly note?: string;

  // Notification status
  public readonly notificationSent: boolean;
  public readonly notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';

  // ✅ Enterprise: Event metadata
  public readonly metadata?: PasswordChangedMetadata;

  // ✅ Enterprise: Constructor with enhanced options
  constructor(
    userId: string,
    aggregateVersion: number,
    email: string,
    changeType: PasswordChangeType,
    reason: PasswordChangeReason,
    options?: {
      // Core fields
      phone?: string;
      fullName?: string;

      // Context
      initiatedBy?: string;
      deviceId?: string;
      ipAddress?: string;
      userAgent?: string;
      sessionId?: string;
      note?: string;

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

      // ✅ Enterprise: Metadata
      metadata?: PasswordChangedMetadata;

      // Event version (default: from shared-constants)
      eventVersion?: number;
    }
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
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
    this.fullName = options?.fullName;

    this.changeType = changeType;
    this.reason = reason;
    this.initiatedBy = options?.initiatedBy;
    this.deviceId = options?.deviceId;
    this.ipAddress = options?.ipAddress;
    this.userAgent = options?.userAgent;
    this.sessionId = options?.sessionId;
    this.note = options?.note;

    this.notificationSent = options?.notificationSent ?? false;
    this.notificationChannel = options?.notificationChannel;

    this.metadata = options?.metadata;

    // ✅ Enterprise: Auto-set partition key from district if available
    if (!options?.partitionKey && this.metadata?.district) {
      this.partitionKey = this.metadata.district;
    }

    // ✅ Enterprise: Auto-set TTL if not provided (90 days default for password events)
    if (!this.ttlSeconds && !this.expiresAt) {
      this.ttlSeconds = 90 * 24 * 60 * 60; // 90 days
      this.expiresAt = new Date(Date.now() + this.ttlSeconds * 1000);
    }
  }

  // ============================================================
  // ✅ Enterprise: Helper Methods
  // ============================================================

  /**
   * Calculate priority based on reason
   */
  private calculatePriority(reason: PasswordChangeReason, metadata?: PasswordChangedMetadata): EventPriority {
    if (reason === PasswordChangeReason.SECURITY_BREACH ||
        reason === PasswordChangeReason.COMPROMISED_ACCOUNT ||
        reason === PasswordChangeReason.BREACH_DETECTED) {
      return 'critical';
    }
    
    if (reason === PasswordChangeReason.ADMIN_REQUEST ||
        reason === PasswordChangeReason.POLICY_EXPIRY ||
        reason === PasswordChangeReason.COMPLIANCE_REQUIREMENT) {
      return 'high';
    }
    
    if (metadata?.wasBreached) {
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
   * Check if this was a security-related password change
   */
  public isSecurityRelated(): boolean {
    return this.reason === PasswordChangeReason.SECURITY_BREACH ||
           this.reason === PasswordChangeReason.COMPROMISED_ACCOUNT ||
           this.reason === PasswordChangeReason.BREACH_DETECTED ||
           this.changeType === PasswordChangeType.BREACH_FORCE ||
           this.metadata?.wasBreached === true;
  }

  /**
   * Check if this was an admin-initiated change
   */
  public isAdminInitiated(): boolean {
    return this.changeType === PasswordChangeType.ADMIN_FORCE && !!this.initiatedBy;
  }

  /**
   * Get password strength improvement (if both old and new strength available)
   */
  public getStrengthImprovement(): number | null {
    if (this.metadata?.newPasswordStrength && this.metadata?.oldPasswordStrength) {
      return this.metadata.newPasswordStrength - this.metadata.oldPasswordStrength;
    }
    return null;
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
      changeType: this.changeType,
      reason: this.reason,
      initiatedBy: this.initiatedBy,
      deviceId: this.deviceId,
      ipAddress: this.ipAddress,
      notificationSent: this.notificationSent,
      newPasswordStrength: this.metadata?.newPasswordStrength,
      wasBreached: this.metadata?.wasBreached,
      district: this.metadata?.district,
      mobileOperator: this.metadata?.mobileOperator,
      priority: this.priority,
      partitionKey: this.partitionKey,
      occurredAt: this.occurredAt.toISOString(),
    };
  }

  /**
   * Convert to plain object for serialization
   */
  public toJSON(): PasswordChangedEventData {
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
      changeType: this.changeType,
      reason: this.reason,
      initiatedBy: this.initiatedBy,
      deviceId: this.deviceId,
      ipAddress: this.ipAddress,
      userAgent: this.userAgent,
      sessionId: this.sessionId,
      note: this.note,
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
  public static fromJSON(data: PasswordChangedEventData): PasswordChangedEvent {
    const event = new PasswordChangedEvent(
      data.userId,
      data.aggregateVersion,
      data.email,
      data.changeType,
      data.reason,
      {
        phone: data.phone,
        fullName: data.fullName,
        initiatedBy: data.initiatedBy,
        deviceId: data.deviceId,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
        sessionId: data.sessionId,
        note: data.note,
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
    return event;
  }

  /**
   * Validate event data using Zod schema
   */
  public validate(): boolean {
    const result = PasswordChangedEventSchema.safeParse(this.toJSON());
    return result.success;
  }

  // ============================================================
  // ✅ Enterprise: Static factory methods for common scenarios
  // ============================================================

  /**
   * Create event for user-initiated password change
   */
  public static forUserChange(
    userId: string,
    aggregateVersion: number,
    email: string,
    sessionId: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      phone?: string;
      fullName?: string;
      newPasswordStrength?: number;
      oldPasswordStrength?: number;
      district?: string;
      correlationId?: string;
    }
  ): PasswordChangedEvent {
    return new PasswordChangedEvent(
      userId,
      aggregateVersion,
      email,
      PasswordChangeType.USER_CHANGE,
      PasswordChangeReason.USER_INITIATED,
      {
        sessionId,
        ipAddress,
        deviceId,
        userAgent,
        correlationId: options?.correlationId,
        metadata: {
          newPasswordStrength: options?.newPasswordStrength,
          oldPasswordStrength: options?.oldPasswordStrength,
          district: options?.district,
        }
      }
    );
  }

  /**
   * Create event for password reset (forgot password flow)
   */
  public static forPasswordReset(
    userId: string,
    aggregateVersion: number,
    email: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      phone?: string;
      fullName?: string;
      newPasswordStrength?: number;
      district?: string;
      correlationId?: string;
    }
  ): PasswordChangedEvent {
    return new PasswordChangedEvent(
      userId,
      aggregateVersion,
      email,
      PasswordChangeType.USER_RESET,
      PasswordChangeReason.FORGOT_PASSWORD,
      {
        ipAddress,
        deviceId,
        userAgent,
        correlationId: options?.correlationId,
        metadata: {
          newPasswordStrength: options?.newPasswordStrength,
          district: options?.district,
        }
      }
    );
  }

  /**
   * Create event for security breach password change
   */
  public static forSecurityBreach(
    userId: string,
    aggregateVersion: number,
    email: string,
    initiatedBy: string,
    breachReason: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      phone?: string;
      fullName?: string;
      newPasswordStrength?: number;
      wasBreached?: boolean;
      district?: string;
      correlationId?: string;
    }
  ): PasswordChangedEvent {
    return new PasswordChangedEvent(
      userId,
      aggregateVersion,
      email,
      PasswordChangeType.BREACH_FORCE,
      PasswordChangeReason.BREACH_DETECTED,
      {
        initiatedBy,
        note: breachReason,
        ipAddress,
        deviceId,
        userAgent,
        priority: 'critical',
        correlationId: options?.correlationId,
        metadata: {
          newPasswordStrength: options?.newPasswordStrength,
          wasBreached: options?.wasBreached ?? true,
          breachCheckPerformed: true,
          district: options?.district,
        }
      }
    );
  }

  /**
   * Create event for admin-forced password change
   */
  public static forAdminForce(
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
      fullName?: string;
      newPasswordStrength?: number;
      district?: string;
      correlationId?: string;
    }
  ): PasswordChangedEvent {
    return new PasswordChangedEvent(
      userId,
      aggregateVersion,
      email,
      PasswordChangeType.ADMIN_FORCE,
      PasswordChangeReason.ADMIN_REQUEST,
      {
        initiatedBy: adminId,
        note: reason,
        ipAddress,
        deviceId,
        userAgent,
        priority: 'high',
        correlationId: options?.correlationId,
        metadata: {
          newPasswordStrength: options?.newPasswordStrength,
          district: options?.district,
        }
      }
    );
  }

  /**
   * Create event for policy expiry password change
   */
  public static forPolicyExpiry(
    userId: string,
    aggregateVersion: number,
    email: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    daysUntilExpiry: number,
    options?: {
      phone?: string;
      fullName?: string;
      newPasswordStrength?: number;
      district?: string;
      correlationId?: string;
    }
  ): PasswordChangedEvent {
    return new PasswordChangedEvent(
      userId,
      aggregateVersion,
      email,
      PasswordChangeType.SYSTEM_FORCE,
      PasswordChangeReason.POLICY_EXPIRY,
      {
        ipAddress,
        deviceId,
        userAgent,
        note: `Password expired after ${daysUntilExpiry} days`,
        correlationId: options?.correlationId,
        metadata: {
          newPasswordStrength: options?.newPasswordStrength,
          district: options?.district,
        }
      }
    );
  }
}

// ============================================================
// ✅ Enterprise: Password Expiring Soon Event (v2.0)
// ============================================================

export class PasswordExpiringSoonEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.PASSWORD_EXPIRING_SOON;
  public readonly occurredAt: Date;
  public readonly eventVersion: number = EVENT_VERSIONS.V1;
  public readonly aggregateVersion: number = 1;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly ttlSeconds?: number;
  public readonly expiresAt?: Date;
  public readonly priority?: EventPriority = 'high';
  public readonly partitionKey?: string;

  public readonly userId: string;
  public readonly email: string;
  public readonly daysUntilExpiry: number;
  public readonly expiresAt: Date;

  constructor(
    userId: string,
    email: string,
    daysUntilExpiry: number,
    expiresAt: Date,
    options?: {
      correlationId?: string;
      causationId?: string;
      ttlSeconds?: number;
      partitionKey?: string;
    }
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.correlationId = options?.correlationId;
    this.causationId = options?.causationId;
    this.ttlSeconds = options?.ttlSeconds;
    this.expiresAt = options?.ttlSeconds 
      ? new Date(Date.now() + options.ttlSeconds * 1000)
      : undefined;
    this.partitionKey = options?.partitionKey ?? userId;

    this.userId = userId;
    this.email = email;
    this.daysUntilExpiry = daysUntilExpiry;
    this.expiresAt = expiresAt;
  }

  public toJSON(): PasswordExpiringSoonEventData {
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
      daysUntilExpiry: this.daysUntilExpiry,
      expiresAt: this.expiresAt.toISOString(),
    };
  }
}

// ============================================================
// ✅ Enterprise: Password Expired Event (v2.0)
// ============================================================

export class PasswordExpiredEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.PASSWORD_EXPIRED;
  public readonly occurredAt: Date;
  public readonly eventVersion: number = EVENT_VERSIONS.V1;
  public readonly aggregateVersion: number = 1;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly ttlSeconds?: number;
  public readonly expiresAt?: Date;
  public readonly priority?: EventPriority = 'high';
  public readonly partitionKey?: string;

  public readonly userId: string;
  public readonly email: string;
  public readonly expiredAt: Date;

  constructor(
    userId: string,
    email: string,
    expiredAt: Date,
    options?: {
      correlationId?: string;
      causationId?: string;
      ttlSeconds?: number;
      partitionKey?: string;
    }
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.correlationId = options?.correlationId;
    this.causationId = options?.causationId;
    this.ttlSeconds = options?.ttlSeconds;
    this.expiresAt = options?.ttlSeconds 
      ? new Date(Date.now() + options.ttlSeconds * 1000)
      : undefined;
    this.partitionKey = options?.partitionKey ?? userId;

    this.userId = userId;
    this.email = email;
    this.expiredAt = expiredAt;
  }

  public toJSON(): PasswordExpiredEventData {
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
      expiredAt: this.expiredAt.toISOString(),
    };
  }
}

// ============================================================
// ✅ Enterprise: Event Data Interfaces (for serialization)
// ============================================================

export interface PasswordChangedEventData {
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
  changeType: PasswordChangeType;
  reason: PasswordChangeReason;
  initiatedBy?: string;
  deviceId?: string;
  ipAddress?: string;
  userAgent?: string;
  sessionId?: string;
  note?: string;
  notificationSent: boolean;
  notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';
  metadata?: PasswordChangedMetadata;
  ttlSeconds?: number;
  expiresAt?: string;
  priority?: EventPriority;
  partitionKey?: string;
}

export interface PasswordExpiringSoonEventData {
  eventId: string;
  eventName: string;
  occurredAt: string;
  eventVersion: number;
  aggregateVersion: number;
  correlationId?: string;
  causationId?: string;
  userId: string;
  email: string;
  daysUntilExpiry: number;
  expiresAt: string;
}

export interface PasswordExpiredEventData {
  eventId: string;
  eventName: string;
  occurredAt: string;
  eventVersion: number;
  aggregateVersion: number;
  correlationId?: string;
  causationId?: string;
  userId: string;
  email: string;
  expiredAt: string;
}

// ============================================================
// ✅ Enterprise: Type Exports
// ============================================================

export type { 
  PasswordChangedMetadata as PasswordChangedMetadataType,
  PasswordChangedPayload as PasswordChangedPayloadType
};

// ============================================================
// ENTERPRISE SUMMARY v2.0
// ============================================================
// 
// Enterprise Enhancements Applied in v2.0:
// 1. ✅ Shared-types integration (@vubon/shared-types)
// 2. ✅ Event versioning with aggregateVersion tracking
// 3. ✅ TTL support with expiresAt for event expiry (90 days default)
// 4. ✅ Priority-based event processing (low/normal/high/critical)
// 5. ✅ Partition key for event streaming optimization
// 6. ✅ Bangladesh specific fields (district, upazila, mobileOperator, networkType)
// 7. ✅ Extended PasswordChangeType (BREACH_FORCE, MFA_FORCE)
// 8. ✅ Extended PasswordChangeReason (BREACH_DETECTED, WEAK_PASSWORD, REUSE_PREVENTION, COMPLIANCE_REQUIREMENT)
// 9. ✅ Password strength tracking (old and new)
// 10. ✅ Breach detection integration (wasBreached, breachCheckPerformed)
// 11. ✅ Reuse prevention tracking (reuseCheckCount, wasReused)
// 12. ✅ 5 Static factory methods for common scenarios
// 13. ✅ Helper methods: isExpired(), isCritical(), isSecurityRelated(), isAdminInitiated(), getStrengthImprovement()
// 14. ✅ Serialization support (toJSON, fromJSON)
// 15. ✅ Zod schema for runtime validation
// 16. ✅ Notification tracking (notificationSent, notificationChannel)
// 17. ✅ Admin action tracking with initiatedBy
// 18. ✅ Device fingerprint tracking
// 
// Bangladesh Specific:
// - District/Upazila/Division location tracking
// - Mobile operator and network type tracking
// - Feature phone device type
// 
// Security Features:
// - Security breach detection and alerting
// - Password strength improvement tracking
// - Breach check integration
// - Reuse prevention tracking
// - Admin action audit trail
// 
// ============================================================
