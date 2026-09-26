import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

export class CartTaxRateVO extends BaseVO<number> {
  static create(value: number): CartTaxRateVO {
    if (!Number.isFinite(value) || value < 0 || value > 100) {
      throw new Error('Tax rate must be between 0 and 100');
    }
    return new CartTaxRateVO(value);
  }

  get rate(): number {
    return this.value;
  }

  private constructor(value: number) {
    super(value);
  }
}
