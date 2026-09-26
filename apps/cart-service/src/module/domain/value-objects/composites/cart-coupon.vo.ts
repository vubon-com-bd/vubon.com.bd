import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { CouponCodeVO } from '../primitives/coupon-code.vo';
import { CouponDiscountVO } from '../primitives/coupon-discount.vo';
import { CouponStatusVO } from '../primitives/coupon-status.vo';
import { CouponTypeVO } from '../primitives/coupon-type.vo';
import { CouponDiscountTypeVO } from '../primitives/coupon-discount-type.vo';

export interface CartCouponVOProps {
  readonly code: CouponCodeVO;
  readonly discount: CouponDiscountVO;
  readonly status: CouponStatusVO;
  readonly type: CouponTypeVO;
  readonly discountType: CouponDiscountTypeVO;
  readonly appliedAt: Date;
}

export class CartCouponVO extends BaseVO<CartCouponVOProps> {
  private constructor(props: CartCouponVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: CartCouponVOProps): CartCouponVO {
    return new CartCouponVO(props);
  }

  get code(): CouponCodeVO { return this.value.code; }
  get discount(): CouponDiscountVO { return this.value.discount; }
  get status(): CouponStatusVO { return this.value.status; }
  get type(): CouponTypeVO { return this.value.type; }
  get discountType(): CouponDiscountTypeVO { return this.value.discountType; }
  get appliedAt(): Date { return this.value.appliedAt; }
}
