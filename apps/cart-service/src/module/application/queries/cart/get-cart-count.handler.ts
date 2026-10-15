import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetCartCountQuery } from './get-cart-count.query.js';
import {
  CART_SERVICE,
  type ICartService,
} from '../../services/interfaces/cart.service.interface.js';
import type { CartCountResponseDTO } from '../../dtos/responses/cart-response.dto.js';

@QueryHandler(GetCartCountQuery)
export class GetCartCountHandler
  implements IQueryHandler<GetCartCountQuery, CartCountResponseDTO>
{
  constructor(
    @Inject(CART_SERVICE)
    private readonly service: ICartService,
  ) {}

  async execute(q: GetCartCountQuery): Promise<CartCountResponseDTO> {
    return this.service.count(q.userId ? { userId: q.userId } : undefined);
  }
}
