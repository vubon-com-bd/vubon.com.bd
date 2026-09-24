import { BaseDomainEvent, type DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE = 'TicketSatisfaction';

export class SatisfactionSubmittedEvent extends BaseDomainEvent<
  'support.satisfaction.submitted',
  { ticketId: string; score: number }
> {
  constructor(aggregateId: string, ticketId: string, score: number, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'support.satisfaction.submitted',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { ticketId, score },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
