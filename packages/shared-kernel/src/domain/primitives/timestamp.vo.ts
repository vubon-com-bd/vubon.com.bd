import { TIMEZONE } from '@vubon/shared-constants/common';
import type { Timestamp } from '@vubon/shared-types/common';
import { BaseVO } from '../base/base.vo';

export type TimezoneValue = (typeof TIMEZONE)[keyof typeof TIMEZONE];

export interface TimestampValue {
  readonly epochMs: number;
  readonly timezone: TimezoneValue;
}

export abstract class BaseTimestampVO extends BaseVO<TimestampValue> {
  protected constructor(value: TimestampValue) {
    super(value);
  }

  protected static fromEpoch(epochMs: number, timezone?: TimezoneValue): TimestampValue {
    if (Number.isNaN(epochMs)) {
      throw new Error('Invalid timestamp');
    }
    return {
      epochMs,
      timezone: timezone ?? (Object.values(TIMEZONE)[0] as TimezoneValue),
    };
  }

  toDate(): Date {
    return new Date(this.value.epochMs);
  }

  toISOString(): string {
    return this.toDate().toISOString();
  }

  get epochMs(): number {
    return this.value.epochMs;
  }

  get timezone(): TimezoneValue {
    return this.value.timezone;
  }
}

export class TimestampVO extends BaseTimestampVO {
  private constructor(value: TimestampValue) {
    super(value);
  }

  static of(epochMs: number, timezone?: TimezoneValue): TimestampVO {
    return new TimestampVO(BaseTimestampVO.fromEpoch(epochMs, timezone));
  }

  static now(timezone?: TimezoneValue): TimestampVO {
    return new TimestampVO(BaseTimestampVO.fromEpoch(Date.now(), timezone));
  }
}

export type { Timestamp };
