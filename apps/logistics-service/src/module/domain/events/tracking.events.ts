/**
 * Tracking domain events
 * @module logistics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { TRACKING_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const TRACKING_EVENT_TYPE = {
  STARTED: 'tracking.started',
  EVENT_RECORDED: 'tracking.event_recorded',
  STATUS_CHANGED: 'tracking.status_changed',
  COMPLETED: 'tracking.completed',
  FAILED: 'tracking.failed',
  EXPIRED: 'tracking.expired',
  PUBLIC_ACCESS_ENABLED: 'tracking.public_access_enabled',
  PUBLIC_ACCESS_DISABLED: 'tracking.public_access_disabled',
} as const;

export interface TrackingStartedPayload {
  readonly trackingNumber: string;
  readonly shipmentId?: string;
  readonly orderId?: string;
  readonly courierCode?: string;
}

export interface TrackingEventRecordedPayload {
  readonly trackingNumber: string;
  readonly eventId: string;
  readonly event: string;
  readonly status: string;
  readonly source: string;
  readonly message: string;
  readonly location?: string;
  readonly occurredAt: string;
}

export interface TrackingStatusChangedPayload {
  readonly trackingNumber: string;
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

function buildParams<TType extends string, TPayload>(type: TType, p: EventParams<TPayload>) {
  return {
    id: p.id ?? newEventId(),
    type,
    aggregateId: p.aggregateId,
    aggregateType: TRACKING_AGGREGATE_TYPE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class TrackingStartedEvent extends BaseDomainEvent<typeof TRACKING_EVENT_TYPE.STARTED, TrackingStartedPayload> {
  constructor(p: EventParams<TrackingStartedPayload>) { super(buildParams(TRACKING_EVENT_TYPE.STARTED, p)); }
}
export class TrackingEventRecordedEvent extends BaseDomainEvent<typeof TRACKING_EVENT_TYPE.EVENT_RECORDED, TrackingEventRecordedPayload> {
  constructor(p: EventParams<TrackingEventRecordedPayload>) { super(buildParams(TRACKING_EVENT_TYPE.EVENT_RECORDED, p)); }
}
export class TrackingStatusChangedEvent extends BaseDomainEvent<typeof TRACKING_EVENT_TYPE.STATUS_CHANGED, TrackingStatusChangedPayload> {
  constructor(p: EventParams<TrackingStatusChangedPayload>) { super(buildParams(TRACKING_EVENT_TYPE.STATUS_CHANGED, p)); }
}
export class TrackingCompletedEvent extends BaseDomainEvent<typeof TRACKING_EVENT_TYPE.COMPLETED, TrackingStatusChangedPayload> {
  constructor(p: EventParams<TrackingStatusChangedPayload>) { super(buildParams(TRACKING_EVENT_TYPE.COMPLETED, p)); }
}
export class TrackingFailedEvent extends BaseDomainEvent<typeof TRACKING_EVENT_TYPE.FAILED, TrackingStatusChangedPayload> {
  constructor(p: EventParams<TrackingStatusChangedPayload>) { super(buildParams(TRACKING_EVENT_TYPE.FAILED, p)); }
}
export class TrackingExpiredEvent extends BaseDomainEvent<typeof TRACKING_EVENT_TYPE.EXPIRED, TrackingStatusChangedPayload> {
  constructor(p: EventParams<TrackingStatusChangedPayload>) { super(buildParams(TRACKING_EVENT_TYPE.EXPIRED, p)); }
}
export class TrackingPublicAccessEnabledEvent extends BaseDomainEvent<typeof TRACKING_EVENT_TYPE.PUBLIC_ACCESS_ENABLED, TrackingStatusChangedPayload> {
  constructor(p: EventParams<TrackingStatusChangedPayload>) { super(buildParams(TRACKING_EVENT_TYPE.PUBLIC_ACCESS_ENABLED, p)); }
}
export class TrackingPublicAccessDisabledEvent extends BaseDomainEvent<typeof TRACKING_EVENT_TYPE.PUBLIC_ACCESS_DISABLED, TrackingStatusChangedPayload> {
  constructor(p: EventParams<TrackingStatusChangedPayload>) { super(buildParams(TRACKING_EVENT_TYPE.PUBLIC_ACCESS_DISABLED, p)); }
}
