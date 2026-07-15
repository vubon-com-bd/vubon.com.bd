/**
 * Event Bus Port - Domain Layer Interface (Enterprise Grade)
 * 
 * @module domain/ports/event-bus.port
 * 
 * @description
 * Port (interface) for domain event publishing and subscription.
 * Defines the contract that infrastructure adapters (NestJS EventEmitter, Kafka, RabbitMQ, etc.) must implement.
 * This keeps the domain layer clean and infrastructure-agnostic.
 * 
 * Enterprise Rules:
 * ✅ Domain layer defines the interface (Port)
 * ✅ Infrastructure layer implements the interface (Adapter)
 * ✅ No external dependencies in domain layer
 * ✅ Follows Dependency Inversion Principle (DIP)
 * ✅ Easy to mock for unit testing
 * ✅ Supports synchronous and asynchronous event handling
 * ✅ Supports event batching and retries
 * 
 * @example
 * // Domain usage
 * class UserRegistrationService {
 *   constructor(private readonly eventBus: IEventBus) {}
 *   
 *   async registerUser(user: User): Promise<void> {
 *     // ... registration logic
 *     await this.eventBus.publish(new UserRegisteredEvent(user));
 *   }
 * }
 * 
 * // Infrastructure implementation
 * class EventBusAdapter implements IEventBus {
 *   async publish<T extends IDomainEvent>(event: T): Promise<void> {
 *     await this.eventEmitter.emit(event.constructor.name, event);
 *   }
 * }
 */

// ============================================================
// Types (Domain-Specific)
// ============================================================

/**
 * Base domain event interface
 * All domain events must implement this interface
 */
export interface IDomainEvent {
  /** Unique event ID */
  eventId: string;
  /** Event type (e.g., 'UserRegistered', 'OrderPlaced') */
  eventType: string;
  /** Aggregate ID (e.g., userId, orderId) */
  aggregateId: string;
  /** Version of the aggregate when event was raised */
  aggregateVersion: number;
  /** Timestamp when event occurred */
  occurredOn: Date;
  /** Event version (for versioning) */
  eventVersion: number;
  /** Correlation ID for distributed tracing */
  correlationId?: string | undefined;
  /** Causation ID (previous event that caused this event) */
  causationId?: string | undefined;
  /** User ID who triggered the event */
  triggeredBy?: string | undefined;
  /** Additional metadata */
  metadata?: Record<string, unknown> | undefined;
  
}

/**
 * Domain event handler interface
 */
export interface IEventHandler<T extends IDomainEvent = IDomainEvent> {
  /** Handle the event */
  handle(event: T): Promise<void> | void;
  /** Whether to handle event synchronously (default: false) */
  synchronous?: boolean | undefined;
  /** Priority of the handler (higher = executed first) */
  priority?: number | undefined;
  /** Whether handler should be skipped on error (default: false) */
  skipOnError?: boolean | undefined;
  /** Retry count for async handlers (default: 3) */
  maxRetries?: number | undefined;
  /** Timeout in milliseconds (default: 5000) */
  timeoutMs?: number | undefined;
}

/**
 * Event handler metadata
 */
export interface EventHandlerMetadata {
  /** Handler name */
  name: string;
  /** Event type this handler handles */
  eventType: string;
  /** Whether handler is synchronous */
  synchronous: boolean;
  /** Handler priority */
  priority: number;
  /** Whether to skip on error */
  skipOnError: boolean;
  /** Max retries */
  maxRetries: number;
  /** Timeout in milliseconds */
  timeoutMs: number;
}

/**
 * Event envelope (wraps event with additional context)
 */
export interface EventEnvelope<T extends IDomainEvent = IDomainEvent> {
  /** The actual event */
  event: T;
  /** Event ID (unique) */
  eventId: string;
  /** Event type */
  eventType: string;
  /** Timestamp when event was published */
  publishedAt: Date;
  /** Correlation ID */
  correlationId?: string | undefined;
  /** Causation ID */
  causationId?: string | undefined;
  /** User ID who triggered the event */
  triggeredBy?: string | undefined;
  /** Source service/context */
  source: string;
  /** Version of the event */
  version: number;
  /** Event TTL (time-to-live) in milliseconds */
  ttlMs?: number | undefined;
  /** Retry count */
  retryCount?: number | undefined;
  /** Additional metadata */
  metadata?: Record<string, unknown> | undefined;
}

