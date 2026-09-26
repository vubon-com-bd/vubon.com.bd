/**
 * Support Rule Domain Events
 * @module support-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp, type Timestamp } from '@vubon/shared-types/common';
import { RuleIdVO } from '../value-objects/primitives/rule-id.vo';

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

export interface RuleTriggeredPayload {
  readonly context: Readonly<Record<string, string | number>>;
  readonly action: string;
}

export class RuleTriggeredEvent extends BaseDomainEvent<
  'support.rule.triggered',
  RuleTriggeredPayload
> {
  constructor(
    id: RuleIdVO,
    context: Readonly<Record<string, string | number>>,
    action: string,
    occurredAt: number,
    version = 1,
  ) {
    super({
      ...meta(id.value, 'support-rule', version, occurredAt),
      type: 'support.rule.triggered',
      payload: { context, action },
    });
  }
}
