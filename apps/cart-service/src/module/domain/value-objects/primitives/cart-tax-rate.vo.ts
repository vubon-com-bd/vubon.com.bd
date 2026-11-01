/**
 * CartTaxRate Value Object
 * @module cart-service/domain/value-objects/primitives
 *
 * Business Rule: 0-100 (%)
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class CartTaxRateVO extends BaseVO<number> {
  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): CartTaxRateVO {
    if (!Number.isFinite(raw) || raw < 0 || raw > 100) {
      throw new ValidationError('Tax rate must be between 0 and 100', 'rate');
    }
    return new CartTaxRateVO(raw);
  }

  static zero(): CartTaxRateVO {
    return new CartTaxRateVO(0);
  }

  static reconstitute(raw: number): CartTaxRateVO {
    return new CartTaxRateVO(raw);
  }

  calculate(amount: number): number {
    if (!Number.isFinite(amount) || amount <= 0) return 0;
    return Math.round(((amount * this.value) / 100) * 100) / 100;
  }

  isZero(): boolean {
    return this.value === 0;
  }
}
