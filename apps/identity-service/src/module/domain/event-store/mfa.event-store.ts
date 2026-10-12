/**
 * MFA Event Store Interface
 * @module identity-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { MfaEntity } from '../entities/mfa.entity.js';

export const MFA_EVENT_STORE = Symbol('MFA_EVENT_STORE');

export interface MfaEventStoreStatistics {
  readonly totalEvents: number;
  readonly totalAggregates: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly byEventType: Readonly<Record<string, number>>;
}

export interface MfaEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<MfaEntity | null>;
  loadLatest(limit: number): Promise<readonly MfaEntity[]>;
  loadByAuthId(authId: string): Promise<readonly MfaEntity[]>;
  loadEnabled(): Promise<readonly MfaEntity[]>;
  countEventsForAggregate(aggregateId: string): Promise<number>;
  statistics(): Promise<MfaEventStoreStatistics>;
  purge(cutoffIso: string): Promise<number>;
}
