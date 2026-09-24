import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

export interface TimeRangeProps {
  readonly startMs: number;
  readonly endMs: number;
}

export class TimeRangeVO extends BaseVO<TimeRangeProps> {
  private static readonly MAX_RANGE_MS = 5 * 365 * 24 * 60 * 60 * 1000;

  static create(startMs: number, endMs: number): TimeRangeVO {
    if (!Number.isFinite(startMs) || !Number.isFinite(endMs)) {
      throw new Error('Time range must be finite numbers');
    }
    if (endMs < startMs) {
      throw new Error('End time cannot be before start time');
    }
    if (endMs - startMs > TimeRangeVO.MAX_RANGE_MS) {
      throw new Error('Time range cannot exceed 5 years');
    }
    return new TimeRangeVO(Object.freeze({ startMs, endMs }));
  }

  static lastNDays(n: number): TimeRangeVO {
    const end = Date.now();
    return TimeRangeVO.create(end - n * 24 * 60 * 60 * 1000, end);
  }

  private constructor(value: TimeRangeProps) {
    super(value);
  }

  get startMs(): number { return this.value.startMs; }
  get endMs(): number { return this.value.endMs; }
  get startDate(): Date { return new Date(this.value.startMs); }
  get endDate(): Date { return new Date(this.value.endMs); }

  get durationMs(): number {
    return this.value.endMs - this.value.startMs;
  }

  get durationDays(): number {
    return Math.round(this.durationMs / (24 * 60 * 60 * 1000));
  }

  contains(ms: number): boolean {
    return ms >= this.value.startMs && ms <= this.value.endMs;
  }

  overlaps(other: TimeRangeVO): boolean {
    return this.value.startMs <= other.value.endMs &&
           other.value.startMs <= this.value.endMs;
  }

  getDayBuckets(): readonly TimeRangeVO[] {
    const buckets: TimeRangeVO[] = [];
    const dayMs = 24 * 60 * 60 * 1000;
    let cursor = this.value.startMs;
    while (cursor < this.value.endMs) {
      const next = Math.min(cursor + dayMs, this.value.endMs);
      buckets.push(new TimeRangeVO(Object.freeze({ startMs: cursor, endMs: next })));
      cursor = next;
    }
    return buckets;
  }
}
