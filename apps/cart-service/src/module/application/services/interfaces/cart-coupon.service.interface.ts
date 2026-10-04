import type { ApplyCouponRequestDTO } from '../../dtos/requests/coupon/apply-coupon.dto.js';
import type { RemoveCouponRequestDTO } from '../../dtos/requests/coupon/remove-coupon.dto.js';
import type { ValidateCouponRequestDTO } from '../../dtos/requests/coupon/validate-coupon.dto.js';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto.js';
import type { CouponValidationResponseDTO } from '../../dtos/responses/coupon-response.dto.js';

export const CART_COUPON_SERVICE = Symbol('CART_COUPON_SERVICE');

export interface ICartCouponService {
  apply(dto: ApplyCouponRequestDTO): Promise<CartResponseDTO>;
  remove(dto: RemoveCouponRequestDTO): Promise<CartResponseDTO>;
  validate(dto: ValidateCouponRequestDTO): Promise<CouponValidationResponseDTO>;
}
