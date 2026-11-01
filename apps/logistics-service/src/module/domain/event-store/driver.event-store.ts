/**
 * Driver Event Store Interface
 * @module logistics-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { DriverEntity } from '../entities/driver.entity.js';

export const DRIVER_EVENT_STORE = Symbol('DRIVER_EVENT_STORE');

export interface DriverEventStoreStatistics {
  readonly totalEvents: number;
  readonly totalAggregates: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly byEventType: Readonly<Record<string, number>>;
}

export interface DriverEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<DriverEntity | null>;
  purge(cutoff: string): Promise<number>;
  statistics(): Promise<DriverEventStoreStatistics>;
}
