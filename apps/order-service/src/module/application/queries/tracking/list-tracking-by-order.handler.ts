import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListTrackingByOrderQuery } from './list-tracking-by-order.query';
import type { TrackingServiceInterface } from '../../services/interfaces/tracking.service.interface';
import type { TrackingResponseDTO } from '../../dtos/responses/tracking-response.dto';

@QueryHandler(ListTrackingByOrderQuery)
export class ListTrackingByOrderHandler
  extends BaseQueryHandler<ListTrackingByOrderQuery, readonly TrackingResponseDTO[]>
  implements IQueryHandler<ListTrackingByOrderQuery>
{
  readonly queryType = 'tracking.list-by-order';

  constructor(private readonly trackingService: TrackingServiceInterface) {
    super();
  }

  async execute(query: ListTrackingByOrderQuery): Promise<readonly TrackingResponseDTO[]> {
    return this.trackingService.findByOrder(query.orderId);
  }
}
