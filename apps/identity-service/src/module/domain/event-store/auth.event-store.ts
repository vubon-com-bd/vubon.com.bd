/**
 * Auth Event Store Interface
 * @module identity-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { AuthEntity } from '../entities/auth.entity.js';

export const AUTH_EVENT_STORE = Symbol('AUTH_EVENT_STORE');

export interface AuthEventStoreStatistics {
  readonly totalEvents: number;
  readonly totalAggregates: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly byEventType: Readonly<Record<string, number>>;
}

export interface AuthEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<AuthEntity | null>;
  loadLatest(limit: number): Promise<readonly AuthEntity[]>;
  loadByUser(userId: string): Promise<readonly AuthEntity[]>;
  loadByStatus(status: string): Promise<readonly AuthEntity[]>;
  countEventsForAggregate(aggregateId: string): Promise<number>;
  statistics(): Promise<AuthEventStoreStatistics>;
  purge(cutoffIso: string): Promise<number>;
}
