import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetCartByUserQuery } from './get-cart-by-user.query.js';
import { CART_SERVICE, type ICartService } from '../../services/interfaces/cart.service.interface.js';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto.js';

@QueryHandler(GetCartByUserQuery)
export class GetCartByUserHandler implements IQueryHandler<GetCartByUserQuery, CartResponseDTO | null> {
  constructor(@Inject(CART_SERVICE) private readonly service: ICartService) {}
  async execute(q: GetCartByUserQuery): Promise<CartResponseDTO | null> {
    return this.service.getByUserId(q.userId);
  }
}
