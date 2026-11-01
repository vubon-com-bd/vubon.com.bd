/**
 * SavedForLater Event Store Interface
 * @module cart-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { SavedForLaterEntity } from '../entities/saved-for-later.entity.js';

export const SAVED_FOR_LATER_EVENT_STORE = Symbol('SAVED_FOR_LATER_EVENT_STORE');

export interface SavedForLaterEventStreamStats {
  readonly totalEvents: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly byEventType: Readonly<Record<string, number>>;
}

export interface SavedForLaterSnapshot {
  readonly savedItemId: string;
  readonly version: number;
  readonly snapshotAt: string;
  readonly payload: Readonly<Record<string, unknown>>;
}

export interface SavedForLaterEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<SavedForLaterEntity | null>;

  loadByUserId(userId: string): Promise<readonly SavedForLaterEntity[]>;
  loadByStatus(status: string): Promise<readonly SavedForLaterEntity[]>;
  loadLatest(limit: number): Promise<readonly SavedForLaterEntity[]>;

  loadBetweenVersions(
    aggregateId: string,
    fromVersion: number,
    toVersion: number,
  ): Promise<readonly unknown[]>;

  countByAggregate(aggregateId: string): Promise<number>;
  statistics(): Promise<SavedForLaterEventStreamStats>;

  saveSnapshot(snapshot: SavedForLaterSnapshot): Promise<void>;
  loadLatestSnapshot(aggregateId: string): Promise<SavedForLaterSnapshot | null>;

  purge(cutoff: string): Promise<number>;
}
