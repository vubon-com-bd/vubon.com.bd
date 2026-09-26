/**
 * Ticket Satisfaction Domain Events
 * @module support-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp, type Timestamp } from '@vubon/shared-types/common';
import { TicketSatisfactionIdVO } from '../value-objects/primitives/ticket-satisfaction-id.vo';
import { TicketIdVO } from '../value-objects/primitives/ticket-id.vo';
import { SatisfactionScoreVO } from '../value-objects/primitives/satisfaction-score.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

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

export interface SatisfactionSubmittedPayload {
  readonly ticketId: string;
  readonly score: number;
  readonly userId: string;
  readonly hasComment: boolean;
}

export class SatisfactionSubmittedEvent extends BaseDomainEvent<
  'support.ticket.satisfaction_submitted',
  SatisfactionSubmittedPayload
> {
  constructor(
    id: TicketSatisfactionIdVO,
    ticketId: TicketIdVO,
    score: SatisfactionScoreVO,
    userId: UserIdVO,
    hasComment: boolean,
    occurredAt: number,
    version = 1,
  ) {
    super({
      ...meta(id.value, 'ticket-satisfaction', version, occurredAt),
      type: 'support.ticket.satisfaction_submitted',
      payload: {
        ticketId: ticketId.value,
        score: score.value,
        userId: userId.value,
        hasComment,
      },
    });
  }
}
