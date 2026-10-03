/**
 * CanAddItem Specification
 * @module cart-service/domain/specifications
 *
 * Predicate: given a cart + prospective item context, can we add it?
 * Pure — caller provides stock/price data.
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { CartEntity } from '../entities/cart.entity.js';
import { CART_LIMIT } from '@vubon/shared-constants/business/cart';

export interface AddItemContext {
  readonly productId: string;
  readonly variantId?: string;
  readonly quantity: number;
  readonly availableStock: number;
  readonly isAvailable: boolean;
  readonly now?: Date;
}

export class CanAddItemSpecification extends Specification<
  { cart: CartEntity; ctx: AddItemContext }
> {
  isSatisfiedBy(candidate: { cart: CartEntity; ctx: AddItemContext }): boolean {
    const { cart, ctx } = candidate;

    if (!cart.isActive()) return false;
    if (cart.isExpired(ctx.now)) return false;
    if (!cart.canAcceptMoreItems()) return false;
    if (!ctx.isAvailable) return false;
    if (ctx.quantity <= 0 || !Number.isInteger(ctx.quantity)) return false;

    const existing = cart.findItemByProduct(ctx.productId, ctx.variantId);
    const currentQty = existing?.quantity.value ?? 0;
    const targetQty = currentQty + ctx.quantity;

    if (targetQty > CART_LIMIT.MAX_QUANTITY_PER_ITEM) return false;
    if (targetQty > ctx.availableStock) return false;

    return true;
  }

  /** Reason when not satisfied — useful for error messages. */
  explain(candidate: { cart: CartEntity; ctx: AddItemContext }): string | null {
    if (this.isSatisfiedBy(candidate)) return null;
    const { cart, ctx } = candidate;
    if (!cart.isActive()) return 'cart is not active';
    if (cart.isExpired(ctx.now)) return 'cart has expired';
    if (!cart.canAcceptMoreItems()) return 'cart item limit reached';
    if (!ctx.isAvailable) return 'product unavailable';
    if (ctx.quantity <= 0) return 'quantity must be positive';
    const existing = cart.findItemByProduct(ctx.productId, ctx.variantId);
    const currentQty = existing?.quantity.value ?? 0;
    const targetQty = currentQty + ctx.quantity;
    if (targetQty > CART_LIMIT.MAX_QUANTITY_PER_ITEM) return 'max quantity exceeded';
    if (targetQty > ctx.availableStock) return 'insufficient stock';
    return 'unknown reason';
  }
}
