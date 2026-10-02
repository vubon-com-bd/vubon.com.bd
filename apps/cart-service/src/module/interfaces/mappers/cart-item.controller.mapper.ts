import type { CartItemStandaloneResponseDTO } from '../../application/dtos/responses/cart-item-response.dto.js';
import type { CartItemStandaloneHttpDTO } from '../dtos/responses/cart-item.response.dto.js';

export class CartItemControllerMapper {
  static toHttp(app: CartItemStandaloneResponseDTO): CartItemStandaloneHttpDTO {
    return { ...app };
  }
}
