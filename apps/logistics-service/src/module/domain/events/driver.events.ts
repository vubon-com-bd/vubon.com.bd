/**
 * Driver domain events
 * @module logistics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { DRIVER_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const DRIVER_EVENT_TYPE = {
  REGISTERED: 'driver.registered',
  STATUS_CHANGED: 'driver.status_changed',
  VEHICLE_ASSIGNED: 'driver.vehicle_assigned',
  VEHICLE_UNASSIGNED: 'driver.vehicle_unassigned',
  DELIVERY_COMPLETED: 'driver.delivery_completed',
  CASH_UPDATED: 'driver.cash_updated',
  RATING_UPDATED: 'driver.rating_updated',
} as const;

export interface DriverRegisteredPayload {
  readonly driverId: string;
  readonly name: string;
  readonly phone: string;
  readonly licenseNumber: string;
  readonly type: string;
}

export interface DriverStatusChangedPayload {
  readonly driverId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly reason?: string;
}

export interface DriverVehicleAssignedPayload {
  readonly driverId: string;
  readonly vehicleId?: string;
  readonly assignedAt: string;
}

export interface DriverDeliveryCompletedPayload {
  readonly driverId: string;
  readonly shipmentId: string;
  readonly distanceKm?: number;
  readonly completedAt: string;
}

export interface DriverCashUpdatedPayload {
  readonly driverId: string;
  readonly previousCash: number;
  readonly newCash: number;
  readonly delta: number;
  readonly updatedAt: string;
}

export interface DriverRatingUpdatedPayload {
  readonly driverId: string;
  readonly previousRating?: number;
  readonly newRating: number;
  readonly updatedAt: string;
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
    aggregateType: DRIVER_AGGREGATE_TYPE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class DriverRegisteredEvent extends BaseDomainEvent<typeof DRIVER_EVENT_TYPE.REGISTERED, DriverRegisteredPayload> {
  constructor(p: EventParams<DriverRegisteredPayload>) { super(buildParams(DRIVER_EVENT_TYPE.REGISTERED, p)); }
}
export class DriverStatusChangedEvent extends BaseDomainEvent<typeof DRIVER_EVENT_TYPE.STATUS_CHANGED, DriverStatusChangedPayload> {
  constructor(p: EventParams<DriverStatusChangedPayload>) { super(buildParams(DRIVER_EVENT_TYPE.STATUS_CHANGED, p)); }
}
export class DriverVehicleAssignedEvent extends BaseDomainEvent<typeof DRIVER_EVENT_TYPE.VEHICLE_ASSIGNED, DriverVehicleAssignedPayload> {
  constructor(p: EventParams<DriverVehicleAssignedPayload>) { super(buildParams(DRIVER_EVENT_TYPE.VEHICLE_ASSIGNED, p)); }
}
export class DriverVehicleUnassignedEvent extends BaseDomainEvent<typeof DRIVER_EVENT_TYPE.VEHICLE_UNASSIGNED, DriverVehicleAssignedPayload> {
  constructor(p: EventParams<DriverVehicleAssignedPayload>) { super(buildParams(DRIVER_EVENT_TYPE.VEHICLE_UNASSIGNED, p)); }
}
export class DriverDeliveryCompletedEvent extends BaseDomainEvent<typeof DRIVER_EVENT_TYPE.DELIVERY_COMPLETED, DriverDeliveryCompletedPayload> {
  constructor(p: EventParams<DriverDeliveryCompletedPayload>) { super(buildParams(DRIVER_EVENT_TYPE.DELIVERY_COMPLETED, p)); }
}
export class DriverCashUpdatedEvent extends BaseDomainEvent<typeof DRIVER_EVENT_TYPE.CASH_UPDATED, DriverCashUpdatedPayload> {
  constructor(p: EventParams<DriverCashUpdatedPayload>) { super(buildParams(DRIVER_EVENT_TYPE.CASH_UPDATED, p)); }
}
export class DriverRatingUpdatedEvent extends BaseDomainEvent<typeof DRIVER_EVENT_TYPE.RATING_UPDATED, DriverRatingUpdatedPayload> {
  constructor(p: EventParams<DriverRatingUpdatedPayload>) { super(buildParams(DRIVER_EVENT_TYPE.RATING_UPDATED, p)); }
}
