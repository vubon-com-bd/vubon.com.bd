/**
 * Order Tracking domain events
 * @module order-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { ORDER_TRACKING_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const ORDER_TRACKING_EVENT_TYPE = {
  ADDED: 'order.tracking.added',
  UPDATED: 'order.tracking.updated',
  NUMBER_ASSIGNED: 'order.tracking.number_assigned',
} as const;

export interface TrackingAddedPayload {
  readonly trackingId: string;
  readonly orderId: string;
  readonly event: string;
  readonly message: string;
  readonly location?: string;
  readonly latitude?: number;
  readonly longitude?: number;
  readonly occurredAt: string;
}

export interface TrackingUpdatedPayload {
  readonly trackingId: string;
  readonly orderId: string;
  readonly previousEvent: string;
  readonly newEvent: string;
  readonly message: string;
}

export interface TrackingNumberAssignedPayload {
  readonly orderId: string;
  readonly trackingNumber: string;
  readonly courierId?: string;
  readonly assignedAt: string;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

export class TrackingAddedEvent extends BaseDomainEvent<
  typeof ORDER_TRACKING_EVENT_TYPE.ADDED,
  TrackingAddedPayload
> {
  constructor(p: EventParams<TrackingAddedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_TRACKING_EVENT_TYPE.ADDED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_TRACKING_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class TrackingUpdatedEvent extends BaseDomainEvent<
  typeof ORDER_TRACKING_EVENT_TYPE.UPDATED,
  TrackingUpdatedPayload
> {
  constructor(p: EventParams<TrackingUpdatedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_TRACKING_EVENT_TYPE.UPDATED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_TRACKING_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class TrackingNumberAssignedEvent extends BaseDomainEvent<
  typeof ORDER_TRACKING_EVENT_TYPE.NUMBER_ASSIGNED,
  TrackingNumberAssignedPayload
> {
  constructor(p: EventParams<TrackingNumberAssignedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ORDER_TRACKING_EVENT_TYPE.NUMBER_ASSIGNED,
      aggregateId: p.aggregateId,
      aggregateType: ORDER_TRACKING_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}
