/**
 * ShipmentItem Domain Events
 * @module logistics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';

import { LOGISTICS_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

// ═══════════════════════════════════════
// ─── Event Type Constants ──────────────
// ═══════════════════════════════════════
export const SHIPMENT_ITEM_EVENT_TYPE = {
  ADDED: 'logistics.shipment_item.added',
  REMOVED: 'logistics.shipment_item.removed',
  QUANTITY_CHANGED: 'logistics.shipment_item.quantity_changed',
  PACKED: 'logistics.shipment_item.packed',
  SHIPPED: 'logistics.shipment_item.shipped',
  DELIVERED: 'logistics.shipment_item.delivered',
  RETURNED: 'logistics.shipment_item.returned',
  CANCELLED: 'logistics.shipment_item.cancelled',
  STATUS_CHANGED: 'logistics.shipment_item.status_changed',
} as const;

// ═══════════════════════════════════════
// ─── Payload Interfaces ────────────────
// ═══════════════════════════════════════
export interface ShipmentItemAddedPayload {
  readonly itemId: string;
  readonly shipmentId: string;
  readonly sku: string;
  readonly name: string;
  readonly quantity: number;
  readonly unitPrice: number;
  readonly currency: string;
  readonly addedAt: string;
}

export interface ShipmentItemRemovedPayload {
  readonly itemId: string;
  readonly shipmentId: string;
  readonly sku: string;
  readonly removedAt: string;
  readonly reason?: string;
}

export interface ShipmentItemQuantityChangedPayload {
  readonly itemId: string;
  readonly shipmentId: string;
  readonly sku: string;
  readonly previousQuantity: number;
  readonly newQuantity: number;
  readonly changedAt: string;
}

export interface ShipmentItemPackedPayload {
  readonly itemId: string;
  readonly shipmentId: string;
  readonly packedAt: string;
}

export interface ShipmentItemShippedPayload {
  readonly itemId: string;
  readonly shipmentId: string;
  readonly shippedAt: string;
}

export interface ShipmentItemDeliveredPayload {
  readonly itemId: string;
  readonly shipmentId: string;
  readonly deliveredAt: string;
}

export interface ShipmentItemReturnedPayload {
  readonly itemId: string;
  readonly shipmentId: string;
  readonly returnedAt: string;
  readonly reason?: string;
}

export interface ShipmentItemCancelledPayload {
  readonly itemId: string;
  readonly shipmentId: string;
  readonly cancelledAt: string;
  readonly reason?: string;
}

export interface ShipmentItemStatusChangedPayload {
  readonly itemId: string;
  readonly shipmentId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
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
    aggregateType: LOGISTICS_AGGREGATE_TYPE.SHIPMENT_ITEM,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

// ═══════════════════════════════════════
// ─── Concrete Events ───────────────────
// ═══════════════════════════════════════
export class ShipmentItemAddedEvent extends BaseDomainEvent<
  typeof SHIPMENT_ITEM_EVENT_TYPE.ADDED,
  ShipmentItemAddedPayload
> {
  constructor(p: EventParams<ShipmentItemAddedPayload>) {
    super(buildParams(SHIPMENT_ITEM_EVENT_TYPE.ADDED, p));
  }
}

export class ShipmentItemRemovedEvent extends BaseDomainEvent<
  typeof SHIPMENT_ITEM_EVENT_TYPE.REMOVED,
  ShipmentItemRemovedPayload
> {
  constructor(p: EventParams<ShipmentItemRemovedPayload>) {
    super(buildParams(SHIPMENT_ITEM_EVENT_TYPE.REMOVED, p));
  }
}

export class ShipmentItemQuantityChangedEvent extends BaseDomainEvent<
  typeof SHIPMENT_ITEM_EVENT_TYPE.QUANTITY_CHANGED,
  ShipmentItemQuantityChangedPayload
> {
  constructor(p: EventParams<ShipmentItemQuantityChangedPayload>) {
    super(buildParams(SHIPMENT_ITEM_EVENT_TYPE.QUANTITY_CHANGED, p));
  }
}

export class ShipmentItemPackedEvent extends BaseDomainEvent<
  typeof SHIPMENT_ITEM_EVENT_TYPE.PACKED,
  ShipmentItemPackedPayload
> {
  constructor(p: EventParams<ShipmentItemPackedPayload>) {
    super(buildParams(SHIPMENT_ITEM_EVENT_TYPE.PACKED, p));
  }
}

export class ShipmentItemShippedEvent extends BaseDomainEvent<
  typeof SHIPMENT_ITEM_EVENT_TYPE.SHIPPED,
  ShipmentItemShippedPayload
> {
  constructor(p: EventParams<ShipmentItemShippedPayload>) {
    super(buildParams(SHIPMENT_ITEM_EVENT_TYPE.SHIPPED, p));
  }
}

export class ShipmentItemDeliveredEvent extends BaseDomainEvent<
  typeof SHIPMENT_ITEM_EVENT_TYPE.DELIVERED,
  ShipmentItemDeliveredPayload
> {
  constructor(p: EventParams<ShipmentItemDeliveredPayload>) {
    super(buildParams(SHIPMENT_ITEM_EVENT_TYPE.DELIVERED, p));
  }
}

export class ShipmentItemReturnedEvent extends BaseDomainEvent<
  typeof SHIPMENT_ITEM_EVENT_TYPE.RETURNED,
  ShipmentItemReturnedPayload
> {
  constructor(p: EventParams<ShipmentItemReturnedPayload>) {
    super(buildParams(SHIPMENT_ITEM_EVENT_TYPE.RETURNED, p));
  }
}

export class ShipmentItemCancelledEvent extends BaseDomainEvent<
  typeof SHIPMENT_ITEM_EVENT_TYPE.CANCELLED,
  ShipmentItemCancelledPayload
> {
  constructor(p: EventParams<ShipmentItemCancelledPayload>) {
    super(buildParams(SHIPMENT_ITEM_EVENT_TYPE.CANCELLED, p));
  }
}

export class ShipmentItemStatusChangedEvent extends BaseDomainEvent<
  typeof SHIPMENT_ITEM_EVENT_TYPE.STATUS_CHANGED,
  ShipmentItemStatusChangedPayload
> {
  constructor(p: EventParams<ShipmentItemStatusChangedPayload>) {
    super(buildParams(SHIPMENT_ITEM_EVENT_TYPE.STATUS_CHANGED, p));
  }
}
