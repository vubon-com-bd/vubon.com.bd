import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';
import type { UserId } from '@vubon/shared-types/common';

export class ListUserContactsQuery extends BaseQuery {
  readonly type = 'user.list-contacts';
  constructor(public readonly userId: UserId) { super(); }
}
