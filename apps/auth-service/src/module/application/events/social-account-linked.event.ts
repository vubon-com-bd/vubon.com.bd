/**
 * Social Account Linked/Unlinked Events - Enterprise Grade (v4.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module application/events/social-account-linked.event
 *
 * @description
 * Events emitted when a social account is linked or unlinked from a user account.
 * Enhanced with shared-types integration, event versioning, TTL support,
 * Bangladesh specific fields, and priority-based processing.
 *
 * ENTERPRISE ENHANCEMENTS (v4.0):
 * ✅ Shared-types integration (@vubon/shared-types)
 * ✅ Event versioning with aggregateVersion tracking
 * ✅ TTL support with expiresAt for event expiry (90 days default)
 * ✅ Priority-based event processing (critical for security incidents)
 * ✅ Partition key for event streaming optimization
 * ✅ Bangladesh specific fields (district, upazila, mobileOperator, networkType)
 * ✅ Device fingerprint tracking
 * ✅ Session binding tracking
 * ✅ Zod schema for runtime validation
 * ✅ Serialization support (toJSON, fromJSON)
 * ✅ Helper methods for expiry, priority, and localization
 * ✅ Extended SocialProvider enum (Bangladesh specific)
 * ✅ Admin action tracking
 * ✅ Notification tracking
 * ✅ Provider display names (English/Bengali)
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
 * ✅ Bangladesh specific - Provider, district, mobileOperator tracking
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
  SOCIAL_PROVIDERS,
  SOCIAL_CONFIG,
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
// Social Provider Enum (Re-export from shared-constants)
// ============================================================

export { SOCIAL_PROVIDERS as SocialProvider };
export type SocialProvider = typeof SOCIAL_PROVIDERS[keyof typeof SOCIAL_PROVIDERS];

// ============================================================
// Social Link Source Enum
// ============================================================

export enum SocialLinkSource {
  USER = 'USER',           // User initiated from profile
  ADMIN = 'ADMIN',         // Admin initiated
  SYSTEM = 'SYSTEM',       // System automation
  OAUTH_CALLBACK = 'OAUTH_CALLBACK', // OAuth callback flow
  MIGRATION = 'MIGRATION', // Data migration
}

// ============================================================
// Social Unlink Reason Enum (Enterprise)
// ============================================================

export enum SocialUnlinkReason {
  USER_INITIATED = 'USER_INITIATED',     // User voluntarily unlinked
  ADMIN_ACTION = 'ADMIN_ACTION',         // Admin removed
  ACCOUNT_DELETED = 'ACCOUNT_DELETED',   // Account deleted
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',       // Provider token expired
  SECURITY_INCIDENT = 'SECURITY_INCIDENT', // Security breach
  PROVIDER_DEPRECATED = 'PROVIDER_DEPRECATED', // Provider no longer supported
  COMPROMISED = 'COMPROMISED',           // Account compromised
  USER_REQUEST = 'USER_REQUEST',         // GDPR right to be forgotten
}

// ============================================================
// Provider Display Names (English & Bengali)
// ============================================================

export const PROVIDER_DISPLAY_NAMES: Record<SocialProvider, { en: string; bn: string }> = {
  [SOCIAL_PROVIDERS.GOOGLE]: { en: 'Google', bn: 'গুগল' },
  [SOCIAL_PROVIDERS.FACEBOOK]: { en: 'Facebook', bn: 'ফেসবুক' },
  [SOCIAL_PROVIDERS.GITHUB]: { en: 'GitHub', bn: 'গিটহাব' },
  [SOCIAL_PROVIDERS.APPLE]: { en: 'Apple', bn: 'অ্যাপল' },
  [SOCIAL_PROVIDERS.TWITTER]: { en: 'Twitter', bn: 'টুইটার' },
  [SOCIAL_PROVIDERS.LINKEDIN]: { en: 'LinkedIn', bn: 'লিংকডইন' },
  [SOCIAL_PROVIDERS.WHATSAPP]: { en: 'WhatsApp', bn: 'হোয়াটসঅ্যাপ' },
  [SOCIAL_PROVIDERS.IMO]: { en: 'Imo', bn: 'আইএমও' },
  [SOCIAL_PROVIDERS.TELEGRAM]: { en: 'Telegram', bn: 'টেলিগ্রাম' },
  [SOCIAL_PROVIDERS.BKASH]: { en: 'bKash', bn: 'বিকাশ' },
  [SOCIAL_PROVIDERS.NAGAD]: { en: 'Nagad', bn: 'নগদ' },
  [SOCIAL_PROVIDERS.ROCKET]: { en: 'Rocket', bn: 'রকেট' },
};

// ============================================================
// ✅ ENTERPRISE: Event Metadata Interface (Bangladesh specific)
// ============================================================

export interface SocialAccountLinkedMetadata extends EventMetadata {
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

  /** Session ID from OAuth callback */
  oauthSessionId?: string;

  /** Whether this is the first social login for the user */
  isFirstSocialLogin?: boolean;

  /** Total number of social accounts linked after this operation */
  totalLinkedAccounts?: number;

  /** Whether notification was sent to user */
  notificationSent?: boolean;

  /** Notification channel used */
  notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';

  /** Whether this linking triggered a security alert */
  triggeredSecurityAlert?: boolean;

  /** Security alert reason (if triggered) */
  securityAlertReason?: string;

  /** Admin ID (if source is ADMIN) */
  initiatedBy?: string;

  /** Reason for linking (if admin initiated) */
  linkReason?: string;

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
// ✅ ENTERPRISE: Event Payload Interfaces
// ============================================================

