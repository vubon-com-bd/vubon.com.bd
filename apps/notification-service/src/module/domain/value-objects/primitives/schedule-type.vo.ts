/**
 * ScheduleType Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_SCHEDULE_TYPE } from '@vubon/shared-constants/platform/notification';
import { InvalidScheduleTypeError } from '../../errors/schedule.errors.js';

type ScheduleTypeValue = (typeof NOTIFICATION_SCHEDULE_TYPE)[keyof typeof NOTIFICATION_SCHEDULE_TYPE];
const ALLOWED = Object.values(NOTIFICATION_SCHEDULE_TYPE) as readonly string[];

export class ScheduleTypeVO extends BaseTypeVO<ScheduleTypeValue> {
  private constructor(value: ScheduleTypeValue) {
    super(value);
  }

  static override allowedValues(): ReadonlySet<string> {
    return new Set<string>(ALLOWED);
  }

  static create(raw: string): ScheduleTypeVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidScheduleTypeError(raw, ALLOWED);
    }
    return new ScheduleTypeVO(raw as ScheduleTypeValue);
  }

  static reconstitute(raw: string): ScheduleTypeVO {
    return new ScheduleTypeVO(raw as ScheduleTypeValue);
  }

  static immediate(): ScheduleTypeVO { return new ScheduleTypeVO(NOTIFICATION_SCHEDULE_TYPE.IMMEDIATE); }
  static scheduled(): ScheduleTypeVO { return new ScheduleTypeVO(NOTIFICATION_SCHEDULE_TYPE.SCHEDULED); }
  static recurring(): ScheduleTypeVO { return new ScheduleTypeVO(NOTIFICATION_SCHEDULE_TYPE.RECURRING); }
  static delayed(): ScheduleTypeVO { return new ScheduleTypeVO(NOTIFICATION_SCHEDULE_TYPE.DELAYED); }
  static triggered(): ScheduleTypeVO { return new ScheduleTypeVO(NOTIFICATION_SCHEDULE_TYPE.TRIGGERED); }

  isImmediate(): boolean { return this.value === NOTIFICATION_SCHEDULE_TYPE.IMMEDIATE; }
  isScheduled(): boolean { return this.value === NOTIFICATION_SCHEDULE_TYPE.SCHEDULED; }
  isRecurring(): boolean { return this.value === NOTIFICATION_SCHEDULE_TYPE.RECURRING; }
  isDelayed(): boolean { return this.value === NOTIFICATION_SCHEDULE_TYPE.DELAYED; }
  isTriggered(): boolean { return this.value === NOTIFICATION_SCHEDULE_TYPE.TRIGGERED; }

  requiresRecurrence(): boolean {
    return this.isRecurring();
  }

  requiresExplicitTime(): boolean {
    return this.isScheduled() || this.isDelayed() || this.isRecurring();
  }
}
