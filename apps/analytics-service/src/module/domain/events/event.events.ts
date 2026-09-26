import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'Event';

export class EventReceivedEvent extends BaseDomainEvent<
  'analytics.event.received',
  { eventId: string; name: string; source: string }
> {
  constructor(
    aggregateId: string,
    eventId: string,
    name: string,
    source: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'analytics.event.received',
      aggregateId,
      aggregateType: AGG,
      payload: { eventId, name, source },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class EventProcessedEvent extends BaseDomainEvent<
  'analytics.event.processed',
  { eventId: string; name: string }
> {
  constructor(
    aggregateId: string,
    eventId: string,
    name: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'analytics.event.processed',
      aggregateId,
      aggregateType: AGG,
      payload: { eventId, name },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
