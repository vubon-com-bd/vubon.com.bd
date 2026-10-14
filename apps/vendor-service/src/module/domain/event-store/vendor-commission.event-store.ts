/**
 * Vendor Commission Event Store Interface
 * @module vendor-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { VendorCommissionEntity } from '../entities/vendor-commission.entity.js';

export const VENDOR_COMMISSION_EVENT_STORE = Symbol('VENDOR_COMMISSION_EVENT_STORE');

export interface VendorCommissionEventStoreStats {
  readonly totalEvents: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly distinctAggregates: number;
  readonly byEventType: Readonly<Record<string, number>>;
}

export interface VendorCommissionEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<VendorCommissionEntity | null>;
  loadLatest(limit: number): Promise<readonly VendorCommissionEntity[]>;
  loadByVendor(vendorId: string): Promise<readonly VendorCommissionEntity[]>;
  loadActiveByVendor(vendorId: string): Promise<VendorCommissionEntity | null>;
  loadByType(type: string): Promise<readonly VendorCommissionEntity[]>;
  loadByEventType(
    eventType: string,
    limit?: number,
  ): Promise<readonly { aggregateId: string; version: number }[]>;
  countByAggregate(aggregateId: string): Promise<number>;
  listAggregateIds(): Promise<readonly string[]>;
  purge(cutoff: string): Promise<number>;
  purgeAggregate(aggregateId: string): Promise<number>;
  statistics(): Promise<VendorCommissionEventStoreStats>;
  saveSnapshot(aggregateId: string, version: number, state: unknown): Promise<void>;
  loadSnapshot(
    aggregateId: string,
  ): Promise<{ version: number; state: unknown } | null>;
}
