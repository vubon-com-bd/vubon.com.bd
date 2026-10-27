/**
 * Order Return Domain Events
 * @module order-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { ORDER_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const ORDER_RETURN_EVENT_TYPE = {
  REQUESTED: 'order.order-return.requested',
  APPROVED: 'order.order-return.approved',
  REJECTED: 'order.order-return.rejected',
  PICKUP_SCHEDULED: 'order.order-return.pickup_scheduled',
  PICKED_UP: 'order.order-return.picked_up',
  RECEIVED: 'order.order-return.received',
  INSPECTED: 'order.order-return.inspected',
  REFUNDED: 'order.order-return.refunded',
  REPLACED: 'order.order-return.replaced',
  CLOSED: 'order.order-return.closed',
} as const;

export interface OrderReturnRequestedPayload {
  readonly returnId: string;
  readonly orderId: string;
  readonly customerId: string;
  readonly reason: string;
  readonly itemIds: readonly string[];
  readonly requestedAt: string;
}

export interface OrderReturnStatusChangedPayload {
  readonly returnId: string;
  readonly orderId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly changedBy?: string;
}

export interface OrderReturnRefundedPayload {
  readonly returnId: string;
  readonly orderId: string;
  readonly refundAmount: number;
  readonly currency: string;
  readonly refundedAt: string;
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
    aggregateType: ORDER_AGGREGATE_TYPE.ORDER_RETURN,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class OrderReturnRequestedEvent extends BaseDomainEvent<
  typeof ORDER_RETURN_EVENT_TYPE.REQUESTED,
  OrderReturnRequestedPayload
> {
  constructor(p: EventParams<OrderReturnRequestedPayload>) {
    super(buildParams(ORDER_RETURN_EVENT_TYPE.REQUESTED, p));
  }
}

export class OrderReturnStatusChangedEvent extends BaseDomainEvent<
  typeof ORDER_RETURN_EVENT_TYPE.APPROVED,
  OrderReturnStatusChangedPayload
> {
  constructor(p: EventParams<OrderReturnStatusChangedPayload>) {
    super(buildParams(ORDER_RETURN_EVENT_TYPE.APPROVED, p));
  }
}

export class OrderReturnRefundedEvent extends BaseDomainEvent<
  typeof ORDER_RETURN_EVENT_TYPE.REFUNDED,
  OrderReturnRefundedPayload
> {
  constructor(p: EventParams<OrderReturnRefundedPayload>) {
    super(buildParams(ORDER_RETURN_EVENT_TYPE.REFUNDED, p));
  }
}
