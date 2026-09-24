import { GranularityVO } from '../value-objects/composites/granularity.vo';
import { TimeRangeVO } from '../value-objects/composites/time-range.vo';
import { MetricValueVO } from '../value-objects/primitives/metric-value.vo';

export interface TimeSeriesPoint {
  readonly bucketMs: number;
  readonly value: number;
}

export class TimeSeriesService {
  /**
   * Bucket time-series data by granularity.
   */
  bucket(
    points: readonly { readonly ms: number; readonly value: number }[],
    granularity: GranularityVO,
  ): readonly TimeSeriesPoint[] {
    const bucketMs = granularity.seconds * 1000;
    const buckets = new Map<number, number>();

    for (const p of points) {
      const key = Math.floor(p.ms / bucketMs) * bucketMs;
      buckets.set(key, (buckets.get(key) ?? 0) + p.value);
    }

    return Array.from(buckets.entries())
      .map(([bucketMs, value]) => ({ bucketMs, value }))
      .sort((a, b) => a.bucketMs - b.bucketMs);
  }

  /**
   * Fill gaps with zero values to make continuous series.
   */
  fillGaps(
    series: readonly TimeSeriesPoint[],
    range: TimeRangeVO,
    granularity: GranularityVO,
  ): readonly TimeSeriesPoint[] {
    const bucketMs = granularity.seconds * 1000;
    const existing = new Map(series.map((p) => [p.bucketMs, p.value]));
    const out: TimeSeriesPoint[] = [];
    let cursor = Math.floor(range.startMs / bucketMs) * bucketMs;
    while (cursor <= range.endMs) {
      out.push({ bucketMs: cursor, value: existing.get(cursor) ?? 0 });
      cursor += bucketMs;
    }
    return out;
  }

  sum(series: readonly TimeSeriesPoint[]): MetricValueVO {
    return MetricValueVO.create(series.reduce((a, p) => a + p.value, 0));
  }
}
