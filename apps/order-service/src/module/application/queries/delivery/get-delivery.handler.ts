import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetDeliveryQuery } from './get-delivery.query';
import type { DeliveryServiceInterface } from '../../services/interfaces/delivery.service.interface';
import type { DeliveryResponseDTO } from '../../dtos/responses/delivery-response.dto';

@QueryHandler(GetDeliveryQuery)
export class GetDeliveryHandler
  extends BaseQueryHandler<GetDeliveryQuery, DeliveryResponseDTO | null>
  implements IQueryHandler<GetDeliveryQuery>
{
  readonly queryType = 'delivery.get';

  constructor(private readonly deliveryService: DeliveryServiceInterface) {
    super();
  }

  async execute(query: GetDeliveryQuery): Promise<DeliveryResponseDTO | null> {
    void query;
    void this.deliveryService;
    return null;
  }
}
