/**
 * Logistics Queue Constants
 * Contains all queue-related constants for logistics management
 */

export const LogisticsQueue = {
  // Queue names
  NAMES: {
    SHIPMENT_QUEUE: 'shipment-queue',
    DELIVERY_QUEUE: 'delivery-queue',
    TRACKING_QUEUE: 'tracking-queue',
    CARRIER_QUEUE: 'carrier-queue',
    ROUTE_QUEUE: 'route-queue',
    INVENTORY_QUEUE: 'inventory-queue',
    WAREHOUSE_QUEUE: 'warehouse-queue',
    NOTIFICATION_QUEUE: 'notification-queue',
    REPORT_QUEUE: 'report-queue',
    ANALYTICS_QUEUE: 'analytics-queue',
  } as const,

  // Queue types
  QUEUE_TYPE: {
    BULL: 'bull',
    RABBITMQ: 'rabbitmq',
    AWS_SQS: 'aws_sqs',
  } as const,

  // Default retry count
  DEFAULT_RETRY_COUNT: 3,

  // Default timeout in milliseconds
  DEFAULT_TIMEOUT: 30000,

  // Maximum message size in bytes
  MAX_MESSAGE_SIZE: 1048576, // 1MB

  // Exchange types
  EXCHANGE_TYPE: {
    DIRECT: 'direct',
    TOPIC: 'topic',
    FANOUT: 'fanout',
    HEADERS: 'headers',
  } as const,

  // Job types
  JOB_TYPES: {
    CREATE_SHIPMENT: 'create_shipment',
    UPDATE_SHIPMENT: 'update_shipment',
    PROCESS_DELIVERY: 'process_delivery',
    TRACK_SHIPMENT: 'track_shipment',
    UPDATE_CARRIER: 'update_carrier',
    CALCULATE_ROUTE: 'calculate_route',
    UPDATE_INVENTORY: 'update_inventory',
    MANAGE_WAREHOUSE: 'manage_warehouse',
    SEND_NOTIFICATION: 'send_notification',
    GENERATE_REPORT: 'generate_report',
    PROCESS_ANALYTICS: 'process_analytics',
    CANCEL_SHIPMENT: 'cancel_shipment',
    RETURN_SHIPMENT: 'return_shipment',
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
  DEAD_LETTER_EXCHANGE: 'logistics.dlx',

  // Message TTL in milliseconds
  MESSAGE_TTL: 86400000, // 24 hours

  // Job timeout in milliseconds (matching JOB_TYPES keys)
  TIMEOUT: {
    CREATE_SHIPMENT: 60000, // 1 minute
    UPDATE_SHIPMENT: 45000, // 45 seconds
    PROCESS_DELIVERY: 90000, // 1.5 minutes
    TRACK_SHIPMENT: 30000, // 30 seconds
    UPDATE_CARRIER: 30000, // 30 seconds
    CALCULATE_ROUTE: 120000, // 2 minutes
    UPDATE_INVENTORY: 20000, // 20 seconds
    MANAGE_WAREHOUSE: 60000, // 1 minute
    SEND_NOTIFICATION: 15000, // 15 seconds
    GENERATE_REPORT: 180000, // 3 minutes
    PROCESS_ANALYTICS: 60000, // 1 minute
    CANCEL_SHIPMENT: 30000, // 30 seconds
    RETURN_SHIPMENT: 60000, // 1 minute
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
    SHIPMENT_QUEUE: {
      name: 'shipment-queue',
      concurrency: 3,
      priority: 1,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 60000,
      },
    },
    DELIVERY_QUEUE: {
      name: 'delivery-queue',
      concurrency: 2,
      priority: 1,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 60000,
      },
    },
    TRACKING_QUEUE: {
      name: 'tracking-queue',
      concurrency: 5,
      priority: 3,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 30000,
      },
    },
    CARRIER_QUEUE: {
      name: 'carrier-queue',
      concurrency: 2,
      priority: 5,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 60000,
      },
    },
    ROUTE_QUEUE: {
      name: 'route-queue',
      concurrency: 1,
      priority: 5,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 120000,
      },
    },
  } as const,
} as const;

// Helper types for queue configuration
export type LogisticsQueueName = (typeof LogisticsQueue.NAMES)[keyof typeof LogisticsQueue.NAMES];
export type LogisticsQueueEvent =
  (typeof LogisticsQueue.EVENTS)[keyof typeof LogisticsQueue.EVENTS];
export type LogisticsJobType =
  (typeof LogisticsQueue.JOB_TYPES)[keyof typeof LogisticsQueue.JOB_TYPES];
export type LogisticsExchangeType =
  (typeof LogisticsQueue.EXCHANGE_TYPE)[keyof typeof LogisticsQueue.EXCHANGE_TYPE];

// Queue configuration builder
export const LogisticsQueueConfig = {
  createJobConfig: (jobType: LogisticsJobType) => ({
    attempts: LogisticsQueue.RETRY_POLICY.MAX_ATTEMPTS,
    backoff: LogisticsQueue.RETRY_POLICY.BACKOFF,
    timeout:
      LogisticsQueue.TIMEOUT[jobType.toUpperCase() as keyof typeof LogisticsQueue.TIMEOUT] ||
      LogisticsQueue.DEFAULT_TIMEOUT,
    delay: 0,
    priority: LogisticsQueue.PRIORITY.NORMAL,
    removeOnComplete: true,
    removeOnFail: false,
    deadLetterExchange: LogisticsQueue.DEAD_LETTER_EXCHANGE,
    messageTTL: LogisticsQueue.MESSAGE_TTL,
  }),
  getConcurrency: (type: 'default' | 'high' | 'low' | 'minimal' = 'default'): number => {
    return (
      LogisticsQueue.CONCURRENCY[type.toUpperCase() as keyof typeof LogisticsQueue.CONCURRENCY] || 5
    );
  },
  getMaxMessageSize: (): number => {
    return LogisticsQueue.MAX_MESSAGE_SIZE;
  },
  getExchangeType: (type: keyof typeof LogisticsQueue.EXCHANGE_TYPE): LogisticsExchangeType => {
    return LogisticsQueue.EXCHANGE_TYPE[type];
  },
} as const;
