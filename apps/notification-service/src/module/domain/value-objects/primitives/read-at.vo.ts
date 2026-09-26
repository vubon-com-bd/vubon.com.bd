import { BaseTimestampVO, type TimestampValue } from '@vubon/shared-kernel/domain/primitives';

export class ReadAtVO extends BaseTimestampVO {
  private constructor(value: TimestampValue) {
    super(value);
  }

  static create(value: Date): ReadAtVO {
    return new ReadAtVO(BaseTimestampVO.fromEpoch(value.getTime()));
  }

  static now(): ReadAtVO {
    return new ReadAtVO(BaseTimestampVO.fromEpoch(Date.now()));
  }
}
