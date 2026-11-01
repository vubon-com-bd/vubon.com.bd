/**
 * Shipment Event Store Interface
 * @module logistics-service/domain/event-store
 *
 * Persistent storage for Shipment domain events (event sourcing support).
 * Implementation: infrastructure/persistence/event-store/shipment.event-store.ts
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { ShipmentEntity } from '../entities/shipment.entity.js';

// ═══════════════════════════════════════
// ─── DI Token ──────────────────────────
// ═══════════════════════════════════════
export const SHIPMENT_EVENT_STORE = Symbol('SHIPMENT_EVENT_STORE');

// ═══════════════════════════════════════
// ─── Statistics ────────────────────────
// ═══════════════════════════════════════
export interface ShipmentEventStoreStatistics {
  readonly totalEvents: number;
  readonly totalAggregates: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly byEventType: Readonly<Record<string, number>>;
}

// ═══════════════════════════════════════
// ─── Main Interface ────────────────────
// ═══════════════════════════════════════
export interface ShipmentEventStore extends BaseEventStore {
  /**
   * Rebuild a ShipmentEntity from its event stream.
   * Returns null if no events found.
   */
  reconstitute(aggregateId: string): Promise<ShipmentEntity | null>;

  /**
   * Load latest N events (across all aggregates) — for monitoring.
   */
  loadLatest(limit: number): Promise<readonly import('@vubon/shared-kernel/domain/base/base.event').EventEnvelope[]>;

  /**
   * Load all events for a specific order (cross-reference).
   */
  loadByOrderId(orderId: string): Promise<
    readonly import('@vubon/shared-kernel/domain/base/base.event').EventEnvelope[]
  >;

  /**
   * Purge events older than cutoff (retention).
   * Returns count of purged events.
   */
  purge(cutoff: string): Promise<number>;

  /**
   * Event store statistics.
   */
  statistics(): Promise<ShipmentEventStoreStatistics>;
}
