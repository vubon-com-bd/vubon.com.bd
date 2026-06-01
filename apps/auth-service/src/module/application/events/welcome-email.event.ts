/**
 * Welcome Email Event - Pure Domain/Application Event
 * 
 * @module application/events/welcome-email.event
 * 
 * @description
 * Event emitted when a new user successfully verifies their email.
 * Triggers sending of welcome email with onboarding information.
 * 
 * Enterprise Rules:
 * ✅ Immutable event data
 * ✅ No business logic
 * ✅ No side effects
 * ✅ Event ID for tracing
 * ✅ Correlation ID for distributed tracking
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
 * Welcome Email Event
 * 
 * Emitted when a user verifies their email for the first time
 * 
 * @example
 * const event = new WelcomeEmailEvent(
 *   'usr_123',
 *   'user@vubon.com.bd',
 *   'John Doe',
 *   'corr_abc123',
 *   'en',
 *   {
 *     signupMethod: 'email',
 *     hasPhone: true
 *   }
 * );
 */
export class WelcomeEmailEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = 'user.welcome_email';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  // Event-specific properties
  public readonly userId: string;
  public readonly email: string;
  public readonly fullName: string;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly preferredLanguage?: string;
  public readonly metadata?: Record<string, unknown>;

  constructor(
    userId: string,
    email: string,
    fullName: string,
    correlationId?: string,
    causationId?: string,
    preferredLanguage?: string,
    metadata?: Record<string, unknown>
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.userId = userId;
    this.email = email;
    this.fullName = fullName;
    this.correlationId = correlationId;
    this.causationId = causationId;
    this.preferredLanguage = preferredLanguage || 'en';
    this.metadata = metadata;
  }
}

/**
 * Welcome Email Event Data Interface
 * For event serialization/deserialization
 */
export interface WelcomeEmailEventData {
  userId: string;
  email: string;
  fullName: string;
  correlationId?: string;
  causationId?: string;
  preferredLanguage?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Welcome Email Templates
 */
export enum WelcomeEmailTemplate {
  DEFAULT = 'welcome-default',
  BENGALI = 'welcome-bengali',
  PREMIUM = 'welcome-premium',
  VENDOR = 'welcome-vendor',
  ADMIN = 'welcome-admin',
}

/**
 * Welcome Email Event with Template
 * Extended event for template-specific welcome emails
 */
export class WelcomeEmailWithTemplateEvent extends WelcomeEmailEvent {
  public readonly template: WelcomeEmailTemplate;

  constructor(
    userId: string,
    email: string,
    fullName: string,
    template: WelcomeEmailTemplate,
    correlationId?: string,
    causationId?: string,
    preferredLanguage?: string,
    metadata?: Record<string, unknown>
  ) {
    super(userId, email, fullName, correlationId, causationId, preferredLanguage, metadata);
    this.template = template;
    this.eventName = 'user.welcome_email_with_template';
  }
}

/**
 * Welcome Email Sent Event
 * Emitted after welcome email is successfully sent
 */
export class WelcomeEmailSentEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventName: string = 'user.welcome_email_sent';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  public readonly userId: string;
  public readonly email: string;
  public readonly template: string;
  public readonly sentAt: Date;
  public readonly correlationId?: string;

  constructor(
    userId: string,
    email: string,
    template: string,
    correlationId?: string
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.userId = userId;
    this.email = email;
    this.template = template;
    this.sentAt = new Date();
    this.correlationId = correlationId;
  }
}
