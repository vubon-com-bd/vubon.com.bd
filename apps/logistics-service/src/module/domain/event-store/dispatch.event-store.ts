/**
 * Dispatch Event Store Interface
 * @module logistics-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { DispatchEntity } from '../entities/dispatch.entity.js';

export const DISPATCH_EVENT_STORE = Symbol('DISPATCH_EVENT_STORE');

export interface DispatchEventStoreStatistics {
  readonly totalEvents: number;
  readonly totalAggregates: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly byEventType: Readonly<Record<string, number>>;
}

export interface DispatchEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<DispatchEntity | null>;
  purge(cutoff: string): Promise<number>;
  statistics(): Promise<DispatchEventStoreStatistics>;
}
