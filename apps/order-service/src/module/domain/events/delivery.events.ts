import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'Delivery';

export class DeliveryScheduledEvent extends BaseDomainEvent<
  'delivery.scheduled',
  { deliveryId: string; orderId: string; scheduledAt: string }
> {
  constructor(aggregateId: string, deliveryId: string, orderId: string, scheduledAt: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'delivery.scheduled',
      aggregateId,
      aggregateType: AGG,
      payload: { deliveryId, orderId, scheduledAt },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class DeliveryRescheduledEvent extends BaseDomainEvent<
  'delivery.rescheduled',
  { deliveryId: string; orderId: string; newScheduledAt: string }
> {
  constructor(aggregateId: string, deliveryId: string, orderId: string, newScheduledAt: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'delivery.rescheduled',
      aggregateId,
      aggregateType: AGG,
      payload: { deliveryId, orderId, newScheduledAt },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class DeliveryAttemptedEvent extends BaseDomainEvent<
  'delivery.attempted',
  { deliveryId: string; orderId: string }
> {
  constructor(aggregateId: string, deliveryId: string, orderId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'delivery.attempted',
      aggregateId,
      aggregateType: AGG,
      payload: { deliveryId, orderId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class DeliveryCompletedEvent extends BaseDomainEvent<
  'delivery.completed',
  { deliveryId: string; orderId: string; deliveredAt: string }
> {
  constructor(aggregateId: string, deliveryId: string, orderId: string, deliveredAt: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'delivery.completed',
      aggregateId,
      aggregateType: AGG,
      payload: { deliveryId, orderId, deliveredAt },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}
