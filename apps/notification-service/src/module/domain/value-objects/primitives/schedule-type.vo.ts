import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_SCHEDULE_TYPE } from '@vubon/shared-constants/platform/notification';

const ALLOWED = new Set<string>(Object.values(NOTIFICATION_SCHEDULE_TYPE));

export class ScheduleTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  protected static override allowedValues(): ReadonlySet<string> {
    return ALLOWED;
  }

  static create(raw: string): ScheduleTypeVO {
    if (!ALLOWED.has(raw)) {
      throw new Error(`Invalid schedule type: ${raw}`);
    }
    return new ScheduleTypeVO(raw);
  }
}
