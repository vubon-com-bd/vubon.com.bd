/**
 * @fileoverview Authentication Queue Constants
 * @description Contains all queue-related constants for authentication and authorization
 * @module AuthQueue
 */

export const AuthQueue = {
  NAMES: {
    AUTH_QUEUE: 'auth-queue',
    EMAIL_QUEUE: 'email-queue',
    SMS_QUEUE: 'sms-queue',
    NOTIFICATION_QUEUE: 'notification-queue',
    AUDIT_QUEUE: 'audit-queue',
    TOKEN_QUEUE: 'token-queue',
    CLEANUP_QUEUE: 'cleanup-queue',
    ANALYTICS_QUEUE: 'analytics-queue',
    SYNC_QUEUE: 'sync-queue',
    MFA_QUEUE: 'mfa-queue',
  } as const,

  QUEUE_TYPE: {
    BULL: 'bull',
    RABBITMQ: 'rabbitmq',
    AWS_SQS: 'aws_sqs',
    KAFKA: 'kafka',
  } as const,

  JOBS: {
    SEND_VERIFICATION_EMAIL: 'send_verification_email',
    SEND_RESET_PASSWORD_EMAIL: 'send_reset_password_email',
    SEND_WELCOME_EMAIL: 'send_welcome_email',
    SEND_ACCOUNT_LOCKOUT_EMAIL: 'send_account_lockout_email',
    SEND_SUSPICIOUS_LOGIN_ALERT: 'send_suspicious_login_alert',
    SEND_MFA_EMAIL: 'send_mfa_email',
    SEND_OTP_SMS: 'send_otp_sms',
    SEND_MFA_SMS: 'send_mfa_sms',
    SEND_NOTIFICATION: 'send_notification',
    SEND_PUSH_NOTIFICATION: 'send_push_notification',
    AUDIT_LOG: 'audit_log',
    GENERATE_AUDIT_REPORT: 'generate_audit_report',
    CLEANUP_EXPIRED_TOKENS: 'cleanup_expired_tokens',
    CLEANUP_EXPIRED_SESSIONS: 'cleanup_expired_sessions',
    CLEANUP_EXPIRED_REFRESH_TOKENS: 'cleanup_expired_refresh_tokens',
    CLEANUP_EXPIRED_VERIFICATION_TOKENS: 'cleanup_expired_verification_tokens',
    CLEANUP_ARCHIVED_LOGS: 'cleanup_archived_logs',
    PROCESS_ANALYTICS: 'process_analytics',
    PROCESS_LOGIN_ANALYTICS: 'process_login_analytics',
    PROCESS_USER_ACTIVITY: 'process_user_activity',
    SYNC_USER_DATA: 'sync_user_data',
    SYNC_USER_PERMISSIONS: 'sync_user_permissions',
    SYNC_USER_ROLES: 'sync_user_roles',
    PROCESS_TOKEN_REFRESH: 'process_token_refresh',
    PROCESS_TOKEN_VALIDATION: 'process_token_validation',
    HANDLE_ACCOUNT_LOCKOUT: 'handle_account_lockout',
    PROCESS_LOGIN_ATTEMPT: 'process_login_attempt',
    UPDATE_USER_LAST_ACTIVE: 'update_user_last_active',
    PROCESS_MFA_VERIFICATION: 'process_mfa_verification',
    PROCESS_MFA_SETUP: 'process_mfa_setup',
    HANDLE_PASSWORD_RESET: 'handle_password_reset',
    PROCESS_PASSWORD_CHANGE: 'process_password_change',
    CLEANUP_EXPIRED_SESSIONS_BATCH: 'cleanup_expired_sessions_batch',
    SESSION_EXTEND: 'session_extend',
  } as const,

  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 5000,
    BACKOFF: {
      TYPE: 'exponential',
      DELAY: 5000,
      FACTOR: 2,
    } as const,
  } as const,

  CONCURRENCY: {
    DEFAULT: 5,
    HIGH: 10,
    LOW: 2,
    MINIMAL: 1,
  } as const,

  DELAY: {
    IMMEDIATE: 0,
    SHORT: 1000,
    MEDIUM: 5000,
    LONG: 30000,
    VERY_LONG: 60000,
  } as const,

  PRIORITY: {
    HIGH: 1,
    MEDIUM: 5,
    LOW: 10,
    VERY_LOW: 20,
  } as const,

  TIMEOUT: {
    SEND_VERIFICATION_EMAIL: 30000,
    SEND_RESET_PASSWORD_EMAIL: 30000,
    SEND_WELCOME_EMAIL: 30000,
    SEND_ACCOUNT_LOCKOUT_EMAIL: 30000,
    SEND_SUSPICIOUS_LOGIN_ALERT: 30000,
    SEND_MFA_EMAIL: 30000,
    SEND_OTP_SMS: 15000,
    SEND_MFA_SMS: 15000,
    SEND_NOTIFICATION: 15000,
    SEND_PUSH_NOTIFICATION: 15000,
    AUDIT_LOG: 10000,
    GENERATE_AUDIT_REPORT: 60000,
    CLEANUP_EXPIRED_TOKENS: 60000,
    CLEANUP_EXPIRED_SESSIONS: 60000,
    CLEANUP_EXPIRED_REFRESH_TOKENS: 60000,
    CLEANUP_EXPIRED_VERIFICATION_TOKENS: 60000,
    CLEANUP_ARCHIVED_LOGS: 120000,
    PROCESS_ANALYTICS: 30000,
    PROCESS_LOGIN_ANALYTICS: 30000,
    PROCESS_USER_ACTIVITY: 30000,
    SYNC_USER_DATA: 60000,
    SYNC_USER_PERMISSIONS: 60000,
    SYNC_USER_ROLES: 60000,
    PROCESS_TOKEN_REFRESH: 20000,
    PROCESS_TOKEN_VALIDATION: 20000,
    HANDLE_ACCOUNT_LOCKOUT: 30000,
    PROCESS_LOGIN_ATTEMPT: 30000,
    UPDATE_USER_LAST_ACTIVE: 10000,
    PROCESS_MFA_VERIFICATION: 20000,
    PROCESS_MFA_SETUP: 20000,
    HANDLE_PASSWORD_RESET: 30000,
    PROCESS_PASSWORD_CHANGE: 20000,
    CLEANUP_EXPIRED_SESSIONS_BATCH: 120000,
    SESSION_EXTEND: 5000,
  } as const,

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

  DELIVERY_MODE: {
    PERSISTENT: 'persistent',
    NON_PERSISTENT: 'non_persistent',
  } as const,

  DEAD_LETTER_QUEUE_CONFIG: {
    EXCHANGE: 'auth.dlx',
    ROUTING_KEY: 'auth.dlq',
    TTL: 86400000,
    MAX_RETRIES: 3,
  } as const,

  BATCH_SIZE: 100,
  MAX_SIZE: 10000,
  PROCESSING_INTERVAL: 1000,

  CONFIG: {
    AUTH_QUEUE: {
      name: 'auth-queue',
      concurrency: 5,
      priority: 1,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
      removeOnComplete: true,
      removeOnFail: false,
      stalledInterval: 30000,
      maxStalledCount: 3,
    },
    EMAIL_QUEUE: {
      name: 'email-queue',
      concurrency: 2,
      priority: 5,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 10000,
      },
      removeOnComplete: true,
      removeOnFail: false,
      stalledInterval: 60000,
      maxStalledCount: 2,
    },
    SMS_QUEUE: {
      name: 'sms-queue',
      concurrency: 3,
      priority: 5,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
      removeOnComplete: true,
      removeOnFail: false,
      stalledInterval: 30000,
      maxStalledCount: 3,
    },
    NOTIFICATION_QUEUE: {
      name: 'notification-queue',
      concurrency: 4,
      priority: 3,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
      removeOnComplete: true,
      removeOnFail: false,
      stalledInterval: 30000,
      maxStalledCount: 3,
    },
    AUDIT_QUEUE: {
      name: 'audit-queue',
      concurrency: 2,
      priority: 7,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
      removeOnComplete: true,
      removeOnFail: false,
      stalledInterval: 60000,
      maxStalledCount: 2,
    },
    TOKEN_QUEUE: {
      name: 'token-queue',
      concurrency: 3,
      priority: 4,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
      removeOnComplete: true,
      removeOnFail: false,
      stalledInterval: 30000,
      maxStalledCount: 3,
    },
    CLEANUP_QUEUE: {
      name: 'cleanup-queue',
      concurrency: 1,
      priority: 10,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 60000,
      },
      removeOnComplete: true,
      removeOnFail: false,
      stalledInterval: 120000,
      maxStalledCount: 2,
    },
    ANALYTICS_QUEUE: {
      name: 'analytics-queue',
      concurrency: 2,
      priority: 8,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 10000,
      },
      removeOnComplete: true,
      removeOnFail: false,
      stalledInterval: 60000,
      maxStalledCount: 2,
    },
    SYNC_QUEUE: {
      name: 'sync-queue',
      concurrency: 2,
      priority: 6,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 10000,
      },
      removeOnComplete: true,
      removeOnFail: false,
      stalledInterval: 60000,
      maxStalledCount: 2,
    },
    MFA_QUEUE: {
      name: 'mfa-queue',
      concurrency: 3,
      priority: 2,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
      removeOnComplete: true,
      removeOnFail: false,
      stalledInterval: 30000,
      maxStalledCount: 3,
    },
  } as const,
} as const;

