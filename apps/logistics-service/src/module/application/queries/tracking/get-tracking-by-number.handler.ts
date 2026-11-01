import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetTrackingByNumberQuery } from './get-tracking-by-number.query.js';
import { TRACKING_SERVICE, type ITrackingService } from '@application/services/interfaces/tracking.service.interface';
import type { TrackingPublicResponseDTO } from '@application/dtos/responses/tracking/index.js';

@QueryHandler(GetTrackingByNumberQuery)
export class GetTrackingByNumberHandler implements IQueryHandler<GetTrackingByNumberQuery, TrackingPublicResponseDTO> {
  constructor(@Inject(TRACKING_SERVICE) private readonly service: ITrackingService) {}
  async execute(q: GetTrackingByNumberQuery): Promise<TrackingPublicResponseDTO> {
    return this.service.getByNumber(q.trackingNumber);
  }
}
