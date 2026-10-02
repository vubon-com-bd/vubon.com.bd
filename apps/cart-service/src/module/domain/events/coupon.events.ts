/**
 * Coupon domain events
 * @module cart-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { COUPON_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const COUPON_EVENT_TYPE = {
  APPLIED: 'cart.coupon.applied',
  REMOVED: 'cart.coupon.removed',
  INVALIDATED: 'cart.coupon.invalidated',
  REJECTED: 'cart.coupon.rejected',
} as const;

export interface CouponAppliedPayload {
  readonly cartId: string;
  readonly code: string;
  readonly discountAmount: number;
  readonly currency: string;
  readonly appliedBy?: string;
}

export interface CouponRemovedPayload {
  readonly cartId: string;
  readonly code: string;
  readonly removedBy?: string;
  readonly reason?: string;
}

export interface CouponInvalidatedPayload {
  readonly cartId: string;
  readonly code: string;
  readonly reason: string;
}

export interface CouponRejectedPayload {
  readonly cartId: string;
  readonly code: string;
  readonly reason: string;
  readonly errorCode: string;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

export class CouponAppliedEvent extends BaseDomainEvent<
  typeof COUPON_EVENT_TYPE.APPLIED,
  CouponAppliedPayload
> {
  constructor(p: EventParams<CouponAppliedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: COUPON_EVENT_TYPE.APPLIED,
      aggregateId: p.aggregateId,
      aggregateType: COUPON_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class CouponRemovedEvent extends BaseDomainEvent<
  typeof COUPON_EVENT_TYPE.REMOVED,
  CouponRemovedPayload
> {
  constructor(p: EventParams<CouponRemovedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: COUPON_EVENT_TYPE.REMOVED,
      aggregateId: p.aggregateId,
      aggregateType: COUPON_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class CouponInvalidatedEvent extends BaseDomainEvent<
  typeof COUPON_EVENT_TYPE.INVALIDATED,
  CouponInvalidatedPayload
> {
  constructor(p: EventParams<CouponInvalidatedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: COUPON_EVENT_TYPE.INVALIDATED,
      aggregateId: p.aggregateId,
      aggregateType: COUPON_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class CouponRejectedEvent extends BaseDomainEvent<
  typeof COUPON_EVENT_TYPE.REJECTED,
  CouponRejectedPayload
> {
  constructor(p: EventParams<CouponRejectedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: COUPON_EVENT_TYPE.REJECTED,
      aggregateId: p.aggregateId,
      aggregateType: COUPON_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}
