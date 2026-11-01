/**
 * Vendor Team Event Store Interface
 * @module vendor-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { VendorTeamEntity } from '../entities/vendor-team.entity.js';

export const VENDOR_TEAM_EVENT_STORE = Symbol('VENDOR_TEAM_EVENT_STORE');

export interface VendorTeamEventStoreStats {
  readonly totalEvents: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly distinctAggregates: number;
  readonly byEventType: Readonly<Record<string, number>>;
}

export interface VendorTeamEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<VendorTeamEntity | null>;
  loadLatest(limit: number): Promise<readonly VendorTeamEntity[]>;
  loadByVendor(vendorId: string): Promise<readonly VendorTeamEntity[]>;
  loadByUser(userId: string): Promise<readonly VendorTeamEntity[]>;
  loadByStatus(status: string): Promise<readonly VendorTeamEntity[]>;
  loadByEventType(
    eventType: string,
    limit?: number,
  ): Promise<readonly { aggregateId: string; version: number }[]>;
  countByAggregate(aggregateId: string): Promise<number>;
  listAggregateIds(): Promise<readonly string[]>;
  purge(cutoff: string): Promise<number>;
  purgeAggregate(aggregateId: string): Promise<number>;
  statistics(): Promise<VendorTeamEventStoreStats>;
  saveSnapshot(aggregateId: string, version: number, state: unknown): Promise<void>;
  loadSnapshot(
    aggregateId: string,
  ): Promise<{ version: number; state: unknown } | null>;
}
