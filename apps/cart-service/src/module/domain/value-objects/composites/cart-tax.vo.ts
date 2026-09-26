import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { CartTaxIdVO } from '../primitives/cart-tax-id.vo';
import { CartTaxRateVO } from '../primitives/cart-tax-rate.vo';

export interface CartTaxVOProps {
  readonly id: CartTaxIdVO;
  readonly name: string;
  readonly rate: CartTaxRateVO;
  readonly amount: number;
  readonly currency: string;
}

export class CartTaxVO extends BaseVO<CartTaxVOProps> {
  private constructor(props: CartTaxVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: CartTaxVOProps): CartTaxVO {
    return new CartTaxVO(props);
  }

  get id(): CartTaxIdVO { return this.value.id; }
  get name(): string { return this.value.name; }
  get rate(): CartTaxRateVO { return this.value.rate; }
  get amount(): number { return this.value.amount; }
  get currency(): string { return this.value.currency; }
}
