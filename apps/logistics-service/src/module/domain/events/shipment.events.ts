import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE = 'Shipment';

export class ShipmentCreatedEvent extends BaseDomainEvent<
  'logistics.shipment.created',
  { shipmentId: string; orderId: string; userId: string }
> {
  constructor(
    aggregateId: string,
    shipmentId: string,
    orderId: string,
    userId: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'logistics.shipment.created',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { shipmentId, orderId, userId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class ShipmentPickedUpEvent extends BaseDomainEvent<
  'logistics.shipment.picked_up',
  { shipmentId: string; courierId: string }
> {
  constructor(
    aggregateId: string,
    shipmentId: string,
    courierId: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'logistics.shipment.picked_up',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { shipmentId, courierId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class ShipmentDeliveredEvent extends BaseDomainEvent<
  'logistics.shipment.delivered',
  { shipmentId: string; orderId: string; deliveredAt: string }
> {
  constructor(
    aggregateId: string,
    shipmentId: string,
    orderId: string,
    deliveredAt: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'logistics.shipment.delivered',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { shipmentId, orderId, deliveredAt },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class ShipmentCancelledEvent extends BaseDomainEvent<
  'logistics.shipment.cancelled',
  { shipmentId: string; reason: string }
> {
  constructor(
    aggregateId: string,
    shipmentId: string,
    reason: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'logistics.shipment.cancelled',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { shipmentId, reason },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
