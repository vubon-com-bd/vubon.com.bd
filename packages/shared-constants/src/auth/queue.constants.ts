/**
 * Queue management constants for the monorepo
 * All queue-related constants are centralized here for consistent message queue handling
 */

/**
 * Queue names for different job types
 */
export const QUEUE_NAMES = {
  /**
   * Email queue for sending emails
   */
  EMAIL: 'email',

  /**
   * SMS queue for sending SMS messages
   */
  SMS: 'sms',

  /**
   * Webhook queue for processing webhooks
   */
  WEBHOOK: 'webhook',

  /**
   * Payment processing queue
   */
  PAYMENT: 'payment',

  /**
   * bKash payment queue (Bangladesh)
   */
  BKASH: 'bkash',

  /**
   * Nagad payment queue (Bangladesh)
   */
  NAGAD: 'nagad',

  /**
   * Rocket payment queue (Bangladesh)
   */
  ROCKET: 'rocket',

  /**
   * SSL Commerz payment queue (Bangladesh)
   */
  SSL_COMMERZ: 'ssl-commerz',

  /**
   * Courier service queue
   */
  COURIER: 'courier',

  /**
   * Courier service queue for Bangladesh
   */
  COURIER_BD: 'courier-bd',

  /**
   * Notification queue for push notifications
   */
  NOTIFICATION: 'notification',

  /**
   * Analytics queue for processing analytics
   */
  ANALYTICS: 'analytics',

  /**
   * Report generation queue
   */
  REPORT: 'report',

  /**
   * File processing queue
   */
  FILE_PROCESSING: 'file-processing',

  /**
   * Image processing queue
   */
  IMAGE_PROCESSING: 'image-processing',

  /**
   * Video processing queue
   */
  VIDEO_PROCESSING: 'video-processing',

  /**
   * Data import queue
   */
  DATA_IMPORT: 'data-import',

  /**
   * Data export queue
   */
  DATA_EXPORT: 'data-export',

  /**
   * Backup queue
   */
  BACKUP: 'backup',

  /**
   * Sync queue for data synchronization
   */
  SYNC: 'sync',

  /**
   * Audit log queue
   */
  AUDIT_LOG: 'audit-log',

  /**
   * Dead Letter Queue for failed jobs
   */
  DEAD_LETTER: 'dead-letter',

  /**
   * Default queue
   */
  DEFAULT: 'default',
} as const;

export type QueueName = (typeof QUEUE_NAMES)[keyof typeof QUEUE_NAMES];

/**
 * Exchange names for RabbitMQ
 */
export const EXCHANGE_NAMES = {
  /**
   * Email exchange
   */
  EMAIL: 'exchange.email',

  /**
   * SMS exchange
   */
  SMS: 'exchange.sms',

  /**
   * Payment exchange
   */
  PAYMENT: 'exchange.payment',

  /**
   * Notification exchange
   */
  NOTIFICATION: 'exchange.notification',

  /**
   * Webhook exchange
   */
  WEBHOOK: 'exchange.webhook',

  /**
   * Analytics exchange
   */
  ANALYTICS: 'exchange.analytics',

  /**
   * File exchange
   */
  FILE: 'exchange.file',

  /**
   * Default exchange
   */
  DEFAULT: 'exchange.default',

  /**
   * Dead Letter exchange
   */
  DEAD_LETTER: 'exchange.dead-letter',

  /**
   * Direct exchange for routing
   */
  DIRECT: 'exchange.direct',

  /**
   * Topic exchange for pattern routing
   */
  TOPIC: 'exchange.topic',

  /**
   * Fanout exchange for broadcasting
   */
  FANOUT: 'exchange.fanout',
} as const;

export type ExchangeName = (typeof EXCHANGE_NAMES)[keyof typeof EXCHANGE_NAMES];

/**
 * Routing keys for message routing
 */
