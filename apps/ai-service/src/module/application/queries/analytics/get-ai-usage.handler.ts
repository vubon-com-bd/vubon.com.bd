import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetAiUsageQuery } from './get-ai-usage.query';
import type { AiAnalyticsRepository } from '../../../domain/repositories/ai-analytics.repository.interface';

@QueryHandler(GetAiUsageQuery)
export class GetAiUsageHandler
  extends BaseQueryHandler<GetAiUsageQuery, { readonly totalCalls: number; readonly totalTokens: number; readonly totalCost: number }>
  implements IQueryHandler<GetAiUsageQuery>
{
  readonly queryType = 'ai.analytics.usage';
  constructor(private readonly analyticsRepo: AiAnalyticsRepository) { super(); }

  async execute(_query: GetAiUsageQuery): Promise<{ readonly totalCalls: number; readonly totalTokens: number; readonly totalCost: number }> {
    const all = await this.analyticsRepo.findAll();
    let totalTokens = 0;
    for (const entry of all) {
      for (const e of entry.report.entries) {
        if (e.metric.value === 'tokens') totalTokens += e.value;
      }
    }
    return { totalCalls: all.length, totalTokens, totalCost: totalTokens * 0.00002 };
  }
}
