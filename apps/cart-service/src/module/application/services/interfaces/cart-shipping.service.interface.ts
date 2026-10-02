import type { SetShippingMethodRequestDTO } from '../../dtos/requests/shipping/set-shipping-method.dto.js';
import type { CalculateShippingRequestDTO } from '../../dtos/requests/shipping/calculate-shipping.dto.js';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto.js';
import type { CartTotalsResponseDTO } from '../../dtos/responses/cart-totals-response.dto.js';

export const CART_SHIPPING_SERVICE = Symbol('CART_SHIPPING_SERVICE');

export interface ICartShippingService {
  setMethod(dto: SetShippingMethodRequestDTO): Promise<CartResponseDTO>;
  calculate(dto: CalculateShippingRequestDTO): Promise<CartTotalsResponseDTO>;
}
