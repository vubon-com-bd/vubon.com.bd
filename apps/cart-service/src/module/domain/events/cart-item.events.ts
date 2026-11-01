/**
 * CartItem Domain Events
 * @module cart-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { CART_AGGREGATE_TYPE, newEventId, nowTimestamp } from './event.helpers.js';

export const CART_ITEM_EVENT_TYPE = {
  ADDED: 'cart.cart_item.added',
  QUANTITY_CHANGED: 'cart.cart_item.quantity_changed',
  REMOVED: 'cart.cart_item.removed',
  STATUS_CHANGED: 'cart.cart_item.status_changed',
  SAVED_FOR_LATER: 'cart.cart_item.saved_for_later',
  MOVED_TO_CART: 'cart.cart_item.moved_to_cart',
} as const;

export interface CartItemAddedPayload {
  readonly cartId: string;
  readonly itemId: string;
  readonly userId?: string;
  readonly userEmail?: string;
  readonly productId: string;
  readonly variantId?: string;
  readonly quantity: number;
  readonly unitPrice: number;
  readonly currency: string;
  readonly addedAt: string;
}

export interface CartItemQuantityChangedPayload {
  readonly cartId: string;
  readonly itemId: string;
  readonly oldQuantity: number;
  readonly newQuantity: number;
}

export interface CartItemRemovedPayload {
  readonly cartId: string;
  readonly itemId: string;
  readonly productId: string;
  readonly reason?: string;
}

export interface CartItemStatusChangedPayload {
  readonly cartId: string;
  readonly itemId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
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
    aggregateType: CART_AGGREGATE_TYPE.CART_ITEM,
    payload: p.payload,
    occurredAt: p.occurredAt ?? nowTimestamp(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class CartItemAddedEvent extends BaseDomainEvent<
  typeof CART_ITEM_EVENT_TYPE.ADDED,
  CartItemAddedPayload
> {
  constructor(p: EventParams<CartItemAddedPayload>) {
    super(buildParams(CART_ITEM_EVENT_TYPE.ADDED, p));
  }
}

export class CartItemQuantityChangedEvent extends BaseDomainEvent<
  typeof CART_ITEM_EVENT_TYPE.QUANTITY_CHANGED,
  CartItemQuantityChangedPayload
> {
  constructor(p: EventParams<CartItemQuantityChangedPayload>) {
    super(buildParams(CART_ITEM_EVENT_TYPE.QUANTITY_CHANGED, p));
  }
}

export class CartItemRemovedEvent extends BaseDomainEvent<
  typeof CART_ITEM_EVENT_TYPE.REMOVED,
  CartItemRemovedPayload
> {
  constructor(p: EventParams<CartItemRemovedPayload>) {
    super(buildParams(CART_ITEM_EVENT_TYPE.REMOVED, p));
  }
}

export class CartItemStatusChangedEvent extends BaseDomainEvent<
  typeof CART_ITEM_EVENT_TYPE.STATUS_CHANGED,
  CartItemStatusChangedPayload
> {
  constructor(p: EventParams<CartItemStatusChangedPayload>) {
    super(buildParams(CART_ITEM_EVENT_TYPE.STATUS_CHANGED, p));
  }
}

export class CartItemSavedForLaterEvent extends BaseDomainEvent<
  typeof CART_ITEM_EVENT_TYPE.SAVED_FOR_LATER,
  { cartId: string; itemId: string; savedItemId: string }
> {
  constructor(p: EventParams<{ cartId: string; itemId: string; savedItemId: string }>) {
    super(buildParams(CART_ITEM_EVENT_TYPE.SAVED_FOR_LATER, p));
  }
}

export class CartItemMovedToCartEvent extends BaseDomainEvent<
  typeof CART_ITEM_EVENT_TYPE.MOVED_TO_CART,
  { savedItemId: string; cartId: string; itemId: string }
> {
  constructor(p: EventParams<{ savedItemId: string; cartId: string; itemId: string }>) {
    super(buildParams(CART_ITEM_EVENT_TYPE.MOVED_TO_CART, p));
  }
}
