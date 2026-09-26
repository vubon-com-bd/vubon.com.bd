/**
 * Ticket Escalation Domain Events
 * @module support-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp, type Timestamp } from '@vubon/shared-types/common';
import { TicketEscalationIdVO } from '../value-objects/primitives/ticket-escalation-id.vo';
import { TicketIdVO } from '../value-objects/primitives/ticket-id.vo';
import { TicketEscalationLevelVO } from '../value-objects/primitives/ticket-escalation-level.vo';

interface MetaFields {
  readonly id: string;
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly occurredAt: Timestamp;
  readonly version: number;
}

const meta = (
  aggregateId: string,
  aggregateType: string,
  version: number,
  occurredAt: number,
): MetaFields => ({
  id: `${aggregateId}-${version}-${occurredAt}`,
  aggregateId,
  aggregateType,
  occurredAt: toTimestamp(occurredAt),
  version,
});

export interface TicketEscalatedPayload {
  readonly ticketId: string;
  readonly level: string;
  readonly reason: string;
}

export class TicketEscalatedEvent extends BaseDomainEvent<
  'support.ticket.escalated',
  TicketEscalatedPayload
> {
  constructor(
    escalationId: TicketEscalationIdVO,
    ticketId: TicketIdVO,
    level: TicketEscalationLevelVO,
    reason: string,
    occurredAt: number,
    version = 1,
  ) {
    super({
      ...meta(escalationId.value, 'ticket-escalation', version, occurredAt),
      type: 'support.ticket.escalated',
      payload: { ticketId: ticketId.value, level: level.value, reason },
    });
  }
}

export interface EscalationResolvedPayload {
  readonly resolution: string;
}

export class EscalationResolvedEvent extends BaseDomainEvent<
  'support.ticket.escalation_resolved',
  EscalationResolvedPayload
> {
  constructor(
    escalationId: TicketEscalationIdVO,
    resolution: string,
    occurredAt: number,
    version = 1,
  ) {
    super({
      ...meta(escalationId.value, 'ticket-escalation', version, occurredAt),
      type: 'support.ticket.escalation_resolved',
      payload: { resolution },
    });
  }
}
