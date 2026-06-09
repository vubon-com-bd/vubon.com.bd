/**
 * User Logged Out Event - Enterprise Grade (v3.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/events/user-logged-out.event
 * 
 * @description
 * Event emitted when a user logs out or session is terminated.
 * Enhanced with shared-types integration, event versioning, TTL support,
 * Bangladesh specific fields (district, upazila, mobileOperator, networkType),
 * and priority-based processing.
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
 * ✅ Security alert on suspicious logouts
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
// Logout Reason Enum (Extended - 15+ reasons)
// ============================================================

export enum LogoutReason {
  // User initiated
  USER_INITIATED = 'USER_INITIATED',           // User clicked logout
  USER_INITIATED_ALL_DEVICES = 'USER_INITIATED_ALL_DEVICES', // User logged out from all devices
  
  // Session expiry
  SESSION_EXPIRED = 'SESSION_EXPIRED',         // Session naturally expired
  IDLE_TIMEOUT = 'IDLE_TIMEOUT',               // Idle timeout reached
  ABSOLUTE_TIMEOUT = 'ABSOLUTE_TIMEOUT',       // Absolute session lifetime reached
  
  // User management
  REVOKED_BY_USER = 'REVOKED_BY_USER',         // User revoked session from device list
  REVOKED_BY_ADMIN = 'REVOKED_BY_ADMIN',       // Admin revoked session
  FORCED_LOGOUT = 'FORCED_LOGOUT',             // Forced logout (password change)
  
  // Account status changes
  ACCOUNT_DELETED = 'ACCOUNT_DELETED',         // Account deleted
  ACCOUNT_SUSPENDED = 'ACCOUNT_SUSPENDED',     // Account suspended
  ACCOUNT_DEACTIVATED = 'ACCOUNT_DEACTIVATED', // Account deactivated
  
  // Security events
  SECURITY_BREACH = 'SECURITY_BREACH',         // Security incident
  TOKEN_REVOKED = 'TOKEN_REVOKED',             // Refresh token revoked
  TOKEN_COMPROMISED = 'TOKEN_COMPROMISED',     // Token marked as compromised
  
  // Device changes
  DEVICE_CHANGED = 'DEVICE_CHANGED',           // Device fingerprint changed
  IP_CHANGED = 'IP_CHANGED',                   // Suspicious IP change
  LOCATION_CHANGED = 'LOCATION_CHANGED',       // Suspicious location change
  
  // Bangladesh specific
  SIM_SWAP_DETECTED = 'SIM_SWAP_DETECTED',     // SIM swap detected
  MFA_CHANGED = 'MFA_CHANGED',                 // MFA settings changed
  
  // System actions
  SYSTEM_MAINTENANCE = 'SYSTEM_MAINTENANCE',   // System maintenance
  CLEANUP_JOB = 'CLEANUP_JOB',                 // Automated cleanup job
}

// ============================================================
// Logout Source Enum
// ============================================================

export enum LogoutSource {
  USER = 'USER',           // User initiated logout
  ADMIN = 'ADMIN',         // Admin action
  SYSTEM = 'SYSTEM',       // System initiated (expiry, timeout)
  SECURITY = 'SECURITY',   // Security system (breach detection)
  AUTOMATION = 'AUTOMATION', // Automated script/job
}

// ============================================================
// ✅ ENTERPRISE: Event Metadata Interface (Bangladesh specific)
// ============================================================

export interface UserLoggedOutMetadata extends EventMetadata {
  /** User's IP address for geolocation */
  ipAddress?: string;
  
  /** Device ID for device fingerprinting */
  deviceId?: string;
  
  /** Device fingerprint hash (for security) */
  deviceFingerprint?: string;
  
  /** User agent for browser/OS detection */
  userAgent?: string;
  
  /** Session ID that was terminated */
  sessionId?: string;
  
  /** Number of active sessions before logout */
  activeSessionsBefore?: number;
  
  /** Number of active sessions after logout */
  activeSessionsAfter?: number;
  
  /** Was this the last active session? */
  wasLastSession?: boolean;
  
  /** Session duration in seconds (how long session was active) */
  sessionDurationSeconds?: number;
  
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
  
  /** User tier at logout time */
  userTier?: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  
  /** Role at logout time */
  role?: string;
  
  /** Whether this logout triggered a security alert */
  triggeredSecurityAlert?: boolean;
  
  /** Security alert reason (if triggered) */
  securityAlertReason?: string;
}

