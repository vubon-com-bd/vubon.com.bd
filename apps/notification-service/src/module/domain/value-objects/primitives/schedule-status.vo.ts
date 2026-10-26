/**
 * ScheduleStatus Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_SCHEDULE_STATUS } from '@vubon/shared-constants/platform';
import { InvalidScheduleStatusError } from '@domain/errors/schedule.errors.js';

export type ScheduleStatusValue =
  (typeof NOTIFICATION_SCHEDULE_STATUS)[keyof typeof NOTIFICATION_SCHEDULE_STATUS];

const ALLOWED = Object.values(NOTIFICATION_SCHEDULE_STATUS) as readonly string[];

const VALID_TRANSITIONS: Readonly<Record<string, readonly string[]>> = {
  pending: ['active', 'cancelled'],
  active: ['paused', 'completed', 'cancelled', 'failed'],
  paused: ['active', 'cancelled'],
  completed: [],
  cancelled: [],
  failed: ['pending', 'cancelled'],
};

export class ScheduleStatusVO extends BaseStatusVO<ScheduleStatusValue> {
  private constructor(value: ScheduleStatusValue) {
    super(value);
  }

  static create(raw: string): ScheduleStatusVO {
    if (typeof raw !== 'string') {
      throw new InvalidScheduleStatusError(String(raw), ALLOWED);
    }
    const normalized = raw.trim().toLowerCase();
    if (!ALLOWED.includes(normalized)) {
      throw new InvalidScheduleStatusError(normalized, ALLOWED);
    }
    return new ScheduleStatusVO(normalized as ScheduleStatusValue);
  }

  static reconstitute(raw: string): ScheduleStatusVO {
    return new ScheduleStatusVO(raw as ScheduleStatusValue);
  }

  static pending(): ScheduleStatusVO { return new ScheduleStatusVO(NOTIFICATION_SCHEDULE_STATUS.PENDING); }
  static active(): ScheduleStatusVO { return new ScheduleStatusVO(NOTIFICATION_SCHEDULE_STATUS.ACTIVE); }
  static paused(): ScheduleStatusVO { return new ScheduleStatusVO(NOTIFICATION_SCHEDULE_STATUS.PAUSED); }
  static completed(): ScheduleStatusVO { return new ScheduleStatusVO(NOTIFICATION_SCHEDULE_STATUS.COMPLETED); }
  static cancelled(): ScheduleStatusVO { return new ScheduleStatusVO(NOTIFICATION_SCHEDULE_STATUS.CANCELLED); }
  static failed(): ScheduleStatusVO { return new ScheduleStatusVO(NOTIFICATION_SCHEDULE_STATUS.FAILED); }

  isPending(): boolean { return this.value === NOTIFICATION_SCHEDULE_STATUS.PENDING; }
  isActive(): boolean { return this.value === NOTIFICATION_SCHEDULE_STATUS.ACTIVE; }
  isPaused(): boolean { return this.value === NOTIFICATION_SCHEDULE_STATUS.PAUSED; }
  isCompleted(): boolean { return this.value === NOTIFICATION_SCHEDULE_STATUS.COMPLETED; }
  isCancelled(): boolean { return this.value === NOTIFICATION_SCHEDULE_STATUS.CANCELLED; }
  isFailed(): boolean { return this.value === NOTIFICATION_SCHEDULE_STATUS.FAILED; }

  isTerminal(): boolean {
    return this.isCompleted() || this.isCancelled();
  }

  isRunnable(): boolean {
    return this.isActive();
  }

  canTransitionTo(target: string): boolean {
    return (VALID_TRANSITIONS[this.value] ?? []).includes(target);
  }
}