export const ROUTING_KEYS = {
  /**
   * Email routing keys
   */
  EMAIL: {
    WELCOME: 'email.welcome',
    VERIFICATION: 'email.verification',
    PASSWORD_RESET: 'email.password-reset',
    ORDER_CONFIRMATION: 'email.order-confirmation',
    PAYMENT_RECEIPT: 'email.payment-receipt',
    SHIPPING_UPDATE: 'email.shipping-update',
    NEWSLETTER: 'email.newsletter',
    PROMOTIONAL: 'email.promotional',
    SYSTEM: 'email.system',
    ADMIN: 'email.admin',
  },

  /**
   * SMS routing keys
   */
  SMS: {
    OTP: 'sms.otp',
    VERIFICATION: 'sms.verification',
    NOTIFICATION: 'sms.notification',
    PROMOTIONAL: 'sms.promotional',
    ALERT: 'sms.alert',
    ORDER_UPDATE: 'sms.order-update',
    PAYMENT_CONFIRMATION: 'sms.payment-confirmation',
    DELIVERY_UPDATE: 'sms.delivery-update',
  },

  /**
   * Payment routing keys
   */
  PAYMENT: {
    PROCESS: 'payment.process',
    VERIFY: 'payment.verify',
    REFUND: 'payment.refund',
    REVERSE: 'payment.reverse',
    CALLBACK: 'payment.callback',
    WEBHOOK: 'payment.webhook',
    SETTLEMENT: 'payment.settlement',
    RECONCILIATION: 'payment.reconciliation',
    FAILED: 'payment.failed',
  },

  /**
   * Bangladesh payment gateway routing keys
   */
  BD_PAYMENT: {
    BKASH: {
      PROCESS: 'payment.bkash.process',
      VERIFY: 'payment.bkash.verify',
      REFUND: 'payment.bkash.refund',
      CALLBACK: 'payment.bkash.callback',
      WEBHOOK: 'payment.bkash.webhook',
    },
    NAGAD: {
      PROCESS: 'payment.nagad.process',
      VERIFY: 'payment.nagad.verify',
      REFUND: 'payment.nagad.refund',
      CALLBACK: 'payment.nagad.callback',
      WEBHOOK: 'payment.nagad.webhook',
    },
    ROCKET: {
      PROCESS: 'payment.rocket.process',
      VERIFY: 'payment.rocket.verify',
      REFUND: 'payment.rocket.refund',
      CALLBACK: 'payment.rocket.callback',
      WEBHOOK: 'payment.rocket.webhook',
    },
    SSL_COMMERZ: {
      PROCESS: 'payment.ssl-commerz.process',
      VERIFY: 'payment.ssl-commerz.verify',
      REFUND: 'payment.ssl-commerz.refund',
      CALLBACK: 'payment.ssl-commerz.callback',
      WEBHOOK: 'payment.ssl-commerz.webhook',
    },
  },

  /**
   * Webhook routing keys
   */
  WEBHOOK: {
    PROCESS: 'webhook.process',
    RETRY: 'webhook.retry',
    FAILED: 'webhook.failed',
    VERIFY: 'webhook.verify',
  },

  /**
   * Courier routing keys
   */
  COURIER: {
    CREATE_ORDER: 'courier.create-order',
    TRACK_ORDER: 'courier.track-order',
    UPDATE_STATUS: 'courier.update-status',
    CANCEL_ORDER: 'courier.cancel-order',
    DELIVERY_CONFIRM: 'courier.delivery-confirm',
    PICKUP_REQUEST: 'courier.pickup-request',
  },

  /**
   * Bangladesh courier routing keys
   */
  COURIER_BD: {
    SAHAAJ: {
      CREATE: 'courier.sahaaj.create',
      TRACK: 'courier.sahaaj.track',
      UPDATE: 'courier.sahaaj.update',
      CANCEL: 'courier.sahaaj.cancel',
    },
    PAPERFLY: {
      CREATE: 'courier.paperfly.create',
      TRACK: 'courier.paperfly.track',
      UPDATE: 'courier.paperfly.update',
      CANCEL: 'courier.paperfly.cancel',
    },
    REDX: {
      CREATE: 'courier.redx.create',
      TRACK: 'courier.redx.track',
      UPDATE: 'courier.redx.update',
      CANCEL: 'courier.redx.cancel',
    },
  },

  /**
   * Notification routing keys
   */
  NOTIFICATION: {
    PUSH: 'notification.push',
    EMAIL: 'notification.email',
    SMS: 'notification.sms',
    IN_APP: 'notification.in-app',
    BROADCAST: 'notification.broadcast',
  },

  /**
   * Analytics routing keys
   */
  ANALYTICS: {
    TRACK: 'analytics.track',
    AGGREGATE: 'analytics.aggregate',
    PROCESS: 'analytics.process',
    REPORT: 'analytics.report',
  },

  /**
   * System routing keys
   */
  SYSTEM: {
    LOG: 'system.log',
    AUDIT: 'system.audit',
    ALERT: 'system.alert',
    MONITOR: 'system.monitor',
    BACKUP: 'system.backup',
    SYNC: 'system.sync',
  },

  /**
   * File processing routing keys
   */
  FILE: {
    UPLOAD: 'file.upload',
    PROCESS: 'file.process',
    CONVERT: 'file.convert',
    COMPRESS: 'file.compress',
    DELETE: 'file.delete',
  },

  /**
   * Dead Letter routing keys
   */
  DEAD_LETTER: {
    ALL: 'dead-letter.all',
    EMAIL: 'dead-letter.email',
    SMS: 'dead-letter.sms',
    PAYMENT: 'dead-letter.payment',
    WEBHOOK: 'dead-letter.webhook',
  },
} as const;

