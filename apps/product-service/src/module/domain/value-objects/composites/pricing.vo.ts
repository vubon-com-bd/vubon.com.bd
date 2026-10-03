/**
 * PricingCompositeVO — Price calculation business rules
 * @module product-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ProductIdVO } from '../primitives/product-id.vo.js';
import { VariantIdVO } from '../primitives/variant-id.vo.js';
import { PriceVO } from '../primitives/price.vo.js';
import { DiscountPercentVO } from '../primitives/discount-vo.js';
import { TaxRateVO } from '../primitives/tax-rate.vo.js';
import { PRICING_TYPE } from '@vubon/shared-constants/business/product';

export interface PricingCompositeProps {
  readonly productId: ProductIdVO;
  readonly variantId?: VariantIdVO;
  readonly type: string;
  readonly basePrice: PriceVO;
  readonly sellingPrice: PriceVO;
  readonly compareAtPrice?: PriceVO;
  readonly costPrice?: PriceVO;
  readonly taxRate: TaxRateVO;
  readonly taxInclusive: boolean;
  readonly discountPercent: DiscountPercentVO;
}

export class PricingCompositeVO extends BaseVO<PricingCompositeProps> {
  private constructor(props: PricingCompositeProps) {
    super(props);
  }

  static create(props: PricingCompositeProps): PricingCompositeVO {
    if (props.sellingPrice.amount > props.basePrice.amount) {
      throw new Error('Selling price cannot exceed base price');
    }
    return new PricingCompositeVO(props);
  }

  static reconstitute(props: PricingCompositeProps): PricingCompositeVO {
    return new PricingCompositeVO(props);
  }

  get productId(): ProductIdVO { return this.value.productId; }
  get variantId(): VariantIdVO | undefined { return this.value.variantId; }
  get type(): string { return this.value.type; }
  get basePrice(): PriceVO { return this.value.basePrice; }
  get sellingPrice(): PriceVO { return this.value.sellingPrice; }
  get compareAtPrice(): PriceVO | undefined { return this.value.compareAtPrice; }
  get costPrice(): PriceVO | undefined { return this.value.costPrice; }
  get taxRate(): TaxRateVO { return this.value.taxRate; }
  get taxInclusive(): boolean { return this.value.taxInclusive; }
  get discountPercent(): DiscountPercentVO { return this.value.discountPercent; }

  /**
   * Business rule: total price for a given quantity
   */
  totalFor(quantity: number): number {
    if (quantity <= 0) throw new Error('Quantity must be positive');
    return Math.round(this.value.sellingPrice.amount * quantity * 100) / 100;
  }

  /**
   * Business rule: final price including tax
   */
  finalPrice(): number {
    if (this.value.taxInclusive) return this.value.sellingPrice.amount;
    const tax = this.value.taxRate.calculateTax(this.value.sellingPrice.amount);
    return Math.round((this.value.sellingPrice.amount + tax) * 100) / 100;
  }

  /**
   * Business rule: profit margin percentage
   */
  profitMargin(): number {
    if (!this.value.costPrice) return 0;
    const profit = this.value.sellingPrice.amount - this.value.costPrice.amount;
    return Math.round((profit / this.value.sellingPrice.amount) * 100);
  }

  /**
   * Business rule: is discount active (compareAt > selling)
   */
  hasDiscount(): boolean {
    return (
      this.value.compareAtPrice !== undefined &&
      this.value.compareAtPrice.amount > this.value.sellingPrice.amount
    );
  }

  /**
   * Business rule: effective discount percent
   */
  effectiveDiscountPercent(): number {
    if (!this.hasDiscount()) return 0;
    const compare = this.value.compareAtPrice!;
    const diff = compare.amount - this.value.sellingPrice.amount;
    return Math.round((diff / compare.amount) * 100);
  }
}
