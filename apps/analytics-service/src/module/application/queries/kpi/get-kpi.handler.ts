import { KpiService } from '../../services/impl/kpi.service.js';
import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors';
import { GetKpiQuery } from './get-kpi.query.js';
import type { KpiResponseData } from '../../dtos/responses/kpi-response.dto.js';

@Injectable()
@QueryHandler(GetKpiQuery)
export class GetKpiHandler extends BaseQueryHandler<GetKpiQuery, KpiResponseData>
  implements IQueryHandler<GetKpiQuery> {
  readonly queryType = 'analytics.kpi.get';
  constructor(private readonly service: KpiService) { super(); }
  async execute(query: GetKpiQuery): Promise<KpiResponseData> {
    const result = await this.service.findById(query.kpiId);
    if (!result) throw new ApplicationNotFoundError('KPI', query.kpiId);
    return result;
  }
}
