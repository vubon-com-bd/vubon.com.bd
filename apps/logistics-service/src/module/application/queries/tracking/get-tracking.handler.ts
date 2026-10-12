import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetTrackingQuery } from './get-tracking.query.js';
import { TRACKING_SERVICE, type ITrackingService } from '../../services/interfaces/tracking.service.interface.js';
import type { TrackingResponseDTO } from '../../dtos/responses/tracking/tracking-response.dto.js';
@QueryHandler(GetTrackingQuery)
export class GetTrackingHandler implements IQueryHandler<GetTrackingQuery, TrackingResponseDTO> {
  constructor(@Inject(TRACKING_SERVICE) private readonly service: ITrackingService) {}
  async execute(q: GetTrackingQuery): Promise<TrackingResponseDTO> { return this.service.getById(q.trackingId); }
}
