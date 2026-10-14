/**
 * Vendor Payout Event Store Interface
 * @module vendor-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { VendorPayoutEntity } from '../entities/vendor-payout.entity.js';

export const VENDOR_PAYOUT_EVENT_STORE = Symbol('VENDOR_PAYOUT_EVENT_STORE');

export interface VendorPayoutEventStoreStats {
  readonly totalEvents: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly distinctAggregates: number;
  readonly byEventType: Readonly<Record<string, number>>;
  readonly byStatus: Readonly<Record<string, number>>;
}

export interface VendorPayoutEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<VendorPayoutEntity | null>;
  loadLatest(limit: number): Promise<readonly VendorPayoutEntity[]>;
  loadByVendor(vendorId: string): Promise<readonly VendorPayoutEntity[]>;
  loadByStatus(status: string): Promise<readonly VendorPayoutEntity[]>;
  loadPendingByVendor(vendorId: string): Promise<readonly VendorPayoutEntity[]>;
  loadByEventType(
    eventType: string,
    limit?: number,
  ): Promise<readonly { aggregateId: string; version: number }[]>;
  countByAggregate(aggregateId: string): Promise<number>;
  listAggregateIds(): Promise<readonly string[]>;
  purge(cutoff: string): Promise<number>;
  purgeAggregate(aggregateId: string): Promise<number>;
  statistics(): Promise<VendorPayoutEventStoreStats>;
  saveSnapshot(aggregateId: string, version: number, state: unknown): Promise<void>;
  loadSnapshot(
    aggregateId: string,
  ): Promise<{ version: number; state: unknown } | null>;
}
