/**
 * Checkout Event Store Interface
 * @module order-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { CheckoutEntity } from '../entities/checkout.entity.js';

// ─── DI Token ──────────────────────────────
export const CHECKOUT_EVENT_STORE = Symbol('CHECKOUT_EVENT_STORE');

// ─── Statistics ────────────────────────────
export interface CheckoutEventStoreStatistics {
  readonly totalEvents: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
}

// ─── Main Interface ────────────────────────
export interface CheckoutEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<CheckoutEntity | null>;
  loadLatest(limit: number): Promise<readonly CheckoutEntity[]>;
  loadByCustomer(customerId: string): Promise<readonly CheckoutEntity[]>;
  purge(cutoff: string): Promise<number>;
  statistics(): Promise<CheckoutEventStoreStatistics>;
}
