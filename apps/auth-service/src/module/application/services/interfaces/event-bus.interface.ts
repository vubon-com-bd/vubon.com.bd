/**
 * Event Bus Interface
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/services/interfaces/event-bus.interface
 * 
 * @description
 * Interface for event publishing and subscription.
 * Implementation resides in infrastructure layer.
 * 
 * Enterprise Rules:
 * ✅ Pure interface - No implementation
 * ✅ No business logic
 * ✅ Infrastructure-agnostic
 * ✅ Event sourcing ready
 * ✅ Bangladesh specific - MFS payment events, WhatsApp login events
 */

import { randomUUID } from 'crypto';

// ============================================================
// Domain Event Interface
// ============================================================

export interface DomainEvent {
  /** Unique event identifier (UUID) */
  readonly eventId: string;
  
  /** Event name/type (e.g., 'user.registered', 'user.logged_in') */
  readonly eventName: string;
  
  /** When the event occurred (ISO timestamp) */
  readonly occurredAt: Date;
  
  /** Aggregate root ID (e.g., userId) */
  readonly aggregateId: string;
  
  /** Aggregate version for event sourcing */
  readonly aggregateVersion: number;
  
  /** Event version for schema evolution */
  readonly eventVersion: number;
  
  /** Correlation ID for distributed tracing */
  readonly correlationId?: string;
  
  /** Causation ID (ID of event that caused this event) */
  readonly causationId?: string;
  
  /** User ID who initiated the action (if applicable) */
  readonly userId?: string;
  
  /** IP address of the request */
  readonly ipAddress?: string;
  
  /** User agent of the request */
  readonly userAgent?: string;
  
  /** Device ID of the request */
  readonly deviceId?: string;
  
  /** Additional event metadata (Bangladesh specific - district, mobile operator, etc.) */
  readonly metadata?: Record<string, unknown>;
}

// ============================================================
// Event Handler Type
// ============================================================

export type EventHandler<T extends DomainEvent = DomainEvent> = (event: T) => Promise<void>;

// ============================================================
// Event Subscription Interface
// ============================================================

export interface EventSubscription {
  /** Unsubscribe from the event */
  unsubscribe(): void;
  
  /** Subscription ID */
  readonly id: string;
  
  /** Event name */
  readonly eventName: string;
}

// ============================================================
// Event Bus Interface
// ============================================================

export interface EventBus {
  /**
   * Publish a single event
   * 
   * @param event - Domain event to publish
   * @returns Promise that resolves when event is published
   * 
   * @example
   * await eventBus.publish(new UserRegisteredEvent(userId, email));
   */
  publish(event: DomainEvent): Promise<void>;
  
  /**
   * Publish multiple events in order
   * 
   * @param events - Array of domain events
   * @returns Promise that resolves when all events are published
   * 
   * @example
   * await eventBus.publishAll([event1, event2, event3]);
   */
  publishAll(events: DomainEvent[]): Promise<void>;
  
  /**
   * Publish event with retry on failure
   * 
   * @param event - Domain event to publish
   * @param maxRetries - Maximum number of retries (default: 3)
   * @param retryDelayMs - Delay between retries in milliseconds (default: 1000)
   * @returns Promise that resolves when event is published
   */
  publishWithRetry(
    event: DomainEvent,
    maxRetries?: number,
    retryDelayMs?: number
  ): Promise<void>;
  
  /**
   * Subscribe to events
   * 
   * @param eventName - Name of the event to subscribe to (use '*' for all events)
   * @param handler - Event handler function
   * @returns Event subscription object for unsubscribing
   * 
   * @example
   * const subscription = eventBus.subscribe('user.registered', async (event) => {
   *   await sendWelcomeEmail(event.aggregateId);
   * });
   * 
   * // Later: subscription.unsubscribe();
   */
  subscribe(eventName: string, handler: EventHandler): EventSubscription;
  
  /**
   * Subscribe to events with filter
   * 
   * @param eventName - Name of the event to subscribe to
   * @param filter - Filter function to determine if handler should be called
   * @param handler - Event handler function
   * @returns Event subscription object
   */
  subscribeWithFilter(
    eventName: string,
    filter: (event: DomainEvent) => boolean,
    handler: EventHandler
  ): EventSubscription;
  
