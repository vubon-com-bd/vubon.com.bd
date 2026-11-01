/**
 * Driver Domain Events
 * @module logistics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';

import { LOGISTICS_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const DRIVER_EVENT_TYPE = {
  CREATED: 'logistics.driver.created',
  AVAILABLE: 'logistics.driver.available',
  ON_DUTY: 'logistics.driver.on_duty',
  ON_BREAK: 'logistics.driver.on_break',
  OFF_DUTY: 'logistics.driver.off_duty',
  ON_LEAVE: 'logistics.driver.on_leave',
  SUSPENDED: 'logistics.driver.suspended',
  DEACTIVATED: 'logistics.driver.deactivated',
  VEHICLE_ASSIGNED: 'logistics.driver.vehicle_assigned',
  VEHICLE_UNASSIGNED: 'logistics.driver.vehicle_unassigned',
  CASH_COLLECTED: 'logistics.driver.cash_collected',
  CASH_DEPOSITED: 'logistics.driver.cash_deposited',
  DELIVERY_COMPLETED: 'logistics.driver.delivery_completed',
  STATUS_CHANGED: 'logistics.driver.status_changed',
} as const;

export interface DriverCreatedPayload {
  readonly driverId: string;
  readonly name: string;
  readonly phone: string;
  readonly licenseNumber: string;
  readonly createdAt: string;
}
export interface DriverAvailablePayload {
  readonly driverId: string;
  readonly availableAt: string;
}
export interface DriverOnDutyPayload {
  readonly driverId: string;
  readonly onDutyAt: string;
}
export interface DriverOnBreakPayload {
  readonly driverId: string;
  readonly onBreakAt: string;
}
export interface DriverOffDutyPayload {
  readonly driverId: string;
  readonly offDutyAt: string;
}
export interface DriverOnLeavePayload {
  readonly driverId: string;
  readonly leaveStartAt: string;
  readonly leaveEndAt?: string;
}
export interface DriverSuspendedPayload {
  readonly driverId: string;
  readonly reason: string;
  readonly suspendedAt: string;
}
export interface DriverDeactivatedPayload {
  readonly driverId: string;
  readonly reason?: string;
  readonly deactivatedAt: string;
}
export interface DriverVehicleAssignedPayload {
  readonly driverId: string;
  readonly vehicleId: string;
  readonly assignedAt: string;
}
export interface DriverVehicleUnassignedPayload {
  readonly driverId: string;
  readonly vehicleId: string;
  readonly unassignedAt: string;
}
export interface DriverCashCollectedPayload {
  readonly driverId: string;
  readonly amount: number;
  readonly currency: string;
  readonly collectedAt: string;
}
export interface DriverCashDepositedPayload {
  readonly driverId: string;
  readonly amount: number;
  readonly currency: string;
  readonly depositedAt: string;
}
export interface DriverDeliveryCompletedPayload {
  readonly driverId: string;
  readonly deliveryId: string;
  readonly completedAt: string;
}
export interface DriverStatusChangedPayload {
  readonly driverId: string;
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
    aggregateType: LOGISTICS_AGGREGATE_TYPE.DRIVER,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class DriverCreatedEvent extends BaseDomainEvent<
  typeof DRIVER_EVENT_TYPE.CREATED,
  DriverCreatedPayload
> {
  constructor(p: EventParams<DriverCreatedPayload>) {
    super(buildParams(DRIVER_EVENT_TYPE.CREATED, p));
  }
}
export class DriverAvailableEvent extends BaseDomainEvent<
  typeof DRIVER_EVENT_TYPE.AVAILABLE,
  DriverAvailablePayload
> {
  constructor(p: EventParams<DriverAvailablePayload>) {
    super(buildParams(DRIVER_EVENT_TYPE.AVAILABLE, p));
  }
}
export class DriverOnDutyEvent extends BaseDomainEvent<
  typeof DRIVER_EVENT_TYPE.ON_DUTY,
  DriverOnDutyPayload
> {
  constructor(p: EventParams<DriverOnDutyPayload>) {
    super(buildParams(DRIVER_EVENT_TYPE.ON_DUTY, p));
  }
}
export class DriverOnBreakEvent extends BaseDomainEvent<
  typeof DRIVER_EVENT_TYPE.ON_BREAK,
  DriverOnBreakPayload
> {
  constructor(p: EventParams<DriverOnBreakPayload>) {
    super(buildParams(DRIVER_EVENT_TYPE.ON_BREAK, p));
  }
}
export class DriverOffDutyEvent extends BaseDomainEvent<
  typeof DRIVER_EVENT_TYPE.OFF_DUTY,
  DriverOffDutyPayload
> {
  constructor(p: EventParams<DriverOffDutyPayload>) {
    super(buildParams(DRIVER_EVENT_TYPE.OFF_DUTY, p));
  }
}
export class DriverOnLeaveEvent extends BaseDomainEvent<
  typeof DRIVER_EVENT_TYPE.ON_LEAVE,
  DriverOnLeavePayload
> {
  constructor(p: EventParams<DriverOnLeavePayload>) {
    super(buildParams(DRIVER_EVENT_TYPE.ON_LEAVE, p));
  }
}
export class DriverSuspendedEvent extends BaseDomainEvent<
  typeof DRIVER_EVENT_TYPE.SUSPENDED,
  DriverSuspendedPayload
> {
  constructor(p: EventParams<DriverSuspendedPayload>) {
    super(buildParams(DRIVER_EVENT_TYPE.SUSPENDED, p));
  }
}
export class DriverDeactivatedEvent extends BaseDomainEvent<
  typeof DRIVER_EVENT_TYPE.DEACTIVATED,
  DriverDeactivatedPayload
> {
  constructor(p: EventParams<DriverDeactivatedPayload>) {
    super(buildParams(DRIVER_EVENT_TYPE.DEACTIVATED, p));
  }
}
export class DriverVehicleAssignedEvent extends BaseDomainEvent<
  typeof DRIVER_EVENT_TYPE.VEHICLE_ASSIGNED,
  DriverVehicleAssignedPayload
> {
  constructor(p: EventParams<DriverVehicleAssignedPayload>) {
    super(buildParams(DRIVER_EVENT_TYPE.VEHICLE_ASSIGNED, p));
  }
}
export class DriverVehicleUnassignedEvent extends BaseDomainEvent<
  typeof DRIVER_EVENT_TYPE.VEHICLE_UNASSIGNED,
  DriverVehicleUnassignedPayload
> {
  constructor(p: EventParams<DriverVehicleUnassignedPayload>) {
    super(buildParams(DRIVER_EVENT_TYPE.VEHICLE_UNASSIGNED, p));
  }
}
export class DriverCashCollectedEvent extends BaseDomainEvent<
  typeof DRIVER_EVENT_TYPE.CASH_COLLECTED,
  DriverCashCollectedPayload
> {
  constructor(p: EventParams<DriverCashCollectedPayload>) {
    super(buildParams(DRIVER_EVENT_TYPE.CASH_COLLECTED, p));
  }
}
export class DriverCashDepositedEvent extends BaseDomainEvent<
  typeof DRIVER_EVENT_TYPE.CASH_DEPOSITED,
  DriverCashDepositedPayload
> {
  constructor(p: EventParams<DriverCashDepositedPayload>) {
    super(buildParams(DRIVER_EVENT_TYPE.CASH_DEPOSITED, p));
  }
}
export class DriverDeliveryCompletedEvent extends BaseDomainEvent<
  typeof DRIVER_EVENT_TYPE.DELIVERY_COMPLETED,
  DriverDeliveryCompletedPayload
> {
  constructor(p: EventParams<DriverDeliveryCompletedPayload>) {
    super(buildParams(DRIVER_EVENT_TYPE.DELIVERY_COMPLETED, p));
  }
}
export class DriverStatusChangedEvent extends BaseDomainEvent<
  typeof DRIVER_EVENT_TYPE.STATUS_CHANGED,
  DriverStatusChangedPayload
> {
  constructor(p: EventParams<DriverStatusChangedPayload>) {
    super(buildParams(DRIVER_EVENT_TYPE.STATUS_CHANGED, p));
  }
}
