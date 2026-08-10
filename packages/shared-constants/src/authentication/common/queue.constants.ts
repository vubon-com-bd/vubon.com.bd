// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Queue names
 */
export const QUEUE_NAMES = {
  AUTH: 'auth',
  EMAIL: 'email',
  SMS: 'sms',
  NOTIFICATION: 'notification',
  KYC: 'kyc',
  ACTIVITY: 'activity',
  LOG: 'log',
  REPORT: 'report',
  BACKUP: 'backup',
  CLEANUP: 'cleanup',
} as const;

/**
 * Job names
 */
export const QUEUE_JOBS = {
  SEND_EMAIL: 'send_email',
  SEND_SMS: 'send_sms',
  SEND_NOTIFICATION: 'send_notification',
  PROCESS_KYC: 'process_kyc',
  VERIFY_EMAIL: 'verify_email',
  VERIFY_PHONE: 'verify_phone',
  GENERATE_REPORT: 'generate_report',
  EXPORT_DATA: 'export_data',
  CLEANUP_LOGS: 'cleanup_logs',
  CLEANUP_SESSIONS: 'cleanup_sessions',
  BACKUP_DATABASE: 'backup_database',
  PROCESS_ACTIVITY: 'process_activity',
  SEND_WELCOME_EMAIL: 'send_welcome_email',
  SEND_PASSWORD_RESET: 'send_password_reset',
  SEND_OTP: 'send_otp',
  PROCESS_PAYMENT: 'process_payment',
  GENERATE_INVOICE: 'generate_invoice',
} as const;

/**
 * Queue retry configuration
 */
export const QUEUE_RETRY = {
  /** Maximum number of retry attempts */
  MAX_ATTEMPTS: 3,
  /** Backoff delay in milliseconds */
  BACKOFF_DELAY: 5000,
  /** Whether to use exponential backoff */
  EXPONENTIAL_BACKOFF: true,
} as const;

/**
 * Queue concurrency (number of jobs to process simultaneously)
 */
export const QUEUE_CONCURRENCY = {
  /** Default concurrency */
  DEFAULT: 5,
  /** High concurrency for fast jobs */
  HIGH: 10,
  /** Low concurrency for resource-intensive jobs */
  LOW: 2,
} as const;

/**
 * Queue delay configuration
 */
export const QUEUE_DELAY = {
  /** No delay */
  NONE: 0,
  /** Short delay (5 seconds) */
  SHORT: 5000,
  /** Medium delay (30 seconds) */
  MEDIUM: 30000,
  /** Long delay (1 minute) */
  LONG: 60000,
  /** Very long delay (5 minutes) */
  VERY_LONG: 300000,
} as const;

/**
 * Queue configuration
 */
export const QUEUE = {
  NAMES: QUEUE_NAMES,
  JOBS: QUEUE_JOBS,
  RETRY: QUEUE_RETRY,
  CONCURRENCY: QUEUE_CONCURRENCY,
  DELAY: QUEUE_DELAY,
} as const;

/**
 * Type for queue names
 */
export type QueueNames = typeof QUEUE_NAMES;

/**
 * Type for queue name key
 */
export type QueueNameKey = keyof typeof QUEUE_NAMES;

/**
 * Type for queue jobs
 */
export type QueueJobs = typeof QUEUE_JOBS;

/**
 * Type for queue job key
 */
export type QueueJobKey = keyof typeof QUEUE_JOBS;

/**
 * Type for queue retry configuration
 */
export type QueueRetry = typeof QUEUE_RETRY;

/**
 * Type for queue concurrency
 */
export type QueueConcurrency = typeof QUEUE_CONCURRENCY;

/**
 * Type for queue delay
 */
export type QueueDelay = typeof QUEUE_DELAY;

/**
 * Type for queue configuration
 */
export type QueueConfig = typeof QUEUE;
