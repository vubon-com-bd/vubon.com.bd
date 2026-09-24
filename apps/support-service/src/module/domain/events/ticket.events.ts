import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE = 'Ticket';

export class TicketCreatedEvent extends BaseDomainEvent<
  'support.ticket.created',
  { ticketId: string; userId: string; priority: string }
> {
  constructor(
    aggregateId: string,
    userId: string,
    priority: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'support.ticket.created',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { ticketId: aggregateId, userId, priority },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class TicketUpdatedEvent extends BaseDomainEvent<
  'support.ticket.updated',
  { ticketId: string; fields: readonly string[] }
> {
  constructor(
    aggregateId: string,
    fields: readonly string[],
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'support.ticket.updated',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { ticketId: aggregateId, fields },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class TicketResolvedEvent extends BaseDomainEvent<
  'support.ticket.resolved',
  { ticketId: string; userId: string }
> {
  constructor(
    aggregateId: string,
    userId: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'support.ticket.resolved',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { ticketId: aggregateId, userId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class TicketClosedEvent extends BaseDomainEvent<
  'support.ticket.closed',
  { ticketId: string; userId: string }
> {
  constructor(
    aggregateId: string,
    userId: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'support.ticket.closed',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { ticketId: aggregateId, userId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
