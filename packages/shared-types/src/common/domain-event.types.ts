/**
 * Domain Event Types - Enterprise Grade
 * @module shared-types/common/domain-event.types
 * 
 * @description
 * Core domain event types for event-driven architecture.
 * Used across all services for event sourcing, CQRS, and audit trails.
 * 
 * Enterprise Rules:
 * ✅ SINGLE SOURCE OF TRUTH - All domain event definitions
 * ✅ Event versioning support for schema evolution
 * ✅ Metadata for distributed tracing
 * ✅ Cross-service event compatibility
 * ✅ Type-safe event handlers
 * ✅ Framework-free, no external dependencies
 * ✅ Event sourcing ready
 * ✅ CQRS pattern support
 * ✅ Audit trail compatibility
 * ✅ Event versioning with backward compatibility
 * ✅ Correlation IDs for distributed tracing
 * ✅ Immutable event design
 * 
 * @example
 * import { DomainEvent, DomainEventHandler } from '@vubon/shared-types';
 * 
 * class UserCreatedEvent implements DomainEvent {
 *   readonly eventId: string;
 *   readonly eventType = 'user.created';
 *   // ... implementation
 * }
 */

// ============================================================
// Core Domain Event Interface
// ============================================================

/**
 * Base domain event interface
 * All domain events must implement this interface
 */
export interface DomainEvent {
  /** Unique event identifier (UUID v4) */
  readonly eventId: string;
  
  /** Event type (e.g., 'user.created', 'order.placed') */
  readonly eventType: string;
  
  /** Aggregate root ID that this event belongs to */
  readonly aggregateId: string;
  
  /** When the event occurred */
  readonly occurredOn: Date;
  
  /** Version of the aggregate after this event (for event sourcing) */
  readonly version: number;
  
  /** Optional metadata for distributed tracing and audit */
  readonly metadata?: Readonly<Record<string, unknown>>;
  
  /** Event version for schema evolution (default: 1) */
  readonly eventVersion?: number;
  
  /** Correlation ID for distributed tracing */
  readonly correlationId?: string;
  
  /** Causation ID (which event caused this event) */
  readonly causationId?: string;
  
  /** User ID who triggered the event (if applicable) */
  readonly userId?: string;
  
  /** Tenant ID for multi-tenant systems */
  readonly tenantId?: string;
}

// ============================================================
// Domain Event Handler Interface
// ============================================================

/**
 * Domain event handler interface
 * Implement this to handle specific domain events
 */
export interface DomainEventHandler<T extends DomainEvent = DomainEvent> {
  /**
   * Handle the domain event
   * @param event - The event to handle
   * @returns Promise or void
   */
  handle(event: T): Promise<void> | void;
  
  /**
   * Optional: Check if handler can handle the event
   * @param event - The event to check
   * @returns True if handler can handle the event
   */
  canHandle?(event: DomainEvent): boolean;
  
  /**
   * Optional: Priority of the handler (higher = executed first)
   * Default: 0
   */
  priority?: number;
}

// ============================================================
// Event Publisher Interface
// ============================================================

/**
 * Domain event publisher interface
 * Used to publish events to event bus/message queue
 */
export interface DomainEventPublisher {
  /**
   * Publish a single event
   * @param event - The event to publish
   * @returns Promise
   */
  publish(event: DomainEvent): Promise<void>;
  
  /**
   * Publish multiple events
   * @param events - The events to publish
   * @returns Promise
   */
  publishAll(events: DomainEvent[]): Promise<void>;
  
  /**
   * Publish events with transaction support
   * @param events - The events to publish
   * @param transactionId - Optional transaction ID
   * @returns Promise
   */
  publishInTransaction(events: DomainEvent[], transactionId?: string): Promise<void>;
}

// ============================================================
// Event Store Interface (Event Sourcing)
// ============================================================

/**
 * Event store interface for event sourcing
 */
export interface EventStore {
  /**
   * Append events to the event store
   * @param events - Events to append
   * @param expectedVersion - Expected version for optimistic concurrency
   * @returns Promise
   */
  append(events: DomainEvent[], expectedVersion?: number): Promise<void>;
  
