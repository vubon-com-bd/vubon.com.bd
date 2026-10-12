/**
 * Vendor Shipping domain events
 * @module vendor-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { newEventId, now } from './event.helpers.js';

const AGGREGATE_TYPE = 'VendorShipping';

export const VENDOR_SHIPPING_EVENT_TYPE = {
  CONFIGURED: 'vendor.shipping.configured',
  RATE_ADDED: 'vendor.shipping.rate_added',
  RATE_UPDATED: 'vendor.shipping.rate_updated',
  RATE_REMOVED: 'vendor.shipping.rate_removed',
  DEFAULT_METHOD_CHANGED: 'vendor.shipping.default_method_changed',
  FREE_THRESHOLD_CHANGED: 'vendor.shipping.free_threshold_changed',
} as const;

export interface VendorShippingConfiguredPayload {
  readonly shippingId: string;
  readonly vendorId: string;
  readonly defaultMethod: string;
  readonly configuredAt: string;
}
export interface VendorShippingRateAddedPayload {
  readonly shippingId: string;
  readonly vendorId: string;
  readonly method: string;
  readonly zone: string;
  readonly cost: number;
  readonly currency: string;
  readonly addedAt: string;
}
export interface VendorShippingRateUpdatedPayload {
  readonly shippingId: string;
  readonly vendorId: string;
  readonly method: string;
  readonly zone: string;
  readonly oldCost: number;
  readonly newCost: number;
  readonly currency: string;
  readonly updatedAt: string;
}
export interface VendorShippingRateRemovedPayload {
  readonly shippingId: string;
  readonly vendorId: string;
  readonly method: string;
  readonly zone: string;
  readonly removedAt: string;
}
export interface VendorShippingDefaultMethodChangedPayload {
  readonly shippingId: string;
  readonly vendorId: string;
  readonly fromMethod: string;
  readonly toMethod: string;
  readonly changedAt: string;
}
export interface VendorShippingFreeThresholdChangedPayload {
  readonly shippingId: string;
  readonly vendorId: string;
  readonly oldThreshold?: number;
  readonly newThreshold?: number;
  readonly currency: string;
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

export class VendorShippingConfiguredEvent extends BaseDomainEvent<typeof VENDOR_SHIPPING_EVENT_TYPE.CONFIGURED, VendorShippingConfiguredPayload> {
  constructor(p: EventParams<VendorShippingConfiguredPayload>) { super(buildParams(VENDOR_SHIPPING_EVENT_TYPE.CONFIGURED, p)); }
}
export class VendorShippingRateAddedEvent extends BaseDomainEvent<typeof VENDOR_SHIPPING_EVENT_TYPE.RATE_ADDED, VendorShippingRateAddedPayload> {
  constructor(p: EventParams<VendorShippingRateAddedPayload>) { super(buildParams(VENDOR_SHIPPING_EVENT_TYPE.RATE_ADDED, p)); }
}
export class VendorShippingRateUpdatedEvent extends BaseDomainEvent<typeof VENDOR_SHIPPING_EVENT_TYPE.RATE_UPDATED, VendorShippingRateUpdatedPayload> {
  constructor(p: EventParams<VendorShippingRateUpdatedPayload>) { super(buildParams(VENDOR_SHIPPING_EVENT_TYPE.RATE_UPDATED, p)); }
}
export class VendorShippingRateRemovedEvent extends BaseDomainEvent<typeof VENDOR_SHIPPING_EVENT_TYPE.RATE_REMOVED, VendorShippingRateRemovedPayload> {
  constructor(p: EventParams<VendorShippingRateRemovedPayload>) { super(buildParams(VENDOR_SHIPPING_EVENT_TYPE.RATE_REMOVED, p)); }
}
export class VendorShippingDefaultMethodChangedEvent extends BaseDomainEvent<typeof VENDOR_SHIPPING_EVENT_TYPE.DEFAULT_METHOD_CHANGED, VendorShippingDefaultMethodChangedPayload> {
  constructor(p: EventParams<VendorShippingDefaultMethodChangedPayload>) { super(buildParams(VENDOR_SHIPPING_EVENT_TYPE.DEFAULT_METHOD_CHANGED, p)); }
}
export class VendorShippingFreeThresholdChangedEvent extends BaseDomainEvent<typeof VENDOR_SHIPPING_EVENT_TYPE.FREE_THRESHOLD_CHANGED, VendorShippingFreeThresholdChangedPayload> {
  constructor(p: EventParams<VendorShippingFreeThresholdChangedPayload>) { super(buildParams(VENDOR_SHIPPING_EVENT_TYPE.FREE_THRESHOLD_CHANGED, p)); }
}
