/**
 * Account Lock Event Store Interface
 * @module identity-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { AccountLockEntity } from '../entities/account-lock.entity.js';

export const ACCOUNT_LOCK_EVENT_STORE = Symbol('ACCOUNT_LOCK_EVENT_STORE');

export interface AccountLockEventStoreStatistics {
  readonly totalEvents: number;
  readonly totalAggregates: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly byEventType: Readonly<Record<string, number>>;
}

export interface AccountLockEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<AccountLockEntity | null>;
  loadLatest(limit: number): Promise<readonly AccountLockEntity[]>;
  loadByAuthId(authId: string): Promise<readonly AccountLockEntity[]>;
  loadActive(): Promise<readonly AccountLockEntity[]>;
  countEventsForAggregate(aggregateId: string): Promise<number>;
  statistics(): Promise<AccountLockEventStoreStatistics>;
  purge(cutoffIso: string): Promise<number>;
}
