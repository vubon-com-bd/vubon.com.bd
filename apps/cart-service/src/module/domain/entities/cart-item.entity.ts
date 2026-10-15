/**
 * CartItemEntity — Child of Cart aggregate
 * @module cart-service/domain/entities
 *
 * ⚠️ NO incrementVersion() — BaseEntity has no version
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { CartItemIdVO } from '../value-objects/primitives/cart-item-id.vo.js';
import { CartItemQuantityVO } from '../value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../value-objects/primitives/cart-item-status.vo.js';
import { CartItemNoteVO } from '../value-objects/primitives/cart-item-note.vo.js';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo.js';
import { VariantIdVO } from '../value-objects/primitives/variant-id.vo.js';
import { CartIdVO } from '../value-objects/primitives/cart-id.vo.js';

export interface CartItemEntityProps {
  readonly cartId: CartIdVO;
  readonly productId: ProductIdVO;
  readonly variantId?: VariantIdVO;
  readonly quantity: CartItemQuantityVO;
  readonly status: CartItemStatusVO;
  readonly unitPrice: number;
  readonly currency: string;
  readonly note?: CartItemNoteVO;
}

export class CartItemEntity extends BaseEntity<string> {
  private _quantity: CartItemQuantityVO;
  private _status: CartItemStatusVO;
  private _unitPrice: number;
  private _note?: CartItemNoteVO;
  private _updatedAtInternal: string;

  private readonly _cartId: CartIdVO;
  private readonly _productId: ProductIdVO;
  private readonly _variantId?: VariantIdVO;
  private readonly _currency: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: CartItemEntityProps,
  ) {
    super(id, createdAt, updatedAt, null);

    this._cartId = props.cartId;
    this._productId = props.productId;
    this._variantId = props.variantId;
    this._quantity = props.quantity;
    this._status = props.status;
    this._unitPrice = props.unitPrice;
    this._currency = props.currency;
    this._note = props.note;
    this._updatedAtInternal = updatedAt;

    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!Number.isFinite(this._unitPrice) || this._unitPrice < 0) {
      throw new ValidationError('unitPrice must be non-negative', 'unitPrice');
    }
    if (this._currency.trim().length === 0) {
      throw new ValidationError('currency cannot be empty', 'currency');
    }
  }

  // Getters
  get cartId(): CartIdVO { return this._cartId; }
  get productId(): ProductIdVO { return this._productId; }
  get variantId(): VariantIdVO | undefined { return this._variantId; }
  get quantity(): CartItemQuantityVO { return this._quantity; }
  get status(): CartItemStatusVO { return this._status; }
  get unitPrice(): number { return this._unitPrice; }
  get currency(): string { return this._currency; }
  get note(): CartItemNoteVO | undefined { return this._note; }
  get updatedAtInternal(): string { return this._updatedAtInternal; }

  get subtotal(): number {
    return Math.round(this._unitPrice * this._quantity.value * 100) / 100;
  }

  get toIdVO(): CartItemIdVO {
    return CartItemIdVO.reconstitute(this.id);
  }

  // Predicates
  isActive(): boolean { return this._status.isActiveStatus(); }
  isOutOfStock(): boolean { return this._status.isOutOfStock(); }
  isUnavailable(): boolean { return this._status.isUnavailable(); }
  isRemoved(): boolean { return this._status.isRemoved(); }
  isSaved(): boolean { return this._status.isSaved(); }

  isPurchasable(): boolean { return this._status.isPurchasable(); }
  hasNote(): boolean { return this._note !== undefined && !this._note.isEmpty(); }
  hasVariant(): boolean { return this._variantId !== undefined; }

  // Business Actions
  changeQuantity(newQty: CartItemQuantityVO, now: string = new Date().toISOString()): void {
    if (this.isRemoved()) {
      throw new BusinessRuleError(
        'Cannot change quantity of removed item',
        'CART_ITEM_REMOVED',
        { itemId: this.id },
      );
    }
    this._quantity = newQty;
    this.touch(now);
  }

  increaseQuantity(by: CartItemQuantityVO, now: string = new Date().toISOString()): void {
    this.changeQuantity(this._quantity.add(by), now);
  }

  decreaseQuantity(by: CartItemQuantityVO, now: string = new Date().toISOString()): void {
    this.changeQuantity(this._quantity.subtract(by), now);
  }

  changeStatus(newStatus: CartItemStatusVO, now: string = new Date().toISOString()): void {
    if (!this._status.canTransitionTo(newStatus.value)) {
      throw new BusinessRuleError(
        `Invalid cart item status transition: "${this._status.value}" → "${newStatus.value}"`,
        'INVALID_CART_ITEM_STATUS_TRANSITION',
        { itemId: this.id, from: this._status.value, to: newStatus.value },
      );
    }
    this._status = newStatus;
    this.touch(now);
  }

  markOutOfStock(now: string = new Date().toISOString()): void {
    this.changeStatus(CartItemStatusVO.create('out_of_stock'), now);
  }

  markUnavailable(now: string = new Date().toISOString()): void {
    this.changeStatus(CartItemStatusVO.create('unavailable'), now);
  }

  markRemoved(now: string = new Date().toISOString()): void {
    this.changeStatus(CartItemStatusVO.create('removed'), now);
  }

  updateNote(note: CartItemNoteVO, now: string = new Date().toISOString()): void {
    if (this.isRemoved()) {
      throw new BusinessRuleError(
        'Cannot update note on removed item',
        'CART_ITEM_REMOVED',
        { itemId: this.id },
      );
    }
    this._note = note;
    this.touch(now);
  }

  clearNote(now: string = new Date().toISOString()): void {
    this._note = undefined;
    this.touch(now);
  }

  updateUnitPrice(newPrice: number, now: string = new Date().toISOString()): void {
    if (!Number.isFinite(newPrice) || newPrice < 0) {
      throw new ValidationError('unitPrice must be non-negative', 'unitPrice');
    }
    this._unitPrice = newPrice;
    this.touch(now);
  }

  private touch(now: string): void {
    this._updatedAtInternal = now;
  }

  // Factories
  static create(params: {
    id: CartItemIdVO;
    props: Omit<CartItemEntityProps, 'status'> & { status?: CartItemStatusVO };
    now: string;
  }): CartItemEntity {
    return new CartItemEntity(params.id.value, params.now, params.now, {
      ...params.props,
      status: params.props.status ?? CartItemStatusVO.active(),
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: CartItemEntityProps;
  }): CartItemEntity {
    return new CartItemEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
    );
  }
}
