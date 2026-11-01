/**
 * SplitPercentage Value Object
 * @module payment-service/domain/value-objects/primitives
 *
 * Business Rule:
 * - Range 0.01–100.00 (with max 2 decimals)
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN = 0.01;
const MAX = 100;

export class SplitPercentageVO extends BaseVO<number> {
  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): SplitPercentageVO {
    if (!Number.isFinite(raw)) {
      throw new ValidationError('SplitPercentage must be a finite number', 'percentage');
    }
    if (raw < MIN || raw > MAX) {
      throw new ValidationError(
        `SplitPercentage must be between ${MIN} and ${MAX}`,
        'percentage',
      );
    }
    const rounded = Math.round(raw * 100) / 100;
    return new SplitPercentageVO(rounded);
  }

  static reconstitute(raw: number): SplitPercentageVO {
    return new SplitPercentageVO(raw);
  }

  toFraction(): number {
    return this.value / 100;
  }

  applyTo(total: number): number {
    return Math.round(((total * this.value) / 100) * 100) / 100;
  }
}
