import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { CohortIdVO } from '../primitives/cohort-id.vo';

export interface CohortAnalysisProps {
  readonly cohortId: CohortIdVO;
  readonly initialSize: number;
  readonly retainedSizes: readonly number[];
}

export class CohortAnalysisVO extends BaseVO<CohortAnalysisProps> {
  static create(props: CohortAnalysisProps): CohortAnalysisVO {
    if (props.initialSize < 0) {
      throw new Error('Initial size cannot be negative');
    }
    if (props.retainedSizes.some((s) => s < 0)) {
      throw new Error('Retained sizes cannot be negative');
    }
    return new CohortAnalysisVO(
      Object.freeze({
        ...props,
        retainedSizes: Object.freeze([...props.retainedSizes]),
      }),
    );
  }

  private constructor(value: CohortAnalysisProps) {
    super(value);
  }

  get cohortId(): CohortIdVO { return this.value.cohortId; }
  get initialSize(): number { return this.value.initialSize; }
  get retainedSizes(): readonly number[] { return this.value.retainedSizes; }

  get retentionRates(): readonly number[] {
    if (this.value.initialSize === 0) {
      return this.value.retainedSizes.map(() => 0);
    }
    return this.value.retainedSizes.map(
      (s) => (s / this.value.initialSize) * 100,
    );
  }

  retentionAt(period: number): number {
    const rate = this.retentionRates[period];
    return rate ?? 0;
  }

  churnedAt(period: number): number {
    const size = this.value.retainedSizes[period] ?? 0;
    return this.value.initialSize - size;
  }

  get isRetentionHealthy(): boolean {
    return this.getAverageRetention() >= 40;
  }

  private getAverageRetention(): number {
    const rates = this.retentionRates;
    if (rates.length === 0) return 0;
    return rates.reduce((a, b) => a + b, 0) / rates.length;
  }
}
