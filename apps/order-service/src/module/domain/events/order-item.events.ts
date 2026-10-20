/**
 * Order Item Domain Events
 * @module order-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { ORDER_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const ORDER_ITEM_EVENT_TYPE = {
  ADDED: 'order-service.order-item.added',
  UPDATED: 'order-service.order-item.updated',
  REMOVED: 'order-service.order-item.removed',
  STATUS_CHANGED: 'order-service.order-item.status_changed',
  QUANTITY_CHANGED: 'order-service.order-item.quantity_changed',
} as const;

export interface OrderItemAddedPayload {
  readonly orderItemId: string;
  readonly orderId: string;
  readonly productId: string;
  readonly variantId?: string;
  readonly quantity: number;
  readonly unitPrice: number;
  readonly currency: string;
}

export interface OrderItemUpdatedPayload {
  readonly orderItemId: string;
  readonly orderId: string;
  readonly changedFields: readonly string[];
}

export interface OrderItemRemovedPayload {
  readonly orderItemId: string;
  readonly orderId: string;
  readonly reason?: string;
}

export interface OrderItemStatusChangedPayload {
  readonly orderItemId: string;
  readonly orderId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly changedBy?: string;
}

export interface OrderItemQuantityChangedPayload {
  readonly orderItemId: string;
  readonly orderId: string;
  readonly fromQuantity: number;
  readonly toQuantity: number;
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
    aggregateType: ORDER_AGGREGATE_TYPE.ORDER_ITEM,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class OrderItemAddedEvent extends BaseDomainEvent<
  typeof ORDER_ITEM_EVENT_TYPE.ADDED,
  OrderItemAddedPayload
> {
  constructor(p: EventParams<OrderItemAddedPayload>) {
    super(buildParams(ORDER_ITEM_EVENT_TYPE.ADDED, p));
  }
}

export class OrderItemUpdatedEvent extends BaseDomainEvent<
  typeof ORDER_ITEM_EVENT_TYPE.UPDATED,
  OrderItemUpdatedPayload
> {
  constructor(p: EventParams<OrderItemUpdatedPayload>) {
    super(buildParams(ORDER_ITEM_EVENT_TYPE.UPDATED, p));
  }
}

export class OrderItemRemovedEvent extends BaseDomainEvent<
  typeof ORDER_ITEM_EVENT_TYPE.REMOVED,
  OrderItemRemovedPayload
> {
  constructor(p: EventParams<OrderItemRemovedPayload>) {
    super(buildParams(ORDER_ITEM_EVENT_TYPE.REMOVED, p));
  }
}

export class OrderItemStatusChangedEvent extends BaseDomainEvent<
  typeof ORDER_ITEM_EVENT_TYPE.STATUS_CHANGED,
  OrderItemStatusChangedPayload
> {
  constructor(p: EventParams<OrderItemStatusChangedPayload>) {
    super(buildParams(ORDER_ITEM_EVENT_TYPE.STATUS_CHANGED, p));
  }
}

export class OrderItemQuantityChangedEvent extends BaseDomainEvent<
  typeof ORDER_ITEM_EVENT_TYPE.QUANTITY_CHANGED,
  OrderItemQuantityChangedPayload
> {
  constructor(p: EventParams<OrderItemQuantityChangedPayload>) {
    super(buildParams(ORDER_ITEM_EVENT_TYPE.QUANTITY_CHANGED, p));
  }
}
