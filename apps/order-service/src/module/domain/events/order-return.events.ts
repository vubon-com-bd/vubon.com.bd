import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'OrderReturn';

export class OrderReturnRequestedEvent extends BaseDomainEvent<
  'order.return.requested',
  { returnId: string; orderId: string; reason: string }
> {
  constructor(aggregateId: string, returnId: string, orderId: string, reason: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'order.return.requested',
      aggregateId,
      aggregateType: AGG,
      payload: { returnId, orderId, reason },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class OrderReturnApprovedEvent extends BaseDomainEvent<
  'order.return.approved',
  { returnId: string; orderId: string }
> {
  constructor(aggregateId: string, returnId: string, orderId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'order.return.approved',
      aggregateId,
      aggregateType: AGG,
      payload: { returnId, orderId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class OrderReturnRejectedEvent extends BaseDomainEvent<
  'order.return.rejected',
  { returnId: string; orderId: string; reason: string }
> {
  constructor(aggregateId: string, returnId: string, orderId: string, reason: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'order.return.rejected',
      aggregateId,
      aggregateType: AGG,
      payload: { returnId, orderId, reason },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class OrderReturnCompletedEvent extends BaseDomainEvent<
  'order.return.completed',
  { returnId: string; orderId: string }
> {
  constructor(aggregateId: string, returnId: string, orderId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'order.return.completed',
      aggregateId,
      aggregateType: AGG,
      payload: { returnId, orderId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}
