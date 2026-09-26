import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class ScheduleIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ScheduleIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('ScheduleId cannot be empty');
    }
    return new ScheduleIdVO(raw);
  }
}
