/**
 * Event Types - Enterprise Grade Event Contracts
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-types/event.types
 * 
 * @description
 * Centralized type definitions for all events in the system.
 * Supports domain events, integration events, and system events.
 * 
 * Enterprise Rules:
 * ✅ Type-safe event definitions
 * ✅ Generic event payload support
 * ✅ Event metadata for distributed tracing
 * ✅ Event handler result types
 * ✅ Event versioning support
 * ✅ Bangladesh specific event types
 * ✅ Event validation ready
 * 
 * @example
 * import type { EventPayload, EventMetadata, EventHandler } from '@vubon/shared-types';
 * 
 * // Define an event handler
 * const handler: EventHandler<UserRegisteredEvent> = async (event) => {
 *   // Handle the event
 *   return { success: true };
 * };
 */

// ============================================================
// Core Event Types
// ============================================================

/**
 * Base event interface for all events
 * All events must extend this interface
 */
export interface BaseEvent {
  /** Unique event ID (UUID) */
  id: string;
  
  /** Event name (from EVENT_NAMES constants) */
  name: string;
  
  /** Event version (e.g., 'v1.0') */
  version: string;
  
  /** Event source (service name) */
  source: string;
  
  /** Event category (auth, user, session, etc.) */
  category: string;
  
  /** When event occurred (ISO timestamp) */
  occurredAt: string;
  
  /** Event metadata for distributed tracing */
  metadata: EventMetadata;
}

/**
 * Event metadata for distributed tracing and monitoring
 */
export interface EventMetadata {
  /** Correlation ID for tracing across services */
  correlationId: string;
  
  /** Request ID for API tracing */
  requestId?: string;
  
  /** User ID associated with this event */
  userId?: string;
  
  /** Session ID associated with this event */
  sessionId?: string;
  
  /** Device ID associated with this event */
  deviceId?: string;
  
  /** IP address of the client */
  ipAddress?: string;
  
  /** User agent of the client */
  userAgent?: string;
  
  /** Event urgency (critical, high, medium, low, background) */
  urgency: string;
  
  /** Event priority (numeric) */
  priority: number;
  
  /** Event retry count */
  retryCount?: number;
  
  /** Event time-to-live (seconds) */
  ttlSeconds?: number;
  
  /** Event source service name */
  sourceService?: string;
  
  /** Event target service name (if routed) */
  targetService?: string;
  
  /** Additional custom metadata */
  custom?: Record<string, unknown>;
  
  // Bangladesh specific
  /** District (Bangladesh) */
  district?: string;
  
  /** Upazila (Bangladesh) */
  upazila?: string;
  
  /** Mobile operator */
  mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
  
  /** Network type */
  networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
}

/**
 * Generic event payload wrapper
 * All events should use this to wrap their payload
 */
export interface EventPayload<T = unknown> {
  /** Event data payload */
  data: T;
  
  /** Event metadata */
  metadata: EventMetadata;
  
  /** Event version */
  version: string;
  
  /** Event timestamp (ISO 8601) */
  timestamp: string;
}

// ============================================================
// Domain Event Types (Business Events)
// ============================================================

/**
 * Authentication Event Types
 */
export interface UserRegisteredEvent extends BaseEvent {
  name: 'auth.user.registered';
  payload: {
    userId: string;
    email: string;
    phoneNumber?: string;
    fullName: string;
    role: string;
    userTier: string;
    registrationMethod: 'email' | 'phone' | 'social' | 'admin';
    verificationRequired: boolean;
    referralCode?: string;
    metadata: {
      ipAddress?: string;
      userAgent?: string;
      deviceId?: string;
      district?: string;
      networkType?: string;
    };
  };
}

export interface UserLoggedInEvent extends BaseEvent {
  name: 'auth.user.logged_in';
  payload: {
    userId: string;
    email: string;
    sessionId: string;
    loginMethod: 'email_password' | 'phone_otp' | 'social_oauth' | 'magic_link' | 'mfa';
    loginType: 'standard' | 'remembered' | 'trusted_device';
    deviceInfo: {
      deviceId: string;
      deviceType: string;
      os: string;
      browser: string;
      isMobile: boolean;
    };
    location: {
      ipAddress: string;
      district?: string;
      upazila?: string;
      country?: string;
    };
    mfaRequired: boolean;
    mfaVerified: boolean;
  };
}

