import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE = 'Tracking';

export class TrackingCreatedEvent extends BaseDomainEvent<
  'logistics.tracking.created',
  { trackingId: string; trackingNumber: string; shipmentId: string }
> {
  constructor(aggregateId: string, trackingId: string, trackingNumber: string, shipmentId: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'logistics.tracking.created',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { trackingId, trackingNumber, shipmentId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class TrackingUpdatedEvent extends BaseDomainEvent<
  'logistics.tracking.updated',
  { trackingId: string; status: string; location: string | null }
> {
  constructor(aggregateId: string, trackingId: string, status: string, location: string | null, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'logistics.tracking.updated',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { trackingId, status, location },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
