/**
 * Fulfillment domain events
 * @module logistics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { FULFILLMENT_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const FULFILLMENT_EVENT_TYPE = {
  CREATED: 'fulfillment.created',
  PROCESSING_STARTED: 'fulfillment.processing_started',
  PICKING_STARTED: 'fulfillment.picking_started',
  PACKING_STARTED: 'fulfillment.packing_started',
  READY_TO_SHIP: 'fulfillment.ready_to_ship',
  SHIPPED: 'fulfillment.shipped',
  PARTIALLY_FULFILLED: 'fulfillment.partially_fulfilled',
  FULFILLED: 'fulfillment.fulfilled',
  ON_HOLD: 'fulfillment.on_hold',
  RELEASED: 'fulfillment.released',
  FAILED: 'fulfillment.failed',
  CANCELLED: 'fulfillment.cancelled',
  ASSIGNED_TO: 'fulfillment.assigned_to',
  SLA_BREACHED: 'fulfillment.sla_breached',
} as const;

export interface FulfillmentCreatedPayload {
  readonly fulfillmentId: string;
  readonly orderId: string;
  readonly vendorId?: string;
  readonly warehouseId?: string;
  readonly type: string;
  readonly priority: string;
  readonly itemCount: number;
}

export interface FulfillmentStatusChangedPayload {
  readonly fulfillmentId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly changedBy?: string;
  readonly reason?: string;
}

export interface FulfillmentAssignedPayload {
  readonly fulfillmentId: string;
  readonly assignedTo: string;
  readonly assignedAt: string;
}

export interface FulfillmentSlaBreachedPayload {
  readonly fulfillmentId: string;
  readonly dueAt: string;
  readonly breachedAt: string;
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
    aggregateType: FULFILLMENT_AGGREGATE_TYPE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class FulfillmentCreatedEvent extends BaseDomainEvent<typeof FULFILLMENT_EVENT_TYPE.CREATED, FulfillmentCreatedPayload> {
  constructor(p: EventParams<FulfillmentCreatedPayload>) { super(buildParams(FULFILLMENT_EVENT_TYPE.CREATED, p)); }
}
export class FulfillmentProcessingStartedEvent extends BaseDomainEvent<typeof FULFILLMENT_EVENT_TYPE.PROCESSING_STARTED, FulfillmentStatusChangedPayload> {
  constructor(p: EventParams<FulfillmentStatusChangedPayload>) { super(buildParams(FULFILLMENT_EVENT_TYPE.PROCESSING_STARTED, p)); }
}
export class FulfillmentPickingStartedEvent extends BaseDomainEvent<typeof FULFILLMENT_EVENT_TYPE.PICKING_STARTED, FulfillmentStatusChangedPayload> {
  constructor(p: EventParams<FulfillmentStatusChangedPayload>) { super(buildParams(FULFILLMENT_EVENT_TYPE.PICKING_STARTED, p)); }
}
export class FulfillmentPackingStartedEvent extends BaseDomainEvent<typeof FULFILLMENT_EVENT_TYPE.PACKING_STARTED, FulfillmentStatusChangedPayload> {
  constructor(p: EventParams<FulfillmentStatusChangedPayload>) { super(buildParams(FULFILLMENT_EVENT_TYPE.PACKING_STARTED, p)); }
}
export class FulfillmentReadyToShipEvent extends BaseDomainEvent<typeof FULFILLMENT_EVENT_TYPE.READY_TO_SHIP, FulfillmentStatusChangedPayload> {
  constructor(p: EventParams<FulfillmentStatusChangedPayload>) { super(buildParams(FULFILLMENT_EVENT_TYPE.READY_TO_SHIP, p)); }
}
export class FulfillmentShippedEvent extends BaseDomainEvent<typeof FULFILLMENT_EVENT_TYPE.SHIPPED, FulfillmentStatusChangedPayload> {
  constructor(p: EventParams<FulfillmentStatusChangedPayload>) { super(buildParams(FULFILLMENT_EVENT_TYPE.SHIPPED, p)); }
}
export class FulfillmentPartiallyFulfilledEvent extends BaseDomainEvent<typeof FULFILLMENT_EVENT_TYPE.PARTIALLY_FULFILLED, FulfillmentStatusChangedPayload> {
  constructor(p: EventParams<FulfillmentStatusChangedPayload>) { super(buildParams(FULFILLMENT_EVENT_TYPE.PARTIALLY_FULFILLED, p)); }
}
export class FulfillmentFulfilledEvent extends BaseDomainEvent<typeof FULFILLMENT_EVENT_TYPE.FULFILLED, FulfillmentStatusChangedPayload> {
  constructor(p: EventParams<FulfillmentStatusChangedPayload>) { super(buildParams(FULFILLMENT_EVENT_TYPE.FULFILLED, p)); }
}
export class FulfillmentOnHoldEvent extends BaseDomainEvent<typeof FULFILLMENT_EVENT_TYPE.ON_HOLD, FulfillmentStatusChangedPayload> {
  constructor(p: EventParams<FulfillmentStatusChangedPayload>) { super(buildParams(FULFILLMENT_EVENT_TYPE.ON_HOLD, p)); }
}
export class FulfillmentReleasedEvent extends BaseDomainEvent<typeof FULFILLMENT_EVENT_TYPE.RELEASED, FulfillmentStatusChangedPayload> {
  constructor(p: EventParams<FulfillmentStatusChangedPayload>) { super(buildParams(FULFILLMENT_EVENT_TYPE.RELEASED, p)); }
}
export class FulfillmentFailedEvent extends BaseDomainEvent<typeof FULFILLMENT_EVENT_TYPE.FAILED, FulfillmentStatusChangedPayload> {
  constructor(p: EventParams<FulfillmentStatusChangedPayload>) { super(buildParams(FULFILLMENT_EVENT_TYPE.FAILED, p)); }
}
export class FulfillmentCancelledEvent extends BaseDomainEvent<typeof FULFILLMENT_EVENT_TYPE.CANCELLED, FulfillmentStatusChangedPayload> {
  constructor(p: EventParams<FulfillmentStatusChangedPayload>) { super(buildParams(FULFILLMENT_EVENT_TYPE.CANCELLED, p)); }
}
export class FulfillmentAssignedEvent extends BaseDomainEvent<typeof FULFILLMENT_EVENT_TYPE.ASSIGNED_TO, FulfillmentAssignedPayload> {
  constructor(p: EventParams<FulfillmentAssignedPayload>) { super(buildParams(FULFILLMENT_EVENT_TYPE.ASSIGNED_TO, p)); }
}
export class FulfillmentSlaBreachedEvent extends BaseDomainEvent<typeof FULFILLMENT_EVENT_TYPE.SLA_BREACHED, FulfillmentSlaBreachedPayload> {
  constructor(p: EventParams<FulfillmentSlaBreachedPayload>) { super(buildParams(FULFILLMENT_EVENT_TYPE.SLA_BREACHED, p)); }
}
