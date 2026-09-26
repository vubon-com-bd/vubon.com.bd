import { InsightConfidenceVO } from '../value-objects/primitives/insight-confidence.vo';

export interface ConfidenceInput {
  readonly sampleSize: number;
  readonly dataQuality: number;      // 0..1
  readonly modelAccuracy: number;    // 0..1
  readonly consistency: number;      // 0..1
}

export class ConfidenceCalculatorService {
  private static readonly SAMPLE_SATURATION = 1000;

  calculate(input: ConfidenceInput): InsightConfidenceVO {
    const sampleFactor = Math.min(
      1,
      input.sampleSize / ConfidenceCalculatorService.SAMPLE_SATURATION,
    );

    const confidence =
      0.3 * sampleFactor +
      0.3 * this.clamp(input.dataQuality) +
      0.3 * this.clamp(input.modelAccuracy) +
      0.1 * this.clamp(input.consistency);

    return InsightConfidenceVO.create(Math.max(0, Math.min(1, confidence)));
  }

  private clamp(value: number): number {
    return Math.max(0, Math.min(1, value));
  }

  isReliable(input: ConfidenceInput, threshold = 0.7): boolean {
    return this.calculate(input).value >= threshold;
  }
}
