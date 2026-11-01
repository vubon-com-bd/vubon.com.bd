/**
 * Vehicle Event Store Interface
 * @module logistics-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { VehicleEntity } from '../entities/vehicle.entity.js';

export const VEHICLE_EVENT_STORE = Symbol('VEHICLE_EVENT_STORE');

export interface VehicleEventStoreStatistics {
  readonly totalEvents: number;
  readonly totalAggregates: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly byEventType: Readonly<Record<string, number>>;
}

export interface VehicleEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<VehicleEntity | null>;
  purge(cutoff: string): Promise<number>;
  statistics(): Promise<VehicleEventStoreStatistics>;
}
