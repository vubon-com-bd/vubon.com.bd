/**
 * Ticket Domain Events
 * @module support-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp, type Timestamp } from '@vubon/shared-types/common';
import { TicketIdVO } from '../value-objects/primitives/ticket-id.vo';
import { TicketStatusVO } from '../value-objects/primitives/ticket-status.vo';
import { TicketPriorityVO } from '../value-objects/primitives/ticket-priority.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { AgentIdVO } from '../value-objects/primitives/agent-id.vo';

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

export interface TicketCreatedPayload {
  readonly userId: string;
  readonly priority: string;
  readonly status: string;
}

export class TicketCreatedEvent extends BaseDomainEvent<
  'support.ticket.created',
  TicketCreatedPayload
> {
  constructor(
    public readonly ticketId: TicketIdVO,
    userId: UserIdVO,
    priority: TicketPriorityVO,
    status: TicketStatusVO,
    occurredAt: number,
    version = 1,
  ) {
    super({
      ...meta(ticketId.value, 'ticket', version, occurredAt),
      type: 'support.ticket.created',
      payload: {
        userId: userId.value,
        priority: priority.value,
        status: status.value,
      },
    });
  }
}

export interface TicketUpdatedPayload {
  readonly fields: readonly string[];
}

export class TicketUpdatedEvent extends BaseDomainEvent<
  'support.ticket.updated',
  TicketUpdatedPayload
> {
  constructor(
    ticketId: TicketIdVO,
    fields: readonly string[],
    occurredAt: number,
    version = 1,
  ) {
    super({
      ...meta(ticketId.value, 'ticket', version, occurredAt),
      type: 'support.ticket.updated',
      payload: { fields: [...fields] },
    });
  }
}

export interface TicketAssignedPayload {
  readonly agentId: string;
}

export class TicketAssignedEvent extends BaseDomainEvent<
  'support.ticket.assigned',
  TicketAssignedPayload
> {
  constructor(
    ticketId: TicketIdVO,
    agentId: AgentIdVO,
    occurredAt: number,
    version = 1,
  ) {
    super({
      ...meta(ticketId.value, 'ticket', version, occurredAt),
      type: 'support.ticket.assigned',
      payload: { agentId: agentId.value },
    });
  }
}

export interface TicketStatusChangedPayload {
  readonly from: string;
  readonly to: string;
}

export class TicketStatusChangedEvent extends BaseDomainEvent<
  'support.ticket.status_changed',
  TicketStatusChangedPayload
> {
  constructor(
    ticketId: TicketIdVO,
    from: TicketStatusVO,
    to: TicketStatusVO,
    occurredAt: number,
    version = 1,
  ) {
    super({
      ...meta(ticketId.value, 'ticket', version, occurredAt),
      type: 'support.ticket.status_changed',
      payload: { from: from.value, to: to.value },
    });
  }
}

export interface TicketPriorityChangedPayload {
  readonly from: string;
  readonly to: string;
}

export class TicketPriorityChangedEvent extends BaseDomainEvent<
  'support.ticket.priority_changed',
  TicketPriorityChangedPayload
> {
  constructor(
    ticketId: TicketIdVO,
    from: TicketPriorityVO,
    to: TicketPriorityVO,
    occurredAt: number,
    version = 1,
  ) {
    super({
      ...meta(ticketId.value, 'ticket', version, occurredAt),
      type: 'support.ticket.priority_changed',
      payload: { from: from.value, to: to.value },
    });
  }
}

export class TicketResolvedEvent extends BaseDomainEvent<
  'support.ticket.resolved',
  { readonly resolvedAt: number }
> {
  constructor(ticketId: TicketIdVO, occurredAt: number, version = 1) {
    super({
      ...meta(ticketId.value, 'ticket', version, occurredAt),
      type: 'support.ticket.resolved',
      payload: { resolvedAt: occurredAt },
    });
  }
}

export class TicketClosedEvent extends BaseDomainEvent<
  'support.ticket.closed',
  { readonly closedAt: number }
> {
  constructor(ticketId: TicketIdVO, occurredAt: number, version = 1) {
    super({
      ...meta(ticketId.value, 'ticket', version, occurredAt),
      type: 'support.ticket.closed',
      payload: { closedAt: occurredAt },
    });
  }
}

export class TicketReopenedEvent extends BaseDomainEvent<
  'support.ticket.reopened',
  { readonly reopenedAt: number }
> {
  constructor(ticketId: TicketIdVO, occurredAt: number, version = 1) {
    super({
      ...meta(ticketId.value, 'ticket', version, occurredAt),
      type: 'support.ticket.reopened',
      payload: { reopenedAt: occurredAt },
    });
  }
}
