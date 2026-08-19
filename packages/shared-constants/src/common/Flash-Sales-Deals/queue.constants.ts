/**
 * Flash Sales & Deals Queue Constants
 * Contains all queue-related constants for flash sales and deals management
 */

// ==================== Type Definitions ====================

type QueueConfig = {
  attempts: number;
  backoff: {
    type: string;
    delay: number;
    factor: number;
  };
  timeout: number;
  delay: number;
  priority: number;
  removeOnComplete: boolean;
  removeOnFail: boolean;
  stackTraceLimit: number;
};

// ==================== Queue Names ====================

export const FlashSalesDealsQueueNames = {
  FLASH_SALE: 'flash-sale',
  DEAL: 'deal',
  PRODUCT_DEAL: 'product-deal',
  BUNDLE_DEAL: 'bundle-deal',
  INVENTORY: 'inventory',
  PRICE: 'price',
  COUPON: 'coupon',
  VOUCHER: 'voucher',
  NOTIFICATION: 'notification',
  ANALYTICS: 'analytics',
  REPORT: 'report',
  PARTICIPANT: 'participant',
  SCHEDULE: 'schedule',
  RULE: 'rule',
  WISHLIST: 'wishlist',
  SHARE: 'share',
  EMAIL: 'email',
  SMS: 'sms',
  PUSH: 'push',
} as const;

export type FlashSalesDealsQueueName =
  (typeof FlashSalesDealsQueueNames)[keyof typeof FlashSalesDealsQueueNames];

// ==================== Queue Prefixes ====================

export const FlashSalesDealsQueuePrefixes = {
  FLASH_SALE: 'fs:',
  DEAL: 'deal:',
  JOB: 'job:',
  WORKER: 'worker:',
  RETRY: 'retry:',
  DEAD_LETTER: 'dl:',
  DELAYED: 'delayed:',
  SCHEDULED: 'scheduled:',
  PRIORITY: 'priority:',
  BATCH: 'batch:',
  PROCESSING: 'processing:',
  COMPLETED: 'completed:',
  FAILED: 'failed:',
} as const;

export type FlashSalesDealsQueuePrefix =
  (typeof FlashSalesDealsQueuePrefixes)[keyof typeof FlashSalesDealsQueuePrefixes];

// ==================== Queue Configuration ====================

export const FlashSalesDealsQueueConfig = {
  CONNECTION: 'default',
  DRIVER: 'bull',
  DURABLE: true,
  EXCLUSIVE: false,
  AUTO_DELETE: false,
  PREFETCH: 5,
  CONCURRENCY: 10,
  CONFIRM: true,
  MANDATORY: true,
  MAX_SIZE: 10000,
  BATCH_SIZE: 100,
  PROCESSING_INTERVAL: 1000,
} as const;

// ==================== Job Configuration ====================

export const FlashSalesDealsJobConfig = {
  ATTEMPTS: 3,
  TIMEOUT: 30000,
  RETRY_DELAY: 5000,
  MAX_RETRY: 3,
  DELAY: 0,
  PRIORITY: 5,
  REMOVE_ON_COMPLETE: true,
  REMOVE_ON_FAIL: false,
  STACK_TRACE_LIMIT: 10,
  BACKOFF: {
    type: 'exponential',
    delay: 60000,
    factor: 2,
  } as const,
} as const;

// ==================== Dead Letter Queue ====================

export const FlashSalesDealsDeadLetterConfig = {
  QUEUE: 'flash-sales-dlq',
  EXCHANGE: 'flash-sales.dlx',
  ROUTING_KEY: 'flash-sales.dlq',
  TTL: 86400000,
  MAX_RETRIES: 3,
  EXCHANGE_TYPE: 'direct',
  QUEUE_TYPE: 'classic',
} as const;

// ==================== Delayed Queue ====================

export const FlashSalesDealsDelayedConfig = {
  QUEUE: 'flash-sales-delayed',
  EXCHANGE: 'flash-sales.delayed',
  ROUTING_KEY: 'flash-sales.delayed',
  TTL: 3600000,
} as const;

// ==================== Scheduled Queue ====================

export const FlashSalesDealsScheduledConfig = {
  QUEUE: 'flash-sales-scheduled',
  EXCHANGE: 'flash-sales.scheduled',
  ROUTING_KEY: 'flash-sales.scheduled',
  TTL: 86400000,
} as const;

// ==================== Priority Levels ====================

export const FlashSalesDealsPriorities = {
  CRITICAL: 1,
  HIGH: 2,
  MEDIUM: 5,
  LOW: 8,
  VERY_LOW: 10,
  DEFAULT: 5,
} as const;

