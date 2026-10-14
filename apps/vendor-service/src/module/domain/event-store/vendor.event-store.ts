/**
 * Vendor Event Store Interface
 * @module vendor-service/domain/event-store
 *
 * Event Sourcing support — Vendor aggregate এর event stream persist + replay।
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { VendorEntity } from '../entities/vendor.entity.js';

// ─── DI Token ──────────────────────────────
export const VENDOR_EVENT_STORE = Symbol('VENDOR_EVENT_STORE');

// ─── Stats ─────────────────────────────────
export interface VendorEventStoreStats {
  readonly totalEvents: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly distinctAggregates: number;
  readonly byEventType: Readonly<Record<string, number>>;
}

// ─── Main Interface ────────────────────────
export interface VendorEventStore extends BaseEventStore {
  /**
   * Vendor aggregate reconstitute — event stream replay করে Entity তৈরি।
   */
  reconstitute(aggregateId: string): Promise<VendorEntity | null>;

  /**
   * একাধিক aggregate এর সর্বশেষ view।
   */
  loadLatest(limit: number): Promise<readonly VendorEntity[]>;

  /**
   * 특정 상태 (status) এর vendors event stream।
   */
  loadByStatus(status: string): Promise<readonly VendorEntity[]>;

  /**
   * 특정 tier এর vendors।
   */
  loadByTier(tier: string): Promise<readonly VendorEntity[]>;

  /**
   * 특정 user এর vendor।
   */
  loadByUser(userId: string): Promise<VendorEntity | null>;

  /**
   * 특정 event type এর events।
   */
  loadByEventType(
    eventType: string,
    limit?: number,
  ): Promise<readonly { aggregateId: string; version: number }[]>;

  /**
   * 특정 시간 범위 এর events count।
   */
  countByTimeRange(from: string, to: string): Promise<number>;

  /**
   * Aggregate এর event count।
   */
  countByAggregate(aggregateId: string): Promise<number>;

  /**
   * 모든 distinct aggregate IDs।
   */
  listAggregateIds(): Promise<readonly string[]>;

  /**
   * Old events GC (এবং removed count return)।
   */
  purge(cutoff: string): Promise<number>;

  /**
   * 특정 aggregate এর stream purge।
   */
  purgeAggregate(aggregateId: string): Promise<number>;

  /**
   * Event store statistics।
   */
  statistics(): Promise<VendorEventStoreStats>;

  /**
   * Snapshot persistence — replay দ্রুত করতে।
   */
  saveSnapshot(aggregateId: string, version: number, state: unknown): Promise<void>;

  /**
   * Snapshot load।
   */
  loadSnapshot(
    aggregateId: string,
  ): Promise<{ version: number; state: unknown } | null>;
}
