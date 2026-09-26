import { Injectable } from '@nestjs/common';

interface TimeSeriesPoint { readonly timestamp: Date; readonly value: number; }
interface ForecastPoint { readonly timestamp: Date; readonly value: number; readonly confidenceLower: number; readonly confidenceUpper: number; }

@Injectable()
export class ForecastingEngineService {
  movingAverage(series: readonly TimeSeriesPoint[], horizonDays: number, windowSize = 3): readonly ForecastPoint[] {
    if (series.length === 0) return [];
    const window = series.slice(-Math.min(windowSize, series.length));
    const avg = window.reduce((s, p) => s + p.value, 0) / window.length;
    const variance = window.reduce((s, p) => s + (p.value - avg) ** 2, 0) / window.length;
    const stdDev = Math.sqrt(variance);
    const lastTs = series[series.length - 1].timestamp.getTime();
    const dayMs = 86400000;
    return Array.from({ length: horizonDays }, (_, i) => ({
      timestamp: new Date(lastTs + (i + 1) * dayMs),
      value: avg,
      confidenceLower: avg - 1.96 * stdDev,
      confidenceUpper: avg + 1.96 * stdDev,
    }));
  }

  linearRegression(series: readonly TimeSeriesPoint[], horizonDays: number): readonly ForecastPoint[] {
    if (series.length < 2) return [];
    const xs = series.map((p) => p.timestamp.getTime());
    const ys = series.map((p) => p.value);
    const n = xs.length;
    const sumX = xs.reduce((a, b) => a + b, 0);
    const sumY = ys.reduce((a, b) => a + b, 0);
    const sumXY = xs.reduce((s, x, i) => s + x * ys[i], 0);
    const sumX2 = xs.reduce((s, x) => s + x * x, 0);
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX || 1);
    const intercept = (sumY - slope * sumX) / n;
    const lastTs = xs[xs.length - 1];
    const dayMs = 86400000;
    return Array.from({ length: horizonDays }, (_, i) => {
      const ts = lastTs + (i + 1) * dayMs;
      const value = slope * ts + intercept;
      return { timestamp: new Date(ts), value, confidenceLower: value * 0.9, confidenceUpper: value * 1.1 };
    });
  }
}
