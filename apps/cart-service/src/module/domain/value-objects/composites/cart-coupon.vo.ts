/**
 * CartCouponVO — Composite Value Object
 * @module cart-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CouponCodeVO } from '../primitives/coupon-code.vo.js';
import { CouponDiscountVO } from '../primitives/coupon-discount.vo.js';
import { CouponStatusVO } from '../primitives/coupon-status.vo.js';

export interface CartCouponVOProps {
  readonly code: CouponCodeVO;
  readonly status: CouponStatusVO;
  readonly discount: CouponDiscountVO;
  readonly minOrderAmount?: number;
  readonly appliedAt: string;
  readonly expiresAt: string;
}

export class CartCouponVO extends BaseVO<CartCouponVOProps> {
  private constructor(props: CartCouponVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: CartCouponVOProps): CartCouponVO {
    const vo = new CartCouponVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: CartCouponVOProps): CartCouponVO {
    return new CartCouponVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.minOrderAmount !== undefined && v.minOrderAmount < 0) {
      throw new ValidationError('minOrderAmount must be non-negative', 'minOrderAmount');
    }
  }

  get code(): CouponCodeVO { return this.value.code; }
  get status(): CouponStatusVO { return this.value.status; }
  get discount(): CouponDiscountVO { return this.value.discount; }
  get minOrderAmount(): number | undefined { return this.value.minOrderAmount; }
  get appliedAt(): string { return this.value.appliedAt; }
  get expiresAt(): string { return this.value.expiresAt; }

  isUsable(): boolean { return this.status.isUsable(); }
  isExpired(at: Date = new Date()): boolean {
    return new Date(this.value.expiresAt).getTime() < at.getTime();
  }
  meetsMinOrder(subtotal: number): boolean {
    if (this.value.minOrderAmount === undefined) return true;
    return subtotal >= this.value.minOrderAmount;
  }
}
