/**
 * ICartCouponService — contract
 * @module cart-service/application/services/interfaces
 */
import type {
  ApplyCouponRequestDTO,
  RemoveCouponRequestDTO,
  ValidateCouponRequestDTO,
} from '../../dtos/requests/coupon/index.js';
import type {
  CouponResponseDTO,
  CouponPublicResponseDTO,
  CouponValidationResponseDTO,
} from '../../dtos/responses/coupon-response.dto.js';
import type { CartActionResponseDTO } from '../../dtos/responses/cart-response.dto.js';

// ─── DI Token ──────────────────────────────
export const CART_COUPON_SERVICE = Symbol('CART_COUPON_SERVICE');

// ─── Contract ─────────────────────────────
export interface ICartCouponService {
  // Commands
  apply(
    dto: ApplyCouponRequestDTO,
    actorId?: string,
  ): Promise<CouponResponseDTO>;

  remove(
    dto: RemoveCouponRequestDTO,
    actorId?: string,
  ): Promise<CartActionResponseDTO>;

  validate(
    dto: ValidateCouponRequestDTO,
  ): Promise<CouponValidationResponseDTO>;

  // Queries
  getByCartId(cartId: string): Promise<readonly CouponResponseDTO[]>;
  getPublicByCartId(cartId: string): Promise<CouponPublicResponseDTO | null>;
}
