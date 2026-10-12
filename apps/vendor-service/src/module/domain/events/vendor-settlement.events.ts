/**
 * Vendor Settlement domain events
 * @module vendor-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { newEventId, now } from './event.helpers.js';

const AGGREGATE_TYPE = 'VendorSettlement';

export const VENDOR_SETTLEMENT_EVENT_TYPE = {
  CREATED: 'vendor.settlement.created',
  PROCESSING: 'vendor.settlement.processing',
  COMPLETED: 'vendor.settlement.completed',
  FAILED: 'vendor.settlement.failed',
  ON_HOLD: 'vendor.settlement.on_hold',
  CANCELLED: 'vendor.settlement.cancelled',
} as const;

export interface VendorSettlementCreatedPayload {
  readonly settlementId: string;
  readonly vendorId: string;
  readonly settlementNumber: string;
  readonly grossAmount: number;
  readonly netAmount: number;
  readonly currency: string;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly createdAt: string;
}
export interface VendorSettlementProcessingPayload {
  readonly settlementId: string;
  readonly vendorId: string;
  readonly startedAt: string;
}
export interface VendorSettlementCompletedPayload {
  readonly settlementId: string;
  readonly vendorId: string;
  readonly payoutId: string;
  readonly completedAt: string;
}
export interface VendorSettlementFailedPayload {
  readonly settlementId: string;
  readonly vendorId: string;
  readonly reason: string;
  readonly failedAt: string;
}
export interface VendorSettlementOnHoldPayload {
  readonly settlementId: string;
  readonly vendorId: string;
  readonly reason: string;
  readonly heldAt: string;
}
export interface VendorSettlementCancelledPayload {
  readonly settlementId: string;
  readonly vendorId: string;
  readonly cancelledAt: string;
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

export class VendorSettlementCreatedEvent extends BaseDomainEvent<typeof VENDOR_SETTLEMENT_EVENT_TYPE.CREATED, VendorSettlementCreatedPayload> {
  constructor(p: EventParams<VendorSettlementCreatedPayload>) { super(buildParams(VENDOR_SETTLEMENT_EVENT_TYPE.CREATED, p)); }
}
export class VendorSettlementProcessingEvent extends BaseDomainEvent<typeof VENDOR_SETTLEMENT_EVENT_TYPE.PROCESSING, VendorSettlementProcessingPayload> {
  constructor(p: EventParams<VendorSettlementProcessingPayload>) { super(buildParams(VENDOR_SETTLEMENT_EVENT_TYPE.PROCESSING, p)); }
}
export class VendorSettlementCompletedEvent extends BaseDomainEvent<typeof VENDOR_SETTLEMENT_EVENT_TYPE.COMPLETED, VendorSettlementCompletedPayload> {
  constructor(p: EventParams<VendorSettlementCompletedPayload>) { super(buildParams(VENDOR_SETTLEMENT_EVENT_TYPE.COMPLETED, p)); }
}
export class VendorSettlementFailedEvent extends BaseDomainEvent<typeof VENDOR_SETTLEMENT_EVENT_TYPE.FAILED, VendorSettlementFailedPayload> {
  constructor(p: EventParams<VendorSettlementFailedPayload>) { super(buildParams(VENDOR_SETTLEMENT_EVENT_TYPE.FAILED, p)); }
}
export class VendorSettlementOnHoldEvent extends BaseDomainEvent<typeof VENDOR_SETTLEMENT_EVENT_TYPE.ON_HOLD, VendorSettlementOnHoldPayload> {
  constructor(p: EventParams<VendorSettlementOnHoldPayload>) { super(buildParams(VENDOR_SETTLEMENT_EVENT_TYPE.ON_HOLD, p)); }
}
export class VendorSettlementCancelledEvent extends BaseDomainEvent<typeof VENDOR_SETTLEMENT_EVENT_TYPE.CANCELLED, VendorSettlementCancelledPayload> {
  constructor(p: EventParams<VendorSettlementCancelledPayload>) { super(buildParams(VENDOR_SETTLEMENT_EVENT_TYPE.CANCELLED, p)); }
}
