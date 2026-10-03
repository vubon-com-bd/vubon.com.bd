/**
 * CartLimitsService — enforce cart/quantity limits
 * @module cart-service/domain/services
 */
import { CartEntity } from '../entities/cart.entity.js';
import { CartItemEntity } from '../entities/cart-item.entity.js';
import { CART_LIMIT } from '@vubon/shared-constants/business/cart';
import { CartLimitExceededError, ItemLimitExceededError } from '../errors/cart-limits.errors.js';

export interface LimitCheck {
  readonly withinLimits: boolean;
  readonly reason?: string;
}

export class CartLimitsService {
  /** Max unique items per cart. */
  maxItems(): number {
    return CART_LIMIT.MAX_ITEMS;
  }

  /** Max units per single item. */
  maxQuantityPerItem(): number {
    return CART_LIMIT.MAX_QUANTITY_PER_ITEM;
  }

  /** Min units per item. */
  minQuantityPerItem(): number {
    return CART_LIMIT.MIN_QUANTITY_PER_ITEM;
  }

  canAddItem(cart: CartEntity): LimitCheck {
    if (cart.items.length >= this.maxItems()) {
      return {
        withinLimits: false,
        reason: `Reached max ${this.maxItems()} items`,
      };
    }
    return { withinLimits: true };
  }

  canSetQuantity(item: CartItemEntity, qty: number): LimitCheck {
    if (qty < this.minQuantityPerItem()) {
      return {
        withinLimits: false,
        reason: `Quantity below minimum ${this.minQuantityPerItem()}`,
      };
    }
    if (qty > this.maxQuantityPerItem()) {
      return {
        withinLimits: false,
        reason: `Quantity exceeds max ${this.maxQuantityPerItem()}`,
      };
    }
    return { withinLimits: true };
  }

  assertCanAddItem(cart: CartEntity): void {
    const result = this.canAddItem(cart);
    if (!result.withinLimits) {
      throw new CartLimitExceededError(this.maxItems(), cart.items.length);
    }
  }

  assertQuantityWithinLimits(requested: number): void {
    if (requested > this.maxQuantityPerItem()) {
      throw new ItemLimitExceededError(this.maxQuantityPerItem(), requested);
    }
  }

  /** Total units across all items. */
  totalUnits(cart: CartEntity): number {
    return cart.items.reduce((sum, item) => sum + item.quantity.value, 0);
  }
}
