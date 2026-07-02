/**
 * Event Bus Interface - Pure Application Contract (Enterprise Enhanced v2.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/services/interfaces/event-bus.interface
 */

// ✅ Phase-1: Import from shared-constants for centralized event names
import { EVENT_NAMES } from '@vubon/shared-constants';
// ✅ Phase-1: Import from shared-types for type safety
import type { EventMetadata, EventPayload, EventHandlerResult } from '@vubon/shared-types';

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT: Circuit Breaker Configuration
// ============================================================

export interface CircuitBreakerConfig {
  failureThreshold: number;
  timeoutMs: number;
  successThreshold: number;
  enabled: boolean;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT: Rate Limiting for Handlers
// ============================================================

export interface HandlerRateLimitConfig {
  maxEvents: number;
  windowSeconds: number;
  enabled: boolean;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT: Event Schema Validation
// ============================================================

export interface EventSchemaValidation {
  schema: Record<string, unknown>;
  required: boolean;
  version: number;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT: Event TTL Configuration
// ============================================================

export interface EventTTLConfig {
  ttlSeconds: number;
  deleteAfterExpiry: boolean;
}

// ============================================================
// Domain Event Interface (Enhanced with Bangladesh metadata)
// ============================================================

export interface DomainEvent {
  readonly eventId: string;
  readonly eventName: keyof typeof EVENT_NAMES;
  readonly occurredAt: Date;
  readonly aggregateId: string;
  readonly aggregateVersion: number;
  readonly eventVersion: number;
  readonly correlationId: string | undefined;
  readonly causationId: string | undefined;
  readonly userId: string | undefined;
  readonly userEmail: string | undefined;
  readonly userPhone: string | undefined;
  readonly ipAddress: string | undefined;
  readonly userAgent: string | undefined;
  readonly deviceId: string | undefined;
  readonly sessionId: string | undefined;
  readonly requestId: string | undefined;
  readonly metadata: EventMetadata | undefined;
  readonly payload: EventPayload<unknown> | undefined;
  readonly isIdempotent: boolean | undefined;
  readonly partitionKey: string | undefined;
  readonly source: string | undefined;
  readonly ttlSeconds: number | undefined;
  readonly expiresAt: Date | undefined;
  readonly priority: number | undefined;
  readonly district: string | undefined;
  readonly division: string | undefined;
}

// ============================================================
// Event Handler Type with Result
// ============================================================

export type EventHandler<T extends DomainEvent = DomainEvent> = (event: T) => Promise<EventHandlerResult>;

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT: Batch Progress Callback
// ============================================================

export interface BatchProgress {
  total: number;
  processed: number;
  succeeded: number;
  failed: number;
  percentage: number;
  estimatedRemainingMs?: number;
}

// ============================================================
// Event Handler Options (Enhanced)
// ============================================================

export interface EventHandlerOptions {
  once?: boolean;
  priority?: number;
  timeoutMs?: number;
  retryOnFailure?: boolean;
  maxRetries?: number;
  retryDelayMs?: number;
  exponentialBackoff?: boolean;
  filter?: (event: DomainEvent) => boolean | Promise<boolean>;
  circuitBreaker?: CircuitBreakerConfig;
  rateLimit?: HandlerRateLimitConfig;
  idempotencyKeyExtractor?: (event: DomainEvent) => string;
  sendToDLQ?: boolean;
  dlqMaxAgeSeconds?: number;
}

// ============================================================
// Event Subscription Interface (Enhanced)
// ============================================================

export interface EventSubscription {
  unsubscribe(): void;
  readonly id: string;
  readonly eventName: string;
  readonly isActive: boolean;
  readonly options?: EventHandlerOptions;
  pause(): void;
  resume(): void;
  getStats(): SubscriptionStats;
  getCircuitBreakerStatus(): { isOpen: boolean; failureCount: number; nextAttemptAt?: Date };
  resetCircuitBreaker(): void;
}

// ============================================================
// Subscription Statistics (Enhanced)
// ============================================================

export interface SubscriptionStats {
  processedCount: number;
  failedCount: number;
  lastProcessedAt?: Date;
  lastError?: string;
  averageProcessingTimeMs: number;
  minProcessingTimeMs?: number;
  maxProcessingTimeMs?: number;
  p95ProcessingTimeMs?: number;
  p99ProcessingTimeMs?: number;
  circuitBreakerOpenCount?: number;
  rateLimitHitCount?: number;
}

// ============================================================
// Batch Publishing Options (Enhanced)
// ============================================================

export interface BatchPublishOptions {
  stopOnError?: boolean;
  parallel?: boolean;
  maxConcurrency?: number;
  timeoutMs?: number;
  onProgress?: (progress: BatchProgress) => void;
  preserveOrder?: boolean;
  batchSize?: number;
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
    p95ExecutionTimeMs?: number;
    p99ExecutionTimeMs?: number;
  };
  eventsByDistrict?: Record<string, number>;
  eventsByMobileOperator?: Record<string, number>;
  eventsByHour?: Record<number, number>;
  eventsByPriority?: Record<number, number>;
  dlqSize?: number;
  circuitBreakerOpenCount?: number;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT: Event Schema Registry
// ============================================================

export interface EventSchemaRegistry {
  registerSchema(eventName: string, schema: EventSchemaValidation): void;
  getSchema(eventName: string): EventSchemaValidation | undefined;
  validateEvent(event: DomainEvent): { isValid: boolean; errors?: string[] };
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT: Event Stream Query Options
// ============================================================

export interface EventStreamQueryOptions {
  fromDate?: Date;
  toDate?: Date;
  aggregateId?: string;
  eventNames?: string[];
  limit?: number;
  offset?: number;
  sortOrder?: 'asc' | 'desc';
  partitionKey?: string;
  district?: string;
  mobileOperator?: string;
}

// ============================================================
// Event Bus Interface (Enhanced)
// ============================================================

export interface EventBus {
  publish(event: DomainEvent): Promise<void>;
  publishAll(events: DomainEvent[], options?: BatchPublishOptions): Promise<void>;
  publishWithRetry(
    event: DomainEvent,
    maxRetries?: number,
    retryDelayMs?: number
  ): Promise<void>;
  publishAsync(event: DomainEvent): void;
  subscribe(
    eventName: keyof typeof EVENT_NAMES | '*',
    handler: EventHandler,
    options?: EventHandlerOptions
  ): EventSubscription;
  subscribeWithFilter(
    eventName: keyof typeof EVENT_NAMES,
    filter: (event: DomainEvent) => boolean | Promise<boolean>,
    handler: EventHandler,
    options?: EventHandlerOptions
  ): EventSubscription;
  subscribeByPattern(
    pattern: string,
    handler: EventHandler,
    options?: EventHandlerOptions
  ): EventSubscription;
  subscribeOnce(
    eventName: keyof typeof EVENT_NAMES,
    handler: EventHandler,
    options?: Omit<EventHandlerOptions, 'once'>
  ): EventSubscription;
  unsubscribe(subscriptionId: string): Promise<boolean>;
  getSubscriptions(): string[];
  getSubscriptionsByEvent(eventName: string): string[];
  hasSubscribers(eventName: string): boolean;
  clearSubscriptions(): void;
  getStatistics(): Promise<EventBusStatistics>;
  resetStatistics(): void;
  healthCheck(): Promise<boolean>;
  replayEvents(
    fromEventId: string,
    toEventId?: string,
    handler?: EventHandler,
    options?: { batchSize?: number; parallel?: boolean }
  ): Promise<void>;
  replayAggregateEvents(
    aggregateId: string,
    fromVersion: number,
    toVersion?: number,
    handler?: EventHandler
  ): Promise<void>;
  getDeadLetterEvents(limit?: number): Promise<Array<{ event: DomainEvent; error: string; failedAt: Date; retryCount: number }>>;
  retryFailedEvents(eventIds?: string[]): Promise<number>;
  clearDeadLetterQueue(olderThan?: Date): Promise<number>;
  queryEvents(options: EventStreamQueryOptions): Promise<DomainEvent[]>;
  getEventById(eventId: string): Promise<DomainEvent | null>;
  getEventsByCorrelationId(correlationId: string): Promise<DomainEvent[]>;
  getSchemaRegistry(): EventSchemaRegistry;
  getMonitoringMetrics(): Promise<{
    eventsPerSecond: number;
    averageLatencyMs: number;
    errorRate: number;
    activeSubscriptions: number;
    dlqSize: number;
    circuitBreakersOpen: number;
  }>;
  getActiveAlerts(): Promise<Array<{
    id: string;
    severity: 'info' | 'warning' | 'critical';
    message: string;
    triggeredAt: Date;
    acknowledged: boolean;
  }>>;
}

// ============================================================
// Abstract Base Event Class (Enhanced)
// ============================================================

export abstract class BaseDomainEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly occurredAt: Date;
  public readonly eventVersion: number;
  public readonly correlationId: string | undefined;
  public readonly causationId: string | undefined;
  public readonly userId: string | undefined;
  public readonly userEmail: string | undefined;
  public readonly userPhone: string | undefined;
  public readonly ipAddress: string | undefined;
  public readonly userAgent: string | undefined;
  public readonly deviceId: string | undefined;
  public readonly sessionId: string | undefined;
  public readonly requestId: string | undefined;
  public readonly metadata: EventMetadata | undefined;
  public readonly payload: EventPayload<unknown> | undefined;
  public readonly isIdempotent: boolean | undefined;
  public readonly partitionKey: string | undefined;
  public readonly source: string | undefined;
  public readonly ttlSeconds: number | undefined;
  public readonly expiresAt: Date | undefined;
  public readonly priority: number | undefined;
  public readonly district: string | undefined;
  public readonly division: string | undefined;

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
      payload?: EventPayload<unknown>;
      isIdempotent?: boolean;
      partitionKey?: string;
      source?: string;
      eventVersion?: number;
      ttlSeconds?: number;
      expiresAt?: Date;
      priority?: number;
      district?: string;
      division?: string;
    },
  ) {
    this.eventId = generateEventId();
    this.occurredAt = new Date();
    this.eventVersion = options?.eventVersion ?? 1;
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
    this.ttlSeconds = options?.ttlSeconds;
    this.expiresAt = options?.expiresAt;
    this.priority = options?.priority;
    this.district = options?.district;
    this.division = options?.division;
  }
  
