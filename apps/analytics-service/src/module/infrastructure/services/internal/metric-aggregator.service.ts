import { Injectable } from '@nestjs/common';
import {
  ANALYTICS_AGGREGATION,
  ANALYTICS_PERCENTILE,
} from '@vubon/shared-constants/platform/analytics';

export interface AggregationResult {
  readonly value: number;
  readonly sampleSize: number;
  readonly min: number;
  readonly max: number;
  readonly stddev: number;
}

@Injectable()
export class MetricAggregatorService {
  /**
   * Core aggregation engine — supports SUM, AVG, MIN, MAX, COUNT,
   * MEDIAN, MODE, STDDEV, VARIANCE, PERCENTILE.
   */
  aggregate(values: readonly number[], method: string): number {
    if (values.length === 0) return 0;

    switch (method) {
      case ANALYTICS_AGGREGATION.SUM:
        return values.reduce((a, b) => a + b, 0);
      case ANALYTICS_AGGREGATION.AVG:
        return values.reduce((a, b) => a + b, 0) / values.length;
      case ANALYTICS_AGGREGATION.MIN:
        return Math.min(...values);
      case ANALYTICS_AGGREGATION.MAX:
        return Math.max(...values);
      case ANALYTICS_AGGREGATION.COUNT:
        return values.length;
      case ANALYTICS_AGGREGATION.COUNT_DISTINCT:
        return new Set(values).size;
      case ANALYTICS_AGGREGATION.MEDIAN:
        return this.percentile(values, ANALYTICS_PERCENTILE.P50);
      case ANALYTICS_AGGREGATION.MODE:
        return this.mode(values);
      case ANALYTICS_AGGREGATION.STDDEV:
        return this.stddev(values);
      case ANALYTICS_AGGREGATION.VARIANCE:
        return this.variance(values);
      case ANALYTICS_AGGREGATION.PERCENTILE:
        return this.percentile(values, ANALYTICS_PERCENTILE.P95);
      default:
        throw new Error(`Unsupported aggregation: ${method}`);
    }
  }

  /**
   * Full aggregation with statistics.
   */
  aggregateFull(values: readonly number[]): AggregationResult {
    if (values.length === 0) {
      return { value: 0, sampleSize: 0, min: 0, max: 0, stddev: 0 };
    }
    return {
      value: values.reduce((a, b) => a + b, 0),
      sampleSize: values.length,
      min: Math.min(...values),
      max: Math.max(...values),
      stddev: this.stddev(values),
    };
  }

  percentile(values: readonly number[], p: number): number {
    if (values.length === 0) return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const idx = (p / 100) * (sorted.length - 1);
    const lo = Math.floor(idx);
    const hi = Math.ceil(idx);
    if (lo === hi) return sorted[lo]!;
    const frac = idx - lo;
    return sorted[lo]! * (1 - frac) + sorted[hi]! * frac;
  }

  variance(values: readonly number[]): number {
    if (values.length < 2) return 0;
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    return (
      values.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / values.length
    );
  }

  stddev(values: readonly number[]): number {
    return Math.sqrt(this.variance(values));
  }

  private mode(values: readonly number[]): number {
    const freq = new Map<number, number>();
    for (const v of values) freq.set(v, (freq.get(v) ?? 0) + 1);
    let best = values[0]!;
    let bestCount = 0;
    for (const [v, c] of freq.entries()) {
      if (c > bestCount) {
        bestCount = c;
        best = v;
      }
    }
    return best;
  }
}
