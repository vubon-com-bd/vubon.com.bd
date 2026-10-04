/**
 * Event helpers — ID generation, timestamp, aggregate type constants
 * @module payment-service/domain/events
 */
import { randomUUID } from 'node:crypto';
import type { Timestamp } from '@vubon/shared-types/common';

export function newEventId(): string {
  return randomUUID();
}

/** Current timestamp as epoch milliseconds (branded). */
export function now(): Timestamp {
  return Date.now() as Timestamp;
}

// ═══ Aggregate type identifiers ═══
export const PAYMENT_AGGREGATE_TYPE = 'Payment';
export const TRANSACTION_AGGREGATE_TYPE = 'Transaction';
export const REFUND_AGGREGATE_TYPE = 'Refund';
export const WEBHOOK_EVENT_AGGREGATE_TYPE = 'WebhookEvent';
