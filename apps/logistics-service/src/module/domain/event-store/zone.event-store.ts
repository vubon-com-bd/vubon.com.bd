/**
 * Zone Event Store Interface
 * @module logistics-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { ZoneEntity } from '../entities/zone.entity.js';

export const ZONE_EVENT_STORE = Symbol('ZONE_EVENT_STORE');

export interface ZoneEventStoreStatistics {
  readonly totalEvents: number;
  readonly totalAggregates: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly byEventType: Readonly<Record<string, number>>;
}

export interface ZoneEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<ZoneEntity | null>;
  purge(cutoff: string): Promise<number>;
  statistics(): Promise<ZoneEventStoreStatistics>;
}
