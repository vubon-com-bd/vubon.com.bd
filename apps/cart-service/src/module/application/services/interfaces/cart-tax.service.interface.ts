import type { CartTotalsResponseDTO } from '../../dtos/responses/cart-totals-response.dto.js';

export const CART_TAX_SERVICE = Symbol('CART_TAX_SERVICE');

export interface ICartTaxService {
  calculate(cartId: string, taxRate?: number, inclusive?: boolean): Promise<CartTotalsResponseDTO>;
  getForCart(cartId: string): Promise<CartTotalsResponseDTO>;
}
