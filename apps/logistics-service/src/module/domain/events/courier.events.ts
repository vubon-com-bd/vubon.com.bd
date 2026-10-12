/**
 * Courier domain events
 * @module logistics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { COURIER_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const COURIER_EVENT_TYPE = {
  REGISTERED: 'courier.registered',
  ACTIVATED: 'courier.activated',
  DEACTIVATED: 'courier.deactivated',
  SUSPENDED: 'courier.suspended',
  TERMINATED: 'courier.terminated',
  CONFIG_UPDATED: 'courier.config_updated',
  DEFAULT_CHANGED: 'courier.default_changed',
} as const;

export interface CourierRegisteredPayload {
  readonly courierId: string;
  readonly code: string;
  readonly name: string;
  readonly type: string;
  readonly supportsCOD: boolean;
  readonly supportsInsurance: boolean;
}

export interface CourierStatusChangedPayload {
  readonly courierId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly changedBy?: string;
  readonly reason?: string;
}

export interface CourierConfigUpdatedPayload {
  readonly courierId: string;
  readonly fields: readonly string[];
  readonly updatedAt: string;
}

export interface CourierDefaultChangedPayload {
  readonly courierId: string;
  readonly isDefault: boolean;
  readonly changedAt: string;
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
    aggregateType: COURIER_AGGREGATE_TYPE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class CourierRegisteredEvent extends BaseDomainEvent<typeof COURIER_EVENT_TYPE.REGISTERED, CourierRegisteredPayload> {
  constructor(p: EventParams<CourierRegisteredPayload>) { super(buildParams(COURIER_EVENT_TYPE.REGISTERED, p)); }
}

export class CourierActivatedEvent extends BaseDomainEvent<typeof COURIER_EVENT_TYPE.ACTIVATED, CourierStatusChangedPayload> {
  constructor(p: EventParams<CourierStatusChangedPayload>) { super(buildParams(COURIER_EVENT_TYPE.ACTIVATED, p)); }
}

export class CourierDeactivatedEvent extends BaseDomainEvent<typeof COURIER_EVENT_TYPE.DEACTIVATED, CourierStatusChangedPayload> {
  constructor(p: EventParams<CourierStatusChangedPayload>) { super(buildParams(COURIER_EVENT_TYPE.DEACTIVATED, p)); }
}

export class CourierSuspendedEvent extends BaseDomainEvent<typeof COURIER_EVENT_TYPE.SUSPENDED, CourierStatusChangedPayload> {
  constructor(p: EventParams<CourierStatusChangedPayload>) { super(buildParams(COURIER_EVENT_TYPE.SUSPENDED, p)); }
}

export class CourierTerminatedEvent extends BaseDomainEvent<typeof COURIER_EVENT_TYPE.TERMINATED, CourierStatusChangedPayload> {
  constructor(p: EventParams<CourierStatusChangedPayload>) { super(buildParams(COURIER_EVENT_TYPE.TERMINATED, p)); }
}

export class CourierConfigUpdatedEvent extends BaseDomainEvent<typeof COURIER_EVENT_TYPE.CONFIG_UPDATED, CourierConfigUpdatedPayload> {
  constructor(p: EventParams<CourierConfigUpdatedPayload>) { super(buildParams(COURIER_EVENT_TYPE.CONFIG_UPDATED, p)); }
}

export class CourierDefaultChangedEvent extends BaseDomainEvent<typeof COURIER_EVENT_TYPE.DEFAULT_CHANGED, CourierDefaultChangedPayload> {
  constructor(p: EventParams<CourierDefaultChangedPayload>) { super(buildParams(COURIER_EVENT_TYPE.DEFAULT_CHANGED, p)); }
}