export type AuthQueueName = (typeof AuthQueue.NAMES)[keyof typeof AuthQueue.NAMES];
export type AuthQueueEvent = (typeof AuthQueue.EVENTS)[keyof typeof AuthQueue.EVENTS];
export type AuthJobType = (typeof AuthQueue.JOBS)[keyof typeof AuthQueue.JOBS];
export type AuthQueueType = (typeof AuthQueue.QUEUE_TYPE)[keyof typeof AuthQueue.QUEUE_TYPE];
export type AuthQueueConcurrency = keyof typeof AuthQueue.CONCURRENCY;
export type AuthQueueDelay = keyof typeof AuthQueue.DELAY;
export type AuthQueuePriority = keyof typeof AuthQueue.PRIORITY;
export type AuthQueueConfigKey = keyof typeof AuthQueue.CONFIG;

export const AuthQueueConfig = {
  createJobConfig: (jobType: AuthJobType) => ({
    attempts: AuthQueue.RETRY.MAX_ATTEMPTS,
    backoff: AuthQueue.RETRY.BACKOFF,
    timeout: AuthQueue.TIMEOUT[jobType.toUpperCase() as keyof typeof AuthQueue.TIMEOUT] || 30000,
    delay: 0,
    priority: AuthQueue.PRIORITY.MEDIUM,
    removeOnComplete: true,
    removeOnFail: false,
    deadLetterExchange: AuthQueue.DEAD_LETTER_QUEUE_CONFIG.EXCHANGE,
    deadLetterRoutingKey: AuthQueue.DEAD_LETTER_QUEUE_CONFIG.ROUTING_KEY,
    messageTTL: AuthQueue.DEAD_LETTER_QUEUE_CONFIG.TTL,
  }),

  getConcurrency: (type: AuthQueueConcurrency = 'DEFAULT'): number => {
    return AuthQueue.CONCURRENCY[type] || 5;
  },

  getBatchSize: (): number => {
    return AuthQueue.BATCH_SIZE;
  },

  getMaxSize: (): number => {
    return AuthQueue.MAX_SIZE;
  },

  getProcessingInterval: (): number => {
    return AuthQueue.PROCESSING_INTERVAL;
  },

  getQueueConfig: (queueName: AuthQueueName) => {
    const key = queueName.toUpperCase().replace(/-/g, '_') as AuthQueueConfigKey;
    return AuthQueue.CONFIG[key] || AuthQueue.CONFIG.AUTH_QUEUE;
  },

  getPriority: (level: AuthQueuePriority = 'MEDIUM'): number => {
    return AuthQueue.PRIORITY[level];
  },

  getDelay: (level: AuthQueueDelay = 'IMMEDIATE'): number => {
    return AuthQueue.DELAY[level];
  },

  getRetryConfig: () => {
    return AuthQueue.RETRY;
  },

  getDeadLetterConfig: () => {
    return AuthQueue.DEAD_LETTER_QUEUE_CONFIG;
  },
} as const;

