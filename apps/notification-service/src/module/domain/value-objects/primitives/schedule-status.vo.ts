/**
 * ScheduleStatus Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_SCHEDULE_STATUS } from '@vubon/shared-constants/platform/notification';
import { InvalidScheduleStatusError } from '../../errors/schedule.errors.js';

const ALLOWED = Object.values(NOTIFICATION_SCHEDULE_STATUS) as readonly string[];

export class ScheduleStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ScheduleStatusVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidScheduleStatusError(raw, ALLOWED);
    }
    return new ScheduleStatusVO(raw);
  }

  static reconstitute(raw: string): ScheduleStatusVO {
    return new ScheduleStatusVO(raw);
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

  isFinal(): boolean {
    return this.isCompleted() || this.isCancelled();
  }

  isRunnable(): boolean {
    return this.isActive();
  }

  canTransitionTo(target: string): boolean {
    const transitions: Record<string, readonly string[]> = {
      [NOTIFICATION_SCHEDULE_STATUS.PENDING]: [
        NOTIFICATION_SCHEDULE_STATUS.ACTIVE,
        NOTIFICATION_SCHEDULE_STATUS.CANCELLED,
        NOTIFICATION_SCHEDULE_STATUS.FAILED,
      ],
      [NOTIFICATION_SCHEDULE_STATUS.ACTIVE]: [
        NOTIFICATION_SCHEDULE_STATUS.PAUSED,
        NOTIFICATION_SCHEDULE_STATUS.COMPLETED,
        NOTIFICATION_SCHEDULE_STATUS.CANCELLED,
        NOTIFICATION_SCHEDULE_STATUS.FAILED,
      ],
      [NOTIFICATION_SCHEDULE_STATUS.PAUSED]: [
        NOTIFICATION_SCHEDULE_STATUS.ACTIVE,
        NOTIFICATION_SCHEDULE_STATUS.CANCELLED,
      ],
      [NOTIFICATION_SCHEDULE_STATUS.COMPLETED]: [],
      [NOTIFICATION_SCHEDULE_STATUS.CANCELLED]: [],
      [NOTIFICATION_SCHEDULE_STATUS.FAILED]: [NOTIFICATION_SCHEDULE_STATUS.ACTIVE],
    };
    return (transitions[this.value] ?? []).includes(target);
  }
}
