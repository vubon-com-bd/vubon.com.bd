/**
 * CartTaxRate Value Object
 * @module cart-service/domain/value-objects/primitives
 *
 * Business rules:
 * - Rate between 0 and 100 (percentage)
 * - Rounded to 2 decimal places
 * - Includes helper to compute tax amount on a subtotal
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { TAX_RATE_LIMIT } from '@vubon/shared-constants/business/tax';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class CartTaxRateVO extends BaseVO<number> {
  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): CartTaxRateVO {
    if (!Number.isFinite(raw)) {
      throw new ValidationError('Tax rate must be a finite number', 'taxRate');
    }
    if (raw < TAX_RATE_LIMIT.MIN_RATE) {
      throw new ValidationError(
        `Tax rate cannot be less than ${TAX_RATE_LIMIT.MIN_RATE}`,
        'taxRate',
      );
    }
    if (raw > TAX_RATE_LIMIT.MAX_RATE) {
      throw new ValidationError(
        `Tax rate cannot exceed ${TAX_RATE_LIMIT.MAX_RATE}`,
        'taxRate',
      );
    }
    const rounded =
      Math.round(raw * Math.pow(10, TAX_RATE_LIMIT.DECIMAL_PLACES)) /
      Math.pow(10, TAX_RATE_LIMIT.DECIMAL_PLACES);
    return new CartTaxRateVO(rounded);
  }

  static reconstitute(raw: number): CartTaxRateVO {
    return new CartTaxRateVO(raw);
  }

  static zero(): CartTaxRateVO {
    return new CartTaxRateVO(TAX_RATE_LIMIT.MIN_RATE);
  }

  get percent(): number {
    return this.value;
  }

  isZero(): boolean {
    return this.value === 0;
  }

  /** Compute tax amount on a subtotal (percentage applied) */
  applyOn(subtotal: number): number {
    if (!Number.isFinite(subtotal) || subtotal < 0) {
      throw new ValidationError('Subtotal must be a non-negative number', 'subtotal');
    }
    const raw = (subtotal * this.value) / 100;
    return Math.round(raw * 100) / 100;
  }

  /** Extract tax portion from an inclusive price */
  extractFromInclusive(totalInclusive: number): number {
    if (!Number.isFinite(totalInclusive) || totalInclusive < 0) {
      throw new ValidationError('Total must be a non-negative number', 'total');
    }
    if (this.value === 0) return 0;
    const factor = 1 + this.value / 100;
    const base = totalInclusive / factor;
    const tax = totalInclusive - base;
    return Math.round(tax * 100) / 100;
  }
}
