import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetModelPerformanceAnalyticsQuery } from './get-model-performance-analytics.query';
import type { AiAnalyticsRepository } from '../../../domain/repositories/ai-analytics.repository.interface';

@QueryHandler(GetModelPerformanceAnalyticsQuery)
export class GetModelPerformanceAnalyticsHandler
  extends BaseQueryHandler<GetModelPerformanceAnalyticsQuery, readonly { readonly metric: string; readonly value: number }[]>
  implements IQueryHandler<GetModelPerformanceAnalyticsQuery>
{
  readonly queryType = 'ai.analytics.model-performance';
  constructor(private readonly analyticsRepo: AiAnalyticsRepository) { super(); }

  async execute(query: GetModelPerformanceAnalyticsQuery): Promise<readonly { readonly metric: string; readonly value: number }[]> {
    const entries = await this.analyticsRepo.findByModelId(query.modelId);
    return entries.flatMap((e) =>
      e.report.entries.map((entry) => ({
        metric: entry.metric.value,
        value: entry.value,
      })),
    );
  }
}
