/**
 * User Logged In Event - Pure Domain/Application Event
 * 
 * @module application/events/user-logged-in.event
 * 
 * @description
 * Event emitted when a user successfully logs in.
 * Used for security monitoring, audit logging, and analytics.
 * 
 * Enterprise Rules:
 * ✅ Immutable event data
 * ✅ No business logic
 * ✅ No side effects
 * ✅ Event ID for tracing
 * ✅ Correlation ID for distributed tracing
 * ✅ Tracks login method and security context
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
 * Login Method Enum
 */
export enum LoginMethod {
  PASSWORD = 'PASSWORD',           // Email/Password login
  SOCIAL_GOOGLE = 'SOCIAL_GOOGLE', // Google OAuth
  SOCIAL_FACEBOOK = 'SOCIAL_FACEBOOK', // Facebook OAuth
  SOCIAL_GITHUB = 'SOCIAL_GITHUB', // GitHub OAuth
  SOCIAL_APPLE = 'SOCIAL_APPLE',   // Apple OAuth
  SOCIAL_WHATSAPP = 'SOCIAL_WHATSAPP', // WhatsApp OAuth (Bangladesh)
  SOCIAL_IMO = 'SOCIAL_IMO',       // Imo OAuth (Bangladesh)
  MFA_RECOVERY = 'MFA_RECOVERY',   // Login with MFA recovery code
  MAGIC_LINK = 'MAGIC_LINK',       // Passwordless magic link
  API_KEY = 'API_KEY',             // API key authentication
  REFRESH_TOKEN = 'REFRESH_TOKEN', // Refresh token login
}

/**
 * Login Type Enum
 */
export enum LoginType {
  INITIAL = 'INITIAL',       // First login of session
  MFA_VERIFIED = 'MFA_VERIFIED', // After MFA verification
  SESSION_REFRESH = 'SESSION_REFRESH', // Session refresh
}

/**
 * User Logged In Event
 * 
 * Emitted when a user successfully authenticates
 * 
 * @example
 * // Standard password login
 * const event = new UserLoggedInEvent(
 *   'usr_123',
 *   LoginMethod.PASSWORD,
 *   LoginType.INITIAL,
 *   'sess_456',
 *   'req_abc123',
 *   '192.168.1.100',
 *   'device_789',
 *   'Mozilla/5.0...',
 *   { rememberMe: true }
 * );
 * 
 * @example
 * // Social login with Google
 * const event = new UserLoggedInEvent(
 *   'usr_123',
 *   LoginMethod.SOCIAL_GOOGLE,
 *   LoginType.INITIAL,
 *   'sess_456',
 *   'req_abc123',
 *   '192.168.1.100',
 *   'device_789',
 *   'Mozilla/5.0...',
 *   { provider: 'google', email: 'user@gmail.com' }
 * );
 * 
 * @example
 * // MFA verification after initial login
 * const event = new UserLoggedInEvent(
 *   'usr_123',
 *   LoginMethod.PASSWORD,
 *   LoginType.MFA_VERIFIED,
 *   'sess_456',
 *   'req_abc123',
 *   '192.168.1.100',
 *   'device_789',
 *   'Mozilla/5.0...',
 *   { mfaMethod: 'TOTP', verificationTime: 5.2 }
 * );
 */
export class UserLoggedInEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = 'user.logged_in';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  // Event-specific properties
  public readonly userId: string;
  public readonly loginMethod: LoginMethod;
  public readonly loginType: LoginType;
  public readonly sessionId?: string;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly ipAddress?: string;
  public readonly deviceId?: string;
  public readonly userAgent?: string;
  public readonly location?: string;  // City/Country from IP
  public readonly isNewDevice: boolean;
  public readonly isNewLocation: boolean;
  public readonly metadata?: Record<string, unknown>;

  constructor(
    userId: string,
    loginMethod: LoginMethod,
    loginType: LoginType,
    correlationId?: string,
    causationId?: string,
    ipAddress?: string,
    deviceId?: string,
    userAgent?: string,
    sessionId?: string,
    location?: string,
    isNewDevice: boolean = false,
    isNewLocation: boolean = false,
    metadata?: Record<string, unknown>
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.userId = userId;
    this.loginMethod = loginMethod;
    this.loginType = loginType;
    this.correlationId = correlationId;
    this.causationId = causationId;
    this.ipAddress = ipAddress;
    this.deviceId = deviceId;
    this.userAgent = userAgent;
    this.sessionId = sessionId;
    this.location = location;
    this.isNewDevice = isNewDevice;
    this.isNewLocation = isNewLocation;
    this.metadata = metadata;
  }
}

/**
 * User Logged In Event Data Interface
 * For event serialization/deserialization
 */
export interface UserLoggedInEventData {
  userId: string;
  loginMethod: LoginMethod;
  loginType: LoginType;
  sessionId?: string;
  correlationId?: string;
  causationId?: string;
  ipAddress?: string;
  deviceId?: string;
  userAgent?: string;
  location?: string;
  isNewDevice: boolean;
  isNewLocation: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * User Login Failed Event (for completeness)
 */
export class UserLoginFailedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = 'user.login_failed';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  public readonly email: string;
  public readonly reason: string;
  public readonly ipAddress?: string;
  public readonly deviceId?: string;
  public readonly userAgent?: string;
  public readonly correlationId?: string;

  constructor(
    email: string,
    reason: string,
    correlationId?: string,
    ipAddress?: string,
    deviceId?: string,
    userAgent?: string
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.email = email;
    this.reason = reason;
    this.correlationId = correlationId;
    this.ipAddress = ipAddress;
    this.deviceId = deviceId;
    this.userAgent = userAgent;
  }
}

/**
 * User Logged Out Event
 */
export class UserLoggedOutEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = 'user.logged_out';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  public readonly userId: string;
  public readonly sessionId?: string;
  public readonly reason?: string;
  public readonly correlationId?: string;

  constructor(
    userId: string,
    correlationId?: string,
    sessionId?: string,
    reason?: string
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.userId = userId;
    this.correlationId = correlationId;
    this.sessionId = sessionId;
    this.reason = reason;
  }
}
