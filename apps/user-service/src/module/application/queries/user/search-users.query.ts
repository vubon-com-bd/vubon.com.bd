import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class SearchUsersQuery extends BaseQuery {
  readonly type = 'user.search';

  constructor(
    public readonly term: string,
    public readonly limit: number = 20,
  ) {
    super();
  }
}