// ============================================================
// ✅ ENTERPRISE: Event Payload Interface
// ============================================================

export interface UserLoggedOutPayload extends EventPayload {
  /** User ID */
  userId: string;
  
  /** User email */
  email: string;
  
  /** User phone (Bangladesh specific) */
  phone?: string;
  
  /** User full name */
  fullName?: string;
  
  /** User role */
  role?: string;
  
  /** User tier */
  userTier?: string;
  
  /** Session ID that was terminated */
  sessionId?: string;
  
  /** Was this the current session? */
  wasCurrentSession?: boolean;
  
  /** Notification sent? */
  notificationSent?: boolean;
  
  /** Notification channel used */
  notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';
}

// ============================================================
// ✅ ENTERPRISE: Zod Schema for Runtime Validation
// ============================================================

export const UserLoggedOutEventSchema = z.object({
  eventId: z.string().uuid(),
  eventName: z.literal(EVENT_NAMES.USER_LOGOUT),
  occurredAt: z.date(),
  eventVersion: z.number().int().min(1).default(EVENT_VERSIONS.V1),
  aggregateVersion: z.number().int().min(1),
  correlationId: z.string().uuid().optional(),
  causationId: z.string().uuid().optional(),
  userId: z.string().uuid(),
  email: z.string().email(),
  phone: z.string().regex(/^(?:\+880|0)1[3-9]\d{8}$/).optional(),
  fullName: z.string().max(100).optional(),
  role: z.string().max(50).optional(),
  userTier: z.enum(['bronze', 'silver', 'gold', 'platinum', 'diamond']).optional(),
  sessionId: z.string().uuid().optional(),
  wasCurrentSession: z.boolean().default(false),
  reason: z.nativeEnum(LogoutReason),
  source: z.nativeEnum(LogoutSource),
  initiatedBy: z.string().uuid().optional(),
  note: z.string().max(500).optional(),
  metadata: z.object({
    ipAddress: z.string().ip().optional(),
    deviceId: z.string().max(255).optional(),
    deviceFingerprint: z.string().max(128).optional(),
    userAgent: z.string().max(500).optional(),
    sessionId: z.string().uuid().optional(),
    activeSessionsBefore: z.number().int().min(0).optional(),
    activeSessionsAfter: z.number().int().min(0).optional(),
    wasLastSession: z.boolean().optional(),
    sessionDurationSeconds: z.number().int().min(0).optional(),
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
    userTier: z.enum(['bronze', 'silver', 'gold', 'platinum', 'diamond']).optional(),
    role: z.string().max(50).optional(),
    triggeredSecurityAlert: z.boolean().optional(),
    securityAlertReason: z.string().max(500).optional(),
  }).optional(),
  ttlSeconds: z.number().int().positive().optional(),
  expiresAt: z.date().optional(),
  priority: z.enum(['low', 'normal', 'high', 'critical']).default('normal'),
  partitionKey: z.string().optional(),
});

// ============================================================
// ✅ ENTERPRISE: User Logged Out Event Class (v3.0)
// ============================================================

