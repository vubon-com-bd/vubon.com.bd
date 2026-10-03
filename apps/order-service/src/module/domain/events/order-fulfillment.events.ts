/**
 * Order Fulfillment domain events
 * @module order-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { ORDER_FULFILLMENT_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const ORDER_FULFILLMENT_EVENT_TYPE = {
  STARTED: 'fulfillment.started',
  PACKED: 'fulfillment.packed',
  SHIPPED: 'fulfillment.shipped',
  PARTIALLY_FULFILLED: 'fulfillment.partially_fulfilled',
  COMPLETED: 'fulfillment.completed',
  CANCELLED: 'fulfillment.cancelled',
} as const;

export interface FulfillmentStartedPayload {
  readonly fulfillmentId: string;
  readonly orderId: string;
  readonly type: string;
  readonly itemIds: readonly string[];
  readonly vendorId?: string;
  readonly warehouseId?: string;
}

export interface FulfillmentPackedPayload {
  readonly fulfillmentId: string;
  readonly orderId: string;
  readonly packedAt: string;
  readonly packageCount?: number;
}

export interface FulfillmentShippedPayload {
  readonly fulfillmentId: string;
  readonly orderId: string;
  readonly shippedAt: string;
  readonly trackingNumber?: string;
  readonly courierId?: string;
}

export interface FulfillmentPartiallyFulfilledPayload {
  readonly fulfillmentId: string;
  readonly orderId: string;
  readonly fulfilledItemCount: number;
  readonly pendingItemCount: number;
}

export interface FulfillmentCompletedPayload {
  readonly fulfillmentId: string;
  readonly orderId: string;
  readonly completedAt: string;
  readonly deliveredAt?: string;
}

export interface FulfillmentCancelledPayload {
  readonly fulfillmentId: string;
  readonly orderId: string;
  readonly cancelledAt: string;
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

export class FulfillmentStartedEvent extends BaseDomainEvent<
  typeof ORDER_FULFILLMENT_EVENT_TYPE.STARTED,
  FulfillmentStartedPayload
> {
  constructor(p: EventParams<FulfillmentStartedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_FULFILLMENT_EVENT_TYPE.STARTED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_FULFILLMENT_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class FulfillmentPackedEvent extends BaseDomainEvent<
  typeof ORDER_FULFILLMENT_EVENT_TYPE.PACKED,
  FulfillmentPackedPayload
> {
  constructor(p: EventParams<FulfillmentPackedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_FULFILLMENT_EVENT_TYPE.PACKED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_FULFILLMENT_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class FulfillmentShippedEvent extends BaseDomainEvent<
  typeof ORDER_FULFILLMENT_EVENT_TYPE.SHIPPED,
  FulfillmentShippedPayload
> {
  constructor(p: EventParams<FulfillmentShippedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_FULFILLMENT_EVENT_TYPE.SHIPPED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_FULFILLMENT_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class FulfillmentPartiallyFulfilledEvent extends BaseDomainEvent<
  typeof ORDER_FULFILLMENT_EVENT_TYPE.PARTIALLY_FULFILLED,
  FulfillmentPartiallyFulfilledPayload
> {
  constructor(p: EventParams<FulfillmentPartiallyFulfilledPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_FULFILLMENT_EVENT_TYPE.PARTIALLY_FULFILLED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_FULFILLMENT_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class FulfillmentCompletedEvent extends BaseDomainEvent<
  typeof ORDER_FULFILLMENT_EVENT_TYPE.COMPLETED,
  FulfillmentCompletedPayload
> {
  constructor(p: EventParams<FulfillmentCompletedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_FULFILLMENT_EVENT_TYPE.COMPLETED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_FULFILLMENT_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class FulfillmentCancelledEvent extends BaseDomainEvent<
  typeof ORDER_FULFILLMENT_EVENT_TYPE.CANCELLED,
  FulfillmentCancelledPayload
> {
  constructor(p: EventParams<FulfillmentCancelledPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_FULFILLMENT_EVENT_TYPE.CANCELLED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_FULFILLMENT_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}
