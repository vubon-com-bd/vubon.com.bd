/**
 * Vendor Subscription domain events
 * @module vendor-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { newEventId, now } from './event.helpers.js';

const AGGREGATE_TYPE = 'VendorSubscription';

export const VENDOR_SUBSCRIPTION_EVENT_TYPE = {
  CREATED: 'vendor.subscription.created',
  PLAN_CHANGED: 'vendor.subscription.plan_changed',
  RENEWED: 'vendor.subscription.renewed',
  CANCELLED: 'vendor.subscription.cancelled',
  RESUMED: 'vendor.subscription.resumed',
  PAST_DUE: 'vendor.subscription.past_due',
  EXPIRED: 'vendor.subscription.expired',
} as const;

export interface VendorSubscriptionCreatedPayload {
  readonly subscriptionId: string;
  readonly vendorId: string;
  readonly plan: string;
  readonly cycle: string;
  readonly price: number;
  readonly currency: string;
  readonly trialEndsAt?: string;
  readonly createdAt: string;
}
export interface VendorSubscriptionPlanChangedPayload {
  readonly subscriptionId: string;
  readonly vendorId: string;
  readonly fromPlan: string;
  readonly toPlan: string;
  readonly newPrice: number;
  readonly currency: string;
  readonly changedAt: string;
}
export interface VendorSubscriptionRenewedPayload {
  readonly subscriptionId: string;
  readonly vendorId: string;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly renewedAt: string;
}
export interface VendorSubscriptionCancelledPayload {
  readonly subscriptionId: string;
  readonly vendorId: string;
  readonly immediate: boolean;
  readonly cancelledAt: string;
}
export interface VendorSubscriptionResumedPayload {
  readonly subscriptionId: string;
  readonly vendorId: string;
  readonly resumedAt: string;
}
export interface VendorSubscriptionPastDuePayload {
  readonly subscriptionId: string;
  readonly vendorId: string;
  readonly markedAt: string;
}
export interface VendorSubscriptionExpiredPayload {
  readonly subscriptionId: string;
  readonly vendorId: string;
  readonly expiredAt: string;
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

export class VendorSubscriptionCreatedEvent extends BaseDomainEvent<typeof VENDOR_SUBSCRIPTION_EVENT_TYPE.CREATED, VendorSubscriptionCreatedPayload> {
  constructor(p: EventParams<VendorSubscriptionCreatedPayload>) { super(buildParams(VENDOR_SUBSCRIPTION_EVENT_TYPE.CREATED, p)); }
}
export class VendorSubscriptionPlanChangedEvent extends BaseDomainEvent<typeof VENDOR_SUBSCRIPTION_EVENT_TYPE.PLAN_CHANGED, VendorSubscriptionPlanChangedPayload> {
  constructor(p: EventParams<VendorSubscriptionPlanChangedPayload>) { super(buildParams(VENDOR_SUBSCRIPTION_EVENT_TYPE.PLAN_CHANGED, p)); }
}
export class VendorSubscriptionRenewedEvent extends BaseDomainEvent<typeof VENDOR_SUBSCRIPTION_EVENT_TYPE.RENEWED, VendorSubscriptionRenewedPayload> {
  constructor(p: EventParams<VendorSubscriptionRenewedPayload>) { super(buildParams(VENDOR_SUBSCRIPTION_EVENT_TYPE.RENEWED, p)); }
}
export class VendorSubscriptionCancelledEvent extends BaseDomainEvent<typeof VENDOR_SUBSCRIPTION_EVENT_TYPE.CANCELLED, VendorSubscriptionCancelledPayload> {
  constructor(p: EventParams<VendorSubscriptionCancelledPayload>) { super(buildParams(VENDOR_SUBSCRIPTION_EVENT_TYPE.CANCELLED, p)); }
}
export class VendorSubscriptionResumedEvent extends BaseDomainEvent<typeof VENDOR_SUBSCRIPTION_EVENT_TYPE.RESUMED, VendorSubscriptionResumedPayload> {
  constructor(p: EventParams<VendorSubscriptionResumedPayload>) { super(buildParams(VENDOR_SUBSCRIPTION_EVENT_TYPE.RESUMED, p)); }
}
export class VendorSubscriptionPastDueEvent extends BaseDomainEvent<typeof VENDOR_SUBSCRIPTION_EVENT_TYPE.PAST_DUE, VendorSubscriptionPastDuePayload> {
  constructor(p: EventParams<VendorSubscriptionPastDuePayload>) { super(buildParams(VENDOR_SUBSCRIPTION_EVENT_TYPE.PAST_DUE, p)); }
}
export class VendorSubscriptionExpiredEvent extends BaseDomainEvent<typeof VENDOR_SUBSCRIPTION_EVENT_TYPE.EXPIRED, VendorSubscriptionExpiredPayload> {
  constructor(p: EventParams<VendorSubscriptionExpiredPayload>) { super(buildParams(VENDOR_SUBSCRIPTION_EVENT_TYPE.EXPIRED, p)); }
}
