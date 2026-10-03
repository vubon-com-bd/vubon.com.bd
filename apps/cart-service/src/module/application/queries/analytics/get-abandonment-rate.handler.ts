import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAbandonmentRateQuery } from './get-abandonment-rate.query.js';
import { ABANDONED_CART_SERVICE, type IAbandonedCartService } from '../../services/interfaces/abandoned-cart.service.interface.js';

export interface AbandonmentRateDTO {
  readonly rate: number;
  readonly recovered: number;
  readonly lost: number;
  readonly pending: number;
  readonly from?: string;
  readonly to?: string;
}

@QueryHandler(GetAbandonmentRateQuery)
export class GetAbandonmentRateHandler implements IQueryHandler<GetAbandonmentRateQuery, AbandonmentRateDTO> {
  constructor(@Inject(ABANDONED_CART_SERVICE) private readonly service: IAbandonedCartService) {}

  async execute(q: GetAbandonmentRateQuery): Promise<AbandonmentRateDTO> {
    const stats = await this.service.getStats(q.fromDate, q.toDate);
    return {
      rate: Math.round((1 - stats.recoveryRate) * 10000) / 100,
      recovered: stats.recovered,
      lost: stats.lost,
      pending: stats.pending,
      from: q.fromDate,
      to: q.toDate,
    };
  }
}
