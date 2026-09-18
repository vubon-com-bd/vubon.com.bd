import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'AuthToken';

export class TokenGeneratedEvent extends BaseDomainEvent<
  'auth.token.generated',
  { tokenId: string; userId: string; tokenType: string }
> {
  constructor(
    aggregateId: string,
    tokenId: string,
    userId: string,
    tokenType: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'auth.token.generated',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { tokenId, userId, tokenType },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class TokenRefreshedEvent extends BaseDomainEvent<
  'auth.token.refreshed',
  { tokenId: string; userId: string }
> {
  constructor(
    aggregateId: string,
    tokenId: string,
    userId: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'auth.token.refreshed',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { tokenId, userId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class TokenRevokedEvent extends BaseDomainEvent<
  'auth.token.revoked',
  { tokenId: string; userId: string }
> {
  constructor(
    aggregateId: string,
    tokenId: string,
    userId: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'auth.token.revoked',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { tokenId, userId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
