/**
 * Metric Aggregator Service
 * @module analytics-service/domain/services
 *
 * Metric values aggregate করে (sum, avg, min, max, count, stddev)।
 * Business Rule:
 * - Empty input → null
 * - Counter → sum
 * - Gauge → avg
 * - Histogram → percentile support
 */
export type AggregationType = 'sum' | 'avg' | 'min' | 'max' | 'count' | 'median' | 'stddev';

export interface AggregationResult {
  readonly type: AggregationType;
  readonly value: number;
  readonly sampleCount: number;
}

export class MetricAggregatorService {
  /**
   * Main aggregate entry
   */
  aggregate(values: readonly number[], type: AggregationType): AggregationResult | null {
    if (values.length === 0) return null;

    const clean = values.filter((v) => Number.isFinite(v));
    if (clean.length === 0) return null;

    let value: number;

    switch (type) {
      case 'sum':
        value = this.sum(clean);
        break;
      case 'avg':
        value = this.avg(clean);
        break;
      case 'min':
        value = Math.min(...clean);
        break;
      case 'max':
        value = Math.max(...clean);
        break;
      case 'count':
        value = clean.length;
        break;
      case 'median':
        value = this.median(clean);
        break;
      case 'stddev':
        value = this.stddev(clean);
        break;
    }

    return {
      type,
      value: Math.round(value * 10000) / 10000,
      sampleCount: clean.length,
    };
  }

  /**
   * Multiple aggregations at once
   */
  aggregateMany(
    values: readonly number[],
    types: readonly AggregationType[]
  ): readonly AggregationResult[] {
    return types
      .map((t) => this.aggregate(values, t))
      .filter((r): r is AggregationResult => r !== null);
  }

  /**
   * Percentile calculation
   */
  percentile(values: readonly number[], p: number): number | null {
    if (values.length === 0) return null;
    if (p < 0 || p > 100) throw new Error('Percentile must be 0-100');

    const sorted = [...values].sort((a, b) => a - b);
    const idx = (p / 100) * (sorted.length - 1);
    const lower = Math.floor(idx);
    const upper = Math.ceil(idx);
    const weight = idx - lower;

    if (lower === upper) return sorted[lower];
    return sorted[lower] * (1 - weight) + sorted[upper] * weight;
  }

  /**
   * Moving average over window
   */
  movingAverage(values: readonly number[], windowSize: number): readonly number[] {
    if (windowSize < 1 || windowSize > values.length) return [];
    const result: number[] = [];

    for (let i = windowSize - 1; i < values.length; i++) {
      const window = values.slice(i - windowSize + 1, i + 1);
      result.push(Math.round(this.avg(window) * 10000) / 10000);
    }

    return result;
  }

  /**
   * Rate of change between consecutive values
   */
  rateOfChange(values: readonly number[]): readonly number[] {
    if (values.length < 2) return [];
    const result: number[] = [];

    for (let i = 1; i < values.length; i++) {
      const prev = values[i - 1];
      if (prev === 0) {
        result.push(0);
      } else {
        result.push(Math.round(((values[i] - prev) / Math.abs(prev)) * 10000) / 100);
      }
    }
    return result;
  }

  // ─── Private ────────────────────────────────

  private sum(values: readonly number[]): number {
    let total = 0;
    for (const v of values) total += v;
    return total;
  }

  private avg(values: readonly number[]): number {
    return this.sum(values) / values.length;
  }

  private median(values: readonly number[]): number {
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
      return (sorted[mid - 1] + sorted[mid]) / 2;
    }
    return sorted[mid];
  }

  private stddev(values: readonly number[]): number {
    if (values.length < 2) return 0;
    const mean = this.avg(values);
    const variance =
      values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;
    return Math.sqrt(variance);
  }
}
