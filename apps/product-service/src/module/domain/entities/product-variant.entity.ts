/**
 * ProductVariantEntity — Child of Product aggregate
 * @module product-service/domain/entities
 *
 * ⚠️ BaseEntity-তে version নেই।
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import { ProductVariantVO } from '../value-objects/composites/product-variant.vo.js';
import { InventoryQuantityVO } from '../value-objects/primitives/inventory-quantity.vo.js';

export class ProductVariantEntity extends BaseEntity<string> {
  private _vo: ProductVariantVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    vo: ProductVariantVO,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = vo;
  }

  get vo(): ProductVariantVO { return this._vo; }
  get variantId(): ProductVariantVO['id'] { return this._vo.id; }
  get productId(): ProductVariantVO['productId'] { return this._vo.productId; }
  get sku(): ProductVariantVO['sku'] { return this._vo.sku; }
  get stock(): InventoryQuantityVO { return this._vo.stock; }
  get isActive(): boolean { return this._vo.isActive; }

  inStock(): boolean { return this._vo.inStock(); }
  isOutOfStock(): boolean { return this._vo.isOutOfStock(); }
  isLowStock(): boolean { return this._vo.isLowStock(); }

  canFulfill(qty: number): boolean {
    return this._vo.stock.value >= qty;
  }

  /**
   * Replace entire VO — used by application service on update.
   * Keeps entity immutability discipline intact.
   */
  updateVo(vo: ProductVariantVO, now: string = new Date().toISOString()): void {
    this._vo = vo;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  adjustStock(delta: number, now: string = new Date().toISOString()): void {
    const current = this._vo.stock.value;
    const next = current + delta;
    if (next < 0) {
      throw new BusinessRuleError(
        `Variant "${this.id}" stock cannot go negative`,
        'VARIANT_STOCK_NEGATIVE',
        { variantId: this.id, current, delta },
      );
    }
    this._vo = ProductVariantVO.create({
      ...this._vo.value,
      stock: InventoryQuantityVO.create(next),
    });
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  activate(now: string = new Date().toISOString()): void {
    this._vo = ProductVariantVO.create({ ...this._vo.value, isActive: true });
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  deactivate(now: string = new Date().toISOString()): void {
    this._vo = ProductVariantVO.create({ ...this._vo.value, isActive: false });
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: string;
    vo: ProductVariantVO;
    now: string;
  }): ProductVariantEntity {
    return new ProductVariantEntity(params.id, params.now, params.now, params.vo, null);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    vo: ProductVariantVO;
  }): ProductVariantEntity {
    return new ProductVariantEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.vo,
      params.deletedAt ?? null,
    );
  }
}
