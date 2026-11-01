/**
 * Warehouse Domain Events
 * @module logistics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';

import { LOGISTICS_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const WAREHOUSE_EVENT_TYPE = {
  CREATED: 'logistics.warehouse.created',
  ACTIVATED: 'logistics.warehouse.activated',
  DEACTIVATED: 'logistics.warehouse.deactivated',
  MAINTENANCE_STARTED: 'logistics.warehouse.maintenance_started',
  MAINTENANCE_ENDED: 'logistics.warehouse.maintenance_ended',
  FULL: 'logistics.warehouse.full',
  CLOSED: 'logistics.warehouse.closed',
  ARCHIVED: 'logistics.warehouse.archived',
  CAPACITY_UPDATED: 'logistics.warehouse.capacity_updated',
} as const;

export interface WarehouseCreatedPayload {
  readonly warehouseId: string;
  readonly code: string;
  readonly name: string;
  readonly type: string;
  readonly createdAt: string;
}
export interface WarehouseActivatedPayload {
  readonly warehouseId: string;
  readonly activatedAt: string;
}
export interface WarehouseDeactivatedPayload {
  readonly warehouseId: string;
  readonly reason?: string;
  readonly deactivatedAt: string;
}
export interface WarehouseMaintenanceStartedPayload {
  readonly warehouseId: string;
  readonly reason?: string;
  readonly startedAt: string;
}
export interface WarehouseMaintenanceEndedPayload {
  readonly warehouseId: string;
  readonly endedAt: string;
}
export interface WarehouseFullPayload {
  readonly warehouseId: string;
  readonly utilizationPercent: number;
  readonly markedAt: string;
}
export interface WarehouseClosedPayload {
  readonly warehouseId: string;
  readonly reason?: string;
  readonly closedAt: string;
}
export interface WarehouseArchivedPayload {
  readonly warehouseId: string;
  readonly reason?: string;
  readonly archivedAt: string;
}
export interface WarehouseCapacityUpdatedPayload {
  readonly warehouseId: string;
  readonly capacityM3?: number;
  readonly capacityKg?: number;
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

function buildParams<TType extends string, TPayload>(
  type: TType,
  p: EventParams<TPayload>,
) {
  return {
    id: p.id ?? newEventId(),
    type,
    aggregateId: p.aggregateId,
    aggregateType: LOGISTICS_AGGREGATE_TYPE.WAREHOUSE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class WarehouseCreatedEvent extends BaseDomainEvent<
  typeof WAREHOUSE_EVENT_TYPE.CREATED,
  WarehouseCreatedPayload
> {
  constructor(p: EventParams<WarehouseCreatedPayload>) {
    super(buildParams(WAREHOUSE_EVENT_TYPE.CREATED, p));
  }
}
export class WarehouseActivatedEvent extends BaseDomainEvent<
  typeof WAREHOUSE_EVENT_TYPE.ACTIVATED,
  WarehouseActivatedPayload
> {
  constructor(p: EventParams<WarehouseActivatedPayload>) {
    super(buildParams(WAREHOUSE_EVENT_TYPE.ACTIVATED, p));
  }
}
export class WarehouseDeactivatedEvent extends BaseDomainEvent<
  typeof WAREHOUSE_EVENT_TYPE.DEACTIVATED,
  WarehouseDeactivatedPayload
> {
  constructor(p: EventParams<WarehouseDeactivatedPayload>) {
    super(buildParams(WAREHOUSE_EVENT_TYPE.DEACTIVATED, p));
  }
}
export class WarehouseMaintenanceStartedEvent extends BaseDomainEvent<
  typeof WAREHOUSE_EVENT_TYPE.MAINTENANCE_STARTED,
  WarehouseMaintenanceStartedPayload
> {
  constructor(p: EventParams<WarehouseMaintenanceStartedPayload>) {
    super(buildParams(WAREHOUSE_EVENT_TYPE.MAINTENANCE_STARTED, p));
  }
}
export class WarehouseMaintenanceEndedEvent extends BaseDomainEvent<
  typeof WAREHOUSE_EVENT_TYPE.MAINTENANCE_ENDED,
  WarehouseMaintenanceEndedPayload
> {
  constructor(p: EventParams<WarehouseMaintenanceEndedPayload>) {
    super(buildParams(WAREHOUSE_EVENT_TYPE.MAINTENANCE_ENDED, p));
  }
}
export class WarehouseFullEvent extends BaseDomainEvent<
  typeof WAREHOUSE_EVENT_TYPE.FULL,
  WarehouseFullPayload
> {
  constructor(p: EventParams<WarehouseFullPayload>) {
    super(buildParams(WAREHOUSE_EVENT_TYPE.FULL, p));
  }
}
export class WarehouseClosedEvent extends BaseDomainEvent<
  typeof WAREHOUSE_EVENT_TYPE.CLOSED,
  WarehouseClosedPayload
> {
  constructor(p: EventParams<WarehouseClosedPayload>) {
    super(buildParams(WAREHOUSE_EVENT_TYPE.CLOSED, p));
  }
}
export class WarehouseArchivedEvent extends BaseDomainEvent<
  typeof WAREHOUSE_EVENT_TYPE.ARCHIVED,
  WarehouseArchivedPayload
> {
  constructor(p: EventParams<WarehouseArchivedPayload>) {
    super(buildParams(WAREHOUSE_EVENT_TYPE.ARCHIVED, p));
  }
}
export class WarehouseCapacityUpdatedEvent extends BaseDomainEvent<
  typeof WAREHOUSE_EVENT_TYPE.CAPACITY_UPDATED,
  WarehouseCapacityUpdatedPayload
> {
  constructor(p: EventParams<WarehouseCapacityUpdatedPayload>) {
    super(buildParams(WAREHOUSE_EVENT_TYPE.CAPACITY_UPDATED, p));
  }
}
