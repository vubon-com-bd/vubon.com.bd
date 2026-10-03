/**
 * CartItemEntity — child entity of Cart aggregate
 * @module cart-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { CART_LIMIT } from '@vubon/shared-constants/business/cart';
import { CartItemIdVO } from '../value-objects/primitives/cart-item-id.vo.js';
import { CartItemQuantityVO } from '../value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../value-objects/primitives/cart-item-status.vo.js';
import { CartProductIdVO } from '../value-objects/primitives/product-id.vo.js';
import { CartVariantIdVO } from '../value-objects/primitives/variant-id.vo.js';
import { CartVendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';

export interface CartItemEntityProps {
  readonly productId: CartProductIdVO;
  readonly variantId?: CartVariantIdVO;
  readonly vendorId?: CartVendorIdVO;
  readonly sku: string;
  readonly name: string;
  readonly imageUrl?: string;
  readonly unitPrice: number;
  readonly compareAtPrice?: number;
  readonly quantity: CartItemQuantityVO;
  readonly discountAmount: number;
  readonly status: CartItemStatusVO;
  readonly isAvailable: boolean;
  readonly isSelected?: boolean;
  readonly attributes?: Readonly<Record<string, string>>;
  readonly currency: string;
}

export class CartItemEntity extends BaseEntity<string> {
  private _quantity: CartItemQuantityVO;
  private _status: CartItemStatusVO;
  private _unitPrice: number;
  private _discountAmount: number;
  private _isAvailable: boolean;
  private _isSelected: boolean;

  private readonly _productId: CartProductIdVO;
  private readonly _variantId?: CartVariantIdVO;
  private readonly _vendorId?: CartVendorIdVO;
  private readonly _sku: string;
  private readonly _name: string;
  private readonly _imageUrl?: string;
  private readonly _compareAtPrice?: number;
  private readonly _attributes?: Readonly<Record<string, string>>;
  private readonly _currency: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: CartItemEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._productId = props.productId;
    this._variantId = props.variantId;
    this._vendorId = props.vendorId;
    this._sku = props.sku;
    this._name = props.name;
    this._imageUrl = props.imageUrl;
    this._unitPrice = props.unitPrice;
    this._compareAtPrice = props.compareAtPrice;
    this._quantity = props.quantity;
    this._discountAmount = props.discountAmount;
    this._status = props.status;
    this._isAvailable = props.isAvailable;
    this._isSelected = props.isSelected ?? true;
    this._attributes = props.attributes;
    this._currency = props.currency;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._unitPrice < 0) {
      throw new ValidationError('Unit price cannot be negative', 'unitPrice');
    }
    if (this._discountAmount < 0) {
      throw new ValidationError('Discount cannot be negative', 'discountAmount');
    }
    if (this._sku.trim().length === 0) {
      throw new ValidationError('SKU cannot be empty', 'sku');
    }
    if (this._compareAtPrice !== undefined && this._compareAtPrice < this._unitPrice) {
      throw new ValidationError('compareAtPrice cannot be less than unitPrice', 'compareAtPrice');
    }
    const lineTotal = this._unitPrice * this._quantity.value;
    if (this._discountAmount > lineTotal) {
      throw new ValidationError(
        `Discount ${this._discountAmount} exceeds line total ${lineTotal}`,
        'discountAmount',
      );
    }
  }

  get productId(): CartProductIdVO { return this._productId; }
  get variantId(): CartVariantIdVO | undefined { return this._variantId; }
  get vendorId(): CartVendorIdVO | undefined { return this._vendorId; }
  get sku(): string { return this._sku; }
  get name(): string { return this._name; }
  get imageUrl(): string | undefined { return this._imageUrl; }
  get unitPrice(): number { return this._unitPrice; }
  get compareAtPrice(): number | undefined { return this._compareAtPrice; }
  get quantity(): CartItemQuantityVO { return this._quantity; }
  get discountAmount(): number { return this._discountAmount; }
  get status(): CartItemStatusVO { return this._status; }
  get isAvailable(): boolean { return this._isAvailable; }
  get isSelected(): boolean { return this._isSelected; }
  get attributes(): Readonly<Record<string, string>> | undefined { return this._attributes; }
  get currency(): string { return this._currency; }

  get lineSubtotal(): number { return this.round(this._unitPrice * this._quantity.value); }
  get lineTotal(): number { return this.round(this.lineSubtotal - this._discountAmount); }
  get toIdVO(): CartItemIdVO { return CartItemIdVO.reconstitute(this.id); }

  isPurchasable(): boolean { return this._isAvailable && this._status.isPurchasable(); }
  canIncreaseQuantity(by: number): boolean {
    return this._quantity.value + by <= CART_LIMIT.MAX_QUANTITY_PER_ITEM;
  }
  hasVariant(): boolean { return this._variantId !== undefined; }

  changeQuantity(newQty: CartItemQuantityVO, now: string): void {
    if (this._status.isRemoved()) {
      throw new BusinessRuleError(
        `Cannot change quantity of removed item "${this.id}"`,
        'ITEM_REMOVED',
        { itemId: this.id },
      );
    }
    this._quantity = newQty;
    this.touch(now);
  }

  applyDiscount(amount: number, now: string): void {
    if (amount < 0) throw new ValidationError('Discount cannot be negative', 'discountAmount');
    if (amount > this.lineSubtotal) {
      throw new ValidationError(
        `Discount ${amount} exceeds line subtotal ${this.lineSubtotal}`,
        'discountAmount',
      );
    }
    this._discountAmount = this.round(amount);
    this.touch(now);
  }

  changeStatus(status: CartItemStatusVO, now: string): void { this._status = status; this.touch(now); }

  markUnavailable(now: string): void {
    if (!this._isAvailable) return;
    this._isAvailable = false;
    this._isSelected = false;
    this.touch(now);
  }

  markAvailable(now: string): void {
    if (this._isAvailable) return;
    this._isAvailable = true;
    this.touch(now);
  }

  markRemoved(now: string): void {
    this._status = CartItemStatusVO.create('removed');
    this._isAvailable = false;
    this._isSelected = false;
    this.touch(now);
  }

  updateUnitPrice(newPrice: number, now: string): void {
    if (newPrice < 0) throw new ValidationError('Unit price cannot be negative', 'unitPrice');
    this._unitPrice = newPrice;
    this.touch(now);
  }

  /** Toggle selection for checkout. Cannot select an unavailable item. */
  setSelected(selected: boolean, now: string): void {
    if (selected && !this.isPurchasable()) {
      throw new BusinessRuleError(
        `Cannot select item "${this.id}" — not purchasable`,
        'ITEM_NOT_SELECTABLE',
        { itemId: this.id },
      );
    }
    if (this._isSelected === selected) return;
    this._isSelected = selected;
    this.touch(now);
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  private round(value: number): number { return Math.round(value * 100) / 100; }

  static create(params: { id: string; props: CartItemEntityProps; now: string }): CartItemEntity {
    return new CartItemEntity(params.id, params.now, params.now, params.props);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: CartItemEntityProps;
  }): CartItemEntity {
    return new CartItemEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
  }
}
