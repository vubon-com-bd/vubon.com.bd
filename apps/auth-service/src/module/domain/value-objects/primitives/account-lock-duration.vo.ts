import {
  BaseTimestampVO,
  type TimestampValue,
} from '@vubon/shared-kernel/domain/primitives/timestamp.vo';

export class AccountLockDurationVO extends BaseTimestampVO {
  private constructor(value: TimestampValue) {
    super(value);
  }

  static create(value: Date): AccountLockDurationVO {
    return new AccountLockDurationVO(
      BaseTimestampVO.fromEpoch(value.getTime()),
    );
  }

  static fromNow(durationMs: number): AccountLockDurationVO {
    return new AccountLockDurationVO(
      BaseTimestampVO.fromEpoch(Date.now() + durationMs),
    );
  }

  isActive(now: Date = new Date()): boolean {
    return this.epochMs > now.getTime();
  }
}
