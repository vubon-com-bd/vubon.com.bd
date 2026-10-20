/**
 * Order-service queue names + job names + limits
 * @module order-service/infrastructure/queues
 */
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

export const ORDER_QUEUE_NAME = {
  ORDER_PROCESSING: QUEUE_NAME.ORDER_PROCESSING,
  DELIVERY: QUEUE_NAME.DELIVERY,
  TRACKING: QUEUE_NAME.TRACKING,
  FULFILLMENT: QUEUE_NAME.FULFILLMENT,
  NOTIFICATION: QUEUE_NAME.NOTIFICATION,
  ANALYTICS: QUEUE_NAME.ANALYTICS,
  CLEANUP: QUEUE_NAME.CLEANUP,
  WEBHOOK: QUEUE_NAME.WEBHOOK,
} as const;

export const ORDER_JOB_NAME = {
  PROCESS_ORDER: 'process-order',
  CONFIRM_ORDER: 'confirm-order',
  AUTO_CANCEL_ORDER: 'auto-cancel-order',
  PROCESS_CHECKOUT: 'process-checkout',
  CLEANUP_CHECKOUT: 'cleanup-checkout',
  SCHEDULE_DELIVERY: 'schedule-delivery',
  TRACK_DELIVERY: 'track-delivery',
  PROCESS_RETURN: 'process-return',
  PROCESS_FULFILLMENT: 'process-fulfillment',
  SEND_NOTIFICATION: 'send-notification',
  UPDATE_ANALYTICS: 'update-analytics',
  CLEANUP_STALE: 'cleanup-stale',
} as const;

export const ORDER_QUEUE_LIMITS = {
  MAX_ATTEMPTS: 3,
  BACKOFF_MS: 5_000,
  CONCURRENCY: 5,
  RETRY_DELAY_MS: 30_000,
  JOB_RETENTION: 1000,
} as const;

export type OrderJobNameType = (typeof ORDER_JOB_NAME)[keyof typeof ORDER_JOB_NAME];