export type RoutingKey =
  | (typeof ROUTING_KEYS.EMAIL)[keyof typeof ROUTING_KEYS.EMAIL]
  | (typeof ROUTING_KEYS.SMS)[keyof typeof ROUTING_KEYS.SMS]
  | (typeof ROUTING_KEYS.PAYMENT)[keyof typeof ROUTING_KEYS.PAYMENT]
  | (typeof ROUTING_KEYS.BD_PAYMENT.BKASH)[keyof typeof ROUTING_KEYS.BD_PAYMENT.BKASH]
  | (typeof ROUTING_KEYS.BD_PAYMENT.NAGAD)[keyof typeof ROUTING_KEYS.BD_PAYMENT.NAGAD]
  | (typeof ROUTING_KEYS.BD_PAYMENT.ROCKET)[keyof typeof ROUTING_KEYS.BD_PAYMENT.ROCKET]
  | (typeof ROUTING_KEYS.BD_PAYMENT.SSL_COMMERZ)[keyof typeof ROUTING_KEYS.BD_PAYMENT.SSL_COMMERZ]
  | (typeof ROUTING_KEYS.WEBHOOK)[keyof typeof ROUTING_KEYS.WEBHOOK]
  | (typeof ROUTING_KEYS.COURIER)[keyof typeof ROUTING_KEYS.COURIER]
  | (typeof ROUTING_KEYS.COURIER_BD.SAHAAJ)[keyof typeof ROUTING_KEYS.COURIER_BD.SAHAAJ]
  | (typeof ROUTING_KEYS.COURIER_BD.PAPERFLY)[keyof typeof ROUTING_KEYS.COURIER_BD.PAPERFLY]
  | (typeof ROUTING_KEYS.COURIER_BD.REDX)[keyof typeof ROUTING_KEYS.COURIER_BD.REDX]
  | (typeof ROUTING_KEYS.NOTIFICATION)[keyof typeof ROUTING_KEYS.NOTIFICATION]
  | (typeof ROUTING_KEYS.ANALYTICS)[keyof typeof ROUTING_KEYS.ANALYTICS]
  | (typeof ROUTING_KEYS.SYSTEM)[keyof typeof ROUTING_KEYS.SYSTEM]
  | (typeof ROUTING_KEYS.FILE)[keyof typeof ROUTING_KEYS.FILE]
  | (typeof ROUTING_KEYS.DEAD_LETTER)[keyof typeof ROUTING_KEYS.DEAD_LETTER];

/**
 * Queue configuration for each queue
 */
