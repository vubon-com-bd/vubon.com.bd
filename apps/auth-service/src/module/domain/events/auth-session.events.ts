import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'AuthSession';

export class SessionCreatedEvent extends BaseDomainEvent<
  'auth.session.created',
  { sessionId: string; userId: string; ip: string }
> {
  constructor(
    aggregateId: string,
    sessionId: string,
    userId: string,
    ip: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'auth.session.created',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { sessionId, userId, ip },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class SessionExpiredEvent extends BaseDomainEvent<
  'auth.session.expired',
  { sessionId: string; userId: string }
> {
  constructor(
    aggregateId: string,
    sessionId: string,
    userId: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'auth.session.expired',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { sessionId, userId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class SessionRevokedEvent extends BaseDomainEvent<
  'auth.session.revoked',
  { sessionId: string; userId: string; reason: string }
> {
  constructor(
    aggregateId: string,
    sessionId: string,
    userId: string,
    reason: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'auth.session.revoked',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { sessionId, userId, reason },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