  /**
   * Subscribe to events once (auto-unsubscribe after first event)
   * 
   * @param eventName - Name of the event to subscribe to
   * @param handler - Event handler function
   * @returns Event subscription object
   */
  subscribeOnce(eventName: string, handler: EventHandler): EventSubscription;
  
  /**
   * Unsubscribe from events
   * 
   * @param subscriptionId - Subscription ID to remove
   * @returns True if unsubscribed successfully
   * 
   * @example
   * const success = eventBus.unsubscribe('sub_123456');
   */
  unsubscribe(subscriptionId: string): Promise<boolean>;
  
  /**
   * Get all active subscriptions
   * 
   * @returns Array of subscription IDs
   */
  getSubscriptions(): string[];
  
  /**
   * Get subscriptions by event name
   * 
   * @param eventName - Event name
   * @returns Array of subscription IDs
   */
  getSubscriptionsByEvent(eventName: string): string[];
  
  /**
   * Check if event has subscribers
   * 
   * @param eventName - Event name to check
   * @returns True if there are subscribers
   */
  hasSubscribers(eventName: string): boolean;
  
  /**
   * Clear all subscriptions (for testing)
   */
  clearSubscriptions(): void;
  
  /**
   * Get event processing statistics
   * 
   * @returns Event statistics
   */
  getStatistics(): EventBusStatistics;
}

// ============================================================
// Event Bus Statistics
// ============================================================

export interface EventBusStatistics {
  totalEventsPublished: number;
  eventsPublishedLastMinute: number;
  eventsPublishedLastHour: number;
  totalSubscriptions: number;
  failedEvents: number;
  averagePublishTimeMs: number;
  eventCountsByType: Record<string, number>;
}

// ============================================================
// Abstract Base Event Class
// ============================================================

export abstract class BaseDomainEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly occurredAt: Date;
  public readonly eventVersion: number = 1;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly userId?: string;
  public readonly ipAddress?: string;
  public readonly userAgent?: string;
  public readonly deviceId?: string;
  public readonly metadata?: Record<string, unknown>;

  constructor(
    public readonly eventName: string,
    public readonly aggregateId: string,
    public readonly aggregateVersion: number,
    options?: {
      correlationId?: string;
      causationId?: string;
      userId?: string;
      ipAddress?: string;
      userAgent?: string;
      deviceId?: string;
      metadata?: Record<string, unknown>;
    },
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.correlationId = options?.correlationId;
    this.causationId = options?.causationId;
    this.userId = options?.userId;
    this.ipAddress = options?.ipAddress;
    this.userAgent = options?.userAgent;
    this.deviceId = options?.deviceId;
    this.metadata = options?.metadata;
  }
}

// ============================================================
// Event Constants
// ============================================================

