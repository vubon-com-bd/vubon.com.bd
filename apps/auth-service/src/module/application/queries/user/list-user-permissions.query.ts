import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListUserPermissionsQuery extends BaseQuery {
  readonly type = 'user.list-permissions';

  constructor(public readonly userId: string) {
    super();
  }
}
