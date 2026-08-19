/**
 * Cart Queue Constants
 * Contains all queue-related constants for cart management
 */

export const CartQueue = {
  // Queue names
  NAMES: {
    CART_QUEUE: 'cart-queue',
    EMAIL_QUEUE: 'email-queue',
    NOTIFICATION_QUEUE: 'notification-queue',
    INVENTORY_QUEUE: 'inventory-queue',
    ANALYTICS_QUEUE: 'analytics-queue',
    CLEANUP_QUEUE: 'cleanup-queue',
  } as const,

  // Queue types
  QUEUE_TYPE: {
    BULL: 'bull',
    RABBITMQ: 'rabbitmq',
    AWS_SQS: 'aws_sqs',
  } as const,

  // Job types
  JOB_TYPES: {
    PROCESS_CART: 'process_cart',
    SEND_EMAIL: 'send_email',
    CLEANUP_CART: 'cleanup_cart',
    SYNC_CART: 'sync_cart',
    VALIDATE_CART: 'validate_cart',
    CALCULATE_TOTAL: 'calculate_total',
    APPLY_COUPON: 'apply_coupon',
    REMOVE_EXPIRED: 'remove_expired',
    SEND_NOTIFICATION: 'send_notification',
    UPDATE_INVENTORY: 'update_inventory',
    TRACK_ANALYTICS: 'track_analytics',
  } as const,

  // Job priority levels
  PRIORITY: {
    HIGH: 1,
    MEDIUM: 5,
    LOW: 10,
    VERY_LOW: 20,
  } as const,

  // Retry attempts
  RETRY_ATTEMPTS: 3,

  // Retry delay in seconds
  RETRY_DELAY: 5,

  // Batch processing size
  BATCH_SIZE: 100,

  // Default delay times in milliseconds
  DEFAULT_DELAY: {
    PROCESS_CART: 1000, // 1 second
    SEND_EMAIL: 2000, // 2 seconds
    CLEANUP_CART: 5000, // 5 seconds
    SYNC_CART: 3000, // 3 seconds
    VALIDATE_CART: 500, // 0.5 second
    CALCULATE_TOTAL: 1000, // 1 second
    APPLY_COUPON: 1000, // 1 second
    REMOVE_EXPIRED: 10000, // 10 seconds
    SEND_NOTIFICATION: 1000, // 1 second
    UPDATE_INVENTORY: 2000, // 2 seconds
    TRACK_ANALYTICS: 1000, // 1 second
  } as const,

  // Job timeout in milliseconds
  TIMEOUT: {
    PROCESS_CART: 30000, // 30 seconds
    SEND_EMAIL: 60000, // 1 minute
    CLEANUP_CART: 120000, // 2 minutes
    SYNC_CART: 45000, // 45 seconds
    VALIDATE_CART: 15000, // 15 seconds
    CALCULATE_TOTAL: 20000, // 20 seconds
    APPLY_COUPON: 15000, // 15 seconds
    REMOVE_EXPIRED: 180000, // 3 minutes
    SEND_NOTIFICATION: 30000, // 30 seconds
    UPDATE_INVENTORY: 30000, // 30 seconds
    TRACK_ANALYTICS: 15000, // 15 seconds
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
  } as const,

  // Concurrency settings
  CONCURRENCY: {
    DEFAULT: 5,
    HIGH: 10,
    LOW: 2,
    MINIMAL: 1,
  } as const,

  // Queue configuration
  CONFIG: {
    CART_QUEUE: {
      name: 'cart-queue',
      concurrency: 5,
      priority: 1,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
    },
    EMAIL_QUEUE: {
      name: 'email-queue',
      concurrency: 2,
      priority: 5,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
    },
    NOTIFICATION_QUEUE: {
      name: 'notification-queue',
      concurrency: 3,
      priority: 3,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 3000,
      },
    },
    CLEANUP_QUEUE: {
      name: 'cleanup-queue',
      concurrency: 1,
      priority: 10,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 10000,
      },
    },
  } as const,
} as const;

// Helper types for queue configuration
export type CartQueueName = (typeof CartQueue.NAMES)[keyof typeof CartQueue.NAMES];
export type CartQueueEvent = (typeof CartQueue.EVENTS)[keyof typeof CartQueue.EVENTS];
export type CartJobType = (typeof CartQueue.JOB_TYPES)[keyof typeof CartQueue.JOB_TYPES];

// Queue configuration builder
export const CartQueueConfig = {
  createJobConfig: (jobType: CartJobType) => ({
    attempts: CartQueue.RETRY_ATTEMPTS,
    backoff: {
      type: 'exponential' as const,
      delay: CartQueue.RETRY_DELAY * 1000,
    },
    timeout: CartQueue.TIMEOUT[jobType.toUpperCase() as keyof typeof CartQueue.TIMEOUT] || 30000,
    delay:
      CartQueue.DEFAULT_DELAY[jobType.toUpperCase() as keyof typeof CartQueue.DEFAULT_DELAY] || 0,
    priority: CartQueue.PRIORITY.MEDIUM,
    removeOnComplete: true,
    removeOnFail: false,
  }),
  getConcurrency: (type: 'default' | 'high' | 'low' | 'minimal' = 'default'): number => {
    return CartQueue.CONCURRENCY[type.toUpperCase() as keyof typeof CartQueue.CONCURRENCY] || 5;
  },
} as const;
