/**
 * ApplyVoucherRequestDTO
 * @module cart-service/application/dtos/requests/voucher
 */
export interface ApplyVoucherRequestDTO {
  readonly cartId: string;
  readonly code: string;
  readonly userId?: string;
}