/**
 * Event publishing options
 */
export interface EventPublishOptions {
  /** Correlation ID for distributed tracing */
  correlationId?: string | undefined;
  /** Causation ID (previous event that caused this event) */
  causationId?: string | undefined;
  /** User ID who triggered the event */
  triggeredBy?: string | undefined;
  /** Source service/context */
  source?: string | undefined;
  /** Event TTL in milliseconds */
  ttlMs?: number | undefined;
  /** Whether to publish synchronously (block until handlers complete) */
  synchronous?: boolean | undefined;
  /** Maximum retries for async publishing */
  maxRetries?: number | undefined;
  /** Additional metadata */
  metadata?: Record<string, unknown> | undefined;
  /** Delay before publishing (for scheduled events) */
  delayMs?: number | undefined;
}

/**
 * Event subscription options
 */
export interface EventSubscriptionOptions {
  /** Priority of the handler (higher = executed first) */
  priority?: number | undefined;
  /** Whether to handle event synchronously */
  synchronous?: boolean | undefined;
  /** Whether to skip on error */
  skipOnError?: boolean | undefined;
  /** Maximum retries for async handlers */
  maxRetries?: number | undefined;
  /** Timeout in milliseconds */
  timeoutMs?: number | undefined;
  /** Filter events by predicate */
  filter?: ((event: IDomainEvent) => boolean) | undefined;
  /** Handler name (for debugging) */
  name?: string | undefined;
}

/**
 * Event subscription token (for unsubscribing)
 */
export interface EventSubscription {
  /** Unique subscription ID */
  id: string;
  /** Event type */
  eventType: string;
  /** Handler metadata */
  handler: EventHandlerMetadata;
  /** Whether subscription is active */
  active: boolean;
  /** Unsubscribe function */
  unsubscribe(): void;
}

/**
 * Event batch
 */
export interface EventBatch<T extends IDomainEvent = IDomainEvent> {
  /** Events in the batch */
  events: T[];
  /** Timestamp when batch was created */
  createdAt: Date;
  /** Batch ID */
  batchId: string;
  /** Source context */
  source: string;
}

/**
 * Event processing result
 */
export interface EventProcessingResult {
  /** Number of events processed */
  processedCount: number;
  /** Number of events that succeeded */
  succeededCount: number;
  /** Number of events that failed */
  failedCount: number;
  /** Errors for failed events */
  errors?: Array<{
    eventId: string;
    eventType: string;
    error: string;
    retryCount: number;
  }> | undefined;
  /** Processing duration in milliseconds */
  durationMs: number;
}

/**
 * Event statistics
 */
export interface EventStatistics {
  /** Total events published */
  totalPublished: number;
  /** Total events processed */
  totalProcessed: number;
  /** Total events failed */
  totalFailed: number;
  /** Average processing time in milliseconds */
  avgProcessingTimeMs: number;
  /** Events by type */
  eventsByType: Record<string, number>;
  /** Handlers by event type */
  handlersByEventType: Record<string, number>;
  /** Last event timestamp */
  lastEventAt?: Date | undefined;
  /** Uptime of event bus in milliseconds */
  uptimeMs: number;
}

// ============================================================
// Main Port Interface
// ============================================================

/**
 * Event Bus Port Interface
 * 
 * Defines the contract for publishing and subscribing to domain events.
 * All event operations should go through this interface.
 * 
 * Enterprise Features:
 * ✅ Publish single or multiple events
 * ✅ Subscribe to events with handlers
 * ✅ Unsubscribe from events
 * ✅ Support for synchronous and asynchronous handling
 * ✅ Event batching
 * ✅ Event filtering
 * ✅ Retry mechanism
 * ✅ Distributed tracing (correlation ID)
 * ✅ Event versioning
 * ✅ Statistics and monitoring
 * 
 * @example
 * // Using the port in domain service
 * class OrderService {
 *   constructor(private readonly eventBus: IEventBus) {}
 * 
 *   async placeOrder(order: Order): Promise<void> {
 *     // ... business logic
 *     await this.eventBus.publish(
 *       new OrderPlacedEvent(order.id, order.userId, order.total),
 *       { correlationId: order.correlationId }
 *     );
 *   }
 * }
 */
