/**
 * User Registered Event - Pure Domain/Application Event
 * 
 * @module application/events/user-registered.event
 * 
 * @description
 * Event emitted when a new user successfully registers.
 * Used for welcome emails, analytics, audit logging, and downstream services.
 * 
 * Enterprise Rules:
 * ✅ Immutable event data
 * ✅ No business logic
 * ✅ No side effects
 * ✅ Event ID for tracing
 * ✅ Correlation ID for distributed tracing
 * ✅ Tracks registration method and source
 */

import { randomUUID } from 'crypto';

/**
 * Base Domain Event Interface
 */
export interface DomainEvent {
  readonly eventId: string;
  readonly eventName: string;
  readonly occurredAt: Date;
  readonly version: number;
  readonly correlationId?: string;
  readonly causationId?: string;
}

/**
 * Registration Method Enum
 */
export enum RegistrationMethod {
  EMAIL_PASSWORD = 'EMAIL_PASSWORD',     // Standard email/password registration
  SOCIAL_GOOGLE = 'SOCIAL_GOOGLE',       // Google OAuth registration
  SOCIAL_FACEBOOK = 'SOCIAL_FACEBOOK',   // Facebook OAuth registration
  SOCIAL_GITHUB = 'SOCIAL_GITHUB',       // GitHub OAuth registration
  SOCIAL_APPLE = 'SOCIAL_APPLE',         // Apple OAuth registration
  SOCIAL_WHATSAPP = 'SOCIAL_WHATSAPP',   // WhatsApp OAuth (Bangladesh)
  SOCIAL_IMO = 'SOCIAL_IMO',             // Imo OAuth (Bangladesh)
  ADMIN_CREATED = 'ADMIN_CREATED',       // Admin manually created user
  API_CREATED = 'API_CREATED',           // API programmatic creation
  INVITE = 'INVITE',                     // User registered via invite
}

/**
 * Registration Source Enum
 */
export enum RegistrationSource {
  WEB = 'WEB',               // Web browser registration
  MOBILE_APP = 'MOBILE_APP', // Mobile app registration
  ADMIN_PORTAL = 'ADMIN_PORTAL', // Admin portal creation
  API = 'API',               // API registration
  SOCIAL = 'SOCIAL',         // Social login registration
}

/**
 * User Registered Event
 * 
 * Emitted when a user successfully registers
 * 
 * @example
 * // Standard email registration
 * const event = new UserRegisteredEvent(
 *   'usr_123',
 *   'user@example.com',
 *   'John Doe',
 *   RegistrationMethod.EMAIL_PASSWORD,
 *   RegistrationSource.WEB,
 *   'req_abc123',
 *   '192.168.1.100',
 *   'device_456',
 *   'Mozilla/5.0...',
 *   false,  // email not verified
 *   undefined,
 *   { referrer: 'google', utm_source: 'facebook' }
 * );
 * 
 * @example
 * // Social registration with Google
 * const event = new UserRegisteredEvent(
 *   'usr_123',
 *   'user@gmail.com',
 *   'John Doe',
 *   RegistrationMethod.SOCIAL_GOOGLE,
 *   RegistrationSource.SOCIAL,
 *   'req_abc123',
 *   '192.168.1.100',
 *   'device_456',
 *   'Mozilla/5.0...',
 *   true,  // email verified by Google
 *   'google-id-12345',
 *   { picture: 'https://...' }
 * );
 */
export class UserRegisteredEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = 'user.registered';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  // Core user information
  public readonly userId: string;
  public readonly email: string;
  public readonly fullName: string;
  
  // Registration context
  public readonly registrationMethod: RegistrationMethod;
  public readonly registrationSource: RegistrationSource;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  
  // Security context
  public readonly ipAddress?: string;
  public readonly deviceId?: string;
  public readonly userAgent?: string;
  
  // Verification status
  public readonly isEmailVerified: boolean;
  public readonly isPhoneVerified: boolean;
  
  // Additional metadata
  public readonly phone?: string;
  public readonly role?: string;
  public readonly referrer?: string;
  public readonly metadata?: Record<string, unknown>;

  constructor(
    userId: string,
    email: string,
    fullName: string,
    registrationMethod: RegistrationMethod,
    registrationSource: RegistrationSource,
    correlationId?: string,
    causationId?: string,
    ipAddress?: string,
    deviceId?: string,
    userAgent?: string,
    isEmailVerified: boolean = false,
    isPhoneVerified: boolean = false,
    phone?: string,
    role: string = 'USER',
    referrer?: string,
    metadata?: Record<string, unknown>
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.userId = userId;
    this.email = email;
    this.fullName = fullName;
    this.registrationMethod = registrationMethod;
    this.registrationSource = registrationSource;
    this.correlationId = correlationId;
    this.causationId = causationId;
    this.ipAddress = ipAddress;
    this.deviceId = deviceId;
    this.userAgent = userAgent;
    this.isEmailVerified = isEmailVerified;
    this.isPhoneVerified = isPhoneVerified;
    this.phone = phone;
    this.role = role;
    this.referrer = referrer;
    this.metadata = metadata;
  }
}

/**
 * User Registered Event Data Interface
 * For event serialization/deserialization
 */
export interface UserRegisteredEventData {
  userId: string;
  email: string;
  fullName: string;
  registrationMethod: RegistrationMethod;
  registrationSource: RegistrationSource;
  correlationId?: string;
  causationId?: string;
  ipAddress?: string;
  deviceId?: string;
  userAgent?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  phone?: string;
  role?: string;
  referrer?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Email Verified Event
 * Separate event for when user verifies email after registration
 */
export class EmailVerifiedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = 'user.email_verified';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  public readonly userId: string;
  public readonly email: string;
  public readonly verifiedAt: Date;
  public readonly correlationId?: string;

  constructor(
    userId: string,
    email: string,
    correlationId?: string,
    verifiedAt?: Date
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.userId = userId;
    this.email = email;
    this.verifiedAt = verifiedAt || new Date();
    this.correlationId = correlationId;
  }
}

/**
 * Phone Verified Event
 */
export class PhoneVerifiedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = 'user.phone_verified';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  public readonly userId: string;
  public readonly phone: string;
  public readonly verifiedAt: Date;
  public readonly correlationId?: string;

  constructor(
    userId: string,
    phone: string,
    correlationId?: string,
    verifiedAt?: Date
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.userId = userId;
    this.phone = phone;
    this.verifiedAt = verifiedAt || new Date();
    this.correlationId = correlationId;
  }
}
