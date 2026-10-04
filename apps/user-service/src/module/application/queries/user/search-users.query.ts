/**
 * SearchUsersQuery
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class SearchUsersQuery extends BaseQuery {
  readonly type = 'user.search';

  constructor(
    public readonly term: string,
    public readonly page: number = 1,
    public readonly limit: number = 20
  ) {
    super();
  }
}