export const QUEUE_CONFIG = {
  /**
   * Email queue configuration
   */
  [QUEUE_NAMES.EMAIL]: {
    concurrency: 10,
    maxAttempts: 3,
    backoff: {
      type: 'exponential',
      delay: 5000, // 5 seconds initial delay
    },
    removeOnComplete: {
      age: 3600, // 1 hour
      count: 1000,
    },
    removeOnFail: {
      age: 86400, // 24 hours
      count: 10000,
    },
    stalledInterval: 30000, // 30 seconds
    maxStalledCount: 3,
    lockDuration: 60000, // 60 seconds
  },

  /**
   * SMS queue configuration
   */
  [QUEUE_NAMES.SMS]: {
    concurrency: 5,
    maxAttempts: 3,
    backoff: {
      type: 'exponential',
      delay: 3000, // 3 seconds initial delay
    },
    removeOnComplete: {
      age: 1800, // 30 minutes
      count: 500,
    },
    removeOnFail: {
      age: 43200, // 12 hours
      count: 5000,
    },
    stalledInterval: 20000, // 20 seconds
    maxStalledCount: 2,
    lockDuration: 30000, // 30 seconds
  },

  /**
   * Payment queue configuration
   */
  [QUEUE_NAMES.PAYMENT]: {
    concurrency: 3,
    maxAttempts: 5,
    backoff: {
      type: 'exponential',
      delay: 10000, // 10 seconds initial delay
    },
    removeOnComplete: {
      age: 86400, // 24 hours
      count: 1000,
    },
    removeOnFail: {
      age: 259200, // 3 days
      count: 10000,
    },
    stalledInterval: 60000, // 60 seconds
    maxStalledCount: 5,
    lockDuration: 120000, // 120 seconds
  },

  /**
   * bKash payment queue configuration
   */
  [QUEUE_NAMES.BKASH]: {
    concurrency: 2,
    maxAttempts: 5,
    backoff: {
      type: 'exponential',
      delay: 15000, // 15 seconds initial delay
    },
    removeOnComplete: {
      age: 86400, // 24 hours
      count: 1000,
    },
    removeOnFail: {
      age: 259200, // 3 days
      count: 10000,
    },
    stalledInterval: 60000, // 60 seconds
    maxStalledCount: 5,
    lockDuration: 120000, // 120 seconds
  },

  /**
   * Nagad payment queue configuration
   */
  [QUEUE_NAMES.NAGAD]: {
    concurrency: 2,
    maxAttempts: 5,
    backoff: {
      type: 'exponential',
      delay: 15000, // 15 seconds initial delay
    },
    removeOnComplete: {
      age: 86400, // 24 hours
      count: 1000,
    },
    removeOnFail: {
      age: 259200, // 3 days
      count: 10000,
    },
    stalledInterval: 60000, // 60 seconds
    maxStalledCount: 5,
    lockDuration: 120000, // 120 seconds
  },

  /**
   * Rocket payment queue configuration
   */
  [QUEUE_NAMES.ROCKET]: {
    concurrency: 2,
    maxAttempts: 5,
    backoff: {
      type: 'exponential',
      delay: 15000, // 15 seconds initial delay
    },
    removeOnComplete: {
      age: 86400, // 24 hours
      count: 1000,
    },
    removeOnFail: {
      age: 259200, // 3 days
      count: 10000,
    },
    stalledInterval: 60000, // 60 seconds
    maxStalledCount: 5,
    lockDuration: 120000, // 120 seconds
  },

  /**
   * SSL Commerz payment queue configuration
   */
  [QUEUE_NAMES.SSL_COMMERZ]: {
    concurrency: 2,
    maxAttempts: 5,
    backoff: {
      type: 'exponential',
      delay: 15000, // 15 seconds initial delay
    },
    removeOnComplete: {
      age: 86400, // 24 hours
      count: 1000,
    },
    removeOnFail: {
      age: 259200, // 3 days
      count: 10000,
    },
    stalledInterval: 60000, // 60 seconds
    maxStalledCount: 5,
    lockDuration: 120000, // 120 seconds
  },

  /**
   * Webhook queue configuration
   */
  [QUEUE_NAMES.WEBHOOK]: {
    concurrency: 5,
    maxAttempts: 5,
    backoff: {
      type: 'exponential',
      delay: 5000, // 5 seconds initial delay
    },
    removeOnComplete: {
      age: 3600, // 1 hour
      count: 1000,
    },
    removeOnFail: {
      age: 86400, // 24 hours
      count: 10000,
    },
    stalledInterval: 30000, // 30 seconds
    maxStalledCount: 3,
    lockDuration: 60000, // 60 seconds
  },

  /**
   * Courier queue configuration
   */
  [QUEUE_NAMES.COURIER]: {
    concurrency: 3,
    maxAttempts: 3,
    backoff: {
      type: 'exponential',
      delay: 10000, // 10 seconds initial delay
    },
    removeOnComplete: {
      age: 86400, // 24 hours
      count: 1000,
    },
    removeOnFail: {
      age: 259200, // 3 days
      count: 10000,
    },
    stalledInterval: 60000, // 60 seconds
    maxStalledCount: 3,
    lockDuration: 90000, // 90 seconds
  },

  /**
   * Notification queue configuration
   */
  [QUEUE_NAMES.NOTIFICATION]: {
    concurrency: 10,
    maxAttempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000, // 2 seconds initial delay
    },
    removeOnComplete: {
      age: 1800, // 30 minutes
      count: 1000,
    },
    removeOnFail: {
      age: 86400, // 24 hours
      count: 10000,
    },
    stalledInterval: 20000, // 20 seconds
    maxStalledCount: 2,
    lockDuration: 30000, // 30 seconds
  },

  /**
   * Analytics queue configuration
   */
  [QUEUE_NAMES.ANALYTICS]: {
    concurrency: 2,
    maxAttempts: 3,
    backoff: {
      type: 'exponential',
      delay: 5000, // 5 seconds initial delay
    },
    removeOnComplete: {
      age: 3600, // 1 hour
      count: 1000,
    },
    removeOnFail: {
      age: 86400, // 24 hours
      count: 10000,
    },
    stalledInterval: 30000, // 30 seconds
    maxStalledCount: 3,
    lockDuration: 60000, // 60 seconds
  },

  /**
   * File processing queue configuration
   */
  [QUEUE_NAMES.FILE_PROCESSING]: {
    concurrency: 1,
    maxAttempts: 3,
    backoff: {
      type: 'exponential',
      delay: 30000, // 30 seconds initial delay
    },
    removeOnComplete: {
      age: 3600, // 1 hour
      count: 100,
    },
    removeOnFail: {
      age: 86400, // 24 hours
      count: 1000,
    },
    stalledInterval: 120000, // 120 seconds
    maxStalledCount: 2,
    lockDuration: 180000, // 180 seconds
  },

  /**
   * Dead Letter Queue configuration
   */
  [QUEUE_NAMES.DEAD_LETTER]: {
    concurrency: 1,
    maxAttempts: 1,
    backoff: {
      type: 'exponential',
      delay: 60000, // 60 seconds initial delay
    },
    removeOnComplete: {
      age: 259200, // 3 days
      count: 1000,
    },
    removeOnFail: {
      age: 604800, // 7 days
      count: 10000,
    },
    stalledInterval: 300000, // 5 minutes
    maxStalledCount: 1,
    lockDuration: 300000, // 5 minutes
  },

  /**
   * Default queue configuration
   */
  [QUEUE_NAMES.DEFAULT]: {
    concurrency: 5,
    maxAttempts: 3,
    backoff: {
      type: 'exponential',
      delay: 5000, // 5 seconds initial delay
    },
    removeOnComplete: {
      age: 3600, // 1 hour
      count: 1000,
    },
    removeOnFail: {
      age: 86400, // 24 hours
      count: 10000,
    },
    stalledInterval: 30000, // 30 seconds
    maxStalledCount: 3,
    lockDuration: 60000, // 60 seconds
  },
} as const;

