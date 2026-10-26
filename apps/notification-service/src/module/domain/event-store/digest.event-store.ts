/**
 * DigestEventStore
 * @module notification-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { DigestEntity } from '@domain/entities/digest.entity.js';

// ─── DI Token ─────────────────────────────
export const DIGEST_EVENT_STORE = Symbol('DIGEST_EVENT_STORE');

// ─── Statistics ───────────────────────────
export interface DigestEventStoreStats {
  readonly totalEvents: number;
  readonly aggregateCount: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
}

// ─── Main Interface ───────────────────────
export interface DigestEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<DigestEntity | null>;

  loadByUser(userId: string): Promise<readonly DigestEntity[]>;
  loadByStatus(status: string, limit?: number): Promise<readonly DigestEntity[]>;
  loadLatest(limit: number): Promise<readonly DigestEntity[]>;

  purge(cutoff: string): Promise<number>;
  statistics(): Promise<DigestEventStoreStats>;
}
