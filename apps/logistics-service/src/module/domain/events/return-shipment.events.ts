/**
 * ReturnShipment domain events
 * @module logistics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { RETURN_SHIPMENT_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const RETURN_SHIPMENT_EVENT_TYPE = {
  REQUESTED: 'return_shipment.requested',
  APPROVED: 'return_shipment.approved',
  REJECTED: 'return_shipment.rejected',
  PICKUP_SCHEDULED: 'return_shipment.pickup_scheduled',
  PICKED_UP: 'return_shipment.picked_up',
  IN_TRANSIT: 'return_shipment.in_transit',
  RECEIVED: 'return_shipment.received',
  INSPECTED: 'return_shipment.inspected',
  COMPLETED: 'return_shipment.completed',
  CANCELLED: 'return_shipment.cancelled',
  LOST: 'return_shipment.lost',
  REFUND_ISSUED: 'return_shipment.refund_issued',
} as const;

export interface ReturnShipmentRequestedPayload {
  readonly returnId: string;
  readonly rmaNumber: string;
  readonly orderId: string;
  readonly userId: string;
  readonly type: string;
  readonly reason: string;
  readonly itemCount: number;
}

export interface ReturnShipmentStatusChangedPayload {
  readonly returnId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly reason?: string;
}

export interface ReturnShipmentRefundIssuedPayload {
  readonly returnId: string;
  readonly refundAmount: number;
  readonly currency: string;
  readonly issuedAt: string;
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
    aggregateType: RETURN_SHIPMENT_AGGREGATE_TYPE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class ReturnShipmentRequestedEvent extends BaseDomainEvent<typeof RETURN_SHIPMENT_EVENT_TYPE.REQUESTED, ReturnShipmentRequestedPayload> {
  constructor(p: EventParams<ReturnShipmentRequestedPayload>) { super(buildParams(RETURN_SHIPMENT_EVENT_TYPE.REQUESTED, p)); }
}
export class ReturnShipmentApprovedEvent extends BaseDomainEvent<typeof RETURN_SHIPMENT_EVENT_TYPE.APPROVED, ReturnShipmentStatusChangedPayload> {
  constructor(p: EventParams<ReturnShipmentStatusChangedPayload>) { super(buildParams(RETURN_SHIPMENT_EVENT_TYPE.APPROVED, p)); }
}
export class ReturnShipmentRejectedEvent extends BaseDomainEvent<typeof RETURN_SHIPMENT_EVENT_TYPE.REJECTED, ReturnShipmentStatusChangedPayload> {
  constructor(p: EventParams<ReturnShipmentStatusChangedPayload>) { super(buildParams(RETURN_SHIPMENT_EVENT_TYPE.REJECTED, p)); }
}
export class ReturnShipmentPickupScheduledEvent extends BaseDomainEvent<typeof RETURN_SHIPMENT_EVENT_TYPE.PICKUP_SCHEDULED, ReturnShipmentStatusChangedPayload> {
  constructor(p: EventParams<ReturnShipmentStatusChangedPayload>) { super(buildParams(RETURN_SHIPMENT_EVENT_TYPE.PICKUP_SCHEDULED, p)); }
}
export class ReturnShipmentPickedUpEvent extends BaseDomainEvent<typeof RETURN_SHIPMENT_EVENT_TYPE.PICKED_UP, ReturnShipmentStatusChangedPayload> {
  constructor(p: EventParams<ReturnShipmentStatusChangedPayload>) { super(buildParams(RETURN_SHIPMENT_EVENT_TYPE.PICKED_UP, p)); }
}
export class ReturnShipmentInTransitEvent extends BaseDomainEvent<typeof RETURN_SHIPMENT_EVENT_TYPE.IN_TRANSIT, ReturnShipmentStatusChangedPayload> {
  constructor(p: EventParams<ReturnShipmentStatusChangedPayload>) { super(buildParams(RETURN_SHIPMENT_EVENT_TYPE.IN_TRANSIT, p)); }
}
export class ReturnShipmentReceivedEvent extends BaseDomainEvent<typeof RETURN_SHIPMENT_EVENT_TYPE.RECEIVED, ReturnShipmentStatusChangedPayload> {
  constructor(p: EventParams<ReturnShipmentStatusChangedPayload>) { super(buildParams(RETURN_SHIPMENT_EVENT_TYPE.RECEIVED, p)); }
}
export class ReturnShipmentInspectedEvent extends BaseDomainEvent<typeof RETURN_SHIPMENT_EVENT_TYPE.INSPECTED, ReturnShipmentStatusChangedPayload> {
  constructor(p: EventParams<ReturnShipmentStatusChangedPayload>) { super(buildParams(RETURN_SHIPMENT_EVENT_TYPE.INSPECTED, p)); }
}
export class ReturnShipmentCompletedEvent extends BaseDomainEvent<typeof RETURN_SHIPMENT_EVENT_TYPE.COMPLETED, ReturnShipmentStatusChangedPayload> {
  constructor(p: EventParams<ReturnShipmentStatusChangedPayload>) { super(buildParams(RETURN_SHIPMENT_EVENT_TYPE.COMPLETED, p)); }
}
export class ReturnShipmentCancelledEvent extends BaseDomainEvent<typeof RETURN_SHIPMENT_EVENT_TYPE.CANCELLED, ReturnShipmentStatusChangedPayload> {
  constructor(p: EventParams<ReturnShipmentStatusChangedPayload>) { super(buildParams(RETURN_SHIPMENT_EVENT_TYPE.CANCELLED, p)); }
}
export class ReturnShipmentLostEvent extends BaseDomainEvent<typeof RETURN_SHIPMENT_EVENT_TYPE.LOST, ReturnShipmentStatusChangedPayload> {
  constructor(p: EventParams<ReturnShipmentStatusChangedPayload>) { super(buildParams(RETURN_SHIPMENT_EVENT_TYPE.LOST, p)); }
}
export class ReturnShipmentRefundIssuedEvent extends BaseDomainEvent<typeof RETURN_SHIPMENT_EVENT_TYPE.REFUND_ISSUED, ReturnShipmentRefundIssuedPayload> {
  constructor(p: EventParams<ReturnShipmentRefundIssuedPayload>) { super(buildParams(RETURN_SHIPMENT_EVENT_TYPE.REFUND_ISSUED, p)); }
}
