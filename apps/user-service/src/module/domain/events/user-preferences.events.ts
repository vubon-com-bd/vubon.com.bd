import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'UserPreferences';

export class PreferenceUpdatedEvent extends BaseDomainEvent<
  'user.preference.updated',
  { userId: string; key: string }
> {
  constructor(aggregateId: string, userId: string, key: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'user.preference.updated',
      aggregateId,
      aggregateType: AGG,
      payload: { userId, key },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}
