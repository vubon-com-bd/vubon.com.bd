/**
 * RemoveCouponRequestDTO
 * @module cart-service/application/dtos/requests/coupon
 */
export interface RemoveCouponRequestDTO {
  readonly cartId: string;
  readonly code?: string;
  readonly reason?: string;
}
