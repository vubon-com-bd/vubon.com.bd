import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAbandonedStatsQuery } from './get-abandoned-stats.query.js';
import {
  ABANDONED_CART_SERVICE,
  type IAbandonedCartService,
} from '../../services/interfaces/abandoned-cart.service.interface.js';
import type { AbandonedCartStatsResponseDTO } from '../../dtos/responses/abandoned-cart-response.dto.js';

@QueryHandler(GetAbandonedStatsQuery)
export class GetAbandonedStatsHandler
  implements IQueryHandler<GetAbandonedStatsQuery, AbandonedCartStatsResponseDTO>
{
  constructor(
    @Inject(ABANDONED_CART_SERVICE)
    private readonly service: IAbandonedCartService,
  ) {}

  async execute(q: GetAbandonedStatsQuery): Promise<AbandonedCartStatsResponseDTO> {
    return this.service.getStats(q.filter);
  }
}
