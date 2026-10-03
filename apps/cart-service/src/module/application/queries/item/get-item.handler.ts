import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetItemQuery } from './get-item.query.js';
import { CART_ITEM_SERVICE, type ICartItemService } from '../../services/interfaces/cart-item.service.interface.js';
import type { CartItemStandaloneResponseDTO } from '../../dtos/responses/cart-item-response.dto.js';

@QueryHandler(GetItemQuery)
export class GetItemHandler implements IQueryHandler<GetItemQuery, CartItemStandaloneResponseDTO> {
  constructor(@Inject(CART_ITEM_SERVICE) private readonly service: ICartItemService) {}
  async execute(q: GetItemQuery): Promise<CartItemStandaloneResponseDTO> {
    return this.service.getItem(q.cartId, q.itemId);
  }
}
