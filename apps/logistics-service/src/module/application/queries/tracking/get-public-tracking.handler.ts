import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPublicTrackingQuery } from './get-public-tracking.query.js';
import { TRACKING_SERVICE, type ITrackingService } from '../../services/interfaces/tracking.service.interface.js';
import type { TrackingPublicResponseDTO } from '../../dtos/responses/tracking/tracking-response.dto.js';
@QueryHandler(GetPublicTrackingQuery)
export class GetPublicTrackingHandler implements IQueryHandler<GetPublicTrackingQuery, TrackingPublicResponseDTO> {
  constructor(@Inject(TRACKING_SERVICE) private readonly service: ITrackingService) {}
  async execute(q: GetPublicTrackingQuery): Promise<TrackingPublicResponseDTO> { return this.service.getPublicByTrackingNumber(q.trackingNumber); }
}
