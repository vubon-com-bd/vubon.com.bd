import { COUPON_LIMIT } from '@vubon/shared-constants/cart';
import type { CouponDiscountVO } from '../value-objects/primitives/coupon-discount.vo';

export class CouponValidationService {
  validateDiscount(discount: CouponDiscountVO, subtotal: number): void {
    if (discount.discount > subtotal) {
      throw new Error('Coupon discount exceeds subtotal');
    }
    void COUPON_LIMIT;
  }

  validateCodeFormat(code: string): boolean {
    return /^[A-Z0-9-]{4,32}$/.test(code);
  }
}
