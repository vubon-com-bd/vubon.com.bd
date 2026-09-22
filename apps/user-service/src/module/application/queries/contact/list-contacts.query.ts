import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListContactsQuery extends BaseQuery {
  readonly type = 'user.contact.list';

  constructor(public readonly userId: string) {
    super();
  }
}