export type FlashSalesDealsPriority =
  (typeof FlashSalesDealsPriorities)[keyof typeof FlashSalesDealsPriorities];

// ==================== Queue Events ====================

export const FlashSalesDealsQueueEvents = {
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  STALLED: 'stalled',
  PROGRESS: 'progress',
  WAITING: 'waiting',
  ACTIVE: 'active',
  DELAYED: 'delayed',
  PAUSED: 'paused',
  RESUME: 'resume',
  CLEANED: 'cleaned',
  DRAINED: 'drained',
  REMOVED: 'removed',
  DEAD_LETTER: 'dead_letter',
  RETRY: 'retry',
  ERROR: 'error',
  CLOSED: 'closed',
  CONNECT: 'connect',
  RECONNECT: 'reconnect',
  DISCONNECT: 'disconnect',
} as const;

export type FlashSalesDealsQueueEvent =
  (typeof FlashSalesDealsQueueEvents)[keyof typeof FlashSalesDealsQueueEvents];

// ==================== Delivery Modes ====================

export const FlashSalesDealsDeliveryModes = {
  PERSISTENT: 'persistent',
  NON_PERSISTENT: 'non_persistent',
} as const;

export type FlashSalesDealsDeliveryMode =
  (typeof FlashSalesDealsDeliveryModes)[keyof typeof FlashSalesDealsDeliveryModes];

// ==================== Exchange Types ====================

export const FlashSalesDealsExchangeTypes = {
  DIRECT: 'direct',
  TOPIC: 'topic',
  FANOUT: 'fanout',
  HEADERS: 'headers',
} as const;

export type FlashSalesDealsExchangeType =
  (typeof FlashSalesDealsExchangeTypes)[keyof typeof FlashSalesDealsExchangeTypes];

// ==================== Queue Types ====================

export const FlashSalesDealsQueueTypes = {
  CLASSIC: 'classic',
  QUORUM: 'quorum',
  STREAM: 'stream',
} as const;

export type FlashSalesDealsQueueType =
  (typeof FlashSalesDealsQueueTypes)[keyof typeof FlashSalesDealsQueueTypes];

// ==================== Job Types ====================

