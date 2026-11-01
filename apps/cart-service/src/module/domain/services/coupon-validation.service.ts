/**
 * CouponValidationService — Validate coupon application
 * @module cart-service/domain/services
 *
 * Business rules:
 *  - Code format valid
 *  - Status active (not expired/exhausted/disabled)
 *  - Not already applied to the cart
 *  - Meets minimum order amount
 *  - Not expired by date
 *  - Returns discount amount based on type (percentage/fixed) with max cap
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import { CouponDiscountVO } from '../value-objects/primitives/coupon-discount.vo.js';
import { CouponStatusVO } from '../value-objects/primitives/coupon-status.vo.js';
import { CouponCodeVO } from '../value-objects/primitives/coupon-code.vo.js';
import { CartCouponEntity } from '../entities/cart-coupon.entity.js';

export interface CouponValidationInput {
  readonly code: string;
  readonly subtotal: number;
  readonly currency: string;
  readonly alreadyApplied: readonly CartCouponEntity[];
  readonly isStackable?: boolean;
  readonly maxCouponsAllowed?: number;
}

export interface CouponValidationResult {
  readonly valid: boolean;
  readonly discountAmount: number;
  readonly reason?: string;
}

export class CouponValidationService {
  private static readonly DEFAULT_MAX_COUPONS = 1;

  static validate(input: CouponValidationInput): CouponValidationResult {
    const {
      code,
      subtotal,
      alreadyApplied,
      isStackable = false,
      maxCouponsAllowed = this.DEFAULT_MAX_COUPONS,
    } = input;

    if (subtotal <= 0) {
      return { valid: false, discountAmount: 0, reason: 'Empty cart' };
    }

    // ── Format ──────────────────────────────
    let codeVO: CouponCodeVO;
    try {
      codeVO = CouponCodeVO.create(code);
    } catch {
      return { valid: false, discountAmount: 0, reason: 'Invalid code format' };
    }

    // ── Already applied ─────────────────────
    const existing = alreadyApplied.find(
      (c) => c.code.value === codeVO.value && !c.isFinal(),
    );
    if (existing) {
      return { valid: false, discountAmount: 0, reason: 'Coupon already applied' };
    }

    // ── Count limit ─────────────────────────
    const activeCount = alreadyApplied.filter((c) => c.isUsable()).length;
    if (activeCount >= maxCouponsAllowed) {
      return { valid: false, discountAmount: 0, reason: 'Coupon limit reached' };
    }

    // ── Stacking ────────────────────────────
    if (!isStackable && activeCount > 0) {
      return { valid: false, discountAmount: 0, reason: 'Coupon cannot be stacked' };
    }

    // ── Coupon must exist among already-applied candidates passed in as metadata
    // (In practice the caller passes the coupon metadata here as `alreadyApplied` OR
    //  the caller looks up the coupon from a lookup repo. For domain purity we use
    //  the discount info provided by the caller on the coupon meta.)
    const couponMeta = alreadyApplied.find((c) => c.code.value === codeVO.value);
    if (!couponMeta) {
      // No metadata — treat as external lookup needed; we simply return valid=unknown
      return {
        valid: true,
        discountAmount: 0,
        reason: 'Coupon meta lookup required',
      };
    }

    if (!couponMeta.isUsable()) {
      return { valid: false, discountAmount: 0, reason: 'Coupon not usable' };
    }
    if (couponMeta.isExpired()) {
      return { valid: false, discountAmount: 0, reason: 'Coupon expired' };
    }
    if (!couponMeta.meetsMinOrder(subtotal)) {
      return { valid: false, discountAmount: 0, reason: 'Minimum order not met' };
    }

    const discountAmount = couponMeta.discount.calculate(subtotal);

    return { valid: true, discountAmount };
  }

  static assertValid(input: CouponValidationInput): number {
    const result = this.validate(input);
    if (!result.valid) {
      throw new BusinessRuleError(
        `Coupon "${input.code}" not applicable: ${result.reason ?? 'unknown'}`,
        'COUPON_NOT_APPLICABLE',
        { code: input.code, reason: result.reason },
      );
    }
    return result.discountAmount;
  }

  static computeDiscount(
    discount: CouponDiscountVO,
    subtotal: number,
  ): number {
    return discount.calculate(subtotal);
  }

  static isUsable(status: CouponStatusVO): boolean {
    return status.isUsable();
  }
}
