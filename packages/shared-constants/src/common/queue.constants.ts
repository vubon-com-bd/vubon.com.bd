/**
 * @fileoverview Queue management constants and configurations
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Queue types
 */
export enum QueueType {
  /** First In First Out queue */
  FIFO = 'FIFO',
  /** Priority queue */
  PRIORITY = 'PRIORITY',
  /** Delay queue */
  DELAY = 'DELAY',
  /** Dead letter queue */
  DEAD_LETTER = 'DEAD_LETTER',
  /** Retry queue */
  RETRY = 'RETRY',
  /** Work queue */
  WORK = 'WORK',
  /** Fanout queue */
  FANOUT = 'FANOUT',
  /** Topic queue */
  TOPIC = 'TOPIC',
  /** Direct queue */
  DIRECT = 'DIRECT',
}

/**
 * Queue priority levels
 */
export enum QueuePriority {
  /** Critical priority - highest */
  CRITICAL = 'CRITICAL',
  /** High priority */
  HIGH = 'HIGH',
  /** Medium priority */
  MEDIUM = 'MEDIUM',
  /** Low priority */
  LOW = 'LOW',
  /** Background priority - lowest */
  BACKGROUND = 'BACKGROUND',
}

/**
 * Queue delivery mode
 */
export enum QueueDeliveryMode {
  /** Persistent - messages are stored to disk */
  PERSISTENT = 'PERSISTENT',
  /** Non-persistent - messages are in-memory only */
  NON_PERSISTENT = 'NON_PERSISTENT',
}

/**
 * Queue acknowledgment mode
 */
export enum QueueAckMode {
  /** Auto-acknowledge */
  AUTO = 'AUTO',
  /** Manual acknowledgment */
  MANUAL = 'MANUAL',
  /** Transactional acknowledgment */
  TRANSACTIONAL = 'TRANSACTIONAL',
}

/**
 * Queue exchange types
 */
export enum QueueExchangeType {
  /** Direct exchange - routes to queue based on routing key */
  DIRECT = 'DIRECT',
  /** Topic exchange - routes based on pattern matching */
  TOPIC = 'TOPIC',
  /** Fanout exchange - broadcasts to all queues */
  FANOUT = 'FANOUT',
  /** Headers exchange - routes based on header attributes */
  HEADERS = 'HEADERS',
}

/**
 * Queue retry delay strategies
 */
export enum QueueRetryStrategy {
  /** Exponential backoff delay */
  EXPONENTIAL = 'EXPONENTIAL',
  /** Fixed delay */
  FIXED = 'FIXED',
  /** Linear delay */
  LINEAR = 'LINEAR',
  /** Custom delay */
  CUSTOM = 'CUSTOM',
}

/**
 * Queue configuration
 */
export interface QueueConfig {
  /** Queue name */
  name: string;
  /** Queue type */
  type: QueueType;
  /** Max size */
  maxSize: number;
  /** Max retry count */
  maxRetryCount: number;
  /** Timeout in seconds */
  timeoutSeconds: number;
  /** Priority */
  priority: QueuePriority;
  /** Delivery mode */
  deliveryMode: QueueDeliveryMode;
  /** Acknowledgment mode */
  ackMode: QueueAckMode;
  /** Consumer count */
  consumerCount: number;
  /** Batch size */
  batchSize: number;
  /** Retry strategy */
  retryStrategy: QueueRetryStrategy;
  /** Prefetch count */
  prefetchCount: number;
}

/**
 * Default queue configuration
 */
export const DEFAULT_QUEUE_CONFIG: QueueConfig = {
  name: 'default',
  type: QueueType.FIFO,
  maxSize: 10000,
  maxRetryCount: 3,
  timeoutSeconds: 30,
  priority: QueuePriority.MEDIUM,
  deliveryMode: QueueDeliveryMode.PERSISTENT,
  ackMode: QueueAckMode.AUTO,
  consumerCount: 1,
  batchSize: 100,
  retryStrategy: QueueRetryStrategy.EXPONENTIAL,
  prefetchCount: 10,
};

/**
 * Queue name prefixes
 */
export const QUEUE_NAME_PREFIXES = {
  /** Report generation queue */
  REPORT: 'report:',
  /** Export queue */
  EXPORT: 'export:',
  /** Email queue */
  EMAIL: 'email:',
  /** Notification queue */
  NOTIFICATION: 'notification:',
  /** Schedule queue */
  SCHEDULE: 'schedule:',
  /** Job queue */
  JOB: 'job:',
  /** Event queue */
  EVENT: 'event:',
  /** Dead letter queue */
  DEAD_LETTER: 'dead:',
  /** Retry queue */
  RETRY: 'retry:',
  /** Work queue */
  WORK: 'work:',
  /** Default queue */
  DEFAULT: 'default:',
} as const;

