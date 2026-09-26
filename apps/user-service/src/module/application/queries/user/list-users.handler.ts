import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListUsersQuery } from './list-users.query';

@QueryHandler(ListUsersQuery)
export class ListUsersHandler
  extends BaseQueryHandler<ListUsersQuery, readonly unknown[]>
  implements IQueryHandler<ListUsersQuery>
{
  readonly queryType = 'user.list';

  async execute(query: ListUsersQuery): Promise<readonly unknown[]> {
    void query;
    return [];
  }
}
