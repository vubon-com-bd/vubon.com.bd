/**
 * Auth Social Domain Events
 * @module auth-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { UserId, Timestamp } from '@vubon/shared-types/common';

type EventMeta = {
  correlationId?: string;
  causationId?: string;
  userId?: string;
  source?: string;
};

const AGG = 'AuthSocial';

export class SocialLinkedEvent extends BaseDomainEvent<
  'auth.social.linked',
  { userId: UserId; provider: string; providerUserId: string }
> {
  constructor(
    aggregateId: string,
    payload: { userId: UserId; provider: string; providerUserId: string },
    occurredAt: Timestamp,
    metadata?: EventMeta,
  ) {
    super({
      id: `evt-${aggregateId}-link-${Date.now()}`,
      type: 'auth.social.linked',
      aggregateId,
      aggregateType: AGG,
      payload,
      occurredAt,
      version: 1,
      metadata,
    });
  }
}

export class SocialUnlinkedEvent extends BaseDomainEvent<
  'auth.social.unlinked',
  { userId: UserId; provider: string }
> {
  constructor(
    aggregateId: string,
    payload: { userId: UserId; provider: string },
    occurredAt: Timestamp,
    metadata?: EventMeta,
  ) {
    super({
      id: `evt-${aggregateId}-unlink-${Date.now()}`,
      type: 'auth.social.unlinked',
      aggregateId,
      aggregateType: AGG,
      payload,
      occurredAt,
      version: 1,
      metadata,
    });
  }
}

export type AuthSocialDomainEvent =
  | SocialLinkedEvent
  | SocialUnlinkedEvent;
