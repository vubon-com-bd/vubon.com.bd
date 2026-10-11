/**
 * ScheduleEntity — scheduled / recurring notification
 * @module notification-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { NOTIFICATION_SCHEDULE } from '@vubon/shared-constants/platform/notification';

import { ScheduleIdVO } from '../value-objects/primitives/schedule-id.vo.js';
import { ScheduleTypeVO } from '../value-objects/primitives/schedule-type.vo.js';
import { ScheduleStatusVO } from '../value-objects/primitives/schedule-status.vo.js';
import { ScheduleRecurrenceVO } from '../value-objects/primitives/schedule-recurrence.vo.js';

import {
  ScheduleCreatedEvent,
  ScheduleActivatedEvent,
  SchedulePausedEvent,
  ScheduleResumedEvent,
  ScheduleTriggeredEvent,
  ScheduleCompletedEvent,
  ScheduleCancelledEvent,
  ScheduleFailedEvent,
} from '../events/schedule.events.js';

export interface ScheduleEntityProps {
  readonly type: ScheduleTypeVO;
  readonly status: ScheduleStatusVO;
  readonly recurrence: ScheduleRecurrenceVO;
  readonly scheduledAt: string;
  readonly timezone: string;
  readonly nextOccurrenceAt?: string;
  readonly occurrenceCount: number;
  readonly maxOccurrences?: number;
  readonly notificationTemplateId?: string;
  readonly userId?: string;
  readonly createdBy: string;
  readonly lastFailureReason?: string;
}

export class ScheduleEntity extends AggregateRoot<string> {
  private _status: ScheduleStatusVO;
  private _scheduledAt: string;
  private _nextOccurrenceAt?: string;
  private _occurrenceCount: number;
  private _lastTriggeredAt?: string;
  private _lastFailureReason?: string;

  private readonly _type: ScheduleTypeVO;
  private readonly _recurrence: ScheduleRecurrenceVO;
  private readonly _timezone: string;
  private readonly _maxOccurrences?: number;
  private readonly _notificationTemplateId?: string;
  private readonly _userId?: string;
  private readonly _createdBy: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: ScheduleEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._type = props.type;
    this._status = props.status;
    this._recurrence = props.recurrence;
    this._scheduledAt = props.scheduledAt;
    this._timezone = props.timezone;
    this._nextOccurrenceAt = props.nextOccurrenceAt;
    this._occurrenceCount = props.occurrenceCount;
    this._maxOccurrences = props.maxOccurrences;
    this._notificationTemplateId = props.notificationTemplateId;
    this._userId = props.userId;
    this._createdBy = props.createdBy;
    this._lastFailureReason = props.lastFailureReason;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!this._scheduledAt || this._scheduledAt.length === 0) {
      throw new ValidationError('scheduledAt is required', 'scheduledAt');
    }
    if (this._type.requiresRecurrence() && this._recurrence.isNone()) {
      throw new ValidationError(
        'Recurring schedule requires a recurrence pattern',
        'recurrence',
      );
    }
    if (this._occurrenceCount < 0) {
      throw new ValidationError('occurrenceCount cannot be negative', 'occurrenceCount');
    }
  }

  get type(): ScheduleTypeVO { return this._type; }
  get status(): ScheduleStatusVO { return this._status; }
  get recurrence(): ScheduleRecurrenceVO { return this._recurrence; }
  get scheduledAt(): string { return this._scheduledAt; }
  get timezone(): string { return this._timezone; }
  get nextOccurrenceAt(): string | undefined { return this._nextOccurrenceAt; }
  get occurrenceCount(): number { return this._occurrenceCount; }
  get maxOccurrences(): number | undefined { return this._maxOccurrences; }
  get notificationTemplateId(): string | undefined { return this._notificationTemplateId; }
  get userId(): string | undefined { return this._userId; }
  get createdBy(): string { return this._createdBy; }
  get lastTriggeredAt(): string | undefined { return this._lastTriggeredAt; }
  get lastFailureReason(): string | undefined { return this._lastFailureReason; }

  get toIdVO(): ScheduleIdVO { return ScheduleIdVO.reconstitute(this.id); }

  isRecurring(): boolean { return this._type.isRecurring(); }
  isActive(): boolean { return this._status.isActive(); }
  isPaused(): boolean { return this._status.isPaused(); }
  isFinal(): boolean { return this._status.isFinal(); }
  isRunnable(): boolean { return this._status.isRunnable(); }

  hasReachedMaxOccurrences(): boolean {
    if (this._maxOccurrences === undefined) return false;
    return this._occurrenceCount >= this._maxOccurrences;
  }

  // ═══ Business Methods ═══
  activate(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('active');
    const from = this._status.value;
    this._status = ScheduleStatusVO.active();
    this.addDomainEvent(
      new ScheduleActivatedEvent({
        aggregateId: this.id,
        payload: { scheduleId: this.id, activatedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  pause(reason?: string, now: string = new Date().toISOString()): void {
    if (!this._status.isActive()) {
      throw new BusinessRuleError(
        `Schedule "${this.id}" cannot be paused from status "${this._status.value}"`,
        'SCHEDULE_CANNOT_BE_PAUSED',
        { scheduleId: this.id, status: this._status.value },
      );
    }
    this.assertTransitionTo('paused');
    this._status = ScheduleStatusVO.paused();
    this.addDomainEvent(
      new SchedulePausedEvent({
        aggregateId: this.id,
        payload: { scheduleId: this.id, pausedAt: now, reason },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  resume(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('active');
    this._status = ScheduleStatusVO.active();
    this.addDomainEvent(
      new ScheduleResumedEvent({
        aggregateId: this.id,
        payload: { scheduleId: this.id, resumedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  trigger(
    triggeredNotificationId?: string,
    now: string = new Date().toISOString(),
  ): void {
    if (!this._status.isActive()) {
      throw new BusinessRuleError(
        `Schedule "${this.id}" cannot be triggered from status "${this._status.value}"`,
        'SCHEDULE_NOT_ACTIVE',
        { scheduleId: this.id, status: this._status.value },
      );
    }
    if (this.hasReachedMaxOccurrences()) {
      throw new BusinessRuleError(
        `Schedule "${this.id}" reached max occurrences`,
        'SCHEDULE_MAX_OCCURRENCES_REACHED',
        { scheduleId: this.id, occurrenceCount: this._occurrenceCount },
      );
    }
    this._occurrenceCount += 1;
    this._lastTriggeredAt = now;

    const interval = this._recurrence.intervalSeconds();
    if (this.isRecurring() && interval !== null) {
      const nextTs = new Date(new Date(now).getTime() + interval * 1000).toISOString();
      this._nextOccurrenceAt = nextTs;
    } else {
      this._nextOccurrenceAt = undefined;
    }

    this.addDomainEvent(
      new ScheduleTriggeredEvent({
        aggregateId: this.id,
        payload: {
          scheduleId: this.id,
          triggeredAt: now,
          triggeredNotificationId,
          occurrence: this._occurrenceCount,
        },
        version: this.version + 1,
      }),
    );

    if (this.hasReachedMaxOccurrences() || !this.isRecurring()) {
      this._status = ScheduleStatusVO.completed();
      this.addDomainEvent(
        new ScheduleCompletedEvent({
          aggregateId: this.id,
          payload: {
            scheduleId: this.id,
            completedAt: now,
            totalOccurrences: this._occurrenceCount,
          },
          version: this.version + 1,
        }),
      );
    }

    this.touch(now);
    this.incrementVersion();
  }

  complete(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('completed');
    this._status = ScheduleStatusVO.completed();
    this.addDomainEvent(
      new ScheduleCompletedEvent({
        aggregateId: this.id,
        payload: {
          scheduleId: this.id,
          completedAt: now,
          totalOccurrences: this._occurrenceCount,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  cancel(cancelledBy?: string, reason?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('cancelled');
    this._status = ScheduleStatusVO.cancelled();
    this.addDomainEvent(
      new ScheduleCancelledEvent({
        aggregateId: this.id,
        payload: { scheduleId: this.id, cancelledAt: now, cancelledBy, reason },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  fail(reason: string, errorCode?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('failed');
    this._status = ScheduleStatusVO.failed();
    this._lastFailureReason = reason;
    this.addDomainEvent(
      new ScheduleFailedEvent({
        aggregateId: this.id,
        payload: { scheduleId: this.id, failedAt: now, reason, errorCode },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid schedule transition: "${this._status.value}" → "${target}"`,
        'INVALID_SCHEDULE_STATUS_TRANSITION',
        { from: this._status.value, to: target, scheduleId: this.id },
      );
    }
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    props: Omit<
      ScheduleEntityProps,
      'status' | 'occurrenceCount' | 'nextOccurrenceAt'
    >;
    now: string;
  }): ScheduleEntity {
    const fullProps: ScheduleEntityProps = {
      ...params.props,
      status: ScheduleStatusVO.pending(),
      occurrenceCount: 0,
    };
    const entity = new ScheduleEntity(params.id, params.now, params.now, fullProps);
    entity.addDomainEvent(
      new ScheduleCreatedEvent({
        aggregateId: params.id,
        payload: {
          scheduleId: params.id,
          type: params.props.type.value,
          recurrence: params.props.recurrence.value,
          scheduledAt: params.props.scheduledAt,
          userId: params.props.userId,
          notificationTemplateId: params.props.notificationTemplateId,
        },
        version: 1,
      }),
    );
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: ScheduleEntityProps;
    version?: number;
  }): ScheduleEntity {
    const entity = new ScheduleEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
