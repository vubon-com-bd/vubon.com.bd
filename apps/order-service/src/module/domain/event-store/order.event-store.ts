/**
 * Order Event Store Interface
 * @module order-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { OrderEntity } from '../entities/order.entity.js';

// ─── DI Token ──────────────────────────────
export const ORDER_EVENT_STORE = Symbol('ORDER_EVENT_STORE');

// ─── Statistics ────────────────────────────
export interface OrderEventStoreStatistics {
  readonly totalEvents: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
}

// ─── Main Interface ────────────────────────
export interface OrderEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<OrderEntity | null>;
  loadLatest(limit: number): Promise<readonly OrderEntity[]>;
  loadByCustomer(customerId: string): Promise<readonly OrderEntity[]>;
  purge(cutoff: string): Promise<number>;
  statistics(): Promise<OrderEventStoreStatistics>;
}
