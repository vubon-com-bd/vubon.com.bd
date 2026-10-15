import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListItemsQuery } from './list-items.query.js';
import {
  CART_ITEM_SERVICE,
  type ICartItemService,
  type CartItemListResponseDTO,
} from '../../services/interfaces/cart-item.service.interface.js';

@QueryHandler(ListItemsQuery)
export class ListItemsHandler
  implements IQueryHandler<ListItemsQuery, CartItemListResponseDTO>
{
  constructor(
    @Inject(CART_ITEM_SERVICE)
    private readonly service: ICartItemService,
  ) {}

  async execute(q: ListItemsQuery): Promise<CartItemListResponseDTO> {
    return this.service.list(q.options);
  }
}