  /**
   * Get events for an aggregate
   * @param aggregateId - Aggregate ID
   * @param fromVersion - Optional starting version
   * @param toVersion - Optional ending version
   * @returns Promise with events
   */
  getEventsForAggregate(
    aggregateId: string,
    fromVersion?: number,
    toVersion?: number
  ): Promise<DomainEvent[]>;
  
  /**
   * Get events by event type
   * @param eventType - Event type to filter
   * @param options - Optional pagination options
   * @returns Promise with events
   */
  getEventsByType(
    eventType: string,
    options?: { limit?: number; offset?: number; fromDate?: Date; toDate?: Date }
  ): Promise<DomainEvent[]>;
  
  /**
   * Get events by correlation ID (distributed tracing)
   * @param correlationId - Correlation ID
   * @returns Promise with events
   */
  getEventsByCorrelationId(correlationId: string): Promise<DomainEvent[]>;
  
  /**
   * Get events by user ID
   * @param userId - User ID
   * @param options - Optional pagination options
   * @returns Promise with events
   */
  getEventsByUserId(
    userId: string,
    options?: { limit?: number; offset?: number; fromDate?: Date; toDate?: Date }
  ): Promise<DomainEvent[]>;
  
  /**
   * Get event stream for replay
   * @param fromDate - Start date
   * @param toDate - End date
   * @returns Async iterable of events
   */
  getEventStream(fromDate: Date, toDate: Date): AsyncIterable<DomainEvent>;
  
  /**
   * Get latest event for aggregate
   * @param aggregateId - Aggregate ID
   * @returns Latest event or null
   */
  getLatestEvent(aggregateId: string): Promise<DomainEvent | null>;
  
  /**
   * Get aggregate version
   * @param aggregateId - Aggregate ID
   * @returns Current version or 0 if not found
   */
  getAggregateVersion(aggregateId: string): Promise<number>;
}

// ============================================================
// Event Sourcing Utilities
// ============================================================

/**
 * Event sourcing utility functions
 */
export interface EventSourcingUtils {
  /**
   * Replay events to rebuild aggregate state
   * @param events - Events to replay
   * @param initialState - Optional initial state
   * @returns Reconstructed state
   */
  replayEvents<T>(events: DomainEvent[], initialState?: T): T;
  
  /**
   * Get events after a specific event ID
   * @param events - All events
   * @param eventId - Event ID to start after
   * @returns Events after the specified event
   */
  getEventsAfter(events: DomainEvent[], eventId: string): DomainEvent[];
  
  /**
   * Get events up to a specific event ID
   * @param events - All events
   * @param eventId - Event ID to stop at
   * @returns Events up to the specified event
   */
  getEventsUpTo(events: DomainEvent[], eventId: string): DomainEvent[];
  
  /**
   * Check if event order is valid
   * @param events - Events to check
   * @returns True if events are in valid order
   */
  validateEventOrder(events: DomainEvent[]): boolean;
  
  /**
   * Get version at specific event
   * @param events - All events
   * @param eventId - Event ID
   * @returns Version at that event
   */
  getVersionAtEvent(events: DomainEvent[], eventId: string): number;
}

// ============================================================
// Event Type Registry
// ============================================================

/**
 * Event type registry for event type management
 */
export interface EventTypeRegistry {
  /**
   * Register an event type
   * @param eventType - Event type string
   * @param eventClass - Event class constructor
   */
  register<T extends DomainEvent>(
    eventType: string,
    eventClass: new (...args: unknown[]) => T
  ): void;
  
  /**
   * Get event class by type
   * @param eventType - Event type string
   * @returns Event class constructor or undefined
   */
  getEventClass(eventType: string): (new (...args: unknown[]) => DomainEvent) | undefined;
  
  /**
   * Create event instance from data
   * @param eventType - Event type string
   * @param data - Event data
   * @returns Domain event instance
   */
  createEvent(eventType: string, data: Record<string, unknown>): DomainEvent;
  
  /**
   * Get all registered event types
   * @returns Array of event type strings
   */
  getEventTypes(): string[];
  
  /**
   * Check if event type is registered
   * @param eventType - Event type string
   * @returns True if registered
   */
  isRegistered(eventType: string): boolean;
}

// ============================================================
// Event Version Migration
// ============================================================

/**
 * Event version migration interface
 * For handling schema evolution of events
 */
export interface EventVersionMigration {
  /**
   * Source version (the version to migrate from)
   */
  fromVersion: number;
  
