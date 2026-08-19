/**
 * Analytics Queue Constants
 * Contains all queue-related constants for analytics management
 */

export const AnalyticsQueue = {
  // Queue types
  QUEUE_TYPE: {
    FIFO: 'fifo',
    PRIORITY: 'priority',
    DELAY: 'delay',
    DEAD_LETTER: 'dead_letter',
    RETRY: 'retry',
  } as const,

  // Queue name prefix
  QUEUE_NAME_PREFIX: 'analytics:',

  // Maximum queue size (messages)
  MAX_SIZE: 10000,

  // Maximum retry count
  MAX_RETRY_COUNT: 3,

  // Queue timeout in milliseconds
  TIMEOUT: 30000,

  // Queue priority levels
  PRIORITY_LEVEL: {
    HIGH: 1,
    MEDIUM: 5,
    LOW: 10,
    BACKGROUND: 20,
  } as const,

  // Dead letter exchange settings
  DEAD_LETTER_EXCHANGE: {
    NAME: 'analytics.dlx',
    TYPE: 'direct',
    ROUTING_KEY: 'analytics.dlq',
    TTL: 86400000, // 24 hours
  } as const,

  // Delivery modes
  DELIVERY_MODE: {
    PERSISTENT: 'persistent',
    NON_PERSISTENT: 'non_persistent',
  } as const,

  // Consumer count
  CONSUMER_COUNT: 5,

  // Batch size
  BATCH_SIZE: 100,

  // Retry delay types
  RETRY_DELAY: {
    EXPONENTIAL: 'exponential',
    FIXED: 'fixed',
    LINEAR: 'linear',
  } as const,

  // Acknowledgment modes
  ACKNOWLEDGMENT_MODE: {
    AUTO: 'auto',
    MANUAL: 'manual',
    TRANSACTIONAL: 'transactional',
  } as const,

  // Prefetch count
  PREFETCH_COUNT: 5,

  // Sharding settings
  SHARDING: {
    ENABLED: false,
    COUNT: 4,
    STRATEGY: {
      HASH: 'hash',
      RANGE: 'range',
      LIST: 'list',
    } as const,
  } as const,

  // Partitioning settings
  PARTITIONING: {
    ENABLED: false,
    COUNT: 4,
    STRATEGY: {
      KEY: 'key',
      HASH: 'hash',
      RANGE: 'range',
    } as const,
  } as const,

  // Monitoring settings
  MONITORING: {
    ENABLED: true,
    INTERVAL: 60, // seconds
    METRICS: {
      QUEUE_SIZE: 'queue_size',
      PROCESSING_TIME: 'processing_time',
      FAILURE_RATE: 'failure_rate',
      THROUGHPUT: 'throughput',
    } as const,
  } as const,

  // Alert thresholds
  ALERT_THRESHOLD: {
    QUEUE_SIZE_HIGH: 0.9, // 90% of max size
    PROCESSING_TIME_HIGH: 10000, // 10 seconds
    FAILURE_RATE_HIGH: 0.1, // 10%
  } as const,

  // Metrics collection settings
  METRICS_COLLECTION: {
    ENABLED: true,
    INTERVAL: 60, // seconds
    PRECISION: 3, // decimal places
  } as const,

  // Circuit breaker settings
  CIRCUIT_BREAKER: {
    ENABLED: true,
    THRESHOLD: 5,
    TIMEOUT: 60000, // 1 minute
    RESET_TIMEOUT: 30000, // 30 seconds
  } as const,

  // Bulkhead settings
  BULKHEAD: {
    ENABLED: true,
    MAX_CONCURRENT: 10,
    MAX_WAIT: 1000, // milliseconds
  } as const,

  // Rate limiter settings
  RATE_LIMITER: {
    ENABLED: true,
    MAX_REQUESTS: 100,
    TIME_WINDOW: 60000, // 1 minute
  } as const,

  // Throttling settings
  THROTTLING: {
    ENABLED: true,
    THRESHOLD: 100,
    TIME_WINDOW: 60000, // 1 minute
  } as const,

  // Routing settings
  ROUTING: {
    STRATEGY: {
      ROUND_ROBIN: 'round_robin',
      RANDOM: 'random',
      HASH: 'hash',
      WEIGHTED: 'weighted',
    } as const,
  } as const,

  // Exchange types
  EXCHANGE_TYPE: {
    DIRECT: 'direct',
    TOPIC: 'topic',
    FANOUT: 'fanout',
    HEADERS: 'headers',
  } as const,

  // Binding settings
  BINDING: {
    AUTO_DELETE: false,
    DURABLE: true,
    EXCLUSIVE: false,
  } as const,

  // Deadline settings
  DEADLINE: {
    ENABLED: true,
    TIMEOUT: 30000, // 30 seconds
  } as const,

  // Queue names
  NAMES: {
    ANALYTICS_PROCESS: 'analytics.process',
    ANALYTICS_AGGREGATE: 'analytics.aggregate',
    ANALYTICS_REPORT: 'analytics.report',
    ANALYTICS_EXPORT: 'analytics.export',
    ANALYTICS_IMPORT: 'analytics.import',
    ANALYTICS_CLEANUP: 'analytics.cleanup',
    ANALYTICS_INSIGHT: 'analytics.insight',
    ANALYTICS_ALERT: 'analytics.alert',
    ANALYTICS_ANOMALY: 'analytics.anomaly',
    ANALYTICS_FORECAST: 'analytics.forecast',
    ANALYTICS_TREND: 'analytics.trend',
    ANALYTICS_DASHBOARD: 'analytics.dashboard',
    ANALYTICS_DATA_SYNC: 'analytics.data.sync',
    ANALYTICS_METRIC_UPDATE: 'analytics.metric.update',
    ANALYTICS_DIMENSION_UPDATE: 'analytics.dimension.update',
  } as const,

  // Job types
  JOB_TYPES: {
    PROCESS_DATA: 'process_data',
    AGGREGATE_DATA: 'aggregate_data',
    GENERATE_REPORT: 'generate_report',
    EXPORT_DATA: 'export_data',
    IMPORT_DATA: 'import_data',
    CLEANUP_DATA: 'cleanup_data',
    GENERATE_INSIGHT: 'generate_insight',
    GENERATE_ALERT: 'generate_alert',
    DETECT_ANOMALY: 'detect_anomaly',
    GENERATE_FORECAST: 'generate_forecast',
    CALCULATE_TREND: 'calculate_trend',
    UPDATE_DASHBOARD: 'update_dashboard',
    SYNC_DATA: 'sync_data',
    UPDATE_METRIC: 'update_metric',
    UPDATE_DIMENSION: 'update_dimension',
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
  } as const,

  // Retry policy
  RETRY_POLICY: {
    MAX_ATTEMPTS: 3,
    RETRY_DELAY: 60000, // 60 seconds
    BACKOFF: {
      type: 'exponential',
      delay: 60000,
      factor: 2,
    } as const,
  } as const,

  // Concurrency settings
  CONCURRENCY: {
    DEFAULT: 5,
    HIGH: 10,
    LOW: 2,
    MINIMAL: 1,
  } as const,

  // Processing interval in milliseconds
  PROCESSING_INTERVAL: 1000,
} as const;

