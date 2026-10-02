/**
 * CanApplyCoupon Specification
 * @module cart-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { CartEntity } from '../entities/cart.entity.js';
import { CartCouponCompositeVO } from '../value-objects/composites/cart-coupon.vo.js';

export interface ApplyCouponContext {
  readonly coupon: CartCouponCompositeVO;
  readonly now?: Date;
}

export class CanApplyCouponSpecification extends Specification<
  { cart: CartEntity; ctx: ApplyCouponContext }
> {
  isSatisfiedBy(candidate: { cart: CartEntity; ctx: ApplyCouponContext }): boolean {
    const { cart, ctx } = candidate;
    const now = ctx.now ?? new Date();

    if (cart.isEmpty) return false;
    if (!cart.isActive()) return false;
    if (cart.isExpired(now)) return false;
    if (cart.couponCode) return false; // only one coupon allowed

    const coupon = ctx.coupon;
    if (!coupon.status.isUsable()) return false;
    if (!coupon.isWithinWindow(now)) return false;
    if (!coupon.hasGlobalUsesLeft()) return false;
    if (!coupon.hasUserUsesLeft()) return false;
    if (!coupon.meetsMinOrder(cart.totals.subtotal)) return false;

    return coupon.computeDiscount(cart.totals.subtotal) > 0;
  }

  explain(candidate: { cart: CartEntity; ctx: ApplyCouponContext }): string | null {
    if (this.isSatisfiedBy(candidate)) return null;
    const { cart, ctx } = candidate;
    if (cart.isEmpty) return 'cart is empty';
    if (!cart.isActive()) return 'cart not active';
    if (cart.couponCode) return 'another coupon already applied';
    const coupon = ctx.coupon;
    if (!coupon.status.isUsable()) return `coupon status ${coupon.status.value}`;
    if (!coupon.isWithinWindow(ctx.now)) return 'coupon outside validity window';
    if (!coupon.hasGlobalUsesLeft()) return 'coupon exhausted';
    if (!coupon.hasUserUsesLeft()) return 'user limit reached for this coupon';
    if (!coupon.meetsMinOrder(cart.totals.subtotal)) {
      return `subtotal below min ${coupon.minOrderAmount}`;
    }
    return 'unknown reason';
  }

  /** Preview the discount that would be applied. */
  previewDiscount(candidate: { cart: CartEntity; ctx: ApplyCouponContext }): number {
    if (!this.isSatisfiedBy(candidate)) return 0;
    return candidate.ctx.coupon.computeDiscount(candidate.cart.totals.subtotal);
  }
}
