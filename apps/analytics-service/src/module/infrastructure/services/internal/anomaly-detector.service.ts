import { Injectable } from '@nestjs/common';

export interface AnomalyResult {
  readonly isAnomaly: boolean;
  readonly zScore: number;
  readonly severity: 'low' | 'medium' | 'high';
  readonly mean: number;
  readonly stddev: number;
}

@Injectable()
export class AnomalyDetectorService {
  /**
   * Detect anomaly using Z-score.
   */
  detect(
    current: number,
    history: readonly number[],
    threshold = 3,
  ): AnomalyResult {
    if (history.length < 2) {
      return {
        isAnomaly: false,
        zScore: 0,
        severity: 'low',
        mean: current,
        stddev: 0,
      };
    }

    const mean = history.reduce((a, b) => a + b, 0) / history.length;
    const variance =
      history.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / history.length;
    const stddev = Math.sqrt(variance);

    if (stddev === 0) {
      return {
        isAnomaly: current !== mean,
        zScore: current !== mean ? Infinity : 0,
        severity: current !== mean ? 'high' : 'low',
        mean,
        stddev: 0,
      };
    }

    const zScore = Math.abs((current - mean) / stddev);
    const isAnomaly = zScore >= threshold;

    let severity: 'low' | 'medium' | 'high' = 'low';
    if (isAnomaly) {
      if (zScore >= threshold * 2) severity = 'high';
      else if (zScore >= threshold * 1.5) severity = 'medium';
      else severity = 'low';
    }

    return { isAnomaly, zScore, severity, mean, stddev };
  }

  /**
   * Detect using IQR (interquartile range) — robust against outliers.
   */
  detectIQR(current: number, history: readonly number[]): boolean {
    if (history.length < 4) return false;
    const sorted = [...history].sort((a, b) => a - b);
    const q1 = sorted[Math.floor(sorted.length * 0.25)]!;
    const q3 = sorted[Math.floor(sorted.length * 0.75)]!;
    const iqr = q3 - q1;
    const lower = q1 - 1.5 * iqr;
    const upper = q3 + 1.5 * iqr;
    return current < lower || current > upper;
  }
}
