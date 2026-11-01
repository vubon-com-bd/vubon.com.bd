/**
 * Vehicle Domain Events
 * @module logistics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';

import { LOGISTICS_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const VEHICLE_EVENT_TYPE = {
  CREATED: 'logistics.vehicle.created',
  ASSIGNED: 'logistics.vehicle.assigned',
  RELEASED: 'logistics.vehicle.released',
  MAINTENANCE_STARTED: 'logistics.vehicle.maintenance_started',
  MAINTENANCE_COMPLETED: 'logistics.vehicle.maintenance_completed',
  RETIRED: 'logistics.vehicle.retired',
  DRIVER_ASSIGNED: 'logistics.vehicle.driver_assigned',
  DRIVER_UNASSIGNED: 'logistics.vehicle.driver_unassigned',
  STATUS_CHANGED: 'logistics.vehicle.status_changed',
} as const;

export interface VehicleCreatedPayload {
  readonly vehicleId: string;
  readonly registrationNumber: string;
  readonly type: string;
  readonly make: string;
  readonly model: string;
  readonly year: number;
  readonly createdAt: string;
}
export interface VehicleAssignedPayload {
  readonly vehicleId: string;
  readonly dispatchId?: string;
  readonly driverId?: string;
  readonly assignedAt: string;
}
export interface VehicleReleasedPayload {
  readonly vehicleId: string;
  readonly releasedAt: string;
}
export interface VehicleMaintenanceStartedPayload {
  readonly vehicleId: string;
  readonly reason?: string;
  readonly startedAt: string;
}
export interface VehicleMaintenanceCompletedPayload {
  readonly vehicleId: string;
  readonly completedAt: string;
}
export interface VehicleRetiredPayload {
  readonly vehicleId: string;
  readonly reason?: string;
  readonly retiredAt: string;
}
export interface VehicleDriverAssignedPayload {
  readonly vehicleId: string;
  readonly driverId: string;
  readonly assignedAt: string;
}
export interface VehicleDriverUnassignedPayload {
  readonly vehicleId: string;
  readonly driverId: string;
  readonly unassignedAt: string;
}
export interface VehicleStatusChangedPayload {
  readonly vehicleId: string;
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
    aggregateType: LOGISTICS_AGGREGATE_TYPE.VEHICLE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class VehicleCreatedEvent extends BaseDomainEvent<
  typeof VEHICLE_EVENT_TYPE.CREATED,
  VehicleCreatedPayload
> {
  constructor(p: EventParams<VehicleCreatedPayload>) {
    super(buildParams(VEHICLE_EVENT_TYPE.CREATED, p));
  }
}
export class VehicleAssignedEvent extends BaseDomainEvent<
  typeof VEHICLE_EVENT_TYPE.ASSIGNED,
  VehicleAssignedPayload
> {
  constructor(p: EventParams<VehicleAssignedPayload>) {
    super(buildParams(VEHICLE_EVENT_TYPE.ASSIGNED, p));
  }
}
export class VehicleReleasedEvent extends BaseDomainEvent<
  typeof VEHICLE_EVENT_TYPE.RELEASED,
  VehicleReleasedPayload
> {
  constructor(p: EventParams<VehicleReleasedPayload>) {
    super(buildParams(VEHICLE_EVENT_TYPE.RELEASED, p));
  }
}
export class VehicleMaintenanceStartedEvent extends BaseDomainEvent<
  typeof VEHICLE_EVENT_TYPE.MAINTENANCE_STARTED,
  VehicleMaintenanceStartedPayload
> {
  constructor(p: EventParams<VehicleMaintenanceStartedPayload>) {
    super(buildParams(VEHICLE_EVENT_TYPE.MAINTENANCE_STARTED, p));
  }
}
export class VehicleMaintenanceCompletedEvent extends BaseDomainEvent<
  typeof VEHICLE_EVENT_TYPE.MAINTENANCE_COMPLETED,
  VehicleMaintenanceCompletedPayload
> {
  constructor(p: EventParams<VehicleMaintenanceCompletedPayload>) {
    super(buildParams(VEHICLE_EVENT_TYPE.MAINTENANCE_COMPLETED, p));
  }
}
export class VehicleRetiredEvent extends BaseDomainEvent<
  typeof VEHICLE_EVENT_TYPE.RETIRED,
  VehicleRetiredPayload
> {
  constructor(p: EventParams<VehicleRetiredPayload>) {
    super(buildParams(VEHICLE_EVENT_TYPE.RETIRED, p));
  }
}
export class VehicleDriverAssignedEvent extends BaseDomainEvent<
  typeof VEHICLE_EVENT_TYPE.DRIVER_ASSIGNED,
  VehicleDriverAssignedPayload
> {
  constructor(p: EventParams<VehicleDriverAssignedPayload>) {
    super(buildParams(VEHICLE_EVENT_TYPE.DRIVER_ASSIGNED, p));
  }
}
export class VehicleDriverUnassignedEvent extends BaseDomainEvent<
  typeof VEHICLE_EVENT_TYPE.DRIVER_UNASSIGNED,
  VehicleDriverUnassignedPayload
> {
  constructor(p: EventParams<VehicleDriverUnassignedPayload>) {
    super(buildParams(VEHICLE_EVENT_TYPE.DRIVER_UNASSIGNED, p));
  }
}
export class VehicleStatusChangedEvent extends BaseDomainEvent<
  typeof VEHICLE_EVENT_TYPE.STATUS_CHANGED,
  VehicleStatusChangedPayload
> {
  constructor(p: EventParams<VehicleStatusChangedPayload>) {
    super(buildParams(VEHICLE_EVENT_TYPE.STATUS_CHANGED, p));
  }
}
