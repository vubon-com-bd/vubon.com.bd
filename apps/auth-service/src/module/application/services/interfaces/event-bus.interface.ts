/**
 * Event Bus Interface - Pure Application Contract
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
 * ✅ Type-safe event names using shared-constants
 */

// ✅ Phase-1: Import from shared-constants for centralized event names
import { EVENT_NAMES, EVENT_VERSIONS, DOMAIN_EVENTS } from '@vubon/shared-constants';
// ✅ Phase-1: Import from shared-types for type safety
import type { EventMetadata, EventPayload, EventHandlerResult } from '@vubon/shared-types';

// ============================================================
// Domain Event Interface (Enhanced with Bangladesh metadata)
// ============================================================

export interface DomainEvent {
  /** Unique event identifier (UUID v4) */
  readonly eventId: string;
  
  /** Event name/type - type-safe using EVENT_NAMES from shared-constants */
  readonly eventName: keyof typeof EVENT_NAMES;
  
  /** When the event occurred (ISO timestamp) */
  readonly occurredAt: Date;
  
  /** Aggregate root ID (e.g., userId, sessionId) */
  readonly aggregateId: string;
  
  /** Aggregate version for event sourcing */
  readonly aggregateVersion: number;
  
  /** Event version for schema evolution (from shared-constants) */
  readonly eventVersion: number;
  
  /** Correlation ID for distributed tracing */
  readonly correlationId?: string;
  
  /** Causation ID (ID of event that caused this event) */
  readonly causationId?: string;
  
  /** User ID who initiated the action (if applicable) */
  readonly userId?: string;
  
  /** Email of the user who initiated the action */
  readonly userEmail?: string;
  
  /** Phone number of the user (Bangladesh specific) */
  readonly userPhone?: string;
  
  /** IP address of the request */
  readonly ipAddress?: string;
  
  /** User agent of the request */
  readonly userAgent?: string;
  
  /** Device ID of the request */
  readonly deviceId?: string;
  
  /** Session ID of the request */
  readonly sessionId?: string;
  
  /** Request ID for API tracing */
  readonly requestId?: string;
  
  /** Additional event metadata with Bangladesh specific fields */
  readonly metadata?: EventMetadata;
  
  /** Event payload containing business data */
  readonly payload?: EventPayload;
  
  /** Whether the event is idempotent (can be processed multiple times) */
  readonly isIdempotent?: boolean;
  
  /** Partition key for event streaming (e.g., userId) */
  readonly partitionKey?: string;
  
  /** Source service that published the event */
  readonly source?: string;
}

// ============================================================
// Event Handler Type with Result
// ============================================================

export type EventHandler<T extends DomainEvent = DomainEvent> = (event: T) => Promise<EventHandlerResult>;

// ============================================================
// Event Handler Options
// ============================================================

export interface EventHandlerOptions {
  /** Whether handler should run only once (even with multiple subscriptions) */
  once?: boolean;
  
  /** Priority of the handler (higher numbers run first) */
  priority?: number;
  
  /** Timeout in milliseconds for handler execution */
  timeoutMs?: number;
  
  /** Whether to retry on failure */
  retryOnFailure?: boolean;
  
  /** Maximum retry attempts */
  maxRetries?: number;
  
  /** Delay between retries in milliseconds */
  retryDelayMs?: number;
  
  /** Filter function to conditionally execute handler */
  filter?: (event: DomainEvent) => boolean | Promise<boolean>;
}

// ============================================================
// Event Subscription Interface
// ============================================================

export interface EventSubscription {
  /** Unsubscribe from the event */
  unsubscribe(): void;
  
  /** Subscription ID (UUID) */
  readonly id: string;
  
  /** Event name this subscription is for */
  readonly eventName: string;
  
  /** Whether the subscription is active */
  readonly isActive: boolean;
  
  /** Options for this subscription */
  readonly options?: EventHandlerOptions;
  
  /** Pause the subscription temporarily */
  pause(): void;
  
  /** Resume a paused subscription */
  resume(): void;
  
  /** Get statistics for this subscription */
  getStats(): SubscriptionStats;
}

