/**
 * Courier Domain Events
 * @module logistics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';

import { LOGISTICS_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const COURIER_EVENT_TYPE = {
  CREATED: 'logistics.courier.created',
  ACTIVATED: 'logistics.courier.activated',
  DEACTIVATED: 'logistics.courier.deactivated',
  SUSPENDED: 'logistics.courier.suspended',
  TERMINATED: 'logistics.courier.terminated',
  UPDATED: 'logistics.courier.updated',
  STATUS_CHANGED: 'logistics.courier.status_changed',
} as const;

export interface CourierCreatedPayload {
  readonly courierId: string;
  readonly code: string;
  readonly name: string;
  readonly type: string;
  readonly createdAt: string;
}

export interface CourierActivatedPayload {
  readonly courierId: string;
  readonly activatedAt: string;
}

export interface CourierDeactivatedPayload {
  readonly courierId: string;
  readonly reason?: string;
  readonly deactivatedAt: string;
}

export interface CourierSuspendedPayload {
  readonly courierId: string;
  readonly reason: string;
  readonly suspendedAt: string;
}

export interface CourierTerminatedPayload {
  readonly courierId: string;
  readonly reason?: string;
  readonly terminatedAt: string;
}

export interface CourierUpdatedPayload {
  readonly courierId: string;
  readonly updatedFields: readonly string[];
  readonly updatedAt: string;
}

export interface CourierStatusChangedPayload {
  readonly courierId: string;
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
    aggregateType: LOGISTICS_AGGREGATE_TYPE.COURIER,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class CourierCreatedEvent extends BaseDomainEvent<
  typeof COURIER_EVENT_TYPE.CREATED,
  CourierCreatedPayload
> {
  constructor(p: EventParams<CourierCreatedPayload>) {
    super(buildParams(COURIER_EVENT_TYPE.CREATED, p));
  }
}

export class CourierActivatedEvent extends BaseDomainEvent<
  typeof COURIER_EVENT_TYPE.ACTIVATED,
  CourierActivatedPayload
> {
  constructor(p: EventParams<CourierActivatedPayload>) {
    super(buildParams(COURIER_EVENT_TYPE.ACTIVATED, p));
  }
}

export class CourierDeactivatedEvent extends BaseDomainEvent<
  typeof COURIER_EVENT_TYPE.DEACTIVATED,
  CourierDeactivatedPayload
> {
  constructor(p: EventParams<CourierDeactivatedPayload>) {
    super(buildParams(COURIER_EVENT_TYPE.DEACTIVATED, p));
  }
}

export class CourierSuspendedEvent extends BaseDomainEvent<
  typeof COURIER_EVENT_TYPE.SUSPENDED,
  CourierSuspendedPayload
> {
  constructor(p: EventParams<CourierSuspendedPayload>) {
    super(buildParams(COURIER_EVENT_TYPE.SUSPENDED, p));
  }
}

export class CourierTerminatedEvent extends BaseDomainEvent<
  typeof COURIER_EVENT_TYPE.TERMINATED,
  CourierTerminatedPayload
> {
  constructor(p: EventParams<CourierTerminatedPayload>) {
    super(buildParams(COURIER_EVENT_TYPE.TERMINATED, p));
  }
}

export class CourierUpdatedEvent extends BaseDomainEvent<
  typeof COURIER_EVENT_TYPE.UPDATED,
  CourierUpdatedPayload
> {
  constructor(p: EventParams<CourierUpdatedPayload>) {
    super(buildParams(COURIER_EVENT_TYPE.UPDATED, p));
  }
}

export class CourierStatusChangedEvent extends BaseDomainEvent<
  typeof COURIER_EVENT_TYPE.STATUS_CHANGED,
  CourierStatusChangedPayload
> {
  constructor(p: EventParams<CourierStatusChangedPayload>) {
    super(buildParams(COURIER_EVENT_TYPE.STATUS_CHANGED, p));
  }
}