export const EventNames = {
  // User Events
  USER_REGISTERED: 'user.registered',
  USER_UPDATED: 'user.updated',
  USER_DELETED: 'user.deleted',
  USER_ACTIVATED: 'user.activated',
  USER_SUSPENDED: 'user.suspended',
  USER_LOGIN: 'user.login',
  USER_LOGOUT: 'user.logout',
  USER_PASSWORD_CHANGED: 'user.password.changed',
  USER_PASSWORD_RESET: 'user.password.reset',
  USER_EMAIL_VERIFIED: 'user.email.verified',
  USER_PHONE_VERIFIED: 'user.phone.verified',
  USER_EMAIL_CHANGED: 'user.email.changed',
  USER_PHONE_CHANGED: 'user.phone.changed',
  USER_TIER_UPGRADED: 'user.tier.upgraded',
  
  // MFA Events
  MFA_ENABLED: 'mfa.enabled',
  MFA_DISABLED: 'mfa.disabled',
  MFA_VERIFIED: 'mfa.verified',
  MFA_FAILED: 'mfa.failed',
  MFA_BACKUP_CODE_USED: 'mfa.backup_code.used',
  MFA_RECOVERY_MODE_ENTERED: 'mfa.recovery_mode.entered',
  
  // Session Events
  SESSION_CREATED: 'session.created',
  SESSION_REVOKED: 'session.revoked',
  SESSION_EXPIRED: 'session.expired',
  SESSION_ALL_REVOKED: 'session.all_revoked',
  
  // Device Events
  DEVICE_REGISTERED: 'device.registered',
  DEVICE_TRUSTED: 'device.trusted',
  DEVICE_UNTRUSTED: 'device.untrusted',
  DEVICE_REMOVED: 'device.removed',
  
  // Social Auth Events (Bangladesh specific)
  SOCIAL_LOGIN: 'social.login',
  SOCIAL_LOGIN_FAILED: 'social.login.failed',
  SOCIAL_ACCOUNT_LINKED: 'social.account.linked',
  SOCIAL_ACCOUNT_UNLINKED: 'social.account.unlinked',
  WHATSAPP_LOGIN: 'whatsapp.login',
  IMO_LOGIN: 'imo.login',
  
  // MFS Payment Events (Bangladesh specific)
  BKASH_PAYMENT_INITIATED: 'bkash.payment.initiated',
  BKASH_PAYMENT_SUCCESS: 'bkash.payment.success',
  BKASH_PAYMENT_FAILED: 'bkash.payment.failed',
  NAGAD_PAYMENT_INITIATED: 'nagad.payment.initiated',
  NAGAD_PAYMENT_SUCCESS: 'nagad.payment.success',
  NAGAD_PAYMENT_FAILED: 'nagad.payment.failed',
  ROCKET_PAYMENT_INITIATED: 'rocket.payment.initiated',
  ROCKET_PAYMENT_SUCCESS: 'rocket.payment.success',
  ROCKET_PAYMENT_FAILED: 'rocket.payment.failed',
  
  // Security Events
  SECURITY_ALERT: 'security.alert',
  ACCOUNT_LOCKED: 'account.locked',
  ACCOUNT_UNLOCKED: 'account.unlocked',
  SUSPICIOUS_ACTIVITY: 'security.suspicious_activity',
  RATE_LIMIT_EXCEEDED: 'security.rate_limit.exceeded',
  IP_BLOCKED: 'security.ip.blocked',
  DEVICE_BLOCKED: 'security.device.blocked',
  
  // Email/Notification Events
  EMAIL_SENT: 'email.sent',
  EMAIL_FAILED: 'email.failed',
  SMS_SENT: 'sms.sent',
  SMS_FAILED: 'sms.failed',
  WHATSAPP_SENT: 'whatsapp.sent',
  WHATSAPP_FAILED: 'whatsapp.failed',
  NOTIFICATION_SENT: 'notification.sent',
  
  // Admin Events
  ADMIN_ACTION: 'admin.action',
  USER_ROLE_CHANGED: 'user.role.changed',
  USER_IMPERSONATED: 'user.impersonated',
} as const;

// ============================================================
// Example Events
// ============================================================

// User Registered Event
export class UserRegisteredEvent extends BaseDomainEvent {
  constructor(
    aggregateId: string,
    aggregateVersion: number,
    public readonly email: string,
    public readonly fullName: string,
    public readonly phoneNumber?: string,
    options?: {
      correlationId?: string;
      causationId?: string;
      userId?: string;
      ipAddress?: string;
      userAgent?: string;
      deviceId?: string;
      metadata?: Record<string, unknown>;
    },
  ) {
    super(EventNames.USER_REGISTERED, aggregateId, aggregateVersion, options);
  }
}

// User Logged In Event
export class UserLoggedInEvent extends BaseDomainEvent {
  constructor(
    aggregateId: string,
    aggregateVersion: number,
    public readonly email: string,
    public readonly ipAddress: string,
    public readonly userAgent: string,
    public readonly deviceId?: string,
    public readonly loginMethod?: 'email' | 'phone' | 'social' | 'otp',
    options?: {
      correlationId?: string;
      causationId?: string;
      userId?: string;
      metadata?: Record<string, unknown>;
    },
  ) {
    super(EventNames.USER_LOGIN, aggregateId, aggregateVersion, { ...options, ipAddress, userAgent, deviceId });
  }
}