// ============================================================
// Subscription Statistics
// ============================================================

export interface SubscriptionStats {
  /** Number of events processed */
  processedCount: number;
  
  /** Number of events that failed */
  failedCount: number;
  
  /** Last processed timestamp */
  lastProcessedAt?: Date;
  
  /** Last error message */
  lastError?: string;
  
  /** Average processing time in milliseconds */
  averageProcessingTimeMs: number;
}

// ============================================================
// Batch Publishing Options
// ============================================================

export interface BatchPublishOptions {
  /** Whether to stop on first error */
  stopOnError?: boolean;
  
  /** Whether to process events in parallel */
  parallel?: boolean;
  
  /** Maximum concurrency for parallel processing */
  maxConcurrency?: number;
  
  /** Timeout for entire batch in milliseconds */
  timeoutMs?: number;
}

// ============================================================
// Event Bus Statistics (Enhanced)
// ============================================================

export interface EventBusStatistics {
  totalEventsPublished: number;
  eventsPublishedLastMinute: number;
  eventsPublishedLastHour: number;
  eventsPublishedLastDay: number;
  totalSubscriptions: number;
  failedEvents: number;
  averagePublishTimeMs: number;
  eventCountsByType: Record<string, number>;
  handlerExecutionStats: {
    totalExecutions: number;
    averageExecutionTimeMs: number;
    failedExecutions: number;
  };
  /** Bangladesh specific - events by district */
  eventsByDistrict?: Record<string, number>;
  /** Bangladesh specific - events by mobile operator */
  eventsByMobileOperator?: Record<string, number>;
  /** Events by hour of day (0-23) */
  eventsByHour?: Record<number, number>;
}

// ============================================================
// Event Bus Interface (Enhanced)
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
   * @param options - Batch publishing options
   * @returns Promise that resolves when all events are published
   * 
   * @example
   * await eventBus.publishAll([event1, event2, event3]);
   */
  publishAll(events: DomainEvent[], options?: BatchPublishOptions): Promise<void>;
  
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
   * Publish event asynchronously (fire and forget)
   * 
   * @param event - Domain event to publish
   * @returns void (does not wait for completion)
   */
  publishAsync(event: DomainEvent): void;
  
  /**
   * Subscribe to events
   * 
   * @param eventName - Name of the event to subscribe to (use '*' for all events)
   * @param handler - Event handler function
   * @param options - Handler options
   * @returns Event subscription object for unsubscribing
   * 
   * @example
   * const subscription = eventBus.subscribe(EVENT_NAMES.USER_REGISTERED, async (event) => {
   *   await sendWelcomeEmail(event.userId);
   * });
   * 
   * // Later: subscription.unsubscribe();
   */
  subscribe(
    eventName: keyof typeof EVENT_NAMES | '*',
    handler: EventHandler,
    options?: EventHandlerOptions
  ): EventSubscription;
  
  /**
   * Subscribe to events with filter
   * 
   * @param eventName - Name of the event to subscribe to
   * @param filter - Filter function to determine if handler should be called
   * @param handler - Event handler function
   * @param options - Handler options
   * @returns Event subscription object
   */
  subscribeWithFilter(
    eventName: keyof typeof EVENT_NAMES,
    filter: (event: DomainEvent) => boolean | Promise<boolean>,
    handler: EventHandler,
    options?: EventHandlerOptions
  ): EventSubscription;
  
  /**
   * Subscribe to events by pattern (wildcard matching)
   * 
   * @param pattern - Pattern to match event names (e.g., 'user.*', '*.payment.*')
   * @param handler - Event handler function
   * @param options - Handler options
   * @returns Event subscription object
   */
  subscribeByPattern(
    pattern: string,
    handler: EventHandler,
    options?: EventHandlerOptions
  ): EventSubscription;
  
  /**
   * Subscribe to events once (auto-unsubscribe after first event)
   * 
   * @param eventName - Name of the event to subscribe to
   * @param handler - Event handler function
   * @param options - Handler options
   * @returns Event subscription object
   */
  subscribeOnce(
    eventName: keyof typeof EVENT_NAMES,
    handler: EventHandler,
    options?: Omit<EventHandlerOptions, 'once'>
  ): EventSubscription;
  
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
   * @returns Enhanced event statistics
   */
  getStatistics(): Promise<EventBusStatistics>;
  
  /**
   * Reset statistics counters
   */
  resetStatistics(): void;
  
  /**
   * Health check for event bus
   * 
   * @returns True if event bus is healthy
   */
  healthCheck(): Promise<boolean>;
  
  /**
   * Replay events from a specific point (for event sourcing)
   * 
   * @param fromEventId - Event ID to start from
   * @param toEventId - Event ID to end at (optional)
   * @param handler - Handler to process replayed events
   */
  replayEvents(
    fromEventId: string,
    toEventId?: string,
    handler?: EventHandler
  ): Promise<void>;
  
  /**
   * Get dead letter queue events (failed events)
   * 
   * @param limit - Maximum number of events to return
   * @returns Array of failed events with error details
   */
  getDeadLetterEvents(limit?: number): Promise<Array<{ event: DomainEvent; error: string; failedAt: Date }>>;
  
  /**
   * Retry failed events from dead letter queue
   * 
   * @param eventIds - Specific event IDs to retry (all if empty)
   * @returns Number of events retried
   */
  retryFailedEvents(eventIds?: string[]): Promise<number>;
}

