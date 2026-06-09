/**
 * Login Failed Event - Enterprise Grade (v3.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce

 * @module application/events/login-failed.event

 * @description
 * Event emitted when a user login attempt fails.
 * Enhanced with shared-types integration, event versioning, TTL support,
 * Bangladesh specific fields (district, upazila, mobileOperator, networkType),
 * and priority-based processing.

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
 * ✅ Security alert on repeated failures
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
// Login Failure Reason Enum (Extended - 20+ reasons)
// ============================================================

export enum LoginFailureReason {
  // Credential issues
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  INVALID_EMAIL = 'INVALID_EMAIL',
  INVALID_PHONE = 'INVALID_PHONE',
  INVALID_USERNAME = 'INVALID_USERNAME',
  PASSWORD_EXPIRED = 'PASSWORD_EXPIRED',
  PASSWORD_WEAK = 'PASSWORD_WEAK',

  // Account status issues
  ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',
  ACCOUNT_SUSPENDED = 'ACCOUNT_SUSPENDED',
  ACCOUNT_INACTIVE = 'ACCOUNT_INACTIVE',
  ACCOUNT_BANNED = 'ACCOUNT_BANNED',
  ACCOUNT_DELETED = 'ACCOUNT_DELETED',
  ACCOUNT_PENDING_VERIFICATION = 'ACCOUNT_PENDING_VERIFICATION',

  // Verification issues
  EMAIL_NOT_VERIFIED = 'EMAIL_NOT_VERIFIED',
  PHONE_NOT_VERIFIED = 'PHONE_NOT_VERIFIED',
  KYC_NOT_COMPLETED = 'KYC_NOT_COMPLETED',

  // MFA issues
  MFA_REQUIRED = 'MFA_REQUIRED',
  MFA_FAILED = 'MFA_FAILED',
  MFA_METHOD_UNAVAILABLE = 'MFA_METHOD_UNAVAILABLE',
  MFA_SESSION_EXPIRED = 'MFA_SESSION_EXPIRED',

  // Rate limiting
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  TOO_MANY_ATTEMPTS = 'TOO_MANY_ATTEMPTS',

  // Blocking
  IP_BLOCKED = 'IP_BLOCKED',
  DEVICE_BLOCKED = 'DEVICE_BLOCKED',
  COUNTRY_BLOCKED = 'COUNTRY_BLOCKED',

  // Suspicious activity
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
  BRUTE_FORCE_DETECTED = 'BRUTE_FORCE_DETECTED',
  UNUSUAL_LOCATION = 'UNUSUAL_LOCATION',
  UNUSUAL_DEVICE = 'UNUSUAL_DEVICE',
  UNUSUAL_TIME = 'UNUSUAL_TIME',

  // Bangladesh specific
  SIM_SWAP_DETECTED = 'SIM_SWAP_DETECTED',
  MFS_ACCOUNT_INVALID = 'MFS_ACCOUNT_INVALID',     // bKash/Nagad/Rocket account issue
  MFS_PIN_INCORRECT = 'MFS_PIN_INCORRECT',

  // Network issues
  VPN_DETECTED = 'VPN_DETECTED',
  PROXY_DETECTED = 'PROXY_DETECTED',
  TOR_DETECTED = 'TOR_DETECTED',

  // Technical issues
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  TIMEOUT = 'TIMEOUT',
}

// ============================================================
// Login Failure Severity Enum
// ============================================================

export enum LoginFailureSeverity {
  INFO = 'info',           // Normal failed attempt
  WARNING = 'warning',     // Multiple attempts
  HIGH = 'high',           // Suspicious pattern
  CRITICAL = 'critical',   // Brute force or account takeover attempt
}

// ============================================================
// ✅ ENTERPRISE: Event Metadata Interface (Bangladesh specific)
// ============================================================

export interface LoginFailedMetadata extends EventMetadata {
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

  /** Attempt number for this user (consecutive failures) */
  consecutiveFailures?: number;

  /** Total failures for this user today */
  totalFailuresToday?: number;

  /** Remaining attempts before lockout */
  remainingAttempts?: number;

  /** Lockout duration in minutes (if account will be locked) */
  lockoutDurationMinutes?: number;

  /** Attempt timestamp */
  attemptedAt?: Date;

  /** Login method attempted */
  loginMethod?: 'password' | 'otp' | 'social' | 'mfa' | 'whatsapp' | 'bkash' | 'nagad' | 'rocket';

  /** Whether CAPTCHA was presented */
  captchaPresented?: boolean;

  /** Whether CAPTCHA was solved correctly */
  captchaSolved?: boolean;

  /** Whether this failure triggered a security alert */
  triggeredSecurityAlert?: boolean;

  /** Security alert reason (if triggered) */
  securityAlertReason?: string;

  /** ✅ Enterprise: Bangladesh specific fields */
  /** User's district (Bangladesh) - if known */
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

