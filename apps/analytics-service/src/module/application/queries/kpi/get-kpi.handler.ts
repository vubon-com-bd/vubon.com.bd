import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetKpiQuery } from './get-kpi.query';
import type { KpiRepository } from '../../../domain/repositories/kpi.repository.interface';
import { KpiIdVO } from '../../../domain/value-objects/primitives/kpi-id.vo';
import { KpiNotFoundError } from '../../../domain/errors/kpi.errors';
import { type KpiResponseDTO, toKpiResponse } from '../../dtos/responses';

@QueryHandler(GetKpiQuery)
export class GetKpiHandler
  extends BaseQueryHandler<GetKpiQuery, KpiResponseDTO>
  implements IQueryHandler<GetKpiQuery>
{
  readonly queryType = 'analytics.kpi.get';

  constructor(private readonly kpiRepo: KpiRepository) {
    super();
  }

  async execute(query: GetKpiQuery): Promise<KpiResponseDTO> {
    const entity = await this.kpiRepo.findById(KpiIdVO.create(query.kpiId));
    if (!entity) throw new KpiNotFoundError(query.kpiId);
    return toKpiResponse(entity);
  }
}