  public isExpired(): boolean {
    if (!this.expiresAt) return false;
    return new Date() > this.expiresAt;
  }
}

// ============================================================
// Utility Functions
// ============================================================

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
// Helper to create EventPayload
// ============================================================

function createEventPayload<T>(
  data: T, 
  metadata?: Partial<EventMetadata>,
  version?: string,
  timestamp?: string
): EventPayload<T> {
  return {
    data,
    metadata: {
      correlationId: metadata?.correlationId || crypto.randomUUID?.() || 'unknown',
      urgency: metadata?.urgency || 'normal',
      priority: metadata?.priority || 0,
      ...metadata,
    },
    version: version || '1.0',
    timestamp: timestamp || new Date().toISOString(),
  };
}

// ============================================================
// Helper to create EventMetadata
// ============================================================

function createEventMetadata(
  correlationId?: string,
  urgency?: 'low' | 'normal' | 'high' | 'critical',
  priority?: number,
  customMetadata?: Record<string, unknown>
): EventMetadata {
  return {
    correlationId: correlationId || crypto.randomUUID?.() || 'unknown',
    urgency: urgency || 'normal',
    priority: priority || 0,
    ...customMetadata,
  };
}

// ============================================================
// Example Events - Using event name keys (not values)
// ============================================================

// User Registered Event
export class UserRegisteredEvent extends BaseDomainEvent {
  public readonly email: string;
  public readonly fullName: string;
  public readonly phoneNumber: string | undefined;