// ============================================================
// Abstract Base Event Class (Enhanced)
// ============================================================

export abstract class BaseDomainEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly occurredAt: Date;
  public readonly eventVersion: number;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly userId?: string;
  public readonly userEmail?: string;
  public readonly userPhone?: string;
  public readonly ipAddress?: string;
  public readonly userAgent?: string;
  public readonly deviceId?: string;
  public readonly sessionId?: string;
  public readonly requestId?: string;
  public readonly metadata?: EventMetadata;
  public readonly payload?: EventPayload;
  public readonly isIdempotent: boolean;
  public readonly partitionKey?: string;
  public readonly source: string;

  constructor(
    public readonly eventName: keyof typeof EVENT_NAMES,
    public readonly aggregateId: string,
    public readonly aggregateVersion: number,
    options?: {
      correlationId?: string;
      causationId?: string;
      userId?: string;
      userEmail?: string;
      userPhone?: string;
      ipAddress?: string;
      userAgent?: string;
      deviceId?: string;
      sessionId?: string;
      requestId?: string;
      metadata?: EventMetadata;
      payload?: EventPayload;
      isIdempotent?: boolean;
      partitionKey?: string;
      source?: string;
      eventVersion?: number;
    },
  ) {
    this.eventId = generateEventId();
    this.occurredAt = new Date();
    this.eventVersion = options?.eventVersion ?? EVENT_VERSIONS.V1;
    this.correlationId = options?.correlationId;
    this.causationId = options?.causationId;
    this.userId = options?.userId;
    this.userEmail = options?.userEmail;
    this.userPhone = options?.userPhone;
    this.ipAddress = options?.ipAddress;
    this.userAgent = options?.userAgent;
    this.deviceId = options?.deviceId;
    this.sessionId = options?.sessionId;
    this.requestId = options?.requestId;
    this.metadata = options?.metadata;
    this.payload = options?.payload;
    this.isIdempotent = options?.isIdempotent ?? false;
    this.partitionKey = options?.partitionKey ?? aggregateId;
    this.source = options?.source ?? 'auth-service';
  }
}

// ============================================================
// Utility Functions
// ============================================================

/**
 * Generate event ID (pure domain function)
 * Uses timestamp + random + counter for uniqueness without crypto dependency
 */
function generateEventId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 10);
  const counter = (generateEventId.counter = (generateEventId.counter || 0) + 1);
  return `evt_${timestamp}_${random}_${counter}`;
}

namespace generateEventId {
  export let counter = 0;
}

// ============================================================
// Example Events (Using shared-constants for event names)
// ============================================================

