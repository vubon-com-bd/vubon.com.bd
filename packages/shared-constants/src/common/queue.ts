/**
 * Queue Configuration
 * বাংলাদেশের কনটেক্সট অনুযায়ী Queue কনফিগারেশন
 */
export const QUEUE = {
  // Queue names
  NAMES: {
    EMAIL: 'email-queue',
    SMS: 'sms-queue',
    NOTIFICATION: 'notification-queue',
    PAYMENT: 'payment-queue',
    ORDER: 'order-queue',
    INVOICE: 'invoice-queue',
    REPORT: 'report-queue',
    ANALYTICS: 'analytics-queue',
    BACKUP: 'backup-queue',
    IMPORT: 'import-queue',
    EXPORT: 'export-queue',
    WEBHOOK: 'webhook-queue',
    CLEANUP: 'cleanup-queue',
    BULK_EMAIL: 'bulk-email-queue',
    BULK_SMS: 'bulk-sms-queue',
  },

  // Job priorities
  PRIORITY: {
    CRITICAL: 1,
    HIGH: 2,
    MEDIUM: 3,
    LOW: 4,
    BACKGROUND: 5,
  },

  // Retry configuration
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 5000, // 5 seconds
    BACKOFF: {
      TYPE: 'exponential',
      DELAY: 1000, // Start with 1 second
    },
  },

  // Queue concurrency
  CONCURRENCY: {
    EMAIL: 5,
    SMS: 10,
    NOTIFICATION: 20,
    PAYMENT: 2,
    ORDER: 3,
    DEFAULT: 5,
  },

  // Queue events
  EVENTS: {
    COMPLETED: 'completed',
    FAILED: 'failed',
    PROGRESS: 'progress',
    STALLED: 'stalled',
    ACTIVE: 'active',
    WAITING: 'waiting',
    PAUSED: 'paused',
    RESUMED: 'resumed',
    CLEANED: 'cleaned',
    DRAINED: 'drained',
    REMOVED: 'removed',
  },
} as const;

export type QueueName = (typeof QUEUE.NAMES)[keyof typeof QUEUE.NAMES];
export type QueuePriority = (typeof QUEUE.PRIORITY)[keyof typeof QUEUE.PRIORITY];
