/**
 * User Registered Event - Pure Domain Event (Enterprise Grade)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module application/events/user-registered.event
 *
 * @description
 * Domain event representing successful user registration.
 * Contains all necessary data for downstream event handlers (welcome email, SMS, analytics, etc.).
 * Follows DDD event patterns for loose coupling between bounded contexts.
 *
 * Enterprise Rules:
 * ✅ Immutable event data
 * ✅ Extends BaseDomainEvent for consistency
 * ✅ Contains all relevant registration context
 * ✅ Bangladesh specific fields (phone, district, operator, etc.)
 * ✅ Correlation ID for distributed tracing
 * ✅ SSOT: Types from shared-types, Constants from shared-constants
 * ✅ No infrastructure dependencies
 * ✅ Event versioning for future evolution
 *
 * @example
 * // Publishing the event
 * const event = new UserRegisteredEvent({
 *   userId: '123e4567-e89b-12d3-a456-426614174000',
 *   email: 'user@vubon.com.bd',
 *   fullName: 'John Doe',
 *   phone: '+8801712345678',
 *   registrationSource: 'WEB',
 *   correlationId: 'corr_abc123',
 *   metadata: { ipAddress: '192.168.1.100' }
 * });
 * await eventBus.publish(event);
 *
 * // Handling the event
 * @EventHandler(UserRegisteredEvent)
 * export class SendWelcomeEmailHandler {
 *   async handle(event: UserRegisteredEvent): Promise<void> {
 *     // Send welcome email
 *   }
 * }
 */

// ============================================================
// Shared Packages Import (SSOT)
// ============================================================

import type {
  UserRole,
  UserStatus,
  UserTier,
  BangladeshDistrict,
  BangladeshUpazila,
  UserMobileOperator,
  UserNetworkType,
  RegistrationSource,
  RegistrationMethod,
} from '@vubon/shared-constants';
import { USER_ROLES } from '@vubon/shared-constants';


import type {
  DomainEvent,
} from '@vubon/shared-types';

// ============================================================
// Base Domain Event (Local copy for domain purity)
// ============================================================

/**
 * Abstract base domain event (matching BaseDomainEvent from domain layer)
 * This ensures the event is self-contained and framework-free
 */
abstract class BaseDomainEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly occurredOn: Date;
  public readonly metadata: Readonly<Record<string, unknown>>;

  constructor(
    public readonly eventType: string,
    public readonly aggregateId: string,
    public readonly version: number,
    metadata?: Record<string, unknown>,
  ) {
    this.eventId = this.generateEventId();
    this.occurredOn = new Date();
    this.metadata = metadata ? Object.freeze({ ...metadata }) : Object.freeze({});
  }

  private generateEventId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 10);
    const counter = (this.constructor as any).counter || 0;
    (this.constructor as any).counter = counter + 1;
    return `evt_${timestamp}_${random}_${counter}`;
  }
}

// ============================================================
// User Registered Event Data Interface
// ============================================================

/**
 * User registration data with Bangladesh-specific fields
 */
export interface UserRegisteredEventData {
  /** User's unique identifier */
  userId: string;

  /** User's email address */
  email: string;

  /** User's full name */
  fullName: string;

  /** User's phone number (E.164 format, if provided) */
  phone?: string | undefined;

  /** User's display name (if provided) */
  displayName?: string | undefined;

  /** User's role (CUSTOMER, VENDOR, etc.) */
  role: UserRole;

  /** User's tier (BRONZE, SILVER, etc.) */
  tier: UserTier;

  /** User's status (PENDING_VERIFICATION, ACTIVE, etc.) */
  status: UserStatus;

  /** Whether email is verified (always false on registration) */
  isEmailVerified: boolean;

  /** Whether phone is verified (always false on registration) */
  isPhoneVerified: boolean;

  /** Whether KYC is verified (always false on registration) */
  isKycVerified: boolean;

  /** Whether MFA is enabled (always false on registration) */
  mfaEnabled: boolean;

  /** User's preferred language (en or bn) */
  preferredLanguage: 'en' | 'bn';

  /** Preferred district (Bangladesh specific) */
  preferredDistrict?: BangladeshDistrict | undefined;

