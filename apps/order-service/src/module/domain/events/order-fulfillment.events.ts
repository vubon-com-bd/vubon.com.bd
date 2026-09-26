import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'OrderFulfillment';

export class FulfillmentStartedEvent extends BaseDomainEvent<
  'fulfillment.started',
  { fulfillmentId: string; orderId: string; vendorId: string | null }
> {
  constructor(aggregateId: string, fulfillmentId: string, orderId: string, vendorId: string | null, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'fulfillment.started',
      aggregateId,
      aggregateType: AGG,
      payload: { fulfillmentId, orderId, vendorId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class FulfillmentPackedEvent extends BaseDomainEvent<
  'fulfillment.packed',
  { fulfillmentId: string; orderId: string }
> {
  constructor(aggregateId: string, fulfillmentId: string, orderId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'fulfillment.packed',
      aggregateId,
      aggregateType: AGG,
      payload: { fulfillmentId, orderId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class FulfillmentShippedEvent extends BaseDomainEvent<
  'fulfillment.shipped',
  { fulfillmentId: string; orderId: string }
> {
  constructor(aggregateId: string, fulfillmentId: string, orderId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'fulfillment.shipped',
      aggregateId,
      aggregateType: AGG,
      payload: { fulfillmentId, orderId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class FulfillmentCompletedEvent extends BaseDomainEvent<
  'fulfillment.completed',
  { fulfillmentId: string; orderId: string }
> {
  constructor(aggregateId: string, fulfillmentId: string, orderId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'fulfillment.completed',
      aggregateId,
      aggregateType: AGG,
      payload: { fulfillmentId, orderId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}
