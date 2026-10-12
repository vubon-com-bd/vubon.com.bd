import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListTrackingQuery } from './list-tracking.query.js';
import { TRACKING_SERVICE, type ITrackingService } from '../../services/interfaces/tracking.service.interface.js';
import type { TrackingListResponseDTO } from '../../dtos/responses/tracking/tracking-response.dto.js';
@QueryHandler(ListTrackingQuery)
export class ListTrackingHandler implements IQueryHandler<ListTrackingQuery, TrackingListResponseDTO> {
  constructor(@Inject(TRACKING_SERVICE) private readonly service: ITrackingService) {}
  async execute(q: ListTrackingQuery): Promise<TrackingListResponseDTO> { return this.service.list(q.options); }
}
