/**
 * Notification Queue Constants
 * Contains all queue-related constants for notification management
 */

export const NotificationQueue = {
  // Queue names
  NAMES: {
    NOTIFICATION: 'notification-queue',
    EMAIL: 'email-queue',
    SMS: 'sms-queue',
    PUSH: 'push-queue',
    WEBHOOK: 'webhook-queue',
    SCHEDULE: 'schedule-queue',
    ANALYTICS: 'analytics-queue',
    DIGEST: 'digest-queue',
    BROADCAST: 'broadcast-queue',
    SLACK: 'slack-queue',
    TELEGRAM: 'telegram-queue',
    WHATSAPP: 'whatsapp-queue',
    PREFERENCE: 'preference-queue',
    DEVICE: 'device-queue',
    RULE: 'rule-queue',
    REPORT: 'report-queue',
  } as const,

  // Queue types
  QUEUE_TYPE: {
    BULL: 'bull',
    RABBITMQ: 'rabbitmq',
    AWS_SQS: 'aws_sqs',
  } as const,

  // Queue priority levels
  PRIORITIES: {
    HIGH: 1,
    MEDIUM: 5,
    LOW: 10,
    VERY_LOW: 20,
  } as const,

  // Queue attempts
  ATTEMPTS: {
    DEFAULT: 3,
    HIGH: 5,
    LOW: 2,
  } as const,

  // Queue delays in milliseconds
  DELAYS: {
    SHORT: 1000, // 1 second
    MEDIUM: 5000, // 5 seconds
    LONG: 30000, // 30 seconds
    VERY_LONG: 60000, // 1 minute
  } as const,

  // Queue timeouts in milliseconds
  TIMEOUTS: {
    NOTIFICATION: 30000, // 30 seconds
    EMAIL: 60000, // 1 minute
    SMS: 15000, // 15 seconds
    PUSH: 15000, // 15 seconds
    WEBHOOK: 30000, // 30 seconds
    SCHEDULE: 60000, // 1 minute
    ANALYTICS: 45000, // 45 seconds
    DIGEST: 120000, // 2 minutes
    BROADCAST: 180000, // 3 minutes
    SLACK: 15000, // 15 seconds
    TELEGRAM: 15000, // 15 seconds
    WHATSAPP: 15000, // 15 seconds
    PREFERENCE: 15000, // 15 seconds
    DEVICE: 15000, // 15 seconds
    RULE: 15000, // 15 seconds
    REPORT: 60000, // 1 minute
    RETRY: 30000, // 30 seconds
    CANCEL: 10000, // 10 seconds
    UPDATE_PREFERENCE: 15000, // 15 seconds
  } as const,

  // Job types
  JOB_TYPES: {
    SEND_NOTIFICATION: 'send_notification',
    SEND_EMAIL: 'send_email',
    SEND_SMS: 'send_sms',
    SEND_PUSH: 'send_push',
    SEND_WEBHOOK: 'send_webhook',
    SCHEDULE_NOTIFICATION: 'schedule_notification',
    PROCESS_ANALYTICS: 'process_analytics',
    SEND_DIGEST: 'send_digest',
    BROADCAST_NOTIFICATION: 'broadcast_notification',
    SEND_SLACK: 'send_slack',
    SEND_TELEGRAM: 'send_telegram',
    SEND_WHATSAPP: 'send_whatsapp',
    RETRY_NOTIFICATION: 'retry_notification',
    CANCEL_NOTIFICATION: 'cancel_notification',
    UPDATE_PREFERENCE: 'update_preference',
    UPDATE_DEVICE: 'update_device',
    PROCESS_RULE: 'process_rule',
    GENERATE_REPORT: 'generate_report',
  } as const,

  // Retry policy
  RETRY_POLICY: {
    MAX_ATTEMPTS: 3,
    RETRY_DELAY: 60000, // 60 seconds
    BACKOFF: {
      TYPE: 'exponential',
      DELAY: 60000,
      FACTOR: 2,
    } as const,
    MAX_RETRY_DELAY: 3600000, // 1 hour
  } as const,

  // Delivery modes
  DELIVERY_MODE: {
    PERSISTENT: 'persistent',
    NON_PERSISTENT: 'non_persistent',
  } as const,

  // Dead letter queue configuration
  DEAD_LETTER_QUEUE_CONFIG: {
    EXCHANGE: 'notification.dlx',
    ROUTING_KEY: 'notification.dlq',
    TTL: 86400000, // 24 hours
    MAX_RETRIES: 3,
    MAX_MESSAGES: 1000,
  } as const,

  // Queue events
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
    DEAD_LETTER: 'dead_letter',
    RETRY: 'retry',
    CANCEL: 'cancel',
    EXPIRED: 'expired',
  } as const,

  // Consumer configurations
  CONSUMER_CONFIGS: {
    NOTIFICATION: {
      concurrency: 5,
      priority: 1,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 60000,
      },
    },
    EMAIL: {
      concurrency: 2,
      priority: 3,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 30000,
      },
    },
    SMS: {
      concurrency: 3,
      priority: 3,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 15000,
      },
    },
    PUSH: {
      concurrency: 3,
      priority: 3,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 15000,
      },
    },
    WEBHOOK: {
      concurrency: 2,
      priority: 5,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 30000,
      },
    },
    SCHEDULE: {
      concurrency: 1,
      priority: 5,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 60000,
      },
    },
    ANALYTICS: {
      concurrency: 1,
      priority: 5,
      attempts: 2,
      backoff: {
        type: 'exponential',
        delay: 60000,
      },
    },
    DIGEST: {
      concurrency: 1,
      priority: 3,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 60000,
      },
    },
    BROADCAST: {
      concurrency: 1,
      priority: 2,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 60000,
      },
    },
    SLACK: {
      concurrency: 2,
      priority: 3,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 30000,
      },
    },
    TELEGRAM: {
      concurrency: 2,
      priority: 3,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 30000,
      },
    },
    WHATSAPP: {
      concurrency: 2,
      priority: 3,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 30000,
      },
    },
    PREFERENCE: {
      concurrency: 2,
      priority: 5,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 15000,
      },
    },
    DEVICE: {
      concurrency: 2,
      priority: 5,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 15000,
      },
    },
    RULE: {
      concurrency: 1,
      priority: 5,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 30000,
      },
    },
    REPORT: {
      concurrency: 1,
      priority: 5,
      attempts: 2,
      backoff: {
        type: 'exponential',
        delay: 60000,
      },
    },
  } as const,

  // Concurrency settings
  CONCURRENCY: {
    DEFAULT: 5,
    HIGH: 10,
    LOW: 2,
    MINIMAL: 1,
  } as const,

  // Batch size for processing
  BATCH_SIZE: 100,

  // Maximum queue size (messages)
  MAX_SIZE: 10000,

  // Processing interval in milliseconds
  PROCESSING_INTERVAL: 1000,

  // Cleanup interval in milliseconds
  CLEANUP_INTERVAL: 3600000, // 1 hour
} as const;

