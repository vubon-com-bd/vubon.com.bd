import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ProductSlugVO } from '../primitives/product-slug.vo';

export interface ProductSeoProps {
  readonly slug: ProductSlugVO;
  readonly metaTitle: string | null;
  readonly metaDescription: string | null;
  readonly keywords: readonly string[];
}

export class ProductSeoVO extends BaseVO<ProductSeoProps> {
  private constructor(props: ProductSeoProps) {
    super(Object.freeze({
      ...props,
      keywords: Object.freeze([...props.keywords]),
    }));
  }

  static create(props: ProductSeoProps): ProductSeoVO {
    return new ProductSeoVO(props);
  }

  get slug(): ProductSlugVO { return this.value.slug; }
  get metaTitle(): string | null { return this.value.metaTitle; }
  get metaDescription(): string | null { return this.value.metaDescription; }
  get keywords(): readonly string[] { return this.value.keywords; }
}
