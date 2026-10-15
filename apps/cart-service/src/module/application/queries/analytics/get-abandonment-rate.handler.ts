import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAbandonmentRateQuery } from './get-abandonment-rate.query.js';
import {
  ABANDONED_CART_SERVICE,
  type IAbandonedCartService,
} from '../../services/interfaces/abandoned-cart.service.interface.js';
import type { AbandonedCartStatsResponseDTO } from '../../dtos/responses/abandoned-cart-response.dto.js';

@QueryHandler(GetAbandonmentRateQuery)
export class GetAbandonmentRateHandler
  implements IQueryHandler<GetAbandonmentRateQuery, AbandonedCartStatsResponseDTO>
{
  constructor(
    @Inject(ABANDONED_CART_SERVICE)
    private readonly service: IAbandonedCartService,
  ) {}

  async execute(q: GetAbandonmentRateQuery): Promise<AbandonedCartStatsResponseDTO> {
    return this.service.getStats(q.filter);
  }
}
