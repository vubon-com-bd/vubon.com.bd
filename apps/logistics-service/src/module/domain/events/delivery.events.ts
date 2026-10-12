/**
 * Delivery domain events
 * @module logistics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { DELIVERY_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const DELIVERY_EVENT_TYPE = {
  SCHEDULED: 'delivery.scheduled',
  DRIVER_ASSIGNED: 'delivery.driver_assigned',
  PICKED_UP: 'delivery.picked_up',
  IN_TRANSIT: 'delivery.in_transit',
  OUT_FOR_DELIVERY: 'delivery.out_for_delivery',
  ARRIVED: 'delivery.arrived',
  ATTEMPT_ADDED: 'delivery.attempt_added',
  DELIVERED: 'delivery.delivered',
  FAILED: 'delivery.failed',
  RESCHEDULED: 'delivery.rescheduled',
  REFUSED: 'delivery.refused',
  CANCELLED: 'delivery.cancelled',
  PROOF_CAPTURED: 'delivery.proof_captured',
} as const;

export interface DeliveryScheduledPayload {
  readonly deliveryId: string;
  readonly shipmentId: string;
  readonly orderId: string;
  readonly type: string;
  readonly scheduledAt?: string;
}

export interface DeliveryStatusChangedPayload {
  readonly deliveryId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly changedBy?: string;
  readonly reason?: string;
}

export interface DeliveryDriverAssignedPayload {
  readonly deliveryId: string;
  readonly driverId: string;
  readonly vehicleId?: string;
  readonly routeId?: string;
  readonly assignedAt: string;
}

export interface DeliveryAttemptAddedPayload {
  readonly deliveryId: string;
  readonly attemptId: string;
  readonly attemptNumber: number;
  readonly status: string;
  readonly reason?: string;
  readonly attemptedAt: string;
}

export interface DeliveryDeliveredPayload {
  readonly deliveryId: string;
  readonly shipmentId: string;
  readonly orderId: string;
  readonly deliveredAt: string;
  readonly recipientName?: string;
  readonly proofType?: string;
}

export interface DeliveryFailedPayload {
  readonly deliveryId: string;
  readonly failedAt: string;
  readonly reason: string;
  readonly attempts: number;
}

export interface DeliveryProofCapturedPayload {
  readonly deliveryId: string;
  readonly proofType: string;
  readonly capturedAt: string;
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
    aggregateType: DELIVERY_AGGREGATE_TYPE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class DeliveryScheduledEvent extends BaseDomainEvent<typeof DELIVERY_EVENT_TYPE.SCHEDULED, DeliveryScheduledPayload> {
  constructor(p: EventParams<DeliveryScheduledPayload>) { super(buildParams(DELIVERY_EVENT_TYPE.SCHEDULED, p)); }
}
export class DeliveryDriverAssignedEvent extends BaseDomainEvent<typeof DELIVERY_EVENT_TYPE.DRIVER_ASSIGNED, DeliveryDriverAssignedPayload> {
  constructor(p: EventParams<DeliveryDriverAssignedPayload>) { super(buildParams(DELIVERY_EVENT_TYPE.DRIVER_ASSIGNED, p)); }
}
export class DeliveryPickedUpEvent extends BaseDomainEvent<typeof DELIVERY_EVENT_TYPE.PICKED_UP, DeliveryStatusChangedPayload> {
  constructor(p: EventParams<DeliveryStatusChangedPayload>) { super(buildParams(DELIVERY_EVENT_TYPE.PICKED_UP, p)); }
}
export class DeliveryInTransitEvent extends BaseDomainEvent<typeof DELIVERY_EVENT_TYPE.IN_TRANSIT, DeliveryStatusChangedPayload> {
  constructor(p: EventParams<DeliveryStatusChangedPayload>) { super(buildParams(DELIVERY_EVENT_TYPE.IN_TRANSIT, p)); }
}
export class DeliveryOutForDeliveryEvent extends BaseDomainEvent<typeof DELIVERY_EVENT_TYPE.OUT_FOR_DELIVERY, DeliveryStatusChangedPayload> {
  constructor(p: EventParams<DeliveryStatusChangedPayload>) { super(buildParams(DELIVERY_EVENT_TYPE.OUT_FOR_DELIVERY, p)); }
}
export class DeliveryArrivedEvent extends BaseDomainEvent<typeof DELIVERY_EVENT_TYPE.ARRIVED, DeliveryStatusChangedPayload> {
  constructor(p: EventParams<DeliveryStatusChangedPayload>) { super(buildParams(DELIVERY_EVENT_TYPE.ARRIVED, p)); }
}
export class DeliveryAttemptAddedEvent extends BaseDomainEvent<typeof DELIVERY_EVENT_TYPE.ATTEMPT_ADDED, DeliveryAttemptAddedPayload> {
  constructor(p: EventParams<DeliveryAttemptAddedPayload>) { super(buildParams(DELIVERY_EVENT_TYPE.ATTEMPT_ADDED, p)); }
}
export class DeliveryDeliveredEvent extends BaseDomainEvent<typeof DELIVERY_EVENT_TYPE.DELIVERED, DeliveryDeliveredPayload> {
  constructor(p: EventParams<DeliveryDeliveredPayload>) { super(buildParams(DELIVERY_EVENT_TYPE.DELIVERED, p)); }
}
export class DeliveryFailedEvent extends BaseDomainEvent<typeof DELIVERY_EVENT_TYPE.FAILED, DeliveryFailedPayload> {
  constructor(p: EventParams<DeliveryFailedPayload>) { super(buildParams(DELIVERY_EVENT_TYPE.FAILED, p)); }
}
export class DeliveryRescheduledEvent extends BaseDomainEvent<typeof DELIVERY_EVENT_TYPE.RESCHEDULED, DeliveryStatusChangedPayload> {
  constructor(p: EventParams<DeliveryStatusChangedPayload>) { super(buildParams(DELIVERY_EVENT_TYPE.RESCHEDULED, p)); }
}
export class DeliveryRefusedEvent extends BaseDomainEvent<typeof DELIVERY_EVENT_TYPE.REFUSED, DeliveryStatusChangedPayload> {
  constructor(p: EventParams<DeliveryStatusChangedPayload>) { super(buildParams(DELIVERY_EVENT_TYPE.REFUSED, p)); }
}
export class DeliveryCancelledEvent extends BaseDomainEvent<typeof DELIVERY_EVENT_TYPE.CANCELLED, DeliveryStatusChangedPayload> {
  constructor(p: EventParams<DeliveryStatusChangedPayload>) { super(buildParams(DELIVERY_EVENT_TYPE.CANCELLED, p)); }
}
export class DeliveryProofCapturedEvent extends BaseDomainEvent<typeof DELIVERY_EVENT_TYPE.PROOF_CAPTURED, DeliveryProofCapturedPayload> {
  constructor(p: EventParams<DeliveryProofCapturedPayload>) { super(buildParams(DELIVERY_EVENT_TYPE.PROOF_CAPTURED, p)); }
}