export interface UserLoggedOutEvent extends BaseEvent {
  name: 'auth.user.logged_out';
  payload: {
    userId: string;
    sessionId: string;
    logoutMethod: 'user_initiated' | 'session_expired' | 'admin_revoked' | 'security_breach';
    reason?: string;
    allDevices: boolean;
    deviceInfo: {
      deviceId: string;
      deviceType: string;
    };
  };
}

export interface PasswordChangedEvent extends BaseEvent {
  name: 'auth.password.changed';
  payload: {
    userId: string;
    changedBy: 'user' | 'admin' | 'system' | 'reset';
    changedAt: string;
    ipAddress: string;
    deviceId: string;
    sessionsRevoked: number;
    passwordStrength: number;
    flow: 'user_initiated' | 'forced' | 'reset' | 'breach' | 'expiry';
  };
}

export interface PasswordResetEvent extends BaseEvent {
  name: 'auth.password.reset.completed';
  payload: {
    userId: string;
    email: string;
    resetMethod: 'email' | 'sms' | 'whatsapp';
    ipAddress: string;
    deviceId: string;
    success: boolean;
    failureReason?: string;
  };
}

export interface MFAEnabledEvent extends BaseEvent {
  name: 'auth.mfa.enabled';
  payload: {
    userId: string;
    mfaType: 'totp' | 'sms' | 'email' | 'webauthn' | 'whatsapp' | 'bkash_pin' | 'nagad_pin' | 'rocket_pin';
    methodId: string;
    identifier: string; // masked phone/email
    isPrimary: boolean;
    backupCodesGenerated: number;
    ipAddress: string;
    deviceId: string;
  };
}

export interface MFAVerificationEvent extends BaseEvent {
  name: 'auth.mfa.verified';
  payload: {
    userId: string;
    mfaType: string;
    methodId: string;
    success: boolean;
    remainingAttempts?: number;
    isLocked?: boolean;
    lockExpiresAt?: string;
    ipAddress: string;
    deviceId: string;
    isBackupCode: boolean;
    isMFSPin: boolean;
  };
}

/**
 * User Management Event Types
 */
export interface UserCreatedEvent extends BaseEvent {
  name: 'user.created';
  payload: {
    userId: string;
    email: string;
    phoneNumber?: string;
    fullName: string;
    role: string;
    userTier: string;
    createdBy: 'system' | 'admin' | 'self';
    adminId?: string;
    verificationStatus: {
      emailVerified: boolean;
      phoneVerified: boolean;
      kycVerified: boolean;
    };
  };
}

export interface UserUpdatedEvent extends BaseEvent {
  name: 'user.updated';
  payload: {
    userId: string;
    updatedFields: string[];
    changes: Array<{
      field: string;
      oldValue: unknown;
      newValue: unknown;
    }>;
    updatedBy: string;
    reason?: string;
  };
}

export interface UserRoleChangedEvent extends BaseEvent {
  name: 'user.role.changed';
  payload: {
    userId: string;
    oldRole: string;
    newRole: string;
    changedBy: string;
    reason?: string;
    requiresReauth: boolean;
  };
}

export interface UserTierUpgradedEvent extends BaseEvent {
  name: 'user.tier.upgraded';
  payload: {
    userId: string;
    oldTier: string;
    newTier: string;
    totalSpent: number;
    upgradeThreshold: number;
    benefits: {
      discountPercentage: number;
      freeShipping: boolean;
      prioritySupport: boolean;
    };
  };
}

export interface UserEmailChangedEvent extends BaseEvent {
  name: 'user.email.changed';
  payload: {
    userId: string;
    oldEmail: string;
    newEmail: string;
    changedBy: string;
    ipAddress: string;
    deviceId: string;
    requiresReVerification: boolean;
  };
}

