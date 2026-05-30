/**
 * Queue Constants - Pure immutable queue configuration
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce

 * @module shared-constants/auth-constants/queue.constants

 * RULES:
 * ✅ NO RabbitMQ connection, Kafka producer, event publishing logic
 * ✅ NO business logic
 * ✅ NO side effects
 * ✅ ONLY pure readonly constants
 */

// ============================================================
// Type Utilities
// ============================================================
export type ValueOf<T> = T[keyof T];
export type ReadonlyDeep<T> = {
  readonly [P in keyof T]: ReadonlyDeep<T[P]>;
};

// ============================================================
// Queue Names (Core business queues)
// ============================================================
export const QUEUES = {
  // ========== Core Business Queues ==========
  AUTH: 'auth.queue',
  USER: 'user.queue',
  PRODUCT: 'product.queue',
  ORDER: 'order.queue',
  PAYMENT: 'payment.queue',
  INVENTORY: 'inventory.queue',
  CART: 'cart.queue',
  CHECKOUT: 'checkout.queue',

  // ========== Communication Queues ==========
  EMAIL: 'email.queue',
  SMS: 'sms.queue',
  NOTIFICATION: 'notification.queue',
  PUSH: 'push.queue',
  WHATSAPP: 'whatsapp.queue',        // Bangladesh specific
  VOICE_CALL: 'voice_call.queue',    // For OTP voice calls

  // ========== Bangladesh Specific Payment Gateways ==========
  SSLCOMMERZ: 'sslcommerz.queue',
  BKASH: 'bkash.queue',
  NAGAD: 'nagad.queue',
  ROCKET: 'rocket.queue',
  STRIPE: 'stripe.queue',
  PAYPAL: 'paypal.queue',

  // ========== Bangladesh Specific Shipping Partners ==========
  REDX: 'redx.queue',
  PAPERFLY: 'paperfly.queue',
  SUNDARBAN: 'sundarban.queue',
  SA_PARIBAHAN: 'sa_paribahan.queue',
  PATHAO: 'pathao.queue',

  // ========== SMS Providers (Bangladesh) ==========
  SMS_BANGLALINK: 'sms.banglalink.queue',
  SMS_GP: 'sms.gp.queue',
  SMS_ROBI: 'sms.robi.queue',
  SMS_TELETALK: 'sms.teletalk.queue',
  SMS_OTHERS: 'sms.others.queue',

  // ========== Processing Queues ==========
  JOB: 'job.queue',
  BATCH: 'batch.queue',
  REPORT: 'report.queue',
  ANALYTICS: 'analytics.queue',

  // ========== Integration Queues ==========
  WEBHOOK: 'webhook.queue',
  SYNC: 'sync.queue',
  IMPORT: 'import.queue',
  EXPORT: 'export.queue',

  // ========== Background Tasks ==========
  CLEANUP: 'cleanup.queue',
  MAINTENANCE: 'maintenance.queue',
  BACKUP: 'backup.queue',

  // ========== Real-time Queues ==========
  REALTIME: 'realtime.queue',
  EVENT: 'event.queue',

  // ========== Third-party API Queues (Rate limited) ==========
  THIRD_PARTY_API: 'third_party_api.queue',
  RATE_LIMITED: 'rate_limited.queue',

  // ========== Dead Letter Queues ==========
  DLQ_MAIN: 'dlq.main',
  DLQ_RETRY: 'dlq.retry',
  DLQ_PAYMENT: 'dlq.payment',
  DLQ_NOTIFICATION: 'dlq.notification',
} as const;

export type Queue = ValueOf<typeof QUEUES>;

