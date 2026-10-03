import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetCartSummaryQuery } from './get-cart-summary.query.js';
import { CART_SERVICE, type ICartService } from '../../services/interfaces/cart.service.interface.js';
import type { CartSummaryResponseDTO } from '../../dtos/responses/cart-summary-response.dto.js';

@QueryHandler(GetCartSummaryQuery)
export class GetCartSummaryHandler implements IQueryHandler<GetCartSummaryQuery, CartSummaryResponseDTO> {
  constructor(@Inject(CART_SERVICE) private readonly service: ICartService) {}
  async execute(q: GetCartSummaryQuery): Promise<CartSummaryResponseDTO> {
    return this.service.getSummary(q.cartId);
  }
}
