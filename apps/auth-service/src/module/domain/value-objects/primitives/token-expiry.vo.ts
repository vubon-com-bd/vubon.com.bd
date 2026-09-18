import {
  BaseTimestampVO,
  type TimestampValue,
} from '@vubon/shared-kernel/domain/primitives/timestamp.vo';

export class TokenExpiryVO extends BaseTimestampVO {
  private constructor(value: TimestampValue) {
    super(value);
  }

  static create(value: Date): TokenExpiryVO {
    return new TokenExpiryVO(
      BaseTimestampVO.fromEpoch(value.getTime()),
    );
  }

  static fromNow(durationMs: number): TokenExpiryVO {
    return new TokenExpiryVO(
      BaseTimestampVO.fromEpoch(Date.now() + durationMs),
    );
  }

  isExpired(now: Date = new Date()): boolean {
    return this.epochMs <= now.getTime();
  }
}
