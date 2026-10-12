/**
 * Dispatch domain events
 * @module logistics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { DISPATCH_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const DISPATCH_EVENT_TYPE = {
  CREATED: 'dispatch.created',
  ASSIGNED: 'dispatch.assigned',
  STARTED: 'dispatch.started',
  IN_TRANSIT: 'dispatch.in_transit',
  DELIVERED: 'dispatch.delivered',
  FAILED: 'dispatch.failed',
  RETURNED: 'dispatch.returned',
  CANCELLED: 'dispatch.cancelled',
  SHIPMENT_ADDED: 'dispatch.shipment_added',
  SHIPMENT_REMOVED: 'dispatch.shipment_removed',
  MANIFEST_GENERATED: 'dispatch.manifest_generated',
} as const;

export interface DispatchCreatedPayload {
  readonly dispatchId: string;
  readonly dispatchNumber: string;
  readonly type: string;
  readonly shipmentCount: number;
  readonly itemCount: number;
}

export interface DispatchStatusChangedPayload {
  readonly dispatchId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly reason?: string;
}

export interface DispatchShipmentChangedPayload {
  readonly dispatchId: string;
  readonly shipmentId: string;
  readonly totalShipments: number;
}

export interface DispatchManifestGeneratedPayload {
  readonly dispatchId: string;
  readonly manifestUrl: string;
  readonly generatedAt: string;
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
    aggregateType: DISPATCH_AGGREGATE_TYPE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class DispatchCreatedEvent extends BaseDomainEvent<typeof DISPATCH_EVENT_TYPE.CREATED, DispatchCreatedPayload> {
  constructor(p: EventParams<DispatchCreatedPayload>) { super(buildParams(DISPATCH_EVENT_TYPE.CREATED, p)); }
}
export class DispatchAssignedEvent extends BaseDomainEvent<typeof DISPATCH_EVENT_TYPE.ASSIGNED, DispatchStatusChangedPayload> {
  constructor(p: EventParams<DispatchStatusChangedPayload>) { super(buildParams(DISPATCH_EVENT_TYPE.ASSIGNED, p)); }
}
export class DispatchStartedEvent extends BaseDomainEvent<typeof DISPATCH_EVENT_TYPE.STARTED, DispatchStatusChangedPayload> {
  constructor(p: EventParams<DispatchStatusChangedPayload>) { super(buildParams(DISPATCH_EVENT_TYPE.STARTED, p)); }
}
export class DispatchInTransitEvent extends BaseDomainEvent<typeof DISPATCH_EVENT_TYPE.IN_TRANSIT, DispatchStatusChangedPayload> {
  constructor(p: EventParams<DispatchStatusChangedPayload>) { super(buildParams(DISPATCH_EVENT_TYPE.IN_TRANSIT, p)); }
}
export class DispatchDeliveredEvent extends BaseDomainEvent<typeof DISPATCH_EVENT_TYPE.DELIVERED, DispatchStatusChangedPayload> {
  constructor(p: EventParams<DispatchStatusChangedPayload>) { super(buildParams(DISPATCH_EVENT_TYPE.DELIVERED, p)); }
}
export class DispatchFailedEvent extends BaseDomainEvent<typeof DISPATCH_EVENT_TYPE.FAILED, DispatchStatusChangedPayload> {
  constructor(p: EventParams<DispatchStatusChangedPayload>) { super(buildParams(DISPATCH_EVENT_TYPE.FAILED, p)); }
}
export class DispatchReturnedEvent extends BaseDomainEvent<typeof DISPATCH_EVENT_TYPE.RETURNED, DispatchStatusChangedPayload> {
  constructor(p: EventParams<DispatchStatusChangedPayload>) { super(buildParams(DISPATCH_EVENT_TYPE.RETURNED, p)); }
}
export class DispatchCancelledEvent extends BaseDomainEvent<typeof DISPATCH_EVENT_TYPE.CANCELLED, DispatchStatusChangedPayload> {
  constructor(p: EventParams<DispatchStatusChangedPayload>) { super(buildParams(DISPATCH_EVENT_TYPE.CANCELLED, p)); }
}
export class DispatchShipmentAddedEvent extends BaseDomainEvent<typeof DISPATCH_EVENT_TYPE.SHIPMENT_ADDED, DispatchShipmentChangedPayload> {
  constructor(p: EventParams<DispatchShipmentChangedPayload>) { super(buildParams(DISPATCH_EVENT_TYPE.SHIPMENT_ADDED, p)); }
}
export class DispatchShipmentRemovedEvent extends BaseDomainEvent<typeof DISPATCH_EVENT_TYPE.SHIPMENT_REMOVED, DispatchShipmentChangedPayload> {
  constructor(p: EventParams<DispatchShipmentChangedPayload>) { super(buildParams(DISPATCH_EVENT_TYPE.SHIPMENT_REMOVED, p)); }
}
export class DispatchManifestGeneratedEvent extends BaseDomainEvent<typeof DISPATCH_EVENT_TYPE.MANIFEST_GENERATED, DispatchManifestGeneratedPayload> {
  constructor(p: EventParams<DispatchManifestGeneratedPayload>) { super(buildParams(DISPATCH_EVENT_TYPE.MANIFEST_GENERATED, p)); }
}
