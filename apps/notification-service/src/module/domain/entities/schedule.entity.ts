/**
 * ScheduleEntity — AGGREGATE ROOT
 * @module notification-service/domain/entities
 *
 * State machine:
 *   pending → active → paused → active → completed
 *   pending/active/paused → cancelled
 *   active → failed → pending
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import type { ScheduleVO } from '@domain/composites/schedule.vo.js';
import type { ScheduleIdVO } from '@domain/primitives/schedule-id.vo.js';
import { ScheduleStatusVO } from '@domain/primitives/schedule-status.vo.js';

import {
  ScheduleCreatedEvent,
  ScheduleActivatedEvent,
  SchedulePausedEvent,
  ScheduleResumedEvent,
  ScheduleExecutedEvent,
  ScheduleCompletedEvent,
  ScheduleCancelledEvent,
  ScheduleFailedEvent,
} from '@domain/events/schedule.events.js';

export interface ScheduleEntityProps {
  readonly vo: ScheduleVO;
  readonly pausedAt?: string;
  readonly pausedReason?: string;
  readonly cancelledAt?: string;
  readonly cancelledBy?: string;
  readonly cancelledReason?: string;
  readonly failureReason?: string;
}

export class ScheduleEntity extends AggregateRoot<string> {
  private _vo: ScheduleVO;
  private _pausedAt?: string;
  private _pausedReason?: string;
  private _cancelledAt?: string;
  private _cancelledBy?: string;
  private _cancelledReason?: string;
  private _failureReason?: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: ScheduleEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = props.vo;
    this._pausedAt = props.pausedAt;
    this._pausedReason = props.pausedReason;
    this._cancelledAt = props.cancelledAt;
    this._cancelledBy = props.cancelledBy;
    this._cancelledReason = props.cancelledReason;
    this._failureReason = props.failureReason;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._vo.status.isCancelled() && !this._cancelledAt) {
      throw new ValidationError('Cancelled schedule requires cancelledAt', 'cancelledAt');
    }
    if (this._vo.status.isPaused() && !this._pausedAt) {
      throw new ValidationError('Paused schedule requires pausedAt', 'pausedAt');
    }
    if (this._vo.status.isFailed() && !this._failureReason) {
      throw new ValidationError('Failed schedule requires failureReason', 'failureReason');
    }
  }

  get vo(): ScheduleVO { return this._vo; }
  get scheduleId(): ScheduleIdVO { return this._vo.id; }
  get status(): ScheduleVO['status'] { return this._vo.status; }
  get runCount(): number { return this._vo.runCount; }
  get nextRunAt(): string | undefined { return this._vo.nextRunAt; }
  get lastRunAt(): string | undefined { return this._vo.lastRunAt; }
  get pausedAt(): string | undefined { return this._pausedAt; }
  get pausedReason(): string | undefined { return this._pausedReason; }
  get cancelledAt(): string | undefined { return this._cancelledAt; }
  get cancelledBy(): string | undefined { return this._cancelledBy; }
  get cancelledReason(): string | undefined { return this._cancelledReason; }
  get failureReason(): string | undefined { return this._failureReason; }

  isPending(): boolean { return this._vo.isPending(); }
  isActive(): boolean { return this._vo.isActive(); }
  isPaused(): boolean { return this._vo.isPaused(); }
  isCompleted(): boolean { return this._vo.isCompleted(); }
  isCancelled(): boolean { return this._vo.isCancelled(); }
  isFailed(): boolean { return this._vo.isFailed(); }
  isRunnable(): boolean { return this._vo.isRunnable(); }
  isTerminal(): boolean { return this._vo.isTerminal(); }

  activate(nextRunAt?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('active');
    this._vo = this._vo.withStatus(ScheduleStatusVO.active()).withNextRun(nextRunAt);
    this.addDomainEvent(
      new ScheduleActivatedEvent({
        aggregateId: this.id,
        payload: { scheduleId: this.id, activatedAt: now, nextRunAt },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  pause(reason?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('paused');
    this._vo = this._vo.withStatus(ScheduleStatusVO.paused());
    this._pausedAt = now;
    this._pausedReason = reason;
    this.addDomainEvent(
      new SchedulePausedEvent({
        aggregateId: this.id,
        payload: { scheduleId: this.id, reason, pausedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  resume(nextRunAt?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('active');
    this._vo = this._vo.withStatus(ScheduleStatusVO.active()).withNextRun(nextRunAt);
    this._pausedAt = undefined;
    this._pausedReason = undefined;
    this.addDomainEvent(
      new ScheduleResumedEvent({
        aggregateId: this.id,
        payload: { scheduleId: this.id, resumedAt: now, nextRunAt },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  recordExecution(recipientsProcessed: number, now: string = new Date().toISOString()): void {
    this._vo = this._vo.recordRun(now);
    this.addDomainEvent(
      new ScheduleExecutedEvent({
        aggregateId: this.id,
        payload: {
          scheduleId: this.id,
          runCount: this._vo.runCount,
          executedAt: now,
          recipientsProcessed,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  complete(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('completed');
    this._vo = this._vo.withStatus(ScheduleStatusVO.completed());
    this.addDomainEvent(
      new ScheduleCompletedEvent({
        aggregateId: this.id,
        payload: { scheduleId: this.id, completedAt: now, totalRuns: this._vo.runCount },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  cancel(
    reason?: string,
    cancelledBy?: string,
    now: string = new Date().toISOString(),
  ): void {
    this.assertTransitionTo('cancelled');
    this._vo = this._vo.withStatus(ScheduleStatusVO.cancelled());
    this._cancelledAt = now;
    this._cancelledBy = cancelledBy;
    this._cancelledReason = reason;
    this.addDomainEvent(
      new ScheduleCancelledEvent({
        aggregateId: this.id,
        payload: { scheduleId: this.id, reason, cancelledAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  fail(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('failed');
    this._vo = this._vo.withStatus(ScheduleStatusVO.failed());
    this._failureReason = reason;
    this.addDomainEvent(
      new ScheduleFailedEvent({
        aggregateId: this.id,
        payload: { scheduleId: this.id, reason, failedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  private assertTransitionTo(target: string): void {
    if (!this._vo.status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid schedule status transition: "${this._vo.status.value}" → "${target}"`,
        'INVALID_SCHEDULE_STATUS_TRANSITION',
        { from: this._vo.status.value, to: target, scheduleId: this.id },
      );
    }
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: ScheduleIdVO;
    vo: ScheduleVO;
    now: string;
  }): ScheduleEntity {
    if (!params.vo.status.isPending()) {
      throw new ValidationError('New schedule must be pending', 'status');
    }

    const entity = new ScheduleEntity(
      params.id.value,
      params.now,
      params.now,
      { vo: params.vo },
      null,
    );

    entity.addDomainEvent(
      new ScheduleCreatedEvent({
        aggregateId: params.id.value,
        payload: {
          scheduleId: params.id.value,
          type: params.vo.type.value,
          frequency: params.vo.frequency.value,
          scheduledAt: params.vo.time.scheduledAt,
          createdAt: params.now,
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
      params.deletedAt ?? null,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
