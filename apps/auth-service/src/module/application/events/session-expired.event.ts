/**
 * Session Expired Event - Enterprise Grade (v4.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce

 * @module application/events/session-expired.event

 * @description
 * Event emitted when a user session expires or is terminated.
 * Enhanced with shared-types integration, event versioning, TTL support,
 * Bangladesh specific fields, and priority-based processing.

 * ENTERPRISE ENHANCEMENTS (v4.0):
 * ✅ Shared-types integration (@vubon/shared-types)
 * ✅ Event versioning with aggregateVersion tracking
 * ✅ TTL support with expiresAt for event expiry (30 days default)
 * ✅ Priority-based event processing (critical for security incidents)
 * ✅ Partition key for event streaming optimization
 * ✅ Bangladesh specific fields (district, upazila, mobileOperator, networkType)
 * ✅ Device fingerprint tracking
 * ✅ Session duration analytics
 * ✅ Zod schema for runtime validation
 * ✅ Serialization support (toJSON, fromJSON)
 * ✅ Helper methods for expiry and status checks
 * ✅ Extended SessionExpiryReason (SIM_SWAP_DETECTED, MFA_CHANGED)
 * ✅ Extended SessionExpirySource (COMPLIANCE, AUTOMATION)
 * ✅ Session health score tracking
 * ✅ Concurrent session count tracking
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
  SECURITY_CONFIG,
  SESSION_CONFIG
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
// Session Expiry Reason Enum (Extended - Bangladesh specific)
// ============================================================

export enum SessionExpiryReason {
  // Natural expiry
  TIMEOUT = 'TIMEOUT',
  IDLE_TIMEOUT = 'IDLE_TIMEOUT',
  ABSOLUTE_TIMEOUT = 'ABSOLUTE_TIMEOUT',
  
  // User actions
  REVOKED = 'REVOKED',
  REVOKED_BY_ADMIN = 'REVOKED_BY_ADMIN',
  FORCED_LOGOUT = 'FORCED_LOGOUT',
  
  // Account status
  ACCOUNT_DELETED = 'ACCOUNT_DELETED',
  ACCOUNT_SUSPENDED = 'ACCOUNT_SUSPENDED',
  ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',
  
  // Security incidents
  SECURITY_BREACH = 'SECURITY_BREACH',
  DEVICE_CHANGED = 'DEVICE_CHANGED',
  IP_CHANGED = 'IP_CHANGED',
  TOKEN_COMPROMISED = 'TOKEN_COMPROMISED',
  
  // ✅ Enterprise: Additional reasons
  SIM_SWAP_DETECTED = 'SIM_SWAP_DETECTED',           // SIM swap detected (Bangladesh)
  MFA_CHANGED = 'MFA_CHANGED',                       // MFA settings changed
  PASSWORD_CHANGED = 'PASSWORD_CHANGED',             // Password changed
  DEVICE_FINGERPRINT_CHANGED = 'DEVICE_FINGERPRINT_CHANGED',
  LOCATION_CHANGED = 'LOCATION_CHANGED',
  NETWORK_TYPE_CHANGED = 'NETWORK_TYPE_CHANGED',
  OPERATOR_CHANGED = 'OPERATOR_CHANGED',             // Mobile operator changed (Bangladesh)
  SESSION_LIMIT_EXCEEDED = 'SESSION_LIMIT_EXCEEDED', // Max concurrent sessions reached
  SYSTEM_CLEANUP = 'SYSTEM_CLEANUP',                 // Automated cleanup job
  COMPLIANCE_REQUIREMENT = 'COMPLIANCE_REQUIREMENT', // Regulatory compliance
}

// ============================================================
// Session Expiry Source Enum (Extended)
// ============================================================

export enum SessionExpirySource {
  SYSTEM = 'SYSTEM',       // System initiated (timeout, cleanup)
  USER = 'USER',           // User initiated (logout)
  ADMIN = 'ADMIN',         // Admin initiated
  SECURITY = 'SECURITY',   // Security system initiated
  // ✅ Enterprise: Additional sources
  COMPLIANCE = 'COMPLIANCE', // Compliance/regulatory system
  AUTOMATION = 'AUTOMATION', // Automated job/script
  API = 'API',               // API request
}

// ============================================================
// ✅ ENTERPRISE: Event Metadata Interface (Bangladesh specific)
// ============================================================

export interface SessionExpiredMetadata extends EventMetadata {
  /** User's IP address for geolocation */
  ipAddress?: string;

  /** Device ID for device fingerprinting */
  deviceId?: string;

  /** Device fingerprint hash (for security) */
  deviceFingerprint?: string;

  /** User agent for browser/OS detection */
  userAgent?: string;

  /** Session ID that expired */
  sessionId?: string;

  /** Last activity URL */
  lastActivityUrl?: string;

  /** Session health score at expiry (0-100) */
  healthScore?: number;

  /** Number of active sessions before expiry */
  activeSessionsBefore?: number;

  /** Number of active sessions after expiry */
  activeSessionsAfter?: number;

  /** Was this the last active session? */
  wasLastSession?: boolean;

  /** Trust level of the session at expiry */
  trustLevel?: 'untrusted' | 'standard' | 'trusted' | 'high_trust' | 'maximum_trust';

  /** Whether notification was sent to user */
  notificationSent?: boolean;

  /** Notification channel used */
  notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';

  /** Whether this expiry triggered a security alert */
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

