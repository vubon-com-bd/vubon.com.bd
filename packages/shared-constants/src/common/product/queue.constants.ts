/**
 * Product Queue Constants
 * Contains all queue-related constants for product management
 */

export const ProductQueue = {
  // Queue types
  QUEUE_TYPE: {
    BULL: 'bull',
    RABBITMQ: 'rabbitmq',
    AWS_SQS: 'aws_sqs',
  } as const,

  // Default delay times in milliseconds
  DEFAULT_DELAY: {
    PRODUCT_UPDATE: 1000, // 1 second
    PRODUCT_CREATE: 500, // 0.5 second
    PRODUCT_DELETE: 2000, // 2 seconds
    PRODUCT_BULK_UPDATE: 5000, // 5 seconds
    PRODUCT_SYNC: 10000, // 10 seconds
    PRODUCT_IMAGE_PROCESS: 3000, // 3 seconds
    PRODUCT_PRICE_UPDATE: 2000, // 2 seconds
    PRODUCT_STOCK_UPDATE: 1000, // 1 second
    PRODUCT_CATEGORY_UPDATE: 3000, // 3 seconds
    PRODUCT_BRAND_UPDATE: 3000, // 3 seconds
    PRODUCT_SEARCH_INDEX: 5000, // 5 seconds
    PRODUCT_REVIEW_UPDATE: 2000, // 2 seconds
    PRODUCT_RATING_UPDATE: 2000, // 2 seconds
    PRODUCT_CACHE_CLEAR: 1000, // 1 second
    PRODUCT_ANALYTICS_PROCESS: 5000, // 5 seconds
    PRODUCT_IMPORT: 10000, // 10 seconds
    PRODUCT_EXPORT: 8000, // 8 seconds
  } as const,

  // Retry settings
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 5000, // 5 seconds
    BACKOFF: {
      TYPE: 'exponential' as const,
      DELAY: 1000,
    },
  } as const,

  // Queue priority levels
  PRIORITY: {
    HIGH: 1,
    MEDIUM: 5,
    LOW: 10,
    VERY_LOW: 20,
  } as const,

  // Job timeout in milliseconds
  TIMEOUT: {
    PRODUCT_CREATE: 30000, // 30 seconds
    PRODUCT_UPDATE: 45000, // 45 seconds
    PRODUCT_DELETE: 20000, // 20 seconds
    PRODUCT_BULK_UPDATE: 120000, // 2 minutes
    PRODUCT_SYNC: 180000, // 3 minutes
    PRODUCT_IMAGE_PROCESS: 60000, // 1 minute
    PRODUCT_PRICE_UPDATE: 30000, // 30 seconds
    PRODUCT_STOCK_UPDATE: 20000, // 20 seconds
    PRODUCT_CATEGORY_UPDATE: 30000, // 30 seconds
    PRODUCT_BRAND_UPDATE: 30000, // 30 seconds
    PRODUCT_SEARCH_INDEX: 90000, // 1.5 minutes
    PRODUCT_REVIEW_UPDATE: 30000, // 30 seconds
    PRODUCT_RATING_UPDATE: 30000, // 30 seconds
    PRODUCT_CACHE_CLEAR: 15000, // 15 seconds
    PRODUCT_ANALYTICS_PROCESS: 60000, // 1 minute
    PRODUCT_IMPORT: 300000, // 5 minutes
    PRODUCT_EXPORT: 240000, // 4 minutes
  } as const,

  // Queue event types
  EVENTS: {
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
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
  } as const,

  // Queue names
  NAMES: {
    PRODUCT_CREATE: 'product-create',
    PRODUCT_UPDATE: 'product-update',
    PRODUCT_DELETE: 'product-delete',
    PRODUCT_BULK: 'product-bulk',
    PRODUCT_SYNC: 'product-sync',
    PRODUCT_IMAGE: 'product-image',
    PRODUCT_PRICE: 'product-price',
    PRODUCT_STOCK: 'product-stock',
    PRODUCT_CATEGORY: 'product-category',
    PRODUCT_BRAND: 'product-brand',
    PRODUCT_SEARCH: 'product-search',
    PRODUCT_REVIEW: 'product-review',
    PRODUCT_RATING: 'product-rating',
    PRODUCT_CACHE: 'product-cache',
    PRODUCT_ANALYTICS: 'product-analytics',
    PRODUCT_IMPORT: 'product-import',
    PRODUCT_EXPORT: 'product-export',
  } as const,

  // Job types
  JOB_TYPES: {
    CREATE: 'create',
    UPDATE: 'update',
    DELETE: 'delete',
    SYNC: 'sync',
    PROCESS: 'process',
    INDEX: 'index',
    CLEAR: 'clear',
    CALCULATE: 'calculate',
    NOTIFY: 'notify',
    EXPORT: 'export',
    IMPORT: 'import',
    VALIDATE: 'validate',
    ANALYZE: 'analyze',
    GENERATE: 'generate',
    OPTIMIZE: 'optimize',
    CLEANUP: 'cleanup',
  } as const,

  // Concurrency settings
  CONCURRENCY: {
    DEFAULT: 5,
    HIGH: 10,
    LOW: 2,
    MINIMAL: 1,
    CRITICAL: 1,
  } as const,

  // Queue limits
  LIMITS: {
    MAX_JOBS: 1000,
    MAX_ATTEMPTS: 5,
    MAX_DELAY: 86400000, // 24 hours
    MIN_DELAY: 0,
    MAX_TIMEOUT: 3600000, // 1 hour
  } as const,
} as const;

