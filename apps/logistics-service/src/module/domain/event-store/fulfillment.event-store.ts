/**
 * Fulfillment Event Store Interface
 * @module logistics-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { FulfillmentEntity } from '../entities/fulfillment.entity.js';

export const FULFILLMENT_EVENT_STORE = Symbol('FULFILLMENT_EVENT_STORE');

export interface FulfillmentEventStoreStatistics {
  readonly totalEvents: number;
  readonly totalAggregates: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly byEventType: Readonly<Record<string, number>>;
}

export interface FulfillmentEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<FulfillmentEntity | null>;
  purge(cutoff: string): Promise<number>;
  statistics(): Promise<FulfillmentEventStoreStatistics>;
}
