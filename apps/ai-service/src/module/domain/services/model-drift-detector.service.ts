export interface DriftInput {
  readonly metricName: string;
  readonly baseline: number;
  readonly current: number;
  readonly threshold: number;
}

export interface DriftResult {
  readonly drifted: boolean;
  readonly delta: number;
  readonly relativeChange: number;
  readonly severity: 'none' | 'low' | 'medium' | 'high';
}

export class ModelDriftDetectorService {
  detect(input: DriftInput): DriftResult {
    const delta = input.current - input.baseline;
    const relativeChange =
      input.baseline === 0 ? 0 : Math.abs(delta / input.baseline);

    const drifted = relativeChange >= input.threshold;

    return {
      drifted,
      delta,
      relativeChange,
      severity: this.classify(relativeChange, input.threshold),
    };
  }

  private classify(
    relativeChange: number,
    threshold: number,
  ): 'none' | 'low' | 'medium' | 'high' {
    if (relativeChange < threshold) return 'none';
    if (relativeChange < threshold * 1.5) return 'low';
    if (relativeChange < threshold * 2.5) return 'medium';
    return 'high';
  }

  detectMulti(metrics: readonly DriftInput[]): readonly {
    readonly metricName: string;
    readonly result: DriftResult;
  }[] {
    return metrics.map((m) => ({
      metricName: m.metricName,
      result: this.detect(m),
    }));
  }

  hasAnyDrift(metrics: readonly DriftInput[]): boolean {
    return metrics.some((m) => this.detect(m).drifted);
  }
}
