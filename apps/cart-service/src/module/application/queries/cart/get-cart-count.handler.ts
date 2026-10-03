import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetCartCountQuery } from './get-cart-count.query.js';
import { CART_SERVICE, type ICartService } from '../../services/interfaces/cart.service.interface.js';

@QueryHandler(GetCartCountQuery)
export class GetCartCountHandler implements IQueryHandler<GetCartCountQuery, number> {
  constructor(@Inject(CART_SERVICE) private readonly service: ICartService) {}
  async execute(q: GetCartCountQuery): Promise<number> {
    const cart = await this.service.getByUserId(q.userId);
    return cart?.itemCount ?? 0;
  }
}