// WhatsApp Login Event (Bangladesh specific)
export class WhatsAppLoginEvent extends BaseDomainEvent {
  constructor(
    aggregateId: string,
    aggregateVersion: number,
    public readonly phoneNumber: string,
    public readonly ipAddress: string,
    public readonly userAgent: string,
    public readonly deviceId?: string,
    options?: {
      correlationId?: string;
      causationId?: string;
      userId?: string;
      metadata?: Record<string, unknown>;
    },
  ) {
    super(EventNames.WHATSAPP_LOGIN, aggregateId, aggregateVersion, { ...options, ipAddress, userAgent, deviceId });
  }
}

// bKash Payment Success Event (Bangladesh specific)
export class BkashPaymentSuccessEvent extends BaseDomainEvent {
  constructor(
    aggregateId: string,
    aggregateVersion: number,
    public readonly userId: string,
    public readonly amount: number,
    public readonly transactionId: string,
    public readonly merchantInvoiceNumber: string,
    public readonly phoneNumber?: string,
    options?: {
      correlationId?: string;
      causationId?: string;
      ipAddress?: string;
      metadata?: Record<string, unknown>;
    },
  ) {
    super(EventNames.BKASH_PAYMENT_SUCCESS, aggregateId, aggregateVersion, { ...options, userId, ipAddress: options?.ipAddress });
  }
}

// MFA Enabled Event
export class MFAEnabledEvent extends BaseDomainEvent {
  constructor(
    aggregateId: string,
    aggregateVersion: number,
    public readonly userId: string,
    public readonly mfaType: string,
    public readonly methodId: string,
    options?: {
      correlationId?: string;
      causationId?: string;
      ipAddress?: string;
      userAgent?: string;
      deviceId?: string;
      metadata?: Record<string, unknown>;
    },
  ) {
    super(EventNames.MFA_ENABLED, aggregateId, aggregateVersion, { ...options, userId });
  }
}

// Session Revoked Event
export class SessionRevokedEvent extends BaseDomainEvent {
  constructor(
    aggregateId: string,
    aggregateVersion: number,
    public readonly userId: string,
    public readonly sessionId: string,
    public readonly reason?: string,
    options?: {
      correlationId?: string;
      causationId?: string;
      ipAddress?: string;
      metadata?: Record<string, unknown>;
    },
  ) {
    super(EventNames.SESSION_REVOKED, aggregateId, aggregateVersion, { ...options, userId });
  }
}

// Security Alert Event
export class SecurityAlertEvent extends BaseDomainEvent {
  constructor(
    aggregateId: string,
    aggregateVersion: number,
    public readonly alertType: string,
    public readonly severity: 'low' | 'medium' | 'high' | 'critical',
    public readonly message: string,
    public readonly details?: Record<string, unknown>,
    options?: {
      correlationId?: string;
      causationId?: string;
      userId?: string;
      ipAddress?: string;
      metadata?: Record<string, unknown>;
    },
  ) {
    super(EventNames.SECURITY_ALERT, aggregateId, aggregateVersion, options);
  }
}

// Account Locked Event
export class AccountLockedEvent extends BaseDomainEvent {
  constructor(
    aggregateId: string,
    aggregateVersion: number,
    public readonly userId: string,
    public readonly reason: string,
    public readonly lockDurationMinutes: number,
    options?: {
      correlationId?: string;
      causationId?: string;
      ipAddress?: string;
      metadata?: Record<string, unknown>;
    },
  ) {
    super(EventNames.ACCOUNT_LOCKED, aggregateId, aggregateVersion, { ...options, userId });
  }
}

// Phone Verified Event (Bangladesh specific)
export class PhoneVerifiedEvent extends BaseDomainEvent {
  constructor(
    aggregateId: string,
    aggregateVersion: number,
    public readonly userId: string,
    public readonly phoneNumber: string,
    public readonly operator?: 'gp' | 'robi' | 'banglalink' | 'teletalk',
    options?: {
      correlationId?: string;
      causationId?: string;
      ipAddress?: string;
      metadata?: Record<string, unknown>;
    },
  ) {
    super(EventNames.USER_PHONE_VERIFIED, aggregateId, aggregateVersion, { ...options, userId });
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { EventBusStatistics as EventBusStatisticsType };
export type { EventSubscription as EventSubscriptionType };
export type EventHandlerType = EventHandler;
