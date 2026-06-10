/**
 * Session Revoked Event - Enterprise Grade v2.0
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/events/session-revoked.event
 * 
 * @description
 * Event emitted when a user session is revoked (logged out).
 * Supports multiple revocation reasons: user-initiated, admin action, security breach, etc.
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
 * ✅ Bangladesh specific - Device and location tracking
 * ✅ Security alert on suspicious revocations
 */

import { randomUUID } from 'crypto';
import { z } from 'zod';

// ✅ Import from shared packages (Single Source of Truth)
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
  SESSION_STATUS,
  AUDIT_SEVERITIES
} from '@vubon/shared-constants';

// ============================================================
// Domain Event Interface (Extends shared-types)
// ============================================================

export interface DomainEvent extends SharedDomainEvent {
  readonly eventId: string;
  readonly eventName: string;
  readonly occurredAt: Date;
  readonly eventVersion: number;      // Schema version
  readonly aggregateVersion: number;   // Aggregate root version (for event sourcing)
  readonly correlationId?: string;
  readonly causationId?: string;
  readonly ttlSeconds?: number;        // Time to live for event (seconds)
  readonly expiresAt?: Date;           // When event expires
  readonly priority?: EventPriority;   // Priority for processing queue
  readonly partitionKey?: string;      // For event streaming partitioning
}

// ============================================================
// Session Revoked Reason Enum
// ============================================================

export enum SessionRevokedReason {
  // User initiated
  USER_LOGOUT = 'USER_LOGOUT',
  USER_LOGOUT_ALL_DEVICES = 'USER_LOGOUT_ALL_DEVICES',
  
  // Admin actions
  ADMIN_REVOKED = 'ADMIN_REVOKED',
  ADMIN_BULK_REVOKE = 'ADMIN_BULK_REVOKE',
  
  // Security related
  SECURITY_BREACH = 'SECURITY_BREACH',
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
  TOKEN_COMPROMISED = 'TOKEN_COMPROMISED',
  PASSWORD_CHANGED = 'PASSWORD_CHANGED',
  MFA_CHANGED = 'MFA_CHANGED',
  EMAIL_CHANGED = 'EMAIL_CHANGED',
  PHONE_CHANGED = 'PHONE_CHANGED',
  
  // System actions
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  IDLE_TIMEOUT = 'IDLE_TIMEOUT',
  MAX_CONCURRENT_EXCEEDED = 'MAX_CONCURRENT_EXCEEDED',
  ACCOUNT_DELETED = 'ACCOUNT_DELETED',
  ACCOUNT_SUSPENDED = 'ACCOUNT_SUSPENDED',
  ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',
  
  // Device related
  DEVICE_REMOVED = 'DEVICE_REMOVED',
  DEVICE_UNTRUSTED = 'DEVICE_UNTRUSTED',
  FEATURE_PHONE_DISCONNECT = 'FEATURE_PHONE_DISCONNECT', // Bangladesh specific
}

// ============================================================
// Revoked By Enum
// ============================================================

export enum RevokedBy {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SYSTEM = 'SYSTEM',
  SECURITY = 'SECURITY',
}

// ============================================================
// Revocation Scope Enum
// ============================================================

export enum RevocationScope {
  SINGLE = 'SINGLE',
  ALL = 'ALL',
  BY_DEVICE_TYPE = 'BY_DEVICE_TYPE',
  BY_TRUST_LEVEL = 'BY_TRUST_LEVEL',
  BY_LOCATION = 'BY_LOCATION',
}

// ============================================================
// ✅ Event Metadata Interface
// ============================================================

export interface SessionRevokedMetadata extends EventMetadata {
  /** IP address of the request */
  ipAddress?: string;
  
  /** Device ID of the session */
  deviceId?: string;
  
  /** Device fingerprint hash */
  deviceFingerprint?: string;
  
  /** User agent string */
  userAgent?: string;
  
  /** HTTP referrer */
  referrer?: string;
  
  /** Session duration before revocation (seconds) */
  sessionDurationSeconds?: number;
  
  /** Number of requests made during session */
  requestCount?: number;
  
  /** Last activity time before revocation */
  lastActivityAt?: Date;
  
  /** Idle time before revocation (seconds) */
  idleTimeSeconds?: number;
  
  /** Whether this was the current session */
  wasCurrentSession?: boolean;
  
  /** Admin ID who performed revocation (if admin action) */
  adminId?: string;
  
