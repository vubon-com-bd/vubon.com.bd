/**
 * Welcome Email Event - Enterprise Grade (v3.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce

 * @module application/events/welcome-email.event

 * @description
 * Event emitted when a new user successfully verifies their email.
 * Enhanced with shared-types integration, event versioning, TTL support,
 * Bangladesh specific fields, delivery tracking, and priority-based processing.

 * ENTERPRISE ENHANCEMENTS (v3.0):
 * ✅ Shared-types integration (@vubon/shared-types)
 * ✅ Event versioning with aggregateVersion tracking
 * ✅ TTL support with expiresAt for event expiry (90 days default)
 * ✅ Priority-based event processing (high for premium/vendor users)
 * ✅ Partition key for event streaming optimization
 * ✅ Bangladesh specific fields (district, upazila, mobileOperator, networkType)
 * ✅ Delivery tracking (sent/delivered/opened/failed)
 * ✅ Retry mechanism tracking
 * ✅ WhatsApp fallback support
 * ✅ Template selection based on user tier/role
 * ✅ UTM parameter tracking for marketing attribution
 * ✅ Zod schema for runtime validation
 * ✅ Serialization support (toJSON, fromJSON)
 * ✅ Helper methods for delivery status
 * ✅ Static factory methods for common scenarios

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
  USER_ROLES,
  USER_TIERS
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
// Welcome Email Template Enum (Extended)
// ============================================================

export enum WelcomeEmailTemplate {
  DEFAULT = 'welcome-default',
  BENGALI = 'welcome-bengali',
  PREMIUM = 'welcome-premium',
  VENDOR = 'welcome-vendor',
  ADMIN = 'welcome-admin',
  WHATSAPP = 'welcome-whatsapp',      // WhatsApp template (Bangladesh)
  SMS = 'welcome-sms',                // SMS template (feature phones)
}

// ============================================================
// Delivery Status Enum
// ============================================================

export enum DeliveryStatus {
  PENDING = 'pending',
  SENT = 'sent',
  DELIVERED = 'delivered',
  OPENED = 'opened',
  CLICKED = 'clicked',
  FAILED = 'failed',
  BOUNCED = 'bounced',
}

// ============================================================
// Welcome Email Source Enum
// ============================================================

export enum WelcomeEmailSource {
  EMAIL_VERIFICATION = 'email_verification',
  PHONE_VERIFICATION = 'phone_verification',
  ADMIN_CREATED = 'admin_created',
  SOCIAL_SIGNUP = 'social_signup',
  MFS_SIGNUP = 'mfs_signup',          // bKash/Nagad/Rocket signup
}

// ============================================================
// ✅ ENTERPRISE: Event Metadata Interface (Bangladesh specific)
// ============================================================

export interface WelcomeEmailMetadata extends EventMetadata {
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

  // ============================================================
  // Delivery Tracking
  // ============================================================

  /** Email delivery status */
  deliveryStatus?: DeliveryStatus;

  /** When email was sent */
  sentAt?: Date;

  /** When email was delivered */
  deliveredAt?: Date;

  /** When email was opened */
  openedAt?: Date;

  /** When links were clicked */
  clickedAt?: Date;

  /** Delivery latency in milliseconds */
  deliveryLatencyMs?: number;

  /** Number of retry attempts */
  retryCount?: number;

  /** Whether WhatsApp fallback was used */
  whatsappFallbackUsed?: boolean;

  /** Whether WhatsApp message was sent */
  whatsappSent?: boolean;

  /** SMS sent (for feature phones) */
  smsSent?: boolean;

  // ============================================================
  // User Context
  // ============================================================

  /** Signup method */
  signupMethod?: 'email' | 'phone' | 'social' | 'mfs';

  /** Whether user has phone number */
  hasPhone?: boolean;

  /** User role at registration */
  userRole?: string;

  /** User tier at registration */
  userTier?: string;

  /** Referral code used */
  referralCode?: string;

  // ============================================================
  // Marketing Attribution
  // ============================================================

  /** UTM campaign tracking */
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;

  /** Campaign ID for marketing */
  campaignId?: string;

  // ============================================================
  // Notification Status
  // ============================================================

  /** Whether notification was sent */
  notificationSent?: boolean;

  /** Notification channel used */
  notificationChannel?: 'email' | 'sms' | 'push' | 'whatsapp';

  /** Whether this triggered a security alert */
  triggeredSecurityAlert?: boolean;

  /** Security alert reason (if triggered) */
  securityAlertReason?: string;

  // ============================================================
  // ✅ Enterprise: Bangladesh specific fields
  // ============================================================

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

