/**
 * Support Automation Domain Events
 * @module support-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp, type Timestamp } from '@vubon/shared-types/common';
import { AutomationIdVO } from '../value-objects/primitives/automation-id.vo';

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

export interface AutomationTriggeredPayload {
  readonly trigger: string;
  readonly outcome: 'success' | 'failure' | 'partial';
  readonly errorMessage?: string;
}

export class AutomationTriggeredEvent extends BaseDomainEvent<
  'support.automation.triggered',
  AutomationTriggeredPayload
> {
  constructor(
    id: AutomationIdVO,
    trigger: string,
    outcome: 'success' | 'failure' | 'partial',
    occurredAt: number,
    errorMessage?: string,
    version = 1,
  ) {
    super({
      ...meta(id.value, 'support-automation', version, occurredAt),
      type: 'support.automation.triggered',
      payload: { trigger, outcome, errorMessage },
    });
  }
}