/**
 * Queue dead letter settings
 */
export interface QueueDeadLetterSettings {
  /** Enable dead letter queue */
  enableDeadLetter: boolean;
  /** Dead letter queue name */
  deadLetterQueueName: string;
  /** Max retries before dead letter */
  maxRetriesBeforeDeadLetter: number;
  /** Dead letter TTL in seconds */
  deadLetterTTLSeconds: number;
}

export const DEFAULT_QUEUE_DEAD_LETTER_SETTINGS: QueueDeadLetterSettings = {
  enableDeadLetter: true,
  deadLetterQueueName: 'dead-letter-queue',
  maxRetriesBeforeDeadLetter: 5,
  deadLetterTTLSeconds: 86400, // 24 hours
};

/**
 * Queue consumer settings
 */
export interface QueueConsumerSettings {
  /** Consumer count */
  consumerCount: number;
  /** Prefetch count */
  prefetchCount: number;
  /** Consumer timeout in seconds */
  consumerTimeoutSeconds: number;
  /** Auto-acknowledge */
  autoAck: boolean;
  /** Exclusive consumer */
  exclusive: boolean;
  /** Consumer tag */
  consumerTag?: string;
}

export const DEFAULT_QUEUE_CONSUMER_SETTINGS: QueueConsumerSettings = {
  consumerCount: 1,
  prefetchCount: 10,
  consumerTimeoutSeconds: 30,
  autoAck: true,
  exclusive: false,
};

/**
 * Queue sharding settings
 */
export interface QueueShardingSettings {
  /** Enable sharding */
  enableSharding: boolean;
  /** Shard count */
  shardCount: number;
  /** Shard key */
  shardKey: string;
  /** Sharding strategy */
  strategy: 'HASH' | 'RANGE' | 'ROUND_ROBIN' | 'CUSTOM';
}

export const DEFAULT_QUEUE_SHARDING_SETTINGS: QueueShardingSettings = {
  enableSharding: false,
  shardCount: 1,
  shardKey: 'id',
  strategy: 'HASH',
};

/**
 * Queue partitioning settings
 */
export interface QueuePartitioningSettings {
  /** Enable partitioning */
  enablePartitioning: boolean;
  /** Partition count */
  partitionCount: number;
  /** Partition key */
  partitionKey: string;
  /** Partition strategy */
  strategy: 'HASH' | 'RANGE' | 'ROUND_ROBIN' | 'CUSTOM';
}

export const DEFAULT_QUEUE_PARTITIONING_SETTINGS: QueuePartitioningSettings = {
  enablePartitioning: false,
  partitionCount: 1,
  partitionKey: 'id',
  strategy: 'HASH',
};

/**
 * Queue replication settings
 */
export interface QueueReplicationSettings {
  /** Enable replication */
  enableReplication: boolean;
  /** Replica count */
  replicaCount: number;
  /** Replication factor */
  replicationFactor: number;
  /** Sync strategy */
  syncStrategy: 'SYNC' | 'ASYNC' | 'SEMI_SYNC';
}

export const DEFAULT_QUEUE_REPLICATION_SETTINGS: QueueReplicationSettings = {
  enableReplication: false,
  replicaCount: 1,
  replicationFactor: 1,
  syncStrategy: 'ASYNC',
};

/**
 * Queue clustering settings
 */
export interface QueueClusteringSettings {
  /** Enable clustering */
  enableClustering: boolean;
  /** Cluster size */
  clusterSize: number;
  /** Cluster strategy */
  strategy: 'STANDALONE' | 'CLUSTER' | 'SENTINEL';
  /** Auto-discovery */
  enableAutoDiscovery: boolean;
  /** Heartbeat interval in seconds */
  heartbeatIntervalSeconds: number;
}

export const DEFAULT_QUEUE_CLUSTERING_SETTINGS: QueueClusteringSettings = {
  enableClustering: false,
  clusterSize: 1,
  strategy: 'STANDALONE',
  enableAutoDiscovery: true,
  heartbeatIntervalSeconds: 5,
};

/**
 * Queue monitoring settings
 */
export interface QueueMonitoringSettings {
  /** Enable monitoring */
  enableMonitoring: boolean;
  /** Collect metrics */
  collectMetrics: boolean;
  /** Collect queue size */
  collectQueueSize: boolean;
  /** Collect throughput */
  collectThroughput: boolean;
  /** Collect latency */
  collectLatency: boolean;
  /** Collect error count */
  collectErrorCount: boolean;
  /** Metrics retention in seconds */
  metricsRetentionSeconds: number;
}

