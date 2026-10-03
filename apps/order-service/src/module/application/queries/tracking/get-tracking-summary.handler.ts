import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetTrackingSummaryQuery } from './get-tracking-summary.query.js';
import { ORDER_TRACKING_SERVICE, type IOrderTrackingService } from '../../services/interfaces/order-tracking.service.interface.js';
import type { TrackingSummaryResponseDTO } from '../../dtos/responses/tracking-response.dto.js';

@QueryHandler(GetTrackingSummaryQuery)
export class GetTrackingSummaryHandler implements IQueryHandler<GetTrackingSummaryQuery, TrackingSummaryResponseDTO> {
  constructor(@Inject(ORDER_TRACKING_SERVICE) private readonly service: IOrderTrackingService) {}
  async execute(q: GetTrackingSummaryQuery): Promise<TrackingSummaryResponseDTO> {
    return this.service.getSummary(q.orderId);
  }
}
