/**
 * Vendor Payout domain events
 * @module vendor-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { newEventId, now } from './event.helpers.js';

const AGGREGATE_TYPE = 'VendorPayout';

export const VENDOR_PAYOUT_EVENT_TYPE = {
  REQUESTED: 'vendor.payout.requested',
  APPROVED: 'vendor.payout.approved',
  PROCESSING: 'vendor.payout.processing',
  PAID: 'vendor.payout.paid',
  FAILED: 'vendor.payout.failed',
  REJECTED: 'vendor.payout.rejected',
  CANCELLED: 'vendor.payout.cancelled',
  ON_HOLD: 'vendor.payout.on_hold',
} as const;

export interface VendorPayoutRequestedPayload {
  readonly payoutId: string;
  readonly vendorId: string;
  readonly payoutNumber: string;
  readonly amount: number;
  readonly currency: string;
  readonly method: string;
  readonly requestedAt: string;
}
export interface VendorPayoutApprovedPayload {
  readonly payoutId: string;
  readonly vendorId: string;
  readonly approvedBy: string;
  readonly approvedAt: string;
}
export interface VendorPayoutProcessingPayload {
  readonly payoutId: string;
  readonly vendorId: string;
  readonly startedAt: string;
}
export interface VendorPayoutPaidPayload {
  readonly payoutId: string;
  readonly vendorId: string;
  readonly transactionId: string;
  readonly reference?: string;
  readonly netAmount: number;
  readonly currency: string;
  readonly paidAt: string;
}
export interface VendorPayoutFailedPayload {
  readonly payoutId: string;
  readonly vendorId: string;
  readonly reason: string;
  readonly failedAt: string;
}
export interface VendorPayoutRejectedPayload {
  readonly payoutId: string;
  readonly vendorId: string;
  readonly reason: string;
  readonly rejectedAt: string;
}
export interface VendorPayoutCancelledPayload {
  readonly payoutId: string;
  readonly vendorId: string;
  readonly cancelledAt: string;
}
export interface VendorPayoutOnHoldPayload {
  readonly payoutId: string;
  readonly vendorId: string;
  readonly reason: string;
  readonly heldAt: string;
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

export class VendorPayoutRequestedEvent extends BaseDomainEvent<typeof VENDOR_PAYOUT_EVENT_TYPE.REQUESTED, VendorPayoutRequestedPayload> {
  constructor(p: EventParams<VendorPayoutRequestedPayload>) { super(buildParams(VENDOR_PAYOUT_EVENT_TYPE.REQUESTED, p)); }
}
export class VendorPayoutApprovedEvent extends BaseDomainEvent<typeof VENDOR_PAYOUT_EVENT_TYPE.APPROVED, VendorPayoutApprovedPayload> {
  constructor(p: EventParams<VendorPayoutApprovedPayload>) { super(buildParams(VENDOR_PAYOUT_EVENT_TYPE.APPROVED, p)); }
}
export class VendorPayoutProcessingEvent extends BaseDomainEvent<typeof VENDOR_PAYOUT_EVENT_TYPE.PROCESSING, VendorPayoutProcessingPayload> {
  constructor(p: EventParams<VendorPayoutProcessingPayload>) { super(buildParams(VENDOR_PAYOUT_EVENT_TYPE.PROCESSING, p)); }
}
export class VendorPayoutPaidEvent extends BaseDomainEvent<typeof VENDOR_PAYOUT_EVENT_TYPE.PAID, VendorPayoutPaidPayload> {
  constructor(p: EventParams<VendorPayoutPaidPayload>) { super(buildParams(VENDOR_PAYOUT_EVENT_TYPE.PAID, p)); }
}
export class VendorPayoutFailedEvent extends BaseDomainEvent<typeof VENDOR_PAYOUT_EVENT_TYPE.FAILED, VendorPayoutFailedPayload> {
  constructor(p: EventParams<VendorPayoutFailedPayload>) { super(buildParams(VENDOR_PAYOUT_EVENT_TYPE.FAILED, p)); }
}
export class VendorPayoutRejectedEvent extends BaseDomainEvent<typeof VENDOR_PAYOUT_EVENT_TYPE.REJECTED, VendorPayoutRejectedPayload> {
  constructor(p: EventParams<VendorPayoutRejectedPayload>) { super(buildParams(VENDOR_PAYOUT_EVENT_TYPE.REJECTED, p)); }
}
export class VendorPayoutCancelledEvent extends BaseDomainEvent<typeof VENDOR_PAYOUT_EVENT_TYPE.CANCELLED, VendorPayoutCancelledPayload> {
  constructor(p: EventParams<VendorPayoutCancelledPayload>) { super(buildParams(VENDOR_PAYOUT_EVENT_TYPE.CANCELLED, p)); }
}
export class VendorPayoutOnHoldEvent extends BaseDomainEvent<typeof VENDOR_PAYOUT_EVENT_TYPE.ON_HOLD, VendorPayoutOnHoldPayload> {
  constructor(p: EventParams<VendorPayoutOnHoldPayload>) { super(buildParams(VENDOR_PAYOUT_EVENT_TYPE.ON_HOLD, p)); }
}