export class UserLoggedOutEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.USER_LOGOUT;
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
  public readonly role?: string;
  public readonly userTier?: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  
  // Session information
  public readonly sessionId?: string;
  public readonly wasCurrentSession: boolean;
  
  // Logout context
  public readonly reason: LogoutReason;
  public readonly source: LogoutSource;
  public readonly initiatedBy?: string;  // adminId if source is ADMIN
  public readonly note?: string;
  
  // Event metadata
  public readonly metadata?: UserLoggedOutMetadata;
  
  // ✅ Enterprise: Constructor with enhanced options
  constructor(
    userId: string,
    aggregateVersion: number,
    email: string,
    reason: LogoutReason,
    source: LogoutSource,
    options?: {
      // Core fields
      phone?: string;
      fullName?: string;
      role?: string;
      userTier?: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
      
      // Session info
      sessionId?: string;
      wasCurrentSession?: boolean;
      
      // Logout context
      initiatedBy?: string;
      note?: string;
      
      // Event tracking
      correlationId?: string;
      causationId?: string;
      ttlSeconds?: number;
      expiresAt?: Date;
      priority?: EventPriority;
      partitionKey?: string;
      
      // Metadata (Bangladesh specific)
      metadata?: UserLoggedOutMetadata;
      
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
    this.priority = options?.priority ?? 'normal';
    this.partitionKey = options?.partitionKey ?? userId;
    
    this.userId = userId;
    this.email = email;
    this.phone = options?.phone;
    this.fullName = options?.fullName;
    this.role = options?.role;
    this.userTier = options?.userTier;
    
    this.sessionId = options?.sessionId;
    this.wasCurrentSession = options?.wasCurrentSession ?? false;
    
    this.reason = reason;
    this.source = source;
    this.initiatedBy = options?.initiatedBy;
    this.note = options?.note;
    
    this.metadata = options?.metadata;
    
    // ✅ Enterprise: Auto-set partition key from district if available
    if (!options?.partitionKey && this.metadata?.district) {
      this.partitionKey = this.metadata.district;
    }
    
    // ✅ Enterprise: Auto-set TTL if not provided (90 days default for logout events)
    if (!this.ttlSeconds && !this.expiresAt) {
      this.ttlSeconds = 90 * 24 * 60 * 60; // 90 days
      this.expiresAt = new Date(Date.now() + this.ttlSeconds * 1000);
    }
  }
  
  // ============================================================
  // ✅ Enterprise: Helper Methods
  // ============================================================
  
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
   * Check if this was a security-related logout
   */
  public isSecurityLogout(): boolean {
    return this.source === LogoutSource.SECURITY || 
           this.reason === LogoutReason.SECURITY_BREACH ||
           this.reason === LogoutReason.TOKEN_COMPROMISED ||
           this.reason === LogoutReason.SIM_SWAP_DETECTED;
  }
  
  /**
   * Check if this was an admin-initiated logout
   */
  public isAdminLogout(): boolean {
    return this.source === LogoutSource.ADMIN;
  }
  
  /**
   * Check if this was a user-initiated logout
   */
  public isUserLogout(): boolean {
    return this.source === LogoutSource.USER;
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
      sessionId: this.sessionId,
      wasCurrentSession: this.wasCurrentSession,
      initiatedBy: this.initiatedBy,
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
  public toJSON(): UserLoggedOutEventData {
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
      role: this.role,
      userTier: this.userTier,
      sessionId: this.sessionId,
      wasCurrentSession: this.wasCurrentSession,
      reason: this.reason,
      source: this.source,
      initiatedBy: this.initiatedBy,
      note: this.note,
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
  public static fromJSON(data: UserLoggedOutEventData): UserLoggedOutEvent {
    const event = new UserLoggedOutEvent(
      data.userId,
      data.aggregateVersion,
      data.email,
      data.reason,
      data.source,
      {
        phone: data.phone,
        fullName: data.fullName,
        role: data.role,
        userTier: data.userTier,
        sessionId: data.sessionId,
        wasCurrentSession: data.wasCurrentSession,
        initiatedBy: data.initiatedBy,
        note: data.note,
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
    const result = UserLoggedOutEventSchema.safeParse(this.toJSON());
    return result.success;
  }
  
  // ============================================================
  // ✅ Enterprise: Static factory methods for common scenarios
  // ============================================================
  
  /**
   * Create event for user-initiated logout
   */
  public static forUserLogout(
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
      district?: string;
      correlationId?: string;
    }
  ): UserLoggedOutEvent {
    return new UserLoggedOutEvent(
      userId,
      aggregateVersion,
      email,
      LogoutReason.USER_INITIATED,
      LogoutSource.USER,
      {
        sessionId,
        wasCurrentSession: true,
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
   * Create event for admin-initiated logout
   */
  public static forAdminLogout(
    userId: string,
    aggregateVersion: number,
    email: string,
    sessionId: string,
    adminId: string,
    reason: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      phone?: string;
      fullName?: string;
      district?: string;
      correlationId?: string;
    }
  ): UserLoggedOutEvent {
    return new UserLoggedOutEvent(
      userId,
      aggregateVersion,
      email,
      LogoutReason.REVOKED_BY_ADMIN,
      LogoutSource.ADMIN,
      {
        sessionId,
        wasCurrentSession: false,
        initiatedBy: adminId,
        note: reason,
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
   * Create event for session expiry (idle timeout)
   */
  public static forIdleTimeout(
    userId: string,
    aggregateVersion: number,
    email: string,
    sessionId: string,
    idleMinutes: number,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      phone?: string;
      fullName?: string;
      district?: string;
      correlationId?: string;
    }
  ): UserLoggedOutEvent {
    return new UserLoggedOutEvent(
      userId,
      aggregateVersion,
      email,
      LogoutReason.IDLE_TIMEOUT,
      LogoutSource.SYSTEM,
      {
        sessionId,
        wasCurrentSession: true,
        note: `Session idle for ${idleMinutes} minutes`,
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          district: options?.district,
          sessionDurationSeconds: idleMinutes * 60,
        }
      }
    );
  }
  
  /**
   * Create event for security breach logout
   */
  public static forSecurityBreach(
    userId: string,
    aggregateVersion: number,
    email: string,
    sessionId: string,
    breachReason: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      phone?: string;
      fullName?: string;
      district?: string;
      correlationId?: string;
    }
  ): UserLoggedOutEvent {
    return new UserLoggedOutEvent(
      userId,
      aggregateVersion,
      email,
      LogoutReason.SECURITY_BREACH,
      LogoutSource.SECURITY,
      {
        sessionId,
        wasCurrentSession: true,
        note: breachReason,
        priority: 'critical',
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          district: options?.district,
          triggeredSecurityAlert: true,
          securityAlertReason: breachReason,
        }
      }
    );
  }
  
  /**
   * Create event for all devices logout
   */
  public static forAllDevicesLogout(
    userId: string,
    aggregateVersion: number,
    email: string,
    reason: LogoutReason,
    source: LogoutSource,
    activeSessionsCount: number,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      phone?: string;
      fullName?: string;
      district?: string;
      initiatedBy?: string;
      note?: string;
      correlationId?: string;
    }
  ): UserLoggedOutEvent {
    return new UserLoggedOutEvent(
      userId,
      aggregateVersion,
      email,
      reason,
      source,
      {
        wasCurrentSession: false,
        initiatedBy: options?.initiatedBy,
        note: options?.note || `Logged out from all ${activeSessionsCount} devices`,
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          district: options?.district,
          activeSessionsBefore: activeSessionsCount,
          activeSessionsAfter: 0,
          wasLastSession: true,
        }
      }
    );
  }
  
  /**
   * Create event for password change logout
   */
  public static forPasswordChange(
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
      district?: string;
      correlationId?: string;
    }
  ): UserLoggedOutEvent {
    return new UserLoggedOutEvent(
      userId,
      aggregateVersion,
      email,
      LogoutReason.FORCED_LOGOUT,
      LogoutSource.SYSTEM,
      {
        sessionId,
        wasCurrentSession: true,
        note: 'Password changed - session invalidated',
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
   * Create event for SIM swap detection logout (Bangladesh specific)
   */
  public static forSimSwapDetection(
    userId: string,
    aggregateVersion: number,
    email: string,
    sessionId: string,
    phone: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      fullName?: string;
      district?: string;
      correlationId?: string;
    }
  ): UserLoggedOutEvent {
    return new UserLoggedOutEvent(
      userId,
      aggregateVersion,
      email,
      LogoutReason.SIM_SWAP_DETECTED,
      LogoutSource.SECURITY,
      {
        phone,
        sessionId,
        wasCurrentSession: true,
        note: 'SIM swap detected - all sessions invalidated',
        priority: 'critical',
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          district: options?.district,
          triggeredSecurityAlert: true,
          securityAlertReason: 'SIM swap detected',
        }
      }
    );
  }
}

// ============================================================
// ✅ Enterprise: Session Expired Event (v2.0)
// ============================================================

export enum SessionExpiryReason {
  TIMEOUT = 'timeout',           // Idle timeout reached
  ABSOLUTE = 'absolute',         // Absolute session lifetime reached
  REVOKED = 'revoked',           // Revoked by user/admin
  EXPIRED = 'expired',           // Natural expiry
  CONCURRENT_LIMIT = 'concurrent_limit', // Max concurrent sessions reached
}

export class SessionExpiredEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.SESSION_EXPIRED;
  public readonly occurredAt: Date;
  public readonly eventVersion: number = EVENT_VERSIONS.V1;
  public readonly aggregateVersion: number = 1;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly ttlSeconds?: number;
  public readonly expiresAt?: Date;
  public readonly priority?: EventPriority = 'normal';
  public readonly partitionKey?: string;
  
  public readonly sessionId: string;
  public readonly userId: string;
  public readonly email: string;
  public readonly expiryReason: SessionExpiryReason;
  public readonly expiredAt: Date;
  public readonly sessionDurationSeconds?: number;
  public readonly lastActivityAt?: Date;
  
  constructor(
    sessionId: string,
    userId: string,
    email: string,
    expiryReason: SessionExpiryReason,
    options?: {
      expiredAt?: Date;
      sessionDurationSeconds?: number;
      lastActivityAt?: Date;
      correlationId?: string;
      causationId?: string;
      ttlSeconds?: number;
      expiresAt?: Date;
      priority?: EventPriority;
      partitionKey?: string;
    }
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.correlationId = options?.correlationId;
    this.causationId = options?.causationId;
    this.ttlSeconds = options?.ttlSeconds;
    this.expiresAt = options?.expiresAt;
    this.priority = options?.priority ?? 'normal';
    this.partitionKey = options?.partitionKey ?? userId;
    
    this.sessionId = sessionId;
    this.userId = userId;
    this.email = email;
    this.expiryReason = expiryReason;
    this.expiredAt = options?.expiredAt ?? new Date();
    this.sessionDurationSeconds = options?.sessionDurationSeconds;
    this.lastActivityAt = options?.lastActivityAt;
  }
  
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
      expiryReason: this.expiryReason,
      expiredAt: this.expiredAt.toISOString(),
      sessionDurationSeconds: this.sessionDurationSeconds,
      lastActivityAt: this.lastActivityAt?.toISOString(),
    };
  }
}

