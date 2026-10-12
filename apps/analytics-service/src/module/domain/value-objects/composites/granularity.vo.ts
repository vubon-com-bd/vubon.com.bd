/**
 * Granularity Value Object (Composite)
 * @module analytics-service/domain/value-objects/composites
 *
 * Time-series data-র bucket size।
 * Business Rule:
 * - ANALYTICS_GRANULARITY constants থেকে
 * - Range span অনুযায়ী max granularity validate হবে
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base';
import { ANALYTICS_GRANULARITY } from '@vubon/shared-constants/platform/analytics';
import { TimeRangeVO } from './time-range.vo.js';

type GranularityValue = (typeof ANALYTICS_GRANULARITY)[keyof typeof ANALYTICS_GRANULARITY];

const VALID: readonly string[] = Object.values(ANALYTICS_GRANULARITY);

const GRANULARITY_SECONDS: Record<string, number> = {
  minute: 60,
  five_minutes: 300,
  fifteen_minutes: 900,
  thirty_minutes: 1800,
  hour: 3600,
  six_hours: 21600,
  twelve_hours: 43200,
  day: 86400,
  week: 604800,
  month: 2592000,
  quarter: 7776000,
  year: 31536000,
};

export interface GranularityVOProps {
  readonly value: GranularityValue;
}

export class GranularityVO extends BaseVO<GranularityVOProps> {
  private constructor(props: GranularityVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(raw: string): GranularityVO {
    if (typeof raw !== 'string') {
      throw new Error('Granularity must be a string');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID.includes(normalized)) {
      throw new Error(`Invalid Granularity: "${normalized}"`);
    }
    return new GranularityVO({ value: normalized as GranularityValue });
  }

  static autoFor(range: TimeRangeVO): GranularityVO {
    const days = range.spanDays();
    if (days <= 1) return GranularityVO.create(ANALYTICS_GRANULARITY.HOUR);
    if (days <= 7) return GranularityVO.create(ANALYTICS_GRANULARITY.DAY);
    if (days <= 90) return GranularityVO.create(ANALYTICS_GRANULARITY.DAY);
    if (days <= 365) return GranularityVO.create(ANALYTICS_GRANULARITY.WEEK);
    return GranularityVO.create(ANALYTICS_GRANULARITY.MONTH);
  }

  get value_(): GranularityValue {
    return this.value.value;
  }

  /** Bucket size in seconds */
  seconds(): number {
    return GRANULARITY_SECONDS[this.value.value] ?? 0;
  }

  /** Estimated bucket count for a range */
  bucketCount(range: TimeRangeVO): number {
    return Math.ceil(range.spanSeconds() / this.seconds());
  }

  /** Range-এর জন্য appropriate কিনা (max 1000 buckets recommended) */
  isAppropriateFor(range: TimeRangeVO): boolean {
    return this.bucketCount(range) <= 1000;
  }

  /** High-frequency granularity কিনা */
  isHighFrequency(): boolean {
    const highFreq: readonly string[] = [
      ANALYTICS_GRANULARITY.MINUTE,
      ANALYTICS_GRANULARITY.FIVE_MINUTES,
      ANALYTICS_GRANULARITY.FIFTEEN_MINUTES,
      ANALYTICS_GRANULARITY.THIRTY_MINUTES,
    ];
    return highFreq.includes(this.value.value);
  }

  /** Daily বা বড় কিনা */
  isDailyOrLarger(): boolean {
    const seconds = this.seconds();
    return seconds >= 86400;
  }
}
