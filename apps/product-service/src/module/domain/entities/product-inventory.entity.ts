/**
 * ProductInventoryEntity — Child of Product aggregate
 * @module product-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { ProductInventoryVO } from '../value-objects/composites/product-inventory.vo.js';
import { InventoryQuantityVO } from '../value-objects/primitives/inventory-quantity.vo.js';

export class ProductInventoryEntity extends BaseEntity<string> {
  private _vo: ProductInventoryVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    vo: ProductInventoryVO,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = vo;
  }

  get vo(): ProductInventoryVO { return this._vo; }
  get inventoryId(): ProductInventoryVO['id'] { return this._vo.id; }
  get productId(): ProductInventoryVO['productId'] { return this._vo.productId; }
  get sku(): ProductInventoryVO['sku'] { return this._vo.sku; }
  get quantity(): InventoryQuantityVO { return this._vo.quantity; }
  get reserved(): InventoryQuantityVO { return this._vo.reserved; }
  get available(): InventoryQuantityVO { return this._vo.available; }

  isInStock(): boolean { return this._vo.isInStock(); }
  isOutOfStock(): boolean { return this._vo.isOutOfStock(); }
  isLowStock(): boolean { return this._vo.isLowStock(); }
  isCriticalStock(): boolean { return this._vo.isCriticalStock(); }

  canFulfill(qty: number): boolean {
    return this._vo.canFulfill(qty);
  }

  adjust(delta: number, now: string = new Date().toISOString()): void {
    this._vo = this._vo.withAdjustment(delta, now);
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  reserve(qty: number, now: string = new Date().toISOString()): void {
    if (!this.canFulfill(qty)) {
      throw new BusinessRuleError(
        `Cannot reserve ${qty} for "${this.id}": only ${this.available.value} available`,
        'INVENTORY_INSUFFICIENT_FOR_RESERVE',
        { inventoryId: this.id, requested: qty, available: this.available.value },
      );
    }
    this._vo = this._vo.withReservation(qty, now);
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  releaseReservation(qty: number, now: string = new Date().toISOString()): void {
    const next = this.reserved.value - qty;
    if (next < 0) {
      throw new ValidationError('Cannot release more than reserved', 'reserved');
    }
    this._vo = ProductInventoryVO.create({
      ...this._vo.value,
      reserved: InventoryQuantityVO.create(next),
      updatedAt: now,
    });
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: string;
    vo: ProductInventoryVO;
    now: string;
  }): ProductInventoryEntity {
    return new ProductInventoryEntity(params.id, params.now, params.now, params.vo, null);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    vo: ProductInventoryVO;
  }): ProductInventoryEntity {
    return new ProductInventoryEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.vo,
      params.deletedAt ?? null,
    );
  }
}