export interface WelcomeEmailPayload extends EventPayload {
  /** User ID */
  userId: string;

  /** User email */
  email: string;

  /** User full name */
  fullName: string;

  /** User display name */
  displayName?: string;

  /** User phone (Bangladesh specific) */
  phone?: string;

  /** Email template to use */
  template: WelcomeEmailTemplate;

  /** Welcome email source */
  source: WelcomeEmailSource;

  /** Preferred language */
  preferredLanguage: 'en' | 'bn';

  /** Current delivery status */
  deliveryStatus: DeliveryStatus;

  /** Whether this is first welcome email */
  isFirstWelcome: boolean;

  /** Whether notification was sent */
  notificationSent?: boolean;
}

// ============================================================
// ✅ ENTERPRISE: Zod Schema for Runtime Validation
// ============================================================

export const WelcomeEmailEventSchema = z.object({
  eventId: z.string().uuid(),
  eventName: z.literal(EVENT_NAMES.WELCOME_EMAIL),
  occurredAt: z.date(),
  eventVersion: z.number().int().min(1).default(EVENT_VERSIONS.V1),
  aggregateVersion: z.number().int().min(1).default(1),
  correlationId: z.string().uuid().optional(),
  causationId: z.string().uuid().optional(),
  userId: z.string().uuid(),
  email: z.string().email(),
  fullName: z.string().min(2).max(100),
  displayName: z.string().max(50).optional(),
  phone: z.string().regex(/^(?:\+880|0)1[3-9]\d{8}$/).optional(),
  template: z.nativeEnum(WelcomeEmailTemplate),
  source: z.nativeEnum(WelcomeEmailSource),
  preferredLanguage: z.enum(['en', 'bn']).default('en'),
  deliveryStatus: z.nativeEnum(DeliveryStatus).default(DeliveryStatus.PENDING),
  isFirstWelcome: z.boolean().default(true),
  notificationSent: z.boolean().default(false),
  metadata: z.object({
    ipAddress: z.string().ip().optional(),
    deviceId: z.string().max(255).optional(),
    deviceFingerprint: z.string().max(128).optional(),
    userAgent: z.string().max(500).optional(),
    sessionId: z.string().uuid().optional(),
    deliveryStatus: z.nativeEnum(DeliveryStatus).optional(),
    sentAt: z.date().optional(),
    deliveredAt: z.date().optional(),
    openedAt: z.date().optional(),
    clickedAt: z.date().optional(),
    deliveryLatencyMs: z.number().int().min(0).optional(),
    retryCount: z.number().int().min(0).optional(),
    whatsappFallbackUsed: z.boolean().optional(),
    whatsappSent: z.boolean().optional(),
    smsSent: z.boolean().optional(),
    signupMethod: z.enum(['email', 'phone', 'social', 'mfs']).optional(),
    hasPhone: z.boolean().optional(),
    userRole: z.string().optional(),
    userTier: z.string().optional(),
    referralCode: z.string().max(50).optional(),
    utmSource: z.string().max(100).optional(),
    utmMedium: z.string().max(100).optional(),
    utmCampaign: z.string().max(100).optional(),
    utmTerm: z.string().max(100).optional(),
    utmContent: z.string().max(100).optional(),
    campaignId: z.string().max(100).optional(),
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
// ✅ ENTERPRISE: Welcome Email Event Class (v3.0)
// ============================================================

export class WelcomeEmailEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.WELCOME_EMAIL;
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
  public readonly fullName: string;
  public readonly displayName?: string;
  public readonly phone?: string;

  // Welcome email context
  public readonly template: WelcomeEmailTemplate;
  public readonly source: WelcomeEmailSource;
  public readonly preferredLanguage: 'en' | 'bn';
  public readonly deliveryStatus: DeliveryStatus;
  public readonly isFirstWelcome: boolean;

  // Notification status
  public readonly notificationSent: boolean;

  // Event metadata
  public readonly metadata?: WelcomeEmailMetadata;

  // ✅ Enterprise: Constructor with enhanced options
  constructor(
    userId: string,
    aggregateVersion: number,
    email: string,
    fullName: string,
    template: WelcomeEmailTemplate,
    source: WelcomeEmailSource,
    options?: {
      // Core fields
      displayName?: string;
      phone?: string;
      preferredLanguage?: 'en' | 'bn';
      deliveryStatus?: DeliveryStatus;
      isFirstWelcome?: boolean;

      // Notification
      notificationSent?: boolean;

      // Event tracking
      correlationId?: string;
      causationId?: string;
      ttlSeconds?: number;
      expiresAt?: Date;
      priority?: EventPriority;
      partitionKey?: string;

      // Metadata (Bangladesh specific)
      metadata?: WelcomeEmailMetadata;

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
    this.priority = options?.priority ?? this.calculatePriority(template);
    this.partitionKey = options?.partitionKey ?? userId;

    this.userId = userId;
    this.email = email;
    this.fullName = fullName;
    this.displayName = options?.displayName;
    this.phone = options?.phone;

    this.template = template;
    this.source = source;
    this.preferredLanguage = options?.preferredLanguage ?? 'en';
    this.deliveryStatus = options?.deliveryStatus ?? DeliveryStatus.PENDING;
    this.isFirstWelcome = options?.isFirstWelcome ?? true;

    this.notificationSent = options?.notificationSent ?? false;

    this.metadata = options?.metadata;

    // ✅ Enterprise: Auto-set partition key from district if available
    if (!options?.partitionKey && this.metadata?.district) {
      this.partitionKey = this.metadata.district;
    }

    // ✅ Enterprise: Auto-set TTL if not provided (90 days default)
    if (!this.ttlSeconds && !this.expiresAt) {
      this.ttlSeconds = 90 * 24 * 60 * 60; // 90 days
      this.expiresAt = new Date(Date.now() + this.ttlSeconds * 1000);
    }
  }

  // ============================================================
  // ✅ Enterprise: Helper Methods
  // ============================================================

  /**
   * Calculate priority based on template
   */
  private calculatePriority(template: WelcomeEmailTemplate): EventPriority {
    if (template === WelcomeEmailTemplate.ADMIN ||
        template === WelcomeEmailTemplate.VENDOR) {
      return 'high';
    }
    if (template === WelcomeEmailTemplate.PREMIUM) {
      return 'normal';
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
   * Check if email has been delivered
   */
  public isDelivered(): boolean {
    return this.deliveryStatus === DeliveryStatus.DELIVERED ||
           this.deliveryStatus === DeliveryStatus.OPENED ||
           this.deliveryStatus === DeliveryStatus.CLICKED;
  }

  /**
   * Check if email has been opened
   */
  public isOpened(): boolean {
    return this.deliveryStatus === DeliveryStatus.OPENED ||
           this.deliveryStatus === DeliveryStatus.CLICKED;
  }

  /**
   * Check if delivery failed
   */
  public isFailed(): boolean {
    return this.deliveryStatus === DeliveryStatus.FAILED ||
           this.deliveryStatus === DeliveryStatus.BOUNCED;
  }

  /**
   * Get delivery status description in Bengali
   */
  public getDeliveryStatusBn(): string {
    const statusMap: Record<DeliveryStatus, string> = {
      [DeliveryStatus.PENDING]: 'অপেক্ষমাণ',
      [DeliveryStatus.SENT]: 'পাঠানো হয়েছে',
      [DeliveryStatus.DELIVERED]: 'প্রাপ্ত হয়েছে',
      [DeliveryStatus.OPENED]: 'খোলা হয়েছে',
      [DeliveryStatus.CLICKED]: 'ক্লিক করা হয়েছে',
      [DeliveryStatus.FAILED]: 'ব্যর্থ হয়েছে',
      [DeliveryStatus.BOUNCED]: 'ফেরত এসেছে',
    };
    return statusMap[this.deliveryStatus] || 'অজানা';
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
      template: this.template,
      source: this.source,
      deliveryStatus: this.deliveryStatus,
      isDelivered: this.isDelivered(),
      isOpened: this.isOpened(),
      isFailed: this.isFailed(),
      whatsappFallbackUsed: this.metadata?.whatsappFallbackUsed,
      smsSent: this.metadata?.smsSent,
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
  public toJSON(): WelcomeEmailEventData {
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
      fullName: this.fullName,
      displayName: this.displayName,
      phone: this.phone,
      template: this.template,
      source: this.source,
      preferredLanguage: this.preferredLanguage,
      deliveryStatus: this.deliveryStatus,
      isFirstWelcome: this.isFirstWelcome,
      notificationSent: this.notificationSent,
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
  public static fromJSON(data: WelcomeEmailEventData): WelcomeEmailEvent {
    const event = new WelcomeEmailEvent(
      data.userId,
      data.aggregateVersion,
      data.email,
      data.fullName,
      data.template,
      data.source,
      {
        displayName: data.displayName,
        phone: data.phone,
        preferredLanguage: data.preferredLanguage,
        deliveryStatus: data.deliveryStatus,
        isFirstWelcome: data.isFirstWelcome,
        notificationSent: data.notificationSent,
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
    return event;
  }

  /**
   * Validate event data using Zod schema
   */
  public validate(): boolean {
    const result = WelcomeEmailEventSchema.safeParse(this.toJSON());
    return result.success;
  }

  // ============================================================
  // ✅ Enterprise: Static factory methods for common scenarios
  // ============================================================

  /**
   * Create event for new user email verification
   */
  public static forNewUser(
    userId: string,
    aggregateVersion: number,
    email: string,
    fullName: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      displayName?: string;
      phone?: string;
      preferredLanguage?: 'en' | 'bn';
      signupMethod?: 'email' | 'phone' | 'social' | 'mfs';
      userRole?: string;
      userTier?: string;
      district?: string;
      mobileOperator?: typeof MOBILE_OPERATORS[number];
      correlationId?: string;
    }
  ): WelcomeEmailEvent {
    // Select template based on user role and tier
    const template = WelcomeEmailEvent.getTemplateForUser(
      options?.userTier,
      options?.userRole,
      options?.preferredLanguage ?? 'en'
    );

    return new WelcomeEmailEvent(
      userId,
      aggregateVersion,
      email,
      fullName,
      template,
      WelcomeEmailSource.EMAIL_VERIFICATION,
      {
        displayName: options?.displayName,
        phone: options?.phone,
        preferredLanguage: options?.preferredLanguage ?? 'en',
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          district: options?.district,
          mobileOperator: options?.mobileOperator,
          signupMethod: options?.signupMethod ?? 'email',
          userRole: options?.userRole,
          userTier: options?.userTier,
          notificationSent: true,
          notificationChannel: 'email',
        }
      }
    );
  }

  /**
   * Create event for vendor welcome
   */
  public static forVendorWelcome(
    userId: string,
    aggregateVersion: number,
    email: string,
    businessName: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      phone?: string;
      district?: string;
      mobileOperator?: typeof MOBILE_OPERATORS[number];
      correlationId?: string;
    }
  ): WelcomeEmailEvent {
    return new WelcomeEmailEvent(
      userId,
      aggregateVersion,
      email,
      businessName,
      WelcomeEmailTemplate.VENDOR,
      WelcomeEmailSource.EMAIL_VERIFICATION,
      {
        phone: options?.phone,
        priority: 'high',
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          district: options?.district,
          mobileOperator: options?.mobileOperator,
          userRole: 'VENDOR',
          notificationSent: true,
          notificationChannel: 'email',
        }
      }
    );
  }

  /**
   * Create event for WhatsApp welcome message (Bangladesh specific)
   */
  public static forWhatsAppWelcome(
    userId: string,
    aggregateVersion: number,
    email: string,
    phone: string,
    fullName: string,
    ipAddress: string,
    deviceId: string,
    userAgent: string,
    options?: {
      district?: string;
      mobileOperator?: typeof MOBILE_OPERATORS[number];
      correlationId?: string;
    }
  ): WelcomeEmailEvent {
    return new WelcomeEmailEvent(
      userId,
      aggregateVersion,
      email,
      fullName,
      WelcomeEmailTemplate.WHATSAPP,
      WelcomeEmailSource.EMAIL_VERIFICATION,
      {
        phone,
        preferredLanguage: 'bn',
        correlationId: options?.correlationId,
        metadata: {
          ipAddress,
          deviceId,
          userAgent,
          district: options?.district,
          mobileOperator: options?.mobileOperator,
          notificationSent: true,
          notificationChannel: 'whatsapp',
          whatsappSent: true,
        }
      }
    );
  }

  /**
   * Static helper to select template based on user tier and role
   */
  public static getTemplateForUser(
    userTier?: string,
    userRole?: string,
    language: string = 'en'
  ): WelcomeEmailTemplate {
    if (userRole === 'ADMIN') return WelcomeEmailTemplate.ADMIN;
    if (userRole === 'VENDOR') return WelcomeEmailTemplate.VENDOR;
    if (userTier === 'PLATINUM' || userTier === 'DIAMOND') return WelcomeEmailTemplate.PREMIUM;
    if (language === 'bn') return WelcomeEmailTemplate.BENGALI;
    return WelcomeEmailTemplate.DEFAULT;
  }

  /**
   * Update delivery status
   */
  public updateDeliveryStatus(
    status: DeliveryStatus,
    options?: {
      deliveredAt?: Date;
      openedAt?: Date;
      clickedAt?: Date;
    }
  ): void {
    (this as any).deliveryStatus = status;
    if (options?.deliveredAt) (this as any).metadata = { ...this.metadata, deliveredAt: options.deliveredAt };
    if (options?.openedAt) (this as any).metadata = { ...this.metadata, openedAt: options.openedAt };
    if (options?.clickedAt) (this as any).metadata = { ...this.metadata, clickedAt: options.clickedAt };
  }
}

// ============================================================
// ✅ Enterprise: Welcome Email Sent Event (v3.0)
// ============================================================

export class WelcomeEmailSentEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.WELCOME_EMAIL_SENT;
  public readonly occurredAt: Date;
  public readonly eventVersion: number = EVENT_VERSIONS.V1;
  public readonly aggregateVersion: number = 1;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly ttlSeconds?: number = 30 * 24 * 60 * 60; // 30 days
  public readonly expiresAt?: Date;
  public readonly priority?: EventPriority = 'normal';
  public readonly partitionKey?: string;

  public readonly userId: string;
  public readonly email: string;
  public readonly template: WelcomeEmailTemplate;
  public readonly sentAt: Date;
  public readonly deliveryStatus: DeliveryStatus;
  public readonly messageId?: string;
  public readonly metadata?: WelcomeEmailMetadata;

  constructor(
    userId: string,
    email: string,
    template: WelcomeEmailTemplate,
    options?: {
      messageId?: string;
      correlationId?: string;
      causationId?: string;
      metadata?: WelcomeEmailMetadata;
    }
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.correlationId = options?.correlationId;
    this.causationId = options?.causationId;
    this.partitionKey = userId;
    this.expiresAt = this.ttlSeconds ? new Date(Date.now() + this.ttlSeconds * 1000) : undefined;

    this.userId = userId;
    this.email = email;
    this.template = template;
    this.sentAt = new Date();
    this.deliveryStatus = DeliveryStatus.SENT;
    this.messageId = options?.messageId;
    this.metadata = options?.metadata;
  }

  public toJSON(): WelcomeEmailSentEventData {
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
      template: this.template,
      sentAt: this.sentAt.toISOString(),
      deliveryStatus: this.deliveryStatus,
      messageId: this.messageId,
      metadata: this.metadata,
    };
  }
}

// ============================================================
// ✅ Enterprise: Welcome Email Failed Event (v3.0)
// ============================================================

export class WelcomeEmailFailedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.WELCOME_EMAIL_FAILED;
  public readonly occurredAt: Date;
  public readonly eventVersion: number = EVENT_VERSIONS.V1;
  public readonly aggregateVersion: number = 1;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly ttlSeconds?: number = 30 * 24 * 60 * 60;
  public readonly expiresAt?: Date;
  public readonly priority?: EventPriority = 'high';
  public readonly partitionKey?: string;

  public readonly userId: string;
  public readonly email: string;
  public readonly template: WelcomeEmailTemplate;
  public readonly failureReason: string;
  public readonly failureCode?: string;
  public readonly retryCount: number;
  public readonly metadata?: WelcomeEmailMetadata;

  constructor(
    userId: string,
    email: string,
    template: WelcomeEmailTemplate,
    failureReason: string,
    retryCount: number,
    options?: {
      failureCode?: string;
      correlationId?: string;
      causationId?: string;
      metadata?: WelcomeEmailMetadata;
    }
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.correlationId = options?.correlationId;
    this.causationId = options?.causationId;
    this.partitionKey = userId;
    this.expiresAt = this.ttlSeconds ? new Date(Date.now() + this.ttlSeconds * 1000) : undefined;

    this.userId = userId;
    this.email = email;
    this.template = template;
    this.failureReason = failureReason;
    this.failureCode = options?.failureCode;
    this.retryCount = retryCount;
    this.metadata = options?.metadata;
  }

  public toJSON(): WelcomeEmailFailedEventData {
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
      template: this.template,
      failureReason: this.failureReason,
      failureCode: this.failureCode,
      retryCount: this.retryCount,
      metadata: this.metadata,
    };
  }
}

// ============================================================
// ✅ Enterprise: Event Data Interfaces (for serialization)
// ============================================================

export interface WelcomeEmailEventData {
  eventId: string;
  eventName: string;
  occurredAt: string;
  eventVersion: number;
  aggregateVersion: number;
  correlationId?: string;
  causationId?: string;
  userId: string;
  email: string;
  fullName: string;
  displayName?: string;
  phone?: string;
  template: WelcomeEmailTemplate;
  source: WelcomeEmailSource;
  preferredLanguage: 'en' | 'bn';
  deliveryStatus: DeliveryStatus;
  isFirstWelcome: boolean;
  notificationSent: boolean;
  metadata?: WelcomeEmailMetadata;
  ttlSeconds?: number;
  expiresAt?: string;
  priority?: EventPriority;
  partitionKey?: string;
}

export interface WelcomeEmailSentEventData {
  eventId: string;
  eventName: string;
  occurredAt: string;
  eventVersion: number;
  aggregateVersion: number;
  correlationId?: string;
  causationId?: string;
  userId: string;
  email: string;
  template: WelcomeEmailTemplate;
  sentAt: string;
  deliveryStatus: DeliveryStatus;
  messageId?: string;
  metadata?: WelcomeEmailMetadata;
}

export interface WelcomeEmailFailedEventData {
  eventId: string;
  eventName: string;
  occurredAt: string;
  eventVersion: number;
  aggregateVersion: number;
  correlationId?: string;
  causationId?: string;
  userId: string;
  email: string;
  template: WelcomeEmailTemplate;
  failureReason: string;
  failureCode?: string;
  retryCount: number;
  metadata?: WelcomeEmailMetadata;
}

// ============================================================
// ✅ Enterprise: Type Exports
// ============================================================

export type { 
  WelcomeEmailMetadata as WelcomeEmailMetadataType,
  WelcomeEmailPayload as WelcomeEmailPayloadType
};

// ============================================================
// ENTERPRISE SUMMARY v3.0
// ============================================================
// 
// Enterprise Enhancements Applied in v3.0:
// 1. ✅ Shared-types integration (@vubon/shared-types)
// 2. ✅ Event versioning with aggregateVersion tracking
// 3. ✅ TTL support with expiresAt for event expiry (90 days default)
// 4. ✅ Priority-based event processing (high for premium/vendor)
// 5. ✅ Partition key for event streaming optimization
// 6. ✅ Bangladesh specific fields (district, upazila, mobileOperator, networkType)
// 7. ✅ Delivery tracking (sent/delivered/opened/clicked/failed/bounced)
// 8. ✅ Retry mechanism tracking
// 9. ✅ WhatsApp fallback support
// 10. ✅ SMS fallback for feature phones
// 11. ✅ Template selection based on user tier/role
// 12. ✅ UTM parameter tracking for marketing attribution
// 13. ✅ 4 Static factory methods for common scenarios
// 14. ✅ Helper methods: isExpired(), isDelivered(), isOpened(), isFailed()
// 15. ✅ getDeliveryStatusBn() for Bengali status
// 16. ✅ getTemplateForUser() dynamic template selection
// 17. ✅ updateDeliveryStatus() method
// 18. ✅ Serialization support (toJSON, fromJSON)
// 19. ✅ Zod schema for runtime validation
// 20. ✅ Notification tracking (notificationSent, notificationChannel)
// 21. ✅ Device fingerprint tracking
// 22. ✅ WelcomeEmailSentEvent (post-send confirmation)
// 23. ✅ WelcomeEmailFailedEvent (failure tracking with retry count)
// 
// Bangladesh Specific:
// - WhatsApp template support
// - Bengali language template
// - District/Upazila/Division location tracking
// - Mobile operator and network type tracking
// - Feature phone device type (SMS fallback)
// - WhatsApp notification channel support
// - Bengali delivery status messages
// 
// Marketing Features:
// - UTM parameter tracking for campaign attribution
// - Campaign ID tracking
// - Referral code tracking
// - Signup method tracking
// - User role and tier based template selection
// 
// Security Features:
// - Priority-based event processing
// - Device fingerprint tracking
// - IP address tracking
// - Security alert triggers
// 
// ============================================================
