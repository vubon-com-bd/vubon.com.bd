/**
 * Tracking Event Store Interface
 * @module logistics-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { TrackingEntity } from '../entities/tracking.entity.js';

export const TRACKING_EVENT_STORE = Symbol('TRACKING_EVENT_STORE');

export interface TrackingEventStoreStatistics {
  readonly totalEvents: number;
  readonly totalAggregates: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly byEventType: Readonly<Record<string, number>>;
}

export interface TrackingEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<TrackingEntity | null>;
  purge(cutoff: string): Promise<number>;
  statistics(): Promise<TrackingEventStoreStatistics>;
}
