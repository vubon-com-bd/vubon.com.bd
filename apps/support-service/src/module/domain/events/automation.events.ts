import { BaseDomainEvent, type DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE = 'SupportAutomation';

export class AutomationTriggeredEvent extends BaseDomainEvent<
  'support.automation.triggered',
  { automationId: string; ticketId: string }
> {
  constructor(aggregateId: string, ticketId: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'support.automation.triggered',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { automationId: aggregateId, ticketId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
