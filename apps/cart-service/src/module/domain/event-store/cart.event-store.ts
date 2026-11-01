/**
 * Cart Event Store Interface
 * @module cart-service/domain/event-store
 *
 * Persistent storage for Cart domain events (event sourcing support).
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { CartEntity } from '../entities/cart.entity.js';

// ─── DI Token ──────────────────────────────
export const CART_EVENT_STORE = Symbol('CART_EVENT_STORE');

// ─── Event Stream Stats ────────────────────
export interface CartEventStreamStats {
  readonly totalEvents: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly byEventType: Readonly<Record<string, number>>;
}

// ─── Snapshot ──────────────────────────────
export interface CartSnapshot {
  readonly cartId: string;
  readonly version: number;
  readonly snapshotAt: string;
  readonly payload: Readonly<Record<string, unknown>>;
}

// ─── Main Interface ────────────────────────
export interface CartEventStore extends BaseEventStore {
  /**
   * Rebuild Cart aggregate from its event stream.
   * Returns null if no events exist for the given aggregateId.
   */
  reconstitute(aggregateId: string): Promise<CartEntity | null>;

  /**
   * Load latest N reconstructed carts (for dashboards/cron).
   */
  loadLatest(limit: number): Promise<readonly CartEntity[]>;

  /**
   * Load carts by user — supports multi-cart scenarios.
   */
  loadByUserId(userId: string): Promise<readonly CartEntity[]>;

  /**
   * Load carts by status.
   */
  loadByStatus(status: string): Promise<readonly CartEntity[]>;

  /**
   * Load event stream version range.
   */
  loadBetweenVersions(
    aggregateId: string,
    fromVersion: number,
    toVersion: number,
  ): Promise<readonly unknown[]>;

  /**
   * Count events for a specific aggregate.
   */
  countByAggregate(aggregateId: string): Promise<number>;

  /**
   * Get stats on the event stream.
   */
  statistics(): Promise<CartEventStreamStats>;

  /**
   * Snapshot support — persist state to avoid replaying entire stream.
   */
  saveSnapshot(snapshot: CartSnapshot): Promise<void>;
  loadLatestSnapshot(aggregateId: string): Promise<CartSnapshot | null>;

  /**
   * Purge events older than cutoff (ISO timestamp).
   * Returns number of events purged.
   */
  purge(cutoff: string): Promise<number>;
}
