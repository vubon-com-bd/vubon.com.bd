/**
 * ScheduleType Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_SCHEDULE_TYPE } from '@vubon/shared-constants/platform';
import { InvalidScheduleTypeError } from '@domain/errors/schedule.errors.js';

export type ScheduleTypeValue =
  (typeof NOTIFICATION_SCHEDULE_TYPE)[keyof typeof NOTIFICATION_SCHEDULE_TYPE];

const ALLOWED = Object.values(NOTIFICATION_SCHEDULE_TYPE) as readonly string[];

export class ScheduleTypeVO extends BaseTypeVO<ScheduleTypeValue> {
  private constructor(value: ScheduleTypeValue) {
    super(value);
  }

  static create(raw: string): ScheduleTypeVO {
    if (typeof raw !== 'string') {
      throw new InvalidScheduleTypeError(String(raw), ALLOWED);
    }
    const normalized = raw.trim().toLowerCase();
    if (!ALLOWED.includes(normalized)) {
      throw new InvalidScheduleTypeError(normalized, ALLOWED);
    }
    return new ScheduleTypeVO(normalized as ScheduleTypeValue);
  }

  static reconstitute(raw: string): ScheduleTypeVO {
    return new ScheduleTypeVO(raw as ScheduleTypeValue);
  }

  isImmediate(): boolean { return this.value === NOTIFICATION_SCHEDULE_TYPE.IMMEDIATE; }
  isDelayed(): boolean { return this.value === NOTIFICATION_SCHEDULE_TYPE.DELAYED; }
  isRecurring(): boolean { return this.value === NOTIFICATION_SCHEDULE_TYPE.RECURRING; }
  isTriggered(): boolean { return this.value === NOTIFICATION_SCHEDULE_TYPE.TRIGGERED; }
}
