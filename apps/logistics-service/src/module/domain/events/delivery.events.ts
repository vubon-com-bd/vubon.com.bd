import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE = 'Delivery';

export class DeliveryScheduledEvent extends BaseDomainEvent<
  'logistics.delivery.scheduled',
  { deliveryId: string; shipmentId: string; scheduledAt: string }
> {
  constructor(aggregateId: string, deliveryId: string, shipmentId: string, scheduledAt: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'logistics.delivery.scheduled',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { deliveryId, shipmentId, scheduledAt },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class DeliveryAttemptedEvent extends BaseDomainEvent<
  'logistics.delivery.attempted',
  { deliveryId: string; attemptNo: number; status: string }
> {
  constructor(aggregateId: string, deliveryId: string, attemptNo: number, status: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'logistics.delivery.attempted',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { deliveryId, attemptNo, status },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class DeliveryCompletedEvent extends BaseDomainEvent<
  'logistics.delivery.completed',
  { deliveryId: string; shipmentId: string }
> {
  constructor(aggregateId: string, deliveryId: string, shipmentId: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'logistics.delivery.completed',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { deliveryId, shipmentId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class DeliveryFailedEvent extends BaseDomainEvent<
  'logistics.delivery.failed',
  { deliveryId: string; shipmentId: string; reason: string }
> {
  constructor(aggregateId: string, deliveryId: string, shipmentId: string, reason: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'logistics.delivery.failed',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { deliveryId, shipmentId, reason },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
