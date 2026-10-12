/**
 * Warehouse domain events
 * @module logistics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { WAREHOUSE_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const WAREHOUSE_EVENT_TYPE = {
  CREATED: 'warehouse.created',
  ACTIVATED: 'warehouse.activated',
  DEACTIVATED: 'warehouse.deactivated',
  MAINTENANCE_STARTED: 'warehouse.maintenance_started',
  MAINTENANCE_COMPLETED: 'warehouse.maintenance_completed',
  FULL: 'warehouse.full',
  CLOSED: 'warehouse.closed',
  ARCHIVED: 'warehouse.archived',
  CAPACITY_RESERVED: 'warehouse.capacity_reserved',
  CAPACITY_RELEASED: 'warehouse.capacity_released',
} as const;

export interface WarehouseCreatedPayload {
  readonly warehouseId: string;
  readonly code: string;
  readonly name: string;
  readonly type: string;
  readonly zone: string;
}

export interface WarehouseStatusChangedPayload {
  readonly warehouseId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly reason?: string;
}

export interface WarehouseCapacityChangedPayload {
  readonly warehouseId: string;
  readonly usedM3: number;
  readonly usedKg: number;
  readonly availableM3: number;
  readonly availableKg: number;
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
    aggregateType: WAREHOUSE_AGGREGATE_TYPE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class WarehouseCreatedEvent extends BaseDomainEvent<typeof WAREHOUSE_EVENT_TYPE.CREATED, WarehouseCreatedPayload> {
  constructor(p: EventParams<WarehouseCreatedPayload>) { super(buildParams(WAREHOUSE_EVENT_TYPE.CREATED, p)); }
}

export class WarehouseActivatedEvent extends BaseDomainEvent<typeof WAREHOUSE_EVENT_TYPE.ACTIVATED, WarehouseStatusChangedPayload> {
  constructor(p: EventParams<WarehouseStatusChangedPayload>) { super(buildParams(WAREHOUSE_EVENT_TYPE.ACTIVATED, p)); }
}

export class WarehouseDeactivatedEvent extends BaseDomainEvent<typeof WAREHOUSE_EVENT_TYPE.DEACTIVATED, WarehouseStatusChangedPayload> {
  constructor(p: EventParams<WarehouseStatusChangedPayload>) { super(buildParams(WAREHOUSE_EVENT_TYPE.DEACTIVATED, p)); }
}

export class WarehouseMaintenanceStartedEvent extends BaseDomainEvent<typeof WAREHOUSE_EVENT_TYPE.MAINTENANCE_STARTED, WarehouseStatusChangedPayload> {
  constructor(p: EventParams<WarehouseStatusChangedPayload>) { super(buildParams(WAREHOUSE_EVENT_TYPE.MAINTENANCE_STARTED, p)); }
}

export class WarehouseMaintenanceCompletedEvent extends BaseDomainEvent<typeof WAREHOUSE_EVENT_TYPE.MAINTENANCE_COMPLETED, WarehouseStatusChangedPayload> {
  constructor(p: EventParams<WarehouseStatusChangedPayload>) { super(buildParams(WAREHOUSE_EVENT_TYPE.MAINTENANCE_COMPLETED, p)); }
}

export class WarehouseFullEvent extends BaseDomainEvent<typeof WAREHOUSE_EVENT_TYPE.FULL, WarehouseStatusChangedPayload> {
  constructor(p: EventParams<WarehouseStatusChangedPayload>) { super(buildParams(WAREHOUSE_EVENT_TYPE.FULL, p)); }
}

export class WarehouseClosedEvent extends BaseDomainEvent<typeof WAREHOUSE_EVENT_TYPE.CLOSED, WarehouseStatusChangedPayload> {
  constructor(p: EventParams<WarehouseStatusChangedPayload>) { super(buildParams(WAREHOUSE_EVENT_TYPE.CLOSED, p)); }
}

export class WarehouseArchivedEvent extends BaseDomainEvent<typeof WAREHOUSE_EVENT_TYPE.ARCHIVED, WarehouseStatusChangedPayload> {
  constructor(p: EventParams<WarehouseStatusChangedPayload>) { super(buildParams(WAREHOUSE_EVENT_TYPE.ARCHIVED, p)); }
}

export class WarehouseCapacityReservedEvent extends BaseDomainEvent<typeof WAREHOUSE_EVENT_TYPE.CAPACITY_RESERVED, WarehouseCapacityChangedPayload> {
  constructor(p: EventParams<WarehouseCapacityChangedPayload>) { super(buildParams(WAREHOUSE_EVENT_TYPE.CAPACITY_RESERVED, p)); }
}

export class WarehouseCapacityReleasedEvent extends BaseDomainEvent<typeof WAREHOUSE_EVENT_TYPE.CAPACITY_RELEASED, WarehouseCapacityChangedPayload> {
  constructor(p: EventParams<WarehouseCapacityChangedPayload>) { super(buildParams(WAREHOUSE_EVENT_TYPE.CAPACITY_RELEASED, p)); }
}