// ============================================================
// Exchange Names (RabbitMQ / Message Broker)
// ============================================================
export const EXCHANGES = {
  // Direct exchanges (Point-to-point)
  DIRECT_AUTH: 'auth.direct',
  DIRECT_USER: 'user.direct',
  DIRECT_ORDER: 'order.direct',
  DIRECT_PAYMENT: 'payment.direct',
  DIRECT_SHIPPING: 'shipping.direct',

  // Topic exchanges (Pattern-based routing)
  TOPIC_BUSINESS: 'business.topic',
  TOPIC_EVENTS: 'events.topic',
  TOPIC_NOTIFICATION: 'notification.topic',
  TOPIC_PAYMENT: 'payment.topic',

  // Fanout exchanges (Broadcast to all)
  FANOUT_BROADCAST: 'broadcast.fanout',
  FANOUT_SYSTEM: 'system.fanout',
  FANOUT_ALERT: 'alert.fanout',

  // Headers exchanges (Attribute-based routing)
  HEADERS_PRIORITY: 'priority.headers',

  // Dead Letter Exchanges
  DLX_MAIN: 'dlx.main',
  DLX_RETRY: 'dlx.retry',
  DLX_DELAYED: 'dlx.delayed',
} as const;

export type Exchange = ValueOf<typeof EXCHANGES>;

// ============================================================
// Routing Keys
// ============================================================
export const ROUTING_KEYS = {
  // ========== Auth Routing ==========
  AUTH_LOGIN: 'auth.login',
  AUTH_LOGOUT: 'auth.logout',
  AUTH_REGISTER: 'auth.register',
  AUTH_PASSWORD_RESET: 'auth.password.reset',
  AUTH_MFA_VERIFY: 'auth.mfa.verify',

  // ========== User Routing ==========
  USER_CREATED: 'user.created',
  USER_UPDATED: 'user.updated',
  USER_DELETED: 'user.deleted',
  USER_SUSPENDED: 'user.suspended',
  USER_ACTIVATED: 'user.activated',

  // ========== Product Routing ==========
  PRODUCT_CREATED: 'product.created',
  PRODUCT_UPDATED: 'product.updated',
  PRODUCT_DELETED: 'product.deleted',
  PRODUCT_APPROVED: 'product.approved',
  PRODUCT_REJECTED: 'product.rejected',
  PRODUCT_LOW_STOCK: 'product.low_stock',

  // ========== Order Routing ==========
  ORDER_CREATED: 'order.created',
  ORDER_UPDATED: 'order.updated',
  ORDER_CANCELLED: 'order.cancelled',
  ORDER_COMPLETED: 'order.completed',
  ORDER_SHIPPED: 'order.shipped',
  ORDER_DELIVERED: 'order.delivered',
  ORDER_REFUNDED: 'order.refunded',

  // ========== Payment Routing ==========
  PAYMENT_PROCESSED: 'payment.processed',
  PAYMENT_SUCCESS: 'payment.success',
  PAYMENT_FAILED: 'payment.failed',
  PAYMENT_REFUNDED: 'payment.refunded',
  PAYMENT_PENDING: 'payment.pending',

  // ========== Bangladesh Payment Gateways ==========
  PAYMENT_SSLCOMMERZ_SUCCESS: 'payment.sslcommerz.success',
  PAYMENT_SSLCOMMERZ_FAILED: 'payment.sslcommerz.failed',
  PAYMENT_BKASH_SUCCESS: 'payment.bkash.success',
  PAYMENT_BKASH_FAILED: 'payment.bkash.failed',
  PAYMENT_NAGAD_SUCCESS: 'payment.nagad.success',
  PAYMENT_NAGAD_FAILED: 'payment.nagad.failed',
  PAYMENT_ROCKET_SUCCESS: 'payment.rocket.success',
  PAYMENT_ROCKET_FAILED: 'payment.rocket.failed',

  // ========== Shipping Routing ==========
  SHIPPING_CREATED: 'shipping.created',
  SHIPPING_PICKED: 'shipping.picked',
  SHIPPING_IN_TRANSIT: 'shipping.in_transit',
  SHIPPING_DELIVERED: 'shipping.delivered',
  SHIPPING_FAILED: 'shipping.failed',

  // ========== Inventory Routing ==========
  INVENTORY_UPDATED: 'inventory.updated',
  INVENTORY_LOW: 'inventory.low',
  INVENTORY_OUT: 'inventory.out',
  INVENTORY_RESTOCKED: 'inventory.restocked',

  // ========== Notification Routing ==========
  NOTIFICATION_EMAIL: 'notification.email',
  NOTIFICATION_SMS: 'notification.sms',
  NOTIFICATION_PUSH: 'notification.push',
  NOTIFICATION_WHATSAPP: 'notification.whatsapp',
  NOTIFICATION_BROADCAST: 'notification.broadcast',

  // ========== SMS Routing (Bangladesh) ==========
  SMS_BANGLALINK: 'sms.banglalink',
  SMS_GP: 'sms.gp',
  SMS_ROBI: 'sms.robi',
  SMS_TELETALK: 'sms.teletalk',
  SMS_OTP: 'sms.otp',
  SMS_PROMOTIONAL: 'sms.promotional',
  SMS_TRANSACTIONAL: 'sms.transactional',

  // ========== Analytics Routing ==========
  ANALYTICS_PAGE_VIEW: 'analytics.page_view',
  ANALYTICS_PRODUCT_VIEW: 'analytics.product_view',
  ANALYTICS_CART_ADD: 'analytics.cart_add',
  ANALYTICS_CHECKOUT: 'analytics.checkout',
  ANALYTICS_CONVERSION: 'analytics.conversion',
} as const;

