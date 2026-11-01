/**
 * Tracking Domain Events
 * @module logistics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';

import { LOGISTICS_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const TRACKING_EVENT_TYPE = {
  CREATED: 'logistics.tracking.created',
  UPDATED: 'logistics.tracking.updated',
  COMPLETED: 'logistics.tracking.completed',
  FAILED: 'logistics.tracking.failed',
  EXPIRED: 'logistics.tracking.expired',
  EVENT_ADDED: 'logistics.tracking.event_added',
} as const;

export interface TrackingCreatedPayload {
  readonly trackingId: string;
  readonly trackingNumber: string;
  readonly shipmentId?: string;
  readonly courierCode?: string;
  readonly createdAt: string;
}

export interface TrackingUpdatedPayload {
  readonly trackingId: string;
  readonly trackingNumber: string;
  readonly currentEvent?: string;
  readonly currentLocation?: string;
  readonly updatedAt: string;
}

export interface TrackingCompletedPayload {
  readonly trackingId: string;
  readonly trackingNumber: string;
  readonly completedAt: string;
}

export interface TrackingFailedPayload {
  readonly trackingId: string;
  readonly trackingNumber: string;
  readonly reason: string;
  readonly failedAt: string;
}

export interface TrackingExpiredPayload {
  readonly trackingId: string;
  readonly trackingNumber: string;
  readonly expiredAt: string;
}

export interface TrackingEventAddedPayload {
  readonly trackingId: string;
  readonly trackingNumber: string;
  readonly eventId: string;
  readonly eventType: string;
  readonly eventStatus: string;
  readonly occurredAt: string;
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
    aggregateType: LOGISTICS_AGGREGATE_TYPE.TRACKING,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class TrackingCreatedEvent extends BaseDomainEvent<
  typeof TRACKING_EVENT_TYPE.CREATED,
  TrackingCreatedPayload
> {
  constructor(p: EventParams<TrackingCreatedPayload>) {
    super(buildParams(TRACKING_EVENT_TYPE.CREATED, p));
  }
}

export class TrackingUpdatedEvent extends BaseDomainEvent<
  typeof TRACKING_EVENT_TYPE.UPDATED,
  TrackingUpdatedPayload
> {
  constructor(p: EventParams<TrackingUpdatedPayload>) {
    super(buildParams(TRACKING_EVENT_TYPE.UPDATED, p));
  }
}

export class TrackingCompletedEvent extends BaseDomainEvent<
  typeof TRACKING_EVENT_TYPE.COMPLETED,
  TrackingCompletedPayload
> {
  constructor(p: EventParams<TrackingCompletedPayload>) {
    super(buildParams(TRACKING_EVENT_TYPE.COMPLETED, p));
  }
}

export class TrackingFailedEvent extends BaseDomainEvent<
  typeof TRACKING_EVENT_TYPE.FAILED,
  TrackingFailedPayload
> {
  constructor(p: EventParams<TrackingFailedPayload>) {
    super(buildParams(TRACKING_EVENT_TYPE.FAILED, p));
  }
}

export class TrackingExpiredEvent extends BaseDomainEvent<
  typeof TRACKING_EVENT_TYPE.EXPIRED,
  TrackingExpiredPayload
> {
  constructor(p: EventParams<TrackingExpiredPayload>) {
    super(buildParams(TRACKING_EVENT_TYPE.EXPIRED, p));
  }
}

export class TrackingEventAddedEvent extends BaseDomainEvent<
  typeof TRACKING_EVENT_TYPE.EVENT_ADDED,
  TrackingEventAddedPayload
> {
  constructor(p: EventParams<TrackingEventAddedPayload>) {
    super(buildParams(TRACKING_EVENT_TYPE.EVENT_ADDED, p));
  }
}
