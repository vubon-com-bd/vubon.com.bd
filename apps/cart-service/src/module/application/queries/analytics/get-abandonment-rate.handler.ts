import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetAbandonmentRateQuery } from './get-abandonment-rate.query';

export interface AbandonmentRateView {
  readonly rate: number;
  readonly total: number;
  readonly abandoned: number;
}

@QueryHandler(GetAbandonmentRateQuery)
export class GetAbandonmentRateHandler
  extends BaseQueryHandler<GetAbandonmentRateQuery, AbandonmentRateView>
  implements IQueryHandler<GetAbandonmentRateQuery>
{
  readonly queryType = 'cart.analytics.abandonment-rate';

  async execute(_query: GetAbandonmentRateQuery): Promise<AbandonmentRateView> {
    return { rate: 0, total: 0, abandoned: 0 };
  }
}
