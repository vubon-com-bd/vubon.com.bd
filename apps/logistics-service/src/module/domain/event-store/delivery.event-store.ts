/**
 * Delivery Event Store Interface
 * @module logistics-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { DeliveryEntity } from '../entities/delivery.entity.js';

export const DELIVERY_EVENT_STORE = Symbol('DELIVERY_EVENT_STORE');

export interface DeliveryEventStoreStatistics {
  readonly totalEvents: number;
  readonly totalAggregates: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly byEventType: Readonly<Record<string, number>>;
}

export interface DeliveryEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<DeliveryEntity | null>;
  purge(cutoff: string): Promise<number>;
  statistics(): Promise<DeliveryEventStoreStatistics>;
}
