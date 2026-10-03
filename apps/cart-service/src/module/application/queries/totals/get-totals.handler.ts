import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetTotalsQuery } from './get-totals.query.js';
import { CART_TAX_SERVICE, type ICartTaxService } from '../../services/interfaces/cart-tax.service.interface.js';
import type { CartTotalsResponseDTO } from '../../dtos/responses/cart-totals-response.dto.js';

@QueryHandler(GetTotalsQuery)
export class GetTotalsHandler implements IQueryHandler<GetTotalsQuery, CartTotalsResponseDTO> {
  constructor(@Inject(CART_TAX_SERVICE) private readonly service: ICartTaxService) {}
  async execute(q: GetTotalsQuery): Promise<CartTotalsResponseDTO> {
    return this.service.getForCart(q.cartId);
  }
}
