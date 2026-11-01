/**
 * Vendor Verification Event Store Interface
 * @module vendor-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { VendorVerificationEntity } from '../entities/vendor-verification.entity.js';

export const VENDOR_VERIFICATION_EVENT_STORE = Symbol(
  'VENDOR_VERIFICATION_EVENT_STORE',
);

export interface VendorVerificationEventStoreStats {
  readonly totalEvents: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly distinctAggregates: number;
  readonly byEventType: Readonly<Record<string, number>>;
}

export interface VendorVerificationEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<VendorVerificationEntity | null>;
  loadLatest(limit: number): Promise<readonly VendorVerificationEntity[]>;
  loadByVendor(vendorId: string): Promise<readonly VendorVerificationEntity[]>;
  loadByType(
    vendorId: string,
    type: string,
  ): Promise<readonly VendorVerificationEntity[]>;
  loadByStatus(status: string): Promise<readonly VendorVerificationEntity[]>;
  loadByEventType(
    eventType: string,
    limit?: number,
  ): Promise<readonly { aggregateId: string; version: number }[]>;
  countByAggregate(aggregateId: string): Promise<number>;
  listAggregateIds(): Promise<readonly string[]>;
  purge(cutoff: string): Promise<number>;
  purgeAggregate(aggregateId: string): Promise<number>;
  statistics(): Promise<VendorVerificationEventStoreStats>;
  saveSnapshot(aggregateId: string, version: number, state: unknown): Promise<void>;
  loadSnapshot(
    aggregateId: string,
  ): Promise<{ version: number; state: unknown } | null>;
}
