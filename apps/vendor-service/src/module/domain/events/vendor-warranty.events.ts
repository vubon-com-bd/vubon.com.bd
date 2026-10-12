/**
 * Vendor Warranty domain events
 * @module vendor-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { newEventId, now } from './event.helpers.js';

const AGGREGATE_TYPE = 'VendorWarranty';

export const VENDOR_WARRANTY_EVENT_TYPE = {
  CONFIGURED: 'vendor.warranty.configured',
  TYPE_CHANGED: 'vendor.warranty.type_changed',
  PERIOD_CHANGED: 'vendor.warranty.period_changed',
  EXCLUSION_ADDED: 'vendor.warranty.exclusion_added',
  EXCLUSION_REMOVED: 'vendor.warranty.exclusion_removed',
} as const;

export interface VendorWarrantyConfiguredPayload {
  readonly warrantyId: string;
  readonly vendorId: string;
  readonly type: string;
  readonly periodDays: number;
  readonly coversShipping: boolean;
  readonly configuredAt: string;
}
export interface VendorWarrantyTypeChangedPayload {
  readonly warrantyId: string;
  readonly vendorId: string;
  readonly fromType: string;
  readonly toType: string;
  readonly changedAt: string;
}
export interface VendorWarrantyPeriodChangedPayload {
  readonly warrantyId: string;
  readonly vendorId: string;
  readonly fromDays: number;
  readonly toDays: number;
  readonly changedAt: string;
}
export interface VendorWarrantyExclusionPayload {
  readonly warrantyId: string;
  readonly vendorId: string;
  readonly term: string;
  readonly changedAt: string;
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

export class VendorWarrantyConfiguredEvent extends BaseDomainEvent<typeof VENDOR_WARRANTY_EVENT_TYPE.CONFIGURED, VendorWarrantyConfiguredPayload> {
  constructor(p: EventParams<VendorWarrantyConfiguredPayload>) { super(buildParams(VENDOR_WARRANTY_EVENT_TYPE.CONFIGURED, p)); }
}
export class VendorWarrantyTypeChangedEvent extends BaseDomainEvent<typeof VENDOR_WARRANTY_EVENT_TYPE.TYPE_CHANGED, VendorWarrantyTypeChangedPayload> {
  constructor(p: EventParams<VendorWarrantyTypeChangedPayload>) { super(buildParams(VENDOR_WARRANTY_EVENT_TYPE.TYPE_CHANGED, p)); }
}
export class VendorWarrantyPeriodChangedEvent extends BaseDomainEvent<typeof VENDOR_WARRANTY_EVENT_TYPE.PERIOD_CHANGED, VendorWarrantyPeriodChangedPayload> {
  constructor(p: EventParams<VendorWarrantyPeriodChangedPayload>) { super(buildParams(VENDOR_WARRANTY_EVENT_TYPE.PERIOD_CHANGED, p)); }
}
export class VendorWarrantyExclusionAddedEvent extends BaseDomainEvent<typeof VENDOR_WARRANTY_EVENT_TYPE.EXCLUSION_ADDED, VendorWarrantyExclusionPayload> {
  constructor(p: EventParams<VendorWarrantyExclusionPayload>) { super(buildParams(VENDOR_WARRANTY_EVENT_TYPE.EXCLUSION_ADDED, p)); }
}
export class VendorWarrantyExclusionRemovedEvent extends BaseDomainEvent<typeof VENDOR_WARRANTY_EVENT_TYPE.EXCLUSION_REMOVED, VendorWarrantyExclusionPayload> {
  constructor(p: EventParams<VendorWarrantyExclusionPayload>) { super(buildParams(VENDOR_WARRANTY_EVENT_TYPE.EXCLUSION_REMOVED, p)); }
}
