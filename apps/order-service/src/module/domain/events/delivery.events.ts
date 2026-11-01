/**
 * Delivery Domain Events
 * @module order-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { ORDER_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const DELIVERY_EVENT_TYPE = {
  SCHEDULED: 'order.delivery.scheduled',
  RESCHEDULED: 'order.delivery.rescheduled',
  PICKED_UP: 'order.delivery.picked_up',
  IN_TRANSIT: 'order.delivery.in_transit',
  OUT_FOR_DELIVERY: 'order.delivery.out_for_delivery',
  DELIVERED: 'order.delivery.delivered',
  FAILED: 'order.delivery.failed',
  CANCELLED: 'order.delivery.cancelled',
} as const;

export interface DeliveryScheduledPayload {
  readonly deliveryId: string;
  readonly orderId: string;
  readonly methodId: string;
  readonly type: string;
  readonly estimatedAt?: string;
}

export interface DeliveryRescheduledPayload {
  readonly deliveryId: string;
  readonly orderId: string;
  readonly reason: string;
  readonly newEstimatedAt?: string;
}

export interface DeliveryStatusChangedPayload {
  readonly deliveryId: string;
  readonly orderId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly changedBy?: string;
}

export interface DeliveryDeliveredPayload {
  readonly deliveryId: string;
  readonly orderId: string;
  readonly deliveredAt: string;
  readonly receivedBy?: string;
  readonly signature?: string;
}

export interface DeliveryFailedPayload {
  readonly deliveryId: string;
  readonly orderId: string;
  readonly reason: string;
  readonly attempts: number;
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
    aggregateType: ORDER_AGGREGATE_TYPE.DELIVERY,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class DeliveryScheduledEvent extends BaseDomainEvent<
  typeof DELIVERY_EVENT_TYPE.SCHEDULED,
  DeliveryScheduledPayload
> {
  constructor(p: EventParams<DeliveryScheduledPayload>) {
    super(buildParams(DELIVERY_EVENT_TYPE.SCHEDULED, p));
  }
}

export class DeliveryRescheduledEvent extends BaseDomainEvent<
  typeof DELIVERY_EVENT_TYPE.RESCHEDULED,
  DeliveryRescheduledPayload
> {
  constructor(p: EventParams<DeliveryRescheduledPayload>) {
    super(buildParams(DELIVERY_EVENT_TYPE.RESCHEDULED, p));
  }
}

export class DeliveryStatusChangedEvent extends BaseDomainEvent<
  typeof DELIVERY_EVENT_TYPE.IN_TRANSIT,
  DeliveryStatusChangedPayload
> {
  constructor(p: EventParams<DeliveryStatusChangedPayload>) {
    super(buildParams(DELIVERY_EVENT_TYPE.IN_TRANSIT, p));
  }
}

export class DeliveryDeliveredEvent extends BaseDomainEvent<
  typeof DELIVERY_EVENT_TYPE.DELIVERED,
  DeliveryDeliveredPayload
> {
  constructor(p: EventParams<DeliveryDeliveredPayload>) {
    super(buildParams(DELIVERY_EVENT_TYPE.DELIVERED, p));
  }
}

export class DeliveryFailedEvent extends BaseDomainEvent<
  typeof DELIVERY_EVENT_TYPE.FAILED,
  DeliveryFailedPayload
> {
  constructor(p: EventParams<DeliveryFailedPayload>) {
    super(buildParams(DELIVERY_EVENT_TYPE.FAILED, p));
  }
}
