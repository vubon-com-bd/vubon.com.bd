import { BaseDomainEvent, type DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

const AGGREGATE_TYPE = 'Preference';

export class PreferenceUpdatedEvent extends BaseDomainEvent<'preference.updated', { userId: string; channel: string; optedIn: boolean }> {
  constructor(aggregateId: string, userId: UserIdVO, channel: string, optedIn: boolean, version = 0, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'preference.updated',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { userId: userId.value, channel, optedIn },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class UnsubscribeEvent extends BaseDomainEvent<'preference.unsubscribed', { userId: string; channel: string; reason: string | null }> {
  constructor(aggregateId: string, userId: UserIdVO, channel: string, reason: string | null, version = 0, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'preference.unsubscribed',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { userId: userId.value, channel, reason },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
