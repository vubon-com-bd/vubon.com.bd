import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetItemQuery } from './get-item.query.js';
import {
  CART_ITEM_SERVICE,
  type ICartItemService,
} from '../../services/interfaces/cart-item.service.interface.js';
import type { CartItemResponseDTO } from '../../dtos/responses/cart-item-response.dto.js';

@QueryHandler(GetItemQuery)
export class GetItemHandler
  implements IQueryHandler<GetItemQuery, CartItemResponseDTO>
{
  constructor(
    @Inject(CART_ITEM_SERVICE)
    private readonly service: ICartItemService,
  ) {}

  async execute(q: GetItemQuery): Promise<CartItemResponseDTO> {
    return this.service.getById(q.itemId);
  }
}
