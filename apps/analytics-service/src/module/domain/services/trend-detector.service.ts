/**
 * Trend Detector Service
 * @module analytics-service/domain/services
 *
 * Linear regression + trend classification।
 * Business Rule:
 * - Slope > 0 → upward
 * - Slope < 0 → downward
 * - R² determines strength
 * - Volatility via stddev of residuals
 */
export interface TrendPoint {
  readonly timestamp: number;
  readonly value: number;
}

export interface TrendResult {
  readonly direction: 'upward' | 'downward' | 'stable';
  readonly strength: 'very_strong' | 'strong' | 'moderate' | 'weak' | 'none';
  readonly slope: number;
  readonly intercept: number;
  readonly rSquared: number;
  readonly startValue: number;
  readonly endValue: number;
  readonly percentChange: number;
  readonly volatility: number;
}

export class TrendDetectorService {
  /**
   * Analyze trend from time series
   */
  analyze(points: readonly TrendPoint[]): TrendResult | null {
    if (points.length < 3) return null;

    const sorted = [...points].sort((a, b) => a.timestamp - b.timestamp);

    // Linear regression
    const n = sorted.length;
    const xs = sorted.map((p) => p.timestamp);
    const ys = sorted.map((p) => p.value);

    const xMean = xs.reduce((a, b) => a + b, 0) / n;
    const yMean = ys.reduce((a, b) => a + b, 0) / n;

    let num = 0;
    let den = 0;
    for (let i = 0; i < n; i++) {
      num += (xs[i] - xMean) * (ys[i] - yMean);
      den += Math.pow(xs[i] - xMean, 2);
    }

    if (den === 0) return null;
    const slope = num / den;
    const intercept = yMean - slope * xMean;

    // R²
    let ssTot = 0;
    let ssRes = 0;
    for (let i = 0; i < n; i++) {
      const predicted = slope * xs[i] + intercept;
      ssTot += Math.pow(ys[i] - yMean, 2);
      ssRes += Math.pow(ys[i] - predicted, 2);
    }
    const rSquared = ssTot > 0 ? 1 - ssRes / ssTot : 0;

    // Volatility (stddev of residuals)
    const residuals = sorted.map((p) => p.value - (slope * p.timestamp + intercept));
    const volatility = this.stddev(residuals);

    // Direction
    let direction: 'upward' | 'downward' | 'stable';
    const significanceThreshold = 0.05 * yMean;
    if (slope * (xs[n - 1] - xs[0]) > significanceThreshold) direction = 'upward';
    else if (slope * (xs[n - 1] - xs[0]) < -significanceThreshold) direction = 'downward';
    else direction = 'stable';

    // Strength from R²
    let strength: TrendResult['strength'];
    if (rSquared >= 0.9) strength = 'very_strong';
    else if (rSquared >= 0.7) strength = 'strong';
    else if (rSquared >= 0.5) strength = 'moderate';
    else if (rSquared >= 0.3) strength = 'weak';
    else strength = 'none';

    const first = sorted[0].value;
    const last = sorted[n - 1].value;
    const percentChange =
      first === 0 ? 0 : Math.round(((last - first) / Math.abs(first)) * 10000) / 100;

    return {
      direction,
      strength,
      slope: Math.round(slope * 1e8) / 1e8,
      intercept: Math.round(intercept * 100) / 100,
      rSquared: Math.round(rSquared * 10000) / 10000,
      startValue: first,
      endValue: last,
      percentChange,
      volatility: Math.round(volatility * 100) / 100,
    };
  }

  /**
   * Forecast next N points
   */
  forecast(result: TrendResult, lastTimestamp: number, stepMs: number, n: number): readonly TrendPoint[] {
    const forecast: TrendPoint[] = [];
    for (let i = 1; i <= n; i++) {
      const t = lastTimestamp + i * stepMs;
      forecast.push({
        timestamp: t,
        value: Math.round((result.slope * t + result.intercept) * 100) / 100,
      });
    }
    return forecast;
  }

  private stddev(values: readonly number[]): number {
    if (values.length < 2) return 0;
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance =
      values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;
    return Math.sqrt(variance);
  }
}
