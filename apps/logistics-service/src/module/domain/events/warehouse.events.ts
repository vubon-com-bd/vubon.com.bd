import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE = 'Warehouse';

export class WarehouseCreatedEvent extends BaseDomainEvent<
  'logistics.warehouse.created',
  { warehouseId: string; code: string; name: string }
> {
  constructor(aggregateId: string, warehouseId: string, code: string, name: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'logistics.warehouse.created',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { warehouseId, code, name },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class LocationAddedEvent extends BaseDomainEvent<
  'logistics.warehouse.location_added',
  { warehouseId: string; locationId: string; code: string }
> {
  constructor(aggregateId: string, warehouseId: string, locationId: string, code: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'logistics.warehouse.location_added',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { warehouseId, locationId, code },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
