import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetOrderStatsQuery } from './get-order-stats.query';
import type { OrderServiceInterface } from '../../services/interfaces/order.service.interface';
import type { OrderStatsResponseDTO } from '../../dtos/responses/order-stats-response.dto';

@QueryHandler(GetOrderStatsQuery)
export class GetOrderStatsHandler
  extends BaseQueryHandler<GetOrderStatsQuery, OrderStatsResponseDTO>
  implements IQueryHandler<GetOrderStatsQuery>
{
  readonly queryType = 'order.stats';

  constructor(private readonly orderService: OrderServiceInterface) {
    super();
  }

  async execute(_query: GetOrderStatsQuery): Promise<OrderStatsResponseDTO> {
    return this.orderService.getStats();
  }
}
