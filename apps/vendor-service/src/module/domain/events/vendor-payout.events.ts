/**
 * Vendor Payout Domain Events
 * @module vendor-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import {
  VENDOR_AGGREGATE_TYPE,
  buildEventParams,
  type EventParams,
} from './event.helpers.js';

export const VENDOR_PAYOUT_EVENT_TYPE = {
  REQUESTED: 'vendor.payout.requested',
  PROCESSING: 'vendor.payout.processing',
  APPROVED: 'vendor.payout.approved',
  PAID: 'vendor.payout.paid',
  FAILED: 'vendor.payout.failed',
  REJECTED: 'vendor.payout.rejected',
  CANCELLED: 'vendor.payout.cancelled',
  ON_HOLD: 'vendor.payout.on_hold',
  RELEASED: 'vendor.payout.released',
} as const;

export interface VendorPayoutRequestedPayload {
  readonly payoutId: string;
  readonly vendorId: string;
  readonly bankAccountId: string;
  readonly amount: number;
  readonly fee: number;
  readonly netAmount: number;
  readonly currency: string;
  readonly method: string;
  readonly requestedAt: string;
  readonly requestedBy: string;
}

export interface VendorPayoutProcessingPayload {
  readonly payoutId: string;
  readonly vendorId: string;
  readonly processingStartedAt: string;
  readonly processedBy?: string;
}

export interface VendorPayoutApprovedPayload {
  readonly payoutId: string;
  readonly vendorId: string;
  readonly approvedAt: string;
  readonly approvedBy: string;
  readonly notes?: string;
}

export interface VendorPayoutPaidPayload {
  readonly payoutId: string;
  readonly vendorId: string;
  readonly paidAt: string;
  readonly transactionId: string;
  readonly amount: number;
  readonly completedBy?: string;
}

export interface VendorPayoutFailedPayload {
  readonly payoutId: string;
  readonly vendorId: string;
  readonly failedAt: string;
  readonly reason: string;
  readonly failureCode?: string;
}

export interface VendorPayoutRejectedPayload {
  readonly payoutId: string;
  readonly vendorId: string;
  readonly rejectedAt: string;
  readonly rejectedBy: string;
  readonly reason: string;
}

export interface VendorPayoutCancelledPayload {
  readonly payoutId: string;
  readonly vendorId: string;
  readonly cancelledAt: string;
  readonly cancelledBy?: string;
  readonly reason?: string;
}

export interface VendorPayoutOnHoldPayload {
  readonly payoutId: string;
  readonly vendorId: string;
  readonly heldAt: string;
  readonly heldBy: string;
  readonly reason: string;
}

export interface VendorPayoutReleasedPayload {
  readonly payoutId: string;
  readonly vendorId: string;
  readonly releasedAt: string;
  readonly releasedBy: string;
}

export class VendorPayoutRequestedEvent extends BaseDomainEvent<
  typeof VENDOR_PAYOUT_EVENT_TYPE.REQUESTED,
  VendorPayoutRequestedPayload
> {
  constructor(p: EventParams<VendorPayoutRequestedPayload>) {
    super(
      buildEventParams(
        VENDOR_PAYOUT_EVENT_TYPE.REQUESTED,
        VENDOR_AGGREGATE_TYPE.PAYOUT,
        p,
      ),
    );
  }
}

export class VendorPayoutProcessingEvent extends BaseDomainEvent<
  typeof VENDOR_PAYOUT_EVENT_TYPE.PROCESSING,
  VendorPayoutProcessingPayload
> {
  constructor(p: EventParams<VendorPayoutProcessingPayload>) {
    super(
      buildEventParams(
        VENDOR_PAYOUT_EVENT_TYPE.PROCESSING,
        VENDOR_AGGREGATE_TYPE.PAYOUT,
        p,
      ),
    );
  }
}

export class VendorPayoutApprovedEvent extends BaseDomainEvent<
  typeof VENDOR_PAYOUT_EVENT_TYPE.APPROVED,
  VendorPayoutApprovedPayload
> {
  constructor(p: EventParams<VendorPayoutApprovedPayload>) {
    super(
      buildEventParams(
        VENDOR_PAYOUT_EVENT_TYPE.APPROVED,
        VENDOR_AGGREGATE_TYPE.PAYOUT,
        p,
      ),
    );
  }
}

export class VendorPayoutPaidEvent extends BaseDomainEvent<
  typeof VENDOR_PAYOUT_EVENT_TYPE.PAID,
  VendorPayoutPaidPayload
> {
  constructor(p: EventParams<VendorPayoutPaidPayload>) {
    super(
      buildEventParams(
        VENDOR_PAYOUT_EVENT_TYPE.PAID,
        VENDOR_AGGREGATE_TYPE.PAYOUT,
        p,
      ),
    );
  }
}

export class VendorPayoutFailedEvent extends BaseDomainEvent<
  typeof VENDOR_PAYOUT_EVENT_TYPE.FAILED,
  VendorPayoutFailedPayload
> {
  constructor(p: EventParams<VendorPayoutFailedPayload>) {
    super(
      buildEventParams(
        VENDOR_PAYOUT_EVENT_TYPE.FAILED,
        VENDOR_AGGREGATE_TYPE.PAYOUT,
        p,
      ),
    );
  }
}

export class VendorPayoutRejectedEvent extends BaseDomainEvent<
  typeof VENDOR_PAYOUT_EVENT_TYPE.REJECTED,
  VendorPayoutRejectedPayload
> {
  constructor(p: EventParams<VendorPayoutRejectedPayload>) {
    super(
      buildEventParams(
        VENDOR_PAYOUT_EVENT_TYPE.REJECTED,
        VENDOR_AGGREGATE_TYPE.PAYOUT,
        p,
      ),
    );
  }
}

export class VendorPayoutCancelledEvent extends BaseDomainEvent<
  typeof VENDOR_PAYOUT_EVENT_TYPE.CANCELLED,
  VendorPayoutCancelledPayload
> {
  constructor(p: EventParams<VendorPayoutCancelledPayload>) {
    super(
      buildEventParams(
        VENDOR_PAYOUT_EVENT_TYPE.CANCELLED,
        VENDOR_AGGREGATE_TYPE.PAYOUT,
        p,
      ),
    );
  }
}

export class VendorPayoutOnHoldEvent extends BaseDomainEvent<
  typeof VENDOR_PAYOUT_EVENT_TYPE.ON_HOLD,
  VendorPayoutOnHoldPayload
> {
  constructor(p: EventParams<VendorPayoutOnHoldPayload>) {
    super(
      buildEventParams(
        VENDOR_PAYOUT_EVENT_TYPE.ON_HOLD,
        VENDOR_AGGREGATE_TYPE.PAYOUT,
        p,
      ),
    );
  }
}

export class VendorPayoutReleasedEvent extends BaseDomainEvent<
  typeof VENDOR_PAYOUT_EVENT_TYPE.RELEASED,
  VendorPayoutReleasedPayload
> {
  constructor(p: EventParams<VendorPayoutReleasedPayload>) {
    super(
      buildEventParams(
        VENDOR_PAYOUT_EVENT_TYPE.RELEASED,
        VENDOR_AGGREGATE_TYPE.PAYOUT,
        p,
      ),
    );
  }
}