export const DEFAULT_QUEUE_MONITORING_SETTINGS: QueueMonitoringSettings = {
  enableMonitoring: true,
  collectMetrics: true,
  collectQueueSize: true,
  collectThroughput: true,
  collectLatency: true,
  collectErrorCount: true,
  metricsRetentionSeconds: 3600,
};

/**
 * Queue alert thresholds
 */
export interface QueueAlertThresholds {
  /** Queue size threshold */
  queueSizeThreshold: number;
  /** Latency threshold in milliseconds */
  latencyThresholdMs: number;
  /** Error rate threshold (percentage) */
  errorRateThreshold: number;
  /** Consumer utilization threshold (percentage) */
  consumerUtilizationThreshold: number;
  /** Rejected message threshold */
  rejectedMessageThreshold: number;
}

export const DEFAULT_QUEUE_ALERT_THRESHOLDS: QueueAlertThresholds = {
  queueSizeThreshold: 1000,
  latencyThresholdMs: 100,
  errorRateThreshold: 5,
  consumerUtilizationThreshold: 80,
  rejectedMessageThreshold: 100,
};

/**
 * Queue metrics collection settings
 */
export interface QueueMetricsCollectionSettings {
  /** Enable collection */
  enableCollection: boolean;
  /** Collection interval in seconds */
  collectionIntervalSeconds: number;
  /** Metrics to collect */
  metrics: (
    | 'QUEUE_SIZE'
    | 'ENQUEUE_RATE'
    | 'DEQUEUE_RATE'
    | 'PROCESSING_TIME'
    | 'WAIT_TIME'
    | 'ERROR_COUNT'
    | 'RETRY_COUNT'
    | 'DEAD_LETTER_COUNT'
    | 'CONSUMER_COUNT'
    | 'UTILIZATION'
  )[];
  /** Export metrics */
  exportMetrics: boolean;
  /** Metrics export format */
  exportFormat: 'PROMETHEUS' | 'STATSD' | 'JSON' | 'CSV';
}

export const DEFAULT_QUEUE_METRICS_COLLECTION: QueueMetricsCollectionSettings = {
  enableCollection: true,
  collectionIntervalSeconds: 60,
  metrics: ['QUEUE_SIZE', 'ENQUEUE_RATE', 'DEQUEUE_RATE', 'PROCESSING_TIME', 'ERROR_COUNT'],
  exportMetrics: false,
  exportFormat: 'JSON',
};

/**
 * Queue circuit breaker settings
 */
export interface QueueCircuitBreakerSettings {
  /** Enable circuit breaker */
  enableCircuitBreaker: boolean;
  /** Failure threshold (percentage) */
  failureThreshold: number;
  /** Success threshold (percentage) */
  successThreshold: number;
  /** Timeout in seconds */
  timeoutSeconds: number;
  /** Half-open attempts */
  halfOpenAttempts: number;
  /** Wait duration in seconds */
  waitDurationSeconds: number;
}

export const DEFAULT_QUEUE_CIRCUIT_BREAKER_SETTINGS: QueueCircuitBreakerSettings = {
  enableCircuitBreaker: true,
  failureThreshold: 50,
  successThreshold: 50,
  timeoutSeconds: 30,
  halfOpenAttempts: 3,
  waitDurationSeconds: 60,
};

/**
 * Queue bulkhead settings
 */
export interface QueueBulkheadSettings {
  /** Enable bulkhead */
  enableBulkhead: boolean;
  /** Max concurrent calls */
  maxConcurrentCalls: number;
  /** Max wait time in milliseconds */
  maxWaitTimeMs: number;
  /** Queue size for bulkhead */
  queueSize: number;
}

export const DEFAULT_QUEUE_BULKHEAD_SETTINGS: QueueBulkheadSettings = {
  enableBulkhead: true,
  maxConcurrentCalls: 10,
  maxWaitTimeMs: 100,
  queueSize: 20,
};

/**
 * Queue rate limiter settings
 */
export interface QueueRateLimiterSettings {
  /** Enable rate limiter */
  enableRateLimiter: boolean;
  /** Max requests per second */
  maxRequestsPerSecond: number;
  /** Max requests per minute */
  maxRequestsPerMinute: number;
  /** Rate limiter strategy */
  strategy: 'TOKEN_BUCKET' | 'LEAKY_BUCKET' | 'FIXED_WINDOW' | 'SLIDING_WINDOW';
}

