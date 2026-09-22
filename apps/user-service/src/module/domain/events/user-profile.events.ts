import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'UserProfile';

export class ProfileCreatedEvent extends BaseDomainEvent<
  'user.profile.created',
  { userId: string }
> {
  constructor(aggregateId: string, userId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'user.profile.created',
      aggregateId,
      aggregateType: AGG,
      payload: { userId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class ProfileUpdatedEvent extends BaseDomainEvent<
  'user.profile.updated',
  { userId: string; fields: readonly string[] }
> {
  constructor(aggregateId: string, userId: string, fields: readonly string[], version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'user.profile.updated',
      aggregateId,
      aggregateType: AGG,
      payload: { userId, fields },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}