export type RoutingKey = ValueOf<typeof ROUTING_KEYS>;

// ============================================================
// Queue Dead Letter Configuration
// ============================================================
export const QUEUE_DLX = {
  ENABLED: true,
  MAX_RETRIES: 3,
  RETRY_DELAY_MS: 5000,                    // 5 seconds base delay

  // Retry delays for different queue types
  RETRY_DELAYS: {
    [QUEUES.PAYMENT]: 10000,               // 10 seconds
    [QUEUES.SSLCOMMERZ]: 15000,            // 15 seconds
    [QUEUES.BKASH]: 15000,                 // 15 seconds
    [QUEUES.NAGAD]: 15000,                 // 15 seconds
    [QUEUES.SMS_GP]: 2000,                 // 2 seconds
    [QUEUES.EMAIL]: 60000,                 // 1 minute
    [QUEUES.WEBHOOK]: 30000,               // 30 seconds
  },

  EXCHANGE: EXCHANGES.DLX_MAIN,
  ROUTING_KEY: 'queue.dead',

  // Dead letter queue for each domain
  DLQ_MAPPING: {
    payment: QUEUES.DLQ_PAYMENT,
    notification: QUEUES.DLQ_NOTIFICATION,
    default: QUEUES.DLQ_MAIN,
  },
} as const;

export type QueueDlx = typeof QUEUE_DLX;

// ============================================================
// Queue Priorities (Higher number = Higher priority)
// ============================================================
export const QUEUE_PRIORITIES = {
  // Critical (Must process immediately)
  CRITICAL: 10,        // Auth, Payment, Order
  CRITICAL_MAX: 10,
  CRITICAL_MIN: 9,

  // High (Process quickly)
  HIGH: 7,             // Inventory, Checkout
  HIGH_MAX: 8,
  HIGH_MIN: 6,

  // Normal (Standard processing)
  NORMAL: 5,           // Products, Users, Cart
  NORMAL_MAX: 5,
  NORMAL_MIN: 4,

  // Low (Can wait)
  LOW: 3,              // Notifications, Emails, SMS
  LOW_MAX: 3,
  LOW_MIN: 2,

  // Background (Process when idle)
  BACKGROUND: 1,       // Reports, Cleanup, Backup
  BACKGROUND_MAX: 1,
  BACKGROUND_MIN: 0,
} as const;

export type QueuePriority = ValueOf<typeof QUEUE_PRIORITIES>;

