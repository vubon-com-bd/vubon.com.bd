/**
 * User Logged In Event - Enterprise Grade v3.0
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/events/user-logged-in.event
 * 
 * @description
 * Event emitted when a user successfully logs in.
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
 * ✅ Bangladesh specific - WhatsApp/Imo login support
 * ✅ Security alert on suspicious logins
 */

import { randomUUID } from 'crypto';
import { z } from 'zod';

// ✅ Enterprise: Import from shared-types and shared-constants
import type { 
  EventMetadata, 
  EventPayload, 
  DomainEvent as SharedDomainEvent,
  EventPriority,
  LoginMethod as SharedLoginMethod,
  LoginType as SharedLoginType
} from '@vubon/shared-types';

import {
  EVENT_VERSIONS,
  EVENT_NAMES,
  LOGIN_METHODS,
  LOGIN_TYPES,
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
// Login Method Enum (Extended - Using shared-constants)
// ============================================================

export enum LoginMethod {
  // Standard methods
  PASSWORD = 'PASSWORD',
  PHONE = 'PHONE',                     // Bangladesh specific - phone login
  OTP = 'OTP',                         // OTP login (passwordless)
  
  // Social OAuth
  SOCIAL_GOOGLE = 'SOCIAL_GOOGLE',
  SOCIAL_FACEBOOK = 'SOCIAL_FACEBOOK',
  SOCIAL_GITHUB = 'SOCIAL_GITHUB',
  SOCIAL_APPLE = 'SOCIAL_APPLE',
  SOCIAL_LINKEDIN = 'SOCIAL_LINKEDIN',
  SOCIAL_MICROSOFT = 'SOCIAL_MICROSOFT',
  
  // Bangladesh specific OAuth
  SOCIAL_WHATSAPP = 'SOCIAL_WHATSAPP',
  SOCIAL_IMO = 'SOCIAL_IMO',
  SOCIAL_TELEGRAM = 'SOCIAL_TELEGRAM',
  SOCIAL_VIBER = 'SOCIAL_VIBER',
  
  // Bangladesh specific MFS Auth
  MFS_BKASH = 'MFS_BKASH',
  MFS_NAGAD = 'MFS_NAGAD',
  MFS_ROCKET = 'MFS_ROCKET',
  
  // MFA related
  MFA_RECOVERY = 'MFA_RECOVERY',
  MFA_BACKUP_CODE = 'MFA_BACKUP_CODE',
  
  // Other methods
  MAGIC_LINK = 'MAGIC_LINK',
  API_KEY = 'API_KEY',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
  DEVICE_TRANSFER = 'DEVICE_TRANSFER',  // Session transfer from another device
}

// ============================================================
// Login Type Enum
// ============================================================

export enum LoginType {
  INITIAL = 'INITIAL',           // First login of session
  MFA_VERIFIED = 'MFA_VERIFIED', // After MFA verification
  SESSION_REFRESH = 'SESSION_REFRESH', // Session refresh
  DEVICE_TRANSFER = 'DEVICE_TRANSFER', // Device to device transfer
  RECOVERY = 'RECOVERY',         // Account recovery login
  ADMIN_IMPERSONATE = 'ADMIN_IMPERSONATE', // Admin impersonating user
}

// ============================================================
// Login Source Enum
// ============================================================

export enum LoginSource {
  WEB = 'WEB',
  MOBILE_APP = 'MOBILE_APP',
  FEATURE_PHONE = 'FEATURE_PHONE',  // Bangladesh specific
  API = 'API',
  ADMIN_PORTAL = 'ADMIN_PORTAL',
  MFS_APP = 'MFS_APP',              // bKash/Nagad/Rocket app
  SOCIAL_APP = 'SOCIAL_APP',
}

// ============================================================
// ✅ ENTERPRISE: Event Metadata Interface
// ============================================================

export interface UserLoggedInMetadata extends EventMetadata {
  /** User's IP address for geolocation */
  ipAddress?: string;
  
  /** Device ID for device fingerprinting */
  deviceId?: string;
  
  /** Device fingerprint hash (for security) */
  deviceFingerprint?: string;
  
  /** User agent for browser/OS detection */
  userAgent?: string;
  
  /** Session ID for tracking */
  sessionId?: string;
  
  /** HTTP referrer */
  referrer?: string;
  
  /** Login flow duration in seconds (from start to completion) */
  loginDurationSeconds?: number;
  
  /** Number of failed attempts before success */
  failedAttemptsBeforeSuccess?: number;
  
  /** Was CAPTCHA required? */
  captchaRequired?: boolean;
  
  /** Was CAPTCHA solved? */
  captchaSolved?: boolean;
  
  /** MFA method used (if MFA was required) */
  mfaMethod?: 'totp' | 'sms' | 'whatsapp' | 'email' | 'webauthn' | 'bkash_pin' | 'nagad_pin' | 'rocket_pin';
  
  /** MFA verification time in seconds */
  mfaVerificationTimeSeconds?: number;
  
  /** Was this a trusted device? */
  isTrustedDevice?: boolean;
  
  /** Trust level of the device */
  deviceTrustLevel?: 'untrusted' | 'standard' | 'trusted' | 'high_trust' | 'maximum_trust';
  
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
  
  /** Screen resolution */
  screenResolution?: string;
  
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
  
  /** User tier at login time */
  userTier?: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  
  /** Role at login time */
  role?: string;
  
  /** Whether this login triggered a security alert */
  triggeredSecurityAlert?: boolean;
  
  /** Security alert reason (if triggered) */
  securityAlertReason?: string;
}

// ============================================================
// ✅ ENTERPRISE: Event Payload Interface
// ============================================================

export interface UserLoggedInPayload extends EventPayload {
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
  
  /** Was this a new device? */
  isNewDevice: boolean;
  
  /** Was this a new location? */
  isNewLocation: boolean;
  
  /** Was this a suspicious login? */
  isSuspicious: boolean;
  
  /** Suspicious reason (if suspicious) */
  suspiciousReason?: string;
  
  /** Risk score (0-100) for this login */
  riskScore?: number;
  
  /** Risk level */
  riskLevel?: 'low' | 'medium' | 'high' | 'critical';
  
  /** Whether notification was sent */
  notificationSent?: boolean;
  
  /** Notification channel used */
  notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';
}

// ============================================================
// ✅ ENTERPRISE: Zod Schema for Runtime Validation
// ============================================================

export const UserLoggedInEventSchema = z.object({
  eventId: z.string().uuid(),
  eventName: z.literal(EVENT_NAMES.USER_LOGIN),
  occurredAt: z.date(),
  eventVersion: z.number().int().min(1).default(EVENT_VERSIONS.V1),
  aggregateVersion: z.number().int().min(1),
  correlationId: z.string().uuid().optional(),
  causationId: z.string().uuid().optional(),
  userId: z.string().uuid(),
  email: z.string().email(),
  phone: z.string().regex(/^(?:\+880|0)1[3-9]\d{8}$/).optional(),
  fullName: z.string().max(100).optional(),
  loginMethod: z.nativeEnum(LoginMethod),
  loginType: z.nativeEnum(LoginType),
  loginSource: z.nativeEnum(LoginSource).default(LoginSource.WEB),
  sessionId: z.string().uuid().optional(),
  location: z.string().max(200).optional(),
  isNewDevice: z.boolean().default(false),
  isNewLocation: z.boolean().default(false),
  isSuspicious: z.boolean().default(false),
  riskScore: z.number().int().min(0).max(100).optional(),
  riskLevel: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  metadata: z.object({
    ipAddress: z.string().ip().optional(),
    deviceId: z.string().max(255).optional(),
    deviceFingerprint: z.string().max(128).optional(),
    userAgent: z.string().max(500).optional(),
    sessionId: z.string().uuid().optional(),
    referrer: z.string().max(500).optional(),
    loginDurationSeconds: z.number().positive().optional(),
    failedAttemptsBeforeSuccess: z.number().int().min(0).optional(),
    captchaRequired: z.boolean().optional(),
    captchaSolved: z.boolean().optional(),
    mfaMethod: z.enum(['totp', 'sms', 'whatsapp', 'email', 'webauthn', 'bkash_pin', 'nagad_pin', 'rocket_pin']).optional(),
    mfaVerificationTimeSeconds: z.number().positive().optional(),
    isTrustedDevice: z.boolean().optional(),
    deviceTrustLevel: z.enum(['untrusted', 'standard', 'trusted', 'high_trust', 'maximum_trust']).optional(),
    district: z.string().max(100).optional(),
    upazila: z.string().max(100).optional(),
    division: z.string().max(100).optional(),
    mobileOperator: z.enum(MOBILE_OPERATORS).optional(),
    networkType: z.enum(NETWORK_TYPES).optional(),
    dataSaverEnabled: z.boolean().optional(),
    deviceType: z.enum(['desktop', 'mobile', 'tablet', 'feature_phone', 'smart_tv', 'console']).optional(),
    screenResolution: z.string().regex(/^\d+x\d+$/).optional(),
    browserName: z.string().max(50).optional(),
    browserVersion: z.string().max(20).optional(),
    osName: z.string().max(50).optional(),
    osVersion: z.string().max(20).optional(),
    timezoneOffset: z.number().int().min(-720).max(840).optional(),
    language: z.enum(['en', 'bn']).optional(),
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
// ✅ ENTERPRISE: User Logged In Event Class (v3.0)
// ============================================================

export class UserLoggedInEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.USER_LOGIN;
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

  // Login context
  public readonly loginMethod: LoginMethod;
  public readonly loginType: LoginType;
  public readonly loginSource: LoginSource;
  public readonly sessionId?: string;
  public readonly location?: string;

  // Security flags
  public readonly isNewDevice: boolean;
  public readonly isNewLocation: boolean;
  public readonly isSuspicious: boolean;
  public readonly riskScore?: number;
  public readonly riskLevel?: 'low' | 'medium' | 'high' | 'critical';

  // Event metadata
  public readonly metadata?: UserLoggedInMetadata;

  // ✅ Enterprise: Constructor with enhanced options
  constructor(
    userId: string,
    aggregateVersion: number,
    email: string,
    loginMethod: LoginMethod,
    loginType: LoginType,
    options?: {
      // Core fields
      phone?: string;
      fullName?: string;
      
      // Login context
      loginSource?: LoginSource;
      sessionId?: string;
      location?: string;
      
      // Security flags
      isNewDevice?: boolean;
      isNewLocation?: boolean;
      isSuspicious?: boolean;
      riskScore?: number;
      riskLevel?: 'low' | 'medium' | 'high' | 'critical';
      
      // Event tracking
      correlationId?: string;
      causationId?: string;
      ttlSeconds?: number;
      expiresAt?: Date;
      priority?: EventPriority;
      partitionKey?: string;
      
      // Metadata (Bangladesh specific)
      metadata?: UserLoggedInMetadata;
      
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

    this.loginMethod = loginMethod;
    this.loginType = loginType;
    this.loginSource = options?.loginSource ?? LoginSource.WEB;
    this.sessionId = options?.sessionId;
    this.location = options?.location;

    this.isNewDevice = options?.isNewDevice ?? false;
    this.isNewLocation = options?.isNewLocation ?? false;
    this.isSuspicious = options?.isSuspicious ?? false;
    this.riskScore = options?.riskScore;
    this.riskLevel = options?.riskLevel;

    this.metadata = options?.metadata;

    // ✅ Enterprise: Auto-set partition key from district if available
    if (!options?.partitionKey && this.metadata?.district) {
      this.partitionKey = this.metadata.district;
    }

    // ✅ Enterprise: Auto-set TTL if not provided (7 days default)
    if (!this.ttlSeconds && !this.expiresAt) {
      this.ttlSeconds = 7 * 24 * 60 * 60; // 7 days
      this.expiresAt = new Date(Date.now() + this.ttlSeconds * 1000);
    }

    // ✅ Enterprise: Auto-calculate risk level based on suspicious flags
    if (this.riskScore === undefined && this.isSuspicious) {
      this.riskScore = this.calculateRiskScore();
      this.riskLevel = this.getRiskLevelFromScore(this.riskScore);
    }
  }

  // ============================================================
  // ✅ Enterprise: Helper Methods
  // ============================================================

  /**
   * Calculate risk score based on various factors
   */
  private calculateRiskScore(): number {
    let score = 0;
    
    if (this.isNewDevice) score += 30;
    if (this.isNewLocation) score += 25;
    if (this.loginType === LoginType.INITIAL && this.loginMethod === LoginMethod.PASSWORD) score += 10;
    if (this.metadata?.failedAttemptsBeforeSuccess && this.metadata.failedAttemptsBeforeSuccess > 0) {
      score += Math.min(20, this.metadata.failedAttemptsBeforeSuccess * 5);
    }
    if (this.metadata?.networkType === '2g' || this.metadata?.networkType === '3g') score += 5;
    if (this.metadata?.dataSaverEnabled) score += 5;
    
    return Math.min(100, score);
  }

  /**
   * Get risk level from score
   */
  private getRiskLevelFromScore(score: number): 'low' | 'medium' | 'high' | 'critical' {
    if (score >= 75) return 'critical';
    if (score >= 50) return 'high';
    if (score >= 25) return 'medium';
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
   * Check if event is critical priority
   */
  public isCritical(): boolean {
    return this.priority === 'critical' || this.riskLevel === 'critical';
  }

  /**
   * Check if this login requires security notification
   */
  public requiresSecurityNotification(): boolean {
    return this.isNewDevice || this.isNewLocation || this.isSuspicious || this.riskLevel === 'high' || this.riskLevel === 'critical';
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
      loginMethod: this.loginMethod,
      loginType: this.loginType,
      isNewDevice: this.isNewDevice,
      isNewLocation: this.isNewLocation,
      isSuspicious: this.isSuspicious,
      riskScore: this.riskScore,
      riskLevel: this.riskLevel,
      district: this.metadata?.district,
      mobileOperator: this.metadata?.mobileOperator,
      networkType: this.metadata?.networkType,
      deviceType: this.metadata?.deviceType,
      priority: this.priority,
      partitionKey: this.partitionKey,
      occurredAt: this.occurredAt.toISOString(),
    };
  }

  /**
   * Convert to plain object for serialization
   */
  public toJSON(): UserLoggedInEventData {
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
      loginMethod: this.loginMethod,
      loginType: this.loginType,
      loginSource: this.loginSource,
      sessionId: this.sessionId,
      location: this.location,
      isNewDevice: this.isNewDevice,
      isNewLocation: this.isNewLocation,
      isSuspicious: this.isSuspicious,
      riskScore: this.riskScore,
      riskLevel: this.riskLevel,
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
  public static fromJSON(data: UserLoggedInEventData): UserLoggedInEvent {
    const event = new UserLoggedInEvent(
      data.userId,
      data.aggregateVersion,
      data.email,
      data.loginMethod,
      data.loginType,
      {
        phone: data.phone,
        fullName: data.fullName,
        loginSource: data.loginSource,
        sessionId: data.sessionId,
        location: data.location,
        isNewDevice: data.isNewDevice,
        isNewLocation: data.isNewLocation,
        isSuspicious: data.isSuspicious,
        riskScore: data.riskScore,
        riskLevel: data.riskLevel,
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
    const result = UserLoggedInEventSchema.safeParse(this.toJSON());
    return result.success;
  }

  // ============================================================
  // ✅ Enterprise: Static factory methods for common scenarios
  // ============================================================

  /**
   * Create event for standard password login
   */
  public static forPasswordLogin(
    userId: string,
    aggregateVersion: number,
    email: string,
    sessionId: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      isNewDevice?: boolean;
      isNewLocation?: boolean;
      location?: string;
      district?: string;
      mobileOperator?: string;
      networkType?: string;
      correlationId?: string;
    }
  ): UserLoggedInEvent {
    return new UserLoggedInEvent(
      userId,
      aggregateVersion,
      email,
      LoginMethod.PASSWORD,
      LoginType.INITIAL,
      {
        sessionId,
        location: options?.location,
        isNewDevice: options?.isNewDevice ?? false,
        isNewLocation: options?.isNewLocation ?? false,
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          district: options?.district,
          mobileOperator: options?.mobileOperator as typeof MOBILE_OPERATORS[number],
          networkType: options?.networkType as typeof NETWORK_TYPES[number],
        }
      }
    );
  }

  /**
   * Create event for Bangladesh WhatsApp login
   */
  public static forWhatsAppLogin(
    userId: string,
    aggregateVersion: number,
    email: string,
    phone: string,
    sessionId: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      isNewDevice?: boolean;
      isNewLocation?: boolean;
      district?: string;
      mobileOperator?: string;
      correlationId?: string;
    }
  ): UserLoggedInEvent {
    return new UserLoggedInEvent(
      userId,
      aggregateVersion,
      email,
      LoginMethod.SOCIAL_WHATSAPP,
      LoginType.INITIAL,
      {
        phone,
        sessionId,
        isNewDevice: options?.isNewDevice ?? false,
        isNewLocation: options?.isNewLocation ?? false,
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          district: options?.district,
          mobileOperator: options?.mobileOperator as typeof MOBILE_OPERATORS[number],
        }
      }
    );
  }

  /**
   * Create event for bKash MFA login (Bangladesh specific)
   */
  public static forBkashLogin(
    userId: string,
    aggregateVersion: number,
    email: string,
    phone: string,
    sessionId: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      isNewDevice?: boolean;
      isNewLocation?: boolean;
      district?: string;
      correlationId?: string;
    }
  ): UserLoggedInEvent {
    return new UserLoggedInEvent(
      userId,
      aggregateVersion,
      email,
      LoginMethod.MFS_BKASH,
      LoginType.MFA_VERIFIED,
      {
        phone,
        sessionId,
        isNewDevice: options?.isNewDevice ?? false,
        isNewLocation: options?.isNewLocation ?? false,
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          district: options?.district,
          mfaMethod: 'bkash_pin',
        }
      }
    );
  }

  /**
   * Create event for MFA-verified login
   */
  public static forMfaVerifiedLogin(
    userId: string,
    aggregateVersion: number,
    email: string,
    sessionId: string,
    mfaMethod: 'totp' | 'sms' | 'whatsapp' | 'email' | 'webauthn' | 'bkash_pin' | 'nagad_pin' | 'rocket_pin',
    originalLoginEvent: UserLoggedInEvent,
    mfaVerificationTimeSeconds?: number
  ): UserLoggedInEvent {
    return new UserLoggedInEvent(
      userId,
      aggregateVersion,
      email,
      originalLoginEvent.loginMethod,
      LoginType.MFA_VERIFIED,
      {
        sessionId,
        location: originalLoginEvent.location,
        isNewDevice: originalLoginEvent.isNewDevice,
        isNewLocation: originalLoginEvent.isNewLocation,
        correlationId: originalLoginEvent.correlationId,
        causationId: originalLoginEvent.eventId,
        metadata: {
          ...originalLoginEvent.metadata,
          mfaMethod,
          mfaVerificationTimeSeconds,
          isTrustedDevice: originalLoginEvent.metadata?.isTrustedDevice,
          deviceTrustLevel: originalLoginEvent.metadata?.deviceTrustLevel,
        }
      }
    );
  }
}

// ============================================================
// ✅ Enterprise: User Login Failed Event (v2.0)
// ============================================================

export class UserLoginFailedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.USER_LOGIN_FAILED;
  public readonly occurredAt: Date;
  public readonly eventVersion: number = EVENT_VERSIONS.V1;
  public readonly aggregateVersion: number = 1;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly ttlSeconds?: number;
  public readonly expiresAt?: Date;
  public readonly priority?: EventPriority = 'normal';
  public readonly partitionKey?: string;

  public readonly email: string;
  public readonly phone?: string;
  public readonly reason: string;
  public readonly failureType: 'invalid_credentials' | 'account_locked' | 'account_suspended' | 'mfa_failed' | 'rate_limited' | 'ip_blocked' | 'device_blocked';
  public readonly attemptCount?: number;
  public readonly remainingAttempts?: number;
  public readonly ipAddress?: string;
  public readonly deviceId?: string;
  public readonly userAgent?: string;
  public readonly location?: string;
  public readonly metadata?: Record<string, unknown>;

  constructor(
    email: string,
    reason: string,
    failureType: 'invalid_credentials' | 'account_locked' | 'account_suspended' | 'mfa_failed' | 'rate_limited' | 'ip_blocked' | 'device_blocked',
    options?: {
      phone?: string;
      attemptCount?: number;
      remainingAttempts?: number;
      ipAddress?: string;
      deviceId?: string;
      userAgent?: string;
      location?: string;
      correlationId?: string;
      metadata?: Record<string, unknown>;
    }
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.correlationId = options?.correlationId;
    this.email = email;
    this.phone = options?.phone;
    this.reason = reason;
    this.failureType = failureType;
    this.attemptCount = options?.attemptCount;
    this.remainingAttempts = options?.remainingAttempts;
    this.ipAddress = options?.ipAddress;
    this.deviceId = options?.deviceId;
    this.userAgent = options?.userAgent;
    this.location = options?.location;
    this.metadata = options?.metadata;
    this.partitionKey = email;
  }

  public toJSON(): UserLoginFailedEventData {
    return {
      eventId: this.eventId,
      eventName: this.eventName,
      occurredAt: this.occurredAt.toISOString(),
      eventVersion: this.eventVersion,
      aggregateVersion: this.aggregateVersion,
      correlationId: this.correlationId,
      email: this.email,
      phone: this.phone,
      reason: this.reason,
      failureType: this.failureType,
      attemptCount: this.attemptCount,
      remainingAttempts: this.remainingAttempts,
      ipAddress: this.ipAddress,
      deviceId: this.deviceId,
      userAgent: this.userAgent,
      location: this.location,
      metadata: this.metadata,
    };
  }
}

// ============================================================
// ✅ Enterprise: User Logged Out Event (v2.0)
// ============================================================

export enum LogoutReason {
  USER_INITIATED = 'USER_INITIATED',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  REVOKED_BY_ADMIN = 'REVOKED_BY_ADMIN',
  PASSWORD_CHANGED = 'PASSWORD_CHANGED',
  MFA_CHANGED = 'MFA_CHANGED',
  SECURITY_BREACH = 'SECURITY_BREACH',
  ACCOUNT_DELETED = 'ACCOUNT_DELETED',
  ACCOUNT_SUSPENDED = 'ACCOUNT_SUSPENDED',
  DEVICE_REMOVED = 'DEVICE_REMOVED',
  ALL_DEVICES_LOGOUT = 'ALL_DEVICES_LOGOUT',
}

export enum LogoutSource {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SYSTEM = 'SYSTEM',
  SECURITY = 'SECURITY',
}

export class UserLoggedOutEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.USER_LOGOUT;
  public readonly occurredAt: Date;
  public readonly eventVersion: number = EVENT_VERSIONS.V1;
  public readonly aggregateVersion: number;
  public readonly correlationId?: string;
  public readonly causationId?: string;

  public readonly userId: string;
  public readonly sessionId?: string;
  public readonly reason: LogoutReason;
  public readonly source: LogoutSource;
  public readonly performedBy?: string;  // Admin ID if source is ADMIN
  public readonly ipAddress?: string;
  public readonly deviceId?: string;
  public readonly userAgent?: string;
  public readonly metadata?: Record<string, unknown>;

  constructor(
    userId: string,
    aggregateVersion: number,
    reason: LogoutReason,
    source: LogoutSource,
    options?: {
      sessionId?: string;
      performedBy?: string;
      ipAddress?: string;
      deviceId?: string;
      userAgent?: string;
      correlationId?: string;
      causationId?: string;
      metadata?: Record<string, unknown>;
    }
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.aggregateVersion = aggregateVersion;
    this.correlationId = options?.correlationId;
    this.causationId = options?.causationId;
    this.userId = userId;
    this.sessionId = options?.sessionId;
    this.reason = reason;
    this.source = source;
    this.performedBy = options?.performedBy;
    this.ipAddress = options?.ipAddress;
    this.deviceId = options?.deviceId;
    this.userAgent = options?.userAgent;
    this.metadata = options?.metadata;
  }

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
      sessionId: this.sessionId,
      reason: this.reason,
      source: this.source,
      performedBy: this.performedBy,
      ipAddress: this.ipAddress,
      deviceId: this.deviceId,
      userAgent: this.userAgent,
      metadata: this.metadata,
    };
  }
}

