/**
 * RatingValue Value Object
 * @module vendor-service/domain/value-objects/primitives
 *
 * Business Rules:
 * - 1 – 5 stars
 * - Rounded to 1 decimal place (e.g. 4.5)
 * - Supports 0 for "no ratings yet"
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_RATING } from '@vubon/shared-constants/business';

const MIN = VENDOR_RATING.MIN;  // 1
const MAX = VENDOR_RATING.MAX;  // 5
const DEFAULT = VENDOR_RATING.DEFAULT;  // 0
const DECIMALS = VENDOR_RATING.DECIMAL_PLACES;  // 1

export class RatingValueVO extends BaseVO<number> {
  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): RatingValueVO {
    if (typeof raw !== 'number' || !Number.isFinite(raw)) {
      throw new ValidationError('RatingValue must be a finite number', 'rating');
    }
    if (raw !== DEFAULT && (raw < MIN || raw > MAX)) {
      throw new ValidationError(
        `RatingValue must be ${MIN}–${MAX} (or ${DEFAULT} for no rating)`,
        'rating',
      );
    }
    const factor = Math.pow(10, DECIMALS);
    const rounded = Math.round(raw * factor) / factor;
    return new RatingValueVO(rounded);
  }

  static reconstitute(raw: number): RatingValueVO {
    return new RatingValueVO(raw);
  }

  static empty(): RatingValueVO {
    return new RatingValueVO(DEFAULT);
  }

  get rating(): number {
    return this.value;
  }

  /** No ratings yet */
  isEmpty(): boolean {
    return this.value === DEFAULT;
  }

  isPositive(): boolean {
    return this.value >= 4;
  }

  isNeutral(): boolean {
    return this.value >= 3 && this.value < 4;
  }

  isNegative(): boolean {
    return this.value > DEFAULT && this.value < 3;
  }

  /** Auto-hide if rating drops below threshold (2) */
  triggersAutoHide(): boolean {
    return this.value > DEFAULT && this.value < VENDOR_RATING.AUTO_HIDE_BELOW;
  }

  /** Auto-flag if rating below 3 (but above auto-hide) */
  triggersAutoFlag(): boolean {
    return (
      this.value >= VENDOR_RATING.AUTO_HIDE_BELOW &&
      this.value < VENDOR_RATING.AUTO_FLAG_BELOW
    );
  }

  /** Meets threshold to be publicly displayed */
  meetsDisplayThreshold(reviewCount: number): boolean {
    return reviewCount >= VENDOR_RATING.MIN_REVIEWS_FOR_DISPLAY;
  }
}
