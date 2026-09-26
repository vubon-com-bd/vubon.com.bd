import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'OrderCancel';

export class OrderCancelRequestedEvent extends BaseDomainEvent<
  'order.cancel.requested',
  { cancelId: string; orderId: string; reason: string }
> {
  constructor(aggregateId: string, cancelId: string, orderId: string, reason: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'order.cancel.requested',
      aggregateId,
      aggregateType: AGG,
      payload: { cancelId, orderId, reason },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class OrderCancelApprovedEvent extends BaseDomainEvent<
  'order.cancel.approved',
  { cancelId: string; orderId: string }
> {
  constructor(aggregateId: string, cancelId: string, orderId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'order.cancel.approved',
      aggregateId,
      aggregateType: AGG,
      payload: { cancelId, orderId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class OrderCancelRejectedEvent extends BaseDomainEvent<
  'order.cancel.rejected',
  { cancelId: string; orderId: string; reason: string }
> {
  constructor(aggregateId: string, cancelId: string, orderId: string, reason: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'order.cancel.rejected',
      aggregateId,
      aggregateType: AGG,
      payload: { cancelId, orderId, reason },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class OrderCancelCompletedEvent extends BaseDomainEvent<
  'order.cancel.completed',
  { cancelId: string; orderId: string }
> {
  constructor(aggregateId: string, cancelId: string, orderId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'order.cancel.completed',
      aggregateId,
      aggregateType: AGG,
      payload: { cancelId, orderId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}
