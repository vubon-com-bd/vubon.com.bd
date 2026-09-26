import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';
import type { UserId } from '@vubon/shared-types/common';

export class ListUserPermissionsQuery extends BaseQuery {
  readonly type = 'user.list-permissions';
  constructor(public readonly userId: UserId) { super(); }
}
