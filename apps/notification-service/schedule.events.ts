import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';
import { ScheduleIdVO } from '../value-objects/primitives/schedule-id.vo';

const AGGREGATE_TYPE = 'Schedule';

export class ScheduleCreatedEvent extends BaseDomainEvent<
  'schedule.created',
  { scheduleId: string; nextRunAt: string }
> {
  constructor(
    aggregateId: string,
    scheduleId: ScheduleIdVO,
    nextRunAt: Date,
    version = 0,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'schedule.created',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: {
        scheduleId: scheduleId.value,
        nextRunAt: nextRunAt.toISOString(),
      },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class ScheduleTriggeredEvent extends BaseDomainEvent<
  'schedule.triggered',
  { scheduleId: string; triggeredAt: string }
> {
  constructor(
    aggregateId: string,
    scheduleId: ScheduleIdVO,
    triggeredAt: Date,
    version = 0,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'schedule.triggered',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: {
        scheduleId: scheduleId.value,
        triggeredAt: triggeredAt.toISOString(),
      },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
