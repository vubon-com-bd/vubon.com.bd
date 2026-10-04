/**
 * Auth Token Domain Events
 * @module auth-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';

type EventMeta = {
  correlationId?: string;
  causationId?: string;
  userId?: string;
  source?: string;
};

const AGG = 'AuthToken';

export class TokenGeneratedEvent extends BaseDomainEvent<
  'auth.token.generated',
  { tokenId: string; type: string; subjectId: string }
> {
  constructor(
    aggregateId: string,
    payload: { tokenId: string; type: string; subjectId: string },
    occurredAt: Timestamp,
    metadata?: EventMeta,
  ) {
    super({
      id: `evt-${aggregateId}-gen-${Date.now()}`,
      type: 'auth.token.generated',
      aggregateId,
      aggregateType: AGG,
      payload,
      occurredAt,
      version: 1,
      metadata,
    });
  }
}

export class TokenRefreshedEvent extends BaseDomainEvent<
  'auth.token.refreshed',
  { oldTokenId: string; newTokenId: string }
> {
  constructor(
    aggregateId: string,
    payload: { oldTokenId: string; newTokenId: string },
    occurredAt: Timestamp,
    metadata?: EventMeta,
  ) {
    super({
      id: `evt-${aggregateId}-refresh-${Date.now()}`,
      type: 'auth.token.refreshed',
      aggregateId,
      aggregateType: AGG,
      payload,
      occurredAt,
      version: 1,
      metadata,
    });
  }
}

export class TokenRevokedEvent extends BaseDomainEvent<
  'auth.token.revoked',
  { tokenId: string; subjectId: string }
> {
  constructor(
    aggregateId: string,
    payload: { tokenId: string; subjectId: string },
    occurredAt: Timestamp,
    metadata?: EventMeta,
  ) {
    super({
      id: `evt-${aggregateId}-revoked-${Date.now()}`,
      type: 'auth.token.revoked',
      aggregateId,
      aggregateType: AGG,
      payload,
      occurredAt,
      version: 1,
      metadata,
    });
  }
}

export type AuthTokenDomainEvent =
  | TokenGeneratedEvent
  | TokenRefreshedEvent
  | TokenRevokedEvent;