  /** Preferred upazila (Bangladesh specific) */
  preferredUpazila?: BangladeshUpazila | undefined;

  /** Preferred mobile operator (Bangladesh specific) */
  preferredOperator?: UserMobileOperator | undefined;

  /** Mobile network type (Bangladesh specific) */
  mobileNetworkType?: UserNetworkType | undefined;

  /** Registration method (EMAIL, PHONE, SOCIAL, OTP, USERNAME) */
  registrationMethod: RegistrationMethod;

  /** Registration source (WEB, MOBILE_APP, API, ADMIN, SOCIAL, etc.) */
  registrationSource: RegistrationSource;

  /** Referral code used (if any) */
  referralCode?: string | undefined;

  /** User ID who referred this user (if any) */
  referredBy?: string | undefined;

  /** Whether marketing consent was given */
  marketingConsent: boolean;

  /** Whether WhatsApp consent was given (Bangladesh specific) */
  whatsappConsent: boolean;

  /** Whether SMS consent was given */
  smsConsent: boolean;

  /** Whether email consent was given */
  emailConsent: boolean;

  /** Whether user age was provided (for age verification) */
  ageProvided: boolean;

  /** User's age (if provided) */
  age?: number | undefined;

  /** Whether user accepted terms and conditions */
  acceptedTerms: boolean;

  /** Whether user accepted privacy policy */
  acceptedPrivacy: boolean;

  /** CAPTCHA verified (if applicable) */
  captchaVerified: boolean;

  /** Correlation ID for distributed tracing */
  correlationId: string;

  /** Client IP address */
  ipAddress?: string | undefined;

  /** User agent string */
  userAgent?: string | undefined;

  /** Device ID for fingerprinting */
  deviceId?: string | undefined;

  /** Device fingerprint */
  deviceFingerprint?: string | undefined;

  /** Additional metadata for event handlers */
  metadata?: Record<string, unknown> | undefined;

  /** Event version for future schema evolution */
  eventVersion: number;

  /** Timestamp when the event was created (ISO string) */
  timestamp: string;
}

// ============================================================
// User Registered Event Class
// ============================================================

/**
 * User Registered Domain Event
 *
 * Published when a new user successfully registers.
 * Contains comprehensive data for all downstream handlers.
 *
 * @example
 * // Creating the event
 * const event = UserRegisteredEvent.fromUser(user, {
 *   registrationSource: 'WEB',
 *   correlationId: 'corr_abc123',
 *   ipAddress: '192.168.1.100',
 * });
 */
export class UserRegisteredEvent extends BaseDomainEvent {
  public readonly eventType: string = 'user.registered';
  public readonly eventVersion: number = 1;

  // ============================================================
  // Event Data
  // ============================================================

  public readonly userId: string;
  public readonly email: string;
  public readonly fullName: string;
  public readonly phone?: string | undefined;
  public readonly displayName?: string | undefined;
  public readonly role: UserRole;
  public readonly tier: UserTier;
  public readonly status: UserStatus;
  public readonly isEmailVerified: boolean;
  public readonly isPhoneVerified: boolean;
  public readonly isKycVerified: boolean;
  public readonly mfaEnabled: boolean;
  public readonly preferredLanguage: 'en' | 'bn';
  public readonly preferredDistrict?: BangladeshDistrict | undefined;
  public readonly preferredUpazila?: BangladeshUpazila | undefined;
  public readonly preferredOperator?: UserMobileOperator | undefined;
  public readonly mobileNetworkType?: UserNetworkType | undefined;
  public readonly registrationMethod: RegistrationMethod;
  public readonly registrationSource: RegistrationSource;
  public readonly referralCode?: string | undefined;
  public readonly referredBy?: string | undefined;
  public readonly marketingConsent: boolean;
  public readonly whatsappConsent: boolean;
  public readonly smsConsent: boolean;
  public readonly emailConsent: boolean;
  public readonly ageProvided: boolean;
  public readonly age?: number | undefined;
  public readonly acceptedTerms: boolean;
  public readonly acceptedPrivacy: boolean;
  public readonly captchaVerified: boolean;
  public readonly correlationId: string;
  public readonly ipAddress?: string | undefined;
  public readonly userAgent?: string | undefined;
  public readonly deviceId?: string | undefined;
  public readonly deviceFingerprint?: string | undefined;
  public readonly eventMetadata: Readonly<Record<string, unknown>>;
  public readonly timestamp: string;

