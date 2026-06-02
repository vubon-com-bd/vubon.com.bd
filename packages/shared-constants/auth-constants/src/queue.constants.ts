/**
 * Queue Constants - Enterprise Grade with Connection Config
 * Production-ready for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-constants/queue.constants
 * 
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
// CRITICAL: Queue Broker Connection Configuration
// ============================================================
export const QUEUE_CONNECTION_CONFIG = {
  REDIS: {
    HOST: process.env['QUEUE_REDIS_HOST'] || process.env['REDIS_HOST'] || 'localhost',
    PORT: parseInt(process.env['QUEUE_REDIS_PORT'] || process.env['REDIS_PORT'] || '6379'),
    PASSWORD: process.env['QUEUE_REDIS_PASSWORD'] || process.env['REDIS_PASSWORD'] || '',
    DB_INDEX: parseInt(process.env['QUEUE_REDIS_DB'] || '2'),
    
    POOL: {
      MIN: 10,
      MAX: 30,
      ACQUIRE_TIMEOUT_MS: 10000,
      IDLE_TIMEOUT_MS: 60000,
    },
    
    CLUSTER_ENABLED: process.env['REDIS_CLUSTER_ENABLED'] === 'true',
    CLUSTER_NODES: process.env['REDIS_CLUSTER_NODES']?.split(',') || [],
    CLUSTER_MAX_REDIRECTS: 3,
    
    TLS_ENABLED: process.env['REDIS_TLS'] === 'true',
    TLS_CA: process.env['REDIS_CA_CERT'],
    TLS_CERT: process.env['REDIS_CERT'],
    TLS_KEY: process.env['REDIS_KEY'],
    
    TIMEOUT: {
      CONNECT_MS: 5000,
      READ_MS: 3000,
      WRITE_MS: 3000,
      COMMAND_MS: 10000,
    },
    
    RETRY_STRATEGY: {
      MAX_RETRIES: 5,
      RETRY_DELAY_MS: 1000,
      BACKOFF_MULTIPLIER: 2,
      MAX_RETRY_DELAY_MS: 10000,
      RETRYABLE_ERRORS: ['ECONNRESET', 'ETIMEDOUT', 'ECONNREFUSED'],
    },
    
    CIRCUIT_BREAKER: {
      ENABLED: true,
      FAILURE_THRESHOLD: 5,
      RESET_TIMEOUT_MS: 30000,
      HALF_OPEN_MAX_ATTEMPTS: 3,
      ROLLING_WINDOW_MS: 60000,
    },
    
    HEALTH_CHECK: {
      ENABLED: true,
      INTERVAL_MS: 30000,
      TIMEOUT_MS: 5000,
    },
  },
  
  READ_REPLICA: {
    ENABLED: process.env['QUEUE_REPLICA_ENABLED'] === 'true',
    HOST: process.env['QUEUE_REPLICA_HOST'],
    PORT: parseInt(process.env['QUEUE_REPLICA_PORT'] || '6379'),
    PASSWORD: process.env['QUEUE_REPLICA_PASSWORD'],
  },
  
  FALLBACK: {
    ENABLED: true,
    TYPE: 'memory',
    MAX_JOBS: 1000,
    PERSIST_ON_DISK: false,
    TTL_SECONDS: 3600,
    CLEANUP_INTERVAL_MS: 60000,
  },
  
  WRITE_STRATEGY: {
    MODE: 'primary_first',
    CONSISTENCY: 'eventual',
    WRITE_TIMEOUT_MS: 5000,
    ACKNOWLEDGEMENT: 'wait_for_all',
  },
} as const;

// ============================================================
// Queue Worker Configuration
// ============================================================
export const QUEUE_WORKER_CONFIG = {
  WORKER: {
    CONCURRENCY: 10,
    LOCK_DURATION_MS: 30000,
    LOCK_RENEW_TIME_MS: 15000,
    STALLED_INTERVAL_MS: 30000,
    MAX_STALLED_COUNT: 3,
    RUN_DELAY_MS: 0,
    SETTINGS: {
      LOCK_RENEW_TIME: 15000,
      STALLED_INTERVAL: 30000,
      MAX_STALLED_COUNT: 3,
    },
  },
  
  JOB: {
    REMOVE_ON_COMPLETE: {
      AGE: 3600,
      COUNT: 1000,
    },
    REMOVE_ON_FAIL: {
      AGE: 86400,
      COUNT: 5000,
    },
    REMOVE_ON_DELAY: {
      AGE: 604800,
      COUNT: 10000,
    },
    KEEP_JOB_LOGS: 100,
  },
  
  RATE_LIMITER: {
    ENABLED: true,
    GROUP_KEY: 'queue:ratelimit:',
    DURATION_MS: 60000,
    POINTS: 100,
    BLOCK_DURATION_MS: 30000,
    MAX_DELAY_MS: 300000,
  },
  
  SANDBOX: {
    ENABLED: false,
    MAX_MEMORY_MB: 512,
    TIMEOUT_MS: 60000,
    MAX_CPU_PERCENT: 50,
  },
  
  SPAWN: {
    ENABLED: false,
    MAX_CHILDREN: 10,
    CHILD_TIMEOUT_MS: 30000,
  },
} as const;

// ============================================================
// Queue Monitoring Configuration
// ============================================================
export const QUEUE_MONITORING_CONFIG = {
  ENABLED: true,
  
  METRICS: {
    JOB_COUNT: {
      NAME: 'vubon_queue_jobs_total',
      TYPE: 'counter',
      HELP: 'Total number of jobs processed',
      LABELS: ['queue', 'status'],
    },
    JOB_DURATION_SECONDS: {
      NAME: 'vubon_queue_job_duration_seconds',
      TYPE: 'histogram',
      HELP: 'Job processing duration in seconds',
      BUCKETS: [0.1, 0.5, 1, 2, 5, 10, 30, 60, 120],
    },
    JOB_FAILURES: {
      NAME: 'vubon_queue_job_failures_total',
      TYPE: 'counter',
      HELP: 'Total job failures',
      LABELS: ['queue', 'error'],
    },
    QUEUE_SIZE: {
      NAME: 'vubon_queue_size',
      TYPE: 'gauge',
      HELP: 'Current queue size',
      LABELS: ['queue'],
    },
    ACTIVE_WORKERS: {
      NAME: 'vubon_queue_active_workers',
      TYPE: 'gauge',
      HELP: 'Number of active workers',
      LABELS: ['queue'],
    },
    JOB_LAG_SECONDS: {
      NAME: 'vubon_queue_job_lag_seconds',
      TYPE: 'gauge',
      HELP: 'Job processing lag in seconds',
      LABELS: ['queue'],
    },
    DLQ_SIZE: {
      NAME: 'vubon_queue_dlq_size',
      TYPE: 'gauge',
      HELP: 'Dead letter queue size',
      LABELS: ['queue'],
    },
    JOB_RETRIES: {
      NAME: 'vubon_queue_job_retries_total',
      TYPE: 'counter',
      HELP: 'Total job retries',
      LABELS: ['queue'],
    },
  },
  
  DASHBOARD: {
    ENABLED: true,
    PATH: '/admin/queues',
    AUTH_REQUIRED: true,
    REFRESH_INTERVAL_MS: 5000,
    MAX_PAGE_SIZE: 100,
    EXPORT_ENABLED: true,
  },
  
  ALERTS: {
    QUEUE_SIZE_THRESHOLD: 10000,
    QUEUE_SIZE_CRITICAL: 50000,
    FAILURE_RATE_THRESHOLD: 0.1,
    JOB_LAG_THRESHOLD_SECONDS: 300,
    DLQ_SIZE_THRESHOLD: 1000,
    STALLED_JOB_THRESHOLD: 3,
    WORKER_COUNT_DROPPED: true,
    
    SLACK_WEBHOOK: process.env['SLACK_ALERTS_WEBHOOK'],
    EMAIL_RECIPIENTS: process.env['ALERT_EMAILS']?.split(','),
    
    COOLDOWN_MINUTES: 5,
    NOTIFICATION_CHANNELS: ['slack', 'email'],
  },
  
  TRACING: {
    ENABLED: true,
    SAMPLING_RATE: 0.1,
    EXPORTER: 'jaeger',
    EXPORTER_ENDPOINT: process.env['JAEGER_ENDPOINT'],
    SERVICE_NAME: 'vubon-queue-service',
    SPAN_ATTRIBUTES: ['queue', 'jobId', 'status'],
  },
} as const;

// ============================================================
// Queue Backpressure Configuration
// ============================================================
export const QUEUE_BACKPRESSURE_CONFIG = {
  ENABLED: true,
  
  THRESHOLDS: {
    HIGH_WATERMARK: 10000,
    LOW_WATERMARK: 5000,
    PAUSE_ON_HIGH: true,
    RESUME_ON_LOW: true,
    CRITICAL_THRESHOLD: 50000,
  },
  
  DRAIN_STRATEGY: {
    BATCH_SIZE: 100,
    BATCH_INTERVAL_MS: 1000,
    PARALLEL_DRAIN: 5,
    MAX_DRAIN_MESSAGES: 10000,
    DRAIN_ON_STARTUP: true,
  },
  
  PRIORITY_ORDER: [
    'payment.queue',
    'sslcommerz.queue',
    'bkash.queue',
    'nagad.queue',
    'order.queue',
    'checkout.queue',
    'auth.queue',
    'inventory.queue',
    'product.queue',
    'email.queue',
    'sms.queue',
    'notification.queue',
  ],
  
  ADAPTIVE: {
    ENABLED: true,
    UPDATE_INTERVAL_MS: 60000,
    SMOOTHING_FACTOR: 0.3,
    MIN_WORKERS: 1,
    MAX_WORKERS: 50,
  },
} as const;

// ============================================================
// Queue Security Configuration
// ============================================================
export const QUEUE_SECURITY = {
  ENCRYPTION: {
    ENABLED: true,
    ALGORITHM: 'aes-256-gcm',
    KEY_ROTATION_DAYS: 90,
    SENSITIVE_FIELDS: ['payment_info', 'user_credentials', 'api_keys'],
  },
  
  AUTHENTICATION: {
    ENABLED: true,
    REQUIRED_FOR: ['admin', 'dashboard', 'monitoring', 'dlq_access'],
    TOKEN_EXPIRY_HOURS: 24,
  },
  
  SENSITIVE_DATA_MASKING: {
    ENABLED: true,
    FIELDS_TO_MASK: ['password', 'token', 'api_key', 'secret', 'card_number', 'cvv', 'otp'],
    MASK_CHAR: '*',
    SHOW_LAST_CHARS: 4,
    LOG_SENSITIVE_DATA: false,
  },
  
  IP_WHITELIST: {
    ENABLED: process.env['NODE_ENV'] === 'production',
    ALLOWED_IPS: process.env['QUEUE_ALLOWED_IPS']?.split(',') || [],
    ALLOWED_CIDRS: ['10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16'],
  },
  
  ACCESS_CONTROL: {
    ROLES: {
      ADMIN: ['*'],
      MONITOR: ['view', 'metrics'],
      OPERATOR: ['view', 'retry', 'delete'],
    },
  },
} as const;

// ============================================================
// Queue Names (Core business queues)
// ============================================================
export const QUEUES = {
  AUTH: 'auth.queue',
  USER: 'user.queue',
  PRODUCT: 'product.queue',
  ORDER: 'order.queue',
  PAYMENT: 'payment.queue',
  INVENTORY: 'inventory.queue',
  CART: 'cart.queue',
  CHECKOUT: 'checkout.queue',
  EMAIL: 'email.queue',
  SMS: 'sms.queue',
  NOTIFICATION: 'notification.queue',
  PUSH: 'push.queue',
  WHATSAPP: 'whatsapp.queue',
  VOICE_CALL: 'voice_call.queue',
  SSLCOMMERZ: 'sslcommerz.queue',
  BKASH: 'bkash.queue',
  NAGAD: 'nagad.queue',
  ROCKET: 'rocket.queue',
  STRIPE: 'stripe.queue',
  PAYPAL: 'paypal.queue',
  REDX: 'redx.queue',
  PAPERFLY: 'paperfly.queue',
  SUNDARBAN: 'sundarban.queue',
  SA_PARIBAHAN: 'sa_paribahan.queue',
  PATHAO: 'pathao.queue',
  SMS_BANGLALINK: 'sms.banglalink.queue',
  SMS_GP: 'sms.gp.queue',
  SMS_ROBI: 'sms.robi.queue',
  SMS_TELETALK: 'sms.teletalk.queue',
  SMS_OTHERS: 'sms.others.queue',
  JOB: 'job.queue',
  BATCH: 'batch.queue',
  REPORT: 'report.queue',
  ANALYTICS: 'analytics.queue',
  WEBHOOK: 'webhook.queue',
  SYNC: 'sync.queue',
  IMPORT: 'import.queue',
  EXPORT: 'export.queue',
  CLEANUP: 'cleanup.queue',
  MAINTENANCE: 'maintenance.queue',
  BACKUP: 'backup.queue',
  REALTIME: 'realtime.queue',
  EVENT: 'event.queue',
  THIRD_PARTY_API: 'third_party_api.queue',
  RATE_LIMITED: 'rate_limited.queue',
  DLQ_MAIN: 'dlq.main',
  DLQ_RETRY: 'dlq.retry',
  DLQ_PAYMENT: 'dlq.payment',
  DLQ_NOTIFICATION: 'dlq.notification',
} as const;

export type Queue = ValueOf<typeof QUEUES>;

// ============================================================
// Exchange Names
// ============================================================
export const EXCHANGES = {
  DIRECT_AUTH: 'auth.direct',
  DIRECT_USER: 'user.direct',
  DIRECT_ORDER: 'order.direct',
  DIRECT_PAYMENT: 'payment.direct',
  DIRECT_SHIPPING: 'shipping.direct',
  TOPIC_BUSINESS: 'business.topic',
  TOPIC_EVENTS: 'events.topic',
  TOPIC_NOTIFICATION: 'notification.topic',
  TOPIC_PAYMENT: 'payment.topic',
  FANOUT_BROADCAST: 'broadcast.fanout',
  FANOUT_SYSTEM: 'system.fanout',
  FANOUT_ALERT: 'alert.fanout',
  HEADERS_PRIORITY: 'priority.headers',
  DLX_MAIN: 'dlx.main',
  DLX_RETRY: 'dlx.retry',
  DLX_DELAYED: 'dlx.delayed',
} as const;

export type Exchange = ValueOf<typeof EXCHANGES>;

// ============================================================
// Routing Keys
// ============================================================
export const ROUTING_KEYS = {
  AUTH_LOGIN: 'auth.login',
  AUTH_LOGOUT: 'auth.logout',
  AUTH_REGISTER: 'auth.register',
  AUTH_PASSWORD_RESET: 'auth.password.reset',
  AUTH_MFA_VERIFY: 'auth.mfa.verify',
  USER_CREATED: 'user.created',
  USER_UPDATED: 'user.updated',
  USER_DELETED: 'user.deleted',
  USER_SUSPENDED: 'user.suspended',
  USER_ACTIVATED: 'user.activated',
  PRODUCT_CREATED: 'product.created',
  PRODUCT_UPDATED: 'product.updated',
  PRODUCT_DELETED: 'product.deleted',
  PRODUCT_APPROVED: 'product.approved',
  PRODUCT_REJECTED: 'product.rejected',
  PRODUCT_LOW_STOCK: 'product.low_stock',
  ORDER_CREATED: 'order.created',
  ORDER_UPDATED: 'order.updated',
  ORDER_CANCELLED: 'order.cancelled',
  ORDER_COMPLETED: 'order.completed',
  ORDER_SHIPPED: 'order.shipped',
  ORDER_DELIVERED: 'order.delivered',
  ORDER_REFUNDED: 'order.refunded',
  PAYMENT_PROCESSED: 'payment.processed',
  PAYMENT_SUCCESS: 'payment.success',
  PAYMENT_FAILED: 'payment.failed',
  PAYMENT_REFUNDED: 'payment.refunded',
  PAYMENT_PENDING: 'payment.pending',
  PAYMENT_SSLCOMMERZ_SUCCESS: 'payment.sslcommerz.success',
  PAYMENT_SSLCOMMERZ_FAILED: 'payment.sslcommerz.failed',
  PAYMENT_BKASH_SUCCESS: 'payment.bkash.success',
  PAYMENT_BKASH_FAILED: 'payment.bkash.failed',
  PAYMENT_NAGAD_SUCCESS: 'payment.nagad.success',
  PAYMENT_NAGAD_FAILED: 'payment.nagad.failed',
  PAYMENT_ROCKET_SUCCESS: 'payment.rocket.success',
  PAYMENT_ROCKET_FAILED: 'payment.rocket.failed',
  SHIPPING_CREATED: 'shipping.created',
  SHIPPING_PICKED: 'shipping.picked',
  SHIPPING_IN_TRANSIT: 'shipping.in_transit',
  SHIPPING_DELIVERED: 'shipping.delivered',
  SHIPPING_FAILED: 'shipping.failed',
  INVENTORY_UPDATED: 'inventory.updated',
  INVENTORY_LOW: 'inventory.low',
  INVENTORY_OUT: 'inventory.out',
  INVENTORY_RESTOCKED: 'inventory.restocked',
  NOTIFICATION_EMAIL: 'notification.email',
  NOTIFICATION_SMS: 'notification.sms',
  NOTIFICATION_PUSH: 'notification.push',
  NOTIFICATION_WHATSAPP: 'notification.whatsapp',
  NOTIFICATION_BROADCAST: 'notification.broadcast',
  SMS_BANGLALINK: 'sms.banglalink',
  SMS_GP: 'sms.gp',
  SMS_ROBI: 'sms.robi',
  SMS_TELETALK: 'sms.teletalk',
  SMS_OTP: 'sms.otp',
  SMS_PROMOTIONAL: 'sms.promotional',
  SMS_TRANSACTIONAL: 'sms.transactional',
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
  RETRY_DELAY_MS: 5000,
  RETRY_DELAYS: {
    [QUEUES.PAYMENT]: 10000,
    [QUEUES.SSLCOMMERZ]: 15000,
    [QUEUES.BKASH]: 15000,
    [QUEUES.NAGAD]: 15000,
    [QUEUES.SMS_GP]: 2000,
    [QUEUES.EMAIL]: 60000,
    [QUEUES.WEBHOOK]: 30000,
  },
  EXCHANGE: EXCHANGES.DLX_MAIN,
  ROUTING_KEY: 'queue.dead',
  DLQ_MAPPING: {
    payment: QUEUES.DLQ_PAYMENT,
    notification: QUEUES.DLQ_NOTIFICATION,
    default: QUEUES.DLQ_MAIN,
  },
} as const;

// ============================================================
// Queue Priorities
// ============================================================
export const QUEUE_PRIORITIES = {
  CRITICAL: 10,
  CRITICAL_MAX: 10,
  CRITICAL_MIN: 9,
  HIGH: 7,
  HIGH_MAX: 8,
  HIGH_MIN: 6,
  NORMAL: 5,
  NORMAL_MAX: 5,
  NORMAL_MIN: 4,
  LOW: 3,
  LOW_MAX: 3,
  LOW_MIN: 2,
  BACKGROUND: 1,
  BACKGROUND_MAX: 1,
  BACKGROUND_MIN: 0,
} as const;

export type QueuePriority = ValueOf<typeof QUEUE_PRIORITIES>;

// ============================================================
// Consumer Concurrency Settings
// ============================================================
export const QUEUE_CONCURRENCY = {
  EMAIL: 50,
  NOTIFICATION: 100,
  SMS: 80,
  ANALYTICS: 30,
  LOGGING: 50,
  PRODUCT: 20,
  USER: 15,
  ORDER: 20,
  CART: 25,
  AUTH: 5,
  PAYMENT: 5,
  SSLCOMMERZ: 5,
  BKASH: 5,
  NAGAD: 5,
  REPORT: 2,
  CLEANUP: 2,
  BACKUP: 1,
  MAINTENANCE: 1,
  DEFAULT: 10,
  MIN: 1,
  MAX: 100,
} as const;

export type QueueConcurrency = typeof QUEUE_CONCURRENCY;

// ============================================================
// Queue Timeouts
// ============================================================
export const QUEUE_TIMEOUTS = {
  PAYMENT: 60000,
  SSLCOMMERZ: 60000,
  BKASH: 45000,
  NAGAD: 45000,
  ROCKET: 45000,
  AUTH: 30000,
  USER: 30000,
  ORDER: 45000,
  INVENTORY: 30000,
  EMAIL: 60000,
  SMS: 10000,
  WHATSAPP: 15000,
  WEBHOOK: 30000,
  THIRD_PARTY_API: 30000,
  RATE_LIMITED: 30000,
  REPORT: 300000,
  BATCH: 600000,
  CLEANUP: 600000,
  BACKUP: 1800000,
  DEFAULT: 30000,
} as const;

export type QueueTimeout = ValueOf<typeof QUEUE_TIMEOUTS>;

// ============================================================
// Event Names
// ============================================================
export const EVENT_NAMES = {
  DOMAIN_USER_REGISTERED: 'domain.user.registered',
  DOMAIN_USER_VERIFIED: 'domain.user.verified',
  DOMAIN_USER_SUSPENDED: 'domain.user.suspended',
  DOMAIN_USER_ACTIVATED: 'domain.user.activated',
  DOMAIN_USER_PROFILE_UPDATED: 'domain.user.profile.updated',
  DOMAIN_USER_PASSWORD_CHANGED: 'domain.user.password.changed',
  DOMAIN_PRODUCT_CREATED: 'domain.product.created',
  DOMAIN_PRODUCT_UPDATED: 'domain.product.updated',
  DOMAIN_PRODUCT_DELETED: 'domain.product.deleted',
  DOMAIN_PRODUCT_APPROVED: 'domain.product.approved',
  DOMAIN_PRODUCT_REJECTED: 'domain.product.rejected',
  DOMAIN_PRODUCT_LOW_STOCK: 'domain.product.low_stock',
  DOMAIN_ORDER_PLACED: 'domain.order.placed',
  DOMAIN_ORDER_PAID: 'domain.order.paid',
  DOMAIN_ORDER_SHIPPED: 'domain.order.shipped',
  DOMAIN_ORDER_DELIVERED: 'domain.order.delivered',
  DOMAIN_ORDER_CANCELLED: 'domain.order.cancelled',
  DOMAIN_ORDER_REFUNDED: 'domain.order.refunded',
  DOMAIN_PAYMENT_SUCCESS: 'domain.payment.success',
  DOMAIN_PAYMENT_FAILED: 'domain.payment.failed',
  DOMAIN_PAYMENT_REFUNDED: 'domain.payment.refunded',
  DOMAIN_CART_ADDED: 'domain.cart.added',
  DOMAIN_CART_REMOVED: 'domain.cart.removed',
  DOMAIN_CART_CLEARED: 'domain.cart.cleared',
  INTEGRATION_PAYMENT_SUCCESS: 'integration.payment.success',
  INTEGRATION_PAYMENT_FAILURE: 'integration.payment.failure',
  INTEGRATION_SSLCOMMERZ_WEBHOOK: 'integration.sslcommerz.webhook',
  INTEGRATION_BKASH_WEBHOOK: 'integration.bkash.webhook',
  INTEGRATION_NAGAD_WEBHOOK: 'integration.nagad.webhook',
  INTEGRATION_SHIPPING_CREATED: 'integration.shipping.created',
  INTEGRATION_SHIPPING_STATUS: 'integration.shipping.status',
  INTEGRATION_REDX_WEBHOOK: 'integration.redx.webhook',
  INTEGRATION_PAPERFLY_WEBHOOK: 'integration.paperfly.webhook',
  INTEGRATION_SMS_SENT: 'integration.sms.sent',
  INTEGRATION_SMS_FAILED: 'integration.sms.failed',
  INTEGRATION_SMS_DELIVERY: 'integration.sms.delivery',
  SYSTEM_CACHE_CLEARED: 'system.cache.cleared',
  SYSTEM_CONFIG_UPDATED: 'system.config.updated',
  SYSTEM_MAINTENANCE_MODE: 'system.maintenance.mode',
  SYSTEM_QUEUE_LAGGING: 'system.queue.lagging',
  SYSTEM_QUEUE_DEAD_LETTER: 'system.queue.dead_letter',
  SYSTEM_BACKUP_COMPLETED: 'system.backup.completed',
  SYSTEM_BACKUP_FAILED: 'system.backup.failed',
  BD_HOLIDAY_SHIPPING_SUSPEND: 'bd.holiday.shipping.suspend',
  BD_WEATHER_DISRUPTION: 'bd.weather.disruption',
  BD_BANDH_SHIPPING_DELAY: 'bd.bandh.shipping.delay',
} as const;

export type EventName = ValueOf<typeof EVENT_NAMES>;

// ============================================================
// Job Types
// ============================================================
export const JOB_TYPES = {
  DATA_IMPORT: 'data.import',
  DATA_EXPORT: 'data.export',
  DATA_MIGRATION: 'data.migration',
  DATA_SYNC: 'data.sync',
  DATA_VALIDATION: 'data.validation',
  DATA_ENRICHMENT: 'data.enrichment',
  REPORT_GENERATE: 'report.generate',
  REPORT_EMAIL: 'report.email',
  REPORT_DOWNLOAD: 'report.download',
  REPORT_SCHEDULED: 'report.scheduled',
  PRODUCT_BULK_UPLOAD: 'product.bulk.upload',
  PRODUCT_PRICE_UPDATE: 'product.price.update',
  ORDER_BULK_STATUS: 'order.bulk.status',
  INVENTORY_BULK_SYNC: 'inventory.bulk.sync',
  CLEANUP_SESSIONS: 'cleanup.sessions',
  CLEANUP_LOGS: 'cleanup.logs',
  CLEANUP_TEMP: 'cleanup.temp',
  CLEANUP_CACHE: 'cleanup.cache',
  CLEANUP_CART: 'cleanup.cart',
  MAINTENANCE_BACKUP: 'maintenance.backup',
  MAINTENANCE_INDEX: 'maintenance.index',
  MAINTENANCE_OPTIMIZE: 'maintenance.optimize',
  MAINTENANCE_HEALTH_CHECK: 'maintenance.health_check',
  NOTIFICATION_BATCH: 'notification.batch',
  NEWSLETTER_SEND: 'newsletter.send',
  PROMOTION_BROADCAST: 'promotion.broadcast',
} as const;

export type JobType = ValueOf<typeof JOB_TYPES>;

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
  [QUEUES.WEBHOOK]: {
    strategy: RETRY_STRATEGIES.EXPONENTIAL,
    maxAttempts: 5,
    delayMs: 1000,
    backoffMultiplier: 2,
    maxDelayMs: 60000,
  },
  [QUEUES.BATCH]: {
    strategy: RETRY_STRATEGIES.EXPONENTIAL,
    maxAttempts: 10,
    delayMs: 5000,
    backoffMultiplier: 2,
    maxDelayMs: 3600000,
  },
  DEFAULT: {
    strategy: RETRY_STRATEGIES.LINEAR,
    maxAttempts: 3,
    delayMs: 1000,
    backoffMultiplier: 1,
  },
} as const;

export type QueueRetryConfig = typeof QUEUE_RETRY_CONFIG;

// ============================================================
// Rate Limiting for Queues
// ============================================================
export const QUEUE_RATE_LIMITS = {
  ENABLED: true,
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
  DEFAULT: {
    maxPerSecond: 100,
    maxPerMinute: 6000,
    maxPerHour: 360000,
  },
} as const;

export type QueueRateLimits = typeof QUEUE_RATE_LIMITS;

// ============================================================
// Queue Scheduling
// ============================================================
export const QUEUE_SCHEDULING = {
  TIMEZONE: 'Asia/Dhaka',
  HOLIDAY_SUSPEND_QUEUES: [
    QUEUES.REDX,
    QUEUES.PAPERFLY,
    QUEUES.SUNDARBAN,
    QUEUES.SA_PARIBAHAN,
  ],
  OFF_PEAK_HOURS_START: 1,
  OFF_PEAK_HOURS_END: 5,
  PEAK_HOURS_START: 10,
  PEAK_HOURS_END: 22,
} as const;

export type QueueScheduling = typeof QUEUE_SCHEDULING;

// ============================================================
// Queue Health Checks
// ============================================================
export const QUEUE_HEALTH = {
  ENABLED: true,
  CHECK_INTERVAL_SECONDS: 30,
  UNHEALTHY_IF_LAG: 5000,
  DEGRADED_IF_LAG: 1000,
  UNHEALTHY_IF_DEAD_LETTER_COUNT: 100,
  HEALTH_ENDPOINTS: {
    RABBITMQ: '/health/rabbitmq',
    REDIS: '/health/redis',
    KAFKA: '/health/kafka',
  },
} as const;

export type QueueHealth = typeof QUEUE_HEALTH;

// ============================================================
// Export all configs
// ============================================================
export type QueueConnectionConfig = typeof QUEUE_CONNECTION_CONFIG;
export type QueueWorkerConfig = typeof QUEUE_WORKER_CONFIG;
export type QueueMonitoringConfig = typeof QUEUE_MONITORING_CONFIG;
export type QueueBackpressureConfig = typeof QUEUE_BACKPRESSURE_CONFIG;
export type QueueSecurityConfig = typeof QUEUE_SECURITY;
