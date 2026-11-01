/**
 * Fulfillment Domain Events
 * @module logistics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';

import { LOGISTICS_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const FULFILLMENT_EVENT_TYPE = {
  CREATED: 'logistics.fulfillment.created',
  STARTED: 'logistics.fulfillment.started',
  PICKING: 'logistics.fulfillment.picking',
  PACKING: 'logistics.fulfillment.packing',
  READY_TO_SHIP: 'logistics.fulfillment.ready_to_ship',
  SHIPPED: 'logistics.fulfillment.shipped',
  FULFILLED: 'logistics.fulfillment.fulfilled',
  PARTIALLY_FULFILLED: 'logistics.fulfillment.partially_fulfilled',
  CANCELLED: 'logistics.fulfillment.cancelled',
  FAILED: 'logistics.fulfillment.failed',
  ON_HOLD: 'logistics.fulfillment.on_hold',
  STATUS_CHANGED: 'logistics.fulfillment.status_changed',
} as const;

export interface FulfillmentCreatedPayload {
  readonly fulfillmentId: string;
  readonly orderId: string;
  readonly itemCount: number;
  readonly type: string;
  readonly priority: string;
  readonly createdAt: string;
}
export interface FulfillmentStartedPayload {
  readonly fulfillmentId: string;
  readonly startedAt: string;
}
export interface FulfillmentPickingPayload {
  readonly fulfillmentId: string;
  readonly pickingStartedAt: string;
}
export interface FulfillmentPackingPayload {
  readonly fulfillmentId: string;
  readonly packingStartedAt: string;
}
export interface FulfillmentReadyToShipPayload {
  readonly fulfillmentId: string;
  readonly readyAt: string;
}
export interface FulfillmentShippedPayload {
  readonly fulfillmentId: string;
  readonly shippedAt: string;
  readonly shipmentId?: string;
}
export interface FulfillmentFulfilledPayload {
  readonly fulfillmentId: string;
  readonly fulfilledAt: string;
}
export interface FulfillmentPartiallyFulfilledPayload {
  readonly fulfillmentId: string;
  readonly fulfilledItemCount: number;
  readonly totalItemCount: number;
  readonly partiallyFulfilledAt: string;
}
export interface FulfillmentCancelledPayload {
  readonly fulfillmentId: string;
  readonly reason?: string;
  readonly cancelledAt: string;
}
export interface FulfillmentFailedPayload {
  readonly fulfillmentId: string;
  readonly reason: string;
  readonly failedAt: string;
}
export interface FulfillmentOnHoldPayload {
  readonly fulfillmentId: string;
  readonly reason: string;
  readonly onHoldAt: string;
}
export interface FulfillmentStatusChangedPayload {
  readonly fulfillmentId: string;
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
    aggregateType: LOGISTICS_AGGREGATE_TYPE.FULFILLMENT,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class FulfillmentCreatedEvent extends BaseDomainEvent<
  typeof FULFILLMENT_EVENT_TYPE.CREATED,
  FulfillmentCreatedPayload
> {
  constructor(p: EventParams<FulfillmentCreatedPayload>) {
    super(buildParams(FULFILLMENT_EVENT_TYPE.CREATED, p));
  }
}
export class FulfillmentStartedEvent extends BaseDomainEvent<
  typeof FULFILLMENT_EVENT_TYPE.STARTED,
  FulfillmentStartedPayload
> {
  constructor(p: EventParams<FulfillmentStartedPayload>) {
    super(buildParams(FULFILLMENT_EVENT_TYPE.STARTED, p));
  }
}
export class FulfillmentPickingEvent extends BaseDomainEvent<
  typeof FULFILLMENT_EVENT_TYPE.PICKING,
  FulfillmentPickingPayload
> {
  constructor(p: EventParams<FulfillmentPickingPayload>) {
    super(buildParams(FULFILLMENT_EVENT_TYPE.PICKING, p));
  }
}
export class FulfillmentPackingEvent extends BaseDomainEvent<
  typeof FULFILLMENT_EVENT_TYPE.PACKING,
  FulfillmentPackingPayload
> {
  constructor(p: EventParams<FulfillmentPackingPayload>) {
    super(buildParams(FULFILLMENT_EVENT_TYPE.PACKING, p));
  }
}
export class FulfillmentReadyToShipEvent extends BaseDomainEvent<
  typeof FULFILLMENT_EVENT_TYPE.READY_TO_SHIP,
  FulfillmentReadyToShipPayload
> {
  constructor(p: EventParams<FulfillmentReadyToShipPayload>) {
    super(buildParams(FULFILLMENT_EVENT_TYPE.READY_TO_SHIP, p));
  }
}
export class FulfillmentShippedEvent extends BaseDomainEvent<
  typeof FULFILLMENT_EVENT_TYPE.SHIPPED,
  FulfillmentShippedPayload
> {
  constructor(p: EventParams<FulfillmentShippedPayload>) {
    super(buildParams(FULFILLMENT_EVENT_TYPE.SHIPPED, p));
  }
}
export class FulfillmentFulfilledEvent extends BaseDomainEvent<
  typeof FULFILLMENT_EVENT_TYPE.FULFILLED,
  FulfillmentFulfilledPayload
> {
  constructor(p: EventParams<FulfillmentFulfilledPayload>) {
    super(buildParams(FULFILLMENT_EVENT_TYPE.FULFILLED, p));
  }
}
export class FulfillmentPartiallyFulfilledEvent extends BaseDomainEvent<
  typeof FULFILLMENT_EVENT_TYPE.PARTIALLY_FULFILLED,
  FulfillmentPartiallyFulfilledPayload
> {
  constructor(p: EventParams<FulfillmentPartiallyFulfilledPayload>) {
    super(buildParams(FULFILLMENT_EVENT_TYPE.PARTIALLY_FULFILLED, p));
  }
}
export class FulfillmentCancelledEvent extends BaseDomainEvent<
  typeof FULFILLMENT_EVENT_TYPE.CANCELLED,
  FulfillmentCancelledPayload
> {
  constructor(p: EventParams<FulfillmentCancelledPayload>) {
    super(buildParams(FULFILLMENT_EVENT_TYPE.CANCELLED, p));
  }
}
export class FulfillmentFailedEvent extends BaseDomainEvent<
  typeof FULFILLMENT_EVENT_TYPE.FAILED,
  FulfillmentFailedPayload
> {
  constructor(p: EventParams<FulfillmentFailedPayload>) {
    super(buildParams(FULFILLMENT_EVENT_TYPE.FAILED, p));
  }
}
export class FulfillmentOnHoldEvent extends BaseDomainEvent<
  typeof FULFILLMENT_EVENT_TYPE.ON_HOLD,
  FulfillmentOnHoldPayload
> {
  constructor(p: EventParams<FulfillmentOnHoldPayload>) {
    super(buildParams(FULFILLMENT_EVENT_TYPE.ON_HOLD, p));
  }
}
export class FulfillmentStatusChangedEvent extends BaseDomainEvent<
  typeof FULFILLMENT_EVENT_TYPE.STATUS_CHANGED,
  FulfillmentStatusChangedPayload
> {
  constructor(p: EventParams<FulfillmentStatusChangedPayload>) {
    super(buildParams(FULFILLMENT_EVENT_TYPE.STATUS_CHANGED, p));
  }
}
