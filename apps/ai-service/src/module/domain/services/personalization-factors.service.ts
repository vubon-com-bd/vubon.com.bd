import { PersonalizationSignalVO } from '../value-objects/primitives/personalization-signal.vo';

export interface SignalInput {
  readonly signal: PersonalizationSignalVO;
  readonly weight: number;
}

export class PersonalizationFactorsService {
  /**
   * Aggregate weighted signals into a normalized factor score.
   */
  aggregate(signals: readonly SignalInput[]): number {
    if (signals.length === 0) return 0;

    const totalWeight = signals.reduce((sum, s) => sum + s.weight, 0);
    if (totalWeight === 0) return 0;

    const weightedSum = signals.reduce(
      (sum, s) => sum + s.weight,
      0,
    );
    return Math.min(1, weightedSum / totalWeight);
  }

  /**
   * Filter signals above a threshold.
   */
  significantSignals(
    signals: readonly SignalInput[],
    threshold = 0.5,
  ): readonly SignalInput[] {
    return signals.filter((s) => s.weight >= threshold);
  }

  /**
   * Combine multiple factor scores into a single composite.
   */
  compose(factors: readonly number[]): number {
    if (factors.length === 0) return 0;
    const sum = factors.reduce((a, b) => a + b, 0);
    return sum / factors.length;
  }
}
