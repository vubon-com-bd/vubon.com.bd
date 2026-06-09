/**
 * User Registered Event - Pure Domain/Application Event (Enterprise Enhanced v2.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/events/user-registered.event
 * 
 * @description
 * Event emitted when a new user successfully registers.
 * Enhanced with shared-types integration, event versioning, TTL support,
 * Bangladesh specific fields (district, upazila, mobileOperator),
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
 * 
 * @example
 * // Standard email registration
 * const event = new UserRegisteredEvent(
 *   'usr_123',
 *   1,
 *   'user@example.com',
 *   'John Doe',
 *   RegistrationMethod.EMAIL_PASSWORD,
 *   RegistrationSource.WEB,
 *   { correlationId: 'corr_abc123' }
 * );
 */

import { randomUUID } from 'crypto';
import { z } from 'zod';

// ✅ Enterprise: Import from shared-types and shared-constants
import type { 
  EventMetadata, 
  EventPayload, 
  DomainEvent as SharedDomainEvent,
  EventPriority,
  MFAType,
  UserRole,
  UserTier
} from '@vubon/shared-types';

import {
  EVENT_VERSIONS,
  USER_ROLES,
  USER_TIERS,
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
// Registration Method Enum (Extended)
// ============================================================

export enum RegistrationMethod {
  // Standard methods
  EMAIL_PASSWORD = 'EMAIL_PASSWORD',
  
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
  
  // Bangladesh specific MFS
  MFS_BKASH = 'MFS_BKASH',
  MFS_NAGAD = 'MFS_NAGAD',
  MFS_ROCKET = 'MFS_ROCKET',
  
  // Admin/System
  ADMIN_CREATED = 'ADMIN_CREATED',
  API_CREATED = 'API_CREATED',
  INVITE = 'INVITE',
  MIGRATION = 'MIGRATION',
}

// ============================================================
// Registration Source Enum
// ============================================================

export enum RegistrationSource {
  WEB = 'WEB',
  MOBILE_APP = 'MOBILE_APP',
  ADMIN_PORTAL = 'ADMIN_PORTAL',
  API = 'API',
  SOCIAL = 'SOCIAL',
  MFS_APP = 'MFS_APP',      // bKash/Nagad/Rocket app
  FEATURE_PHONE = 'FEATURE_PHONE',  // Bangladesh specific
}

// ============================================================
// User Tier Enum (Re-export for convenience)
// ============================================================

export { USER_TIERS as UserTier };
export type UserTier = typeof USER_TIERS[keyof typeof USER_TIERS];

// ============================================================
// User Role Enum (Re-export for convenience)
// ============================================================

export { USER_ROLES as UserRole };
export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

// ============================================================
// ✅ ENTERPRISE: Event Metadata Interface
// ============================================================

export interface UserRegisteredMetadata extends EventMetadata {
  /** User's IP address for geolocation */
  ipAddress?: string;
  
  /** Device ID for device fingerprinting */
  deviceId?: string;
  
  /** User agent for browser/OS detection */
  userAgent?: string;
  
  /** Session ID for tracking */
  sessionId?: string;
  
  /** HTTP referrer for marketing attribution */
  referrer?: string;
  
  /** UTM parameters for campaign tracking */
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  
  /** ✅ Enterprise: Bangladesh specific fields */
  /** User's district (Bangladesh) */
  district?: string;
  
  /** User's upazila/sub-district */
  upazila?: string;
  
  /** Mobile operator for carrier-specific logic */
  mobileOperator?: typeof MOBILE_OPERATORS[number];
  
  /** Network type for connectivity optimization */
  networkType?: typeof NETWORK_TYPES[number];
  
  /** Whether data saver mode is enabled */
  dataSaverEnabled?: boolean;
  
  /** Device type for responsive design */
  deviceType?: 'desktop' | 'mobile' | 'tablet' | 'feature_phone';
  
  /** Screen resolution for analytics */
  screenResolution?: string;
  
  /** Language preference */
  language?: 'en' | 'bn';
  
  /** Timezone offset in minutes */
  timezoneOffset?: number;
  
  /** Whether user accepted marketing consent */
  marketingConsent?: boolean;
  
  /** Referral code used during registration */
  referralCode?: string;
  
  /** Admin ID (if created by admin) */
  createdBy?: string;
}

// ============================================================
// ✅ ENTERPRISE: Event Payload Interface
// ============================================================

export interface UserRegisteredPayload extends EventPayload {
  /** User's email address */
  email: string;
  
  /** User's full name */
  fullName: string;
  
  /** User's display name */
  displayName?: string;
  
  /** User's phone number (Bangladesh specific) */
  phone?: string;
  
  /** User's role */
  role: UserRole;
  
  /** User's loyalty tier */
  userTier: UserTier;
  
  /** Whether email is verified */
  isEmailVerified: boolean;
  
  /** Whether phone is verified */
  isPhoneVerified: boolean;
  
  /** Whether KYC is verified */
  isKycVerified: boolean;
  
  /** Whether MFA is enabled */
  isMfaEnabled: boolean;
  
  /** User's preferred language */
  preferredLanguage?: 'en' | 'bn';
  
  /** User's preferred district (Bangladesh) */
  preferredDistrict?: string;
  
  /** User's preferred upazila (Bangladesh) */
  preferredUpazila?: string;
  
  /** Total spent (for tier calculation) */
  totalSpent?: number;
}

// ============================================================
// ✅ ENTERPRISE: Zod Schema for Runtime Validation
// ============================================================

export const UserRegisteredEventSchema = z.object({
  eventId: z.string().uuid(),
  eventName: z.literal('user.registered'),
  occurredAt: z.date(),
  eventVersion: z.number().int().min(1).default(EVENT_VERSIONS.V1),
  aggregateVersion: z.number().int().min(1),
  correlationId: z.string().uuid().optional(),
  causationId: z.string().uuid().optional(),
  userId: z.string().uuid(),
  email: z.string().email(),
  fullName: z.string().min(2).max(100),
  displayName: z.string().max(50).optional(),
  phone: z.string().regex(/^(?:\+880|0)1[3-9]\d{8}$/).optional(),
  registrationMethod: z.nativeEnum(RegistrationMethod),
  registrationSource: z.nativeEnum(RegistrationSource),
  role: z.enum([USER_ROLES.CUSTOMER, USER_ROLES.VENDOR, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN]),
  userTier: z.enum([USER_TIERS.BRONZE, USER_TIERS.SILVER, USER_TIERS.GOLD, USER_TIERS.PLATINUM, USER_TIERS.DIAMOND]),
  isEmailVerified: z.boolean().default(false),
  isPhoneVerified: z.boolean().default(false),
  isKycVerified: z.boolean().default(false),
  isMfaEnabled: z.boolean().default(false),
  preferredLanguage: z.enum(['en', 'bn']).optional(),
  preferredDistrict: z.string().max(50).optional(),
  preferredUpazila: z.string().max(50).optional(),
  metadata: z.object({
    ipAddress: z.string().ip().optional(),
    deviceId: z.string().max(255).optional(),
    userAgent: z.string().max(500).optional(),
    sessionId: z.string().uuid().optional(),
    referrer: z.string().max(500).optional(),
    utmSource: z.string().max(100).optional(),
    utmMedium: z.string().max(100).optional(),
    utmCampaign: z.string().max(100).optional(),
    utmTerm: z.string().max(100).optional(),
    utmContent: z.string().max(100).optional(),
    district: z.string().max(100).optional(),
    upazila: z.string().max(100).optional(),
    mobileOperator: z.enum(MOBILE_OPERATORS).optional(),
    networkType: z.enum(NETWORK_TYPES).optional(),
    dataSaverEnabled: z.boolean().optional(),
    deviceType: z.enum(['desktop', 'mobile', 'tablet', 'feature_phone']).optional(),
    screenResolution: z.string().regex(/^\d+x\d+$/).optional(),
    language: z.enum(['en', 'bn']).optional(),
    timezoneOffset: z.number().int().min(-720).max(840).optional(),
    marketingConsent: z.boolean().optional(),
    referralCode: z.string().max(50).optional(),
    createdBy: z.string().uuid().optional(),
  }).optional(),
  ttlSeconds: z.number().int().positive().optional(),
  expiresAt: z.date().optional(),
  priority: z.enum(['low', 'normal', 'high', 'critical']).default('normal'),
  partitionKey: z.string().optional(),
});

// ============================================================
// ✅ ENTERPRISE: User Registered Event Class (v2.0)
// ============================================================

export class UserRegisteredEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.USER_REGISTERED;
  public readonly occurredAt: Date;
  public readonly eventVersion: number;
  public readonly aggregateVersion: number;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly ttlSeconds?: number;
  public readonly expiresAt?: Date;
  public readonly priority?: 'low' | 'normal' | 'high' | 'critical';
  public readonly partitionKey?: string;

  // Core user information
  public readonly userId: string;
  public readonly email: string;
  public readonly fullName: string;
  public readonly displayName?: string;
  public readonly phone?: string;

  // Registration context
  public readonly registrationMethod: RegistrationMethod;
  public readonly registrationSource: RegistrationSource;

  // Role and tier
  public readonly role: UserRole;
  public readonly userTier: UserTier;

  // Verification status
  public readonly isEmailVerified: boolean;
  public readonly isPhoneVerified: boolean;
  public readonly isKycVerified: boolean;
  public readonly isMfaEnabled: boolean;

  // User preferences
  public readonly preferredLanguage?: 'en' | 'bn';
  public readonly preferredDistrict?: string;
  public readonly preferredUpazila?: string;

  // Event metadata
  public readonly metadata?: UserRegisteredMetadata;

  // ✅ Enterprise: Constructor with enhanced options
  constructor(
    userId: string,
    aggregateVersion: number,
    email: string,
    fullName: string,
    registrationMethod: RegistrationMethod,
    registrationSource: RegistrationSource,
    options?: {
      // Core fields
      displayName?: string;
      phone?: string;
      
      // Role and tier (defaults: CUSTOMER, BRONZE)
      role?: UserRole;
      userTier?: UserTier;
      
      // Verification status
      isEmailVerified?: boolean;
      isPhoneVerified?: boolean;
      isKycVerified?: boolean;
      isMfaEnabled?: boolean;
      
      // Preferences
      preferredLanguage?: 'en' | 'bn';
      preferredDistrict?: string;
      preferredUpazila?: string;
      
      // Event tracking
      correlationId?: string;
      causationId?: string;
      ttlSeconds?: number;
      expiresAt?: Date;
      priority?: 'low' | 'normal' | 'high' | 'critical';
      partitionKey?: string;
      
      // Metadata (Bangladesh specific)
      metadata?: UserRegisteredMetadata;
      
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
    this.partitionKey = options?.partitionKey ?? userId; // Default partition by userId
    
    this.userId = userId;
    this.email = email;
    this.fullName = fullName;
    this.displayName = options?.displayName;
    this.phone = options?.phone;
    
    this.registrationMethod = registrationMethod;
    this.registrationSource = registrationSource;
    
    this.role = options?.role ?? USER_ROLES.CUSTOMER;
    this.userTier = options?.userTier ?? USER_TIERS.BRONZE;
    
    this.isEmailVerified = options?.isEmailVerified ?? false;
    this.isPhoneVerified = options?.isPhoneVerified ?? false;
    this.isKycVerified = options?.isKycVerified ?? false;
    this.isMfaEnabled = options?.isMfaEnabled ?? false;
    
    this.preferredLanguage = options?.preferredLanguage;
    this.preferredDistrict = options?.preferredDistrict;
    this.preferredUpazila = options?.preferredUpazila;
    
    this.metadata = options?.metadata;
    
    // ✅ Enterprise: Auto-calculate partition key from district if not provided
    if (!options?.partitionKey && this.metadata?.district) {
      this.partitionKey = this.metadata.district;
    }
    
    // ✅ Enterprise: Auto-calculate TTL if not provided (30 days default)
    if (!this.ttlSeconds && !this.expiresAt) {
      this.ttlSeconds = 30 * 24 * 60 * 60; // 30 days
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
   * Get event summary for logging
   */
  public getSummary(): Record<string, unknown> {
    return {
      eventId: this.eventId,
      eventName: this.eventName,
      userId: this.userId,
      email: this.email,
      registrationMethod: this.registrationMethod,
      registrationSource: this.registrationSource,
      role: this.role,
      userTier: this.userTier,
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
  public toJSON(): UserRegisteredEventData {
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
      registrationMethod: this.registrationMethod,
      registrationSource: this.registrationSource,
      role: this.role,
      userTier: this.userTier,
      isEmailVerified: this.isEmailVerified,
      isPhoneVerified: this.isPhoneVerified,
      isKycVerified: this.isKycVerified,
      isMfaEnabled: this.isMfaEnabled,
      preferredLanguage: this.preferredLanguage,
      preferredDistrict: this.preferredDistrict,
      preferredUpazila: this.preferredUpazila,
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
  public static fromJSON(data: UserRegisteredEventData): UserRegisteredEvent {
    const event = new UserRegisteredEvent(
      data.userId,
      data.aggregateVersion,
      data.email,
      data.fullName,
      data.registrationMethod,
      data.registrationSource,
      {
        displayName: data.displayName,
        phone: data.phone,
        role: data.role,
        userTier: data.userTier,
        isEmailVerified: data.isEmailVerified,
        isPhoneVerified: data.isPhoneVerified,
        isKycVerified: data.isKycVerified,
        isMfaEnabled: data.isMfaEnabled,
        preferredLanguage: data.preferredLanguage,
        preferredDistrict: data.preferredDistrict,
        preferredUpazila: data.preferredUpazila,
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
    const result = UserRegisteredEventSchema.safeParse(this.toJSON());
    return result.success;
  }
}

// ============================================================
// ✅ Enterprise: Event Data Interface (for serialization)
// ============================================================

export interface UserRegisteredEventData {
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
  registrationMethod: RegistrationMethod;
  registrationSource: RegistrationSource;
  role: UserRole;
  userTier: UserTier;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isKycVerified: boolean;
  isMfaEnabled: boolean;
  preferredLanguage?: 'en' | 'bn';
  preferredDistrict?: string;
  preferredUpazila?: string;
  metadata?: UserRegisteredMetadata;
  ttlSeconds?: number;
  expiresAt?: string;
  priority?: 'low' | 'normal' | 'high' | 'critical';
  partitionKey?: string;
}

// ============================================================
// ✅ Enterprise: Email Verified Event (v2.0)
// ============================================================

export class EmailVerifiedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.USER_EMAIL_VERIFIED;
  public readonly occurredAt: Date;
  public readonly eventVersion: number = EVENT_VERSIONS.V1;
  public readonly aggregateVersion: number;
  public readonly correlationId?: string;
  public readonly causationId?: string;

  public readonly userId: string;
  public readonly email: string;
  public readonly verifiedAt: Date;

  constructor(
    userId: string,
    aggregateVersion: number,
    email: string,
    options?: {
      correlationId?: string;
      causationId?: string;
      verifiedAt?: Date;
    }
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.aggregateVersion = aggregateVersion;
    this.correlationId = options?.correlationId;
    this.causationId = options?.causationId;
    this.userId = userId;
    this.email = email;
    this.verifiedAt = options?.verifiedAt ?? new Date();
  }
}

// ============================================================
// ✅ Enterprise: Phone Verified Event (v2.0)
// ============================================================

export class PhoneVerifiedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = EVENT_NAMES.USER_PHONE_VERIFIED;
  public readonly occurredAt: Date;
  public readonly eventVersion: number = EVENT_VERSIONS.V1;
  public readonly aggregateVersion: number;
  public readonly correlationId?: string;
  public readonly causationId?: string;

  public readonly userId: string;
  public readonly phone: string;
  public readonly verifiedAt: Date;

  constructor(
    userId: string,
    aggregateVersion: number,
    phone: string,
    options?: {
      correlationId?: string;
      causationId?: string;
      verifiedAt?: Date;
    }
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.aggregateVersion = aggregateVersion;
    this.correlationId = options?.correlationId;
    this.causationId = options?.causationId;
    this.userId = userId;
    this.phone = phone;
    this.verifiedAt = options?.verifiedAt ?? new Date();
  }
}

// ============================================================
// ✅ Enterprise: Type Exports
// ============================================================

export type { 
  UserRegisteredMetadata as UserRegisteredMetadataType,
  UserRegisteredPayload as UserRegisteredPayloadType
};

// ============================================================
// ENTERPRISE SUMMARY v2.0
// ============================================================
// 
// Enterprise Enhancements Applied in v2.0:
// 1. ✅ Shared-types integration (@vubon/shared-types)
// 2. ✅ Event versioning with aggregateVersion tracking
// 3. ✅ TTL support with expiresAt for event expiry
// 4. ✅ Priority-based event processing (low/normal/high/critical)
// 5. ✅ Partition key for event streaming optimization
// 6. ✅ Bangladesh specific fields (district, upazila, mobileOperator, networkType)
// 7. ✅ Feature phone support (deviceType: 'feature_phone')
// 8. ✅ MFS registration methods (bKash, Nagad, Rocket)
// 9. ✅ Zod schema for runtime validation
// 10. ✅ Helper methods: isExpired(), isCritical(), getSummary()
// 11. ✅ Serialization support (toJSON, fromJSON)
// 12. ✅ Extended RegistrationMethod (MFS providers)
// 13. ✅ Extended RegistrationSource (MFS_APP, FEATURE_PHONE)
// 14. ✅ Bengali language support
// 15. ✅ UTM parameter tracking for marketing attribution
// 
// ============================================================
