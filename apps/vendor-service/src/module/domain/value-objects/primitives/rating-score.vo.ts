/**
 * RatingScore Value Object — 0 to 5, 1 decimal
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_RATING } from '@vubon/shared-constants/business';

const MIN = VENDOR_RATING.MIN;
const MAX = VENDOR_RATING.MAX;
const DECIMALS = VENDOR_RATING.DECIMAL_PLACES;

export class RatingScoreVO extends BaseVO<number> {
  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): RatingScoreVO {
    if (!Number.isFinite(raw)) {
      throw new ValidationError('Rating score must be a finite number', 'rating');
    }
    if (raw < 0 || raw > MAX) {
      throw new ValidationError(
        `Rating score must be between 0 and ${MAX}`,
        'rating',
      );
    }
    const factor = Math.pow(10, DECIMALS);
    const rounded = Math.round(raw * factor) / factor;
    return new RatingScoreVO(rounded);
  }

  static reconstitute(raw: number): RatingScoreVO {
    return new RatingScoreVO(raw);
  }

  static zero(): RatingScoreVO {
    return new RatingScoreVO(0);
  }

  static max(): RatingScoreVO {
    return new RatingScoreVO(MAX);
  }

  isPositive(): boolean {
    return this.value >= 4;
  }

  isNeutral(): boolean {
    return this.value >= 3 && this.value < 4;
  }

  isNegative(): boolean {
    return this.value > 0 && this.value < 3;
  }

  /** Auto-hide threshold check. */
  shouldAutoHide(): boolean {
    return this.value > 0 && this.value < VENDOR_RATING.AUTO_HIDE_BELOW;
  }

  /** Auto-flag threshold check. */
  shouldAutoFlag(): boolean {
    return this.value > 0 && this.value < VENDOR_RATING.AUTO_FLAG_BELOW;
  }

  asStars(): string {
    const full = Math.floor(this.value);
    return '★'.repeat(full) + '☆'.repeat(MAX - full);
  }
}
