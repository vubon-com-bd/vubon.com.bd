import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetOrderByNumberQuery } from './get-order-by-number.query';
import type { OrderServiceInterface } from '../../services/interfaces/order.service.interface';
import type { OrderDetailResponseDTO } from '../../dtos/responses/order-detail-response.dto';
import { OrderNotFoundAppError } from '../../errors/order.errors';

@QueryHandler(GetOrderByNumberQuery)
export class GetOrderByNumberHandler
  extends BaseQueryHandler<GetOrderByNumberQuery, OrderDetailResponseDTO>
  implements IQueryHandler<GetOrderByNumberQuery>
{
  readonly queryType = 'order.get-by-number';

  constructor(private readonly orderService: OrderServiceInterface) {
    super();
  }

  async execute(query: GetOrderByNumberQuery): Promise<OrderDetailResponseDTO> {
    const order = await this.orderService.findByNumber(query.orderNumber);
    if (!order) throw new OrderNotFoundAppError(query.orderNumber);
    return order;
  }
}