// ============================================================
// Consumer Concurrency Settings
// ============================================================
export const QUEUE_CONCURRENCY = {
  // High throughput queues
  EMAIL: 50,
  NOTIFICATION: 100,
  SMS: 80,
  ANALYTICS: 30,
  LOGGING: 50,

  // Medium throughput queues
  PRODUCT: 20,
  USER: 15,
  ORDER: 20,
  CART: 25,

  // Low throughput (I/O bound)
  AUTH: 5,
  PAYMENT: 5,
  SSLCOMMERZ: 5,
  BKASH: 5,
  NAGAD: 5,

  // Background queues
  REPORT: 2,
  CLEANUP: 2,
  BACKUP: 1,
  MAINTENANCE: 1,

  // Dynamic based on queue type
  DEFAULT: 10,
  MIN: 1,
  MAX: 100,
} as const;

export type QueueConcurrency = typeof QUEUE_CONCURRENCY;

// ============================================================
// Queue Timeouts (in milliseconds)
// ============================================================
export const QUEUE_TIMEOUTS = {
  // Payment queues (Longer timeout)
  PAYMENT: 60000,        // 1 minute
  SSLCOMMERZ: 60000,     // 1 minute
  BKASH: 45000,          // 45 seconds
  NAGAD: 45000,          // 45 seconds
  ROCKET: 45000,         // 45 seconds

  // Authentication (Quick)
  AUTH: 30000,           // 30 seconds
  USER: 30000,           // 30 seconds

  // Order processing
  ORDER: 45000,          // 45 seconds
  INVENTORY: 30000,      // 30 seconds

  // Communication (Variable)
  EMAIL: 60000,          // 1 minute
  SMS: 10000,            // 10 seconds
  WHATSAPP: 15000,       // 15 seconds
  WEBHOOK: 30000,        // 30 seconds

  // API calls
  THIRD_PARTY_API: 30000, // 30 seconds
  RATE_LIMITED: 30000,    // 30 seconds

  // Background tasks
  REPORT: 300000,        // 5 minutes
  BATCH: 600000,         // 10 minutes
  CLEANUP: 600000,       // 10 minutes
  BACKUP: 1800000,       // 30 minutes

  // Default
  DEFAULT: 30000,        // 30 seconds
} as const;

export type QueueTimeout = ValueOf<typeof QUEUE_TIMEOUTS>;

