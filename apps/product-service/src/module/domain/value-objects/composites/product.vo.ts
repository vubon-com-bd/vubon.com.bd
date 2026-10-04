/**
 * ProductCompositeVO — Full product value composition with business rules
 * @module product-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ProductIdVO } from '../primitives/product-id.vo.js';
import { ProductNameVO } from '../primitives/product-name.vo.js';
import { ProductSlugVO } from '../primitives/product-slug.vo.js';
import { ProductSkuVO } from '../primitives/product-sku.vo.js';
import { ProductStatusVO } from '../primitives/product-status.vo.js';
import { ProductTypeVO } from '../primitives/product-type.vo.js';
import { ProductDescriptionVO } from '../primitives/product-description.vo.js';
import { PriceVO } from '../primitives/price.vo.js';
import { CategoryIdVO } from '../primitives/category-id.vo.js';
import { BrandIdVO } from '../primitives/brand-id.vo.js';
import { VariantIdVO } from '../primitives/variant-id.vo.js';
import { PRODUCT_STATUS, PRODUCT_TYPE } from '@vubon/shared-constants/business/product';
import { ProductCannotBePublishedError } from '../../errors/product.errors.js';
import type { ProductTypeValue, ProductStatusValue } from '@vubon/shared-types/business/product';

export interface ProductCompositeProps {
  readonly id: ProductIdVO;
  readonly name: ProductNameVO;
  readonly slug: ProductSlugVO;
  readonly sku: ProductSkuVO;
  readonly type: ProductTypeVO;
  readonly status: ProductStatusVO;
  readonly description: ProductDescriptionVO;
  readonly categoryId: CategoryIdVO;
  readonly brandId?: BrandIdVO;
  readonly price: PriceVO;
  readonly compareAtPrice?: PriceVO;
  readonly totalStock: number;
  readonly variantIds: readonly VariantIdVO[];
  readonly isFeatured: boolean;
  readonly tags: readonly string[];
}

export class ProductCompositeVO extends BaseVO<ProductCompositeProps> {
  private constructor(props: ProductCompositeProps) {
    super(props);
  }

  static create(props: ProductCompositeProps): ProductCompositeVO {
    if (props.tags.length > 50) {
      throw new Error('Product cannot have more than 50 tags');
    }
    if (props.totalStock < 0) {
      throw new Error('Total stock cannot be negative');
    }
    return new ProductCompositeVO(props);
  }

  static reconstitute(props: ProductCompositeProps): ProductCompositeVO {
    return new ProductCompositeVO(props);
  }

  get id(): ProductIdVO { return this.value.id; }
  get name(): ProductNameVO { return this.value.name; }
  get slug(): ProductSlugVO { return this.value.slug; }
  get sku(): ProductSkuVO { return this.value.sku; }
  get type(): ProductTypeVO { return this.value.type; }
  get status(): ProductStatusVO { return this.value.status; }
  get description(): ProductDescriptionVO { return this.value.description; }
  get categoryId(): CategoryIdVO { return this.value.categoryId; }
  get brandId(): BrandIdVO | undefined { return this.value.brandId; }
  get price(): PriceVO { return this.value.price; }
  get compareAtPrice(): PriceVO | undefined { return this.value.compareAtPrice; }
  get totalStock(): number { return this.value.totalStock; }
  get variantIds(): readonly VariantIdVO[] { return this.value.variantIds; }
  get isFeatured(): boolean { return this.value.isFeatured; }
  get tags(): readonly string[] { return this.value.tags; }

  /**
   * Business rule: check if product can be published
   */
  canBePublished(): { allowed: boolean; reason?: string } {
    if (this.status.isPublished()) {
      return { allowed: false, reason: 'already published' };
    }
    if (this.value.totalStock <= 0 && this.type.requiresShipping()) {
      return { allowed: false, reason: 'no stock available for physical product' };
    }
    if (!this.value.description || this.value.description.isEmpty) {
      return { allowed: false, reason: 'description is required for publishing' };
    }
    if (this.value.price.amount <= 0) {
      return { allowed: false, reason: 'price must be greater than zero' };
    }
    return { allowed: true };
  }

  /**
   * Business rule: check if product can be archived
   */
  canBeArchived(): boolean {
    return !this.status.isArchived();
  }

  /**
   * Business rule: effective selling price (with compareAtPrice)
   */
  getEffectivePrice(): number {
    return this.value.price.amount;
  }

  /**
   * Business rule: calculate discount percent vs compareAtPrice
   */
  getDiscountPercent(): number {
    const compare = this.value.compareAtPrice;
    if (!compare || compare.amount <= this.value.price.amount) return 0;
    const diff = compare.amount - this.value.price.amount;
    return Math.round((diff / compare.amount) * 100);
  }

  /**
   * Business rule: is available in stock
   */
  isInStock(): boolean {
    return this.value.totalStock > 0;
  }

  /**
   * Business rule: requires shipping
   */
  requiresShipping(): boolean {
    return this.type.requiresShipping();
  }

  toPlainJSON(): Readonly<Record<string, unknown>> {
    return {
      id: this.value.id.value,
      name: this.value.name.value,
      slug: this.value.slug.value,
      sku: this.value.sku.value,
      type: this.value.type.value,
      status: this.value.status.value,
      categoryId: this.value.categoryId.value,
      brandId: this.value.brandId?.value,
      price: this.value.price.amount,
      compareAtPrice: this.value.compareAtPrice?.amount,
      totalStock: this.value.totalStock,
      variantCount: this.value.variantIds.length,
      isFeatured: this.value.isFeatured,
      tags: [...this.value.tags],
    };
  }
}
