import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE = 'Vehicle';

export class VehicleRegisteredEvent extends BaseDomainEvent<
  'logistics.vehicle.registered',
  { vehicleId: string; vehicleNumber: string; type: string }
> {
  constructor(aggregateId: string, vehicleId: string, vehicleNumber: string, type: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'logistics.vehicle.registered',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { vehicleId, vehicleNumber, type },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class VehicleMaintenanceEvent extends BaseDomainEvent<
  'logistics.vehicle.maintenance',
  { vehicleId: string; reason: string }
> {
  constructor(aggregateId: string, vehicleId: string, reason: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'logistics.vehicle.maintenance',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { vehicleId, reason },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
