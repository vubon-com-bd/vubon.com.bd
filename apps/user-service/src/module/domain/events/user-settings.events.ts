import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'UserSettings';

export class SettingsUpdatedEvent extends BaseDomainEvent<
  'user.settings.updated',
  { userId: string; keys: readonly string[] }
> {
  constructor(aggregateId: string, userId: string, keys: readonly string[], version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'user.settings.updated',
      aggregateId,
      aggregateType: AGG,
      payload: { userId, keys },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}
