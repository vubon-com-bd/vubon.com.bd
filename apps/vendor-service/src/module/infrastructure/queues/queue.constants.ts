/**
 * vendor-service queue names + job names + limits
 * @module vendor-service/infrastructure/queues
 *
 * ⚠️ Custom queue names (not from shared-constants QUEUE_NAME) — Product-service pattern.
 */

export const VENDOR_QUEUE_NAME = {
  COMMISSION_CALC: 'vendor-commission-calc',
  PAYOUT_PROCESSING: 'vendor-payout-processing',
  SETTLEMENT_PROCESSING: 'vendor-settlement-processing',
  PERFORMANCE_TRACKING: 'vendor-performance-tracking',
  TIER_EVALUATION: 'vendor-tier-evaluation',
  DOCUMENT_EXPIRY: 'vendor-document-expiry',
  SUBSCRIPTION_RENEWAL: 'vendor-subscription-renewal',
  NOTIFICATION: 'vendor-notification',
} as const;

export const VENDOR_JOB_NAME = {
  CALCULATE_COMMISSION: 'calculate-commission',
  PROCESS_PAYOUT: 'process-payout',
  RETRY_PAYOUT: 'retry-payout',
  PROCESS_SETTLEMENT: 'process-settlement',
  TRACK_PERFORMANCE: 'track-performance',
  EVALUATE_TIER: 'evaluate-tier',
  CHECK_DOCUMENT_EXPIRY: 'check-document-expiry',
  RENEW_SUBSCRIPTION: 'renew-subscription',
  EXPIRE_SUBSCRIPTION: 'expire-subscription',
  NOTIFY_VENDOR: 'notify-vendor',
} as const;

export const VENDOR_QUEUE_LIMITS = {
  MAX_ATTEMPTS: 3,
  BACKOFF_MS: 5_000,
  CONCURRENCY: 5,
  RETRY_DELAY_MS: 30_000,
  LOCK_TTL_SECONDS: 30,
  BATCH_SIZE: 100,
} as const;

export type VendorJobNameType =
  (typeof VENDOR_JOB_NAME)[keyof typeof VENDOR_JOB_NAME];
