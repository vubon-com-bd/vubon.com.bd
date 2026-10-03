import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';
import type { UserId } from '@vubon/shared-types/common';

export class ListUserAddressesQuery extends BaseQuery {
  readonly type = 'user.list-addresses';
  constructor(public readonly userId: UserId) { super(); }
}
