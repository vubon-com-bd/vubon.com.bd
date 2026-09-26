export interface DataPoint {
  readonly timestamp: Date;
  readonly value: number;
}

export interface Anomaly {
  readonly timestamp: Date;
  readonly value: number;
  readonly expectedValue: number;
  readonly zScore: number;
  readonly severity: 'low' | 'medium' | 'high';
}

export class AnomalyDetectionService {
  private static readonly LOW = 2;
  private static readonly MEDIUM = 3;
  private static readonly HIGH = 4;

  /**
   * Z-score based anomaly detection.
   */
  detect(series: readonly DataPoint[], threshold = 2): readonly Anomaly[] {
    if (series.length < 3) return [];

    const mean = series.reduce((s, p) => s + p.value, 0) / series.length;
    const variance =
      series.reduce((s, p) => s + (p.value - mean) ** 2, 0) / series.length;
    const stdDev = Math.sqrt(variance);

    if (stdDev === 0) return [];

    const anomalies: Anomaly[] = [];
    for (const point of series) {
      const z = Math.abs((point.value - mean) / stdDev);
      if (z >= threshold) {
        anomalies.push({
          timestamp: point.timestamp,
          value: point.value,
          expectedValue: mean,
          zScore: z,
          severity: this.classify(z),
        });
      }
    }
    return anomalies;
  }

  private classify(z: number): 'low' | 'medium' | 'high' {
    if (z >= AnomalyDetectionService.HIGH) return 'high';
    if (z >= AnomalyDetectionService.MEDIUM) return 'medium';
    return 'low';
  }

  /**
   * IQR-based outlier detection.
   */
  detectIqr(series: readonly DataPoint[]): readonly Anomaly[] {
    if (series.length < 4) return [];

    const sorted = [...series].map((p) => p.value).sort((a, b) => a - b);
    const q1 = sorted[Math.floor(sorted.length * 0.25)];
    const q3 = sorted[Math.floor(sorted.length * 0.75)];
    const iqr = q3 - q1;
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;
    const median = sorted[Math.floor(sorted.length / 2)];

    return series
      .filter((p) => p.value < lowerBound || p.value > upperBound)
      .map((p) => ({
        timestamp: p.timestamp,
        value: p.value,
        expectedValue: median,
        zScore: Math.abs(p.value - median) / (iqr || 1),
        severity: p.value < lowerBound || p.value > upperBound ? 'high' : 'low',
      }));
  }
}
