import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetUserAddressQuery extends BaseQuery {
  readonly type = 'user.get-address';
  constructor(public readonly addressId: string) { super(); }
}
