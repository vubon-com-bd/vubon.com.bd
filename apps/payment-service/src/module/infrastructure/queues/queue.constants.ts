/**
 * Payment-service queue names + job names + limits
 * @module payment-service/infrastructure/queues
 *
 * ⚠️ Uses shared QUEUE_NAME where available, falls back to local strings
 * for payment-specific queues not yet declared globally.
 */
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

export const PAYMENT_QUEUE_NAME = {
  PAYMENT_PROCESSING: QUEUE_NAME.PAYMENT_PROCESSING,
  REFUND_PROCESSING: 'refund_processing' as const,
  SUBSCRIPTION: 'subscription' as const,
  INVOICE: 'invoice' as const,
  WEBHOOK: QUEUE_NAME.WEBHOOK,
  NOTIFICATION: QUEUE_NAME.NOTIFICATION,
  ANALYTICS: QUEUE_NAME.ANALYTICS,
} as const;

export const PAYMENT_JOB_NAME = {
  PROCESS_PAYMENT: 'process-payment',
  RETRY_PAYMENT: 'retry-payment',
  EXPIRE_PAYMENT: 'expire-payment',
  PROCESS_REFUND: 'process-refund',
  RETRY_REFUND: 'retry-refund',
  RENEW_SUBSCRIPTION: 'renew-subscription',
  EXPIRE_TRIAL: 'expire-trial',
  MARK_PAST_DUE: 'mark-past-due',
  GENERATE_INVOICE: 'generate-invoice',
  SEND_INVOICE: 'send-invoice',
  PROCESS_WEBHOOK: 'process-webhook',
  RETRY_WEBHOOK: 'retry-webhook',
  SEND_NOTIFICATION: 'send-notification',
  UPDATE_ANALYTICS: 'update-analytics',
  RECONCILE: 'reconcile',
} as const;

export const PAYMENT_QUEUE_LIMITS = {
  MAX_ATTEMPTS: 3,
  BACKOFF_MS: 5_000,
  CONCURRENCY: 5,
  RETRY_DELAY_MS: 30_000,
  JOB_RETENTION: 1000,
} as const;

export type PaymentJobNameType =
  (typeof PAYMENT_JOB_NAME)[keyof typeof PAYMENT_JOB_NAME];
