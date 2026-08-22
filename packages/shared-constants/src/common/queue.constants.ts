/**
 * Queue Constants
 * Configuration for message queues and job processing
 */

export const QUEUE = {
  // Queue names
  NAMES: {
    // Core queues
    DEFAULT: 'default',
    HIGH_PRIORITY: 'high-priority',
    LOW_PRIORITY: 'low-priority',

    // Auth queues
    AUTH: 'auth',
    AUTH_EMAIL: 'auth:email',
    AUTH_SMS: 'auth:sms',
    AUTH_RESET_PASSWORD: 'auth:reset-password',
    AUTH_VERIFICATION: 'auth:verification',

    // User queues
    USER: 'user',
    USER_PROFILE: 'user:profile',
    USER_PREFERENCES: 'user:preferences',
    USER_NOTIFICATION: 'user:notification',

    // Order queues
    ORDER: 'order',
    ORDER_CREATE: 'order:create',
    ORDER_UPDATE: 'order:update',
    ORDER_CANCEL: 'order:cancel',
    ORDER_FULFILLMENT: 'order:fulfillment',

    // Payment queues
    PAYMENT: 'payment',
    PAYMENT_PROCESS: 'payment:process',
    PAYMENT_REFUND: 'payment:refund',
    PAYMENT_RECONCILE: 'payment:reconcile',

    // Product queues
    PRODUCT: 'product',
    PRODUCT_INDEX: 'product:index',
    PRODUCT_SYNC: 'product:sync',
    PRODUCT_INVENTORY: 'product:inventory',

    // Email queues
    EMAIL: 'email',
    EMAIL_WELCOME: 'email:welcome',
    EMAIL_NEWSLETTER: 'email:newsletter',
    EMAIL_INVOICE: 'email:invoice',
    EMAIL_REMINDER: 'email:reminder',

    // Notification queues
    NOTIFICATION: 'notification',
    NOTIFICATION_PUSH: 'notification:push',
    NOTIFICATION_SMS: 'notification:sms',
    NOTIFICATION_EMAIL: 'notification:email',
    NOTIFICATION_IN_APP: 'notification:in-app',

    // Report queues
    REPORT: 'report',
    REPORT_GENERATE: 'report:generate',
    REPORT_EXPORT: 'report:export',
    REPORT_EMAIL: 'report:email',

    // Analytics queues
    ANALYTICS: 'analytics',
    ANALYTICS_PROCESS: 'analytics:process',
    ANALYTICS_AGGREGATE: 'analytics:aggregate',

    // AI queues
    AI: 'ai',
    AI_RECOMMENDATION: 'ai:recommendation',
    AI_PERSONALIZATION: 'ai:personalization',
    AI_TRAINING: 'ai:training',
    AI_PREDICTION: 'ai:prediction',

    // SEO queues
    SEO: 'seo',
    SEO_INDEX: 'seo:index',
    SEO_SITEMAP: 'seo:sitemap',
    SEO_AUDIT: 'seo:audit',

    // Logistics queues
    LOGISTICS: 'logistics',
    LOGISTICS_SHIPMENT: 'logistics:shipment',
    LOGISTICS_TRACKING: 'logistics:tracking',
    LOGISTICS_DELIVERY: 'logistics:delivery',

    // Support queues
    SUPPORT: 'support',
    SUPPORT_TICKET: 'support:ticket',
    SUPPORT_EMAIL: 'support:email',

    // Marketing queues
    MARKETING: 'marketing',
    MARKETING_CAMPAIGN: 'marketing:campaign',
    MARKETING_ANALYTICS: 'marketing:analytics',

    // Vendor queues
    VENDOR: 'vendor',
    VENDOR_PAYOUT: 'vendor:payout',
    VENDOR_SETTLEMENT: 'vendor:settlement',

    // Flash sale queues
    FLASH_SALE: 'flash-sale',
    FLASH_SALE_START: 'flash-sale:start',
    FLASH_SALE_END: 'flash-sale:end',
    FLASH_SALE_INVENTORY: 'flash-sale:inventory',

    // Cache queues
    CACHE: 'cache',
    CACHE_INVALIDATE: 'cache:invalidate',
    CACHE_WARM: 'cache:warm',

    // System queues
    SYSTEM: 'system',
    SYSTEM_HEALTH_CHECK: 'system:health-check',
    SYSTEM_LOG: 'system:log',
    SYSTEM_BACKUP: 'system:backup',
  },

  // Job priorities
  PRIORITY: {
    CRITICAL: 10,
    HIGH: 5,
    MEDIUM: 3,
    LOW: 1,
    BACKGROUND: 0,
  },

  // Queue options
  OPTIONS: {
    DEFAULT: {
      concurrency: 5,
      limiter: {
        max: 100,
        duration: 1000,
      },
    },

    HIGH_PRIORITY: {
      concurrency: 10,
      limiter: {
        max: 200,
        duration: 1000,
      },
    },

    EMAIL: {
      concurrency: 2,
      limiter: {
        max: 50,
        duration: 60000,
      },
    },

    PAYMENT: {
      concurrency: 3,
      limiter: {
        max: 10,
        duration: 1000,
      },
    },

    ANALYTICS: {
      concurrency: 1,
      limiter: {
        max: 20,
        duration: 5000,
      },
    },

    AI: {
      concurrency: 1,
      limiter: {
        max: 5,
        duration: 10000,
      },
    },
  },

  // Retry configurations
  RETRY: {
    DEFAULT: {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
    },

    CRITICAL: {
      attempts: 5,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
    },

    PAYMENT: {
      attempts: 5,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
    },

    EMAIL: {
      attempts: 3,
      backoff: {
        type: 'fixed',
        delay: 60000,
      },
    },

    ANALYTICS: {
      attempts: 2,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
    },

    REPORT: {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 3000,
      },
    },

    AI: {
      attempts: 2,
      backoff: {
        type: 'exponential',
        delay: 10000,
      },
    },
  },

  // Queue events
  EVENTS: {
    JOB_ADDED: 'job:added',
    JOB_STARTED: 'job:started',
    JOB_PROGRESS: 'job:progress',
    JOB_COMPLETED: 'job:completed',
    JOB_FAILED: 'job:failed',
    JOB_STALLED: 'job:stalled',
    JOB_DELAYED: 'job:delayed',
    JOB_REMOVED: 'job:removed',
    QUEUE_DRAINED: 'queue:drained',
    QUEUE_PAUSED: 'queue:paused',
    QUEUE_RESUMED: 'queue:resumed',
    QUEUE_ERROR: 'queue:error',
  },

  // Job states
  STATES: {
    WAITING: 'waiting',
    ACTIVE: 'active',
    COMPLETED: 'completed',
    FAILED: 'failed',
    DELAYED: 'delayed',
    PAUSED: 'paused',
    REMOVED: 'removed',
    STALLED: 'stalled',
  },
} as const;

