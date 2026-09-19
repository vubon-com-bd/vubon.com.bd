import {
  BaseTimestampVO,
  type TimestampValue,
} from '@vubon/shared-kernel/domain/primitives/timestamp.vo';

export class SessionExpiryVO extends BaseTimestampVO {
  private constructor(value: TimestampValue) {
    super(value);
  }

  static create(value: Date): SessionExpiryVO {
    return new SessionExpiryVO(
      BaseTimestampVO.fromEpoch(value.getTime()),
    );
  }

  static fromNow(durationMs: number): SessionExpiryVO {
    return new SessionExpiryVO(
      BaseTimestampVO.fromEpoch(Date.now() + durationMs),
    );
  }

  isExpired(now: Date = new Date()): boolean {
    return this.epochMs <= now.getTime();
  }
}
