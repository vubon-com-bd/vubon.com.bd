import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetTrackingStatsQuery } from './get-tracking-stats.query.js';
import { TRACKING_SERVICE, type ITrackingService } from '@application/services/interfaces/tracking.service.interface';
import type { TrackingStatsResponseDTO } from '@application/dtos/responses/tracking/index.js';

@QueryHandler(GetTrackingStatsQuery)
export class GetTrackingStatsHandler implements IQueryHandler<GetTrackingStatsQuery, TrackingStatsResponseDTO> {
  constructor(@Inject(TRACKING_SERVICE) private readonly service: ITrackingService) {}
  async execute(): Promise<TrackingStatsResponseDTO> {
    return this.service.getStats();
  }
}