// Helper types for queue configuration
export type ProductQueueName = (typeof ProductQueue.NAMES)[keyof typeof ProductQueue.NAMES];
export type ProductQueueEvent = (typeof ProductQueue.EVENTS)[keyof typeof ProductQueue.EVENTS];
export type ProductJobType = (typeof ProductQueue.JOB_TYPES)[keyof typeof ProductQueue.JOB_TYPES];
export type ProductQueuePriority =
  (typeof ProductQueue.PRIORITY)[keyof typeof ProductQueue.PRIORITY];

// Queue configuration builder
export const ProductQueueConfig = {
  createJobConfig: (jobType: ProductJobType) => {
    const timeoutKey = `PRODUCT_${jobType.toUpperCase()}` as keyof typeof ProductQueue.TIMEOUT;
    const delayKey = `PRODUCT_${jobType.toUpperCase()}` as keyof typeof ProductQueue.DEFAULT_DELAY;

    return {
      attempts: ProductQueue.RETRY.MAX_ATTEMPTS,
      backoff: ProductQueue.RETRY.BACKOFF,
      timeout: ProductQueue.TIMEOUT[timeoutKey] || 30000,
      delay: ProductQueue.DEFAULT_DELAY[delayKey] || 0,
      priority: ProductQueue.PRIORITY.MEDIUM,
      removeOnComplete: true,
      removeOnFail: false,
      stackTraceLimit: 10,
    };
  },

  getConcurrency: (
    type: 'default' | 'high' | 'low' | 'minimal' | 'critical' = 'default'
  ): number => {
    const key = type.toUpperCase() as keyof typeof ProductQueue.CONCURRENCY;
    return ProductQueue.CONCURRENCY[key] || 5;
  },

  getQueueOptions: (queueName: ProductQueueName) => ({
    defaultJobOptions: {
      attempts: ProductQueue.RETRY.MAX_ATTEMPTS,
      backoff: ProductQueue.RETRY.BACKOFF,
      timeout:
        ProductQueue.TIMEOUT[
          `PRODUCT_${queueName.split('-')[1].toUpperCase()}` as keyof typeof ProductQueue.TIMEOUT
        ] || 30000,
      removeOnComplete: true,
      removeOnFail: false,
    },
    concurrency: ProductQueue.CONCURRENCY.DEFAULT,
    limiter: {
      max: ProductQueue.LIMITS.MAX_JOBS,
      duration: 1000, // 1 second
    },
  }),

  getQueueName: (jobType: ProductJobType): ProductQueueName => {
    const nameMap: Record<ProductJobType, ProductQueueName> = {
      create: 'product-create',
      update: 'product-update',
      delete: 'product-delete',
      sync: 'product-sync',
      process: 'product-image',
      index: 'product-search',
      clear: 'product-cache',
      calculate: 'product-analytics',
      notify: 'product-review',
      export: 'product-export',
      import: 'product-import',
      validate: 'product-category',
      analyze: 'product-analytics',
      generate: 'product-search',
      optimize: 'product-cache',
      cleanup: 'product-cache',
    };
    return nameMap[jobType] || 'product-update';
  },
} as const;

// Queue event helper
export const ProductQueueEventHelper = {
  isProcessingEvent: (event: ProductQueueEvent): boolean => {
    return event === ProductQueue.EVENTS.PROCESSING;
  },
  isCompletedEvent: (event: ProductQueueEvent): boolean => {
    return event === ProductQueue.EVENTS.COMPLETED;
  },
  isFailedEvent: (event: ProductQueueEvent): boolean => {
    return event === ProductQueue.EVENTS.FAILED;
  },
  isErrorEvent: (event: ProductQueueEvent): boolean => {
    return event === ProductQueue.EVENTS.ERROR;
  },
  getEventPriority: (event: ProductQueueEvent): ProductQueuePriority => {
    const priorityMap: Record<ProductQueueEvent, ProductQueuePriority> = {
      [ProductQueue.EVENTS.PROCESSING]: ProductQueue.PRIORITY.HIGH,
      [ProductQueue.EVENTS.COMPLETED]: ProductQueue.PRIORITY.MEDIUM,
      [ProductQueue.EVENTS.FAILED]: ProductQueue.PRIORITY.HIGH,
      [ProductQueue.EVENTS.STALLED]: ProductQueue.PRIORITY.HIGH,
      [ProductQueue.EVENTS.PROGRESS]: ProductQueue.PRIORITY.LOW,
      [ProductQueue.EVENTS.WAITING]: ProductQueue.PRIORITY.LOW,
      [ProductQueue.EVENTS.ACTIVE]: ProductQueue.PRIORITY.MEDIUM,
      [ProductQueue.EVENTS.DELAYED]: ProductQueue.PRIORITY.VERY_LOW,
      [ProductQueue.EVENTS.PAUSED]: ProductQueue.PRIORITY.VERY_LOW,
      [ProductQueue.EVENTS.RESUME]: ProductQueue.PRIORITY.MEDIUM,
      [ProductQueue.EVENTS.CLEANED]: ProductQueue.PRIORITY.VERY_LOW,
      [ProductQueue.EVENTS.DRAINED]: ProductQueue.PRIORITY.LOW,
      [ProductQueue.EVENTS.REMOVED]: ProductQueue.PRIORITY.LOW,
      [ProductQueue.EVENTS.ERROR]: ProductQueue.PRIORITY.HIGH,
      [ProductQueue.EVENTS.WARNING]: ProductQueue.PRIORITY.MEDIUM,
      [ProductQueue.EVENTS.INFO]: ProductQueue.PRIORITY.LOW,
    };
    return priorityMap[event] || ProductQueue.PRIORITY.MEDIUM;
  },
} as const;
