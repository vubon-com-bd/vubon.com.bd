import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetAddressQuery extends BaseQuery {
  readonly type = 'user.address.get';

  constructor(public readonly addressId: string) {
    super();
  }
}
