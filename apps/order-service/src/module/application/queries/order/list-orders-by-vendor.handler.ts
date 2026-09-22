import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListOrdersByVendorQuery } from './list-orders-by-vendor.query';
import type { OrderServiceInterface } from '../../services/interfaces/order.service.interface';
import type { OrderResponseDTO } from '../../dtos/responses/order-response.dto';

@QueryHandler(ListOrdersByVendorQuery)
export class ListOrdersByVendorHandler
  extends BaseQueryHandler<ListOrdersByVendorQuery, readonly OrderResponseDTO[]>
  implements IQueryHandler<ListOrdersByVendorQuery>
{
  readonly queryType = 'order.list-by-vendor';

  constructor(private readonly orderService: OrderServiceInterface) {
    super();
  }

  async execute(query: ListOrdersByVendorQuery): Promise<readonly OrderResponseDTO[]> {
    return this.orderService.listByVendor(query.vendorId);
  }
}
