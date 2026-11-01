import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListTrackingsQuery } from './list-trackings.query.js';
import { TRACKING_SERVICE, type ITrackingService } from '@application/services/interfaces/tracking.service.interface';
import type { TrackingListResponseDTO } from '@application/dtos/responses/tracking/index.js';

@QueryHandler(ListTrackingsQuery)
export class ListTrackingsHandler implements IQueryHandler<ListTrackingsQuery, TrackingListResponseDTO> {
  constructor(@Inject(TRACKING_SERVICE) private readonly service: ITrackingService) {}
  async execute(q: ListTrackingsQuery): Promise<TrackingListResponseDTO> {
    return this.service.list(q.options);
  }
}