// Helper types for queue configuration
export type AnalyticsQueueName = (typeof AnalyticsQueue.NAMES)[keyof typeof AnalyticsQueue.NAMES];
export type AnalyticsQueueEvent =
  (typeof AnalyticsQueue.EVENTS)[keyof typeof AnalyticsQueue.EVENTS];
export type AnalyticsJobType =
  (typeof AnalyticsQueue.JOB_TYPES)[keyof typeof AnalyticsQueue.JOB_TYPES];
export type AnalyticsExchangeType =
  (typeof AnalyticsQueue.EXCHANGE_TYPE)[keyof typeof AnalyticsQueue.EXCHANGE_TYPE];

// Queue configuration builder
export const AnalyticsQueueConfig = {
  createJobConfig: (_jobType: AnalyticsJobType) => ({
    attempts: AnalyticsQueue.RETRY_POLICY.MAX_ATTEMPTS,
    backoff: AnalyticsQueue.RETRY_POLICY.BACKOFF,
    timeout: AnalyticsQueue.TIMEOUT,
    delay: 0,
    priority: AnalyticsQueue.PRIORITY_LEVEL.MEDIUM,
    removeOnComplete: true,
    removeOnFail: false,
    deadLetterExchange: AnalyticsQueue.DEAD_LETTER_EXCHANGE.NAME,
    deadLetterRoutingKey: AnalyticsQueue.DEAD_LETTER_EXCHANGE.ROUTING_KEY,
    messageTTL: AnalyticsQueue.DEAD_LETTER_EXCHANGE.TTL,
  }),
  getConcurrency: (type: 'default' | 'high' | 'low' | 'minimal' = 'default'): number => {
    return (
      AnalyticsQueue.CONCURRENCY[type.toUpperCase() as keyof typeof AnalyticsQueue.CONCURRENCY] || 5
    );
  },
  getPrefetchCount: (): number => AnalyticsQueue.PREFETCH_COUNT,
  getBatchSize: (): number => AnalyticsQueue.BATCH_SIZE,
  getMaxSize: (): number => AnalyticsQueue.MAX_SIZE,
  getProcessingInterval: (): number => AnalyticsQueue.PROCESSING_INTERVAL,
  getExchangeType: (type: keyof typeof AnalyticsQueue.EXCHANGE_TYPE): AnalyticsExchangeType => {
    return AnalyticsQueue.EXCHANGE_TYPE[type];
  },
} as const;
