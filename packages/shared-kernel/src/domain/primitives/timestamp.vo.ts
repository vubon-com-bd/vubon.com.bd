/**
 * Timestamp Value Object (timezone-aware)
 * @module shared-kernel/domain/primitives
 *
 * Values আসে shared-constants/common থেকে।
 */
import { TIMEZONE } from '@vubon/shared-constants/common';
import type { Timestamp } from '@vubon/shared-types/common';
import { BaseVO } from '../base/base.vo';

export type TimezoneValue = (typeof TIMEZONE)[keyof typeof TIMEZONE];

const VALID_TIMEZONES = new Set<string>(Object.values(TIMEZONE));

export interface TimestampValue {
  readonly epochMs: number;
  readonly timezone: TimezoneValue;
}

export class TimestampVO extends BaseVO<TimestampValue> {
  private constructor(value: TimestampValue) {
    super(value);
  }

  static of(
    epochMs: number,
    timezone: TimezoneValue = TIMEZONE.ASIA_DHAKA as TimezoneValue
  ): TimestampVO {
    if (!Number.isFinite(epochMs)) {
      throw new Error('Timestamp must be a finite number');
    }
    if (epochMs < 0) {
      throw new Error('Timestamp cannot be negative');
    }
    if (!VALID_TIMEZONES.has(timezone)) {
      throw new Error(`Invalid timezone: ${timezone}`);
    }
    return new TimestampVO({ epochMs, timezone });
  }

  static now(timezone: TimezoneValue = TIMEZONE.ASIA_DHAKA as TimezoneValue): TimestampVO {
    return new TimestampVO({ epochMs: Date.now(), timezone });
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

/**
 * Alias for shared-types Timestamp.
 */
export type { Timestamp };