  /**
   * Target version (the version to migrate to)
   */
  toVersion: number;
  
  /**
   * Migrate event data from fromVersion to toVersion
   * @param event - Event data to migrate
   * @returns Migrated event data
   */
  migrate(event: Record<string, unknown>): Record<string, unknown>;
  
  /**
   * Check if migration is backward compatible
   */
  isBackwardCompatible: boolean;
}

/**
 * Event version migrator
 */
export interface EventVersionMigrator {
  /**
   * Register a migration
   * @param migration - Migration to register
   */
  registerMigration(migration: EventVersionMigration): void;
  
  /**
   * Migrate event to latest version
   * @param event - Event to migrate
   * @param targetVersion - Target version (default: latest)
   * @returns Migrated event
   */
  migrateEvent(event: DomainEvent, targetVersion?: number): DomainEvent;
  
  /**
   * Get current version for event type
   * @param eventType - Event type
   * @returns Current version
   */
  getCurrentVersion(eventType: string): number;
  
  /**
   * Get all migrations for event type
   * @param eventType - Event type
   * @returns Array of migrations
   */
  getMigrations(eventType: string): EventVersionMigration[];
}

// ============================================================
// Event Envelope (For event bus/queue)
// ============================================================

/**
 * Event envelope for message queue/event bus
 */
export interface EventEnvelope {
  /** The domain event */
  event: DomainEvent;
  
  /** Event bus specific headers */
  headers: {
    /** Event ID (same as event.eventId) */
    'event-id': string;
    
    /** Event type */
    'event-type': string;
    
    /** When the event was sent */
    'sent-at': string;
    
    /** Event version */
    'event-version': string;
    
    /** Correlation ID */
    'correlation-id'?: string;
    
    /** Causation ID */
    'causation-id'?: string;
    
    /** User ID */
    'user-id'?: string;
    
    /** Tenant ID */
    'tenant-id'?: string;
    
    /** Source service */
    'source-service'?: string;
    
    /** Destination service */
    'destination-service'?: string;
    
    /** Retry count */
    'retry-count'?: string;
    
    /** Message ID */
    'message-id': string;
  };
  
  /** Custom headers */
  customHeaders?: Record<string, string>;
}

// ============================================================
// Event Type Constants
// ============================================================

/**
 * Domain event type constants
 * Centralized event type definitions
 */
