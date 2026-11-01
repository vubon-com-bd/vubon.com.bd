/**
 * Zone Domain Events
 * @module logistics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';

import { LOGISTICS_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const ZONE_EVENT_TYPE = {
  CREATED: 'logistics.zone.created',
  ACTIVATED: 'logistics.zone.activated',
  DEACTIVATED: 'logistics.zone.deactivated',
  RESTRICTED: 'logistics.zone.restricted',
  SUSPENDED: 'logistics.zone.suspended',
  ARCHIVED: 'logistics.zone.archived',
  PRICING_UPDATED: 'logistics.zone.pricing_updated',
  COVERAGE_UPDATED: 'logistics.zone.coverage_updated',
  STATUS_CHANGED: 'logistics.zone.status_changed',
} as const;

export interface ZoneCreatedPayload {
  readonly zoneId: string;
  readonly code: string;
  readonly name: string;
  readonly type: string;
  readonly createdAt: string;
}
export interface ZoneActivatedPayload {
  readonly zoneId: string;
  readonly activatedAt: string;
}
export interface ZoneDeactivatedPayload {
  readonly zoneId: string;
  readonly reason?: string;
  readonly deactivatedAt: string;
}
export interface ZoneRestrictedPayload {
  readonly zoneId: string;
  readonly reason: string;
  readonly restrictedAt: string;
}
export interface ZoneSuspendedPayload {
  readonly zoneId: string;
  readonly reason?: string;
  readonly suspendedAt: string;
}
export interface ZoneArchivedPayload {
  readonly zoneId: string;
  readonly archivedAt: string;
}
export interface ZonePricingUpdatedPayload {
  readonly zoneId: string;
  readonly shippingCost: number;
  readonly currency: string;
  readonly freeAbove?: number;
  readonly updatedAt: string;
}
export interface ZoneCoverageUpdatedPayload {
  readonly zoneId: string;
  readonly postalCodes?: readonly string[];
  readonly districts?: readonly string[];
  readonly divisions?: readonly string[];
  readonly updatedAt: string;
}
export interface ZoneStatusChangedPayload {
  readonly zoneId: string;
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
    aggregateType: LOGISTICS_AGGREGATE_TYPE.ZONE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class ZoneCreatedEvent extends BaseDomainEvent<
  typeof ZONE_EVENT_TYPE.CREATED,
  ZoneCreatedPayload
> {
  constructor(p: EventParams<ZoneCreatedPayload>) {
    super(buildParams(ZONE_EVENT_TYPE.CREATED, p));
  }
}
export class ZoneActivatedEvent extends BaseDomainEvent<
  typeof ZONE_EVENT_TYPE.ACTIVATED,
  ZoneActivatedPayload
> {
  constructor(p: EventParams<ZoneActivatedPayload>) {
    super(buildParams(ZONE_EVENT_TYPE.ACTIVATED, p));
  }
}
export class ZoneDeactivatedEvent extends BaseDomainEvent<
  typeof ZONE_EVENT_TYPE.DEACTIVATED,
  ZoneDeactivatedPayload
> {
  constructor(p: EventParams<ZoneDeactivatedPayload>) {
    super(buildParams(ZONE_EVENT_TYPE.DEACTIVATED, p));
  }
}
export class ZoneRestrictedEvent extends BaseDomainEvent<
  typeof ZONE_EVENT_TYPE.RESTRICTED,
  ZoneRestrictedPayload
> {
  constructor(p: EventParams<ZoneRestrictedPayload>) {
    super(buildParams(ZONE_EVENT_TYPE.RESTRICTED, p));
  }
}
export class ZoneSuspendedEvent extends BaseDomainEvent<
  typeof ZONE_EVENT_TYPE.SUSPENDED,
  ZoneSuspendedPayload
> {
  constructor(p: EventParams<ZoneSuspendedPayload>) {
    super(buildParams(ZONE_EVENT_TYPE.SUSPENDED, p));
  }
}
export class ZoneArchivedEvent extends BaseDomainEvent<
  typeof ZONE_EVENT_TYPE.ARCHIVED,
  ZoneArchivedPayload
> {
  constructor(p: EventParams<ZoneArchivedPayload>) {
    super(buildParams(ZONE_EVENT_TYPE.ARCHIVED, p));
  }
}
export class ZonePricingUpdatedEvent extends BaseDomainEvent<
  typeof ZONE_EVENT_TYPE.PRICING_UPDATED,
  ZonePricingUpdatedPayload
> {
  constructor(p: EventParams<ZonePricingUpdatedPayload>) {
    super(buildParams(ZONE_EVENT_TYPE.PRICING_UPDATED, p));
  }
}
export class ZoneCoverageUpdatedEvent extends BaseDomainEvent<
  typeof ZONE_EVENT_TYPE.COVERAGE_UPDATED,
  ZoneCoverageUpdatedPayload
> {
  constructor(p: EventParams<ZoneCoverageUpdatedPayload>) {
    super(buildParams(ZONE_EVENT_TYPE.COVERAGE_UPDATED, p));
  }
}
export class ZoneStatusChangedEvent extends BaseDomainEvent<
  typeof ZONE_EVENT_TYPE.STATUS_CHANGED,
  ZoneStatusChangedPayload
> {
  constructor(p: EventParams<ZoneStatusChangedPayload>) {
    super(buildParams(ZONE_EVENT_TYPE.STATUS_CHANGED, p));
  }
}
