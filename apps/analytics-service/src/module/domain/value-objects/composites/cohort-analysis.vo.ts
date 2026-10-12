/**
 * Cohort Analysis Value Object (Composite)
 * @module analytics-service/domain/value-objects/composites
 *
 * Cohort retention analysis result।
 * Business Rule:
 * - Retention rates monotonically ≤ 1
 * - Period 0 = 100% (baseline)
 * - Max 12 periods
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base';
import { CohortIdVO } from '../primitives/cohort-id.vo.js';

export interface CohortAnalysisVOProps {
  readonly cohortId: CohortIdVO;
  readonly cohortSize: number;
  readonly retentionRates: readonly number[];
}

export class CohortAnalysisVO extends BaseVO<CohortAnalysisVOProps> {
  private constructor(props: CohortAnalysisVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: CohortAnalysisVOProps): CohortAnalysisVO {
    if (!props.cohortId) {
      throw new Error('CohortAnalysisVO requires cohortId');
    }
    if (!Number.isInteger(props.cohortSize) || props.cohortSize <= 0) {
      throw new Error('CohortAnalysisVO cohortSize must be positive integer');
    }
    if (props.retentionRates.length === 0) {
      throw new Error('CohortAnalysisVO requires at least one retention rate');
    }
    if (props.retentionRates.length > 12) {
      throw new Error('CohortAnalysisVO supports max 12 periods');
    }

    for (let i = 0; i < props.retentionRates.length; i++) {
      const rate = props.retentionRates[i];
      if (!Number.isFinite(rate) || rate < 0 || rate > 1) {
        throw new Error(`Retention rate at period ${i} must be 0-1`);
      }
    }

    // Period 0 must be 1.0
    if (props.retentionRates[0] !== 1) {
      throw new Error('CohortAnalysisVO period 0 retention must be 1.0');
    }

    return new CohortAnalysisVO(props);
  }

  get cohortId(): CohortIdVO {
    return this.value.cohortId;
  }

  get cohortSize(): number {
    return this.value.cohortSize;
  }

  get retentionRates(): readonly number[] {
    return this.value.retentionRates;
  }

  /** Period count */
  periodCount(): number {
    return this.retentionRates.length;
  }

  /** Retention at specific period */
  retentionAt(period: number): number {
    return this.retentionRates[period] ?? 0;
  }

  /** Period 1 retention (D1/W1/M1) */
  retention1(): number {
    return this.retentionAt(1);
  }

  /** Period 7 retention (D7) */
  retention7(): number {
    return this.retentionAt(7);
  }

  /** Period 30 retention (D30) */
  retention30(): number {
    return this.retentionAt(30);
  }

  /** Retention decay rate (average drop between periods) */
  decayRate(): number {
    if (this.retentionRates.length < 2) return 0;
    let totalDrop = 0;
    for (let i = 1; i < this.retentionRates.length; i++) {
      totalDrop += this.retentionRates[i - 1] - this.retentionRates[i];
    }
    return Math.round((totalDrop / (this.retentionRates.length - 1)) * 10000) / 10000;
  }

  /** Churn rate at period 1 */
  churn1(): number {
    return Math.round((1 - this.retention1()) * 10000) / 10000;
  }

  /** Users retained at period N */
  retainedUsersAt(period: number): number {
    return Math.round(this.cohortSize * this.retentionAt(period));
  }

  /** Long-term retention (last period) */
  longTermRetention(): number {
    return this.retentionRates[this.retentionRates.length - 1];
  }
}