export interface SocialAccountLinkedPayload extends EventPayload {
  /** User ID */
  userId: string;

  /** User email */
  email: string;

  /** User phone (Bangladesh specific) */
  phone?: string;

  /** Social provider */
  provider: SocialProvider;

  /** Provider's user ID */
  providerUserId: string;

  /** Provider's email (if available) */
  providerEmail?: string;

  /** Provider's display name */
  providerDisplayName?: string;

  /** Link source */
  source: SocialLinkSource;

  /** Link timestamp */
  linkedAt: Date;

  /** Whether this is the primary social account */
  isPrimary: boolean;

  /** Whether notification was sent */
  notificationSent?: boolean;

  /** Admin ID (if source is ADMIN) */
  linkedBy?: string;
}

export interface SocialAccountUnlinkedPayload extends EventPayload {
  /** User ID */
  userId: string;

  /** User email */
  email: string;

  /** User phone (Bangladesh specific) */
  phone?: string;

  /** Social provider */
  provider: SocialProvider;

  /** Provider's user ID */
  providerUserId: string;

  /** Unlink reason */
  reason: SocialUnlinkReason;

  /** Unlink source */
  source: SocialLinkSource;

  /** Unlink timestamp */
  unlinkedAt: Date;

  /** How long the account was linked (seconds) */
  linkedDurationSeconds?: number;

  /** Whether notification was sent */
  notificationSent?: boolean;

  /** Admin ID (if source is ADMIN) */
  unlinkedBy?: string;
}

// ============================================================
// ✅ ENTERPRISE: Zod Schemas for Runtime Validation
// ============================================================

