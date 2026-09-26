import {
  BaseTimestampVO,
  type TimestampValue,
} from '@vubon/shared-kernel/domain/primitives';

export class PaymentTimestampVO extends BaseTimestampVO {
  static create(value: Date): PaymentTimestampVO {
    return new PaymentTimestampVO(
      BaseTimestampVO.fromEpoch(value.getTime()),
    );
  }

  static now(): PaymentTimestampVO {
    return new PaymentTimestampVO(
      BaseTimestampVO.fromEpoch(Date.now()),
    );
  }

  private constructor(value: TimestampValue) {
    super(value);
  }
}
