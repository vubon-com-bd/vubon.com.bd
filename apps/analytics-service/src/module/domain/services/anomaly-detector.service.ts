import { MetricValueVO } from '../value-objects/primitives/metric-value.vo';

export interface AnomalyResult {
  readonly isAnomaly: boolean;
  readonly zScore: number;
  readonly severity: 'low' | 'medium' | 'high';
}

export class AnomalyDetectorService {
  /**
   * Detect anomaly using Z-score (value vs. history).
   */
  detect(current: number, history: readonly number[], threshold = 3): AnomalyResult {
    if (history.length < 2) {
      return { isAnomaly: false, zScore: 0, severity: 'low' };
    }

    const mean = history.reduce((a, b) => a + b, 0) / history.length;
    const variance =
      history.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / history.length;
    const std = Math.sqrt(variance);

    if (std === 0) {
      return { isAnomaly: current !== mean, zScore: 0, severity: 'low' };
    }

    const zScore = Math.abs((current - mean) / std);
    const isAnomaly = zScore >= threshold;

    let severity: 'low' | 'medium' | 'high' = 'low';
    if (isAnomaly) {
      severity = zScore >= threshold * 2 ? 'high' : zScore >= threshold * 1.5 ? 'medium' : 'low';
    }

    return { isAnomaly, zScore, severity };
  }
}