export interface IEventBus {
  // ============================================================
  // Publishing Operations
  // ============================================================

  /**
   * Publish a single domain event
   * 
   * @param event - Domain event to publish
   * @param options - Publishing options
   * @returns Promise that resolves when event is published
   * 
   * @example
   * await eventBus.publish(
   *   new UserRegisteredEvent(user.id, user.email, user.fullName),
   *   { correlationId: 'corr_123', source: 'auth-service' }
   * );
   */
  publish<T extends IDomainEvent>(
    event: T,
    options?: EventPublishOptions,
  ): Promise<void>;

  /**
   * Publish multiple domain events as a batch
   * 
   * @param events - Array of domain events to publish
   * @param options - Publishing options
   * @returns Event processing result
   * 
   * @example
   * const result = await eventBus.publishBatch([
   *   new UserRegisteredEvent(user.id, user.email, user.fullName),
   *   new WelcomeEmailSentEvent(user.id, user.email),
   * ]);
   */
  publishBatch<T extends IDomainEvent>(
    events: T[],
    options?: EventPublishOptions,
  ): Promise<EventProcessingResult>;

  /**
   * Publish an event with delayed execution
   * 
   * @param event - Domain event to publish
   * @param delayMs - Delay in milliseconds
   * @param options - Publishing options
   * @returns Scheduled event ID
   * 
   * @example
   * const scheduledId = await eventBus.publishDelayed(
   *   new SessionExpiredEvent(sessionId),
   *   60000, // 1 minute
   *   { correlationId: 'corr_123' }
   * );
   */
  publishDelayed<T extends IDomainEvent>(
    event: T,
    delayMs: number,
    options?: EventPublishOptions,
  ): Promise<string>;

  /**
   * Cancel a scheduled event
   * 
   * @param scheduledId - Scheduled event ID
   * @returns Whether event was cancelled
   * 
   * @example
   * const cancelled = await eventBus.cancelScheduled('scheduled_123');
   */
  cancelScheduled(scheduledId: string): Promise<boolean>;

  
  // ============================================================
  // Subscription Operations
  // ============================================================

  /**
   * Subscribe to a specific event type
   * 
   * @param eventType - Event type to subscribe to
   * @param handler - Event handler function
   * @param options - Subscription options
   * @returns Subscription token for unsubscribing
   * 
   * @example
   * const subscription = await eventBus.subscribe(
   *   'UserRegisteredEvent',
   *   async (event: UserRegisteredEvent) => {
   *     await sendWelcomeEmail(event.email, event.fullName);
   *   },
   *   { priority: 1 }
   * );
   * 
   * // Later...
   * subscription.unsubscribe();
   */
  subscribe<T extends IDomainEvent>(
    eventType: string,
    handler: (event: T) => Promise<void> | void,
    options?: EventSubscriptionOptions,
  ): Promise<EventSubscription>;

  /**
   * Subscribe to multiple event types with the same handler
   * 
   * @param eventTypes - Array of event types to subscribe to
   * @param handler - Event handler function
   * @param options - Subscription options
   * @returns Array of subscription tokens
   * 
   * @example
   * const subscriptions = await eventBus.subscribeAll(
   *   ['UserRegisteredEvent', 'OrderPlacedEvent'],
   *   async (event) => {
   *     await updateAnalytics(event);
   *   }
   * );
   */
  subscribeAll<T extends IDomainEvent>(
    eventTypes: string[],
    handler: (event: T) => Promise<void> | void,
    options?: EventSubscriptionOptions,
  ): Promise<EventSubscription[]>;

  /**
   * Subscribe to all events (catch-all handler)
   * 
   * @param handler - Event handler function
   * @param options - Subscription options
   * @returns Subscription token
   * 
   * @example
   * const subscription = await eventBus.subscribeAllEvents(
   *   async (event) => {
   *     await auditLog(event);
   *   },
   *   { priority: 0, name: 'AuditLogger' }
   * );
   */
  subscribeAllEvents(
    handler: (event: IDomainEvent) => Promise<void> | void,
    options?: EventSubscriptionOptions,
  ): Promise<EventSubscription>;

