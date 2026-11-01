/**
 * ShippingMethod Domain Events
 * @module logistics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';

import { LOGISTICS_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const SHIPPING_METHOD_EVENT_TYPE = {
  CREATED: 'logistics.shipping_method.created',
  ACTIVATED: 'logistics.shipping_method.activated',
  DEACTIVATED: 'logistics.shipping_method.deactivated',
  SUSPENDED: 'logistics.shipping_method.suspended',
  RATE_UPDATED: 'logistics.shipping_method.rate_updated',
  STATUS_CHANGED: 'logistics.shipping_method.status_changed',
} as const;

export interface ShippingMethodCreatedPayload {
  readonly methodId: string;
  readonly code: string;
  readonly displayName: string;
  readonly type: string;
  readonly createdAt: string;
}
export interface ShippingMethodActivatedPayload {
  readonly methodId: string;
  readonly activatedAt: string;
}
export interface ShippingMethodDeactivatedPayload {
  readonly methodId: string;
  readonly reason?: string;
  readonly deactivatedAt: string;
}
export interface ShippingMethodSuspendedPayload {
  readonly methodId: string;
  readonly reason: string;
  readonly suspendedAt: string;
}
export interface ShippingMethodRateUpdatedPayload {
  readonly methodId: string;
  readonly baseCost: number;
  readonly currency: string;
  readonly freeAbove?: number;
  readonly updatedAt: string;
}
export interface ShippingMethodStatusChangedPayload {
  readonly methodId: string;
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
    aggregateType: LOGISTICS_AGGREGATE_TYPE.SHIPPING_METHOD,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class ShippingMethodCreatedEvent extends BaseDomainEvent<
  typeof SHIPPING_METHOD_EVENT_TYPE.CREATED,
  ShippingMethodCreatedPayload
> {
  constructor(p: EventParams<ShippingMethodCreatedPayload>) {
    super(buildParams(SHIPPING_METHOD_EVENT_TYPE.CREATED, p));
  }
}
export class ShippingMethodActivatedEvent extends BaseDomainEvent<
  typeof SHIPPING_METHOD_EVENT_TYPE.ACTIVATED,
  ShippingMethodActivatedPayload
> {
  constructor(p: EventParams<ShippingMethodActivatedPayload>) {
    super(buildParams(SHIPPING_METHOD_EVENT_TYPE.ACTIVATED, p));
  }
}
export class ShippingMethodDeactivatedEvent extends BaseDomainEvent<
  typeof SHIPPING_METHOD_EVENT_TYPE.DEACTIVATED,
  ShippingMethodDeactivatedPayload
> {
  constructor(p: EventParams<ShippingMethodDeactivatedPayload>) {
    super(buildParams(SHIPPING_METHOD_EVENT_TYPE.DEACTIVATED, p));
  }
}
export class ShippingMethodSuspendedEvent extends BaseDomainEvent<
  typeof SHIPPING_METHOD_EVENT_TYPE.SUSPENDED,
  ShippingMethodSuspendedPayload
> {
  constructor(p: EventParams<ShippingMethodSuspendedPayload>) {
    super(buildParams(SHIPPING_METHOD_EVENT_TYPE.SUSPENDED, p));
  }
}
export class ShippingMethodRateUpdatedEvent extends BaseDomainEvent<
  typeof SHIPPING_METHOD_EVENT_TYPE.RATE_UPDATED,
  ShippingMethodRateUpdatedPayload
> {
  constructor(p: EventParams<ShippingMethodRateUpdatedPayload>) {
    super(buildParams(SHIPPING_METHOD_EVENT_TYPE.RATE_UPDATED, p));
  }
}
export class ShippingMethodStatusChangedEvent extends BaseDomainEvent<
  typeof SHIPPING_METHOD_EVENT_TYPE.STATUS_CHANGED,
  ShippingMethodStatusChangedPayload
> {
  constructor(p: EventParams<ShippingMethodStatusChangedPayload>) {
    super(buildParams(SHIPPING_METHOD_EVENT_TYPE.STATUS_CHANGED, p));
  }
}
