/* istanbul ignore file -- pure event declarations */
/**
 * Schedule Domain Events
 * @module notification-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { NOTIFICATION_AGGREGATE_TYPE, newEventId, nowTimestamp } from './event.helpers.js';

export const SCHEDULE_EVENT_TYPE = {
  CREATED: 'notification.schedule.created',
  ACTIVATED: 'notification.schedule.activated',
  PAUSED: 'notification.schedule.paused',
  RESUMED: 'notification.schedule.resumed',
  EXECUTED: 'notification.schedule.executed',
  COMPLETED: 'notification.schedule.completed',
  CANCELLED: 'notification.schedule.cancelled',
  FAILED: 'notification.schedule.failed',
} as const;

export interface ScheduleCreatedPayload {
  readonly scheduleId: string;
  readonly type: string;
  readonly frequency: string;
  readonly scheduledAt?: string;
  readonly createdAt: string;
}

export interface ScheduleActivatedPayload {
  readonly scheduleId: string;
  readonly activatedAt: string;
  readonly nextRunAt?: string;
}

export interface SchedulePausedPayload {
  readonly scheduleId: string;
  readonly reason?: string;
  readonly pausedAt: string;
}

export interface ScheduleResumedPayload {
  readonly scheduleId: string;
  readonly resumedAt: string;
  readonly nextRunAt?: string;
}

export interface ScheduleExecutedPayload {
  readonly scheduleId: string;
  readonly runCount: number;
  readonly executedAt: string;
  readonly recipientsProcessed: number;
}

export interface ScheduleCompletedPayload {
  readonly scheduleId: string;
  readonly completedAt: string;
  readonly totalRuns: number;
}

export interface ScheduleCancelledPayload {
  readonly scheduleId: string;
  readonly reason?: string;
  readonly cancelledAt: string;
}

export interface ScheduleFailedPayload {
  readonly scheduleId: string;
  readonly reason: string;
  readonly failedAt: string;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

function buildParams<TType extends string, TPayload>(
  type: TType,
  p: EventParams<TPayload>,
) {
  return {
    id: p.id ?? newEventId(),
    type,
    aggregateId: p.aggregateId,
    aggregateType: NOTIFICATION_AGGREGATE_TYPE.SCHEDULE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? nowTimestamp(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class ScheduleCreatedEvent extends BaseDomainEvent<
  typeof SCHEDULE_EVENT_TYPE.CREATED,
  ScheduleCreatedPayload
> {
  constructor(p: EventParams<ScheduleCreatedPayload>) {
    super(buildParams(SCHEDULE_EVENT_TYPE.CREATED, p));
  }
}

export class ScheduleActivatedEvent extends BaseDomainEvent<
  typeof SCHEDULE_EVENT_TYPE.ACTIVATED,
  ScheduleActivatedPayload
> {
  constructor(p: EventParams<ScheduleActivatedPayload>) {
    super(buildParams(SCHEDULE_EVENT_TYPE.ACTIVATED, p));
  }
}

export class SchedulePausedEvent extends BaseDomainEvent<
  typeof SCHEDULE_EVENT_TYPE.PAUSED,
  SchedulePausedPayload
> {
  constructor(p: EventParams<SchedulePausedPayload>) {
    super(buildParams(SCHEDULE_EVENT_TYPE.PAUSED, p));
  }
}

export class ScheduleResumedEvent extends BaseDomainEvent<
  typeof SCHEDULE_EVENT_TYPE.RESUMED,
  ScheduleResumedPayload
> {
  constructor(p: EventParams<ScheduleResumedPayload>) {
    super(buildParams(SCHEDULE_EVENT_TYPE.RESUMED, p));
  }
}

export class ScheduleExecutedEvent extends BaseDomainEvent<
  typeof SCHEDULE_EVENT_TYPE.EXECUTED,
  ScheduleExecutedPayload
> {
  constructor(p: EventParams<ScheduleExecutedPayload>) {
    super(buildParams(SCHEDULE_EVENT_TYPE.EXECUTED, p));
  }
}

export class ScheduleCompletedEvent extends BaseDomainEvent<
  typeof SCHEDULE_EVENT_TYPE.COMPLETED,
  ScheduleCompletedPayload
> {
  constructor(p: EventParams<ScheduleCompletedPayload>) {
    super(buildParams(SCHEDULE_EVENT_TYPE.COMPLETED, p));
  }
}

export class ScheduleCancelledEvent extends BaseDomainEvent<
  typeof SCHEDULE_EVENT_TYPE.CANCELLED,
  ScheduleCancelledPayload
> {
  constructor(p: EventParams<ScheduleCancelledPayload>) {
    super(buildParams(SCHEDULE_EVENT_TYPE.CANCELLED, p));
  }
}

export class ScheduleFailedEvent extends BaseDomainEvent<
  typeof SCHEDULE_EVENT_TYPE.FAILED,
  ScheduleFailedPayload
> {
  constructor(p: EventParams<ScheduleFailedPayload>) {
    super(buildParams(SCHEDULE_EVENT_TYPE.FAILED, p));
  }
}
