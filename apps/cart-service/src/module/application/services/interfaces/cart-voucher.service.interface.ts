/**
 * ICartVoucherService — contract
 * @module cart-service/application/services/interfaces
 */
import type {
  ApplyVoucherRequestDTO,
  RemoveVoucherRequestDTO,
} from '../../dtos/requests/voucher/index.js';
import type {
  VoucherResponseDTO,
  VoucherPublicResponseDTO,
  VoucherValidationResponseDTO,
} from '../../dtos/responses/voucher-response.dto.js';
import type { CartActionResponseDTO } from '../../dtos/responses/cart-response.dto.js';

// ─── DI Token ──────────────────────────────
export const CART_VOUCHER_SERVICE = Symbol('CART_VOUCHER_SERVICE');

// ─── Contract ─────────────────────────────
export interface ICartVoucherService {
  apply(
    dto: ApplyVoucherRequestDTO,
    actorId?: string,
  ): Promise<VoucherResponseDTO>;

  remove(
    dto: RemoveVoucherRequestDTO,
    actorId?: string,
  ): Promise<CartActionResponseDTO>;

  validate(
    cartId: string,
    code: string,
  ): Promise<VoucherValidationResponseDTO>;

  getByCartId(cartId: string): Promise<readonly VoucherResponseDTO[]>;
  getPublicByCartId(cartId: string): Promise<VoucherPublicResponseDTO | null>;
}
