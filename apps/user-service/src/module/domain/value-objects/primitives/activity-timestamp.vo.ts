/**
 * ActivityTimestamp Value Object
 * @module user-service/domain/value-objects/primitives
 *
 * Standalone timestamp VO — epoch + timezone.
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { TIMEZONE } from '@vubon/shared-constants/common';

export type TimezoneValue = (typeof TIMEZONE)[keyof typeof TIMEZONE];

export interface ActivityTimestampValue {
  readonly epochMs: number;
  readonly timezone: TimezoneValue;
}

export class ActivityTimestampVO extends BaseVO<ActivityTimestampValue> {
  private constructor(value: ActivityTimestampValue) {
    super(value);
  }

  static now(): ActivityTimestampVO {
    return new ActivityTimestampVO({
      epochMs: Date.now(),
      timezone: TIMEZONE.ASIA_DHAKA,
    });
  }

  static fromEpochMs(epochMs: number): ActivityTimestampVO {
    if (typeof epochMs !== 'number' || Number.isNaN(epochMs)) {
      throw new Error('Invalid epochMs');
    }
    return new ActivityTimestampVO({
      epochMs,
      timezone: TIMEZONE.ASIA_DHAKA,
    });
  }

  static fromDate(date: Date): ActivityTimestampVO {
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
      throw new Error('Invalid Date object');
    }
    return new ActivityTimestampVO({
      epochMs: date.getTime(),
      timezone: TIMEZONE.ASIA_DHAKA,
    });
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

  isWithinLast(minutes: number): boolean {
    const diff = Date.now() - this.value.epochMs;
    return diff <= minutes * 60 * 1000;
  }

  isToday(): boolean {
    const d = this.toDate();
    const today = new Date();
    return (
      d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate()
    );
  }

  toBanglaString(): string {
    return this.toDate().toLocaleString('bn-BD', {
      timeZone: 'Asia/Dhaka',
    });
  }
}
