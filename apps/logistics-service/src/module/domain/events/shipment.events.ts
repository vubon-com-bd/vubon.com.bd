/**
 * Shipment domain events
 * @module logistics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { SHIPMENT_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const SHIPMENT_EVENT_TYPE = {
  CREATED: 'shipment.created',
  CONFIRMED: 'shipment.confirmed',
  PROCESSING_STARTED: 'shipment.processing_started',
  PACKED: 'shipment.packed',
  LABEL_GENERATED: 'shipment.label_generated',
  PICKED_UP: 'shipment.picked_up',
  IN_TRANSIT: 'shipment.in_transit',
  OUT_FOR_DELIVERY: 'shipment.out_for_delivery',
  DELIVERED: 'shipment.delivered',
  FAILED: 'shipment.failed',
  RETURNED: 'shipment.returned',
  CANCELLED: 'shipment.cancelled',
  PUT_ON_HOLD: 'shipment.put_on_hold',
  RELEASED: 'shipment.released',
  DELAYED: 'shipment.delayed',
  COURIER_ASSIGNED: 'shipment.courier_assigned',
  WAREHOUSE_ASSIGNED: 'shipment.warehouse_assigned',
  STATUS_CHANGED: 'shipment.status_changed',
} as const;

export interface ShipmentCreatedPayload {
  readonly shipmentId: string;
  readonly trackingNumber: string;
  readonly orderId: string;
  readonly userId?: string;
  readonly vendorId?: string;
  readonly type: string;
  readonly priority: string;
  readonly itemCount: number;
  readonly isCOD: boolean;
  readonly isInsured: boolean;
}

export interface ShipmentStatusChangedPayload {
  readonly shipmentId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly changedBy?: string;
  readonly reason?: string;
}

export interface ShipmentCourierAssignedPayload {
  readonly shipmentId: string;
  readonly courierId: string;
  readonly assignedAt: string;
}

export interface ShipmentWarehouseAssignedPayload {
  readonly shipmentId: string;
  readonly warehouseId: string;
  readonly assignedAt: string;
}

export interface ShipmentDeliveredPayload {
  readonly shipmentId: string;
  readonly orderId: string;
  readonly deliveredAt: string;
  readonly receivedBy?: string;
}

export interface ShipmentFailedPayload {
  readonly shipmentId: string;
  readonly failedAt: string;
  readonly reason: string;
}

export interface ShipmentCancelledPayload {
  readonly shipmentId: string;
  readonly cancelledAt: string;
  readonly reason?: string;
  readonly cancelledBy?: string;
}

export interface ShipmentReturnedPayload {
  readonly shipmentId: string;
  readonly orderId: string;
  readonly returnedAt: string;
  readonly reason: string;
}

export interface ShipmentDelayedPayload {
  readonly shipmentId: string;
  readonly previousEta?: string;
  readonly newEta?: string;
  readonly reason: string;
}

export interface ShipmentLabelGeneratedPayload {
  readonly shipmentId: string;
  readonly labelUrl: string;
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
    aggregateType: SHIPMENT_AGGREGATE_TYPE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class ShipmentCreatedEvent extends BaseDomainEvent<typeof SHIPMENT_EVENT_TYPE.CREATED, ShipmentCreatedPayload> {
  constructor(p: EventParams<ShipmentCreatedPayload>) { super(buildParams(SHIPMENT_EVENT_TYPE.CREATED, p)); }
}

export class ShipmentConfirmedEvent extends BaseDomainEvent<typeof SHIPMENT_EVENT_TYPE.CONFIRMED, ShipmentStatusChangedPayload> {
  constructor(p: EventParams<ShipmentStatusChangedPayload>) { super(buildParams(SHIPMENT_EVENT_TYPE.CONFIRMED, p)); }
}

export class ShipmentProcessingStartedEvent extends BaseDomainEvent<typeof SHIPMENT_EVENT_TYPE.PROCESSING_STARTED, ShipmentStatusChangedPayload> {
  constructor(p: EventParams<ShipmentStatusChangedPayload>) { super(buildParams(SHIPMENT_EVENT_TYPE.PROCESSING_STARTED, p)); }
}

export class ShipmentPackedEvent extends BaseDomainEvent<typeof SHIPMENT_EVENT_TYPE.PACKED, ShipmentStatusChangedPayload> {
  constructor(p: EventParams<ShipmentStatusChangedPayload>) { super(buildParams(SHIPMENT_EVENT_TYPE.PACKED, p)); }
}

export class ShipmentLabelGeneratedEvent extends BaseDomainEvent<typeof SHIPMENT_EVENT_TYPE.LABEL_GENERATED, ShipmentLabelGeneratedPayload> {
  constructor(p: EventParams<ShipmentLabelGeneratedPayload>) { super(buildParams(SHIPMENT_EVENT_TYPE.LABEL_GENERATED, p)); }
}

export class ShipmentPickedUpEvent extends BaseDomainEvent<typeof SHIPMENT_EVENT_TYPE.PICKED_UP, ShipmentStatusChangedPayload> {
  constructor(p: EventParams<ShipmentStatusChangedPayload>) { super(buildParams(SHIPMENT_EVENT_TYPE.PICKED_UP, p)); }
}

export class ShipmentInTransitEvent extends BaseDomainEvent<typeof SHIPMENT_EVENT_TYPE.IN_TRANSIT, ShipmentStatusChangedPayload> {
  constructor(p: EventParams<ShipmentStatusChangedPayload>) { super(buildParams(SHIPMENT_EVENT_TYPE.IN_TRANSIT, p)); }
}

export class ShipmentOutForDeliveryEvent extends BaseDomainEvent<typeof SHIPMENT_EVENT_TYPE.OUT_FOR_DELIVERY, ShipmentStatusChangedPayload> {
  constructor(p: EventParams<ShipmentStatusChangedPayload>) { super(buildParams(SHIPMENT_EVENT_TYPE.OUT_FOR_DELIVERY, p)); }
}

export class ShipmentDeliveredEvent extends BaseDomainEvent<typeof SHIPMENT_EVENT_TYPE.DELIVERED, ShipmentDeliveredPayload> {
  constructor(p: EventParams<ShipmentDeliveredPayload>) { super(buildParams(SHIPMENT_EVENT_TYPE.DELIVERED, p)); }
}

export class ShipmentFailedEvent extends BaseDomainEvent<typeof SHIPMENT_EVENT_TYPE.FAILED, ShipmentFailedPayload> {
  constructor(p: EventParams<ShipmentFailedPayload>) { super(buildParams(SHIPMENT_EVENT_TYPE.FAILED, p)); }
}

export class ShipmentReturnedEvent extends BaseDomainEvent<typeof SHIPMENT_EVENT_TYPE.RETURNED, ShipmentReturnedPayload> {
  constructor(p: EventParams<ShipmentReturnedPayload>) { super(buildParams(SHIPMENT_EVENT_TYPE.RETURNED, p)); }
}

export class ShipmentCancelledEvent extends BaseDomainEvent<typeof SHIPMENT_EVENT_TYPE.CANCELLED, ShipmentCancelledPayload> {
  constructor(p: EventParams<ShipmentCancelledPayload>) { super(buildParams(SHIPMENT_EVENT_TYPE.CANCELLED, p)); }
}

export class ShipmentPutOnHoldEvent extends BaseDomainEvent<typeof SHIPMENT_EVENT_TYPE.PUT_ON_HOLD, ShipmentStatusChangedPayload> {
  constructor(p: EventParams<ShipmentStatusChangedPayload>) { super(buildParams(SHIPMENT_EVENT_TYPE.PUT_ON_HOLD, p)); }
}

export class ShipmentReleasedEvent extends BaseDomainEvent<typeof SHIPMENT_EVENT_TYPE.RELEASED, ShipmentStatusChangedPayload> {
  constructor(p: EventParams<ShipmentStatusChangedPayload>) { super(buildParams(SHIPMENT_EVENT_TYPE.RELEASED, p)); }
}

export class ShipmentDelayedEvent extends BaseDomainEvent<typeof SHIPMENT_EVENT_TYPE.DELAYED, ShipmentDelayedPayload> {
  constructor(p: EventParams<ShipmentDelayedPayload>) { super(buildParams(SHIPMENT_EVENT_TYPE.DELAYED, p)); }
}

export class ShipmentCourierAssignedEvent extends BaseDomainEvent<typeof SHIPMENT_EVENT_TYPE.COURIER_ASSIGNED, ShipmentCourierAssignedPayload> {
  constructor(p: EventParams<ShipmentCourierAssignedPayload>) { super(buildParams(SHIPMENT_EVENT_TYPE.COURIER_ASSIGNED, p)); }
}

export class ShipmentWarehouseAssignedEvent extends BaseDomainEvent<typeof SHIPMENT_EVENT_TYPE.WAREHOUSE_ASSIGNED, ShipmentWarehouseAssignedPayload> {
  constructor(p: EventParams<ShipmentWarehouseAssignedPayload>) { super(buildParams(SHIPMENT_EVENT_TYPE.WAREHOUSE_ASSIGNED, p)); }
}

export class ShipmentStatusChangedEvent extends BaseDomainEvent<typeof SHIPMENT_EVENT_TYPE.STATUS_CHANGED, ShipmentStatusChangedPayload> {
  constructor(p: EventParams<ShipmentStatusChangedPayload>) { super(buildParams(SHIPMENT_EVENT_TYPE.STATUS_CHANGED, p)); }
}
