/**
 * Cart Coupon Composite VO
 * @module cart-service/domain/value-objects/composites
 *
 * Business rules:
 * - Coupon must be active & within validity window
 * - Usage limits enforced
 * - Minimum order amount enforced
 * - Discount capped at maxDiscountAmount & subtotal
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { COUPON_DISCOUNT_TYPE } from '@vubon/shared-constants/business/cart';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CouponCodeVO } from '../primitives/coupon-code.vo.js';
import { CouponStatusVO } from '../primitives/coupon-status.vo.js';

export interface CartCouponProps {
  readonly code: CouponCodeVO;
  readonly status: CouponStatusVO;
  readonly discountType: string;
  readonly discountValue: number;
  readonly maxDiscountAmount?: number;
  readonly minOrderAmount?: number;
  readonly maxUses: number;
  readonly usedCount: number;
  readonly maxUsesPerUser: number;
  readonly userUsageCount: number;
  readonly validFrom: string;
  readonly validUntil: string;
  readonly stackable: boolean;
}

export class CartCouponCompositeVO extends BaseVO<CartCouponProps> {
  private constructor(props: CartCouponProps) {
    super(props);
  }

  static create(props: CartCouponProps): CartCouponCompositeVO {
    if (props.discountValue < 0) {
      throw new ValidationError('Discount value cannot be negative', 'discountValue');
    }
    if (props.maxDiscountAmount !== undefined && props.maxDiscountAmount < 0) {
      throw new ValidationError('maxDiscountAmount cannot be negative', 'maxDiscountAmount');
    }
    if (props.maxUses < 0 || props.usedCount < 0) {
      throw new ValidationError('Usage counts cannot be negative', 'usedCount');
    }
    return new CartCouponCompositeVO(props);
  }

  static reconstitute(props: CartCouponProps): CartCouponCompositeVO {
    return new CartCouponCompositeVO(props);
  }

  get code(): CouponCodeVO { return this.value.code; }
  get status(): CouponStatusVO { return this.value.status; }
  get discountType(): string { return this.value.discountType; }
  get discountValue(): number { return this.value.discountValue; }
  get maxDiscountAmount(): number | undefined { return this.value.maxDiscountAmount; }
  get minOrderAmount(): number | undefined { return this.value.minOrderAmount; }
  get maxUses(): number { return this.value.maxUses; }
  get usedCount(): number { return this.value.usedCount; }
  get maxUsesPerUser(): number { return this.value.maxUsesPerUser; }
  get userUsageCount(): number { return this.value.userUsageCount; }
  get validFrom(): string { return this.value.validFrom; }
  get validUntil(): string { return this.value.validUntil; }
  get stackable(): boolean { return this.value.stackable; }

  isPercentage(): boolean {
    return (
      this.value.discountType === COUPON_DISCOUNT_TYPE.CART_PERCENTAGE ||
      this.value.discountType === COUPON_DISCOUNT_TYPE.PRODUCT_PERCENTAGE
    );
  }

  isFixed(): boolean {
    return (
      this.value.discountType === COUPON_DISCOUNT_TYPE.CART_FIXED ||
      this.value.discountType === COUPON_DISCOUNT_TYPE.PRODUCT_FIXED
    );
  }

  isFreeShipping(): boolean {
    return this.value.discountType === COUPON_DISCOUNT_TYPE.SHIPPING_FREE;
  }

  // Validity queries (caller supplies "now" for testability)
  isWithinWindow(now: Date = new Date()): boolean {
    const t = now.getTime();
    return t >= Date.parse(this.value.validFrom) && t <= Date.parse(this.value.validUntil);
  }

  hasGlobalUsesLeft(): boolean {
    return this.value.usedCount < this.value.maxUses;
  }

  hasUserUsesLeft(): boolean {
    return this.value.userUsageCount < this.value.maxUsesPerUser;
  }

  meetsMinOrder(subtotal: number): boolean {
    if (this.value.minOrderAmount === undefined) return true;
    return subtotal >= this.value.minOrderAmount;
  }

  /**
   * Compute discount amount for a given subtotal.
   * Returns 0 if not applicable. Respects maxDiscountAmount and subtotal cap.
   */
  computeDiscount(subtotal: number): number {
    if (subtotal <= 0) return 0;
    if (!this.isWithinWindow()) return 0;
    if (!this.value.status.isUsable()) return 0;
    if (!this.hasGlobalUsesLeft() || !this.hasUserUsesLeft()) return 0;
    if (!this.meetsMinOrder(subtotal)) return 0;

    let discount = 0;
    if (this.isPercentage()) {
      discount = (subtotal * this.value.discountValue) / 100;
    } else if (this.isFixed()) {
      discount = this.value.discountValue;
    } else if (this.isFreeShipping()) {
      // Handled by shipping composite; here discount is 0
      return 0;
    }

    if (this.value.maxDiscountAmount !== undefined) {
      discount = Math.min(discount, this.value.maxDiscountAmount);
    }
    discount = Math.min(discount, subtotal);
    return this.round(discount);
  }

  private round(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