  /**
   * Subscribe with a filter predicate
   * 
   * @param eventType - Event type to subscribe to
   * @param filter - Filter function
   * @param handler - Event handler function
   * @param options - Subscription options
   * @returns Subscription token
   * 
   * @example
   * const subscription = await eventBus.subscribeWithFilter(
   *   'OrderPlacedEvent',
   *   (event) => event.total > 1000,
   *   async (event) => {
   *     await notifyVIPSupport(event);
   *   }
   * );
   */
  subscribeWithFilter<T extends IDomainEvent>(
    eventType: string,
    filter: (event: T) => boolean,
    handler: (event: T) => Promise<void> | void,
    options?: EventSubscriptionOptions,
  ): Promise<EventSubscription>;

  /**
   * Unsubscribe from an event type
   * 
   * @param subscriptionId - Subscription ID
   * @returns Whether unsubscription was successful
   * 
   * @example
   * const unsubscribed = await eventBus.unsubscribe('sub_123');
   */
  unsubscribe(subscriptionId: string): Promise<boolean>;

  /**
   * Unsubscribe all handlers for an event type
   * 
   * @param eventType - Event type
   * @returns Number of handlers unsubscribed
   * 
   * @example
   * const count = await eventBus.unsubscribeAll('UserRegisteredEvent');
   */
  unsubscribeAll(eventType: string): Promise<number>;

  // ============================================================
  // Event Inspection Operations
  // ============================================================

  /**
   * Get all event types with subscriptions
   * 
   * @returns Array of event types
   * 
   * @example
   * const types = await eventBus.getEventTypes();
   * console.log(types); // ['UserRegisteredEvent', 'OrderPlacedEvent', ...]
   */
  getEventTypes(): Promise<string[]>;

  /**
   * Get handlers for a specific event type
   * 
   * @param eventType - Event type
   * @returns Array of handler metadata
   * 
   * @example
   * const handlers = await eventBus.getEventHandlers('UserRegisteredEvent');
   * console.log(handlers); // [{ name: 'WelcomeEmailSender', priority: 1 }, ...]
   */
  getEventHandlers(eventType: string): Promise<EventHandlerMetadata[]>;

  /**
   * Check if an event type has active subscriptions
   * 
   * @param eventType - Event type
   * @returns True if event type has subscribers
   * 
   * @example
   * const hasSubscribers = await eventBus.hasSubscribers('UserRegisteredEvent');
   */
  hasSubscribers(eventType: string): Promise<boolean>;

  // ============================================================
  // Event Store Operations (For Event Sourcing)
  // ============================================================

  /**
   * Store an event in the event store
   * 
   * @param event - Domain event to store
   * @param options - Storage options
   * @returns Stored event ID
   * 
   * @example
   * const storedId = await eventBus.storeEvent(
   *   new UserRegisteredEvent(user.id, user.email, user.fullName),
   *   { aggregateId: user.id, expectedVersion: 0 }
   * );
   */
  storeEvent<T extends IDomainEvent>(
    event: T,
    options?: {
      aggregateId: string;
      expectedVersion?: number | undefined;
      metadata?: Record<string, unknown> | undefined;
    },
  ): Promise<string>;

  /**
   * Get events for an aggregate
   * 
   * @param aggregateId - Aggregate ID
   * @param fromVersion - Starting version (optional)
   * @param toVersion - Ending version (optional)
   * @returns Array of stored events
   * 
   * @example
   * const events = await eventBus.getAggregateEvents('user_123');
   * console.log(events); // [UserRegisteredEvent, UserVerifiedEvent, ...]
   */
  getAggregateEvents(
    aggregateId: string,
    fromVersion?: number,
    toVersion?: number,
  ): Promise<IDomainEvent[]>;

  /**
   * Replay events for an aggregate
   * 
   * @param aggregateId - Aggregate ID
   * @param handler - Event handler for replay
   * @param options - Replay options
   * @returns Number of events replayed
   * 
   * @example
   * const count = await eventBus.replayEvents(
   *   'user_123',
   *   async (event) => {
   *     await rebuildProjection(event);
   *   },
   *   { fromVersion: 0, toVersion: 5 }
   * );
   */
  replayEvents(
    aggregateId: string,
    handler: (event: IDomainEvent) => Promise<void> | void,
    options?: {
      fromVersion?: number | undefined;
      toVersion?: number | undefined;
      /** Whether to include events after the given version */
      inclusive?: boolean | undefined;
    },
  ): Promise<number>;