export const DEFAULT_QUEUE_RATE_LIMITER_SETTINGS: QueueRateLimiterSettings = {
  enableRateLimiter: false,
  maxRequestsPerSecond: 10,
  maxRequestsPerMinute: 600,
  strategy: 'TOKEN_BUCKET',
};

/**
 * Queue throttling settings
 */
export interface QueueThrottlingSettings {
  /** Enable throttling */
  enableThrottling: boolean;
  /** Throttle rate */
  throttleRate: number;
  /** Throttle interval in seconds */
  throttleIntervalSeconds: number;
  /** Throttle strategy */
  strategy: 'FIXED_WINDOW' | 'SLIDING_WINDOW' | 'TOKEN_BUCKET';
}

export const DEFAULT_QUEUE_THROTTLING_SETTINGS: QueueThrottlingSettings = {
  enableThrottling: false,
  throttleRate: 10,
  throttleIntervalSeconds: 60,
  strategy: 'FIXED_WINDOW',
};

/**
 * Queue routing settings
 */
export interface QueueRoutingSettings {
  /** Routing key */
  routingKey: string;
  /** Exchange name */
  exchangeName: string;
  /** Exchange type */
  exchangeType: QueueExchangeType;
  /** Binding keys */
  bindingKeys: string[];
  /** Headers */
  headers: Record<string, string>;
}

export const DEFAULT_QUEUE_ROUTING_SETTINGS: QueueRoutingSettings = {
  routingKey: 'default',
  exchangeName: 'default-exchange',
  exchangeType: QueueExchangeType.DIRECT,
  bindingKeys: ['default'],
  headers: {},
};

/**
 * Queue binding settings
 */
export interface QueueBindingSettings {
  /** Queue name */
  queueName: string;
  /** Exchange name */
  exchangeName: string;
  /** Binding keys */
  bindingKeys: string[];
  /** Headers */
  headers: Record<string, string>;
  /** Arguments */
  arguments: Record<string, unknown>;
}

export const DEFAULT_QUEUE_BINDING_SETTINGS: QueueBindingSettings = {
  queueName: 'default',
  exchangeName: 'default-exchange',
  bindingKeys: ['default'],
  headers: {},
  arguments: {},
};

/**
 * Queue deadline settings
 */
export interface QueueDeadlineSettings {
  /** Enable deadlines */
  enableDeadlines: boolean;
  /** Default deadline in seconds */
  defaultDeadlineSeconds: number;
  /** Max deadline in seconds */
  maxDeadlineSeconds: number;
  /** Action on deadline miss */
  actionOnMiss: 'MOVE_TO_DEAD_LETTER' | 'RETRY' | 'REJECT' | 'LOG';
}

export const DEFAULT_QUEUE_DEADLINE_SETTINGS: QueueDeadlineSettings = {
  enableDeadlines: true,
  defaultDeadlineSeconds: 300,
  maxDeadlineSeconds: 3600,
  actionOnMiss: 'MOVE_TO_DEAD_LETTER',
};

/**
 * Queue constants
 */
export const QUEUE_CONSTANTS = {
  /** Default queue max size */
  DEFAULT_MAX_SIZE: 10000,
  /** Default max retry count */
  DEFAULT_MAX_RETRY_COUNT: 3,
  /** Default timeout in seconds */
  DEFAULT_TIMEOUT_SECONDS: 30,
  /** Default batch size */
  DEFAULT_BATCH_SIZE: 100,
  /** Default prefetch count */
  DEFAULT_PREFETCH_COUNT: 10,
  /** Default consumer count */
  DEFAULT_CONSUMER_COUNT: 1,
  /** Default shard count */
  DEFAULT_SHARD_COUNT: 1,
  /** Default partition count */
  DEFAULT_PARTITION_COUNT: 1,
  /** Default replica count */
  DEFAULT_REPLICA_COUNT: 1,
  /** Default cluster size */
  DEFAULT_CLUSTER_SIZE: 1,
  /** Default metrics retention in seconds */
  DEFAULT_METRICS_RETENTION: 3600,
  /** Default collection interval in seconds */
  DEFAULT_COLLECTION_INTERVAL: 60,
  /** Default queue size threshold */
  DEFAULT_QUEUE_SIZE_THRESHOLD: 1000,
  /** Default latency threshold in milliseconds */
  DEFAULT_LATENCY_THRESHOLD_MS: 100,
  /** Default error rate threshold */
  DEFAULT_ERROR_RATE_THRESHOLD: 5,
  /** Default consumer utilization threshold */
  DEFAULT_CONSUMER_UTILIZATION_THRESHOLD: 80,
} as const;

