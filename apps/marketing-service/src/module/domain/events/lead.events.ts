import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'Lead';

export class LeadCreatedEvent extends BaseDomainEvent<
  'marketing.lead.created',
  { leadId: string; email: string }
> {
  constructor(aggregateId: string, email: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'marketing.lead.created',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { leadId: aggregateId, email },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class LeadQualifiedEvent extends BaseDomainEvent<
  'marketing.lead.qualified',
  { leadId: string; score: number }
> {
  constructor(aggregateId: string, score: number, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'marketing.lead.qualified',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { leadId: aggregateId, score },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class LeadConvertedEvent extends BaseDomainEvent<
  'marketing.lead.converted',
  { leadId: string; userId: string }
> {
  constructor(aggregateId: string, userId: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'marketing.lead.converted',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { leadId: aggregateId, userId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class LeadLostEvent extends BaseDomainEvent<
  'marketing.lead.lost',
  { leadId: string; reason: string }
> {
  constructor(aggregateId: string, reason: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'marketing.lead.lost',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { leadId: aggregateId, reason },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
