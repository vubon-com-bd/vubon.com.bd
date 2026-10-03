import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListTrackingEventsQuery } from './list-tracking-events.query.js';
import { ORDER_TRACKING_SERVICE, type IOrderTrackingService } from '../../services/interfaces/order-tracking.service.interface.js';
import type { TrackingResponseDTO } from '../../dtos/responses/tracking-response.dto.js';

@QueryHandler(ListTrackingEventsQuery)
export class ListTrackingEventsHandler implements IQueryHandler<ListTrackingEventsQuery, readonly TrackingResponseDTO[]> {
  constructor(@Inject(ORDER_TRACKING_SERVICE) private readonly service: IOrderTrackingService) {}
  async execute(q: ListTrackingEventsQuery): Promise<readonly TrackingResponseDTO[]> {
    return this.service.listByOrder(q.orderId);
  }
}
