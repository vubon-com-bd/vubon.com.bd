/**
 * Order Return Event Store Interface
 * @module order-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { OrderReturnEntity } from '../entities/order-return.entity.js';

// ─── DI Token ──────────────────────────────
export const ORDER_RETURN_EVENT_STORE = Symbol('ORDER_RETURN_EVENT_STORE');

// ─── Statistics ────────────────────────────
export interface OrderReturnEventStoreStatistics {
  readonly totalEvents: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
}

// ─── Main Interface ────────────────────────
export interface OrderReturnEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<OrderReturnEntity | null>;
  loadLatest(limit: number): Promise<readonly OrderReturnEntity[]>;
  loadByOrder(orderId: string): Promise<readonly OrderReturnEntity[]>;
  loadByCustomer(customerId: string): Promise<readonly OrderReturnEntity[]>;
  purge(cutoff: string): Promise<number>;
  statistics(): Promise<OrderReturnEventStoreStatistics>;
}