/**
 * Get queue type label
 */
export function getQueueTypeLabel(type: QueueType): string {
  const labels: Record<QueueType, string> = {
    [QueueType.FIFO]: 'FIFO',
    [QueueType.PRIORITY]: 'Priority',
    [QueueType.DELAY]: 'Delay',
    [QueueType.DEAD_LETTER]: 'Dead Letter',
    [QueueType.RETRY]: 'Retry',
    [QueueType.WORK]: 'Work',
    [QueueType.FANOUT]: 'Fanout',
    [QueueType.TOPIC]: 'Topic',
    [QueueType.DIRECT]: 'Direct',
  };
  return labels[type] || type;
}

/**
 * Get queue priority label
 */
export function getQueuePriorityLabel(priority: QueuePriority): string {
  const labels: Record<QueuePriority, string> = {
    [QueuePriority.CRITICAL]: 'Critical',
    [QueuePriority.HIGH]: 'High',
    [QueuePriority.MEDIUM]: 'Medium',
    [QueuePriority.LOW]: 'Low',
    [QueuePriority.BACKGROUND]: 'Background',
  };
  return labels[priority] || priority;
}

/**
 * Get queue delivery mode label
 */
export function getQueueDeliveryModeLabel(mode: QueueDeliveryMode): string {
  const labels: Record<QueueDeliveryMode, string> = {
    [QueueDeliveryMode.PERSISTENT]: 'Persistent',
    [QueueDeliveryMode.NON_PERSISTENT]: 'Non-Persistent',
  };
  return labels[mode] || mode;
}

/**
 * Get queue ack mode label
 */
export function getQueueAckModeLabel(mode: QueueAckMode): string {
  const labels: Record<QueueAckMode, string> = {
    [QueueAckMode.AUTO]: 'Auto',
    [QueueAckMode.MANUAL]: 'Manual',
    [QueueAckMode.TRANSACTIONAL]: 'Transactional',
  };
  return labels[mode] || mode;
}

/**
 * Get queue exchange type label
 */
export function getQueueExchangeTypeLabel(type: QueueExchangeType): string {
  const labels: Record<QueueExchangeType, string> = {
    [QueueExchangeType.DIRECT]: 'Direct',
    [QueueExchangeType.TOPIC]: 'Topic',
    [QueueExchangeType.FANOUT]: 'Fanout',
    [QueueExchangeType.HEADERS]: 'Headers',
  };
  return labels[type] || type;
}

/**
 * Get queue retry strategy label
 */
export function getQueueRetryStrategyLabel(strategy: QueueRetryStrategy): string {
  const labels: Record<QueueRetryStrategy, string> = {
    [QueueRetryStrategy.EXPONENTIAL]: 'Exponential',
    [QueueRetryStrategy.FIXED]: 'Fixed',
    [QueueRetryStrategy.LINEAR]: 'Linear',
    [QueueRetryStrategy.CUSTOM]: 'Custom',
  };
  return labels[strategy] || strategy;
}

/**
 * Build queue name with prefix
 */
export function buildQueueName(prefix: keyof typeof QUEUE_NAME_PREFIXES, name: string): string {
  return `${QUEUE_NAME_PREFIXES[prefix]}${name}`;
}

/**
 * Build queue name from parts
 */
export function buildQueueNameFromParts(
  prefix: keyof typeof QUEUE_NAME_PREFIXES,
  ...parts: string[]
): string {
  return `${QUEUE_NAME_PREFIXES[prefix]}${parts.join('-')}`;
}

/**
 * Get queue priority numeric value
 */
export function getQueuePriorityValue(priority: QueuePriority): number {
  const values: Record<QueuePriority, number> = {
    [QueuePriority.CRITICAL]: 0,
    [QueuePriority.HIGH]: 1,
    [QueuePriority.MEDIUM]: 2,
    [QueuePriority.LOW]: 3,
    [QueuePriority.BACKGROUND]: 4,
  };
  return values[priority] || 2;
}

/**
 * Calculate retry delay based on strategy
 */
export function calculateRetryDelay(
  strategy: QueueRetryStrategy,
  attempt: number,
  baseDelaySeconds: number = 1
): number {
  switch (strategy) {
    case QueueRetryStrategy.EXPONENTIAL:
      return baseDelaySeconds * Math.pow(2, attempt);
    case QueueRetryStrategy.FIXED:
      return baseDelaySeconds;
    case QueueRetryStrategy.LINEAR:
      return baseDelaySeconds * (attempt + 1);
    default:
      return baseDelaySeconds * Math.pow(2, attempt);
  }
}
