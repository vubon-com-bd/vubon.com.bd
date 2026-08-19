/**
 * Support Queue Constants
 * Contains all queue-related constants for support management
 */

export const SupportQueue = {
  // Queue names
  NAMES: {
    TICKET_QUEUE: 'ticket-queue',
    EMAIL_QUEUE: 'email-queue',
    SMS_QUEUE: 'sms-queue',
    PUSH_QUEUE: 'push-queue',
    ANALYTICS_QUEUE: 'analytics-queue',
    REPORT_QUEUE: 'report-queue',
    ESCALATION_QUEUE: 'escalation-queue',
    AUTOMATION_QUEUE: 'automation-queue',
    FEEDBACK_QUEUE: 'feedback-queue',
    SURVEY_QUEUE: 'survey-queue',
    CHATBOT_QUEUE: 'chatbot-queue',
    KNOWLEDGE_QUEUE: 'knowledge-queue',
  } as const,

  // Queue types
  QUEUE_TYPE: {
    BULL: 'bull',
    RABBITMQ: 'rabbitmq',
    AWS_SQS: 'aws_sqs',
  } as const,

  // Queue priority levels
  PRIORITY: {
    HIGH: 1,
    MEDIUM: 5,
    LOW: 10,
    VERY_LOW: 20,
  } as const,

  // Retry limit
  RETRY_LIMIT: 3,

  // Default timeout in milliseconds
  DEFAULT_TIMEOUT: 30000,

  // Batch size for processing
  BATCH_SIZE: 100,

  // Maximum queue size (messages)
  MAX_SIZE: 10000,

  // Processing interval in milliseconds
  PROCESSING_INTERVAL: 1000,

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

  // Job types
  JOB_TYPES: {
    CREATE_TICKET: 'create_ticket',
    UPDATE_TICKET: 'update_ticket',
    ASSIGN_TICKET: 'assign_ticket',
    CLOSE_TICKET: 'close_ticket',
    ESCALATE_TICKET: 'escalate_ticket',
    SEND_EMAIL: 'send_email',
    SEND_SMS: 'send_sms',
    SEND_PUSH: 'send_push',
    PROCESS_ANALYTICS: 'process_analytics',
    GENERATE_REPORT: 'generate_report',
    PROCESS_FEEDBACK: 'process_feedback',
    PROCESS_SURVEY: 'process_survey',
    CHATBOT_RESPONSE: 'chatbot_response',
    UPDATE_KNOWLEDGE_BASE: 'update_knowledge_base',
    AUTO_RESPOND: 'auto_respond',
    SLA_CHECK: 'sla_check',
    NOTIFY_TEAM: 'notify_team',
    SYNC_TICKET: 'sync_ticket',
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

  // Dead letter queue configuration
  DEAD_LETTER_QUEUE_CONFIG: {
    EXCHANGE: 'support.dlx',
    ROUTING_KEY: 'support.dlq',
    TTL: 86400000, // 24 hours
    MAX_RETRIES: 3,
  } as const,

  // Error handling
  ERROR_HANDLING: {
    RETRY_ON_ERROR: true,
    LOG_ERRORS: true,
    NOTIFY_ON_ERROR: true,
    MAX_ERROR_COUNT: 3,
  } as const,

  // Job timeout in milliseconds
  TIMEOUT: {
    CREATE_TICKET: 30000, // 30 seconds
    UPDATE_TICKET: 20000, // 20 seconds
    ASSIGN_TICKET: 15000, // 15 seconds
    CLOSE_TICKET: 15000, // 15 seconds
    ESCALATE_TICKET: 30000, // 30 seconds
    SEND_EMAIL: 30000, // 30 seconds
    SEND_SMS: 15000, // 15 seconds
    SEND_PUSH: 15000, // 15 seconds
    PROCESS_ANALYTICS: 60000, // 1 minute
    GENERATE_REPORT: 120000, // 2 minutes
    PROCESS_FEEDBACK: 20000, // 20 seconds
    PROCESS_SURVEY: 20000, // 20 seconds
    CHATBOT_RESPONSE: 15000, // 15 seconds
    UPDATE_KNOWLEDGE_BASE: 30000, // 30 seconds
    AUTO_RESPOND: 15000, // 15 seconds
    SLA_CHECK: 30000, // 30 seconds
    NOTIFY_TEAM: 15000, // 15 seconds
    SYNC_TICKET: 30000, // 30 seconds
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
    TICKET_QUEUE: {
      name: 'ticket-queue',
      concurrency: 3,
      priority: 1,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 60000,
      },
    },
    EMAIL_QUEUE: {
      name: 'email-queue',
      concurrency: 2,
      priority: 5,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 30000,
      },
    },
    ESCALATION_QUEUE: {
      name: 'escalation-queue',
      concurrency: 1,
      priority: 1,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 60000,
      },
    },
    AUTOMATION_QUEUE: {
      name: 'automation-queue',
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
export type SupportQueueName = (typeof SupportQueue.NAMES)[keyof typeof SupportQueue.NAMES];
export type SupportQueueEvent = (typeof SupportQueue.EVENTS)[keyof typeof SupportQueue.EVENTS];
export type SupportJobType = (typeof SupportQueue.JOB_TYPES)[keyof typeof SupportQueue.JOB_TYPES];

// Queue configuration builder
export const SupportQueueConfig = {
  createJobConfig: (jobType: SupportJobType) => ({
    attempts: SupportQueue.RETRY_POLICY.MAX_ATTEMPTS,
    backoff: SupportQueue.RETRY_POLICY.BACKOFF,
    timeout:
      SupportQueue.TIMEOUT[jobType.toUpperCase() as keyof typeof SupportQueue.TIMEOUT] ||
      SupportQueue.DEFAULT_TIMEOUT,
    delay: 0,
    priority: SupportQueue.PRIORITY.MEDIUM,
    removeOnComplete: true,
    removeOnFail: false,
    deadLetterExchange: SupportQueue.DEAD_LETTER_QUEUE_CONFIG.EXCHANGE,
    deadLetterRoutingKey: SupportQueue.DEAD_LETTER_QUEUE_CONFIG.ROUTING_KEY,
    messageTTL: SupportQueue.DEAD_LETTER_QUEUE_CONFIG.TTL,
  }),
  getConcurrency: (type: 'default' | 'high' | 'low' | 'minimal' = 'default'): number => {
    return (
      SupportQueue.CONCURRENCY[type.toUpperCase() as keyof typeof SupportQueue.CONCURRENCY] || 5
    );
  },
  getBatchSize: (): number => {
    return SupportQueue.BATCH_SIZE;
  },
  getMaxSize: (): number => {
    return SupportQueue.MAX_SIZE;
  },
  getProcessingInterval: (): number => {
    return SupportQueue.PROCESSING_INTERVAL;
  },
} as const;
