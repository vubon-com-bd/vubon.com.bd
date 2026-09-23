import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE = 'Driver';

export class DriverRegisteredEvent extends BaseDomainEvent<
  'logistics.driver.registered',
  { driverId: string; name: string; license: string }
> {
  constructor(aggregateId: string, driverId: string, name: string, license: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'logistics.driver.registered',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { driverId, name, license },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class DriverAssignedEvent extends BaseDomainEvent<
  'logistics.driver.assigned',
  { driverId: string; dispatchId: string }
> {
  constructor(aggregateId: string, driverId: string, dispatchId: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'logistics.driver.assigned',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { driverId, dispatchId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
