import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetDeliveryByOrderQuery } from './get-delivery-by-order.query';
import type { DeliveryServiceInterface } from '../../services/interfaces/delivery.service.interface';
import type { DeliveryResponseDTO } from '../../dtos/responses/delivery-response.dto';

@QueryHandler(GetDeliveryByOrderQuery)
export class GetDeliveryByOrderHandler
  extends BaseQueryHandler<GetDeliveryByOrderQuery, DeliveryResponseDTO | null>
  implements IQueryHandler<GetDeliveryByOrderQuery>
{
  readonly queryType = 'delivery.get-by-order';

  constructor(private readonly deliveryService: DeliveryServiceInterface) {
    super();
  }

  async execute(query: GetDeliveryByOrderQuery): Promise<DeliveryResponseDTO | null> {
    return this.deliveryService.findByOrder(query.orderId);
  }
}
