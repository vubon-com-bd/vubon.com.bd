import type { ApplyVoucherRequestDTO } from '../../dtos/requests/voucher/apply-voucher.dto.js';
import type { RemoveVoucherRequestDTO } from '../../dtos/requests/voucher/remove-voucher.dto.js';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto.js';

export const CART_VOUCHER_SERVICE = Symbol('CART_VOUCHER_SERVICE');

export interface ICartVoucherService {
  apply(dto: ApplyVoucherRequestDTO): Promise<CartResponseDTO>;
  remove(dto: RemoveVoucherRequestDTO): Promise<CartResponseDTO>;
}
