import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetUserStatsQuery } from './get-user-stats.query';

@QueryHandler(GetUserStatsQuery)
export class GetUserStatsHandler
  extends BaseQueryHandler<GetUserStatsQuery, unknown>
  implements IQueryHandler<GetUserStatsQuery>
{
  readonly queryType = 'user.activity.get-stats';

  async execute(query: GetUserStatsQuery): Promise<unknown> {
    void query;
    return {};
  }
}
