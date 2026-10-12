/**
 * User Event Store Interface
 * @module identity-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { UserEntity } from '../entities/user.entity.js';

export const USER_EVENT_STORE = Symbol('USER_EVENT_STORE');

export interface UserEventStoreStatistics {
  readonly totalEvents: number;
  readonly totalAggregates: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly byEventType: Readonly<Record<string, number>>;
}

export interface UserEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<UserEntity | null>;
  loadLatest(limit: number): Promise<readonly UserEntity[]>;
  loadByEmail(email: string): Promise<readonly UserEntity[]>;
  loadByStatus(status: string): Promise<readonly UserEntity[]>;
  countEventsForAggregate(aggregateId: string): Promise<number>;
  statistics(): Promise<UserEventStoreStatistics>;
  purge(cutoffIso: string): Promise<number>;
}