  constructor(data: UserRegisteredEventData) {
    super(
      'user.registered',
      data.userId,
      1,
      {
        correlationId: data.correlationId,
        source: data.registrationSource,
        ipAddress: data.ipAddress,
        ...data.metadata,
      },
    );

    // Core fields
    this.userId = data.userId;
    this.email = data.email;
    this.fullName = data.fullName;
    this.phone = data.phone;
    this.displayName = data.displayName;
    this.role = data.role;
    this.tier = data.tier;
    this.status = data.status;
    this.isEmailVerified = data.isEmailVerified;
    this.isPhoneVerified = data.isPhoneVerified;
    this.isKycVerified = data.isKycVerified;
    this.mfaEnabled = data.mfaEnabled;
    this.preferredLanguage = data.preferredLanguage;
    this.preferredDistrict = data.preferredDistrict;
    this.preferredUpazila = data.preferredUpazila;
    this.preferredOperator = data.preferredOperator;
    this.mobileNetworkType = data.mobileNetworkType;
    this.registrationMethod = data.registrationMethod;
    this.registrationSource = data.registrationSource;
    this.referralCode = data.referralCode;
    this.referredBy = data.referredBy;
    this.marketingConsent = data.marketingConsent;
    this.whatsappConsent = data.whatsappConsent;
    this.smsConsent = data.smsConsent;
    this.emailConsent = data.emailConsent;
    this.ageProvided = data.ageProvided;
    this.age = data.age;
    this.acceptedTerms = data.acceptedTerms;
    this.acceptedPrivacy = data.acceptedPrivacy;
    this.captchaVerified = data.captchaVerified;
    this.correlationId = data.correlationId;
    this.ipAddress = data.ipAddress;
    this.userAgent = data.userAgent;
    this.deviceId = data.deviceId;
    this.deviceFingerprint = data.deviceFingerprint;
    this.eventMetadata = data.metadata ? Object.freeze({ ...data.metadata }) : Object.freeze({});
    this.timestamp = data.timestamp || new Date().toISOString();
    this.eventVersion = data.eventVersion || 1;
  }

  // ============================================================
  // Factory Methods
  // ============================================================

  /**
   * Create event from User entity and registration context
   */
  public static fromUser(
    user: any, // User entity (will be properly typed when entity is complete)
    context: {
      registrationMethod: RegistrationMethod;
      registrationSource: RegistrationSource;
      correlationId: string;
      ipAddress?: string | undefined;
      userAgent?: string | undefined;
      deviceId?: string | undefined;
      deviceFingerprint?: string | undefined;
      referralCode?: string | undefined;
      referredBy?: string | undefined;
      captchaVerified?: boolean | undefined;
      marketingConsent?: boolean | undefined;
      whatsappConsent?: boolean | undefined;
      smsConsent?: boolean | undefined;
      emailConsent?: boolean | undefined;
      metadata?: Record<string, unknown> | undefined;
      acceptedTerms?: boolean | undefined;
      acceptedPrivacy?: boolean | undefined;
      age?: number | undefined;
    },
  ): UserRegisteredEvent {
    const data: UserRegisteredEventData = {
      userId: user.id,
      email: user.getEmail().getValue(),
      fullName: user.getFullName(),
      phone: user.getPhone()?.getValue(),
      displayName: user.getDisplayName(),
      role: user.getRole(),
      tier: user.getTier(),
      status: user.getStatus(),
      isEmailVerified: user.isEmailVerified(),
      isPhoneVerified: user.isPhoneVerified(),
      isKycVerified: user.isKycVerified(),
      mfaEnabled: user.isMfaEnabled(),
      preferredLanguage: user.getPreferredLanguage() || 'en',
      preferredDistrict: user.getPreferredDistrict(),
      preferredUpazila: user.getPreferredUpazila(),
      preferredOperator: user.getPreferredOperator(),
      mobileNetworkType: user.getMobileNetworkType(),
      registrationMethod: context.registrationMethod,
      registrationSource: context.registrationSource,
      referralCode: context.referralCode,
      referredBy: context.referredBy,
      marketingConsent: context.marketingConsent || false,
      whatsappConsent: context.whatsappConsent || false,
      smsConsent: context.smsConsent || false,
      emailConsent: context.emailConsent || false,
      ageProvided: !!context.age,
      age: context.age,
      acceptedTerms: context.acceptedTerms || false,
      acceptedPrivacy: context.acceptedPrivacy || false,
      captchaVerified: context.captchaVerified || false,
      correlationId: context.correlationId,
      ipAddress: context.ipAddress,
      userAgent: context.userAgent,
      deviceId: context.deviceId,
      deviceFingerprint: context.deviceFingerprint,
      metadata: context.metadata,
      eventVersion: 1,
      timestamp: new Date().toISOString(),
    };

    return new UserRegisteredEvent(data);
  }