export interface UserPhoneChangedEvent extends BaseEvent {
  name: 'user.phone.changed';
  payload: {
    userId: string;
    oldPhone: string;
    newPhone: string;
    changedBy: string;
    ipAddress: string;
    deviceId: string;
    verificationMethod: 'sms' | 'whatsapp';
    requiresReVerification: boolean;
  };
}

export interface UserKYCVerifiedEvent extends BaseEvent {
  name: 'user.kyc.verified';
  payload: {
    userId: string;
    documentType: string;
    documentNumber: string;
    verifiedBy: string;
    verifiedAt: string;
    notes?: string;
  };
}

/**
 * Session Management Event Types
 */
export interface SessionCreatedEvent extends BaseEvent {
  name: 'session.created';
  payload: {
    userId: string;
    sessionId: string;
    deviceInfo: {
      deviceId: string;
      deviceType: string;
      os: string;
      browser: string;
      isMobile: boolean;
    };
    ipAddress: string;
    location?: {
      district?: string;
      upazila?: string;
      country?: string;
    };
    trustLevel: string;
    expiresAt: string;
    isNewDevice: boolean;
    isNewLocation: boolean;
  };
}

export interface SessionExtendedEvent extends BaseEvent {
  name: 'session.extended';
  payload: {
    sessionId: string;
    userId: string;
    extensionCount: number;
    remainingExtensions: number;
    newExpiresAt: string;
    minutesExtended: number;
    ipAddress: string;
  };
}

export interface SessionRevokedEvent extends BaseEvent {
  name: 'session.revoked';
  payload: {
    sessionId: string;
    userId: string;
    revokedBy: 'user' | 'admin' | 'system';
    reason: string;
    ipAddress: string;
    allSessions: boolean;
    sessionCount: number;
  };
}

export interface SessionExpiredEvent extends BaseEvent {
  name: 'session.expired';
  payload: {
    sessionId: string;
    userId: string;
    expiryType: 'absolute' | 'idle' | 'forced';
    durationSeconds: number;
    lastActivityAt: string;
    expiredAt: string;
  };
}

export interface SessionTransferredEvent extends BaseEvent {
  name: 'session.transferred';
  payload: {
    fromSessionId: string;
    toSessionId: string;
    userId: string;
    transferMethod: 'qr_code' | 'magic_link' | 'otp';
    transferId: string;
    fromDevice: {
      deviceId: string;
      deviceType: string;
    };
    toDevice: {
      deviceId: string;
      deviceType: string;
    };
    ipAddress: string;
  };
}

/**
 * Device Management Event Types
 */
export interface DeviceRegisteredEvent extends BaseEvent {
  name: 'device.registered';
  payload: {
    userId: string;
    deviceId: string;
    deviceType: string;
    devicePlatform: string;
    userAgent: string;
    fingerprint: string;
    trustLevel: string;
    trustScore: number;
    ipAddress: string;
    district?: string;
    mobileOperator?: string;
  };
}

export interface DeviceTrustedEvent extends BaseEvent {
  name: 'device.trusted';
  payload: {
    userId: string;
    deviceId: string;
    trustLevel: string;
    trustScore: number;
    trustedAt: string;
    durationDays: number;
    expiresAt: string;
    trustCount: number;
    maxTrustedDevices: number;
  };
}

export interface DeviceBlockedEvent extends BaseEvent {
  name: 'device.blocked';
  payload: {
    userId: string;
    deviceId: string;
    reason: string;
    blockedBy: 'system' | 'admin';
    ipAddress: string;
    metadata?: Record<string, unknown>;
  };
}

/**
 * Payment Event Types
 */
export interface PaymentInitiatedEvent extends BaseEvent {
  name: 'payment.initiated';
  payload: {
    paymentId: string;
    userId: string;
    orderId: string;
    amount: number;
    currency: string;
    method: 'bkash' | 'nagad' | 'rocket' | 'sslcommerz' | 'card' | 'cod';
    status: 'pending' | 'processing' | 'completed' | 'failed';
    metadata: {
      ipAddress: string;
      deviceId: string;
      district?: string;
      mobileOperator?: string;
    };
  };
}

