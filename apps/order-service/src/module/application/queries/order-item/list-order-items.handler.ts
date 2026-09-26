import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListOrderItemsQuery } from './list-order-items.query';
import type { OrderItemServiceInterface } from '../../services/interfaces/order-item.service.interface';
import type { OrderItemResponseDTO } from '../../dtos/responses/order-item-response.dto';

@QueryHandler(ListOrderItemsQuery)
export class ListOrderItemsHandler
  extends BaseQueryHandler<ListOrderItemsQuery, readonly OrderItemResponseDTO[]>
  implements IQueryHandler<ListOrderItemsQuery>
{
  readonly queryType = 'order.item.list';

  constructor(private readonly itemService: OrderItemServiceInterface) {
    super();
  }

  async execute(query: ListOrderItemsQuery): Promise<readonly OrderItemResponseDTO[]> {
    return this.itemService.listByOrder(query.orderId);
  }
}
