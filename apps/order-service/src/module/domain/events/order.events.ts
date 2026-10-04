/**
 * Order domain events
 * @module order-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { ORDER_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const ORDER_EVENT_TYPE = {
  CREATED: 'order.created',
  UPDATED: 'order.updated',
  CONFIRMED: 'order.confirmed',
  PROCESSING: 'order.processing',
  PACKED: 'order.packed',
  SHIPPED: 'order.shipped',
  OUT_FOR_DELIVERY: 'order.out_for_delivery',
  DELIVERED: 'order.delivered',
  COMPLETED: 'order.completed',
  CANCELLED: 'order.cancelled',
  RETURNED: 'order.returned',
  REFUNDED: 'order.refunded',
  ON_HOLD: 'order.on_hold',
  RELEASED: 'order.released',
  STATUS_CHANGED: 'order.status_changed',
  PRIORITY_CHANGED: 'order.priority_changed',
  NOTES_UPDATED: 'order.notes_updated',
} as const;

export interface OrderCreatedPayload {
  readonly orderId: string;
  readonly orderNumber: string;
  readonly customerId: string;
  readonly itemCount: number;
  readonly total: number;
  readonly currency: string;
  readonly status: string;
  readonly type: string;
}

export interface OrderUpdatedPayload {
  readonly orderId: string;
  readonly changedFields: readonly string[];
}

export interface OrderConfirmedPayload {
  readonly orderId: string;
  readonly confirmedAt: string;
  readonly paymentId?: string;
}

export interface OrderProcessingPayload {
  readonly orderId: string;
  readonly startedAt: string;
}

export interface OrderPackedPayload {
  readonly orderId: string;
  readonly packedAt: string;
  readonly fulfillmentId?: string;
}

export interface OrderShippedPayload {
  readonly orderId: string;
  readonly shippedAt: string;
  readonly trackingNumber?: string;
  readonly courierId?: string;
}

export interface OrderOutForDeliveryPayload {
  readonly orderId: string;
  readonly outAt: string;
  readonly deliveryId?: string;
}

export interface OrderDeliveredPayload {
  readonly orderId: string;
  readonly deliveredAt: string;
  readonly receivedBy?: string;
}

export interface OrderCompletedPayload {
  readonly orderId: string;
  readonly completedAt: string;
}

export interface OrderCancelledPayload {
  readonly orderId: string;
  readonly cancelledAt: string;
  readonly reason: string;
  readonly cancelledBy?: string;
  readonly refundAmount?: number;
  readonly currency?: string;
}

export interface OrderReturnedPayload {
  readonly orderId: string;
  readonly returnId: string;
  readonly returnedAt: string;
  readonly reason: string;
  readonly itemIds: readonly string[];
}

export interface OrderRefundedPayload {
  readonly orderId: string;
  readonly refundedAt: string;
  readonly amount: number;
  readonly currency: string;
  readonly refundId?: string;
}

export interface OrderOnHoldPayload {
  readonly orderId: string;
  readonly onHoldAt: string;
  readonly reason: string;
}

export interface OrderReleasedPayload {
  readonly orderId: string;
  readonly releasedAt: string;
  readonly releasedBy?: string;
}

export interface OrderStatusChangedPayload {
  readonly orderId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly changedBy?: string;
}

export interface OrderPriorityChangedPayload {
  readonly orderId: string;
  readonly fromPriority: string;
  readonly toPriority: string;
  readonly changedBy?: string;
}

export interface OrderNotesUpdatedPayload {
  readonly orderId: string;
  readonly field: 'notes' | 'customerNotes';
  readonly previousValue?: string;
  readonly newValue?: string;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

export class OrderCreatedEvent extends BaseDomainEvent<
  typeof ORDER_EVENT_TYPE.CREATED,
  OrderCreatedPayload
> {
  constructor(p: EventParams<OrderCreatedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_EVENT_TYPE.CREATED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class OrderUpdatedEvent extends BaseDomainEvent<
  typeof ORDER_EVENT_TYPE.UPDATED,
  OrderUpdatedPayload
> {
  constructor(p: EventParams<OrderUpdatedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_EVENT_TYPE.UPDATED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class OrderConfirmedEvent extends BaseDomainEvent<
  typeof ORDER_EVENT_TYPE.CONFIRMED,
  OrderConfirmedPayload
> {
  constructor(p: EventParams<OrderConfirmedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_EVENT_TYPE.CONFIRMED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class OrderProcessingEvent extends BaseDomainEvent<
  typeof ORDER_EVENT_TYPE.PROCESSING,
  OrderProcessingPayload
> {
  constructor(p: EventParams<OrderProcessingPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_EVENT_TYPE.PROCESSING,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class OrderPackedEvent extends BaseDomainEvent<
  typeof ORDER_EVENT_TYPE.PACKED,
  OrderPackedPayload
> {
  constructor(p: EventParams<OrderPackedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_EVENT_TYPE.PACKED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class OrderShippedEvent extends BaseDomainEvent<
  typeof ORDER_EVENT_TYPE.SHIPPED,
  OrderShippedPayload
> {
  constructor(p: EventParams<OrderShippedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_EVENT_TYPE.SHIPPED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class OrderOutForDeliveryEvent extends BaseDomainEvent<
  typeof ORDER_EVENT_TYPE.OUT_FOR_DELIVERY,
  OrderOutForDeliveryPayload
> {
  constructor(p: EventParams<OrderOutForDeliveryPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_EVENT_TYPE.OUT_FOR_DELIVERY,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class OrderDeliveredEvent extends BaseDomainEvent<
  typeof ORDER_EVENT_TYPE.DELIVERED,
  OrderDeliveredPayload
> {
  constructor(p: EventParams<OrderDeliveredPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_EVENT_TYPE.DELIVERED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class OrderCompletedEvent extends BaseDomainEvent<
  typeof ORDER_EVENT_TYPE.COMPLETED,
  OrderCompletedPayload
> {
  constructor(p: EventParams<OrderCompletedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_EVENT_TYPE.COMPLETED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class OrderCancelledEvent extends BaseDomainEvent<
  typeof ORDER_EVENT_TYPE.CANCELLED,
  OrderCancelledPayload
> {
  constructor(p: EventParams<OrderCancelledPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_EVENT_TYPE.CANCELLED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class OrderReturnedEvent extends BaseDomainEvent<
  typeof ORDER_EVENT_TYPE.RETURNED,
  OrderReturnedPayload
> {
  constructor(p: EventParams<OrderReturnedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_EVENT_TYPE.RETURNED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class OrderRefundedEvent extends BaseDomainEvent<
  typeof ORDER_EVENT_TYPE.REFUNDED,
  OrderRefundedPayload
> {
  constructor(p: EventParams<OrderRefundedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_EVENT_TYPE.REFUNDED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class OrderOnHoldEvent extends BaseDomainEvent<
  typeof ORDER_EVENT_TYPE.ON_HOLD,
  OrderOnHoldPayload
> {
  constructor(p: EventParams<OrderOnHoldPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_EVENT_TYPE.ON_HOLD,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class OrderReleasedEvent extends BaseDomainEvent<
  typeof ORDER_EVENT_TYPE.RELEASED,
  OrderReleasedPayload
> {
  constructor(p: EventParams<OrderReleasedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_EVENT_TYPE.RELEASED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class OrderStatusChangedEvent extends BaseDomainEvent<
  typeof ORDER_EVENT_TYPE.STATUS_CHANGED,
  OrderStatusChangedPayload
> {
  constructor(p: EventParams<OrderStatusChangedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_EVENT_TYPE.STATUS_CHANGED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class OrderPriorityChangedEvent extends BaseDomainEvent<
  typeof ORDER_EVENT_TYPE.PRIORITY_CHANGED,
  OrderPriorityChangedPayload
> {
  constructor(p: EventParams<OrderPriorityChangedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_EVENT_TYPE.PRIORITY_CHANGED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class OrderNotesUpdatedEvent extends BaseDomainEvent<
  typeof ORDER_EVENT_TYPE.NOTES_UPDATED,
  OrderNotesUpdatedPayload
> {
  constructor(p: EventParams<OrderNotesUpdatedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_EVENT_TYPE.NOTES_UPDATED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}
