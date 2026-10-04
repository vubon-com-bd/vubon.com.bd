/**
 * Cart Composite VO — Full cart snapshot
 * @module cart-service/domain/value-objects/composites
 *
 * Business rules:
 * - Cart total item count = sum(item.quantity)
 * - Empty carts cannot be checked out
 * - Expired carts cannot accept items
 * - Item limit enforced (CART_LIMIT.MAX_ITEMS)
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { CART_LIMIT, CART_STATUS } from '@vubon/shared-constants/business/cart';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { CartIdVO } from '../primitives/cart-id.vo.js';
import { CartStatusVO } from '../primitives/cart-status.vo.js';
import { CartTypeVO } from '../primitives/cart-type.vo.js';
import { CartUserIdVO } from '../primitives/user-id.vo.js';
import { CartSessionIdVO } from '../primitives/session-id.vo.js';
import { CartItemCompositeVO } from './cart-item.vo.js';
import { CartTotalsCompositeVO } from './cart-totals.vo.js';

export interface CartProps {
  readonly id: CartIdVO;
  readonly type: CartTypeVO;
  readonly status: CartStatusVO;
  readonly userId?: CartUserIdVO;
  readonly sessionId?: CartSessionIdVO;
  readonly items: readonly CartItemCompositeVO[];
  readonly totals: CartTotalsCompositeVO;
  readonly currency: string;
  readonly notes?: string;
  readonly expiresAt: string;
  readonly lastActivityAt: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class CartCompositeVO extends BaseVO<CartProps> {
  private constructor(props: CartProps) {
    super(props);
  }

  static create(props: CartProps): CartCompositeVO {
    if (props.items.length > CART_LIMIT.MAX_ITEMS) {
      throw new BusinessRuleError(
        `Cart has ${props.items.length} items, max is ${CART_LIMIT.MAX_ITEMS}`,
        'CART_ITEM_LIMIT_EXCEEDED',
        { count: props.items.length, max: CART_LIMIT.MAX_ITEMS },
      );
    }
    if (props.type.isGuest() && props.userId) {
      throw new BusinessRuleError(
        'Guest cart cannot have a userId',
        'CART_GUEST_HAS_USER',
        { cartId: props.id.value },
      );
    }
    if (props.type.isUser() && !props.userId) {
      throw new BusinessRuleError(
        'User cart must have a userId',
        'CART_USER_MISSING_USER',
        { cartId: props.id.value },
      );
    }
    return new CartCompositeVO(props);
  }

  static reconstitute(props: CartProps): CartCompositeVO {
    return new CartCompositeVO(props);
  }

  // Getters
  get id(): CartIdVO { return this.value.id; }
  get type(): CartTypeVO { return this.value.type; }
  get status(): CartStatusVO { return this.value.status; }
  get userId(): CartUserIdVO | undefined { return this.value.userId; }
  get sessionId(): CartSessionIdVO | undefined { return this.value.sessionId; }
  get items(): readonly CartItemCompositeVO[] { return this.value.items; }
  get totals(): CartTotalsCompositeVO { return this.value.totals; }
  get currency(): string { return this.value.currency; }
  get notes(): string | undefined { return this.value.notes; }
  get expiresAt(): string { return this.value.expiresAt; }
  get lastActivityAt(): string { return this.value.lastActivityAt; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  // Business queries
  get itemCount(): number {
    return this.value.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get uniqueItemCount(): number {
    return this.value.items.length;
  }

  get isEmpty(): boolean {
    return this.value.items.length === 0;
  }

  isExpired(now: Date = new Date()): boolean {
    return now.getTime() > Date.parse(this.value.expiresAt);
  }

  isActive(): boolean {
    return this.value.status.value === CART_STATUS.ACTIVE;
  }

  isGuestCart(): boolean {
    return this.value.type.isGuest();
  }

  isUserCart(): boolean {
    return this.value.type.isUser();
  }

  canCheckout(): boolean {
    return this.isActive() && !this.isEmpty && !this.isExpired();
  }

  canAcceptMoreItems(additional: number = 1): boolean {
    return this.value.items.length + additional <= CART_LIMIT.MAX_ITEMS;
  }

  findItem(itemId: string): CartItemCompositeVO | undefined {
    return this.value.items.find((i) => i.id.value === itemId);
  }

  findItemByProduct(
    productId: string,
    variantId?: string,
  ): CartItemCompositeVO | undefined {
    return this.value.items.find(
      (i) =>
        i.productId.value === productId &&
        (variantId === undefined
          ? i.variantId === undefined
          : i.variantId?.value === variantId),
    );
  }

  hasItem(itemId: string): boolean {
    return this.findItem(itemId) !== undefined;
  }

  // Immutable transformations
  withItems(items: readonly CartItemCompositeVO[]): CartCompositeVO {
    return new CartCompositeVO({ ...this.value, items });
  }

  withTotals(totals: CartTotalsCompositeVO): CartCompositeVO {
    return new CartCompositeVO({ ...this.value, totals });
  }

  withStatus(status: CartStatusVO): CartCompositeVO {
    return new CartCompositeVO({ ...this.value, status });
  }

  withLastActivity(now: string): CartCompositeVO {
    return new CartCompositeVO({ ...this.value, lastActivityAt: now });
  }

  // Convenience: verify totals are consistent with items
  validateTotals(): boolean {
    const expectedSubtotal =
      Math.round(
        this.value.items.reduce((sum, item) => sum + item.lineSubtotal, 0) * 100,
      ) / 100;
    return Math.abs(expectedSubtotal - this.value.totals.subtotal) < 0.01;
  }
}
