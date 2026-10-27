/**
 * Order Fulfillment Domain Events
 * @module order-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { ORDER_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const ORDER_FULFILLMENT_EVENT_TYPE = {
  STARTED: 'order.order-fulfillment.started',
  PARTIALLY_FULFILLED: 'order.order-fulfillment.partially_fulfilled',
  FULFILLED: 'order.order-fulfillment.fulfilled',
  RESTOCKED: 'order.order-fulfillment.restocked',
  CANCELLED: 'order.order-fulfillment.cancelled',
} as const;

export interface FulfillmentStartedPayload {
  readonly fulfillmentId: string;
  readonly orderId: string;
  readonly itemIds: readonly string[];
  readonly vendorId?: string;
  readonly warehouseId?: string;
}

export interface FulfillmentStatusChangedPayload {
  readonly fulfillmentId: string;
  readonly orderId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly changedBy?: string;
}

export interface FulfillmentCompletedPayload {
  readonly fulfillmentId: string;
  readonly orderId: string;
  readonly fulfilledAt: string;
  readonly itemIds: readonly string[];
  readonly trackingNumber?: string;
}

export interface FulfillmentCancelledPayload {
  readonly fulfillmentId: string;
  readonly orderId: string;
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

function buildParams<TType extends string, TPayload>(
  type: TType,
  p: EventParams<TPayload>,
) {
  return {
    id: p.id ?? newEventId(),
    type,
    aggregateId: p.aggregateId,
    aggregateType: ORDER_AGGREGATE_TYPE.ORDER_FULFILLMENT,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class FulfillmentStartedEvent extends BaseDomainEvent<
  typeof ORDER_FULFILLMENT_EVENT_TYPE.STARTED,
  FulfillmentStartedPayload
> {
  constructor(p: EventParams<FulfillmentStartedPayload>) {
    super(buildParams(ORDER_FULFILLMENT_EVENT_TYPE.STARTED, p));
  }
}

export class FulfillmentStatusChangedEvent extends BaseDomainEvent<
  typeof ORDER_FULFILLMENT_EVENT_TYPE.PARTIALLY_FULFILLED,
  FulfillmentStatusChangedPayload
> {
  constructor(p: EventParams<FulfillmentStatusChangedPayload>) {
    super(buildParams(ORDER_FULFILLMENT_EVENT_TYPE.PARTIALLY_FULFILLED, p));
  }
}

export class FulfillmentCompletedEvent extends BaseDomainEvent<
  typeof ORDER_FULFILLMENT_EVENT_TYPE.FULFILLED,
  FulfillmentCompletedPayload
> {
  constructor(p: EventParams<FulfillmentCompletedPayload>) {
    super(buildParams(ORDER_FULFILLMENT_EVENT_TYPE.FULFILLED, p));
  }
}

export class FulfillmentCancelledEvent extends BaseDomainEvent<
  typeof ORDER_FULFILLMENT_EVENT_TYPE.CANCELLED,
  FulfillmentCancelledPayload
> {
  constructor(p: EventParams<FulfillmentCancelledPayload>) {
    super(buildParams(ORDER_FULFILLMENT_EVENT_TYPE.CANCELLED, p));
  }
}
