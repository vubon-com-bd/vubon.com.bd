import {
  BaseTimestampVO,
  type TimestampValue,
} from '@vubon/shared-kernel/domain/primitives/timestamp.vo';

export class ActivityTimestampVO extends BaseTimestampVO {
  private constructor(value: TimestampValue) {
    super(value);
  }

  static create(value: Date): ActivityTimestampVO {
    return new ActivityTimestampVO(
      BaseTimestampVO.fromEpoch(value.getTime()),
    );
  }

  static now(): ActivityTimestampVO {
    return new ActivityTimestampVO(
      BaseTimestampVO.fromEpoch(Date.now()),
    );
  }
}
