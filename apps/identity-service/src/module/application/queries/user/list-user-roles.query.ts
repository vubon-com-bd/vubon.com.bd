import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';
export class ListUserRolesQuery extends BaseQuery {
  readonly type = 'user.list-roles';
  readonly queryType = 'user.list-roles';
  constructor(public readonly userId: string) { super(); }
}
