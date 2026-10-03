/**
 * Order Item domain events
 * @module order-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { ORDER_ITEM_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const ORDER_ITEM_EVENT_TYPE = {
  ADDED: 'order.item.added',
  UPDATED: 'order.item.updated',
  REMOVED: 'order.item.removed',
  STATUS_CHANGED: 'order.item.status_changed',
} as const;

export interface OrderItemAddedPayload {
  readonly orderId: string;
  readonly itemId: string;
  readonly productId: string;
  readonly variantId?: string;
  readonly vendorId?: string;
  readonly sku: string;
  readonly name: string;
  readonly quantity: number;
  readonly unitPrice: number;
  readonly currency: string;
}

export interface OrderItemUpdatedPayload {
  readonly orderId: string;
  readonly itemId: string;
  readonly changedFields: readonly string[];
}

export interface OrderItemRemovedPayload {
  readonly orderId: string;
  readonly itemId: string;
  readonly productId: string;
  readonly quantity: number;
  readonly removedBy?: string;
}

export interface OrderItemStatusChangedPayload {
  readonly orderId: string;
  readonly itemId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly changedBy?: string;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

export class OrderItemAddedEvent extends BaseDomainEvent<
  typeof ORDER_ITEM_EVENT_TYPE.ADDED,
  OrderItemAddedPayload
> {
  constructor(p: EventParams<OrderItemAddedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_ITEM_EVENT_TYPE.ADDED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_ITEM_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class OrderItemUpdatedEvent extends BaseDomainEvent<
  typeof ORDER_ITEM_EVENT_TYPE.UPDATED,
  OrderItemUpdatedPayload
> {
  constructor(p: EventParams<OrderItemUpdatedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_ITEM_EVENT_TYPE.UPDATED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_ITEM_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class OrderItemRemovedEvent extends BaseDomainEvent<
  typeof ORDER_ITEM_EVENT_TYPE.REMOVED,
  OrderItemRemovedPayload
> {
  constructor(p: EventParams<OrderItemRemovedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_ITEM_EVENT_TYPE.REMOVED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_ITEM_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class OrderItemStatusChangedEvent extends BaseDomainEvent<
  typeof ORDER_ITEM_EVENT_TYPE.STATUS_CHANGED,
  OrderItemStatusChangedPayload
> {
  constructor(p: EventParams<OrderItemStatusChangedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_ITEM_EVENT_TYPE.STATUS_CHANGED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_ITEM_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}
