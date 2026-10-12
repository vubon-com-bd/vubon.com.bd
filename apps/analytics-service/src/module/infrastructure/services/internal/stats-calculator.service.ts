/**
 * Stats Calculator Service (internal)
 *
 * Common statistical operations on analytics time-series.
 */
import { Injectable } from '@nestjs/common';

export interface StatisticalSummary {
  readonly count: number;
  readonly sum: number;
  readonly mean: number;
  readonly min: number;
  readonly max: number;
  readonly median: number;
  readonly stddev: number;
  readonly variance: number;
}

@Injectable()
export class StatsCalculatorInternalService {
  summarize(values: readonly number[]): StatisticalSummary {
    if (values.length === 0) {
      return { count: 0, sum: 0, mean: 0, min: 0, max: 0, median: 0, stddev: 0, variance: 0 };
    }

    const sorted = [...values].sort((a, b) => a - b);
    const sum = sorted.reduce((acc, v) => acc + v, 0);
    const mean = sum / sorted.length;
    const variance =
      sorted.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / sorted.length;
    const mid = Math.floor(sorted.length / 2);
    const median =
      sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];

    return {
      count: sorted.length,
      sum,
      mean: Math.round(mean * 100) / 100,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      median: Math.round(median * 100) / 100,
      stddev: Math.round(Math.sqrt(variance) * 100) / 100,
      variance: Math.round(variance * 100) / 100,
    };
  }

  percentile(values: readonly number[], p: number): number {
    if (values.length === 0) return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const idx = (p / 100) * (sorted.length - 1);
    const lower = Math.floor(idx);
    const upper = Math.ceil(idx);
    const weight = idx - lower;
    if (lower === upper) return sorted[lower];
    return sorted[lower] * (1 - weight) + sorted[upper] * weight;
  }

  zScore(value: number, values: readonly number[]): number {
    if (values.length === 0) return 0;
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / values.length;
    const stddev = Math.sqrt(variance);
    if (stddev === 0) return 0;
    return Math.round(((value - mean) / stddev) * 100) / 100;
  }
}
