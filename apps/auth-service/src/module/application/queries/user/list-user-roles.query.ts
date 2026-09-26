import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';
import type { UserId } from '@vubon/shared-types/common';

export class ListUserRolesQuery extends BaseQuery {
  readonly type = 'user.list-roles';
  constructor(public readonly userId: UserId) { super(); }
}