export const FlashSalesDealsJobTypes = {
  // Flash Sale Jobs
  CREATE_FLASH_SALE: 'create_flash_sale',
  UPDATE_FLASH_SALE: 'update_flash_sale',
  DELETE_FLASH_SALE: 'delete_flash_sale',
  PUBLISH_FLASH_SALE: 'publish_flash_sale',
  UNPUBLISH_FLASH_SALE: 'unpublish_flash_sale',
  START_FLASH_SALE: 'start_flash_sale',
  END_FLASH_SALE: 'end_flash_sale',
  PAUSE_FLASH_SALE: 'pause_flash_sale',
  RESUME_FLASH_SALE: 'resume_flash_sale',

  // Deal Jobs
  CREATE_DEAL: 'create_deal',
  UPDATE_DEAL: 'update_deal',
  DELETE_DEAL: 'delete_deal',
  PUBLISH_DEAL: 'publish_deal',
  UNPUBLISH_DEAL: 'unpublish_deal',
  START_DEAL: 'start_deal',
  END_DEAL: 'end_deal',
  PROCESS_DEAL: 'process_deal',

  // Product Deal Jobs
  CREATE_PRODUCT_DEAL: 'create_product_deal',
  UPDATE_PRODUCT_DEAL: 'update_product_deal',
  DELETE_PRODUCT_DEAL: 'delete_product_deal',
  APPLY_PRODUCT_DEAL: 'apply_product_deal',

  // Bundle Deal Jobs
  CREATE_BUNDLE_DEAL: 'create_bundle_deal',
  UPDATE_BUNDLE_DEAL: 'update_bundle_deal',
  DELETE_BUNDLE_DEAL: 'delete_bundle_deal',
  APPLY_BUNDLE_DEAL: 'apply_bundle_deal',

  // Inventory Jobs
  UPDATE_INVENTORY: 'update_inventory',
  RESERVE_INVENTORY: 'reserve_inventory',
  RELEASE_INVENTORY: 'release_inventory',
  SYNC_INVENTORY: 'sync_inventory',
  CHECK_INVENTORY: 'check_inventory',

  // Price Jobs
  UPDATE_PRICE: 'update_price',
  UPDATE_DISCOUNT: 'update_discount',
  PRICE_SYNC: 'price_sync',
  PRICE_VALIDATE: 'price_validate',

  // Coupon Jobs
  CREATE_COUPON: 'create_coupon',
  UPDATE_COUPON: 'update_coupon',
  DELETE_COUPON: 'delete_coupon',
  VALIDATE_COUPON: 'validate_coupon',
  APPLY_COUPON: 'apply_coupon',
  RELEASE_COUPON: 'release_coupon',

  // Voucher Jobs
  CREATE_VOUCHER: 'create_voucher',
  UPDATE_VOUCHER: 'update_voucher',
  DELETE_VOUCHER: 'delete_voucher',
  VALIDATE_VOUCHER: 'validate_voucher',
  REDEEM_VOUCHER: 'redeem_voucher',
  RELEASE_VOUCHER: 'release_voucher',

  // Notification Jobs
  SEND_NOTIFICATION: 'send_notification',
  SEND_EMAIL: 'send_email',
  SEND_SMS: 'send_sms',
  SEND_PUSH: 'send_push',
  SEND_BULK_NOTIFICATION: 'send_bulk_notification',

  // Analytics Jobs
  PROCESS_ANALYTICS: 'process_analytics',
  UPDATE_ANALYTICS: 'update_analytics',
  AGGREGATE_ANALYTICS: 'aggregate_analytics',
  PROCESS_SALES: 'process_sales',

  // Report Jobs
  GENERATE_REPORT: 'generate_report',
  GENERATE_SALES_REPORT: 'generate_sales_report',
  GENERATE_PARTICIPANT_REPORT: 'generate_participant_report',
  GENERATE_PERFORMANCE_REPORT: 'generate_performance_report',
  GENERATE_FINANCIAL_REPORT: 'generate_financial_report',

  // Participant Jobs
  JOIN_FLASH_SALE: 'join_flash_sale',
  LEAVE_FLASH_SALE: 'leave_flash_sale',
  UPDATE_PARTICIPANT: 'update_participant',
  SYNC_PARTICIPANT: 'sync_participant',

  // Schedule Jobs
  CREATE_SCHEDULE: 'create_schedule',
  UPDATE_SCHEDULE: 'update_schedule',
  DELETE_SCHEDULE: 'delete_schedule',
  PROCESS_SCHEDULE: 'process_schedule',
  CHECK_SCHEDULE: 'check_schedule',

  // Rule Jobs
  APPLY_RULE: 'apply_rule',
  VALIDATE_RULE: 'validate_rule',
  EXECUTE_RULE: 'execute_rule',
  SYNC_RULE: 'sync_rule',

  // Wishlist Jobs
  ADD_WISHLIST: 'add_wishlist',
  REMOVE_WISHLIST: 'remove_wishlist',
  SYNC_WISHLIST: 'sync_wishlist',
  NOTIFY_WISHLIST: 'notify_wishlist',

  // Share Jobs
  PROCESS_SHARE: 'process_share',
  VALIDATE_SHARE: 'validate_share',
  TRACK_SHARE: 'track_share',

  // System Jobs
  CLEANUP: 'cleanup',
  MAINTENANCE: 'maintenance',
  BACKUP: 'backup',
  SYNC: 'sync',
  HEALTH_CHECK: 'health_check',
} as const;

export type FlashSalesDealsJobType =
  (typeof FlashSalesDealsJobTypes)[keyof typeof FlashSalesDealsJobTypes];

// ==================== Retry Policy ====================

export const FlashSalesDealsRetryConfig = {
  MAX_ATTEMPTS: 3,
  RETRY_DELAY: 60000,
  BACKOFF: {
    type: 'exponential',
    delay: 60000,
    factor: 2,
  } as const,
  STRATEGIES: {
    LINEAR: 'linear',
    EXPONENTIAL: 'exponential',
    FIBONACCI: 'fibonacci',
    CUSTOM: 'custom',
  } as const,
} as const;

export type FlashSalesDealsRetryStrategy =
  (typeof FlashSalesDealsRetryConfig.STRATEGIES)[keyof typeof FlashSalesDealsRetryConfig.STRATEGIES];

// ==================== Concurrency ====================

export const FlashSalesDealsConcurrency = {
  HIGH: 20,
  MEDIUM: 10,
  LOW: 5,
  MINIMAL: 2,
  DEFAULT: 10,
} as const;

export type FlashSalesDealsConcurrencyLevel = keyof typeof FlashSalesDealsConcurrency;

// ==================== Queue Arguments ====================

export const FlashSalesDealsQueueArguments = {
  'x-max-priority': 10,
  'x-message-ttl': 86400000,
  'x-dead-letter-exchange': 'flash-sales.dlx',
  'x-dead-letter-routing-key': 'flash-sales.dlq',
  'x-max-length': 10000,
  'x-overflow': 'reject-publish',
  'x-single-active-consumer': false,
  'x-queue-mode': 'default',
  'x-queue-type': 'classic',
} as const;

