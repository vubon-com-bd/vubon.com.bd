import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListAddressesQuery extends BaseQuery {
  readonly type = 'user.address.list';

  constructor(public readonly userId: string) {
    super();
  }
}
