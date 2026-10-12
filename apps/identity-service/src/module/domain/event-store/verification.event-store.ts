/**
 * Verification Event Store Interface
 * @module identity-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { VerificationEntity } from '../entities/verification.entity.js';

export const VERIFICATION_EVENT_STORE = Symbol('VERIFICATION_EVENT_STORE');

export interface VerificationEventStoreStatistics {
  readonly totalEvents: number;
  readonly totalAggregates: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly byEventType: Readonly<Record<string, number>>;
}

export interface VerificationEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<VerificationEntity | null>;
  loadLatest(limit: number): Promise<readonly VerificationEntity[]>;
  loadByUser(userId: string): Promise<readonly VerificationEntity[]>;
  loadByAuthId(authId: string): Promise<readonly VerificationEntity[]>;
  loadPending(): Promise<readonly VerificationEntity[]>;
  countEventsForAggregate(aggregateId: string): Promise<number>;
  statistics(): Promise<VerificationEventStoreStatistics>;
  purge(cutoffIso: string): Promise<number>;
}
