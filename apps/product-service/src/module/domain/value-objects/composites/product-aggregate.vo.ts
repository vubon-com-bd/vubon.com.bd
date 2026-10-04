/**
 * ProductAggregateVO — Combines all product-related composite VOs
 * @module product-service/domain/value-objects/composites
 *
 * This is NOT a DDD Aggregate Root; it is a value-level snapshot.
 * The Aggregate Root lives in domain/entities/product.entity.ts
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ProductCompositeVO } from './product.vo.js';
import { VariantCompositeVO } from './variant.vo.js';
import { InventoryCompositeVO } from './inventory.vo.js';
import { PricingCompositeVO } from './pricing.vo.js';
import { MediaCompositeVO } from './media.vo.js';
import { CategoryCompositeVO } from './category.vo.js';
import { BrandCompositeVO } from './brand.vo.js';

export interface ProductAggregateProps {
  readonly product: ProductCompositeVO;
  readonly variants: readonly VariantCompositeVO[];
  readonly inventory: readonly InventoryCompositeVO[];
  readonly pricing: PricingCompositeVO;
  readonly media: readonly MediaCompositeVO[];
  readonly category?: CategoryCompositeVO;
  readonly brand?: BrandCompositeVO;
}

export class ProductAggregateVO extends BaseVO<ProductAggregateProps> {
  private constructor(props: ProductAggregateProps) {
    super(props);
  }

  static create(props: ProductAggregateProps): ProductAggregateVO {
    return new ProductAggregateVO(props);
  }

  static reconstitute(props: ProductAggregateProps): ProductAggregateVO {
    return new ProductAggregateVO(props);
  }

  get product(): ProductCompositeVO { return this.value.product; }
  get variants(): readonly VariantCompositeVO[] { return this.value.variants; }
  get inventory(): readonly InventoryCompositeVO[] { return this.value.inventory; }
  get pricing(): PricingCompositeVO { return this.value.pricing; }
  get media(): readonly MediaCompositeVO[] { return this.value.media; }
  get category(): CategoryCompositeVO | undefined { return this.value.category; }
  get brand(): BrandCompositeVO | undefined { return this.value.brand; }

  /**
   * Business rule: total available stock across all inventory records
   */
  getTotalAvailableStock(): number {
    return this.value.inventory.reduce((sum, inv) => sum + inv.available, 0);
  }

  /**
   * Business rule: check if all variants are in stock
   */
  allVariantsInStock(): boolean {
    return this.value.variants.every((v) => v.isAvailable());
  }

  /**
   * Business rule: primary media (first image sorted by sortOrder)
   */
  getPrimaryImage(): MediaCompositeVO | undefined {
    return [...this.value.media]
      .filter((m) => m.isImage())
      .sort((a, b) => a.sortOrder - b.sortOrder)[0];
  }

  /**
   * Business rule: price range across variants
   */
  getPriceRange(): { min: number; max: number } | null {
    if (this.value.variants.length === 0) {
      return { min: this.value.pricing.sellingPrice.amount, max: this.value.pricing.sellingPrice.amount };
    }
    const prices = this.value.variants.map((v) => v.price.amount);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }

  /**
   * Business rule: comprehensive publishability check
   */
  canPublish(): { allowed: boolean; reason?: string } {
    const baseCheck = this.value.product.canBePublished();
    if (!baseCheck.allowed) return baseCheck;

    if (this.value.media.filter((m) => m.isImage()).length === 0) {
      return { allowed: false, reason: 'at least one image is required' };
    }

    if (this.value.variants.length > 0 && !this.allVariantsInStock()) {
      // Not strictly required, but log
    }

    return { allowed: true };
  }
}
