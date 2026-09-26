import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'Session';

export class SessionStartedEvent extends BaseDomainEvent<
  'analytics.session.started',
  { sessionId: string; userId: string | null; entryPage: string }
> {
  constructor(
    aggregateId: string,
    sessionId: string,
    userId: string | null,
    entryPage: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'analytics.session.started',
      aggregateId,
      aggregateType: AGG,
      payload: { sessionId, userId, entryPage },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class SessionEndedEvent extends BaseDomainEvent<
  'analytics.session.ended',
  { sessionId: string; durationSeconds: number; pageViews: number }
> {
  constructor(
    aggregateId: string,
    sessionId: string,
    durationSeconds: number,
    pageViews: number,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'analytics.session.ended',
      aggregateId,
      aggregateType: AGG,
      payload: { sessionId, durationSeconds, pageViews },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