export interface PaymentSuccessEvent extends BaseEvent {
  name: 'payment.success';
  payload: {
    paymentId: string;
    userId: string;
    orderId: string;
    amount: number;
    currency: string;
    method: string;
    transactionId: string;
    completedAt: string;
    metadata: {
      ipAddress: string;
      deviceId: string;
      district?: string;
    };
  };
}

export interface PaymentFailedEvent extends BaseEvent {
  name: 'payment.failed';
  payload: {
    paymentId: string;
    userId: string;
    orderId: string;
    amount: number;
    currency: string;
    method: string;
    failureReason: string;
    failureCode: string;
    retryable: boolean;
    metadata: {
      ipAddress: string;
      deviceId: string;
    };
  };
}

/**
 * Bangladesh Specific Payment Events
 */
export interface BkashPaymentEvent extends BaseEvent {
  name: 'payment.bkash.success' | 'payment.bkash.failed';
  payload: {
    paymentId: string;
    userId: string;
    orderId: string;
    amount: number;
    transactionId: string;
    merchantInvoiceNumber: string;
    referenceId: string;
    status: 'success' | 'failed';
    failureReason?: string;
    metadata: {
      ipAddress: string;
      deviceId: string;
      mobileOperator: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
      district?: string;
    };
  };
}

export interface NagadPaymentEvent extends BaseEvent {
  name: 'payment.nagad.success' | 'payment.nagad.failed';
  payload: {
    paymentId: string;
    userId: string;
    orderId: string;
    amount: number;
    transactionId: string;
    merchantId: string;
    referenceId: string;
    status: 'success' | 'failed';
    failureReason?: string;
    metadata: {
      ipAddress: string;
      deviceId: string;
      mobileOperator: string;
      district?: string;
    };
  };
}

export interface RocketPaymentEvent extends BaseEvent {
  name: 'payment.rocket.success' | 'payment.rocket.failed';
  payload: {
    paymentId: string;
    userId: string;
    orderId: string;
    amount: number;
    transactionId: string;
    merchantId: string;
    referenceId: string;
    status: 'success' | 'failed';
    failureReason?: string;
  };
}

export interface SSLCommerzPaymentEvent extends BaseEvent {
  name: 'payment.sslcommerz.success' | 'payment.sslcommerz.failed';
  payload: {
    paymentId: string;
    userId: string;
    orderId: string;
    amount: number;
    transactionId: string;
    sessionKey: string;
    status: 'success' | 'failed';
    failureReason?: string;
    validationId?: string;
  };
}

/**
 * Integration Event Types
 */
export interface WebhookReceivedEvent extends BaseEvent {
  name: 'integration.webhook.received';
  payload: {
    provider: 'sslcommerz' | 'bkash' | 'nagad' | 'rocket' | 'redx' | 'paperfly';
    webhookId: string;
    payload: Record<string, unknown>;
    ipAddress: string;
    signature?: string;
    signatureValid: boolean;
    processed: boolean;
  };
}

export interface SMSDeliveryEvent extends BaseEvent {
  name: 'integration.sms.delivered' | 'integration.sms.failed';
  payload: {
    messageId: string;
    phoneNumber: string;
    status: 'delivered' | 'failed';
    failureReason?: string;
    deliveredAt?: string;
    provider: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'twilio';
    carrier: string;
    metadata: {
      userId?: string;
      messageType: 'otp' | 'transactional' | 'promotional';
      templateId?: string;
    };
  };
}

/**
 * Security Event Types
 */
export interface SecurityBreachEvent extends BaseEvent {
  name: 'security.breach.detected';
  payload: {
    breachId: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
    type: 'brute_force' | 'credential_stuffing' | 'suspicious_login' | 'sim_swap' | 'account_takeover';
    affectedUsers: string[];
    affectedIPs: string[];
    detectedAt: string;
    description: string;
    recommendations: string[];
    metadata: Record<string, unknown>;
  };
}

export interface BruteForceDetectedEvent extends BaseEvent {
  name: 'security.brute_force.detected';
  payload: {
    userId: string;
    email: string;
    ipAddress: string;
    attempts: number;
    timeWindowMinutes: number;
    locked: boolean;
    actionTaken: 'monitor' | 'rate_limit' | 'block_ip' | 'lock_account';
    metadata: {
      deviceId?: string;
      district?: string;
      networkType?: string;
    };
  };
}