export const EVENT_TYPES = {
  // ============================================================
  // User Domain Events
  // ============================================================
  USER_CREATED: 'user.created',
  USER_UPDATED: 'user.updated',
  USER_DELETED: 'user.deleted',
  USER_ACTIVATED: 'user.activated',
  USER_DEACTIVATED: 'user.deactivated',
  USER_SUSPENDED: 'user.suspended',
  USER_REACTIVATED: 'user.reactivated',
  USER_RESTORED: 'user.restored',
  
  // ============================================================
  // Authentication Events
  // ============================================================
  USER_EMAIL_VERIFIED: 'user.email_verified',
  USER_PHONE_VERIFIED: 'user.phone_verified',
  USER_PASSWORD_CHANGED: 'user.password_changed',
  USER_PASSWORD_RESET: 'user.password_reset',
  USER_ACCOUNT_LOCKED: 'user.account_locked',
  USER_ACCOUNT_UNLOCKED: 'user.account_unlocked',
  USER_MFA_ENABLED: 'user.mfa_enabled',
  USER_MFA_DISABLED: 'user.mfa_disabled',
  USER_LOGIN_SUCCESS: 'user.login_success',
  USER_LOGIN_FAILED: 'user.login_failed',
  USER_LOGOUT: 'user.logout',
  USER_SESSION_CREATED: 'user.session_created',
  USER_SESSION_REVOKED: 'user.session_revoked',
  USER_ROLE_CHANGED: 'user.role_changed',
  USER_TIER_UPGRADED: 'user.tier_upgraded',
  
  // ============================================================
  // Social Account Events
  // ============================================================
  SOCIAL_ACCOUNT_LINKED: 'social.account_linked',
  SOCIAL_ACCOUNT_UNLINKED: 'social.account_unlinked',
  SOCIAL_ACCOUNT_SUSPENDED: 'social.account_suspended',
  SOCIAL_ACCOUNT_REACTIVATED: 'social.account_reactivated',
  
  // ============================================================
  // MFA Events
  // ============================================================
  MFA_ENABLED: 'mfa.enabled',
  MFA_DISABLED: 'mfa.disabled',
  MFA_VERIFIED: 'mfa.verified',
  MFA_FAILED: 'mfa.failed',
  MFA_LOCKED: 'mfa.locked',
  MFA_UNLOCKED: 'mfa.unlocked',
  MFA_BACKUP_CODE_USED: 'mfa.backup_code_used',
  
  // ============================================================
  // Session Events
  // ============================================================
  SESSION_CREATED: 'session.created',
  SESSION_REVOKED: 'session.revoked',
  SESSION_EXPIRED: 'session.expired',
  SESSION_IDLE_EXPIRED: 'session.idle_expired',
  SESSION_SUSPENDED: 'session.suspended',
  SESSION_EXTENDED: 'session.extended',
  SESSION_TRANSFERRED: 'session.transferred',
  
  // ============================================================
  // Device Events
  // ============================================================
  DEVICE_REGISTERED: 'device.registered',
  DEVICE_TRUSTED: 'device.trusted',
  DEVICE_UNTRUSTED: 'device.untrusted',
  DEVICE_BLOCKED: 'device.blocked',
  DEVICE_SUSPENDED: 'device.suspended',
  
  // ============================================================
  // Product Domain Events
  // ============================================================
  PRODUCT_CREATED: 'product.created',
  PRODUCT_UPDATED: 'product.updated',
  PRODUCT_DELETED: 'product.deleted',
  PRODUCT_PUBLISHED: 'product.published',
  PRODUCT_UNPUBLISHED: 'product.unpublished',
  PRODUCT_APPROVED: 'product.approved',
  PRODUCT_REJECTED: 'product.rejected',
  PRODUCT_PRICE_CHANGED: 'product.price_changed',
  PRODUCT_STOCK_CHANGED: 'product.stock_changed',
  PRODUCT_FEATURED: 'product.featured',
  PRODUCT_UNFEATURED: 'product.unfeatured',
  
  // ============================================================
  // Order Domain Events
  // ============================================================
  ORDER_CREATED: 'order.created',
  ORDER_UPDATED: 'order.updated',
  ORDER_CANCELLED: 'order.cancelled',
  ORDER_APPROVED: 'order.approved',
  ORDER_REJECTED: 'order.rejected',
  ORDER_SHIPPED: 'order.shipped',
  ORDER_DELIVERED: 'order.delivered',
  ORDER_REFUNDED: 'order.refunded',
  ORDER_COMPLETED: 'order.completed',
  ORDER_STATUS_CHANGED: 'order.status_changed',
  
  // ============================================================
  // Payment Domain Events
  // ============================================================
  PAYMENT_INITIATED: 'payment.initiated',
  PAYMENT_SUCCESS: 'payment.success',
  PAYMENT_FAILED: 'payment.failed',
  PAYMENT_REFUNDED: 'payment.refunded',
  PAYMENT_VOIDED: 'payment.voided',
  PAYMENT_CAPTURED: 'payment.captured',
  
  // ============================================================
  // Bangladesh Payment Gateway Events
  // ============================================================
  BKASH_PAYMENT_INITIATED: 'bkash.payment.initiated',
  BKASH_PAYMENT_SUCCESS: 'bkash.payment.success',
  BKASH_PAYMENT_FAILED: 'bkash.payment.failed',
  BKASH_PAYMENT_REFUNDED: 'bkash.payment.refunded',
  NAGAD_PAYMENT_INITIATED: 'nagad.payment.initiated',
  NAGAD_PAYMENT_SUCCESS: 'nagad.payment.success',
  NAGAD_PAYMENT_FAILED: 'nagad.payment.failed',
  SSLCOMMERZ_PAYMENT_SUCCESS: 'sslcommerz.payment.success',
  SSLCOMMERZ_PAYMENT_FAILED: 'sslcommerz.payment.failed',
  
  // ============================================================
  // Inventory Domain Events
  // ============================================================
  INVENTORY_UPDATED: 'inventory.updated',
  INVENTORY_ADJUSTED: 'inventory.adjusted',
  INVENTORY_RESERVED: 'inventory.reserved',
  INVENTORY_RELEASED: 'inventory.released',
  INVENTORY_LOW_STOCK: 'inventory.low_stock',
  INVENTORY_OUT_OF_STOCK: 'inventory.out_of_stock',
  INVENTORY_RESTOCKED: 'inventory.restocked',
  
  // ============================================================
  // System Events
  // ============================================================
  SYSTEM_CONFIG_UPDATED: 'system.config_updated',
  SYSTEM_CACHE_CLEARED: 'system.cache_cleared',
  SYSTEM_MAINTENANCE_STARTED: 'system.maintenance_started',
  SYSTEM_MAINTENANCE_COMPLETED: 'system.maintenance_completed',
  SYSTEM_BACKUP_COMPLETED: 'system.backup_completed',
  SYSTEM_BACKUP_FAILED: 'system.backup_failed',
  SYSTEM_QUEUE_LAGGING: 'system.queue_lagging',
  SYSTEM_HEALTH_CHECK_FAILED: 'system.health_check_failed',
  
  // ============================================================
  // Notification Events
  // ============================================================
  NOTIFICATION_SENT: 'notification.sent',
  NOTIFICATION_DELIVERED: 'notification.delivered',
  NOTIFICATION_FAILED: 'notification.failed',
  NOTIFICATION_OPENED: 'notification.opened',
  NOTIFICATION_CLICKED: 'notification.clicked',
  
  // ============================================================
  // Review Events
  // ============================================================
  REVIEW_CREATED: 'review.created',
  REVIEW_UPDATED: 'review.updated',
  REVIEW_DELETED: 'review.deleted',
  REVIEW_MODERATED: 'review.moderated',
  REVIEW_REPORTED: 'review.reported',
  
  // ============================================================
  // Vendor Events
  // ============================================================
  VENDOR_REGISTERED: 'vendor.registered',
  VENDOR_UPDATED: 'vendor.updated',
  VENDOR_VERIFIED: 'vendor.verified',
  VENDOR_SUSPENDED: 'vendor.suspended',
  VENDOR_ACTIVATED: 'vendor.activated',
  VENDOR_PAYOUT_COMPLETED: 'vendor.payout_completed',
  VENDOR_PAYOUT_FAILED: 'vendor.payout_failed',
  
  // ============================================================
  // Ticket/Support Events
  // ============================================================
  TICKET_CREATED: 'ticket.created',
  TICKET_UPDATED: 'ticket.updated',
  TICKET_RESOLVED: 'ticket.resolved',
  TICKET_ASSIGNED: 'ticket.assigned',
  TICKET_ESCALATED: 'ticket.escalated',
  TICKET_CLOSED: 'ticket.closed',
} as const;

