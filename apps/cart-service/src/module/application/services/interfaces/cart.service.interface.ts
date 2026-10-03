import type { CreateCartRequestDTO } from '../../dtos/requests/cart/create-cart.dto.js';
import type { UpdateCartRequestDTO } from '../../dtos/requests/cart/update-cart.dto.js';
import type { ClearCartRequestDTO } from '../../dtos/requests/cart/clear-cart.dto.js';
import type { DeleteCartRequestDTO } from '../../dtos/requests/cart/delete-cart.dto.js';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto.js';
import type { CartSummaryResponseDTO } from '../../dtos/responses/cart-summary-response.dto.js';
import type { CartTotalsResponseDTO } from '../../dtos/responses/cart-totals-response.dto.js';

export const CART_SERVICE = Symbol('CART_SERVICE');

export interface ICartService {
  create(dto: CreateCartRequestDTO, actorId?: string): Promise<CartResponseDTO>;
  update(dto: UpdateCartRequestDTO, cartId: string): Promise<CartResponseDTO>;
  clear(dto: ClearCartRequestDTO): Promise<CartResponseDTO>;
  delete(dto: DeleteCartRequestDTO): Promise<void>;
  getById(cartId: string): Promise<CartResponseDTO>;
  getByUserId(userId: string): Promise<CartResponseDTO | null>;
  getSummary(cartId: string): Promise<CartSummaryResponseDTO>;
  recalculateTotals(cartId: string): Promise<CartTotalsResponseDTO>;
}
