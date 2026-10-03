/**
 * Order Cancel domain events
 * @module order-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { ORDER_CANCEL_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const ORDER_CANCEL_EVENT_TYPE = {
  REQUESTED: 'order.cancel.requested',
  APPROVED: 'order.cancel.approved',
  REJECTED: 'order.cancel.rejected',
  PROCESSED: 'order.cancel.processed',
} as const;

export interface OrderCancelRequestedPayload {
  readonly cancelId: string;
  readonly orderId: string;
  readonly reason: string;
  readonly requestedBy: string;
  readonly notes?: string;
}

export interface OrderCancelApprovedPayload {
  readonly cancelId: string;
  readonly orderId: string;
  readonly approvedBy: string;
  readonly refundAmount?: number;
  readonly currency?: string;
  readonly restockInventory: boolean;
}

export interface OrderCancelRejectedPayload {
  readonly cancelId: string;
  readonly orderId: string;
  readonly rejectedBy: string;
  readonly reason: string;
}

export interface OrderCancelProcessedPayload {
  readonly cancelId: string;
  readonly orderId: string;
  readonly processedAt: string;
  readonly refundId?: string;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

export class OrderCancelRequestedEvent extends BaseDomainEvent<
  typeof ORDER_CANCEL_EVENT_TYPE.REQUESTED,
  OrderCancelRequestedPayload
> {
  constructor(p: EventParams<OrderCancelRequestedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_CANCEL_EVENT_TYPE.REQUESTED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_CANCEL_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class OrderCancelApprovedEvent extends BaseDomainEvent<
  typeof ORDER_CANCEL_EVENT_TYPE.APPROVED,
  OrderCancelApprovedPayload
> {
  constructor(p: EventParams<OrderCancelApprovedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_CANCEL_EVENT_TYPE.APPROVED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_CANCEL_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class OrderCancelRejectedEvent extends BaseDomainEvent<
  typeof ORDER_CANCEL_EVENT_TYPE.REJECTED,
  OrderCancelRejectedPayload
> {
  constructor(p: EventParams<OrderCancelRejectedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_CANCEL_EVENT_TYPE.REJECTED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_CANCEL_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class OrderCancelProcessedEvent extends BaseDomainEvent<
  typeof ORDER_CANCEL_EVENT_TYPE.PROCESSED,
  OrderCancelProcessedPayload
> {
  constructor(p: EventParams<OrderCancelProcessedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_CANCEL_EVENT_TYPE.PROCESSED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_CANCEL_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}
