/**
 * Checkout Queue Constants
 * Contains all queue-related constants for checkout management
 */

// Define job type as union type for better type safety
export type CheckoutJobType =
  | 'create_order'
  | 'process_payment'
  | 'process_refund'
  | 'send_notification'
  | 'process_shipping'
  | 'update_inventory'
  | 'send_email'
  | 'track_analytics';

export type CheckoutQueueName =
  | 'order-queue'
  | 'payment-queue'
  | 'refund-queue'
  | 'notification-queue'
  | 'shipping-queue'
  | 'inventory-queue'
  | 'email-queue'
  | 'analytics-queue';

export type CheckoutQueueEvent =
  | 'processing'
  | 'completed'
  | 'failed'
  | 'stalled'
  | 'progress'
  | 'waiting'
  | 'active'
  | 'delayed'
  | 'paused'
  | 'resume'
  | 'cleaned'
  | 'drained'
  | 'removed';

export const CheckoutQueue = {
  // Queue names
  NAMES: {
    ORDER_QUEUE: 'order-queue',
    PAYMENT_QUEUE: 'payment-queue',
    REFUND_QUEUE: 'refund-queue',
    NOTIFICATION_QUEUE: 'notification-queue',
    SHIPPING_QUEUE: 'shipping-queue',
    INVENTORY_QUEUE: 'inventory-queue',
    EMAIL_QUEUE: 'email-queue',
    ANALYTICS_QUEUE: 'analytics-queue',
  } as const satisfies Record<string, CheckoutQueueName>,

  // Queue types
  QUEUE_TYPE: {
    BULL: 'bull',
    RABBITMQ: 'rabbitmq',
    AWS_SQS: 'aws_sqs',
  } as const,

  // Default delay times in milliseconds
  DEFAULT_DELAY: {
    ORDER_PROCESS: 1000, // 1 second
    PAYMENT_PROCESS: 2000, // 2 seconds
    REFUND_PROCESS: 5000, // 5 seconds
    NOTIFICATION_SEND: 500, // 0.5 second
    SHIPPING_PROCESS: 3000, // 3 seconds
    INVENTORY_UPDATE: 1000, // 1 second
    EMAIL_SEND: 1000, // 1 second
    ANALYTICS_TRACK: 2000, // 2 seconds
  } as const,

  // Retry settings
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 5000, // 5 seconds
    BACKOFF: {
      TYPE: 'exponential',
      DELAY: 1000,
    } as const,
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
    ORDER_PROCESS: 60000, // 1 minute
    PAYMENT_PROCESS: 30000, // 30 seconds
    REFUND_PROCESS: 90000, // 1.5 minutes
    NOTIFICATION_SEND: 15000, // 15 seconds
    SHIPPING_PROCESS: 120000, // 2 minutes
    INVENTORY_UPDATE: 20000, // 20 seconds
    EMAIL_SEND: 30000, // 30 seconds
    ANALYTICS_TRACK: 10000, // 10 seconds
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
  } as const satisfies Record<string, CheckoutQueueEvent>,

  // Job types with proper typing
  JOB_TYPES: {
    CREATE_ORDER: 'create_order',
    PROCESS_PAYMENT: 'process_payment',
    PROCESS_REFUND: 'process_refund',
    SEND_NOTIFICATION: 'send_notification',
    PROCESS_SHIPPING: 'process_shipping',
    UPDATE_INVENTORY: 'update_inventory',
    SEND_EMAIL: 'send_email',
    TRACK_ANALYTICS: 'track_analytics',
  } as const satisfies Record<string, CheckoutJobType>,

  // Concurrency settings
  CONCURRENCY: {
    DEFAULT: 5,
    HIGH: 10,
    LOW: 2,
    MINIMAL: 1,
  } as const,
} as const;

// Queue configuration builder with proper typing
export const CheckoutQueueConfig = {
  createJobConfig: (jobType: CheckoutJobType) => ({
    attempts: CheckoutQueue.RETRY.MAX_ATTEMPTS,
    backoff: CheckoutQueue.RETRY.BACKOFF,
    timeout:
      CheckoutQueue.TIMEOUT[jobType.toUpperCase() as keyof typeof CheckoutQueue.TIMEOUT] || 30000,
    delay:
      CheckoutQueue.DEFAULT_DELAY[
        jobType.toUpperCase() as keyof typeof CheckoutQueue.DEFAULT_DELAY
      ] || 0,
    priority: CheckoutQueue.PRIORITY.MEDIUM,
    removeOnComplete: true,
    removeOnFail: false,
  }),
  getConcurrency: (type: 'default' | 'high' | 'low' | 'minimal' = 'default'): number => {
    return (
      CheckoutQueue.CONCURRENCY[type.toUpperCase() as keyof typeof CheckoutQueue.CONCURRENCY] || 5
    );
  },
  getQueueName: (jobType: CheckoutJobType): CheckoutQueueName => {
    const nameMap: Record<CheckoutJobType, CheckoutQueueName> = {
      create_order: 'order-queue',
      process_payment: 'payment-queue',
      process_refund: 'refund-queue',
      send_notification: 'notification-queue',
      process_shipping: 'shipping-queue',
      update_inventory: 'inventory-queue',
      send_email: 'email-queue',
      track_analytics: 'analytics-queue',
    };
    return nameMap[jobType];
  },
} as const;
