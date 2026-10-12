/**
 * Vendor Stats domain events
 * @module vendor-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { newEventId, now } from './event.helpers.js';

const AGGREGATE_TYPE = 'VendorStats';

export const VENDOR_STATS_EVENT_TYPE = {
  SNAPSHOT_CREATED: 'vendor.stats.snapshot_created',
  ORDER_RECORDED: 'vendor.stats.order_recorded',
  REFUND_RECORDED: 'vendor.stats.refund_recorded',
  CANCELLATION_RECORDED: 'vendor.stats.cancellation_recorded',
  PAYOUT_RECORDED: 'vendor.stats.payout_recorded',
} as const;

export interface VendorStatsSnapshotCreatedPayload {
  readonly statsId: string;
  readonly vendorId: string;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly currency: string;
  readonly createdAt: string;
}
export interface VendorStatsOrderRecordedPayload {
  readonly statsId: string;
  readonly vendorId: string;
  readonly amount: number;
  readonly totalOrders: number;
  readonly totalRevenue: number;
  readonly recordedAt: string;
}
export interface VendorStatsRefundRecordedPayload {
  readonly statsId: string;
  readonly vendorId: string;
  readonly amount: number;
  readonly totalRefunds: number;
  readonly recordedAt: string;
}
export interface VendorStatsCancellationRecordedPayload {
  readonly statsId: string;
  readonly vendorId: string;
  readonly totalCancelled: number;
  readonly recordedAt: string;
}
export interface VendorStatsPayoutRecordedPayload {
  readonly statsId: string;
  readonly vendorId: string;
  readonly amount: number;
  readonly totalPayouts: number;
  readonly recordedAt: string;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};
function buildParams<TType extends string, TPayload>(type: TType, p: EventParams<TPayload>) {
  return {
    id: p.id ?? newEventId(),
    type,
    aggregateId: p.aggregateId,
    aggregateType: AGGREGATE_TYPE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class VendorStatsSnapshotCreatedEvent extends BaseDomainEvent<typeof VENDOR_STATS_EVENT_TYPE.SNAPSHOT_CREATED, VendorStatsSnapshotCreatedPayload> {
  constructor(p: EventParams<VendorStatsSnapshotCreatedPayload>) { super(buildParams(VENDOR_STATS_EVENT_TYPE.SNAPSHOT_CREATED, p)); }
}
export class VendorStatsOrderRecordedEvent extends BaseDomainEvent<typeof VENDOR_STATS_EVENT_TYPE.ORDER_RECORDED, VendorStatsOrderRecordedPayload> {
  constructor(p: EventParams<VendorStatsOrderRecordedPayload>) { super(buildParams(VENDOR_STATS_EVENT_TYPE.ORDER_RECORDED, p)); }
}
export class VendorStatsRefundRecordedEvent extends BaseDomainEvent<typeof VENDOR_STATS_EVENT_TYPE.REFUND_RECORDED, VendorStatsRefundRecordedPayload> {
  constructor(p: EventParams<VendorStatsRefundRecordedPayload>) { super(buildParams(VENDOR_STATS_EVENT_TYPE.REFUND_RECORDED, p)); }
}
export class VendorStatsCancellationRecordedEvent extends BaseDomainEvent<typeof VENDOR_STATS_EVENT_TYPE.CANCELLATION_RECORDED, VendorStatsCancellationRecordedPayload> {
  constructor(p: EventParams<VendorStatsCancellationRecordedPayload>) { super(buildParams(VENDOR_STATS_EVENT_TYPE.CANCELLATION_RECORDED, p)); }
}
export class VendorStatsPayoutRecordedEvent extends BaseDomainEvent<typeof VENDOR_STATS_EVENT_TYPE.PAYOUT_RECORDED, VendorStatsPayoutRecordedPayload> {
  constructor(p: EventParams<VendorStatsPayoutRecordedPayload>) { super(buildParams(VENDOR_STATS_EVENT_TYPE.PAYOUT_RECORDED, p)); }
}
