import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE = 'Dispatch';

export class DispatchCreatedEvent extends BaseDomainEvent<
  'logistics.dispatch.created',
  { dispatchId: string; shipmentId: string }
> {
  constructor(aggregateId: string, dispatchId: string, shipmentId: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'logistics.dispatch.created',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { dispatchId, shipmentId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class DispatchDepartedEvent extends BaseDomainEvent<
  'logistics.dispatch.departed',
  { dispatchId: string; departedAt: string }
> {
  constructor(aggregateId: string, dispatchId: string, departedAt: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'logistics.dispatch.departed',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { dispatchId, departedAt },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class DispatchArrivedEvent extends BaseDomainEvent<
  'logistics.dispatch.arrived',
  { dispatchId: string; arrivedAt: string }
> {
  constructor(aggregateId: string, dispatchId: string, arrivedAt: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'logistics.dispatch.arrived',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { dispatchId, arrivedAt },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
