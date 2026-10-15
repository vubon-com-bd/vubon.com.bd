/**
 * Coupon Domain Events
 * @module cart-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { CART_AGGREGATE_TYPE, newEventId, nowTimestamp } from './event.helpers.js';

export const COUPON_EVENT_TYPE = {
  APPLIED: 'cart.coupon.applied',
  REMOVED: 'cart.coupon.removed',
  VALIDATED: 'cart.coupon.validated',
  REJECTED: 'cart.coupon.rejected',
} as const;

export interface CouponAppliedPayload {
  readonly cartId: string;
  readonly couponCode: string;
  readonly discountAmount: number;
  readonly currency: string;
  readonly appliedAt: string;
}

export interface CouponRemovedPayload {
  readonly cartId: string;
  readonly couponCode: string;
  readonly reason?: string;
}

export interface CouponValidatedPayload {
  readonly cartId: string;
  readonly couponCode: string;
  readonly valid: boolean;
  readonly discountAmount?: number;
}

export interface CouponRejectedPayload {
  readonly cartId: string;
  readonly couponCode: string;
  readonly reason: string;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

function buildParams<TType extends string, TPayload>(
  type: TType,
  p: EventParams<TPayload>,
) {
  return {
    id: p.id ?? newEventId(),
    type,
    aggregateId: p.aggregateId,
    aggregateType: CART_AGGREGATE_TYPE.COUPON,
    payload: p.payload,
    occurredAt: p.occurredAt ?? nowTimestamp(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class CouponAppliedEvent extends BaseDomainEvent<
  typeof COUPON_EVENT_TYPE.APPLIED,
  CouponAppliedPayload
> {
  constructor(p: EventParams<CouponAppliedPayload>) {
    super(buildParams(COUPON_EVENT_TYPE.APPLIED, p));
  }
}

export class CouponRemovedEvent extends BaseDomainEvent<
  typeof COUPON_EVENT_TYPE.REMOVED,
  CouponRemovedPayload
> {
  constructor(p: EventParams<CouponRemovedPayload>) {
    super(buildParams(COUPON_EVENT_TYPE.REMOVED, p));
  }
}

export class CouponValidatedEvent extends BaseDomainEvent<
  typeof COUPON_EVENT_TYPE.VALIDATED,
  CouponValidatedPayload
> {
  constructor(p: EventParams<CouponValidatedPayload>) {
    super(buildParams(COUPON_EVENT_TYPE.VALIDATED, p));
  }
}

export class CouponRejectedEvent extends BaseDomainEvent<
  typeof COUPON_EVENT_TYPE.REJECTED,
  CouponRejectedPayload
> {
  constructor(p: EventParams<CouponRejectedPayload>) {
    super(buildParams(COUPON_EVENT_TYPE.REJECTED, p));
  }
}
