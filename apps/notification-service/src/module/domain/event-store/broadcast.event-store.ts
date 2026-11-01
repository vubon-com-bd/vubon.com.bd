/**
 * BroadcastEventStore
 * @module notification-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { BroadcastEntity } from '@domain/entities/broadcast.entity.js';
import type { BroadcastResultEntity } from '@domain/entities/broadcast-result.entity.js';

// ─── DI Token ─────────────────────────────
export const BROADCAST_EVENT_STORE = Symbol('BROADCAST_EVENT_STORE');

// ─── Statistics ───────────────────────────
export interface BroadcastEventStoreStats {
  readonly totalEvents: number;
  readonly aggregateCount: number;
  readonly byType: Readonly<Record<string, number>>;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
}

// ─── Main Interface ───────────────────────
export interface BroadcastEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<BroadcastEntity | null>;
  reconstituteResult(aggregateId: string): Promise<BroadcastResultEntity | null>;

  loadByStatus(status: string, limit?: number): Promise<readonly BroadcastEntity[]>;
  loadCompletedSince(cutoff: string): Promise<readonly BroadcastEntity[]>;

  purge(cutoff: string): Promise<number>;
  statistics(): Promise<BroadcastEventStoreStats>;
}
