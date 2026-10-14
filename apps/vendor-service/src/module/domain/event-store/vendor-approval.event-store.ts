/**
 * Vendor Approval Event Store Interface
 * @module vendor-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { VendorApprovalEntity } from '../entities/vendor-approval.entity.js';

export const VENDOR_APPROVAL_EVENT_STORE = Symbol('VENDOR_APPROVAL_EVENT_STORE');

export interface VendorApprovalEventStoreStats {
  readonly totalEvents: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly distinctAggregates: number;
  readonly byEventType: Readonly<Record<string, number>>;
}

export interface VendorApprovalEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<VendorApprovalEntity | null>;
  loadLatest(limit: number): Promise<readonly VendorApprovalEntity[]>;
  loadByVendor(vendorId: string): Promise<readonly VendorApprovalEntity[]>;
  loadByStatus(status: string): Promise<readonly VendorApprovalEntity[]>;
  loadLatestByVendor(vendorId: string): Promise<VendorApprovalEntity | null>;
  loadByEventType(
    eventType: string,
    limit?: number,
  ): Promise<readonly { aggregateId: string; version: number }[]>;
  countByAggregate(aggregateId: string): Promise<number>;
  listAggregateIds(): Promise<readonly string[]>;
  purge(cutoff: string): Promise<number>;
  purgeAggregate(aggregateId: string): Promise<number>;
  statistics(): Promise<VendorApprovalEventStoreStats>;
  saveSnapshot(aggregateId: string, version: number, state: unknown): Promise<void>;
  loadSnapshot(
    aggregateId: string,
  ): Promise<{ version: number; state: unknown } | null>;
}
