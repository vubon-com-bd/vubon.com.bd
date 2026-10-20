/**
 * Order Fulfillment Event Store Interface
 * @module order-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { OrderFulfillmentEntity } from '../entities/order-fulfillment.entity.js';

// ─── DI Token ──────────────────────────────
export const ORDER_FULFILLMENT_EVENT_STORE = Symbol('ORDER_FULFILLMENT_EVENT_STORE');

// ─── Statistics ────────────────────────────
export interface OrderFulfillmentEventStoreStatistics {
  readonly totalEvents: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
}

// ─── Main Interface ────────────────────────
export interface OrderFulfillmentEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<OrderFulfillmentEntity | null>;
  loadLatest(limit: number): Promise<readonly OrderFulfillmentEntity[]>;
  loadByOrder(orderId: string): Promise<readonly OrderFulfillmentEntity[]>;
  loadByVendor(vendorId: string): Promise<readonly OrderFulfillmentEntity[]>;
  purge(cutoff: string): Promise<number>;
  statistics(): Promise<OrderFulfillmentEventStoreStatistics>;
}
