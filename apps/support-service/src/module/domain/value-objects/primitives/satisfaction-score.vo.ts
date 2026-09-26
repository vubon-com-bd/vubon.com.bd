/**
 * SatisfactionScoreVO — CSAT score 1-5
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseRatingVO (actual: extends BaseVO<number> via RatingVO pattern)
 * Business: 1=very bad, 2=bad, 3=neutral, 4=good, 5=very good
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_SCORE = 1;
const MAX_SCORE = 5;

export class SatisfactionScoreVO extends BaseVO<number> {
  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): SatisfactionScoreVO {
    if (typeof raw !== 'number' || !Number.isFinite(raw)) {
      throw new ValidationError('SatisfactionScore must be a finite number', 'satisfactionScore');
    }
    if (!Number.isInteger(raw)) {
      throw new ValidationError('SatisfactionScore must be an integer', 'satisfactionScore');
    }
    if (raw < MIN_SCORE || raw > MAX_SCORE) {
      throw new ValidationError(
        `SatisfactionScore must be between ${MIN_SCORE} and ${MAX_SCORE}`,
        'satisfactionScore',
      );
    }
    return new SatisfactionScoreVO(raw);
  }

  static veryBad(): SatisfactionScoreVO {
    return new SatisfactionScoreVO(1);
  }

  static veryGood(): SatisfactionScoreVO {
    return new SatisfactionScoreVO(5);
  }

  get isPositive(): boolean {
    return this.value >= 4;
  }

  get isNeutral(): boolean {
    return this.value === 3;
  }

  get isNegative(): boolean {
    return this.value <= 2;
  }

  get percentage(): number {
    return (this.value / MAX_SCORE) * 100;
  }

  isHigherThan(other: SatisfactionScoreVO): boolean {
    return this.value > other.value;
  }
}
