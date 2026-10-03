/**
 * Order-service queue names
 * @module order-service/infrastructure/queues
 *
 * Names picked from shared QUEUE_NAME where possible; extras are order-local.
 */
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

export const ORDER_QUEUE_NAME = {
  ORDER_PROCESSING: QUEUE_NAME.ORDER_PROCESSING,
  CLEANUP: QUEUE_NAME.CLEANUP,
  DELIVERY: QUEUE_NAME.DELIVERY,
  TRACKING: QUEUE_NAME.TRACKING,
  NOTIFICATION: QUEUE_NAME.NOTIFICATION,
  ANALYTICS: QUEUE_NAME.ANALYTICS,
} as const;

export const ORDER_JOB_NAME = {
  PROCESS_ORDER: 'process-order',
  TIMEOUT_ORDER: 'timeout-order',
  CLEANUP_CHECKOUT: 'cleanup-checkout',
  TRACK_DELIVERY: 'track-delivery',
  PROCESS_RETURN: 'process-return',
  PROCESS_ANALYTICS: 'process-analytics',
} as const;

export const ORDER_QUEUE_LIMITS = {
  MAX_ATTEMPTS: 3,
  BACKOFF_MS: 5000,
  CONCURRENCY: 5,
} as const;
