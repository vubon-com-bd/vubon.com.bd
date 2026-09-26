import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export interface ListUsersFilter {
  readonly status?: string;
  readonly type?: string;
  readonly search?: string;
}

export class ListUsersQuery extends BaseQuery {
  readonly type = 'user.list';

  constructor(
    public readonly page: number = 1,
    public readonly limit: number = 20,
    public readonly filter?: ListUsersFilter,
  ) {
    super();
  }
}
