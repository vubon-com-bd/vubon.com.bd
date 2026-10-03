/**
 * VoucherResponseDTO
 * @module cart-service/application/dtos/responses
 */
export interface VoucherResponseDTO {
  readonly cartId: string;
  readonly code: string;
  readonly status: string;
  readonly amount: number;
  readonly remainingAmount: number;
  readonly currency: string;
  readonly expiresAt: string;
  readonly appliedAt: string;
}