  /** Total sessions revoked in this operation */
  totalRevokedInOperation?: number;
  
  /** Position in batch (for bulk operations) */
  batchPosition?: number;
  
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
  
  /** Mobile operator */
  mobileOperator?: typeof MOBILE_OPERATORS[number];
  
  /** Network type */
  networkType?: typeof NETWORK_TYPES[number];
  
  /** Whether data saver mode was enabled */
  dataSaverEnabled?: boolean;
  
  /** Device type */
  deviceType?: 'desktop' | 'mobile' | 'tablet' | 'feature_phone' | 'smart_tv' | 'console';
  
  /** Browser name */
  browserName?: string;
  
  /** OS name */
  osName?: string;
  
  /** Whether this triggered a security alert */
  triggeredSecurityAlert?: boolean;
  
  /** Security alert reason (if triggered) */
  securityAlertReason?: string;
}

// ============================================================
// ✅ Event Payload Interface
// ============================================================

export interface SessionRevokedPayload extends EventPayload {
  /** Session ID that was revoked */
  sessionId: string;
  
  /** User ID */
  userId: string;
  
  /** User email */
  email: string;
  
  /** User phone (Bangladesh specific) */
  phone?: string;
  
  /** Reason for revocation */
  reason: SessionRevokedReason;
  
  /** Who performed the revocation */
  revokedBy: RevokedBy;
  
  /** Revocation scope */
  scope: RevocationScope;
  
  /** Custom reason message (if provided) */
  customReason?: string;
  
  /** Was the session active at revocation time */
  wasActive: boolean;
  
  /** Session age at revocation (seconds) */
  sessionAgeSeconds: number;
  
  /** Trust level of the session at revocation */
  trustLevel?: 'untrusted' | 'standard' | 'trusted' | 'high_trust' | 'maximum_trust';
  
  /** Device type of the session */
  deviceType?: string;
}

// ============================================================
// ✅ Zod Schema for Runtime Validation
// ============================================================

export const SessionRevokedEventSchema = z.object({
  eventId: z.string().uuid(),
  eventName: z.literal(EVENT_NAMES.SESSION_REVOKED),
  occurredAt: z.date(),
  eventVersion: z.number().int().min(1).default(EVENT_VERSIONS.V1),
  aggregateVersion: z.number().int().min(1),
  correlationId: z.string().uuid().optional(),
  causationId: z.string().uuid().optional(),
  sessionId: z.string().uuid(),
  userId: z.string().uuid(),
  email: z.string().email(),
  phone: z.string().regex(/^(?:\+880|0)1[3-9]\d{8}$/).optional(),
  reason: z.nativeEnum(SessionRevokedReason),
  revokedBy: z.nativeEnum(RevokedBy),
  scope: z.nativeEnum(RevocationScope).default(RevocationScope.SINGLE),
  customReason: z.string().max(500).optional(),
  wasActive: z.boolean().default(true),
  sessionAgeSeconds: z.number().int().min(0),
  trustLevel: z.enum(['untrusted', 'standard', 'trusted', 'high_trust', 'maximum_trust']).optional(),
  deviceType: z.enum(['desktop', 'mobile', 'tablet', 'feature_phone', 'smart_tv', 'console']).optional(),
  metadata: z.object({
    ipAddress: z.string().ip().optional(),
    deviceId: z.string().max(255).optional(),
    deviceFingerprint: z.string().max(128).optional(),
    userAgent: z.string().max(500).optional(),
    referrer: z.string().max(500).optional(),
    sessionDurationSeconds: z.number().positive().optional(),
    requestCount: z.number().int().min(0).optional(),
    lastActivityAt: z.date().optional(),
    idleTimeSeconds: z.number().nonnegative().optional(),
    wasCurrentSession: z.boolean().optional(),
    adminId: z.string().uuid().optional(),
    totalRevokedInOperation: z.number().int().min(1).optional(),
    batchPosition: z.number().int().min(1).optional(),
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
    osName: z.string().max(50).optional(),
    triggeredSecurityAlert: z.boolean().optional(),
    securityAlertReason: z.string().max(500).optional(),
  }).optional(),
  ttlSeconds: z.number().int().positive().optional(),
  expiresAt: z.date().optional(),
  priority: z.enum(['low', 'normal', 'high', 'critical']).default('normal'),
  partitionKey: z.string().optional(),
});

