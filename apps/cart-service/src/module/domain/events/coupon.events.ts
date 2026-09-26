import { BaseDomainEvent, type DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'CartCoupon';

export class CouponAppliedEvent extends BaseDomainEvent<'cart.coupon.applied', { cartId: string; code: string; discount: number }> {
  constructor(cartId: string, code: string, discount: number, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'cart.coupon.applied', aggregateId: cartId, aggregateType: AGG, payload: { cartId, code, discount }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

export class CouponRemovedEvent extends BaseDomainEvent<'cart.coupon.removed', { cartId: string; code: string }> {
  constructor(cartId: string, code: string, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'cart.coupon.removed', aggregateId: cartId, aggregateType: AGG, payload: { cartId, code }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

export class CouponInvalidatedEvent extends BaseDomainEvent<'cart.coupon.invalidated', { cartId: string; code: string; reason: string }> {
  constructor(cartId: string, code: string, reason: string, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'cart.coupon.invalidated', aggregateId: cartId, aggregateType: AGG, payload: { cartId, code, reason }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}
