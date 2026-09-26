import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListOrdersByCustomerQuery } from './list-orders-by-customer.query';
import type { OrderServiceInterface } from '../../services/interfaces/order.service.interface';
import type { OrderResponseDTO } from '../../dtos/responses/order-response.dto';

@QueryHandler(ListOrdersByCustomerQuery)
export class ListOrdersByCustomerHandler
  extends BaseQueryHandler<ListOrdersByCustomerQuery, readonly OrderResponseDTO[]>
  implements IQueryHandler<ListOrdersByCustomerQuery>
{
  readonly queryType = 'order.list-by-customer';

  constructor(private readonly orderService: OrderServiceInterface) {
    super();
  }

  async execute(query: ListOrdersByCustomerQuery): Promise<readonly OrderResponseDTO[]> {
    return this.orderService.listByCustomer(query.customerId);
  }
}
