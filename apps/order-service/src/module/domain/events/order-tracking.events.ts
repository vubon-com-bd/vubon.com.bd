/**
 * Order Tracking Domain Events
 * @module order-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { ORDER_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const ORDER_TRACKING_EVENT_TYPE = {
  UPDATED: 'order.order-tracking.updated',
  STATUS_CHANGED: 'order.order-tracking.status_changed',
  LOCATION_UPDATED: 'order.order-tracking.location_updated',
} as const;

export interface OrderTrackingUpdatedPayload {
  readonly trackingId: string;
  readonly orderId: string;
  readonly status: string;
  readonly message: string;
  readonly occurredAt: string;
}

export interface OrderTrackingStatusChangedPayload {
  readonly trackingId: string;
  readonly orderId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
}

export interface OrderTrackingLocationUpdatedPayload {
  readonly trackingId: string;
  readonly orderId: string;
  readonly location: string;
  readonly lat?: number;
  readonly lng?: number;
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
    aggregateType: ORDER_AGGREGATE_TYPE.ORDER_TRACKING,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class OrderTrackingUpdatedEvent extends BaseDomainEvent<
  typeof ORDER_TRACKING_EVENT_TYPE.UPDATED,
  OrderTrackingUpdatedPayload
> {
  constructor(p: EventParams<OrderTrackingUpdatedPayload>) {
    super(buildParams(ORDER_TRACKING_EVENT_TYPE.UPDATED, p));
  }
}

export class OrderTrackingStatusChangedEvent extends BaseDomainEvent<
  typeof ORDER_TRACKING_EVENT_TYPE.STATUS_CHANGED,
  OrderTrackingStatusChangedPayload
> {
  constructor(p: EventParams<OrderTrackingStatusChangedPayload>) {
    super(buildParams(ORDER_TRACKING_EVENT_TYPE.STATUS_CHANGED, p));
  }
}

export class OrderTrackingLocationUpdatedEvent extends BaseDomainEvent<
  typeof ORDER_TRACKING_EVENT_TYPE.LOCATION_UPDATED,
  OrderTrackingLocationUpdatedPayload
> {
  constructor(p: EventParams<OrderTrackingLocationUpdatedPayload>) {
    super(buildParams(ORDER_TRACKING_EVENT_TYPE.LOCATION_UPDATED, p));
  }
}