/**
 * Dead Letter Queue configuration for each queue
 */
export const DLQ_CONFIG = {
  /**
   * Enable DLQ for all queues
   */
  ENABLED: true,

  /**
   * DLQ prefix for queue names
   */
  PREFIX: 'dlq:',

  /**
   * Maximum retry attempts before sending to DLQ
   */
  MAX_RETRY_ATTEMPTS: 5,

  /**
   * DLQ processing delay in seconds
   */
  PROCESSING_DELAY: 60, // 60 seconds

  /**
   * DLQ message TTL in seconds
   */
  MESSAGE_TTL: 604800, // 7 days

  /**
   * DLQ queue names
   */
  QUEUES: {
    EMAIL: 'dlq:email',
    SMS: 'dlq:sms',
    PAYMENT: 'dlq:payment',
    WEBHOOK: 'dlq:webhook',
    BKASH: 'dlq:bkash',
    NAGAD: 'dlq:nagad',
    ROCKET: 'dlq:rocket',
    SSL_COMMERZ: 'dlq:ssl-commerz',
    COURIER: 'dlq:courier',
    NOTIFICATION: 'dlq:notification',
    ANALYTICS: 'dlq:analytics',
    FILE_PROCESSING: 'dlq:file-processing',
    DEFAULT: 'dlq:default',
  } as const,
} as const;

