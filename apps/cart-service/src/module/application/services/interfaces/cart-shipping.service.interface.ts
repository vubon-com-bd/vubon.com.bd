/**
 * ICartShippingService — contract
 * @module cart-service/application/services/interfaces
 */
import type {
  SetShippingMethodRequestDTO,
  CalculateShippingRequestDTO,
} from '../../dtos/requests/shipping/index.js';
import type { CartTotalsResponseDTO } from '../../dtos/responses/cart-totals-response.dto.js';

// ─── DI Token ──────────────────────────────
export const CART_SHIPPING_SERVICE = Symbol('CART_SHIPPING_SERVICE');

// ─── Shipping calc response ────────────────
export interface ShippingCalculationResponseDTO {
  readonly cartId: string;
  readonly method: string;
  readonly cost: number;
  readonly currency: string;
  readonly isFree: boolean;
  readonly estimatedDays?: number;
}

// ─── Contract ─────────────────────────────
export interface ICartShippingService {
  setMethod(
    dto: SetShippingMethodRequestDTO,
    actorId?: string,
  ): Promise<CartTotalsResponseDTO>;

  calculate(
    dto: CalculateShippingRequestDTO,
  ): Promise<ShippingCalculationResponseDTO>;

  clear(
    cartId: string,
    actorId?: string,
  ): Promise<CartTotalsResponseDTO>;
}
