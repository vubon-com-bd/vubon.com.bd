import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetDefaultAddressQuery extends BaseQuery {
  readonly type = 'user.address.get-default';

  constructor(public readonly userId: string) {
    super();
  }
}
