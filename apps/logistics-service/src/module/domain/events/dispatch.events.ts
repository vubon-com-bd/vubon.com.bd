/**
 * Dispatch Domain Events
 * @module logistics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';

import { LOGISTICS_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const DISPATCH_EVENT_TYPE = {
  CREATED: 'logistics.dispatch.created',
  ASSIGNED: 'logistics.dispatch.assigned',
  DISPATCHED: 'logistics.dispatch.dispatched',
  IN_TRANSIT: 'logistics.dispatch.in_transit',
  DELIVERED: 'logistics.dispatch.delivered',
  FAILED: 'logistics.dispatch.failed',
  RETURNED: 'logistics.dispatch.returned',
  CANCELLED: 'logistics.dispatch.cancelled',
  STATUS_CHANGED: 'logistics.dispatch.status_changed',
} as const;

export interface DispatchCreatedPayload {
  readonly dispatchId: string;
  readonly dispatchNumber: string;
  readonly shipmentIds: readonly string[];
  readonly type: string;
  readonly createdAt: string;
}
export interface DispatchAssignedPayload {
  readonly dispatchId: string;
  readonly courierId?: string;
  readonly vehicleId?: string;
  readonly driverId?: string;
  readonly assignedAt: string;
}
export interface DispatchDispatchedPayload {
  readonly dispatchId: string;
  readonly dispatchedAt: string;
  readonly manifestUrl?: string;
}
export interface DispatchInTransitPayload {
  readonly dispatchId: string;
  readonly inTransitAt: string;
}
export interface DispatchDeliveredPayload {
  readonly dispatchId: string;
  readonly deliveredAt: string;
}
export interface DispatchFailedPayload {
  readonly dispatchId: string;
  readonly reason: string;
  readonly failedAt: string;
}
export interface DispatchReturnedPayload {
  readonly dispatchId: string;
  readonly returnedAt: string;
  readonly reason?: string;
}
export interface DispatchCancelledPayload {
  readonly dispatchId: string;
  readonly cancelledAt: string;
  readonly reason?: string;
}
export interface DispatchStatusChangedPayload {
  readonly dispatchId: string;
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
    aggregateType: LOGISTICS_AGGREGATE_TYPE.DISPATCH,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class DispatchCreatedEvent extends BaseDomainEvent<
  typeof DISPATCH_EVENT_TYPE.CREATED,
  DispatchCreatedPayload
> {
  constructor(p: EventParams<DispatchCreatedPayload>) {
    super(buildParams(DISPATCH_EVENT_TYPE.CREATED, p));
  }
}
export class DispatchAssignedEvent extends BaseDomainEvent<
  typeof DISPATCH_EVENT_TYPE.ASSIGNED,
  DispatchAssignedPayload
> {
  constructor(p: EventParams<DispatchAssignedPayload>) {
    super(buildParams(DISPATCH_EVENT_TYPE.ASSIGNED, p));
  }
}
export class DispatchDispatchedEvent extends BaseDomainEvent<
  typeof DISPATCH_EVENT_TYPE.DISPATCHED,
  DispatchDispatchedPayload
> {
  constructor(p: EventParams<DispatchDispatchedPayload>) {
    super(buildParams(DISPATCH_EVENT_TYPE.DISPATCHED, p));
  }
}
export class DispatchInTransitEvent extends BaseDomainEvent<
  typeof DISPATCH_EVENT_TYPE.IN_TRANSIT,
  DispatchInTransitPayload
> {
  constructor(p: EventParams<DispatchInTransitPayload>) {
    super(buildParams(DISPATCH_EVENT_TYPE.IN_TRANSIT, p));
  }
}
export class DispatchDeliveredEvent extends BaseDomainEvent<
  typeof DISPATCH_EVENT_TYPE.DELIVERED,
  DispatchDeliveredPayload
> {
  constructor(p: EventParams<DispatchDeliveredPayload>) {
    super(buildParams(DISPATCH_EVENT_TYPE.DELIVERED, p));
  }
}
export class DispatchFailedEvent extends BaseDomainEvent<
  typeof DISPATCH_EVENT_TYPE.FAILED,
  DispatchFailedPayload
> {
  constructor(p: EventParams<DispatchFailedPayload>) {
    super(buildParams(DISPATCH_EVENT_TYPE.FAILED, p));
  }
}
export class DispatchReturnedEvent extends BaseDomainEvent<
  typeof DISPATCH_EVENT_TYPE.RETURNED,
  DispatchReturnedPayload
> {
  constructor(p: EventParams<DispatchReturnedPayload>) {
    super(buildParams(DISPATCH_EVENT_TYPE.RETURNED, p));
  }
}
export class DispatchCancelledEvent extends BaseDomainEvent<
  typeof DISPATCH_EVENT_TYPE.CANCELLED,
  DispatchCancelledPayload
> {
  constructor(p: EventParams<DispatchCancelledPayload>) {
    super(buildParams(DISPATCH_EVENT_TYPE.CANCELLED, p));
  }
}
export class DispatchStatusChangedEvent extends BaseDomainEvent<
  typeof DISPATCH_EVENT_TYPE.STATUS_CHANGED,
  DispatchStatusChangedPayload
> {
  constructor(p: EventParams<DispatchStatusChangedPayload>) {
    super(buildParams(DISPATCH_EVENT_TYPE.STATUS_CHANGED, p));
  }
}
