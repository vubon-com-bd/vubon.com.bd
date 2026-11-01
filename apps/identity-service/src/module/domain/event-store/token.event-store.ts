/**
 * Token Event Store Interface
 * @module identity-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { TokenEntity } from '../entities/token.entity.js';

export const TOKEN_EVENT_STORE = Symbol('TOKEN_EVENT_STORE');

export interface TokenEventStoreStatistics {
  readonly totalEvents: number;
  readonly totalAggregates: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly byEventType: Readonly<Record<string, number>>;
}

export interface TokenEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<TokenEntity | null>;
  loadLatest(limit: number): Promise<readonly TokenEntity[]>;
  loadByUser(userId: string): Promise<readonly TokenEntity[]>;
  loadBySession(sessionId: string): Promise<readonly TokenEntity[]>;
  loadByJti(jti: string): Promise<TokenEntity | null>;
  countEventsForAggregate(aggregateId: string): Promise<number>;
  statistics(): Promise<TokenEventStoreStatistics>;
  purge(cutoffIso: string): Promise<number>;
}
