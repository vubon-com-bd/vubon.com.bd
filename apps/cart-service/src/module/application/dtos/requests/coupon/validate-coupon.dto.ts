/**
 * ValidateCouponRequestDTO
 * @module cart-service/application/dtos/requests/coupon
 */
export interface ValidateCouponRequestDTO {
  readonly cartId: string;
  readonly code: string;
  readonly userId?: string;
}
