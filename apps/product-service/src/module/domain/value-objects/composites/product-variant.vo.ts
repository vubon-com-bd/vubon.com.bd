import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { VariantIdVO } from '../primitives/variant-id.vo';
import { VariantNameVO } from '../primitives/variant-name.vo';
import { VariantSkuVO } from '../primitives/variant-sku.vo';
import { PriceAmountVO } from '../primitives/price-amount.vo';

export interface ProductVariantProps {
  readonly id: VariantIdVO;
  readonly name: VariantNameVO;
  readonly sku: VariantSkuVO;
  readonly price: PriceAmountVO;
  readonly isDefault: boolean;
}

export class ProductVariantVO extends BaseVO<ProductVariantProps> {
  private constructor(props: ProductVariantProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: ProductVariantProps): ProductVariantVO {
    return new ProductVariantVO(props);
  }

  get id(): VariantIdVO { return this.value.id; }
  get name(): VariantNameVO { return this.value.name; }
  get sku(): VariantSkuVO { return this.value.sku; }
  get price(): PriceAmountVO { return this.value.price; }
  get isDefault(): boolean { return this.value.isDefault; }
}
