/**
 * Courier Event Store Interface
 * @module logistics-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { CourierEntity } from '../entities/courier.entity.js';

export const COURIER_EVENT_STORE = Symbol('COURIER_EVENT_STORE');

export interface CourierEventStoreStatistics {
  readonly totalEvents: number;
  readonly totalAggregates: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly byEventType: Readonly<Record<string, number>>;
}

export interface CourierEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<CourierEntity | null>;
  purge(cutoff: string): Promise<number>;
  statistics(): Promise<CourierEventStoreStatistics>;
}
