/**
 * SEO & AI Queue Constants
 * Contains all queue-related constants for SEO and AI management
 */

export const SeoAiQueue = {
  // Queue names
  NAMES: {
    AI_TRAINING: 'ai.training',
    AI_RECOMMENDATION: 'ai.recommendation',
    SEO_AUDIT: 'seo.audit',
    SEO_CONTENT: 'seo.content',
    ANALYTICS: 'analytics.process',
    KEYWORD_ANALYSIS: 'keyword.analysis',
    CONTENT_GENERATION: 'content.generation',
    MODEL_DEPLOYMENT: 'model.deployment',
    DATA_PROCESSING: 'data.processing',
    REPORT_GENERATION: 'report.generation',
  } as const,

  // Queue types
  QUEUE_TYPE: {
    BULL: 'bull',
    RABBITMQ: 'rabbitmq',
    AWS_SQS: 'aws_sqs',
  } as const,

  // Priority levels
  PRIORITY: {
    HIGH: 1,
    MEDIUM: 5,
    LOW: 10,
    VERY_LOW: 20,
  } as const,

  // Retry configuration
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 60000, // 60 seconds
    BACKOFF: {
      TYPE: 'exponential',
      DELAY: 60000,
      FACTOR: 2,
    } as const,
  } as const,

  // Job status
  JOB_STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    DELAYED: 'delayed',
    STALLED: 'stalled',
  } as const,

  // Job types
  JOB_TYPES: {
    TRAIN_MODEL: 'train_model',
    GENERATE_RECOMMENDATION: 'generate_recommendation',
    PERFORM_AUDIT: 'perform_audit',
    GENERATE_CONTENT: 'generate_content',
    ANALYZE_KEYWORDS: 'analyze_keywords',
    DEPLOY_MODEL: 'deploy_model',
    PROCESS_DATA: 'process_data',
    GENERATE_REPORT: 'generate_report',
    OPTIMIZE_CONTENT: 'optimize_content',
    CRAWL_WEBSITE: 'crawl_website',
  } as const,

  // Job timeout in milliseconds
  TIMEOUT: {
    TRAIN_MODEL: 3600000, // 1 hour
    GENERATE_RECOMMENDATION: 30000, // 30 seconds
    PERFORM_AUDIT: 600000, // 10 minutes
    GENERATE_CONTENT: 120000, // 2 minutes
    ANALYZE_KEYWORDS: 90000, // 1.5 minutes
    DEPLOY_MODEL: 180000, // 3 minutes
    PROCESS_DATA: 300000, // 5 minutes
    GENERATE_REPORT: 600000, // 10 minutes
    OPTIMIZE_CONTENT: 180000, // 3 minutes
    CRAWL_WEBSITE: 300000, // 5 minutes
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

  // Delivery modes
  DELIVERY_MODE: {
    PERSISTENT: 'persistent',
    NON_PERSISTENT: 'non_persistent',
  } as const,

  // Dead letter queue configuration
  DEAD_LETTER_QUEUE_CONFIG: {
    EXCHANGE: 'seo-ai.dlx',
    ROUTING_KEY: 'seo-ai.dlq',
    TTL: 86400000, // 24 hours
    MAX_RETRIES: 3,
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

  // Queue configuration
  CONFIG: {
    AI_TRAINING: {
      name: 'ai.training',
      concurrency: 1,
      priority: 1,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 60000,
      },
    },
    AI_RECOMMENDATION: {
      name: 'ai.recommendation',
      concurrency: 5,
      priority: 3,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 30000,
      },
    },
    SEO_AUDIT: {
      name: 'seo.audit',
      concurrency: 2,
      priority: 5,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 60000,
      },
    },
    SEO_CONTENT: {
      name: 'seo.content',
      concurrency: 3,
      priority: 5,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 30000,
      },
    },
  } as const,
} as const;

// Helper types for queue configuration
export type SeoAiQueueName = (typeof SeoAiQueue.NAMES)[keyof typeof SeoAiQueue.NAMES];
export type SeoAiQueueEvent = (typeof SeoAiQueue.EVENTS)[keyof typeof SeoAiQueue.EVENTS];
export type SeoAiJobType = (typeof SeoAiQueue.JOB_TYPES)[keyof typeof SeoAiQueue.JOB_TYPES];
export type SeoAiJobStatus = (typeof SeoAiQueue.JOB_STATUS)[keyof typeof SeoAiQueue.JOB_STATUS];

// Queue configuration builder
export const SeoAiQueueConfig = {
  createJobConfig: (jobType: SeoAiJobType) => ({
    attempts: SeoAiQueue.RETRY.MAX_ATTEMPTS,
    backoff: SeoAiQueue.RETRY.BACKOFF,
    timeout: SeoAiQueue.TIMEOUT[jobType.toUpperCase() as keyof typeof SeoAiQueue.TIMEOUT] || 30000,
    delay: 0,
    priority: SeoAiQueue.PRIORITY.MEDIUM,
    removeOnComplete: true,
    removeOnFail: false,
    deadLetterExchange: SeoAiQueue.DEAD_LETTER_QUEUE_CONFIG.EXCHANGE,
    deadLetterRoutingKey: SeoAiQueue.DEAD_LETTER_QUEUE_CONFIG.ROUTING_KEY,
    messageTTL: SeoAiQueue.DEAD_LETTER_QUEUE_CONFIG.TTL,
  }),
  getConcurrency: (type: 'default' | 'high' | 'low' | 'minimal' = 'default'): number => {
    return SeoAiQueue.CONCURRENCY[type.toUpperCase() as keyof typeof SeoAiQueue.CONCURRENCY] || 5;
  },
  getBatchSize: (): number => {
    return SeoAiQueue.BATCH_SIZE;
  },
  getMaxSize: (): number => {
    return SeoAiQueue.MAX_SIZE;
  },
  getProcessingInterval: (): number => {
    return SeoAiQueue.PROCESSING_INTERVAL;
  },
} as const;
