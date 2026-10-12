/**
 * ShippingMethod domain events
 * @module logistics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { SHIPPING_METHOD_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const SHIPPING_METHOD_EVENT_TYPE = {
  CREATED: 'shipping_method.created',
  ACTIVATED: 'shipping_method.activated',
  DEACTIVATED: 'shipping_method.deactivated',
  SEASONAL: 'shipping_method.seasonal',
  SUSPENDED: 'shipping_method.suspended',
  RATE_UPDATED: 'shipping_method.rate_updated',
  MADE_DEFAULT: 'shipping_method.made_default',
} as const;

export interface ShippingMethodCreatedPayload {
  readonly methodId: string;
  readonly code: string;
  readonly name: string;
  readonly rateType: string;
  readonly baseCost: number;
  readonly currency: string;
}

export interface ShippingMethodStatusChangedPayload {
  readonly methodId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly reason?: string;
}

export interface ShippingMethodRateUpdatedPayload {
  readonly methodId: string;
  readonly previousCost: number;
  readonly newCost: number;
  readonly currency: string;
  readonly updatedAt: string;
}

export interface ShippingMethodDefaultChangedPayload {
  readonly methodId: string;
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
    aggregateType: SHIPPING_METHOD_AGGREGATE_TYPE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class ShippingMethodCreatedEvent extends BaseDomainEvent<typeof SHIPPING_METHOD_EVENT_TYPE.CREATED, ShippingMethodCreatedPayload> {
  constructor(p: EventParams<ShippingMethodCreatedPayload>) { super(buildParams(SHIPPING_METHOD_EVENT_TYPE.CREATED, p)); }
}
export class ShippingMethodActivatedEvent extends BaseDomainEvent<typeof SHIPPING_METHOD_EVENT_TYPE.ACTIVATED, ShippingMethodStatusChangedPayload> {
  constructor(p: EventParams<ShippingMethodStatusChangedPayload>) { super(buildParams(SHIPPING_METHOD_EVENT_TYPE.ACTIVATED, p)); }
}
export class ShippingMethodDeactivatedEvent extends BaseDomainEvent<typeof SHIPPING_METHOD_EVENT_TYPE.DEACTIVATED, ShippingMethodStatusChangedPayload> {
  constructor(p: EventParams<ShippingMethodStatusChangedPayload>) { super(buildParams(SHIPPING_METHOD_EVENT_TYPE.DEACTIVATED, p)); }
}
export class ShippingMethodSeasonalEvent extends BaseDomainEvent<typeof SHIPPING_METHOD_EVENT_TYPE.SEASONAL, ShippingMethodStatusChangedPayload> {
  constructor(p: EventParams<ShippingMethodStatusChangedPayload>) { super(buildParams(SHIPPING_METHOD_EVENT_TYPE.SEASONAL, p)); }
}
export class ShippingMethodSuspendedEvent extends BaseDomainEvent<typeof SHIPPING_METHOD_EVENT_TYPE.SUSPENDED, ShippingMethodStatusChangedPayload> {
  constructor(p: EventParams<ShippingMethodStatusChangedPayload>) { super(buildParams(SHIPPING_METHOD_EVENT_TYPE.SUSPENDED, p)); }
}
export class ShippingMethodRateUpdatedEvent extends BaseDomainEvent<typeof SHIPPING_METHOD_EVENT_TYPE.RATE_UPDATED, ShippingMethodRateUpdatedPayload> {
  constructor(p: EventParams<ShippingMethodRateUpdatedPayload>) { super(buildParams(SHIPPING_METHOD_EVENT_TYPE.RATE_UPDATED, p)); }
}
export class ShippingMethodMadeDefaultEvent extends BaseDomainEvent<typeof SHIPPING_METHOD_EVENT_TYPE.MADE_DEFAULT, ShippingMethodDefaultChangedPayload> {
  constructor(p: EventParams<ShippingMethodDefaultChangedPayload>) { super(buildParams(SHIPPING_METHOD_EVENT_TYPE.MADE_DEFAULT, p)); }
}
