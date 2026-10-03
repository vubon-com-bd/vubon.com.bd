/**
 * TaxRate Value Object
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

export class TaxRateVO extends BaseVO<number> {
  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): TaxRateVO {
    if (typeof raw !== 'number' || !Number.isFinite(raw)) {
      throw new Error('TaxRate must be a finite number');
    }
    if (raw < 0 || raw > 1) {
      throw new Error('TaxRate must be between 0 and 1');
    }
    return new TaxRateVO(raw);
  }

  static zero(): TaxRateVO {
    return new TaxRateVO(0);
  }

  static reconstitute(raw: number): TaxRateVO {
    return new TaxRateVO(raw);
  }

  get percent(): number {
    return this.value * 100;
  }

  calculateTax(amount: number): number {
    return Math.round(amount * this.value * 100) / 100;
  }
}
