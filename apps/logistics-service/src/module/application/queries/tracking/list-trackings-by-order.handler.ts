import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListTrackingsByOrderQuery } from './list-trackings-by-order.query.js';
import { TRACKING_SERVICE, type ITrackingService } from '@application/services/interfaces/tracking.service.interface';
import type { TrackingListResponseDTO } from '@application/dtos/responses/tracking/index.js';

@QueryHandler(ListTrackingsByOrderQuery)
export class ListTrackingsByOrderHandler implements IQueryHandler<ListTrackingsByOrderQuery, TrackingListResponseDTO> {
  constructor(@Inject(TRACKING_SERVICE) private readonly service: ITrackingService) {}
  async execute(q: ListTrackingsByOrderQuery): Promise<TrackingListResponseDTO> {
    return this.service.listByOrder(q.orderId);
  }
}
