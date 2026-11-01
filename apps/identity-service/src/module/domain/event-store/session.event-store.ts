/**
 * Session Event Store Interface
 * @module identity-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { SessionEntity } from '../entities/session.entity.js';

export const SESSION_EVENT_STORE = Symbol('SESSION_EVENT_STORE');

export interface SessionEventStoreStatistics {
  readonly totalEvents: number;
  readonly totalAggregates: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly byEventType: Readonly<Record<string, number>>;
}

export interface SessionEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<SessionEntity | null>;
  loadLatest(limit: number): Promise<readonly SessionEntity[]>;
  loadByUser(userId: string): Promise<readonly SessionEntity[]>;
  loadByStatus(status: string): Promise<readonly SessionEntity[]>;
  countEventsForAggregate(aggregateId: string): Promise<number>;
  statistics(): Promise<SessionEventStoreStatistics>;
  purge(cutoffIso: string): Promise<number>;
}
