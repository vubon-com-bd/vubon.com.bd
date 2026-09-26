import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetMarketingAnalyticsQuery } from './get-marketing-analytics.query';
import type { MarketingAnalyticsServiceInterface } from '../../services/interfaces/marketing-analytics.service.interface';
import type { MarketingAnalyticsResponseDTO } from '../../dtos/responses/marketing-analytics-response.dto';

@QueryHandler(GetMarketingAnalyticsQuery)
export class GetMarketingAnalyticsHandler
  extends BaseQueryHandler<GetMarketingAnalyticsQuery, readonly MarketingAnalyticsResponseDTO[]>
  implements IQueryHandler<GetMarketingAnalyticsQuery>
{
  readonly queryType = 'marketing.analytics.get';

  constructor(private readonly service: MarketingAnalyticsServiceInterface) {
    super();
  }

  async execute(query: GetMarketingAnalyticsQuery): Promise<readonly MarketingAnalyticsResponseDTO[]> {
    return this.service.findByMetric(query.metric);
  }
}
