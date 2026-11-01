import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetCartAnalyticsQuery } from './get-cart-analytics.query.js';
import {
  CART_SERVICE,
  type ICartService,
} from '../../services/interfaces/cart.service.interface.js';
import type { CartStatsResponseDTO } from '../../dtos/responses/cart-response.dto.js';

@QueryHandler(GetCartAnalyticsQuery)
export class GetCartAnalyticsHandler
  implements IQueryHandler<GetCartAnalyticsQuery, CartStatsResponseDTO>
{
  constructor(
    @Inject(CART_SERVICE)
    private readonly service: ICartService,
  ) {}

  async execute(q: GetCartAnalyticsQuery): Promise<CartStatsResponseDTO> {
    return this.service.getStats(q.filter);
  }
}
