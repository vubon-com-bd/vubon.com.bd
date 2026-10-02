/**
 * ApplyCouponRequestDTO
 * @module cart-service/application/dtos/requests/coupon
 */
export interface ApplyCouponRequestDTO {
  readonly cartId: string;
  readonly code: string;
  readonly userId?: string;
}
