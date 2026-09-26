import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetFulfillmentByOrderQuery } from './get-fulfillment-by-order.query';
import type { FulfillmentServiceInterface } from '../../services/interfaces/fulfillment.service.interface';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment-response.dto';

@QueryHandler(GetFulfillmentByOrderQuery)
export class GetFulfillmentByOrderHandler
  extends BaseQueryHandler<GetFulfillmentByOrderQuery, FulfillmentResponseDTO | null>
  implements IQueryHandler<GetFulfillmentByOrderQuery>
{
  readonly queryType = 'fulfillment.get-by-order';

  constructor(private readonly fulfillmentService: FulfillmentServiceInterface) {
    super();
  }

  async execute(query: GetFulfillmentByOrderQuery): Promise<FulfillmentResponseDTO | null> {
    return this.fulfillmentService.findByOrder(query.orderId);
  }
}
