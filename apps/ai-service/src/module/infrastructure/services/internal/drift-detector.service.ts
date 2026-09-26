import { Injectable } from '@nestjs/common';

interface DriftInput {
  readonly metricName: string;
  readonly baseline: number;
  readonly current: number;
  readonly threshold: number;
}

interface DriftResult {
  readonly drifted: boolean;
  readonly relativeChange: number;
  readonly severity: 'none' | 'low' | 'medium' | 'high';
}

@Injectable()
export class DriftDetectorService {
  detect(input: DriftInput): DriftResult {
    const relativeChange = input.baseline === 0 ? 0 : Math.abs((input.current - input.baseline) / input.baseline);
    return {
      drifted: relativeChange >= input.threshold,
      relativeChange,
      severity: this.classify(relativeChange, input.threshold),
    };
  }

  private classify(relativeChange: number, threshold: number): 'none' | 'low' | 'medium' | 'high' {
    if (relativeChange < threshold) return 'none';
    if (relativeChange < threshold * 1.5) return 'low';
    if (relativeChange < threshold * 2.5) return 'medium';
    return 'high';
  }
}
