/**
 * ReturnShipment Domain Events
 * @module logistics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';

import { LOGISTICS_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const RETURN_SHIPMENT_EVENT_TYPE = {
  REQUESTED: 'logistics.return_shipment.requested',
  APPROVED: 'logistics.return_shipment.approved',
  REJECTED: 'logistics.return_shipment.rejected',
  PICKUP_SCHEDULED: 'logistics.return_shipment.pickup_scheduled',
  PICKED_UP: 'logistics.return_shipment.picked_up',
  IN_TRANSIT: 'logistics.return_shipment.in_transit',
  RECEIVED: 'logistics.return_shipment.received',
  INSPECTED: 'logistics.return_shipment.inspected',
  COMPLETED: 'logistics.return_shipment.completed',
  CANCELLED: 'logistics.return_shipment.cancelled',
  LOST: 'logistics.return_shipment.lost',
  STATUS_CHANGED: 'logistics.return_shipment.status_changed',
} as const;

export interface ReturnShipmentRequestedPayload {
  readonly returnId: string;
  readonly rmaNumber: string;
  readonly orderId: string;
  readonly type: string;
  readonly reason: string;
  readonly itemCount: number;
  readonly requestedAt: string;
}
export interface ReturnShipmentApprovedPayload {
  readonly returnId: string;
  readonly approvedAt: string;
  readonly approvedBy: string;
}
export interface ReturnShipmentRejectedPayload {
  readonly returnId: string;
  readonly reason: string;
  readonly rejectedAt: string;
}
export interface ReturnShipmentPickupScheduledPayload {
  readonly returnId: string;
  readonly pickupScheduledAt: string;
}
export interface ReturnShipmentPickedUpPayload {
  readonly returnId: string;
  readonly pickedUpAt: string;
}
export interface ReturnShipmentInTransitPayload {
  readonly returnId: string;
  readonly inTransitAt: string;
}
export interface ReturnShipmentReceivedPayload {
  readonly returnId: string;
  readonly receivedAt: string;
  readonly receivedBy?: string;
}
export interface ReturnShipmentInspectedPayload {
  readonly returnId: string;
  readonly inspectedAt: string;
  readonly restockable: boolean;
  readonly inspectedBy?: string;
}
export interface ReturnShipmentCompletedPayload {
  readonly returnId: string;
  readonly completedAt: string;
  readonly refundAmount: number;
  readonly refundCurrency: string;
}
export interface ReturnShipmentCancelledPayload {
  readonly returnId: string;
  readonly reason?: string;
  readonly cancelledAt: string;
}
export interface ReturnShipmentLostPayload {
  readonly returnId: string;
  readonly lostAt: string;
}
export interface ReturnShipmentStatusChangedPayload {
  readonly returnId: string;
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
    aggregateType: LOGISTICS_AGGREGATE_TYPE.RETURN_SHIPMENT,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class ReturnShipmentRequestedEvent extends BaseDomainEvent<
  typeof RETURN_SHIPMENT_EVENT_TYPE.REQUESTED,
  ReturnShipmentRequestedPayload
> {
  constructor(p: EventParams<ReturnShipmentRequestedPayload>) {
    super(buildParams(RETURN_SHIPMENT_EVENT_TYPE.REQUESTED, p));
  }
}
export class ReturnShipmentApprovedEvent extends BaseDomainEvent<
  typeof RETURN_SHIPMENT_EVENT_TYPE.APPROVED,
  ReturnShipmentApprovedPayload
> {
  constructor(p: EventParams<ReturnShipmentApprovedPayload>) {
    super(buildParams(RETURN_SHIPMENT_EVENT_TYPE.APPROVED, p));
  }
}
export class ReturnShipmentRejectedEvent extends BaseDomainEvent<
  typeof RETURN_SHIPMENT_EVENT_TYPE.REJECTED,
  ReturnShipmentRejectedPayload
> {
  constructor(p: EventParams<ReturnShipmentRejectedPayload>) {
    super(buildParams(RETURN_SHIPMENT_EVENT_TYPE.REJECTED, p));
  }
}
export class ReturnShipmentPickupScheduledEvent extends BaseDomainEvent<
  typeof RETURN_SHIPMENT_EVENT_TYPE.PICKUP_SCHEDULED,
  ReturnShipmentPickupScheduledPayload
> {
  constructor(p: EventParams<ReturnShipmentPickupScheduledPayload>) {
    super(buildParams(RETURN_SHIPMENT_EVENT_TYPE.PICKUP_SCHEDULED, p));
  }
}
export class ReturnShipmentPickedUpEvent extends BaseDomainEvent<
  typeof RETURN_SHIPMENT_EVENT_TYPE.PICKED_UP,
  ReturnShipmentPickedUpPayload
> {
  constructor(p: EventParams<ReturnShipmentPickedUpPayload>) {
    super(buildParams(RETURN_SHIPMENT_EVENT_TYPE.PICKED_UP, p));
  }
}
export class ReturnShipmentInTransitEvent extends BaseDomainEvent<
  typeof RETURN_SHIPMENT_EVENT_TYPE.IN_TRANSIT,
  ReturnShipmentInTransitPayload
> {
  constructor(p: EventParams<ReturnShipmentInTransitPayload>) {
    super(buildParams(RETURN_SHIPMENT_EVENT_TYPE.IN_TRANSIT, p));
  }
}
export class ReturnShipmentReceivedEvent extends BaseDomainEvent<
  typeof RETURN_SHIPMENT_EVENT_TYPE.RECEIVED,
  ReturnShipmentReceivedPayload
> {
  constructor(p: EventParams<ReturnShipmentReceivedPayload>) {
    super(buildParams(RETURN_SHIPMENT_EVENT_TYPE.RECEIVED, p));
  }
}
export class ReturnShipmentInspectedEvent extends BaseDomainEvent<
  typeof RETURN_SHIPMENT_EVENT_TYPE.INSPECTED,
  ReturnShipmentInspectedPayload
> {
  constructor(p: EventParams<ReturnShipmentInspectedPayload>) {
    super(buildParams(RETURN_SHIPMENT_EVENT_TYPE.INSPECTED, p));
  }
}
export class ReturnShipmentCompletedEvent extends BaseDomainEvent<
  typeof RETURN_SHIPMENT_EVENT_TYPE.COMPLETED,
  ReturnShipmentCompletedPayload
> {
  constructor(p: EventParams<ReturnShipmentCompletedPayload>) {
    super(buildParams(RETURN_SHIPMENT_EVENT_TYPE.COMPLETED, p));
  }
}
export class ReturnShipmentCancelledEvent extends BaseDomainEvent<
  typeof RETURN_SHIPMENT_EVENT_TYPE.CANCELLED,
  ReturnShipmentCancelledPayload
> {
  constructor(p: EventParams<ReturnShipmentCancelledPayload>) {
    super(buildParams(RETURN_SHIPMENT_EVENT_TYPE.CANCELLED, p));
  }
}
export class ReturnShipmentLostEvent extends BaseDomainEvent<
  typeof RETURN_SHIPMENT_EVENT_TYPE.LOST,
  ReturnShipmentLostPayload
> {
  constructor(p: EventParams<ReturnShipmentLostPayload>) {
    super(buildParams(RETURN_SHIPMENT_EVENT_TYPE.LOST, p));
  }
}
export class ReturnShipmentStatusChangedEvent extends BaseDomainEvent<
  typeof RETURN_SHIPMENT_EVENT_TYPE.STATUS_CHANGED,
  ReturnShipmentStatusChangedPayload
> {
  constructor(p: EventParams<ReturnShipmentStatusChangedPayload>) {
    super(buildParams(RETURN_SHIPMENT_EVENT_TYPE.STATUS_CHANGED, p));
  }
}
