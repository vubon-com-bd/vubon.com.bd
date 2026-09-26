/**
 * Auth Session Domain Events
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

const AGG = 'AuthSession';

export class SessionCreatedEvent extends BaseDomainEvent<
  'auth.session.created',
  { sessionId: string; userId: UserId; ipAddress: string }
> {
  constructor(
    aggregateId: string,
    payload: { sessionId: string; userId: UserId; ipAddress: string },
    occurredAt: Timestamp,
    metadata?: EventMeta,
  ) {
    super({
      id: `evt-${aggregateId}-created-${Date.now()}`,
      type: 'auth.session.created',
      aggregateId,
      aggregateType: AGG,
      payload,
      occurredAt,
      version: 1,
      metadata,
    });
  }
}

export class SessionExpiredEvent extends BaseDomainEvent<
  'auth.session.expired',
  { sessionId: string; userId: UserId; expiredAt: number }
> {
  constructor(
    aggregateId: string,
    payload: { sessionId: string; userId: UserId; expiredAt: number },
    occurredAt: Timestamp,
    metadata?: EventMeta,
  ) {
    super({
      id: `evt-${aggregateId}-expired-${Date.now()}`,
      type: 'auth.session.expired',
      aggregateId,
      aggregateType: AGG,
      payload,
      occurredAt,
      version: 1,
      metadata,
    });
  }
}

export class SessionRevokedEvent extends BaseDomainEvent<
  'auth.session.revoked',
  { sessionId: string; userId: UserId; reason?: string }
> {
  constructor(
    aggregateId: string,
    payload: { sessionId: string; userId: UserId; reason?: string },
    occurredAt: Timestamp,
    metadata?: EventMeta,
  ) {
    super({
      id: `evt-${aggregateId}-revoked-${Date.now()}`,
      type: 'auth.session.revoked',
      aggregateId,
      aggregateType: AGG,
      payload,
      occurredAt,
      version: 1,
      metadata,
    });
  }
}

export type AuthSessionDomainEvent =
  | SessionCreatedEvent
  | SessionExpiredEvent
  | SessionRevokedEvent;
