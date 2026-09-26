import { ANALYTICS_TREND_TYPE } from '@vubon/shared-constants/platform/analytics';

export interface TrendResult {
  readonly direction: string;
  readonly slope: number;
  readonly strength: number;
}

export class TrendDetectorService {
  /**
   * Detect linear trend direction and strength using least squares.
   */
  detect(values: readonly number[]): TrendResult {
    if (values.length < 2) {
      return { direction: ANALYTICS_TREND_TYPE.STABLE, slope: 0, strength: 0 };
    }

    const n = values.length;
    const meanX = (n - 1) / 2;
    const meanY = values.reduce((a, b) => a + b, 0) / n;

    let num = 0;
    let den = 0;
    for (let i = 0; i < n; i++) {
      num += (i - meanX) * (values[i]! - meanY);
      den += Math.pow(i - meanX, 2);
    }

    const slope = den === 0 ? 0 : num / den;

    // R² as strength
    const yPred = values.map((_, i) => meanY + slope * (i - meanX));
    const ssTot = values.reduce((s, v) => s + Math.pow(v - meanY, 2), 0);
    const ssRes = values.reduce((s, v, i) => s + Math.pow(v - yPred[i]!, 2), 0);
    const strength = ssTot === 0 ? 0 : Math.max(0, 1 - ssRes / ssTot);

    let direction: string = ANALYTICS_TREND_TYPE.STABLE;
    if (slope > 0.001) direction = ANALYTICS_TREND_TYPE.UPWARD;
    else if (slope < -0.001) direction = ANALYTICS_TREND_TYPE.DOWNWARD;

    return { direction, slope, strength };
  }
}
