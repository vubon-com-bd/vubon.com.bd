/**
 * Session Domain Events
 * @module analytics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base';
import type { Timestamp } from '@vubon/shared-types/common';

export class SessionStartedEvent extends BaseDomainEvent<'analytics.session.started', {
  readonly sessionId: string;
  readonly userId?: string;
}> {
  constructor(sessionId: string, userId: string | undefined, occurredAt: string) {
    super({
      id: `session-started-${sessionId}-${Date.now()}`,
      type: 'analytics.session.started',
      aggregateId: sessionId,
      aggregateType: 'Session',
      payload: { sessionId, userId },
      occurredAt: occurredAt as unknown as Timestamp,
      version: 1,
    });
  }
}

export class SessionEndedEvent extends BaseDomainEvent<'analytics.session.ended', {
  readonly sessionId: string;
  readonly durationSeconds: number;
  readonly eventCount: number;
}> {
  constructor(
    sessionId: string,
    durationSeconds: number,
    eventCount: number,
    occurredAt: string
  ) {
    super({
      id: `session-ended-${sessionId}-${Date.now()}`,
      type: 'analytics.session.ended',
      aggregateId: sessionId,
      aggregateType: 'Session',
      payload: { sessionId, durationSeconds, eventCount },
      occurredAt: occurredAt as unknown as Timestamp,
      version: 2,
    });
  }
}
