import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetKpiResultsQuery } from './get-kpi-results.query';
import type { KpiResultRepository } from '../../../domain/repositories/kpi-result.repository.interface';
import { KpiIdVO } from '../../../domain/value-objects/primitives/kpi-id.vo';
import type { KpiResultResponseDTO } from '../../dtos/responses';

@QueryHandler(GetKpiResultsQuery)
export class GetKpiResultsHandler
  extends BaseQueryHandler<GetKpiResultsQuery, readonly KpiResultResponseDTO[]>
  implements IQueryHandler<GetKpiResultsQuery>
{
  readonly queryType = 'analytics.kpi.get-results';

  constructor(private readonly kpiResultRepo: KpiResultRepository) {
    super();
  }

  async execute(query: GetKpiResultsQuery): Promise<readonly KpiResultResponseDTO[]> {
    const entities = await this.kpiResultRepo.findByKpiId(
      KpiIdVO.create(query.kpiId),
    );
    return entities.slice(0, query.limit).map((e) => ({
      kpiId: e.kpiId.value,
      actual: e.actual,
      target: e.target,
      achievementPercent: e.achievementPercent,
      variance: e.variance,
      isAchieved: e.isAchieved,
      isBreached: e.status === 'failed',
      status: e.status,
      evaluatedAt: e.evaluatedAt.toISOString(),
    }));
  }
}