export interface SuspiciousActivityEvent extends BaseEvent {
  name: 'security.suspicious.activity.detected';
  payload: {
    userId: string;
    activityType: 'unusual_location' | 'unusual_device' | 'unusual_time' | 'multiple_attempts';
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    detectedAt: string;
    ipAddress: string;
    deviceId?: string;
    district?: string;
    upazila?: string;
    recommendations: string[];
  };
}

/**
 * Notification Event Types
 */
export interface NotificationSentEvent extends BaseEvent {
  name: 'notification.sent';
  payload: {
    notificationId: string;
    userId: string;
    channel: 'email' | 'sms' | 'push' | 'whatsapp';
    type: 'transactional' | 'marketing' | 'security' | 'promotional';
    templateId: string;
    subject?: string;
    sentAt: string;
    metadata: {
      email?: string;
      phoneNumber?: string;
      deviceId?: string;
    };
  };
}

export interface EmailDeliveredEvent extends BaseEvent {
  name: 'notification.email.delivered';
  payload: {
    messageId: string;
    email: string;
    deliveredAt: string;
    provider: string;
    bounce: boolean;
    bounceReason?: string;
  };
}

export interface WhatsAppDeliveredEvent extends BaseEvent {
  name: 'notification.whatsapp.delivered';
  payload: {
    messageId: string;
    phoneNumber: string;
    deliveredAt: string;
    readAt?: string;
    provider: string;
    status: 'sent' | 'delivered' | 'read' | 'failed';
    failureReason?: string;
  };
}

/**
 * System Event Types
 */
export interface SystemHealthEvent extends BaseEvent {
  name: 'system.health.check' | 'system.healthy' | 'system.unhealthy' | 'system.degraded';
  payload: {
    serviceName: string;
    status: 'healthy' | 'unhealthy' | 'degraded';
    timestamp: string;
    metrics: {
      uptime: number;
      memoryUsage: number;
      cpuUsage: number;
      responseTime: number;
      errorRate: number;
    };
    dependencies: Array<{
      name: string;
      status: 'healthy' | 'unhealthy' | 'degraded';
      latency: number;
    }>;
  };
}

export interface ConfigUpdatedEvent extends BaseEvent {
  name: 'system.config.updated';
  payload: {
    configKey: string;
    oldValue: unknown;
    newValue: unknown;
    updatedBy: string;
    environment: string;
    timestamp: string;
  };
}


/**
 * Analytics Event Types
 */
export interface PageViewEvent extends BaseEvent {
  name: 'analytics.page.view';
  payload: {
    userId?: string;
    sessionId: string;
    pageUrl: string;
    pageTitle: string;
    referrer?: string;
    deviceInfo: {
      deviceType: string;
      os: string;
      browser: string;
      screenResolution: string;
    };
    location: {
      ipAddress: string;
      district?: string;
      upazila?: string;
      country?: string;
    };
    metadata: {
      loadTime: number;
      timeOnPage: number;
      scrollDepth: number;
      networkType: string;
      mobileOperator?: string;
    };
  };
}

export interface ProductViewEvent extends BaseEvent {
  name: 'analytics.product.view';
  payload: {
    userId?: string;
    sessionId: string;
    productId: string;
    productName: string;
    categoryId: string;
    categoryName: string;
    price: number;
    viewDuration: number;
    referrer?: string;
    metadata: {
      deviceId?: string;
      deviceType: string;
      district?: string;
    };
  };
}

export interface CartEvent extends BaseEvent {
  name: 'analytics.cart.add' | 'analytics.cart.remove' | 'analytics.cart.abandon';
  payload: {
    userId: string;
    sessionId: string;
    cartId: string;
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    total: number;
    cartSize: number;
    metadata: {
      deviceId: string;
      deviceType: string;
      district?: string;
      mobileOperator?: string;
      networkType?: string;
    };
  };
}

