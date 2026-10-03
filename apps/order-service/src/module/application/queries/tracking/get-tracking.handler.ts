import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetTrackingQuery } from './get-tracking.query.js';
import { ORDER_TRACKING_SERVICE, type IOrderTrackingService } from '../../services/interfaces/order-tracking.service.interface.js';
import type { TrackingResponseDTO } from '../../dtos/responses/tracking-response.dto.js';

@QueryHandler(GetTrackingQuery)
export class GetTrackingHandler implements IQueryHandler<GetTrackingQuery, TrackingResponseDTO> {
  constructor(@Inject(ORDER_TRACKING_SERVICE) private readonly service: IOrderTrackingService) {}
  async execute(q: GetTrackingQuery): Promise<TrackingResponseDTO> {
    return this.service.getById(q.trackingId);
  }
}
