/**
 * ProductPricing Composite Value Object
 * @module product-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { PRICING } from '@vubon/shared-constants/business';

import { PriceIdVO } from '../primitives/price-id.vo.js';
import { ProductIdVO } from '../primitives/product-id.vo.js';
import { VariantIdVO } from '../primitives/variant-id.vo.js';
import { PriceAmountVO } from '../primitives/price-amount.vo.js';
import { PriceCurrencyVO } from '../primitives/price-currency.vo.js';
import { PricingRuleTypeVO } from '../primitives/pricing-rule-type.vo.js';

export interface ProductPricingVOProps {
  readonly id: PriceIdVO;
  readonly productId: ProductIdVO;
  readonly variantId?: VariantIdVO;
  readonly type: PricingRuleTypeVO;
  readonly basePrice: PriceAmountVO;
  readonly sellingPrice: PriceAmountVO;
  readonly compareAtPrice?: PriceAmountVO;
  readonly costPrice?: PriceAmountVO;
  readonly wholesalePrice?: PriceAmountVO;
  readonly msrp?: PriceAmountVO;
  readonly currency: PriceCurrencyVO;
  readonly taxInclusive: boolean;
  readonly discountPercent?: number;
  readonly effectiveFrom?: string;
  readonly effectiveTo?: string;
  readonly updatedAt: string;
}

export class ProductPricingVO extends BaseVO<ProductPricingVOProps> {
  private constructor(props: ProductPricingVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: ProductPricingVOProps): ProductPricingVO {
    const vo = new ProductPricingVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: ProductPricingVOProps): ProductPricingVO {
    return new ProductPricingVO(props);
  }

  protected validate(): void {
    const v = this.value;

    if (v.sellingPrice.value > v.basePrice.value) {
      throw new ValidationError(
        'Selling price cannot exceed base price',
        'sellingPrice',
      );
    }

    if (v.compareAtPrice && v.compareAtPrice.value < v.sellingPrice.value) {
      throw new ValidationError(
        'CompareAt price must be >= selling price',
        'compareAtPrice',
      );
    }

    if (v.costPrice && v.costPrice.value > v.sellingPrice.value) {
      throw new ValidationError(
        'Cost price cannot exceed selling price',
        'costPrice',
      );
    }

    if (v.discountPercent !== undefined) {
      if (v.discountPercent < 0 || v.discountPercent > PRICING.MAX_DISCOUNT_PERCENT) {
        throw new ValidationError(
          `Discount percent must be 0-${PRICING.MAX_DISCOUNT_PERCENT}`,
          'discountPercent',
        );
      }
    }

    if (v.effectiveFrom && v.effectiveTo && v.effectiveFrom > v.effectiveTo) {
      throw new ValidationError('effectiveFrom cannot be after effectiveTo', 'effectiveFrom');
    }
  }

  get id(): PriceIdVO { return this.value.id; }
  get productId(): ProductIdVO { return this.value.productId; }
  get variantId(): VariantIdVO | undefined { return this.value.variantId; }
  get type(): PricingRuleTypeVO { return this.value.type; }
  get basePrice(): PriceAmountVO { return this.value.basePrice; }
  get sellingPrice(): PriceAmountVO { return this.value.sellingPrice; }
  get compareAtPrice(): PriceAmountVO | undefined { return this.value.compareAtPrice; }
  get costPrice(): PriceAmountVO | undefined { return this.value.costPrice; }
  get wholesalePrice(): PriceAmountVO | undefined { return this.value.wholesalePrice; }
  get msrp(): PriceAmountVO | undefined { return this.value.msrp; }
  get currency(): PriceCurrencyVO { return this.value.currency; }
  get taxInclusive(): boolean { return this.value.taxInclusive; }
  get discountPercent(): number | undefined { return this.value.discountPercent; }
  get effectiveFrom(): string | undefined { return this.value.effectiveFrom; }
  get effectiveTo(): string | undefined { return this.value.effectiveTo; }
  get updatedAt(): string { return this.value.updatedAt; }

  hasDiscount(): boolean {
    return (
      (this.discountPercent !== undefined && this.discountPercent > 0) ||
      this.sellingPrice.value < this.basePrice.value
    );
  }

  hasCompareAt(): boolean {
    return this.compareAtPrice !== undefined;
  }

  hasMargin(): boolean {
    return this.costPrice !== undefined;
  }

  get discountAmount(): number {
    const diff = this.basePrice.value - this.sellingPrice.value;
    return Math.round(diff * 100) / 100;
  }

  get marginAmount(): number {
    if (!this.costPrice) return 0;
    return Math.round((this.sellingPrice.value - this.costPrice.value) * 100) / 100;
  }

  get marginPercent(): number {
    if (!this.costPrice || this.costPrice.value === 0) return 0;
    const margin = this.sellingPrice.value - this.costPrice.value;
    return Math.round((margin / this.costPrice.value) * 10000) / 100;
  }

  isEffective(at: string): boolean {
    if (this.effectiveFrom && at < this.effectiveFrom) return false;
    if (this.effectiveTo && at > this.effectiveTo) return false;
    return true;
  }

  isExpired(at: string): boolean {
    return this.effectiveTo !== undefined && at > this.effectiveTo;
  }
}