// User Registered Event
export class UserRegisteredEvent extends BaseDomainEvent {
  constructor(
    aggregateId: string,
    aggregateVersion: number,
    public readonly email: string,
    public readonly fullName: string,
    public readonly phoneNumber?: string,
    options?: ConstructorParameters<typeof BaseDomainEvent>[3],
  ) {
    super(EVENT_NAMES.USER_REGISTERED, aggregateId, aggregateVersion, {
      ...options,
      payload: { email, fullName, phoneNumber },
    });
  }
}

// User Logged In Event
export class UserLoggedInEvent extends BaseDomainEvent {
  constructor(
    aggregateId: string,
    aggregateVersion: number,
    public readonly email: string,
    public readonly loginMethod: 'email' | 'phone' | 'social' | 'otp',
    options?: ConstructorParameters<typeof BaseDomainEvent>[3],
  ) {
    super(EVENT_NAMES.USER_LOGIN, aggregateId, aggregateVersion, {
      ...options,
      payload: { email, loginMethod },
      isIdempotent: true,
    });
  }
}

// WhatsApp Login Event (Bangladesh specific)
export class WhatsAppLoginEvent extends BaseDomainEvent {
  constructor(
    aggregateId: string,
    aggregateVersion: number,
    public readonly phoneNumber: string,
    options?: ConstructorParameters<typeof BaseDomainEvent>[3],
  ) {
    super(EVENT_NAMES.WHATSAPP_LOGIN, aggregateId, aggregateVersion, {
      ...options,
      payload: { phoneNumber },
      metadata: { ...options?.metadata, loginProvider: 'whatsapp' },
    });
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
    options?: ConstructorParameters<typeof BaseDomainEvent>[3],
  ) {
    super(EVENT_NAMES.BKASH_PAYMENT_SUCCESS, aggregateId, aggregateVersion, {
      ...options,
      userId,
      payload: { amount, transactionId, merchantInvoiceNumber, phoneNumber },
      isIdempotent: true,
    });
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
    options?: ConstructorParameters<typeof BaseDomainEvent>[3],
  ) {
    super(EVENT_NAMES.MFA_ENABLED, aggregateId, aggregateVersion, {
      ...options,
      userId,
      payload: { mfaType, methodId },
    });
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
    options?: ConstructorParameters<typeof BaseDomainEvent>[3],
  ) {
    super(EVENT_NAMES.SESSION_REVOKED, aggregateId, aggregateVersion, {
      ...options,
      userId,
      payload: { sessionId, reason },
    });
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
    options?: ConstructorParameters<typeof BaseDomainEvent>[3],
  ) {
    super(EVENT_NAMES.SECURITY_ALERT, aggregateId, aggregateVersion, {
      ...options,
      payload: { alertType, severity, message, details },
      isIdempotent: true,
    });
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
    options?: ConstructorParameters<typeof BaseDomainEvent>[3],
  ) {
    super(EVENT_NAMES.ACCOUNT_LOCKED, aggregateId, aggregateVersion, {
      ...options,
      userId,
      payload: { reason, lockDurationMinutes },
    });
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
    options?: ConstructorParameters<typeof BaseDomainEvent>[3],
  ) {
    super(EVENT_NAMES.USER_PHONE_VERIFIED, aggregateId, aggregateVersion, {
      ...options,
      userId,
      payload: { phoneNumber, operator },
      metadata: { ...options?.metadata, verificationMethod: 'otp' },
    });
  }
}

// District Changed Event (Bangladesh specific)
export class DistrictChangedEvent extends BaseDomainEvent {
  constructor(
    aggregateId: string,
    aggregateVersion: number,
    public readonly userId: string,
    public readonly oldDistrict: string,
    public readonly newDistrict: string,
    options?: ConstructorParameters<typeof BaseDomainEvent>[3],
  ) {
    super(EVENT_NAMES.DISTRICT_CHANGED, aggregateId, aggregateVersion, {
      ...options,
      userId,
      payload: { oldDistrict, newDistrict },
    });
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  EventBusStatistics as EventBusStatisticsType, 
  EventSubscription as EventSubscriptionType,
  EventHandlerOptions as EventHandlerOptionsType,
  BatchPublishOptions as BatchPublishOptionsType,
  SubscriptionStats as SubscriptionStatsType,
};
export type EventHandlerType = EventHandler;
