/**
 * Vendor Commission domain events
 * @module vendor-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { newEventId, now } from './event.helpers.js';

const AGGREGATE_TYPE = 'VendorCommission';

export const VENDOR_COMMISSION_EVENT_TYPE = {
  CONFIG_CREATED: 'vendor.commission.config_created',
  PERCENT_UPDATED: 'vendor.commission.percent_updated',
  FIXED_UPDATED: 'vendor.commission.fixed_updated',
  ACTIVATED: 'vendor.commission.activated',
  DEACTIVATED: 'vendor.commission.deactivated',
  TERMINATED: 'vendor.commission.terminated',
} as const;

export interface VendorCommissionConfigCreatedPayload {
  readonly commissionId: string;
  readonly vendorId: string;
  readonly type: string;
  readonly percent: number;
  readonly effectiveFrom: string;
  readonly configuredAt: string;
}
export interface VendorCommissionPercentUpdatedPayload {
  readonly commissionId: string;
  readonly vendorId: string;
  readonly oldPercent: number;
  readonly newPercent: number;
  readonly updatedAt: string;
}
export interface VendorCommissionFixedUpdatedPayload {
  readonly commissionId: string;
  readonly vendorId: string;
  readonly amount: number;
  readonly currency: string;
  readonly updatedAt: string;
}
export interface VendorCommissionStatusChangedPayload {
  readonly commissionId: string;
  readonly vendorId: string;
  readonly changedAt: string;
}
export interface VendorCommissionTerminatedPayload {
  readonly commissionId: string;
  readonly vendorId: string;
  readonly effectiveTo: string;
  readonly terminatedAt: string;
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

export class VendorCommissionConfigCreatedEvent extends BaseDomainEvent<typeof VENDOR_COMMISSION_EVENT_TYPE.CONFIG_CREATED, VendorCommissionConfigCreatedPayload> {
  constructor(p: EventParams<VendorCommissionConfigCreatedPayload>) { super(buildParams(VENDOR_COMMISSION_EVENT_TYPE.CONFIG_CREATED, p)); }
}
export class VendorCommissionPercentUpdatedEvent extends BaseDomainEvent<typeof VENDOR_COMMISSION_EVENT_TYPE.PERCENT_UPDATED, VendorCommissionPercentUpdatedPayload> {
  constructor(p: EventParams<VendorCommissionPercentUpdatedPayload>) { super(buildParams(VENDOR_COMMISSION_EVENT_TYPE.PERCENT_UPDATED, p)); }
}
export class VendorCommissionFixedUpdatedEvent extends BaseDomainEvent<typeof VENDOR_COMMISSION_EVENT_TYPE.FIXED_UPDATED, VendorCommissionFixedUpdatedPayload> {
  constructor(p: EventParams<VendorCommissionFixedUpdatedPayload>) { super(buildParams(VENDOR_COMMISSION_EVENT_TYPE.FIXED_UPDATED, p)); }
}
export class VendorCommissionActivatedEvent extends BaseDomainEvent<typeof VENDOR_COMMISSION_EVENT_TYPE.ACTIVATED, VendorCommissionStatusChangedPayload> {
  constructor(p: EventParams<VendorCommissionStatusChangedPayload>) { super(buildParams(VENDOR_COMMISSION_EVENT_TYPE.ACTIVATED, p)); }
}
export class VendorCommissionDeactivatedEvent extends BaseDomainEvent<typeof VENDOR_COMMISSION_EVENT_TYPE.DEACTIVATED, VendorCommissionStatusChangedPayload> {
  constructor(p: EventParams<VendorCommissionStatusChangedPayload>) { super(buildParams(VENDOR_COMMISSION_EVENT_TYPE.DEACTIVATED, p)); }
}
export class VendorCommissionTerminatedEvent extends BaseDomainEvent<typeof VENDOR_COMMISSION_EVENT_TYPE.TERMINATED, VendorCommissionTerminatedPayload> {
  constructor(p: EventParams<VendorCommissionTerminatedPayload>) { super(buildParams(VENDOR_COMMISSION_EVENT_TYPE.TERMINATED, p)); }
}
