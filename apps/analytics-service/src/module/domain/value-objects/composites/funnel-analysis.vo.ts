/**
 * Funnel Analysis Value Object (Composite)
 * @module analytics-service/domain/value-objects/composites
 *
 * Funnel conversion analysis result।
 * Business Rule:
 * - Users monotonically decreasing per step
 * - Step 0 = entry point (baseline)
 * - Conversion rates 0-1
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base';
import { FunnelIdVO } from '../primitives/funnel-id.vo.js';

export interface FunnelAnalysisVOProps {
  readonly funnelId: FunnelIdVO;
  readonly stepCounts: readonly number[];
}

export class FunnelAnalysisVO extends BaseVO<FunnelAnalysisVOProps> {
  private constructor(props: FunnelAnalysisVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: FunnelAnalysisVOProps): FunnelAnalysisVO {
    if (!props.funnelId) {
      throw new Error('FunnelAnalysisVO requires funnelId');
    }
    if (props.stepCounts.length < 2) {
      throw new Error('FunnelAnalysisVO requires at least 2 steps');
    }

    for (let i = 0; i < props.stepCounts.length; i++) {
      const c = props.stepCounts[i];
      if (!Number.isInteger(c) || c < 0) {
        throw new Error(`Step ${i} count must be non-negative integer`);
      }
    }

    // Monotonically decreasing
    for (let i = 1; i < props.stepCounts.length; i++) {
      if (props.stepCounts[i] > props.stepCounts[i - 1]) {
        throw new Error(
          `Funnel step ${i} count (${props.stepCounts[i]}) exceeds step ${i - 1} (${props.stepCounts[i - 1]})`
        );
      }
    }

    return new FunnelAnalysisVO(props);
  }

  get funnelId(): FunnelIdVO {
    return this.value.funnelId;
  }

  get stepCounts(): readonly number[] {
    return this.value.stepCounts;
  }

  /** Entry count (step 0) */
  entryCount(): number {
    return this.stepCounts[0];
  }

  /** Final step count */
  finalCount(): number {
    return this.stepCounts[this.stepCounts.length - 1];
  }

  /** Drop-off at step N */
  dropOffAt(step: number): number {
    if (step <= 0 || step >= this.stepCounts.length) return 0;
    return this.stepCounts[step - 1] - this.stepCounts[step];
  }

  /** Drop-off rate at step N */
  dropOffRateAt(step: number): number {
    const prev = this.stepCounts[step - 1] ?? 0;
    if (prev === 0) return 0;
    return Math.round((this.dropOffAt(step) / prev) * 10000) / 10000;
  }

  /** Overall conversion rate (final / entry) */
  overallConversionRate(): number {
    if (this.entryCount() === 0) return 0;
    return Math.round((this.finalCount() / this.entryCount()) * 10000) / 10000;
  }

  /** Step N → N+1 conversion rate */
  stepConversionRate(step: number): number {
    if (step < 1 || step >= this.stepCounts.length) return 0;
    const prev = this.stepCounts[step - 1];
    if (prev === 0) return 0;
    return Math.round((this.stepCounts[step] / prev) * 10000) / 10000;
  }

  /** Biggest drop-off step */
  biggestDropOffStep(): number {
    let maxDrop = 0;
    let maxStep = 0;
    for (let i = 1; i < this.stepCounts.length; i++) {
      const drop = this.dropOffAt(i);
      if (drop > maxDrop) {
        maxDrop = drop;
        maxStep = i;
      }
    }
    return maxStep;
  }

  /** Average step conversion */
  averageStepConversion(): number {
    if (this.stepCounts.length < 2) return 0;
    let sum = 0;
    let count = 0;
    for (let i = 1; i < this.stepCounts.length; i++) {
      sum += this.stepConversionRate(i);
      count++;
    }
    return count > 0 ? Math.round((sum / count) * 10000) / 10000 : 0;
  }
}
