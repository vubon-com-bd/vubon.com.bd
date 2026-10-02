/**
 * Cart Item domain events
 * @module cart-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { CART_ITEM_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const CART_ITEM_EVENT_TYPE = {
  ADDED: 'cart.item.added',
  UPDATED: 'cart.item.updated',
  REMOVED: 'cart.item.removed',
  QUANTITY_CHANGED: 'cart.item.quantity.changed',
  SELECTED: 'cart.item.selected',
  DESELECTED: 'cart.item.deselected',
  UNAVAILABLE: 'cart.item.unavailable',
  BACK_IN_STOCK: 'cart.item.back.in.stock',
} as const;

export interface ItemAddedPayload {
  readonly cartId: string;
  readonly itemId: string;
  readonly productId: string;
  readonly variantId?: string;
  readonly sku: string;
  readonly quantity: number;
  readonly unitPrice: number;
  readonly currency: string;
}

export interface ItemUpdatedPayload {
  readonly cartId: string;
  readonly itemId: string;
  readonly changedFields: readonly string[];
}

export interface ItemRemovedPayload {
  readonly cartId: string;
  readonly itemId: string;
  readonly productId: string;
  readonly quantity: number;
  readonly removedBy?: string;
}

export interface ItemQuantityChangedPayload {
  readonly cartId: string;
  readonly itemId: string;
  readonly oldQuantity: number;
  readonly newQuantity: number;
  readonly reason?: string;
}

export interface ItemSelectedPayload {
  readonly cartId: string;
  readonly itemId: string;
  readonly selected: boolean;
}

export interface ItemAvailabilityPayload {
  readonly cartId: string;
  readonly itemId: string;
  readonly productId: string;
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

export class ItemAddedEvent extends BaseDomainEvent<
  typeof CART_ITEM_EVENT_TYPE.ADDED,
  ItemAddedPayload
> {
  constructor(p: EventParams<ItemAddedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: CART_ITEM_EVENT_TYPE.ADDED,
      aggregateId: p.aggregateId,
      aggregateType: CART_ITEM_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class ItemUpdatedEvent extends BaseDomainEvent<
  typeof CART_ITEM_EVENT_TYPE.UPDATED,
  ItemUpdatedPayload
> {
  constructor(p: EventParams<ItemUpdatedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: CART_ITEM_EVENT_TYPE.UPDATED,
      aggregateId: p.aggregateId,
      aggregateType: CART_ITEM_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class ItemRemovedEvent extends BaseDomainEvent<
  typeof CART_ITEM_EVENT_TYPE.REMOVED,
  ItemRemovedPayload
> {
  constructor(p: EventParams<ItemRemovedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: CART_ITEM_EVENT_TYPE.REMOVED,
      aggregateId: p.aggregateId,
      aggregateType: CART_ITEM_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class ItemQuantityChangedEvent extends BaseDomainEvent<
  typeof CART_ITEM_EVENT_TYPE.QUANTITY_CHANGED,
  ItemQuantityChangedPayload
> {
  constructor(p: EventParams<ItemQuantityChangedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: CART_ITEM_EVENT_TYPE.QUANTITY_CHANGED,
      aggregateId: p.aggregateId,
      aggregateType: CART_ITEM_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class ItemSelectedEvent extends BaseDomainEvent<
  typeof CART_ITEM_EVENT_TYPE.SELECTED,
  ItemSelectedPayload
> {
  constructor(p: EventParams<ItemSelectedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: CART_ITEM_EVENT_TYPE.SELECTED,
      aggregateId: p.aggregateId,
      aggregateType: CART_ITEM_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class ItemDeselectedEvent extends BaseDomainEvent<
  typeof CART_ITEM_EVENT_TYPE.DESELECTED,
  ItemSelectedPayload
> {
  constructor(p: EventParams<ItemSelectedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: CART_ITEM_EVENT_TYPE.DESELECTED,
      aggregateId: p.aggregateId,
      aggregateType: CART_ITEM_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class ItemUnavailableEvent extends BaseDomainEvent<
  typeof CART_ITEM_EVENT_TYPE.UNAVAILABLE,
  ItemAvailabilityPayload
> {
  constructor(p: EventParams<ItemAvailabilityPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: CART_ITEM_EVENT_TYPE.UNAVAILABLE,
      aggregateId: p.aggregateId,
      aggregateType: CART_ITEM_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class ItemBackInStockEvent extends BaseDomainEvent<
  typeof CART_ITEM_EVENT_TYPE.BACK_IN_STOCK,
  ItemAvailabilityPayload
> {
  constructor(p: EventParams<ItemAvailabilityPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: CART_ITEM_EVENT_TYPE.BACK_IN_STOCK,
      aggregateId: p.aggregateId,
      aggregateType: CART_ITEM_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}
