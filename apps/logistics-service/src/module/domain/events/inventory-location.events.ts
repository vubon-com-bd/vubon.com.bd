/**
 * InventoryLocation Domain Events
 * @module logistics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';

import { newEventId, now } from './event.helpers.js';

export const INVENTORY_LOCATION_EVENT_TYPE = {
  CREATED: 'logistics.inventory_location.created',
  ACTIVATED: 'logistics.inventory_location.activated',
  DEACTIVATED: 'logistics.inventory_location.deactivated',
  QUARANTINED: 'logistics.inventory_location.quarantined',
  UNQUARANTINED: 'logistics.inventory_location.unquarantined',
  ARCHIVED: 'logistics.inventory_location.archived',
  STOCK_ADDED: 'logistics.inventory_location.stock_added',
  STOCK_REMOVED: 'logistics.inventory_location.stock_removed',
  CAPACITY_UPDATED: 'logistics.inventory_location.capacity_updated',
  STATUS_CHANGED: 'logistics.inventory_location.status_changed',
} as const;

export interface InventoryLocationCreatedPayload {
  readonly inventoryLocationId: string;
  readonly code: string;
  readonly name: string;
  readonly warehouseId: string;
  readonly zone: string;
  readonly createdAt: string;
}
export interface InventoryLocationActivatedPayload {
  readonly inventoryLocationId: string;
  readonly activatedAt: string;
}
export interface InventoryLocationDeactivatedPayload {
  readonly inventoryLocationId: string;
  readonly reason?: string;
  readonly deactivatedAt: string;
}
export interface InventoryLocationQuarantinedPayload {
  readonly inventoryLocationId: string;
  readonly reason: string;
  readonly quarantinedAt: string;
}
export interface InventoryLocationUnquarantinedPayload {
  readonly inventoryLocationId: string;
  readonly unquarantinedAt: string;
}
export interface InventoryLocationArchivedPayload {
  readonly inventoryLocationId: string;
  readonly reason?: string;
  readonly archivedAt: string;
}
export interface InventoryLocationStockAddedPayload {
  readonly inventoryLocationId: string;
  readonly weightKg: number;
  readonly volumeM3?: number;
  readonly newCurrentKg: number;
  readonly newCurrentM3: number;
  readonly addedAt: string;
}
export interface InventoryLocationStockRemovedPayload {
  readonly inventoryLocationId: string;
  readonly weightKg: number;
  readonly volumeM3?: number;
  readonly newCurrentKg: number;
  readonly newCurrentM3: number;
  readonly removedAt: string;
}
export interface InventoryLocationCapacityUpdatedPayload {
  readonly inventoryLocationId: string;
  readonly maxCapacityKg?: number;
  readonly maxCapacityM3?: number;
  readonly updatedAt: string;
}
export interface InventoryLocationStatusChangedPayload {
  readonly inventoryLocationId: string;
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
    aggregateType: 'InventoryLocation',
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class InventoryLocationCreatedEvent extends BaseDomainEvent<
  typeof INVENTORY_LOCATION_EVENT_TYPE.CREATED,
  InventoryLocationCreatedPayload
> {
  constructor(p: EventParams<InventoryLocationCreatedPayload>) {
    super(buildParams(INVENTORY_LOCATION_EVENT_TYPE.CREATED, p));
  }
}
export class InventoryLocationActivatedEvent extends BaseDomainEvent<
  typeof INVENTORY_LOCATION_EVENT_TYPE.ACTIVATED,
  InventoryLocationActivatedPayload
> {
  constructor(p: EventParams<InventoryLocationActivatedPayload>) {
    super(buildParams(INVENTORY_LOCATION_EVENT_TYPE.ACTIVATED, p));
  }
}
export class InventoryLocationDeactivatedEvent extends BaseDomainEvent<
  typeof INVENTORY_LOCATION_EVENT_TYPE.DEACTIVATED,
  InventoryLocationDeactivatedPayload
> {
  constructor(p: EventParams<InventoryLocationDeactivatedPayload>) {
    super(buildParams(INVENTORY_LOCATION_EVENT_TYPE.DEACTIVATED, p));
  }
}
export class InventoryLocationQuarantinedEvent extends BaseDomainEvent<
  typeof INVENTORY_LOCATION_EVENT_TYPE.QUARANTINED,
  InventoryLocationQuarantinedPayload
> {
  constructor(p: EventParams<InventoryLocationQuarantinedPayload>) {
    super(buildParams(INVENTORY_LOCATION_EVENT_TYPE.QUARANTINED, p));
  }
}
export class InventoryLocationUnquarantinedEvent extends BaseDomainEvent<
  typeof INVENTORY_LOCATION_EVENT_TYPE.UNQUARANTINED,
  InventoryLocationUnquarantinedPayload
> {
  constructor(p: EventParams<InventoryLocationUnquarantinedPayload>) {
    super(buildParams(INVENTORY_LOCATION_EVENT_TYPE.UNQUARANTINED, p));
  }
}
export class InventoryLocationArchivedEvent extends BaseDomainEvent<
  typeof INVENTORY_LOCATION_EVENT_TYPE.ARCHIVED,
  InventoryLocationArchivedPayload
> {
  constructor(p: EventParams<InventoryLocationArchivedPayload>) {
    super(buildParams(INVENTORY_LOCATION_EVENT_TYPE.ARCHIVED, p));
  }
}
export class InventoryLocationStockAddedEvent extends BaseDomainEvent<
  typeof INVENTORY_LOCATION_EVENT_TYPE.STOCK_ADDED,
  InventoryLocationStockAddedPayload
> {
  constructor(p: EventParams<InventoryLocationStockAddedPayload>) {
    super(buildParams(INVENTORY_LOCATION_EVENT_TYPE.STOCK_ADDED, p));
  }
}
export class InventoryLocationStockRemovedEvent extends BaseDomainEvent<
  typeof INVENTORY_LOCATION_EVENT_TYPE.STOCK_REMOVED,
  InventoryLocationStockRemovedPayload
> {
  constructor(p: EventParams<InventoryLocationStockRemovedPayload>) {
    super(buildParams(INVENTORY_LOCATION_EVENT_TYPE.STOCK_REMOVED, p));
  }
}
export class InventoryLocationCapacityUpdatedEvent extends BaseDomainEvent<
  typeof INVENTORY_LOCATION_EVENT_TYPE.CAPACITY_UPDATED,
  InventoryLocationCapacityUpdatedPayload
> {
  constructor(p: EventParams<InventoryLocationCapacityUpdatedPayload>) {
    super(buildParams(INVENTORY_LOCATION_EVENT_TYPE.CAPACITY_UPDATED, p));
  }
}
export class InventoryLocationStatusChangedEvent extends BaseDomainEvent<
  typeof INVENTORY_LOCATION_EVENT_TYPE.STATUS_CHANGED,
  InventoryLocationStatusChangedPayload
> {
  constructor(p: EventParams<InventoryLocationStatusChangedPayload>) {
    super(buildParams(INVENTORY_LOCATION_EVENT_TYPE.STATUS_CHANGED, p));
  }
}
