/**
 * ProductVariant Composite Value Object
 * @module product-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { REGEX } from '@vubon/shared-constants/common';
import { VARIANT } from '@vubon/shared-constants/business';

import { VariantIdVO } from '../primitives/variant-id.vo.js';
import { ProductIdVO } from '../primitives/product-id.vo.js';
import { VariantNameVO } from '../primitives/variant-name.vo.js';
import { VariantSkuVO } from '../primitives/variant-sku.vo.js';
import { PriceAmountVO } from '../primitives/price-amount.vo.js';
import { PriceCurrencyVO } from '../primitives/price-currency.vo.js';
import { InventoryQuantityVO } from '../primitives/inventory-quantity.vo.js';

export interface VariantOptionValue {
  readonly name: string;
  readonly value: string;
}

export interface ProductVariantVOProps {
  readonly id: VariantIdVO;
  readonly productId: ProductIdVO;
  readonly name: VariantNameVO;
  readonly sku: VariantSkuVO;
  readonly options: readonly VariantOptionValue[];
  readonly price: PriceAmountVO;
  readonly currency: PriceCurrencyVO;
  readonly compareAtPrice?: PriceAmountVO;
  readonly cost?: PriceAmountVO;
  readonly weightGrams?: number;
  readonly imageUrl?: string;
  readonly stock: InventoryQuantityVO;
  readonly isActive: boolean;
}

export class ProductVariantVO extends BaseVO<ProductVariantVOProps> {
  private constructor(props: ProductVariantVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: ProductVariantVOProps): ProductVariantVO {
    const vo = new ProductVariantVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: ProductVariantVOProps): ProductVariantVO {
    return new ProductVariantVO(props);
  }

  protected validate(): void {
    const v = this.value;

    if (v.options.length === 0) {
      throw new ValidationError('Variant must have at least one option', 'options');
    }
    if (v.options.length > VARIANT.MAX_OPTIONS_PER_VARIANT) {
      throw new ValidationError(
        `Variant options cannot exceed ${VARIANT.MAX_OPTIONS_PER_VARIANT}`,
        'options',
      );
    }
    for (const opt of v.options) {
      if (!opt.name || !opt.value) {
        throw new ValidationError('Variant option name/value required', 'options');
      }
    }

    if (v.imageUrl && !REGEX.URL.test(v.imageUrl)) {
      throw new ValidationError('Variant imageUrl must be a valid URL', 'imageUrl');
    }

    if (v.weightGrams !== undefined && (!Number.isFinite(v.weightGrams) || v.weightGrams < 0)) {
      throw new ValidationError('Variant weightGrams must be non-negative', 'weight');
    }

    if (v.compareAtPrice && v.compareAtPrice.value < v.price.value) {
      throw new ValidationError(
        'Variant compareAtPrice must be >= price',
        'compareAtPrice',
      );
    }
  }

  // ─── Getters ─────────────────────────────
  get id(): VariantIdVO { return this.value.id; }
  get productId(): ProductIdVO { return this.value.productId; }
  get name(): VariantNameVO { return this.value.name; }
  get sku(): VariantSkuVO { return this.value.sku; }
  get options(): readonly VariantOptionValue[] { return this.value.options; }
  get price(): PriceAmountVO { return this.value.price; }
  get currency(): PriceCurrencyVO { return this.value.currency; }
  get compareAtPrice(): PriceAmountVO | undefined { return this.value.compareAtPrice; }
  get cost(): PriceAmountVO | undefined { return this.value.cost; }
  get weightGrams(): number | undefined { return this.value.weightGrams; }
  get imageUrl(): string | undefined { return this.value.imageUrl; }
  get stock(): InventoryQuantityVO { return this.value.stock; }
  get isActive(): boolean { return this.value.isActive; }

  // ─── Predicates ──────────────────────────
  inStock(): boolean { return this.stock.isPositive(); }
  isOutOfStock(): boolean { return this.stock.isZero(); }
  isLowStock(): boolean { return this.stock.isLow(); }
  isCriticalStock(): boolean { return this.stock.isCritical(); }
  hasDiscount(): boolean {
    return this.compareAtPrice !== undefined && this.compareAtPrice.value > this.price.value;
  }
  hasImage(): boolean { return this.imageUrl !== undefined; }
  hasWeight(): boolean { return this.weightGrams !== undefined; }

  // ─── Business helpers ────────────────────
  discountPercent(): number {
    if (!this.hasDiscount() || !this.compareAtPrice) return 0;
    const diff = this.compareAtPrice.value - this.price.value;
    return Math.round((diff / this.compareAtPrice.value) * 10000) / 100;
  }

  savingsAmount(): number {
    if (!this.hasDiscount() || !this.compareAtPrice) return 0;
    return Math.round((this.compareAtPrice.value - this.price.value) * 100) / 100;
  }

  matchesOptions(selected: readonly VariantOptionValue[]): boolean {
    if (selected.length !== this.options.length) return false;
    return selected.every((s) =>
      this.options.some(
        (o) => o.name.toLowerCase() === s.name.toLowerCase() &&
               o.value.toLowerCase() === s.value.toLowerCase(),
      ),
    );
  }
}