export type DLQQueue = (typeof DLQ_CONFIG.QUEUES)[keyof typeof DLQ_CONFIG.QUEUES];

/**
 * Queue priority levels
 */
export const QUEUE_PRIORITY = {
  /**
   * Critical priority - Highest priority
   */
  CRITICAL: 1,

  /**
   * High priority
   */
  HIGH: 2,

  /**
   * Medium priority
   */
  MEDIUM: 3,

  /**
   * Low priority
   */
  LOW: 4,

  /**
   * Background priority - Lowest priority
   */
  BACKGROUND: 5,
} as const;

export type QueuePriority = (typeof QUEUE_PRIORITY)[keyof typeof QUEUE_PRIORITY];

/**
 * Queue events for monitoring
 */
export const QUEUE_EVENTS = {
  /**
   * Job lifecycle events
   */
  JOB_ADDED: 'job.added',
  JOB_STARTED: 'job.started',
  JOB_COMPLETED: 'job.completed',
  JOB_FAILED: 'job.failed',
  JOB_RETRY: 'job.retry',
  JOB_DELAYED: 'job.delayed',
  JOB_STALLED: 'job.stalled',
  JOB_PROGRESS: 'job.progress',
  JOB_REMOVED: 'job.removed',
  JOB_CLEANED: 'job.cleaned',

  /**
   * Queue lifecycle events
   */
  QUEUE_PAUSED: 'queue.paused',
  QUEUE_RESUMED: 'queue.resumed',
  QUEUE_DRAINED: 'queue.drained',
  QUEUE_ERROR: 'queue.error',

  /**
   * DLQ events
   */
  DLQ_MOVED: 'dlq.moved',
  DLQ_PROCESSED: 'dlq.processed',
  DLQ_FAILED: 'dlq.failed',

  /**
   * Worker events
   */
  WORKER_STARTED: 'worker.started',
  WORKER_STOPPED: 'worker.stopped',
  WORKER_ERROR: 'worker.error',
} as const;

export type QueueEvent = (typeof QUEUE_EVENTS)[keyof typeof QUEUE_EVENTS];

/**
 * Queue error messages
 */
export const QUEUE_ERROR_MESSAGES = {
  QUEUE_NOT_FOUND: 'Queue not found',
  JOB_NOT_FOUND: 'Job not found',
  JOB_FAILED: 'Job execution failed',
  JOB_TIMEOUT: 'Job execution timeout',
  JOB_STALLED: 'Job stalled',
  QUEUE_PAUSED: 'Queue is paused',
  QUEUE_FULL: 'Queue is full',
  CONNECTION_FAILED: 'Queue connection failed',
  PUBLISH_FAILED: 'Failed to publish message to queue',
  CONSUME_FAILED: 'Failed to consume message from queue',
  ACK_FAILED: 'Failed to acknowledge message',
  RETRY_EXCEEDED: 'Maximum retry attempts exceeded',
  DLQ_MOVE_FAILED: 'Failed to move job to DLQ',
  DLQ_PROCESS_FAILED: 'Failed to process DLQ message',
  SERIALIZATION_FAILED: 'Failed to serialize job data',
  DESERIALIZATION_FAILED: 'Failed to deserialize job data',
  INVALID_JOB_DATA: 'Invalid job data',
  JOB_CANCELLED: 'Job cancelled by user',
  WORKER_ERROR: 'Worker encountered an error',
} as const;

export type QueueErrorMessage = (typeof QUEUE_ERROR_MESSAGES)[keyof typeof QUEUE_ERROR_MESSAGES];

/**
 * Queue success messages
 */
