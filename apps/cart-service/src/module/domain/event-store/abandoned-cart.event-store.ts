/**
 * AbandonedCart Event Store Interface
 * @module cart-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { AbandonedCartEntity } from '../entities/abandoned-cart.entity.js';

export const ABANDONED_CART_EVENT_STORE = Symbol('ABANDONED_CART_EVENT_STORE');

export interface AbandonedCartEventStreamStats {
  readonly totalEvents: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly byEventType: Readonly<Record<string, number>>;
}

export interface AbandonedCartSnapshot {
  readonly abandonedCartId: string;
  readonly version: number;
  readonly snapshotAt: string;
  readonly payload: Readonly<Record<string, unknown>>;
}

export interface AbandonedCartEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<AbandonedCartEntity | null>;

  loadByCartId(cartId: string): Promise<AbandonedCartEntity | null>;
  loadByUserId(userId: string): Promise<readonly AbandonedCartEntity[]>;
  loadByStatus(status: string): Promise<readonly AbandonedCartEntity[]>;
  loadRecoverable(): Promise<readonly AbandonedCartEntity[]>;
  loadPendingReminders(maxReminders: number): Promise<readonly AbandonedCartEntity[]>;

  loadBetweenVersions(
    aggregateId: string,
    fromVersion: number,
    toVersion: number,
  ): Promise<readonly unknown[]>;

  countByAggregate(aggregateId: string): Promise<number>;
  statistics(): Promise<AbandonedCartEventStreamStats>;

  saveSnapshot(snapshot: AbandonedCartSnapshot): Promise<void>;
  loadLatestSnapshot(aggregateId: string): Promise<AbandonedCartSnapshot | null>;

  purge(cutoff: string): Promise<number>;
}
