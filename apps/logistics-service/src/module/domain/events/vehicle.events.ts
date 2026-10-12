/**
 * Vehicle domain events
 * @module logistics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { VEHICLE_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const VEHICLE_EVENT_TYPE = {
  REGISTERED: 'vehicle.registered',
  ASSIGNED: 'vehicle.assigned',
  UNASSIGNED: 'vehicle.unassigned',
  AVAILABLE: 'vehicle.available',
  IN_USE: 'vehicle.in_use',
  MAINTENANCE_STARTED: 'vehicle.maintenance_started',
  MAINTENANCE_COMPLETED: 'vehicle.maintenance_completed',
  OUT_OF_SERVICE: 'vehicle.out_of_service',
  RETIRED: 'vehicle.retired',
  MILEAGE_UPDATED: 'vehicle.mileage_updated',
} as const;

export interface VehicleRegisteredPayload {
  readonly vehicleId: string;
  readonly registrationNumber: string;
  readonly type: string;
  readonly make: string;
  readonly model: string;
  readonly year: number;
}

export interface VehicleStatusChangedPayload {
  readonly vehicleId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly reason?: string;
}

export interface VehicleDriverAssignedPayload {
  readonly vehicleId: string;
  readonly driverId?: string;
  readonly assignedAt: string;
}

export interface VehicleMileageUpdatedPayload {
  readonly vehicleId: string;
  readonly previousKm: number;
  readonly newKm: number;
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
    aggregateType: VEHICLE_AGGREGATE_TYPE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class VehicleRegisteredEvent extends BaseDomainEvent<typeof VEHICLE_EVENT_TYPE.REGISTERED, VehicleRegisteredPayload> {
  constructor(p: EventParams<VehicleRegisteredPayload>) { super(buildParams(VEHICLE_EVENT_TYPE.REGISTERED, p)); }
}
export class VehicleAssignedEvent extends BaseDomainEvent<typeof VEHICLE_EVENT_TYPE.ASSIGNED, VehicleDriverAssignedPayload> {
  constructor(p: EventParams<VehicleDriverAssignedPayload>) { super(buildParams(VEHICLE_EVENT_TYPE.ASSIGNED, p)); }
}
export class VehicleUnassignedEvent extends BaseDomainEvent<typeof VEHICLE_EVENT_TYPE.UNASSIGNED, VehicleDriverAssignedPayload> {
  constructor(p: EventParams<VehicleDriverAssignedPayload>) { super(buildParams(VEHICLE_EVENT_TYPE.UNASSIGNED, p)); }
}
export class VehicleAvailableEvent extends BaseDomainEvent<typeof VEHICLE_EVENT_TYPE.AVAILABLE, VehicleStatusChangedPayload> {
  constructor(p: EventParams<VehicleStatusChangedPayload>) { super(buildParams(VEHICLE_EVENT_TYPE.AVAILABLE, p)); }
}
export class VehicleInUseEvent extends BaseDomainEvent<typeof VEHICLE_EVENT_TYPE.IN_USE, VehicleStatusChangedPayload> {
  constructor(p: EventParams<VehicleStatusChangedPayload>) { super(buildParams(VEHICLE_EVENT_TYPE.IN_USE, p)); }
}
export class VehicleMaintenanceStartedEvent extends BaseDomainEvent<typeof VEHICLE_EVENT_TYPE.MAINTENANCE_STARTED, VehicleStatusChangedPayload> {
  constructor(p: EventParams<VehicleStatusChangedPayload>) { super(buildParams(VEHICLE_EVENT_TYPE.MAINTENANCE_STARTED, p)); }
}
export class VehicleMaintenanceCompletedEvent extends BaseDomainEvent<typeof VEHICLE_EVENT_TYPE.MAINTENANCE_COMPLETED, VehicleStatusChangedPayload> {
  constructor(p: EventParams<VehicleStatusChangedPayload>) { super(buildParams(VEHICLE_EVENT_TYPE.MAINTENANCE_COMPLETED, p)); }
}
export class VehicleOutOfServiceEvent extends BaseDomainEvent<typeof VEHICLE_EVENT_TYPE.OUT_OF_SERVICE, VehicleStatusChangedPayload> {
  constructor(p: EventParams<VehicleStatusChangedPayload>) { super(buildParams(VEHICLE_EVENT_TYPE.OUT_OF_SERVICE, p)); }
}
export class VehicleRetiredEvent extends BaseDomainEvent<typeof VEHICLE_EVENT_TYPE.RETIRED, VehicleStatusChangedPayload> {
  constructor(p: EventParams<VehicleStatusChangedPayload>) { super(buildParams(VEHICLE_EVENT_TYPE.RETIRED, p)); }
}
export class VehicleMileageUpdatedEvent extends BaseDomainEvent<typeof VEHICLE_EVENT_TYPE.MILEAGE_UPDATED, VehicleMileageUpdatedPayload> {
  constructor(p: EventParams<VehicleMileageUpdatedPayload>) { super(buildParams(VEHICLE_EVENT_TYPE.MILEAGE_UPDATED, p)); }
}