  /**
   * Create event from registration command and user data
   */
  public static fromCommand(
    command: any, // RegisterUserCommand (will be properly typed)
    user: any, // User entity
    correlationId: string,
  ): UserRegisteredEvent {
    const registrationMethod = command.registrationMethod || 'EMAIL';

    return UserRegisteredEvent.fromUser(user, {
      registrationMethod,
      registrationSource: command.deviceInfo?.source || 'WEB',
      correlationId,
      ipAddress: command.getIpAddress(),
      userAgent: command.getUserAgent(),
      deviceId: command.getDeviceId(),
      deviceFingerprint: command.getDeviceFingerprint(),
      referralCode: command.getReferralCode(),
      referredBy: undefined, // Will be set if referral service validates
      captchaVerified: command.hasCaptcha(),
      marketingConsent: command.hasMarketingConsent(),
      whatsappConsent: command.hasWhatsAppConsent(),
      smsConsent: command.preferences?.smsConsent,
      emailConsent: command.preferences?.emailConsent,
      acceptedTerms: command.hasAcceptedTerms(),
      acceptedPrivacy: command.hasAcceptedPrivacy(),
      age: command.preferences?.age,
      metadata: {
        deviceInfo: command.deviceInfo,
        preferences: command.preferences,
      },
    });
  }

  // ============================================================
  // Instance Methods
  // ============================================================

  /**
   * Get masked email for logging/audit
   */
  public getMaskedEmail(): string {
    return this.maskEmail(this.email);
  }

  /**
   * Get masked phone for logging/audit
   */
  public getMaskedPhone(): string | undefined {
    if (!this.phone) return undefined;
    return this.maskPhone(this.phone);
  }

  /**
   * Check if this event is for a Bangladesh user
   */
  public isBangladeshUser(): boolean {
    return !!(
      this.preferredDistrict ||
      this.preferredOperator ||
      this.phone?.startsWith('+880') ||
      this.preferredLanguage === 'bn'
    );
  }

  /**
   * Get user's full name or fallback
   */
  public getDisplayName(): string {
    return this.displayName || this.fullName.split(' ')[0] || 'User';
  }

 /**
 * Check if user is a vendor (requires additional verification)
 */
public isVendor(): boolean {
  // ✅ সঠিক উপায়: কনস্ট্যান্টের সাথে তুলনা করুন
  return this.role === USER_ROLES.VENDOR || this.role === USER_ROLES.ADMIN;
}

  // ============================================================
  // Private Helpers
  // ============================================================

  private maskEmail(email: string): string {
    const [localPart, domain] = email.split('@');
    if (!localPart || !domain) return email;
    if (localPart.length <= 2) {
      return `${localPart}***@${domain}`;
    }
    const first = localPart[0];
    const last = localPart[localPart.length - 1];
    return `${first}***${last}@${domain}`;
  }

