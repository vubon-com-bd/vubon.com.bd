export interface DataPoint {
  readonly timestamp: Date;
  readonly value: number;
}

export type TrendDirection = 'up' | 'down' | 'flat';

export interface TrendResult {
  readonly direction: TrendDirection;
  readonly slope: number;
  readonly strength: number;
}

export class TrendDetectionService {
  /**
   * Linear regression slope → trend direction.
   */
  detect(series: readonly DataPoint[]): TrendResult {
    if (series.length < 2) {
      return { direction: 'flat', slope: 0, strength: 0 };
    }

    const xs = series.map((_, i) => i);
    const ys = series.map((p) => p.value);
    const n = xs.length;

    const sumX = xs.reduce((a, b) => a + b, 0);
    const sumY = ys.reduce((a, b) => a + b, 0);
    const sumXY = xs.reduce((sum, x, i) => sum + x * ys[i], 0);
    const sumX2 = xs.reduce((sum, x) => sum + x * x, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX || 1);

    const meanY = sumY / n;
    const ssTotal = ys.reduce((s, y) => s + (y - meanY) ** 2, 0);
    const ssResidual = ys.reduce(
      (s, y, i) => s + (y - (slope * xs[i] + (meanY - slope * (sumX / n)))) ** 2,
      0,
    );
    const strength = ssTotal === 0 ? 0 : 1 - ssResidual / ssTotal;

    const threshold = 0.01;
    let direction: TrendDirection = 'flat';
    if (slope > threshold) direction = 'up';
    else if (slope < -threshold) direction = 'down';

    return { direction, slope, strength: Math.max(0, Math.min(1, strength)) };
  }
}
