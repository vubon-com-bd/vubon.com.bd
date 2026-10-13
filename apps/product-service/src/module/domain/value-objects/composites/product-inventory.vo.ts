/**
 * ProductInventory Composite Value Object
 * @module product-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { INVENTORY } from '@vubon/shared-constants/business';

import { InventoryIdVO } from '../primitives/inventory-id.vo.js';
import { ProductIdVO } from '../primitives/product-id.vo.js';
import { VariantIdVO } from '../primitives/variant-id.vo.js';
import { VendorIdVO } from '../primitives/vendor-id.vo.js';
import { InventoryStatusVO } from '../primitives/inventory-status.vo.js';
import { InventoryQuantityVO } from '../primitives/inventory-quantity.vo.js';
import { ProductSkuVO } from '../primitives/product-sku.vo.js';

export interface ProductInventoryVOProps {
  readonly id: InventoryIdVO;
  readonly productId: ProductIdVO;
  readonly variantId?: VariantIdVO;
  readonly vendorId?: VendorIdVO;
  readonly sku: ProductSkuVO;
  readonly quantity: InventoryQuantityVO;
  readonly reserved: InventoryQuantityVO;
  readonly status: InventoryStatusVO;
  readonly lowStockThreshold: number;
  readonly locationId?: string;
  readonly lastRestockedAt?: string;
  readonly updatedAt: string;
}

export class ProductInventoryVO extends BaseVO<ProductInventoryVOProps> {
  private constructor(props: ProductInventoryVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: ProductInventoryVOProps): ProductInventoryVO {
    const vo = new ProductInventoryVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: ProductInventoryVOProps): ProductInventoryVO {
    return new ProductInventoryVO(props);
  }

  protected validate(): void {
    const v = this.value;

    if (v.reserved.value > v.quantity.value) {
      throw new ValidationError(
        'Inventory reserved quantity cannot exceed total quantity',
        'reserved',
      );
    }

    if (!Number.isInteger(v.lowStockThreshold) || v.lowStockThreshold < 0) {
      throw new ValidationError(
        'Inventory lowStockThreshold must be a non-negative integer',
        'lowStockThreshold',
      );
    }

    if (v.locationId !== undefined && v.locationId.trim().length === 0) {
      throw new ValidationError('Inventory locationId cannot be empty string', 'locationId');
    }
  }

  get id(): InventoryIdVO { return this.value.id; }
  get productId(): ProductIdVO { return this.value.productId; }
  get variantId(): VariantIdVO | undefined { return this.value.variantId; }
  get vendorId(): VendorIdVO | undefined { return this.value.vendorId; }
  get sku(): ProductSkuVO { return this.value.sku; }
  get quantity(): InventoryQuantityVO { return this.value.quantity; }
  get reserved(): InventoryQuantityVO { return this.value.reserved; }
  get status(): InventoryStatusVO { return this.value.status; }
  get lowStockThreshold(): number { return this.value.lowStockThreshold; }
  get locationId(): string | undefined { return this.value.locationId; }
  get lastRestockedAt(): string | undefined { return this.value.lastRestockedAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  get available(): InventoryQuantityVO {
    return InventoryQuantityVO.create(this.quantity.value - this.reserved.value);
  }

  isInStock(): boolean { return this.available.isPositive(); }
  isOutOfStock(): boolean { return this.available.isZero(); }
  isLowStock(): boolean { return this.available.isLow(this.lowStockThreshold); }
  isCriticalStock(): boolean { return this.available.isCritical(INVENTORY.CRITICAL_STOCK_THRESHOLD); }
  hasReserved(): boolean { return this.reserved.isPositive(); }
  hasLocation(): boolean { return this.locationId !== undefined; }

  canFulfill(requested: number): boolean {
    return this.available.value >= requested;
  }

  withAdjustment(delta: number, now: string): ProductInventoryVO {
    const next = this.quantity.value + delta;
    if (next < 0) {
      throw new ValidationError('Inventory adjustment would cause negative stock', 'quantity');
    }
    return ProductInventoryVO.create({
      ...this.value,
      quantity: InventoryQuantityVO.create(next),
      updatedAt: now,
    });
  }

  withReservation(qty: number, now: string): ProductInventoryVO {
    const next = this.reserved.value + qty;
    if (next > this.quantity.value) {
      throw new ValidationError('Reservation exceeds available quantity', 'reserved');
    }
    return ProductInventoryVO.create({
      ...this.value,
      reserved: InventoryQuantityVO.create(next),
      updatedAt: now,
    });
  }
}