  constructor(
    aggregateId: string,
    aggregateVersion: number,
    email: string,
    fullName: string,
    phoneNumber?: string,
    district?: string,
    options?: ConstructorParameters<typeof BaseDomainEvent>[3],
  ) {
    const payloadData = { email, fullName, phoneNumber, district };
    const metadata = createEventMetadata(
      options?.correlationId,
      'normal',
      0,
      { eventType: 'user.registered' }
    );
    const payload = createEventPayload(payloadData, metadata);
    
    // ✅ FIXED: Only include district if it's defined
    const superOptions: ConstructorParameters<typeof BaseDomainEvent>[3] = {
      ...options,
      metadata,
      payload,
    };
    
    // Only add district if it's defined (not undefined)
    if (district !== undefined) {
      superOptions.district = district;
    }
    
    super('DOMAIN_USER_REGISTERED' as keyof typeof EVENT_NAMES, aggregateId, aggregateVersion, superOptions);
    this.email = email;
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
  }
}

// User Verified Event
export class UserVerifiedEvent extends BaseDomainEvent {
  public readonly userId: string;
  public readonly verificationType: 'email' | 'phone';
  public readonly verifiedAt: Date;

  constructor(
    aggregateId: string,
    aggregateVersion: number,
    userId: string,
    verificationType: 'email' | 'phone',
    options?: ConstructorParameters<typeof BaseDomainEvent>[3],
  ) {
    const payloadData = { userId, verificationType, verifiedAt: new Date() };
    const metadata = createEventMetadata(
      options?.correlationId,
      'normal',
      0,
      { securityEvent: true }
    );
    const payload = createEventPayload(payloadData, metadata);
    
    const superOptions: ConstructorParameters<typeof BaseDomainEvent>[3] = {
      ...options,
      userId,
      metadata,
      payload,
    };
    
    super('DOMAIN_USER_VERIFIED' as keyof typeof EVENT_NAMES, aggregateId, aggregateVersion, superOptions);
    this.userId = userId;
    this.verificationType = verificationType;
    this.verifiedAt = new Date();
  }
}

// User Suspended Event
export class UserSuspendedEvent extends BaseDomainEvent {
  public readonly userId: string;
  public readonly reason: string;
  public readonly suspendedUntil: Date | undefined;

