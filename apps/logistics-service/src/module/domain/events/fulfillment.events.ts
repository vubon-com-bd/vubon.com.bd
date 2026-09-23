import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE = 'Fulfillment';

export class FulfillmentStartedEvent extends BaseDomainEvent<
  'logistics.fulfillment.started',
  { fulfillmentId: string; orderId: string; warehouseId: string }
> {
  constructor(aggregateId: string, fulfillmentId: string, orderId: string, warehouseId: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'logistics.fulfillment.started',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { fulfillmentId, orderId, warehouseId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class FulfillmentCompletedEvent extends BaseDomainEvent<
  'logistics.fulfillment.completed',
  { fulfillmentId: string; orderId: string }
> {
  constructor(aggregateId: string, fulfillmentId: string, orderId: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'logistics.fulfillment.completed',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { fulfillmentId, orderId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
