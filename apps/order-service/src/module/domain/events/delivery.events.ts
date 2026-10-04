/**
 * Delivery domain events
 * @module order-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { DELIVERY_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const DELIVERY_EVENT_TYPE = {
  SCHEDULED: 'delivery.scheduled',
  RESCHEDULED: 'delivery.rescheduled',
  ASSIGNED: 'delivery.assigned',
  PICKED_UP: 'delivery.picked_up',
  IN_TRANSIT: 'delivery.in_transit',
  OUT_FOR_DELIVERY: 'delivery.out_for_delivery',
  ATTEMPTED: 'delivery.attempted',
  COMPLETED: 'delivery.completed',
  FAILED: 'delivery.failed',
  CANCELLED: 'delivery.cancelled',
} as const;

export interface DeliveryScheduledPayload {
  readonly deliveryId: string;
  readonly orderId: string;
  readonly type: string;
  readonly methodId?: string;
  readonly estimatedAt?: string;
}

export interface DeliveryRescheduledPayload {
  readonly deliveryId: string;
  readonly orderId: string;
  readonly reason: string;
  readonly newEstimatedAt?: string;
}

export interface DeliveryAssignedPayload {
  readonly deliveryId: string;
  readonly courierId: string;
  readonly assignedAt: string;
}

export interface DeliveryPickedUpPayload {
  readonly deliveryId: string;
  readonly orderId: string;
  readonly pickedUpAt: string;
  readonly trackingNumber?: string;
}

export interface DeliveryInTransitPayload {
  readonly deliveryId: string;
  readonly orderId: string;
  readonly inTransitAt: string;
  readonly location?: string;
}

export interface DeliveryOutForDeliveryPayload {
  readonly deliveryId: string;
  readonly orderId: string;
  readonly outAt: string;
}

export interface DeliveryAttemptedPayload {
  readonly deliveryId: string;
  readonly orderId: string;
  readonly attemptNumber: number;
  readonly status: string;
  readonly notes?: string;
}

export interface DeliveryCompletedPayload {
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
  readonly attemptNumber: number;
  readonly failedAt: string;
}

export interface DeliveryCancelledPayload {
  readonly deliveryId: string;
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

export class DeliveryScheduledEvent extends BaseDomainEvent<
  typeof DELIVERY_EVENT_TYPE.SCHEDULED,
  DeliveryScheduledPayload
> {
  constructor(p: EventParams<DeliveryScheduledPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: DELIVERY_EVENT_TYPE.SCHEDULED,
      aggregateId: p.aggregateId,
      aggregateType: DELIVERY_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class DeliveryRescheduledEvent extends BaseDomainEvent<
  typeof DELIVERY_EVENT_TYPE.RESCHEDULED,
  DeliveryRescheduledPayload
> {
  constructor(p: EventParams<DeliveryRescheduledPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: DELIVERY_EVENT_TYPE.RESCHEDULED,
      aggregateId: p.aggregateId,
      aggregateType: DELIVERY_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class DeliveryAssignedEvent extends BaseDomainEvent<
  typeof DELIVERY_EVENT_TYPE.ASSIGNED,
  DeliveryAssignedPayload
> {
  constructor(p: EventParams<DeliveryAssignedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: DELIVERY_EVENT_TYPE.ASSIGNED,
      aggregateId: p.aggregateId,
      aggregateType: DELIVERY_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class DeliveryPickedUpEvent extends BaseDomainEvent<
  typeof DELIVERY_EVENT_TYPE.PICKED_UP,
  DeliveryPickedUpPayload
> {
  constructor(p: EventParams<DeliveryPickedUpPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: DELIVERY_EVENT_TYPE.PICKED_UP,
      aggregateId: p.aggregateId,
      aggregateType: DELIVERY_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class DeliveryInTransitEvent extends BaseDomainEvent<
  typeof DELIVERY_EVENT_TYPE.IN_TRANSIT,
  DeliveryInTransitPayload
> {
  constructor(p: EventParams<DeliveryInTransitPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: DELIVERY_EVENT_TYPE.IN_TRANSIT,
      aggregateId: p.aggregateId,
      aggregateType: DELIVERY_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class DeliveryOutForDeliveryEvent extends BaseDomainEvent<
  typeof DELIVERY_EVENT_TYPE.OUT_FOR_DELIVERY,
  DeliveryOutForDeliveryPayload
> {
  constructor(p: EventParams<DeliveryOutForDeliveryPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: DELIVERY_EVENT_TYPE.OUT_FOR_DELIVERY,
      aggregateId: p.aggregateId,
      aggregateType: DELIVERY_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class DeliveryAttemptedEvent extends BaseDomainEvent<
  typeof DELIVERY_EVENT_TYPE.ATTEMPTED,
  DeliveryAttemptedPayload
> {
  constructor(p: EventParams<DeliveryAttemptedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: DELIVERY_EVENT_TYPE.ATTEMPTED,
      aggregateId: p.aggregateId,
      aggregateType: DELIVERY_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class DeliveryCompletedEvent extends BaseDomainEvent<
  typeof DELIVERY_EVENT_TYPE.COMPLETED,
  DeliveryCompletedPayload
> {
  constructor(p: EventParams<DeliveryCompletedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: DELIVERY_EVENT_TYPE.COMPLETED,
      aggregateId: p.aggregateId,
      aggregateType: DELIVERY_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class DeliveryFailedEvent extends BaseDomainEvent<
  typeof DELIVERY_EVENT_TYPE.FAILED,
  DeliveryFailedPayload
> {
  constructor(p: EventParams<DeliveryFailedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: DELIVERY_EVENT_TYPE.FAILED,
      aggregateId: p.aggregateId,
      aggregateType: DELIVERY_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class DeliveryCancelledEvent extends BaseDomainEvent<
  typeof DELIVERY_EVENT_TYPE.CANCELLED,
  DeliveryCancelledPayload
> {
  constructor(p: EventParams<DeliveryCancelledPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: DELIVERY_EVENT_TYPE.CANCELLED,
      aggregateId: p.aggregateId,
      aggregateType: DELIVERY_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}