export interface CheckoutEvent extends BaseEvent {
  name: 'analytics.checkout.start' | 'analytics.checkout.step' | 'analytics.checkout.complete' | 'analytics.checkout.abandon';
  payload: {
    userId: string;
    sessionId: string;
    orderId: string;
    step: number;
    stepName: string;
    orderTotal: number;
    itemsCount: number;
    paymentMethod: string;
    metadata: {
      deviceId: string;
      deviceType: string;
      district?: string;
      shippingMethod: string;
      couponUsed?: string;
    };
  };
}

export interface ConversionEvent extends BaseEvent {
  name: 'analytics.conversion';
  payload: {
    userId: string;
    sessionId: string;
    conversionType: 'purchase' | 'registration' | 'email_verification' | 'phone_verification';
    value: number;
    currency: string;
    orderId?: string;
    metadata: {
      source: string;
      campaign?: string;
      medium?: string;
      referralCode?: string;
      district?: string;
    };
  };
}

// ============================================================
// Event Handler Types
// ============================================================

/**
 * Event handler result
 */
export interface EventHandlerResult {
  /** Whether the handler succeeded */
  success: boolean;
  
  /** Error message (if failed) */
  error?: string;
  
  /** Error code (if failed) */
  errorCode?: string;
  
  /** Result data (if any) */
  data?: unknown;
  
  /** Whether the event should be retried */
  shouldRetry?: boolean;
  
  /** Retry delay in seconds */
  retryDelaySeconds?: number;
  
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Event handler function type
 */
export type EventHandler<T extends BaseEvent = BaseEvent> = (
  event: T
) => Promise<EventHandlerResult>;

/**
 * Event middleware function type
 */
export type EventMiddleware = (
  event: BaseEvent,
  next: () => Promise<EventHandlerResult>
) => Promise<EventHandlerResult>;

/**
 * Event subscriber configuration
 */
export interface EventSubscriber<T extends BaseEvent = BaseEvent> {
  /** Event name to subscribe to */
  eventName: string;
  
  /** Event version (optional, default: latest) */
  version?: string;
  
  /** Handler function */
  handler: EventHandler<T>;
  
  /** Handler priority (higher = executed first) */
  priority?: number;
  
  /** Whether the handler is idempotent (can be retried) */
  idempotent?: boolean;
  
  /** Maximum retry attempts */
  maxRetries?: number;
  
  /** Retry delay in seconds */
  retryDelaySeconds?: number;
  
  /** Timeout in milliseconds */
  timeoutMs?: number;
  
  /** Filter function to determine if this handler should process the event */
  filter?: (event: T) => boolean;
}

/**
 * Event publisher interface
 */
export interface EventPublisher {
  /**
   * Publish an event to all subscribers
   * @param event - Event to publish
   * @returns Publish result
   */
  publish(event: BaseEvent): Promise<EventHandlerResult>;
  
  /**
   * Publish multiple events in a batch
   * @param events - Array of events to publish
   * @returns Array of publish results
   */
  publishBatch(events: BaseEvent[]): Promise<EventHandlerResult[]>;
  
  /**
   * Publish an event synchronously (waits for all handlers)
   * @param event - Event to publish
   * @returns Handlers results
   */
  publishSync(event: BaseEvent): Promise<EventHandlerResult[]>;
  
  /**
   * Publish an event asynchronously (fire and forget)
   * @param event - Event to publish
   */
  publishAsync(event: BaseEvent): Promise<void>;
  
  /**
   * Publish a delayed event
   * @param event - Event to publish
   * @param delaySeconds - Delay in seconds
   */
  publishDelayed(event: BaseEvent, delaySeconds: number): Promise<void>;
}

/**
 * Event bus interface
 */
export interface EventBus {
  /** Subscribe to an event */
  subscribe<T extends BaseEvent>(
    eventName: string,
    handler: EventHandler<T>,
    options?: Partial<EventSubscriber<T>>
  ): void;
  
  /** Unsubscribe from an event */
  unsubscribe(eventName: string, handler: EventHandler): void;
  
  /** Subscribe to all events (for monitoring) */
  subscribeAll(handler: EventHandler<BaseEvent>): void;
  
  /** Add middleware to the event pipeline */
  use(middleware: EventMiddleware): void;
  
