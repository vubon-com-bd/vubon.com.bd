/**
 * SLA Domain Events
 * @module support-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp, type Timestamp } from '@vubon/shared-types/common';
import { SlaIdVO } from '../value-objects/primitives/sla-id.vo';
import { TicketIdVO } from '../value-objects/primitives/ticket-id.vo';

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

export interface SlaBreachedPayload {
  readonly ticketId: string;
  readonly type: string;
  readonly targetMinutes: number;
  readonly actualMinutes: number;
}

export class SlaBreachedEvent extends BaseDomainEvent<
  'support.sla.breached',
  SlaBreachedPayload
> {
  constructor(
    id: SlaIdVO,
    ticketId: TicketIdVO,
    type: string,
    targetMinutes: number,
    actualMinutes: number,
    occurredAt: number,
    version = 1,
  ) {
    super({
      ...meta(id.value, 'sla', version, occurredAt),
      type: 'support.sla.breached',
      payload: { ticketId: ticketId.value, type, targetMinutes, actualMinutes },
    });
  }
}

export interface SlaWarningPayload {
  readonly ticketId: string;
  readonly remainingMinutes: number;
}

export class SlaWarningEvent extends BaseDomainEvent<
  'support.sla.warning',
  SlaWarningPayload
> {
  constructor(
    id: SlaIdVO,
    ticketId: TicketIdVO,
    remainingMinutes: number,
    occurredAt: number,
    version = 1,
  ) {
    super({
      ...meta(id.value, 'sla', version, occurredAt),
      type: 'support.sla.warning',
      payload: { ticketId: ticketId.value, remainingMinutes },
    });
  }
}

export interface SlaMetPayload {
  readonly ticketId: string;
  readonly type: string;
  readonly actualMinutes: number;
}

export class SlaMetEvent extends BaseDomainEvent<
  'support.sla.met',
  SlaMetPayload
> {
  constructor(
    id: SlaIdVO,
    ticketId: TicketIdVO,
    type: string,
    actualMinutes: number,
    occurredAt: number,
    version = 1,
  ) {
    super({
      ...meta(id.value, 'sla', version, occurredAt),
      type: 'support.sla.met',
      payload: { ticketId: ticketId.value, type, actualMinutes },
    });
  }
}