// ============================================================
// Event Type Helper Functions
// ============================================================

/**
 * Type-safe event type string
 */
export type EventType = typeof EVENT_TYPES[keyof typeof EVENT_TYPES];

/**
 * Check if a string is a valid event type
 * @param value - String to check
 * @returns True if valid event type
 */
export const isValidEventType = (value: string): value is EventType => {
  return Object.values(EVENT_TYPES).includes(value as EventType);
};

/**
 * Get event category from event type
 * @param eventType - Event type string
 * @returns Event category (e.g., 'user', 'order', 'payment')
 */
export const getEventCategory = (eventType: string): string => {
  const parts = eventType.split('.');
  return parts[0] || 'unknown';
};

/**
 * Get event action from event type
 * @param eventType - Event type string
 * @returns Event action (e.g., 'created', 'updated', 'deleted')
 */
export const getEventAction = (eventType: string): string => {
  const parts = eventType.split('.');
  return parts[parts.length - 1] || 'unknown';
};

// ============================================================
// Type Exports
// ============================================================

export type {
  EventType as EventTypeAlias,
  EventVersionMigration as EventVersionMigrationType,
  EventVersionMigrator as EventVersionMigratorType,
  EventEnvelope as EventEnvelopeType,
  EventSourcingUtils as EventSourcingUtilsType,
  EventStore as EventStoreType,
  EventTypeRegistry as EventTypeRegistryType,
};

// ============================================================
// Default Export
// ============================================================

export default {
  EVENT_TYPES,
  isValidEventType,
  getEventCategory,
  getEventAction,
};
