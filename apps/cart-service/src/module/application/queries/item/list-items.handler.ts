import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListItemsQuery } from './list-items.query.js';
import { CART_ITEM_SERVICE, type ICartItemService } from '../../services/interfaces/cart-item.service.interface.js';
import type { CartItemStandaloneResponseDTO } from '../../dtos/responses/cart-item-response.dto.js';

@QueryHandler(ListItemsQuery)
export class ListItemsHandler implements IQueryHandler<ListItemsQuery, readonly CartItemStandaloneResponseDTO[]> {
  constructor(@Inject(CART_ITEM_SERVICE) private readonly service: ICartItemService) {}
  async execute(q: ListItemsQuery): Promise<readonly CartItemStandaloneResponseDTO[]> {
    return this.service.listItems(q.cartId);
  }
}
