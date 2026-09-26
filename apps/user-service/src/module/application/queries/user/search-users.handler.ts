import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { SearchUsersQuery } from './search-users.query';

@QueryHandler(SearchUsersQuery)
export class SearchUsersHandler
  extends BaseQueryHandler<SearchUsersQuery, readonly unknown[]>
  implements IQueryHandler<SearchUsersQuery>
{
  readonly queryType = 'user.search';

  async execute(query: SearchUsersQuery): Promise<readonly unknown[]> {
    void query;
    return [];
  }
}