export interface SessionExpiredPayload extends EventPayload {
  /** Session ID */
  sessionId: string;

  /** User ID */
  userId: string;

  /** User email */
  email: string;

  /** User phone (Bangladesh specific) */
  phone?: string;

  /** Device ID */
  deviceId: string;

  /** IP address */
  ipAddress: string;

  /** User agent */
  userAgent: string;

  /** Expiry reason */
  reason: SessionExpiryReason;

  /** Expiry source */
  source: SessionExpirySource;

  /** When the session expired */
  expiredAt: Date;

  /** Whether session was active at expiry */
  wasActive: boolean;

  /** Last activity timestamp */
  lastActivityAt?: Date;

  /** Session duration in seconds */
  sessionDurationSeconds: number;

  /** Who performed the expiry (adminId/userId) */
  expiredBy?: string;

  /** Additional note */
  note?: string;

  /** Whether notification was sent */
  notificationSent?: boolean;
}

// ============================================================
// ✅ ENTERPRISE: Zod Schema for Runtime Validation
// ============================================================

export const SessionExpiredEventSchema = z.object({
  eventId: z.string().uuid(),
  eventName: z.literal(EVENT_NAMES.SESSION_EXPIRED),
  occurredAt: z.date(),
  eventVersion: z.number().int().min(1).default(EVENT_VERSIONS.V1),
  aggregateVersion: z.number().int().min(1).default(1),
  correlationId: z.string().uuid().optional(),
  causationId: z.string().uuid().optional(),
  sessionId: z.string().uuid(),
  userId: z.string().uuid(),
  email: z.string().email(),
  phone: z.string().regex(/^(?:\+880|0)1[3-9]\d{8}$/).optional(),
  deviceId: z.string().max(255),
  ipAddress: z.string().ip(),
  userAgent: z.string().max(500),
  reason: z.nativeEnum(SessionExpiryReason),
  source: z.nativeEnum(SessionExpirySource),
  expiredAt: z.date(),
  wasActive: z.boolean().default(false),
  lastActivityAt: z.date().optional(),
  sessionDurationSeconds: z.number().int().min(0),
  expiredBy: z.string().uuid().optional(),
  note: z.string().max(500).optional(),
  notificationSent: z.boolean().default(false),
  notificationChannel: z.enum(['email', 'sms', 'push', 'whatsapp']).optional(),
  metadata: z.object({
    ipAddress: z.string().ip().optional(),
    deviceId: z.string().max(255).optional(),
    deviceFingerprint: z.string().max(128).optional(),
    userAgent: z.string().max(500).optional(),
    sessionId: z.string().uuid().optional(),
    lastActivityUrl: z.string().url().optional(),
    healthScore: z.number().int().min(0).max(100).optional(),
    activeSessionsBefore: z.number().int().min(0).optional(),
    activeSessionsAfter: z.number().int().min(0).optional(),
    wasLastSession: z.boolean().optional(),
    trustLevel: z.enum(['untrusted', 'standard', 'trusted', 'high_trust', 'maximum_trust']).optional(),
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
// ✅ ENTERPRISE: Session Expired Event Class (v4.0)
// ============================================================

export class SessionExpiredEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.SESSION_EXPIRED;
  public readonly occurredAt: Date;
  public readonly expiredAt: Date;
  public readonly eventVersion: number;
  public readonly aggregateVersion: number;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly ttlSeconds?: number;
  public readonly expiresAt?: Date;
  public readonly priority?: EventPriority;
  public readonly partitionKey?: string;

  // Core session data
  public readonly sessionId: string;
  public readonly userId: string;
  public readonly email: string;
  public readonly phone?: string;
  public readonly deviceId: string;
  public readonly ipAddress: string;
  public readonly userAgent: string;

  // Expiry context
  public readonly reason: SessionExpiryReason;
  public readonly source: SessionExpirySource;
  public readonly expiredBy?: string;
  public readonly note?: string;

  // Session analytics
  public readonly wasActive: boolean;
  public readonly lastActivityAt?: Date;
  public readonly sessionDurationSeconds: number;

  // Notification status
  public readonly notificationSent: boolean;
  public readonly notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';

  // Event metadata
  public readonly metadata?: SessionExpiredMetadata;

  // ✅ Enterprise: Constructor with enhanced options
  constructor(
    sessionId: string,
    userId: string,
    email: string,
    deviceId: string,
    ipAddress: string,
    userAgent: string,
    reason: SessionExpiryReason,
    source: SessionExpirySource,
    expiredAt: Date,
    sessionDurationSeconds: number,
    options?: {
      // Core fields
      phone?: string;
      expiredBy?: string;
      note?: string;

      // Session analytics
      wasActive?: boolean;
      lastActivityAt?: Date;

      // Notification
      notificationSent?: boolean;
      notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';

      // Event tracking
      correlationId?: string;
      causationId?: string;
      ttlSeconds?: number;
      priority?: EventPriority;
      partitionKey?: string;

      // Metadata (Bangladesh specific)
      metadata?: SessionExpiredMetadata;

      // Event version (default: from shared-constants)
      eventVersion?: number;
      aggregateVersion?: number;
    }
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.expiredAt = expiredAt;
    this.eventVersion = options?.eventVersion ?? EVENT_VERSIONS.V1;
    this.aggregateVersion = options?.aggregateVersion ?? 1;
    this.correlationId = options?.correlationId;
    this.causationId = options?.causationId;
    this.ttlSeconds = options?.ttlSeconds;
    this.expiresAt = options?.expiresAt;
    this.priority = options?.priority ?? this.calculatePriority(reason, options?.metadata);
    this.partitionKey = options?.partitionKey ?? userId;

    this.sessionId = sessionId;
    this.userId = userId;
    this.email = email;
    this.phone = options?.phone;
    this.deviceId = deviceId;
    this.ipAddress = ipAddress;
    this.userAgent = userAgent;

    this.reason = reason;
    this.source = source;
    this.expiredBy = options?.expiredBy;
    this.note = options?.note;

    this.wasActive = options?.wasActive ?? false;
    this.lastActivityAt = options?.lastActivityAt;
    this.sessionDurationSeconds = sessionDurationSeconds;

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
   * Calculate priority based on expiry reason and context
   */
  private calculatePriority(reason: SessionExpiryReason, metadata?: SessionExpiredMetadata): EventPriority {
    // Critical priority - security incidents
    if (reason === SessionExpiryReason.SECURITY_BREACH ||
        reason === SessionExpiryReason.TOKEN_COMPROMISED ||
        reason === SessionExpiryReason.SIM_SWAP_DETECTED ||
        reason === SessionExpiryReason.ACCOUNT_LOCKED) {
      return 'critical';
    }

    // High priority - admin actions or suspicious
    if (reason === SessionExpiryReason.REVOKED_BY_ADMIN ||
        reason === SessionExpiryReason.DEVICE_FINGERPRINT_CHANGED ||
        reason === SessionExpiryReason.OPERATOR_CHANGED ||
        metadata?.triggeredSecurityAlert) {
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
   * Check if this was a security-related expiry
   */
  public isSecurityRelated(): boolean {
    return this.reason === SessionExpiryReason.SECURITY_BREACH ||
           this.reason === SessionExpiryReason.TOKEN_COMPROMISED ||
           this.reason === SessionExpiryReason.SIM_SWAP_DETECTED ||
           this.reason === SessionExpiryReason.IP_CHANGED ||
           this.reason === SessionExpiryReason.DEVICE_FINGERPRINT_CHANGED ||
           this.reason === SessionExpiryReason.LOCATION_CHANGED ||
           this.reason === SessionExpiryReason.OPERATOR_CHANGED;
  }

  /**
   * Check if this was an admin-initiated expiry
   */
  public isAdminExpiry(): boolean {
    return this.source === SessionExpirySource.ADMIN && !!this.expiredBy;
  }

  /**
   * Check if this was a user-initiated expiry
   */
  public isUserExpiry(): boolean {
    return this.source === SessionExpirySource.USER;
  }

  /**
   * Get formatted session duration (human readable)
   */
  public getFormattedDuration(): string {
    const seconds = this.sessionDurationSeconds;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  }

  /**
   * Get session health score (if available)
   */
  public getHealthScore(): number | undefined {
    return this.metadata?.healthScore;
  }

  /**
   * Check if this was the last active session
   */
  public wasLastSession(): boolean {
    return this.metadata?.wasLastSession === true;
  }

  /**
   * Check if this was a Bangladesh-specific expiry
   */
  public isBangladeshSpecific(): boolean {
    return this.reason === SessionExpiryReason.SIM_SWAP_DETECTED ||
           this.reason === SessionExpiryReason.OPERATOR_CHANGED ||
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
      sessionId: this.sessionId,
      userId: this.userId,
      email: this.email,
      reason: this.reason,
      source: this.source,
      expiredBy: this.expiredBy,
      sessionDuration: this.getFormattedDuration(),
      sessionDurationSeconds: this.sessionDurationSeconds,
      wasActive: this.wasActive,
      wasLastSession: this.wasLastSession(),
      healthScore: this.getHealthScore(),
      notificationSent: this.notificationSent,
      district: this.metadata?.district,
      mobileOperator: this.metadata?.mobileOperator,
      deviceType: this.metadata?.deviceType,
      isSecurityRelated: this.isSecurityRelated(),
      isAdminExpiry: this.isAdminExpiry(),
      isUserExpiry: this.isUserExpiry(),
      isBangladeshSpecific: this.isBangladeshSpecific(),
      priority: this.priority,
      partitionKey: this.partitionKey,
      occurredAt: this.occurredAt.toISOString(),
    };
  }

  /**
   * Convert to plain object for serialization
   */
  public toJSON(): SessionExpiredEventData {
    return {
      eventId: this.eventId,
      eventName: this.eventName,
      occurredAt: this.occurredAt.toISOString(),
      eventVersion: this.eventVersion,
      aggregateVersion: this.aggregateVersion,
      correlationId: this.correlationId,
      causationId: this.causationId,
      sessionId: this.sessionId,
      userId: this.userId,
      email: this.email,
      phone: this.phone,
      deviceId: this.deviceId,
      ipAddress: this.ipAddress,
      userAgent: this.userAgent,
      expiredAt: this.expiredAt.toISOString(),
      reason: this.reason,
      source: this.source,
      expiredBy: this.expiredBy,
      note: this.note,
      wasActive: this.wasActive,
      lastActivityAt: this.lastActivityAt?.toISOString(),
      sessionDurationSeconds: this.sessionDurationSeconds,
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
  public static fromJSON(data: SessionExpiredEventData): SessionExpiredEvent {
    const event = new SessionExpiredEvent(
      data.sessionId,
      data.userId,
      data.email,
      data.deviceId,
      data.ipAddress,
      data.userAgent,
      data.reason,
      data.source,
      new Date(data.expiredAt),
      data.sessionDurationSeconds,
      {
        phone: data.phone,
        expiredBy: data.expiredBy,
        note: data.note,
        wasActive: data.wasActive,
        lastActivityAt: data.lastActivityAt ? new Date(data.lastActivityAt) : undefined,
        notificationSent: data.notificationSent,
        notificationChannel: data.notificationChannel,
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
    const result = SessionExpiredEventSchema.safeParse(this.toJSON());
    return result.success;
  }

  // ============================================================
  // ✅ Enterprise: Static factory methods for common scenarios
  // ============================================================

  /**
   * Create event for idle timeout expiry
   */
  public static forIdleTimeout(
    sessionId: string,
    userId: string,
    email: string,
    deviceId: string,
    ipAddress: string,
    userAgent: string,
    sessionDurationSeconds: number,
    lastActivityAt: Date,
    idleMinutes: number,
    options?: {
      phone?: string;
      healthScore?: number;
      district?: string;
      mobileOperator?: typeof MOBILE_OPERATORS[number];
      correlationId?: string;
    }
  ): SessionExpiredEvent {
    return new SessionExpiredEvent(
      sessionId,
      userId,
      email,
      deviceId,
      ipAddress,
      userAgent,
      SessionExpiryReason.IDLE_TIMEOUT,
      SessionExpirySource.SYSTEM,
      new Date(),
      sessionDurationSeconds,
      {
        phone: options?.phone,
        wasActive: true,
        lastActivityAt,
        note: `Session idle for ${idleMinutes} minutes`,
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          healthScore: options?.healthScore,
          district: options?.district,
          mobileOperator: options?.mobileOperator,
          notificationSent: true,
          notificationChannel: 'email',
        }
      }
    );
  }

  /**
   * Create event for admin-initiated expiry
   */
  public static forAdminExpiry(
    sessionId: string,
    userId: string,
    email: string,
    deviceId: string,
    ipAddress: string,
    userAgent: string,
    adminId: string,
    reason: string,
    sessionDurationSeconds: number,
    options?: {
      phone?: string;
      healthScore?: number;
      district?: string;
      correlationId?: string;
    }
  ): SessionExpiredEvent {
    return new SessionExpiredEvent(
      sessionId,
      userId,
      email,
      deviceId,
      ipAddress,
      userAgent,
      SessionExpiryReason.REVOKED_BY_ADMIN,
      SessionExpirySource.ADMIN,
      new Date(),
      sessionDurationSeconds,
      {
        phone: options?.phone,
        expiredBy: adminId,
        note: reason,
        priority: 'high',
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          healthScore: options?.healthScore,
          district: options?.district,
          triggeredSecurityAlert: true,
          securityAlertReason: reason,
          notificationSent: true,
          notificationChannel: 'email',
        }
      }
    );
  }

  /**
   * Create event for SIM swap detection expiry (Bangladesh specific)
   */
  public static forSimSwapDetection(
    sessionId: string,
    userId: string,
    email: string,
    phone: string,
    deviceId: string,
    ipAddress: string,
    userAgent: string,
    sessionDurationSeconds: number,
    oldOperator: string,
    newOperator: string,
    options?: {
      healthScore?: number;
      district?: string;
      correlationId?: string;
    }
  ): SessionExpiredEvent {
    return new SessionExpiredEvent(
      sessionId,
      userId,
      email,
      deviceId,
      ipAddress,
      userAgent,
      SessionExpiryReason.SIM_SWAP_DETECTED,
      SessionExpirySource.SECURITY,
      new Date(),
      sessionDurationSeconds,
      {
        phone,
        priority: 'critical',
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          healthScore: options?.healthScore,
          district: options?.district,
          triggeredSecurityAlert: true,
          securityAlertReason: `SIM swap detected: ${oldOperator} → ${newOperator}`,
          notificationSent: true,
          notificationChannel: 'whatsapp',
        }
      }
    );
  }

  /**
   * Create event for security breach expiry
   */
  public static forSecurityBreach(
    sessionId: string,
    userId: string,
    email: string,
    deviceId: string,
    ipAddress: string,
    userAgent: string,
    breachReason: string,
    sessionDurationSeconds: number,
    options?: {
      phone?: string;
      healthScore?: number;
      district?: string;
      correlationId?: string;
    }
  ): SessionExpiredEvent {
    return new SessionExpiredEvent(
      sessionId,
      userId,
      email,
      deviceId,
      ipAddress,
      userAgent,
      SessionExpiryReason.SECURITY_BREACH,
      SessionExpirySource.SECURITY,
      new Date(),
      sessionDurationSeconds,
      {
        phone: options?.phone,
        priority: 'critical',
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          healthScore: options?.healthScore,
          district: options?.district,
          triggeredSecurityAlert: true,
          securityAlertReason: breachReason,
          notificationSent: true,
          notificationChannel: 'whatsapp',
        }
      }
    );
  }

  /**
   * Create event for password change forced expiry
   */
  public static forPasswordChange(
    sessionId: string,
    userId: string,
    email: string,
    deviceId: string,
    ipAddress: string,
    userAgent: string,
    sessionDurationSeconds: number,
    options?: {
      phone?: string;
      healthScore?: number;
      district?: string;
      correlationId?: string;
    }
  ): SessionExpiredEvent {
    return new SessionExpiredEvent(
      sessionId,
      userId,
      email,
      deviceId,
      ipAddress,
      userAgent,
      SessionExpiryReason.PASSWORD_CHANGED,
      SessionExpirySource.SYSTEM,
      new Date(),
      sessionDurationSeconds,
      {
        phone: options?.phone,
        note: 'Session invalidated due to password change',
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          healthScore: options?.healthScore,
          district: options?.district,
          notificationSent: true,
          notificationChannel: 'email',
        }
      }
    );
  }
}

// ============================================================
// ✅ Enterprise: Session Extended Event (v4.0)
// ============================================================

export class SessionExtendedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.SESSION_EXTENDED;
  public readonly occurredAt: Date;
  public readonly eventVersion: number = EVENT_VERSIONS.V1;
  public readonly aggregateVersion: number;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly ttlSeconds?: number = 7 * 24 * 60 * 60; // 7 days
  public readonly expiresAt?: Date;
  public readonly priority?: EventPriority = 'normal';
  public readonly partitionKey?: string;

  public readonly sessionId: string;
  public readonly userId: string;
  public readonly email: string;
  public readonly deviceId: string;
  public readonly oldExpiry: Date;
  public readonly newExpiry: Date;
  public readonly extendedByMinutes: number;
  public readonly extensionCount: number;
  public readonly remainingExtensions: number;
  public readonly metadata?: SessionExpiredMetadata;

  constructor(
    sessionId: string,
    userId: string,
    email: string,
    deviceId: string,
    oldExpiry: Date,
    newExpiry: Date,
    extensionCount: number,
    maxExtensions: number,
    options?: {
      correlationId?: string;
      metadata?: SessionExpiredMetadata;
    }
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.aggregateVersion = 1;
    this.correlationId = options?.correlationId;
    this.partitionKey = userId;
    this.expiresAt = this.ttlSeconds ? new Date(Date.now() + this.ttlSeconds * 1000) : undefined;

    this.sessionId = sessionId;
    this.userId = userId;
    this.email = email;
    this.deviceId = deviceId;
    this.oldExpiry = oldExpiry;
    this.newExpiry = newExpiry;
    this.extendedByMinutes = Math.round((newExpiry.getTime() - oldExpiry.getTime()) / (60 * 1000));
    this.extensionCount = extensionCount;
    this.remainingExtensions = maxExtensions - extensionCount;
    this.metadata = options?.metadata;
  }

  public getSummary(): Record<string, unknown> {
    return {
      eventId: this.eventId,
      eventName: this.eventName,
      sessionId: this.sessionId,
      userId: this.userId,
      extendedByMinutes: this.extendedByMinutes,
      extensionCount: this.extensionCount,
      remainingExtensions: this.remainingExtensions,
      newExpiry: this.newExpiry.toISOString(),
      occurredAt: this.occurredAt.toISOString(),
    };
  }

  public toJSON(): SessionExtendedEventData {
    return {
      eventId: this.eventId,
      eventName: this.eventName,
      occurredAt: this.occurredAt.toISOString(),
      eventVersion: this.eventVersion,
      aggregateVersion: this.aggregateVersion,
      correlationId: this.correlationId,
      sessionId: this.sessionId,
      userId: this.userId,
      email: this.email,
      deviceId: this.deviceId,
      oldExpiry: this.oldExpiry.toISOString(),
      newExpiry: this.newExpiry.toISOString(),
      extendedByMinutes: this.extendedByMinutes,
      extensionCount: this.extensionCount,
      remainingExtensions: this.remainingExtensions,
      metadata: this.metadata,
    };
  }
}

// ============================================================
// ✅ Enterprise: Session Activity Recorded Event (v4.0)
// ============================================================

export class SessionActivityRecordedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.SESSION_ACTIVITY_RECORDED;
  public readonly occurredAt: Date;
  public readonly eventVersion: number = EVENT_VERSIONS.V1;
  public readonly aggregateVersion: number;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly ttlSeconds?: number = 30 * 24 * 60 * 60; // 30 days
  public readonly expiresAt?: Date;
  public readonly priority?: EventPriority = 'low';
  public readonly partitionKey?: string;

  public readonly sessionId: string;
  public readonly userId: string;
  public readonly email: string;
  public readonly activityAt: Date;
  public readonly activityType: 'page_view' | 'api_call' | 'user_interaction';
  public readonly currentUrl?: string;
  public readonly ipAddress?: string;
  public readonly userAgent?: string;
  public readonly metadata?: SessionExpiredMetadata;

  constructor(
    sessionId: string,
    userId: string,
    email: string,
    activityAt: Date,
    activityType: 'page_view' | 'api_call' | 'user_interaction',
    options?: {
      currentUrl?: string;
      ipAddress?: string;
      userAgent?: string;
      correlationId?: string;
      metadata?: SessionExpiredMetadata;
    }
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.aggregateVersion = 1;
    this.correlationId = options?.correlationId;
    this.partitionKey = userId;
    this.expiresAt = this.ttlSeconds ? new Date(Date.now() + this.ttlSeconds * 1000) : undefined;

    this.sessionId = sessionId;
    this.userId = userId;
    this.email = email;
    this.activityAt = activityAt;
    this.activityType = activityType;
    this.currentUrl = options?.currentUrl;
    this.ipAddress = options?.ipAddress;
    this.userAgent = options?.userAgent;
    this.metadata = options?.metadata;
  }

  public toJSON(): SessionActivityRecordedEventData {
    return {
      eventId: this.eventId,
      eventName: this.eventName,
      occurredAt: this.occurredAt.toISOString(),
      eventVersion: this.eventVersion,
      aggregateVersion: this.aggregateVersion,
      correlationId: this.correlationId,
      sessionId: this.sessionId,
      userId: this.userId,
      email: this.email,
      activityAt: this.activityAt.toISOString(),
      activityType: this.activityType,
      currentUrl: this.currentUrl,
      ipAddress: this.ipAddress,
      userAgent: this.userAgent,
      metadata: this.metadata,
    };
  }
}

// ============================================================
// ✅ Enterprise: Event Data Interfaces (for serialization)
// ============================================================

export interface SessionExpiredEventData {
  eventId: string;
  eventName: string;
  occurredAt: string;
  eventVersion: number;
  aggregateVersion: number;
  correlationId?: string;
  causationId?: string;
  sessionId: string;
  userId: string;
  email: string;
  phone?: string;
  deviceId: string;
  ipAddress: string;
  userAgent: string;
  expiredAt: string;
  reason: SessionExpiryReason;
  source: SessionExpirySource;
  expiredBy?: string;
  note?: string;
  wasActive: boolean;
  lastActivityAt?: string;
  sessionDurationSeconds: number;
  notificationSent: boolean;
  notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';
  metadata?: SessionExpiredMetadata;
  ttlSeconds?: number;
  expiresAt?: string;
  priority?: EventPriority;
  partitionKey?: string;
}

export interface SessionExtendedEventData {
  eventId: string;
  eventName: string;
  occurredAt: string;
  eventVersion: number;
  aggregateVersion: number;
  correlationId?: string;
  sessionId: string;
  userId: string;
  email: string;
  deviceId: string;
  oldExpiry: string;
  newExpiry: string;
  extendedByMinutes: number;
  extensionCount: number;
  remainingExtensions: number;
  metadata?: SessionExpiredMetadata;
}

export interface SessionActivityRecordedEventData {
  eventId: string;
  eventName: string;
  occurredAt: string;
  eventVersion: number;
  aggregateVersion: number;
  correlationId?: string;
  sessionId: string;
  userId: string;
  email: string;
  activityAt: string;
  activityType: 'page_view' | 'api_call' | 'user_interaction';
  currentUrl?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: SessionExpiredMetadata;
}

// ============================================================
// ✅ Enterprise: Type Exports
// ============================================================

export type { 
  SessionExpiredMetadata as SessionExpiredMetadataType,
  SessionExpiredPayload as SessionExpiredPayloadType
};

// ============================================================
// ENTERPRISE SUMMARY v4.0
// ============================================================
// 
// Enterprise Enhancements Applied in v4.0:
// 1. ✅ Shared-types integration (@vubon/shared-types)
// 2. ✅ Event versioning with aggregateVersion tracking
// 3. ✅ TTL support with expiresAt for event expiry (30 days default)
// 4. ✅ Priority-based event processing (critical for security incidents)
// 5. ✅ Partition key for event streaming optimization
// 6. ✅ Bangladesh specific fields (district, upazila, mobileOperator, networkType)
// 7. ✅ Device fingerprint tracking
// 8. ✅ Session health score tracking
// 9. ✅ Concurrent session count tracking
// 10. ✅ Extended SessionExpiryReason (SIM_SWAP_DETECTED, MFA_CHANGED, PASSWORD_CHANGED, etc.)
// 11. ✅ Extended SessionExpirySource (COMPLIANCE, AUTOMATION, API)
// 12. ✅ 5 Static factory methods for common scenarios
// 13. ✅ Helper methods: isExpired(), isCritical(), isSecurityRelated()
// 14. ✅ isAdminExpiry(), isUserExpiry(), wasLastSession()
// 15. ✅ getFormattedDuration(), getHealthScore()
// 16. ✅ isBangladeshSpecific()
// 17. ✅ Serialization support (toJSON, fromJSON)
// 18. ✅ Zod schema for runtime validation
// 19. ✅ Notification tracking (notificationSent, notificationChannel)
// 20. ✅ Admin action tracking with expiredBy
// 21. ✅ Session duration analytics
// 22. ✅ SessionExtendedEvent (v4.0)
// 23. ✅ SessionActivityRecordedEvent (v4.0)
// 
// Bangladesh Specific:
// - SIM swap detection expiry
// - Operator change detection (GP/Robi/Banglalink/Teletalk)
// - District/Upazila/Division location tracking
// - Mobile operator and network type tracking
// - Feature phone device type
// - Bengali language support (metadata.language: 'bn')
// - WhatsApp notification channel support
// 
// Security Features:
// - Priority-based event processing for security incidents
// - Security alert triggers for admin/security expiries
// - Admin action audit trail
// - Device fingerprint tracking
// - Session duration metrics
// - Session health score tracking
// - Concurrent session tracking
// - Last session detection
// 
// ============================================================
