/**
 * UserActivity domain events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';

interface EventParams<TPayload> {
  readonly id: string;
  readonly aggregateId: string;
  readonly payload: TPayload;
  readonly occurredAt: Timestamp;
  readonly version: number;
}

export interface UserActivityRecordedPayload {
  readonly userId: string;
  readonly activityId: string;
  readonly activityType: string;
  readonly timestamp: string;
}

export class UserActivityRecordedEvent extends BaseDomainEvent<
  'activity.recorded',
  UserActivityRecordedPayload
> {
  constructor(p: EventParams<UserActivityRecordedPayload>) {
    super({
      id: p.id,
      type: 'activity.recorded',
      aggregateId: p.aggregateId,
      aggregateType: 'UserActivity',
      payload: p.payload,
      occurredAt: p.occurredAt,
      version: p.version,
    });
  }
}

export interface UserStatsUpdatedPayload {
  readonly userId: string;
  readonly totalActivities: number;
  readonly lastActivityAt: string;
}

export class UserStatsUpdatedEvent extends BaseDomainEvent<
  'stats.updated',
  UserStatsUpdatedPayload
> {
  constructor(p: EventParams<UserStatsUpdatedPayload>) {
    super({
      id: p.id,
      type: 'stats.updated',
      aggregateId: p.aggregateId,
      aggregateType: 'UserActivity',
      payload: p.payload,
      occurredAt: p.occurredAt,
      version: p.version,
    });
  }
}