  // ============================================================
  // Event Processing Control
  // ============================================================

  /**
   * Pause event processing for a specific event type
   * 
   * @param eventType - Event type to pause
   * @returns Whether pause was successful
   * 
   * @example
   * await eventBus.pauseProcessing('UserRegisteredEvent');
   */
  pauseProcessing(eventType: string): Promise<boolean>;

  /**
   * Resume event processing for a specific event type
   * 
   * @param eventType - Event type to resume
   * @returns Whether resume was successful
   * 
   * @example
   * await eventBus.resumeProcessing('UserRegisteredEvent');
   */
  resumeProcessing(eventType: string): Promise<boolean>;

  /**
   * Check if event processing is paused
   * 
   * @param eventType - Event type to check
   * @returns True if paused
   * 
   * @example
   * const isPaused = await eventBus.isPaused('UserRegisteredEvent');
   */
  isPaused(eventType: string): Promise<boolean>;

  // ============================================================
  // Event Bus Lifecycle
  // ============================================================

  /**
   * Start the event bus
   * 
   * @returns Promise that resolves when started
   * 
   * @example
   * await eventBus.start();
   */
  start(): Promise<void>;

  /**
   * Stop the event bus
   * 
   * @param graceful - Whether to stop gracefully (process remaining events)
   * @returns Promise that resolves when stopped
   * 
   * @example
   * await eventBus.stop(true);
   */
  stop(graceful?: boolean): Promise<void>;

  /**
   * Check if event bus is running
   * 
   * @returns True if running
   * 
   * @example
   * const isRunning = await eventBus.isRunning();
   */
  isRunning(): Promise<boolean>;

  /**
   * Get event bus health status
   * 
   * @returns Health status
   * 
   * @example
   * const health = await eventBus.getHealth();
   * console.log(health.status); // 'healthy' | 'degraded' | 'unhealthy'
   */
  getHealth(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    uptimeMs: number;
    pendingEvents: number;
    processingLatencyMs?: number | undefined;
    error?: string | undefined;
  }>;

  /**
   * Get event bus statistics
   * 
   * @returns Event statistics
   * 
   * @example
   * const stats = await eventBus.getStatistics();
   * console.log(stats.totalPublished); // 12345
   */
  getStatistics(): Promise<EventStatistics>;

  /**
   * Clear all event bus state (for testing)
   * 
   * @returns Promise that resolves when cleared
   * 
   * @example
   * await eventBus.clear();
   */
  clear(): Promise<void>;
}

// ============================================================
// Mock Event Bus (for testing)
// ============================================================

/**
 * Event handler entry (internal type for subscription management)
 */
interface EventHandlerEntry {
  id: string;
  handler: (event: IDomainEvent) => Promise<void> | void;
  filter?: ((event: IDomainEvent) => boolean) | undefined;
  options?: EventSubscriptionOptions | undefined;
}

// ============================================================
// Mock Event Bus (for testing)
// ============================================================

export class MockEventBus implements IEventBus {
  private events: IDomainEvent[] = [];
  private subscriptions: Map<string, EventHandlerEntry[]> = new Map();
  private pausedEventTypes: Set<string> = new Set();
  private isStarted: boolean = false;
  private isStopped: boolean = false;
  private eventStore: Map<string, IDomainEvent[]> = new Map();
  private scheduledEvents: Map<string, { event: IDomainEvent; delayMs: number; timeoutId: NodeJS.Timeout }> = new Map();
  private statistics: EventStatistics = {
    totalPublished: 0,
    totalProcessed: 0,
    totalFailed: 0,
    avgProcessingTimeMs: 0,
    eventsByType: {},
    handlersByEventType: {},
    uptimeMs: 0,
  };
  private startTime: Date = new Date();

  constructor(
    private readonly shouldFail: boolean = false,
    private readonly failProbability: number = 0,
    private readonly delayMs: number = 0,
  ) {}

