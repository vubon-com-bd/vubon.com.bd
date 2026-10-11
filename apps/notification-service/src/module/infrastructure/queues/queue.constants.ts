/**
 * Notification-service queue names + job names + limits
 * @module notification-service/infrastructure/queues
 *
 * Global queue names come from @vubon/shared-constants. Notification-specific
 * job names defined locally to avoid polluting the global namespace.
 */
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

export const NOTIFICATION_QUEUE_NAME = {
  NOTIFICATION: QUEUE_NAME.NOTIFICATION,
  EMAIL: QUEUE_NAME.EMAIL,
  SMS: QUEUE_NAME.SMS,
  PUSH: QUEUE_NAME.PUSH,
  WEBHOOK: QUEUE_NAME.WEBHOOK,
  ANALYTICS: QUEUE_NAME.ANALYTICS,
  CLEANUP: QUEUE_NAME.CLEANUP,
} as const;

export const NOTIFICATION_JOB_NAME = {
  // ─── Notification core ───
  DISPATCH_NOTIFICATION: 'dispatch-notification',
  PROCESS_QUEUED: 'process-queued',
  PROCESS_SCHEDULED: 'process-scheduled',
  RETRY_NOTIFICATION: 'retry-notification',
  EXPIRE_NOTIFICATION: 'expire-notification',
  SEND_NOTIFICATION: 'send-notification',

  // ─── Email ───
  SEND_EMAIL: 'send-email',
  SEND_EMAIL_BULK: 'send-email-bulk',
  RETRY_EMAIL: 'retry-email',
  TRACK_EMAIL_EVENT: 'track-email-event',

  // ─── SMS ───
  SEND_SMS: 'send-sms',
  SEND_SMS_BULK: 'send-sms-bulk',
  RETRY_SMS: 'retry-sms',

  // ─── Push ───
  SEND_PUSH: 'send-push',
  SEND_PUSH_TO_TOPIC: 'send-push-to-topic',
  RETRY_PUSH: 'retry-push',
  CLEANUP_INVALID_TOKENS: 'cleanup-invalid-tokens',

  // ─── In-App ───
  SEND_IN_APP: 'send-in-app',
  BROADCAST_IN_APP: 'broadcast-in-app',
  DELIVER_REALTIME: 'deliver-realtime',

  // ─── Template ───
  RENDER_TEMPLATE: 'render-template',
  CACHE_WARM_TEMPLATES: 'cache-warm-templates',

  // ─── Schedule ───
  TRIGGER_SCHEDULE: 'trigger-schedule',
  SCAN_DUE_SCHEDULES: 'scan-due-schedules',
  ADVANCE_RECURRING: 'advance-recurring',

  // ─── Broadcast ───
  START_BROADCAST: 'start-broadcast',
  PROCESS_BROADCAST_BATCH: 'process-broadcast-batch',
  FINALIZE_BROADCAST: 'finalize-broadcast',
  CANCEL_BROADCAST: 'cancel-broadcast',

  // ─── Digest ───
  GENERATE_DIGEST: 'generate-digest',
  SEND_DIGEST: 'send-digest',
  SCAN_READY_DIGESTS: 'scan-ready-digests',

  // ─── Webhook (outbound) ───
  DELIVER_WEBHOOK: 'deliver-webhook',
  RETRY_WEBHOOK: 'retry-webhook',
  DISABLE_FAILING_WEBHOOK: 'disable-failing-webhook',

  // ─── Delivery attempt ───
  RECORD_DELIVERY_ATTEMPT: 'record-delivery-attempt',
  SCHEDULE_DELIVERY_RETRY: 'schedule-delivery-retry',

  // ─── Cleanup / housekeeping ───
  CLEANUP_STALE_NOTIFICATIONS: 'cleanup-stale-notifications',
  CLEANUP_EXPIRED_NOTIFICATIONS: 'cleanup-expired-notifications',
  CLEANUP_OLD_ATTEMPTS: 'cleanup-old-attempts',
  CLEANUP_RATE_LIMITS: 'cleanup-rate-limits',
} as const;

export const NOTIFICATION_QUEUE_LIMITS = {
  MAX_ATTEMPTS: 3,
  BACKOFF_MS: 5_000,
  CONCURRENCY: 5,
  RETRY_DELAY_MS: 30_000,
  BATCH_SIZE: 500,
  SCHEDULE_SCAN_INTERVAL_MS: 60_000,
  DIGEST_SCAN_INTERVAL_MS: 300_000,
  CLEANUP_INTERVAL_MS: 3_600_000,
} as const;

export type NotificationJobNameType =
  (typeof NOTIFICATION_JOB_NAME)[keyof typeof NOTIFICATION_JOB_NAME];
