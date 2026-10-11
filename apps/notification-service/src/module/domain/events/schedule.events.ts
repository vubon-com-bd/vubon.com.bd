/**
 * Schedule domain events
 * @module notification-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { SCHEDULE_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const SCHEDULE_EVENT_TYPE = {
  CREATED: 'schedule.created',
  ACTIVATED: 'schedule.activated',
  PAUSED: 'schedule.paused',
  RESUMED: 'schedule.resumed',
  TRIGGERED: 'schedule.triggered',
  COMPLETED: 'schedule.completed',
  CANCELLED: 'schedule.cancelled',
  FAILED: 'schedule.failed',
} as const;

export interface ScheduleCreatedPayload {
  readonly scheduleId: string;
  readonly type: string;
  readonly recurrence: string;
  readonly scheduledAt: string;
  readonly userId?: string;
  readonly notificationTemplateId?: string;
}

export interface ScheduleActivatedPayload {
  readonly scheduleId: string;
  readonly activatedAt: string;
}

export interface SchedulePausedPayload {
  readonly scheduleId: string;
  readonly pausedAt: string;
  readonly reason?: string;
}

export interface ScheduleResumedPayload {
  readonly scheduleId: string;
  readonly resumedAt: string;
}

export interface ScheduleTriggeredPayload {
  readonly scheduleId: string;
  readonly triggeredAt: string;
  readonly triggeredNotificationId?: string;
  readonly occurrence: number;
}

export interface ScheduleCompletedPayload {
  readonly scheduleId: string;
  readonly completedAt: string;
  readonly totalOccurrences: number;
}

export interface ScheduleCancelledPayload {
  readonly scheduleId: string;
  readonly cancelledAt: string;
  readonly cancelledBy?: string;
  readonly reason?: string;
}

export interface ScheduleFailedPayload {
  readonly scheduleId: string;
  readonly failedAt: string;
  readonly reason: string;
  readonly errorCode?: string;
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
    aggregateType: SCHEDULE_AGGREGATE_TYPE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
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

export class ScheduleTriggeredEvent extends BaseDomainEvent<
  typeof SCHEDULE_EVENT_TYPE.TRIGGERED,
  ScheduleTriggeredPayload
> {
  constructor(p: EventParams<ScheduleTriggeredPayload>) {
    super(buildParams(SCHEDULE_EVENT_TYPE.TRIGGERED, p));
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
