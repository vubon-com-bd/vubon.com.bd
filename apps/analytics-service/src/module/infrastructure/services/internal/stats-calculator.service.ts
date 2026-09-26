import { Injectable } from '@nestjs/common';

export interface DescriptiveStats {
  readonly count: number;
  readonly sum: number;
  readonly mean: number;
  readonly median: number;
  readonly mode: number;
  readonly min: number;
  readonly max: number;
  readonly range: number;
  readonly variance: number;
  readonly stddev: number;
  readonly p25: number;
  readonly p50: number;
  readonly p75: number;
  readonly p90: number;
  readonly p95: number;
  readonly p99: number;
}

@Injectable()
export class StatsCalculatorService {
  /**
   * Compute full descriptive statistics for a set of values.
   */
  describe(values: readonly number[]): DescriptiveStats {
    if (values.length === 0) {
      return {
        count: 0, sum: 0, mean: 0, median: 0, mode: 0,
        min: 0, max: 0, range: 0, variance: 0, stddev: 0,
        p25: 0, p50: 0, p75: 0, p90: 0, p95: 0, p99: 0,
      };
    }

    const sum = values.reduce((a, b) => a + b, 0);
    const mean = sum / values.length;
    const variance =
      values.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);

    return {
      count: values.length,
      sum,
      mean,
      median: this.percentile(values, 50),
      mode: this.mode(values),
      min,
      max,
      range: max - min,
      variance,
      stddev: Math.sqrt(variance),
      p25: this.percentile(values, 25),
      p50: this.percentile(values, 50),
      p75: this.percentile(values, 75),
      p90: this.percentile(values, 90),
      p95: this.percentile(values, 95),
      p99: this.percentile(values, 99),
    };
  }

  percentile(values: readonly number[], p: number): number {
    const sorted = [...values].sort((a, b) => a - b);
    const idx = (p / 100) * (sorted.length - 1);
    const lo = Math.floor(idx);
    const hi = Math.ceil(idx);
    if (lo === hi) return sorted[lo]!;
    const frac = idx - lo;
    return sorted[lo]! * (1 - frac) + sorted[hi]! * frac;
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
