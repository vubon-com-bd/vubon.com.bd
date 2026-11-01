/**
 * Vendor Commission Domain Events
 * @module vendor-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import {
  VENDOR_AGGREGATE_TYPE,
  buildEventParams,
  type EventParams,
} from './event.helpers.js';

export const VENDOR_COMMISSION_EVENT_TYPE = {
  CONFIGURED: 'vendor.commission.configured',
  UPDATED: 'vendor.commission.updated',
  ACTIVATED: 'vendor.commission.activated',
  DEACTIVATED: 'vendor.commission.deactivated',
  CALCULATED: 'vendor.commission.calculated',
  ADJUSTED: 'vendor.commission.adjusted',
} as const;

export interface VendorCommissionConfiguredPayload {
  readonly commissionId: string;
  readonly vendorId: string;
  readonly type: string;
  readonly rate: number;
  readonly fixedAmount?: number;
  readonly effectiveFrom: string;
  readonly configuredBy?: string;
}

export interface VendorCommissionUpdatedPayload {
  readonly commissionId: string;
  readonly vendorId: string;
  readonly changedFields: readonly string[];
  readonly updatedAt: string;
  readonly updatedBy?: string;
}

export interface VendorCommissionActivatedPayload {
  readonly commissionId: string;
  readonly vendorId: string;
  readonly activatedAt: string;
}

export interface VendorCommissionDeactivatedPayload {
  readonly commissionId: string;
  readonly vendorId: string;
  readonly deactivatedAt: string;
  readonly reason?: string;
}

export interface VendorCommissionCalculatedPayload {
  readonly vendorId: string;
  readonly orderId?: string;
  readonly orderAmount: number;
  readonly commissionAmount: number;
  readonly netPayout: number;
  readonly rateApplied: number;
  readonly calculatedAt: string;
}

export interface VendorCommissionAdjustedPayload {
  readonly commissionId: string;
  readonly vendorId: string;
  readonly previousRate: number;
  readonly newRate: number;
  readonly adjustedAt: string;
  readonly adjustedBy: string;
  readonly reason: string;
}

export class VendorCommissionConfiguredEvent extends BaseDomainEvent<
  typeof VENDOR_COMMISSION_EVENT_TYPE.CONFIGURED,
  VendorCommissionConfiguredPayload
> {
  constructor(p: EventParams<VendorCommissionConfiguredPayload>) {
    super(
      buildEventParams(
        VENDOR_COMMISSION_EVENT_TYPE.CONFIGURED,
        VENDOR_AGGREGATE_TYPE.COMMISSION,
        p,
      ),
    );
  }
}

export class VendorCommissionUpdatedEvent extends BaseDomainEvent<
  typeof VENDOR_COMMISSION_EVENT_TYPE.UPDATED,
  VendorCommissionUpdatedPayload
> {
  constructor(p: EventParams<VendorCommissionUpdatedPayload>) {
    super(
      buildEventParams(
        VENDOR_COMMISSION_EVENT_TYPE.UPDATED,
        VENDOR_AGGREGATE_TYPE.COMMISSION,
        p,
      ),
    );
  }
}

export class VendorCommissionActivatedEvent extends BaseDomainEvent<
  typeof VENDOR_COMMISSION_EVENT_TYPE.ACTIVATED,
  VendorCommissionActivatedPayload
> {
  constructor(p: EventParams<VendorCommissionActivatedPayload>) {
    super(
      buildEventParams(
        VENDOR_COMMISSION_EVENT_TYPE.ACTIVATED,
        VENDOR_AGGREGATE_TYPE.COMMISSION,
        p,
      ),
    );
  }
}

export class VendorCommissionDeactivatedEvent extends BaseDomainEvent<
  typeof VENDOR_COMMISSION_EVENT_TYPE.DEACTIVATED,
  VendorCommissionDeactivatedPayload
> {
  constructor(p: EventParams<VendorCommissionDeactivatedPayload>) {
    super(
      buildEventParams(
        VENDOR_COMMISSION_EVENT_TYPE.DEACTIVATED,
        VENDOR_AGGREGATE_TYPE.COMMISSION,
        p,
      ),
    );
  }
}

export class VendorCommissionCalculatedEvent extends BaseDomainEvent<
  typeof VENDOR_COMMISSION_EVENT_TYPE.CALCULATED,
  VendorCommissionCalculatedPayload
> {
  constructor(p: EventParams<VendorCommissionCalculatedPayload>) {
    super(
      buildEventParams(
        VENDOR_COMMISSION_EVENT_TYPE.CALCULATED,
        VENDOR_AGGREGATE_TYPE.COMMISSION,
        p,
      ),
    );
  }
}

export class VendorCommissionAdjustedEvent extends BaseDomainEvent<
  typeof VENDOR_COMMISSION_EVENT_TYPE.ADJUSTED,
  VendorCommissionAdjustedPayload
> {
  constructor(p: EventParams<VendorCommissionAdjustedPayload>) {
    super(
      buildEventParams(
        VENDOR_COMMISSION_EVENT_TYPE.ADJUSTED,
        VENDOR_AGGREGATE_TYPE.COMMISSION,
        p,
      ),
    );
  }
}
