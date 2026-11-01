/**
 * Delivery Domain Events
 * @module logistics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';

import { LOGISTICS_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const DELIVERY_EVENT_TYPE = {
  CREATED: 'logistics.delivery.created',
  SCHEDULED: 'logistics.delivery.scheduled',
  ASSIGNED: 'logistics.delivery.assigned',
  PICKED_UP: 'logistics.delivery.picked_up',
  IN_TRANSIT: 'logistics.delivery.in_transit',
  OUT_FOR_DELIVERY: 'logistics.delivery.out_for_delivery',
  ARRIVED: 'logistics.delivery.arrived',
  DELIVERED: 'logistics.delivery.delivered',
  FAILED: 'logistics.delivery.failed',
  RESCHEDULED: 'logistics.delivery.rescheduled',
  CANCELLED: 'logistics.delivery.cancelled',
  REFUSED: 'logistics.delivery.refused',
  STATUS_CHANGED: 'logistics.delivery.status_changed',
} as const;

export interface DeliveryCreatedPayload {
  readonly deliveryId: string;
  readonly shipmentId: string;
  readonly orderId: string;
  readonly type: string;
  readonly createdAt: string;
}
export interface DeliveryScheduledPayload {
  readonly deliveryId: string;
  readonly scheduledAt: string;
  readonly windowStart?: string;
  readonly windowEnd?: string;
}
export interface DeliveryAssignedPayload {
  readonly deliveryId: string;
  readonly driverId: string;
  readonly vehicleId?: string;
  readonly routeId?: string;
  readonly assignedAt: string;
}
export interface DeliveryPickedUpPayload {
  readonly deliveryId: string;
  readonly pickedUpAt: string;
}
export interface DeliveryInTransitPayload {
  readonly deliveryId: string;
  readonly inTransitAt: string;
}
export interface DeliveryOutForDeliveryPayload {
  readonly deliveryId: string;
  readonly outForDeliveryAt: string;
}
export interface DeliveryArrivedPayload {
  readonly deliveryId: string;
  readonly arrivedAt: string;
}
export interface DeliveryDeliveredPayload {
  readonly deliveryId: string;
  readonly deliveredAt: string;
  readonly recipientName?: string;
  readonly signedBy?: string;
}
export interface DeliveryFailedPayload {
  readonly deliveryId: string;
  readonly failedAt: string;
  readonly reason: string;
  readonly attemptNumber: number;
}
export interface DeliveryRescheduledPayload {
  readonly deliveryId: string;
  readonly rescheduledAt: string;
  readonly newWindowStart?: string;
  readonly newWindowEnd?: string;
}
export interface DeliveryCancelledPayload {
  readonly deliveryId: string;
  readonly cancelledAt: string;
  readonly reason?: string;
}
export interface DeliveryRefusedPayload {
  readonly deliveryId: string;
  readonly refusedAt: string;
  readonly reason?: string;
}
export interface DeliveryStatusChangedPayload {
  readonly deliveryId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly reason?: string;
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
    aggregateType: LOGISTICS_AGGREGATE_TYPE.DELIVERY,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class DeliveryCreatedEvent extends BaseDomainEvent<
  typeof DELIVERY_EVENT_TYPE.CREATED,
  DeliveryCreatedPayload
> {
  constructor(p: EventParams<DeliveryCreatedPayload>) {
    super(buildParams(DELIVERY_EVENT_TYPE.CREATED, p));
  }
}
export class DeliveryScheduledEvent extends BaseDomainEvent<
  typeof DELIVERY_EVENT_TYPE.SCHEDULED,
  DeliveryScheduledPayload
> {
  constructor(p: EventParams<DeliveryScheduledPayload>) {
    super(buildParams(DELIVERY_EVENT_TYPE.SCHEDULED, p));
  }
}
export class DeliveryAssignedEvent extends BaseDomainEvent<
  typeof DELIVERY_EVENT_TYPE.ASSIGNED,
  DeliveryAssignedPayload
> {
  constructor(p: EventParams<DeliveryAssignedPayload>) {
    super(buildParams(DELIVERY_EVENT_TYPE.ASSIGNED, p));
  }
}
export class DeliveryPickedUpEvent extends BaseDomainEvent<
  typeof DELIVERY_EVENT_TYPE.PICKED_UP,
  DeliveryPickedUpPayload
> {
  constructor(p: EventParams<DeliveryPickedUpPayload>) {
    super(buildParams(DELIVERY_EVENT_TYPE.PICKED_UP, p));
  }
}
export class DeliveryInTransitEvent extends BaseDomainEvent<
  typeof DELIVERY_EVENT_TYPE.IN_TRANSIT,
  DeliveryInTransitPayload
> {
  constructor(p: EventParams<DeliveryInTransitPayload>) {
    super(buildParams(DELIVERY_EVENT_TYPE.IN_TRANSIT, p));
  }
}
export class DeliveryOutForDeliveryEvent extends BaseDomainEvent<
  typeof DELIVERY_EVENT_TYPE.OUT_FOR_DELIVERY,
  DeliveryOutForDeliveryPayload
> {
  constructor(p: EventParams<DeliveryOutForDeliveryPayload>) {
    super(buildParams(DELIVERY_EVENT_TYPE.OUT_FOR_DELIVERY, p));
  }
}
export class DeliveryArrivedEvent extends BaseDomainEvent<
  typeof DELIVERY_EVENT_TYPE.ARRIVED,
  DeliveryArrivedPayload
> {
  constructor(p: EventParams<DeliveryArrivedPayload>) {
    super(buildParams(DELIVERY_EVENT_TYPE.ARRIVED, p));
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
export class DeliveryRescheduledEvent extends BaseDomainEvent<
  typeof DELIVERY_EVENT_TYPE.RESCHEDULED,
  DeliveryRescheduledPayload
> {
  constructor(p: EventParams<DeliveryRescheduledPayload>) {
    super(buildParams(DELIVERY_EVENT_TYPE.RESCHEDULED, p));
  }
}
export class DeliveryCancelledEvent extends BaseDomainEvent<
  typeof DELIVERY_EVENT_TYPE.CANCELLED,
  DeliveryCancelledPayload
> {
  constructor(p: EventParams<DeliveryCancelledPayload>) {
    super(buildParams(DELIVERY_EVENT_TYPE.CANCELLED, p));
  }
}
export class DeliveryRefusedEvent extends BaseDomainEvent<
  typeof DELIVERY_EVENT_TYPE.REFUSED,
  DeliveryRefusedPayload
> {
  constructor(p: EventParams<DeliveryRefusedPayload>) {
    super(buildParams(DELIVERY_EVENT_TYPE.REFUSED, p));
  }
}
export class DeliveryStatusChangedEvent extends BaseDomainEvent<
  typeof DELIVERY_EVENT_TYPE.STATUS_CHANGED,
  DeliveryStatusChangedPayload
> {
  constructor(p: EventParams<DeliveryStatusChangedPayload>) {
    super(buildParams(DELIVERY_EVENT_TYPE.STATUS_CHANGED, p));
  }
}