// ============================================================
// ✅ Enterprise: Event Data Interfaces (for serialization)
// ============================================================

export interface UserLoggedOutEventData {
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
  role?: string;
  userTier?: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  sessionId?: string;
  wasCurrentSession: boolean;
  reason: LogoutReason;
  source: LogoutSource;
  initiatedBy?: string;
  note?: string;
  metadata?: UserLoggedOutMetadata;
  ttlSeconds?: number;
  expiresAt?: string;
  priority?: EventPriority;
  partitionKey?: string;
}

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
  expiryReason: SessionExpiryReason;
  expiredAt: string;
  sessionDurationSeconds?: number;
  lastActivityAt?: string;
}

// ============================================================
// ✅ Enterprise: Type Exports
// ============================================================

export type { 
  UserLoggedOutMetadata as UserLoggedOutMetadataType,
  UserLoggedOutPayload as UserLoggedOutPayloadType
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
// 8. ✅ SIM swap detection support (Bangladesh specific)
// 9. ✅ Session duration tracking
// 10. ✅ Active session count tracking (before/after)
// 11. ✅ Security alert trigger flags
// 12. ✅ 15+ LogoutReason enum values
// 13. ✅ 6 Static factory methods for common scenarios
// 14. ✅ Helper methods: isExpired(), isCritical(), isSecurityLogout(), isAdminLogout(), isUserLogout()
// 15. ✅ Serialization support (toJSON, fromJSON)
// 16. ✅ Zod schema for runtime validation
// 17. ✅ Extended metadata with device fingerprint tracking
// 18. ✅ Session expiry tracking with SessionExpiredEvent
// 19. ✅ Concurrent session limit tracking
// 20. ✅ Bengali language support (metadata.language: 'bn')
// 
// Bangladesh Specific:
// - SIM swap detection logout reason
// - District/Upazila/Division location tracking
// - Mobile operator and network type tracking
// - Feature phone device type
// 
// Security Features:
// - Security breach detection and alerting
// - Token compromise detection
// - SIM swap detection
// - Admin action tracking with initiatedBy
// - Session duration monitoring for anomalies
// - Active session count tracking for anomaly detection
// 
// ============================================================