  private async delay(): Promise<void> {
    if (this.delayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, this.delayMs));
    }
  }

  private generateId(): string {
    return `evt_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  }

  private shouldThrowError(): boolean {
    if (this.shouldFail) {
      return Math.random() < this.failProbability;
    }
    return false;
  }

  async publish<T extends IDomainEvent>(
    event: T,
    options?: EventPublishOptions,
  ): Promise<void> {
    await this.delay();

    if (this.shouldThrowError()) {
      throw new Error('Mock event bus error');
    }

    const envelope = this.createEnvelope(event, options);
    this.events.push(envelope.event);

    // Update statistics
    this.statistics.totalPublished++;
    this.statistics.eventsByType[event.eventType] = (this.statistics.eventsByType[event.eventType] || 0) + 1;

    // Process handlers
    const handlers = this.subscriptions.get(event.eventType) || [];
    const allHandlers = this.subscriptions.get('*') || [];

    const allSubscribers = [...handlers, ...allHandlers];

    for (const sub of allSubscribers) {
      // Check if event type is paused
      if (this.pausedEventTypes.has(event.eventType)) {
        continue;
      }

      // Apply filter
      if (sub.filter && !sub.filter(event)) {
        continue;
      }

      try {
        await sub.handler(event);
        this.statistics.totalProcessed++;
      } catch (error) {
        this.statistics.totalFailed++;
        if (!sub.options?.skipOnError) {
          throw error;
        }
      }
    }

    // Store event if storeEvent was called
    // This is handled separately in storeEvent method
  }

  async publishBatch<T extends IDomainEvent>(
    events: T[],
    options?: EventPublishOptions,
  ): Promise<EventProcessingResult> {
    await this.delay();

    const result: EventProcessingResult = {
      processedCount: events.length,
      succeededCount: 0,
      failedCount: 0,
      durationMs: 0,
      errors: [],
    };

    const startTime = Date.now();

    for (const event of events) {
      try {
        await this.publish(event, options);
        result.succeededCount++;
      } catch (error) {
        result.failedCount++;
        result.errors?.push({
          eventId: event.eventId,
          eventType: event.eventType,
          error: (error as Error).message,
          retryCount: 0,
        });
      }
    }

    result.durationMs = Date.now() - startTime;
    return result;
  }

  async publishDelayed<T extends IDomainEvent>(
    event: T,
    delayMs: number,
    options?: EventPublishOptions,
  ): Promise<string> {
    const scheduledId = this.generateId();

    const timeoutId = setTimeout(async () => {
      try {
        await this.publish(event, options);
        this.scheduledEvents.delete(scheduledId);
      } catch (error) {
        // Log error but don't throw
        console.error(`Scheduled event failed: ${(error as Error).message}`);
      }
    }, delayMs);

    this.scheduledEvents.set(scheduledId, {
      event,
      delayMs,
      timeoutId,
    });

    return scheduledId;
  }

  async cancelScheduled(scheduledId: string): Promise<boolean> {
    const scheduled = this.scheduledEvents.get(scheduledId);
    if (!scheduled) {
      return false;
    }

    clearTimeout(scheduled.timeoutId);
    this.scheduledEvents.delete(scheduledId);
    return true;
  }

  async subscribe<T extends IDomainEvent>(
    eventType: string,
    handler: (event: T) => Promise<void> | void,
    options?: EventSubscriptionOptions,
  ): Promise<EventSubscription> {
    const subscriptionId = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    if (!this.subscriptions.has(eventType)) {
      this.subscriptions.set(eventType, []);
    }

    const handlers = this.subscriptions.get(eventType)!;
    
    // ✅ FIXED: Create entry with proper typing
    const handlerEntry: EventHandlerEntry = {
      id: subscriptionId,
      handler: handler as (event: IDomainEvent) => Promise<void> | void,
      filter: options?.filter,
      options: options,
    };

    // Insert according to priority
    const priority = options?.priority || 0;
    let inserted = false;
    
    // ✅ FIXED: Added type guard to check handlers[i] exists
    for (let i = 0; i < handlers.length; i++) {
      const currentHandler = handlers[i];
      if (currentHandler) {
        const existingPriority = currentHandler.options?.priority || 0;
        if (priority > existingPriority) {
          handlers.splice(i, 0, handlerEntry);
          inserted = true;
          break;
        }
      }
    }
    
    if (!inserted) {
      handlers.push(handlerEntry);
    }

    // Update statistics
    this.statistics.handlersByEventType[eventType] = (this.statistics.handlersByEventType[eventType] || 0) + 1;

    return {
      id: subscriptionId,
      eventType,
      handler: {
        name: options?.name || 'AnonymousHandler',
        eventType,
        synchronous: options?.synchronous || false,
        priority: options?.priority || 0,
        skipOnError: options?.skipOnError || false,
        maxRetries: options?.maxRetries || 3,
        timeoutMs: options?.timeoutMs || 5000,
      },
      active: true,
      unsubscribe: () => {
        const handlers = this.subscriptions.get(eventType);
        if (handlers) {
          const index = handlers.findIndex((h) => h.id === subscriptionId);
          if (index !== -1) {
            handlers.splice(index, 1);
          }
        }
        // Update statistics
        const currentCount = this.statistics.handlersByEventType[eventType] || 0;
        if (currentCount > 0) {
          this.statistics.handlersByEventType[eventType] = currentCount - 1;
        }
      },
    };
  }

  async subscribeAll<T extends IDomainEvent>(
    eventTypes: string[],
    handler: (event: T) => Promise<void> | void,
    options?: EventSubscriptionOptions,
  ): Promise<EventSubscription[]> {
    const subscriptions: EventSubscription[] = [];
    for (const eventType of eventTypes) {
      const sub = await this.subscribe(eventType, handler, options);
      subscriptions.push(sub);
    }
    return subscriptions;
  }

  async subscribeAllEvents(
    handler: (event: IDomainEvent) => Promise<void> | void,
    options?: EventSubscriptionOptions,
  ): Promise<EventSubscription> {
    return this.subscribe('*', handler, options);
  }

  async subscribeWithFilter<T extends IDomainEvent>(
    eventType: string,
    filter: (event: T) => boolean,
    handler: (event: T) => Promise<void> | void,
    options?: EventSubscriptionOptions,
  ): Promise<EventSubscription> {
    return this.subscribe(
      eventType,
      handler,
      {
        ...options,
        filter: filter as (event: IDomainEvent) => boolean,
      },
    );
  }

  async unsubscribe(subscriptionId: string): Promise<boolean> {
    for (const [eventType, handlers] of this.subscriptions) {
      const index = handlers.findIndex((h) => h.id === subscriptionId);
      if (index !== -1) {
        handlers.splice(index, 1);
        // Update statistics
        const currentCount = this.statistics.handlersByEventType[eventType] || 0;
        if (currentCount > 0) {
          this.statistics.handlersByEventType[eventType] = currentCount - 1;
        }
        return true;
      }
    }
    return false;
  }

  async unsubscribeAll(eventType: string): Promise<number> {
    const handlers = this.subscriptions.get(eventType);
    if (!handlers) {
      return 0;
    }
    const count = handlers.length;
    this.subscriptions.delete(eventType);
    this.statistics.handlersByEventType[eventType] = 0;
    return count;
  }

  async getEventTypes(): Promise<string[]> {
    return Array.from(this.subscriptions.keys());
  }

  async getEventHandlers(eventType: string): Promise<EventHandlerMetadata[]> {
    const handlers = this.subscriptions.get(eventType);
    if (!handlers) {
      return [];
    }
    return handlers.map((h) => ({
      name: h.options?.name || 'AnonymousHandler',
      eventType,
      synchronous: h.options?.synchronous || false,
      priority: h.options?.priority || 0,
      skipOnError: h.options?.skipOnError || false,
      maxRetries: h.options?.maxRetries || 3,
      timeoutMs: h.options?.timeoutMs || 5000,
    }));
  }

  async hasSubscribers(eventType: string): Promise<boolean> {
    const handlers = this.subscriptions.get(eventType);
    return !!handlers && handlers.length > 0;
  }

  async storeEvent<T extends IDomainEvent>(
    event: T,
    options?: {
      aggregateId: string;
      expectedVersion?: number | undefined;
      metadata?: Record<string, unknown> | undefined;
    },
  ): Promise<string> {
    const aggregateId = options?.aggregateId || event.aggregateId;
    
    if (!this.eventStore.has(aggregateId)) {
      this.eventStore.set(aggregateId, []);
    }

    const events = this.eventStore.get(aggregateId)!;
    
    // Check version
    if (options?.expectedVersion !== undefined) {
      const currentVersion = events.length;
      if (currentVersion !== options.expectedVersion) {
        throw new Error(
          `Concurrency conflict: Expected version ${options.expectedVersion}, but got ${currentVersion}`,
        );
      }
    }

    events.push(event);
    this.eventStore.set(aggregateId, events);
    
    return event.eventId;
  }

  async getAggregateEvents(
    aggregateId: string,
    fromVersion?: number,
    toVersion?: number,
  ): Promise<IDomainEvent[]> {
    const events = this.eventStore.get(aggregateId) || [];
    
    let filtered = events;
    if (fromVersion !== undefined) {
      filtered = filtered.filter((_, index) => index >= fromVersion);
    }
    if (toVersion !== undefined) {
      filtered = filtered.filter((_, index) => index <= toVersion);
    }
    
    return filtered;
  }

  async replayEvents(
    aggregateId: string,
    handler: (event: IDomainEvent) => Promise<void> | void,
    options?: {
      fromVersion?: number | undefined;
      toVersion?: number | undefined;
      inclusive?: boolean | undefined;
    },
  ): Promise<number> {
    const events = await this.getAggregateEvents(
      aggregateId,
      options?.fromVersion,
      options?.toVersion,
    );

    let count = 0;
    for (const event of events) {
      try {
        await handler(event);
        count++;
      } catch (error) {
        console.error(`Event replay failed: ${(error as Error).message}`);
      }
    }

    return count;
  }

  async pauseProcessing(eventType: string): Promise<boolean> {
    this.pausedEventTypes.add(eventType);
    return true;
  }

  async resumeProcessing(eventType: string): Promise<boolean> {
    this.pausedEventTypes.delete(eventType);
    return true;
  }

  async isPaused(eventType: string): Promise<boolean> {
    return this.pausedEventTypes.has(eventType);
  }

  async start(): Promise<void> {
    this.isStarted = true;
    this.isStopped = false;
    this.startTime = new Date();
  }

  async stop(graceful: boolean = true): Promise<void> {
    if (graceful) {
      // Process remaining events
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    this.isStopped = true;
    this.isStarted = false;
  }

  async isRunning(): Promise<boolean> {
    return this.isStarted && !this.isStopped;
  }

  async getHealth(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    uptimeMs: number;
    pendingEvents: number;
    processingLatencyMs?: number | undefined;
    error?: string | undefined;
  }> {
    return {
      status: this.isStarted ? 'healthy' : 'unhealthy',
      uptimeMs: Date.now() - this.startTime.getTime(),
      pendingEvents: this.events.length,
      processingLatencyMs: 10,
      error: this.isStopped ? 'Event bus stopped' : undefined,
    };
  }

  async getStatistics(): Promise<EventStatistics> {
    return {
      ...this.statistics,
      uptimeMs: Date.now() - this.startTime.getTime(),
    };
  }

  async clear(): Promise<void> {
    this.events = [];
    this.subscriptions.clear();
    this.pausedEventTypes.clear();
    this.eventStore.clear();
    this.scheduledEvents.clear();
    this.statistics = {
      totalPublished: 0,
      totalProcessed: 0,
      totalFailed: 0,
      avgProcessingTimeMs: 0,
      eventsByType: {},
      handlersByEventType: {},
      uptimeMs: 0,
    };
    this.startTime = new Date();
  }

  private createEnvelope<T extends IDomainEvent>(
    event: T,
    options?: EventPublishOptions,
  ): EventEnvelope<T> {
    return {
      event,
      eventId: event.eventId || this.generateId(),
      eventType: event.eventType,
      publishedAt: new Date(),
      correlationId: options?.correlationId || event.correlationId,
      causationId: options?.causationId || event.causationId,
      triggeredBy: options?.triggeredBy || event.triggeredBy,
      source: options?.source || 'unknown',
      version: event.eventVersion || 1,
      ttlMs: options?.ttlMs,
      retryCount: 0,
      metadata: options?.metadata || event.metadata,
    };
  }
}


export interface IAuditService {
  /**
   * Log an audit event
   * 
   * @param data - Audit log data
   * @returns Promise that resolves when audit is logged
   */
  log(data: {
    action: string;
    userId?: string;
    email?: string;
    phone?: string;
    status: string;
    reason?: string;
    ipAddress?: string;
    userAgent?: string;
    correlationId?: string;
    metadata?: Record<string, unknown>;
  }): Promise<void>;
}
// ============================================================
// Type Exports (for convenience)
// ============================================================

export type { IEventBus as EventBusPort };
