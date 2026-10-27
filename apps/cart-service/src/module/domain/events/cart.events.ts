/**
 * Cart Domain Events
 * @module cart-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { CART_AGGREGATE_TYPE, newEventId, nowTimestamp } from './event.helpers.js';

export const CART_EVENT_TYPE = {
  CREATED: 'cart.cart.created',
  ACTIVATED: 'cart.cart.activated',
  ABANDONED: 'cart.cart.abandoned',
  CONVERTED: 'cart.cart.converted',
  EXPIRED: 'cart.cart.expired',
  MERGED: 'cart.cart.merged',
  CLEARED: 'cart.cart.cleared',
  STATUS_CHANGED: 'cart.cart.status_changed',
  TOTALS_RECALCULATED: 'cart.cart.totals_recalculated',
  CHECKED_OUT: 'cart.cart.checked_out',
} as const;

export interface CartCreatedPayload {
  readonly cartId: string;
  readonly type: string;
  readonly currency: string;
  readonly createdAt: string;
}

export interface CartStatusChangedPayload {
  readonly cartId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly changedBy?: string;
}

export interface CartTotalsRecalculatedPayload {
  readonly cartId: string;
  readonly subtotal: number;
  readonly discount: number;
  readonly tax: number;
  readonly shipping: number;
  readonly total: number;
  readonly currency: string;
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
    aggregateType: CART_AGGREGATE_TYPE.CART,
    payload: p.payload,
    occurredAt: p.occurredAt ?? nowTimestamp(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class CartCreatedEvent extends BaseDomainEvent<
  typeof CART_EVENT_TYPE.CREATED,
  CartCreatedPayload
> {
  constructor(p: EventParams<CartCreatedPayload>) {
    super(buildParams(CART_EVENT_TYPE.CREATED, p));
  }
}

export class CartActivatedEvent extends BaseDomainEvent<
  typeof CART_EVENT_TYPE.ACTIVATED,
  { cartId: string }
> {
  constructor(p: EventParams<{ cartId: string }>) {
    super(buildParams(CART_EVENT_TYPE.ACTIVATED, p));
  }
}

export class CartAbandonedEvent extends BaseDomainEvent<
  typeof CART_EVENT_TYPE.ABANDONED,
  { cartId: string; abandonedAt: string; itemCount: number }
> {
  constructor(p: EventParams<{ cartId: string; abandonedAt: string; itemCount: number }>) {
    super(buildParams(CART_EVENT_TYPE.ABANDONED, p));
  }
}

export class CartConvertedEvent extends BaseDomainEvent<
  typeof CART_EVENT_TYPE.CONVERTED,
  { cartId: string; orderId: string; convertedAt: string }
> {
  constructor(p: EventParams<{ cartId: string; orderId: string; convertedAt: string }>) {
    super(buildParams(CART_EVENT_TYPE.CONVERTED, p));
  }
}

export class CartExpiredEvent extends BaseDomainEvent<
  typeof CART_EVENT_TYPE.EXPIRED,
  { cartId: string; expiredAt: string }
> {
  constructor(p: EventParams<{ cartId: string; expiredAt: string }>) {
    super(buildParams(CART_EVENT_TYPE.EXPIRED, p));
  }
}

export class CartMergedEvent extends BaseDomainEvent<
  typeof CART_EVENT_TYPE.MERGED,
  { cartId: string; sourceCartId: string; targetCartId: string }
> {
  constructor(
    p: EventParams<{ cartId: string; sourceCartId: string; targetCartId: string }>,
  ) {
    super(buildParams(CART_EVENT_TYPE.MERGED, p));
  }
}

export class CartClearedEvent extends BaseDomainEvent<
  typeof CART_EVENT_TYPE.CLEARED,
  { cartId: string; clearedAt: string }
> {
  constructor(p: EventParams<{ cartId: string; clearedAt: string }>) {
    super(buildParams(CART_EVENT_TYPE.CLEARED, p));
  }
}

export class CartStatusChangedEvent extends BaseDomainEvent<
  typeof CART_EVENT_TYPE.STATUS_CHANGED,
  CartStatusChangedPayload
> {
  constructor(p: EventParams<CartStatusChangedPayload>) {
    super(buildParams(CART_EVENT_TYPE.STATUS_CHANGED, p));
  }
}

export class CartTotalsRecalculatedEvent extends BaseDomainEvent<
  typeof CART_EVENT_TYPE.TOTALS_RECALCULATED,
  CartTotalsRecalculatedPayload
> {
  constructor(p: EventParams<CartTotalsRecalculatedPayload>) {
    super(buildParams(CART_EVENT_TYPE.TOTALS_RECALCULATED, p));
  }
}

// ─── CartCheckedOutEvent (rich payload for order-service) ──────────────
export interface CartCheckedOutItemPayload {
  readonly productId: string;
  readonly variantId?: string;
  readonly name: string;
  readonly sku: string;
  readonly quantity: number;
  readonly unitPrice: number;
  readonly totalPrice: number;
}

export interface CartCheckedOutPayload {
  readonly cartId: string;
  readonly userId: string;
  readonly items: readonly CartCheckedOutItemPayload[];
  readonly subtotal: number;
  readonly discountAmount?: number;
  readonly taxAmount?: number;
  readonly shippingAmount?: number;
  readonly total: number;
  readonly currency: string;
  readonly shippingAddressId?: string;
  readonly checkedOutAt: string;
}

export class CartCheckedOutEvent extends BaseDomainEvent<
  typeof CART_EVENT_TYPE.CHECKED_OUT,
  CartCheckedOutPayload
> {
  constructor(p: EventParams<CartCheckedOutPayload>) {
    super(buildParams(CART_EVENT_TYPE.CHECKED_OUT, p));
  }
}
