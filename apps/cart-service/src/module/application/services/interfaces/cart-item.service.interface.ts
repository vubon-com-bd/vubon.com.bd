import type { AddItemRequestDTO } from '../../dtos/requests/item/add-item.dto.js';
import type { UpdateItemRequestDTO } from '../../dtos/requests/item/update-item.dto.js';
import type { RemoveItemRequestDTO } from '../../dtos/requests/item/remove-item.dto.js';
import type { UpdateQuantityRequestDTO } from '../../dtos/requests/item/update-quantity.dto.js';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto.js';
import type { CartItemStandaloneResponseDTO } from '../../dtos/responses/cart-item-response.dto.js';

export const CART_ITEM_SERVICE = Symbol('CART_ITEM_SERVICE');

export interface ICartItemService {
  add(dto: AddItemRequestDTO): Promise<CartResponseDTO>;
  update(dto: UpdateItemRequestDTO): Promise<CartResponseDTO>;
  remove(dto: RemoveItemRequestDTO): Promise<CartResponseDTO>;
  updateQuantity(dto: UpdateQuantityRequestDTO): Promise<CartResponseDTO>;
  getItem(cartId: string, itemId: string): Promise<CartItemStandaloneResponseDTO>;
  listItems(cartId: string): Promise<readonly CartItemStandaloneResponseDTO[]>;
}
