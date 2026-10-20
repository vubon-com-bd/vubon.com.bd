/**
 * Delivery Event Store Interface
 * @module order-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { DeliveryEntity } from '../entities/delivery.entity.js';

// ─── DI Token ──────────────────────────────
export const DELIVERY_EVENT_STORE = Symbol('DELIVERY_EVENT_STORE');

// ─── Statistics ────────────────────────────
export interface DeliveryEventStoreStatistics {
  readonly totalEvents: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
}

// ─── Main Interface ────────────────────────
export interface DeliveryEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<DeliveryEntity | null>;
  loadLatest(limit: number): Promise<readonly DeliveryEntity[]>;
  loadByOrder(orderId: string): Promise<readonly DeliveryEntity[]>;
  loadByTrackingNumber(trackingNumber: string): Promise<readonly DeliveryEntity[]>;
  purge(cutoff: string): Promise<number>;
  statistics(): Promise<DeliveryEventStoreStatistics>;
}
