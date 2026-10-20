/**
 * Order Cancel Event Store Interface
 * @module order-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { OrderCancelEntity } from '../entities/order-cancel.entity.js';

// ─── DI Token ──────────────────────────────
export const ORDER_CANCEL_EVENT_STORE = Symbol('ORDER_CANCEL_EVENT_STORE');

// ─── Statistics ────────────────────────────
export interface OrderCancelEventStoreStatistics {
  readonly totalEvents: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
}

// ─── Main Interface ────────────────────────
export interface OrderCancelEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<OrderCancelEntity | null>;
  loadLatest(limit: number): Promise<readonly OrderCancelEntity[]>;
  loadByOrder(orderId: string): Promise<readonly OrderCancelEntity[]>;
  purge(cutoff: string): Promise<number>;
  statistics(): Promise<OrderCancelEventStoreStatistics>;
}