export const AuthQueueValidator = {
  validateJobName: (jobName: string): boolean => {
    return Object.values(AuthQueue.JOBS).includes(jobName as AuthJobType);
  },

  validateQueueName: (queueName: string): boolean => {
    return Object.values(AuthQueue.NAMES).includes(queueName as AuthQueueName);
  },

  getAvailableJobs: (): AuthJobType[] => {
    return Object.values(AuthQueue.JOBS);
  },

  getAvailableQueues: (): AuthQueueName[] => {
    return Object.values(AuthQueue.NAMES);
  },

  getJobsForQueue: (queueName: AuthQueueName): AuthJobType[] => {
    const jobMap: Record<AuthQueueName, AuthJobType[]> = {
      [AuthQueue.NAMES.AUTH_QUEUE]: [
        AuthQueue.JOBS.PROCESS_LOGIN_ATTEMPT,
        AuthQueue.JOBS.HANDLE_ACCOUNT_LOCKOUT,
        AuthQueue.JOBS.PROCESS_TOKEN_REFRESH,
        AuthQueue.JOBS.PROCESS_TOKEN_VALIDATION,
        AuthQueue.JOBS.UPDATE_USER_LAST_ACTIVE,
      ],
      [AuthQueue.NAMES.EMAIL_QUEUE]: [
        AuthQueue.JOBS.SEND_VERIFICATION_EMAIL,
        AuthQueue.JOBS.SEND_RESET_PASSWORD_EMAIL,
        AuthQueue.JOBS.SEND_WELCOME_EMAIL,
        AuthQueue.JOBS.SEND_ACCOUNT_LOCKOUT_EMAIL,
        AuthQueue.JOBS.SEND_SUSPICIOUS_LOGIN_ALERT,
        AuthQueue.JOBS.SEND_MFA_EMAIL,
      ],
      [AuthQueue.NAMES.SMS_QUEUE]: [AuthQueue.JOBS.SEND_OTP_SMS, AuthQueue.JOBS.SEND_MFA_SMS],
      [AuthQueue.NAMES.NOTIFICATION_QUEUE]: [
        AuthQueue.JOBS.SEND_NOTIFICATION,
        AuthQueue.JOBS.SEND_PUSH_NOTIFICATION,
      ],
      [AuthQueue.NAMES.AUDIT_QUEUE]: [
        AuthQueue.JOBS.AUDIT_LOG,
        AuthQueue.JOBS.GENERATE_AUDIT_REPORT,
      ],
      [AuthQueue.NAMES.TOKEN_QUEUE]: [
        AuthQueue.JOBS.CLEANUP_EXPIRED_TOKENS,
        AuthQueue.JOBS.CLEANUP_EXPIRED_REFRESH_TOKENS,
        AuthQueue.JOBS.CLEANUP_EXPIRED_VERIFICATION_TOKENS,
      ],
      [AuthQueue.NAMES.CLEANUP_QUEUE]: [
        AuthQueue.JOBS.CLEANUP_EXPIRED_SESSIONS,
        AuthQueue.JOBS.CLEANUP_ARCHIVED_LOGS,
        AuthQueue.JOBS.CLEANUP_EXPIRED_SESSIONS_BATCH,
      ],
      [AuthQueue.NAMES.ANALYTICS_QUEUE]: [
        AuthQueue.JOBS.PROCESS_ANALYTICS,
        AuthQueue.JOBS.PROCESS_LOGIN_ANALYTICS,
        AuthQueue.JOBS.PROCESS_USER_ACTIVITY,
      ],
      [AuthQueue.NAMES.SYNC_QUEUE]: [
        AuthQueue.JOBS.SYNC_USER_DATA,
        AuthQueue.JOBS.SYNC_USER_PERMISSIONS,
        AuthQueue.JOBS.SYNC_USER_ROLES,
      ],
      [AuthQueue.NAMES.MFA_QUEUE]: [
        AuthQueue.JOBS.PROCESS_MFA_VERIFICATION,
        AuthQueue.JOBS.PROCESS_MFA_SETUP,
      ],
    };
    return jobMap[queueName] || [];
  },
} as const;
