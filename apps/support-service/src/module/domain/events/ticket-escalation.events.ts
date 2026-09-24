import { BaseDomainEvent, type DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE = 'TicketEscalation';

export class TicketEscalatedEvent extends BaseDomainEvent<
  'support.ticket.escalated',
  { ticketId: string; level: string; reason: string }
> {
  constructor(aggregateId: string, ticketId: string, level: string, reason: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'support.ticket.escalated',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { ticketId, level, reason },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class EscalationResolvedEvent extends BaseDomainEvent<
  'support.escalation.resolved',
  { ticketId: string }
> {
  constructor(aggregateId: string, ticketId: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'support.escalation.resolved',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { ticketId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
