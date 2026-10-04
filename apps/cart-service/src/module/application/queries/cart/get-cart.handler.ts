import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetCartQuery } from './get-cart.query.js';
import { CART_SERVICE, type ICartService } from '../../services/interfaces/cart.service.interface.js';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto.js';

@QueryHandler(GetCartQuery)
export class GetCartHandler implements IQueryHandler<GetCartQuery, CartResponseDTO> {
  constructor(@Inject(CART_SERVICE) private readonly service: ICartService) {}
  async execute(q: GetCartQuery): Promise<CartResponseDTO> {
    return this.service.getById(q.cartId);
  }
}