  private maskPhone(phone: string): string {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length < 8) return phone;
    const prefix = cleaned.slice(0, 4);
    const suffix = cleaned.slice(-2);
    return `${prefix}******${suffix}`;
  }

  // ============================================================
  // Serialization
  // ============================================================

  /**
   * Convert event to plain object for storage/transport
   */
  public toJSON(): Record<string, unknown> {
    return {
      eventType: this.eventType,
      eventVersion: this.eventVersion,
      aggregateId: this.aggregateId,
      eventId: this.eventId,
      occurredOn: this.occurredOn.toISOString(),
      timestamp: this.timestamp,
      correlationId: this.correlationId,
      userId: this.userId,
      email: this.email,
      fullName: this.fullName,
      phone: this.phone,
      displayName: this.displayName,
      role: this.role,
      tier: this.tier,
      status: this.status,
      isEmailVerified: this.isEmailVerified,
      isPhoneVerified: this.isPhoneVerified,
      isKycVerified: this.isKycVerified,
      mfaEnabled: this.mfaEnabled,
      preferredLanguage: this.preferredLanguage,
      preferredDistrict: this.preferredDistrict,
      preferredUpazila: this.preferredUpazila,
      preferredOperator: this.preferredOperator,
      mobileNetworkType: this.mobileNetworkType,
      registrationMethod: this.registrationMethod,
      registrationSource: this.registrationSource,
      referralCode: this.referralCode,
      referredBy: this.referredBy,
      marketingConsent: this.marketingConsent,
      whatsappConsent: this.whatsappConsent,
      smsConsent: this.smsConsent,
      emailConsent: this.emailConsent,
      ageProvided: this.ageProvided,
      age: this.age,
      acceptedTerms: this.acceptedTerms,
      acceptedPrivacy: this.acceptedPrivacy,
      captchaVerified: this.captchaVerified,
      ipAddress: this.ipAddress,
      userAgent: this.userAgent,
      deviceId: this.deviceId,
      deviceFingerprint: this.deviceFingerprint,
      metadata: this.eventMetadata,
    };
  }

  /**
   * Reconstruct event from plain object
   */
  public static fromJSON(data: Record<string, unknown>): UserRegisteredEvent {
    return new UserRegisteredEvent({
      userId: String(data.userId),
      email: String(data.email),
      fullName: String(data.fullName),
      phone: data.phone ? String(data.phone) : undefined,
      displayName: data.displayName ? String(data.displayName) : undefined,
      role: data.role as UserRole,
      tier: data.tier as UserTier,
      status: data.status as UserStatus,
      isEmailVerified: Boolean(data.isEmailVerified),
      isPhoneVerified: Boolean(data.isPhoneVerified),
      isKycVerified: Boolean(data.isKycVerified),
      mfaEnabled: Boolean(data.mfaEnabled),
      preferredLanguage: (data.preferredLanguage as 'en' | 'bn') || 'en',
      preferredDistrict: data.preferredDistrict as BangladeshDistrict | undefined,
      preferredUpazila: data.preferredUpazila as BangladeshUpazila | undefined,
      preferredOperator: data.preferredOperator as UserMobileOperator | undefined,
      mobileNetworkType: data.mobileNetworkType as UserNetworkType | undefined,
      registrationMethod: data.registrationMethod as RegistrationMethod,
      registrationSource: data.registrationSource as RegistrationSource,
      referralCode: data.referralCode ? String(data.referralCode) : undefined,
      referredBy: data.referredBy ? String(data.referredBy) : undefined,
      marketingConsent: Boolean(data.marketingConsent),
      whatsappConsent: Boolean(data.whatsappConsent),
      smsConsent: Boolean(data.smsConsent),
      emailConsent: Boolean(data.emailConsent),
      ageProvided: Boolean(data.ageProvided),
      age: data.age ? Number(data.age) : undefined,
      acceptedTerms: Boolean(data.acceptedTerms),
      acceptedPrivacy: Boolean(data.acceptedPrivacy),
      captchaVerified: Boolean(data.captchaVerified),
      correlationId: String(data.correlationId || data.eventId),
      ipAddress: data.ipAddress ? String(data.ipAddress) : undefined,
      userAgent: data.userAgent ? String(data.userAgent) : undefined,
      deviceId: data.deviceId ? String(data.deviceId) : undefined,
      deviceFingerprint: data.deviceFingerprint ? String(data.deviceFingerprint) : undefined,
      metadata: data.metadata as Record<string, unknown> | undefined,
      eventVersion: Number(data.eventVersion) || 1,
      timestamp: String(data.timestamp || data.occurredOn || new Date().toISOString()),
    });
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { UserRegisteredEventData as UserRegisteredEventDataType };
