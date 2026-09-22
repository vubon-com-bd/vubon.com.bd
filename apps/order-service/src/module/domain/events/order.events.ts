import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'Order';

export class OrderCreatedEvent extends BaseDomainEvent<
  'order.created',
  { orderId: string; orderNumber: string; customerId: string; total: number }
> {
  constructor(
    aggregateId: string,
    orderId: string,
    orderNumber: string,
    customerId: string,
    total: number,
    version: number,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'order.created',
      aggregateId,
      aggregateType: AGG,
      payload: { orderId, orderNumber, customerId, total },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class OrderConfirmedEvent extends BaseDomainEvent<
  'order.confirmed',
  { orderId: string; paymentId: string | null }
> {
  constructor(aggregateId: string, orderId: string, paymentId: string | null, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'order.confirmed',
      aggregateId,
      aggregateType: AGG,
      payload: { orderId, paymentId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class OrderProcessingEvent extends BaseDomainEvent<
  'order.processing',
  { orderId: string }
> {
  constructor(aggregateId: string, orderId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'order.processing',
      aggregateId,
      aggregateType: AGG,
      payload: { orderId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class OrderShippedEvent extends BaseDomainEvent<
  'order.shipped',
  { orderId: string; trackingNumber: string | null }
> {
  constructor(aggregateId: string, orderId: string, trackingNumber: string | null, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'order.shipped',
      aggregateId,
      aggregateType: AGG,
      payload: { orderId, trackingNumber },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class OrderDeliveredEvent extends BaseDomainEvent<
  'order.delivered',
  { orderId: string; deliveredAt: string }
> {
  constructor(aggregateId: string, orderId: string, deliveredAt: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'order.delivered',
      aggregateId,
      aggregateType: AGG,
      payload: { orderId, deliveredAt },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class OrderCancelledEvent extends BaseDomainEvent<
  'order.cancelled',
  { orderId: string; reason: string }
> {
  constructor(aggregateId: string, orderId: string, reason: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'order.cancelled',
      aggregateId,
      aggregateType: AGG,
      payload: { orderId, reason },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class OrderReturnedEvent extends BaseDomainEvent<
  'order.returned',
  { orderId: string; returnId: string }
> {
  constructor(aggregateId: string, orderId: string, returnId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'order.returned',
      aggregateId,
      aggregateType: AGG,
      payload: { orderId, returnId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class OrderRefundedEvent extends BaseDomainEvent<
  'order.refunded',
  { orderId: string; paymentId: string; amount: number }
> {
  constructor(aggregateId: string, orderId: string, paymentId: string, amount: number, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'order.refunded',
      aggregateId,
      aggregateType: AGG,
      payload: { orderId, paymentId, amount },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}
