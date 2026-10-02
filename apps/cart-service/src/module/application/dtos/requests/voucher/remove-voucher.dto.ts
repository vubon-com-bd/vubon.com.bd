/**
 * RemoveVoucherRequestDTO
 * @module cart-service/application/dtos/requests/voucher
 */
export interface RemoveVoucherRequestDTO {
  readonly cartId: string;
  readonly code?: string;
  readonly reason?: string;
}
