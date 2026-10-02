/**
 * CartEntity — Aggregate Root
 * @module cart-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { CART_LIMIT, CART_STATUS } from '@vubon/shared-constants/business/cart';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CartIdVO } from '../value-objects/primitives/cart-id.vo.js';
import { CartStatusVO } from '../value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '../value-objects/primitives/cart-type.vo.js';
import { CartUserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { CartSessionIdVO } from '../value-objects/primitives/session-id.vo.js';
import { CartItemQuantityVO } from '../value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemEntity } from './cart-item.entity.js';
import { CartTotalsCompositeVO } from '../value-objects/composites/cart-totals.vo.js';
import {
  CartCreatedEvent,
  CartClearedEvent,
  CartDeletedEvent,
  CartAbandonedEvent,
  CartExpiredEvent,
  CartStatusChangedEvent,
  CartPriceChangedEvent,
} from '../events/cart.events.js';
import {
  ItemAddedEvent,
  ItemRemovedEvent,
  ItemQuantityChangedEvent,
  ItemSelectedEvent,
  ItemDeselectedEvent,
} from '../events/cart-item.events.js';
import { CouponAppliedEvent, CouponRemovedEvent } from '../events/coupon.events.js';
import { VoucherAppliedEvent, VoucherRemovedEvent } from '../events/voucher.events.js';

export interface CartEntityProps {
  readonly type: CartTypeVO;
  readonly status: CartStatusVO;
  readonly userId?: CartUserIdVO;
  readonly sessionId?: CartSessionIdVO;
  readonly currency: string;
  readonly notes?: string;
  readonly expiresAt: string;
  readonly lastActivityAt: string;
  readonly couponCode?: string;
  readonly voucherCode?: string;
}

export class CartEntity extends AggregateRoot<string> {
  private _type: CartTypeVO;
  private _status: CartStatusVO;
  private _userId?: CartUserIdVO;
  private _sessionId?: CartSessionIdVO;
  private _currency: string;
  private _notes?: string;
  private _expiresAt: string;
  private _lastActivityAt: string;
  private _items: CartItemEntity[] = [];
  private _couponCode?: string;
  private _voucherCode?: string;
  private _totals: CartTotalsCompositeVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: CartEntityProps,
    totals: CartTotalsCompositeVO,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._type = props.type;
    this._status = props.status;
    this._userId = props.userId;
    this._sessionId = props.sessionId;
    this._currency = props.currency;
    this._notes = props.notes;
    this._expiresAt = props.expiresAt;
    this._lastActivityAt = props.lastActivityAt;
    this._couponCode = props.couponCode;
    this._voucherCode = props.voucherCode;
    this._totals = totals;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._type.isGuest() && this._userId) {
      throw new BusinessRuleError('Guest cart cannot have a userId', 'CART_GUEST_HAS_USER', { cartId: this.id });
    }
    if (this._type.isUser() && !this._userId) {
      throw new BusinessRuleError('User cart must have a userId', 'CART_USER_MISSING_USER', { cartId: this.id });
    }
    if (this._items.length > CART_LIMIT.MAX_ITEMS) {
      throw new BusinessRuleError(
        `Cart has ${this._items.length} items, max is ${CART_LIMIT.MAX_ITEMS}`,
        'CART_ITEM_LIMIT_EXCEEDED',
        { count: this._items.length, max: CART_LIMIT.MAX_ITEMS },
      );
    }
  }

  get type(): CartTypeVO { return this._type; }
  get status(): CartStatusVO { return this._status; }
  get userId(): CartUserIdVO | undefined { return this._userId; }
  get sessionId(): CartSessionIdVO | undefined { return this._sessionId; }
  get currency(): string { return this._currency; }
  get notes(): string | undefined { return this._notes; }
  get expiresAt(): string { return this._expiresAt; }
  get lastActivityAt(): string { return this._lastActivityAt; }
  get items(): readonly CartItemEntity[] { return [...this._items]; }
  get couponCode(): string | undefined { return this._couponCode; }
  get voucherCode(): string | undefined { return this._voucherCode; }
  get totals(): CartTotalsCompositeVO { return this._totals; }

  get itemCount(): number { return this._items.reduce((sum, i) => sum + i.quantity.value, 0); }
  get uniqueItemCount(): number { return this._items.length; }
  get selectedItemCount(): number { return this._items.filter((i) => i.isSelected).length; }
  get isEmpty(): boolean { return this._items.length === 0; }
  get toIdVO(): CartIdVO { return CartIdVO.reconstitute(this.id); }

  isActive(): boolean { return this._status.value === CART_STATUS.ACTIVE; }
  isExpired(now: Date = new Date()): boolean { return now.getTime() > Date.parse(this._expiresAt); }
  canCheckout(): boolean { return this.isActive() && !this.isEmpty && !this.isExpired(); }
  canAcceptMoreItems(): boolean { return this._items.length < CART_LIMIT.MAX_ITEMS; }

  findItem(itemId: string): CartItemEntity | undefined {
    return this._items.find((i) => i.id === itemId);
  }

  findItemByProduct(productId: string, variantId?: string): CartItemEntity | undefined {
    return this._items.find(
      (i) =>
        i.productId.value === productId &&
        (variantId === undefined ? i.variantId === undefined : i.variantId?.value === variantId),
    );
  }

  hasItem(itemId: string): boolean { return this.findItem(itemId) !== undefined; }

  addItem(item: CartItemEntity, now: string): void {
    if (!this.canAcceptMoreItems()) {
      throw new BusinessRuleError(
        `Cart has reached max of ${CART_LIMIT.MAX_ITEMS} items`,
        'CART_ITEM_LIMIT_EXCEEDED',
        { max: CART_LIMIT.MAX_ITEMS },
      );
    }
    if (this.isExpired(new Date(now))) {
      throw new BusinessRuleError(`Cart "${this.id}" has expired`, 'CART_EXPIRED', { cartId: this.id });
    }
    const existing = this.findItemByProduct(item.productId.value, item.variantId?.value);
    if (existing) {
      const merged = existing.quantity.add(item.quantity);
      const oldQty = existing.quantity.value;
      existing.changeQuantity(merged, now);
      this._items = this._items.map((i) => (i.id === existing.id ? existing : i));
      this.addDomainEvent(
        new ItemQuantityChangedEvent({
          aggregateId: this.id,
          payload: {
            cartId: this.id,
            itemId: existing.id,
            oldQuantity: oldQty,
            newQuantity: merged.value,
            reason: 'merge',
          },
          version: this.version + 1,
        }),
      );
    } else {
      this._items.push(item);
      this.addDomainEvent(
        new ItemAddedEvent({
          aggregateId: this.id,
          payload: {
            cartId: this.id,
            itemId: item.id,
            productId: item.productId.value,
            variantId: item.variantId?.value,
            sku: item.sku,
            quantity: item.quantity.value,
            unitPrice: item.unitPrice,
            currency: this._currency,
          },
          version: this.version + 1,
        }),
      );
    }
    this.touch(now);
    this.incrementVersion();
  }

  removeItem(itemId: string, removedBy?: string, now: string = new Date().toISOString()): void {
    const item = this.findItem(itemId);
    if (!item) return;
    this._items = this._items.filter((i) => i.id !== itemId);
    this.addDomainEvent(
      new ItemRemovedEvent({
        aggregateId: this.id,
        payload: {
          cartId: this.id,
          itemId,
          productId: item.productId.value,
          quantity: item.quantity.value,
          removedBy,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  changeItemQuantity(itemId: string, newQty: CartItemQuantityVO, now: string = new Date().toISOString()): void {
    const item = this.findItem(itemId);
    if (!item) throw new ValidationError(`Item "${itemId}" not found in cart`, 'itemId');
    const oldQty = item.quantity.value;
    item.changeQuantity(newQty, now);
    this._items = this._items.map((i) => (i.id === itemId ? item : i));
    this.addDomainEvent(
      new ItemQuantityChangedEvent({
        aggregateId: this.id,
        payload: {
          cartId: this.id,
          itemId,
          oldQuantity: oldQty,
          newQuantity: newQty.value,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  /** Select/deselect item for checkout. Emits ItemSelectedEvent or ItemDeselectedEvent. */
  selectItem(itemId: string, selected: boolean, now: string = new Date().toISOString()): void {
    const item = this.findItem(itemId);
    if (!item) throw new ValidationError(`Item "${itemId}" not found in cart`, 'itemId');
    item.setSelected(selected, now);
    this._items = this._items.map((i) => (i.id === itemId ? item : i));
    this.addDomainEvent(
      selected
        ? new ItemSelectedEvent({
            aggregateId: this.id,
            payload: { cartId: this.id, itemId, selected },
            version: this.version + 1,
          })
        : new ItemDeselectedEvent({
            aggregateId: this.id,
            payload: { cartId: this.id, itemId, selected },
            version: this.version + 1,
          }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  /** Select/deselect all purchasable items */
  selectAllItems(selected: boolean, now: string = new Date().toISOString()): void {
    for (const item of this._items) {
      if (selected && !item.isPurchasable()) continue;
      if (item.isSelected !== selected) item.setSelected(selected, now);
    }
    this.touch(now);
  }

  clear(clearedBy?: string, now: string = new Date().toISOString()): void {
    const removedCount = this._items.length;
    if (removedCount === 0) return;
    this._items = [];
    this._couponCode = undefined;
    this._voucherCode = undefined;
    this._status = CartStatusVO.create(CART_STATUS.CLEARED);
    this.addDomainEvent(
      new CartClearedEvent({
        aggregateId: this.id,
        payload: { cartId: this.id, itemsRemoved: removedCount, clearedBy },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  applyCoupon(code: string, discountAmount: number, now: string): void {
    if (this.isEmpty) {
      throw new BusinessRuleError('Cannot apply coupon to empty cart', 'CART_EMPTY_COUPON', { cartId: this.id });
    }
    this._couponCode = code;
    this.addDomainEvent(
      new CouponAppliedEvent({
        aggregateId: this.id,
        payload: { cartId: this.id, code, discountAmount, currency: this._currency },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  removeCoupon(reason?: string, now: string = new Date().toISOString()): void {
    const code = this._couponCode;
    if (!code) return;
    this._couponCode = undefined;
    this.addDomainEvent(
      new CouponRemovedEvent({
        aggregateId: this.id,
        payload: { cartId: this.id, code, reason },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  applyVoucher(code: string, amount: number, now: string): void {
    if (this.isEmpty) {
      throw new BusinessRuleError('Cannot apply voucher to empty cart', 'CART_EMPTY_VOUCHER', { cartId: this.id });
    }
    this._voucherCode = code;
    this.addDomainEvent(
      new VoucherAppliedEvent({
        aggregateId: this.id,
        payload: { cartId: this.id, code, amount, currency: this._currency },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  removeVoucher(reason?: string, now: string = new Date().toISOString()): void {
    const code = this._voucherCode;
    if (!code) return;
    this._voucherCode = undefined;
    this.addDomainEvent(
      new VoucherRemovedEvent({
        aggregateId: this.id,
        payload: { cartId: this.id, code, reason },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  recalculateTotals(params: {
    taxRate?: number;
    taxInclusive?: boolean;
    shippingCost?: number;
    couponDiscount?: number;
    voucherDiscount?: number;
    now?: string;
  }): void {
    const subtotal = this.round(this._items.reduce((sum, i) => sum + i.lineSubtotal, 0));
    const itemDiscounts = this.round(this._items.reduce((sum, i) => sum + i.discountAmount, 0));
    const newTotals = CartTotalsCompositeVO.calculate({
      currency: this._currency,
      itemCount: this.itemCount,
      subtotal,
      itemDiscounts,
      couponDiscount: params.couponDiscount ?? 0,
      voucherDiscount: params.voucherDiscount ?? 0,
      taxRate: params.taxRate,
      taxInclusive: params.taxInclusive,
      shippingCost: params.shippingCost,
    });
    if (this._totals.grandTotal !== newTotals.grandTotal && this._totals.grandTotal > 0) {
      this.addDomainEvent(
        new CartPriceChangedEvent({
          aggregateId: this.id,
          payload: {
            cartId: this.id,
            oldTotal: this._totals.grandTotal,
            newTotal: newTotals.grandTotal,
            currency: this._currency,
          },
          version: this.version + 1,
        }),
      );
    }
    this._totals = newTotals;
    this.touch(params.now ?? new Date().toISOString());
    this.incrementVersion();
  }

  abandon(abandonedBy?: string, now: string = new Date().toISOString()): void {
    if (this._status.isAbandoned()) {
      throw new BusinessRuleError(
        `Cart "${this.id}" is already abandoned`,
        'CART_ALREADY_ABANDONED',
        { cartId: this.id },
      );
    }
    const from = this._status.value;
    this._status = CartStatusVO.create(CART_STATUS.ABANDONED);
    this.addDomainEvent(
      new CartAbandonedEvent({
        aggregateId: this.id,
        payload: {
          cartId: this.id,
          abandonedAt: now,
          itemCount: this.itemCount,
          cartValue: this._totals.grandTotal,
          currency: this._currency,
          userId: this._userId?.value,
        },
        version: this.version + 1,
        metadata: abandonedBy ? { userId: abandonedBy } : undefined,
      }),
    );
    this.addDomainEvent(
      new CartStatusChangedEvent({
        aggregateId: this.id,
        payload: {
          cartId: this.id,
          fromStatus: from,
          toStatus: CART_STATUS.ABANDONED,
          changedBy: abandonedBy,
        },
        version: this.version + 2,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  expire(now: string = new Date().toISOString()): void {
    if (!this.isActive()) return;
    this._status = CartStatusVO.create(CART_STATUS.EXPIRED);
    this.addDomainEvent(
      new CartExpiredEvent({
        aggregateId: this.id,
        payload: { cartId: this.id, expiredAt: now, lastActivityAt: this._lastActivityAt },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  softDelete(deletedBy?: string, now: string = new Date().toISOString()): void {
    this._status = CartStatusVO.create(CART_STATUS.CLEARED);
    (this as unknown as { deletedAt: string | null }).deletedAt = now;
    this.addDomainEvent(
      new CartDeletedEvent({
        aggregateId: this.id,
        payload: { cartId: this.id, deletedBy },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  attachToUser(userId: CartUserIdVO, now: string): void {
    if (this._type.isUser()) {
      throw new BusinessRuleError('Cart already attached to a user', 'CART_ALREADY_USER', { cartId: this.id });
    }
    this._userId = userId;
    this._type = CartTypeVO.create('user');
    this._status = CartStatusVO.create(CART_STATUS.ACTIVE);
    this.touch(now);
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this._lastActivityAt = now;
  }

  private round(value: number): number { return Math.round(value * 100) / 100; }

  static create(params: { id: string; props: CartEntityProps; now: string }): CartEntity {
    const totals = CartTotalsCompositeVO.empty(params.props.currency);
    const entity = new CartEntity(params.id, params.now, params.now, params.props, totals);
    entity.addDomainEvent(
      new CartCreatedEvent({
        aggregateId: params.id,
        payload: {
          cartId: params.id,
          type: params.props.type.value,
          userId: params.props.userId?.value,
          sessionId: params.props.sessionId?.value,
          currency: params.props.currency,
        },
        version: 1,
      }),
    );
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: CartEntityProps;
    totals: CartTotalsCompositeVO;
    items?: readonly CartItemEntity[];
    version?: number;
  }): CartEntity {
    const entity = new CartEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.totals,
      params.deletedAt,
    );
    if (params.items) entity._items = [...params.items];
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
