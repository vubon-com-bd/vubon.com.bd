/**
 * CanCheckout Specification
 * @module cart-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { CartEntity } from '../entities/cart.entity.js';

export interface CheckoutContext {
  readonly minimumOrderAmount?: number;
  readonly now?: Date;
}

export class CanCheckoutSpecification extends Specification<
  { cart: CartEntity; ctx?: CheckoutContext }
> {
  isSatisfiedBy(candidate: { cart: CartEntity; ctx?: CheckoutContext }): boolean {
    const { cart, ctx } = candidate;
    const now = ctx?.now;

    if (!cart.isActive()) return false;
    if (cart.isEmpty) return false;
    if (cart.isExpired(now)) return false;
    if (cart.items.some((i) => !i.isPurchasable())) return false;

    if (
      ctx?.minimumOrderAmount !== undefined &&
      cart.totals.subtotal < ctx.minimumOrderAmount
    ) {
      return false;
    }

    return true;
  }

  explain(candidate: { cart: CartEntity; ctx?: CheckoutContext }): string | null {
    if (this.isSatisfiedBy(candidate)) return null;
    const { cart, ctx } = candidate;
    if (!cart.isActive()) return `cart is ${cart.status.value}`;
    if (cart.isEmpty) return 'cart is empty';
    if (cart.isExpired(ctx?.now)) return 'cart expired';
    if (cart.items.some((i) => !i.isPurchasable())) return 'some items unavailable';
    if (
      ctx?.minimumOrderAmount !== undefined &&
      cart.totals.subtotal < ctx.minimumOrderAmount
    ) {
      return `subtotal below minimum ${ctx.minimumOrderAmount}`;
    }
    return 'unknown reason';
  }

  /** Only the items that are ready for checkout. */
  eligibleItemCount(cart: CartEntity): number {
    return cart.items.filter((i) => i.isPurchasable()).length;
  }
}
