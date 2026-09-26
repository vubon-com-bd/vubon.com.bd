import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'OrderTracking';

export class TrackingAddedEvent extends BaseDomainEvent<
  'tracking.added',
  { trackingId: string; orderId: string; trackingNumber: string }
> {
  constructor(aggregateId: string, trackingId: string, orderId: string, trackingNumber: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'tracking.added',
      aggregateId,
      aggregateType: AGG,
      payload: { trackingId, orderId, trackingNumber },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class TrackingUpdatedEvent extends BaseDomainEvent<
  'tracking.updated',
  { trackingId: string; orderId: string; status: string }
> {
  constructor(aggregateId: string, trackingId: string, orderId: string, status: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'tracking.updated',
      aggregateId,
      aggregateType: AGG,
      payload: { trackingId, orderId, status },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}
