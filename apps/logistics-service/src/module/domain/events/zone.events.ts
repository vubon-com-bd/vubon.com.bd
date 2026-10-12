/**
 * Zone domain events
 * @module logistics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { ZONE_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const ZONE_EVENT_TYPE = {
  CREATED: 'zone.created',
  ACTIVATED: 'zone.activated',
  INACTIVATED: 'zone.inactivated',
  RESTRICTED: 'zone.restricted',
  SUSPENDED: 'zone.suspended',
  ARCHIVED: 'zone.archived',
  RATE_UPDATED: 'zone.rate_updated',
} as const;

export interface ZoneCreatedPayload {
  readonly zoneId: string;
  readonly code: string;
  readonly name: string;
  readonly type: string;
  readonly shippingCost: number;
  readonly currency: string;
}

export interface ZoneStatusChangedPayload {
  readonly zoneId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly reason?: string;
}

export interface ZoneRateUpdatedPayload {
  readonly zoneId: string;
  readonly previousCost: number;
  readonly newCost: number;
  readonly currency: string;
  readonly updatedAt: string;
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
    aggregateType: ZONE_AGGREGATE_TYPE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class ZoneCreatedEvent extends BaseDomainEvent<typeof ZONE_EVENT_TYPE.CREATED, ZoneCreatedPayload> {
  constructor(p: EventParams<ZoneCreatedPayload>) { super(buildParams(ZONE_EVENT_TYPE.CREATED, p)); }
}
export class ZoneActivatedEvent extends BaseDomainEvent<typeof ZONE_EVENT_TYPE.ACTIVATED, ZoneStatusChangedPayload> {
  constructor(p: EventParams<ZoneStatusChangedPayload>) { super(buildParams(ZONE_EVENT_TYPE.ACTIVATED, p)); }
}
export class ZoneInactivatedEvent extends BaseDomainEvent<typeof ZONE_EVENT_TYPE.INACTIVATED, ZoneStatusChangedPayload> {
  constructor(p: EventParams<ZoneStatusChangedPayload>) { super(buildParams(ZONE_EVENT_TYPE.INACTIVATED, p)); }
}
export class ZoneRestrictedEvent extends BaseDomainEvent<typeof ZONE_EVENT_TYPE.RESTRICTED, ZoneStatusChangedPayload> {
  constructor(p: EventParams<ZoneStatusChangedPayload>) { super(buildParams(ZONE_EVENT_TYPE.RESTRICTED, p)); }
}
export class ZoneSuspendedEvent extends BaseDomainEvent<typeof ZONE_EVENT_TYPE.SUSPENDED, ZoneStatusChangedPayload> {
  constructor(p: EventParams<ZoneStatusChangedPayload>) { super(buildParams(ZONE_EVENT_TYPE.SUSPENDED, p)); }
}
export class ZoneArchivedEvent extends BaseDomainEvent<typeof ZONE_EVENT_TYPE.ARCHIVED, ZoneStatusChangedPayload> {
  constructor(p: EventParams<ZoneStatusChangedPayload>) { super(buildParams(ZONE_EVENT_TYPE.ARCHIVED, p)); }
}
export class ZoneRateUpdatedEvent extends BaseDomainEvent<typeof ZONE_EVENT_TYPE.RATE_UPDATED, ZoneRateUpdatedPayload> {
  constructor(p: EventParams<ZoneRateUpdatedPayload>) { super(buildParams(ZONE_EVENT_TYPE.RATE_UPDATED, p)); }
}
