import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_SCHEDULE_STATUS } from '@vubon/shared-constants/platform/notification';

const ALLOWED = new Set<string>(Object.values(NOTIFICATION_SCHEDULE_STATUS));

export class ScheduleStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  protected static override allowedValues(): ReadonlySet<string> {
    return ALLOWED;
  }

  static create(raw: string): ScheduleStatusVO {
    if (!ALLOWED.has(raw)) {
      throw new Error(`Invalid schedule status: ${raw}`);
    }
    return new ScheduleStatusVO(raw);
  }

  isActive(): boolean {
    return this.value === 'active';
  }

  isCancelled(): boolean {
    return this.value === 'cancelled';
  }
}
