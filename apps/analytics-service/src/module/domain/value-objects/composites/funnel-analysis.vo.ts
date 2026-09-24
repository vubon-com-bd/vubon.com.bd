import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { FunnelIdVO } from '../primitives/funnel-id.vo';
import { FunnelStepVO } from '../primitives/funnel-step.vo';

export interface FunnelAnalysisProps {
  readonly funnelId: FunnelIdVO;
  readonly steps: readonly FunnelStepVO[];
  readonly counts: readonly number[];
}

export class FunnelAnalysisVO extends BaseVO<FunnelAnalysisProps> {
  static create(props: FunnelAnalysisProps): FunnelAnalysisVO {
    if (props.counts.length !== props.steps.length) {
      throw new Error(
        `Counts length (${props.counts.length}) must match steps length (${props.steps.length})`,
      );
    }
    if (props.counts.some((c) => c < 0)) {
      throw new Error('Counts cannot be negative');
    }
    return new FunnelAnalysisVO(
      Object.freeze({
        ...props,
        steps: Object.freeze([...props.steps]),
        counts: Object.freeze([...props.counts]),
      }),
    );
  }

  private constructor(value: FunnelAnalysisProps) {
    super(value);
  }

  get funnelId(): FunnelIdVO { return this.value.funnelId; }
  get steps(): readonly FunnelStepVO[] { return this.value.steps; }
  get counts(): readonly number[] { return this.value.counts; }

  get initialCount(): number {
    return this.value.counts[0] ?? 0;
  }

  get finalCount(): number {
    return this.value.counts[this.value.counts.length - 1] ?? 0;
  }

  get overallConversionRate(): number {
    const first = this.initialCount;
    if (first === 0) return 0;
    return (this.finalCount / first) * 100;
  }

  getStepConversionRate(index: number): number {
    if (index <= 0 || index >= this.value.counts.length) return 0;
    const prev = this.value.counts[index - 1] ?? 0;
    const curr = this.value.counts[index] ?? 0;
    if (prev === 0) return 0;
    return (curr / prev) * 100;
  }

  getDropOffRate(index: number): number {
    return 100 - this.getStepConversionRate(index);
  }

  getBiggestDropOffStep(): number {
    let worstIdx = -1;
    let worstRate = 100;
    for (let i = 1; i < this.value.counts.length; i++) {
      const conv = this.getStepConversionRate(i);
      if (conv < worstRate) {
        worstRate = conv;
        worstIdx = i;
      }
    }
    return worstIdx;
  }
}
