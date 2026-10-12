import { FunnelService } from '../../services/impl/funnel.service.js';
import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries';
import { ListFunnelsQuery } from './list-funnels.query.js';
import type { FunnelResponseData } from '../../dtos/responses/funnel-response.dto.js';

@Injectable()
@QueryHandler(ListFunnelsQuery)
export class ListFunnelsHandler extends BaseQueryHandler<ListFunnelsQuery, readonly FunnelResponseData[]>
  implements IQueryHandler<ListFunnelsQuery> {
  readonly queryType = 'analytics.funnel.list';
  constructor(private readonly service: FunnelService) { super(); }
  async execute(_query: ListFunnelsQuery): Promise<readonly FunnelResponseData[]> {
    return this.service.listActive();
  }
}
