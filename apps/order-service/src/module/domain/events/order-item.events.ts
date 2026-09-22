import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'OrderItem';

export class OrderItemAddedEvent extends BaseDomainEvent<
  'order.item.added',
  { orderId: string; itemId: string; productId: string; quantity: number }
> {
  constructor(aggregateId: string, orderId: string, itemId: string, productId: string, quantity: number, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'order.item.added',
      aggregateId,
      aggregateType: AGG,
      payload: { orderId, itemId, productId, quantity },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class OrderItemUpdatedEvent extends BaseDomainEvent<
  'order.item.updated',
  { orderId: string; itemId: string; quantity: number }
> {
  constructor(aggregateId: string, orderId: string, itemId: string, quantity: number, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'order.item.updated',
      aggregateId,
      aggregateType: AGG,
      payload: { orderId, itemId, quantity },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class OrderItemRemovedEvent extends BaseDomainEvent<
  'order.item.removed',
  { orderId: string; itemId: string }
> {
  constructor(aggregateId: string, orderId: string, itemId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'order.item.removed',
      aggregateId,
      aggregateType: AGG,
      payload: { orderId, itemId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}
