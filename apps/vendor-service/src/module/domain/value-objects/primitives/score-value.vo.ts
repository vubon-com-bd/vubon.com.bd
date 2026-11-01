/**
 * ScoreValue Value Object
 * @module vendor-service/domain/value-objects/primitives
 *
 * Generic performance score: 0 – 100
 * Used for performance metrics, grades etc.
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_PERFORMANCE_GRADE } from '@vubon/shared-constants/business';

export type PerformanceGradeValue =
  (typeof VENDOR_PERFORMANCE_GRADE)[keyof typeof VENDOR_PERFORMANCE_GRADE];

const MIN = 0;
const MAX = 100;
const DECIMALS = 2;

export class ScoreValueVO extends BaseVO<number> {
  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): ScoreValueVO {
    if (typeof raw !== 'number' || !Number.isFinite(raw)) {
      throw new ValidationError('ScoreValue must be a finite number', 'score');
    }
    if (raw < MIN || raw > MAX) {
      throw new ValidationError(
        `ScoreValue must be between ${MIN} and ${MAX}`,
        'score',
      );
    }
    const factor = Math.pow(10, DECIMALS);
    const rounded = Math.round(raw * factor) / factor;
    return new ScoreValueVO(rounded);
  }

  static reconstitute(raw: number): ScoreValueVO {
    return new ScoreValueVO(raw);
  }

  get score(): number {
    return this.value;
  }

  isExcellent(): boolean {
    return this.value >= 90;
  }

  isGood(): boolean {
    return this.value >= 80 && this.value < 90;
  }

  isAverage(): boolean {
    return this.value >= 70 && this.value < 80;
  }

  isPoor(): boolean {
    return this.value < 70;
  }

  /**
   * Compute grade from score using VENDOR_PERFORMANCE thresholds.
   */
  grade(): PerformanceGradeValue {
    const v = this.value;
    if (v >= 95) return 'a_plus';
    if (v >= 90) return 'a';
    if (v >= 80) return 'b';
    if (v >= 70) return 'c';
    if (v >= 60) return 'd';
    return 'f';
  }

  /** Whether this score triggers auto-suspension */
  triggersAutoSuspend(): boolean {
    return this.value < 40;
  }

  /** Whether this score triggers warning */
  triggersWarning(): boolean {
    return this.value < 60;
  }
}