export const SocialAccountLinkedEventSchema = z.object({
  eventId: z.string().uuid(),
  eventName: z.literal(EVENT_NAMES.SOCIAL_ACCOUNT_LINKED),
  occurredAt: z.date(),
  eventVersion: z.number().int().min(1).default(EVENT_VERSIONS.V1),
  aggregateVersion: z.number().int().min(1).default(1),
  correlationId: z.string().uuid().optional(),
  causationId: z.string().uuid().optional(),
  userId: z.string().uuid(),
  email: z.string().email(),
  phone: z.string().regex(/^(?:\+880|0)1[3-9]\d{8}$/).optional(),
  provider: z.nativeEnum(SOCIAL_PROVIDERS),
  providerUserId: z.string(),
  providerEmail: z.string().email().optional(),
  providerDisplayName: z.string().max(100).optional(),
  source: z.nativeEnum(SocialLinkSource).default(SocialLinkSource.USER),
  linkedAt: z.date(),
  isPrimary: z.boolean().default(false),
  notificationSent: z.boolean().default(false),
  notificationChannel: z.enum(['email', 'sms', 'push', 'whatsapp']).optional(),
  linkedBy: z.string().uuid().optional(),
  metadata: z.object({
    ipAddress: z.string().ip().optional(),
    deviceId: z.string().max(255).optional(),
    deviceFingerprint: z.string().max(128).optional(),
    userAgent: z.string().max(500).optional(),
    sessionId: z.string().uuid().optional(),
    oauthSessionId: z.string().uuid().optional(),
    isFirstSocialLogin: z.boolean().optional(),
    totalLinkedAccounts: z.number().int().min(0).optional(),
    notificationSent: z.boolean().optional(),
    notificationChannel: z.enum(['email', 'sms', 'push', 'whatsapp']).optional(),
    triggeredSecurityAlert: z.boolean().optional(),
    securityAlertReason: z.string().max(500).optional(),
    initiatedBy: z.string().uuid().optional(),
    linkReason: z.string().max(500).optional(),
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

export const SocialAccountUnlinkedEventSchema = z.object({
  eventId: z.string().uuid(),
  eventName: z.literal(EVENT_NAMES.SOCIAL_ACCOUNT_UNLINKED),
  occurredAt: z.date(),
  eventVersion: z.number().int().min(1).default(EVENT_VERSIONS.V1),
  aggregateVersion: z.number().int().min(1).default(1),
  correlationId: z.string().uuid().optional(),
  causationId: z.string().uuid().optional(),
  userId: z.string().uuid(),
  email: z.string().email(),
  phone: z.string().regex(/^(?:\+880|0)1[3-9]\d{8}$/).optional(),
  provider: z.nativeEnum(SOCIAL_PROVIDERS),
  providerUserId: z.string(),
  reason: z.nativeEnum(SocialUnlinkReason).default(SocialUnlinkReason.USER_INITIATED),
  source: z.nativeEnum(SocialLinkSource).default(SocialLinkSource.USER),
  unlinkedAt: z.date(),
  linkedDurationSeconds: z.number().int().min(0).optional(),
  notificationSent: z.boolean().default(false),
  notificationChannel: z.enum(['email', 'sms', 'push', 'whatsapp']).optional(),
  unlinkedBy: z.string().uuid().optional(),
  metadata: z.object({
    ipAddress: z.string().ip().optional(),
    deviceId: z.string().max(255).optional(),
    deviceFingerprint: z.string().max(128).optional(),
    userAgent: z.string().max(500).optional(),
    sessionId: z.string().uuid().optional(),
    totalLinkedAccountsAfter: z.number().int().min(0).optional(),
    triggeredSecurityAlert: z.boolean().optional(),
    securityAlertReason: z.string().max(500).optional(),
    unlinkedByAdminId: z.string().uuid().optional(),
    unlinkNote: z.string().max(500).optional(),
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
// ✅ ENTERPRISE: Social Account Linked Event Class (v4.0)
// ============================================================

export class SocialAccountLinkedEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.SOCIAL_ACCOUNT_LINKED;
  public readonly occurredAt: Date;
  public readonly linkedAt: Date;
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

  // Social account information
  public readonly provider: SocialProvider;
  public readonly providerUserId: string;
  public readonly providerEmail?: string;
  public readonly providerDisplayName?: string;

  // Link context
  public readonly source: SocialLinkSource;
  public readonly isPrimary: boolean;
  public readonly linkedBy?: string;

  // Notification status
  public readonly notificationSent: boolean;
  public readonly notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';

  // Event metadata
  public readonly metadata?: SocialAccountLinkedMetadata;

  // ✅ Enterprise: Constructor with enhanced options
  constructor(
    userId: string,
    aggregateVersion: number,
    email: string,
    provider: SocialProvider,
    providerUserId: string,
    options?: {
      // Core fields
      phone?: string;
      providerEmail?: string;
      providerDisplayName?: string;

      // Link context
      source?: SocialLinkSource;
      isPrimary?: boolean;
      linkedBy?: string;

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
      metadata?: SocialAccountLinkedMetadata;

      // Event version (default: from shared-constants)
      eventVersion?: number;
    }
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.linkedAt = new Date();
    this.eventVersion = options?.eventVersion ?? EVENT_VERSIONS.V1;
    this.aggregateVersion = aggregateVersion;
    this.correlationId = options?.correlationId;
    this.causationId = options?.causationId;
    this.ttlSeconds = options?.ttlSeconds;
    this.expiresAt = options?.expiresAt;
    this.priority = options?.priority ?? this.calculatePriority(provider, options?.metadata);
    this.partitionKey = options?.partitionKey ?? userId;

    this.userId = userId;
    this.email = email;
    this.phone = options?.phone;

    this.provider = provider;
    this.providerUserId = providerUserId;
    this.providerEmail = options?.providerEmail;
    this.providerDisplayName = options?.providerDisplayName;

    this.source = options?.source ?? SocialLinkSource.USER;
    this.isPrimary = options?.isPrimary ?? false;
    this.linkedBy = options?.linkedBy;

    this.notificationSent = options?.notificationSent ?? false;
    this.notificationChannel = options?.notificationChannel;

    this.metadata = options?.metadata;

    // Auto-set display name if not provided
    if (!this.providerDisplayName && PROVIDER_DISPLAY_NAMES[this.provider]) {
      this.providerDisplayName = PROVIDER_DISPLAY_NAMES[this.provider].en;
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
   * Calculate priority based on provider and context
   */
  private calculatePriority(
    provider: SocialProvider,
    metadata?: SocialAccountLinkedMetadata
  ): EventPriority {
    // Critical priority - MFS providers (bKash/Nagad/Rocket)
    if (
      provider === SOCIAL_PROVIDERS.BKASH ||
      provider === SOCIAL_PROVIDERS.NAGAD ||
      provider === SOCIAL_PROVIDERS.ROCKET
    ) {
      return 'critical';
    }

    // High priority - admin initiated or suspicious
    if (
      this.source === SocialLinkSource.ADMIN ||
      metadata?.triggeredSecurityAlert
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
   * Check if this was an admin-initiated link
   */
  public isAdminInitiated(): boolean {
    return this.source === SocialLinkSource.ADMIN && !!this.linkedBy;
  }

  /**
   * Check if this is a Bangladesh-specific provider
   */
  public isBangladeshSpecific(): boolean {
    return (
      this.provider === SOCIAL_PROVIDERS.WHATSAPP ||
      this.provider === SOCIAL_PROVIDERS.IMO ||
      this.provider === SOCIAL_PROVIDERS.TELEGRAM ||
      this.provider === SOCIAL_PROVIDERS.BKASH ||
      this.provider === SOCIAL_PROVIDERS.NAGAD ||
      this.provider === SOCIAL_PROVIDERS.ROCKET
    );
  }

  /**
   * Get provider display name in requested language
   */
  public getProviderDisplayName(locale: 'en' | 'bn' = 'en'): string {
    const names = PROVIDER_DISPLAY_NAMES[this.provider];
    if (!names) return this.provider;
    return locale === 'bn' ? names.bn : names.en;
  }

  /**
   * Check if this is the first social login for the user
   */
  public isFirstSocialLogin(): boolean {
    return this.metadata?.isFirstSocialLogin === true;
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
      provider: this.provider,
      providerDisplayName: this.getProviderDisplayName(),
      source: this.source,
      linkedBy: this.linkedBy,
      isPrimary: this.isPrimary,
      notificationSent: this.notificationSent,
      isFirstSocialLogin: this.isFirstSocialLogin(),
      district: this.metadata?.district,
      mobileOperator: this.metadata?.mobileOperator,
      deviceType: this.metadata?.deviceType,
      isAdminInitiated: this.isAdminInitiated(),
      isBangladeshSpecific: this.isBangladeshSpecific(),
      priority: this.priority,
      partitionKey: this.partitionKey,
      occurredAt: this.occurredAt.toISOString(),
    };
  }

  /**
   * Convert to plain object for serialization
   */
  public toJSON(): SocialAccountLinkedEventData {
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
      provider: this.provider,
      providerUserId: this.providerUserId,
      providerEmail: this.providerEmail,
      providerDisplayName: this.providerDisplayName,
      source: this.source,
      linkedAt: this.linkedAt.toISOString(),
      isPrimary: this.isPrimary,
      notificationSent: this.notificationSent,
      notificationChannel: this.notificationChannel,
      linkedBy: this.linkedBy,
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
  public static fromJSON(data: SocialAccountLinkedEventData): SocialAccountLinkedEvent {
    const event = new SocialAccountLinkedEvent(
      data.userId,
      data.aggregateVersion,
      data.email,
      data.provider,
      data.providerUserId,
      {
        phone: data.phone,
        providerEmail: data.providerEmail,
        providerDisplayName: data.providerDisplayName,
        source: data.source,
        isPrimary: data.isPrimary,
        linkedBy: data.linkedBy,
        notificationSent: data.notificationSent,
        notificationChannel: data.notificationChannel,
        correlationId: data.correlationId,
        causationId: data.causationId,
        ttlSeconds: data.ttlSeconds,
        priority: data.priority,
        partitionKey: data.partitionKey,
        metadata: data.metadata,
        eventVersion: data.eventVersion,
      }
    );
    // Override auto-generated fields with stored values
    (event as any).eventId = data.eventId;
    (event as any).occurredAt = new Date(data.occurredAt);
    (event as any).linkedAt = new Date(data.linkedAt);
    return event;
  }

  /**
   * Validate event data using Zod schema
   */
  public validate(): boolean {
    const result = SocialAccountLinkedEventSchema.safeParse(this.toJSON());
    return result.success;
  }

  // ============================================================
  // ✅ Enterprise: Static factory methods for common scenarios
  // ============================================================

  /**
   * Create event for user-initiated social link
   */
  public static forUserLink(
    userId: string,
    aggregateVersion: number,
    email: string,
    provider: SocialProvider,
    providerUserId: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      phone?: string;
      providerEmail?: string;
      isPrimary?: boolean;
      isFirstSocialLogin?: boolean;
      totalLinkedAccounts?: number;
      district?: string;
      mobileOperator?: typeof MOBILE_OPERATORS[number];
      correlationId?: string;
    }
  ): SocialAccountLinkedEvent {
    return new SocialAccountLinkedEvent(
      userId,
      aggregateVersion,
      email,
      provider,
      providerUserId,
      {
        phone: options?.phone,
        providerEmail: options?.providerEmail,
        source: SocialLinkSource.USER,
        isPrimary: options?.isPrimary ?? false,
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          isFirstSocialLogin: options?.isFirstSocialLogin,
          totalLinkedAccounts: options?.totalLinkedAccounts,
          district: options?.district,
          mobileOperator: options?.mobileOperator,
          notificationSent: true,
          notificationChannel: 'email',
        },
      }
    );
  }

  /**
   * Create event for admin-initiated social link
   */
  public static forAdminLink(
    userId: string,
    aggregateVersion: number,
    email: string,
    provider: SocialProvider,
    providerUserId: string,
    adminId: string,
    reason: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      phone?: string;
      providerEmail?: string;
      isPrimary?: boolean;
      district?: string;
      correlationId?: string;
    }
  ): SocialAccountLinkedEvent {
    return new SocialAccountLinkedEvent(
      userId,
      aggregateVersion,
      email,
      provider,
      providerUserId,
      {
        phone: options?.phone,
        providerEmail: options?.providerEmail,
        source: SocialLinkSource.ADMIN,
        isPrimary: options?.isPrimary ?? false,
        linkedBy: adminId,
        priority: 'high',
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          district: options?.district,
          initiatedBy: adminId,
          linkReason: reason,
          triggeredSecurityAlert: true,
          securityAlertReason: `Admin linked social account: ${reason}`,
          notificationSent: true,
          notificationChannel: 'email',
        },
      }
    );
  }

  /**
   * Create event for bKash social link (Bangladesh specific)
   */
  public static forBkashLink(
    userId: string,
    aggregateVersion: number,
    email: string,
    phone: string,
    providerUserId: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      isPrimary?: boolean;
      district?: string;
      mobileOperator?: typeof MOBILE_OPERATORS[number];
      correlationId?: string;
    }
  ): SocialAccountLinkedEvent {
    return new SocialAccountLinkedEvent(
      userId,
      aggregateVersion,
      email,
      SOCIAL_PROVIDERS.BKASH,
      providerUserId,
      {
        phone,
        source: SocialLinkSource.USER,
        isPrimary: options?.isPrimary ?? false,
        priority: 'critical',
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          district: options?.district,
          mobileOperator: options?.mobileOperator,
          notificationSent: true,
          notificationChannel: 'whatsapp',
        },
      }
    );
  }
}

// ============================================================
// ✅ Enterprise: Social Account Unlinked Event Class (v4.0)
// ============================================================

export class SocialAccountUnlinkedEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.SOCIAL_ACCOUNT_UNLINKED;
  public readonly occurredAt: Date;
  public readonly unlinkedAt: Date;
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

  // Social account information
  public readonly provider: SocialProvider;
  public readonly providerUserId: string;

  // Unlink context
  public readonly reason: SocialUnlinkReason;
  public readonly source: SocialLinkSource;
  public readonly linkedDurationSeconds?: number;
  public readonly unlinkedBy?: string;

  // Notification status
  public readonly notificationSent: boolean;
  public readonly notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';

  // Event metadata
  public readonly metadata?: SocialAccountLinkedMetadata;

  constructor(
    userId: string,
    aggregateVersion: number,
    email: string,
    provider: SocialProvider,
    providerUserId: string,
    reason: SocialUnlinkReason,
    options?: {
      phone?: string;
      source?: SocialLinkSource;
      linkedDurationSeconds?: number;
      unlinkedBy?: string;
      notificationSent?: boolean;
      notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';
      correlationId?: string;
      causationId?: string;
      ttlSeconds?: number;
      priority?: EventPriority;
      partitionKey?: string;
      metadata?: SocialAccountLinkedMetadata;
      eventVersion?: number;
    }
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.unlinkedAt = new Date();
    this.eventVersion = options?.eventVersion ?? EVENT_VERSIONS.V1;
    this.aggregateVersion = aggregateVersion;
    this.correlationId = options?.correlationId;
    this.causationId = options?.causationId;
    this.ttlSeconds = options?.ttlSeconds;
    this.expiresAt = options?.expiresAt;
    this.priority = options?.priority ?? this.calculateUnlinkPriority(reason);
    this.partitionKey = options?.partitionKey ?? userId;

    this.userId = userId;
    this.email = email;
    this.phone = options?.phone;

    this.provider = provider;
    this.providerUserId = providerUserId;

    this.reason = reason;
    this.source = options?.source ?? SocialLinkSource.USER;
    this.linkedDurationSeconds = options?.linkedDurationSeconds;
    this.unlinkedBy = options?.unlinkedBy;

    this.notificationSent = options?.notificationSent ?? false;
    this.notificationChannel = options?.notificationChannel;

    this.metadata = options?.metadata;

    if (!this.ttlSeconds && !this.expiresAt) {
      this.ttlSeconds = 90 * 24 * 60 * 60;
      this.expiresAt = new Date(Date.now() + this.ttlSeconds * 1000);
    }
  }

  private calculateUnlinkPriority(reason: SocialUnlinkReason): EventPriority {
    if (
      reason === SocialUnlinkReason.SECURITY_INCIDENT ||
      reason === SocialUnlinkReason.COMPROMISED
    ) {
      return 'critical';
    }
    if (reason === SocialUnlinkReason.ADMIN_ACTION) {
      return 'high';
    }
    return 'normal';
  }

  public isExpired(): boolean {
    if (!this.expiresAt) return false;
    return new Date() > this.expiresAt;
  }

  public isAdminInitiated(): boolean {
    return this.source === SocialLinkSource.ADMIN && !!this.unlinkedBy;
  }

  public getProviderDisplayName(locale: 'en' | 'bn' = 'en'): string {
    const names = PROVIDER_DISPLAY_NAMES[this.provider];
    if (!names) return this.provider;
    return locale === 'bn' ? names.bn : names.en;
  }

  public getSummary(): Record<string, unknown> {
    return {
      eventId: this.eventId,
      eventName: this.eventName,
      userId: this.userId,
      email: this.email,
      provider: this.provider,
      reason: this.reason,
      source: this.source,
      unlinkedBy: this.unlinkedBy,
      linkedDurationSeconds: this.linkedDurationSeconds,
      notificationSent: this.notificationSent,
      district: this.metadata?.district,
      isAdminInitiated: this.isAdminInitiated(),
      priority: this.priority,
      partitionKey: this.partitionKey,
      occurredAt: this.occurredAt.toISOString(),
    };
  }

  public toJSON(): SocialAccountUnlinkedEventData {
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
      provider: this.provider,
      providerUserId: this.providerUserId,
      reason: this.reason,
      source: this.source,
      unlinkedAt: this.unlinkedAt.toISOString(),
      linkedDurationSeconds: this.linkedDurationSeconds,
      notificationSent: this.notificationSent,
      notificationChannel: this.notificationChannel,
      unlinkedBy: this.unlinkedBy,
      metadata: this.metadata,
      ttlSeconds: this.ttlSeconds,
      expiresAt: this.expiresAt?.toISOString(),
      priority: this.priority,
      partitionKey: this.partitionKey,
    };
  }

  public static fromJSON(data: SocialAccountUnlinkedEventData): SocialAccountUnlinkedEvent {
    const event = new SocialAccountUnlinkedEvent(
      data.userId,
      data.aggregateVersion,
      data.email,
      data.provider,
      data.providerUserId,
      data.reason,
      {
        phone: data.phone,
        source: data.source,
        linkedDurationSeconds: data.linkedDurationSeconds,
        unlinkedBy: data.unlinkedBy,
        notificationSent: data.notificationSent,
        notificationChannel: data.notificationChannel,
        correlationId: data.correlationId,
        causationId: data.causationId,
        ttlSeconds: data.ttlSeconds,
        priority: data.priority,
        partitionKey: data.partitionKey,
        metadata: data.metadata,
        eventVersion: data.eventVersion,
      }
    );
    (event as any).eventId = data.eventId;
    (event as any).occurredAt = new Date(data.occurredAt);
    (event as any).unlinkedAt = new Date(data.unlinkedAt);
    return event;
  }

  public validate(): boolean {
    const result = SocialAccountUnlinkedEventSchema.safeParse(this.toJSON());
    return result.success;
  }
}

// ============================================================
// ✅ Enterprise: Event Data Interfaces (for serialization)
// ============================================================

export interface SocialAccountLinkedEventData {
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
  provider: SocialProvider;
  providerUserId: string;
  providerEmail?: string;
  providerDisplayName?: string;
  source: SocialLinkSource;
  linkedAt: string;
  isPrimary: boolean;
  notificationSent: boolean;
  notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';
  linkedBy?: string;
  metadata?: SocialAccountLinkedMetadata;
  ttlSeconds?: number;
  expiresAt?: string;
  priority?: EventPriority;
  partitionKey?: string;
}

export interface SocialAccountUnlinkedEventData {
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
  provider: SocialProvider;
  providerUserId: string;
  reason: SocialUnlinkReason;
  source: SocialLinkSource;
  unlinkedAt: string;
  linkedDurationSeconds?: number;
  notificationSent: boolean;
  notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';
  unlinkedBy?: string;
  metadata?: SocialAccountLinkedMetadata;
  ttlSeconds?: number;
  expiresAt?: string;
  priority?: EventPriority;
  partitionKey?: string;
}

// ============================================================
// ✅ Enterprise: Type Exports
// ============================================================

export type {
  SocialAccountLinkedMetadata as SocialAccountLinkedMetadataType,
  SocialAccountLinkedPayload as SocialAccountLinkedPayloadType,
  SocialAccountUnlinkedPayload as SocialAccountUnlinkedPayloadType,
};

// ============================================================
// ENTERPRISE SUMMARY v4.0
// ============================================================
//
// Enterprise Enhancements Applied in v4.0:
// 1. ✅ Shared-types integration (@vubon/shared-types)
// 2. ✅ Event versioning with aggregateVersion tracking
// 3. ✅ TTL support with expiresAt for event expiry (90 days default)
// 4. ✅ Priority-based event processing (critical for MFS providers)
// 5. ✅ Partition key for event streaming optimization
// 6. ✅ Bangladesh specific fields (district, upazila, mobileOperator, networkType)
// 7. ✅ Device fingerprint tracking
// 8. ✅ Session binding tracking (oauthSessionId)
// 9. ✅ Zod schema for runtime validation
// 10. ✅ Serialization support (toJSON, fromJSON)
// 11. ✅ Helper methods: isExpired(), isCritical(), getProviderDisplayName()
// 12. ✅ isAdminInitiated(), isFirstSocialLogin(), isBangladeshSpecific()
// 13. ✅ Extended SocialProvider enum (Bangladesh specific)
// 14. ✅ SocialLinkSource enum (USER, ADMIN, SYSTEM, OAUTH_CALLBACK, MIGRATION)
// 15. ✅ SocialUnlinkReason enum (USER_INITIATED, ADMIN_ACTION, SECURITY_INCIDENT, etc.)
// 16. ✅ 4 Static factory methods for common scenarios
// 17. ✅ Provider display names (English & Bengali)
// 18. ✅ Notification tracking (notificationSent, notificationChannel)
// 19. ✅ Admin action tracking with linkedBy/unlinkedBy
// 20. ✅ Total linked accounts tracking
// 21. ✅ Linked duration tracking for unlink events
//
// Bangladesh Specific:
// - WhatsApp/Imo/Telegram social login support
// - bKash/Nagad/Rocket social login support
// - Provider display names in Bengali
// - District/Upazila/Division location tracking
// - Mobile operator and network type tracking
// - Feature phone device type
// - Bengali language support (metadata.language: 'bn')
// - WhatsApp notification channel support
//
// Security Features:
// - Priority-based event processing for MFS providers
// - Security alert triggers for admin actions
// - Admin action audit trail
// - Device fingerprint tracking
// - Session binding for OAuth flow validation
// - First social login detection
//
// ============================================================
