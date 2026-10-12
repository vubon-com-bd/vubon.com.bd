import { KpiService } from '../../services/impl/kpi.service.js';
import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries';
import { ListKpisQuery } from './list-kpis.query.js';
import type { KpiResponseData } from '../../dtos/responses/kpi-response.dto.js';

@Injectable()
@QueryHandler(ListKpisQuery)
export class ListKpisHandler extends BaseQueryHandler<ListKpisQuery, readonly KpiResponseData[]>
  implements IQueryHandler<ListKpisQuery> {
  readonly queryType = 'analytics.kpi.list';
  constructor(private readonly service: KpiService) { super(); }
  async execute(query: ListKpisQuery): Promise<readonly KpiResponseData[]> {
    return query.onlyActive ? this.service.listActive() : this.service.listAll();
  }
}
