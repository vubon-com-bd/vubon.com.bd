export const QUEUE_NAME = {
  // ─── Auth Service (নতুন) ──────────────────────────
  AUTH: 'auth',
  SESSION: 'session',
  TOKEN: 'token',
  SYNC: 'sync',

  // ─── Existing ─────────────────────────────────────
  EMAIL: 'email',
  SMS: 'sms',
  PUSH: 'push',
  NOTIFICATION: 'notification',
  IMAGE_PROCESSING: 'image_processing',
  VIDEO_PROCESSING: 'video_processing',
  ORDER_PROCESSING: 'order_processing',
  PAYMENT_PROCESSING: 'payment_processing',
  REPORT_GENERATION: 'report_generation',
  ANALYTICS: 'analytics',
  WEBHOOK: 'webhook',
  CLEANUP: 'cleanup',
} as const;

export const QUEUE_PRIORITY = {
  CRITICAL: 0,
  HIGH: 1,
  NORMAL: 2,
  LOW: 3,
  BACKGROUND: 4,
} as const;

export const QUEUE_STATUS = {
  WAITING: 'waiting',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  FAILED: 'failed',
  DELAYED: 'delayed',
  PAUSED: 'paused',
} as const;

export const QUEUE_LIMIT = {
  MAX_ATTEMPTS: 3,
  BACKOFF_DELAY: 5000,
  MAX_JOBS_PER_WORKER: 100,
  CONCURRENCY: 5,
  REMOVE_ON_COMPLETE: 1000,
  REMOVE_ON_FAIL: 5000,
} as const;

export type QueueNameType = (typeof QUEUE_NAME)[keyof typeof QUEUE_NAME];
export type QueuePriorityType = (typeof QUEUE_PRIORITY)[keyof typeof QUEUE_PRIORITY];
export type QueueStatusType = (typeof QUEUE_STATUS)[keyof typeof QUEUE_STATUS];
