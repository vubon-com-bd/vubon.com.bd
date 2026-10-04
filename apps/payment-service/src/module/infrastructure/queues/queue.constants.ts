/**
 * Payment-service queue names + job names
 * @module payment-service/infrastructure/queues
 *
 * Global queue names come from shared-constants. Payment-specific job names
 * are defined locally to avoid polluting the global namespace.
 */
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

export const PAYMENT_QUEUE_NAME = {
  PAYMENT_PROCESSING: QUEUE_NAME.PAYMENT_PROCESSING,
  WEBHOOK: QUEUE_NAME.WEBHOOK,
  CLEANUP: QUEUE_NAME.CLEANUP,
} as const;

export const PAYMENT_JOB_NAME = {
  // Payment
  RETRY_PAYMENT: 'retry-payment',
  EXPIRE_PAYMENT: 'expire-payment',
  RECONCILE_PAYMENT: 'reconcile-payment',

  // Refund
  PROCESS_REFUND: 'process-refund',
  RETRY_REFUND: 'retry-refund',

  // Webhook
  PROCESS_WEBHOOK: 'process-webhook',
  RETRY_WEBHOOK: 'retry-webhook',

  // Cleanup
  CLEANUP_STALE_WEBHOOKS: 'cleanup-stale-webhooks',
  CLEANUP_OLD_IDEMPOTENCY: 'cleanup-old-idempotency',
} as const;

export const PAYMENT_QUEUE_LIMITS = {
  MAX_ATTEMPTS: 3,
  BACKOFF_MS: 5_000,
  CONCURRENCY: 5,
  RETRY_DELAY_MS: 30_000,
} as const;

export type PaymentJobNameType = (typeof PAYMENT_JOB_NAME)[keyof typeof PAYMENT_JOB_NAME];
