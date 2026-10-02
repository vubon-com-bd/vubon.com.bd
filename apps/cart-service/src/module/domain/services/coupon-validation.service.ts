/**
 * CouponValidationService — pure coupon applicability & discount calculation
 * @module cart-service/domain/services
 *
 * The rule set here mirrors CartCouponCompositeVO but is designed to be
 * stateless and reusable: caller passes the coupon aggregate + context.
 */
import { CartCouponCompositeVO } from '../value-objects/composites/cart-coupon.vo.js';

export interface CouponContext {
  readonly subtotal: number;
  readonly currency: string;
  readonly userId?: string;
  readonly now?: Date;
}

export interface CouponValidationResult {
  readonly valid: boolean;
  readonly discount: number;
  readonly reason?: string;
  readonly errorCode?: string;
}

export class CouponValidationService {
  validate(
    coupon: CartCouponCompositeVO,
    ctx: CouponContext,
  ): CouponValidationResult {
    const now = ctx.now ?? new Date();

    if (!coupon.status.isUsable()) {
      return {
        valid: false,
        discount: 0,
        reason: `Coupon status "${coupon.status.value}" is not usable`,
        errorCode: 'COUPON_NOT_ACTIVE',
      };
    }
    if (!coupon.isWithinWindow(now)) {
      return {
        valid: false,
        discount: 0,
        reason: 'Coupon outside validity window',
        errorCode: 'COUPON_OUT_OF_WINDOW',
      };
    }
    if (!coupon.hasGlobalUsesLeft()) {
      return {
        valid: false,
        discount: 0,
        reason: 'Coupon global usage limit reached',
        errorCode: 'COUPON_EXHAUSTED',
      };
    }
    if (!coupon.hasUserUsesLeft()) {
      return {
        valid: false,
        discount: 0,
        reason: 'User has already used this coupon max times',
        errorCode: 'COUPON_USER_LIMIT',
      };
    }
    if (!coupon.meetsMinOrder(ctx.subtotal)) {
      return {
        valid: false,
        discount: 0,
        reason: `Subtotal ${ctx.subtotal} below min ${coupon.minOrderAmount}`,
        errorCode: 'COUPON_MIN_ORDER',
      };
    }

    const discount = coupon.computeDiscount(ctx.subtotal);
    if (discount <= 0) {
      return {
        valid: false,
        discount: 0,
        reason: 'Computed discount is zero',
        errorCode: 'COUPON_ZERO_DISCOUNT',
      };
    }
    return { valid: true, discount };
  }

  /**
   * Compute only the discount amount (no validation side effects).
   * Returns 0 when not applicable.
   */
  computeDiscount(coupon: CartCouponCompositeVO, subtotal: number): number {
    return coupon.computeDiscount(subtotal);
  }

  /**
   * Determine whether two coupons can be stacked together.
   */
  canStack(a: CartCouponCompositeVO, b: CartCouponCompositeVO): boolean {
    return a.stackable && b.stackable;
  }
}
