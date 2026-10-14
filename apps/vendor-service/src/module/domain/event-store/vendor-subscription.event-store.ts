/**
 * Vendor Subscription Event Store Interface
 * @module vendor-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { VendorSubscriptionEntity } from '../entities/vendor-subscription.entity.js';

export const VENDOR_SUBSCRIPTION_EVENT_STORE = Symbol(
  'VENDOR_SUBSCRIPTION_EVENT_STORE',
);

export interface VendorSubscriptionEventStoreStats {
  readonly totalEvents: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly distinctAggregates: number;
  readonly byEventType: Readonly<Record<string, number>>;
  readonly byStatus: Readonly<Record<string, number>>;
}

export interface VendorSubscriptionEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<VendorSubscriptionEntity | null>;
  loadLatest(limit: number): Promise<readonly VendorSubscriptionEntity[]>;
  loadByVendor(vendorId: string): Promise<readonly VendorSubscriptionEntity[]>;
  loadActiveByVendor(vendorId: string): Promise<VendorSubscriptionEntity | null>;
  loadByStatus(status: string): Promise<readonly VendorSubscriptionEntity[]>;
  loadByPlan(plan: string): Promise<readonly VendorSubscriptionEntity[]>;
  loadByEventType(
    eventType: string,
    limit?: number,
  ): Promise<readonly { aggregateId: string; version: number }[]>;
  countByAggregate(aggregateId: string): Promise<number>;
  listAggregateIds(): Promise<readonly string[]>;
  purge(cutoff: string): Promise<number>;
  purgeAggregate(aggregateId: string): Promise<number>;
  statistics(): Promise<VendorSubscriptionEventStoreStats>;
  saveSnapshot(aggregateId: string, version: number, state: unknown): Promise<void>;
  loadSnapshot(
    aggregateId: string,
  ): Promise<{ version: number; state: unknown } | null>;
}
