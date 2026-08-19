/**
 * Vendor Queue Constants
 * Contains all queue-related constants for vendor management
 */

export const VendorQueue = {
  // Queue names
  NAMES: {
    VENDOR_APPROVAL: 'vendor.approval',
    VENDOR_PAYOUT: 'vendor.payout',
    VENDOR_NOTIFICATION: 'vendor.notification',
    VENDOR_ANALYTICS: 'vendor.analytics',
    VENDOR_REPORT: 'vendor.report',
    VENDOR_SUBSCRIPTION: 'vendor.subscription',
    VENDOR_VERIFICATION: 'vendor.verification',
    VENDOR_DOCUMENT: 'vendor.document',
  } as const,

  // Queue types
  QUEUE_TYPE: {
    BULL: 'bull',
    RABBITMQ: 'rabbitmq',
    AWS_SQS: 'aws_sqs',
  } as const,

  // Routing keys
  ROUTING_KEY: {
    VENDOR_APPROVAL: 'vendor.approval',
    VENDOR_PAYOUT: 'vendor.payout',
    VENDOR_NOTIFICATION: 'vendor.notification',
    VENDOR_ANALYTICS: 'vendor.analytics',
    VENDOR_REPORT: 'vendor.report',
    VENDOR_SUBSCRIPTION: 'vendor.subscription',
    VENDOR_VERIFICATION: 'vendor.verification',
    VENDOR_DOCUMENT: 'vendor.document',
  } as const,

  // Retry policy
  RETRY_POLICY: {
    MAX_RETRIES: 3,
    RETRY_DELAY: 60, // seconds
    BACKOFF: {
      TYPE: 'exponential',
      DELAY: 60,
      FACTOR: 2,
    } as const,
  } as const,

  // Delivery modes
  DELIVERY_MODE: {
    PERSISTENT: 'persistent',
    NON_PERSISTENT: 'non_persistent',
  } as const,

  // Queue priority levels
  PRIORITY: {
    HIGH: 1,
    NORMAL: 5,
    LOW: 10,
  } as const,

  // Dead letter exchange
  DEAD_LETTER_EXCHANGE: 'vendor.dlx',

  // Message TTL in seconds
  MESSAGE_TTL: 86400, // 24 hours

  // Job types
  JOB_TYPES: {
    APPROVE_VENDOR: 'approve_vendor',
    PROCESS_PAYOUT: 'process_payout',
    SEND_NOTIFICATION: 'send_notification',
    PROCESS_ANALYTICS: 'process_analytics',
    GENERATE_REPORT: 'generate_report',
    PROCESS_SUBSCRIPTION: 'process_subscription',
    VERIFY_VENDOR: 'verify_vendor',
    PROCESS_DOCUMENT: 'process_document',
    UPDATE_STATUS: 'update_status',
    SYNC_DATA: 'sync_data',
  } as const,

  // Job timeout in milliseconds
  TIMEOUT: {
    APPROVE_VENDOR: 30000, // 30 seconds
    PROCESS_PAYOUT: 60000, // 1 minute
    SEND_NOTIFICATION: 15000, // 15 seconds
    PROCESS_ANALYTICS: 45000, // 45 seconds
    GENERATE_REPORT: 120000, // 2 minutes
    PROCESS_SUBSCRIPTION: 30000, // 30 seconds
    VERIFY_VENDOR: 60000, // 1 minute
    PROCESS_DOCUMENT: 30000, // 30 seconds
    UPDATE_STATUS: 20000, // 20 seconds
    SYNC_DATA: 90000, // 1.5 minutes
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
    DEAD_LETTER: 'dead_letter',
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
    VENDOR_APPROVAL: {
      name: 'vendor.approval',
      concurrency: 2,
      priority: 1,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 60000,
      },
    },
    VENDOR_PAYOUT: {
      name: 'vendor.payout',
      concurrency: 1,
      priority: 1,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 60000,
      },
    },
    VENDOR_NOTIFICATION: {
      name: 'vendor.notification',
      concurrency: 5,
      priority: 5,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 30000,
      },
    },
    VENDOR_ANALYTICS: {
      name: 'vendor.analytics',
      concurrency: 2,
      priority: 10,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 60000,
      },
    },
    VENDOR_REPORT: {
      name: 'vendor.report',
      concurrency: 1,
      priority: 10,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 120000,
      },
    },
    VENDOR_SUBSCRIPTION: {
      name: 'vendor.subscription',
      concurrency: 2,
      priority: 3,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 30000,
      },
    },
  } as const,
} as const;

// Helper types for queue configuration
export type VendorQueueName = (typeof VendorQueue.NAMES)[keyof typeof VendorQueue.NAMES];
export type VendorQueueEvent = (typeof VendorQueue.EVENTS)[keyof typeof VendorQueue.EVENTS];
export type VendorJobType = (typeof VendorQueue.JOB_TYPES)[keyof typeof VendorQueue.JOB_TYPES];

// Queue configuration builder
export const VendorQueueConfig = {
  createJobConfig: (jobType: VendorJobType) => ({
    attempts: VendorQueue.RETRY_POLICY.MAX_RETRIES,
    backoff: VendorQueue.RETRY_POLICY.BACKOFF,
    timeout:
      VendorQueue.TIMEOUT[jobType.toUpperCase() as keyof typeof VendorQueue.TIMEOUT] || 30000,
    delay: 0,
    priority: VendorQueue.PRIORITY.NORMAL,
    removeOnComplete: true,
    removeOnFail: false,
    deadLetterExchange: VendorQueue.DEAD_LETTER_EXCHANGE,
    messageTTL: VendorQueue.MESSAGE_TTL * 1000,
  }),
  getConcurrency: (type: 'default' | 'high' | 'low' | 'minimal' = 'default'): number => {
    return VendorQueue.CONCURRENCY[type.toUpperCase() as keyof typeof VendorQueue.CONCURRENCY] || 5;
  },
  getRoutingKey: (queueName: VendorQueueName): string => {
    const keyMap: Record<VendorQueueName, string> = {
      [VendorQueue.NAMES.VENDOR_APPROVAL]: VendorQueue.ROUTING_KEY.VENDOR_APPROVAL,
      [VendorQueue.NAMES.VENDOR_PAYOUT]: VendorQueue.ROUTING_KEY.VENDOR_PAYOUT,
      [VendorQueue.NAMES.VENDOR_NOTIFICATION]: VendorQueue.ROUTING_KEY.VENDOR_NOTIFICATION,
      [VendorQueue.NAMES.VENDOR_ANALYTICS]: VendorQueue.ROUTING_KEY.VENDOR_ANALYTICS,
      [VendorQueue.NAMES.VENDOR_REPORT]: VendorQueue.ROUTING_KEY.VENDOR_REPORT,
      [VendorQueue.NAMES.VENDOR_SUBSCRIPTION]: VendorQueue.ROUTING_KEY.VENDOR_SUBSCRIPTION,
      [VendorQueue.NAMES.VENDOR_VERIFICATION]: VendorQueue.ROUTING_KEY.VENDOR_VERIFICATION,
      [VendorQueue.NAMES.VENDOR_DOCUMENT]: VendorQueue.ROUTING_KEY.VENDOR_DOCUMENT,
    };
    return keyMap[queueName] || queueName;
  },
} as const;
