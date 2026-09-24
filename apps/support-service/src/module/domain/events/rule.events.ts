import { BaseDomainEvent, type DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE = 'SupportRule';

export class RuleTriggeredEvent extends BaseDomainEvent<
  'support.rule.triggered',
  { ruleId: string; ticketId: string }
> {
  constructor(aggregateId: string, ticketId: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'support.rule.triggered',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { ruleId: aggregateId, ticketId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
