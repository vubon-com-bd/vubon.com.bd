/**
 * Vendor Settlement Domain Events
 * @module vendor-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import {
  VENDOR_AGGREGATE_TYPE,
  buildEventParams,
  type EventParams,
} from './event.helpers.js';

export const VENDOR_SETTLEMENT_EVENT_TYPE = {
  INITIATED: 'vendor.settlement.initiated',
  PROCESSING: 'vendor.settlement.processing',
  COMPLETED: 'vendor.settlement.completed',
  FAILED: 'vendor.settlement.failed',
  CANCELLED: 'vendor.settlement.cancelled',
  ON_HOLD: 'vendor.settlement.on_hold',
} as const;

export interface VendorSettlementInitiatedPayload {
  readonly settlementId: string;
  readonly vendorId: string;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly grossAmount: number;
  readonly commissionAmount: number;
  readonly netAmount: number;
  readonly currency: string;
  readonly orderCount: number;
  readonly initiatedAt: string;
}

export interface VendorSettlementProcessingPayload {
  readonly settlementId: string;
  readonly vendorId: string;
  readonly processingStartedAt: string;
  readonly processedBy?: string;
}

export interface VendorSettlementCompletedPayload {
  readonly settlementId: string;
  readonly vendorId: string;
  readonly completedAt: string;
  readonly netAmount: number;
  readonly currency: string;
  readonly payoutId?: string;
}

export interface VendorSettlementFailedPayload {
  readonly settlementId: string;
  readonly vendorId: string;
  readonly failedAt: string;
  readonly reason: string;
  readonly failureCode?: string;
}

export interface VendorSettlementCancelledPayload {
  readonly settlementId: string;
  readonly vendorId: string;
  readonly cancelledAt: string;
  readonly cancelledBy?: string;
  readonly reason?: string;
}

export interface VendorSettlementOnHoldPayload {
  readonly settlementId: string;
  readonly vendorId: string;
  readonly heldAt: string;
  readonly heldBy: string;
  readonly reason: string;
}

export class VendorSettlementInitiatedEvent extends BaseDomainEvent<
  typeof VENDOR_SETTLEMENT_EVENT_TYPE.INITIATED,
  VendorSettlementInitiatedPayload
> {
  constructor(p: EventParams<VendorSettlementInitiatedPayload>) {
    super(
      buildEventParams(
        VENDOR_SETTLEMENT_EVENT_TYPE.INITIATED,
        VENDOR_AGGREGATE_TYPE.SETTLEMENT,
        p,
      ),
    );
  }
}

export class VendorSettlementProcessingEvent extends BaseDomainEvent<
  typeof VENDOR_SETTLEMENT_EVENT_TYPE.PROCESSING,
  VendorSettlementProcessingPayload
> {
  constructor(p: EventParams<VendorSettlementProcessingPayload>) {
    super(
      buildEventParams(
        VENDOR_SETTLEMENT_EVENT_TYPE.PROCESSING,
        VENDOR_AGGREGATE_TYPE.SETTLEMENT,
        p,
      ),
    );
  }
}

export class VendorSettlementCompletedEvent extends BaseDomainEvent<
  typeof VENDOR_SETTLEMENT_EVENT_TYPE.COMPLETED,
  VendorSettlementCompletedPayload
> {
  constructor(p: EventParams<VendorSettlementCompletedPayload>) {
    super(
      buildEventParams(
        VENDOR_SETTLEMENT_EVENT_TYPE.COMPLETED,
        VENDOR_AGGREGATE_TYPE.SETTLEMENT,
        p,
      ),
    );
  }
}

export class VendorSettlementFailedEvent extends BaseDomainEvent<
  typeof VENDOR_SETTLEMENT_EVENT_TYPE.FAILED,
  VendorSettlementFailedPayload
> {
  constructor(p: EventParams<VendorSettlementFailedPayload>) {
    super(
      buildEventParams(
        VENDOR_SETTLEMENT_EVENT_TYPE.FAILED,
        VENDOR_AGGREGATE_TYPE.SETTLEMENT,
        p,
      ),
    );
  }
}

export class VendorSettlementCancelledEvent extends BaseDomainEvent<
  typeof VENDOR_SETTLEMENT_EVENT_TYPE.CANCELLED,
  VendorSettlementCancelledPayload
> {
  constructor(p: EventParams<VendorSettlementCancelledPayload>) {
    super(
      buildEventParams(
        VENDOR_SETTLEMENT_EVENT_TYPE.CANCELLED,
        VENDOR_AGGREGATE_TYPE.SETTLEMENT,
        p,
      ),
    );
  }
}

export class VendorSettlementOnHoldEvent extends BaseDomainEvent<
  typeof VENDOR_SETTLEMENT_EVENT_TYPE.ON_HOLD,
  VendorSettlementOnHoldPayload
> {
  constructor(p: EventParams<VendorSettlementOnHoldPayload>) {
    super(
      buildEventParams(
        VENDOR_SETTLEMENT_EVENT_TYPE.ON_HOLD,
        VENDOR_AGGREGATE_TYPE.SETTLEMENT,
        p,
      ),
    );
  }
}