export const QUEUE_SUCCESS_MESSAGES = {
  JOB_ADDED: 'Job added to queue successfully',
  JOB_COMPLETED: 'Job completed successfully',
  JOB_RETRIED: 'Job retried successfully',
  JOB_CLEANED: 'Job cleaned successfully',
  QUEUE_CREATED: 'Queue created successfully',
  QUEUE_DELETED: 'Queue deleted successfully',
  QUEUE_PAUSED: 'Queue paused successfully',
  QUEUE_RESUMED: 'Queue resumed successfully',
  DLQ_MOVED: 'Job moved to DLQ successfully',
  DLQ_PROCESSED: 'DLQ message processed successfully',
  WORKER_STARTED: 'Worker started successfully',
  WORKER_STOPPED: 'Worker stopped successfully',
} as const;

export type QueueSuccessMessage =
  (typeof QUEUE_SUCCESS_MESSAGES)[keyof typeof QUEUE_SUCCESS_MESSAGES];

/**
 * Queue configuration interface
 */
export interface QueueConfig {
  /**
   * Queue name
   */
  name: QueueName;

  /**
   * Concurrency level
   */
  concurrency: number;

  /**
   * Maximum retry attempts
   */
  maxAttempts: number;

  /**
   * Backoff configuration
   */
  backoff: {
    type: 'exponential' | 'fixed';
    delay: number;
  };

  /**
   * Remove on complete configuration
   */
  removeOnComplete: {
    age: number;
    count: number;
  };

  /**
   * Remove on fail configuration
   */
  removeOnFail: {
    age: number;
    count: number;
  };

  /**
   * Stalled interval in milliseconds
   */
  stalledInterval: number;

  /**
   * Maximum stalled count
   */
  maxStalledCount: number;

  /**
   * Lock duration in milliseconds
   */
  lockDuration: number;

  /**
   * Dead Letter Queue configuration
   */
  deadLetterQueue: {
    enabled: boolean;
    queueName: string;
    maxRetries: number;
  };
}

/**
 * Helper function to get queue config
 */
export const getQueueConfig = (queueName: QueueName): QueueConfig => {
  const config = QUEUE_CONFIG[queueName];
  if (!config) {
    return QUEUE_CONFIG[QUEUE_NAMES.DEFAULT] as QueueConfig;
  }
  return config as QueueConfig;
};

/**
 * Helper function to get DLQ queue name
 */
export const getDLQQueueName = (queueName: QueueName): string => {
  return `${DLQ_CONFIG.PREFIX}${queueName}`;
};

/**
 * Helper function to check if queue has DLQ enabled
 */
export const isDLQEnabled = (queueName: QueueName): boolean => {
  const config = getQueueConfig(queueName);
  return config.deadLetterQueue?.enabled ?? DLQ_CONFIG.ENABLED;
};

/**
 * Helper function to get routing key
 */
export const getRoutingKey = (
  category: keyof typeof ROUTING_KEYS,
  key: keyof (typeof ROUTING_KEYS)[typeof category]
): string => {
  const routingKeys = ROUTING_KEYS[category];
  return routingKeys[key as keyof typeof routingKeys];
};

/**
 * Helper function to build exchange name
 */
export const buildExchangeName = (name: string): string => {
  return `exchange.${name}`;
};

/**
 * Helper function to build queue name
 */
export const buildQueueName = (name: string): string => {
  return `queue.${name}`;
};

/**
 * All queue constants for export
 */
export const QUEUE_CONSTANTS = {
  NAMES: QUEUE_NAMES,
  EXCHANGES: EXCHANGE_NAMES,
  ROUTING_KEYS: ROUTING_KEYS,
  CONFIG: QUEUE_CONFIG,
  DLQ: DLQ_CONFIG,
  PRIORITY: QUEUE_PRIORITY,
  EVENTS: QUEUE_EVENTS,
  ERROR_MESSAGES: QUEUE_ERROR_MESSAGES,
  SUCCESS_MESSAGES: QUEUE_SUCCESS_MESSAGES,
} as const;

/**
 * All queue constants for export
 */
export const ALL_QUEUE_CONSTANTS = {
  ...QUEUE_NAMES,
  ...EXCHANGE_NAMES,
  ...ROUTING_KEYS,
  ...QUEUE_CONFIG,
  ...DLQ_CONFIG,
  ...QUEUE_PRIORITY,
  ...QUEUE_EVENTS,
  ...QUEUE_ERROR_MESSAGES,
  ...QUEUE_SUCCESS_MESSAGES,
} as const;
