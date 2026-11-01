/**
 * ProductPricingEntity — Child of Product aggregate
 * @module product-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import { ProductPricingVO } from '../value-objects/composites/product-pricing.vo.js';
import { PriceAmountVO } from '../value-objects/primitives/price-amount.vo.js';

export class ProductPricingEntity extends BaseEntity<string> {
  private _vo: ProductPricingVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    vo: ProductPricingVO,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = vo;
  }

  get vo(): ProductPricingVO { return this._vo; }
  get priceId(): ProductPricingVO['id'] { return this._vo.id; }
  get productId(): ProductPricingVO['productId'] { return this._vo.productId; }
  get sellingPrice(): PriceAmountVO { return this._vo.sellingPrice; }
  get basePrice(): PriceAmountVO { return this._vo.basePrice; }
  get currency(): ProductPricingVO['currency'] { return this._vo.currency; }

  hasDiscount(): boolean { return this._vo.hasDiscount(); }
  hasMargin(): boolean { return this._vo.hasMargin(); }
  get discountAmount(): number { return this._vo.discountAmount; }
  get marginPercent(): number { return this._vo.marginPercent; }

  isEffective(at: string = new Date().toISOString()): boolean {
    return this._vo.isEffective(at);
  }

  updatePrice(newPrice: PriceAmountVO, now: string = new Date().toISOString()): void {
    const cost = this._vo.costPrice?.value;
    if (cost !== undefined && newPrice.value < cost) {
      throw new BusinessRuleError(
        `New price ${newPrice.value} below cost ${cost}`,
        'PRICE_BELOW_COST',
        { productId: this.productId.value, newPrice: newPrice.value, cost },
      );
    }
    this._vo = ProductPricingVO.create({
      ...this._vo.value,
      sellingPrice: newPrice,
      updatedAt: now,
    });
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: string;
    vo: ProductPricingVO;
    now: string;
  }): ProductPricingEntity {
    return new ProductPricingEntity(params.id, params.now, params.now, params.vo, null);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    vo: ProductPricingVO;
  }): ProductPricingEntity {
    return new ProductPricingEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.vo,
      params.deletedAt ?? null,
    );
  }
}
