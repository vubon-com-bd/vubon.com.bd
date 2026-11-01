/**
 * ScheduleFrequency Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_SCHEDULE_RECURRENCE } from '@vubon/shared-constants/platform';
import { InvalidScheduleFrequencyError } from '@domain/errors/schedule.errors.js';

export type ScheduleFrequencyValue =
  (typeof NOTIFICATION_SCHEDULE_RECURRENCE)[keyof typeof NOTIFICATION_SCHEDULE_RECURRENCE];

const ALLOWED = Object.values(NOTIFICATION_SCHEDULE_RECURRENCE) as readonly string[];

export class ScheduleFrequencyVO extends BaseTypeVO<ScheduleFrequencyValue> {
  private constructor(value: ScheduleFrequencyValue) {
    super(value);
  }

  static create(raw: string): ScheduleFrequencyVO {
    if (typeof raw !== 'string') {
      throw new InvalidScheduleFrequencyError(String(raw), ALLOWED);
    }
    const normalized = raw.trim().toLowerCase();
    if (!ALLOWED.includes(normalized)) {
      throw new InvalidScheduleFrequencyError(normalized, ALLOWED);
    }
    return new ScheduleFrequencyVO(normalized as ScheduleFrequencyValue);
  }

  static reconstitute(raw: string): ScheduleFrequencyVO {
    return new ScheduleFrequencyVO(raw as ScheduleFrequencyValue);
  }

  static none(): ScheduleFrequencyVO {
    return new ScheduleFrequencyVO(NOTIFICATION_SCHEDULE_RECURRENCE.NONE);
  }

  isNone(): boolean { return this.value === NOTIFICATION_SCHEDULE_RECURRENCE.NONE; }
  isRecurring(): boolean { return !this.isNone(); }

  get approximateIntervalDays(): number | undefined {
    switch (this.value) {
      case NOTIFICATION_SCHEDULE_RECURRENCE.HOURLY: return 1 / 24;
      case NOTIFICATION_SCHEDULE_RECURRENCE.DAILY: return 1;
      case NOTIFICATION_SCHEDULE_RECURRENCE.WEEKLY: return 7;
      case NOTIFICATION_SCHEDULE_RECURRENCE.BIWEEKLY: return 14;
      case NOTIFICATION_SCHEDULE_RECURRENCE.MONTHLY: return 30;
      case NOTIFICATION_SCHEDULE_RECURRENCE.QUARTERLY: return 90;
      case NOTIFICATION_SCHEDULE_RECURRENCE.YEARLY: return 365;
      default: return undefined;
    }
  }
}
