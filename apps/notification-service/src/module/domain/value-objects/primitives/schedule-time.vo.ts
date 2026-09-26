import { BaseTimestampVO, type TimestampValue } from '@vubon/shared-kernel/domain/primitives';

export class ScheduleTimeVO extends BaseTimestampVO {
  private constructor(value: TimestampValue) {
    super(value);
  }

  static create(value: Date): ScheduleTimeVO {
    return new ScheduleTimeVO(BaseTimestampVO.fromEpoch(value.getTime()));
  }

  static fromEpochMs(epochMs: number): ScheduleTimeVO {
    return new ScheduleTimeVO(BaseTimestampVO.fromEpoch(epochMs));
  }

  isPast(): boolean {
    return this.epochMs < Date.now();
  }

  isFuture(): boolean {
    return this.epochMs > Date.now();
  }
}
