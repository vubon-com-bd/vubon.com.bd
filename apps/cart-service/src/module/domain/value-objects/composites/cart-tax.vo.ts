/**
 * Cart Tax Composite VO
 * @module cart-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CartTaxIdVO } from '../primitives/cart-tax-id.vo.js';
import { CartTaxRateVO } from '../primitives/cart-tax-rate.vo.js';

export interface CartTaxProps {
  readonly id: CartTaxIdVO;
  readonly rate: CartTaxRateVO;
  readonly inclusive: boolean;
  readonly region?: string;
}

export class CartTaxCompositeVO extends BaseVO<CartTaxProps> {
  private constructor(props: CartTaxProps) {
    super(props);
  }

  static create(props: CartTaxProps): CartTaxCompositeVO {
    return new CartTaxCompositeVO(props);
  }

  static reconstitute(props: CartTaxProps): CartTaxCompositeVO {
    return new CartTaxCompositeVO(props);
  }

  static none(): CartTaxCompositeVO {
    return new CartTaxCompositeVO({
      id: CartTaxIdVO.create('00000000-0000-0000-0000-000000000000'),
      rate: CartTaxRateVO.zero(),
      inclusive: false,
    });
  }

  get id(): CartTaxIdVO { return this.value.id; }
  get rate(): CartTaxRateVO { return this.value.rate; }
  get inclusive(): boolean { return this.value.inclusive; }
  get region(): string | undefined { return this.value.region; }

  /** Compute tax amount on a taxable amount */
  computeTax(taxableAmount: number): number {
    if (taxableAmount < 0) {
      throw new ValidationError('Taxable amount cannot be negative', 'taxableAmount');
    }
    return this.value.rate.applyOn(taxableAmount);
  }

  /** Get the base (pre-tax) amount when the given amount is tax-inclusive */
  extractBase(inclusiveAmount: number): number {
    if (!this.value.inclusive) return inclusiveAmount;
    const tax = this.value.rate.extractFromInclusive(inclusiveAmount);
    return Math.round((inclusiveAmount - tax) * 100) / 100;
  }

  isZero(): boolean {
    return this.value.rate.isZero();
  }
}
