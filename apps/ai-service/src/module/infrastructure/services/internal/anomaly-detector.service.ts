import { Injectable } from '@nestjs/common';

interface DataPoint { readonly timestamp: Date; readonly value: number; }
interface Anomaly { readonly timestamp: Date; readonly value: number; readonly expectedValue: number; readonly zScore: number; readonly severity: 'low' | 'medium' | 'high'; }

@Injectable()
export class AnomalyDetectorService {
  detect(series: readonly DataPoint[], threshold = 2): readonly Anomaly[] {
    if (series.length < 3) return [];
    const mean = series.reduce((s, p) => s + p.value, 0) / series.length;
    const variance = series.reduce((s, p) => s + (p.value - mean) ** 2, 0) / series.length;
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
          severity: z >= 4 ? 'high' : z >= 3 ? 'medium' : 'low',
        });
      }
    }
    return anomalies;
  }

  detectIqr(series: readonly DataPoint[]): readonly Anomaly[] {
    if (series.length < 4) return [];
    const sorted = [...series].map((p) => p.value).sort((a, b) => a - b);
    const q1 = sorted[Math.floor(sorted.length * 0.25)];
    const q3 = sorted[Math.floor(sorted.length * 0.75)];
    const iqr = q3 - q1;
    const lower = q1 - 1.5 * iqr;
    const upper = q3 + 1.5 * iqr;
    const median = sorted[Math.floor(sorted.length / 2)];
    return series.filter((p) => p.value < lower || p.value > upper).map((p) => ({
      timestamp: p.timestamp,
      value: p.value,
      expectedValue: median,
      zScore: Math.abs(p.value - median) / (iqr || 1),
      severity: 'high' as const,
    }));
  }
}
