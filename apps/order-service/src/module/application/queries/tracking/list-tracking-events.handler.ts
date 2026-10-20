/**
 * ListTrackingEventsHandler
 * @module order-service/application/queries/tracking
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListTrackingEventsQuery } from './list-tracking-events.query.js';
import {
  ORDER_TRACKING_SERVICE,
  type IOrderTrackingService,
} from '../../services/interfaces/order-tracking.service.interface.js';
import type { TrackingListResponseDTO } from '../../dtos/responses/tracking-response.dto.js';

@QueryHandler(ListTrackingEventsQuery)
export class ListTrackingEventsHandler
  implements IQueryHandler<ListTrackingEventsQuery, TrackingListResponseDTO>
{
  constructor(
    @Inject(ORDER_TRACKING_SERVICE)
    private readonly service: IOrderTrackingService,
  ) {}

  async execute(q: ListTrackingEventsQuery): Promise<TrackingListResponseDTO> {
    return this.service.listByOrder(q.orderId);
  }
}
