/**
 * Payment Event Helpers
 * @module payment-service/domain/events
 *
 * Shared utilities for domain event construction (DRY).
 */
import type { Timestamp } from '@vubon/shared-types/common';

// ─── Aggregate type registry ──────────────
export const PAYMENT_AGGREGATE_TYPE = {
  PAYMENT: 'Payment',
  TRANSACTION: 'Transaction',
  REFUND: 'Refund',
  SPLIT: 'SplitPayment',
  RECURRING: 'RecurringPayment',
  SUBSCRIPTION: 'Subscription',
  INVOICE: 'Invoice',
  VERIFICATION: 'Verification',
} as const;

export type PaymentAggregateType =
  (typeof PAYMENT_AGGREGATE_TYPE)[keyof typeof PAYMENT_AGGREGATE_TYPE];

/**
 * Crypto-safe-ish event ID (sufficient for domain-level uniqueness).
 */
export function newEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Current timestamp — cast to Timestamp for BaseDomainEvent contract.
 */
export function now(): Timestamp {
  return new Date().toISOString() as unknown as Timestamp;
}
