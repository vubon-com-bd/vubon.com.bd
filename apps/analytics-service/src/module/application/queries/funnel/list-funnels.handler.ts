import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListFunnelsQuery } from './list-funnels.query';
import type { FunnelRepository } from '../../../domain/repositories/funnel.repository.interface';
import {
  type FunnelResponseDTO,
  toFunnelResponse,
} from '../../dtos/responses';

@QueryHandler(ListFunnelsQuery)
export class ListFunnelsHandler
  extends BaseQueryHandler<ListFunnelsQuery, readonly FunnelResponseDTO[]>
  implements IQueryHandler<ListFunnelsQuery>
{
  readonly queryType = 'analytics.funnel.list';

  constructor(private readonly funnelRepo: FunnelRepository) {
    super();
  }

  async execute(query: ListFunnelsQuery): Promise<readonly FunnelResponseDTO[]> {
    const all = await this.funnelRepo.findAll();
    return all.slice(0, query.limit).map((e) => toFunnelResponse(e));
  }
}
