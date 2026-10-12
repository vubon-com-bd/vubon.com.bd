/**
 * Anomaly Detector Service
 * @module analytics-service/domain/services
 *
 * Statistical anomaly detection (Z-score, IQR)।
 * Business Rule:
 * - Z-score > 3 = extreme outlier
 * - Z-score > 2 = moderate outlier
 * - IQR-based detection for skewed data
 */
export interface TimeSeriesValue {
  readonly timestamp: number;
  readonly value: number;
}

export interface Anomaly {
  readonly timestamp: number;
  readonly value: number;
  readonly expected: number;
  readonly zScore: number;
  readonly severity: 'low' | 'medium' | 'high';
}

export class AnomalyDetectorService {
  /**
   * Z-score based detection
   */
  detectZScore(
    values: readonly TimeSeriesValue[],
    threshold: number = 2
  ): readonly Anomaly[] {
    if (values.length < 5) return [];

    const nums = values.map((v) => v.value);
    const mean = this.mean(nums);
    const stddev = this.stddev(nums, mean);

    if (stddev === 0) return [];

    const anomalies: Anomaly[] = [];
    for (const v of values) {
      const z = (v.value - mean) / stddev;
      const absZ = Math.abs(z);

      if (absZ >= threshold) {
        anomalies.push({
          timestamp: v.timestamp,
          value: v.value,
          expected: mean,
          zScore: Math.round(z * 100) / 100,
          severity: absZ >= 3 ? 'high' : absZ >= 2.5 ? 'medium' : 'low',
        });
      }
    }

    return anomalies;
  }

  /**
   * IQR-based detection (robust to outliers)
   */
  detectIQR(values: readonly TimeSeriesValue[], multiplier = 1.5): readonly Anomaly[] {
    if (values.length < 5) return [];

    const sorted = [...values].sort((a, b) => a.value - b.value);
    const q1 = this.quantile(sorted.map((v) => v.value), 0.25);
    const q3 = this.quantile(sorted.map((v) => v.value), 0.75);
    const iqr = q3 - q1;
    const lower = q1 - multiplier * iqr;
    const upper = q3 + multiplier * iqr;

    const anomalies: Anomaly[] = [];
    const median = this.quantile(sorted.map((v) => v.value), 0.5);
    const stddev = this.stddev(sorted.map((v) => v.value), median);

    for (const v of values) {
      if (v.value < lower || v.value > upper) {
        const z = stddev > 0 ? (v.value - median) / stddev : 0;
        const absZ = Math.abs(z);
        anomalies.push({
          timestamp: v.timestamp,
          value: v.value,
          expected: median,
          zScore: Math.round(z * 100) / 100,
          severity: absZ >= 3 ? 'high' : absZ >= 2 ? 'medium' : 'low',
        });
      }
    }

    return anomalies;
  }

  /**
   * Detect spike (sudden increase)
   */
  detectSpikes(
    values: readonly TimeSeriesValue[],
    percentThreshold = 100
  ): readonly Anomaly[] {
    if (values.length < 2) return [];
    const sorted = [...values].sort((a, b) => a.timestamp - b.timestamp);
    const anomalies: Anomaly[] = [];

    for (let i = 1; i < sorted.length; i++) {
      const prev = sorted[i - 1].value;
      const curr = sorted[i].value;

      if (prev > 0 && curr > 0) {
        const changePercent = ((curr - prev) / prev) * 100;
        if (changePercent >= percentThreshold) {
          anomalies.push({
            timestamp: sorted[i].timestamp,
            value: curr,
            expected: prev,
            zScore: Math.round((changePercent / 100) * 100) / 100,
            severity: changePercent >= 300 ? 'high' : changePercent >= 200 ? 'medium' : 'low',
          });
        }
      }
    }

    return anomalies;
  }

  // ─── Private ────────────────────────────────

  private mean(values: readonly number[]): number {
    if (values.length === 0) return 0;
    return values.reduce((a, b) => a + b, 0) / values.length;
  }

  private stddev(values: readonly number[], mean: number): number {
    if (values.length < 2) return 0;
    const variance =
      values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;
    return Math.sqrt(variance);
  }

  private quantile(sortedValues: readonly number[], q: number): number {
    if (sortedValues.length === 0) return 0;
    const idx = q * (sortedValues.length - 1);
    const lower = Math.floor(idx);
    const upper = Math.ceil(idx);
    const weight = idx - lower;

    if (lower === upper) return sortedValues[lower];
    return sortedValues[lower] * (1 - weight) + sortedValues[upper] * weight;
  }
}
