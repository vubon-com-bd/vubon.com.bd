/**
 * Time Series Service
 * @module analytics-service/domain/services
 *
 * Time-bucket aggregation for charts.
 * Business Rule:
 * - Bucket by granularity (minute/hour/day/week/month)
 * - Fill gaps with zeros
 * - Timezone-aware (UTC)
 */
export interface TimeSeriesPoint {
  readonly timestamp: number;
  readonly value: number;
}

export type BucketGranularity =
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month';

export class TimeSeriesService {
  /**
   * Bucket data points by granularity
   */
  bucket(
    points: readonly TimeSeriesPoint[],
    granularity: BucketGranularity,
    from: number,
    to: number
  ): readonly TimeSeriesPoint[] {
    if (from >= to) throw new Error('from must be < to');

    const bucketMs = this.granularityMs(granularity);
    const buckets = new Map<number, number>();

    // Initialize all buckets with 0
    let cursor = this.alignToBucket(from, granularity);
    while (cursor <= to) {
      buckets.set(cursor, 0);
      cursor += bucketMs;
    }

    // Accumulate values
    for (const p of points) {
      if (p.timestamp < from || p.timestamp > to) continue;
      const bucketKey = this.alignToBucket(p.timestamp, granularity);
      buckets.set(bucketKey, (buckets.get(bucketKey) ?? 0) + p.value);
    }

    return Array.from(buckets.entries())
      .sort(([a], [b]) => a - b)
      .map(([timestamp, value]) => ({ timestamp, value }));
  }

  /**
   * Count-bucket (number of events per bucket)
   */
  countBucket(
    timestamps: readonly number[],
    granularity: BucketGranularity,
    from: number,
    to: number
  ): readonly TimeSeriesPoint[] {
    const points = timestamps.map((t) => ({ timestamp: t, value: 1 }));
    return this.bucket(points, granularity, from, to);
  }

  /**
   * Rolling average smoothing
   */
  smooth(points: readonly TimeSeriesPoint[], window: number): readonly TimeSeriesPoint[] {
    if (window < 1 || points.length < window) return points;

    const result: TimeSeriesPoint[] = [];
    for (let i = 0; i < points.length; i++) {
      const start = Math.max(0, i - window + 1);
      const slice = points.slice(start, i + 1);
      const avg = slice.reduce((s, p) => s + p.value, 0) / slice.length;
      result.push({ timestamp: points[i].timestamp, value: Math.round(avg * 100) / 100 });
    }
    return result;
  }

  /**
   * Cumulative sum
   */
  cumulative(points: readonly TimeSeriesPoint[]): readonly TimeSeriesPoint[] {
    let total = 0;
    return points.map((p) => {
      total += p.value;
      return { timestamp: p.timestamp, value: total };
    });
  }

  /**
   * Fill missing buckets with zero
   */
  fillGaps(
    points: readonly TimeSeriesPoint[],
    granularity: BucketGranularity
  ): readonly TimeSeriesPoint[] {
    if (points.length < 2) return points;

    const bucketMs = this.granularityMs(granularity);
    const byTime = new Map(points.map((p) => [p.timestamp, p.value]));

    const result: TimeSeriesPoint[] = [];
    const first = points[0].timestamp;
    const last = points[points.length - 1].timestamp;

    for (let t = first; t <= last; t += bucketMs) {
      result.push({ timestamp: t, value: byTime.get(t) ?? 0 });
    }
    return result;
  }

  // ─── Private ────────────────────────────────

  private granularityMs(g: BucketGranularity): number {
    const MINUTE = 60 * 1000;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;
    const WEEK = 7 * DAY;
    const MONTH = 30 * DAY;

    if (g === 'minute') return MINUTE;
    if (g === 'hour') return HOUR;
    if (g === 'day') return DAY;
    if (g === 'week') return WEEK;
    return MONTH;
  }

  private alignToBucket(ms: number, g: BucketGranularity): number {
    const d = new Date(ms);
    if (g === 'minute') {
      d.setUTCSeconds(0, 0);
      return d.getTime();
    }
    if (g === 'hour') {
      d.setUTCMinutes(0, 0, 0);
      return d.getTime();
    }
    if (g === 'day') {
      return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    }
    if (g === 'week') {
      const day = d.getUTCDay();
      return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() - day);
    }
    return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1);
  }
}