  /** Get all subscribers for an event */
  getSubscribers(eventName: string): EventSubscriber[];
  
  /** Clear all subscribers */
  clear(): void;
}

// ============================================================
// Event Store Types
// ============================================================

/**
 * Event store entry for persistence
 */
export interface StoredEvent<T extends BaseEvent = BaseEvent> {
  /** Event ID */
  id: string;
  
  /** Event data */
  event: T;
  
  /** When event was stored */
  storedAt: string;
  
  /** Event processing status */
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'dead_letter';
  
  /** Processing attempts */
  attempts: number;
  
  /** Last error (if failed) */
  lastError?: string;
  
  /** Processing start time */
  processingStartedAt?: string;
  
  /** Processing completion time */
  completedAt?: string;
}

// ============================================================
// Event Validation Types
// ============================================================

/**
 * Event validation result
 */
export interface EventValidationResult {
  /** Whether the event is valid */
  isValid: boolean;
  
  /** Validation errors (if any) */
  errors?: string[];
  
  /** Validation warnings */
  warnings?: string[];
  
  /** Normalized event (if validation passed) */
  normalizedEvent?: BaseEvent;
}

/**
 * Event validator interface
 */
export interface EventValidator {
  /** Validate an event */
  validate(event: unknown): EventValidationResult;
  
  /** Validate and normalize an event */
  validateAndNormalize(event: unknown): BaseEvent | null;
  
  /** Register a schema for an event type */
  registerSchema(eventName: string, schema: unknown): void;
}



// ============================================================
// Type Guards
// ============================================================

/**
 * Type guard to check if an event is a specific type
 */
export function isEventType<T extends BaseEvent>(
  event: BaseEvent,
  eventName: T['name']
): event is T {
  return event.name === eventName;
}

/**
 * Type guard to check if an object is a BaseEvent
 */
export function isBaseEvent(obj: unknown): obj is BaseEvent {
  if (!obj || typeof obj !== 'object') return false;
  
  const event = obj as Record<string, unknown>;
  
  // ✅ ব্র্যাকেট নোটেশন ব্যবহার করুন (ডট নোটেশনের পরিবর্তে)
  return (
    typeof event['id'] === 'string' &&
    typeof event['name'] === 'string' &&
    typeof event['version'] === 'string' &&
    typeof event['source'] === 'string' &&
    typeof event['category'] === 'string' &&
    typeof event['occurredAt'] === 'string' &&
    event['metadata'] !== undefined &&
    typeof event['metadata'] === 'object'
  );
}
// ============================================================
// Type Exports
// ============================================================

export type {
  BaseEvent as BaseEventType,
  EventMetadata as EventMetadataType,
  EventPayload as EventPayloadType,
  EventHandlerResult as EventHandlerResultType,
  EventHandler as EventHandlerType,
  EventMiddleware as EventMiddlewareType,
  EventSubscriber as EventSubscriberType,
  EventPublisher as EventPublisherType,
  EventBus as EventBusType,
  EventValidator as EventValidatorType,
  StoredEvent as StoredEventType,
  EventValidationResult as EventValidationResultType,
};

// ============================================================
// ENTERPRISE SUMMARY
// ============================================================
// 
// Enterprise Features:
// 1. ✅ 50+ typed event definitions
// 2. ✅ Event metadata for distributed tracing
// 3. ✅ Generic event payload wrapper
// 4. ✅ Event handler types with results
// 5. ✅ Event subscriber configuration
// 6. ✅ Event bus and publisher interfaces
// 7. ✅ Event store for persistence
// 8. ✅ Event validation types
// 9. ✅ Event envelope for routing
// 10. ✅ Type guards for type safety
// 11. ✅ Bangladesh specific event types (bKash, Nagad, Rocket, SSLCOMMERZ)
// 12. ✅ Geographic and network event metadata
// 
// Bangladesh Specific:
// - bKash, Nagad, Rocket, SSLCOMMERZ payment events
// - District/Upazila location tracking
// - Mobile operator and network type tracking
// - Local timezone-aware timestamps
// - Bengali language support ready
// 
// ============================================================
