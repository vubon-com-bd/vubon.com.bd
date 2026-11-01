/**
 * ICartTaxService — contract
 * @module cart-service/application/services/interfaces
 */
import type { CartTotalsResponseDTO } from '../../dtos/responses/cart-totals-response.dto.js';

// ─── DI Token ──────────────────────────────
export const CART_TAX_SERVICE = Symbol('CART_TAX_SERVICE');

// ─── Contract ─────────────────────────────
export interface ICartTaxService {
  /**
   * Calculate tax for a cart.
   * Does not persist — pure calculation.
   */
  calculate(
    cartId: string,
    taxRate?: number,
    taxInclusive?: boolean,
  ): Promise<CartTotalsResponseDTO>;

  /**
   * Recalculate and persist tax into cart.
   */
  recalculate(
    cartId: string,
    taxRate?: number,
    taxInclusive?: boolean,
    actorId?: string,
  ): Promise<CartTotalsResponseDTO>;
}
