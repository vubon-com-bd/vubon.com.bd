import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListOrdersQuery } from './list-orders.query';
import type { OrderServiceInterface } from '../../services/interfaces/order.service.interface';
import type { OrderListResponseDTO } from '../../dtos/responses/order-list-response.dto';

@QueryHandler(ListOrdersQuery)
export class ListOrdersHandler
  extends BaseQueryHandler<ListOrdersQuery, OrderListResponseDTO>
  implements IQueryHandler<ListOrdersQuery>
{
  readonly queryType = 'order.list';

  constructor(private readonly orderService: OrderServiceInterface) {
    super();
  }

  async execute(query: ListOrdersQuery): Promise<OrderListResponseDTO> {
    return this.orderService.list(query.page, query.limit);
  }
}
