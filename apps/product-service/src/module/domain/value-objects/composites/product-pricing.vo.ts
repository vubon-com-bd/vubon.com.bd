import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { PriceIdVO } from '../primitives/price-id.vo';
import { PriceAmountVO } from '../primitives/price-amount.vo';
import { PriceCurrencyVO } from '../primitives/price-currency.vo';

export interface ProductPricingProps {
  readonly id: PriceIdVO;
  readonly amount: PriceAmountVO;
  readonly currency: PriceCurrencyVO;
}

export class ProductPricingVO extends BaseVO<ProductPricingProps> {
  private constructor(props: ProductPricingProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: ProductPricingProps): ProductPricingVO {
    return new ProductPricingVO(props);
  }

  get id(): PriceIdVO { return this.value.id; }
  get amount(): PriceAmountVO { return this.value.amount; }
  get currency(): PriceCurrencyVO { return this.value.currency; }
}
