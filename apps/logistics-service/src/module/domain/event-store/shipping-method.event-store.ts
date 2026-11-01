/**
 * ShippingMethod Event Store Interface
 * @module logistics-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { ShippingMethodEntity } from '../entities/shipping-method.entity.js';

export const SHIPPING_METHOD_EVENT_STORE = Symbol('SHIPPING_METHOD_EVENT_STORE');

export interface ShippingMethodEventStoreStatistics {
  readonly totalEvents: number;
  readonly totalAggregates: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly byEventType: Readonly<Record<string, number>>;
}

export interface ShippingMethodEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<ShippingMethodEntity | null>;
  purge(cutoff: string): Promise<number>;
  statistics(): Promise<ShippingMethodEventStoreStatistics>;
}
