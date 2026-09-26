import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE = 'ReturnShipment';

export class ReturnShipmentRequestedEvent extends BaseDomainEvent<
  'logistics.return.requested',
  { returnShipmentId: string; shipmentId: string; reason: string }
> {
  constructor(aggregateId: string, returnShipmentId: string, shipmentId: string, reason: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'logistics.return.requested',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { returnShipmentId, shipmentId, reason },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class ReturnShipmentReceivedEvent extends BaseDomainEvent<
  'logistics.return.received',
  { returnShipmentId: string; shipmentId: string }
> {
  constructor(aggregateId: string, returnShipmentId: string, shipmentId: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'logistics.return.received',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { returnShipmentId, shipmentId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