// ==================== Batch Processing ====================

export const FlashSalesDealsBatchConfig = {
  ENABLED: true,
  MAX_SIZE: 100,
  TIMEOUT: 5000,
  CONCURRENCY: 5,
  RETRY: 3,
} as const;

// ==================== Metrics ====================

export const FlashSalesDealsMetricsConfig = {
  ENABLED: true,
  INTERVAL: 60000,
  PRECISION: 'seconds',
  COLLECT: [
    'processed',
    'failed',
    'retried',
    'delayed',
    'waiting',
    'active',
    'completed',
    'stalled',
  ] as const,
} as const;

// ==================== Monitoring ====================

export const FlashSalesDealsMonitoringConfig = {
  ENABLED: true,
  INTERVAL: 30000,
  ALERT_THRESHOLD: {
    QUEUE_SIZE: 1000,
    PROCESSING_TIME: 10000,
    FAILURE_RATE: 0.1,
  } as const,
} as const;

// ==================== Main Queue Config ====================

export const FlashSalesDealsQueue = {
  NAMES: FlashSalesDealsQueueNames,
  PREFIXES: FlashSalesDealsQueuePrefixes,
  CONFIG: FlashSalesDealsQueueConfig,
  JOB: FlashSalesDealsJobConfig,
  DEAD_LETTER: FlashSalesDealsDeadLetterConfig,
  DELAYED: FlashSalesDealsDelayedConfig,
  SCHEDULED: FlashSalesDealsScheduledConfig,
  PRIORITIES: FlashSalesDealsPriorities,
  EVENTS: FlashSalesDealsQueueEvents,
  DELIVERY: FlashSalesDealsDeliveryModes,
  EXCHANGE_TYPES: FlashSalesDealsExchangeTypes,
  QUEUE_TYPES: FlashSalesDealsQueueTypes,
  JOB_TYPES: FlashSalesDealsJobTypes,
  RETRY: FlashSalesDealsRetryConfig,
  CONCURRENCY: FlashSalesDealsConcurrency,
  ARGUMENTS: FlashSalesDealsQueueArguments,
  BATCH: FlashSalesDealsBatchConfig,
  METRICS: FlashSalesDealsMetricsConfig,
  MONITORING: FlashSalesDealsMonitoringConfig,
} as const;

// ==================== Queue Configuration Helpers ====================

