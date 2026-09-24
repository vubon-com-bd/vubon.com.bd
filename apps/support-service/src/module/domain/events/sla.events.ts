import { BaseDomainEvent, type DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE = 'Sla';

export class SlaBreachedEvent extends BaseDomainEvent<
  'support.sla.breached',
  { slaId: string; ticketId: string }
> {
  constructor(aggregateId: string, ticketId: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'support.sla.breached',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { slaId: aggregateId, ticketId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class SlaMetEvent extends BaseDomainEvent<
  'support.sla.met',
  { slaId: string; ticketId: string }
> {
  constructor(aggregateId: string, ticketId: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'support.sla.met',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { slaId: aggregateId, ticketId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class SlaWarningEvent extends BaseDomainEvent<
  'support.sla.warning',
  { slaId: string; ticketId: string }
> {
  constructor(aggregateId: string, ticketId: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'support.sla.warning',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { slaId: aggregateId, ticketId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
