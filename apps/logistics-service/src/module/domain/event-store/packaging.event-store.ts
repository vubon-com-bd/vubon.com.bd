/**
 * Packaging Event Store Interface
 * @module logistics-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { PackagingEntity } from '../entities/packaging.entity.js';

export const PACKAGING_EVENT_STORE = Symbol('PACKAGING_EVENT_STORE');

export interface PackagingEventStoreStatistics {
  readonly totalEvents: number;
  readonly totalAggregates: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly byEventType: Readonly<Record<string, number>>;
}

export interface PackagingEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<PackagingEntity | null>;
  purge(cutoff: string): Promise<number>;
  statistics(): Promise<PackagingEventStoreStatistics>;
}
