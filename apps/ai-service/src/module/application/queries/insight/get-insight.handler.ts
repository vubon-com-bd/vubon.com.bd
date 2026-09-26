import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetInsightQuery } from './get-insight.query';
import type { InsightRepository } from '../../../domain/repositories/insight.repository.interface';
import { InsightIdVO } from '../../../domain/value-objects/primitives/insight-id.vo';
import type { InsightResponseDTO } from '../../dtos/responses/insight-response.dto';

@QueryHandler(GetInsightQuery)
export class GetInsightHandler
  extends BaseQueryHandler<GetInsightQuery, InsightResponseDTO | null>
  implements IQueryHandler<GetInsightQuery>
{
  readonly queryType = 'ai.insight.get';
  constructor(private readonly insightRepo: InsightRepository) { super(); }

  async execute(query: GetInsightQuery): Promise<InsightResponseDTO | null> {
    const entity = await this.insightRepo.findById(InsightIdVO.create(query.insightId));
    if (!entity) return null;
    return {
      id: entity.id.value,
      type: entity.type,
      priority: entity.priority,
      status: entity.status.value,
      target: entity.target,
      summary: entity.result.summary,
      confidence: entity.result.confidence.value,
      createdAt: entity.createdAt,
    } as unknown as InsightResponseDTO;
  }
}
