/**
 * Order Cancel Domain Events
 * @module order-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { ORDER_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const ORDER_CANCEL_EVENT_TYPE = {
  REQUESTED: 'order.order-cancel.requested',
  APPROVED: 'order.order-cancel.approved',
  REJECTED: 'order.order-cancel.rejected',
  PROCESSED: 'order.order-cancel.processed',
  REFUNDED: 'order.order-cancel.refunded',
} as const;

export interface OrderCancelRequestedPayload {
  readonly cancelId: string;
  readonly orderId: string;
  readonly reason: string;
  readonly requestedBy: string;
  readonly requestedAt: string;
}

export interface OrderCancelApprovedPayload {
  readonly cancelId: string;
  readonly orderId: string;
  readonly approvedBy: string;
  readonly approvedAt: string;
}

export interface OrderCancelRejectedPayload {
  readonly cancelId: string;
  readonly orderId: string;
  readonly rejectedBy: string;
  readonly rejectionReason: string;
}

export interface OrderCancelProcessedPayload {
  readonly cancelId: string;
  readonly orderId: string;
  readonly processedAt: string;
}

export interface OrderCancelRefundedPayload {
  readonly cancelId: string;
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
    aggregateType: ORDER_AGGREGATE_TYPE.ORDER_CANCEL,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class OrderCancelRequestedEvent extends BaseDomainEvent<
  typeof ORDER_CANCEL_EVENT_TYPE.REQUESTED,
  OrderCancelRequestedPayload
> {
  constructor(p: EventParams<OrderCancelRequestedPayload>) {
    super(buildParams(ORDER_CANCEL_EVENT_TYPE.REQUESTED, p));
  }
}

export class OrderCancelApprovedEvent extends BaseDomainEvent<
  typeof ORDER_CANCEL_EVENT_TYPE.APPROVED,
  OrderCancelApprovedPayload
> {
  constructor(p: EventParams<OrderCancelApprovedPayload>) {
    super(buildParams(ORDER_CANCEL_EVENT_TYPE.APPROVED, p));
  }
}

export class OrderCancelRejectedEvent extends BaseDomainEvent<
  typeof ORDER_CANCEL_EVENT_TYPE.REJECTED,
  OrderCancelRejectedPayload
> {
  constructor(p: EventParams<OrderCancelRejectedPayload>) {
    super(buildParams(ORDER_CANCEL_EVENT_TYPE.REJECTED, p));
  }
}

export class OrderCancelProcessedEvent extends BaseDomainEvent<
  typeof ORDER_CANCEL_EVENT_TYPE.PROCESSED,
  OrderCancelProcessedPayload
> {
  constructor(p: EventParams<OrderCancelProcessedPayload>) {
    super(buildParams(ORDER_CANCEL_EVENT_TYPE.PROCESSED, p));
  }
}

export class OrderCancelRefundedEvent extends BaseDomainEvent<
  typeof ORDER_CANCEL_EVENT_TYPE.REFUNDED,
  OrderCancelRefundedPayload
> {
  constructor(p: EventParams<OrderCancelRefundedPayload>) {
    super(buildParams(ORDER_CANCEL_EVENT_TYPE.REFUNDED, p));
  }
}
