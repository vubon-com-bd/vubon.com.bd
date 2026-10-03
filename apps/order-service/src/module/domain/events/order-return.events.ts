/**
 * Order Return domain events
 * @module order-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { ORDER_RETURN_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const ORDER_RETURN_EVENT_TYPE = {
  REQUESTED: 'order.return.requested',
  APPROVED: 'order.return.approved',
  REJECTED: 'order.return.rejected',
  PICKED_UP: 'order.return.picked_up',
  RECEIVED: 'order.return.received',
  INSPECTED: 'order.return.inspected',
  COMPLETED: 'order.return.completed',
  CLOSED: 'order.return.closed',
} as const;

export interface OrderReturnRequestedPayload {
  readonly returnId: string;
  readonly orderId: string;
  readonly customerId: string;
  readonly reason: string;
  readonly itemIds: readonly string[];
  readonly images: readonly string[];
}

export interface OrderReturnApprovedPayload {
  readonly returnId: string;
  readonly orderId: string;
  readonly approvedBy: string;
  readonly approvedAt: string;
}

export interface OrderReturnRejectedPayload {
  readonly returnId: string;
  readonly orderId: string;
  readonly rejectedBy: string;
  readonly reason: string;
}

export interface OrderReturnPickedUpPayload {
  readonly returnId: string;
  readonly orderId: string;
  readonly pickedUpAt: string;
  readonly courierId?: string;
}

export interface OrderReturnReceivedPayload {
  readonly returnId: string;
  readonly orderId: string;
  readonly receivedAt: string;
  readonly warehouseId?: string;
}

export interface OrderReturnInspectedPayload {
  readonly returnId: string;
  readonly orderId: string;
  readonly inspectedAt: string;
  readonly condition: string;
  readonly notes?: string;
}

export interface OrderReturnCompletedPayload {
  readonly returnId: string;
  readonly orderId: string;
  readonly completedAt: string;
  readonly refundAmount: number;
  readonly restockFee: number;
  readonly currency: string;
}

export interface OrderReturnClosedPayload {
  readonly returnId: string;
  readonly orderId: string;
  readonly closedAt: string;
  readonly resolution: 'refunded' | 'replaced';
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

export class OrderReturnRequestedEvent extends BaseDomainEvent<
  typeof ORDER_RETURN_EVENT_TYPE.REQUESTED,
  OrderReturnRequestedPayload
> {
  constructor(p: EventParams<OrderReturnRequestedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_RETURN_EVENT_TYPE.REQUESTED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_RETURN_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class OrderReturnApprovedEvent extends BaseDomainEvent<
  typeof ORDER_RETURN_EVENT_TYPE.APPROVED,
  OrderReturnApprovedPayload
> {
  constructor(p: EventParams<OrderReturnApprovedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_RETURN_EVENT_TYPE.APPROVED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_RETURN_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class OrderReturnRejectedEvent extends BaseDomainEvent<
  typeof ORDER_RETURN_EVENT_TYPE.REJECTED,
  OrderReturnRejectedPayload
> {
  constructor(p: EventParams<OrderReturnRejectedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_RETURN_EVENT_TYPE.REJECTED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_RETURN_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class OrderReturnPickedUpEvent extends BaseDomainEvent<
  typeof ORDER_RETURN_EVENT_TYPE.PICKED_UP,
  OrderReturnPickedUpPayload
> {
  constructor(p: EventParams<OrderReturnPickedUpPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_RETURN_EVENT_TYPE.PICKED_UP,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_RETURN_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class OrderReturnReceivedEvent extends BaseDomainEvent<
  typeof ORDER_RETURN_EVENT_TYPE.RECEIVED,
  OrderReturnReceivedPayload
> {
  constructor(p: EventParams<OrderReturnReceivedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_RETURN_EVENT_TYPE.RECEIVED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_RETURN_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class OrderReturnInspectedEvent extends BaseDomainEvent<
  typeof ORDER_RETURN_EVENT_TYPE.INSPECTED,
  OrderReturnInspectedPayload
> {
  constructor(p: EventParams<OrderReturnInspectedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_RETURN_EVENT_TYPE.INSPECTED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_RETURN_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class OrderReturnCompletedEvent extends BaseDomainEvent<
  typeof ORDER_RETURN_EVENT_TYPE.COMPLETED,
  OrderReturnCompletedPayload
> {
  constructor(p: EventParams<OrderReturnCompletedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_RETURN_EVENT_TYPE.COMPLETED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_RETURN_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class OrderReturnClosedEvent extends BaseDomainEvent<
  typeof ORDER_RETURN_EVENT_TYPE.CLOSED,
  OrderReturnClosedPayload
> {
  constructor(p: EventParams<OrderReturnClosedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_RETURN_EVENT_TYPE.CLOSED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_RETURN_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}
