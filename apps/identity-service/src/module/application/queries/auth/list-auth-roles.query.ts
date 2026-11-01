import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';
export class ListAuthRolesQuery extends BaseQuery {
  readonly type = 'auth.list-roles';
  readonly queryType = 'auth.list-roles';
  constructor() { super(); }
}
