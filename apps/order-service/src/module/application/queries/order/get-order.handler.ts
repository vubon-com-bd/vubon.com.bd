import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetOrderQuery } from './get-order.query';
import type { OrderServiceInterface } from '../../services/interfaces/order.service.interface';
import type { OrderDetailResponseDTO } from '../../dtos/responses/order-detail-response.dto';
import { OrderNotFoundAppError } from '../../errors/order.errors';

@QueryHandler(GetOrderQuery)
export class GetOrderHandler
  extends BaseQueryHandler<GetOrderQuery, OrderDetailResponseDTO>
  implements IQueryHandler<GetOrderQuery>
{
  readonly queryType = 'order.get';

  constructor(private readonly orderService: OrderServiceInterface) {
    super();
  }

  async execute(query: GetOrderQuery): Promise<OrderDetailResponseDTO> {
    const order = await this.orderService.findById(query.orderId);
    if (!order) throw new OrderNotFoundAppError(query.orderId);
    return order;
  }
}