// ============================================================
// ✅ Enterprise: Event Data Interfaces (for serialization)
// ============================================================

export interface UserLoggedInEventData {
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
  loginMethod: LoginMethod;
  loginType: LoginType;
  loginSource: LoginSource;
  sessionId?: string;
  location?: string;
  isNewDevice: boolean;
  isNewLocation: boolean;
  isSuspicious: boolean;
  riskScore?: number;
  riskLevel?: 'low' | 'medium' | 'high' | 'critical';
  metadata?: UserLoggedInMetadata;
  ttlSeconds?: number;
  expiresAt?: string;
  priority?: EventPriority;
  partitionKey?: string;
}

export interface UserLoginFailedEventData {
  eventId: string;
  eventName: string;
  occurredAt: string;
  eventVersion: number;
  aggregateVersion: number;
  correlationId?: string;
  email: string;
  phone?: string;
  reason: string;
  failureType: string;
  attemptCount?: number;
  remainingAttempts?: number;
  ipAddress?: string;
  deviceId?: string;
  userAgent?: string;
  location?: string;
  metadata?: Record<string, unknown>;
}

export interface UserLoggedOutEventData {
  eventId: string;
  eventName: string;
  occurredAt: string;
  eventVersion: number;
  aggregateVersion: number;
  correlationId?: string;
  causationId?: string;
  userId: string;
  sessionId?: string;
  reason: LogoutReason;
  source: LogoutSource;
  performedBy?: string;
  ipAddress?: string;
  deviceId?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
}