  constructor(
    aggregateId: string,
    aggregateVersion: number,
    userId: string,
    reason: string,
    suspendedUntil?: Date,
    options?: ConstructorParameters<typeof BaseDomainEvent>[3],
  ) {
    const payloadData = { userId, reason, suspendedUntil };
    const metadata = createEventMetadata(
      options?.correlationId,
      'high',
      5,
      { securityEvent: true }
    );
    const payload = createEventPayload(payloadData, metadata);
    
    const superOptions: ConstructorParameters<typeof BaseDomainEvent>[3] = {
      ...options,
      userId,
      metadata,
      payload,
    };
    
    // Only add suspendedUntil if it's defined
    if (suspendedUntil !== undefined) {
      superOptions.expiresAt = suspendedUntil;
    }
    
    super('DOMAIN_USER_SUSPENDED' as keyof typeof EVENT_NAMES, aggregateId, aggregateVersion, superOptions);
    this.userId = userId;
    this.reason = reason;
    this.suspendedUntil = suspendedUntil;
  }
}

// User Activated Event
export class UserActivatedEvent extends BaseDomainEvent {
  public readonly userId: string;
  public readonly activatedAt: Date;

  constructor(
    aggregateId: string,
    aggregateVersion: number,
    userId: string,
    options?: ConstructorParameters<typeof BaseDomainEvent>[3],
  ) {
    const payloadData = { userId, activatedAt: new Date() };
    const metadata = createEventMetadata(
      options?.correlationId,
      'normal',
      0,
      {}
    );
    const payload = createEventPayload(payloadData, metadata);
    
    const superOptions: ConstructorParameters<typeof BaseDomainEvent>[3] = {
      ...options,
      userId,
      metadata,
      payload,
    };
    
    super('DOMAIN_USER_ACTIVATED' as keyof typeof EVENT_NAMES, aggregateId, aggregateVersion, superOptions);
    this.userId = userId;
    this.activatedAt = new Date();
  }
}

// User Profile Updated Event
export class UserProfileUpdatedEvent extends BaseDomainEvent {
  public readonly userId: string;
  public readonly updatedFields: string[];
  public readonly oldData: Record<string, unknown> | undefined;
  public readonly newData: Record<string, unknown> | undefined;

  constructor(
    aggregateId: string,
    aggregateVersion: number,
    userId: string,
    updatedFields: string[],
    oldData?: Record<string, unknown>,
    newData?: Record<string, unknown>,
    options?: ConstructorParameters<typeof BaseDomainEvent>[3],
  ) {
    const payloadData = { userId, updatedFields, oldData, newData };
    const metadata = createEventMetadata(
      options?.correlationId,
      'normal',
      0,
      {}
    );
    const payload = createEventPayload(payloadData, metadata);
    
    const superOptions: ConstructorParameters<typeof BaseDomainEvent>[3] = {
      ...options,
      userId,
      metadata,
      payload,
    };
    
    super('DOMAIN_USER_PROFILE_UPDATED' as keyof typeof EVENT_NAMES, aggregateId, aggregateVersion, superOptions);
    this.userId = userId;
    this.updatedFields = updatedFields;
    this.oldData = oldData;
    this.newData = newData;
  }
}

// User Password Changed Event
export class UserPasswordChangedEvent extends BaseDomainEvent {
  public readonly userId: string;
  public readonly changedAt: Date;
  public readonly isPasswordReset: boolean;

  constructor(
    aggregateId: string,
    aggregateVersion: number,
    userId: string,
    isPasswordReset: boolean = false,
    options?: ConstructorParameters<typeof BaseDomainEvent>[3],
  ) {
    const payloadData = { userId, changedAt: new Date(), isPasswordReset };
    const metadata = createEventMetadata(
      options?.correlationId,
      'high',
      3,
      { securityEvent: true }
    );
    const payload = createEventPayload(payloadData, metadata);
    
    const superOptions: ConstructorParameters<typeof BaseDomainEvent>[3] = {
      ...options,
      userId,
      metadata,
      payload,
    };
    
    super('DOMAIN_USER_PASSWORD_CHANGED' as keyof typeof EVENT_NAMES, aggregateId, aggregateVersion, superOptions);
    this.userId = userId;
    this.changedAt = new Date();
    this.isPasswordReset = isPasswordReset;
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
  CircuitBreakerConfig as CircuitBreakerConfigType,
  HandlerRateLimitConfig as HandlerRateLimitConfigType,
  EventSchemaValidation as EventSchemaValidationType,
  EventTTLConfig as EventTTLConfigType,
  BatchProgress as BatchProgressType,
  EventStreamQueryOptions as EventStreamQueryOptionsType,
  EventSchemaRegistry as EventSchemaRegistryType,
};
export type EventHandlerType = EventHandler;
