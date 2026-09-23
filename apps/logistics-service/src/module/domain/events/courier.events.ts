import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE = 'Courier';

export class CourierRegisteredEvent extends BaseDomainEvent<
  'logistics.courier.registered',
  { courierId: string; name: string; type: string }
> {
  constructor(aggregateId: string, courierId: string, name: string, type: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'logistics.courier.registered',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { courierId, name, type },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class CourierSuspendedEvent extends BaseDomainEvent<
  'logistics.courier.suspended',
  { courierId: string; reason: string }
> {
  constructor(aggregateId: string, courierId: string, reason: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'logistics.courier.suspended',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { courierId, reason },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
