/**
 * CouponResponseDTO
 * @module cart-service/application/dtos/responses
 */
export interface CouponResponseDTO {
  readonly cartId: string;
  readonly code: string;
  readonly status: string;
  readonly discountAmount: number;
  readonly currency: string;
  readonly appliedAt: string;
}

export interface CouponValidationResponseDTO {
  readonly valid: boolean;
  readonly code: string;
  readonly discountAmount: number;
  readonly reason?: string;
  readonly errorCode?: string;
}