export type QueueName = (typeof QUEUE.NAMES)[keyof typeof QUEUE.NAMES];
export type QueuePriority = (typeof QUEUE.PRIORITY)[keyof typeof QUEUE.PRIORITY];
export type QueueState = (typeof QUEUE.STATES)[keyof typeof QUEUE.STATES];
export type QueueEvent = (typeof QUEUE.EVENTS)[keyof typeof QUEUE.EVENTS];

export function getQueueOptions(
  name: keyof typeof QUEUE.OPTIONS
): (typeof QUEUE.OPTIONS)[keyof typeof QUEUE.OPTIONS] {
  return QUEUE.OPTIONS[name] || QUEUE.OPTIONS.DEFAULT;
}

export function getRetryConfig(
  name: keyof typeof QUEUE.RETRY
): (typeof QUEUE.RETRY)[keyof typeof QUEUE.RETRY] {
  return QUEUE.RETRY[name] || QUEUE.RETRY.DEFAULT;
}

export function shouldRetryJob(attempts: number): boolean {
  return attempts < QUEUE.RETRY.DEFAULT.attempts;
}

export function getBackoffDelay(attempt: number, config: typeof QUEUE.RETRY.DEFAULT): number {
  if (config.backoff.type === 'exponential') {
    return config.backoff.delay * Math.pow(2, attempt - 1);
  }
  return config.backoff.delay;
}

export function isJobComplete(state: QueueState): boolean {
  return state === QUEUE.STATES.COMPLETED;
}

export function isJobFailed(state: QueueState): boolean {
  return state === QUEUE.STATES.FAILED;
}

export function isJobWaiting(state: QueueState): boolean {
  return state === QUEUE.STATES.WAITING;
}

export function isJobActive(state: QueueState): boolean {
  return state === QUEUE.STATES.ACTIVE;
}

export function getJobPriorityLabel(priority: QueuePriority): string {
  const labels: Record<QueuePriority, string> = {
    [QUEUE.PRIORITY.CRITICAL]: 'Critical',
    [QUEUE.PRIORITY.HIGH]: 'High',
    [QUEUE.PRIORITY.MEDIUM]: 'Medium',
    [QUEUE.PRIORITY.LOW]: 'Low',
    [QUEUE.PRIORITY.BACKGROUND]: 'Background',
  };
  return labels[priority] || 'Unknown';
}

export function getPriorityFromLabel(label: string): QueuePriority {
  const mapping: Record<string, QueuePriority> = {
    critical: QUEUE.PRIORITY.CRITICAL,
    high: QUEUE.PRIORITY.HIGH,
    medium: QUEUE.PRIORITY.MEDIUM,
    low: QUEUE.PRIORITY.LOW,
    background: QUEUE.PRIORITY.BACKGROUND,
  };
  return mapping[label.toLowerCase()] || QUEUE.PRIORITY.MEDIUM;
}
