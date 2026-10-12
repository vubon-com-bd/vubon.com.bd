import { KpiResultService } from '../../services/impl/kpi-result.service.js';
import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries';
import { GetKpiResultsQuery } from './get-kpi-results.query.js';
@Injectable()
@QueryHandler(GetKpiResultsQuery)
export class GetKpiResultsHandler extends BaseQueryHandler<GetKpiResultsQuery, readonly unknown[]>
  implements IQueryHandler<GetKpiResultsQuery> {
  readonly queryType = 'analytics.kpi.results';
  constructor(private readonly service: KpiResultService) { super(); }
  async execute(query: GetKpiResultsQuery): Promise<readonly unknown[]> {
    const results = await this.service.findByKpiId(query.kpiId);
    return results;
  }
}
