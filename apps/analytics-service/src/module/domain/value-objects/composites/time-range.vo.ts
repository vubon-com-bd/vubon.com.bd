/**
 * Time Range Value Object (Composite)
 * @module analytics-service/domain/value-objects/composites
 *
 * Analytics query-র time window।
 * Business Rule:
 * - start < end
 * - Max 2 years span
 * - Min 1 minute span
 * - UTC-based
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base';
import { EventTimestampVO } from '../primitives/event-timestamp.vo.js';

const MIN_SPAN_MS = 60 * 1000; // 1 minute
const MAX_SPAN_MS = 2 * 365 * 24 * 60 * 60 * 1000; // 2 years

export interface TimeRangeVOProps {
  readonly startAt: EventTimestampVO;
  readonly endAt: EventTimestampVO;
}

export class TimeRangeVO extends BaseVO<TimeRangeVOProps> {
  private constructor(props: TimeRangeVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: TimeRangeVOProps): TimeRangeVO {
    if (!props.startAt || !props.endAt) {
      throw new Error('TimeRangeVO requires startAt and endAt');
    }

    const spanMs = props.endAt.value.epochMs - props.startAt.value.epochMs;

    if (spanMs < 0) {
      throw new Error('TimeRange start must be before end');
    }

    if (spanMs < MIN_SPAN_MS) {
      throw new Error(`TimeRange span must be at least ${MIN_SPAN_MS / 1000}s`);
    }

    if (spanMs > MAX_SPAN_MS) {
      throw new Error('TimeRange span must be at most 2 years');
    }

    return new TimeRangeVO(props);
  }

  /** Range from N days ago to now */
  static lastNDays(days: number): TimeRangeVO {
    if (!Number.isInteger(days) || days < 1 || days > 730) {
      throw new Error('days must be 1-730');
    }
    const end = EventTimestampVO.now();
    const start = EventTimestampVO.fromEpochMs(
      end.value.epochMs - days * 24 * 60 * 60 * 1000
    );
    return TimeRangeVO.create({ startAt: start, endAt: end });
  }

  /** Today (UTC) */
  static today(): TimeRangeVO {
    const now = new Date();
    const startOfDay = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate()
    );
    return TimeRangeVO.create({
      startAt: EventTimestampVO.fromEpochMs(startOfDay),
      endAt: EventTimestampVO.now(),
    });
  }

  get startAt(): EventTimestampVO {
    return this.value.startAt;
  }

  get endAt(): EventTimestampVO {
    return this.value.endAt;
  }

  /** Span in milliseconds */
  spanMs(): number {
    return this.endAt.value.epochMs - this.startAt.value.epochMs;
  }

  /** Span in seconds */
  spanSeconds(): number {
    return Math.floor(this.spanMs() / 1000);
  }

  /** Span in days (fractional) */
  spanDays(): number {
    return this.spanMs() / (24 * 60 * 60 * 1000);
  }

  /** Contains a timestamp কিনা */
  contains(ts: EventTimestampVO): boolean {
    return (
      ts.value.epochMs >= this.startAt.value.epochMs &&
      ts.value.epochMs <= this.endAt.value.epochMs
    );
  }

  /** Overlaps another range কিনা */
  overlaps(other: TimeRangeVO): boolean {
    return (
      this.startAt.value.epochMs <= other.endAt.value.epochMs &&
      this.endAt.value.epochMs >= other.startAt.value.epochMs
    );
  }

  /** This range entirely contains other কিনা */
  containsRange(other: TimeRangeVO): boolean {
    return (
      this.startAt.value.epochMs <= other.startAt.value.epochMs &&
      this.endAt.value.epochMs >= other.endAt.value.epochMs
    );
  }

  /** Previous period of same length */
  previousPeriod(): TimeRangeVO {
    const span = this.spanMs();
    return TimeRangeVO.create({
      startAt: EventTimestampVO.fromEpochMs(this.startAt.value.epochMs - span),
      endAt: EventTimestampVO.fromEpochMs(this.endAt.value.epochMs - span),
    });
  }
}
