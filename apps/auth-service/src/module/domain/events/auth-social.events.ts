import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'AuthSocial';

export class SocialLinkedEvent extends BaseDomainEvent<
  'auth.social.linked',
  { userId: string; provider: string }
> {
  constructor(
    aggregateId: string,
    userId: string,
    provider: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'auth.social.linked',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { userId, provider },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class SocialUnlinkedEvent extends BaseDomainEvent<
  'auth.social.unlinked',
  { userId: string; provider: string }
> {
  constructor(
    aggregateId: string,
    userId: string,
    provider: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'auth.social.unlinked',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { userId, provider },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
