import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListUserAddressesQuery extends BaseQuery {
  readonly type = 'user.list-addresses';

  constructor(public readonly userId: string) {
    super();
  }
}
