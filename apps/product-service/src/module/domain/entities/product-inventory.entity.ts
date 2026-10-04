/**
 * ProductInventoryEntity — Child of Product aggregate
 * @module product-service/domain/entities
 *
 * Business rules:
 * - available = quantity - reserved
 * - reserved cannot exceed quantity
 * - quantity cannot be negative
 * - status auto-computed from quantity + threshold
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { INVENTORY, INVENTORY_STATUS } from '@vubon/shared-constants/business/product';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { InventoryIdVO } from '../value-objects/primitives/inventory-id.vo.js';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo.js';
import { VariantIdVO } from '../value-objects/primitives/variant-id.vo.js';
import { InventoryQuantityVO } from '../value-objects/primitives/inventory-quantity.vo.js';
import { InventoryThresholdVO } from '../value-objects/primitives/inventory-threshold.vo.js';

export interface ProductInventoryEntityProps {
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

export class ProductInventoryEntity extends BaseEntity<string> {
  private readonly _productId: ProductIdVO;
  private readonly _variantId?: VariantIdVO;
  private readonly _sku: string;
  private _quantity: InventoryQuantityVO;
  private _reserved: InventoryQuantityVO;
  private _lowStockThreshold: InventoryThresholdVO;
  private readonly _trackQuantity: boolean;
  private readonly _allowBackorder: boolean;
  private readonly _locationId?: string;
  private _lastRestockedAt?: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: ProductInventoryEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._productId = props.productId;
    this._variantId = props.variantId;
    this._sku = props.sku;
    this._quantity = props.quantity;
    this._reserved = props.reserved;
    this._lowStockThreshold = props.lowStockThreshold;
    this._trackQuantity = props.trackQuantity;
    this._allowBackorder = props.allowBackorder;
    this._locationId = props.locationId;
    this._lastRestockedAt = props.lastRestockedAt;

    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._reserved.value > this._quantity.value) {
      throw new BusinessRuleError(
        `Reserved (${this._reserved.value}) cannot exceed quantity (${this._quantity.value})`,
        'INVALID_RESERVED_QUANTITY',
        { inventoryId: this.id },
      );
    }
  }

  // Getters
  get productId(): ProductIdVO { return this._productId; }
  get variantId(): VariantIdVO | undefined { return this._variantId; }
  get sku(): string { return this._sku; }
  get quantity(): number { return this._quantity.value; }
  get reserved(): number { return this._reserved.value; }
  get threshold(): number { return this._lowStockThreshold.value; }
  get trackQuantity(): boolean { return this._trackQuantity; }
  get allowBackorder(): boolean { return this._allowBackorder; }
  get locationId(): string | undefined { return this._locationId; }
  get lastRestockedAt(): string | undefined { return this._lastRestockedAt; }

  public get available(): number {
    return Math.max(0, this._quantity.value - this._reserved.value);
  }

  public getStatus(): string {
    if (!this._trackQuantity) return INVENTORY_STATUS.IN_STOCK;
    if (this._quantity.value === 0) {
      return this._allowBackorder ? INVENTORY_STATUS.BACKORDER : INVENTORY_STATUS.OUT_OF_STOCK;
    }
    if (this._lowStockThreshold.isCritical(this._quantity.value)) {
      return INVENTORY_STATUS.LOW_STOCK;
    }
    if (this._lowStockThreshold.isLowStock(this._quantity.value)) {
      return INVENTORY_STATUS.LOW_STOCK;
    }
    return INVENTORY_STATUS.IN_STOCK;
  }

  // ─── Business methods ─────────────────────────────────────

  public canFulfill(amount: number): boolean {
    if (amount <= 0) return false;
    if (!this._trackQuantity) return true;
    if (this._allowBackorder) return true;
    return this.available >= amount;
  }

  public reserve(amount: number): void {
    if (!this._trackQuantity) {
      throw new BusinessRuleError('Cannot reserve stock when tracking disabled', 'TRACK_DISABLED');
    }
    if (amount <= 0) {
      throw new ValidationError('Reserve amount must be positive', 'amount');
    }
    if (!this.canFulfill(amount)) {
      throw new BusinessRuleError(
        `Insufficient stock: available ${this.available}, requested ${amount}`,
        'INSUFFICIENT_STOCK',
        { inventoryId: this.id, available: this.available, requested: amount },
      );
    }
    this._reserved = InventoryQuantityVO.create(this._reserved.value + amount);
  }

  public release(amount: number): void {
    if (amount <= 0) {
      throw new ValidationError('Release amount must be positive', 'amount');
    }
    const newReserved = Math.max(0, this._reserved.value - amount);
    this._reserved = InventoryQuantityVO.create(newReserved);
  }

  public commitReserved(amount: number): void {
    // Reduces both quantity and reserved by amount (item shipped)
    if (amount <= 0) {
      throw new ValidationError('Commit amount must be positive', 'amount');
    }
    if (amount > this._reserved.value) {
      throw new BusinessRuleError(
        `Cannot commit more than reserved (${this._reserved.value})`,
        'COMMIT_EXCEEDS_RESERVED',
      );
    }
    this._quantity = InventoryQuantityVO.create(this._quantity.value - amount);
    this._reserved = InventoryQuantityVO.create(this._reserved.value - amount);
  }

  public addStock(amount: number, now: string): void {
    if (amount <= 0) {
      throw new ValidationError('Add stock amount must be positive', 'amount');
    }
    const newQty = this._quantity.value + amount;
    if (newQty > INVENTORY.MAX_STOCK_PER_VARIANT) {
      throw new BusinessRuleError(
        `Stock would exceed max ${INVENTORY.MAX_STOCK_PER_VARIANT}`,
        'STOCK_LIMIT_EXCEEDED',
        { inventoryId: this.id, newQty },
      );
    }
    this._quantity = InventoryQuantityVO.create(newQty);
    this._lastRestockedAt = now;
  }

  public removeStock(amount: number): void {
    if (amount <= 0) {
      throw new ValidationError('Remove amount must be positive', 'amount');
    }
    if (this._quantity.value - amount < INVENTORY.MIN_STOCK) {
      throw new BusinessRuleError(
        `Cannot remove ${amount} — would drop below minimum ${INVENTORY.MIN_STOCK}`,
        'INSUFFICIENT_STOCK',
        { inventoryId: this.id, current: this._quantity.value, requested: amount },
      );
    }
    this._quantity = InventoryQuantityVO.create(this._quantity.value - amount);
  }

  public setQuantity(quantity: number, now: string): void {
    this._quantity = InventoryQuantityVO.create(quantity);
    if (quantity > 0) this._lastRestockedAt = now;
  }

  public adjustThreshold(threshold: InventoryThresholdVO): void {
    this._lowStockThreshold = threshold;
  }

  public isLowStock(): boolean {
    return this._lowStockThreshold.isLowStock(this._quantity.value);
  }

  public isCritical(): boolean {
    return this._lowStockThreshold.isCritical(this._quantity.value);
  }

  public isOutOfStock(): boolean {
    return this._quantity.value === 0;
  }

  // Factories
  public static create(params: {
    id: string;
    props: ProductInventoryEntityProps;
    now: string;
  }): ProductInventoryEntity {
    return new ProductInventoryEntity(params.id, params.now, params.now, params.props);
  }

  public static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: ProductInventoryEntityProps;
  }): ProductInventoryEntity {
    return new ProductInventoryEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
  }
}
