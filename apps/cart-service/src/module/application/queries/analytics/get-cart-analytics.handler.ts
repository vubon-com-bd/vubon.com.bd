import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetCartAnalyticsQuery } from './get-cart-analytics.query';

export interface CartAnalyticsView {
  readonly totalCarts: number;
  readonly activeCarts: number;
  readonly avgItemsPerCart: number;
  readonly avgSubtotal: number;
}

@QueryHandler(GetCartAnalyticsQuery)
export class GetCartAnalyticsHandler
  extends BaseQueryHandler<GetCartAnalyticsQuery, CartAnalyticsView>
  implements IQueryHandler<GetCartAnalyticsQuery>
{
  readonly queryType = 'cart.analytics.get';

  async execute(_query: GetCartAnalyticsQuery): Promise<CartAnalyticsView> {
    return { totalCarts: 0, activeCarts: 0, avgItemsPerCart: 0, avgSubtotal: 0 };
  }
}
