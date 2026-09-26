import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

export class AutomationTriggeredEvent extends BaseDomainEvent<
  'marketing.automation.triggered',
  { automationId: string; trigger: string }
> {
  constructor(aggregateId: string, trigger: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'marketing.automation.triggered',
      aggregateId,
      aggregateType: 'MarketingAutomation',
      payload: { automationId: aggregateId, trigger },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class WorkflowExecutedEvent extends BaseDomainEvent<
  'marketing.workflow.executed',
  { workflowId: string; automationId: string }
> {
  constructor(aggregateId: string, automationId: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'marketing.workflow.executed',
      aggregateId,
      aggregateType: 'MarketingWorkflow',
      payload: { workflowId: aggregateId, automationId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
