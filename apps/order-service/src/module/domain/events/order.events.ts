/**
 * Order Domain Events
 * @module order-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { ORDER_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

// ─── Event Type Constants ──────────────────
export const ORDER_EVENT_TYPE = {
  CREATED: 'order.order.created',
  CONFIRMED: 'order.order.confirmed',
  PROCESSING_STARTED: 'order.order.processing_started',
  PACKED: 'order.order.packed',
  SHIPPED: 'order.order.shipped',
  OUT_FOR_DELIVERY: 'order.order.out_for_delivery',
  DELIVERED: 'order.order.delivered',
  COMPLETED: 'order.order.completed',
  CANCELLED: 'order.order.cancelled',
  RETURNED: 'order.order.returned',
  REFUNDED: 'order.order.refunded',
  STATUS_CHANGED: 'order.order.status_changed',
  PRIORITY_CHANGED: 'order.order.priority_changed',
  NOTE_ADDED: 'order.order.note_added',
} as const;

// ─── Payload Interfaces ────────────────────
export interface OrderCreatedPayload {
  readonly orderId: string;
  readonly orderNumber: string;
  readonly customerId: string;
  readonly customerEmail?: string;
  readonly customerName?: string;
  readonly totalAmount: number;
  readonly currency: string;
  readonly itemCount: number;
  readonly createdAt: string;
}

export interface OrderStatusChangedPayload {
  readonly orderId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly changedBy?: string;
  readonly reason?: string;
}

export interface OrderCancelledPayload {
  readonly orderId: string;
  readonly cancelId: string;
  readonly reason: string;
  readonly cancelledBy: string;
  readonly cancelledAt: string;
}

export interface OrderReturnedPayload {
  readonly orderId: string;
  readonly returnId: string;
  readonly reason: string;
  readonly returnItemIds: readonly string[];
}

export interface OrderRefundedPayload {
  readonly orderId: string;
  readonly refundAmount: number;
  readonly currency: string;
  readonly refundedAt: string;
}

export interface OrderPriorityChangedPayload {
  readonly orderId: string;
  readonly fromPriority: string;
  readonly toPriority: string;
  readonly changedBy?: string;
}

export interface OrderNoteAddedPayload {
  readonly orderId: string;
  readonly note: string;
  readonly addedBy: string;
}

// ─── Generic Event Params ──────────────────
type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

// ─── DRY builder ───────────────────────────
function buildParams<TType extends string, TPayload>(
  type: TType,
  p: EventParams<TPayload>,
) {
  return {
    id: p.id ?? newEventId(),
    type,
    aggregateId: p.aggregateId,
    aggregateType: ORDER_AGGREGATE_TYPE.ORDER,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

// ─── Concrete Events ───────────────────────
export class OrderCreatedEvent extends BaseDomainEvent<
  typeof ORDER_EVENT_TYPE.CREATED,
  OrderCreatedPayload
> {
  constructor(p: EventParams<OrderCreatedPayload>) {
    super(buildParams(ORDER_EVENT_TYPE.CREATED, p));
  }
}

export class OrderStatusChangedEvent extends BaseDomainEvent<
  typeof ORDER_EVENT_TYPE.STATUS_CHANGED,
  OrderStatusChangedPayload
> {
  constructor(p: EventParams<OrderStatusChangedPayload>) {
    super(buildParams(ORDER_EVENT_TYPE.STATUS_CHANGED, p));
  }
}

export class OrderCancelledEvent extends BaseDomainEvent<
  typeof ORDER_EVENT_TYPE.CANCELLED,
  OrderCancelledPayload
> {
  constructor(p: EventParams<OrderCancelledPayload>) {
    super(buildParams(ORDER_EVENT_TYPE.CANCELLED, p));
  }
}

export class OrderReturnedEvent extends BaseDomainEvent<
  typeof ORDER_EVENT_TYPE.RETURNED,
  OrderReturnedPayload
> {
  constructor(p: EventParams<OrderReturnedPayload>) {
    super(buildParams(ORDER_EVENT_TYPE.RETURNED, p));
  }
}

export class OrderRefundedEvent extends BaseDomainEvent<
  typeof ORDER_EVENT_TYPE.REFUNDED,
  OrderRefundedPayload
> {
  constructor(p: EventParams<OrderRefundedPayload>) {
    super(buildParams(ORDER_EVENT_TYPE.REFUNDED, p));
  }
}

export class OrderPriorityChangedEvent extends BaseDomainEvent<
  typeof ORDER_EVENT_TYPE.PRIORITY_CHANGED,
  OrderPriorityChangedPayload
> {
  constructor(p: EventParams<OrderPriorityChangedPayload>) {
    super(buildParams(ORDER_EVENT_TYPE.PRIORITY_CHANGED, p));
  }
}

export class OrderNoteAddedEvent extends BaseDomainEvent<
  typeof ORDER_EVENT_TYPE.NOTE_ADDED,
  OrderNoteAddedPayload
> {
  constructor(p: EventParams<OrderNoteAddedPayload>) {
    super(buildParams(ORDER_EVENT_TYPE.NOTE_ADDED, p));
  }
}
