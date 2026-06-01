/**
 * Social Account Linked Event - Pure Domain/Application Event
 * 
 * @module application/events/social-account-linked.event
 * 
 * @description
 * Event emitted when a social account is linked to an existing user account.
 * Used for audit logging, security monitoring, and analytics.
 * 
 * Enterprise Rules:
 * ✅ Immutable event data
 * ✅ No business logic
 * ✅ No side effects
 * ✅ Event ID for tracing
 * ✅ Correlation ID for distributed tracking
 * ✅ Tracks linking method and source
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
 * Social Provider Enum (matching domain)
 */
export enum SocialProvider {
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
  GITHUB = 'GITHUB',
  APPLE = 'APPLE',
  TWITTER = 'TWITTER',
  LINKEDIN = 'LINKEDIN',
  WHATSAPP = 'WHATSAPP',
  IMO = 'IMO',
  TELEGRAM = 'TELEGRAM',
  BKASH = 'BKASH',
  NAGAD = 'NAGAD',
  ROCKET = 'ROCKET',
}

/**
 * Social Account Linked Event
 * 
 * Emitted when a user links a social account to their profile
 * 
 * @example
 * // User links Google account
 * const event = new SocialAccountLinkedEvent(
 *   'usr_123',
 *   SocialProvider.GOOGLE,
 *   'user@gmail.com',
 *   'corr_abc123',
 *   '192.168.1.100',
 *   'device_456'
 * );
 * 
 * @example
 * // User links WhatsApp account (Bangladesh)
 * const event = new SocialAccountLinkedEvent(
 *   'usr_123',
 *   SocialProvider.WHATSAPP,
 *   '+8801712345678',
 *   'corr_abc123',
 *   '192.168.1.100',
 *   'device_456',
 *   { phoneNumber: '+8801712345678' }
 * );
 */
export class SocialAccountLinkedEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = 'social_account.linked';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  // Event-specific properties
  public readonly userId: string;
  public readonly provider: SocialProvider;
  public readonly providerAccountId: string;
  public readonly providerEmail?: string;
  public readonly providerName?: string;
  public readonly linkedAt: Date;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly ipAddress?: string;
  public readonly deviceId?: string;
  public readonly userAgent?: string;
  public readonly isFirstSocialLogin?: boolean;
  public readonly metadata?: Record<string, unknown>;

  constructor(
    userId: string,
    provider: SocialProvider,
    providerAccountId: string,
    correlationId?: string,
    causationId?: string,
    ipAddress?: string,
    deviceId?: string,
    userAgent?: string,
    providerEmail?: string,
    providerName?: string,
    isFirstSocialLogin?: boolean,
    metadata?: Record<string, unknown>
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.linkedAt = new Date();
    this.userId = userId;
    this.provider = provider;
    this.providerAccountId = providerAccountId;
    this.correlationId = correlationId;
    this.causationId = causationId;
    this.ipAddress = ipAddress;
    this.deviceId = deviceId;
    this.userAgent = userAgent;
    this.providerEmail = providerEmail;
    this.providerName = providerName;
    this.isFirstSocialLogin = isFirstSocialLogin;
    this.metadata = metadata;
  }
}

/**
 * Social Account Linked Event Data Interface
 * For event serialization/deserialization
 */
export interface SocialAccountLinkedEventData {
  userId: string;
  provider: SocialProvider;
  providerAccountId: string;
  providerEmail?: string;
  providerName?: string;
  linkedAt: string;
  correlationId?: string;
  causationId?: string;
  ipAddress?: string;
  deviceId?: string;
  userAgent?: string;
  isFirstSocialLogin?: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * Social Account Unlinked Event
 * Emitted when a user unlinks a social account
 */
export class SocialAccountUnlinkedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = 'social_account.unlinked';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  public readonly userId: string;
  public readonly provider: SocialProvider;
  public readonly providerAccountId: string;
  public readonly unlinkedAt: Date;
  public readonly reason?: string;
  public readonly correlationId?: string;
  public readonly ipAddress?: string;
  public readonly deviceId?: string;

  constructor(
    userId: string,
    provider: SocialProvider,
    providerAccountId: string,
    correlationId?: string,
    ipAddress?: string,
    deviceId?: string,
    reason?: string
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.unlinkedAt = new Date();
    this.userId = userId;
    this.provider = provider;
    this.providerAccountId = providerAccountId;
    this.correlationId = correlationId;
    this.ipAddress = ipAddress;
    this.deviceId = deviceId;
    this.reason = reason;
  }
}
