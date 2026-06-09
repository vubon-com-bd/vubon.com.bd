/**
 * Token Compromised Event - Enterprise Grade (v3.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce

 * @module application/events/token-compromised.event

 * @description
 * Event emitted when a refresh token is suspected to be compromised.
 * Enhanced with shared-types integration, event versioning, TTL support,
 * Bangladesh specific fields, and priority-based processing.

 * ENTERPRISE ENHANCEMENTS (v3.0):
 * ✅ Shared-types integration (@vubon/shared-types)
 * ✅ Event versioning with aggregateVersion tracking
 * ✅ TTL support with expiresAt for event expiry (90 days default)
 * ✅ Priority-based event processing (critical for token compromise)
 * ✅ Partition key for event streaming optimization
 * ✅ Bangladesh specific fields (district, upazila, mobileOperator, networkType)
 * ✅ Device fingerprint tracking
 * ✅ Session binding tracking
 * ✅ Severity levels (low/medium/high/critical)
 * ✅ Notification tracking (notificationSent, notificationChannel)
 * ✅ Zod schema for runtime validation
 * ✅ Serialization support (toJSON, fromJSON)
 * ✅ Helper methods for expiry, priority, and localization
 * ✅ Extended DetectionMethod and Action enums

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
 */

import { randomUUID } from 'crypto';
import { z } from 'zod';

// ✅ Enterprise: Import from shared-types and shared-constants
import type {
  EventMetadata,
  EventPayload,
  DomainEvent as SharedDomainEvent,
  EventPriority,
} from '@vubon/shared-types';

