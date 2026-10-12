/**
 * Device Event Store Interface
 * @module identity-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { DeviceEntity } from '../entities/device.entity.js';

export const DEVICE_EVENT_STORE = Symbol('DEVICE_EVENT_STORE');

export interface DeviceEventStoreStatistics {
  readonly totalEvents: number;
  readonly totalAggregates: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly byEventType: Readonly<Record<string, number>>;
}

export interface DeviceEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<DeviceEntity | null>;
  loadLatest(limit: number): Promise<readonly DeviceEntity[]>;
  loadByUser(userId: string): Promise<readonly DeviceEntity[]>;
  loadTrusted(userId: string): Promise<readonly DeviceEntity[]>;
  loadByFingerprint(fingerprint: string): Promise<readonly DeviceEntity[]>;
  countEventsForAggregate(aggregateId: string): Promise<number>;
  statistics(): Promise<DeviceEventStoreStatistics>;
  purge(cutoffIso: string): Promise<number>;
}
