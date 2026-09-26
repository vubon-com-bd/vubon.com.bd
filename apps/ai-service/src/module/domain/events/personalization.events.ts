import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'AiPersonalization';

export class PersonalizationAppliedEvent extends BaseDomainEvent<
  'ai.personalization.applied',
  { personalizationId: string; userId: string }
> {
  constructor(aggregateId: string, personalizationId: string, userId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'ai.personalization.applied',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { personalizationId, userId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class ProfileUpdatedEvent extends BaseDomainEvent<
  'ai.personalization.profile.updated',
  { userId: string }
> {
  constructor(aggregateId: string, userId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'ai.personalization.profile.updated',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { userId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}
