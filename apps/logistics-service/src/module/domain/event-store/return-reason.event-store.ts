/**
 * ReturnReason Event Store Interface
 * @module logistics-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { ReturnReasonEntity } from '../entities/return-reason.entity.js';

export const RETURN_REASON_EVENT_STORE = Symbol('RETURN_REASON_EVENT_STORE');

export interface ReturnReasonEventStoreStatistics {
  readonly totalEvents: number;
  readonly totalAggregates: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly byEventType: Readonly<Record<string, number>>;
}

export interface ReturnReasonEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<ReturnReasonEntity | null>;
  purge(cutoff: string): Promise<number>;
  statistics(): Promise<ReturnReasonEventStoreStatistics>;
}
