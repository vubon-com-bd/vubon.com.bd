/**
 * Search & Discovery Queue Constants
 * Contains all queue-related constants for search and discovery management
 */

export const SearchQueue = {
  // Queue names
  NAMES: {
    SEARCH_INDEX: 'search.index',
    RECOMMENDATION_GENERATE: 'recommendation.generate',
    TRENDING_CALCULATE: 'trending.calculate',
    ANALYTICS_PROCESS: 'analytics.process',
    AUTOCOMPLETE_UPDATE: 'autocomplete.update',
    SUGGESTION_UPDATE: 'suggestion.update',
    HISTORY_UPDATE: 'history.update',
    CACHE_REFRESH: 'cache.refresh',
  } as const,

  // Queue types
  QUEUE_TYPE: {
    BULL: 'bull',
    RABBITMQ: 'rabbitmq',
    AWS_SQS: 'aws_sqs',
  } as const,

  // Default delay time in milliseconds
  DEFAULT_DELAY: 1000,

  // Retry count
  RETRY_COUNT: 3,

  // Retry delay in milliseconds
  RETRY_DELAY: 5000,

  // Dead letter exchange
  DEAD_LETTER_EXCHANGE: 'search.dlx',

  // Maximum queue size (messages)
  MAX_QUEUE_SIZE: 10000,

  // Job types
  JOB_TYPES: {
    INDEX_SEARCH: 'index_search',
    GENERATE_RECOMMENDATION: 'generate_recommendation',
    CALCULATE_TRENDING: 'calculate_trending',
    PROCESS_ANALYTICS: 'process_analytics',
    UPDATE_AUTOCOMPLETE: 'update_autocomplete',
    UPDATE_SUGGESTIONS: 'update_suggestions',
    UPDATE_HISTORY: 'update_history',
    REFRESH_CACHE: 'refresh_cache',
  } as const,

  // Job priority levels
  PRIORITY: {
    HIGH: 1,
    MEDIUM: 5,
    LOW: 10,
    VERY_LOW: 20,
  } as const,

  // Job timeout in milliseconds
  TIMEOUT: {
    INDEX_SEARCH: 30000, // 30 seconds
    GENERATE_RECOMMENDATION: 60000, // 1 minute
    CALCULATE_TRENDING: 120000, // 2 minutes
    PROCESS_ANALYTICS: 45000, // 45 seconds
    UPDATE_AUTOCOMPLETE: 30000, // 30 seconds
    UPDATE_SUGGESTIONS: 30000, // 30 seconds
    UPDATE_HISTORY: 15000, // 15 seconds
    REFRESH_CACHE: 30000, // 30 seconds
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
    SEARCH_INDEX: {
      name: 'search.index',
      concurrency: 5,
      priority: 1,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
    },
    RECOMMENDATION_GENERATE: {
      name: 'recommendation.generate',
      concurrency: 2,
      priority: 3,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
    },
    TRENDING_CALCULATE: {
      name: 'trending.calculate',
      concurrency: 1,
      priority: 5,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 10000,
      },
    },
    ANALYTICS_PROCESS: {
      name: 'analytics.process',
      concurrency: 3,
      priority: 5,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 3000,
      },
    },
  } as const,
} as const;

// Helper types for queue configuration
export type SearchQueueName = (typeof SearchQueue.NAMES)[keyof typeof SearchQueue.NAMES];
export type SearchQueueEvent = (typeof SearchQueue.EVENTS)[keyof typeof SearchQueue.EVENTS];
export type SearchJobType = (typeof SearchQueue.JOB_TYPES)[keyof typeof SearchQueue.JOB_TYPES];

// Queue configuration builder
export const SearchQueueConfig = {
  createJobConfig: (jobType: SearchJobType) => ({
    attempts: SearchQueue.RETRY_COUNT,
    backoff: {
      type: 'exponential' as const,
      delay: SearchQueue.RETRY_DELAY,
    },
    timeout:
      SearchQueue.TIMEOUT[jobType.toUpperCase() as keyof typeof SearchQueue.TIMEOUT] || 30000,
    delay: SearchQueue.DEFAULT_DELAY,
    priority: SearchQueue.PRIORITY.MEDIUM,
    removeOnComplete: true,
    removeOnFail: false,
    deadLetterExchange: SearchQueue.DEAD_LETTER_EXCHANGE,
  }),
  getConcurrency: (type: 'default' | 'high' | 'low' | 'minimal' = 'default'): number => {
    return SearchQueue.CONCURRENCY[type.toUpperCase() as keyof typeof SearchQueue.CONCURRENCY] || 5;
  },
  getMaxQueueSize: (): number => {
    return SearchQueue.MAX_QUEUE_SIZE;
  },
} as const;
