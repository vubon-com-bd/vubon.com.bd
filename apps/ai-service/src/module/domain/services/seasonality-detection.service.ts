export interface DataPoint {
  readonly timestamp: Date;
  readonly value: number;
}

export interface SeasonalityResult {
  readonly detected: boolean;
  readonly period: number;
  readonly strength: number;
}

export class SeasonalityDetectionService {
  /**
   * Autocorrelation-based seasonality detection.
   */
  detect(
    series: readonly DataPoint[],
    maxPeriod: number,
    threshold = 0.5,
  ): SeasonalityResult {
    if (series.length < maxPeriod * 2) {
      return { detected: false, period: 0, strength: 0 };
    }

    const values = series.map((p) => p.value);
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((s, v) => s + (v - mean) ** 2, 0);

    if (variance === 0) {
      return { detected: false, period: 0, strength: 0 };
    }

    let bestPeriod = 0;
    let bestCorrelation = 0;

    for (let lag = 1; lag <= maxPeriod; lag++) {
      const correlation = this.autocorrelation(values, mean, variance, lag);
      if (correlation > bestCorrelation) {
        bestCorrelation = correlation;
        bestPeriod = lag;
      }
    }

    return {
      detected: bestCorrelation >= threshold,
      period: bestPeriod,
      strength: bestCorrelation,
    };
  }

  private autocorrelation(
    values: readonly number[],
    mean: number,
    variance: number,
    lag: number,
  ): number {
    let sum = 0;
    for (let i = 0; i < values.length - lag; i++) {
      sum += (values[i] - mean) * (values[i + lag] - mean);
    }
    return sum / variance;
  }
}