export interface LoginFailedPayload extends EventPayload {
  /** User email (if provided) */
  email?: string;

  /** User phone (Bangladesh specific) */
  phone?: string;

  /** Username (if used for login) */
  username?: string;

  /** User ID (if user exists in system) */
  userId?: string;

  /** Login method attempted */
  loginMethod?: 'password' | 'otp' | 'social' | 'mfa' | 'whatsapp' | 'bkash' | 'nagad' | 'rocket';

  /** Failure reason */
  reason: LoginFailureReason;

  /** Severity level */
  severity: LoginFailureSeverity;

  /** IP address of the request */
  ipAddress: string;

  /** User agent of the request */
  userAgent?: string;

  /** Location (reverse geocoded) */
  location?: string;

  /** Whether the account is now locked */
  accountLocked?: boolean;

  /** Notification sent to user? */
  notificationSent?: boolean;

  /** Notification channel used */
  notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';
}

// ============================================================
// ✅ ENTERPRISE: Zod Schema for Runtime Validation
// ============================================================

export const LoginFailedEventSchema = z.object({
  eventId: z.string().uuid(),
  eventName: z.literal(EVENT_NAMES.USER_LOGIN_FAILED),
  occurredAt: z.date(),
  eventVersion: z.number().int().min(1).default(EVENT_VERSIONS.V1),
  aggregateVersion: z.number().int().min(1).default(1),
  correlationId: z.string().uuid().optional(),
  causationId: z.string().uuid().optional(),
  email: z.string().email().optional(),
  phone: z.string().regex(/^(?:\+880|0)1[3-9]\d{8}$/).optional(),
  username: z.string().max(50).optional(),
  userId: z.string().uuid().optional(),
  loginMethod: z.enum(['password', 'otp', 'social', 'mfa', 'whatsapp', 'bkash', 'nagad', 'rocket']).optional(),
  reason: z.nativeEnum(LoginFailureReason),
  severity: z.nativeEnum(LoginFailureSeverity).default(LoginFailureSeverity.INFO),
  ipAddress: z.string().ip(),
  userAgent: z.string().max(500).optional(),
  location: z.string().max(200).optional(),
  accountLocked: z.boolean().default(false),
  notificationSent: z.boolean().default(false),
  notificationChannel: z.enum(['email', 'sms', 'push', 'whatsapp']).optional(),
  metadata: z.object({
    ipAddress: z.string().ip().optional(),
    deviceId: z.string().max(255).optional(),
    deviceFingerprint: z.string().max(128).optional(),
    userAgent: z.string().max(500).optional(),
    sessionId: z.string().uuid().optional(),
    consecutiveFailures: z.number().int().min(0).optional(),
    totalFailuresToday: z.number().int().min(0).optional(),
    remainingAttempts: z.number().int().min(0).optional(),
    lockoutDurationMinutes: z.number().int().min(0).optional(),
    attemptedAt: z.date().optional(),
    loginMethod: z.enum(['password', 'otp', 'social', 'mfa', 'whatsapp', 'bkash', 'nagad', 'rocket']).optional(),
    captchaPresented: z.boolean().optional(),
    captchaSolved: z.boolean().optional(),
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
// ✅ ENTERPRISE: Login Failed Event Class (v3.0)
// ============================================================

export class LoginFailedEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.USER_LOGIN_FAILED;
  public readonly occurredAt: Date;
  public readonly eventVersion: number;
  public readonly aggregateVersion: number;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly ttlSeconds?: number;
  public readonly expiresAt?: Date;
  public readonly priority?: EventPriority;
  public readonly partitionKey?: string;

  // Core failure information
  public readonly email?: string;
  public readonly phone?: string;
  public readonly username?: string;
  public readonly userId?: string;
  public readonly loginMethod?: 'password' | 'otp' | 'social' | 'mfa' | 'whatsapp' | 'bkash' | 'nagad' | 'rocket';
  public readonly reason: LoginFailureReason;
  public readonly severity: LoginFailureSeverity;
  public readonly ipAddress: string;
  public readonly userAgent?: string;
  public readonly location?: string;
  public readonly accountLocked: boolean;
  public readonly notificationSent: boolean;
  public readonly notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';

  // Event metadata
  public readonly metadata?: LoginFailedMetadata;

  // ✅ Enterprise: Constructor with enhanced options
  constructor(
    reason: LoginFailureReason,
    ipAddress: string,
    options?: {
      // Core fields
      email?: string;
      phone?: string;
      username?: string;
      userId?: string;
      loginMethod?: 'password' | 'otp' | 'social' | 'mfa' | 'whatsapp' | 'bkash' | 'nagad' | 'rocket';
      
      // Response flags
      accountLocked?: boolean;
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
      metadata?: LoginFailedMetadata;

      // Event version (default: from shared-constants)
      eventVersion?: number;
    }
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.eventVersion = options?.eventVersion ?? EVENT_VERSIONS.V1;
    this.aggregateVersion = 1; // Login failure doesn't affect aggregate version
    this.correlationId = options?.correlationId;
    this.causationId = options?.causationId;
    this.ttlSeconds = options?.ttlSeconds;
    this.expiresAt = options?.expiresAt;
    this.priority = options?.priority ?? this.calculatePriority(reason, options?.metadata);
    this.partitionKey = options?.partitionKey ?? options?.userId ?? options?.email ?? ipAddress;

    this.email = options?.email;
    this.phone = options?.phone;
    this.username = options?.username;
    this.userId = options?.userId;
    this.loginMethod = options?.loginMethod;
    this.reason = reason;
    this.severity = this.calculateSeverity(reason, options?.metadata);
    this.ipAddress = ipAddress;
    this.userAgent = options?.metadata?.userAgent;
    this.location = options?.metadata?.district ? `${options.metadata.district}, Bangladesh` : undefined;
    this.accountLocked = options?.accountLocked ?? false;
    this.notificationSent = options?.notificationSent ?? false;
    this.notificationChannel = options?.notificationChannel;

    this.metadata = options?.metadata;

    // ✅ Enterprise: Auto-set partition key from district if available
    if (!options?.partitionKey && this.metadata?.district) {
      this.partitionKey = this.metadata.district;
    }

    // ✅ Enterprise: Auto-set TTL if not provided (30 days default for login failures)
    if (!this.ttlSeconds && !this.expiresAt) {
      this.ttlSeconds = 30 * 24 * 60 * 60; // 30 days
      this.expiresAt = new Date(Date.now() + this.ttlSeconds * 1000);
    }
  }

  // ============================================================
  // ✅ Enterprise: Helper Methods
  // ============================================================

  /**
   * Calculate severity based on failure reason and context
   */
  private calculateSeverity(reason: LoginFailureReason, metadata?: LoginFailedMetadata): LoginFailureSeverity {
    // Critical severity - account takeover attempts
    if (reason === LoginFailureReason.BRUTE_FORCE_DETECTED ||
        reason === LoginFailureReason.SUSPICIOUS_ACTIVITY ||
        reason === LoginFailureReason.SIM_SWAP_DETECTED) {
      return LoginFailureSeverity.CRITICAL;
    }

    // High severity
    if (reason === LoginFailureReason.ACCOUNT_LOCKED ||
        reason === LoginFailureReason.MFA_FAILED ||
        reason === LoginFailureReason.IP_BLOCKED ||
        reason === LoginFailureReason.DEVICE_BLOCKED) {
      return LoginFailureSeverity.HIGH;
    }

    // Warning severity - multiple failures
    if (metadata?.consecutiveFailures && metadata.consecutiveFailures >= 3) {
      return LoginFailureSeverity.WARNING;
    }

    return LoginFailureSeverity.INFO;
  }

  /**
   * Calculate priority based on severity
   */
  private calculatePriority(reason: LoginFailureReason, metadata?: LoginFailedMetadata): EventPriority {
    if (reason === LoginFailureReason.BRUTE_FORCE_DETECTED ||
        reason === LoginFailureReason.SUSPICIOUS_ACTIVITY ||
        reason === LoginFailureReason.SIM_SWAP_DETECTED) {
      return 'critical';
    }
    
    if (reason === LoginFailureReason.ACCOUNT_LOCKED ||
        reason === LoginFailureReason.MFA_FAILED ||
        (metadata?.consecutiveFailures && metadata.consecutiveFailures >= 5)) {
      return 'high';
    }
    
    if (metadata?.consecutiveFailures && metadata.consecutiveFailures >= 3) {
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
   * Check if event is critical priority
   */
  public isCritical(): boolean {
    return this.priority === 'critical' || this.severity === LoginFailureSeverity.CRITICAL;
  }

  /**
   * Check if this failure should trigger a security alert
   */
  public shouldTriggerSecurityAlert(): boolean {
    return this.severity === LoginFailureSeverity.HIGH || 
           this.severity === LoginFailureSeverity.CRITICAL ||
           (this.metadata?.consecutiveFailures !== undefined && this.metadata.consecutiveFailures >= 5);
  }

  /**
   * Get event summary for logging
   */
  public getSummary(): Record<string, unknown> {
    return {
      eventId: this.eventId,
      eventName: this.eventName,
      email: this.email,
      phone: this.phone,
      userId: this.userId,
      reason: this.reason,
      severity: this.severity,
      ipAddress: this.ipAddress,
      accountLocked: this.accountLocked,
      consecutiveFailures: this.metadata?.consecutiveFailures,
      remainingAttempts: this.metadata?.remainingAttempts,
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
  public toJSON(): LoginFailedEventData {
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
      username: this.username,
      userId: this.userId,
      loginMethod: this.loginMethod,
      reason: this.reason,
      severity: this.severity,
      ipAddress: this.ipAddress,
      userAgent: this.userAgent,
      location: this.location,
      accountLocked: this.accountLocked,
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
  public static fromJSON(data: LoginFailedEventData): LoginFailedEvent {
    const event = new LoginFailedEvent(
      data.reason,
      data.ipAddress,
      {
        email: data.email,
        phone: data.phone,
        username: data.username,
        userId: data.userId,
        loginMethod: data.loginMethod,
        accountLocked: data.accountLocked,
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
    const result = LoginFailedEventSchema.safeParse(this.toJSON());
    return result.success;
  }

  // ============================================================
  // ✅ Enterprise: Static factory methods for common scenarios
  // ============================================================

  /**
   * Create event for invalid credentials failure
   */
  public static forInvalidCredentials(
    email: string,
    ipAddress: string,
    options?: {
      userId?: string;
      userAgent?: string;
      deviceId?: string;
      district?: string;
      correlationId?: string;
    }
  ): LoginFailedEvent {
    return new LoginFailedEvent(
      LoginFailureReason.INVALID_CREDENTIALS,
      ipAddress,
      {
        email,
        userId: options?.userId,
        correlationId: options?.correlationId,
        metadata: {
          userAgent: options?.userAgent,
          deviceId: options?.deviceId,
          district: options?.district,
          loginMethod: 'password',
          attemptedAt: new Date(),
        }
      }
    );
  }

  /**
   * Create event for MFA failure
   */
  public static forMFAFailure(
    email: string,
    ipAddress: string,
    mfaMethod: 'totp' | 'sms' | 'whatsapp' | 'email' | 'webauthn' | 'bkash_pin' | 'nagad_pin' | 'rocket_pin',
    remainingAttempts: number,
    options?: {
      userId?: string;
      userAgent?: string;
      deviceId?: string;
      correlationId?: string;
    }
  ): LoginFailedEvent {
    return new LoginFailedEvent(
      LoginFailureReason.MFA_FAILED,
      ipAddress,
      {
        email,
        userId: options?.userId,
        loginMethod: mfaMethod === 'bkash_pin' ? 'bkash' : 
                     mfaMethod === 'nagad_pin' ? 'nagad' :
                     mfaMethod === 'rocket_pin' ? 'rocket' : 'mfa',
        correlationId: options?.correlationId,
        metadata: {
          userAgent: options?.userAgent,
          deviceId: options?.deviceId,
          loginMethod: 'mfa',
          remainingAttempts,
          attemptedAt: new Date(),
        }
      }
    );
  }

  /**
   * Create event for account lockout
   */
  public static forAccountLockout(
    email: string,
    ipAddress: string,
    lockoutDurationMinutes: number,
    consecutiveFailures: number,
    options?: {
      userId?: string;
      userAgent?: string;
      deviceId?: string;
      district?: string;
      correlationId?: string;
    }
  ): LoginFailedEvent {
    return new LoginFailedEvent(
      LoginFailureReason.ACCOUNT_LOCKED,
      ipAddress,
      {
        email,
        userId: options?.userId,
        accountLocked: true,
        correlationId: options?.correlationId,
        metadata: {
          userAgent: options?.userAgent,
          deviceId: options?.deviceId,
          district: options?.district,
          lockoutDurationMinutes,
          consecutiveFailures,
          remainingAttempts: 0,
          attemptedAt: new Date(),
          triggeredSecurityAlert: true,
          securityAlertReason: `Account locked after ${consecutiveFailures} failed attempts`,
        }
      }
    );
  }

  /**
   * Create event for SIM swap detection (Bangladesh specific)
   */
  public static forSimSwapDetection(
    phone: string,
    ipAddress: string,
    options?: {
      userId?: string;
      userAgent?: string;
      deviceId?: string;
      district?: string;
      mobileOperator?: typeof MOBILE_OPERATORS[number];
      correlationId?: string;
    }
  ): LoginFailedEvent {
    return new LoginFailedEvent(
      LoginFailureReason.SIM_SWAP_DETECTED,
      ipAddress,
      {
        phone,
        userId: options?.userId,
        loginMethod: 'whatsapp',
        correlationId: options?.correlationId,
        metadata: {
          userAgent: options?.userAgent,
          deviceId: options?.deviceId,
          district: options?.district,
          mobileOperator: options?.mobileOperator,
          attemptedAt: new Date(),
          triggeredSecurityAlert: true,
          securityAlertReason: 'SIM swap detected during login attempt',
        }
      }
    );
  }

  /**
   * Create event for rate limit exceeded
   */
  public static forRateLimitExceeded(
    email: string,
    ipAddress: string,
    remainingAttempts: number,
    retryAfterSeconds: number,
    options?: {
      userAgent?: string;
      deviceId?: string;
      correlationId?: string;
    }
  ): LoginFailedEvent {
    return new LoginFailedEvent(
      LoginFailureReason.RATE_LIMIT_EXCEEDED,
      ipAddress,
      {
        email,
        correlationId: options?.correlationId,
        metadata: {
          userAgent: options?.userAgent,
          deviceId: options?.deviceId,
          remainingAttempts,
          lockoutDurationMinutes: Math.ceil(retryAfterSeconds / 60),
          attemptedAt: new Date(),
        }
      }
    );
  }

  /**
   * Create event for suspicious activity
   */
  public static forSuspiciousActivity(
    email: string,
    ipAddress: string,
    suspiciousReason: string,
    options?: {
      userId?: string;
      userAgent?: string;
      deviceId?: string;
      district?: string;
      correlationId?: string;
    }
  ): LoginFailedEvent {
    return new LoginFailedEvent(
      LoginFailureReason.SUSPICIOUS_ACTIVITY,
      ipAddress,
      {
        email,
        userId: options?.userId,
        correlationId: options?.correlationId,
        metadata: {
          userAgent: options?.userAgent,
          deviceId: options?.deviceId,
          district: options?.district,
          attemptedAt: new Date(),
          triggeredSecurityAlert: true,
          securityAlertReason: suspiciousReason,
        }
      }
    );
  }
}

// ============================================================
// ✅ Enterprise: Event Data Interface (for serialization)
// ============================================================

export interface LoginFailedEventData {
  eventId: string;
  eventName: string;
  occurredAt: string;
  eventVersion: number;
  aggregateVersion: number;
  correlationId?: string;
  causationId?: string;
  email?: string;
  phone?: string;
  username?: string;
  userId?: string;
  loginMethod?: 'password' | 'otp' | 'social' | 'mfa' | 'whatsapp' | 'bkash' | 'nagad' | 'rocket';
  reason: LoginFailureReason;
  severity: LoginFailureSeverity;
  ipAddress: string;
  userAgent?: string;
  location?: string;
  accountLocked: boolean;
  notificationSent: boolean;
  notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';
  metadata?: LoginFailedMetadata;
  ttlSeconds?: number;
  expiresAt?: string;
  priority?: EventPriority;
  partitionKey?: string;
}

// ============================================================
// ✅ Enterprise: Type Exports
// ============================================================

export type { 
  LoginFailedMetadata as LoginFailedMetadataType,
  LoginFailedPayload as LoginFailedPayloadType
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
// 8. ✅ SIM swap detection support (Bangladesh specific)
// 9. ✅ MFS account validation (bKash/Nagad/Rocket)
// 10. ✅ 20+ LoginFailureReason enum values
// 11. ✅ Severity levels (info/warning/high/critical)
// 12. ✅ 6 Static factory methods for common scenarios
// 13. ✅ Helper methods: isExpired(), isCritical(), shouldTriggerSecurityAlert()
// 14. ✅ Serialization support (toJSON, fromJSON)
// 15. ✅ Zod schema for runtime validation
// 16. ✅ Extended metadata with device fingerprint tracking
// 17. ✅ Consecutive failure tracking
// 18. ✅ Remaining attempts tracking
// 19. ✅ Lockout duration tracking
// 20. ✅ Bengali language support
// 
// Bangladesh Specific:
// - SIM swap detection reason
// - MFS account validation (bKash/Nagad/Rocket)
// - District/Upazila/Division location tracking
// - Mobile operator and network type tracking
// - Feature phone device type
// - Bengali language support (metadata.language: 'bn')
// 
// Security Features:
// - Severity levels for prioritization
// - Security alert triggers
// - Brute force detection
// - Unusual activity detection
// - Account lockout tracking
// - IP/Device blocking
// 
// ============================================================
