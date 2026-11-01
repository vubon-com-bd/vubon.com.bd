import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetTrackingQuery } from './get-tracking.query.js';
import { TRACKING_SERVICE, type ITrackingService } from '@application/services/interfaces/tracking.service.interface';
import type { TrackingResponseDTO } from '@application/dtos/responses/tracking/index.js';

@QueryHandler(GetTrackingQuery)
export class GetTrackingHandler implements IQueryHandler<GetTrackingQuery, TrackingResponseDTO> {
  constructor(@Inject(TRACKING_SERVICE) private readonly service: ITrackingService) {}
  async execute(q: GetTrackingQuery): Promise<TrackingResponseDTO> {
    return this.service.getById(q.trackingId);
  }
}