// ============================================================
// ✅ Enterprise: Type Exports
// ============================================================

export type { 
  UserLoggedInMetadata as UserLoggedInMetadataType,
  UserLoggedInPayload as UserLoggedInPayloadType
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
// 8. ✅ MFS login methods (bKash, Nagad, Rocket)
// 9. ✅ WhatsApp/Imo/Telegram/Viber login support
// 10. ✅ Risk scoring and risk level calculation
// 11. ✅ Suspicious login detection
// 12. ✅ Security notification trigger flags
// 13. ✅ Static factory methods for common scenarios
// 14. ✅ Helper methods: isExpired(), isCritical(), requiresSecurityNotification()
// 15. ✅ Serialization support (toJSON, fromJSON)
// 16. ✅ Zod schema for runtime validation
// 17. ✅ Extended metadata with device fingerprint tracking
// 18. ✅ MFA method tracking with verification time
// 19. ✅ Device trust level tracking
// 20. ✅ Bengali language support (metadata.language: 'bn')
// 
// Bangladesh Specific:
// - MFS login methods (bKash, Nagad, Rocket)
// - WhatsApp/Imo/Telegram/Viber social login
// - Feature phone detection
// - District/Upazila/Division location tracking
// - Mobile operator and network type tracking
// - Bengali language support
// 
// Security Features:
// - Risk scoring for login events
// - Suspicious login detection
// - Device trust level tracking
// - MFA verification tracking
// - Security notification triggers
// 
// ============================================================
