import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';
export class ListUsersQuery extends BaseQuery {
  readonly type = 'user.list';
  readonly queryType = 'user.list';
  constructor(public readonly page = 1, public readonly limit = 20) { super(); }
}
