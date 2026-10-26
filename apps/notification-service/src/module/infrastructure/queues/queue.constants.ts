/**
 * Notification Queue Constants
 * @module notification-service/infrastructure/queues
 *
 * Queue names, job names, priorities, limits.
 * Uses kernel QUEUE_PRIORITY + QUEUE_CONFIG defaults।
 */
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

// ═══════════════ Queue Names ═══════════════
export const NOTIFICATION_QUEUE_NAME = {
  NOTIFICATION_PROCESSING: 'notification.processing',
  BROADCAST: 'notification.broadcast',
  SCHEDULE: 'notification.schedule',
  DIGEST: 'notification.digest',
  WEBHOOK: 'notification.webhook',
  RETRY: 'notification.retry',
  EMAIL: 'notification.email',
  SMS: 'notification.sms',
  PUSH: 'notification.push',
  IN_APP: 'notification.in-app',
} as const;

export type NotificationQueueNameType =
  (typeof NOTIFICATION_QUEUE_NAME)[keyof typeof NOTIFICATION_QUEUE_NAME];

// ═══════════════ Job Names ═══════════════
export const NOTIFICATION_JOB_NAME = {
  // Send pipeline
  SEND: 'send',
  SEND_BULK: 'send-bulk',
  DELIVER: 'deliver',
  RETRY: 'retry',

  // Broadcast
  START_BROADCAST: 'start-broadcast',
  PROCESS_BROADCAST_BATCH: 'process-broadcast-batch',
  COMPLETE_BROADCAST: 'complete-broadcast',

  // Schedule
  TRIGGER_SCHEDULE: 'trigger-schedule',
  COMPUTE_NEXT_RUN: 'compute-next-run',

  // Digest
  GENERATE_DIGEST: 'generate-digest',
  SEND_DIGEST: 'send-digest',

  // Webhook
  DELIVER_WEBHOOK: 'deliver-webhook',
  RETRY_WEBHOOK: 'retry-webhook',

  // Retry dispatcher
  PROCESS_RETRY: 'process-retry',
  CLEANUP: 'cleanup',
} as const;

export type NotificationJobNameType =
  (typeof NOTIFICATION_JOB_NAME)[keyof typeof NOTIFICATION_JOB_NAME];

// ═══════════════ Priorities ═══════════════
export const NOTIFICATION_QUEUE_PRIORITY = {
  CRITICAL: QUEUE_PRIORITY.CRITICAL ?? 1,
  HIGH: QUEUE_PRIORITY.HIGH ?? 2,
  NORMAL: QUEUE_PRIORITY.NORMAL ?? 5,
  LOW: QUEUE_PRIORITY.LOW ?? 10,
} as const;

// ═══════════════ Limits ═══════════════
export const NOTIFICATION_QUEUE_LIMITS = {
  MAX_ATTEMPTS: 3,
  BACKOFF_MS: 5_000,
  DEFAULT_CONCURRENCY: 5,
  SEND_CONCURRENCY: 10,
  EMAIL_CONCURRENCY: 20,
  SMS_CONCURRENCY: 10,
  PUSH_CONCURRENCY: 50,
  WEBHOOK_CONCURRENCY: 5,
  BROADCAST_BATCH_SIZE: 1000,
  RETRY_DELAY_MS: 60_000,
} as const;