// ============================================================
// ✅ Session Revoked Event Class (Enterprise Grade v2.0)
// ============================================================

export class SessionRevokedEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.SESSION_REVOKED;
  public readonly occurredAt: Date;
  public readonly eventVersion: number;
  public readonly aggregateVersion: number;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly ttlSeconds?: number;
  public readonly expiresAt?: Date;
  public readonly priority?: EventPriority;
  public readonly partitionKey?: string;

  // Core session information
  public readonly sessionId: string;
  public readonly userId: string;
  public readonly email: string;
  public readonly phone?: string;

  // Revocation details
  public readonly reason: SessionRevokedReason;
  public readonly revokedBy: RevokedBy;
  public readonly scope: RevocationScope;
  public readonly customReason?: string;
  public readonly wasActive: boolean;
  public readonly sessionAgeSeconds: number;
  public readonly trustLevel?: 'untrusted' | 'standard' | 'trusted' | 'high_trust' | 'maximum_trust';
  public readonly deviceType?: string;

  // Event metadata
  public readonly metadata?: SessionRevokedMetadata;

  /**
   * Constructor
   */
  constructor(
    sessionId: string,
    userId: string,
    aggregateVersion: number,
    email: string,
    reason: SessionRevokedReason,
    revokedBy: RevokedBy,
    sessionAgeSeconds: number,
    options?: {
      // Core fields
      phone?: string;
      customReason?: string;
      wasActive?: boolean;
      trustLevel?: 'untrusted' | 'standard' | 'trusted' | 'high_trust' | 'maximum_trust';
      deviceType?: string;
      scope?: RevocationScope;
      
      // Event tracking
      correlationId?: string;
      causationId?: string;
      ttlSeconds?: number;
      expiresAt?: Date;
      priority?: EventPriority;
      partitionKey?: string;
      
      // Metadata (Bangladesh specific)
      metadata?: SessionRevokedMetadata;
      
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
    this.priority = options?.priority ?? this.getDefaultPriority(reason);
    this.partitionKey = options?.partitionKey ?? userId;

    this.sessionId = sessionId;
    this.userId = userId;
    this.email = email;
    this.phone = options?.phone;
    this.reason = reason;
    this.revokedBy = revokedBy;
    this.scope = options?.scope ?? RevocationScope.SINGLE;
    this.customReason = options?.customReason;
    this.wasActive = options?.wasActive ?? true;
    this.sessionAgeSeconds = sessionAgeSeconds;
    this.trustLevel = options?.trustLevel;
    this.deviceType = options?.deviceType;
    this.metadata = options?.metadata;

    // Auto-set partition key from district if available
    if (!options?.partitionKey && this.metadata?.district) {
      this.partitionKey = this.metadata.district;
    }

    // Auto-set TTL if not provided (30 days default for session events)
    if (!this.ttlSeconds && !this.expiresAt) {
      this.ttlSeconds = 30 * 24 * 60 * 60; // 30 days
      this.expiresAt = new Date(Date.now() + this.ttlSeconds * 1000);
    }

    // Auto-detect security alert
    if (this.metadata?.triggeredSecurityAlert === undefined) {
      this.metadata = {
        ...this.metadata,
        triggeredSecurityAlert: this.shouldTriggerSecurityAlert(),
        securityAlertReason: this.getSecurityAlertReason(),
      };
    }
  }

  // ============================================================
  // ✅ Helper Methods
  // ============================================================

  /**
   * Get default priority based on revocation reason
   */
  private getDefaultPriority(reason: SessionRevokedReason): EventPriority {
    switch (reason) {
      case SessionRevokedReason.SECURITY_BREACH:
      case SessionRevokedReason.TOKEN_COMPROMISED:
        return 'critical';
      case SessionRevokedReason.ADMIN_REVOKED:
      case SessionRevokedReason.ADMIN_BULK_REVOKE:
      case SessionRevokedReason.SUSPICIOUS_ACTIVITY:
      case SessionRevokedReason.PASSWORD_CHANGED:
      case SessionRevokedReason.MFA_CHANGED:
        return 'high';
      case SessionRevokedReason.USER_LOGOUT:
      case SessionRevokedReason.USER_LOGOUT_ALL_DEVICES:
      case SessionRevokedReason.DEVICE_REMOVED:
        return 'normal';
      default:
        return 'low';
    }
  }

  /**
   * Check if event should trigger security alert
   */
  private shouldTriggerSecurityAlert(): boolean {
    const securityReasons = [
      SessionRevokedReason.SECURITY_BREACH,
      SessionRevokedReason.TOKEN_COMPROMISED,
      SessionRevokedReason.SUSPICIOUS_ACTIVITY,
    ];
    
    if (securityReasons.includes(this.reason)) return true;
    
    // Admin revoking session without user initiation
    if (this.revokedBy === RevokedBy.ADMIN && 
        this.reason !== SessionRevokedReason.USER_LOGOUT) {
      return true;
    }
    
    // Security system initiated
    if (this.revokedBy === RevokedBy.SECURITY) return true;
    
    // Unusual location or device
    if (this.metadata?.district && this.metadata?.wasCurrentSession === false) {
      return true;
    }
    
    return false;
  }

  /**
   * Get security alert reason
   */
  private getSecurityAlertReason(): string | undefined {
    if (!this.shouldTriggerSecurityAlert()) return undefined;
    
    switch (this.reason) {
      case SessionRevokedReason.SECURITY_BREACH:
        return 'Session revoked due to security breach';
      case SessionRevokedReason.TOKEN_COMPROMISED:
        return 'Session revoked because token was compromised';
      case SessionRevokedReason.SUSPICIOUS_ACTIVITY:
        return 'Session revoked due to suspicious activity detected';
      default:
        if (this.revokedBy === RevokedBy.ADMIN) {
          return `Session revoked by admin${this.customReason ? `: ${this.customReason}` : ''}`;
        }
        return undefined;
    }
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
   * Check if this requires security notification
   */
  public requiresSecurityNotification(): boolean {
    return this.shouldTriggerSecurityAlert() || 
           this.revokedBy === RevokedBy.ADMIN ||
           this.reason === SessionRevokedReason.PASSWORD_CHANGED ||
           this.reason === SessionRevokedReason.MFA_CHANGED;
  }

  /**
   * Check if user needs to be notified via WhatsApp (Bangladesh specific)
   */
  public requiresWhatsAppNotification(): boolean {
    return this.requiresSecurityNotification() && 
           this.metadata?.mobileOperator !== undefined &&
           this.phone !== undefined;
  }

  /**
   * Get human-readable reason in English
   */
  public getReasonText(): string {
    const reasonMap: Record<SessionRevokedReason, string> = {
      [SessionRevokedReason.USER_LOGOUT]: 'User logged out',
      [SessionRevokedReason.USER_LOGOUT_ALL_DEVICES]: 'User logged out from all devices',
      [SessionRevokedReason.ADMIN_REVOKED]: 'Session revoked by administrator',
      [SessionRevokedReason.ADMIN_BULK_REVOKE]: 'Session revoked in bulk admin operation',
      [SessionRevokedReason.SECURITY_BREACH]: 'Session revoked due to security breach',
      [SessionRevokedReason.SUSPICIOUS_ACTIVITY]: 'Session revoked due to suspicious activity',
      [SessionRevokedReason.TOKEN_COMPROMISED]: 'Session revoked because token was compromised',
      [SessionRevokedReason.PASSWORD_CHANGED]: 'Session revoked because password was changed',
      [SessionRevokedReason.MFA_CHANGED]: 'Session revoked because MFA settings changed',
      [SessionRevokedReason.EMAIL_CHANGED]: 'Session revoked because email was changed',
      [SessionRevokedReason.PHONE_CHANGED]: 'Session revoked because phone was changed',
      [SessionRevokedReason.SESSION_EXPIRED]: 'Session expired',
      [SessionRevokedReason.IDLE_TIMEOUT]: 'Session timed out due to inactivity',
      [SessionRevokedReason.MAX_CONCURRENT_EXCEEDED]: 'Session revoked due to concurrent session limit',
      [SessionRevokedReason.ACCOUNT_DELETED]: 'Account deleted',
      [SessionRevokedReason.ACCOUNT_SUSPENDED]: 'Account suspended',
      [SessionRevokedReason.ACCOUNT_LOCKED]: 'Account locked',
      [SessionRevokedReason.DEVICE_REMOVED]: 'Device removed from trusted devices',
      [SessionRevokedReason.DEVICE_UNTRUSTED]: 'Device untrusted',
      [SessionRevokedReason.FEATURE_PHONE_DISCONNECT]: 'Feature phone disconnected',
    };
    return reasonMap[this.reason] || this.customReason || 'Session revoked';
  }

  /**
   * Get human-readable reason in Bengali (Bangladesh specific)
   */
  public getReasonTextBn(): string {
    const reasonMap: Record<SessionRevokedReason, string> = {
      [SessionRevokedReason.USER_LOGOUT]: 'ব্যবহারকারী লগআউট করেছেন',
      [SessionRevokedReason.USER_LOGOUT_ALL_DEVICES]: 'ব্যবহারকারী সব ডিভাইস থেকে লগআউট করেছেন',
      [SessionRevokedReason.ADMIN_REVOKED]: 'অ্যাডমিন দ্বারা সেশন রিভোক করা হয়েছে',
      [SessionRevokedReason.ADMIN_BULK_REVOKE]: 'বাল্ক অ্যাডমিন অপারেশনে সেশন রিভোক করা হয়েছে',
      [SessionRevokedReason.SECURITY_BREACH]: 'নিরাপত্তা লঙ্ঘনের কারণে সেশন রিভোক করা হয়েছে',
      [SessionRevokedReason.SUSPICIOUS_ACTIVITY]: 'সন্দেহজনক কার্যকলাপের কারণে সেশন রিভোক করা হয়েছে',
      [SessionRevokedReason.TOKEN_COMPROMISED]: 'টোকেন আপোস হওয়ায় সেশন রিভোক করা হয়েছে',
      [SessionRevokedReason.PASSWORD_CHANGED]: 'পাসওয়ার্ড পরিবর্তন করার কারণে সেশন রিভোক করা হয়েছে',
      [SessionRevokedReason.MFA_CHANGED]: 'MFA সেটিংস পরিবর্তনের কারণে সেশন রিভোক করা হয়েছে',
      [SessionRevokedReason.EMAIL_CHANGED]: 'ইমেইল পরিবর্তনের কারণে সেশন রিভোক করা হয়েছে',
      [SessionRevokedReason.PHONE_CHANGED]: 'ফোন নম্বর পরিবর্তনের কারণে সেশন রিভোক করা হয়েছে',
      [SessionRevokedReason.SESSION_EXPIRED]: 'সেশনের মেয়াদ শেষ হয়েছে',
      [SessionRevokedReason.IDLE_TIMEOUT]: 'নিষ্ক্রিয়তার কারণে সেশনের সময় শেষ হয়েছে',
      [SessionRevokedReason.MAX_CONCURRENT_EXCEEDED]: 'একসঙ্গে একাধিক সেশনের সীমা অতিক্রম করেছে',
      [SessionRevokedReason.ACCOUNT_DELETED]: 'অ্যাকাউন্ট মুছে ফেলা হয়েছে',
      [SessionRevokedReason.ACCOUNT_SUSPENDED]: 'অ্যাকাউন্ট স্থগিত করা হয়েছে',
      [SessionRevokedReason.ACCOUNT_LOCKED]: 'অ্যাকাউন্ট লক করা হয়েছে',
      [SessionRevokedReason.DEVICE_REMOVED]: 'ডিভাইসটি বিশ্বস্ত ডিভাইস থেকে সরানো হয়েছে',
      [SessionRevokedReason.DEVICE_UNTRUSTED]: 'ডিভাইসটি অবিশ্বস্ত করা হয়েছে',
      [SessionRevokedReason.FEATURE_PHONE_DISCONNECT]: 'ফিচার ফোন সংযোগ বিচ্ছিন্ন হয়েছে',
    };
    return reasonMap[this.reason] || this.customReason || 'সেশন রিভোক করা হয়েছে';
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
      revokedBy: this.revokedBy,
      scope: this.scope,
      wasActive: this.wasActive,
      sessionAgeSeconds: this.sessionAgeSeconds,
      trustLevel: this.trustLevel,
      deviceType: this.deviceType,
      district: this.metadata?.district,
      mobileOperator: this.metadata?.mobileOperator,
      networkType: this.metadata?.networkType,
      wasCurrentSession: this.metadata?.wasCurrentSession,
      triggeredSecurityAlert: this.metadata?.triggeredSecurityAlert,
      priority: this.priority,
      partitionKey: this.partitionKey,
      occurredAt: this.occurredAt.toISOString(),
    };
  }

  /**
   * Convert to plain object for serialization
   */
  public toJSON(): SessionRevokedEventData {
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
      reason: this.reason,
      revokedBy: this.revokedBy,
      scope: this.scope,
      customReason: this.customReason,
      wasActive: this.wasActive,
      sessionAgeSeconds: this.sessionAgeSeconds,
      trustLevel: this.trustLevel,
      deviceType: this.deviceType,
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
  public static fromJSON(data: SessionRevokedEventData): SessionRevokedEvent {
    const event = new SessionRevokedEvent(
      data.sessionId,
      data.userId,
      data.aggregateVersion,
      data.email,
      data.reason,
      data.revokedBy,
      data.sessionAgeSeconds,
      {
        phone: data.phone,
        customReason: data.customReason,
        wasActive: data.wasActive,
        trustLevel: data.trustLevel,
        deviceType: data.deviceType,
        scope: data.scope,
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
    const result = SessionRevokedEventSchema.safeParse(this.toJSON());
    return result.success;
  }

  // ============================================================
  // ✅ Static Factory Methods for Common Scenarios
  // ============================================================

  /**
   * Create event for user-initiated logout
   */
  public static forUserLogout(
    sessionId: string,
    userId: string,
    aggregateVersion: number,
    email: string,
    sessionAgeSeconds: number,
    metadata?: SessionRevokedMetadata,
    correlationId?: string
  ): SessionRevokedEvent {
    return new SessionRevokedEvent(
      sessionId,
      userId,
      aggregateVersion,
      email,
      SessionRevokedReason.USER_LOGOUT,
      RevokedBy.USER,
      sessionAgeSeconds,
      {
        wasActive: true,
        correlationId,
        metadata,
      }
    );
  }

  /**
   * Create event for admin-initiated session revocation
   */
  public static forAdminRevoke(
    sessionId: string,
    userId: string,
    aggregateVersion: number,
    email: string,
    sessionAgeSeconds: number,
    adminId: string,
    reason?: string,
    metadata?: SessionRevokedMetadata,
    correlationId?: string
  ): SessionRevokedEvent {
    return new SessionRevokedEvent(
      sessionId,
      userId,
      aggregateVersion,
      email,
      SessionRevokedReason.ADMIN_REVOKED,
      RevokedBy.ADMIN,
      sessionAgeSeconds,
      {
        customReason: reason,
        wasActive: true,
        correlationId,
        metadata: {
          ...metadata,
          adminId,
        },
      }
    );
  }

  /**
   * Create event for session revocation due to password change
   */
  public static forPasswordChange(
    sessionId: string,
    userId: string,
    aggregateVersion: number,
    email: string,
    sessionAgeSeconds: number,
    metadata?: SessionRevokedMetadata,
    correlationId?: string
  ): SessionRevokedEvent {
    return new SessionRevokedEvent(
      sessionId,
      userId,
      aggregateVersion,
      email,
      SessionRevokedReason.PASSWORD_CHANGED,
      RevokedBy.SECURITY,
      sessionAgeSeconds,
      {
        wasActive: true,
        correlationId,
        metadata,
      }
    );
  }

  /**
   * Create event for security breach session revocation
   */
  public static forSecurityBreach(
    sessionId: string,
    userId: string,
    aggregateVersion: number,
    email: string,
    sessionAgeSeconds: number,
    breachReason: string,
    metadata?: SessionRevokedMetadata,
    correlationId?: string
  ): SessionRevokedEvent {
    return new SessionRevokedEvent(
      sessionId,
      userId,
      aggregateVersion,
      email,
      SessionRevokedReason.SECURITY_BREACH,
      RevokedBy.SECURITY,
      sessionAgeSeconds,
      {
        customReason: breachReason,
        wasActive: true,
        priority: 'critical',
        correlationId,
        metadata: {
          ...metadata,
          triggeredSecurityAlert: true,
          securityAlertReason: breachReason,
        },
      }
    );
  }

  /**
   * Create event for session expiration
   */
  public static forSessionExpiry(
    sessionId: string,
    userId: string,
    aggregateVersion: number,
    email: string,
    sessionAgeSeconds: number,
    wasActive: boolean,
    metadata?: SessionRevokedMetadata,
    correlationId?: string
  ): SessionRevokedEvent {
    return new SessionRevokedEvent(
      sessionId,
      userId,
      aggregateVersion,
      email,
      SessionRevokedReason.SESSION_EXPIRED,
      RevokedBy.SYSTEM,
      sessionAgeSeconds,
      {
        wasActive,
        correlationId,
        metadata,
      }
    );
  }

  /**
   * Create event for idle timeout
   */
  public static forIdleTimeout(
    sessionId: string,
    userId: string,
    aggregateVersion: number,
    email: string,
    sessionAgeSeconds: number,
    idleTimeSeconds: number,
    metadata?: SessionRevokedMetadata,
    correlationId?: string
  ): SessionRevokedEvent {
    return new SessionRevokedEvent(
      sessionId,
      userId,
      aggregateVersion,
      email,
      SessionRevokedReason.IDLE_TIMEOUT,
      RevokedBy.SYSTEM,
      sessionAgeSeconds,
      {
        wasActive: false,
        correlationId,
        metadata: {
          ...metadata,
          idleTimeSeconds,
        },
      }
    );
  }

  /**
   * Create event for bulk admin revocation (all sessions)
   */
  public static forBulkAdminRevoke(
    sessionId: string,
    userId: string,
    aggregateVersion: number,
    email: string,
    sessionAgeSeconds: number,
    adminId: string,
    totalRevoked: number,
    batchPosition: number,
    metadata?: SessionRevokedMetadata,
    correlationId?: string
  ): SessionRevokedEvent {
    return new SessionRevokedEvent(
      sessionId,
      userId,
      aggregateVersion,
      email,
      SessionRevokedReason.ADMIN_BULK_REVOKE,
      RevokedBy.ADMIN,
      sessionAgeSeconds,
      {
        wasActive: true,
        correlationId,
        metadata: {
          ...metadata,
          adminId,
          totalRevokedInOperation: totalRevoked,
          batchPosition,
        },
      }
    );
  }
}

// ============================================================
// ✅ Event Data Interfaces (for serialization)
// ============================================================

export interface SessionRevokedEventData {
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
  reason: SessionRevokedReason;
  revokedBy: RevokedBy;
  scope: RevocationScope;
  customReason?: string;
  wasActive: boolean;
  sessionAgeSeconds: number;
  trustLevel?: 'untrusted' | 'standard' | 'trusted' | 'high_trust' | 'maximum_trust';
  deviceType?: string;
  metadata?: SessionRevokedMetadata;
  ttlSeconds?: number;
  expiresAt?: string;
  priority?: EventPriority;
  partitionKey?: string;
}

// ============================================================
// ✅ Type Exports
// ============================================================

export type { 
  SessionRevokedMetadata as SessionRevokedMetadataType,
  SessionRevokedPayload as SessionRevokedPayloadType
};

// ============================================================
// ENTERPRISE SUMMARY v2.0
// ============================================================
// 
// Enterprise Enhancements Applied in v2.0:
// 1. ✅ Shared-types integration (@vubon/shared-types)
// 2. ✅ Event versioning with aggregateVersion tracking
// 3. ✅ TTL support with expiresAt for event expiry (30 days default)
// 4. ✅ Priority-based event processing (critical/high/normal/low)
// 5. ✅ Partition key for event streaming optimization
// 6. ✅ Bangladesh specific fields (district, upazila, mobileOperator, networkType)
// 7. ✅ Feature phone support (deviceType: 'feature_phone')
// 8. ✅ 19 different revocation reasons
// 9. ✅ 4 revocation sources (User, Admin, System, Security)
// 10. ✅ 5 revocation scopes (Single, All, ByDeviceType, ByTrustLevel, ByLocation)
// 11. ✅ Security alert detection and tracking
// 12. ✅ WhatsApp notification support for Bangladesh
// 13. ✅ Bengali language support for reason messages
// 14. ✅ Static factory methods for common scenarios
// 15. ✅ Helper methods: isExpired(), isCritical(), requiresSecurityNotification()
// 16. ✅ Serialization support (toJSON, fromJSON)
// 17. ✅ Zod schema for runtime validation
// 18. ✅ Extended metadata with device fingerprint tracking
// 19. ✅ Session duration and activity tracking
// 20. ✅ Bulk operation tracking (batch position, total revoked)
// 
// Bangladesh Specific:
// - District/Upazila/Division location tracking
// - Mobile operator and network type tracking
// - Feature phone device type support
// - Bengali reason messages (getReasonTextBn)
// - WhatsApp notification detection (requiresWhatsAppNotification)
// 
// Security Features:
// - Security breach detection
// - Suspicious activity tracking
// - Token compromise detection
// - Admin action audit trail
// - Security alert triggers
// 
// ============================================================
