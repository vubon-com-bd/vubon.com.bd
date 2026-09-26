import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetAbandonedStatsQuery } from './get-abandoned-stats.query';

@QueryHandler(GetAbandonedStatsQuery)
export class GetAbandonedStatsHandler
  extends BaseQueryHandler<GetAbandonedStatsQuery, Readonly<Record<string, unknown>>>
  implements IQueryHandler<GetAbandonedStatsQuery>
{
  readonly queryType = 'abandoned.stats';

  async execute(_query: GetAbandonedStatsQuery): Promise<Readonly<Record<string, unknown>>> {
    return { total: 0, recovered: 0, pending: 0 };
  }
}
