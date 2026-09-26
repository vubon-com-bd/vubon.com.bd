import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ProductIdVO } from '../primitives/product-id.vo';
import { ProductNameVO } from '../primitives/product-name.vo';
import { ProductSlugVO } from '../primitives/product-slug.vo';
import { ProductSkuVO } from '../primitives/product-sku.vo';
import { ProductStatusVO } from '../primitives/product-status.vo';
import { ProductTypeVO } from '../primitives/product-type.vo';
import { VendorIdVO } from '../primitives/vendor-id.vo';
import { CategoryIdVO } from '../primitives/category-id.vo';
import { BrandIdVO } from '../primitives/brand-id.vo';

export interface ProductProps {
  readonly id: ProductIdVO;
  readonly name: ProductNameVO;
  readonly slug: ProductSlugVO;
  readonly sku: ProductSkuVO;
  readonly status: ProductStatusVO;
  readonly type: ProductTypeVO;
  readonly vendorId: VendorIdVO;
  readonly categoryId: CategoryIdVO | null;
  readonly brandId: BrandIdVO | null;
}

export class ProductVO extends BaseVO<ProductProps> {
  private constructor(props: ProductProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: ProductProps): ProductVO {
    return new ProductVO(props);
  }

  get id(): ProductIdVO { return this.value.id; }
  get name(): ProductNameVO { return this.value.name; }
  get slug(): ProductSlugVO { return this.value.slug; }
  get sku(): ProductSkuVO { return this.value.sku; }
  get status(): ProductStatusVO { return this.value.status; }
  get type(): ProductTypeVO { return this.value.type; }
  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get categoryId(): CategoryIdVO | null { return this.value.categoryId; }
  get brandId(): BrandIdVO | null { return this.value.brandId; }
}
