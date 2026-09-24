import { Injectable } from '@nestjs/common';
import { ANALYTICS_INTERVAL, ANALYTICS_INTERVAL_SECONDS } from '@vubon/shared-constants/platform/analytics';

export interface TimeSeriesPoint {
  readonly bucketMs: number;
  readonly value: number;
}

@Injectable()
export class TimeSeriesAggregatorService {
  /**
   * Bucket time-series data by granularity.
   */
  bucket(
    points: readonly { readonly ms: number; readonly value: number }[],
    interval: string,
  ): readonly TimeSeriesPoint[] {
    const bucketMs = this.intervalToMs(interval);
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
   * Fill gaps with zero values across the given range.
   */
  fillGaps(
    series: readonly TimeSeriesPoint[],
    startMs: number,
    endMs: number,
    interval: string,
  ): readonly TimeSeriesPoint[] {
    const bucketMs = this.intervalToMs(interval);
    const existing = new Map(series.map((p) => [p.bucketMs, p.value]));
    const out: TimeSeriesPoint[] = [];
    let cursor = Math.floor(startMs / bucketMs) * bucketMs;
    while (cursor <= endMs) {
      out.push({ bucketMs: cursor, value: existing.get(cursor) ?? 0 });
      cursor += bucketMs;
    }
    return out;
  }

  private intervalToMs(interval: string): number {
    const map = ANALYTICS_INTERVAL_SECONDS as unknown as Record<string, number>;
    return (map[interval] ?? 3600) * 1000;
  }

  static defaultIntervals(): readonly string[] {
    return Object.values(ANALYTICS_INTERVAL);
  }
}
