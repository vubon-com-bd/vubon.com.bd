import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListKpisQuery } from './list-kpis.query';
import type { KpiRepository } from '../../../domain/repositories/kpi.repository.interface';
import {
  type KpiResponseDTO,
  toKpiResponse,
} from '../../dtos/responses';

@QueryHandler(ListKpisQuery)
export class ListKpisHandler
  extends BaseQueryHandler<ListKpisQuery, readonly KpiResponseDTO[]>
  implements IQueryHandler<ListKpisQuery>
{
  readonly queryType = 'analytics.kpi.list';

  constructor(private readonly kpiRepo: KpiRepository) {
    super();
  }

  async execute(query: ListKpisQuery): Promise<readonly KpiResponseDTO[]> {
    const all = await this.kpiRepo.findAll();
    return all
      .slice(query.offset, query.offset + query.limit)
      .map((k) => toKpiResponse(k));
  }
}