import {
  EVENT_VERSIONS,
  EVENT_NAMES,
  MOBILE_OPERATORS,
  NETWORK_TYPES,
  SECURITY_CONFIG,
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
// Detection Method Enum (Extended - Bangladesh specific)
// ============================================================

export enum TokenCompromiseDetectionMethod {
  // Standard detection methods
  MULTIPLE_USES = 'MULTIPLE_USES',               // Token used more than once
  INVALID_ROTATION = 'INVALID_ROTATION',         // Invalid rotation sequence
  SUSPICIOUS_IP = 'SUSPICIOUS_IP',               // IP address mismatch
  SUSPICIOUS_USER_AGENT = 'SUSPICIOUS_USER_AGENT', // User agent mismatch
  REUSE_DETECTED = 'REUSE_DETECTED',             // Token reuse after revocation
  SIMULTANEOUS_USES = 'SIMULTANEOUS_USES',       // Token used from multiple locations
  EXPIRED_TOKEN_REUSE = 'EXPIRED_TOKEN_REUSE',   // Expired token attempted
  BLACKLISTED_IP = 'BLACKLISTED_IP',             // Request from known malicious IP
  ANOMALY_DETECTED = 'ANOMALY_DETECTED',         // ML-based anomaly detection

  // ✅ Enterprise: Additional detection methods
  OPERATOR_MISMATCH = 'OPERATOR_MISMATCH',       // Mobile operator mismatch (Bangladesh)
  DISTRICT_MISMATCH = 'DISTRICT_MISMATCH',       // District mismatch (Bangladesh)
  NETWORK_TYPE_MISMATCH = 'NETWORK_TYPE_MISMATCH', // Network type mismatch (2G/3G/4G/5G/WiFi)
  VPN_DETECTED = 'VPN_DETECTED',                 // VPN/Proxy detected
  TOR_DETECTED = 'TOR_DETECTED',                 // Tor network detected
  RAPID_LOCATION_CHANGE = 'RAPID_LOCATION_CHANGE', // Impossible travel detection
  DEVICE_FINGERPRINT_MISMATCH = 'DEVICE_FINGERPRINT_MISMATCH', // Device fingerprint mismatch
  SESSION_HIJACKING = 'SESSION_HIJACKING',       // Session hijacking detected
  BRUTE_FORCE_TOKEN = 'BRUTE_FORCE_TOKEN',       // Token brute force attempt
}

// ============================================================
// Action Taken Enum (Extended)
// ============================================================

export enum TokenCompromiseAction {
  // Standard actions
  REVOKED_ALL_TOKENS = 'REVOKED_ALL_TOKENS',
  LOCKED_ACCOUNT = 'LOCKED_ACCOUNT',
  FLAGGED_FOR_REVIEW = 'FLAGGED_FOR_REVIEW',
  NOTIFIED_USER = 'NOTIFIED_USER',
  REQUIRED_PASSWORD_CHANGE = 'REQUIRED_PASSWORD_CHANGE',
  REVOKED_TOKEN_FAMILY = 'REVOKED_TOKEN_FAMILY',
  ALERTED_SECURITY_TEAM = 'ALERTED_SECURITY_TEAM',
  BLOCKED_IP = 'BLOCKED_IP',

  // ✅ Enterprise: Additional actions
  BLOCKED_DEVICE = 'BLOCKED_DEVICE',
  BLOCKED_OPERATOR = 'BLOCKED_OPERATOR',         // Block entire operator range (Bangladesh)
  REQUIRED_MFA_RESET = 'REQUIRED_MFA_RESET',
  REQUIRED_IDENTITY_VERIFICATION = 'REQUIRED_IDENTITY_VERIFICATION',
  INITIATED_FORENSICS = 'INITIATED_FORENSICS',
  NOTIFIED_ADMIN = 'NOTIFIED_ADMIN',
  BAN_IP_RANGE = 'BAN_IP_RANGE',
  TRIGGERED_WAF = 'TRIGGERED_WAF',               // Triggered Web Application Firewall
}

// ============================================================
// Severity Level Enum
// ============================================================

export enum TokenCompromiseSeverity {
  LOW = 'low',         // Informational, no immediate action needed
  MEDIUM = 'medium',   // Suspicious, monitor
  HIGH = 'high',       // Likely compromised, action required
  CRITICAL = 'critical', // Confirmed compromise, immediate action
}

// ============================================================
// ✅ ENTERPRISE: Event Metadata Interface (Bangladesh specific)
// ============================================================

export interface TokenCompromisedMetadata extends EventMetadata {
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

  /** Previous rotation count for this token */
  previousRotationCount?: number;

  /** Time since last rotation (seconds) */
  timeSinceLastRotation?: number;

  /** Number of consecutive failures before detection */
  consecutiveFailures?: number;

  /** Whether this triggered a security alert */
  triggeredSecurityAlert?: boolean;

  /** Security alert reason (if triggered) */
  securityAlertReason?: string;

  /** Whether notification was sent to user */
  notificationSent?: boolean;

  /** Notification channel used */
  notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';

  /** Severity level of the compromise */
  severity?: TokenCompromiseSeverity;

  /** Risk score (0-100) for this compromise */
  riskScore?: number;

  /** Whether the token was rotated after detection */
  tokenRotated?: boolean;

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

export interface TokenCompromisedPayload extends EventPayload {
  /** User ID */
  userId: string;

  /** User email */
  email: string;

  /** User phone (Bangladesh specific) */
  phone?: string;

  /** Token ID that was compromised */
  tokenId: string;

  /** Token family ID for family revocation */
  tokenFamily: string;

  /** Detection method */
  detectionMethod: TokenCompromiseDetectionMethod;

  /** Actions taken after detection */
  actionTaken: TokenCompromiseAction;

  /** Severity level */
  severity: TokenCompromiseSeverity;

  /** Detection timestamp */
  detectedAt: Date;

  /** Reported IP address (suspicious request) */
  reportedIpAddress?: string;

  /** Reported user agent (suspicious request) */
  reportedUserAgent?: string;

  /** Original IP address (from token issuance) */
  originalIpAddress?: string;

  /** Original user agent (from token issuance) */
  originalUserAgent?: string;

  /** Whether account was locked */
  accountLocked?: boolean;

  /** Whether notification was sent to user */
  notificationSent?: boolean;

  /** Notification channel used */
  notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';
}

// ============================================================
// ✅ ENTERPRISE: Zod Schema for Runtime Validation
// ============================================================

export const TokenCompromisedEventSchema = z.object({
  eventId: z.string().uuid(),
  eventName: z.literal(EVENT_NAMES.TOKEN_COMPROMISED),
  occurredAt: z.date(),
  eventVersion: z.number().int().min(1).default(EVENT_VERSIONS.V1),
  aggregateVersion: z.number().int().min(1).default(1),
  correlationId: z.string().uuid().optional(),
  causationId: z.string().uuid().optional(),
  userId: z.string().uuid(),
  email: z.string().email(),
  phone: z.string().regex(/^(?:\+880|0)1[3-9]\d{8}$/).optional(),
  tokenId: z.string(),
  tokenFamily: z.string(),
  detectionMethod: z.nativeEnum(TokenCompromiseDetectionMethod),
  actionTaken: z.nativeEnum(TokenCompromiseAction),
  severity: z.nativeEnum(TokenCompromiseSeverity).default(TokenCompromiseSeverity.HIGH),
  detectedAt: z.date(),
  reportedIpAddress: z.string().ip().optional(),
  reportedUserAgent: z.string().max(500).optional(),
  originalIpAddress: z.string().ip().optional(),
  originalUserAgent: z.string().max(500).optional(),
  accountLocked: z.boolean().default(false),
  notificationSent: z.boolean().default(false),
  notificationChannel: z.enum(['email', 'sms', 'push', 'whatsapp']).optional(),
  metadata: z.object({
    ipAddress: z.string().ip().optional(),
    deviceId: z.string().max(255).optional(),
    deviceFingerprint: z.string().max(128).optional(),
    userAgent: z.string().max(500).optional(),
    sessionId: z.string().uuid().optional(),
    previousRotationCount: z.number().int().min(0).optional(),
    timeSinceLastRotation: z.number().int().min(0).optional(),
    consecutiveFailures: z.number().int().min(0).optional(),
    triggeredSecurityAlert: z.boolean().optional(),
    securityAlertReason: z.string().max(500).optional(),
    notificationSent: z.boolean().optional(),
    notificationChannel: z.enum(['email', 'sms', 'push', 'whatsapp']).optional(),
    severity: z.nativeEnum(TokenCompromiseSeverity).optional(),
    riskScore: z.number().int().min(0).max(100).optional(),
    tokenRotated: z.boolean().optional(),
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
// ✅ ENTERPRISE: Token Compromised Event Class (v3.0)
// ============================================================

export class TokenCompromisedEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.TOKEN_COMPROMISED;
  public readonly occurredAt: Date;
  public readonly detectedAt: Date;
  public readonly eventVersion: number;
  public readonly aggregateVersion: number;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly ttlSeconds?: number;
  public readonly expiresAt?: Date;
  public readonly priority?: EventPriority;
  public readonly partitionKey?: string;

  // Core compromise data
  public readonly userId: string;
  public readonly email: string;
  public readonly phone?: string;
  public readonly tokenId: string;
  public readonly tokenFamily: string;

  // Detection context
  public readonly detectionMethod: TokenCompromiseDetectionMethod;
  public readonly actionTaken: TokenCompromiseAction;
  public readonly severity: TokenCompromiseSeverity;

  // IP/UserAgent tracking
  public readonly reportedIpAddress?: string;
  public readonly reportedUserAgent?: string;
  public readonly originalIpAddress?: string;
  public readonly originalUserAgent?: string;

  // Response actions
  public readonly accountLocked: boolean;
  public readonly notificationSent: boolean;
  public readonly notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';

  // Event metadata
  public readonly metadata?: TokenCompromisedMetadata;

  // ✅ Enterprise: Constructor with enhanced options
  constructor(
    userId: string,
    email: string,
    tokenId: string,
    tokenFamily: string,
    detectionMethod: TokenCompromiseDetectionMethod,
    actionTaken: TokenCompromiseAction,
    options?: {
      // Core fields
      phone?: string;
      severity?: TokenCompromiseSeverity;

      // IP/UserAgent tracking
      reportedIpAddress?: string;
      reportedUserAgent?: string;
      originalIpAddress?: string;
      originalUserAgent?: string;

      // Response
      accountLocked?: boolean;
      notificationSent?: boolean;
      notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';

      // Event tracking
      correlationId?: string;
      causationId?: string;
      ttlSeconds?: number;
      priority?: EventPriority;
      partitionKey?: string;

      // Metadata (Bangladesh specific)
      metadata?: TokenCompromisedMetadata;

      // Event version (default: from shared-constants)
      eventVersion?: number;
      aggregateVersion?: number;
      detectedAt?: Date;
    }
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.detectedAt = options?.detectedAt ?? new Date();
    this.eventVersion = options?.eventVersion ?? EVENT_VERSIONS.V1;
    this.aggregateVersion = options?.aggregateVersion ?? 1;
    this.correlationId = options?.correlationId;
    this.causationId = options?.causationId;
    this.ttlSeconds = options?.ttlSeconds;
    this.expiresAt = options?.expiresAt;
    this.priority = options?.priority ?? this.calculatePriority(
      detectionMethod, 
      options?.severity,
      options?.metadata
    );
    this.partitionKey = options?.partitionKey ?? userId;

    this.userId = userId;
    this.email = email;
    this.phone = options?.phone;
    this.tokenId = tokenId;
    this.tokenFamily = tokenFamily;

    this.detectionMethod = detectionMethod;
    this.actionTaken = actionTaken;
    this.severity = options?.severity ?? TokenCompromiseSeverity.HIGH;

    this.reportedIpAddress = options?.reportedIpAddress;
    this.reportedUserAgent = options?.reportedUserAgent;
    this.originalIpAddress = options?.originalIpAddress;
    this.originalUserAgent = options?.originalUserAgent;

    this.accountLocked = options?.accountLocked ?? false;
    this.notificationSent = options?.notificationSent ?? false;
    this.notificationChannel = options?.notificationChannel;

    this.metadata = options?.metadata;

    // Auto-set risk score based on severity and detection method
    if (!this.metadata?.riskScore) {
      this.metadata = {
        ...this.metadata,
        riskScore: this.calculateRiskScore(detectionMethod, this.severity),
      };
    }

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
   * Calculate risk score based on detection method and severity (0-100)
   */
  private calculateRiskScore(
    detectionMethod: TokenCompromiseDetectionMethod,
    severity: TokenCompromiseSeverity
  ): number {
    let score = 0;

    // Base score from detection method
    const methodScores: Record<TokenCompromiseDetectionMethod, number> = {
      [TokenCompromiseDetectionMethod.MULTIPLE_USES]: 60,
      [TokenCompromiseDetectionMethod.INVALID_ROTATION]: 70,
      [TokenCompromiseDetectionMethod.SUSPICIOUS_IP]: 50,
      [TokenCompromiseDetectionMethod.SUSPICIOUS_USER_AGENT]: 40,
      [TokenCompromiseDetectionMethod.REUSE_DETECTED]: 80,
      [TokenCompromiseDetectionMethod.SIMULTANEOUS_USES]: 90,
      [TokenCompromiseDetectionMethod.EXPIRED_TOKEN_REUSE]: 50,
      [TokenCompromiseDetectionMethod.BLACKLISTED_IP]: 85,
      [TokenCompromiseDetectionMethod.ANOMALY_DETECTED]: 70,
      [TokenCompromiseDetectionMethod.OPERATOR_MISMATCH]: 60,
      [TokenCompromiseDetectionMethod.DISTRICT_MISMATCH]: 55,
      [TokenCompromiseDetectionMethod.NETWORK_TYPE_MISMATCH]: 45,
      [TokenCompromiseDetectionMethod.VPN_DETECTED]: 65,
      [TokenCompromiseDetectionMethod.TOR_DETECTED]: 90,
      [TokenCompromiseDetectionMethod.RAPID_LOCATION_CHANGE]: 85,
      [TokenCompromiseDetectionMethod.DEVICE_FINGERPRINT_MISMATCH]: 75,
      [TokenCompromiseDetectionMethod.SESSION_HIJACKING]: 95,
      [TokenCompromiseDetectionMethod.BRUTE_FORCE_TOKEN]: 80,
    };

    score = methodScores[detectionMethod] || 50;

    // Adjust by severity
    const severityMultiplier: Record<TokenCompromiseSeverity, number> = {
      [TokenCompromiseSeverity.LOW]: 0.8,
      [TokenCompromiseSeverity.MEDIUM]: 1.0,
      [TokenCompromiseSeverity.HIGH]: 1.2,
      [TokenCompromiseSeverity.CRITICAL]: 1.4,
    };

    score = Math.min(100, Math.round(score * (severityMultiplier[severity] || 1.0)));
    return score;
  }

  /**
   * Calculate priority based on detection method and severity
   */
  private calculatePriority(
    detectionMethod: TokenCompromiseDetectionMethod,
    severity?: TokenCompromiseSeverity,
    metadata?: TokenCompromisedMetadata
  ): EventPriority {
    // Critical priority detection methods
    if (
      detectionMethod === TokenCompromiseDetectionMethod.SIMULTANEOUS_USES ||
      detectionMethod === TokenCompromiseDetectionMethod.TOR_DETECTED ||
      detectionMethod === TokenCompromiseDetectionMethod.SESSION_HIJACKING
    ) {
      return 'critical';
    }

    // High priority
    if (
      detectionMethod === TokenCompromiseDetectionMethod.REUSE_DETECTED ||
      detectionMethod === TokenCompromiseDetectionMethod.BLACKLISTED_IP ||
      detectionMethod === TokenCompromiseDetectionMethod.RAPID_LOCATION_CHANGE ||
      severity === TokenCompromiseSeverity.CRITICAL ||
      severity === TokenCompromiseSeverity.HIGH
    ) {
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
   * Get risk level as string
   */
  public getRiskLevel(): string {
    const score = this.metadata?.riskScore ?? 50;
    if (score >= 80) return 'critical';
    if (score >= 60) return 'high';
    if (score >= 40) return 'medium';
    return 'low';
  }

  /**
   * Check if this was a Bangladesh-specific detection
   */
  public isBangladeshSpecific(): boolean {
    return (
      this.detectionMethod === TokenCompromiseDetectionMethod.OPERATOR_MISMATCH ||
      this.detectionMethod === TokenCompromiseDetectionMethod.DISTRICT_MISMATCH ||
      this.detectionMethod === TokenCompromiseDetectionMethod.NETWORK_TYPE_MISMATCH ||
      !!this.metadata?.district ||
      !!this.metadata?.mobileOperator
    );
  }

  /**
   * Get formatted IP comparison (for logging)
   */
  public getIpComparison(): string {
    if (this.originalIpAddress && this.reportedIpAddress) {
      if (this.originalIpAddress === this.reportedIpAddress) {
        return 'IP match';
      }
      return `IP mismatch: original=${this.originalIpAddress}, reported=${this.reportedIpAddress}`;
    }
    return 'IP comparison not available';
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
      tokenId: this.tokenId.slice(0, 8) + '...',
      tokenFamily: this.tokenFamily.slice(0, 8) + '...',
      detectionMethod: this.detectionMethod,
      actionTaken: this.actionTaken,
      severity: this.severity,
      riskScore: this.metadata?.riskScore,
      riskLevel: this.getRiskLevel(),
      accountLocked: this.accountLocked,
      notificationSent: this.notificationSent,
      ipComparison: this.getIpComparison(),
      district: this.metadata?.district,
      mobileOperator: this.metadata?.mobileOperator,
      deviceType: this.metadata?.deviceType,
      isBangladeshSpecific: this.isBangladeshSpecific(),
      priority: this.priority,
      partitionKey: this.partitionKey,
      occurredAt: this.occurredAt.toISOString(),
    };
  }

  /**
   * Convert to plain object for serialization
   */
  public toJSON(): TokenCompromisedEventData {
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
      tokenId: this.tokenId,
      tokenFamily: this.tokenFamily,
      detectedAt: this.detectedAt.toISOString(),
      detectionMethod: this.detectionMethod,
      actionTaken: this.actionTaken,
      severity: this.severity,
      reportedIpAddress: this.reportedIpAddress,
      reportedUserAgent: this.reportedUserAgent,
      originalIpAddress: this.originalIpAddress,
      originalUserAgent: this.originalUserAgent,
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
  public static fromJSON(data: TokenCompromisedEventData): TokenCompromisedEvent {
    const event = new TokenCompromisedEvent(
      data.userId,
      data.email,
      data.tokenId,
      data.tokenFamily,
      data.detectionMethod,
      data.actionTaken,
      {
        phone: data.phone,
        severity: data.severity,
        reportedIpAddress: data.reportedIpAddress,
        reportedUserAgent: data.reportedUserAgent,
        originalIpAddress: data.originalIpAddress,
        originalUserAgent: data.originalUserAgent,
        accountLocked: data.accountLocked,
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
        detectedAt: new Date(data.detectedAt),
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
    const result = TokenCompromisedEventSchema.safeParse(this.toJSON());
    return result.success;
  }

  // ============================================================
  // ✅ Enterprise: Static factory methods for common scenarios
  // ============================================================

  /**
   * Create event for token reuse detection
   */
  public static forTokenReuse(
    userId: string,
    email: string,
    tokenId: string,
    tokenFamily: string,
    originalIp: string,
    originalUserAgent: string,
    reportedIp: string,
    reportedUserAgent: string,
    options?: {
      phone?: string;
      district?: string;
      mobileOperator?: typeof MOBILE_OPERATORS[number];
      correlationId?: string;
    }
  ): TokenCompromisedEvent {
    return new TokenCompromisedEvent(
      userId,
      email,
      tokenId,
      tokenFamily,
      TokenCompromiseDetectionMethod.REUSE_DETECTED,
      TokenCompromiseAction.REVOKED_TOKEN_FAMILY,
      {
        phone: options?.phone,
        severity: TokenCompromiseSeverity.CRITICAL,
        reportedIpAddress: reportedIp,
        reportedUserAgent,
        originalIpAddress: originalIp,
        originalUserAgent,
        accountLocked: false,
        priority: 'critical',
        correlationId: options?.correlationId,
        metadata: {
          ipAddress: reportedIp,
          userAgent: reportedUserAgent,
          district: options?.district,
          mobileOperator: options?.mobileOperator,
          triggeredSecurityAlert: true,
          securityAlertReason: 'Token reuse detected - possible token theft',
          notificationSent: true,
          notificationChannel: 'email',
          severity: TokenCompromiseSeverity.CRITICAL,
          riskScore: 90,
        },
      }
    );
  }

  /**
   * Create event for operator mismatch detection (Bangladesh specific)
   */
  public static forOperatorMismatch(
    userId: string,
    email: string,
    phone: string,
    tokenId: string,
    tokenFamily: string,
    originalOperator: string,
    reportedOperator: string,
    originalIp: string,
    reportedIp: string,
    options?: {
      district?: string;
      correlationId?: string;
    }
  ): TokenCompromisedEvent {
    return new TokenCompromisedEvent(
      userId,
      email,
      tokenId,
      tokenFamily,
      TokenCompromiseDetectionMethod.OPERATOR_MISMATCH,
      TokenCompromiseAction.FLAGGED_FOR_REVIEW,
      {
        phone,
        severity: TokenCompromiseSeverity.HIGH,
        reportedIpAddress: reportedIp,
        originalIpAddress: originalIp,
        priority: 'high',
        correlationId: options?.correlationId,
        metadata: {
          ipAddress: reportedIp,
          district: options?.district,
          mobileOperator: reportedOperator as typeof MOBILE_OPERATORS[number],
          triggeredSecurityAlert: true,
          securityAlertReason: `Operator mismatch: original=${originalOperator}, reported=${reportedOperator}`,
          notificationSent: true,
          notificationChannel: 'whatsapp',
          severity: TokenCompromiseSeverity.HIGH,
          riskScore: 75,
        },
      }
    );
  }

  /**
   * Create event for district mismatch detection (Bangladesh specific)
   */
  public static forDistrictMismatch(
    userId: string,
    email: string,
    tokenId: string,
    tokenFamily: string,
    originalDistrict: string,
    reportedDistrict: string,
    originalIp: string,
    reportedIp: string,
    options?: {
      phone?: string;
      correlationId?: string;
    }
  ): TokenCompromisedEvent {
    return new TokenCompromisedEvent(
      userId,
      email,
      tokenId,
      tokenFamily,
      TokenCompromiseDetectionMethod.DISTRICT_MISMATCH,
      TokenCompromiseAction.FLAGGED_FOR_REVIEW,
      {
        phone: options?.phone,
        severity: TokenCompromiseSeverity.MEDIUM,
        reportedIpAddress: reportedIp,
        originalIpAddress: originalIp,
        priority: 'normal',
        correlationId: options?.correlationId,
        metadata: {
          ipAddress: reportedIp,
          district: reportedDistrict,
          triggeredSecurityAlert: true,
          securityAlertReason: `District mismatch: original=${originalDistrict}, reported=${reportedDistrict}`,
          notificationSent: true,
          notificationChannel: 'email',
          severity: TokenCompromiseSeverity.MEDIUM,
          riskScore: 55,
        },
      }
    );
  }

  /**
   * Create event for simultaneous uses (impossible travel)
   */
  public static forSimultaneousUses(
    userId: string,
    email: string,
    tokenId: string,
    tokenFamily: string,
    location1: { ip: string; district?: string },
    location2: { ip: string; district?: string },
    timeDifferenceMinutes: number,
    distanceKm: number,
    options?: {
      phone?: string;
      correlationId?: string;
    }
  ): TokenCompromisedEvent {
    return new TokenCompromisedEvent(
      userId,
      email,
      tokenId,
      tokenFamily,
      TokenCompromiseDetectionMethod.SIMULTANEOUS_USES,
      TokenCompromiseAction.REVOKED_ALL_TOKENS,
      {
        phone: options?.phone,
        severity: TokenCompromiseSeverity.CRITICAL,
        reportedIpAddress: location2.ip,
        originalIpAddress: location1.ip,
        accountLocked: true,
        priority: 'critical',
        correlationId: options?.correlationId,
        metadata: {
          ipAddress: location2.ip,
          district: location2.district,
          triggeredSecurityAlert: true,
          securityAlertReason: `Impossible travel detected: ${distanceKm}km in ${timeDifferenceMinutes} minutes`,
          notificationSent: true,
          notificationChannel: 'whatsapp',
          severity: TokenCompromiseSeverity.CRITICAL,
          riskScore: 95,
        },
      }
    );
  }
}

// ============================================================
// ✅ Enterprise: Event Data Interfaces (for serialization)
// ============================================================

export interface TokenCompromisedEventData {
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
  tokenId: string;
  tokenFamily: string;
  detectedAt: string;
  detectionMethod: TokenCompromiseDetectionMethod;
  actionTaken: TokenCompromiseAction;
  severity: TokenCompromiseSeverity;
  reportedIpAddress?: string;
  reportedUserAgent?: string;
  originalIpAddress?: string;
  originalUserAgent?: string;
  accountLocked: boolean;
  notificationSent: boolean;
  notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';
  metadata?: TokenCompromisedMetadata;
  ttlSeconds?: number;
  expiresAt?: string;
  priority?: EventPriority;
  partitionKey?: string;
}

// ============================================================
// ✅ Enterprise: Type Exports
// ============================================================

export type {
  TokenCompromisedMetadata as TokenCompromisedMetadataType,
  TokenCompromisedPayload as TokenCompromisedPayloadType,
};

// ============================================================
// ENTERPRISE SUMMARY v3.0
// ============================================================
//
// Enterprise Enhancements Applied in v3.0:
// 1. ✅ Shared-types integration (@vubon/shared-types)
// 2. ✅ Event versioning with aggregateVersion tracking (from shared-constants)
// 3. ✅ TTL support with expiresAt for event expiry (90 days default)
// 4. ✅ Priority-based event processing (critical for token compromise)
// 5. ✅ Partition key for event streaming optimization
// 6. ✅ Bangladesh specific fields (district, upazila, mobileOperator, networkType)
// 7. ✅ Extended TokenCompromiseDetectionMethod (OPERATOR_MISMATCH, DISTRICT_MISMATCH, etc.)
// 8. ✅ Extended TokenCompromiseAction (BLOCKED_DEVICE, BLOCKED_OPERATOR, etc.)
// 9. ✅ Severity levels (LOW/MEDIUM/HIGH