// ============================================================
// Event Names (Event-driven architecture)
// ============================================================
export const EVENT_NAMES = {
  // ========== Domain Events ==========
  // User domain
  DOMAIN_USER_REGISTERED: 'domain.user.registered',
  DOMAIN_USER_VERIFIED: 'domain.user.verified',
  DOMAIN_USER_SUSPENDED: 'domain.user.suspended',
  DOMAIN_USER_ACTIVATED: 'domain.user.activated',
  DOMAIN_USER_PROFILE_UPDATED: 'domain.user.profile.updated',
  DOMAIN_USER_PASSWORD_CHANGED: 'domain.user.password.changed',

  // Product domain
  DOMAIN_PRODUCT_CREATED: 'domain.product.created',
  DOMAIN_PRODUCT_UPDATED: 'domain.product.updated',
  DOMAIN_PRODUCT_DELETED: 'domain.product.deleted',
  DOMAIN_PRODUCT_APPROVED: 'domain.product.approved',
  DOMAIN_PRODUCT_REJECTED: 'domain.product.rejected',
  DOMAIN_PRODUCT_LOW_STOCK: 'domain.product.low_stock',

  // Order domain
  DOMAIN_ORDER_PLACED: 'domain.order.placed',
  DOMAIN_ORDER_PAID: 'domain.order.paid',
  DOMAIN_ORDER_SHIPPED: 'domain.order.shipped',
  DOMAIN_ORDER_DELIVERED: 'domain.order.delivered',
  DOMAIN_ORDER_CANCELLED: 'domain.order.cancelled',
  DOMAIN_ORDER_REFUNDED: 'domain.order.refunded',

  // Payment domain
  DOMAIN_PAYMENT_SUCCESS: 'domain.payment.success',
  DOMAIN_PAYMENT_FAILED: 'domain.payment.failed',
  DOMAIN_PAYMENT_REFUNDED: 'domain.payment.refunded',

  // Cart domain
  DOMAIN_CART_ADDED: 'domain.cart.added',
  DOMAIN_CART_REMOVED: 'domain.cart.removed',
  DOMAIN_CART_CLEARED: 'domain.cart.cleared',

  // ========== Integration Events ==========
  // Payment gateways
  INTEGRATION_PAYMENT_SUCCESS: 'integration.payment.success',
  INTEGRATION_PAYMENT_FAILURE: 'integration.payment.failure',
  INTEGRATION_SSLCOMMERZ_WEBHOOK: 'integration.sslcommerz.webhook',
  INTEGRATION_BKASH_WEBHOOK: 'integration.bkash.webhook',
  INTEGRATION_NAGAD_WEBHOOK: 'integration.nagad.webhook',

  // Shipping partners
  INTEGRATION_SHIPPING_CREATED: 'integration.shipping.created',
  INTEGRATION_SHIPPING_STATUS: 'integration.shipping.status',
  INTEGRATION_REDX_WEBHOOK: 'integration.redx.webhook',
  INTEGRATION_PAPERFLY_WEBHOOK: 'integration.paperfly.webhook',

  // SMS providers
  INTEGRATION_SMS_SENT: 'integration.sms.sent',
  INTEGRATION_SMS_FAILED: 'integration.sms.failed',
  INTEGRATION_SMS_DELIVERY: 'integration.sms.delivery',

  // ========== System Events ==========
  SYSTEM_CACHE_CLEARED: 'system.cache.cleared',
  SYSTEM_CONFIG_UPDATED: 'system.config.updated',
  SYSTEM_MAINTENANCE_MODE: 'system.maintenance.mode',
  SYSTEM_QUEUE_LAGGING: 'system.queue.lagging',
  SYSTEM_QUEUE_DEAD_LETTER: 'system.queue.dead_letter',
  SYSTEM_BACKUP_COMPLETED: 'system.backup.completed',
  SYSTEM_BACKUP_FAILED: 'system.backup.failed',

  // ========== Bangladesh Specific Events ==========
  BD_HOLIDAY_SHIPPING_SUSPEND: 'bd.holiday.shipping.suspend',
  BD_WEATHER_DISRUPTION: 'bd.weather.disruption',
  BD_BANDH_SHIPPING_DELAY: 'bd.bandh.shipping.delay',
} as const;

export type EventName = ValueOf<typeof EVENT_NAMES>;

// ============================================================
// Job Types (Batch processing)
// ============================================================
export const JOB_TYPES = {
  // ========== Data Processing ==========
  DATA_IMPORT: 'data.import',
  DATA_EXPORT: 'data.export',
  DATA_MIGRATION: 'data.migration',
  DATA_SYNC: 'data.sync',
  DATA_VALIDATION: 'data.validation',
  DATA_ENRICHMENT: 'data.enrichment',

  // ========== Reporting ==========
  REPORT_GENERATE: 'report.generate',
  REPORT_EMAIL: 'report.email',
  REPORT_DOWNLOAD: 'report.download',
  REPORT_SCHEDULED: 'report.scheduled',

  // ========== E-commerce Specific ==========
  PRODUCT_BULK_UPLOAD: 'product.bulk.upload',
  PRODUCT_PRICE_UPDATE: 'product.price.update',
  ORDER_BULK_STATUS: 'order.bulk.status',
  INVENTORY_BULK_SYNC: 'inventory.bulk.sync',

  // ========== Cleanup Jobs ==========
  CLEANUP_SESSIONS: 'cleanup.sessions',
  CLEANUP_LOGS: 'cleanup.logs',
  CLEANUP_TEMP: 'cleanup.temp',
  CLEANUP_CACHE: 'cleanup.cache',
  CLEANUP_CART: 'cleanup.cart',

  // ========== Maintenance Jobs ==========
  MAINTENANCE_BACKUP: 'maintenance.backup',
  MAINTENANCE_INDEX: 'maintenance.index',
  MAINTENANCE_OPTIMIZE: 'maintenance.optimize',
  MAINTENANCE_HEALTH_CHECK: 'maintenance.health_check',

  // ========== Notification Jobs ==========
  NOTIFICATION_BATCH: 'notification.batch',
  NEWSLETTER_SEND: 'newsletter.send',
  PROMOTION_BROADCAST: 'promotion.broadcast',
} as const;