export const FlashSalesDealsQueueHelper = {
  getQueueName: (type: FlashSalesDealsQueueName): string => {
    return `${FlashSalesDealsQueuePrefixes.FLASH_SALE}${type}`;
  },

  getJobType: (type: FlashSalesDealsJobType): string => {
    return type;
  },

  getPriority: (level: keyof typeof FlashSalesDealsPriorities): number => {
    return FlashSalesDealsPriorities[level] || FlashSalesDealsPriorities.MEDIUM;
  },

  getConcurrency: (level: keyof typeof FlashSalesDealsConcurrency = 'DEFAULT'): number => {
    return FlashSalesDealsConcurrency[level] || FlashSalesDealsConcurrency.DEFAULT;
  },

  getRetryPolicy: () => {
    return {
      maxAttempts: FlashSalesDealsRetryConfig.MAX_ATTEMPTS,
      delay: FlashSalesDealsRetryConfig.RETRY_DELAY,
      backoff: FlashSalesDealsRetryConfig.BACKOFF,
    };
  },

  getJobConfig: (_jobType: FlashSalesDealsJobType): QueueConfig => ({
    attempts: FlashSalesDealsJobConfig.ATTEMPTS,
    backoff: FlashSalesDealsJobConfig.BACKOFF,
    timeout: FlashSalesDealsJobConfig.TIMEOUT,
    delay: FlashSalesDealsJobConfig.DELAY,
    priority: FlashSalesDealsJobConfig.PRIORITY,
    removeOnComplete: FlashSalesDealsJobConfig.REMOVE_ON_COMPLETE,
    removeOnFail: FlashSalesDealsJobConfig.REMOVE_ON_FAIL,
    stackTraceLimit: FlashSalesDealsJobConfig.STACK_TRACE_LIMIT,
  }),

  getDeadLetterConfig: () => ({
    queue: FlashSalesDealsDeadLetterConfig.QUEUE,
    exchange: FlashSalesDealsDeadLetterConfig.EXCHANGE,
    routingKey: FlashSalesDealsDeadLetterConfig.ROUTING_KEY,
    ttl: FlashSalesDealsDeadLetterConfig.TTL,
    maxRetries: FlashSalesDealsDeadLetterConfig.MAX_RETRIES,
  }),

  getDelayedConfig: () => ({
    queue: FlashSalesDealsDelayedConfig.QUEUE,
    exchange: FlashSalesDealsDelayedConfig.EXCHANGE,
    routingKey: FlashSalesDealsDelayedConfig.ROUTING_KEY,
    ttl: FlashSalesDealsDelayedConfig.TTL,
  }),

  getScheduledConfig: () => ({
    queue: FlashSalesDealsScheduledConfig.QUEUE,
    exchange: FlashSalesDealsScheduledConfig.EXCHANGE,
    routingKey: FlashSalesDealsScheduledConfig.ROUTING_KEY,
    ttl: FlashSalesDealsScheduledConfig.TTL,
  }),

  getBatchConfig: () => ({
    enabled: FlashSalesDealsBatchConfig.ENABLED,
    maxSize: FlashSalesDealsBatchConfig.MAX_SIZE,
    timeout: FlashSalesDealsBatchConfig.TIMEOUT,
    concurrency: FlashSalesDealsBatchConfig.CONCURRENCY,
    retry: FlashSalesDealsBatchConfig.RETRY,
  }),

  getMetricsConfig: () => ({
    enabled: FlashSalesDealsMetricsConfig.ENABLED,
    interval: FlashSalesDealsMetricsConfig.INTERVAL,
    precision: FlashSalesDealsMetricsConfig.PRECISION,
    collect: FlashSalesDealsMetricsConfig.COLLECT,
  }),

  getMonitoringConfig: () => ({
    enabled: FlashSalesDealsMonitoringConfig.ENABLED,
    interval: FlashSalesDealsMonitoringConfig.INTERVAL,
    alertThreshold: FlashSalesDealsMonitoringConfig.ALERT_THRESHOLD,
  }),

  getArguments: () => ({
    ...FlashSalesDealsQueueArguments,
    'x-dead-letter-exchange': FlashSalesDealsDeadLetterConfig.EXCHANGE,
    'x-dead-letter-routing-key': FlashSalesDealsDeadLetterConfig.ROUTING_KEY,
  }),

  isQueueName: (name: string): name is FlashSalesDealsQueueName => {
    return Object.values(FlashSalesDealsQueueNames).includes(name as FlashSalesDealsQueueName);
  },

  isJobType: (type: string): type is FlashSalesDealsJobType => {
    return Object.values(FlashSalesDealsJobTypes).includes(type as FlashSalesDealsJobType);
  },

  isPriority: (priority: number): priority is FlashSalesDealsPriority => {
    return Object.values(FlashSalesDealsPriorities).includes(priority as FlashSalesDealsPriority);
  },

  getQueueForJob: (jobType: FlashSalesDealsJobType): FlashSalesDealsQueueName => {
    if (jobType.includes('flash_sale')) return FlashSalesDealsQueueNames.FLASH_SALE;
    if (jobType.includes('deal')) return FlashSalesDealsQueueNames.DEAL;
    if (jobType.includes('product_deal')) return FlashSalesDealsQueueNames.PRODUCT_DEAL;
    if (jobType.includes('bundle_deal')) return FlashSalesDealsQueueNames.BUNDLE_DEAL;
    if (jobType.includes('inventory')) return FlashSalesDealsQueueNames.INVENTORY;
    if (jobType.includes('price')) return FlashSalesDealsQueueNames.PRICE;
    if (jobType.includes('coupon')) return FlashSalesDealsQueueNames.COUPON;
    if (jobType.includes('voucher')) return FlashSalesDealsQueueNames.VOUCHER;
    if (
      jobType.includes('notification') ||
      jobType.includes('email') ||
      jobType.includes('sms') ||
      jobType.includes('push')
    ) {
      return FlashSalesDealsQueueNames.NOTIFICATION;
    }
    if (jobType.includes('analytics')) return FlashSalesDealsQueueNames.ANALYTICS;
    if (jobType.includes('report')) return FlashSalesDealsQueueNames.REPORT;
    if (jobType.includes('participant')) return FlashSalesDealsQueueNames.PARTICIPANT;
    if (jobType.includes('schedule')) return FlashSalesDealsQueueNames.SCHEDULE;
    if (jobType.includes('rule')) return FlashSalesDealsQueueNames.RULE;
    if (jobType.includes('wishlist')) return FlashSalesDealsQueueNames.WISHLIST;
    if (jobType.includes('share')) return FlashSalesDealsQueueNames.SHARE;
    return FlashSalesDealsQueueNames.FLASH_SALE;
  },
};
