import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetTrackingByNumberQuery } from './get-tracking-by-number.query.js';
import { TRACKING_SERVICE, type ITrackingService } from '../../services/interfaces/tracking.service.interface.js';
import type { TrackingResponseDTO } from '../../dtos/responses/tracking/tracking-response.dto.js';
@QueryHandler(GetTrackingByNumberQuery)
export class GetTrackingByNumberHandler implements IQueryHandler<GetTrackingByNumberQuery, TrackingResponseDTO> {
  constructor(@Inject(TRACKING_SERVICE) private readonly service: ITrackingService) {}
  async execute(q: GetTrackingByNumberQuery): Promise<TrackingResponseDTO> { return this.service.getByTrackingNumber(q.trackingNumber); }
}