export type JobType = ValueOf<typeof JOB_TYPES>;

// ============================================================
// Queue Monitoring Metrics
// ============================================================
export const QUEUE_METRICS = {
  ENABLED: true,
  METRICS_PREFIX: 'queue',
  MONITOR_INTERVAL_MS: 60000,              // 1 minute

  // Alert thresholds
  ALERT_QUEUE_SIZE: 10000,                 // 10,000 messages
  ALERT_QUEUE_SIZE_CRITICAL: 50000,        // 50,000 messages
  ALERT_CONSUMER_LAG: 1000,                // 1,000 messages behind
  ALERT_CONSUMER_LAG_CRITICAL: 5000,       // 5,000 messages behind
  ALERT_PROCESSING_TIME_MS: 30000,         // 30 seconds

  // Metrics to collect
  COLLECT_QUEUE_SIZE: true,
  COLLECT_CONSUMER_COUNT: true,
  COLLECT_MESSAGE_RATE: true,
  COLLECT_ERROR_RATE: true,
  COLLECT_PROCESSING_TIME: true,
  COLLECT_RETRY_COUNT: true,
  COLLECT_DEAD_LETTER_COUNT: true,
} as const;

export type QueueMetrics = typeof QUEUE_METRICS;

// ============================================================
// Retry Strategies
// ============================================================
export const RETRY_STRATEGIES = {
  LINEAR: 'linear',
  EXPONENTIAL: 'exponential',
  FIXED: 'fixed',
  CUSTOM: 'custom',
} as const;

export type RetryStrategy = ValueOf<typeof RETRY_STRATEGIES>;

// ============================================================
// Retry Configuration by Queue Type
// ============================================================
export const QUEUE_RETRY_CONFIG = {
  // Payment queues (Limited retries, longer delays)
  [QUEUES.PAYMENT]: {
    strategy: RETRY_STRATEGIES.LINEAR,
    maxAttempts: 3,
    delayMs: 1000,
    backoffMultiplier: 2,
  },
  [QUEUES.SSLCOMMERZ]: {
    strategy: RETRY_STRATEGIES.LINEAR,
    maxAttempts: 3,
    delayMs: 5000,
    backoffMultiplier: 2,
  },
  [QUEUES.BKASH]: {
    strategy: RETRY_STRATEGIES.LINEAR,
    maxAttempts: 3,
    delayMs: 5000,
    backoffMultiplier: 2,
  },

  // Communication queues (More retries, shorter delays)
  [QUEUES.EMAIL]: {
    strategy: RETRY_STRATEGIES.EXPONENTIAL,
    maxAttempts: 5,
    delayMs: 1000,
    backoffMultiplier: 2,
  },
  [QUEUES.SMS]: {
    strategy: RETRY_STRATEGIES.EXPONENTIAL,
    maxAttempts: 3,
    delayMs: 500,
    backoffMultiplier: 2,
  },
  [QUEUES.NOTIFICATION]: {
    strategy: RETRY_STRATEGIES.FIXED,
    maxAttempts: 3,
    delayMs: 1000,
  },

  // Webhook (Limited retries)
  [QUEUES.WEBHOOK]: {
    strategy: RETRY_STRATEGIES.EXPONENTIAL,
    maxAttempts: 5,
    delayMs: 1000,
    backoffMultiplier: 2,
    maxDelayMs: 60000,                     // Max 1 minute
  },

  // Background tasks (Many retries, long delays)
  [QUEUES.BATCH]: {
    strategy: RETRY_STRATEGIES.EXPONENTIAL,
    maxAttempts: 10,
    delayMs: 5000,
    backoffMultiplier: 2,
    maxDelayMs: 3600000,                   // Max 1 hour
  },

  // Default
  DEFAULT: {
    strategy: RETRY_STRATEGIES.LINEAR,
    maxAttempts: 3,
    delayMs: 1000,
    backoffMultiplier: 1,
  },
} as const;

