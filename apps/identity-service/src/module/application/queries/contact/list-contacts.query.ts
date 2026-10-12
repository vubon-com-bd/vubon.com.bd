import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';
export class ListContactsQuery extends BaseQuery {
  readonly type = 'user.list-contacts';
  readonly queryType = 'user.list-contacts';
  constructor(public readonly userId: string) { super(); }
}
