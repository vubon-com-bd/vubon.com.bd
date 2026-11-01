/**
 * Insurance Event Store Interface
 * @module logistics-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { InsuranceEntity } from '../entities/insurance.entity.js';

export const INSURANCE_EVENT_STORE = Symbol('INSURANCE_EVENT_STORE');

export interface InsuranceEventStoreStatistics {
  readonly totalEvents: number;
  readonly totalAggregates: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly byEventType: Readonly<Record<string, number>>;
}

export interface InsuranceEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<InsuranceEntity | null>;
  purge(cutoff: string): Promise<number>;
  statistics(): Promise<InsuranceEventStoreStatistics>;
}