// Helper types for queue configuration
export type NotificationQueueName =
  (typeof NotificationQueue.NAMES)[keyof typeof NotificationQueue.NAMES];
export type NotificationQueueEvent =
  (typeof NotificationQueue.EVENTS)[keyof typeof NotificationQueue.EVENTS];
export type NotificationJobType =
  (typeof NotificationQueue.JOB_TYPES)[keyof typeof NotificationQueue.JOB_TYPES];
export type NotificationPriority =
  (typeof NotificationQueue.PRIORITIES)[keyof typeof NotificationQueue.PRIORITIES];
export type NotificationDeliveryMode =
  (typeof NotificationQueue.DELIVERY_MODE)[keyof typeof NotificationQueue.DELIVERY_MODE];
export type NotificationQueueType =
  (typeof NotificationQueue.QUEUE_TYPE)[keyof typeof NotificationQueue.QUEUE_TYPE];

// Queue configuration builder
export const NotificationQueueConfig = {
  createJobConfig: (jobType: NotificationJobType) => ({
    attempts: NotificationQueue.RETRY_POLICY.MAX_ATTEMPTS,
    backoff: NotificationQueue.RETRY_POLICY.BACKOFF,
    timeout:
      NotificationQueue.TIMEOUTS[
        jobType.toUpperCase() as keyof typeof NotificationQueue.TIMEOUTS
      ] || 30000,
    delay: 0,
    priority: NotificationQueue.PRIORITIES.MEDIUM,
    removeOnComplete: true,
    removeOnFail: false,
    deadLetterExchange: NotificationQueue.DEAD_LETTER_QUEUE_CONFIG.EXCHANGE,
    deadLetterRoutingKey: NotificationQueue.DEAD_LETTER_QUEUE_CONFIG.ROUTING_KEY,
    messageTTL: NotificationQueue.DEAD_LETTER_QUEUE_CONFIG.TTL,
  }),

  getConcurrency: (type: 'DEFAULT' | 'HIGH' | 'LOW' | 'MINIMAL' = 'DEFAULT'): number => {
    return NotificationQueue.CONCURRENCY[type] || 5;
  },

  getBatchSize: (): number => {
    return NotificationQueue.BATCH_SIZE;
  },

  getMaxSize: (): number => {
    return NotificationQueue.MAX_SIZE;
  },

  getProcessingInterval: (): number => {
    return NotificationQueue.PROCESSING_INTERVAL;
  },

  getCleanupInterval: (): number => {
    return NotificationQueue.CLEANUP_INTERVAL;
  },

  getPriority: (level: keyof typeof NotificationQueue.PRIORITIES): number => {
    return NotificationQueue.PRIORITIES[level];
  },

  getAttempts: (level: keyof typeof NotificationQueue.ATTEMPTS): number => {
    return NotificationQueue.ATTEMPTS[level];
  },

  getDelay: (level: keyof typeof NotificationQueue.DELAYS): number => {
    return NotificationQueue.DELAYS[level];
  },

  getConsumerConfig: (queueName: NotificationQueueName) => {
    const key = queueName
      .toUpperCase()
      .replace('-', '_') as keyof typeof NotificationQueue.CONSUMER_CONFIGS;
    return (
      NotificationQueue.CONSUMER_CONFIGS[key] || NotificationQueue.CONSUMER_CONFIGS.NOTIFICATION
    );
  },

  getDeadLetterConfig: () => {
    return NotificationQueue.DEAD_LETTER_QUEUE_CONFIG;
  },

  isValidJobType: (jobType: string): jobType is NotificationJobType => {
    return Object.values(NotificationQueue.JOB_TYPES).includes(jobType as NotificationJobType);
  },

  isValidQueueName: (queueName: string): queueName is NotificationQueueName => {
    return Object.values(NotificationQueue.NAMES).includes(queueName as NotificationQueueName);
  },
} as const;
