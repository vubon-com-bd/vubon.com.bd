/**
 * Queue Configuration Constants
 * @module shared-constants/common/queue.constants
 */

export const QUEUE = {
  // Queue names
  NAME: {
    EMAIL: 'email-queue',
    SMS: 'sms-queue',
    NOTIFICATION: 'notification-queue',
    PUSH: 'push-queue',

    ORDER: 'order-queue',
    PAYMENT: 'payment-queue',
    REFUND: 'refund-queue',
    SHIPPING: 'shipping-queue',

    ANALYTICS: 'analytics-queue',
    REPORT: 'report-queue',
    LOG: 'log-queue',

    IMAGE: 'image-processing-queue',
    VIDEO: 'video-processing-queue',
    FILE: 'file-processing-queue',

    CLEANUP: 'cleanup-queue',
    BACKUP: 'backup-queue',
    SYNC: 'sync-queue',

    WEBHOOK: 'webhook-queue',
    EVENT: 'event-queue',
    JOB: 'job-queue',
    SCHEDULED: 'scheduled-queue',

    SEARCH_INDEX: 'search-index-queue',
    CACHE_INVALIDATE: 'cache-invalidate-queue',
    ELASTICSEARCH: 'elasticsearch-queue',
  } as const,

  // Job priorities
  PRIORITY: {
    CRITICAL: 0,
    HIGH: 1,
    MEDIUM: 2,
    LOW: 3,
    LOWEST: 4,
  } as const,

  // Default attempts
  DEFAULT_ATTEMPTS: 3,
  MAX_ATTEMPTS: 5,

  // Backoff strategies
  BACKOFF: {
    FIXED: 'fixed',
    EXPONENTIAL: 'exponential',
    LINEAR: 'linear',
  } as const,

  // Delays in milliseconds
  DELAY: {
    SHORT: 1000, // 1 second
    MEDIUM: 5000, // 5 seconds
    LONG: 30000, // 30 seconds
    EXTRA_LONG: 60000, // 1 minute
  } as const,

  // Timeout in milliseconds
  TIMEOUT: {
    SHORT: 5000, // 5 seconds
    MEDIUM: 30000, // 30 seconds
    LONG: 60000, // 1 minute
    EXTRA_LONG: 300000, // 5 minutes
  } as const,

  // Rate limits per minute
  RATE_LIMIT: {
    EMAIL: 60,
    SMS: 30,
    PUSH: 120,
    WEBHOOK: 600,
  } as const,

  // Queue types
  TYPE: {
    FIFO: 'fifo',
    PRIORITY: 'priority',
    DELAYED: 'delayed',
    REPEATING: 'repeating',
    BULK: 'bulk',
  } as const,
} as const;

export type QueueName = (typeof QUEUE.NAME)[keyof typeof QUEUE.NAME];
export type QueuePriority = (typeof QUEUE.PRIORITY)[keyof typeof QUEUE.PRIORITY];
export type QueueBackoff = (typeof QUEUE.BACKOFF)[keyof typeof QUEUE.BACKOFF];
export type QueueType = (typeof QUEUE.TYPE)[keyof typeof QUEUE.TYPE];
