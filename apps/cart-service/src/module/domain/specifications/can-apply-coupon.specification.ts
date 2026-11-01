/**
 * CanApplyCouponSpecification
 * @module cart-service/domain/specifications
 *
 * Rules:
 *  - Cart modifiable
 *  - Subtotal > 0
 *  - Coupon limit not reached
 *  - Coupon not already applied
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';

import type { CartEntity } from '../entities/cart.entity.js';
import type { CartCouponEntity } from '../entities/cart-coupon.entity.js';

export interface CanApplyCouponContext {
  readonly cart: CartEntity;
  readonly subtotal: number;
  readonly alreadyApplied: readonly CartCouponEntity[];
  readonly code: string;
  readonly maxCoupons?: number;
}

const DEFAULT_MAX_COUPONS = 1;

export class CanApplyCouponSpecification extends Specification<CanApplyCouponContext> {
  isSatisfiedBy(c: CanApplyCouponContext): boolean {
    return this.explain(c) === null;
  }

  explain(c: CanApplyCouponContext): string | null {
    const { cart, subtotal, alreadyApplied, code, maxCoupons = DEFAULT_MAX_COUPONS } = c;

    if (!cart.canBeModified()) {
      return `Cart cannot be modified (status: ${cart.status.value})`;
    }

    if (subtotal <= 0) {
      return 'Cannot apply coupon on empty cart';
    }

    const active = alreadyApplied.filter((cc) => cc.isUsable());
    if (active.length >= maxCoupons) {
      return `Coupon limit reached (max ${maxCoupons})`;
    }

    const dup = alreadyApplied.find(
      (cc) => cc.code.value === code.toUpperCase() && !cc.isFinal(),
    );
    if (dup) {
      return 'Coupon already applied';
    }

    return null;
  }

  static strict(): CanApplyCouponSpecification {
    return new CanApplyCouponSpecification();
  }
}
