/**
 * Shipment Domain Events
 * @module logistics-service/domain/events
 *
 * DRY builder pattern (Payment-style, Pattern 1 Template 6)
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';

import { LOGISTICS_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

// ═══════════════════════════════════════
// ─── Event Type Constants ──────────────
// ═══════════════════════════════════════
export const SHIPMENT_EVENT_TYPE = {
  CREATED: 'logistics.shipment.created',
  CONFIRMED: 'logistics.shipment.confirmed',
  PROCESSING_STARTED: 'logistics.shipment.processing_started',
  PACKED: 'logistics.shipment.packed',
  PICKED_UP: 'logistics.shipment.picked_up',
  IN_TRANSIT: 'logistics.shipment.in_transit',
  OUT_FOR_DELIVERY: 'logistics.shipment.out_for_delivery',
  DELIVERED: 'logistics.shipment.delivered',
  FAILED: 'logistics.shipment.failed',
  RETURNED: 'logistics.shipment.returned',
  CANCELLED: 'logistics.shipment.cancelled',
  ON_HOLD: 'logistics.shipment.on_hold',
  DELAYED: 'logistics.shipment.delayed',
  STATUS_CHANGED: 'logistics.shipment.status_changed',
} as const;

// ═══════════════════════════════════════
// ─── Payload Interfaces ────────────────
// ═══════════════════════════════════════
export interface ShipmentCreatedPayload {
  readonly shipmentId: string;
  readonly shipmentNumber: string;
  readonly trackingNumber: string;
  readonly orderId?: string;
  readonly type: string;
  readonly priority: string;
  readonly itemCount: number;
  readonly createdAt: string;
}

export interface ShipmentConfirmedPayload {
  readonly shipmentId: string;
  readonly shipmentNumber: string;
  readonly confirmedAt: string;
}

export interface ShipmentProcessingStartedPayload {
  readonly shipmentId: string;
  readonly warehouseId?: string;
  readonly startedAt: string;
}

export interface ShipmentPackedPayload {
  readonly shipmentId: string;
  readonly packedAt: string;
  readonly packageId?: string;
}

export interface ShipmentPickedUpPayload {
  readonly shipmentId: string;
  readonly pickedUpAt: string;
  readonly courierId?: string;
  readonly driverId?: string;
}

export interface ShipmentInTransitPayload {
  readonly shipmentId: string;
  readonly inTransitAt: string;
  readonly currentLocation?: string;
}

export interface ShipmentOutForDeliveryPayload {
  readonly shipmentId: string;
  readonly outForDeliveryAt: string;
  readonly driverId?: string;
}

export interface ShipmentDeliveredPayload {
  readonly shipmentId: string;
  readonly deliveredAt: string;
  readonly recipientName?: string;
  readonly signedBy?: string;
  readonly driverId?: string;
}

export interface ShipmentFailedPayload {
  readonly shipmentId: string;
  readonly failedAt: string;
  readonly reason: string;
  readonly attemptedCount: number;
}

export interface ShipmentReturnedPayload {
  readonly shipmentId: string;
  readonly returnedAt: string;
  readonly returnReason?: string;
}

export interface ShipmentCancelledPayload {
  readonly shipmentId: string;
  readonly cancelledAt: string;
  readonly reason?: string;
  readonly cancelledBy?: string;
}

export interface ShipmentOnHoldPayload {
  readonly shipmentId: string;
  readonly onHoldAt: string;
  readonly reason: string;
}

export interface ShipmentDelayedPayload {
  readonly shipmentId: string;
  readonly delayedAt: string;
  readonly reason: string;
  readonly newEstimatedDeliveryAt?: string;
}

export interface ShipmentStatusChangedPayload {
  readonly shipmentId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly changedBy?: string;
  readonly reason?: string;
}

// ═══════════════════════════════════════
// ─── Generic Event Params ──────────────
// ═══════════════════════════════════════
type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

// ═══════════════════════════════════════
// ─── DRY builder ───────────────────────
// ═══════════════════════════════════════
function buildParams<TType extends string, TPayload>(
  type: TType,
  p: EventParams<TPayload>,
) {
  return {
    id: p.id ?? newEventId(),
    type,
    aggregateId: p.aggregateId,
    aggregateType: LOGISTICS_AGGREGATE_TYPE.SHIPMENT,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

// ═══════════════════════════════════════
// ─── Concrete Events ───────────────────
// ═══════════════════════════════════════
export class ShipmentCreatedEvent extends BaseDomainEvent<
  typeof SHIPMENT_EVENT_TYPE.CREATED,
  ShipmentCreatedPayload
> {
  constructor(p: EventParams<ShipmentCreatedPayload>) {
    super(buildParams(SHIPMENT_EVENT_TYPE.CREATED, p));
  }
}

export class ShipmentConfirmedEvent extends BaseDomainEvent<
  typeof SHIPMENT_EVENT_TYPE.CONFIRMED,
  ShipmentConfirmedPayload
> {
  constructor(p: EventParams<ShipmentConfirmedPayload>) {
    super(buildParams(SHIPMENT_EVENT_TYPE.CONFIRMED, p));
  }
}

export class ShipmentProcessingStartedEvent extends BaseDomainEvent<
  typeof SHIPMENT_EVENT_TYPE.PROCESSING_STARTED,
  ShipmentProcessingStartedPayload
> {
  constructor(p: EventParams<ShipmentProcessingStartedPayload>) {
    super(buildParams(SHIPMENT_EVENT_TYPE.PROCESSING_STARTED, p));
  }
}

export class ShipmentPackedEvent extends BaseDomainEvent<
  typeof SHIPMENT_EVENT_TYPE.PACKED,
  ShipmentPackedPayload
> {
  constructor(p: EventParams<ShipmentPackedPayload>) {
    super(buildParams(SHIPMENT_EVENT_TYPE.PACKED, p));
  }
}

export class ShipmentPickedUpEvent extends BaseDomainEvent<
  typeof SHIPMENT_EVENT_TYPE.PICKED_UP,
  ShipmentPickedUpPayload
> {
  constructor(p: EventParams<ShipmentPickedUpPayload>) {
    super(buildParams(SHIPMENT_EVENT_TYPE.PICKED_UP, p));
  }
}

export class ShipmentInTransitEvent extends BaseDomainEvent<
  typeof SHIPMENT_EVENT_TYPE.IN_TRANSIT,
  ShipmentInTransitPayload
> {
  constructor(p: EventParams<ShipmentInTransitPayload>) {
    super(buildParams(SHIPMENT_EVENT_TYPE.IN_TRANSIT, p));
  }
}

export class ShipmentOutForDeliveryEvent extends BaseDomainEvent<
  typeof SHIPMENT_EVENT_TYPE.OUT_FOR_DELIVERY,
  ShipmentOutForDeliveryPayload
> {
  constructor(p: EventParams<ShipmentOutForDeliveryPayload>) {
    super(buildParams(SHIPMENT_EVENT_TYPE.OUT_FOR_DELIVERY, p));
  }
}

export class ShipmentDeliveredEvent extends BaseDomainEvent<
  typeof SHIPMENT_EVENT_TYPE.DELIVERED,
  ShipmentDeliveredPayload
> {
  constructor(p: EventParams<ShipmentDeliveredPayload>) {
    super(buildParams(SHIPMENT_EVENT_TYPE.DELIVERED, p));
  }
}

export class ShipmentFailedEvent extends BaseDomainEvent<
  typeof SHIPMENT_EVENT_TYPE.FAILED,
  ShipmentFailedPayload
> {
  constructor(p: EventParams<ShipmentFailedPayload>) {
    super(buildParams(SHIPMENT_EVENT_TYPE.FAILED, p));
  }
}

export class ShipmentReturnedEvent extends BaseDomainEvent<
  typeof SHIPMENT_EVENT_TYPE.RETURNED,
  ShipmentReturnedPayload
> {
  constructor(p: EventParams<ShipmentReturnedPayload>) {
    super(buildParams(SHIPMENT_EVENT_TYPE.RETURNED, p));
  }
}

export class ShipmentCancelledEvent extends BaseDomainEvent<
  typeof SHIPMENT_EVENT_TYPE.CANCELLED,
  ShipmentCancelledPayload
> {
  constructor(p: EventParams<ShipmentCancelledPayload>) {
    super(buildParams(SHIPMENT_EVENT_TYPE.CANCELLED, p));
  }
}

export class ShipmentOnHoldEvent extends BaseDomainEvent<
  typeof SHIPMENT_EVENT_TYPE.ON_HOLD,
  ShipmentOnHoldPayload
> {
  constructor(p: EventParams<ShipmentOnHoldPayload>) {
    super(buildParams(SHIPMENT_EVENT_TYPE.ON_HOLD, p));
  }
}

export class ShipmentDelayedEvent extends BaseDomainEvent<
  typeof SHIPMENT_EVENT_TYPE.DELAYED,
  ShipmentDelayedPayload
> {
  constructor(p: EventParams<ShipmentDelayedPayload>) {
    super(buildParams(SHIPMENT_EVENT_TYPE.DELAYED, p));
  }
}

export class ShipmentStatusChangedEvent extends BaseDomainEvent<
  typeof SHIPMENT_EVENT_TYPE.STATUS_CHANGED,
  ShipmentStatusChangedPayload
> {
  constructor(p: EventParams<ShipmentStatusChangedPayload>) {
    super(buildParams(SHIPMENT_EVENT_TYPE.STATUS_CHANGED, p));
  }
}
