import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetChannelPerformanceQuery } from './get-channel-performance.query.js';
import { ANALYTICS_SERVICE, type IAnalyticsService } from '../../services/interfaces/analytics.service.interface.js';
import type { ChannelPerformanceResponseDTO } from '../../dtos/responses/analytics-response.dto.js';

@QueryHandler(GetChannelPerformanceQuery)
export class GetChannelPerformanceHandler
  implements IQueryHandler<GetChannelPerformanceQuery, readonly ChannelPerformanceResponseDTO[]>
{
  constructor(@Inject(ANALYTICS_SERVICE) private readonly service: IAnalyticsService) {}

  async execute(q: GetChannelPerformanceQuery): Promise<readonly ChannelPerformanceResponseDTO[]> {
    return this.service.channelPerformance(q.fromDate, q.toDate);
  }
}
