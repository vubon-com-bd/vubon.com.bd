import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListInsightsQuery } from './list-insights.query';
import type { InsightRepository } from '../../../domain/repositories/insight.repository.interface';
import type { InsightResponseDTO } from '../../dtos/responses/insight-response.dto';

@QueryHandler(ListInsightsQuery)
export class ListInsightsHandler
  extends BaseQueryHandler<ListInsightsQuery, readonly InsightResponseDTO[]>
  implements IQueryHandler<ListInsightsQuery>
{
  readonly queryType = 'ai.insight.list';

  constructor(private readonly insightRepo: InsightRepository) {
    super();
  }

  async execute(query: ListInsightsQuery): Promise<readonly InsightResponseDTO[]> {
    let entities = await this.insightRepo.findActive();
    if (query.insightType) entities = entities.filter((e) => e.type === query.insightType);
    if (query.priority) entities = entities.filter((e) => e.priority === query.priority);
    return entities.map((e) => ({
      id: e.id.value,
      type: e.type,
      priority: e.priority,
      status: e.status.value,
      target: e.target,
      summary: e.result.summary,
      confidence: e.result.confidence.value,
      createdAt: e.createdAt,
    } as unknown as InsightResponseDTO));
  }
}
