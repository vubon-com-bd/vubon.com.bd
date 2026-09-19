import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListUserContactsQuery extends BaseQuery {
  readonly type = 'user.list-contacts';

  constructor(public readonly userId: string) {
    super();
  }
}