export type QueueRetryConfig = typeof QUEUE_RETRY_CONFIG;

// ============================================================
// Rate Limiting for Queues (Bangladesh specific)
// ============================================================
export const QUEUE_RATE_LIMITS = {
  ENABLED: true,

  // Per queue rate limits (messages per second)
  [QUEUES.SMS]: {
    maxPerSecond: 10,
    maxPerMinute: 600,
    maxPerHour: 36000,
  },
  [QUEUES.EMAIL]: {
    maxPerSecond: 20,
    maxPerMinute: 1200,
    maxPerHour: 72000,
  },
  [QUEUES.WEBHOOK]: {
    maxPerSecond: 50,
    maxPerMinute: 3000,
    maxPerHour: 180000,
  },
  [QUEUES.THIRD_PARTY_API]: {
    maxPerSecond: 5,
    maxPerMinute: 300,
    maxPerHour: 18000,
  },

  // Default rate limit
  DEFAULT: {
    maxPerSecond: 100,
    maxPerMinute: 6000,
    maxPerHour: 360000,
  },
} as const;

export type QueueRateLimits = typeof QUEUE_RATE_LIMITS;

// ============================================================
// Queue Scheduling (Bangladesh timezone)
// ============================================================
export const QUEUE_SCHEDULING = {
  TIMEZONE: 'Asia/Dhaka',

  // Pause queues during holidays (Bangladesh)
  HOLIDAY_SUSPEND_QUEUES: [
    QUEUES.SHIPPING,
    QUEUES.REDX,
    QUEUES.PAPERFLY,
    QUEUES.SUNDARBAN,
    QUEUES.SA_PARIBAHAN,
  ],

  // Off-peak hours for background jobs
  OFF_PEAK_HOURS_START: 1,      // 1 AM
  OFF_PEAK_HOURS_END: 5,        // 5 AM

  // Peak hours for high priority (BD business hours)
  PEAK_HOURS_START: 10,         // 10 AM
  PEAK_HOURS_END: 22,           // 10 PM
} as const;

export type QueueScheduling = typeof QUEUE_SCHEDULING;

// ============================================================
// Queue Health Checks
// ============================================================
export const QUEUE_HEALTH = {
  ENABLED: true,
  CHECK_INTERVAL_SECONDS: 30,

  // Health thresholds
  UNHEALTHY_IF_LAG: 5000,
  DEGRADED_IF_LAG: 1000,
  UNHEALTHY_IF_DEAD_LETTER_COUNT: 100,

  // Health check endpoints
  HEALTH_ENDPOINTS: {
    RABBITMQ: '/health/rabbitmq',
    REDIS: '/health/redis',
    KAFKA: '/health/kafka',
  },
} as const;

export type QueueHealth = typeof QUEUE_HEALTH;

// ============================================================
// Deep freeze everything for immutability
// ============================================================
const deepFreeze = <T>(obj: T): ReadonlyDeep<T> => {
  Object.freeze(obj);
  if (obj === null || typeof obj !== 'object') return obj as ReadonlyDeep<T>;

  for (const value of Object.values(obj)) {
    if (value !== null && typeof value === 'object') {
      deepFreeze(value);
    }
  }

  return obj as ReadonlyDeep<T>;
};

// Apply deep freeze to all exported objects
export const __ALL_CONSTANTS_FROZEN__ = deepFreeze({
  QUEUES,
  EXCHANGES,
  ROUTING_KEYS,
  QUEUE_DLX,
  QUEUE_PRIORITIES,
  QUEUE_CONCURRENCY,
  QUEUE_TIMEOUTS,
  EVENT_NAMES,
  JOB_TYPES,
  QUEUE_METRICS,
  RETRY_STRATEGIES,
  QUEUE_RETRY_CONFIG,
  QUEUE_RATE_LIMITS,
  QUEUE_SCHEDULING,
  QUEUE_HEALTH,
});
