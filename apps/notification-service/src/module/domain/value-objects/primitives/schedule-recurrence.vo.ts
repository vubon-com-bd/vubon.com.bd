/**
 * ScheduleRecurrence Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_SCHEDULE_RECURRENCE } from '@vubon/shared-constants/platform/notification';
import { InvalidScheduleRecurrenceError } from '../../errors/schedule.errors.js';

type RecurrenceValue =
  (typeof NOTIFICATION_SCHEDULE_RECURRENCE)[keyof typeof NOTIFICATION_SCHEDULE_RECURRENCE];
const ALLOWED = Object.values(NOTIFICATION_SCHEDULE_RECURRENCE) as readonly string[];

export class ScheduleRecurrenceVO extends BaseTypeVO<RecurrenceValue> {
  private constructor(value: RecurrenceValue) {
    super(value);
  }

  static override allowedValues(): ReadonlySet<string> {
    return new Set<string>(ALLOWED);
  }

  static create(raw: string): ScheduleRecurrenceVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidScheduleRecurrenceError(raw, ALLOWED);
    }
    return new ScheduleRecurrenceVO(raw as RecurrenceValue);
  }

  static reconstitute(raw: string): ScheduleRecurrenceVO {
    return new ScheduleRecurrenceVO(raw as RecurrenceValue);
  }

  static none(): ScheduleRecurrenceVO { return new ScheduleRecurrenceVO(NOTIFICATION_SCHEDULE_RECURRENCE.NONE); }
  static hourly(): ScheduleRecurrenceVO { return new ScheduleRecurrenceVO(NOTIFICATION_SCHEDULE_RECURRENCE.HOURLY); }
  static daily(): ScheduleRecurrenceVO { return new ScheduleRecurrenceVO(NOTIFICATION_SCHEDULE_RECURRENCE.DAILY); }
  static weekly(): ScheduleRecurrenceVO { return new ScheduleRecurrenceVO(NOTIFICATION_SCHEDULE_RECURRENCE.WEEKLY); }
  static biweekly(): ScheduleRecurrenceVO { return new ScheduleRecurrenceVO(NOTIFICATION_SCHEDULE_RECURRENCE.BIWEEKLY); }
  static monthly(): ScheduleRecurrenceVO { return new ScheduleRecurrenceVO(NOTIFICATION_SCHEDULE_RECURRENCE.MONTHLY); }
  static quarterly(): ScheduleRecurrenceVO { return new ScheduleRecurrenceVO(NOTIFICATION_SCHEDULE_RECURRENCE.QUARTERLY); }
  static yearly(): ScheduleRecurrenceVO { return new ScheduleRecurrenceVO(NOTIFICATION_SCHEDULE_RECURRENCE.YEARLY); }
  static custom(): ScheduleRecurrenceVO { return new ScheduleRecurrenceVO(NOTIFICATION_SCHEDULE_RECURRENCE.CUSTOM); }

  isNone(): boolean { return this.value === NOTIFICATION_SCHEDULE_RECURRENCE.NONE; }
  isHourly(): boolean { return this.value === NOTIFICATION_SCHEDULE_RECURRENCE.HOURLY; }
  isDaily(): boolean { return this.value === NOTIFICATION_SCHEDULE_RECURRENCE.DAILY; }
  isWeekly(): boolean { return this.value === NOTIFICATION_SCHEDULE_RECURRENCE.WEEKLY; }
  isMonthly(): boolean { return this.value === NOTIFICATION_SCHEDULE_RECURRENCE.MONTHLY; }
  isYearly(): boolean { return this.value === NOTIFICATION_SCHEDULE_RECURRENCE.YEARLY; }
  isCustom(): boolean { return this.value === NOTIFICATION_SCHEDULE_RECURRENCE.CUSTOM; }

  /** Approximate interval in seconds for scheduling calculations. */
  intervalSeconds(): number | null {
    switch (this.value) {
      case NOTIFICATION_SCHEDULE_RECURRENCE.HOURLY: return 3600;
      case NOTIFICATION_SCHEDULE_RECURRENCE.DAILY: return 86400;
      case NOTIFICATION_SCHEDULE_RECURRENCE.WEEKLY: return 604800;
      case NOTIFICATION_SCHEDULE_RECURRENCE.BIWEEKLY: return 1209600;
      case NOTIFICATION_SCHEDULE_RECURRENCE.MONTHLY: return 2592000;
      case NOTIFICATION_SCHEDULE_RECURRENCE.QUARTERLY: return 7776000;
      case NOTIFICATION_SCHEDULE_RECURRENCE.YEARLY: return 31536000;
      default: return null;
    }
  }
}
