import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

const MIN_SCORE = 1;
const MAX_SCORE = 5;

export class SatisfactionScoreVO extends BaseVO<number> {
  static create(value: number): SatisfactionScoreVO {
    if (!Number.isFinite(value)) {
      throw new Error('Satisfaction score must be a finite number');
    }
    if (!Number.isInteger(value)) {
      throw new Error('Satisfaction score must be an integer');
    }
    if (value < MIN_SCORE || value > MAX_SCORE) {
      throw new Error(`Satisfaction score must be between ${MIN_SCORE} and ${MAX_SCORE}`);
    }
    return new SatisfactionScoreVO(value);
  }

  private constructor(value: number) {
    super(value);
  }

  isPositive(): boolean {
    return this.value >= 4;
  }

  isNeutral(): boolean {
    return this.value === 3;
  }

  isNegative(): boolean {
    return this.value <= 2;
  }
}
