import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListUsersQuery extends BaseQuery {
  readonly type = 'user.list';
  constructor(
    public readonly limit: number = 50,
    public readonly offset: number = 0,
  ) { super(); }
}
