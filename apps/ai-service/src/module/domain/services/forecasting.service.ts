import { ForecastHorizonVO } from '../value-objects/primitives/forecast-horizon.vo';

export interface TimeSeriesPoint {
  readonly timestamp: Date;
  readonly value: number;
}

export interface ForecastPoint {
  readonly timestamp: Date;
  readonly value: number;
  readonly confidenceLower: number;
  readonly confidenceUpper: number;
}

export class ForecastingService {
  /**
   * Simple moving average forecast.
   */
  movingAverage(
    series: readonly TimeSeriesPoint[],
    horizon: ForecastHorizonVO,
    windowSize = 3,
  ): readonly ForecastPoint[] {
    if (series.length === 0) return [];
    if (windowSize < 1 || windowSize > series.length) {
      throw new Error('Forecasting: invalid windowSize');
    }

    const window = series.slice(-windowSize);
    const avg = window.reduce((s, p) => s + p.value, 0) / window.length;
    const variance =
      window.reduce((s, p) => s + (p.value - avg) ** 2, 0) / window.length;
    const stdDev = Math.sqrt(variance);

    const lastTimestamp = series[series.length - 1].timestamp.getTime();
    const dayMs = 24 * 60 * 60 * 1000;

    return Array.from({ length: horizon.inDays }, (_, i) => {
      const ts = new Date(lastTimestamp + (i + 1) * dayMs);
      return {
        timestamp: ts,
        value: avg,
        confidenceLower: avg - 1.96 * stdDev,
        confidenceUpper: avg + 1.96 * stdDev,
      };
    });
  }

  /**
   * Linear regression forecast.
   */
  linearRegression(
    series: readonly TimeSeriesPoint[],
    horizon: ForecastHorizonVO,
  ): readonly ForecastPoint[] {
    if (series.length < 2) return [];

    const xs = series.map((p) => p.timestamp.getTime());
    const ys = series.map((p) => p.value);
    const n = xs.length;
    const sumX = xs.reduce((a, b) => a + b, 0);
    const sumY = ys.reduce((a, b) => a + b, 0);
    const sumXY = xs.reduce((sum, x, i) => sum + x * ys[i], 0);
    const sumX2 = xs.reduce((sum, x) => sum + x * x, 0);
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    const dayMs = 24 * 60 * 60 * 1000;
    const lastTs = xs[xs.length - 1];

    return Array.from({ length: horizon.inDays }, (_, i) => {
      const ts = lastTs + (i + 1) * dayMs;
      const value = slope * ts + intercept;
      return {
        timestamp: new Date(ts),
        value,
        confidenceLower: value * 0.9,
        confidenceUpper: value * 1.1,
      };
    });
  }
}
