/**
 * InventoryCompositeVO — Stock management business rules
 * @module product-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InventoryIdVO } from '../primitives/inventory-id.vo.js';
import { InventoryQuantityVO } from '../primitives/inventory-quantity.vo.js';
import { InventoryThresholdVO } from '../primitives/inventory-threshold.vo.js';
import { ProductIdVO } from '../primitives/product-id.vo.js';
import { VariantIdVO } from '../primitives/variant-id.vo.js';
import { INVENTORY, INVENTORY_STATUS } from '@vubon/shared-constants/business/product';
import { InsufficientStockError } from '../../errors/inventory.errors.js';

export interface InventoryCompositeProps {
  readonly id: InventoryIdVO;
  readonly productId: ProductIdVO;
  readonly variantId?: VariantIdVO;
  readonly sku: string;
  readonly quantity: InventoryQuantityVO;
  readonly reserved: InventoryQuantityVO;
  readonly lowStockThreshold: InventoryThresholdVO;
  readonly trackQuantity: boolean;
  readonly allowBackorder: boolean;
  readonly locationId?: string;
  readonly lastRestockedAt?: string;
}

export class InventoryCompositeVO extends BaseVO<InventoryCompositeProps> {
  private constructor(props: InventoryCompositeProps) {
    super(props);
  }

  static create(props: InventoryCompositeProps): InventoryCompositeVO {
    if (props.reserved.value > props.quantity.value) {
      throw new InsufficientStockError(props.quantity.value, props.reserved.value);
    }
    return new InventoryCompositeVO(props);
  }

  static reconstitute(props: InventoryCompositeProps): InventoryCompositeVO {
    return new InventoryCompositeVO(props);
  }

  get id(): InventoryIdVO { return this.value.id; }
  get productId(): ProductIdVO { return this.value.productId; }
  get variantId(): VariantIdVO | undefined { return this.value.variantId; }
  get quantity(): number { return this.value.quantity.value; }
  get reserved(): number { return this.value.reserved.value; }
  get threshold(): number { return this.value.lowStockThreshold.value; }
  get trackQuantity(): boolean { return this.value.trackQuantity; }
  get allowBackorder(): boolean { return this.value.allowBackorder; }

  /**
   * Available = quantity - reserved
   */
  get available(): number {
    return Math.max(0, this.value.quantity.value - this.value.reserved.value);
  }

  /**
   * Business rule: determine current status
   */
  getStatus(): string {
    if (!this.value.trackQuantity) return INVENTORY_STATUS.IN_STOCK;
    if (this.value.quantity.value === 0) {
      return this.value.allowBackorder ? INVENTORY_STATUS.BACKORDER : INVENTORY_STATUS.OUT_OF_STOCK;
    }
    if (this.value.lowStockThreshold.isCritical(this.value.quantity.value)) {
      return INVENTORY_STATUS.LOW_STOCK;
    }
    if (this.value.lowStockThreshold.isLowStock(this.value.quantity.value)) {
      return INVENTORY_STATUS.LOW_STOCK;
    }
    return INVENTORY_STATUS.IN_STOCK;
  }

  /**
   * Business rule: can fulfill an order for N units
   */
  canFulfill(requested: number): boolean {
    if (!this.value.trackQuantity) return true;
    if (this.value.allowBackorder) return true;
    return this.available >= requested;
  }

  /**
   * Business rule: reserve stock for an order
   */
  reserve(amount: number): InventoryCompositeVO {
    if (!this.value.trackQuantity) {
      throw new Error('Cannot reserve stock when tracking is disabled');
    }
    if (!this.canFulfill(amount)) {
      throw new InsufficientStockError(this.available, amount);
    }
    return InventoryCompositeVO.reconstitute({
      ...this.value,
      reserved: InventoryQuantityVO.create(this.value.reserved.value + amount),
    });
  }

  /**
   * Business rule: release reserved stock
   */
  release(amount: number): InventoryCompositeVO {
    const newReserved = Math.max(0, this.value.reserved.value - amount);
    return InventoryCompositeVO.reconstitute({
      ...this.value,
      reserved: InventoryQuantityVO.create(newReserved),
    });
  }

  /**
   * Business rule: add stock (restock)
   */
  addStock(amount: number, now: string): InventoryCompositeVO {
    const newQty = InventoryQuantityVO.create(this.value.quantity.value + amount);
    return InventoryCompositeVO.reconstitute({
      ...this.value,
      quantity: newQty,
      lastRestockedAt: now,
    });
  }

  /**
   * Business rule: remove stock (sale, damage, etc)
   */
  removeStock(amount: number): InventoryCompositeVO {
    if (this.value.quantity.value - amount < INVENTORY.MIN_STOCK) {
      throw new InsufficientStockError(this.value.quantity.value, amount);
    }
    const newQty = InventoryQuantityVO.create(this.value.quantity.value - amount);
    return InventoryCompositeVO.reconstitute({
      ...this.value,
      quantity: newQty,
    });
  }

  isLowStock(): boolean {
    return this.value.lowStockThreshold.isLowStock(this.value.quantity.value);
  }

  isOutOfStock(): boolean {
    return this.value.quantity.value === 0;
  }

  isCritical(): boolean {
    return this.value.lowStockThreshold.isCritical(this.value.quantity.value);
  }
}
