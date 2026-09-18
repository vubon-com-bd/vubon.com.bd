/**
 * Rating Value Object (1-5)
 * @module shared-kernel/domain/primitives
 *
 * Values আসে shared-constants/common থেকে।
 */
import { VALIDATION } from '@vubon/shared-constants/common';
import { BaseVO } from '../base/base.vo';

export class RatingVO extends BaseVO<number> {
  private static readonly MIN = 1;
  private static readonly MAX = 5;

  private constructor(value: number) {
    super(value);
  }

  static of(raw: number): RatingVO {
    if (!Number.isFinite(raw)) {
      throw new Error('Rating must be a finite number');
    }
    if (!Number.isInteger(raw)) {
      throw new Error('Rating must be an integer');
    }
    if (raw < RatingVO.MIN || raw > RatingVO.MAX) {
      throw new Error(`Rating must be between ${RatingVO.MIN} and ${RatingVO.MAX}`);
    }
    return new RatingVO(raw);
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

/**
 * Reference to satisfy import contract.
 */
export const RATING_COMMENT_MAX_LENGTH = VALIDATION.COMMENT_MAX_LENGTH;
